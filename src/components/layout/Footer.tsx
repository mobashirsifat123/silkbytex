import React from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import Divider from '@/components/common/Divider';
import { FOOTER_LINKS, SITE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Silk<span>Byte</span>
              <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
                X
              </span>
            </span>
            <p className="text-body-sm text-fg-secondary max-w-xs">
              {SITE.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[FOOTER_LINKS.contact.primaryCta, FOOTER_LINKS.contact.secondaryCta].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="focus-ring inline-flex items-center rounded-[var(--radius-md)] border border-border px-3 py-2 text-sm text-fg-secondary transition-colors duration-[var(--duration-interaction-fast)] ease-[var(--ease-out)] hover:border-border-hover hover:bg-bg-surface/70 hover:text-fg-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-overline text-fg-muted">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="interactive-link focus-ring -mx-1 -my-1 rounded-[var(--radius-sm)] px-1 py-1 text-sm text-fg-secondary/90 hover:text-fg-primary focus-visible:text-fg-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-overline text-fg-muted">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="interactive-link focus-ring -mx-1 -my-1 rounded-[var(--radius-sm)] px-1 py-1 text-sm text-fg-secondary/90 hover:text-fg-primary focus-visible:text-fg-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-overline text-fg-muted">Contact</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={FOOTER_LINKS.contact.primaryCta.href}
                  className="interactive-link focus-ring -mx-1 -my-1 rounded-[var(--radius-sm)] px-1 py-1 text-sm text-fg-secondary/90 hover:text-accent-400 focus-visible:text-accent-400"
                >
                  {FOOTER_LINKS.contact.primaryCta.label}
                </Link>
              </li>
              <li>
                <Link
                  href={FOOTER_LINKS.contact.secondaryCta.href}
                  className="interactive-link focus-ring -mx-1 -my-1 rounded-[var(--radius-sm)] px-1 py-1 text-sm text-fg-secondary/90 hover:text-fg-primary focus-visible:text-fg-primary"
                >
                  {FOOTER_LINKS.contact.secondaryCta.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-fg-faint">Built with obsession.</p>
        </div>
      </Container>
    </footer>
  );
}
