'use client';

import Image from 'next/image';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import NotificationsManager from '@/components/ui/NotificationManager';
import { useNotifications } from '@/hooks/api/useNotifications';

export default function Home() {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications && (
        <NotificationsManager notifications={notifications.map((notification) => notification.message)} />
      )}

      <SiteHeader />

      <main id="below">
        <section className="section section--theme" aria-label="FACT 2026 theme">
          <svg className="motif motif--tr motif--moon" viewBox="0 0 260 60" aria-hidden="true">
            <defs>
              <mask id="theme-moon-2">
                <rect width="260" height="60" fill="white" />
                <circle cx="92" cy="30" r="18" fill="black" />
              </mask>
              <mask id="theme-moon-4">
                <rect width="260" height="60" fill="white" />
                <circle cx="176" cy="30" r="18" fill="black" />
              </mask>
            </defs>
            <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="82" cy="30" r="18" fill="currentColor" mask="url(#theme-moon-2)" />
            <path d="M134 12 A18 18 0 0 1 134 48 Z" fill="currentColor" />
            <circle cx="186" cy="30" r="18" fill="currentColor" mask="url(#theme-moon-4)" />
            <circle cx="238" cy="30" r="18" fill="currentColor" />
          </svg>
          <div className="section__inner">
            <div className="theme__stage">
              <h2 className="section__heading section__heading--theme">Mahiwagahan</h2>
              <div className="theme__sparkles" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span className="theme__sparkle" key={i}>
                    <svg className="theme__sparkle-glyph" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1Z" />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
            <div className="section__rule" aria-hidden="true" />
            <p className="theme__definition">Enchanting Our Bright Minds</p>
          </div>
        </section>

        <section className="section section--venue" aria-label="Where and when">
          <div className="section__inner">
            <div className="venue">
              <div className="venue__body">
                <h2 className="venue__heading">Discover FACT 2026</h2>
                <p className="venue__meta">October 16&ndash;18 &middot; University of Illinois Urbana&ndash;Champaign</p>
                <p className="venue__text">
                  FACT &mdash; Filipinx Americans Coming Together &mdash; is three days on campus: workshops,
                  culture, and community, at the heart of the Midwest&rsquo;s largest Filipinx-interest conference.
                </p>
                <a className="pill pill--ink venue__button" href="/about">
                  About FACT 2026
                </a>
              </div>
              <figure className="venue__photo photoframe">
                <Image
                  src="/images/venue-photo.jpg"
                  alt="A packed auditorium of FACT delegates during a conference session"
                  width={1400}
                  height={600}
                  sizes="(min-width: 900px) 50vw, 100vw"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section--quickfacts" aria-label="FACT 2026 at a glance">
          <div className="section__inner">
            <div className="quickfacts">
              <div className="quickfacts__item">
                <p className="quickfacts__value">1,200+</p>
                <p className="quickfacts__label">Attendees</p>
              </div>
              <div className="quickfacts__item">
                <p className="quickfacts__value">26</p>
                <p className="quickfacts__label">Schools</p>
              </div>
              <div className="quickfacts__item">
                <p className="quickfacts__value">3</p>
                <p className="quickfacts__label">Days of Programming</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--trailer" aria-label="Watch the FACT 2026 teaser trailer">
          <div className="section__inner">
            <div className="cta">
              <h2 className="section__heading">A First Look</h2>
              <div className="section__rule" aria-hidden="true" />
              <button className="trailer__frame photoframe" type="button" id="trailer-trigger" aria-haspopup="dialog">
                <img
                  className="trailer__poster"
                  src="https://i.ytimg.com/vi/Nbb1xQN95Ts/maxresdefault.jpg"
                  alt=""
                  loading="lazy"
                />
                <span className="trailer__scrim" aria-hidden="true" />
                <span className="trailer__playwrap">
                  <span className="trailer__ring" aria-hidden="true" />
                  <span className="trailer__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="trailer__label">Watch the Teaser Trailer</span>
              </button>
            </div>
          </div>
        </section>

        <section className="section section--cta" aria-label="Join the newsletter">
          <div className="section__inner">
            <div className="cta">
              <div className="cta__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1Z" />
                </svg>
              </div>
              <h2 className="section__heading">Ready for FACT 2026?</h2>
              <div className="section__rule" aria-hidden="true" />
              <p className="cta__text">
                Registration opens soon &mdash; we&apos;re putting our newsletter together so you can be the first to
                know when it does. Stay tuned.
              </p>
            </div>
          </div>
        </section>

        <p className="landing__soon">More information coming soon</p>

        <SiteFooter />
      </main>

      <div className="trailer-modal" id="trailer-modal" hidden>
        <div className="trailer-modal__scrim" data-trailer-close />
        <div className="trailer-modal__dialog" role="dialog" aria-modal="true" aria-label="FACT 2026 teaser trailer">
          <div className="trailer-modal__frame" id="trailer-modal-frame" />
          <button className="trailer-modal__close" type="button" aria-label="Close video" data-trailer-close>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
