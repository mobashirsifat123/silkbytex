import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import TextReveal from '@/components/common/TextReveal';
import RevealSection from '@/components/common/RevealSection';

export default function AboutPage() {
  return (
    <main className="hm-page">
      <EditorialNav />
      <section className="pt-48 px-8 lg:px-24 pb-24 min-h-[70vh]">
        <TextReveal lines={["We are SilkByteX,", "a digital product", "studio."]} as="h1" className="text-6xl md:text-8xl font-serif leading-none tracking-tight mb-12" />
        <RevealSection delay={0.3}>
          <p className="text-2xl md:text-4xl max-w-4xl text-neutral-400">
            We collaborate with founders and teams to shape the product, design the system, build the software, and keep improving after launch.
          </p>
        </RevealSection>
      </section>
      <EditorialFooter />
    </main>
  );
}
