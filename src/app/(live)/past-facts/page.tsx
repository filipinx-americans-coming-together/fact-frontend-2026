import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import { PhotoPlaceholderIcon } from '@/components/site/PhotoPlaceholderIcon';

export const metadata: Metadata = {
  title: 'Past FACTs · FACT 2026',
  description: 'A look back at our past themes and conferences!',
};

const ENTRIES = [
  {
    year: '2025',
    theme: '"Ipahayag nang Malakas" (Proclaim Loudly)',
    flag: 'Photos and booklet coming soon',
    booklet: null,
  },
  {
    year: '2024',
    theme: '"Magbubunga" (Planting Prosperity)',
    flag: 'Photos coming soon',
    booklet:
      'https://www.canva.com/design/DAGWwo4xlZ0/vLFBOlCcY1tcmDNjXULjNA/view?utm_content=DAGWwo4xlZ0&utm_campaign=designshare&utm_medium=link&utm_source=editor#15',
  },
  {
    year: '2023',
    theme: '"Kaalaman" (Knowledge Is Power)',
    flag: 'Photos and booklet coming soon',
    booklet: null,
  },
];

export default function PastFactsPage() {
  return (
    <>
      <SiteHeader
        compact
        pageTitle="Past FACTs"
        pageSubtitle="A look back at our past themes and conferences!"
        active="past-facts"
      />

      <main id="below">
        <section className="section section--pastfacts">
          <svg className="motif motif--tr motif--moon" viewBox="0 0 260 60" aria-hidden="true">
            <defs>
              <mask id="pastfacts-moon-2">
                <rect width="260" height="60" fill="white" />
                <circle cx="92" cy="30" r="18" fill="black" />
              </mask>
              <mask id="pastfacts-moon-4">
                <rect width="260" height="60" fill="white" />
                <circle cx="176" cy="30" r="18" fill="black" />
              </mask>
            </defs>
            <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="82" cy="30" r="18" fill="currentColor" mask="url(#pastfacts-moon-2)" />
            <path d="M134 12 A18 18 0 0 1 134 48 Z" fill="currentColor" />
            <circle cx="186" cy="30" r="18" fill="currentColor" mask="url(#pastfacts-moon-4)" />
            <circle cx="238" cy="30" r="18" fill="currentColor" />
          </svg>
          <div className="section__inner">
            <p className="section__intro">
              Photos and booklet links are being gathered from past years, so check back as this archive grows.
            </p>

            <div className="pastfacts__list">
              {ENTRIES.map((entry) => (
                <article className="pastfacts__entry" key={entry.year}>
                  <div className="pastfacts__photo" aria-hidden="true">
                    <PhotoPlaceholderIcon />
                  </div>
                  <h2 className="pastfacts__year">{entry.year}</h2>
                  <p className="pastfacts__theme">{entry.theme}</p>
                  <span className="pastfacts__flag">{entry.flag}</span>
                  {entry.booklet ? (
                    <a
                      className="pill pill--ink pastfacts__link"
                      href={entry.booklet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Booklet<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <button
                      className="pill pill--ink pastfacts__link"
                      type="button"
                      aria-disabled="true"
                      title="Booklet coming soon"
                    >
                      View Booklet<span className="sr-only">. Booklet coming soon</span>
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <CrossLinks
          links={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About Us' },
            { href: '/team', label: 'Team' },
          ]}
        />

        <SiteFooter />
      </main>
    </>
  );
}
