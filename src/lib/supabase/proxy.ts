import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Used only from src/proxy.ts — refreshes the Supabase Auth session cookie
// on every matched request so it doesn't silently expire mid-session, and
// returns the revalidated user so callers can also gate routes (e.g.
// /account/**) without a second Supabase round trip.
export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Revalidates against Supabase rather than trusting the cookie's JWT alone.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only meaningful for /admin — getAuthenticatorAssuranceLevel() just reads
  // the current session's already-verified AMR claims (no extra network
  // call), so it's cheap to always compute alongside the user lookup above.
  // `nextLevel` is the highest level reachable given enrolled factors: equal
  // to `currentLevel` means no MFA factor is enrolled at all (aal2 isn't
  // reachable this session no matter what), higher means a factor exists
  // but this session hasn't verified it yet.
  const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  return {
    response,
    user,
    aal: aalData?.currentLevel ?? null,
    mfaEnrolled: aalData ? aalData.nextLevel === 'aal2' : false,
  };
}
