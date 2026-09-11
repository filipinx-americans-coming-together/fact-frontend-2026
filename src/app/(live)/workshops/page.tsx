'use client';

import { useMemo, useState } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { useWorkshops } from '@/hooks/api/useWorkshops';

export default function WorkshopsPage() {
  const { workshops } = useWorkshops();
  const [query, setQuery] = useState('');

  const sessions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bySession = new Map<number, typeof workshops>();

    (workshops ?? []).forEach((workshop) => {
      const matches =
        !q || workshop.title.toLowerCase().includes(q) || workshop.description.toLowerCase().includes(q);
      if (!matches) return;
      const list = bySession.get(workshop.session) ?? [];
      list.push(workshop);
      bySession.set(workshop.session, list);
    });

    return Array.from(bySession.entries()).sort(([a], [b]) => a - b);
  }, [workshops, query]);

  const totalVisible = sessions.reduce((sum, [, items]) => sum + (items?.length ?? 0), 0);

  return (
    <>
      <SiteHeader compact pageTitle="Workshops" pageSubtitle="Browse this year's sessions." />

      <main id="below">
        <section className="section section--workshops">
          <svg className="motif motif--tr motif--butterfly" viewBox="0 0 100 80" aria-hidden="true">
            <path d="M50 20C30 5 10 15 15 30 18 40 35 38 50 28" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M50 28C35 38 20 42 18 52 16 60 30 62 50 45" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M50 20C70 5 90 15 85 30 82 40 65 38 50 28" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M50 28C65 38 80 42 82 52 84 60 70 62 50 45" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path
              d="M50 15C46 10 42 8 40 5M50 15C54 10 58 8 60 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
          <div className="section__inner">
            <p className="section__intro">
              Browse this year&apos;s workshop lineup below. Delegates choose their sessions after registering, from
              the My FACT dashboard.
            </p>

            <div className="workshops__search">
              <label className="sr-only" htmlFor="workshop-search-input">
                Search workshops
              </label>
              <input
                type="search"
                id="workshop-search-input"
                className="workshops__searchinput"
                placeholder="Search workshops by title or topic"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {!workshops ? (
              <p className="workshops__empty">Loading workshops&hellip;</p>
            ) : totalVisible === 0 ? (
              <p className="workshops__empty">No workshops match your search. Try a different word.</p>
            ) : (
              <div className="workshops__sessions">
                {sessions.map(([session, items]) => (
                  <div key={session}>
                    <h2 className="groupheading">Session {session}</h2>
                    <div>
                      {items?.map((workshop) => (
                        <article className="workshop__row" key={workshop.id}>
                          <div className="workshop__facilitator" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="12" cy="8.5" r="3.4" />
                              <path d="M5.3 19.5c.7-4.1 3.3-6.3 6.7-6.3s6 2.2 6.7 6.3" />
                            </svg>
                          </div>
                          <div className="workshop__info">
                            <h3 className="workshop__title">{workshop.title}</h3>
                            <p className="workshop__desc">{workshop.description}</p>
                            {workshop.facilitators && workshop.facilitators.length > 0 ? (
                              <p className="workshop__desc">Facilitated by {workshop.facilitators.join(', ')}</p>
                            ) : null}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
