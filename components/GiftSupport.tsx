"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const qrItems = [
  {
    title: "GCash",
    detail: "For those who wish to support",
    image: "/images/qr-gcash.jpg",
  },
  {
    title: "BPI (Al Pandis)",
    detail: "Bank transfer QR",
    image: "/images/qr-bpi-al.jpg",
  },
  {
    title: "BPI (Joan)",
    detail: "Bank transfer QR",
    image: "/images/qr-bpi-joan.jpg",
  },
];

export default function GiftSupport() {
  const [active, setActive] = useState<{ title: string; image: string } | null>(
    null,
  );

  return (
    <section className="border-t border-sage/30 bg-sage/10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">
            Gift & Support
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-burgundy sm:text-4xl">
            A Gentle Option
          </h2>
          <p className="mt-4 text-base text-burgundy/70 sm:text-lg">
            Your presence is the greatest gift. For those who wish to support
            our new beginning, the QR codes below are available.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {qrItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="lux-card rounded-[32px] bg-ivory/90 p-5 text-center shadow-candle-soft"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 text-sm uppercase tracking-[0.25em] text-burgundy/70">
                {item.title}
              </div>
              <button
                type="button"
                onClick={() => setActive({ title: item.title, image: item.image })}
                className="relative mx-auto block h-72 w-72 overflow-hidden rounded-[24px] border border-softGold/40 bg-white/80 transition hover:shadow-gold-glow"
                aria-label={`Open ${item.title} QR code`}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} QR`}
                  fill
                  sizes="288px"
                  className="object-contain p-5"
                />
              </button>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-burgundy/60">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-burgundy/60">
          Support is optional and never expected.
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/50 px-6 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-xl rounded-[28px] border border-softGold/50 bg-ivory/95 p-6 shadow-gold-soft"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full border border-softGold/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-burgundy/70"
              >
                Close
              </button>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-burgundy/60">
                  {active.title}
                </p>
                <div
                  className={`relative mx-auto mt-4 overflow-hidden rounded-[24px] border border-softGold/40 bg-white/90 ${
                    active.title === "GCash" ? "h-96 w-96" : "h-80 w-80"
                  }`}
                >
                  <Image
                    src={active.image}
                    alt={`${active.title} QR`}
                    fill
                    sizes={active.title === "GCash" ? "384px" : "320px"}
                    className="object-contain p-6"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-burgundy/60">
                  Tap outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
