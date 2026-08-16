import { createClient } from '@supabase/supabase-js';

// Next.js exposes client-side env vars via `process.env.NEXT_PUBLIC_*`,
// not Vite's `import.meta.env` — that API isn't populated by Next's bundler.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set — src/lib/supabase.ts will fail on first use.'
  );
}

// `createClient` throws immediately if given an empty string URL, so a
// placeholder is used when unconfigured — that turns a hard crash on import
// into a normal failed network call only if this client is actually used.
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-anon-key');