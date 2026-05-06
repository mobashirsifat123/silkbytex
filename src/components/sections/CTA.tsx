import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-atmosphere relative overflow-hidden border-t border-white/5 py-[clamp(5rem,12vh,10rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, hsl(152 100% 50% / 0.10) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-overline text-accent-400">NEXT STEP</span>
          <h2 className="text-display-lg max-w-[20ch]">
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="text-body-lg text-fg-secondary max-w-[50ch]">
            If the work, services, and process match what you need, let&apos;s
            scope the project with a direct conversation and a working contact
            flow.
          </p>
          <div className="mt-4">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              icon={<ArrowRight size={18} />}
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
