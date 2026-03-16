"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-[24px] border border-softGold/40 bg-white/80">
                <Image
                  src={item.image}
                  alt={`${item.title} QR`}
                  fill
                  sizes="224px"
                  className="object-contain p-4"
                />
              </div>
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
    </section>
  );
}
