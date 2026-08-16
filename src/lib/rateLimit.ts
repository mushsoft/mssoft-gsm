// In-memory sliding-window rate limiter. No 'server-only' guard here — unlike
// the auth/email/API-key modules elsewhere in src/lib, this holds no secrets,
// so the worst case of an accidental client bundle is dead weight, not a
// leak. Left importable from plain Node (e.g. vitest) for that reason too. Deliberately not backed by Redis/
// Upstash — this app runs as a single Node process (no serverless/multi-
// instance deployment target configured anywhere in this repo), so a
// module-level Map is a real, correct limiter here, not a shortcut. If this
// ever moves to a multi-instance deployment, swap the store for a shared one
// (Upstash Ratelimit, etc.) — the call sites below wouldn't need to change.

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

// Periodic sweep so the Map doesn't grow unbounded over the process
// lifetime — buckets older than 10 minutes are stale for any window size
// used in this app.
const SWEEP_INTERVAL_MS = 10 * 60 * 1000;
let lastSweep = Date.now();
function sweepIfDue() {
  const now = Date.now();
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > SWEEP_INTERVAL_MS) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

/**
 * Fixed-window limiter: `limit` requests per `windowMs`, keyed by caller-
 * supplied string (route name + IP). Returns whether this call is allowed.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  sweepIfDue();
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count < limit) {
    bucket.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.ceil((bucket.windowStart + windowMs - now) / 1000);
  return { allowed: false, retryAfterSeconds };
}

/** Best-effort caller IP from standard proxy headers, falling back to a shared bucket if absent. */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}
