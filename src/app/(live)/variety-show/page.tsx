'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

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
                pageSubtitle="A night of music, dance, and culture — presented by FACT 2026."
                active="variety-show"
            />

            <main id="below">
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

                <nav className="crosslink" aria-label="More to explore">
                    <div className="crosslink__inner">
                        <p className="crosslink__label">Continue exploring</p>
                        <div className="crosslink__links">
                            <Link className="crosslink__link" href="/agenda">
                                <span>Agenda</span>
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
                            <Link className="crosslink__link" href="/team">
                                <span>Team</span>
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
