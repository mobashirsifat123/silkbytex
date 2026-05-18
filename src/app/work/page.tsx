import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import TextReveal from '@/components/common/TextReveal';
import RevealSection from '@/components/common/RevealSection';
import prisma from '@/lib/prisma';
import { fallbackWorkProjects, getPublicProjects, withFallbackProjects, type WorkProject } from '@/lib/work-projects';
import Link from 'next/link';

export default async function WorkPage() {
  let projects: WorkProject[] = fallbackWorkProjects;

  try {
    const cmsProjects = await prisma.project.findMany({
      where: {
        isDraft: false,
        projectStatus: 'published',
      },
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    projects = withFallbackProjects(getPublicProjects(cmsProjects), 8);

    if (projects.length === 0) {
      console.warn("No published projects found. Rendering static fallback work index.");
      projects = fallbackWorkProjects;
    }
  } catch (error) {
    console.warn("Database connection issue. Rendering static fallback work index.", getErrorMessage(error));
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

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
