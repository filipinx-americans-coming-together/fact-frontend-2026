import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'FAQ · FACT 2026',
  description: 'Registration, accessibility, campus logistics, and everything else you need to know before FACT 2026.',
};

const CATEGORIES: { name: string; items: { q: string; a: string; flag?: string }[] }[] = [
  {
    name: 'General',
    items: [
      {
        q: 'I am a minor, can I go to FACT?',
        a: 'Due to university policies and safety reasons, minors who are unattended by their guardians are not permitted to attend FACT affiliated events.',
      },
      {
        q: 'What are COVID/illness restrictions?',
        a: "PSA is currently not requiring any masking or vaccination for this year's FACT. If you are feeling sick or unwell, please refrain from attending or use a mask to protect the health and safety of others who may be prone or sensitive to sickness.",
      },
      {
        q: 'Is there accessibility for workshops or variety shows?',
        a: 'All FACT venue entrances are accessible via ramps on either the front or sides of buildings.',
      },
      {
        q: 'Is there a dress code?',
        a: "As long as apparel is not offensive, there is no specific dress code for FACT. Since this is an autumn event, please dress for the weather. Most delegates wear their organization's merchandise to conference.",
      },
      {
        q: 'Will any part of the conference be on Zoom/virtual?',
        a: 'This year, FACT will be a purely in-person conference. However, we will be providing informational materials on our Instagram, newsletter, and website after the conference for anyone hoping to stay connected to the speakers, guests, and performers post-FACT.',
      },
      {
        q: 'Will the conference be live streamed?',
        a: "Yes — the Opening Ceremony will be livestreamed, and so will the Variety Show! Check out our YouTube and don't forget to subscribe, like, and comment.",
      },
      {
        q: 'What can I bring into Variety Show?',
        a: 'Food and drinks are NOT allowed into Foellinger Auditorium. Backpacks and large bags are subject to search by facilities staff.',
      },
    ],
  },
  {
    name: 'At UIUC',
    items: [
      {
        q: 'How do I book a hotel using the hotel block booking system?',
        a: "FACT has coordinated a selection of hotel blocks specifically for conference guests. Details and instructions are outlined on our Instagram (@psa_fact) and our newsletter, but rooms are only available for booking for a limited time. It's highly encouraged that you book in advance, as this year's FACT coincides with a football game.",
      },
      {
        q: 'Where can I eat?',
        a: 'During your free time during the FACT Conference, you have the freedom to choose between the variety of food options available on and near the UIUC campus. We encourage you to support our day-of food and drink fundraisers, which will be announced via our Instagram and newsletter at a later date.',
      },
      {
        q: 'How can I get around campus?',
        a: 'All MTD bus stops within campus borders are marked by an orange bus stop sign and are free of charge. Outside campus, the white bus stop sign indicates that a fee must be paid, unless waived by a UIUC identification card.',
      },
      {
        q: 'What are the parking policies?',
        a: 'Parking for non-UIUC faculty and staff is metered and/or limited to designated spaces. Meter payments may be processed by coin, Pay by Phone, or CashKey depending on posted instructions. Free weekend and overnight parking lots are listed by the university. Parking is strictly monitored by campus officials — those not adhering to policy may be subject to ticketing or towing. FACT is not responsible for any parking charges incurred by attendees.',
      },
      {
        q: 'What wifi services are available?',
        a: 'Campus Wi-Fi is free for guests by connecting to "IllinoisNet_Guest."',
      },
      {
        q: 'What do I do if I lose anything during the conference?',
        a: 'As outlined in the Terms and Conditions all registered participants affirm to, FACT attendees are responsible for loss of items or damage to FACT Conference facilities, and are liable for any costs incurred to repair inflicted damage.',
      },
    ],
  },
  {
    name: 'Registration',
    items: [
      {
        q: 'How do I register?',
        a: "Use the \"My FACT\" tab on our website and fill out your information. Continue to the next page and you'll see the sessions you signed up for and the details for those workshops.",
      },
      {
        q: 'How much are registration fees?',
        a: 'Early Registration: V-Show $15 · Workshops $20 · Bundle $30.\nLate Registration: V-Show $20 · Workshops $25 · Bundle $35.',
        flag: 'Figures shown are from the 2025 conference — confirm current pricing for FACT 2026.',
      },
      {
        q: 'Where can I find information regarding workshops?',
        a: 'Workshop and facilitator biographies are available via our Instagram or the "Workshops" tab on our website. After registering, you can find information about your specific workshops via your Dashboard.',
      },
      {
        q: 'How can I change my workshop choice?',
        a: 'If other workshops haven\'t reached capacity, you may log into your dashboard, click "Update Workshops," then confirm — your choice will update.',
      },
      {
        q: 'Are there refunds?',
        a: "Refunds can be requested via a request form, up until the end of the Early Registration period. Please secure your availability and confirm you'll attend the events paid for prior to registering.",
      },
      {
        q: "I wasn't able to register early — can I still attend?",
        a: 'Yes. If you missed early registration, you can still register online at the Late Registration price until the week prior to the conference. In-person late registration is also typically offered on campus in the days before FACT.',
        flag: 'Specific in-person registration dates, times, and location are from the 2025 conference — confirm details for FACT 2026.',
      },
      {
        q: 'Can I upgrade to the bundle?',
        a: "After completing your purchase, upgrading to the bundle isn't allowed — you may purchase an additional session or Variety Show ticket separately.",
      },
      {
        q: 'What is the delegate commitments Instagram, and how do I participate?',
        a: 'PSA runs a companion Instagram page featuring delegate profiles, similar to a college commitment page — a way for delegates to connect with each other and make new friendships. Watch our main Instagram (@psa_fact) for the current page handle and participation form.',
        flag: 'The 2025 conference used a season-specific handle (@factcommitments2025) — confirm the current handle for 2026.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader compact pageTitle="Frequently Asked Questions" pageSubtitle="Everything you need before FACT." />

      <main id="below">
        <section className="section section--faq">
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
            <div className="faq__categories">
              {CATEGORIES.map((category) => (
                <div className="faq__category" key={category.name}>
                  <h2 className="groupheading">{category.name}</h2>
                  {category.items.map((item) => (
                    <details className="faq__item" key={item.q}>
                      <summary>{item.q}</summary>
                      {item.a.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                      {item.flag ? <p className="faq__flag">{item.flag}</p> : null}
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="crosslink" aria-label="More to explore">
          <div className="crosslink__inner">
            <p className="crosslink__label">Continue exploring</p>
            <div className="crosslink__links">
              <Link className="crosslink__link" href="/workshops">
                <span>Workshops</span>
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
            </div>
          </div>
        </nav>

        <SiteFooter />
      </main>
    </>
  );
}
