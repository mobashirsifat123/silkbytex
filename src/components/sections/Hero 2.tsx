'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import SplitType from 'split-type';
import Container from '@/components/common/Container';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/constants';
import { EASING } from '@/lib/animations';
import { ArrowDown, Play } from 'lucide-react';

// Dynamically import heavier 3D component
const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full bg-accent-400/5 blur-3xl" />
      </div>
    </div>
  ),
});

export default function HeroSection() {
  type HeroPhase = 'intro' | 'settle' | 'idle';

  const splitSourceRef = useRef<HTMLHeadingElement>(null);
  const [titleWords, setTitleWords] = useState<string[]>(() => SITE.tagline.split(' '));
  const [heroPhase, setHeroPhase] = useState<HeroPhase>('intro');
  const [enableOrb, setEnableOrb] = useState(false);
  const reducedMotion = useReducedMotion();
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const pointerRafRef = useRef<number | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 52, damping: 20, mass: 0.82 };
  const bgX = useSpring(useTransform(pointerX, [-1, 1], [-20, 20]), springConfig);
  const bgY = useSpring(useTransform(pointerY, [-1, 1], [-14, 14]), springConfig);
  const midX = useSpring(useTransform(pointerX, [-1, 1], [-11, 11]), springConfig);
  const midY = useSpring(useTransform(pointerY, [-1, 1], [-8, 8]), springConfig);
  const fgX = useSpring(useTransform(pointerX, [-1, 1], [6, -6]), springConfig);
  const fgY = useSpring(useTransform(pointerY, [-1, 1], [4, -4]), springConfig);

  const startPointerLoop = useCallback(() => {
    if (pointerRafRef.current !== null) {
      return;
    }

    const tick = () => {
      const currentX = pointerX.get();
      const currentY = pointerY.get();
      const nextX = currentX + (targetPointerRef.current.x - currentX) * 0.14;
      const nextY = currentY + (targetPointerRef.current.y - currentY) * 0.14;

      pointerX.set(nextX);
      pointerY.set(nextY);

      const stillMoving =
        Math.abs(targetPointerRef.current.x - nextX) > 0.002 ||
        Math.abs(targetPointerRef.current.y - nextY) > 0.002;

      if (stillMoving) {
        pointerRafRef.current = window.requestAnimationFrame(tick);
      } else {
        pointerRafRef.current = null;
      }
    };

    pointerRafRef.current = window.requestAnimationFrame(tick);
  }, [pointerX, pointerY]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion) {
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

      targetPointerRef.current = {
        x: normalizedX * 0.72,
        y: normalizedY * 0.72,
      };

      startPointerLoop();
    },
    [reducedMotion, startPointerLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetPointerRef.current = { x: 0, y: 0 };
    startPointerLoop();
  }, [startPointerLoop]);

  useEffect(() => {
    if (!splitSourceRef.current) {
      return;
    }

    const split = new SplitType(splitSourceRef.current, { types: 'words' });
    const parsedWords =
      split.words
        ?.map((word) => word.textContent?.trim() ?? '')
        .filter(Boolean) ?? [];

    if (parsedWords.length > 0) {
      setTitleWords(parsedWords);
    }

    split.revert();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setHeroPhase('idle');
      return;
    }

    const settleTimeout = window.setTimeout(() => {
      setHeroPhase('settle');
    }, 2000);

    const idleTimeout = window.setTimeout(() => {
      setHeroPhase('idle');
    }, 2850);

    return () => {
      window.clearTimeout(settleTimeout);
      window.clearTimeout(idleTimeout);
    };
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      if (pointerRafRef.current !== null) {
        window.cancelAnimationFrame(pointerRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setEnableOrb(false);
      return;
    }

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedDataQuery = window.matchMedia('(prefers-reduced-data: reduce)');

    const updateCapability = () => {
      setEnableOrb(finePointerQuery.matches && !reducedDataQuery.matches);
    };

    updateCapability();
    finePointerQuery.addEventListener('change', updateCapability);
    reducedDataQuery.addEventListener('change', updateCapability);

    return () => {
      finePointerQuery.removeEventListener('change', updateCapability);
      reducedDataQuery.removeEventListener('change', updateCapability);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative h-[100svh] flex items-center justify-center overflow-hidden grain"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background layer */}
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={reducedMotion ? undefined : { x: bgX, y: bgY }}>
        <div
          className="absolute inset-0 scale-[1.06]"
          style={{
            background:
              'radial-gradient(ellipse 62% 52% at 50% 46%, hsl(152 100% 50% / 0.08) 0%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 120%, hsl(152 80% 30% / 0.06) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, hsl(0 0% 0% / 0.1) 0%, transparent 25%, transparent 75%, hsl(0 0% 0% / 0.2) 100%)',
          }}
        />
      </motion.div>

      {/* Midground orb lighting */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none will-change-transform"
        style={reducedMotion ? undefined : { x: midX, y: midY }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(152 100% 50% / 0.14) 0%, hsl(152 100% 50% / 0.04) 45%, transparent 72%)' }}
          animate={
            reducedMotion
              ? undefined
              : { scale: [0.995, 1.02, 0.995], opacity: [0.46, 0.68, 0.46] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Midground 3D orb */}
      <motion.div className="absolute inset-0 z-[2] will-change-transform" style={reducedMotion ? undefined : { x: midX, y: midY }}>
        {enableOrb ? (
          <Suspense fallback={null}>
            <HeroOrb />
          </Suspense>
        ) : null}
      </motion.div>

      {/* Foreground content */}
      <Container className="relative z-10 text-center flex flex-col items-center gap-8">
        <h1 ref={splitSourceRef} className="sr-only">
          {SITE.tagline}
        </h1>

        <motion.div
          className="w-full flex flex-col items-center gap-8"
          animate={
            reducedMotion
              ? undefined
              : heroPhase === 'settle'
                ? { y: [0, -5, 0], filter: ['blur(0px)', 'blur(0.35px)', 'blur(0px)'] }
                : undefined
          }
          transition={{ duration: 0.85, ease: EASING.inOut }}
        >

          <motion.div
            aria-hidden="true"
            className="flex flex-wrap justify-center gap-x-[0.35em]"
            style={reducedMotion ? undefined : { x: fgX, y: fgY }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
            }}
            transition={{ duration: 0.5, ease: EASING.out }}
          >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="text-display-xl inline-block"
              variants={{
                hidden: { opacity: 0, y: 60, rotateX: -45, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.8, ease: EASING.out },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[20%] h-24 bg-gradient-to-b from-accent-400/8 to-transparent blur-2xl"
            animate={
              reducedMotion || heroPhase !== 'idle'
                ? undefined
                : { opacity: [0.4, 0.62, 0.4] }
            }
            transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="w-full flex justify-center"
            animate={
              reducedMotion || heroPhase !== 'idle'
                ? undefined
                : { y: [0, -3, 0] }
            }
            transition={{ duration: 7.2, repeat: Infinity, ease: EASING.inOut }}
          >
            <motion.p
              className="text-body-lg text-fg-secondary max-w-[50ch]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: EASING.out }}
            >
              {SITE.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            style={reducedMotion ? undefined : { x: fgX, y: fgY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: EASING.out }}
          >
            <Button variant="primary" size="lg" href="#work">
              Explore Our Work
            </Button>
            <Button variant="ghost" size="lg" href="#about" icon={<Play size={16} />}>
              Watch Showreel
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={reducedMotion ? undefined : { x: fgX, y: fgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs text-fg-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-fg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
