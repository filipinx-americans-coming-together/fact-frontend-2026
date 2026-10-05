import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CrossLinks } from '@/components/site/CrossLinks';
import { VarietyShowLineup, type Act, type ActLink } from '@/components/site/VarietyShowLineup';
import EventbriteCheckout from '@/components/ui/EventbriteCheckout';

// Same Eventbrite event as the Bundle option on /my-fact/register — the
// venue's seat inventory lives on that one event, and this promo code is
// what restricts checkout to the Variety-Show-only ticket class instead of
// the bundle. Keeping both event IDs in sync is on us until this is fetched
// from the backend instead of hardcoded (see EVENTBRITE_EVENT_IDS.variety_show
// server-side).
export const metadata: Metadata = {
    title: 'Variety Show · FACT 2026',
    description:
        'Saturday, Oct. 17 at Foellinger Auditorium. Doors open 5:30 PM, show 6–9 PM. Get tickets and meet the lineup.',
};

const EVENTBRITE_EVENT_ID = '2001120979719';
const PROMO_CODE = 'VSHOWONLY';
// Plain Eventbrite page with the show-only code applied, for when the embed
// is blocked (ad blockers, strict privacy settings).
const EVENTBRITE_URL = `https://www.eventbrite.com/e/${EVENTBRITE_EVENT_ID}?discount=${PROMO_CODE}`;

const instagram = (handle: string): ActLink => ({
    label: `@${handle}`,
    href: `https://www.instagram.com/${handle}/`,
});

// Swap in the real act once announced; the page reveals it with no layout
// change.
const HEADLINER: Act | null = null;

