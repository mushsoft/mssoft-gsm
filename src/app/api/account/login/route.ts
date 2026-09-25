import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { isValidEmail } from '@/lib/validation';

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`account-login:${getClientIp(req)}`, 10, 5 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!password) {
    return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
  }
  // Format-only check (not "does this account exist") — a malformed address
  // can never match a real account, so rejecting it here saves a Supabase
  // round-trip without leaking anything a bad password attempt wouldn't.
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
