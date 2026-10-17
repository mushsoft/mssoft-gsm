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
 *
 * Also refreshes immediately on two events the interval alone doesn't cover:
 *  - popstate (Back/Forward): Next.js restores these from its client-side
 *    router cache to preserve scroll position, regardless of staleTime, which
 *    can surface stale data (e.g. edit a product, press Back to the list —
 *    the old row shows until the next poll tick without this).
 *  - the tab regaining visibility: covers switching back from another tab/app
 *    after data changed elsewhere, without waiting out the interval.
 */
export default function AutoRefresh({ intervalMs }: { intervalMs: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);

    function refreshNow() {
      router.refresh();
    }
    function onVisibilityChange() {
      if (document.visibilityState === 'visible') router.refresh();
    }

    window.addEventListener('popstate', refreshNow);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      clearInterval(id);
      window.removeEventListener('popstate', refreshNow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [router, intervalMs]);

  return null;
}
