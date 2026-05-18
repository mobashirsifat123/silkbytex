import type { Project as PrismaProject } from '@prisma/client';

export type WorkProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  kicker: string;
  client?: string;
  year?: string;
  shortDescription: string;
  longDescription: string;
  servicesUsed: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  quoteText?: string;
  quoteAttribution?: string;
  color: string;
  projectStatus: string;
  isFeatured: boolean;
  isDraft: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const now = new Date('2026-01-01T00:00:00.000Z');

export const fallbackWorkProjects: WorkProject[] = [
  {
    id: 'fallback-ai-automation-os',
    slug: 'ai-automation-os',
    title: 'AI Automation OS',
    category: 'Automation',
    kicker: 'AI Systems / Operations',
    client: 'Operations team',
    year: '2026',
    shortDescription:
      'A connected automation layer for replacing repetitive operations with reliable AI-assisted workflows.',
    longDescription:
      'SilkByteX designed a lightweight operating system for teams that need approvals, intake, summaries, notifications, and dashboards to move without manual follow-up.',
    servicesUsed: 'AI Systems, Workflow Automation, Internal Tools',
    challenge:
      'The team had important work scattered across forms, inboxes, spreadsheets, and chat. Every handoff depended on someone remembering the next step.',
    approach:
      'We mapped the operational flow, designed a central data model, and connected the repetitive steps through readable automations and human review checkpoints.',
    outcome:
      'The result is a clearer internal system where work is visible, repetitive tasks are automated, and team leads can see what needs attention.',
    quoteText:
      'The system makes our daily operations feel calmer and easier to trust.',
    quoteAttribution: 'Operations lead',
    color: '#8fd8c7',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-commerce-engine',
    slug: 'commerce-engine',
    title: 'Commerce Engine',
    category: 'Commerce',
    kicker: 'E-commerce Platform',
    client: 'Digital commerce brand',
    year: '2026',
    shortDescription:
      'A modular commerce platform for fast product launches, campaign management, and cleaner storefront operations.',
    longDescription:
      'SilkByteX built a commerce foundation that connects catalog data, launch workflows, landing pages, and operational dashboards into one manageable system.',
    servicesUsed: 'E-commerce Development, CMS Architecture, Growth Systems',
    challenge:
      'Launching products required too many manual updates across disconnected tools, which slowed campaigns and created avoidable mistakes.',
    approach:
      'We shaped the platform around reusable product blocks, structured content, clean order visibility, and fast publishing workflows.',
    outcome:
      'The commerce team can launch faster, manage content with less developer support, and keep the storefront aligned with live operations.',
    quoteText:
      'Product launches became faster because the platform finally matched how our team works.',
    quoteAttribution: 'Commerce director',
    color: '#f2ce4a',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-founder-saas-dashboard',
    slug: 'founder-saas-dashboard',
    title: 'Founder SaaS Dashboard',
    category: 'SaaS',
    kicker: 'Product Dashboard',
    client: 'Founder-led SaaS',
    year: '2026',
    shortDescription:
      'A focused product dashboard that turns revenue, onboarding, retention, and support signals into readable decisions.',
    longDescription:
      'SilkByteX created a dashboard experience for founders who need to understand product health quickly without digging through disconnected analytics tools.',
    servicesUsed: 'SaaS Product Development, Dashboard UX, Analytics Design',
    challenge:
      'The founder had data, but not a usable operating view. Important signals were buried across analytics, CRM, billing, and support tools.',
    approach:
      'We prioritized the few metrics that drive action, designed clear dashboard states, and created a responsive interface for repeated daily use.',
    outcome:
      'The dashboard gives leadership a faster way to spot growth opportunities, onboarding issues, and retention risks.',
    quoteText:
      'It finally feels like one place to understand the product instead of another reporting chore.',
    quoteAttribution: 'SaaS founder',
    color: '#9ba6ff',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-booking-platform',
    slug: 'booking-platform',
    title: 'Booking Platform',
    category: 'Platform',
    kicker: 'Booking / Scheduling',
    client: 'Service marketplace',
    year: '2026',
    shortDescription:
      'A conversion-focused booking system for appointments, availability, payments, and operational control.',
    longDescription:
      'SilkByteX shaped a booking experience that helps customers move from interest to confirmed appointment while giving operators a cleaner way to manage calendars, capacity, and changes.',
    servicesUsed: 'Platform Design, Scheduling Logic, Payments, Dashboard UX',
    challenge:
      'Customers were dropping out during booking because availability, pricing, and confirmation steps felt disconnected.',
    approach:
      'We redesigned the booking flow around clear decisions, resilient calendar logic, and a back-office dashboard that keeps operations in sync.',
    outcome:
      'The platform makes booking faster for customers and easier for internal teams to manage during busy periods.',
    quoteText:
      'The new booking flow feels direct, polished, and much easier for our team to operate.',
    quoteAttribution: 'Marketplace operator',
    color: '#ef8a74',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-internal-operations-portal',
    slug: 'internal-operations-portal',
    title: 'Internal Operations Portal',
    category: 'Internal Tools',
    kicker: 'Operations / Dashboard',
    client: 'Growing service team',
    year: '2026',
    shortDescription:
      'A private operations portal for intake, approvals, task visibility, team handoffs, and leadership reporting.',
    longDescription:
      'SilkByteX created a portal that turns scattered internal work into a single operational surface with the right views for contributors, managers, and leadership.',
    servicesUsed: 'Internal Tools, Dashboard Design, Workflow Systems',
    challenge:
      'Internal work was moving through too many informal channels, making ownership hard to track and delays hard to diagnose.',
    approach:
      'We built role-based views, structured intake, approval states, and simple reporting around the team’s real operating rhythm.',
    outcome:
      'The team gained clearer ownership, faster handoffs, and a more reliable picture of active work.',
    quoteText:
      'It gave our team one shared place to understand what is moving and what is stuck.',
    quoteAttribution: 'Team lead',
    color: '#c7e66b',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-brand-system-digital-studio',
    slug: 'brand-system-digital-studio',
    title: 'Brand System for Digital Studio',
    category: 'Branding',
    kicker: 'Identity / Web System',
    client: 'Digital studio',
    year: '2026',
    shortDescription:
      'A flexible digital brand system with typography, interface rules, content rhythm, and reusable website components.',
    longDescription:
      'SilkByteX developed a digital-first identity system designed to keep a growing studio consistent across its website, decks, campaigns, and product surfaces.',
    servicesUsed: 'Brand Identity, Design System, Website Design',
    challenge:
      'The studio had strong ideas but no shared system, which made every new page and campaign feel like a fresh design problem.',
    approach:
      'We created a focused brand foundation, modular layouts, expressive typography rules, and a reusable component vocabulary.',
    outcome:
      'The team can now create new digital surfaces faster while keeping the brand recognizable and premium.',
    quoteText:
      'The system gave us a brand language we can actually use every week.',
    quoteAttribution: 'Studio founder',
    color: '#d8c3ff',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-growth-system',
    slug: 'growth-system',
    title: 'Digital Growth System',
    category: 'Growth',
    kicker: 'Website / Funnel System',
    client: 'B2B startup',
    year: '2026',
    shortDescription:
      'A website and growth system built around landing pages, lead routing, analytics, and rapid content iteration.',
    longDescription:
      'SilkByteX turned a static marketing site into a growth-ready system where campaigns, landing pages, and conversion signals can improve together.',
    servicesUsed: 'Website Development, Growth Systems, Analytics',
    challenge:
      'The existing site looked acceptable but could not support fast campaigns, clear attribution, or confident content changes.',
    approach:
      'We rebuilt the website around reusable page patterns, campaign-specific entry points, analytics events, and a cleaner publishing workflow.',
    outcome:
      'The team can launch targeted pages faster and understand which messages are actually creating qualified conversations.',
    quoteText:
      'It stopped being just a website and became part of how we grow.',
      quoteAttribution: 'Growth lead',
    color: '#82b7ff',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-ai-support-console',
    slug: 'ai-support-console',
    title: 'AI Support Console',
    category: 'AI',
    kicker: 'Support / Automation',
    client: 'Customer success team',
    year: '2026',
    shortDescription:
      'An AI-assisted support console for triage, summaries, response drafting, and customer health visibility.',
    longDescription:
      'SilkByteX designed a support workspace that helps teams move faster without losing judgment, context, or the human tone customers expect.',
    servicesUsed: 'AI Automation, SaaS Tools, Support Operations',
    challenge:
      'Support agents were switching between tickets, docs, CRM notes, and product data before they could answer simple requests.',
    approach:
      'We designed a console that brings customer context together, drafts suggested replies, and highlights urgent signals for human review.',
    outcome:
      'The support team can respond with more context, reduce repetitive writing, and identify account risk sooner.',
    quoteText:
      'It helps us answer faster without sounding automated.',
    quoteAttribution: 'Customer success manager',
    color: '#f4a7c5',
    projectStatus: 'published',
    isFeatured: true,
    isDraft: false,
    sortOrder: 8,
    createdAt: now,
    updatedAt: now,
  },
];

