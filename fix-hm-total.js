const fs = require('fs');

const cssContent = `
@import "tailwindcss";

:root {
  --nav-pill-width: 52px;
  --bg: #ededee;
  --fg: #0d0d0d;
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  background: var(--bg);
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans), sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #000;
  color: #fff;
}

/* ────────────────────────────────────────────────────────
   PAGE WRAPPER
──────────────────────────────────────────────────────── */
.hm-page {
  padding-right: var(--nav-pill-width);
  min-height: 100vh;
}

/* ────────────────────────────────────────────────────────
   FIXED UI
──────────────────────────────────────────────────────── */
.hm-logo {
  position: fixed;
  top: 32px;
  left: 32px;
  z-index: 100;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  mix-blend-mode: difference;
  color: #fff;
}

.hm-pill {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--nav-pill-width);
  background: #0d0d0d;
  z-index: 100;
  border-radius: 20px 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.4s var(--ease-expo);
}

.hm-pill__lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hm-pill__lines span {
  display: block;
  width: 20px;
  height: 2px;
  background: #fff;
}

/* ────────────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────────────── */
.hm-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  position: relative;
}

.hm-hero__title {
  font-family: var(--font-serif), serif;
  font-weight: 400;
  font-size: clamp(40px, 9vw, 150px);
  line-height: 0.95;
  text-align: center;
  letter-spacing: -0.02em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1vw;
}

.hm-hero__title-static {
  /* ... */
}

.hm-hero__title-dynamic-wrap {
  position: relative;
  display: inline-block;
  height: 1em;
  overflow: hidden;
  vertical-align: bottom;
  min-width: 250px;
}

.hm-hero__title-dynamic-wrap span {
  position: absolute;
  top: 0; left: 0; right: 0;
  display: flex;
  justify-content: center;
  transform: translateY(100%);
}

.hm-hero__title-dynamic-wrap span.active {
  transform: translateY(0);
}

.hm-hero__sub {
  margin-top: 2rem;
  font-size: 14px;
  font-style: italic;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ────────────────────────────────────────────────────────
   FEATURES/WORK GRID
──────────────────────────────────────────────────────── */
.hm-work {
  padding: 100px 40px;
}

.hm-section-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 60px;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 20px;
  font-weight: 600;
}

.hm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
@media (max-width: 768px) {
  .hm-grid { grid-template-columns: 1fr; gap: 80px; }
}

.hm-grid-item:nth-child(even) {
  margin-top: clamp(40px, 10vw, 160px);
}

.hm-card {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.hm-card__img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding-bottom: 125%; /* 4:5 aspect ratio */
  background: #d9d9d9;
}

.hm-card__img-wrap img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease-expo);
}

.hm-card:hover .hm-card__img-wrap img {
  transform: scale(1.05);
}

.hm-card__meta {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.hm-card__title {
  font-family: var(--font-serif), serif;
  font-size: clamp(24px, 3vw, 40px);
  line-height: 1.1;
  font-weight: 400;
}

.hm-card__tags {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
}

/* ────────────────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────────────────── */
.hm-footer {
  margin-top: 100px;
  background: #111;
  color: #fff;
  padding: 100px 40px;
  border-radius: 40px 40px 0 0;
  position: relative;
  margin-bottom: 0;
}

.hm-footer__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.hm-footer__link {
  font-family: var(--font-serif), serif;
  font-size: clamp(30px, 4vw, 60px);
  text-decoration: none;
  color: #fff;
  transition: opacity 0.3s;
}
.hm-footer__link:hover { opacity: 0.6; }
`;

const layoutContent = `
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import SmoothScroll from '@/components/common/SmoothScroll';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SilkByteX | Hello Monday Clone',
  description: 'Replicating the legendary award-winning layout.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={\`\${playfair.variable} \${dmSans.variable}\`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
`;

const pageContent = `
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const MOCK_PROJECTS = [
  { id: 1, title: 'Nova AI Dashboard', category: 'Product Design', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { id: 2, title: 'Echo Mobile Architecture', category: 'App Dev', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop' },
  { id: 3, title: 'Pinnacle Studio', category: 'Web Experience', src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop' },
  { id: 4, title: 'Lumen Database Systems', category: 'Engineering', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop' },
];

const WORDS = [
  "digital products",
  "experiences",
  "emotions",
  "brands"
];

export default function HelloMondayHome() {
  const dynamicWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP timeline for text rotation
    if (!dynamicWrapRef.current) return;
    
    const spans = dynamicWrapRef.current.querySelectorAll('span');
    let currentIndex = 0;

    const tl = gsap.timeline({ repeat: -1 });

    spans.forEach((span, i) => {
      tl.to(span, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(span, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.in',
        delay: 1.5,
      });
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="hm-page">
      <div className="hm-logo">SilkByteX</div>

      <div className="hm-pill">
        <div className="hm-pill__lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <section className="hm-hero">
        <div className="hm-hero__title">
          <div className="hm-hero__title-static">We make</div>
          <div className="hm-hero__title-dynamic-wrap" ref={dynamicWrapRef}>
            {WORDS.map((w, i) => (
              <span key={i} style={{ transform: 'translateY(100%)' }}>
                {w},
              </span>
            ))}
          </div>
        </div>
        <div className="hm-hero__sub">Creative Studio • Est. 2026</div>
      </section>

      <section className="hm-work">
        <div className="hm-section-title">Selected Work</div>
        
        <div className="hm-grid">
          {MOCK_PROJECTS.map((p) => (
            <div key={p.id} className="hm-grid-item">
              <a href="#work" className="hm-card">
                <div className="hm-card__img-wrap">
                  <Image src={p.src} alt={p.title} fill />
                </div>
                <div className="hm-card__meta">
                  <div className="hm-card__title">{p.title}</div>
                  <div className="hm-card__tags">{p.category}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="hm-footer">
        <div className="hm-section-title" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>Contact</div>
        <div className="hm-footer__grid">
          <div>
            <a href="mailto:hello@silkbytex.com" className="hm-footer__link">hello@silkbytex.com</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New York</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/app/globals.css', cssContent.trim());
fs.writeFileSync('src/app/layout.tsx', layoutContent.trim());
fs.writeFileSync('src/app/page.tsx', pageContent.trim());

