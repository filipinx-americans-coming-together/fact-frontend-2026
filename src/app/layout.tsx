import type { Metadata } from "next";
import "./globals.css";
import { QueryProviderWrapper } from "@/components/QueryProviderWrapper";
import { LiveSiteInteractions } from "@/components/LiveSiteInteractions";

export const metadata: Metadata = {
    title: "FACT 2026 · Mahiwagahan",
    description:
        "FACT 2026: Filipinx Americans Coming Together, Mahiwagahan (Enchanting Our Bright Minds). Oct. 16–18, 2026, University of Illinois Urbana–Champaign. Presented by the Philippine Student Association at UIUC.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/images/nav-mark.png"
                    type="image/png"
                    sizes="32x32"
                />
            </head>
            <body>
                <QueryProviderWrapper>{children}</QueryProviderWrapper>
                <LiveSiteInteractions />
            </body>
        </html>
    );
}
