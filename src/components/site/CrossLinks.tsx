import Link from 'next/link';

export type CrossLink = { href: string; label: string };

// The "Continue exploring" strip that sits above the footer on every live
// page. Keep destinations to pages that are linked in the top nav (plus Home).
export function CrossLinks({ links, tone }: { links: CrossLink[]; tone?: 'night' }) {
  return (
    <nav className={tone === 'night' ? 'crosslink crosslink--night' : 'crosslink'} aria-label="More to explore">
      <div className="crosslink__inner">
        <p className="crosslink__label">Continue exploring</p>
        <div className="crosslink__links">
          {links.map(({ href, label }) => (
            <Link className="crosslink__link" href={href} key={href}>
              <span>{label}</span>
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
          ))}
        </div>
      </div>
    </nav>
  );
}
