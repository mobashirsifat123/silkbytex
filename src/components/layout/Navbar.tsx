'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { EASING } from '@/lib/animations';
import Button from '@/components/ui/Button';
import Container from '@/components/common/Container';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const hiddenRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const getMobileMenuFocusableElements = useCallback(() => {
    const menu = mobileMenuRef.current;

    if (!menu) {
      return [] as HTMLElement[];
    }

    return Array.from(
      menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
  }, []);

  const closeMobileMenu = useCallback((restoreFocus = true) => {
    setMobileOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        const current = window.scrollY;
        const nextScrolled = current > 80;
        const nextHidden = current > lastScrollRef.current && current > 400;

        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        if (nextHidden !== hiddenRef.current) {
          hiddenRef.current = nextHidden;
          setHidden(nextHidden);
        }

        lastScrollRef.current = current;
        frameRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.requestAnimationFrame(() => {
      const focusableElements = getMobileMenuFocusableElements();
      const firstTarget = focusableElements[0] ?? mobileMenuRef.current;

      firstTarget?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getMobileMenuFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        mobileMenuRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstElement || activeElement === mobileMenuRef.current)) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [closeMobileMenu, getMobileMenuFocusableElements, mobileOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'glass-elevated shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: EASING.out }}
      >
        <Container>
          <div className="flex items-center justify-between h-[72px] md:h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="focus-ring flex items-center gap-1 rounded-[var(--radius-sm)] px-1 py-1"
            >
              <span className="text-xl font-bold tracking-tight font-[var(--font-heading)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Silk
                <span className="text-fg-primary">Byte</span>
                <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
                  X
                </span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="interactive-link focus-ring -mx-1 -my-1 rounded-[var(--radius-sm)] px-1 py-1 text-sm text-fg-secondary/90 hover:text-fg-primary focus-visible:text-fg-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href="/contact">
                Start a Project
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={menuButtonRef}
              className="focus-ring rounded-[var(--radius-sm)] p-2 text-fg-primary transition-colors duration-[var(--duration-interaction-fast)] ease-[var(--ease-out)] hover:bg-bg-surface/70 md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-primary/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="focus-ring rounded-[var(--radius-md)] px-3 py-2 text-3xl font-medium text-fg-primary transition-colors hover:text-accent-400 focus-visible:text-accent-400"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: EASING.out }}
                  onClick={() => closeMobileMenu(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Button variant="primary" size="lg" href="/contact" onClick={() => closeMobileMenu(false)}>
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
