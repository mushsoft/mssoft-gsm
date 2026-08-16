import * as Sentry from '@sentry/nextjs';

// A missing/empty DSN makes Sentry's SDK a no-op (no network calls) — same
// lazy-configuration pattern as isSupabaseConfigured()/isMobileApiConfigured()
// elsewhere in this codebase. Set SENTRY_DSN to activate.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
