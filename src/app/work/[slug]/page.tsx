import prisma from '@/lib/prisma';
import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/sections/ProjectDetailClient';

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({ select: { slug: true } });
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    console.warn("Database unreachable during generateStaticParams, skipping static generation.");
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  return {
    title: project ? `${project.title} — SilkByteX` : 'Project — SilkByteX',
    description: project?.shortDescription,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    notFound();
  }

  // Find the next project for the "next project" CTA
  const nextProjectData = await prisma.project.findFirst({
    where: { sortOrder: { gt: project.sortOrder } },
    orderBy: { sortOrder: 'asc' }
  });

  // Map the Prisma object to the format expected by ProjectDetailClient
  const mappedProject = {
    ...project,
    client: project.client || undefined,
    year: project.year || undefined,
    tagline: undefined, // Prisma project doesn't have a tagline
    summary: project.shortDescription || '',
    size: 'large' as const,
    kicker: project.kicker || project.category || '',
    intro: project.longDescription || '',
    services: project.servicesUsed ? project.servicesUsed.split(',').map(s => s.trim()) : undefined,
    color: project.color || '#000000',
    challenge: project.challenge ? { heading: 'The Challenge', body: project.challenge } : undefined,
    approach: project.approach ? { heading: 'The Approach', body: project.approach } : undefined,
    outcome: project.outcome ? { heading: 'The Outcome', body: project.outcome } : undefined,
    quote: project.quoteText ? { text: project.quoteText, attribution: project.quoteAttribution || '' } : undefined,
    nextProject: nextProjectData?.slug || undefined
  };

  const mappedNextProject = nextProjectData ? {
    ...nextProjectData,
    client: nextProjectData.client || undefined,
    year: nextProjectData.year || undefined,
    tagline: undefined,
    summary: nextProjectData.shortDescription || '',
    size: 'large' as const,
    kicker: nextProjectData.kicker || nextProjectData.category || '',
    intro: nextProjectData.longDescription || '',
    services: nextProjectData.servicesUsed ? nextProjectData.servicesUsed.split(',').map(s => s.trim()) : undefined,
    color: nextProjectData.color || '#000000',
    challenge: nextProjectData.challenge ? { heading: 'The Challenge', body: nextProjectData.challenge } : undefined,
    approach: nextProjectData.approach ? { heading: 'The Approach', body: nextProjectData.approach } : undefined,
    outcome: nextProjectData.outcome ? { heading: 'The Outcome', body: nextProjectData.outcome } : undefined,
    quote: nextProjectData.quoteText ? { text: nextProjectData.quoteText, attribution: nextProjectData.quoteAttribution || '' } : undefined,
  } : null;

  return (
    <main className="hm-page">
      <EditorialNav />
      <ProjectDetailClient project={mappedProject} nextProject={mappedNextProject} />
      <EditorialFooter />
    </main>
  );
}
