import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'About Us · FACT 2026',
  description:
    "What FACT is, who it's for, and the mission behind the Filipinx Americans Coming Together conference at UIUC.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader compact pageTitle="About Us" pageSubtitle="The story and mission behind FACT." active="about" />

      <main id="below">
        <section className="section section--about">
          <svg className="motif motif--bl motif--vine" viewBox="0 0 140 170" aria-hidden="true">
            <path
              d="M20 165C20 120 55 100 45 55C40 33 55 15 75 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path d="M45 55C55 50 65 52 68 42" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M45 55C38 48 30 48 26 38" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M32 95C42 90 50 92 54 82" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M32 95C24 89 16 90 12 80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <circle cx="75" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <path
              d="M75 3.5v9M70.5 8h9M71.8 4.8l6.4 6.4M78.2 4.8l-6.4 6.4"
              stroke="currentColor"
              strokeWidth="0.7"
            />
          </svg>
          <div className="section__inner">
            <div className="themegallery">
              <div className="about__body">
                <h2 className="section__heading">What is FACT?</h2>
                <p className="about__lead">
                  FACT stands for Filipinx Americans Coming Together and is a conference hosted annually by the
                  Philippine Student Association at the University of Illinois at Urbana-Champaign.
                </p>
                <p>
                  It is the largest Filipinx-interest conference in the Midwest, bringing in over 1,000 delegates
                  yearly. The conference works to empower young, rising professionals while simultaneously educating
                  delegates about Filipinx culture, identity, and issues.
                </p>
                <p>
                  Despite the conference&apos;s title, the conference is not limited to delegates of Filipinx
                  descent. The facilitators and delegates come from different backgrounds and ethnicities, and the
                  workshops cover a wide array of topics. FACT&apos;s mission is to build a community of leaders by
                  uniting, enlightening, and empowering the Filipinx, Fil-Am, and non-Filipinx youth nationwide. By
                  exploring our interests, culture, and identity as a rising generation, we hope our delegates can
                  carry the knowledge they gain beyond their college years — as leaders in the professional world,
                  ready to give back to their community.
                </p>
              </div>

              <figure className="photoframe">
                <Image
                  src="/images/about-intro.jpg"
                  alt="A keynote speaker presenting on stage at a past FACT conference"
                  width={1600}
                  height={1068}
                  sizes="(min-width: 900px) 50vw, 100vw"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section--quickfacts" aria-label="FACT by the numbers">
          <div className="section__inner">
            <div className="quickfacts quickfacts--four">
              <div className="quickfacts__item">
                <p className="quickfacts__value">34th</p>
                <p className="quickfacts__label">FACT Conference</p>
              </div>
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

        <section className="section section--quote" aria-labelledby="mission-heading">
          <div className="section__inner">
            <div className="missionquote">
              <h2 className="section__heading" id="mission-heading">
                Our Core Values
              </h2>
              <div className="section__rule" aria-hidden="true" />
              <blockquote className="about__quote quote-reveal">
                <svg className="about__quotemark quote-reveal__mark" viewBox="0 0 48 36" aria-hidden="true">
                  <path
                    d="M0 36V20.7C0 9.3 6.9 1.8 18.4 0l1.8 5.4C13 7.3 9.4 12 9.1 18h9.3v18H0Zm28 0V20.7C28 9.3 34.9 1.8 46.4 0l1.8 5.4C41 7.3 37.4 12 37.1 18h9.3v18H28Z"
                    fill="currentColor"
                  />
                </svg>
                <p>
                  <span className="quote-reveal__seg">
                    The Filipinx Americans Coming Together (FACT) Conference at the University of Illinois at
                    Urbana-Champaign is committed to honoring, educating, and celebrating Philippine culture and
                    identity.{' '}
                  </span>
                  <span className="quote-reveal__seg">
                    FACT strives to create a space for everyone to feel welcome and appreciate all unique identities.{' '}
                  </span>
                  <span className="quote-reveal__seg">
                    Through this conference, FACT hopes to inspire delegates to embrace their cultural heritage and
                    promote personal growth and connections.
                  </span>
                </p>
                <cite className="quote-reveal__cite">— FACT Mission Statement</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section section--mahiwagahan" aria-label="This year's theme and photos from past FACT conferences">
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
            <div className="themegallery">
              <div className="themegallery__body">
                <div className="mahiwagahan__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1Z" />
                  </svg>
                </div>
                <h2 className="section__heading">Mahiwagahan: Enchanting Our Bright Minds</h2>
                <div className="section__rule" aria-hidden="true" />
                <div className="about__body">
                  <p className="about__lead">
                    Our theme, Mahiwagahan, invites FACT attendees to indulge in their curiosities of the rich
                    histories of those that came before us.
                  </p>
                  <p>
                    When times feel uncertain, look back to those that paved our way. Enchant your minds with the
                    magic of Philippine history, displays of art and culture, and powerful narratives within our
                    community. We must remember that our identities carry resilience, beauty, and power.
                  </p>
                  <p>
                    This 34th FACT, we encourage you to create your own story inspired and empowered by our roots.
                    Realize that we are all magic, and that together, we can use our stories to shine brighter.
                  </p>
                </div>
              </div>

              <div
                className="photocarousel themegallery__photos"
                role="group"
                aria-roledescription="carousel"
                aria-label="Photos from past FACT conferences"
              >
                <ul className="photocarousel__track" id="about-carousel-track" tabIndex={0}>
                  {[
                    {
                      src: 'about-carousel-1.jpg',
                      alt: 'Facilitators leading a community discussion titled "What are you seeing in your own community?"',
                    },
                    {
                      src: 'about-carousel-2.jpg',
                      alt: "Volunteers behind a bakery table at FACT's Palengke market, smiling with trays of Filipino pastries",
                    },
                    { src: 'about-carousel-3.jpg', alt: 'Delegates singing together on stage during a karaoke night' },
                    { src: 'about-carousel-4.jpg', alt: 'A full auditorium of delegates during a FACT session' },
                    {
                      src: 'about-carousel-5.jpg',
                      alt: 'Performers on stage in traditional dress during a cultural dance number',
                    },
                    {
                      src: 'about-carousel-6.jpg',
                      alt: 'Delegates performing a choreographed dance number on stage',
                    },
                    {
                      src: 'about-carousel-7.jpg',
                      alt: 'A whiteboard covered in farewell messages and drawings from delegates, reading "Mabuhay!"',
                    },
                  ].map((photo) => (
                    <li className="photocarousel__slide" key={photo.src}>
                      <Image
                        src={`/images/${photo.src}`}
                        alt={photo.alt}
                        width={1280}
                        height={960}
                        sizes="(min-width: 900px) 480px, 90vw"
                      />
                    </li>
                  ))}
                </ul>
                <button className="photocarousel__nav photocarousel__nav--prev" type="button" aria-label="Previous photo">
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
                </button>
                <button className="photocarousel__nav photocarousel__nav--next" type="button" aria-label="Next photo">
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
                </button>
                <div className="photocarousel__dots" role="tablist" aria-label="Choose photo">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <button
                      className={`photocarousel__dot${i === 0 ? ' is-active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={i === 0}
                      tabIndex={i === 0 ? 0 : -1}
                      aria-label={`Photo ${i + 1} of 7`}
                      key={i}
                    />
                  ))}
                </div>
                <p className="photocarousel__status" aria-hidden="true">
                  <span id="about-carousel-status">1</span> / 7
                </p>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
