'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Work',     href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Stories',  href: '/stories' },
  { label: 'Contact',  href: '/contact' },
];

const socialLinks = [
  { label: 'LinkedIn',  href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter',   href: 'https://twitter.com' },
];

export default function HMNav() {
  const [open, setOpen]                 = useState(false);
  const [daysUntilMonday, setDays]      = useState(0);
  const reduceMotion                    = useReducedMotion();
  const btnRef                          = useRef<HTMLButtonElement>(null);
  const pathname                        = usePathname();

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Days until Monday
  useEffect(() => {
    const d = new Date().getDay();
    setDays(d === 1 ? 0 : d === 0 ? 1 : 8 - d);
  }, []);

  // Lock scroll
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <>
      {/* ── Logo ─────────────────────────────────── */}
      <Link
        href="/"
        className={`hm-logo${open ? ' is-overlay-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-label="SilkByteX home"
      >
        SILK<br />BYTE<br />X
      </Link>

      {/* ── Countdown ────────────────────────────── */}
      <div
        className={`hm-countdown${open ? ' is-overlay-open' : ''}`}
        aria-live="polite"
      >
        <span className="hm-countdown__icon">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="1" y="2" width="8" height="7" rx="1"
              stroke="currentColor" strokeWidth="1.2"/>
            <path d="M3 1V3M7 1V3"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </span>
        <span>
          {daysUntilMonday === 0
            ? 'It\'s Monday!'
            : `${daysUntilMonday} day${daysUntilMonday !== 1 ? 's' : ''} until Monday`}
        </span>
      </div>

      {/* ── Right Pill ───────────────────────────── */}
      <div className={`hm-pill${open ? ' is-light' : ''}`} aria-hidden="true">
        <div className="hm-pill__track" />
        <button
          ref={btnRef}
          type="button"
          className={`hm-pill__btn${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Full-screen Overlay ──────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="hm-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Nav links */}
            <nav className="hm-overlay__nav" aria-label="Primary">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{
                    delay: 0.12 + i * 0.065,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social links at bottom */}
            <motion.div
              className="hm-overlay__footer"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              {socialLinks.map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
