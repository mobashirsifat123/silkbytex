'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';

type HeroContent = {
  heroEyebrow?: string | null;
  heroRotatingWords?: string | null;
};

const fallbackWords = ['Products', 'Websites', 'SaaS', 'Automation', 'Commerce', 'Systems'];

const wordVariants = {
  enter: { y: '112%', opacity: 0, filter: 'blur(18px)' },
  center: { y: '0%', opacity: 1, filter: 'blur(0px)' },
  exit: { y: '-112%', opacity: 0, filter: 'blur(14px)' },
};

export default function HeroSection({ content }: { content?: HeroContent | null }) {
  const reduceMotion = useReducedMotion();
  const [activeWord, setActiveWord] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.38], reduceMotion ? [0, 0] : [0, -70]);
  const posterScale = useTransform(scrollYProgress, [0, 0.38], reduceMotion ? [1, 1] : [1, 0.94]);

  const animations = useMemo(() => ['/homeanimation.lottie', '/animation2.lottie'], []);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (!dotLottie) return;

    const handleLoadOrPlay = () => {
      // Re-apply speed in case loading a new animation resets it
      dotLottie.setSpeed(2.5);
    };

    const handleComplete = () => {
      setCurrentAnimationIndex((prev) => (prev + 1) % animations.length);
    };

    // Apply speed immediately for current state
    dotLottie.setSpeed(2.5);

    dotLottie.addEventListener('load', handleLoadOrPlay);
    dotLottie.addEventListener('play', handleLoadOrPlay);
    dotLottie.addEventListener('complete', handleComplete);
    
    return () => {
      dotLottie.removeEventListener('load', handleLoadOrPlay);
      dotLottie.removeEventListener('play', handleLoadOrPlay);
      dotLottie.removeEventListener('complete', handleComplete);
    };
  }, [dotLottie, animations]);

  const rotatingWords = useMemo(() => {
    const fromCms = content?.heroRotatingWords
      ?.split(',')
      .map((word) => word.trim())
      .filter(Boolean);

    return fromCms?.length ? fromCms : fallbackWords;
  }, [content?.heroRotatingWords]);

  const intro = content?.heroEyebrow || 'We make digital systems that feel clear, useful, and alive.';

  useEffect(() => {
    if (reduceMotion || rotatingWords.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveWord((current) => (current + 1) % rotatingWords.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [reduceMotion, rotatingWords.length]);

  return (
    <section className="hm-hero" id="hero" aria-labelledby="home-hero-title">
      <motion.div
        className="hm-hero__ambient"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span />
        <span />
        <span />
      </motion.div>

      <motion.div className="hm-hero__poster" style={{ y: heroY, scale: posterScale }}>
        {/* Main Focus: Lottie Animation */}
        <div className="hm-hero__animation-container">
          <DotLottieReact
            src={animations[currentAnimationIndex]}
            loop={false}
            autoplay
            className="hm-hero__lottie"
            dotLottieRefCallback={setDotLottie}
          />
        </div>

        {/* Text at the bottom with smaller fonts */}
        <div className="hm-hero__text-content">
          <motion.p
            className="hm-hero__intro hm-hero__intro--small"
            initial={reduceMotion ? false : { y: 24, opacity: 0, filter: 'blur(12px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro}
          </motion.p>

          <h1 id="home-hero-title" className="hm-hero__headline hm-hero__headline--small">
            <span className="hm-hero__word-stage" aria-live="polite" aria-atomic="true">
              <motion.span
                key={rotatingWords[activeWord]}
                variants={wordVariants}
                initial={reduceMotion ? false : 'enter'}
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.86, ease: [0.77, 0, 0.175, 1] }}
              >
                {rotatingWords[activeWord]}
              </motion.span>
            </span>
          </h1>
        </div>
      </motion.div>

      <motion.a
        href="#work"
        className="hm-hero__scroll"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
      >
        <span />
        Selected work
      </motion.a>
    </section>
  );
}
