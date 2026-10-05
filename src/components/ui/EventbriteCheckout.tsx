"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        EBWidgets?: { createWidget: (options: Record<string, unknown>) => void };
    }
}

// Loaded once per page load and shared by every widget — appending the
// script again on every render left several copies of the Eventbrite loader
// running at once.
let eventbriteScriptPromise: Promise<void> | null = null;

function loadEventbriteScript(): Promise<void> {
    if (eventbriteScriptPromise) return eventbriteScriptPromise;

    eventbriteScriptPromise = new Promise((resolve, reject) => {
        if (window.EBWidgets) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
            eventbriteScriptPromise = null;
            script.remove();
            reject(new Error("Failed to load Eventbrite"));
        };
        document.head.appendChild(script);
    });

    return eventbriteScriptPromise;
}

interface EventbriteCheckoutProps {
    eventId: string;
    /** Hides the widget without unmounting it, so its checkout state survives. */
    hidden?: boolean;
    /** Pre-applied Eventbrite promo/access code, e.g. to reveal a hidden ticket class. */
    promoCode?: string;
    onOrderComplete?: (orderData: any) => void;
    /**
     * Eventbrite page to send people to if the widget can't load (ad
     * blockers, strict privacy settings). Only for public checkouts — the
     * register flow needs onOrderComplete, which a plain link can't fire.
     */
    fallbackUrl?: string;
}

// Must stay a module-level component that's mounted once. When the register
// page defined its widget inside the page component, every re-render
// (picking a workshop, a query refetching on window focus, a loading flag
// flipping right after payment) produced a new component type, so React tore
// down the iframe and createWidget ran again — wiping Eventbrite's
// confirmation screen and showing people a fresh checkout, which is how
// delegates were getting charged two or three times. Hide it with the
// `hidden` prop rather than conditionally rendering it.
export default function EventbriteCheckout({
    eventId,
    hidden = false,
    promoCode,
    onOrderComplete,
    fallbackUrl,
}: EventbriteCheckoutProps) {
    const containerId = `eventbrite-widget-container-${eventId}${promoCode ? `-${promoCode}` : ""}`;
    const onOrderCompleteRef = useRef(onOrderComplete);
    const createdRef = useRef(false);
    const [loadFailed, setLoadFailed] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        onOrderCompleteRef.current = onOrderComplete;
    });

    useEffect(() => {
        let cancelled = false;
        loadEventbriteScript()
            .then(() => {
                if (cancelled || createdRef.current || !window.EBWidgets) return;
                createdRef.current = true;
                window.EBWidgets.createWidget({
                    widgetType: "checkout",
                    eventId,
                    iframeContainerId: containerId,
                    iframeContainerHeight: 800,
                    ...(promoCode ? { promoCode } : {}),
                    onOrderComplete: (orderData: any) => onOrderCompleteRef.current?.(orderData),
                });
                setReady(true);
            })
            .catch(() => {
                if (!cancelled) setLoadFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, [eventId, containerId, promoCode]);

    return (
        // Inline display:none rather than Tailwind's `hidden` — unlayered
        // global CSS in this project can silently override utility classes.
        <div className="w-full" style={hidden ? { display: "none" } : undefined}>
            {!ready && !loadFailed && (
                <p className="text-center text-sm opacity-75" role="status">
                    Loading checkout…
                </p>
            )}
            {loadFailed && (
                <p className="text-center text-sm text-red-600" role="alert">
                    Could not load the Eventbrite checkout.{" "}
                    {fallbackUrl ? (
                        <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                            Get tickets on Eventbrite instead
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    ) : (
                        "Please refresh the page."
                    )}
                </p>
            )}
            <div id={containerId}></div>
        </div>
    );
}
