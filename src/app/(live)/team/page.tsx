import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Team · FACT 2026',
  description: 'The committee planning and running FACT 2026.',
};

const GROUPS: { id: string; name: string; gloss?: string; role: string; members: string[] }[] = [
  { id: 'directors', name: 'Directors', role: 'Director', members: ['Carl Lorejo', 'Kasandra Medrano', 'Miranda Espinoza'] },
  {
    id: 'activity-coordinators',
    name: 'Activity Coordinators',
    role: 'Activity Coordinator',
    members: ['Arianna Reyes', 'Devin Estacio'],
  },
  { id: 'delegate-managers', name: 'Delegate Managers', role: 'Delegate Manager', members: ['Lauren Capuno', 'Ryan Romualdo'] },
  { id: 'hospitality', name: 'Hospitality', role: 'Hospitality', members: ['Nathan Mendoza'] },
  {
    id: 'information-technology',
    name: 'Information Technology',
    role: 'Information Technology',
    members: ['Lanz Galdo', 'Megan Jacob'],
  },
  { id: 'marketing', name: 'Marketing', role: 'Marketing', members: ['Josh Barlan', 'Lee Keating'] },
  { id: 'media', name: 'Media', role: 'Media', members: ['Jacob Daza', 'Josrich Viernes'] },
  {
    id: 'palengke',
    name: 'Palengke',
    gloss: 'Filipino for "market"',
    role: 'Palengke',
    members: ['Ethan Lopez', 'Rochelle Sazon'],
  },
  { id: 'team-fact', name: 'Team FACT', role: 'Team FACT', members: ['Jonathan Directo', 'Megan Sia'] },
  { id: 'treasurer', name: 'Treasurer', role: 'Treasurer', members: ['Joshua Jimenez'] },
  {
    id: 'variety-show',
    name: 'Variety Show',
    role: 'Variety Show',
    members: ['Asher Kim', 'Joshua Fajardo', 'Fredyll Patingo'],
  },
];

export default function TeamPage() {
  return (
    <>
      <SiteHeader compact pageTitle="Team" pageSubtitle="The committee planning and running FACT 2026." />

      <main id="below">
        <section className="section section--team">
          <svg className="motif motif--tr motif--orbit" viewBox="0 0 160 160" aria-hidden="true">
            <circle cx="80" cy="80" r="58" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="80" cy="80" r="2.2" fill="currentColor" />
            <path d="M80 14l2.4 6.4L89 23l-6.6 2.6L80 32l-2.4-6.4L71 23l6.6-2.6Z" fill="currentColor" />
            <path d="M136 62l1.8 4.6 4.6 1.8-4.6 1.8-1.8 4.6-1.8-4.6-4.6-1.8 4.6-1.8Z" fill="currentColor" />
            <path d="M32 108l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="currentColor" />
            <circle cx="80" cy="80" r="80" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          </svg>
          <div className="section__inner">
            <p className="section__intro">The committee planning and running FACT 2026, organized by group.</p>

            <nav className="team__jumpnav" aria-label="Jump to committee">
              {GROUPS.map((group) => (
                <a className="team__jumplink" href={`#${group.id}`} key={group.id}>
                  {group.name}
                </a>
              ))}
            </nav>

            <div className="team__groups">
              {GROUPS.map((group) => (
                <div id={group.id} key={group.id}>
                  <h2 className="groupheading">
                    {group.name}
                    {group.gloss ? <span className="groupheading__gloss">{group.gloss}</span> : null}
                  </h2>
                  <ul className="team__grid">
                    {group.members.map((name) => (
                      <li className="team__member" key={name}>
                        <p className="team__name">{name}</p>
                        <p className="team__role">{group.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

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
              <Link className="crosslink__link" href="/palengke">
                <span>Palengke</span>
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
              <Link className="crosslink__link" href="/past-facts">
                <span>Past FACTs</span>
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
