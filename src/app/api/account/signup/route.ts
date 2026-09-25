import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { REFERRAL_SOURCE_OPTIONS } from '@/lib/referralSources';
import { COUNTRY_CODES, getPhoneLengthRange } from '@/lib/countryCodes';
import { isValidFullName, isValidEmail } from '@/lib/validation';

const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/;

// Supabase's own auth error messages are written for developers, not
// customers ("email rate limit exceeded", "Signups not allowed for this
// instance") — map the ones we can reasonably expect to a message that
// doesn't read like an internal error dump. Anything unmapped falls back
// to the original message rather than a generic one, so a genuinely new
// failure mode isn't hidden from support/debugging.
function friendlySignupError(error: { code?: string; message: string }): string {
  switch (error.code) {
    case 'over_email_send_rate_limit':
      return "We've sent too many verification emails to this address recently. Please wait a few minutes and try again.";
    case 'over_request_rate_limit':
      return 'Too many signup attempts. Please wait a few minutes and try again.';
    case 'email_exists':
    case 'user_already_exists':
      return 'Email already registered';
    case 'weak_password':
      return 'Please choose a stronger password';
    case 'signup_disabled':
      return 'New sign-ups are temporarily unavailable. Please try again later.';
    default:
      return error.message;
  }
}

// Dial codes sorted longest-first so a +1-family code (e.g. +1876 Jamaica)
// matches before the shorter +1 (US/Canada) prefix it starts with.
const DIAL_CODES_BY_LENGTH = [...new Set(COUNTRY_CODES.map((c) => c.dialCode))].sort((a, b) => b.length - a.length);

/** Splits a submitted "+<dialcode><national number>" phone into its parts, or null if no known dial code matches. */
function splitPhone(phone: string): { dialCode: string; national: string } | null {
  const dialCode = DIAL_CODES_BY_LENGTH.find((c) => phone.startsWith(c));
  if (!dialCode) return null;
  return { dialCode, national: phone.slice(dialCode.length) };
}

const DUPLICATE_FIELD_MESSAGES = {
  email: 'Email already registered',
  username: 'Username not available',
  phone: 'Phone number already registered',
} as const;
type DuplicateField = keyof typeof DUPLICATE_FIELD_MESSAGES;

function duplicateResponse(field: DuplicateField) {
  return NextResponse.json({ success: false, error: DUPLICATE_FIELD_MESSAGES[field], field }, { status: 409 });
}

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`account-signup:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const username = typeof body?.username === 'string' ? body.username.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const referralSource = typeof body?.referralSource === 'string' ? body.referralSource : '';

  if (!isValidFullName(name)) {
    return NextResponse.json(
      { success: false, error: 'Enter your full name using letters only', field: 'name' },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: 'A valid email is required', field: 'email' }, { status: 400 });
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
  const phoneParts = splitPhone(phone);
  if (!phoneParts) {
    return NextResponse.json({ success: false, error: 'A valid phone number is required', field: 'phone' }, { status: 400 });
  }
  const [minDigits, maxDigits] = getPhoneLengthRange(phoneParts.dialCode);
  const nationalDigits = phoneParts.national.replace(/\D/g, '');
  if (phoneParts.national !== nationalDigits || nationalDigits.length < minDigits || nationalDigits.length > maxDigits) {
    return NextResponse.json(
      { success: false, error: `Phone number must be ${minDigits === maxDigits ? minDigits : `${minDigits}-${maxDigits}`} digits for the selected country`, field: 'phone' },
      { status: 400 }
    );
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
    const field: DuplicateField = existing.email === email ? 'email' : existing.username === username ? 'username' : 'phone';
    return duplicateResponse(field);
  }

  const supabase = await createSupabaseServerClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, username, phone, referralSource },
      emailRedirectTo: `${baseUrl}/account/login`,
    },
  });

  if (error) {
    return NextResponse.json({ success: false, error: friendlySignupError(error) }, { status: 400 });
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
      // meta.target is the offending column name(s) for a single-column
      // unique constraint on Postgres — e.g. ['username'].
      const target = createError.meta?.target;
      const targetFields = Array.isArray(target) ? target : typeof target === 'string' ? [target] : [];
      const field: DuplicateField = targetFields.includes('username')
        ? 'username'
        : targetFields.includes('phone')
          ? 'phone'
          : 'email';
      return duplicateResponse(field);
    }
    throw createError;
  }

  return NextResponse.json({ success: true, needsEmailConfirmation: !data.session });
}
