import 'server-only';
import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { createSupabaseServerClient } from './supabase/server';

// Admin auth reuses the same Supabase Auth project as customers — there is
// no separate password or session store. What makes an account an admin is
// `app_metadata.role === 'admin'`, which only the service-role key can set
// (see scripts/create-admin-user.mjs), so a customer can never grant it to
// themselves via updateUser(). Full admin access additionally requires the
// session to have reached MFA assurance level 2 (a verified TOTP code) —
// aal1 (password only) is enough to see the MFA enrollment/verification
// pages, but nothing else under /admin.
export interface AdminUser {
  id: string;
  email: string;
}

function extractAdmin(user: User | null): AdminUser | null {
  if (!user || !user.email) return null;
  if (user.app_metadata?.role !== 'admin') return null;
  return { id: user.id, email: user.email };
}

/** Signed in, role === 'admin', but not necessarily past MFA yet (aal1 is enough). */
export async function getAdminAccount(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return extractAdmin(user);
}

/** Full admin access: role === 'admin' AND the session has cleared MFA (aal2). */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const admin = extractAdmin(user);
  if (!admin) return null;

  const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aalData?.currentLevel !== 'aal2') return null;

  return admin;
}

// src/proxy.ts is the real, unconditional gate for /admin/** page routes (see
// the comment there) — same caveat as the old design: Next's redirect() can
// degrade to a client-side <meta refresh> once streaming starts, so this
// stays as defense-in-depth rather than the only check.
/** For Server Component pages — redirects to the login page if not fully authenticated. */
export async function requireAdminPage(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) {
    redirect('/admin/login');
  }
  return admin;
}

/** For Route Handlers — returns the admin user or null instead of redirecting. */
export async function requireAdminApi(): Promise<AdminUser | null> {
  return getAdminUser();
}
