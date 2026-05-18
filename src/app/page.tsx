import HMNav from '@/components/editorial/EditorialNav';
import HeroSection from '@/components/sections/Hero';
import WorkSection from '@/components/sections/Work';
import ProductBanner from '@/components/sections/ProductBanner';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import prisma from '@/lib/prisma';
import type { Project } from '@prisma/client';

export default async function Home() {
  let homepageContent = null;
  let projects: Project[] = [];

  try {
    homepageContent = await prisma.homepageContent.findFirst();
    projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { sortOrder: 'asc' }
    });
  } catch {
    console.warn('Homepage CMS content unavailable; rendering static fallback.');
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
