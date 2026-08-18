import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { REFERRAL_SOURCE_OPTIONS } from '@/lib/referralSources';

const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/;
const PHONE_PATTERN = /^\+?[\d\s-]{7,20}$/;

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`account-signup:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const name = typeof body?.name === 'string' && body.name.trim() ? body.name.trim() : undefined;
  const username = typeof body?.username === 'string' ? body.username.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const referralSource = typeof body?.referralSource === 'string' ? body.referralSource : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'A valid email is required' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ success: false, error: 'Password must be at least 8 characters' }, { status: 400 });
  }
  if (!USERNAME_PATTERN.test(username)) {
    return NextResponse.json(
      { success: false, error: 'Username must be 3-20 characters (letters, numbers, "_" or ".")' },
      { status: 400 }
    );
  }
  if (!PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ success: false, error: 'A valid phone number is required' }, { status: 400 });
  }
  if (!(REFERRAL_SOURCE_OPTIONS as readonly string[]).includes(referralSource)) {
    return NextResponse.json({ success: false, error: 'Please tell us how you heard about us' }, { status: 400 });
  }

  // Checked here (not just via the DB unique constraint) so a duplicate is
  // rejected before we ever create a Supabase auth user for it — the
  // constraint below is the last-resort backstop for the race between this
  // check and the create, not the primary UX.
  const existing = await prisma.customer.findFirst({
    where: { OR: [{ email }, { username }, { phone }] },
    select: { email: true, username: true, phone: true },
  });
  if (existing) {
    const field =
      existing.email === email ? 'email' : existing.username === username ? 'username' : 'phone number';
    return NextResponse.json({ success: false, error: `That ${field} is already registered` }, { status: 409 });
  }

  const supabase = await createSupabaseServerClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { ...(name ? { name } : {}), username, phone, referralSource },
      emailRedirectTo: `${baseUrl}/account/login`,
    },
  });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
  if (!data.user) {
    return NextResponse.json({ success: false, error: 'Sign up failed' }, { status: 500 });
  }

  try {
    await prisma.customer.create({
      data: { supabaseUserId: data.user.id, email, name, username, phone, referralSource },
    });
  } catch (createError) {
    if (createError instanceof Prisma.PrismaClientKnownRequestError && createError.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'That username, phone number, or email was just taken — please try again' },
        { status: 409 }
      );
    }
    throw createError;
  }

  return NextResponse.json({ success: true, needsEmailConfirmation: !data.session });
}
