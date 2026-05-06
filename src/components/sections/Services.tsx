import React from 'react';
import Container from '@/components/common/Container';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { SERVICES } from '@/lib/constants';
import {
  Code2,
  Brain,
  Blocks,
  Cloud,
  Palette,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={40} />,
  Brain: <Brain size={40} />,
  Blocks: <Blocks size={40} />,
  Cloud: <Cloud size={40} />,
  Palette: <Palette size={40} />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-atmosphere relative border-t border-white/5 py-[clamp(5rem,12vh,10rem)]">
      <Container>
        <SectionHeader
          overline="CAPABILITIES"
          title="Services that support the proof"
          description="The studio covers product strategy, engineering, AI systems, and interface design without blurring accountability."
          align="left"
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className={index >= 3 ? 'lg:col-span-1 lg:mx-auto lg:w-full lg:max-w-md' : ''}
            >
              <GlassCard variant="elevated" className="h-full flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/35 to-transparent" />

                <div className="text-accent-300">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-heading-3">{service.title}</h3>
                <p className="text-body-sm text-fg-secondary leading-relaxed flex-1">
                  {service.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
