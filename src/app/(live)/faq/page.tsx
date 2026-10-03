import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import { FaqHashOpener } from '@/components/site/FaqHashOpener';

export const metadata: Metadata = {
  title: 'FAQ · FACT 2026',
  description: 'Registration, accessibility, campus logistics, and everything else you need to know before FACT 2026.',
};

// The Google Doc is the organizers' source of truth for this page. Keep the
// copy below in sync with it when answers change.
const FAQ_DOC_URL = 'https://docs.google.com/document/d/1JQNIq-FoFCAG-jw5hQJwMq3JehxUvO64rBM9UPa4Ip4/edit?usp=sharing';

const INSTAGRAM_URL = 'https://www.instagram.com/psa_fact/';

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="inline-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const Instagram = () => <ExternalLink href={INSTAGRAM_URL}>@psa_fact</ExternalLink>;

type FaqItem = { id: string; q: string; a: ReactNode };
type FaqCategory = { id: string; name: string; items: FaqItem[] };

const CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    name: 'General',
    items: [
      {
        id: 'what-is-fact',
        q: 'What is FACT?',
        a: (
          <>
            <p>
              FACT stands for Filipinx Americans Coming Together and is a conference hosted annually by the Philippine
              Student Association at the University of Illinois at Urbana-Champaign. It is the largest Filipinx-interest
              conference in the Midwest, bringing in over 1,000 delegates yearly. The conference works to empower young,
              rising professionals while simultaneously educating the delegates about Filipinx culture, identity and
              issues.
            </p>
            <p>
              Despite the conference&rsquo;s title, the conference is not limited to delegates of Filipinx descent. The
              facilitators and delegates come from different backgrounds and ethnicities, and the workshops cover a wide
              array of topics.
            </p>
            <p>
              FACT&rsquo;s mission is to build a community of leaders by uniting, enlightening and empowering the
              Filipinx/Fil-Am/Non-Filipinx youth nationwide. By exploring our interests, culture and identity as a rising
              generation, we hope that our delegates can take with them knowledge that they can apply beyond their
              college career as leaders in the professional world ready to give back to their community.
            </p>
          </>
        ),
      },
      {
        id: 'minors',
        q: 'I am a minor, can I go to FACT?',
        a: (
          <p>
            Due to university policies and safety reasons, minors who are unattended by their guardians are not
            permitted to attend FACT affiliated events.
          </p>
        ),
      },
      {
        id: 'illness',
        q: 'What are COVID/illness restrictions?',
        a: (
          <p>
            PSA is currently not requiring any masking or vaccination for this year&rsquo;s FACT. If you are feeling
            sick or unwell, please refrain from attending or use a mask to protect the health and safety of others who
            may be prone or sensitive to sickness.
          </p>
        ),
      },
      {
        id: 'accessibility',
        q: 'Is there accessibility for workshops or variety shows?',
        a: <p>All FACT venue entrances are accessible via ramps on either the front or sides of buildings.</p>,
      },
      {
        id: 'dress-code',
        q: 'Is there a dress code?',
        a: (
          <p>
            As long as apparel is not offensive, there is no specific dress code for FACT. Since this is an autumn
            event, please dress for the weather. Most delegates wear their organization&rsquo;s merchandise to
            conference.
          </p>
        ),
      },
      {
        id: 'virtual',
        q: 'Will any part of the conference be on Zoom/virtual?',
        a: (
          <p>
            This year, FACT will be a purely in-person conference. However, we will be providing informational
            materials on our Instagram, newsletter, and website after the conference for anyone hoping to stay connected
            to the speakers, guests, and performers post-FACT.
          </p>
        ),
      },
      {
        id: 'livestream',
        q: 'Will the conference be live streamed?',
        a: (
          <p>
            Yes, the Opening Ceremony will be livestreamed and so will the Variety Show! Please check out our{' '}
            <ExternalLink href="https://www.youtube.com/@factmedia92">YouTube</ExternalLink> and don&rsquo;t forget to
            subscribe, like, and comment!
          </p>
        ),
      },
      {
        id: 'variety-show-items',
        q: 'What can I bring into Variety Show?',
        a: (
          <p>
            Food and drinks are NOT allowed into Foellinger Auditorium. Backpacks and large bags are subject to search
            by Facilities Staff.
          </p>
        ),
      },
    ],
  },
  {
    id: 'at-uiuc',
    name: 'At UIUC',
    items: [
      {
        id: 'hotels',
        q: 'How do I book a hotel using the hotel block booking system?',
        a: (
          <p>
            FACT has coordinated a selection of hotel blocks specifically for conference guests. Details and
            instructions are outlined on our Instagram (<Instagram />) and our newsletter, but rooms are only available
            for booking for a limited time.
          </p>
        ),
      },
      {
        id: 'food',
        q: 'Where can I eat?',
        a: (
          <p>
            During your free time during the FACT Conference, you have the freedom to choose between the variety of food
            options available on and near the UIUC campus. We encourage you to support our day-of food and drink
            fundraisers, which will be announced via our Instagram (<Instagram />) and our newsletter at a later date.
          </p>
        ),
      },
      {
        id: 'getting-around',
        q: 'How can I get around campus?',
        a: (
          <p>
            All MTD bus stops within campus borders will be marked by an orange bus stop sign and are free of charge.
            Outside campus, the white bus stop sign will indicate that a fee must be paid unless waived by a UIUC
            identification card.
          </p>
        ),
      },
      {
        id: 'parking',
        q: 'What are the parking policies?',
        a: (
          <p>
            Parking for non-UIUC faculty and staff is metered and/or limited to the spaces outlined on the{' '}
            <ExternalLink href="https://parking.web.illinois.edu/maps/campus-parking-map">campus parking map</ExternalLink>
            . Meter payments may be processed by coin, Pay by Phone, or CashKey depending on the outlined instructions.
            Free weekend and overnight parking lots are listed on the{' '}
            <ExternalLink href="https://parking.web.illinois.edu/campus-parking/weekday-and-overnight">
              weekday and overnight parking page
            </ExternalLink>
            . Parking is strictly monitored by campus officials and those not adhering to the policies may be subject to
            ticketing or towing. FACT is not responsible for any parking charges made towards all attendees.
          </p>
        ),
      },
      {
        id: 'wifi',
        q: 'What wifi services are available?',
        a: (
          <p>
            Campus Wi-Fi is free for guests by connecting to &ldquo;IllinoisNet_Guest.&rdquo; See{' '}
            <ExternalLink href="https://answers.uillinois.edu/illinois/page.php?id=90280">
              instructions for connecting
            </ExternalLink>
            .
          </p>
        ),
      },
      {
        id: 'lost-items',
        q: 'What do I do if I lose anything during the conference?',
        a: (
          <p>
            As outlined in the Terms and Conditions that all registered participants have affirmed to, all FACT
            attendees are responsible for &ldquo;loss of items or damage to FACT Conference facilities&rdquo; and are
            &ldquo;liable for any costs incurred to repair any inflicted damage.&rdquo;
          </p>
        ),
      },
    ],
  },
  {
    id: 'registration',
    name: 'Registration',
    items: [
      {
        id: 'how-to-register',
        q: 'How do I register?',
        a: (
          <p>
            Use the &ldquo;
            <Link className="inline-link" href="/my-fact/register">
              Register
            </Link>
            &rdquo; tab on our website and fill out your information in the boxes. Continue to the next page and you can
            view the sessions you signed up for and the details for those workshops!
          </p>
        ),
      },
      {
        id: 'fees',
        q: 'How much are registration fees?',
        a: (
          <>
            <div className="faq__prices">
              <div>
                <p className="faq__pricehead">Early Registration</p>
                <dl>
                  <dt>V-Show</dt>
                  <dd>$15</dd>
                  <dt>Workshops</dt>
                  <dd>$20</dd>
                  <dt>Bundle</dt>
                  <dd>$30</dd>
                </dl>
              </div>
              <div>
                <p className="faq__pricehead">Late Registration</p>
                <dl>
                  <dt>V-Show</dt>
                  <dd>$20</dd>
                  <dt>Workshops</dt>
                  <dd>$25</dd>
                  <dt>Bundle</dt>
                  <dd>$35</dd>
                </dl>
              </div>
            </div>
            <p>Early registration ticket prices will end on October 3, 2026.</p>
          </>
        ),
      },
      {
        id: 'workshop-info',
        q: 'Where can I find information about workshops?',
        a: (
          <p>
            Workshop and facilitator biographies are available via our Instagram (<Instagram />) or via the &ldquo;
            <Link className="inline-link" href="/workshops">
              Workshops
            </Link>
            &rdquo; tab on our website. After registering, you can find information about those specific workshops via
            your{' '}
            <Link className="inline-link" href="/my-fact/dashboard">
              Dashboard
            </Link>
            .
          </p>
        ),
      },
      {
        id: 'change-workshop',
        q: 'How can I change my workshop choice that I have made?',
        a: (
          <p>
            If other workshops have not reached capacity, you may log into your{' '}
            <Link className="inline-link" href="/my-fact/dashboard">
              dashboard
            </Link>
            , click on &ldquo;Update Workshops,&rdquo; then click on confirm and you will see that your choice has
            changed.
          </p>
        ),
      },
      {
        id: 'refunds',
        q: 'Are there refunds?',
        a: (
          <p>
            Refunds can be requested via <ExternalLink href="https://forms.gle/VaKhgCyVUFjpuqwKA">this form</ExternalLink>{' '}
            up until the end of the Early Registration dates. Please secure your availability and ensure that you will
            attend the events paid for prior to providing payment during registration.
          </p>
        ),
      },
      {
        id: 'late-registration',
        q: 'I wasn’t able to register early, can I still attend the conference?',
        a: (
          <>
            <p>
              Yes! If you were unable to register early, you can still register for FACT online with the Late
              Registration price until the week prior to the conference.
            </p>
            <p>
              You may additionally register in-person at the conference with the Late Registration price at the Siebel
              Center for Design (
              <ExternalLink href="https://maps.app.goo.gl/wb8dXRCasWsYRhYC7">1208 S 4th St, Champaign, IL 61820</ExternalLink>
              ) from 4:00&ndash;7:00 PM on Friday, November 14th, or at the Asian American Cultural Center from
              8:30&ndash;9:30 AM on Saturday, November 15th. Please note that late registration will be subject to
              availability.
            </p>
          </>
        ),
      },
      {
        id: 'upgrade-bundle',
        q: 'Can I upgrade to the bundle?',
        a: (
          <p>
            After completing your purchases, upgrading to the bundle is not allowed. You may purchase an additional
            session or Variety Show ticket separately.
          </p>
        ),
      },
      {
        id: 'factcommitments',
        q: 'What is the @factcommitments Instagram page? And how can I participate?',
        a: (
          <p>
            This is a new Instagram page that we will use to feature delegates&rsquo; profiles, similar to a college
            commitment page! Through this page, we hope that delegates are able to further connect with others and
            create new friendships. Fill out{' '}
            <ExternalLink href="https://docs.google.com/forms/d/e/1FAIpQLSfzXhbS4lxsimjl0AT9PYaKpkS45iFIWAhdyw7mML3fJuiThw/viewform">
              this form
            </ExternalLink>{' '}
            to participate.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader
        compact
        active="faq"
        pageTitle="Frequently Asked Questions"
        pageSubtitle="Everything you need before FACT."
      />

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
            <div className="faq__toolbar">
              <nav className="faq__jump" aria-label="FAQ categories">
                {CATEGORIES.map((category) => (
                  <a href={`#${category.id}`} key={category.id}>
                    {category.name}
                  </a>
                ))}
              </nav>
              <a className="pill pill--ink faq__doc" href={FAQ_DOC_URL} target="_blank" rel="noopener noreferrer">
                View as Google Doc<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div className="faq__categories">
              {CATEGORIES.map((category) => (
                <section className="faq__category" key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`}>
                  <h2 className="groupheading" id={`${category.id}-heading`}>
                    {category.name}
                  </h2>
                  {category.items.map((item) => (
                    <details className="faq__item" key={item.id} id={item.id}>
                      <summary>{item.q}</summary>
                      <div className="faq__answer">{item.a}</div>
                    </details>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>

        <FaqHashOpener />

        <CrossLinks
          links={[
            { href: '/', label: 'Home' },
            { href: '/workshops', label: 'Workshops' },
            { href: '/variety-show', label: 'Variety Show' },
          ]}
        />

        <SiteFooter />
      </main>
    </>
  );
}
