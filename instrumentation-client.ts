import * as Sentry from '@sentry/nextjs';

// A missing/empty DSN makes Sentry's SDK a no-op (no network calls) — same
// lazy-configuration pattern as isSupabaseConfigured()/isMobileApiConfigured()
// elsewhere in this codebase. Set NEXT_PUBLIC_SENTRY_DSN to activate.
//
// Deliberately a separate NEXT_PUBLIC_ variable, not SENTRY_DSN — this file
// ships to the browser bundle, and env vars without that prefix are
// stripped by Next.js rather than exposed there.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});