// Performance order.
const ACTS: Act[] = [
    {
        slug: 'kumantayo',
        photo: '/images/variety-show/kumantayo.jpg',
        name: 'Kumantayo',
        blurb:
            'Founded in 2023 under FASO, Kumantayo is the first and only Filipinx American music performance group at the University of Wisconsin–Madison. Our mission is to celebrate Filipinx culture by bringing members together through a shared love of music. With a mix of brass, strings, woodwinds, and percussion, we’ve put together a medley that combines heartfelt and lively songs, capturing the spirit of OPM (Original Pilipino Music).',
        links: [instagram('kumantayo')],
    },
    {
        slug: 'tropang-pinoy',
        photo: '/images/variety-show/tropang-pinoy.jpg',
        name: 'Tropang Pinoy',
        blurb:
            'Tropang Pinoy promotes and celebrates Filipino culture by blending traditional and modern dances. As part of FSA, we perform Filipino-inspired dances, foster community, and educate audiences through cultural expression. We welcome dancers of all backgrounds to share the beauty of Filipino heritage at SLU and beyond.',
        links: [instagram('slufsa')],
    },
    {
        slug: 'rvn',
        photo: '/images/variety-show/rvn.jpg',
        photoFocus: 'center 30%',
        name: 'RVN',
        blurb:
            'RVN is a self-taught Filipino-American singer, songwriter, multi-instrumentalist, and music producer. With full creative control, he handles every element of his music from songwriting to the final mix. As a live performer, RVN celebrates his heritage by bringing songs by Filipino and Filipino-American artists to life on stage alongside his own original sound.',
        links: [
            instagram('rvnmusicofficial'),
            { label: 'TikTok @imanaverageasian', href: 'https://www.tiktok.com/@imanaverageasian' },
        ],
    },
    {
        slug: 'uc-ritmo',
        photo: '/images/variety-show/uc-ritmo.jpg',
        photoFocus: 'center 45%',
        name: 'UC Ritmo',
        blurb:
            'Kawayan is a cultural dance subgroup under UC PASO’s dance team, Ritmo! It was developed by UC PASO alumni in 1997, kawayan translates to “bamboo” in this context. This hybrid dance form incorporates the striking of thinner bamboo sticks inspired by Arnis, the national self-defense martial art of the Philippines, as well as modern stomp techniques -- all infused with a little cultural flair.',
        links: [instagram('ucpaso.ritmo'), instagram('uc_paso')],
    },
    {
        slug: 'kasatigre',
        photo: '/images/variety-show/kasatigre.jpg',
        name: 'KasaTigre',
        blurb:
            'KasaTigre is the University of Missouri - Columbia’s official Filipino dance team founded in 2024. Our mission is to encourage people to get out of their comfort zones, express themselves in ways they never have before, and build a community out of a shared love for the unique culture of dance. With songs and performances ranging from every style and vibe possible, KasaTigre brings the best of both worlds to the stage. We are sure to bring a performance that keeps our audience at the edge of their seat, and we can’t wait to meet all of you at FACT 2026!',
        links: [instagram('fsamizzou')],
    },
    {
        slug: 'sierra-sikora',
        photo: '/images/variety-show/sierra-sikora.jpg',
        photoFocus: 'center 25%',
        name: 'Sierra Sikora',
        blurb:
            'Sierra Sikora is a 20-year-old artist from Chicago whose style blends pop, folk, and indie influences. Through her music, characterized by raw honesty and heartfelt lyrics, she seeks to provide comfort to her listeners and connect with them on an emotional level. Sierra writes and produces all of her own music. Over the past few years, she has worked fervently and passionately at her musical goals, and her commitment has shown. Her music has garnered 3M+ streams across streaming services with over 500k all-time listeners. She has formed a wholesome and dedicated community of fans, affectionately known as the ‘Sierra Squad’.',
        links: [instagram('sierrasikoramusic')],
    },
    {
        slug: 'psa-lumaya',
        photo: '/images/variety-show/psa-lumaya.jpg',
        name: 'PSA Lumaya',
        blurb:
            'PSA Lumaya is the modern dance sub-group under the Philippine Student Association at UIUC. Their performance will showcase the versatility of Filipino dancers while highlighting the talents of Filipino singers and choreographers.',
        links: [instagram('psa_modern')],
    },
    {
        slug: 'purple-cakes',
        photo: '/images/variety-show/purple-cakes.jpg',
        name: 'Purple Cakes',
        blurb:
            'Purple Cakes is a band made up of members from Pinoy-American Student Organization at the University of Cincinnati. While they enjoy playing different genres of music, they mainly focus on Original Pinoy Music (OPM) and songs by international artists of Filipino descent. They take pride in representing our culture through music and celebrating the talent and creativity of Filipino artists. Through their performances, they hope to share our passion for music, stay connected to our roots, and introduce others to the beauty of OPM. They also want to create a welcoming space where people can appreciate Filipino music, whether they grew up listening to it or are discovering it for the first time.',
        links: [instagram('purplecakes_official')],
    },
    {
        slug: 'psa-harana',
        photo: '/images/variety-show/psa-harana.jpg',
        name: 'PSA Harana',
        blurb:
            'PSA Harana is the musical subgroup under the Philippine Student Association at UIUC composed of talented and passionate musicians, and while “harana” may translate to serenading, the term refers more specifically to the act of serenading as a form of courtship. Harana aims to share Filipinx culture and bring together a community of people who share a love for music!',
        links: [instagram('psa_harana')],
    },
    {
        slug: 'fia-modern',
        photo: '/images/variety-show/fia-modern.jpg',
        name: 'FIA Modern',
        blurb:
            'FIA Modern is the official collegiate dance team under Filipinos In Alliance (FIA) at the University of Illinois at Chicago (UIC). We are a passionate and diverse group of student dancers who share a love for movement, creativity, and community. As a performance-based team, our mission is not only to grow as individual dancers but also to strengthen our team dynamic through collaboration, discipline, and shared experiences. Throughout the academic year, FIA Modern performs at a variety of showcases, cultural events, and competitions across the Midwest. Our performances reflect our commitment to excellence, creativity, and representing both our Filipino heritage and the vibrant UIC community.',
        links: [instagram('fiamodern')],
    },
    {
        slug: 'psa-barkada',
        photo: '/images/variety-show/psa-barkada.jpg',
        name: 'PSA Barkada',
        blurb:
            'The Philippine Student Association at the University of Illinois Urbana-Champaign is a student organization that aims to foster and maintain relationships through celebrating Filipino culture. Within the organization, is the cultural dance group called Barkada, translating to “a group of friends”. Through the art of Filipino traditional dancing, Barkada strives to strengthen our connection to our Filipino roots and to share our culture with our community.',
        links: [instagram('psa_barkada')],
    },
];

