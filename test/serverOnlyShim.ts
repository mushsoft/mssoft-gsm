// Test-only stand-in for the 'server-only' package, aliased in vitest.config.ts.
// 'server-only' unconditionally throws when imported outside Next.js's own
// bundler (which special-cases it into a no-op on the server) — vitest runs
// under plain Node, so without this alias any module that imports it
// transitively (email senders, Supabase/admin auth helpers, etc.) would
// throw the moment a test imported something that touches them.
export {};
