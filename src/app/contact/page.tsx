import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import TextReveal from '@/components/common/TextReveal';
import RevealSection from '@/components/common/RevealSection';

export default function ContactPage() {
  return (
    <main className="hm-page">
      <EditorialNav />
      <section className="pt-48 px-8 lg:px-24 pb-24 min-h-[70vh]">
        <TextReveal lines={["Start a project"]} as="h1" className="text-6xl md:text-8xl font-serif leading-none tracking-tight mb-24" />
        <RevealSection delay={0.3} className="grid md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-3xl font-serif mb-8">Get in touch</h2>
            <address className="not-italic text-xl text-neutral-400 space-y-4">
              <p>New Business:<br/><a href="mailto:newbusiness@silkbytex.com" className="text-white hover:text-neutral-300">newbusiness@silkbytex.com</a></p>
              <p>General Inquiries:<br/><a href="mailto:hello@silkbytex.com" className="text-white hover:text-neutral-300">hello@silkbytex.com</a></p>
            </address>
          </div>
        </RevealSection>
      </section>
      <EditorialFooter />
    </main>
  );
}
