import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`admin-login:${getClientIp(req)}`, 5, 5 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  // Same generic message whether the password was wrong or the account
  // simply isn't an admin — never confirm which admin emails exist.
  if (error || data.user?.app_metadata?.role !== 'admin') {
    if (data.user) {
      // Signed in successfully but this account has no admin role — don't
      // leave a live non-admin Supabase session sitting in the response.
      await supabase.auth.signOut();
    }
    return NextResponse.json({ success: false, error: 'Incorrect email or password' }, { status: 401 });
  }

  const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const nextStep = aalData?.nextLevel === 'aal2' ? 'mfa-verify' : 'mfa-setup';

  return NextResponse.json({ success: true, nextStep });
}
