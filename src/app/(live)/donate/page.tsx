'use client';

import Script from 'next/script';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

const BLACKBAUD_FORM_ID = '799cd906-9cc4-401c-bf98-a0de4daac6c6';

export default function DonatePage() {
  return (
    <>
      <SiteHeader compact pageTitle="Donate" pageSubtitle="Help make Mahiwagahan possible." />

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
