"use client";

import { motion } from "framer-motion";

const details = [
  {
    title: "Location",
    time: "Kamura Fusion Resto Novaliches",
    description:
      "Novaliches, #6 Zabarte Rd, Metro Manila, Quezon City, Philippines 1124",
  },
  {
    title: "Date",
    time: "April 28, 2026",
    description: "An intimate restaurant celebration",
  },
  {
    title: "Time",
    time: "2:00 PM - 6:00 PM",
    description: "Candlelit reception and dinner service",
  },
];

export default function WeddingDetails() {
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Kamura%20Fusion%20Resto%2C%20%236%20Zabarte%20Rd%2C%20Novaliches%2C%20Quezon%20City%2C%20Philippines%201124';

  return (
    <section className="relative border-t border-sage/30 bg-gradient-to-b from-sage/20 via-ivory/80 to-ivory px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-10 h-32 w-32 rounded-full bg-softGold/25 blur-[80px]" />
        <div className="absolute right-16 top-24 h-36 w-36 rounded-full bg-champagne/60 blur-[90px]" />
        <div className="absolute bottom-16 left-1/3 h-40 w-40 rounded-full bg-softGold/20 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">
            Details
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-burgundy sm:text-4xl">
            The Celebration
          </h2>
          <motion.div
            className="mx-auto mt-4 h-px w-24 bg-gold/80"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "center" }}
          />
          <p className="mt-4 text-base text-burgundy/70 sm:text-lg">
            Join us for an intimate day of elegance, romance, and candlelight.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              className="lux-card rounded-[32px] bg-sage/25 px-6 py-8 text-center shadow-candle-soft"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-burgundy/60">
                {detail.title}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-burgundy">
                {detail.time}
              </h3>
              <p className="mt-2 text-sm text-burgundy/70">
                {detail.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/70 bg-burgundy px-8 py-3 text-sm uppercase tracking-[0.3em] text-ivory shadow-candle-soft transition hover:shadow-gold-glow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get Directions
          </motion.a>
        </div>
      </div>
    </section>
  );
}
