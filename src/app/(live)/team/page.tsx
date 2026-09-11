import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { PhotoPlaceholderIcon } from '@/components/site/PhotoPlaceholderIcon';

export const metadata: Metadata = {
  title: 'Team · FACT 2026',
  description: 'The committee planning and running FACT 2026.',
};

type Member = { name: string; photo?: string; photoPosition?: string; photoZoom?: number; bio?: string };

const GROUPS: { id: string; name: string; gloss?: string; role: string; groupPhoto?: string; members: Member[] }[] = [
  {
    id: 'directors',
    name: 'Directors',
    role: 'Director',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-directors.jpg',
    members: [
      {
        name: 'Carl Lorejo',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/carl-lorejo.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.5,
        bio: "Carl is a senior studying Chemistry with minors in IB and ESE. Throughout FACT, he has loved performing for Barkada in Variety Show, meeting new people, and seeing the lively energy that comes to campus throughout the whole conference. He has served in PSA as a co-Awareness chair ('24-'25), FCN as co-Kamayan director ('25), and FACT Pack as co-Hospitality chair ('26). They have grown passionate in community work and aims to work in environmental research. They love baking, going on walks, and exploring new cafes. The community Carl has found through FACT and PSA is something he will forever hold dear to his heart, and they hope to pay it forward by fostering a welcoming and magical experience for all the delegates at this year's FACT.",
      },
      {
        name: 'Kasandra Medrano',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/kasandra-medrano.jpg',
        photoPosition: 'center 20%',
        photoZoom: 1,
        bio: "Kasandra is a senior studying Molecular and Cellular Biology on the pre-med track! One of her cherished memories during FACT is performing during V-Show with Barkada as a freshman. She has served PSA's core board as Co-Cultural Chair ('24-'25) and FACT Pack as Delegate Manager ('25). Kasandra enjoys volunteering at her local children's clinic and would love to pursue a career in pediatrics. As someone who has found so much love in her community, she hopes that FACT becomes a weekend for delegates to connect more with each other and themselves.",
      },
      {
        name: 'Miranda Espinoza',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/miranda-espinoza.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.45,
        bio: "Miranda is a senior pursuing her degree in Early Childhood Education. She has been an active PSA member since her freshman year as a Barkada performer, FACT Marketing Chair ('24 + '25), FCN Marketing Chair ('25), and now, finally, as one of your FACT Co-Coordinators!\n\nMiranda would like to one day be a teacher at a nature school! Until then, you can find her balancing student teaching with PSA-tivities and the spontaneity that comes with being a senior in college. One of her most cherished memories is running from workshops to fundraisers to Palengke to backstage of Foellinger to THE stage of Foellinger her freshman year. This is all for you, Wind Nymphs! She hopes to foster the same love she's felt these past 4 years to all of you in 2026 and beyond.",
      },
    ],
  },
  {
    id: 'activity-coordinators',
    name: 'Activity Coordinators',
    role: 'Activity Coordinator',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-activity-coordinators.jpg',
    members: [
      {
        name: 'Arianna Reyes',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/arianna-reyes.jpg',
        photoPosition: 'center 100%',
        photoZoom: 1.2,
        bio: "Arianna Mae is a junior majoring in Social Work with a minor in Sociology and is one of this year's Activity Co-Coordinators! Within PSA she has enjoyed all the time she spent dancing with PSA's subgroup Barkada at various events including last year's FACT. In her free time she enjoys spending hours lying on the quad, arts and crafts, building legos, opening blind boxes, and baking banana bread to share with her friends/family. In the future she hopes to become a school Social Worker while also somehow tying in research into her career. She is beyond thrilled for everyone to make so many memories, meet people, and have the most at both Delegate Day and Bye Bye Brunch.",
      },
      {
        name: 'Devin Estacio',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/devin-estacio.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.3,
        bio: "Devin is a sophomore majoring in Architecture and is one of FACT's Activity Co-Chairs for this year! As an activity co-chair, he aims to help bring and coordinate fun activities for delegates to engage in, socialize, and meet new people from other partnering schools. He is currently also one of PSA's Athletic Co-Coordinators and aims to bring connection through sports. In his free time, Devin enjoys playing sports, drawing, weight lifting, and watching shows.",
      },
    ],
  },
  {
    id: 'delegate-managers',
    name: 'Delegate Managers',
    role: 'Delegate Manager',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-delegate-managers.jpg',
    members: [
      {
        name: 'Lauren Capuno',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/lauren-capuno.jpg',
        photoPosition: 'center 55%',
        photoZoom: 1.5,
        bio: "Lauren is a junior majoring in Biochemistry and one of this year's Delegate Managers with Team Rune! She is currently on the pre-med track and hopes to become a dermatologist. In PSA, she is involved with Harana and the AKKA program. Outside of PSA, she loves performing with her band, trying new restaurants, thrifting, and playing Roblox! She's looking forward to connecting with other delegates and watching all the amazing performers at V-Show!",
      },
      {
        name: 'Ryan Romualdo',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/ryan-romualdo.jpg',
        photoPosition: 'center 55%',
        photoZoom: 1.6,
        bio: "Ryan is a junior majoring in Nursing, and is one of this year's Delegate Managers with Team RUNE! He hopes to specialize in Pediatrics and attend grad school to become a Pediatric Nurse Practitioner one day. He has been an active member in PSA since his freshman year, participating in Barkada, Harana, and the AKKA program, as well as serving as one of last year's Cultural Coordinators. Outside of PSA, he enjoys playing basketball, dancing, singing, and eating endless amounts of ramen. He is super excited for everyone to experience FACT and for all the delegates to meet each other!",
      },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    role: 'Hospitality',
    members: [
      {
        name: 'Nathan Mendoza',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/nathan-mendoza.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.4,
        bio: "Nathan is a sophomore majoring in Accountancy and Finance and is this year's FACT Hospitality! He previously served as a PSA Intern and is excited to stay involved with the Filipino community at UIUC. Outside of PSA, Nathan enjoys pickleball, traveling, fishing, watching movies, and finding new places to eat. He's super excited to welcome everyone to FACT this year and help make it an unforgettable experience!",
      },
    ],
  },
  {
    id: 'information-technology',
    name: 'Information Technology',
    role: 'Information Technology',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-information-technology.jpg',
    members: [
      {
        name: 'Lanz Galdo',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/lanz-galdo.jpg',
        photoPosition: 'center 50%',
        photoZoom: 1.1,
        bio: "Lanz is a junior majoring in Computer Engineering, and is one of this year's Information Technology Co-chairs with Team LaMe! He has previously been Media Director for PSA's FCN! Outside of PSA, you can find him either working/procrastinating studying at Grainger Library, or watching a movie/show. He is super excited to see everyone enjoy FACT!",
      },
      {
        name: 'Megan Jacob',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/megan-jacob.jpg',
        photoPosition: 'center 38%',
        photoZoom: 1.4,
        bio: "Megan is a junior majoring in computer science and minoring in informatics, and is one of this year's Information Technology chairs! With passions in product design and UI/UX, she hopes to pursue a career in educational technology in the future. She has held previous positions in PSA as Athletic chair and FCN Marketing chair. Outside of PSA, she is a TA and is interning for Google currently! For fun, Megan likes to weightlift, try new foods, and play sports. She is very excited to meet everyone at FACT this year!",
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    role: 'Marketing',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-marketing.jpg',
    members: [
      {
        name: 'Josh Barlan',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/josh-barlan.jpg',
        photoPosition: 'center 90%',
        photoZoom: 1,
        bio: "Josh is a sophomore double majoring in Marketing and Information Systems and hopes to pursue a minor in International Business, and is one of this year's Marketing co-chairs with Team JOLEEbee! He hopes to create his own marketing and design agency based out of a major city. He currently serves as one of PSA's FCN co-coordinators and was heavily involved in Barkada. You can find Josh behind a camera, designing a graphic, or heading to an interview in his business professional attire. He cannot wait to meet all of the amazing delegates for this year's FACT, and he hopes everyone is enjoying the Instagram feed theme!",
      },
      {
        name: 'Hailey Keating',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/hailey.jpg',
        photoPosition: 'center 90%',
        photoZoom: 1.3,
        bio: "Hailey is a senior majoring in molecular and cellular biology with hopes to pursue a Master's degree in nursing after graduation. Within PSA, she has danced with Barkada at FACT and Battle since her freshman year, and was FACT Marketing Chair in 2024 as well. This year, as a part of team JOLEEbee, Hailey is looking forward to creating more awesome graphics and resources for delegates to use during their experience at FACT! When she's not locked in at the library, you can find her messing with her Notion page, doodling on the quad, or skiing way too fast.",
      },
    ],
  },
  {
    id: 'media',
    name: 'Media',
    role: 'Media',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-media.jpg',
    members: [
      {
        name: 'Jacob Daza',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/jacob-daza.jpg',
        photoPosition: 'center 30%',
        photoZoom: 1,
        bio: "Jacob is a junior majoring in Mechanical Engineering, and is one of this year's Media Co-chairs with Team Star! He values creativity, growth, and community, and intends to pursue a career in alignment with these values. Previously, Jacob has held positions within PSA such as Cultural Co-Coordinator, and FCN Showcase Director. In his free time, he enjoys playing volleyball, playing keys in his band, and sewing big pants. He's super hyped to meet everyone at FACT and to document everything along the way!",
      },
      {
        name: 'Josrich Viernes',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/josrich-viernes.jpg',
        photoPosition: 'center 70%',
        photoZoom: 1.3,
        bio: "Josrich is a senior in Systems Engineering & Design, and is one of the FACT Media co-chairs! In PSA, he was previously one of the Short Film Directors for FCN 2026. Outside of PSA, he works in the Mechanical Engineering department's makerspace and plays board games! Josrich is excited to share more of what goes on behind FACT and share what everyone has been up to!",
      },
    ],
  },
  {
    id: 'palengke',
    name: 'Palengke',
    role: 'Palengke',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-palengke.jpg',
    members: [
      {
        name: 'Ethan Lopez',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/ethan-lopez.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.3,
        bio: "Ethan is a senior majoring in International Relations and Economics with minors in Informatics, East Asian Languages & Cultures, and Psychology, and is one of this year's Palengke Co-Chairs! He serves as PSA's President for the 2026-2027 year, with past experience as VP External and Co-Philanthropy, and with the rest of his time taken up by a whole lot of other campus involvement. He hopes to pursue a career in public policy, taking a long-standing love for community service to prompt a more positive future for those around him. Beyond work, Ethan has old man hobbies, enjoying crosswords, reading the news, collecting banknotes, coins, and stamps, and sleeping early.",
      },
      {
        name: 'Rochelle Sazon',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/rochelle-sazon.jpg',
        photoPosition: 'center 90%',
        photoZoom: 1.25,
        bio: "Rochelle is a junior majoring in Brain and Cognitive Science with a minor in Social Work, and is one of Palengke Co-Chairs with Team Meryenda! Their past position on PSA Core Board as one of the Harana chairs and now as VPE inspired them to be more involved in FACT this year through networking with vendors. Rochelle enjoys shopping at secondhand/vintage places, cafe hopping with friends, reading the Nancy Drew series, and going to concerts! She can't wait to see everyone who comes out to FACT this year!",
      },
    ],
  },
  {
    id: 'team-fact',
    name: 'Team FACT',
    role: 'Team FACT',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-team-fact.jpg',
    members: [
      {
        name: 'Jonathan Directo',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/jonathan-directo.jpg',
        photoPosition: 'center 80%',
        photoZoom: 1.2,
        bio: 'Jonathan is a senior majoring in Community Health with a concentration in Disability & Rehabilitation following the pre-med track. He is one of the Team FACT Managers! Jon has previously held the position of FCN Volunteer director and is one of the current FCN Coordinators! Outside of PSA, Jon volunteers at the Daily Bread Soup Kitchen. He hopes to one day attend med school and eventually become a physician. Jon enjoys watching movies and shows when he is not busy doing homework. He is looking forward to making this FACT the most memorable for everyone!',
      },
      {
        name: 'Megan Sia',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/megan-sia.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.45,
        bio: "Megan is a senior studying Accounting + Data Science with a minor in Media. She is one of the Team FACT managers. Outside of FACT, she's a tour guide, a peer advisor for Gies, and one of the FCN coordinators. Her hobbies include journaling and dancing. In the past, she's been a delegate, EMCee, and volunteer for FACT. She can't wait to see what this year's conference holds!",
      },
    ],
  },
  {
    id: 'treasurer',
    name: 'Treasurer',
    role: 'Treasurer',
    members: [
      {
        name: 'Joshua Jimenez',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/joshua-jimenez.jpg',
        photoPosition: 'center 90%',
        photoZoom: 1.25,
        bio: "Joshua is a junior majoring in systems engineering and design with a minor in computer science, and is this year's treasurer! With an interest in entrepreneurship, robotics, and engineering, he hopes to pursue a career in robotics research while giving back to the community. They have previously held a position as philanthropy chair in PSA. For fun, Joshua likes to lift, listen to music, draw, and play Teamfight Tactics. They are super excited for everyone to enjoy V-Show this year!",
      },
    ],
  },
  {
    id: 'variety-show',
    name: 'Variety Show',
    role: 'Variety Show',
    groupPhoto: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/group-variety-show.jpg',
    members: [
      {
        name: 'Asher Kim',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/asher-kim.jpg',
        photoPosition: 'center 70%',
        photoZoom: 1.5,
        bio: "Asher is a senior majoring in Statistics with a minor in Public Health and a certificate in Data Science, and he is one of this year's Variety Show Coordinators with Team Refresh! After graduation, Asher hopes to pursue a career in data or business intelligence analytics. Within PSA, he has previously served as Treasurer and Cultural Co-Chair. Outside of PSA, Asher is involved in Kappa Pi Beta, an Asian-interest fraternity, where he currently serves as Treasurer. In his free time, he enjoys climbing and drumming. Asher is super excited to help coordinate FACT V-Show and hopes that all attendees have a fun and memorable FACT experience!",
      },
      {
        name: 'Joshua Ryan Fajardo',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/joshua-ryan-fajardo.jpg',
        photoPosition: 'center 60%',
        photoZoom: 1.3,
        bio: "Josh is a senior majoring in Information Sciences + Data Science with a minor in Business, and is one of this year's Variety Show Co-Coordinators as a part of Team Refresh! He's previously served PSA as its Secretary ('25-'26), Formal ('24-'25), and Team FACT Manager ('24), and has performed at Battle of the Bamboo for 7 (going on 8) years! Outside of PSA, Josh is involved in Kappa Pi Beta, an Asian-interest social and service fraternity. He's also a proctor at the CBTF, and doing research for the Center of Health Informatics. In his free time, he enjoys bouldering, listening to music, and watching sports (Cubs/Bears/Bulls fan). Josh is excited for all you cool people to watch all the cool performances at Variety Show!",
      },
      {
        name: 'Fredryll Patingo',
        photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/fredryll-patingo.jpg',
        photoPosition: 'center 50%',
        photoZoom: 1.3,
        bio: "Freddy is a sophomore majoring in Electrical Engineering with a minor in Bioengineering, and he is one of this year's FACT Variety Show Coordinators with Team Refresh! In the future, he hopes to pursue a career focused on the hardware components of biomedical engineering. Outside of academics, his main passion and hobby is making music as an arranger, instrumentalist, and singer with his friends. Overall, he is really excited for FACT, especially V-Show, and hopes everyone has an amazing and memorable weekend!",
      },
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      <SiteHeader compact pageTitle="Team" pageSubtitle="Meet the team planning and running FACT 2026!" active="team" />

      <main id="below">
        <section className="section section--team">
          <svg className="motif motif--tr motif--orbit" viewBox="0 0 160 160" aria-hidden="true">
            <circle cx="80" cy="80" r="58" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="80" cy="80" r="2.2" fill="currentColor" />
            <path d="M80 14l2.4 6.4L89 23l-6.6 2.6L80 32l-2.4-6.4L71 23l6.6-2.6Z" fill="currentColor" />
            <path d="M136 62l1.8 4.6 4.6 1.8-4.6 1.8-1.8 4.6-1.8-4.6-4.6-1.8 4.6-1.8Z" fill="currentColor" />
            <path d="M32 108l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="currentColor" />
            <circle cx="80" cy="80" r="80" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          </svg>
          <div className="section__inner">
            <p className="team__hint">Click on each member to learn more about them!</p>

            <nav className="team__jumpnav" aria-label="Jump to committee">
              {GROUPS.map((group) => (
                <a className="team__jumplink" href={`#${group.id}`} key={group.id}>
                  {group.name}
                </a>
              ))}
            </nav>

            <div className="photoframe team__groupphoto">
              <Image src="https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/fact-pack-2026.jpg" alt="The FACT 2026 Pack" width={1600} height={1067} />
            </div>

            <div className="team__groups">
              {GROUPS.map((group) => (
                <div id={group.id} key={group.id}>
                  <h2 className="groupheading">
                    {group.name}
                    {group.gloss ? <span className="groupheading__gloss">{group.gloss}</span> : null}
                  </h2>
                  {group.groupPhoto ? (
                    <div className="team__subgroupphoto">
                      <Image src={group.groupPhoto} alt={`${group.name} group photo`} width={1080} height={1620} />
                    </div>
                  ) : null}
                  <ul className="team__grid">
                    {group.members.map((member) => (
                      <li key={member.name}>
                        <button
                          className="team__member team__memberbtn"
                          type="button"
                          data-team-open
                          data-team-name={member.name}
                          data-team-role={group.role}
                          data-team-photo={member.photo ?? ''}
                          data-team-photo-position={member.photoPosition ?? ''}
                          data-team-photo-zoom={member.photoZoom ?? ''}
                          data-team-bio={member.bio ?? ''}
                        >
                          <span className="team__photo" aria-hidden="true">
                            {member.photo ? (
                              <Image
                                src={member.photo}
                                alt=""
                                width={480}
                                height={600}
                                style={{
                                  objectPosition: member.photoPosition,
                                  transformOrigin: member.photoPosition,
                                  transform: member.photoZoom ? `scale(${member.photoZoom})` : undefined,
                                }}
                              />
                            ) : (
                              <PhotoPlaceholderIcon />
                            )}
                          </span>
                          <p className="team__name">{member.name}</p>
                          <p className="team__role">{group.role}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="photoframe team__groupphoto">
              <Image src="https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/team/fact-pack-2026-2.jpg" alt="The FACT 2026 Pack" width={1600} height={1067} />
            </div>

            <a className="team__backtotop" href="#top">
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
              <span>Back to top</span>
            </a>
          </div>
        </section>

        <nav className="crosslink" aria-label="More to explore">
          <div className="crosslink__inner">
            <p className="crosslink__label">Continue exploring</p>
            <div className="crosslink__links">
              <Link className="crosslink__link" href="/about">
                <span>About Us</span>
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

        <div className="team-modal" id="team-modal" hidden>
          <div className="team-modal__scrim" data-team-close />
          <div className="team-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="team-modal-name">
            <button className="team-modal__close" type="button" aria-label="Close" data-team-close>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <span className="team-modal__photo" id="team-modal-photo" aria-hidden="true">
              <PhotoPlaceholderIcon />
            </span>
            <div className="team-modal__content">
              <h2 className="team-modal__name" id="team-modal-name"></h2>
              <p className="team-modal__role"></p>
              <p className="team-modal__bio"></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
