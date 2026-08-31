import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Page Not Found · FACT 2026',
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="live-page">
      <SiteHeader compact pageTitle="Page Not Found" pageSubtitle="This page wandered off somewhere in the Palengke." />

      <main id="below">
        <section className="section section--about" aria-label="Page not found">
          <svg className="motif motif--tr motif--moon" viewBox="0 0 260 60" aria-hidden="true">
            <defs>
              <mask id="notfound-moon-2">
                <rect width="260" height="60" fill="white" />
                <circle cx="92" cy="30" r="18" fill="black" />
              </mask>
            </defs>
            <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="82" cy="30" r="18" fill="currentColor" mask="url(#notfound-moon-2)" />
            <circle cx="134" cy="30" r="18" fill="currentColor" />
          </svg>
          <div className="section__inner">
            <div className="about__body" style={{ margin: '0 auto', textAlign: 'center' }}>
              <h2 className="section__heading">404</h2>
              <p className="about__lead" style={{ marginInline: 'auto' }}>
                We couldn&apos;t find the page you were looking for.
              </p>
              <p style={{ marginInline: 'auto' }}>
                It may have moved, or the link might be out of date. Head back home, or check one of the pages
                below.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <Link className="pill pill--ink" href="/">
                  Back to Home
                </Link>
              </div>
            </div>
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
    </div>
  );
}
