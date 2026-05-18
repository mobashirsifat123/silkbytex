export const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];


// ─── Project types ─────────────────────────────────────────
export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  color: string;
  size: 'large' | 'medium' | 'small';
  // Extended case-study fields (optional for cards that don't have detail pages yet)
  client?: string;
  year?: string;
  services?: string[];
  tagline?: string;
  intro?: string;
  challenge?: ProjectSection;
  approach?: ProjectSection;
  outcome?: ProjectSection;
  quote?: { text: string; attribution: string };
  nextProject?: string; // slug of next project
};

export const projects: Project[] = [
  {
    slug: 'ai-automation',
    title: 'AI Automation OS',
    kicker: 'AI / Automation',
    summary: 'A connected automation platform designed to help teams replace repetitive workflows with intelligent, reliable systems.',
    color: '#91d7c8',
    size: 'large',
    client: 'Internal Platform',
    year: '2024',
    services: ['Systems Design', 'AI Integration', 'Workflow Automation', 'Platform Engineering'],
    tagline: 'Replace repetition with intelligence.',
    intro: 'Growing teams were losing hours every week to fragmented tools, manual handoffs, and repetitive operational tasks that no one had time to fix. We designed a central automation layer — an operating system for how modern teams actually work.',
    challenge: {
      heading: 'The Challenge',
      body: 'As organisations scale, their tooling rarely keeps pace. What once worked for a team of five becomes a tangle of spreadsheets, Slack pings, and human-dependent handoffs for a team of fifty. Our client faced this exact inflection point: every new hire added complexity instead of capacity. The cost was invisible but enormous — measured in context-switching, dropped tasks, and decisions that never got made.',
    },
    approach: {
      heading: 'The Approach',
      body: 'We designed a central automation layer that connects forms, dashboards, notifications, and AI-assisted workflows into a single coherent operating system. Rather than replacing tools, we built bridges between them — using lightweight logic nodes, conditional triggers, and natural language summaries to surface the right information at the right moment. Every automation was designed to be understandable, not just functional.',
    },
    outcome: {
      heading: 'The Outcome',
      body: 'A cleaner operating system for internal teams — one where manual work is the exception, not the rule. The platform reduced repetitive task load by an estimated 60%, gave managers real-time operational visibility, and made automation accessible to non-technical team members for the first time. The system continues to evolve as the team grows.',
    },
    quote: {
      text: 'For the first time, our team can focus on the work that actually matters. Everything else just happens.',
      attribution: 'Head of Operations',
    },
    nextProject: 'commerce',
  },
  {
    slug: 'commerce',
    title: 'Commerce Engine',
    kicker: 'Commerce / Web',
    summary: 'A flexible e-commerce platform focused on speed, clarity, and scalable product operations.',
    color: '#f6d250',
    size: 'medium',
    client: 'Digital Commerce Brand',
    year: '2024',
    services: ['Commerce Strategy', 'Platform Architecture', 'UX Design', 'CMS Integration'],
    tagline: 'Commerce built for how teams actually grow.',
    intro: 'Product teams needed a faster way to manage storefront content, orders, campaigns, and customer flows — without building a bespoke system from scratch. We created a modular commerce engine that grows with the business.',
    challenge: {
      heading: 'The Challenge',
      body: 'The client\'s existing commerce setup had grown organically, which meant it was held together by workarounds. Launching a new product required touching five different systems. Running a promotion meant updating three separate spreadsheets. Customer data lived in four different places. The team was spending more time managing tools than selling.',
    },
    approach: {
      heading: 'The Approach',
      body: 'We rebuilt the commerce layer around a single source of truth — a modular platform with clean dashboards, reusable component blocks, and an automation-friendly data structure. Product information, pricing rules, campaign logic, and customer segments all live in one connected system. The storefront pulls directly from this layer, meaning updates publish in seconds, not hours.',
    },
    outcome: {
      heading: 'The Outcome',
      body: 'A smoother commerce workflow that supports growth without adding operational complexity. The team can now launch a new product in under fifteen minutes, run targeted campaigns without developer support, and see real-time order and inventory data from a single dashboard. Revenue per operational hour increased significantly in the first quarter after launch.',
    },
    quote: {
      text: 'We went from dreading launches to actually enjoying them. The platform just works the way commerce should.',
      attribution: 'E-commerce Director',
    },
    nextProject: 'saas',
  },
  {
    slug: 'saas',
    title: 'Fintech dashboard',
    kicker: 'SaaS / Product',
    summary: 'A sleek, data-dense financial dashboard for real-time portfolio management.',
    color: '#9ca8ff',
    size: 'small',
  },
  {
    slug: 'booking',
    title: 'Global booking system',
    kicker: 'Web / App',
    summary: 'A unified booking engine serving thousands of daily transactions globally.',
    color: '#f18975',
    size: 'medium',
  },
  {
    slug: 'operations',
    title: 'Internal ops toolkit',
    kicker: 'Internal Tools',
    summary: 'A suite of internal tools streamlining employee onboarding and asset management.',
    color: '#c7e66b',
    size: 'small',
  },
  {
    slug: 'brand',
    title: 'Brand identity system',
    kicker: 'Branding / Web',
    summary: 'A comprehensive digital brand identity for a rapidly scaling startup.',
    color: '#d9c2ff',
    size: 'large',
  },
];


export const services = [
  {
    title: 'Product Strategy',
    slug: 'strategy',
    short: 'Defining the right product to build.',
    description:
      'We help you identify market opportunities, define user needs, and create a roadmap that aligns with your business goals.',
  },
  {
    title: 'Digital Platforms',
    slug: 'platforms',
    short: 'Building scalable software systems.',
    description:
      'From complex SaaS applications to high-performance e-commerce platforms, we engineer robust digital products.',
  },
  {
    title: 'Brand & Identity',
    slug: 'brand',
    short: 'Creating memorable digital brands.',
    description:
      'We craft cohesive brand identities that resonate across all digital touchpoints, ensuring a premium user experience.',
  },
];
