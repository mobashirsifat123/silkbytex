import React from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import SectionHeader from '@/components/common/SectionHeader';
import { CASE_STUDIES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  return (
    <article className="rounded-[var(--radius-xl)] border border-border bg-bg-secondary/70 p-6 md:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-12">
        <div className="space-y-8">
          <div className="flex flex-col gap-5 border-b border-white/5 pb-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <span className="text-overline text-accent-400">
                Case Study {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="max-w-[18ch] text-heading-1">{study.name}</h3>
            </div>

            <Link
              href={study.link.href}
              className="focus-ring inline-flex items-center gap-2 self-start rounded-[var(--radius-md)] border border-border px-4 py-2.5 text-sm font-medium text-fg-primary transition-colors duration-[var(--duration-interaction-fast)] ease-[var(--ease-out)] hover:border-border-hover hover:bg-bg-elevated"
            >
              {study.link.label}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <span className="text-overline text-fg-muted">SilkByteX Role</span>
              <p className="text-body-sm text-fg-primary">{study.role}</p>
            </div>

            <div className="space-y-3">
              <span className="text-overline text-fg-muted">Outcome</span>
              <p className="text-body-sm text-fg-primary">{study.outcome}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <span className="text-overline text-fg-muted">Problem</span>
              <p className="text-body-sm text-fg-secondary">{study.problem}</p>
            </div>

            <div className="space-y-3 md:col-span-2">
              <span className="text-overline text-fg-muted">Solution</span>
              <p className="text-body-sm text-fg-secondary">{study.solution}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[var(--radius-lg)] border border-white/5 bg-bg-primary/40 p-5 md:p-6">
          <div className="space-y-3">
            <span className="text-overline text-fg-muted">Measured Result</span>
            <ul className="space-y-3">
              {study.metrics.map((metric) => (
                <li key={metric} className="text-body-sm text-fg-primary">
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-overline text-fg-muted">Stack</span>
            <div className="flex flex-wrap gap-2">
              {study.tech.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs font-medium text-fg-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="section-atmosphere relative border-t border-white/5 py-[clamp(5rem,12vh,10rem)]">
      <Container>
        <SectionHeader
          overline="CASE STUDIES"
          title="Published proof from SilkByteX-owned work only"
          description="There was no defensible client case-study material in this repository, so the proof layer now shows only SilkByteX work that can be supported directly by this codebase."
          className="mb-16"
        />

        <div className="space-y-8">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.name} study={study} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
