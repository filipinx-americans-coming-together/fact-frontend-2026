'use client';

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PhotoPlaceholderIcon } from '@/components/site/PhotoPlaceholderIcon';
import { InstagramIcon } from '@/components/site/SocialIcon';

export type ActLink = { label: string; href: string };

export type Act = {
    slug: string;
    name: string;
    /** Each act's blurb exactly as they submitted it. Only the headliner may
        go without one (it shows name, photo, and links until it arrives). */
    blurb?: string;
    links: ActLink[];
    /** Path under /public. Leave unset to show the placeholder frame. */
    photo?: string;
    /** CSS object-position for the crop, when the default centre cuts faces. */
    photoFocus?: string;
};

// useLayoutEffect warns during the server render; measuring only matters in
// the browser.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Act frames are 260px in the grid and half the screen on phones; the
// headliner frame tops out at 420px beside its text and ~70vw when stacked.
// These widths cover every state without shipping the 1000px file.
const ACT_SIZES = '(max-width: 560px) 50vw, 260px';
const HEADLINER_SIZES = '(max-width: 899px) 70vw, 420px';

/** Act photos are decorative (the name sits right below); the headliner's
    portrait passes `alt` since it is the star of the block. */
function ActPhoto({ act, sizes, alt = '' }: { act: Act; sizes: string; alt?: string }) {
    return (
        <div className="act__photo">
            {act.photo ? (
                <Image
                    src={act.photo}
                    alt={alt}
                    fill
                    sizes={sizes}
                    style={act.photoFocus ? { objectPosition: act.photoFocus } : undefined}
                />
            ) : (
                <PhotoPlaceholderIcon />
            )}
        </div>
    );
}

const toggleId = (slug: string) => `act-${slug}-toggle`;
const panelId = (slug: string) => `act-${slug}-about`;

