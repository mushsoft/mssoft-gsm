'use client';

import { motion, type Variants } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// Own (faster) stagger for the headline's words, nested inside `container`
// above — a word-by-word reveal reads livelier than fading the whole line
// in as one block.
const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const HEADLINE_WORDS = ['Phones', '&', 'Parts', 'You', 'Can', 'Actually'];

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
        className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-500"
      >
        <motion.span
          className="inline-flex"
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
        >
          <Sparkles className="h-3 w-3" />
        </motion.span>
        Kampala&apos;s Trusted Phone &amp; Repair Shop
      </motion.div>

      <motion.h1
        variants={wordContainer}
        className="flex flex-wrap items-baseline justify-center gap-x-2 text-3xl font-black leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-4xl"
      >
        {HEADLINE_WORDS.map((w, i) => (
          <motion.span key={i} variants={word}>
            {w}
          </motion.span>
        ))}
        <motion.span
          variants={word}
          className="relative inline-block bg-clip-text text-transparent bg-size-[200%_100%] animate-[text-shimmer_3s_ease-in-out_infinite]"
          style={{ backgroundImage: 'linear-gradient(110deg, #f59e0b 20%, #fde68a 50%, #f59e0b 80%)' }}
        >
          Trust
        </motion.span>
      </motion.h1>

      <motion.p variants={item} className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
        Brand new &amp; UK used phones, genuine screens, batteries &amp; repair tools &mdash; verified
        stock, fast delivery, real WhatsApp support.
      </motion.p>

      <motion.form
        variants={item}
        action="/shop"
        method="GET"
        className="mx-auto mt-5 flex max-w-lg items-stretch"
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
