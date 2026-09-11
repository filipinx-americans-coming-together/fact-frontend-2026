'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { InstagramIcon } from './SocialIcon';

export function SiteFooter() {
  const pathname = usePathname();
  const onDonatePage = pathname === '/donate';

  return (
    <footer className="footer">
      {!onDonatePage ? (
        <div className="footer__donate">
          <p className="footer__donateline">Enjoying what FACT is building for Mahiwagahan 2026?</p>
          <Link className="pill pill--solid" href="/donate">
            Donate
          </Link>
        </div>
      ) : null}

      <div className="footer__inner">
        <div className="footer__col footer__col--brand">
          <Link className="footer__mark" href="/" aria-label="FACT 2026 home">
            <Image src="/images/nav-mark.png" alt="" width={40} height={40} />
          </Link>
          <p className="footer__line">Made with love by the Philippine Student Association UIUC</p>
          <Link
            href="/admin/login"
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Admin
          </Link>
        </div>
        <div className="footer__col footer__col--nav">
          <ul className="footer__links">
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer__col footer__col--connect">
          <p className="footer__heading">Connect</p>
          <a
            className="footer__social"
            href="https://www.instagram.com/psa_fact/?hl=en"
            target="_blank"
            rel="noopener"
          >
            <InstagramIcon />
            <span>@psa_fact</span>
          </a>
        </div>
      </div>
      <div className="footer__legalrow">
        <p className="footer__legal">© 2026 Philippine Student Association, University of Illinois Urbana-Champaign.</p>
        <a
          className="footer__legal"
          href="https://mailchi.mp/cfe8f7c8506d/fact-2026-newsletter-signup"
          target="_blank"
          rel="noopener"
          style={{ display: 'block', marginTop: '0.5rem', textDecoration: 'underline' }}
        >
          Subscribe to our newsletter
        </a>
      </div>
    </footer>
  );
}
