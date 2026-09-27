import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`forgot-password:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  // Always return the same success response whether or not the email is
  // registered — a differing response would let this form be used to check
  // who has an account.
  if (email) {
    const supabase = await createSupabaseServerClient();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${baseUrl}/account/reset-password` });
  }

  return NextResponse.json({ success: true });
}
