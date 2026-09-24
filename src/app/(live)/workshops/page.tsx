'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { useWorkshops } from '@/hooks/api/useWorkshops';
import { useLocations } from '@/hooks/api/useLocations';
import { LocationData } from '@/util/types';
import { getFacilitatorForWorkshop } from '@/util/facilitatorPhotos';
import { SESSION_TIMES } from '@/util/constants';

const DESC_CLAMP_THRESHOLD = 220;

function useIdToggleSet() {
  const [ids, setIds] = useState<Set<number>>(new Set());
  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);
  return [ids, toggle] as const;
}

export default function WorkshopsPage() {
  const { workshops } = useWorkshops();
  const { locations } = useLocations();
  const [query, setQuery] = useState('');
  const [sessionFilter, setSessionFilter] = useState<number | 'all'>('all');
  const [expandedIds, toggleExpanded] = useIdToggleSet();
  const [openBioIds, toggleBio] = useIdToggleSet();

  const locationsById = useMemo(() => {
    const map = new Map<number, LocationData>();
    (locations ?? []).forEach((location) => map.set(location.id, location));
    return map;
  }, [locations]);

  const sessions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bySession = new Map<number, typeof workshops>();

    (workshops ?? []).forEach((workshop) => {
      if (sessionFilter !== 'all' && workshop.session !== sessionFilter) return;
      const matches =
        !q || workshop.title.toLowerCase().includes(q) || workshop.description.toLowerCase().includes(q);
      if (!matches) return;
      const list = bySession.get(workshop.session) ?? [];
      list.push(workshop);
      bySession.set(workshop.session, list);
    });

    return Array.from(bySession.entries()).sort(([a], [b]) => a - b);
  }, [workshops, query, sessionFilter]);

  const totalVisible = sessions.reduce((sum, [, items]) => sum + (items?.length ?? 0), 0);

  return (
    <>
      <SiteHeader compact pageTitle="Workshops" pageSubtitle="Browse this year's sessions." active="workshops" />

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
              Browse this year&apos;s workshop lineup below.
            </p>

            <div className="workshops__sessionfilter" role="group" aria-label="Filter by session">
              {(['all', 1, 2, 3] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className="workshops__sessionpill"
                  aria-pressed={sessionFilter === option}
                  onClick={() => setSessionFilter(option)}
                >
                  {option === 'all' ? 'All sessions' : `Session ${option}`}
                </button>
              ))}
            </div>

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

            <p className="sr-only" aria-live="polite">
              {query.trim() || sessionFilter !== 'all'
                ? `${totalVisible} workshop${totalVisible === 1 ? '' : 's'} found`
                : ''}
            </p>

            {!workshops ? (
              <p className="workshops__empty">Loading workshops&hellip;</p>
            ) : totalVisible === 0 ? (
              <p className="workshops__empty">No workshops match your search. Try a different word.</p>
            ) : (
              <div className="workshops__sessions">
                {sessions.map(([session, items]) => (
                  <div key={session}>
                    <h2 className="groupheading">
                      Session {session}{' '}
                      <span className="groupheading__count">
                        &middot; {items?.length ?? 0} workshop{items?.length === 1 ? '' : 's'}
                      </span>
                    </h2>
                    <div>
                      {items?.map((workshop) => {
                        const location = locationsById.get(workshop.location);
                        const hasRealLocation =
                          !!location?.building && location.building.trim().toLowerCase() !== 'tbd';
                        const capacity = location?.capacity;
                        const isFull =
                          typeof capacity === 'number' &&
                          typeof workshop.registrationCount === 'number' &&
                          workshop.registrationCount >= capacity;
                        const facilitator = getFacilitatorForWorkshop(workshop.title);

                        return (
                          <article
                            className={isFull ? 'workshop__row workshop__row--full' : 'workshop__row'}
                            key={workshop.id}
                          >
                            <div className="workshop__info">
                              <h3 className="workshop__title">{workshop.title}</h3>
                              <p className="workshop__meta">
                                <span>{SESSION_TIMES[workshop.session] ?? 'Time TBD'}</span>
                                <span aria-hidden="true">&middot;</span>
                                <span>
                                  {hasRealLocation
                                    ? `${location!.building} ${location!.room_num}`
                                    : 'Location TBD'}
                                </span>
                                {typeof capacity === 'number' && typeof workshop.registrationCount === 'number' ? (
                                  <>
                                    <span aria-hidden="true">&middot;</span>
                                    {isFull ? (
                                      <span className="workshop__seats workshop__seats--full">Full</span>
                                    ) : (
                                      <span className="workshop__seats">
                                        {workshop.registrationCount}/{capacity} spots
                                      </span>
                                    )}
                                  </>
                                ) : null}
                              </p>
                              {(() => {
                                const isLong = workshop.description.length > DESC_CLAMP_THRESHOLD;
                                const isExpanded = expandedIds.has(workshop.id);
                                return (
                                  <>
                                    <p
                                      id={`workshop-desc-${workshop.id}`}
                                      className={
                                        isLong && !isExpanded ? 'workshop__desc is-clamped' : 'workshop__desc'
                                      }
                                    >
                                      {workshop.description}
                                    </p>
                                    {isLong ? (
                                      <button
                                        type="button"
                                        className="workshop__descmore"
                                        aria-expanded={isExpanded}
                                        aria-controls={`workshop-desc-${workshop.id}`}
                                        onClick={() => toggleExpanded(workshop.id)}
                                      >
                                        {isExpanded ? 'Read less' : 'Read more'}
                                      </button>
                                    ) : null}
                                  </>
                                );
                              })()}
                              {facilitator ? (
                                <>
                                  <button
                                    type="button"
                                    className="workshop__bioTrigger"
                                    aria-expanded={openBioIds.has(workshop.id)}
                                    aria-controls={`workshop-bio-${workshop.id}`}
                                    onClick={() => toggleBio(workshop.id)}
                                  >
                                    Facilitated by {facilitator.name}
                                  </button>
                                  <div
                                    className={
                                      openBioIds.has(workshop.id)
                                        ? 'workshop__bioWrap is-open'
                                        : 'workshop__bioWrap'
                                    }
                                  >
                                    <div
                                      className="workshop__bio"
                                      id={`workshop-bio-${workshop.id}`}
                                      aria-hidden={!openBioIds.has(workshop.id)}
                                    >
                                      <Image
                                        className={
                                          facilitator.flatPhoto
                                            ? 'workshop__bioPhoto workshop__bioPhoto--flat'
                                            : 'workshop__bioPhoto'
                                        }
                                        src={facilitator.photo}
                                        alt={facilitator.name}
                                        width={facilitator.width}
                                        height={facilitator.height}
                                        placeholder="blur"
                                        blurDataURL={facilitator.blurDataURL}
                                      />
                                      <p className="workshop__bioText">{facilitator.bio}</p>
                                    </div>
                                  </div>
                                </>
                              ) : workshop.facilitators && workshop.facilitators.length > 0 ? (
                                <p className="workshop__desc">Facilitated by {workshop.facilitators.join(', ')}</p>
                              ) : null}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <a className="team__backtotop" href="#top">
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
              <span>Back to top</span>
            </a>
          </div>
        </section>

        <nav className="crosslink" aria-label="More to explore">
          <div className="crosslink__inner">
            <p className="crosslink__label">Continue exploring</p>
            <div className="crosslink__links">
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
