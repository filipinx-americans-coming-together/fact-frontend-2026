'use client';

import { useEffect } from 'react';

// Opens the <details> a /faq#question-id link points at, so a shared link
// lands on the answer instead of a closed row.
export function FaqHashOpener() {
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({ block: 'start' });
      }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return null;
}
