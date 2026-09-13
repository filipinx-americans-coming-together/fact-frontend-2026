'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import LoadingCircle from '@/components/icons/LoadingCircle';

// Same Eventbrite event as the Bundle option on /my-fact/register — the
// venue's seat inventory lives on that one event, and this promo code is
// what restricts checkout to the Variety-Show-only ticket class instead of
// the bundle. Keeping both event IDs in sync is on us until this is fetched
// from the backend instead of hardcoded (see EVENTBRITE_EVENT_ID server-side).
const EVENTBRITE_EVENT_ID = '1816702820039';
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
