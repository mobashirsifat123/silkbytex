import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const heroHighlights = [
  { label: 'Approach', value: 'Strategy-led execution' },
  { label: 'Output', value: 'Production-ready delivery' },
] as const;

function HeroVisual({
  mode = 'desktop',
}: {
  mode?: 'desktop' | 'mobile' | 'micro';
}) {
  const isMobile = mode === 'mobile';
  const isMicro = mode === 'micro';

  return (
    <div
      className={`relative mx-auto w-full ${
        isMicro
          ? 'max-w-[18.5rem]'
          : isMobile
            ? 'max-w-[21rem]'
            : 'max-w-[28rem]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${isMicro ? 'rounded-[1.5rem] blur-2xl' : 'rounded-[1.75rem] blur-3xl'}`}
        style={{
          background:
            'radial-gradient(circle at 50% 42%, hsl(152 100% 50% / 0.12) 0%, transparent 68%)',
        }}
      />

      <div
        className={`relative overflow-hidden border border-white/8 ${
          isMicro
            ? 'rounded-[1.5rem] px-4 py-4'
            : 'rounded-[1.75rem] p-4 md:p-6'
        }`}
        style={{
          background:
            'linear-gradient(180deg, hsl(0 0% 100% / 0.04) 0%, hsl(0 0% 100% / 0.015) 100%)',
        }}
      >
        <div
          className={`flex items-center justify-between text-fg-muted ${
            isMicro ? 'text-[0.68rem] uppercase tracking-[0.14em]' : 'text-overline'
          }`}
        >
          <span>SilkByteX</span>
          <span>Focused Build</span>
        </div>

        <div
          className={`rounded-[1.25rem] border border-white/8 bg-bg-primary/65 ${
            isMicro
              ? 'mt-4 px-3.5 py-4'
              : 'mt-5 px-4 py-5 md:mt-6 md:px-5 md:py-6'
          }`}
        >
          <div
            aria-hidden="true"
            className={`mx-auto rounded-full border border-accent-400/20 ${
              isMicro
                ? 'h-20 w-20'
                : isMobile
                  ? 'h-28 w-28'
                  : 'h-36 w-36 lg:h-40 lg:w-40'
            }`}
            style={{
              background:
                'radial-gradient(circle at 32% 28%, hsl(152 100% 50% / 0.24) 0%, hsl(152 72% 20% / 0.10) 48%, transparent 72%)',
              boxShadow: isMicro
                ? '0 0 40px hsl(152 100% 50% / 0.08)'
                : '0 0 56px hsl(152 100% 50% / 0.08)',
            }}
          />

          {isMicro ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-fg-primary">Strategy-led execution</p>
              <p className="text-xs leading-5 text-fg-secondary">
                Clear systems. Premium delivery.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-2.5">
              {heroHighlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border bg-bg-secondary/75 px-3.5 py-2.5"
                >
                  <span className="text-body-sm text-fg-secondary">{item.label}</span>
                  <span className="text-sm text-fg-primary text-right">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroContent({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`flex flex-col ${
        mobile
          ? 'items-start gap-5 text-left max-[389px]:gap-4'
          : 'items-start gap-7 text-left lg:gap-8'
      }`}
    >
      <div className={mobile ? 'space-y-4 max-[389px]:space-y-3.5' : 'space-y-5'}>
        <span className="text-overline text-accent-400">Premium Software Studio</span>

        {mobile ? (
          <h1
            className="font-[var(--font-heading)] text-[clamp(2.85rem,13vw,4.15rem)] leading-[0.92] tracking-[-0.05em] text-balance max-[389px]:text-[clamp(2.45rem,12vw,3.2rem)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {SITE.tagline}
          </h1>
        ) : (
          <h1
            className="font-[var(--font-heading)] text-[clamp(4.25rem,7vw,6.75rem)] leading-[0.92] tracking-[-0.055em] text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="block">We Weave</span>
            <span className="block">the Future of Software</span>
          </h1>
        )}

        <p
          className={`text-body-lg text-fg-secondary ${
            mobile
              ? 'max-w-[31ch] text-[1rem] leading-7 max-[389px]:max-w-[28ch] max-[389px]:text-[0.96rem] max-[389px]:leading-6'
              : 'max-w-[46ch]'
          }`}
        >
          Premium software studio for ambitious teams. We keep the surface calm,
          the systems strong, and the path to launch clear from day one.
        </p>
      </div>

      <div
        className={`flex ${
          mobile
            ? 'w-full flex-col gap-3 max-[389px]:gap-2.5'
            : 'flex-row gap-4 pt-1'
        }`}
      >
        <Button
          variant="primary"
          size="lg"
          href="#work"
          className={mobile ? 'w-full justify-center max-[389px]:py-3.5' : ''}
        >
          Explore Our Work
        </Button>
        <Button
          variant="ghost"
          size="md"
          href="#process"
          icon={<ArrowRight size={16} />}
          className={
            mobile
              ? 'w-full justify-center max-[389px]:w-auto max-[389px]:self-start max-[389px]:justify-start max-[389px]:border-0 max-[389px]:bg-transparent max-[389px]:px-0 max-[389px]:py-1'
              : ''
          }
        >
          How We Work
        </Button>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-20 pb-10 md:pt-28 md:pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 46% at 74% 42%, hsl(152 100% 50% / 0.08) 0%, transparent 68%), linear-gradient(to bottom, hsl(0 0% 100% / 0.02) 0%, transparent 24%, transparent 100%)',
        }}
      />

      <Container className="relative z-10">
        <div className="md:hidden">
          <div className="flex flex-col gap-8 max-[389px]:gap-6">
            <HeroContent mobile />
            <div className="max-[389px]:hidden">
              <HeroVisual mode="mobile" />
            </div>
            <div className="hidden max-[389px]:block">
              <HeroVisual mode="micro" />
            </div>
          </div>
        </div>

        <div className="hidden min-h-[38rem] md:grid md:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.72fr)] md:items-center md:gap-10 lg:min-h-[calc(100svh-9rem)] lg:gap-16">
          <HeroContent />
          <HeroVisual mode="desktop" />
        </div>
      </Container>
    </section>
  );
}
