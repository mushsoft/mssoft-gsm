'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Excluded so admin/studio activity and API calls don't pollute "site
// visits" — those aren't storefront traffic.
const EXCLUDED_PREFIXES = ['/admin', '/studio', '/api'];

/** Fires a beacon on every route change so src/app/api/track-visit can log it. Rendered once in the root layout. */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return;

    const payload = JSON.stringify({ path: pathname, referrer: document.referrer || null });
    const sent = navigator.sendBeacon?.('/api/track-visit', new Blob([payload], { type: 'application/json' }));
    if (!sent) {
      fetch('/api/track-visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(
        () => {}
      );
    }
  }, [pathname]);

  return null;
}
