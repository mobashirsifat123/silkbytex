'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EditorialFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="hm-footer" aria-label="Site footer">
      <Link href="/" className="hm-footer__brand" aria-label="SilkByteX home">
        <Image
          src="/brand/silkbytex-logo.jpeg"
          alt="SilkByteX"
          width={160}
          height={160}
          className="hm-footer__brand-image"
        />
      </Link>

      {/* ── Line-art sitting figure ───────────────────────── */}
      <svg
        className="hm-footer__illustration"
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Head */}
        <circle cx="100" cy="38" r="20" stroke="#0d0d0d" strokeWidth="1.4"/>
        {/* Neck */}
        <line x1="100" y1="58" x2="100" y2="72" stroke="#0d0d0d" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Body */}
        <path d="M76 100 Q74 74 100 72 Q126 74 124 100" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Left arm */}
        <path d="M76 82 Q50 95 44 118" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Right arm reaching to laptop */}
        <path d="M124 82 Q148 95 152 118" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Lap */}
        <path d="M64 120 Q100 132 136 120" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Left leg */}
        <path d="M76 118 Q68 155 58 175" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Right leg */}
        <path d="M124 118 Q132 155 142 175" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Feet */}
        <path d="M48 175 Q58 180 68 175" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M132 175 Q142 180 152 175" stroke="#0d0d0d" strokeWidth="1.4" fill="none" strokeLinecap="round"/>

        {/* Laptop on lap */}
        <rect x="76" y="118" width="48" height="32" rx="3" stroke="#0d0d0d" strokeWidth="1.2"/>
        <line x1="80" y1="127" x2="120" y2="127" stroke="#0d0d0d" strokeWidth="0.8" opacity="0.5"/>
        <line x1="80" y1="134" x2="116" y2="134" stroke="#0d0d0d" strokeWidth="0.8" opacity="0.5"/>
        <line x1="80" y1="141" x2="112" y2="141" stroke="#0d0d0d" strokeWidth="0.8" opacity="0.5"/>
        {/* Laptop screen hinge */}
        <line x1="76" y1="118" x2="124" y2="118" stroke="#0d0d0d" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Stars / sparkle decoration */}
        <text x="22" y="60" fontSize="10" fill="#0d0d0d" opacity="0.18" fontFamily="serif">✦</text>
        <text x="162" y="55" fontSize="14" fill="#0d0d0d" opacity="0.14" fontFamily="serif">✦</text>
        <text x="10" y="155" fontSize="8" fill="#0d0d0d" opacity="0.12" fontFamily="serif">✦</text>
        <text x="174" y="100" fontSize="7" fill="#0d0d0d" opacity="0.15" fontFamily="serif">✦</text>
      </svg>

      {/* ── Contact grid ─────────────────────────────────── */}
      <div className="hm-footer__contact">
        <div className="hm-footer__contact-cell">
          <p className="hm-footer__contact-label">Want to collaborate?</p>
          <p className="hm-footer__contact-title">Work with us</p>
          <a
            href="mailto:newbusiness@silkbytex.com"
            className="hm-footer__contact-link"
          >
            newbusiness@silkbytex.com
          </a>
        </div>

        <div className="hm-footer__contact-cell">
          <p className="hm-footer__contact-label">Want to say hi?</p>
          <p className="hm-footer__contact-title">General inquiries</p>
          <a
            href="mailto:hello@silkbytex.com"
            className="hm-footer__contact-link"
          >
            hello@silkbytex.com
          </a>
        </div>

        <div className="hm-footer__contact-cell">
          <p className="hm-footer__contact-label">Want to join us?</p>
          <p className="hm-footer__contact-title">Become a team member</p>
          <Link href="/contact" className="hm-footer__contact-link">
            Apply here
          </Link>
        </div>

        <div className="hm-footer__contact-cell">
          <p className="hm-footer__contact-label">Based in</p>
          <p className="hm-footer__contact-title">Dhaka, Bangladesh</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hm-footer__contact-link"
          >
            View on maps
          </a>
        </div>
      </div>

      {/* ── Wave + Back to top ────────────────────────────── */}
      <div className="hm-footer__wave">
        <svg
          className="hm-footer__wave-bg"
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 130 Q180 30 360 90 Q540 150 720 80 Q900 10 1080 70 Q1260 130 1440 60 L1440 220 L0 220 Z"
            fill="#0d0d0d"
          />
        </svg>

        <button
          className="hm-footer__back"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
