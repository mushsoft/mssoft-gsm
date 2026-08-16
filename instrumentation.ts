import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// A safe no-op when SENTRY_DSN isn't set — Sentry.init() above never ran a
// live client, so this has nowhere to send data and does nothing.
export const onRequestError = Sentry.captureRequestError;
