import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSupabaseSession } from '@/lib/supabase/proxy';

// The real, unconditional line of defense for /admin/** and /account/**.
//
// The equivalent checks also exist deeper in the app (requireAdminPage(),
// requireCustomerPage()) via next/navigation's redirect(), but that call is
// NOT a guaranteed HTTP redirect: Next.js's own docs note that once
// streaming has started (React can flush the 200 response head before a
// deeper redirect() call runs), redirect() falls back to a client-side
// <meta refresh> tag instead of a real status code. A real browser still
// ends up redirected, but a plain HTTP client — or a browser with
// JS/meta-refresh disabled — would see the protected page's HTML with a
// 200. Proxy runs before any rendering starts, so its redirect is always a
// real HTTP 307, no matter what happens further down the render tree.
const ADMIN_PUBLIC_PATHS = new Set(['/admin/login']);
// Reachable with just a password-verified (aal1) session — these are the
// MFA enrollment/verification steps themselves, so they can't require aal2.
const ADMIN_AAL1_PATHS = new Set(['/admin/mfa-setup', '/admin/mfa-verify']);
const ACCOUNT_PUBLIC_PATHS = new Set(['/account/login', '/account/signup', '/account/forgot-password', '/account/reset-password']);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (ADMIN_PUBLIC_PATHS.has(pathname)) {
      return NextResponse.next();
    }

    const { response, user, aal, mfaEnrolled } = await updateSupabaseSession(request);
    const isAdmin = user?.app_metadata?.role === 'admin';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (ADMIN_AAL1_PATHS.has(pathname)) {
      return response;
    }
    if (aal !== 'aal2') {
      const nextStep = mfaEnrolled ? '/admin/mfa-verify' : '/admin/mfa-setup';
      return NextResponse.redirect(new URL(nextStep, request.url));
    }
    return response;
  }

  // Every other route still needs its Supabase session cookie refreshed
  // (see updateSupabaseSession) even where no auth gate applies.
  const { response, user } = await updateSupabaseSession(request);

  if (pathname.startsWith('/account') && !ACCOUNT_PUBLIC_PATHS.has(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL('/account/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|studio|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)'],
};
