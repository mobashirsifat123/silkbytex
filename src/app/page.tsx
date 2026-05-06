import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  CTASection,
  HeroSection,
  ProcessSection,
  ServicesSection,
  TestimonialsSection,
  WorkSection,
} from '@/sections';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
