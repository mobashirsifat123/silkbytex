// Site-wide constants

export const SITE = {
  name: 'SilkByteX',
  tagline: 'We Weave the Future of Software',
  description:
    'A premium software studio crafting digital experiences that transcend expectations.',
  url: 'https://silkbytex.com',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SERVICES = [
  {
    icon: 'Code2',
    title: 'Custom Software',
    description:
      'Bespoke applications architectured for scale. From MVPs to enterprise platforms, we engineer solutions that grow with your vision.',
  },
  {
    icon: 'Brain',
    title: 'AI & ML Solutions',
    description:
      'Intelligent systems that learn and adapt. We build predictive models, NLP engines, and computer vision pipelines that transform raw data into insight.',
  },
  {
    icon: 'Blocks',
    title: 'Web3 & Blockchain',
    description:
      'Decentralized applications, smart contracts, and token ecosystems. We architect trust into every transaction.',
  },
  {
    icon: 'Cloud',
    title: 'Cloud Architecture',
    description:
      'Scalable, resilient infrastructure on AWS, GCP, and Azure. CI/CD pipelines, microservices, and infrastructure-as-code.',
  },
  {
    icon: 'Palette',
    title: 'Design & UX',
    description:
      'Interfaces that feel like second nature. Research-driven design systems, prototyping, and pixel-perfect implementation.',
  },
] as const;

export const METRICS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '', label: 'Countries Served' },
  { value: 99, suffix: '%', label: 'Client Retention' },
] as const;

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Deep dive into your vision, market landscape, and technical requirements. We listen before we build.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Architecture decisions, technology selection, and roadmap planning aligned with your business goals.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'From wireframes to high-fidelity prototypes, we craft interfaces that delight users and drive engagement.',
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Agile sprints, clean code, rigorous testing. We ship fast without compromising quality.',
  },
  {
    number: '05',
    title: 'Launch & Scale',
    description:
      'Deployment, monitoring, and continuous optimization. We stay with you long after the first release.',
  },
] as const;

export const FOOTER_LINKS = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Custom Software', href: '/#services' },
    { label: 'AI & ML', href: '/#services' },
    { label: 'Web3', href: '/#services' },
    { label: 'Cloud', href: '/#services' },
    { label: 'Design', href: '/#services' },
  ],
  contact: {
    primaryCta: { label: 'Contact', href: '/contact' },
    secondaryCta: { label: 'Case Studies', href: '/#work' },
  },
} as const;

export const CASE_STUDIES = [
  {
    name: 'SilkByteX Marketing Site',
    role: 'Narrative strategy, UX design, frontend architecture',
    problem:
      'The homepage leaned on spectacle, filler sections, and borrowed proof patterns, which weakened trust and buried the actual offer.',
    solution:
      'SilkByteX rebuilt the homepage around a proof-first story, simplified the hero, removed unsupported sections, and moved static content back to server rendering.',
    outcome:
      'The site now presents a six-part narrative with one interactive client island on the homepage route and no dead homepage calls to action.',
    metrics: [
      '6-section homepage narrative',
      '1 interactive client island on the homepage route',
      '0 dead homepage CTAs',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: { label: 'View homepage', href: '/' },
  },
  {
    name: 'SilkByteX Contact System',
    role: 'Form UX, frontend engineering, API implementation',
    problem:
      'The site asked visitors to get in touch without a trustworthy submission path, visible feedback, or a confirmed delivery mechanism.',
    solution:
      'SilkByteX created a dedicated contact route, added client and server validation, and built a real submission pipeline with loading, success, and error states.',
    outcome:
      'Visitors now have one real inquiry flow backed by server-side validation and durable submission storage instead of a decorative form.',
    metrics: [
      'Dedicated /contact route',
      '4 validated fields with client and server checks',
      'Persistent submission capture in NDJSON storage',
    ],
    tech: ['Next.js App Router', 'TypeScript', 'Node.js'],
    link: { label: 'Open contact flow', href: '/contact' },
  },
  {
    name: 'SilkByteX Proof Standards',
    role: 'Content strategy, information architecture, frontend implementation',
    problem:
      'The previous proof layer depended on public products that were not attributable to SilkByteX and on testimonials that could not be defended.',
    solution:
      'SilkByteX replaced gallery cards with case-study reporting, removed borrowed public examples, and adopted a publish-only-with-attribution reference policy.',
    outcome:
      'The site now limits public proof to SilkByteX-owned work and explicitly avoids anonymous praise, invented clients, or unattributable examples.',
    metrics: [
      '0 borrowed public product examples',
      '0 anonymous testimonials',
      'Attribution required for published proof',
    ],
    tech: ['Content Strategy', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    link: { label: 'Read reference policy', href: '/#references' },
  },
] as const;

export const REFERENCE_NOTES = [
  {
    label: 'Published Status',
    title: 'No public client testimonials are shown without attribution.',
    description:
      'SilkByteX removed anonymous quotes, generic avatars, and named roles that could not be independently defended from the site.',
  },
  {
    label: 'Reference Process',
    title: 'Named client references are shared only with permission.',
    description:
      'When a project reaches an active proposal stage and client approval exists, SilkByteX can share attributable references privately and in context.',
  },
  {
    label: 'Proof Standard',
    title: 'Outcomes and responsibilities take priority over adjectives.',
    description:
      'This site now favors clear case-study reporting over praise-heavy marketing language, especially when public evidence is limited.',
  },
] as const;
