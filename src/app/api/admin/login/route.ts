import { NextResponse } from 'next/server';
import { createAdminSession, verifyPassword } from '@/lib/adminAuth';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    console.error('Admin login attempted but ADMIN_PASSWORD is not configured');
    return NextResponse.json({ success: false, error: 'Admin login is not configured' }, { status: 500 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`admin-login:${getClientIp(req)}`, 5, 5 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
  }

  await createAdminSession();

  return NextResponse.json({ success: true });
}
