'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initLiveSiteInteractions } from '@/lib/liveSiteInteractions';

// Re-runs live's ported DOM interactions after every route change, since
// Next.js client-side navigation doesn't remount <body> the way a fresh
// static-HTML page load would.
export function LiveSiteInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    const destroy = initLiveSiteInteractions();
    return destroy;
  }, [pathname]);

  return null;
}
