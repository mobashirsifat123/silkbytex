import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import TextReveal from '@/components/common/TextReveal';
import RevealSection from '@/components/common/RevealSection';
import { services } from '@/lib/site-data';

export default function ServicesPage() {
  return (
    <main className="hm-page">
      <EditorialNav />
      <section className="pt-48 px-8 lg:px-24 pb-24">
        <TextReveal lines={["Our Capabilities"]} as="h1" className="text-6xl md:text-8xl font-serif leading-none tracking-tight mb-24" />
        <div className="grid gap-12">
          {services.map((service, i) => (
            <RevealSection key={service.slug} delay={i * 0.1}>
              <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row gap-8">
                <h2 className="text-3xl md:text-5xl font-serif md:w-1/3">{service.title}</h2>
                <div className="md:w-2/3">
                  <p className="text-2xl text-neutral-400 mb-4">{service.short}</p>
                  <p className="text-lg text-neutral-500">{service.description}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>
      <EditorialFooter />
    </main>
  );
}
