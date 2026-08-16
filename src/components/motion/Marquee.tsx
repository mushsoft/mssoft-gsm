'use client';

import { motion } from 'framer-motion';

export default function Marquee({ items }: { items: string[] }) {
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
        {loop.map((item, i) => (
          <span
            key={i}
            className="text-xs font-bold uppercase tracking-widest text-neutral-500"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
