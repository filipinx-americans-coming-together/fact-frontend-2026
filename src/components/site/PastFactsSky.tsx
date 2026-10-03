'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { easeInOutCubic, easeInOutSine, flyComet, type Pt } from './skyComet';

export type PastFact = {
  year: string;
  theme: string;
  gloss: string;
  booklet: string | null;
};

type Point = { x: number; y: number };

const NARROW_QUERY = '(max-width: 720px)';

// Past years climb left-to-right toward this year's star in the top-right
// corner. Coordinates are percentages of the chart box, so adding a year
// just respaces the constellation instead of needing a new layout.
function plot(count: number): { past: Point[]; now: Point } {
  const past = Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const wobble = i % 2 === 0 ? 4 : -4;
    return { x: 8 + t * 62, y: 60 - t * 34 + wobble };
  });
  return { past, now: { x: 90, y: 16 } };
}

function StarGlyph({ className = 'sky__glyph' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 1.5 C17 11 21 15 30.5 16 C21 17 17 21 16 30.5 C15 21 11 17 1.5 16 C11 15 15 11 16 1.5 Z" />
    </svg>
  );
}

function BookletLink({ fact, quiet = false }: { fact: PastFact; quiet?: boolean }) {
  if (!fact.booklet) return <p className="sky__pending">Booklet not yet archived</p>;
  return (
    <a
      className={quiet ? 'sky__bookletText' : 'pill pill--solid sky__booklet'}
      href={fact.booklet}
      target="_blank"
      rel="noopener noreferrer"
    >
      Open the {fact.year} booklet<span className="sr-only"> (opens in a new tab)</span>
      {quiet && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 17 17 7M9 7h8v8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}

export function PastFactsSky({
  facts,
  current,
}: {
  facts: PastFact[];
  current: { year: string; theme: string };
}) {
  const ordered = [...facts].sort((a, b) => Number(a.year) - Number(b.year));
  const [selected, setSelected] = useState(ordered.length - 1);
  const [narrow, setNarrow] = useState(false);
  const [armed, setArmed] = useState(false);
  const [drawn, setDrawn] = useState(false);
  // Which star is lit. It trails `selected` while a comet is in flight, so
  // the star ignites when the comet lands rather than when it's clicked.
  const [lit, setLit] = useState<number | null>(ordered.length - 1);
  const chartRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const starEls = useRef<(HTMLElement | null)[]>([]);
  const cancelFlight = useRef<(() => void) | null>(null);
  const { past, now } = plot(ordered.length);
  const stops = [...past, now];
  const showThemes = ordered.length <= 6;
  const fact = ordered[selected];
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const cometAllowed = () =>
    !!canvasRef.current &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia(NARROW_QUERY).matches;

  // Chart percentages to canvas pixels for stops[from..to], in travel order.
  function route(from: number, to: number): Pt[] {
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    const span = from <= to ? stops.slice(from, to + 1) : stops.slice(to, from + 1).reverse();
    return span.map((p) => ({ x: (p.x / 100) * width, y: (p.y / 100) * height }));
  }

  // Replay the star's ignite keyframes without a re-render.
  function pulse(index: number) {
    const el = starEls.current[index];
    if (!el) return;
    el.classList.remove('is-pulse');
    void el.offsetWidth;
    el.classList.add('is-pulse');
  }

  function releaseLines() {
    const lines = linesRef.current;
    if (!lines) return;
    lines.style.clipPath = '';
    lines.style.transition = '';
  }

  useEffect(() => () => cancelFlight.current?.(), []);

  // The background sky sits at three depths and drifts against the cursor,
  // so the chart reads as the nearest layer of a deep field. Fine pointers
  // only; written straight to CSS variables, never through React state.
  useEffect(() => {
    const section = chartRef.current?.closest<HTMLElement>('.section--sky');
    if (!section) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        section.style.setProperty('--px', px.toFixed(3));
        section.style.setProperty('--py', py.toFixed(3));
      });
    };
    const onLeave = () => {
      section.style.setProperty('--px', '0');
      section.style.setProperty('--py', '0');
    };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Desktop is a tabbed star chart with one detail panel; phones get a plain
  // vertical list with every year's details inline, so nothing pretends to
  // be a control there.
  useEffect(() => {
    const media = window.matchMedia(NARROW_QUERY);
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  // The line is fully drawn by default (no JS, reduced motion). Only when
  // motion is allowed do we hide it and draw it in once the chart is seen.
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setDrawn(true);
        if (!cometAllowed()) return;

        // Desktop: a comet is the pen. It flies 2023 to 2026, the line is
        // revealed right behind its head, and each star ignites as it passes.
        const lines = linesRef.current;
        const { width } = canvasRef.current!.getBoundingClientRect();
        if (lines) {
          lines.style.transition = 'none';
          lines.style.clipPath = 'inset(-20% 100% -20% 0)';
        }
        setLit(null);
        cancelFlight.current = flyComet(canvasRef.current!, route(0, stops.length - 1), {
          duration: 2800,
          ease: easeInOutSine,
          onProgress: (head) => {
            if (lines) lines.style.clipPath = `inset(-20% ${100 - (head.x / width) * 100}% -20% 0)`;
          },
          onVertex: (i) => {
            pulse(i);
            if (i === selectedRef.current) setLit(i);
          },
          onArrive: () => {
            releaseLines();
            setLit(selectedRef.current);
          },
        });
      },
      { rootMargin: '0px 0px -25% 0px' },
    );
    observer.observe(chart);
    return () => observer.disconnect();
  }, []);

  function choose(index: number) {
    const from = selected;
    setSelected(index);

    if (index !== from && cometAllowed()) {
      cancelFlight.current?.();
      releaseLines();
      setLit(null);
      cancelFlight.current = flyComet(canvasRef.current!, route(from, index), {
        duration: Math.min(1500, 560 + 320 * Math.abs(index - from)),
        ease: easeInOutCubic,
        onArrive: () => {
          setLit(index);
          pulse(index);
        },
      });
    } else {
      setLit(index);
    }

    // Keep the result in sight: on short laptop screens the panel can sit
    // just under the fold, so bring it up rather than change it unseen.
    const panel = panelRef.current;
    if (!panel) return;
    const { bottom } = panel.getBoundingClientRect();
    if (bottom > window.innerHeight) {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      panel.scrollIntoView({ block: 'end', behavior: smooth ? 'smooth' : 'auto' });
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = ordered.length - 1;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (index + 1) % ordered.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index - 1 + ordered.length) % ordered.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  }

  const line = past.map((p) => `${p.x},${p.y}`).join(' ');
  const tail = past[past.length - 1];

  return (
    <div className="sky">
      <div
        ref={chartRef}
        className={`sky__chart${armed ? ' is-armed' : ''}${drawn ? ' is-drawn' : ''}`}
      >
        <svg ref={linesRef} className="sky__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="sky__line" points={line} vectorEffect="non-scaling-stroke" />
          {tail && (
            <line
              className="sky__line sky__line--ahead"
              x1={tail.x}
              y1={tail.y}
              x2={now.x}
              y2={now.y}
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {!narrow && <canvas ref={canvasRef} className="sky__comet" aria-hidden="true" />}

        {!narrow && (
          <p className="sky__cue" aria-hidden="true">
            Choose a year
            <svg viewBox="0 0 24 24">
              <path
                d="M6 6c2 7 6 10 12 12m0 0-5 .5M18 18l-1.5-4.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        )}

        <ol
          className="sky__stars"
          role={narrow ? undefined : 'tablist'}
          aria-label={narrow ? undefined : 'Past FACTs by year'}
        >
          {ordered.map((f, i) => {
            const isSelected = i === selected;
            const label = (
              <>
                <StarGlyph />
                <span className="sky__year">{f.year}</span>
                <span className="sr-only">, </span>
                <span className={`sky__theme${showThemes || narrow ? '' : ' sr-only'}`}>{f.theme}</span>
              </>
            );
            return (
              <li
                key={f.year}
                ref={(el) => {
                  starEls.current[i] = el;
                }}
                className={`sky__star${isSelected && !narrow ? ' is-selected' : ''}${lit === i && !narrow ? ' is-lit' : ''}`}
                role={narrow ? undefined : 'presentation'}
                style={{ '--x': `${past[i].x}%`, '--y': `${past[i].y}%` } as CSSProperties}
              >
                {narrow ? (
                  <>
                    <h3 className="sky__point">{label}</h3>
                    <div className="sky__inline">
                      <p className="sky__gloss">{f.gloss}</p>
                      <BookletLink fact={f} quiet />
                    </div>
                  </>
                ) : (
                  <button
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`sky-tab-${f.year}`}
                    type="button"
                    role="tab"
                    className="sky__point"
                    aria-selected={isSelected}
                    aria-controls="sky-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => choose(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    {label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>

        <div
          ref={(el) => {
            starEls.current[stops.length - 1] = el;
          }}
          className="sky__star sky__star--now"
          style={{ '--x': `${now.x}%`, '--y': `${now.y}%` } as CSSProperties}
        >
          <Link
            className="sky__point"
            href="/my-fact/register"
            aria-label={`${current.year}, ${current.theme}. You are here: this year's FACT. Register for FACT ${current.year}`}
          >
            <StarGlyph />
            <span className="sky__year">{current.year}</span>
            <span className="sky__theme">{current.theme}</span>
            <span className="sky__here">You are here</span>
          </Link>
        </div>
      </div>

      {!narrow && (
        <div
          ref={panelRef}
          id="sky-panel"
          className="sky__panel"
          role="tabpanel"
          aria-labelledby={`sky-tab-${fact.year}`}
        >
          <div className="sky__panelHead" key={fact.year}>
            <p className="sky__panelYear">
              <StarGlyph className="sky__panelGlyph" />
              {fact.year}
            </p>
            <h3 className="sky__panelTheme">{fact.theme}</h3>
          </div>
          <div className="sky__panelBody" key={`${fact.year}-body`}>
            <p className="sky__gloss">{fact.gloss}</p>
            <BookletLink fact={fact} />
          </div>
        </div>
      )}
    </div>
  );
}
