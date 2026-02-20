'use client';

import { motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from 'react';
import { useBackgroundMusic } from './BackgroundMusic';

export default function RSVPForm() {
  const { playChime } = useBackgroundMusic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      attendance: String(formData.get('attendance') ?? ''),
      message: String(formData.get('message') ?? '')
    };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP.');
      }

      setIsSubmitted(true);
      form.reset();
      playChime();
    } catch (submitError) {
      setError('We could not submit your RSVP right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = window.setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [isSubmitted]);

  return (
    <section className="relative border-t border-sage/30 bg-gradient-to-b from-ivory via-sage/10 to-ivory px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-16 h-28 w-28 rounded-full bg-softGold/20 blur-[90px]" />
        <div className="absolute right-12 top-8 h-32 w-32 rounded-full bg-champagne/50 blur-[100px]" />
        <div className="absolute bottom-10 left-1/2 h-36 w-36 rounded-full bg-softGold/15 blur-[110px]" />
      </div>
      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">RSVP</p>
          <h2 className="mt-4 text-3xl font-semibold text-burgundy sm:text-4xl">Reserve Your Place</h2>
          <p className="mt-4 text-base text-burgundy/70 sm:text-lg">
            Your presence would mean the world. Kindly respond by March 15, 2026.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="lux-card relative mt-12 grid gap-6 rounded-[40px] bg-sage/30 p-8 shadow-candle-soft"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-burgundy/70">
              Full Name
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="rounded-2xl border border-softGold/40 bg-ivory/80 px-4 py-3 text-base text-cocoa shadow-sm focus:border-gold focus:outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-burgundy/70">
              Email Address
              <input
                required
                name="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-2xl border border-softGold/40 bg-ivory/80 px-4 py-3 text-base text-cocoa shadow-sm focus:border-gold focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2 text-sm text-burgundy/70">
              Will you attend?
              <select
                name="attendance"
                className="rounded-2xl border border-softGold/40 bg-ivory/80 px-4 py-3 text-base text-cocoa shadow-sm focus:border-gold focus:outline-none"
                defaultValue="joyfully"
              >
                <option value="joyfully">Joyfully accept</option>
                <option value="regretfully">Regretfully decline</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm text-burgundy/70">
            Message for the couple
            <textarea
              name="message"
              rows={4}
              placeholder="Share a memory, a toast, or a wish"
              className="rounded-2xl border border-softGold/40 bg-ivory/80 px-4 py-3 text-base text-cocoa shadow-sm focus:border-gold focus:outline-none"
            />
          </label>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-burgundy/60">
              We cannot wait to celebrate with you.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full border border-gold/60 bg-burgundy px-8 py-3 text-sm uppercase tracking-[0.3em] text-ivory shadow-candle-soft transition hover:bg-burgundy/90 hover:shadow-gold-glow"
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </div>

          {error && (
            <div className="rounded-2xl border border-softGold/40 bg-ivory/90 px-6 py-4 text-center text-sm text-burgundy/80">
              {error}
            </div>
          )}

          {isSubmitted && (
            <div className="absolute inset-4 flex flex-col items-center justify-center gap-3 rounded-[32px] border border-softGold/60 bg-burgundy/80 px-6 text-center text-sm text-ivory shadow-gold-glow">
              <p>Thank you for celebrating our love in this special place.</p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="rounded-full border border-ivory/70 px-5 py-2 text-xs uppercase tracking-[0.25em] text-ivory transition hover:bg-ivory/10"
              >
                Submit Another RSVP
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
