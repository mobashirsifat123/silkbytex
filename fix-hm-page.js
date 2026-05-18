const fs = require('fs');

const pageContent = `
import { prisma } from '@/lib/db';
import Image from 'next/image';

export default async function HMHome() {
  const content = await prisma.homepageContent.findFirst().catch(() => null);
  const projects = await prisma.project.findMany({
    where: { isDraft: false },
    orderBy: { sortOrder: 'asc' },
    take: 6,
  }).catch(() => []);

  const headline = content?.heroHeadline || "We make digital products, experiences, brands";

  return (
    <div className="hm-page">
      {/* Top Left Logo */}
      <div className="hm-logo">
        SilkByteX
      </div>

      {/* Pill menu on the right edge */}
      <div className="hm-pill">
        <div className="hm-pill__track"></div>
        <button className="hm-pill__btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Hero */}
      <section className="hm-hero">
        {content?.heroEyebrow && (
          <div className="hm-hero__label">{content.heroEyebrow}</div>
        )}
        <h1 className="hm-hero__cycling">
          {headline}
        </h1>
      </section>

      {/* Work */}
      <section className="hm-work">
        <div className="hm-work__label">Selected Work</div>
        <div className="hm-work-grid">
          {projects.map((p) => (
            <div key={p.id} className="hm-card">
              <div className="hm-card__visual">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.title} fill />
                ) : (
                  <div className="absolute inset-0 bg-[#d9d9d9]"></div>
                )}
              </div>
              <div className="hm-card__meta">
                <div className="hm-card__tags">{p.category || 'Digital'}</div>
                <div className="hm-card__title">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="hm-caps">
        <div className="hm-caps__label">Capabilities</div>
        <div className="hm-caps__list">
          <div className="hm-caps__item">Strategy</div>
          <div className="hm-caps__item">Design</div>
          <div className="hm-caps__item">Engineering</div>
          <div className="hm-caps__item">Brand</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hm-footer">
        <div className="hm-footer__contact">
          <div className="hm-footer__contact-cell">
            <div className="hm-footer__contact-label">New Business</div>
            <a href="mailto:hello@silkbytex.com" className="hm-footer__contact-link">hello@silkbytex.com</a>
          </div>
          <div className="hm-footer__contact-cell">
            <div className="hm-footer__contact-label">Careers</div>
            <a href="mailto:jobs@silkbytex.com" className="hm-footer__contact-link">jobs@silkbytex.com</a>
          </div>
        </div>

        <div className="hm-footer__wave">
          <div className="hm-footer__back" onClick="window.scrollTo(0,0)">Back to Top</div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageContent.trim());
console.log('Done Page');
