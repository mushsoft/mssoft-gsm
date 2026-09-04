'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_ADVANCE_MS = 4000;
// Beyond this, individual dots stop being a useful "jump to" control and just
// clutter the row — a plain counter reads better for a long rail.
const MAX_DOTS = 8;

/**
 * Shows exactly one child at a time — a spotlight carousel rather than
 * ScrollingRow's continuous multi-item marquee. Auto-advances on an
 * interval, pausing on hover (desktop) and briefly after a touch (mobile),
 * plus manual prev/next arrows and dots/counter for direct control.
 */
export default function Carousel({
  children,
  slideClassName = 'w-48 sm:w-56 lg:w-72',
}: {
  children: ReactNode;
  /** Width of the single visible slide — sizes the whole carousel. */
  slideClassName?: string;
}) {
  const items = Children.toArray(children);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Defensive: if the item count shrinks (e.g. a revalidation removes a
  // product) and the current index is now out of range, snap back to start
  // rather than showing a blank slide. Deferred via queueMicrotask rather
  // than calling setState directly in the effect body — matches this
  // codebase's convention (see CartContext's hydration effect).
  useEffect(() => {
    if (index >= count) queueMicrotask(() => setIndex(0));
  }, [count, index]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  function goTo(target: number) {
    setIndex(((target % count) + count) % count);
  }

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 4000)}
    >
      {count > 1 && (
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors hover:border-amber-500/50 hover:text-amber-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      <div className={`${slideClassName} min-w-0`}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item, i) => (
              <div key={i} className="w-full shrink-0">
                {item}
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {count <= MAX_DOTS ? (
              items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-5 bg-amber-500' : 'w-1.5 bg-neutral-300 dark:bg-neutral-700'
                  }`}
                />
              ))
            ) : (
              <span className="font-mono text-[10px] font-bold text-neutral-500">
                {index + 1} / {count}
              </span>
            )}
          </div>
        )}
      </div>

      {count > 1 && (
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors hover:border-amber-500/50 hover:text-amber-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
