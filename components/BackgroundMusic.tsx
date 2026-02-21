"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MusicToggleButton from "./MusicToggleButton";

const AUDIO_SRC = "/music/dumaloy.mp3";
const STORAGE_MUTED = "music-muted";
const STORAGE_HAS_MUTED = "music-has-muted";
const TARGET_VOLUME = 0.1;

export type MusicContextValue = {
  isPlaying: boolean;
  isMuted: boolean;
  startFromInteraction: () => Promise<void>;
  toggleMute: () => void;
  playChime: () => void;
  playSparkle: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export const useBackgroundMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useBackgroundMusic must be used within BackgroundMusic");
  }
  return context;
};

export function BackgroundMusic({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const fadeTimeout = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserMuted, setHasUserMuted] = useState(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const storedMuted = window.localStorage.getItem(STORAGE_MUTED);
    const storedHasMuted = window.localStorage.getItem(STORAGE_HAS_MUTED);

    if (storedMuted !== null) {
      setIsMuted(storedMuted === "true");
    }
    if (storedHasMuted === "true") {
      setHasUserMuted(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_MUTED, String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    if (hasUserMuted) {
      window.localStorage.setItem(STORAGE_HAS_MUTED, "true");
    }
  }, [hasUserMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0;
    }
  }, []);

  const cancelFade = useCallback(() => {
    if (fadeFrame.current) {
      cancelAnimationFrame(fadeFrame.current);
      fadeFrame.current = null;
    }
    if (fadeTimeout.current) {
      window.clearTimeout(fadeTimeout.current);
      fadeTimeout.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (target: number, duration: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      const startVolume = audio.volume;
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextVolume = startVolume + (target - startVolume) * eased;
        audio.volume = Math.min(1, Math.max(0, nextVolume));
        if (progress < 1) {
          fadeFrame.current = requestAnimationFrame(step);
        }
      };

      fadeFrame.current = requestAnimationFrame(step);
    },
    [cancelFade],
  );

  const fadeOut = useCallback(
    (duration = 1800, pauseAfter = true) => {
      const audio = audioRef.current;
      if (!audio) return;

      fadeTo(0, duration);
      if (pauseAfter) {
        fadeTimeout.current = window.setTimeout(() => {
          audio.pause();
          setIsPlaying(false);
        }, duration + 50);
      }
    },
    [fadeTo],
  );

  const fadeIn = useCallback(
    async (duration = 3200) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      audio.volume = 0;
      try {
        await audio.play();
        setIsPlaying(true);
        fadeTo(TARGET_VOLUME, duration);
      } catch (error) {
        setIsPlaying(false);
      }
    },
    [cancelFade, fadeTo],
  );

  const ensureAudioContext = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!audioContextRef.current) {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioContextConstructor) {
        audioContextRef.current = new AudioContextConstructor();
      }
    }

    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      try {
        await audioContextRef.current.resume();
      } catch (error) {
        return;
      }
    }
  }, []);

  const startFromInteraction = useCallback(async () => {
    hasInteracted.current = true;
    await ensureAudioContext();

    const storedHasMuted =
      window.localStorage.getItem(STORAGE_HAS_MUTED) === "true";
    if (hasUserMuted || storedHasMuted) return;

    if (!isPlaying) {
      setIsMuted(false);
      await fadeIn();
    }
  }, [ensureAudioContext, fadeIn, hasUserMuted, isPlaying]);

  const toggleMute = useCallback(() => {
    hasInteracted.current = true;
    void ensureAudioContext();
    if (isMuted) {
      setIsMuted(false);
      fadeIn();
    } else {
      setIsMuted(true);
      setHasUserMuted(true);
      fadeOut();
    }
  }, [ensureAudioContext, fadeIn, fadeOut, isMuted]);

  const playTone = useCallback((frequencies: number[], duration = 1.2) => {
    if (!hasInteracted.current || !audioContextRef.current) return;
    const context = audioContextRef.current;
    const now = context.currentTime;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    gain.connect(context.destination);

    frequencies.forEach((freq, index) => {
      const osc = context.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.06);
      osc.connect(gain);
      osc.start(now + index * 0.06);
      osc.stop(now + duration);
    });
  }, []);

  const playChime = useCallback(() => {
    playTone([523.25, 659.25, 783.99], 1.4);
  }, [playTone]);

  const playSparkle = useCallback(() => {
    playTone([783.99, 932.33, 1174.66], 0.9);
  }, [playTone]);

  useEffect(() => {
    const handlePageHide = () => {
      if (isPlaying) {
        fadeOut(1200, true);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        fadeOut(800, true);
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fadeOut, isPlaying]);

  const contextValue = useMemo(
    () => ({
      isPlaying,
      isMuted,
      startFromInteraction,
      toggleMute,
      playChime,
      playSparkle,
    }),
    [
      isPlaying,
      isMuted,
      playChime,
      playSparkle,
      startFromInteraction,
      toggleMute,
    ],
  );

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      />
      <MusicToggleButton />
    </MusicContext.Provider>
  );
}
