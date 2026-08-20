'use client';

import { motion, type Variants } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative mx-auto max-w-2xl text-center"
    >
      <motion.div
        variants={item}
        className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-500"
      >
        <Sparkles className="h-3 w-3" />
        Trusted by Technicians Across Kampala
      </motion.div>

      <motion.h1 variants={item} className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        The Parts Technicians Actually{' '}
        <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
          Trust
        </span>
      </motion.h1>

      <motion.p variants={item} className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
        Genuine screens, batteries, testpoint diagrams &amp; flashing tools &mdash; verified stock,
        fast delivery, real WhatsApp support.
      </motion.p>

      <motion.form
        variants={item}
        action="/shop"
        method="GET"
        className="mx-auto mt-6 flex max-w-lg items-stretch"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-neutral-500" />
          <input
            type="text"
            name="search"
            placeholder="Search model, brand, or part..."
            className="w-full rounded-l-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 py-3 pl-10 pr-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition-shadow focus:border-amber-500/50 focus:shadow-[0_0_0_4px_rgba(245,158,11,0.15)]"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="rounded-r-xl bg-amber-500 px-5 text-sm font-bold text-black transition-colors hover:bg-amber-400"
        >
          Search
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
