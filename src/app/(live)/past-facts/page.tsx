import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Past FACTs · FACT 2026',
  description: 'A look back at past themes and conferences.',
};

const ENTRIES = [
  { year: '2025', theme: '"Ipahayag nang Malakas" — Proclaim Loudly', flag: 'Photos and booklet coming soon' },
  { year: '2024', theme: 'Theme TBD', flag: 'Theme, photos, and booklet coming soon' },
  { year: '2023', theme: 'Theme TBD', flag: 'Theme, photos, and booklet coming soon' },
];

function PhotoPlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export default function PastFactsPage() {
  return (
    <>
      <SiteHeader compact pageTitle="Past FACTs" pageSubtitle="A look back at past themes and conferences." />

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
              Photos and booklet links are being gathered from past years — check back as this archive grows.
            </p>

            <div className="pastfacts__list">
              {ENTRIES.map((entry) => (
                <article className="pastfacts__entry" key={entry.year}>
                  <div className="pastfacts__photo" aria-hidden="true">
                    <PhotoPlaceholderIcon />
                  </div>
                  <div className="pastfacts__body">
                    <p className="pastfacts__year">{entry.year}</p>
                    <p className="pastfacts__theme">{entry.theme}</p>
                    <span className="pastfacts__flag">{entry.flag}</span>
                  </div>
                  <button
                    className="pill pill--ink pastfacts__link"
                    type="button"
                    aria-disabled="true"
                    title="Booklet coming soon"
                  >
                    View Booklet<span className="sr-only">. Booklet coming soon</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <nav className="crosslink" aria-label="More to explore">
          <div className="crosslink__inner">
            <p className="crosslink__label">Continue exploring</p>
            <div className="crosslink__links">
              <Link className="crosslink__link" href="/about">
                <span>About Us</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link className="crosslink__link" href="/team">
                <span>Team</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </nav>

        <SiteFooter />
      </main>
    </>
  );
}
