'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AgendaDay, AgendaEvent, AgendaPlace } from '@/app/(live)/agenda/schedule';

const TZ = 'America/Chicago';

const clockFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: TZ,
});

const weekdayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: TZ });

const dayKeyFormat = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: TZ,
});

type EventState = 'past' | 'now' | 'upcoming';

function clock(iso: string) {
  return clockFormat.format(new Date(iso));
}

// "9:30–10:40 AM", or "10:50 AM–12:00 PM" when the range crosses noon —
// the same shorthand the printed itinerary uses.
function timeRange(event: AgendaEvent) {
  if (event.timeLabel) return event.timeLabel;
  const [startTime, startPeriod] = clock(event.start).split(' ');
  const end = clock(event.end);
  return end.endsWith(startPeriod) ? `${startTime}–${end}` : `${clock(event.start)}–${end}`;
}

function stateAt(event: AgendaEvent, now: number): EventState {
  if (now >= Date.parse(event.end)) return 'past';
  if (now >= Date.parse(event.start)) return 'now';
  return 'upcoming';
}

function startsIn(iso: string, now: number) {
  const minutes = Math.round((Date.parse(iso) - now) / 60000);
  if (minutes < 1) return 'Starting now';
  if (minutes < 60) return `Starts in ${minutes} min`;
  if (minutes < 6 * 60) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `Starts in ${hours} hr ${rest} min` : `Starts in ${hours} hr`;
  }
  return `${weekdayFormat.format(new Date(iso))} at ${clock(iso)}`;
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

// Lets the live states be checked outside the conference weekend, e.g.
// /agenda?at=2026-10-17T10:00:00-05:00. Ignored in production builds.
function previewTime() {
  if (process.env.NODE_ENV === 'production') return null;
  const at = new URLSearchParams(window.location.search).get('at');
  const parsed = at ? Date.parse(at) : NaN;
  return Number.isNaN(parsed) ? null : parsed;
}

function useNow() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const preview = previewTime();
    if (preview !== null) {
      setNow(preview);
      return;
    }
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}

function ExternalIcon() {
  return (
    <svg className="agenda-event__icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Place({ place, workshop }: { place?: AgendaPlace | null; workshop?: boolean }) {
  if (place === null) return null;
  if (!place) {
    return <p className="agenda-event__place agenda-event__place--tbd">Location to be announced</p>;
  }

  return (
    <p className="agenda-event__place">
      <span>
        {place.name}
        {place.room ? <span className="agenda-event__room"> · {place.room}</span> : null}
      </span>
      {place.address ? (
        <a
          className="agenda-event__link"
          href={directionsUrl(place.address)}
          target="_blank"
          rel="noopener"
        >
          Directions
          <span className="sr-only"> to {place.name} (opens Google Maps)</span>
          <ExternalIcon />
        </a>
      ) : null}
      {workshop ? (
        <Link className="agenda-event__link" href="/my-fact/dashboard">
          Your rooms are in My FACT
        </Link>
      ) : null}
    </p>
  );
}

function LiveEvent({ event, detail }: { event: AgendaEvent; detail: string }) {
  return (
    <li className="agenda-live__event">
      <p className="agenda-live__title">
        <a href={`#${event.id}`}>{event.title}</a>
      </p>
      <p className="agenda-live__detail">{detail}</p>
      <Place place={event.place} workshop={event.workshop} />
    </li>
  );
}

function LiveStrip({ events, now }: { events: AgendaEvent[]; now: number }) {
  const current = events.filter((event) => stateAt(event, now) === 'now');
  const upcoming = events.filter((event) => stateAt(event, now) === 'upcoming');
  const nextStart = upcoming[0]?.start;
  const next = upcoming.filter((event) => event.start === nextStart);

  if (!current.length && !next.length) return null;

  return (
    <section className="agenda-live" aria-label="Happening now and up next">
      {current.length ? (
        <div className="agenda-live__col agenda-live__col--now">
          <h2 className="agenda-live__label">
            <span className="agenda-live__pulse" aria-hidden="true" />
            Happening now
          </h2>
          <ul className="agenda-live__list">
            {current.map((event) => (
              <LiveEvent key={event.id} event={event} detail={`Until ${clock(event.end)}`} />
            ))}
          </ul>
        </div>
      ) : null}
      {next.length ? (
        <div className="agenda-live__col">
          <h2 className="agenda-live__label">Up next</h2>
          <ul className="agenda-live__list">
            {next.map((event) => (
              <LiveEvent key={event.id} event={event} detail={startsIn(event.start, now)} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export function AgendaSchedule({ days, liveFrom }: { days: AgendaDay[]; liveFrom: string }) {
  const now = useNow();
  const events = days.flatMap((day) => day.events);
  const lastEnd = Math.max(...events.map((event) => Date.parse(event.end)));
  const live = now !== null && now >= Date.parse(liveFrom) && now < lastEnd;
  const today = now !== null ? dayKeyFormat.format(new Date(now)) : null;

  return (
    <div className="agenda" data-live={live || undefined}>
      {live ? <LiveStrip events={events} now={now} /> : null}

      <nav className="agenda__jump" aria-label="Jump to a day">
        {days.map((day) => {
          const isToday = live && today === day.events[0]?.start.slice(0, 10);
          return (
            <a key={day.id} href={`#${day.id}`} aria-current={isToday ? 'date' : undefined}>
              {day.weekday.split(' · ')[0].slice(0, 3)} {day.date}
              {isToday ? <span className="agenda__today">Today</span> : null}
            </a>
          );
        })}
      </nav>

      <div className="agenda__rows">
        {days.map((day) => {
          const list = (
            <ol className="agenda__list">
              {day.events.map((event) => {
                const state = live ? stateAt(event, now) : undefined;
                return (
                  <li className="agenda-event" id={event.id} key={event.id} data-state={state}>
                    <p className="agenda-event__time">
                      <time dateTime={event.start}>{timeRange(event)}</time>
                    </p>
                    <span className="agenda-event__marker" aria-hidden="true" />
                    <div className="agenda-event__body">
                      <h3 className="agenda-event__title">
                        {event.title}
                        {state === 'now' ? <span className="agenda-event__status">Now</span> : null}
                        {state === 'past' ? <span className="sr-only"> (ended)</span> : null}
                      </h3>
                      <Place place={event.place} workshop={event.workshop} />
                    </div>
                  </li>
                );
              })}
            </ol>
          );
          // On the weekend, a day that's fully over folds away so today's
          // schedule sits right under the live strip.
          const dayOver = live && day.events.every((event) => stateAt(event, now) === 'past');
          const weekday = day.weekday.split(' · ')[0];

          return (
            <article
              className={dayOver ? 'agenda__day agenda__day--over' : 'agenda__day'}
              id={day.id}
              key={day.id}
              aria-labelledby={`${day.id}-heading`}
            >
              <h2 className="agenda__daymeta" id={`${day.id}-heading`}>
                <span className="agenda__date">{day.date}</span>
                <span className="agenda__weekday">{day.weekday}</span>
              </h2>
              {dayOver ? (
                <details className="agenda__past">
                  <summary>
                    {weekday} is done. Show its {day.events.length === 1 ? 'event' : `${day.events.length} events`}
                  </summary>
                  {list}
                </details>
              ) : (
                list
              )}
            </article>
          );
        })}
      </div>

      <p className="agenda__note">
        Tentative itinerary. All times are Central; details may change before the weekend.
      </p>
    </div>
  );
}
