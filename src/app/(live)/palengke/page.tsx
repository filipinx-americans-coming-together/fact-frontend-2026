import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { VendorLogoIcon } from '@/components/site/VendorIcon';
import { InstagramIcon } from '@/components/site/SocialIcon';

export const metadata: Metadata = {
  title: 'Palengke · FACT 2026',
  description: "FACT's cultural night market — food, crafts, and community, right on campus.",
};

const GROUPS: { name: string; vendors: { name: string; theme: string }[] }[] = [
  {
    name: 'Food Vendors',
    vendors: [
      { name: 'Lumpia & Turon Cart', theme: 'Crispy lumpia and turon, fried to order.' },
      { name: 'Halo-Halo Bar', theme: 'Build-your-own halo-halo, shaved ice and all the mix-ins.' },
      { name: 'Adobo & Rice Bowls', theme: 'Classic adobo over garlic rice, comfort food fast.' },
      { name: 'Ube Everything', theme: 'Ube donuts, ube cheesecake, ube soft-serve.' },
    ],
  },
  {
    name: 'Crafts & Goods',
    vendors: [
      { name: 'Handwoven Textiles', theme: 'Inabel and other handwoven textile pieces.' },
      { name: 'Wood & Shell Carvings', theme: 'Small hand-carved wood and capiz-shell pieces.' },
      { name: 'Barong & Modern Filipiniana', theme: 'Ready-to-wear and made-to-order barong pieces.' },
    ],
  },
  {
    name: 'FACT Merch',
    vendors: [
      { name: 'FACT 2026 Apparel', theme: "Hoodies, tees, and crewnecks in this year's Mahiwagahan colors." },
      { name: 'Pins & Stickers', theme: 'Enamel pins and sticker packs featuring FACT motifs.' },
      { name: 'Tote Bags & Prints', theme: 'Tote bags and small art prints from FACT artists.' },
    ],
  },
];

export default function PalengkePage() {
  return (
    <>
      <SiteHeader
        compact
        pageTitle="Palengke"
        pageSubtitle="FACT's cultural night market — food, crafts, and community, right on campus."
      />

      <main id="below">
        <section className="section section--palengke">
          <svg className="motif motif--tr motif--butterfly" viewBox="0 0 100 80" aria-hidden="true">
            <path d="M50 20C30 5 10 15 15 30 18 40 35 38 50 28" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M50 28C35 38 20 42 18 52 16 60 30 62 50 45" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M50 20C70 5 90 15 85 30 82 40 65 38 50 28" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M50 28C65 38 80 42 82 52 84 60 70 62 50 45" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path
              d="M50 15C46 10 42 8 40 5M50 15C54 10 58 8 60 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
          <div className="section__inner">
            <p className="section__intro">
              Vendors, themes, and social handles below are illustrative placeholders — the real Palengke lineup is
              confirmed closer to FACT 2026 by the Palengke committee.
            </p>

            <div className="palengke__groups">
              {GROUPS.map((group) => (
                <div key={group.name}>
                  <h2 className="groupheading">{group.name}</h2>
                  <ul className="vendor__grid">
                    {group.vendors.map((vendor) => (
                      <li className="vendor__card" key={vendor.name}>
                        <div className="vendor__logo" aria-hidden="true">
                          <VendorLogoIcon />
                        </div>
                        <p className="vendor__name">{vendor.name}</p>
                        <p className="vendor__theme">{vendor.theme}</p>
                        <span className="vendor__handle">
                          <InstagramIcon />
                          Instagram handle: TBD
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="crosslink" aria-label="More to explore">
          <div className="crosslink__inner">
            <p className="crosslink__label">Continue exploring</p>
            <div className="crosslink__links">
              <Link className="crosslink__link" href="/agenda">
                <span>Agenda</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link className="crosslink__link" href="/team">
                <span>Team</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </nav>

        <SiteFooter />
      </main>
    </>
  );
}
