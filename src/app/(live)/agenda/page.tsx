import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import { AgendaSchedule } from '@/components/site/AgendaSchedule';
import { AGENDA, CONFERENCE_START } from './schedule';

export const metadata: Metadata = {
  title: 'Agenda · FACT 2026',
  description: 'Three days at UIUC: the full FACT 2026 program.',
};

export default function AgendaPage() {
  return (
    <>
      <SiteHeader compact active="agenda" pageTitle="Agenda" pageSubtitle="Three days at UIUC: the full program." />

      <main id="below">
        <section className="section section--agenda">
          <svg className="motif motif--tr motif--moon" viewBox="0 0 260 60" aria-hidden="true">
            <defs>
              <mask id="agenda-moon-2">
                <rect width="260" height="60" fill="white" />
                <circle cx="92" cy="30" r="18" fill="black" />
              </mask>
              <mask id="agenda-moon-4">
                <rect width="260" height="60" fill="white" />
                <circle cx="176" cy="30" r="18" fill="black" />
              </mask>
            </defs>
            <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="82" cy="30" r="18" fill="currentColor" mask="url(#agenda-moon-2)" />
            <path d="M134 12 A18 18 0 0 1 134 48 Z" fill="currentColor" />
            <circle cx="186" cy="30" r="18" fill="currentColor" mask="url(#agenda-moon-4)" />
            <circle cx="238" cy="30" r="18" fill="currentColor" />
          </svg>
          <div className="section__inner">
            <AgendaSchedule days={AGENDA} liveFrom={CONFERENCE_START} />
          </div>
        </section>

        <CrossLinks
          links={[
            { href: '/', label: 'Home' },
            { href: '/workshops', label: 'Workshops' },
            { href: '/variety-show', label: 'Variety Show' },
          ]}
        />

        <SiteFooter />
      </main>
    </>
  );
}
