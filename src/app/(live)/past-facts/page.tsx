import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import { PastFactsSky, type PastFact } from '@/components/site/PastFactsSky';

export const metadata: Metadata = {
  title: 'Past FACTs · FACT 2026',
  description: 'Every FACT has a theme. Revisit the ones that led to Mahiwagahan, and open each year’s booklet.',
};

// One entry per past conference; adding a year adds a star to the chart.
const ENTRIES: PastFact[] = [
  {
    year: '2025',
    theme: 'Ipahayag nang Malakas',
    gloss: 'Proclaim Loudly',
    booklet: 'https://drive.google.com/file/d/1sUWkaAzeOiFvnSTiOKbiH7et9I_TwRwg/view',
  },
  {
    year: '2024',
    theme: 'Magbubunga',
    gloss: 'Planting Prosperity',
    booklet:
      'https://www.canva.com/design/DAGWwo4xlZ0/vLFBOlCcY1tcmDNjXULjNA/view',
  },
  {
    year: '2023',
    theme: 'Kaalaman',
    gloss: 'Knowledge Is Power',
    booklet: 'https://drive.google.com/file/d/1ttf4_ulb__u3qKZLxajWz8VQyNF95pcL/view',
  },
];

// A fixed, seeded scatter of background stars, so every render draws the
// same sky. Plotted on a 1600x900 field that crops (never stretches) to fit.
const FIELD = (() => {
  let seed = 2026;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: 70 }, () => ({
    cx: Math.round(rand() * 1600),
    cy: Math.round(rand() * 900),
    r: Number((0.6 + rand() * 1.1).toFixed(2)),
    o: Number((0.15 + rand() * 0.45).toFixed(2)),
  }));
})();

export default function PastFactsPage() {
  return (
    <>
      <SiteHeader
        compact
        pageTitle="Past FACTs"
        pageSubtitle="The themes that led us to Mahiwagahan"
        active="past-facts"
      />

      <main id="below">
        <section className="section section--sky" aria-labelledby="sky-heading">
          <svg className="sky__field" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {[0, 1, 2].map((depth) => (
              <g key={depth} className={`sky__depth sky__depth--${depth}`}>
                {FIELD.filter((_, i) => i % 3 === depth).map((s, i) => (
                  <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
                ))}
              </g>
            ))}
          </svg>
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
            <h2 className="sr-only" id="sky-heading">
              Past themes, year by year
            </h2>
            <p className="section__intro sky__intro">
              Revisit each year’s theme and open its booklet. Photos from past years are still being gathered, so check back as this archive grows.
            </p>

            <PastFactsSky facts={ENTRIES} current={{ year: '2026', theme: 'Mahiwagahan' }} />
          </div>
        </section>

        <CrossLinks
          tone="night"
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
