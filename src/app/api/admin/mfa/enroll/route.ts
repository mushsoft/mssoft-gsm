import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAdminAccount } from '@/lib/adminAuth';

export async function POST() {
  const admin = await getAdminAccount();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();

  // Clear out any unverified TOTP factor left over from an abandoned setup
  // attempt before creating a fresh one — Supabase would otherwise let these
  // accumulate, and a stale QR code shown again would be confusing. (The
  // `totp` list on this response is typed verified-only; `all` is the one
  // that includes unverified factors.)
  const { data: factorsData } = await supabase.auth.mfa.listFactors();
  const staleFactors = (factorsData?.all ?? []).filter((f) => f.factor_type === 'totp' && f.status === 'unverified');
  for (const factor of staleFactors) {
    await supabase.auth.mfa.unenroll({ factorId: factor.id });
  }

  const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Admin TOTP' });
  if (error || !data) {
    return NextResponse.json({ success: false, error: error?.message || 'Could not start MFA enrollment' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    factorId: data.id,
    qrCode: data.totp.qr_code,
    secret: data.totp.secret,
  });
}
