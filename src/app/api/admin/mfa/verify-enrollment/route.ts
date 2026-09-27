import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAdminAccount } from '@/lib/adminAuth';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const admin = await getAdminAccount();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`admin-mfa-verify:${getClientIp(req)}`, 8, 5 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const factorId = typeof body?.factorId === 'string' ? body.factorId : '';
  const code = typeof body?.code === 'string' ? body.code.trim() : '';
  if (!factorId || !code) {
    return NextResponse.json({ success: false, error: 'Enter the 6-digit code from your authenticator app' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) {
    return NextResponse.json({ success: false, error: 'Incorrect code. Check your authenticator app and try again.' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