export function mapPrismaProject(project: PrismaProject): WorkProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category || project.kicker || 'Work',
    kicker: project.kicker || project.category || 'Work',
    client: project.client || undefined,
    year: project.year || undefined,
    shortDescription: project.shortDescription || '',
    longDescription: project.longDescription || '',
    servicesUsed: project.servicesUsed || '',
    challenge: project.challenge || undefined,
    approach: project.approach || undefined,
    outcome: project.outcome || undefined,
    quoteText: project.quoteText || undefined,
    quoteAttribution: project.quoteAttribution || undefined,
    color: project.color || '#8fd8c7',
    projectStatus: project.projectStatus || 'published',
    isFeatured: project.isFeatured,
    isDraft: project.isDraft,
    sortOrder: project.sortOrder,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export function getPublicProjects(projects: PrismaProject[]): WorkProject[] {
  return projects
    .filter((project) => {
      const status = (project.projectStatus || '').toLowerCase();
      return !project.isDraft && (!status || status === 'published');
    })
    .sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
    .map(mapPrismaProject);
}

export function getFeaturedProjects(projects: PrismaProject[]): WorkProject[] {
  const publicProjects = getPublicProjects(projects);
  const featured = publicProjects.filter((project) => project.isFeatured);
  return featured.length > 0 ? featured : publicProjects;
}

export function withFallbackProjects(projects: WorkProject[], minimum = 8): WorkProject[] {
  if (projects.length >= minimum) return projects;

  const existingSlugs = new Set(projects.map((project) => project.slug));
  const missingFallbacks = fallbackWorkProjects.filter((project) => !existingSlugs.has(project.slug));

  return [...projects, ...missingFallbacks].slice(0, minimum);
}

export function getFallbackProject(slug: string): WorkProject | undefined {
  return fallbackWorkProjects.find((project) => project.slug === slug);
}
