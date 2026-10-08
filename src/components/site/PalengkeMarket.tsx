'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AGENDA, type AgendaEvent } from '@/app/(live)/agenda/schedule';
import { VENDORS, type MarketDay, type Vendor } from '@/app/(live)/palengke/vendors';

const TZ = 'America/Chicago';

const clockFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TZ });
const dayKeyFormat = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: TZ,
});

// "6 PM" rather than "6:00 PM"; the market never starts off the half hour
// in a way that needs the zeros.
function clock(iso: string) {
  return clockFormat.format(new Date(iso)).replace(':00', '');
}

function timeRange(event: AgendaEvent) {
  const start = clock(event.start);
  const end = clock(event.end);
  const [startTime, startPeriod] = start.split(' ');
  return end.endsWith(startPeriod) ? `${startTime}–${end}` : `${start}–${end}`;
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

type Market = {
  day: MarketDay;
  weekday: string;
  dateNumeral: string;
  event: AgendaEvent;
  map: string;
};

// The committee's floor maps, one per day; booth numbers on the cards match them.
const MAP_SRC: Record<MarketDay, string> = {
  fri: '/images/palengke/map-day1.png',
  sat: '/images/palengke/map-day2.png',
};

// Market times and venues live in the agenda; this page only reads them.
const MARKETS: Market[] = (['fri', 'sat'] as const).flatMap((day) => {
  const agendaDay = AGENDA.find((d) => d.id === day);
  const event = agendaDay?.events.find((e) => e.id.startsWith('palengke'));
  if (!agendaDay || !event) return [];
  return [{ day, weekday: agendaDay.weekday, dateNumeral: agendaDay.date, event, map: MAP_SRC[day] }];
});

type Status = { tone: 'open' | 'today' | 'closed'; text: string } | null;

function statusAt(event: AgendaEvent, now: number): Status {
  const start = Date.parse(event.start);
  const end = Date.parse(event.end);
  if (now >= end) return { tone: 'closed', text: 'Closed' };
  if (now >= start) return { tone: 'open', text: `Open now · until ${clock(event.end)}` };
  if (dayKeyFormat.format(now) === dayKeyFormat.format(start)) {
    return { tone: 'today', text: `Today · opens ${clock(event.start)}` };
  }
  return null;
}

// During the conference, open on the market that's happening now or next;
// otherwise show the whole lineup.
function defaultDay(now: number): MarketDay | 'all' {
  const today = dayKeyFormat.format(now);
  const conferenceDays = MARKETS.map((m) => dayKeyFormat.format(Date.parse(m.event.start)));
  if (today < conferenceDays[0] || today > conferenceDays[conferenceDays.length - 1]) return 'all';
  const next = MARKETS.find((m) => now < Date.parse(m.event.end));
  return next ? next.day : 'all';
}

const DAY_LABEL: Record<MarketDay, string> = { fri: 'Friday', sat: 'Saturday' };

function sellsOn(vendor: Vendor, day: MarketDay) {
  return vendor.booths[day] !== undefined;
}

// One "Friday · Booth 4" line per day the vendor sells, for the both-days view.
function boothLines(vendor: Vendor) {
  return MARKETS.filter((m) => sellsOn(vendor, m.day)).map((m) => `${DAY_LABEL[m.day]} · Booth ${vendor.booths[m.day]}`);
}

// Alphabetical, ignoring a leading "The", so a name is easy to find by eye.
function sortKey(name: string) {
  return name.replace(/^The\s+/i, '').toLowerCase();
}

const SORTED_VENDORS = [...VENDORS].sort((a, b) => sortKey(a.name).localeCompare(sortKey(b.name)));

function VendorCard({ vendor, day }: { vendor: Vendor; day: MarketDay | 'all' }) {
  return (
    <li className="vendor__card">
      <div className="vendor__head">
        <h3 className="vendor__name">{vendor.name}</h3>
        {day !== 'all' ? (
          <p className="vendor__booth">
            <span>Booth</span> {vendor.booths[day]}
          </p>
        ) : null}
      </div>
      <p className="vendor__theme">{vendor.offering}</p>
      {vendor.menu ? (
        <details className="vendor__menu">
          <summary>Menu &amp; allergens</summary>
          <p className="vendor__menunote">{vendor.menu.note}</p>
          <ul className="vendor__menuitems">
            {vendor.menu.items.map((item) => (
              <li key={item.name}>
                <p className="vendor__menuname">
                  {item.name}
                  {item.tags?.map((tag) => (
                    <span className="vendor__menutag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </p>
                <p className="vendor__menudetail">{item.detail}</p>
                {item.contains ? <p className="vendor__menucontains">Contains: {item.contains}</p> : null}
              </li>
            ))}
          </ul>
          <p className="vendor__menucombos">
            <span>Combos</span> {vendor.menu.combos.join(' · ')}
          </p>
        </details>
      ) : null}
      {day === 'all' ? (
        <p className="vendor__days">
          {boothLines(vendor).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      ) : null}
    </li>
  );
}

export function PalengkeMarket() {
  const [now, setNow] = useState<number | null>(null);
  const [day, setDay] = useState<MarketDay | 'all'>('all');

  useEffect(() => {
    const start = Date.now();
    setNow(start);
    setDay(defaultDay(start));
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const vendors = useMemo(() => SORTED_VENDORS.filter((v) => day === 'all' || sellsOn(v, day)), [day]);

  const selected = MARKETS.find((m) => m.day === day);

  function showMap(next: MarketDay) {
    setDay(next);
    window.requestAnimationFrame(() =>
      document.getElementById('palengke-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  }

  return (
    <section className="section section--palengke">
      <div className="section__inner">
        <div className="market__intro">
          <div>
            <h2 className="sr-only">When and where</h2>
            <ul className="market__days">
              {MARKETS.map((market) => {
                const status = now === null ? null : statusAt(market.event, now);
                const place = market.event.place;
                return (
                  <li
                    className={status?.tone === 'closed' ? 'market__day market__day--closed' : 'market__day'}
                    key={market.day}
                  >
                    <p className="market__numeral" aria-hidden="true">
                      {market.dateNumeral}
                    </p>
                    <div className="market__daybody">
                      <p className="market__weekday">
                        {market.weekday}
                      </p>
                      <p className="market__time">{timeRange(market.event)}</p>
                      {place ? <p className="market__place">{place.name}</p> : null}
                      <p className="market__count">
                        {VENDORS.filter((v) => sellsOn(v, market.day)).length} vendors
                      </p>
                      <div className="market__links">
                        <button type="button" onClick={() => showMap(market.day)}>
                          Floor map
                        </button>
                        {place?.address ? (
                          <a href={directionsUrl(place.address)} target="_blank" rel="noopener">
                            Directions
                            <span className="sr-only"> to {place.name} (opens Google Maps)</span>
                          </a>
                        ) : null}
                      </div>
                      {status ? (
                        <p className={`market__status market__status--${status.tone}`}>{status.text}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <figure className="photoframe market__photo">
            <Image
              src="/images/about-carousel-2.jpg"
              alt="Volunteers smiling behind a bakery table piled with boxed pastries at a past FACT Palengke, with a crowd browsing stalls behind them"
              width={1280}
              height={960}
              sizes="(min-width: 900px) 520px, 100vw"
            />
          </figure>
        </div>

        <div className="market__controls">
          <p className="market__summary" aria-live="polite">
            {selected ? DAY_LABEL[selected.day] : 'Both days'} · {vendors.length} vendors
          </p>
          <div className="market__filter" role="group" aria-label="Market day">
            <button
              type="button"
              className="workshops__sessionpill"
              aria-pressed={day === 'all'}
              onClick={() => setDay('all')}
            >
              Both days
            </button>
            {MARKETS.map((market) => (
              <button
                key={market.day}
                type="button"
                className="workshops__sessionpill"
                aria-pressed={day === market.day}
                onClick={() => setDay(market.day)}
              >
                {DAY_LABEL[market.day]}
              </button>
            ))}
          </div>
        </div>

        <div className="market__maps" id="palengke-map">
          <h2 className="groupheading">{selected ? `${DAY_LABEL[selected.day]} floor map` : 'Floor maps'}</h2>
          <div className={selected ? 'market__mapgrid' : 'market__mapgrid market__mapgrid--both'}>
            {(selected ? [selected] : MARKETS).map((market) => (
              <figure className="market__map" key={market.day}>
                <a href={market.map} target="_blank" rel="noopener">
                  <Image
                    src={market.map}
                    alt={`${DAY_LABEL[market.day]} floor map of ${market.event.place?.name ?? 'the market'}, with numbered booths. Each vendor card below lists its booth number.`}
                    width={1136}
                    height={722}
                    sizes={selected ? '(min-width: 1180px) 1100px, 100vw' : '(min-width: 900px) 560px, 100vw'}
                  />
                </a>
                <figcaption>
                  {DAY_LABEL[market.day]} · {market.event.place?.name} ·{' '}
                  <a href={market.map} target="_blank" rel="noopener">
                    Open full size
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="palengke__groups">
          <h2 className="groupheading">
            Vendors <span className="groupheading__count">&middot; {vendors.length}</span>
          </h2>
          <ul className="vendor__grid">
            {vendors.map((vendor) => (
              <VendorCard vendor={vendor} day={day} key={vendor.name} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
