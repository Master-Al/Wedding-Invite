'use client';

import { motion } from 'framer-motion';
import { useBackgroundMusic } from './BackgroundMusic';

const SpeakerOnIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path
      fill="currentColor"
      d="M4 10v4h4l5 5V5L8 10H4zm11.5 2a4.5 4.5 0 0 0-1.7-3.5v7A4.5 4.5 0 0 0 15.5 12zm2.5 0a7 7 0 0 0-3.1-5.8v11.6A7 7 0 0 0 18 12z"
    />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path
      fill="currentColor"
      d="M4 10v4h4l5 5V5L8 10H4zm11.3 2.7 2 2 1.4-1.4-2-2 2-2-1.4-1.4-2 2-2-2-1.4 1.4 2 2-2 2 1.4 1.4 2-2z"
    />
  </svg>
);

export default function MusicToggleButton() {
  const { isMuted, isPlaying, toggleMute } = useBackgroundMusic();
  const isActive = isPlaying && !isMuted;

  return (
    <motion.button
      type="button"
      onClick={toggleMute}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-softGold/70 bg-ivory/80 text-burgundy shadow-gold-glow backdrop-blur-md transition"
      aria-label={isActive ? 'Mute music' : 'Play music'}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full border border-softGold/40 animate-pulse-gold" />
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80">
        {isActive ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      </span>
    </motion.button>
  );
}
