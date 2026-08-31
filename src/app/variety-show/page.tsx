'use client';

import PageContainer from "@/components/formatting/PageContainer";
import LoadingCircle from "@/components/icons/LoadingCircle";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { PiArrowElbowRightDownBold } from "react-icons/pi";

export default function VarietyShow() {
  const containerId = "eventbrite-widget-container-1816702820039";
  const initializedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const tryCreateWidget = () => {
    if (initializedRef.current) return;
    if (typeof window === "undefined") return;
    // @ts-ignore
    if (!window.EBWidgets) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear any previous iframe if navigating back.
    container.innerHTML = "";

    try {
      // @ts-ignore
      window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId: "1816702820039",
        iframeContainerId: containerId,
        iframeContainerHeight: 800,
        onOrderComplete: () => console.log("Checkout Completed :)"),
        promoCode: "VSHOWONLY",
      });

      initializedRef.current = true;
      console.log("Eventbrite widget initialized");

      // Mark widget as loaded once iframe exists
      const observer = new MutationObserver(() => {
        if (container.querySelector("iframe")) {
          setIsLoaded(true);
          observer.disconnect();
        }
      });
      observer.observe(container, { childList: true });
    } catch (e) {
      console.warn("EBWidgets available but createWidget failed, retrying…", e);
    }
  };

  useEffect(() => {
    const id = setInterval(tryCreateWidget, 200);
    setTimeout(() => clearInterval(id), 5000); // stop after 5s
    return () => clearInterval(id);
  }, []);

  return (
    <PageContainer title="Variety Show">
      <div className="w-fit mx-auto text-sm flex gap-1 items-center text-center"> For Variety Show, you will not have to sit in your assigned seat (row & number), but you will have to sit in your assigned section (1-4). Please choose the seat for your ticket accordingly. The entire seat map of the Foellinger Auditorium floor is detailed for your visualization</div>
      <br></br>
      <div className="w-fit mx-auto text-sm text-slate-700 flex gap-1 items-center text-center">
        Have a promo code? You must click remove then add the code{" "}
        <PiArrowElbowRightDownBold />
      </div>
      <br />

      <div id={containerId}>
        {!isLoaded && (
          <div className="w-fit mx-auto mb-4">
            <LoadingCircle />
          </div>
        )}
      </div>

      <Script
        src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
        strategy="afterInteractive"
        onLoad={tryCreateWidget}
      />
    </PageContainer>
  );
}
