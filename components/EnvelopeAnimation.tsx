'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useBackgroundMusic } from './BackgroundMusic';
import SaveTheDateReveal from './SaveTheDateReveal';

const envelopeVariants = {
  closed: {
    y: 0
  },
  open: {
    y: -12
  }
};

export default function EnvelopeAnimation() {
  const [isOpen, setIsOpen] = useState(false);
  const { startFromInteraction, playSparkle } = useBackgroundMusic();

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        id: index,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 60}%`,
        delay: Math.random() * 0.8
      })),
    []
  );

  const handleOpen = async () => {
    if (isOpen) return;
    setIsOpen(true);
    await startFromInteraction();
    playSparkle();
  };

  return (
    <div className="relative mt-8 flex w-full flex-col items-center">
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-10 h-96 rounded-[48px] warm-overlay opacity-0"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-6 h-80 rounded-[48px] bg-sage/30 blur-[80px] opacity-0"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-8 flex h-64 items-end justify-center gap-6 opacity-0"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        {['left', 'center', 'right'].map((key, index) => (
          <span
            key={key}
            className="h-8 w-8 rounded-full bg-softGold/60 blur-xl animate-candle-flicker"
            style={{ animationDelay: `${index * 0.6}s` }}
          />
        ))}
      </motion.div>

      <motion.button
        type="button"
        onClick={handleOpen}
        className="relative w-full max-w-[520px] cursor-pointer"
        aria-label="Open invitation envelope"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={envelopeVariants}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative h-60 w-full [perspective:1200px]">
          <div className="absolute inset-x-12 bottom-1 h-5 rounded-full bg-cocoa/15 blur-2xl" />
          <div className="absolute inset-0 z-10 overflow-hidden rounded-[30px] border border-softGold/45 shadow-[0_22px_50px_rgba(47,28,31,0.18)]">
            <div className="absolute inset-0 bg-gradient-to-b from-sage/30 via-sage/40 to-sage/50" />
            <div className="absolute inset-3 rounded-[24px] border border-white/30" />
            <div className="absolute inset-x-14 top-[58px] h-px bg-softGold/35" />
            <div className="absolute inset-x-10 bottom-10 h-px bg-softGold/20" />

            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-28 rounded-t-[30px] bg-gradient-to-b from-ivory/95 via-sage/20 to-sage/30 shadow-[0_10px_20px_rgba(47,28,31,0.18)]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformOrigin: 'top',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              animate={{ rotateX: isOpen ? -155 : 0, y: isOpen ? -8 : 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <motion.div
            className="absolute left-1/2 top-4 z-40 w-[82%] -translate-x-1/2 rounded-[26px] border border-softGold/30 bg-ivory/95 px-6 py-8 text-center shadow-xl"
            initial={{ y: 46, opacity: 0 }}
            animate={{ y: isOpen ? -40 : 46, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <SaveTheDateReveal reveal={isOpen} />
          </motion.div>

          <div className="absolute left-1/2 top-[104px] z-50 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-softGold/60 text-[10px] tracking-[0.2em] text-ivory shadow-[0_10px_18px_rgba(47,28,31,0.2)]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#8a3c4d_0%,#7a3142_60%,#5a1f30_100%)]" />
            <div className="absolute inset-[2px] rounded-full border border-white/10" />
            <div className="absolute left-[28%] top-[22%] h-2 w-2 rounded-full bg-white/15 blur-[1px]" />
            <div className="absolute right-[18%] bottom-[16%] h-2 w-2 rounded-full bg-black/12 blur-[2px]" />
            <span className="relative handwriting text-sm text-ivory/85">A & J</span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute h-2 w-2 rounded-full bg-softGold/70"
                style={{ left: particle.left, top: particle.top }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.4],
                  opacity: [0, 0.9, 0],
                  y: [-10, -40]
                }}
                transition={{ duration: 2, delay: particle.delay, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-5 text-center text-sm uppercase tracking-[0.32em] text-burgundy/60">
        Tap to unveil our love story
      </p>
    </div>
  );
}
