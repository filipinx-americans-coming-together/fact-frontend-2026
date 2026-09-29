'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import EventbriteCheckout from '@/components/ui/EventbriteCheckout';

// Same Eventbrite event as the Bundle option on /my-fact/register — the
// venue's seat inventory lives on that one event, and this promo code is
// what restricts checkout to the Variety-Show-only ticket class instead of
// the bundle. Keeping both event IDs in sync is on us until this is fetched
// from the backend instead of hardcoded (see EVENTBRITE_EVENT_IDS.variety_show
// server-side).
const EVENTBRITE_EVENT_ID = '2001120979719';
const PROMO_CODE = 'VSHOWONLY';

const ACTS = [
    'Tropang Pinoy',
    'RVN',
    'UC PASO Ritmo',
    'KasaTigre',
    'Sierra Sikora',
    'PSA Lumaya',
    'Purple Cakes',
    'PSA Harana',
    'FIA Modern',
    'Barkada',
];

export default function VarietyShow() {
    return (
        <>
            <SiteHeader
                compact
                pageTitle="Variety Show"
                pageSubtitle="Welcome to a night of music, dance, and culture!"
                active="variety-show"
            />

            <main id="below">
                {/* Public checkout, no FACT account needed: tickets bought
                    here are never tied to a delegate, so there's nothing to
                    verify server-side. */}
                <section className="section section--about" aria-label="Variety Show tickets">
                    <div className="section__inner">
                        <h2 className="section__heading" style={{ textAlign: 'center' }}>
                            Tickets
                        </h2>
                        <div style={{ margin: '0 auto 1.5rem', maxWidth: 640, textAlign: 'center' }}>
                            <p>
                                <b>These tickets are for the Variety Show only.</b> Want the full FACT
                                experience with workshops? Register <Link className="inline-link" href="/my-fact/create-account">here</Link>.
                                The Workshops + Variety Show Bundle includes your show ticket.
                            </p>
                            <p style={{ marginTop: '0.75rem' }}>
                                <b>UIUC students:</b> your Variety Show ticket is free. Use the UIUC promo code
                                that was sent out, with <b>-VSHOW</b> added to the end (for
                                example, <code>YOURCODE-VSHOW</code>).
                            </p>
                        </div>
                        <div style={{ margin: '0 auto', maxWidth: 640 }}>
                            <EventbriteCheckout eventId={EVENTBRITE_EVENT_ID} promoCode={PROMO_CODE} />
                        </div>
                    </div>
                </section>

                <section className="section section--lineup" aria-label="Variety Show lineup">
                    <div className="section__inner">
                        <h2 className="section__heading" style={{ textAlign: 'center' }}>
                            Lineup
                        </h2>
                        <p className="lineup__headliner-tbd">
                            <span>Headliner</span>
                            Coming soon
                        </p>
                        <ul className="lineup__names">
                            {ACTS.map((act) => (
                                <li key={act}>{act}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <CrossLinks
                  links={[
                    { href: '/', label: 'Home' },
                    { href: '/workshops', label: 'Workshops' },
                    { href: '/team', label: 'Team' },
                  ]}
                />

                <SiteFooter />
            </main>
        </>
    );
}
