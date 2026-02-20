'use client';

import { useEffect, useMemo, useState } from 'react';

const targetDate = new Date('2026-04-28T16:30:00');

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

const calculateCountdown = (): Countdown => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isComplete: false
  };
};

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCountdown(calculateCountdown());
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = useMemo(() => {
    if (!countdown) {
      return [
        { label: 'Days', value: '--' },
        { label: 'Hours', value: '--' },
        { label: 'Minutes', value: '--' },
        { label: 'Seconds', value: '--' }
      ];
    }

    return [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds }
    ];
  }, [countdown]);

  return (
    <section className="relative border-t border-sage/30 bg-gradient-to-b from-ivory via-sage/10 to-ivory px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-12 h-28 w-28 rounded-full bg-champagne/50 blur-[90px]" />
        <div className="absolute right-12 bottom-12 h-32 w-32 rounded-full bg-softGold/25 blur-[90px]" />
      </div>
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">Countdown</p>
        <h2 className="mt-4 text-3xl font-semibold text-burgundy sm:text-4xl">Until We Say I Do</h2>
        <p className="mt-4 text-base text-burgundy/70 sm:text-lg">
          {isMounted && countdown?.isComplete
            ? 'The celebration has begun.'
            : 'The moment is almost here. Every second brings us closer.'}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-4">
          {units.map((unit) => (
            <div key={unit.label} className="lux-card rounded-[28px] bg-sage/25 px-4 py-6 shadow-candle-soft">
              <div className="text-3xl font-semibold text-burgundy sm:text-4xl">
                {typeof unit.value === 'number'
                  ? unit.value.toString().padStart(2, '0')
                  : unit.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-burgundy/60">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
