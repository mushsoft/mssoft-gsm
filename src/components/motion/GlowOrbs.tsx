'use client';

import { motion } from 'framer-motion';

export default function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[-4rem] left-1/3 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
}
