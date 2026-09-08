import { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

interface RegPageContainerProps {
    children: ReactNode;
    pageTitle: string;
    pageSubtitle?: string;
    background?: string;
}

/**
 * Formatting container for the delegate/facilitator registration flow.
 * Wraps pages in the same compact-hero + footer chrome as the confirmed
 * 2026 marketing pages (About, Workshops, etc.) — see DESIGN.md.
 * @param children page content
 * @returns PageContainer
 */
export default function RegPageContainer({ children, pageTitle, pageSubtitle, background="bg-[var(--cream-100)]" }: RegPageContainerProps) {
    return (
        <div className={`fact-form-page h-fit w-screen relative`}>

            <div className="flex flex-col min-h-screen justify-between gap-10 lg:gap-15">
            <SiteHeader compact pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
            {background && <div className={`-z-10 absolute inset-0 w-full grow ${background}`}></div>}
                {background && <div className="relative">
                        {children}
                </div>}
                {!background && <div>{children}</div>}
            <SiteFooter />
            </div>
        </div>
    );
}