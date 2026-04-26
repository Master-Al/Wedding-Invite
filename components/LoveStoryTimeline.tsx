"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useBackgroundMusic } from "./BackgroundMusic";

type Story = {
  id: string;
  title: string;
  year: string;
  paragraphs: string[];
  image: string;
  zoom: number;
  objectPosition?: string;
  glow?: boolean;
  sparkle?: boolean;
  underlineFinal?: boolean;
};

const stories: Story[] = [
  {
    id: "greeting",
    title: "A Simple Greeting",
    year: "Where It All Began",
    paragraphs: [
      'It all began with a simple message from Al: "Merry Christmas. May God bless you always." What seemed like a small greeting quietly opened the first page of their story.',
      "Sometime later, they found a reason to speak again. Al had first thought of introducing Joan to a friend who needed someone to talk to after seeing her on his newsfeed, but life had a gentler plan. Instead, it was Al and Joan who slowly formed a meaningful connection.",
      "Casual conversations became warmer with time. On Joan's birthday, a greeting turned into a longer exchange and eventually into an invitation to her home to celebrate.",
      "Al never forgot that birthday - three sticks of barbecue, a little rice, and not even a glass of water. Somehow, that lighthearted memory became one of the small details that made their beginning unforgettable.",
      "As the days passed, they discovered how much they shared: a love for coffee, mobile games, and the quiet joy of simply understanding one another.",
    ],
    image: "/images/greeetings.jpg",
    zoom: 1.08,
  },
  {
    id: "yes",
    title: "The Sweet Yes",
    year: "December 28, 2020",
    paragraphs: [
      "As weeks turned into months, Al began courting Joan, and their connection grew deeper with every conversation.",
      'There came a moment when he thought the day might end in disappointment. While they were eating at Wendy\'s on December 28, 2020, Joan suddenly said, "Stop courting me."',
      "For a brief second, confusion filled the moment - until Joan followed it with the words that changed everything: \"Let's be together. You can stop courting me - I'm saying yes to you.\"",
      "Uncertainty turned into overwhelming joy. Al immediately shared the beautiful news with his close friends Ace, Harry, and Jude.",
      "Days passed, then months, then years, and through it all their relationship remained strong.",
    ],
    image: "/images/1stdate.jpg",
    zoom: 1.06,
  },
  {
    id: "proposal",
    title: "The Promise of Forever",
    year: "Dingalan, December 28, 2023",
    paragraphs: [
      "By 2023, Al knew with greater clarity what his heart had long been telling him: he was ready for a future with Joan and did not want to lose her.",
      "A simple trip to the mall with a friend led him to a ring. Soon after, he told his parents that he wanted to marry Joan, and they gave their full support. He then went to Joan's home to honor her parents with news of the proposal he was planning in Dingalan.",
      "Later that same year, Al and Joan traveled to Dingalan to celebrate their third anniversary. There, Al knelt and expressed the sincerity of his love, asking Joan to spend forever with him.",
      "It became one of the most unforgettable and beautiful moments of their journey together.",
    ],
    image: "/images/proposal.png",
    zoom: 1.05,
    glow: true,
    sparkle: true,
  },
  {
    id: "promise",
    title: "Stronger Through It All",
    year: "April 28, 2026",
    paragraphs: [
      "They began planning their wedding, but the road ahead was not without challenges. Again and again, it seemed as though something was trying to stand in the way of the life they were building together.",
      "Still, Al and Joan did not give up. They worked hard for their wedding, pushed through every obstacle, and held on with faith until the right time finally came.",
      "No matter how many times their love was tested, they never let go of each other.",
      "And now, here they are - Al and Joan - ready to become one on April 28, 2026, a Tuesday.",
      "What began with a simple greeting has led them to forever.",
    ],
    image: "/images/final.jpg",
    zoom: 1.04,
    objectPosition: "center 35%",
    underlineFinal: true,
  },
];

function StoryCard({
  story,
  index,
  isLast,
  onProposalEnter,
}: {
  story: Story;
  index: number;
  isLast: boolean;
  onProposalEnter: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.9 1", "0.2 0.4"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, story.zoom]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="lux-card menu-frame grid items-center gap-6 rounded-[40px] bg-sage/30 p-8 shadow-candle-soft md:grid-cols-[1.1fr,1.4fr]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.35 }}
        onViewportEnter={() => {
          if (story.id === "proposal") {
            onProposalEnter();
          }
        }}
      >
        <div className="relative h-56 w-full overflow-hidden rounded-[32px] border border-softGold/40 bg-ivory/70 p-2">
          {story.glow && (
            <motion.div
              className="absolute inset-0 rounded-[28px] bg-gold/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          )}
          <motion.div
            className="relative h-full w-full overflow-hidden rounded-[24px]"
            style={{ y: imageY, scale: imageScale }}
          >
            <Image
              src={story.image}
              alt={story.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              style={{ objectPosition: story.objectPosition ?? "center" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-champagne/25 mix-blend-soft-light" />
          </motion.div>
          {story.sparkle && (
            <div className="pointer-events-none absolute inset-0">
              {["20%", "68%", "52%"].map((left, sparkleIndex) => (
                <motion.span
                  key={left}
                  className="absolute top-[35%] h-2 w-2 rounded-full bg-softGold/80"
                  style={{ left }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0.4] }}
                  transition={{
                    duration: 2.4,
                    delay: sparkleIndex * 0.4,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-burgundy/60">
              {story.year}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-burgundy">
              {story.title}
            </h3>
          </div>
          <motion.div
            className="h-px w-20 bg-gold/70"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          />
          <div className="space-y-4 text-base text-burgundy/75">
            {story.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${story.id}-${paragraphIndex}`}>{paragraph}</p>
            ))}
          </div>
          {story.underlineFinal && (
            <motion.div
              className="h-px w-40 bg-gold/80"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </motion.div>
      </motion.div>

      {!isLast && (
        <motion.div
          className="mx-auto my-10 h-px w-4/5 bg-gold/40"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "center" }}
        />
      )}
    </div>
  );
}

export default function LoveStoryTimeline() {
  const { playSparkle } = useBackgroundMusic();
  const hasPlayed = useRef(false);

  const floatingLights = [
    { left: "8%", top: "18%", size: "h-24 w-24", opacity: "0.4" },
    { left: "70%", top: "12%", size: "h-20 w-20", opacity: "0.3" },
    { left: "18%", top: "62%", size: "h-32 w-32", opacity: "0.35" },
    { left: "78%", top: "68%", size: "h-28 w-28", opacity: "0.25" },
  ];

  return (
    <section className="relative border-t border-sage/30 bg-sage/10 px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        {floatingLights.map((light, index) => (
          <span
            key={`light-${index}`}
            className={`absolute rounded-full bokeh ${light.size}`}
            style={{ left: light.left, top: light.top, opacity: light.opacity }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">
            Our Story
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-burgundy sm:text-4xl">
            This Is Our Love Story
          </h2>
          <p className="mt-4 text-base text-burgundy/70 sm:text-lg text-balance">
            From a simple Christmas greeting to the promise of forever, each
            chapter has been shaped by faith, laughter, and steadfast love.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gold/40 md:block" />
          <div className="grid gap-4">
            {stories.map((story, index) => (
              <div key={story.id} className="relative md:pl-16">
                <span className="absolute left-4 top-10 hidden h-3 w-3 rounded-full border border-gold/70 bg-ivory md:block" />
                <StoryCard
                  story={story}
                  index={index}
                  isLast={index === stories.length - 1}
                  onProposalEnter={() => {
                    if (!hasPlayed.current) {
                      playSparkle();
                      hasPlayed.current = true;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
