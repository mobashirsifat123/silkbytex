import prisma from '@/lib/prisma';
import EditorialNav from '@/components/editorial/EditorialNav';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/sections/ProjectDetailClient';
import {
  fallbackWorkProjects,
  getFallbackProject,
  mapPrismaProject,
  type WorkProject,
} from '@/lib/work-projects';

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({ select: { slug: true } });
    const cmsParams = projects.map((project) => ({
      slug: project.slug,
    }));
    const fallbackParams = fallbackWorkProjects.map((project) => ({
      slug: project.slug,
    }));
    return [...cmsParams, ...fallbackParams];
  } catch (error) {
    console.warn("Database unreachable during generateStaticParams, using fallback work routes.", getErrorMessage(error));
    return fallbackWorkProjects.map((project) => ({
      slug: project.slug,
    }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project: { title: string; shortDescription?: string | null } | undefined | null;

  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch (error) {
    console.warn("Project metadata fetch failed; using fallback metadata when available.", getErrorMessage(error));
  }

  project ||= getFallbackProject(slug);

  return {
    title: project ? `${project.title} — SilkByteX` : 'Project — SilkByteX',
    description: project?.shortDescription,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project: WorkProject | undefined;
  let nextProject: WorkProject | null = null;

  try {
    const cmsProject = await prisma.project.findUnique({ where: { slug } });

    if (cmsProject && !cmsProject.isDraft && (cmsProject.projectStatus || 'published') === 'published') {
      project = mapPrismaProject(cmsProject);

      const nextProjectData = await prisma.project.findFirst({
        where: {
          isDraft: false,
          projectStatus: 'published',
          sortOrder: { gt: cmsProject.sortOrder },
        },
        orderBy: { sortOrder: 'asc' }
      });

      nextProject = nextProjectData ? mapPrismaProject(nextProjectData) : null;
    }
  } catch (error) {
    console.warn("Project fetch failed; using fallback project when available.", getErrorMessage(error));
  }

  project ||= getFallbackProject(slug);

  if (!project) {
    notFound();
  }

  if (!nextProject) {
    const currentIndex = fallbackWorkProjects.findIndex((item) => item.slug === project.slug);
    nextProject = currentIndex >= 0
      ? fallbackWorkProjects[(currentIndex + 1) % fallbackWorkProjects.length]
      : null;
  }

  return (
    <main className="hm-page">
      <EditorialNav />
      <ProjectDetailClient project={toProjectDetail(project)} nextProject={nextProject ? toProjectDetail(nextProject) : null} />
      <EditorialFooter />
    </main>
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function toProjectDetail(project: WorkProject) {
  return {
    slug: project.slug,
    title: project.title,
    client: project.client,
    year: project.year,
    tagline: project.shortDescription,
    summary: project.shortDescription,
    size: 'large' as const,
    kicker: project.kicker || project.category,
    intro: project.longDescription,
    services: project.servicesUsed ? project.servicesUsed.split(',').map((service) => service.trim()) : undefined,
    color: project.color,
    challenge: project.challenge ? { heading: 'The Challenge', body: project.challenge } : undefined,
    approach: project.approach ? { heading: 'The Approach', body: project.approach } : undefined,
    outcome: project.outcome ? { heading: 'The Outcome', body: project.outcome } : undefined,
    quote: project.quoteText ? { text: project.quoteText, attribution: project.quoteAttribution || '' } : undefined,
  };
}
