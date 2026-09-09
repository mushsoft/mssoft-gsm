'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_ADVANCE_MS = 4000;
// Beyond this, individual dots stop being a useful "jump to" control and just
// clutter the row — a plain counter reads better for a long rail.
const MAX_DOTS = 8;

// How each card sits relative to the one in front of it in the stack —
// front card, then two visible layers fanned out behind and below it.
const STACK = [
  { y: 0, scale: 1, opacity: 1 },
  { y: 18, scale: 0.94, opacity: 0.8 },
  { y: 34, scale: 0.88, opacity: 0.55 },
];
// Anything deeper than STACK sits hidden behind the last visible layer.
const BACK = { y: 40, scale: 0.85, opacity: 0 };

/**
 * A stacked card deck — every child sits piled behind the front one, and each
 * tick brings the next card to the front while the old front slides back into
 * the pile. Auto-advances on an interval, pausing on hover (desktop) and
 * briefly after a touch (mobile), plus manual prev/next arrows and
 * dots/counter for direct control.
 */
export default function Carousel({
  children,
  slideClassName = 'w-48 sm:w-56 lg:w-72',
}: {
  children: ReactNode;
  /** Width of the front card — sizes the whole deck. */
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
        <div className="grid pb-10">
          {items.map((item, i) => {
            const offset = (i - index + count) % count;
            const pose = STACK[offset] ?? BACK;
            const isFront = offset === 0;
            return (
              <div
                key={i}
                inert={!isFront}
                className="transition-[transform,opacity] duration-500 ease-out [grid-area:1/1] motion-reduce:transition-none"
                style={{
                  transform: `translateY(${pose.y}px) scale(${pose.scale})`,
                  opacity: pose.opacity,
                  zIndex: count - offset,
                }}
              >
                {item}
              </div>
            );
          })}
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
