'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import LoadingCircle from '@/components/icons/LoadingCircle';

// Same Eventbrite event as the Bundle option on /my-fact/register — the
// venue's seat inventory lives on that one event, and this promo code is
// what restricts checkout to the Variety-Show-only ticket class instead of
// the bundle. Keeping both event IDs in sync is on us until this is fetched
// from the backend instead of hardcoded (see EVENTBRITE_EVENT_IDS.variety_show
// server-side).
const EVENTBRITE_EVENT_ID = '2001120979719';
const PROMO_CODE = 'VSHOWONLY';

export default function VarietyShow() {
    const containerId = `eventbrite-widget-container-${EVENTBRITE_EVENT_ID}`;
    const initializedRef = useRef(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const tryCreateWidget = () => {
        if (initializedRef.current) return;
        if (typeof window === 'undefined') return;
        // @ts-ignore
        if (!window.EBWidgets) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            // @ts-ignore
            window.EBWidgets.createWidget({
                widgetType: 'checkout',
                eventId: EVENTBRITE_EVENT_ID,
                iframeContainerId: containerId,
                iframeContainerHeight: 800,
                onOrderComplete: () => console.log('Checkout Completed'),
                promoCode: PROMO_CODE,
            });

            initializedRef.current = true;

            const observer = new MutationObserver(() => {
                if (container.querySelector('iframe')) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            });
            observer.observe(container, { childList: true });
        } catch (e) {
            console.warn('EBWidgets available but createWidget failed, retrying…', e);
        }
    };

    useEffect(() => {
        const id = setInterval(tryCreateWidget, 200);
        setTimeout(() => clearInterval(id), 5000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <SiteHeader compact pageTitle="Variety Show" />

            <main id="below">
                <section className="section section--about" aria-label="Variety Show tickets">
                    <div className="section__inner">
                        <div style={{ margin: '0 auto', maxWidth: 640 }}>
                            <div id={containerId}>
                                {!isLoaded && (
                                    <div className="w-fit mx-auto">
                                        <LoadingCircle />
                                    </div>
                                )}
                            </div>
                        </div>
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

            <Script
                src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
                strategy="afterInteractive"
                onLoad={tryCreateWidget}
            />
        </>
    );
}
