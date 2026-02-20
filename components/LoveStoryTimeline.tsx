'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useBackgroundMusic } from './BackgroundMusic';

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
    id: 'beginning',
    title: 'Our Beautiful Beginning',
    year: 'December 28, 2020',
    paragraphs: [
      'December 28, 2020 - the day she finally answered me \"Yes\" after a long season of courtship.',
      'That year was filled with patience, hope, and heartfelt prayers. When she said yes, it was not just the start of a relationship - it was the beginning of shared dreams.',
      'From that day on, we began building goals together, supporting each other\'s ambitions, and choosing to enjoy every simple moment of life side by side.'
    ],
    image: '/images/1stdate.jpg',
    zoom: 1.08
  },
  {
    id: 'proposal',
    title: 'The Day I Asked Forever',
    year: 'December 28',
    paragraphs: [
      'One morning, I (AL) realized with certainty that I wanted Joan to be part of my life forever.',
      'I wanted to build a family with her, grow old with her, and create a future together.',
      'On December 28, I asked her to marry me - and that night became one of the most unforgettable and beautiful moments of our lives.'
    ],
    image: '/images/proposal.png',
    zoom: 1.05,
    glow: true,
    sparkle: true
  },
  {
    id: 'promise',
    title: 'Stronger Together',
    year: 'Our Prenup & Promise',
    paragraphs: [
      'This is our prenup - a reflection of our love and commitment.',
      'We have faced challenges along the way, but we chose to fight for our love. We pushed forward toward this wedding day with faith and determination.',
      'We decided to face the future and its challenges together.',
      'We are stronger when we are together.',
      'We comfort each other in difficult times, and we celebrate together in our victories.'
    ],
    image: '/images/final.jpg',
    zoom: 1.04,
    objectPosition: 'center 35%',
    underlineFinal: true
  }
];

function StoryCard({
  story,
  index,
  isLast,
  onProposalEnter
}: {
  story: Story;
  index: number;
  isLast: boolean;
  onProposalEnter: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0.9 1', '0.2 0.4']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-6%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, story.zoom]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="lux-card menu-frame grid items-center gap-6 rounded-[40px] bg-sage/30 p-8 shadow-candle-soft md:grid-cols-[1.1fr,1.4fr]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.35 }}
        onViewportEnter={() => {
          if (story.id === 'proposal') {
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
              transition={{ duration: 1.4, ease: 'easeOut' }}
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
              style={{ objectPosition: story.objectPosition ?? 'center' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-champagne/25 mix-blend-soft-light" />
          </motion.div>
          {story.sparkle && (
            <div className="pointer-events-none absolute inset-0">
              {['20%', '68%', '52%'].map((left, sparkleIndex) => (
                <motion.span
                  key={left}
                  className="absolute top-[35%] h-2 w-2 rounded-full bg-softGold/80"
                  style={{ left }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0.4] }}
                  transition={{ duration: 2.4, delay: sparkleIndex * 0.4, repeat: Infinity, repeatDelay: 2 }}
                />
              ))}
            </div>
          )}
        </div>
        <motion.div style={{ y: textY, opacity: textOpacity }} className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-burgundy/60">{story.year}</p>
            <h3 className="mt-3 text-2xl font-semibold text-burgundy">{story.title}</h3>
          </div>
          <motion.div
            className="h-px w-20 bg-gold/70"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'left' }}
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
              style={{ transformOrigin: 'left' }}
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
          style={{ transformOrigin: 'center' }}
        />
      )}
    </div>
  );
}

export default function LoveStoryTimeline() {
  const { playSparkle } = useBackgroundMusic();
  const hasPlayed = useRef(false);

  const floatingLights = [
    { left: '8%', top: '18%', size: 'h-24 w-24', opacity: '0.4' },
    { left: '70%', top: '12%', size: 'h-20 w-20', opacity: '0.3' },
    { left: '18%', top: '62%', size: 'h-32 w-32', opacity: '0.35' },
    { left: '78%', top: '68%', size: 'h-28 w-28', opacity: '0.25' }
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
          <p className="lux-heading text-xs tracking-[0.4em] text-burgundy/70">Our Story</p>
          <h2 className="mt-4 text-3xl font-semibold text-burgundy sm:text-4xl">A Love Letter in Three Acts</h2>
          <p className="mt-4 text-base text-burgundy/70 sm:text-lg text-balance">
            Each chapter unfolds like a romantic short film, illuminated by candlelight and devotion.
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
