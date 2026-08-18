'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Periodically calls router.refresh() so a Server Component page picks up
 * fresh data without the visitor needing to hit reload — the same polling
 * approach already used for payment confirmation in OrderStatus.tsx, applied
 * generically. Not push-based: this app's data access goes through Prisma
 * directly rather than Supabase's client, so there's no RLS-gated realtime
 * channel to subscribe to without first doing that policy work.
 */
export default function AutoRefresh({ intervalMs }: { intervalMs: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
