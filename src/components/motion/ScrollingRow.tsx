'use client';

import { useState, type ReactNode } from 'react';

/**
 * Continuously auto-scrolls its children left, like Marquee.tsx but for
 * interactive cards rather than plain text. Pauses on hover (desktop) and
 * briefly after a touch (mobile) so a moving row doesn't turn "Buy Now" into
 * a moving target — callers must render `children` as the full list already
 * duplicated once (e.g. [...items, ...items]) for the loop to be seamless.
 */
export default function ScrollingRow({ children, durationSeconds = 26 }: { children: ReactNode; durationSeconds?: number }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-white dark:from-neutral-950 to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-white dark:from-neutral-950 to-transparent sm:w-12" />
      <div
        className="flex w-max gap-4"
        style={{
          animation: `product-scroll ${durationSeconds}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 4000)}
      >
        {children}
      </div>
    </div>
  );
}
