import React from 'react';
import Container from '@/components/common/Container';
import SectionHeader from '@/components/common/SectionHeader';
import { REFERENCE_NOTES } from '@/lib/constants';

export default function TestimonialsSection() {
  return (
    <section id="references" className="section-atmosphere relative border-t border-white/5 py-[clamp(5rem,12vh,10rem)]">
      <Container maxWidth="narrow">
        <SectionHeader
          overline="REFERENCES"
          title="Published references stay attributable"
          description="The previous testimonial carousel has been removed because the quotes and client identities in this repository were not defensible. SilkByteX now publishes references only with attribution and permission."
          align="left"
          className="mb-12"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {REFERENCE_NOTES.map((note) => (
            <article
              key={note.title}
              className="rounded-[var(--radius-xl)] border border-border bg-bg-secondary/70 p-6"
            >
              <div className="space-y-4">
                <span className="text-overline text-accent-400">{note.label}</span>
                <h3 className="text-heading-3">{note.title}</h3>
                <p className="text-body-sm text-fg-secondary">{note.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
