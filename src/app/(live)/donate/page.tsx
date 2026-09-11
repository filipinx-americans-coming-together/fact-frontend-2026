'use client';

import Script from 'next/script';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

const BLACKBAUD_FORM_ID = '799cd906-9cc4-401c-bf98-a0de4daac6c6';

const TOP_DONORS = [
  { name: 'Rose Ann Maneevese', tier: 'Gold', amount: '$500' },
  { name: 'MAFA', tier: 'Silver', amount: '$300' },
  { name: 'Philippine Consulate (Ella Karina Mitra-Yeager)', tier: 'Bronze', amount: '$200' },
];

const TIER_COLORS: Record<string, string> = {
  Gold: '#D4AF37',
  Silver: '#A8A8A8',
  Bronze: '#B08D57',
};

export default function DonatePage() {
  return (
    <>
      <SiteHeader compact pageTitle="Donate" pageSubtitle="FACT would not be possible without your support!" />

      <main id="below">
        <section className="section section--about" aria-label="Support FACT 2026">
          <div className="section__inner">
            <div className="about__body" style={{ margin: '0 auto', textAlign: 'center' }}>
              <p className="about__lead" style={{ marginInline: 'auto' }}>
                The Filipinx Americans Coming Together (FACT) conference is an annual student-run conference
                organized by the Philippine Student Association at University of Illinois at Urbana-Champaign.
              </p>
              <p style={{ marginInline: 'auto' }}>
                Your donation to the FACT Conference helps us bring facilitators, panelists, keynote speakers,
                headliners, venues, and much more for our attendees to enjoy and benefit from. This conference would
                not be possible without the help of generous donors like you. But your help goes beyond sponsorship.
                By supporting this conference, you contribute to inspiring and empowering today&apos;s generation to
                be passionate and responsible leaders, who aim to shape their world and follow their dreams. You are
                laying the groundwork to strengthen the upcoming generation.
              </p>
            </div>

            <div style={{ margin: '2.5rem auto 0', maxWidth: 640, textAlign: 'center' }}>
              <h2 className="section__heading" style={{ marginBottom: '1.5rem' }}>
                Our Top Donors
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                {TOP_DONORS.map((donor) => (
                  <div
                    key={donor.name}
                    style={{
                      border: `2px solid ${TIER_COLORS[donor.tier]}`,
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem',
                      minWidth: 220,
                      textAlign: 'left',
                    }}
                  >
                    <p style={{ fontWeight: 600, margin: 0 }}>{donor.name}</p>
                    <p style={{ margin: '0.35rem 0 0', color: TIER_COLORS[donor.tier], fontWeight: 600 }}>
                      {donor.tier} &middot; {donor.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="bbox-root" style={{ margin: '2rem auto 0', maxWidth: 480, display: 'flex', justifyContent: 'center' }} />
            <Script
              id="bbox-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.bboxInit = function () { bbox.showForm('${BLACKBAUD_FORM_ID}'); };`,
              }}
            />
            <Script src="https://bbox.blackbaudhosting.com/webforms/bbox-min.js" strategy="afterInteractive" />
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
