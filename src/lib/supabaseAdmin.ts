import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Uses the Supabase SERVICE ROLE key, which bypasses Row Level Security —
// this must never be imported into a client component or exposed to the
// browser. `server-only` makes any accidental client-side import a build
// error rather than a leaked key at runtime.
export const PRODUCT_IMAGES_BUCKET = 'product-images';
export const TESTPOINT_DIAGRAMS_BUCKET = 'testpoint-diagrams';
export const REPAIR_REQUEST_IMAGES_BUCKET = 'repair-request-images';
export const REPAIR_GUIDE_MEDIA_BUCKET = 'repair-guide-media';

// Lazily constructed: @supabase/supabase-js throws immediately on
// `createClient()` if the URL is empty, so building this eagerly at module
// scope would crash the route the moment it's imported in an environment
// without Supabase configured — before callers get a chance to check
// `isSupabaseConfigured()` and return a clean error instead.
let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return client;
}

/** Derives the storage object path from a public Supabase Storage URL. */
export function pathFromPublicUrl(publicUrl: string, bucket: string = PRODUCT_IMAGES_BUCKET): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(publicUrl.slice(index + marker.length));
}