function ActLinks({ links }: { links: ActLink[] }) {
    return (
        <ul className="act__links">
            {links.map((link) => (
                <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.href.includes('instagram.com') && <InstagramIcon />}
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

function ActEntry({ act, open, onToggle }: { act: Act; open: boolean; onToggle: () => void }) {
    return (
        <li className={`act${open ? ' is-selected' : ''}`}>
            <ActPhoto act={act} sizes={ACT_SIZES} />
            <div className="act__text">
                <h4 className="act__name">{act.name}</h4>
                <button
                    type="button"
                    id={toggleId(act.slug)}
                    className="act__toggle"
                    aria-expanded={open}
                    aria-controls={open ? panelId(act.slug) : undefined}
                    onClick={onToggle}
                >
                    {open ? 'Less' : 'More'}
                    <span className="sr-only"> about {act.name}</span>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </li>
    );
}

/**
 * Details for the open act, laid out as a full-width row directly under the
 * row its card sits in, so the grid the visitor clicked into never reflows.
 * The notch points up at the card that opened it.
 */
function ActPanel({ act, notchX, onClose }: { act: Act; notchX: number | null; onClose: () => void }) {
    const close = () => {
        onClose();
        // After React removes the panel; setTimeout also runs in background tabs.
        setTimeout(() => document.getElementById(toggleId(act.slug))?.focus(), 0);
    };

    // The region sits inside the <li> rather than on it: role="region" on the
    // <li> itself would replace its listitem role and break the list.
    return (
        <li
            className="act-panel"
            style={notchX === null ? undefined : ({ '--notch-x': `${notchX}px` } as React.CSSProperties)}
        >
            <div
                id={panelId(act.slug)}
                role="region"
                aria-label={`About ${act.name}`}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') close();
                }}
            >
                <div className="act-panel__inner">
                    <div className="act-panel__head">
                        <p className="act-panel__name">{act.name}</p>
                        <ActLinks links={act.links} />
                    </div>
                    <p className="act-panel__blurb">{act.blurb}</p>
                </div>
                <button type="button" className="act-panel__close" onClick={close}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span className="sr-only">Close details for {act.name}</span>
                </button>
            </div>
        </li>
    );
}

function ActList({ acts, openSlug, onToggle }: {
    acts: Act[];
    openSlug: string | null;
    onToggle: (slug: string) => void;
}) {
    const listRef = useRef<HTMLUListElement>(null);
    const openIndex = acts.findIndex((act) => act.slug === openSlug);
    const [placement, setPlacement] = useState<{ after: number; notchX: number } | null>(null);

    // Cards wrap freely, so how many share a row depends on the viewport.
    // Work it out from widths rather than positions: once the panel is in the
    // list it forces a line break, so positions would just echo its placement.
    const measure = useCallback(() => {
        const list = listRef.current;
        if (!list || openIndex < 0) {
            setPlacement(null);
            return;
        }
        const cards = Array.from(list.querySelectorAll<HTMLElement>(':scope > .act'));
        const card = cards[openIndex];
        if (!card) return;
        const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
        const perRow = Math.max(1, Math.floor((list.clientWidth + gap + 1) / (card.offsetWidth + gap)));
        const after = Math.min((Math.floor(openIndex / perRow) + 1) * perRow, cards.length) - 1;
        const notchX = Math.round(card.offsetLeft + card.offsetWidth / 2);
        setPlacement((prev) => (prev && prev.after === after && prev.notchX === notchX ? prev : { after, notchX }));
    }, [openIndex]);

    // Runs again once the panel moves to its row end: centred rows shift when
    // the panel stops splitting them, so the notch is measured on the final
    // layout. setPlacement bails out when nothing changed, so this settles.
    useIsoLayoutEffect(measure, [measure, placement?.after]);

    useEffect(() => {
        const list = listRef.current;
        if (!list || openIndex < 0 || typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(() => measure());
        observer.observe(list);
        return () => observer.disconnect();
    }, [measure, openIndex]);

    // Bring the panel into view if it opened below the fold.
    useEffect(() => {
        if (openIndex < 0) return;
        const panel = listRef.current?.querySelector<HTMLElement>(':scope > .act-panel');
        if (!panel || typeof panel.scrollIntoView !== 'function') return;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        panel.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }, [openIndex]);

    const openAct = openIndex >= 0 ? acts[openIndex] : null;
    const insertAfter = placement?.after ?? openIndex;

    return (
        <ul className="lineup__acts" ref={listRef}>
            {acts.map((act, i) => (
                <Fragment key={act.slug}>
                    <ActEntry act={act} open={i === openIndex} onToggle={() => onToggle(act.slug)} />
                    {openAct && i === insertAfter && (
                        <ActPanel
                            act={openAct}
                            notchX={placement?.notchX ?? null}
                            onClose={() => onToggle(openAct.slug)}
                        />
                    )}
                </Fragment>
            ))}
        </ul>
    );
}

const SPARKLE_PATH = 'M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1Z';

/**
 * Reveal, played once when the headliner scrolls into view: the name rises
 * in and sparkles light up around it. The markup renders fully visible; JS
 * only arms the hidden start state when the block is still below the fold,
 * so no-JS, already-in-view, and reduced-motion visitors simply see it.
 * Sparkles only twinkle while the block is on screen (is-onstage).
 */
export function useHeadlinerReveal(ref: React.RefObject<HTMLDivElement>) {
    useIsoLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reveal = () => el.classList.add('is-revealed');
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (typeof IntersectionObserver === 'undefined' || reduce) {
            reveal();
            return;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            reveal();
        } else {
            el.classList.add('is-armed');
        }
        // Fires once the block's top clears the bottom fifth of the screen.
        // An edge trigger rather than a visible-ratio one, so a tall block
        // (long blurb, landscape phone) still reveals.
        const observer = new IntersectionObserver(
            ([entry]) => {
                el.classList.toggle('is-onstage', entry.isIntersecting);
                if (entry.isIntersecting) reveal();
            },
            { rootMargin: '0px 0px -20% 0px' },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref]);
}

function RevealedHeadliner({ act }: { act: Act }) {
    const ref = useRef<HTMLDivElement>(null);
    useHeadlinerReveal(ref);

    // The star act: everything shows at once, no More toggle.
    return (
        <div className={`headliner headliner--revealed${act.blurb ? ' headliner--with-blurb' : ''}`} ref={ref}>
            <div className="headliner__frame">
                <ActPhoto act={act} sizes={HEADLINER_SIZES} alt={act.name} />
            </div>
            <div className="headliner__text">
                <div className="headliner__stage">
                    <h3 className="headliner__teaser">
                        <span className="headliner__label">Headliner</span> <strong>{act.name}</strong>
                    </h3>
                    <div className="headliner__sparkles" aria-hidden="true">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <svg className="headliner__sparkle" viewBox="0 0 24 24" fill="currentColor" key={i}>
                                <path d={SPARKLE_PATH} />
                            </svg>
                        ))}
                    </div>
                </div>
                {act.blurb && <p className="headliner__blurb">{act.blurb}</p>}
                <ActLinks links={act.links} />
            </div>
        </div>
    );
}

function Headliner({ act }: { act: Act | null }) {
    if (act) return <RevealedHeadliner act={act} />;

    return (
        <div className="headliner">
            <p className="headliner__teaser">
                <span className="headliner__label">Headliner</span> <em>to be revealed</em>
            </p>
        </div>
    );
}

/** Headliner + acts in performance order. Only one act's details are open at a time. */
export function VarietyShowLineup({ headliner, acts }: { headliner: Act | null; acts: Act[] }) {
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const toggle = (slug: string) => setOpenSlug((current) => (current === slug ? null : slug));

    return (
        <>
            <Headliner act={headliner} />
            <ActList acts={acts} openSlug={openSlug} onToggle={toggle} />
        </>
    );
}
