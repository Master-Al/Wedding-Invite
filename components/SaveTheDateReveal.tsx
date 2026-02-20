'use client';

import { motion } from 'framer-motion';

export default function SaveTheDateReveal({ reveal }: { reveal: boolean }) {
  return (
    <div className="space-y-3">
      <motion.span
        className="handwriting block text-3xl text-burgundy sm:text-4xl"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: reveal ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
        transition={{ duration: 1.6, delay: 0.2, ease: 'easeInOut' }}
      >
        Save the Date
      </motion.span>
      <motion.span
        className="block text-sm uppercase tracking-[0.4em] text-burgundy/70"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 8 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        04.28.2026
      </motion.span>
      <motion.span
        className="block text-lg font-semibold tracking-[0.2em] text-burgundy"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 8 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        AL + JOAN
      </motion.span>
    </div>
  );
}
