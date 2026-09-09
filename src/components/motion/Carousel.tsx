'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_ADVANCE_MS = 4000;
// Beyond this, individual dots stop being a useful "jump to" control and just
// clutter the row — a plain counter reads better for a long rail.
const MAX_DOTS = 8;
// Horizontal travel (px) past which a touch counts as a swipe, not a tap.
const SWIPE_THRESHOLD = 40;

// Coverflow poses keyed by absolute distance from the centred card: the centred
// card is enlarged ("zoomed") and each neighbour shrinks and fades as it fans
// further out, filling the width. `x` is a percentage of the card's own width.
// Phones get a tighter fan (centre + one peeking neighbour each side) so nothing
// spills awkwardly on a narrow screen.
const POSE_WIDE = [
  { x: 0, scale: 1.06, opacity: 1 },
  { x: 68, scale: 0.84, opacity: 0.6 },
  { x: 126, scale: 0.66, opacity: 0.32 },
  { x: 172, scale: 0.52, opacity: 0.14 },
];
const POSE_COMPACT = [
  { x: 0, scale: 1.03, opacity: 1 },
  { x: 60, scale: 0.78, opacity: 0.4 },
];
const HIDDEN = { x: 210, scale: 0.45, opacity: 0 };

/**
 * A coverflow carousel — the centred card is zoomed and the rest fan out to
 * either side, shrinking and fading toward the edges so the row fills the
 * width. Auto-advances so each card takes the centre in turn, pausing on hover
 * (desktop) and briefly after a touch (mobile). Swipe or click a side card to
 * move it to the centre; prev/next arrows and dots/counter also work. The fan
 * tightens on phone-width screens.
 */
export default function Carousel({
  children,
  slideClassName = 'w-44 sm:w-52 lg:w-64',
}: {
  children: ReactNode;
  /** Width of the centred card — sizes the whole coverflow. */
  slideClassName?: string;
}) {
  const items = Children.toArray(children);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [compact, setCompact] = useState(false);
  const touchStartX = useRef<number | null>(null);

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

  // Phone-width screens use the tighter fan.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (count === 0) return null;

  function goTo(target: number) {
    setIndex(((target % count) + count) % count);
  }

  const poses = compact ? POSE_COMPACT : POSE_WIDE;
  const maxVisible = poses.length - 1;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start != null && count > 1) {
          const dx = (e.changedTouches[0]?.clientX ?? start) - start;
          if (Math.abs(dx) > SWIPE_THRESHOLD) goTo(index + (dx < 0 ? 1 : -1));
        }
        setTimeout(() => setPaused(false), 4000);
      }}
    >
      <div className="relative mx-auto grid max-w-5xl place-items-center overflow-hidden px-4 py-6 sm:px-14">
        {items.map((item, i) => {
          // Signed circular distance from the centred card: negative = left.
          let off = (i - index + count) % count;
          if (off > count / 2) off -= count;
          const abs = Math.abs(off);
          const pose = poses[abs] ?? HIDDEN;
          const centred = off === 0;
          return (
            <div
              key={i}
              className={`${slideClassName} relative [grid-area:1/1] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none`}
              style={{
                transform: `translateX(${(off < 0 ? -1 : 1) * pose.x}%) scale(${pose.scale})`,
                opacity: abs <= maxVisible ? pose.opacity : 0,
                zIndex: 20 - abs,
              }}
            >
              <div inert={!centred}>{item}</div>
              {!centred && abs <= maxVisible && (
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show slide ${i + 1}`}
                  className="absolute inset-0 z-10 cursor-pointer"
                />
              )}
            </div>
          );
        })}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous"
              className="absolute left-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 text-neutral-500 dark:text-neutral-400 backdrop-blur transition-colors hover:border-amber-500/50 hover:text-amber-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next"
              className="absolute right-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 text-neutral-500 dark:text-neutral-400 backdrop-blur transition-colors hover:border-amber-500/50 hover:text-amber-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
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
  );
}
