'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export interface MarqueeItem {
  label: string;
  // Omit for a brand with no current stock/filter support — linking it would
  // silently fall through to "all phones" instead of an honest empty state,
  // the same dead-filter bug already fixed elsewhere on this site.
  href?: string;
}

export default function Marquee({ items }: { items: MarqueeItem[] }) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white dark:from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white dark:from-neutral-950 to-transparent" />
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, i) =>
          item.href ? (
            <Link
              key={i}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300"
            >
              {item.label}
            </span>
          )
        )}
      </motion.div>
    </div>
  );
}
