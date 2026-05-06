import React from 'react';
import Container from '@/components/common/Container';
import Divider from '@/components/common/Divider';
import { METRICS } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section id="about" className="section-atmosphere py-[clamp(5rem,12vh,10rem)] relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center relative">
          <div className="space-y-6 lg:pr-16">
            <span className="text-overline text-accent-400">WHO WE ARE</span>
            <h2 className="text-heading-1">
              Crafting digital silk roads that connect vision to reality.
            </h2>
            <p className="text-body-lg text-fg-secondary max-w-[50ch]">
              We are a collective of engineers, designers, and strategists who
              believe software should feel inevitable, as though it could not have
              been built any other way. Every line of code, every pixel, and every
              interaction is deliberate.
            </p>
            <p className="text-body-lg text-fg-secondary max-w-[50ch]">
              From startups to global teams, we bring the same obsessive attention
              to craft. Your vision deserves extraordinary execution without
              unnecessary complexity in the experience.
            </p>
          </div>

          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 h-[60%]">
            <Divider orientation="vertical" glow />
          </div>

          <div className="flex flex-col gap-6 lg:pl-16">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="glass-elevated rounded-[var(--radius-lg)] p-6 flex items-center gap-6 transition-transform duration-[var(--duration-interaction-fast)] ease-[var(--ease-out)] hover:-translate-y-1"
              >
                <div className="text-display-lg text-accent-400 min-w-[100px] text-right tabular-nums">
                  {metric.value}
                  {metric.suffix}
                </div>
                <div className="h-8 w-px bg-border" />
                <span className="text-body-lg text-fg-secondary">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
