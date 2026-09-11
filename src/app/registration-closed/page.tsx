'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function RegistrationClosed() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        if (seconds <= 0) {
            router.push('/');
            return;
        }
        const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [seconds, router]);

    return (
        <div className="live-page">
            <SiteHeader compact pageTitle="My FACT Portal" pageSubtitle="Unavailable until FACT 2026 registration opens." />

            <main id="below">
                <section className="section section--about" aria-label="Registration closed">
                    <div className="section__inner">
                        <div className="about__body" style={{ margin: '0 auto', textAlign: 'center' }}>
                            <h2 className="section__heading">Not Open Yet</h2>
                            <p className="about__lead" style={{ marginInline: 'auto' }}>
                                The My FACT Portal is unavailable until FACT 2026 registration opens.
                            </p>
                            <p style={{ marginInline: 'auto' }}>
                                Redirecting to the home page in {seconds} second{seconds === 1 ? '' : 's'}.
                            </p>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                                <Link className="pill pill--ink" href="/">
                                    &larr; Back Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
}