export default function VarietyShow() {
    return (
        <>
            <SiteHeader
                compact
                pageTitle="Variety Show"
                pageSubtitle="Welcome to a night of music, dance, and culture!"
                active="variety-show"
            />

            <main id="below">
                {/* Public checkout, no FACT account needed: tickets bought
                    here are never tied to a delegate, so there's nothing to
                    verify server-side. */}
                <section className="section section--vshow-tickets" aria-labelledby="vshow-tickets-heading">
                    <div className="section__inner">
                        <h2 className="section__heading vshow__heading" id="vshow-tickets-heading">
                            Tickets
                        </h2>

                        <div className="vshow__layout">
                            {/* When/where and who-pays-what, kept in view beside the
                                (tall) checkout on wide screens. */}
                            <div className="vshow__info">
                                <p className="vshow__when">
                                    <time dateTime="2026-10-17" className="vshow__date">
                                        <span className="vshow__day" aria-hidden="true">17</span>
                                        <span className="vshow__weekday">
                                            Saturday<span className="sr-only">, October 17</span>
                                            <span aria-hidden="true">, October</span>
                                        </span>
                                    </time>
                                    <span className="vshow__venue">Foellinger Auditorium</span>
                                </p>

                                <dl className="vshow__times">
                                    <div>
                                        <dt>Doors open</dt>
                                        <dd>
                                            <time dateTime="2026-10-17T17:30">5:30 PM</time>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Show</dt>
                                        <dd>
                                            <time dateTime="2026-10-17T18:00">6</time>–<time dateTime="2026-10-17T21:00">9 PM</time>
                                        </dd>
                                    </div>
                                </dl>

                                <dl className="vshow__paths">
                                    <div className="vshow__path">
                                        <dt>UIUC students</dt>
                                        <dd>
                                            Your Variety Show ticket is free. Use the UIUC promo code that was sent
                                            out, with <b className="vshow__code">-VSHOW</b> added to the end.
                                        </dd>
                                    </div>
                                    <div className="vshow__path">
                                        <dt>Coming to FACT?</dt>
                                        <dd>
                                            The Workshops + Variety Show Bundle already includes your Variety Show
                                            ticket.{' '}
                                            <Link className="inline-link" href="/my-fact/create-account">
                                                Register for FACT
                                            </Link>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="vshow__buy">
                                <p className="vshow__buyintro">
                                    <b>These tickets are for the Variety Show only.</b> No FACT account needed.
                                </p>
                                <div className="vshow__checkout">
                                    <EventbriteCheckout
                                        eventId={EVENTBRITE_EVENT_ID}
                                        promoCode={PROMO_CODE}
                                        fallbackUrl={EVENTBRITE_URL}
                                    />
                                </div>
                                <p className="vshow__fallback">
                                    Checkout not showing up?{' '}
                                    <a
                                        className="inline-link"
                                        href={EVENTBRITE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Get tickets on Eventbrite
                                        <span className="sr-only"> (opens in a new tab)</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section section--lineup" aria-labelledby="vshow-lineup-heading">
                    <div className="section__inner">
                        <h2 className="section__heading vshow__heading" id="vshow-lineup-heading">
                            Lineup
                        </h2>
                        <VarietyShowLineup headliner={HEADLINER} acts={ACTS} />
                    </div>
                </section>

                <CrossLinks
                  links={[
                    { href: '/', label: 'Home' },
                    { href: '/workshops', label: 'Workshops' },
                    { href: '/team', label: 'Team' },
                  ]}
                />

                <SiteFooter />
            </main>
        </>
    );
}
