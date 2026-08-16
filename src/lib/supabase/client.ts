import { createBrowserClient } from '@supabase/ssr';

// For client components that need direct Supabase Auth access (e.g. reading
// auth-state-change events). Most work should go through Route Handlers
// instead, so server-side validation stays centralized.
export function createSupabaseBrowserClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
