// FACT 2026 delegate itinerary, transcribed from the organizers' "Delegate
// Tentative Itinerary" doc. The backend's agenda items still hold the 2025
// schedule, so this file is the source of truth for the public page until
// 2026 items are entered there.
//
// Times carry an explicit -05:00 offset: October in Champaign is Central
// Daylight Time, whatever the viewer's own timezone is.

export type AgendaPlace = {
  name: string;
  /** Room or sub-location, shown after the building name. */
  room?: string;
  /** Street address, used for the directions link. */
  address?: string;
};

export type AgendaEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  /** Replaces the computed time range when the doc gives something richer. */
  timeLabel?: string;
  /** Unset means the location hasn't been announced yet; null hides the line. */
  place?: AgendaPlace | null;
  /** Workshop sessions: rooms differ per delegate, so point to My FACT. */
  workshop?: boolean;
};

export type AgendaDay = {
  id: 'fri' | 'sat' | 'sun';
  date: string;
  weekday: string;
  events: AgendaEvent[];
};

const SCD: AgendaPlace = {
  name: 'Siebel Center for Design',
  address: '1208 S 4th St, Champaign, IL 61820',
};

const AACC: AgendaPlace = {
  name: 'Asian American Cultural Center',
  address: '1210 W Nevada St, Urbana, IL 61801',
};

const VARIOUS: AgendaPlace = { name: 'Various locations' };

export const AGENDA: AgendaDay[] = [
  {
    id: 'fri',
    date: '16',
    weekday: 'Friday · Oct 16',
    events: [
      {
        id: 'check-in',
        title: 'Delegate Check-In',
        start: '2026-10-16T17:00:00-05:00',
        end: '2026-10-16T22:00:00-05:00',
        place: SCD,
      },
      {
        id: 'welcome',
        title: 'Welcome Ceremony / Delegate Day',
        start: '2026-10-16T18:00:00-05:00',
        end: '2026-10-16T21:00:00-05:00',
        place: SCD,
      },
      {
        id: 'palengke-1',
        title: 'Palengke sa Gabi Day 1',
        start: '2026-10-16T18:00:00-05:00',
        end: '2026-10-16T21:00:00-05:00',
        place: SCD,
      },
    ],
  },
  {
    id: 'sat',
    date: '17',
    weekday: 'Saturday · Oct 17',
    events: [
      {
        id: 'late-check-in',
        title: 'Late Delegate Check-In',
        start: '2026-10-17T08:00:00-05:00',
        end: '2026-10-17T09:00:00-05:00',
        place: AACC,
      },
      {
        id: 'opening',
        title: 'Opening Ceremony',
        start: '2026-10-17T08:30:00-05:00',
        end: '2026-10-17T09:20:00-05:00',
        place: {
          name: 'Lincoln Hall',
          room: 'Room 1053 (Theater)',
          address: '702 S Wright St, Urbana, IL 61801',
        },
      },
      {
        id: 'session-1',
        title: 'Session 01 Workshop',
        start: '2026-10-17T09:30:00-05:00',
        end: '2026-10-17T10:40:00-05:00',
        place: VARIOUS,
        workshop: true,
      },
      {
        id: 'session-2',
        title: 'Session 02 Workshop',
        start: '2026-10-17T10:50:00-05:00',
        end: '2026-10-17T12:00:00-05:00',
        place: VARIOUS,
        workshop: true,
      },
      {
        id: 'lunch',
        title: 'Lunch Break',
        start: '2026-10-17T12:00:00-05:00',
        end: '2026-10-17T13:20:00-05:00',
        place: null,
      },
      {
        id: 'session-3',
        title: 'Session 03 Workshop',
        start: '2026-10-17T13:20:00-05:00',
        end: '2026-10-17T14:30:00-05:00',
        place: VARIOUS,
        workshop: true,
      },
      {
        id: 'palengke-2',
        title: 'Palengke sa Gabi Day 2',
        start: '2026-10-17T14:30:00-05:00',
        end: '2026-10-17T17:30:00-05:00',
        place: {
          name: 'University YMCA',
          address: '1001 S Wright St, Champaign, IL 61820',
        },
      },
      {
        id: 'variety-show',
        title: 'Variety Show',
        start: '2026-10-17T17:30:00-05:00',
        end: '2026-10-17T21:45:00-05:00',
        timeLabel: 'Doors 5:30 · Show 6:30–9:45 PM',
        place: {
          name: 'Foellinger Auditorium',
          address: '709 S Mathews Ave, Urbana, IL 61801',
        },
      },
    ],
  },
  {
    id: 'sun',
    date: '18',
    weekday: 'Sunday · Oct 18',
    events: [
      {
        id: 'brunch',
        title: 'Bye-Bye Brunch',
        start: '2026-10-18T12:00:00-05:00',
        end: '2026-10-18T14:00:00-05:00',
      },
    ],
  },
];

/** Midnight Central on Friday: when the page switches into its live, day-of mode. */
export const CONFERENCE_START = '2026-10-16T00:00:00-05:00';
