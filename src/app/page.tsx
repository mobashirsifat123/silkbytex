import HMNav from '@/components/editorial/EditorialNav';
import HeroSection from '@/components/sections/Hero';
import WorkSection from '@/components/sections/Work';
import ProductBanner from '@/components/sections/ProductBanner';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import prisma from '@/lib/prisma';
import {
  fallbackWorkProjects,
  getPublicProjects,
  withFallbackProjects,
  type WorkProject,
} from '@/lib/work-projects';

export default async function Home() {
  let homepageContent = null;
  let projects: WorkProject[] = fallbackWorkProjects;

  try {
    homepageContent = await prisma.homepageContent.findFirst();
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
      console.warn('No published homepage projects found; rendering static fallback work cards.');
      projects = fallbackWorkProjects;
    }
  } catch (error) {
    console.warn('Homepage CMS project fetch failed; rendering static fallback work cards.', getErrorMessage(error));
  }

  return (
    <>
      {/* Fixed navigation layer */}
      <HMNav />

      <main>
        {/* 1 — Full-viewport hero */}
        <HeroSection content={homepageContent} />

        {/* 2 — Staggered work grid */}
        <WorkSection projects={projects} />

        {/* 3 — "A booster rocket" product CTA (matches HM mid-page banner) */}
        <ProductBanner />
      </main>

      {/* Footer */}
      <EditorialFooter />
    </>
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
