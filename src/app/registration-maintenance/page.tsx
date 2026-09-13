'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegPageContainer from '@/components/formatting/RegPageContainer';

export default function RegistrationMaintenance() {
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
        <RegPageContainer pageTitle="Under Maintenance" pageSubtitle="FACT registration is temporarily unavailable while we perform maintenance.">
            <div className="flex flex-col justify-center items-center gap-4 py-12 text-center">
                <p className="text-sm">Redirecting to the home page in {seconds} second{seconds === 1 ? '' : 's'}.</p>
                <Link href="/" className="pill pill--ink">
                    &larr; Back Home
                </Link>
            </div>
        </RegPageContainer>
    );
}
