import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import TextReveal from '@/components/common/TextReveal';
import RevealSection from '@/components/common/RevealSection';
import prisma from '@/lib/prisma';
import Link from 'next/link';

import { Project } from '@prisma/client';

export default async function WorkPage() {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' }
    });
  } catch {
    console.warn("Database connection issue. Skipping projects fetch.");
  }

  return (
    <main className="hm-page">
      <EditorialNav />
      <section className="pt-48 px-8 lg:px-24 pb-24">
        <TextReveal lines={["Selected Work"]} as="h1" className="text-6xl md:text-8xl font-serif leading-none tracking-tight mb-24" />
        <div className="hm-work-board">
          {projects.map((project, index) => (
            <RevealSection key={project.id} delay={(index % 3) * 0.1} className={`hm-work-card hm-work-card--${index % 5}`}>
              <Link href={`/work/${project.slug}`}>
                <div className="hm-work-card__visual" style={{ backgroundColor: project.color || '#000' }}>
                  {/* Keep image as a fallback since the current UI expects one, but we removed the image earlier */}
                  <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: project.color || '#000' }} />
                  <span className="hm-work-card__number z-10 text-white mix-blend-overlay">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="hm-work-card__copy">
                  <span className="hm-work-card__kicker">{project.kicker || project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>
      <EditorialFooter />
    </main>
  );
}
