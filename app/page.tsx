import Image from "next/image";
import EnvelopeAnimation from "../components/EnvelopeAnimation";
import WeddingDetails from "../components/WeddingDetails";
import LoveStoryTimeline from "../components/LoveStoryTimeline";
import RSVPForm from "../components/RSVPForm";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const petals = [
    { left: "12%", top: "8%", delay: "0s", duration: "10s", size: "h-3 w-3" },
    { left: "28%", top: "18%", delay: "1s", duration: "12s", size: "h-2 w-2" },
    { left: "54%", top: "6%", delay: "2s", duration: "11s", size: "h-3 w-3" },
    { left: "70%", top: "14%", delay: "0.6s", duration: "9s", size: "h-2 w-2" },
    { left: "84%", top: "4%", delay: "1.4s", duration: "13s", size: "h-3 w-3" },
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 warm-overlay opacity-70" />
        <div className="absolute inset-0 dining-texture opacity-30" />
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-sage/30 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-champagne/50 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-softGold/20 blur-[180px]" />

        <div className="absolute left-20 top-10 h-24 w-24 rounded-full bokeh opacity-80" />
        <div className="absolute right-28 top-24 h-32 w-32 rounded-full bokeh opacity-70" />
        <div className="absolute left-1/3 top-1/2 h-40 w-40 rounded-full bokeh opacity-50" />
        <div className="absolute right-10 bottom-20 h-28 w-28 rounded-full bokeh opacity-60" />

        {petals.map((petal, index) => (
          <span
            key={index}
            className={`absolute rounded-full bg-burgundy/50 ${petal.size} animate-petal-float`}
            style={{
              left: petal.left,
              top: petal.top,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
            }}
          />
        ))}
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="lux-card menu-frame w-full max-w-5xl rounded-[48px] border border-softGold/40 bg-ivory/70 px-6 py-12 shadow-gold-soft sm:px-12">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-softGold/40 bg-ivory/80 shadow-gold-soft sm:h-32 sm:w-32">
              <Image
                src="/images/wedding-logo.png"
                alt="Al & Joan wedding logo"
                width={256}
                height={256}
                className="object-contain"
                priority
              />
            </div>
            <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">
              A celebration of love
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-burgundy sm:text-6xl">
              Al & Joan
            </h1>
            <p className="mt-4 text-base text-burgundy/70 sm:text-lg">
              A candlelit restaurant celebration awaits. Tap the envelope to
              begin.
            </p>
          </div>

          <EnvelopeAnimation />
        </div>
      </section>

      <WeddingDetails />
      <CountdownTimer />
      <LoveStoryTimeline />
      <RSVPForm />

      <footer className="pb-20 pt-10 text-center text-xs uppercase tracking-[0.3em] text-burgundy/60">
        Crafted with devotion for our family and friends
      </footer>
    </main>
  );
}
