'use client';

import Link from 'next/link';
import { useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { WorkProject } from '@/lib/work-projects';

const capabilities = ['Websites', 'SaaS', 'AI automation', 'Commerce', 'Dashboards', 'Internal tools', 'Brand systems'];

function ProjectPoster({ color, index }: { color: string; index: number }) {
  return (
    <div className="hm-work__poster" style={{ backgroundColor: color }}>
      <div className="hm-work__poster-noise" />
      <span className="hm-work__poster-orbit hm-work__poster-orbit--outer hm-work__parallax-slow" />
      <span className="hm-work__poster-orbit hm-work__poster-orbit--inner hm-work__parallax-fast" />
      <span className={`hm-work__poster-dot hm-work__poster-dot--${index % 4} hm-work__parallax-dots`} />
      <span className="hm-work__poster-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

function WorkCard({
  project,
  staggerIndex,
}: {
  project: WorkProject;
  staggerIndex: number;
}) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const nx = x * 2 - 1;
      const ny = y * 2 - 1;

      el.style.setProperty('--mx', String(nx));
      el.style.setProperty('--my', String(ny));
    },
    [reduceMotion],
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  }, []);

  const tags = project.servicesUsed ? project.servicesUsed.split(',').map((s: string) => s.trim()) : [];

  return (
    <motion.article
      ref={cardRef}
      className={`hm-work__card hm-work__card--${staggerIndex % 6}`}
      style={{ '--mx': '0', '--my': '0' } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reduceMotion ? false : { opacity: 0, y: 72, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: staggerIndex * 0.1 }}
    >
      <Link href={`/work/${project.slug}`} className="hm-work__card-link">
        <ProjectPoster color={project.color || '#000'} index={staggerIndex} />

        <div className="hm-work__card-meta">
          <div>
            <p className="hm-work__card-filter">Filter by</p>
            <p className="hm-work__card-category">{project.category || project.kicker}</p>
          </div>
          <div className="hm-work__card-tags">
            {tags.slice(0, 2).map((tag: string) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <h3 className="hm-work__card-title">{project.title}</h3>
      </Link>
    </motion.article>
  );
}

export default function WorkSection({ projects = [] }: { projects?: WorkProject[] }) {
  return (
    <section id="work" className="hm-work">
      <motion.div
        className="hm-work__header"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-18% 0px' }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hm-work__header-label">Selected work</span>
        <div className="hm-work__filters" aria-label="Project categories">
          {['All', 'Websites', 'SaaS', 'Automation', 'Commerce', 'Branding'].map((filter) => (
            <button key={filter} type="button">
              {filter}
            </button>
          ))}
        </div>
        <Link href="/work" className="hm-work__header-link">
          View all projects
        </Link>
      </motion.div>

      <div className="hm-work__grid">
        {projects.map((project, i) => (
          <WorkCard key={project.id || project.slug} project={project} staggerIndex={i} />
        ))}
      </div>

      <section className="hm-service-marquee" aria-label="SilkByteX capabilities">
        <div>
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
        <div aria-hidden="true">
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>
    </section>
  );
}
