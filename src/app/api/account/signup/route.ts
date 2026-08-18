import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
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

  return NextResponse.json({ success: true, needsEmailConfirmation: !data.session });
}
