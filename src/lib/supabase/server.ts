import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// For Server Components and Route Handlers. Reads/refreshes the Supabase
// Auth session cookie. `setAll` is wrapped in try/catch because Next.js
// disallows setting cookies during plain Server Component rendering — the
// actual cookie refresh happens in src/proxy.ts on every request, so a
// no-op here (inside a Server Component render) is expected, not an error.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render — safe to ignore.
        }
      },
    },
  });
}
