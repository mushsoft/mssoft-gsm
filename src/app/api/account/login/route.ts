import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`account-login:${getClientIp(req)}`, 10, 5 * 60 * 1000);
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
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
