'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useHeadlinerReveal } from '@/components/site/VarietyShowLineup';

export type Keynote = {
  name: string;
  /** Path under /public. */
  photo: string;
  /** CSS object-position for the 4/5 crop of a landscape photo. */
  photoFocus?: string;
  /** One string per paragraph, exactly as the speaker supplied it. */
  bio: string[];
  website: { label: string; href: string };
  /** Leave unset until the slot is confirmed; the session line hides without it. */
  session?: string;
};

// The frame is 420px beside the text and ~70vw when stacked.
const PORTRAIT_SIZES = '(max-width: 899px) 70vw, 420px';

export function KeynoteSpotlight({ keynote }: { keynote: Keynote }) {
  const ref = useRef<HTMLDivElement>(null);
  useHeadlinerReveal(ref);

  return (
    <section className="section section--keynote" aria-labelledby="keynote-heading">
      <div className="section__inner">
        <h2 className="section__heading" id="keynote-heading">
          Keynote Speaker
        </h2>
        <div className="section__rule" aria-hidden="true" />

        <div className="keynote" ref={ref}>
          <figure className="keynote__portrait">
            <Image
              src={keynote.photo}
              alt={keynote.name}
              fill
              sizes={PORTRAIT_SIZES}
              style={keynote.photoFocus ? { objectPosition: keynote.photoFocus } : undefined}
            />
          </figure>

          <div className="keynote__text">
            <h3 className="keynote__name">{keynote.name}</h3>
            {keynote.session && <p className="keynote__session">{keynote.session}</p>}

            <div className="keynote__bio">
              {keynote.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="keynote__actions">
              <a className="inline-link" href={keynote.website.href} target="_blank" rel="noopener noreferrer">
                {keynote.website.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
