import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Agenda · FACT 2026',
  description: 'Three days at UIUC: the full FACT 2026 program.',
};

const DAYS = [
  { date: '16', weekday: 'Friday · Oct 16', items: ['Delegate Day'], solo: true },
  { date: '17', weekday: 'Saturday · Oct 17', items: ['Palenke Day 1', 'V-Show'], solo: false },
  { date: '18', weekday: 'Sunday · Oct 18', items: ['Palenke Day 2', 'Bye-Bye Brunch'], solo: false },
];

export default function AgendaPage() {
  return (
    <>
      <SiteHeader compact pageTitle="Agenda" pageSubtitle="Three days at UIUC: the full program." />

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
            <div className="agenda__rows">
              {DAYS.map((day) => (
                <article className="agenda__day" key={day.date}>
                  <div className="agenda__daymeta">
                    <p className="agenda__date">{day.date}</p>
                    <p className="agenda__weekday">{day.weekday}</p>
                  </div>
                  <ul className={day.solo ? 'agenda__list agenda__list--solo' : 'agenda__list'}>
                    {day.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <nav className="crosslink" aria-label="More to explore">
          <div className="crosslink__inner">
            <p className="crosslink__label">Continue exploring</p>
            <div className="crosslink__links">
              <Link className="crosslink__link" href="/workshops">
                <span>Workshops</span>
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
              <Link className="crosslink__link" href="/faq">
                <span>FAQ</span>
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
