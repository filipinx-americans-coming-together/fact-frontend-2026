import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import { PalengkeMarket } from '@/components/site/PalengkeMarket';

export const metadata: Metadata = {
  title: 'Palengke · FACT 2026',
  description:
    "FACT's cultural market: Filipino food, art, jewelry, clothing, and org merch from 21 vendors across two days.",
};

export default function PalengkePage() {
  return (
    <>
      <SiteHeader
        compact
        pageTitle="Palengke"
        pageSubtitle="Filipino food, art, and goods from student orgs and local makers, across two markets."
        active="palengke"
      />

      <main id="below">
        <PalengkeMarket />

        <CrossLinks
          links={[
            { href: '/agenda', label: 'Agenda' },
            { href: '/variety-show', label: 'Variety Show' },
            { href: '/', label: 'Home' },
          ]}
        />

        <SiteFooter />
      </main>
    </>
  );
}
