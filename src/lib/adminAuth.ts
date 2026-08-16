import 'server-only';
import { randomBytes, createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

// A lightweight shared-password gate for the internal /admin tools — not a
// real per-user auth system (single shared ADMIN_PASSWORD, no per-user
// accounts or audit trail). Sessions themselves ARE real, though: each login
// creates a random, unguessable token and a matching row in AdminSession;
// only a hash of the token is stored (so a DB read alone can't be replayed
// as a live session), and logout / expiry actually invalidate it
// server-side — unlike a prior design where the cookie was a deterministic
// HMAC of a fixed message keyed by ADMIN_PASSWORD (same value every login,
// no real expiry, and "logout" only cleared the cookie client-side).
export const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured');
  }
  return password;
}

export function verifyPassword(candidate: string): boolean {
  const expected = getAdminPassword();
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/** Call after a successful password check — creates the session row and sets the cookie. */
export async function createAdminSession(): Promise<void> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.adminSession.create({ data: { id: hashToken(token), expiresAt } });
  // Best-effort housekeeping so the table doesn't grow unbounded — never
  // blocks or fails the login itself.
  await prisma.adminSession
    .deleteMany({ where: { OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { not: null } }] } })
    .catch((error) => console.error('Admin session cleanup failed (non-fatal)', error));

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

/** Real, server-side logout — revokes the session so the token can't be replayed. */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (token) {
    await prisma.adminSession
      .updateMany({ where: { id: hashToken(token) }, data: { revokedAt: new Date() } })
      .catch((error) => console.error('Failed to revoke admin session', error));
  }
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

// Token-in, boolean-out — no dependency on next/headers' cookies(), so this
// is callable from src/proxy.ts too (which reads cookies off the
// NextRequest instead). isAdminAuthenticated() below is the
// Server-Component/Route-Handler-friendly wrapper around this.
export async function isSessionTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const session = await prisma.adminSession.findUnique({ where: { id: hashToken(token) } });
  if (!session || session.revokedAt || session.expiresAt < new Date()) return false;
  return true;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return isSessionTokenValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

// requireAdminPage()'s redirect() below is a real, unconditional HTTP 307 in
// most cases — but React's streaming renderer can flush the 200 response
// head before this code runs (e.g. once any Suspense boundary further down
// the tree has already started sending bytes), in which case redirect()
// falls back to a client-side <meta refresh> instead of a real HTTP status
// (see Next.js's own docs for the redirect() function). That fallback still
// works in a real browser, but leaves a window where a plain HTTP client —
// or a browser with JS/meta-refresh disabled — sees the protected page's
// content with a 200. src/proxy.ts is the actual, unconditional line of
// defense (it runs before any rendering starts, so its redirect is always a
// real HTTP 307) — this function stays as defense-in-depth for cases proxy
// doesn't cover, not as the only gate.
/** For Server Component pages — redirects to the login page if not authenticated. */
export async function requireAdminPage(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}

/** For Route Handlers — returns true/false instead of redirecting. */
export async function requireAdminApi(): Promise<boolean> {
  return isAdminAuthenticated();
}
