'use client';

import { useRef, useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/lib/site-data';

// ─── Shared ease ─────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Small helpers ────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 48, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.82, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero visual (parallax card artwork) ─────────────────
function HeroVisual({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    el.style.setProperty('--nx', String(nx));
    el.style.setProperty('--ny', String(ny));
  }, []);

  const handleMouseLeave = useCallback(() => {
    ref.current?.style.setProperty('--nx', '0');
    ref.current?.style.setProperty('--ny', '0');
  }, []);

  return (
    <div
      ref={ref}
      className="pdc-hero-visual"
      style={{ '--nx': '0', '--ny': '0' } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="pdc-hero-visual__bg" style={{ backgroundColor: color, y }}>
        {/* Orbit rings */}
        <span className="pdc-orbit pdc-orbit--outer pdc-parallax-slow" />
        <span className="pdc-orbit pdc-orbit--inner pdc-parallax-fast" />
        {/* Dot cluster */}
        <span className="pdc-dots pdc-parallax-dots" />
        {/* Centre glow */}
        <span className="pdc-glow" />
      </motion.div>
    </div>
  );
}

// ─── Section divider ─────────────────────────────────────
function Divider() {
  return (
    <motion.hr
      className="pdc-divider"
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

// ─── Case-study text section ─────────────────────────────
function CaseSection({
  heading,
  body,
  delay = 0,
  accent = false,
}: {
  heading: string;
  body: string;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <div className={`pdc-case-section${accent ? ' pdc-case-section--accent' : ''}`}>
      <FadeUp delay={delay} className="pdc-case-section__heading-wrap">
        <span className="pdc-label">{heading}</span>
      </FadeUp>
      <FadeUp delay={delay + 0.08} className="pdc-case-section__body">
        <p>{body}</p>
      </FadeUp>
    </div>
  );
}

// ─── Visual grid placeholder block ───────────────────────
function VisualBlock({
  color,
  aspect = '16/9',
  delay = 0,
  label,
}: {
  color: string;
  aspect?: string;
  delay?: number;
  label?: string;
}) {
  return (
    <FadeUp delay={delay} className="pdc-visual-block">
      <div
        className="pdc-visual-block__inner"
        style={{ backgroundColor: color, aspectRatio: aspect }}
      >
        <span className="pdc-orbit pdc-orbit--outer pdc-parallax-slow" />
        <span className="pdc-orbit pdc-orbit--inner pdc-parallax-fast" />
        <span className="pdc-dots pdc-parallax-dots" />
        {label && <span className="pdc-visual-block__label">{label}</span>}
      </div>
    </FadeUp>
  );
}

// ─── Main client component ────────────────────────────────
export default function ProjectDetailClient({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project | null;
}) {
  const reduceMotion = useReducedMotion();
  const hasCaseStudy = !!(project.challenge && project.approach && project.outcome);

  return (
    <article className="pdc">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="pdc-hero">
        <div className="pdc-hero__meta">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link href="/work" className="pdc-back-link">
              ← All work
            </Link>
          </motion.div>
          <motion.span
            className="pdc-label"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {project.kicker}
          </motion.span>
        </div>

        <div className="pdc-hero__title-wrap">
          <h1 className="pdc-hero__title">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="pdc-hero__title-line">
                <motion.span
                  className="pdc-hero__title-word"
                  initial={reduceMotion ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.78, delay: 0.15 + i * 0.07, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          {project.tagline && (
            <motion.p
              className="pdc-hero__tagline"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.42, ease: EASE }}
            >
              {project.tagline}
            </motion.p>
          )}
        </div>

        {/* Hero visual */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.28, ease: EASE }}
        >
          <HeroVisual color={project.color} />
        </motion.div>

        {/* Metadata row */}
        {(project.client || project.year || project.services) && (
          <motion.div
            className="pdc-meta-row"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.5, ease: EASE }}
          >
            {project.client && (
              <div className="pdc-meta-cell">
                <span className="pdc-label">Client</span>
                <span className="pdc-meta-value">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="pdc-meta-cell">
                <span className="pdc-label">Year</span>
                <span className="pdc-meta-value">{project.year}</span>
              </div>
            )}
            {project.services && (
              <div className="pdc-meta-cell pdc-meta-cell--wide">
                <span className="pdc-label">Services</span>
                <span className="pdc-meta-value">{project.services.join(', ')}</span>
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* ── Intro ─────────────────────────────────── */}
      {project.intro && (
        <>
          <Divider />
          <FadeUp className="pdc-intro-section">
            <p className="pdc-intro">{project.intro}</p>
          </FadeUp>
        </>
      )}

      {/* ── Visual grid ───────────────────────────── */}
      {hasCaseStudy && (
        <>
          <Divider />
          <div className="pdc-visual-grid">
            <VisualBlock color={project.color} aspect="4/3" delay={0} label="Overview" />
            <VisualBlock color={project.color} aspect="1/1" delay={0.1} label="Interface" />
            <VisualBlock color={project.color} aspect="3/2" delay={0.2} label="Detail" />
          </div>
        </>
      )}

      {/* ── Case-study sections ───────────────────── */}
      {project.challenge && (
        <>
          <Divider />
          <CaseSection
            heading={project.challenge.heading}
            body={project.challenge.body}
            delay={0}
          />
        </>
      )}
      {project.approach && (
        <>
          <Divider />
          <CaseSection
            heading={project.approach.heading}
            body={project.approach.body}
            delay={0}
            accent
          />
        </>
      )}
      {project.outcome && (
        <>
          <Divider />
          <CaseSection
            heading={project.outcome.heading}
            body={project.outcome.body}
            delay={0}
          />
        </>
      )}

      {/* ── Pull quote ────────────────────────────── */}
      {project.quote && (
        <>
          <Divider />
          <FadeUp className="pdc-quote-section">
            <blockquote className="pdc-quote">
              <p className="pdc-quote__text">&ldquo;{project.quote.text}&rdquo;</p>
              <footer className="pdc-quote__attribution">— {project.quote.attribution}</footer>
            </blockquote>
          </FadeUp>
        </>
      )}

      {/* ── Next project ──────────────────────────── */}
      {nextProject && (
        <>
          <Divider />
          <FadeUp className="pdc-next-section">
            <span className="pdc-label">Next project</span>
            <Link href={`/work/${nextProject.slug}`} className="pdc-next-link">
              <span className="pdc-next-link__title">{nextProject.title}</span>
              <span className="pdc-next-link__arrow" aria-hidden="true">→</span>
            </Link>
          </FadeUp>
        </>
      )}

      {/* ── Back to work ──────────────────────────── */}
      <div className="pdc-footer-row">
        <Link href="/work" className="pdc-back-btn">
          ← Back to all work
        </Link>
      </div>
    </article>
  );
}
