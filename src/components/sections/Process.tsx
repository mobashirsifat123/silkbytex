import React from 'react';
import Container from '@/components/common/Container';
import SectionHeader from '@/components/common/SectionHeader';
import { PROCESS_STEPS } from '@/lib/constants';

export default function ProcessSection() {
  return (
    <section id="process" className="section-atmosphere relative border-t border-white/5 py-[clamp(5rem,12vh,10rem)]">
      <Container maxWidth="narrow">
        <SectionHeader
          overline="PROCESS"
          title="A process built for steady delivery"
          description="After the proof and capabilities, this is how the engagement stays clear, paced, and production-minded from kickoff to launch."
          align="left"
          className="mb-16"
        />

        <div className="relative space-y-16 md:space-y-24">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border md:block" />

          {PROCESS_STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.number}
                className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8"
              >
                <div className={isLeft ? 'space-y-3 md:text-right' : 'space-y-3 md:order-3'}>
                  <span className="text-overline text-accent-400">Step {step.number}</span>
                  <h3 className="text-heading-3">{step.title}</h3>
                  <p className="text-body-sm text-fg-secondary max-w-sm inline-block">
                    {step.description}
                  </p>
                </div>

                <div className="hidden md:flex items-center justify-center md:order-2">
                  <div className="relative z-10 h-4 w-4 rounded-full border-2 border-accent-400 bg-bg-primary shadow-[0_0_12px_hsl(152_100%_50%_/_0.25)]" />
                </div>

                <div className={`hidden md:block ${isLeft ? 'md:order-3' : 'md:order-1'}`} />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
