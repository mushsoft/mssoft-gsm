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
  const code = typeof body?.code === 'string' ? body.code.trim() : '';
  if (!code) {
    return NextResponse.json({ success: false, error: 'Enter the 6-digit code from your authenticator app' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: factorsData } = await supabase.auth.mfa.listFactors();
  const factor = (factorsData?.totp ?? []).find((f) => f.status === 'verified');
  if (!factor) {
    return NextResponse.json({ success: false, error: 'No authenticator app is set up for this account' }, { status: 400 });
  }

  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code });
  if (error) {
    return NextResponse.json({ success: false, error: 'Incorrect code. Check your authenticator app and try again.' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
