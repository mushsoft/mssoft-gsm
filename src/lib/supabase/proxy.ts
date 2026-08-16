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

  return { response, user };
}
