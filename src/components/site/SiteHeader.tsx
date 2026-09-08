import Image from 'next/image';
import Link from 'next/link';
import { InstagramIcon } from './SocialIcon';

type SiteHeaderProps =
  | { compact?: false; pageTitle?: never; pageSubtitle?: never; active?: 'about' | null }
  | { compact: true; pageTitle: string; pageSubtitle?: string; active?: 'about' | null };

// Mirrors live's .hero header exactly — full hero (home) vs .hero--compact
// (every interior page). Only "About Us" is linked in nav today; per
// DESIGN.md's confirmed rule, other pages don't get a nav link until
// they're actually announced as live, even though the routes exist.
export function SiteHeader(props: SiteHeaderProps) {
  const { compact, active = null } = props;

  return (
    <header className={compact ? 'hero hero--compact' : 'hero'} id="top">
      <Image
        className="hero__bg"
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__topbar">
        <p className="hero__eventline">FACT 2026 · Oct. 16&nbsp;&ndash;&nbsp;18, 2026</p>
        <div className="countdown" id="countdown" role="timer" aria-live="polite" aria-label="Time until FACT 2026">
          <span className="countdown__value" id="countdown-value" suppressHydrationWarning>
            &mdash;
          </span>
          <span className="countdown__label">Until FACT</span>
        </div>
      </div>

      <nav className="hero__nav" aria-label="Primary">
        <Link className="hero__mark" href="/" aria-label="FACT 2026 home">
          <Image src="/images/nav-mark.png" alt="" width={52} height={52} />
        </Link>

        <button className="hero__navtoggle" id="nav-toggle" aria-expanded="false" aria-controls="hero-menu">
          <span className="hero__navtoggle-bars">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="hero__navtoggle-label">Menu</span>
          <span className="sr-only">Menu</span>
        </button>

        <div className="hero__menu" id="hero-menu">
          <ul className="hero__links">
            <li>
              <Link href="/about" aria-current={active === 'about' ? 'page' : undefined}>
                About Us
              </Link>
            </li>
          </ul>

          <div className="hero__actions">
            <a
              className="hero__social"
              href="https://www.instagram.com/psa_fact/?hl=en"
              target="_blank"
              rel="noopener"
              aria-label="FACT on Instagram"
            >
              <InstagramIcon />
            </a>
            <button className="pill pill--ghost" type="button" aria-disabled="true" title="Registration opens soon">
              Login<span className="sr-only">. Registration opens soon</span>
            </button>
            <Link className="pill pill--solid" href="/donate">
              Donate
            </Link>
          </div>
        </div>
      </nav>

      {compact ? (
        <div className="hero__pagetitle">
          <h1>{props.pageTitle}</h1>
          {props.pageSubtitle ? <p>{props.pageSubtitle}</p> : null}
        </div>
      ) : (
        <>
          <div className="hero__content">
            <h1 className="hero__h1reset">
              <Image
                className="hero__title"
                src="/images/hero-title.png"
                alt="FACT 2026 — Mahiwagahan: Enchanting Our Bright Minds"
                width={1600}
                height={400}
                priority
              />
            </h1>
          </div>
          <a className="hero__scrollcue" href="#below" aria-label="Scroll for more">
            <span></span>
          </a>
        </>
      )}
    </header>
  );
}
