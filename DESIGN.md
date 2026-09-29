---
name: FACT 2026 — Mahiwagahan
description: Purple floral macro-photography "night band" hero/nav paired with a warm parchment "day band" content system for the FACT 2026 conference site.
colors:
  ink-900: "#0e155e"
  violet-800: "#4b1c71"
  orchid-400: "#b37ad4"
  cream-100: "#ffffdd"
  white: "#ffffff"
  pill-solid-mid: "#f2edfe"
  pill-solid-shade: "#ddd2f7"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.01em"
    fontVariation: "'SOFT' 40, 'WONK' 1"
  theme-display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 6rem)"
    fontWeight: 900
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 1
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)"
    fontWeight: 800
    letterSpacing: "-0.01em"
  category-label:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.9vw, 1.5rem)"
    fontWeight: 700
    letterSpacing: "-0.005em"
  quote:
    fontFamily: "Fraunces, Georgia, serif"
    fontStyle: "italic"
    fontSize: "clamp(1.25rem, 1.9vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.5
  lead:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "0.98rem–1.02rem"
    fontWeight: 400
    lineHeight: "1.7–1.75"
  structural-label:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "0.78rem–1.05rem"
    fontWeight: "500–600"
    letterSpacing: "0.01em–0.06em"
  nav-link:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
  meta:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  question:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 500
  label:
    fontFamily: "Jost, Trebuchet MS, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  circle: "50%"
  control: "10px"
  focus: "2px"
components:
  pill-solid:
    backgroundColor: "linear-gradient(180deg, #ffffff 0%, {colors.pill-solid-mid} 50%, {colors.pill-solid-shade} 100%)"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.35rem"
  pill-ghost:
    backgroundColor: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.35rem"
  pill-ink:
    backgroundColor: "linear-gradient(180deg, {colors.violet-800} 0%, {colors.ink-900} 100%)"
    textColor: "{colors.cream-100}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.35rem"
  nav-badge-frame:
    rounded: "{rounded.circle}"
    width: "52px"
    height: "52px"
  footer-mark:
    rounded: "{rounded.circle}"
    width: "40px"
    height: "40px"
  vendor-card:
    backgroundColor: "{colors.white}"
    padding: "clamp(1.5rem, 3vw, 1.85rem)"
---

# Design System: FACT 2026 — Mahiwagahan

> **Status note (2026-09-28):** the pass-by-pass history below describes launch-gated nav links and locked Login/Donate pills. That's no longer the live state. `src/components/site/SiteHeader.tsx` now links About, Workshops, Team, Past FACTs, and Variety Show in the primary nav, and the Login (`/my-fact/login`) and Donate (`/donate`) pills are live links rather than `aria-disabled`. Agenda, Palengke, and FAQ still have routes but aren't in the nav. Variety Show and Donate pages were added after the passes documented here. The `aria-disabled` + live-announcer pattern described below is still the one to use for any future gated control.

## Overview

**Creative North Star: "The Almanac Held to Candlelight"**

The site is seven pages deep — Home, About, Agenda, Workshops, Team, Past FACTs, and Palengke, plus FAQ — and all seven run the same night→day→night rhythm: a **night band** (full-bleed violet floral macro photography, reversed-white type, the asset-baked wordmark) opens every page, full-viewport on the landing hero and collapsed to `.hero--compact` on the six interior pages; a **day band** carries all reading content on a warm parchment ground (`--cream-100`, `#ffffdd`) with Fraunces headings, hand-drawn line-art motifs, and the paper-grain texture; a dark `ink-900` footer closes every page as the third bookend.

This pass rebuilt the landing page's body content end-to-end, ahead of first deployment. As of this writing, Home, About, and Team are live in the nav; Agenda, Workshops, Past FACTs, Palengke, and FAQ all have real routes and render (some still carry explicit in-page "coming soon" placeholders for content, e.g. Agenda's schedule) but aren't yet linked from the primary nav — see Components → Navigation for the exact gating mechanism. The prior landing build ran hero → an equal-weight three-item quick-facts row → a six-tile table-of-contents grid (one live About tile, five disabled placeholders) → an "Explore FACT 2026" section → a footer CTA. That whole mid-page stack is retired. The rebuilt landing page runs: hero → **Theme moment** (`.section--theme`, new — the Mahiwagahan wordmark and its "Enchanting Our Bright Minds" definition, centered and enlarged to its own dedicated beat with an interactive sparkle/tilt effect) → **Venue** (`.section--venue`, new — a two-column block pairing the Oct. 16–18/UIUC facts and the FACT description with a photo-placeholder device and the site's one live outbound link, "About FACT 2026") → **Quick facts** (`.section--quickfacts`, rebuilt as a full-bleed dark `ink-900` stat band instead of a parchment three-column row) → a single quiet `.landing__soon` line ("More information coming soon," replacing the old TOC grid entirely — About's link now lives in the Venue button instead of being duplicated in a TOC tile) → **Newsletter CTA** (`.section--cta`, new — a centered, hairline-bordered section with a glowing seal icon, "Ready for FACT 2026?", and a live `mailto:` "Join the Newsletter" button) → footer. Every launch-gated nav link (and formerly, TOC tiles) uses `aria-disabled="true"` with a `title="Coming soon"` tooltip and a `.sr-only` reason span; `src/lib/liveSiteInteractions.ts` (the shared interaction logic, ported near-verbatim from an earlier static-site prototype's `main.js` — see implementation note below) now also raises a live screen-reader announcement (`"<label> — <reason>"` via a lazily-created `aria-live="polite"` region) on every disabled-control activation, so the reason is no longer sighted-only.

**Implementation note.** This document's component descriptions below use the vocabulary of the site's original static HTML/CSS/JS prototype (`main.js`, `index.html`, `about.html`, etc.) because that's where this design system was first built out; it was then ported into the current stack, `fact-frontend-2026`, a Next.js 14 App Router project. The mapping: each `*.html` page is now a route under `src/app/(live)/` (e.g. `about.html` → `src/app/(live)/about/page.tsx`; the landing page is `src/app/(live)/page.tsx`), `main.js`'s logic now lives in `src/lib/liveSiteInteractions.ts` plus per-component client logic, and `css/styles.css` is now split across `src/styles/live-base.css` and `src/styles/live-sections.css`. The CSS class names, design tokens, and component behavior described throughout are unchanged by the port and still accurate against the current code — only the file-level references below are updated to match.

The prior pass added Palengke as the seventh page and first rebuilt the primary nav into a single trigger-plus-drawer pattern at every breakpoint, introducing `.vendor__card` as the system's one confirmed, user-chosen exception to the No-Card Rule; `.vendor__card` and the Workshops/Team/Past FACTs pages are unchanged since. A later pass reworked the nav a second time: with only About Us actually live at the time, the trigger-plus-drawer-everywhere pattern read as a heavy 7-item shell hiding one real destination. The nav was narrowed to show only what's live, sitting inline in the topbar on desktop with no trigger at all, collapsing to the same (now much smaller) drawer only below 900px. Team has since launched into the nav alongside About Us (see `src/components/site/SiteHeader.tsx`); the mechanism is unchanged, and any future page launch adds one more `<Link>` the same way. See Layout and Components → Navigation.

This pass replaced the landing page's locked "Premiering soon" trailer placeholder with a live one: `.trailer__frame` now shows the real YouTube thumbnail as its poster (`.trailer__poster`, an `<img>` with a JPG-fallback `error` listener) under a scrim gradient reused from the hero's own device, and clicking it opens `#trailer-modal` — a lightbox that injects a `youtube-nocookie.com` iframe, autoplays muted, traps focus by marking `<header>` and `<main>` `inert` for the duration, restores focus to the trigger and clears `inert` on close (Escape, backdrop click, or the close button), and locks background scroll via `html.has-trailer-open`. A same-pass critique found the trailer sitting *inside* `.section--cta` diluted that section's documented single-purpose intent (video-watching and newsletter-joining as one conversion ask); the trailer now gets its own hairline-bounded beat, `.section--trailer`, immediately above `.section--cta`, so the newsletter closes the page alone as originally designed. See Components → Trailer and Trailer Lightbox.

Smaller fixes folded into this pass: the footer's "Navigate" column heading was dropped since it only ever holds one link (About Us) — it now sits headerless like the Brand column, growing its heading back once a second page launches; the quick-facts band's "Days of Fun" label was renamed to "Days of Programming" on both the landing page and About, matching the register of its sibling stats; About's photo carousel gained keyboard Left/Right-arrow navigation, a visible "X / 7" slide counter, and a live-region announcement of slide changes for screen-reader users (previously the counter was `aria-hidden`); and About's dead "Continue exploring" crosslink strip (pointing to the Team and Agenda routes, unreachable at the time since those pages weren't launched yet) was removed outright rather than left dangling. Both those pages have since launched, and About's crosslink (and equivalent strips on most other live pages) now link to real, working destinations again.

**Key Characteristics:**
- Landing page now runs Hero → Theme moment → Venue → Quick facts (dark band) → "More information coming soon" → Newsletter CTA → Footer; the old equal-weight quick-facts row and the six-tile TOC grid are both retired.
- The Theme moment (`Mahiwagahan` at `clamp(2.75rem, 8vw, 6rem)`, its own dedicated centered beat) is the system's one intentionally oversized Display variant — bigger than the standard Display role used for every other page's `<h1>`/section heading, reserved for this one identity-defining moment.
- Quick facts moved from a parchment three-column row to a full-bleed `ink-900` dark stat band (orchid-400 numerals, dimmed-white labels) — the day band's second dark passage besides the footer, used deliberately as a rhythm break rather than a color slip.
- The seal icon (radial-gradient circle, orchid→violet→ink — the same device family as nav badge/footer mark/placeholder avatars) now also anchors the Newsletter CTA, with an added `drop-shadow` glow and a scroll-triggered "seal-stamp" entrance animation (`.js-seal-armed`/`.is-stamped`, IntersectionObserver-driven, progressive-enhancement-safe, honors `prefers-reduced-motion`).
- Disabled/launch-gated controls (nav links, Login/Donate pills) now announce their reason to screen readers on activation, not just show it visually via `title`/`.sr-only` — closing a keyboard/AT gap the prior pass left silent.
- All placeholder content stays explicitly disclosed in-page (Venue's "Campus photos coming soon," the landing `.landing__soon` line, `.pastfacts__flag`, Palengke's vendor-list intro), never presented as real.
- Seven pages, one template family, unchanged: Home (full hero, now with its own richer body) and six interior pages (compact hero + content + crosslink + footer).
- The landing page's closing run is now Quick facts (dark band) → "More information coming soon" → **Trailer beat** (`.section--trailer`, its own hairline-bounded section) → Newsletter CTA → Footer; the trailer used to live inside the CTA section, which is now heading → rule → text → button only, restoring its single-purpose intent.
- The trailer lightbox is the system's first true modal dialog and the first place `inert` is used to lock background interaction — a pattern any future modal should reuse rather than re-deriving.

## Colors

Unchanged palette; no new colors were introduced by the landing rebuild, Workshops/Team/Past FACTs, or Palengke/the nav rework. Two palettes share the same hue set: the photographic night band keeps its on-photo roles; the parchment day band uses its accessible on-light roles.

### Primary
- **Deep Indigo** (`#0e155e`, `--ink-900`): night-band background/scrim base; on the day band, the standing heading/body-ink color and the footer background — and now, new this pass, the full-bleed background of the landing page's dark quick-facts stat band (`.section--quickfacts`), the day band's second deliberate dark passage. Also the base tone of the shared placeholder-circle gradient (nav badge, footer mark, CTA seal icon, Team avatars, Past FACTs photo placeholders, Palengke vendor logos, and now the Venue section's photo placeholder).
- **Violet** (`#4b1c71`, `--violet-800`): the page-edge "book" border and, on the day band, `--accent-on-light` — every structural label, category/group heading, link, the `.pill--ink` gradient's top stop, Palengke's `.vendor__handle` text, and now the Theme moment's `Mahiwagahan` heading and the CTA heading color.
- **Orchid** (`#b37ad4`, `--orchid-400`): reserved for large/decorative-only day-band uses — heading accent rules, motif ornaments, the placeholder-circle gradient's outer stop, and now the quick-facts band's numeral color (the one place orchid sets numeral/value text rather than a purely decorative element) and the CTA icon's `drop-shadow` glow tint. Still never body or label text.

### Neutral
- **Warm White / Parchment** (`#ffffdd`, `--cream-100`): the day band's dominant background across all content-bearing pages, and the text color inside `.pill--ink`.
- **White** (`#ffffff`): night band's reversed text/title color, footer text color, `.vendor__card`'s solid background, and (new) the quick-facts band's label color at `rgba(255,255,255,0.65)` — the first on-dark-band label opacity value distinct from the footer's own `rgba(255,255,255,0.65–0.75)` range, kept consistent with it rather than inventing a new dim-white step.
- **Ink-on-Light** (`--ink-900` solid; `--ink-on-light-dim`, ink-900 at 72% alpha): the day band's heading/body ink pair — also styling Workshops descriptions, Team's non-placeholder role labels, Past FACTs year/theme text, Palengke's vendor names (solid) and descriptions (dim), and now the Venue section's body copy and the CTA's supporting text.
- **Hairline-on-Light** (`rgba(14, 21, 94, 0.14)`, ink-900-tinted): sole divider color; also the 1px inset ring inside `.vendor__card`, the same tint used everywhere else for hairlines.

### Named Rules
**The No-Card Rule.** Content and controls sit directly on the photograph, a scrim gradient, the parchment ground, or a flat `ink-900` field — never inside a `box-shadow`-bordered container or opaque panel — with exactly one confirmed exception: a grid of distinct, comparable entities (first and so-far-only instance: the Palengke vendor grid, `.vendor__card`), where a flat white block with a soft diffuse shadow is permitted. This pass's `.section--quickfacts` dark band confirms the rule still holds under a color change: it is a full-bleed flat field, not a card or container, exactly like the footer it echoes. The exception was proposed to and chosen by the user directly, and it still may never take a hard-offset shadow, a colored border, or a rounded corner: the binary shape law (Shapes) still applies, hard-edged only, never round.

**The Hairline-Only Structure Rule.** Every visual division between content outside the one confirmed card exception is a 1–2px tinted hairline or the short orchid accent rule under a heading. The CTA section is bounded top and bottom by a `1px solid rgba(179, 122, 212, 0.3)` hairline (orchid-400 at 30% alpha) — an orchid-tinted variant of the same hairline device, used because the CTA is a standalone section between two other sections and needed a visible seam without becoming a card.

**The Two-Ink Rule.** On-light text uses exactly two ink roles: solid `ink-900` and `ink-900` at 72% alpha. Orchid/violet stay accent-only. Holds unchanged, including in the new Venue and CTA sections.

**Orphaned tokens (documented, not active).** `--blue-500` and `--silver` remain declared in `:root` with zero usages, unchanged by this pass. Still not to be reached for in new work.

## Typography

**Display Font:** Fraunces (self-hosted variable, weights 300–900 normal + italic), Georgia fallback — headings only.
**UI/Label/Body Font:** Jost (variable 300–700), Trebuchet MS fallback — every non-heading role.

**Character:** Unchanged — a bold vintage-slab serif announcing every heading against a plain grotesque body voice.

### Hierarchy
- **Theme Display** (weight 900, Fraunces, `clamp(2.75rem, 8vw, 6rem)`, letter-spacing `-0.015em`, `--violet-800`): new this pass. The landing page's `Mahiwagahan` heading only — a deliberately oversized variant of Display, roughly 1.5× its largest step, reserved for the one moment the conference's theme name is the entire point of the section. Not used anywhere else; do not reuse this scale for ordinary section headings.
- **Display** (weight 900, Fraunces, `clamp(2.5rem, 5.5vw, 4rem)`, `'SOFT' 40, 'WONK' 1`): every ordinary page/section heading, unchanged — including the new Venue heading (`.venue__heading`, one step down at `clamp(1.6rem, 3.2vw, 2.25rem)`, sharing the Title role below) and the CTA heading ("Ready for FACT 2026?").
- **Numeral** (weight 900, Fraunces, `'SOFT' 40, 'WONK' 1`, ink-900 on parchment / orchid-400 on the dark quick-facts band): two confirmed scales share this role — Agenda's date numerals at `clamp(3rem, 6vw, 4.75rem)`, and a smaller scale at `clamp(2rem, 4vw, 3rem)` used by both Past FACTs year figures and, new this pass, the landing quick-facts band's stat values (`.quickfacts__value`) — the first Numeral-role instance set in orchid-400 rather than ink-900, since it sits on the dark band rather than parchment.
- **Category Label** (weight 700, Fraunces, `clamp(1.25rem, 1.9vw, 1.5rem)`, letter-spacing `-0.005em`, `--accent-on-light`): styled by `.groupheading`, the one class every group/category heading uses across FAQ, Workshops, Team, and Palengke. Unchanged.
- **Quote** (weight 500 italic, Fraunces, ink-900): the About pulled quote and Past FACTs theme names. New this pass, the Theme moment's definition line (`.theme__definition`, "Enchanting Our Bright Minds," `clamp(1.25rem, 1.9rem, 1.6rem)` italic, weight 600) reuses the same italic-Fraunces device at a very close scale — one step heavier in weight (600 vs. the Quote role's 500) to hold its own beneath the oversized Theme Display heading above it.
- **Title** (weight 800, Fraunces, ink-900): Workshops session titles and, new this pass, the Venue section's `<h2>` (`.venue__heading`, `clamp(1.6rem, 3.2vw, 2.25rem)`) reuse this exact role and scale.
- **Structural Label** (weight 600, Jost, `0.78rem`, letter-spacing `0.05em`, uppercase, `--accent-on-light`): Team role labels, Agenda weekday labels, TOC-era index numerals (now retired with the TOC section itself), and now the Venue section's eyebrow date label (`.venue__label`, "Oct. 16–18, 2026"), the quick-facts band's labels (in white at 65% opacity instead of the accent-on-light violet, since they sit on the dark band), and the standalone `.landing__soon` line all reuse this compact uppercase-label device.

Nothing in this pass introduces Fraunces into body, label, UI chrome, or the CTA's supporting paragraph (`.cta__text`, Jost, `--ink-on-light-dim`, standard Body role).

### Named Rules
**The Display-Is-Headings-Only Rule.** Fraunces still appears solely in heading/numeral/quote/title roles, now including Theme Display. `.venue__heading`, `.theme__definition`, and `.quickfacts__value` all extend the rule to their respective roles rather than introducing a new face.

**The No-Kicker Rule.** Section headings carry no eyebrow/kicker label above them. `.section--theme`, `.section--venue`, and `.section--cta` all confirm this — the Venue section's `.venue__label` is a value ("Oct. 16–18, 2026"), not an eyebrow above a heading of the same subject; it sits above the `<h2>` because it *is* the date fact, not a category tag.

## Layout

Unchanged two-header-state structure (full hero on `index.html`, `.hero--compact` on all six interior pages) and unchanged `.section`/`.section__inner` rhythm (`clamp(4rem, 10vw, 7.5rem)` vertical padding, `max-width: 1180px` inner wrapper, paper-grain `main::before` texture).

**Landing page (rebuilt this pass):** full hero → `.section--theme` (`padding-bottom: clamp(2.5rem, 5vw, 3.5rem)`, tighter than the standard section rhythm since it flows directly into Venue below: centered `.theme__stage` holding the oversized `Mahiwagahan` heading plus five absolutely-positioned `.theme__sparkle` glyphs that fade/scale on scroll-into-view and, on fine-pointer/hover-capable devices without `prefers-reduced-motion`, track the pointer with a subtle tilt/glow via `requestAnimationFrame`; a rule; `.theme__definition`) → `.section--venue` (`padding-top: clamp(2.5rem, 5vw, 3.5rem)`, mirroring the theme section's tightened gap: `.venue` is a two-column grid, `minmax(0,1fr)` × 2, `gap: clamp(2rem, 5vw, 3.5rem)`, `align-items: center` — text block left, photo-placeholder device right, collapsing per the existing `900px` breakpoint like every other two-column block in the system) → `.section--quickfacts` (no `.section` class — full-bleed `ink-900` band, `padding: clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 6vw, 5rem)`, its own three-column `minmax(0,1fr)` grid, `gap: clamp(2rem, 4vw, 3rem)`) → `.section--trailer` (its own beat: hairline top border only, `padding: clamp(2.5rem, 5vw, 3.5rem)` vertical — tightened in a `layout` pass from an original `clamp(3.5rem, 8vw, 6rem)` once stacking against Quick Facts' own bottom padding and the CTA's own generous top padding was read live and found to leave the section feeling stranded from both neighbors; centered `.cta` column holding a real Display-role `.section__heading` ("A First Look"), its matching `.section__rule`, and the trailer poster button — promoted from a small eyebrow label to a full heading in a `bolder` pass) → `.section--cta` (centered `.cta` column, hairline-bordered top — shared with `.section--trailer`'s bottom seam, so the two sections read as separated by exactly one line, not two — and bottom, seal icon → heading → rule → text → button, trailer no longer inside it) → `.landing__soon` (a standalone centered line, `padding: clamp(2rem, 4vw, 2.75rem) clamp(1.25rem, 6vw, 5rem)`, no section wrapper — sits after the CTA, a quiet closing note rather than an interruption before it) → footer. (An earlier draft of this document misstated `.landing__soon` as sitting before `.section--trailer`; corrected here against the actual markup.)

**Nav (all eight pages, reworked twice this pass cycle):** the trigger-plus-drawer pattern is no longer used at every breakpoint. The six unlaunched page links stay removed from the markup entirely (not disabled, not hidden: not present, until each is real) — but the Login/Donate pills and a new Instagram icon link (`.hero__social`, the exact SVG glyph already used in the footer, icon-only here) were brought back into `.hero__actions`, locked via the standing `aria-disabled` pattern for Login/Donate, live for Instagram. At ≥900px everything sits inline in the topbar next to the wordmark — About Us, the Instagram icon, Login, Donate — and the trigger button is hidden outright (`display:none`); below 900px it collapses to the existing compact anchored drawer (`.hero__navtoggle` + `.hero__menu`), sized for a short list rather than forced into a full-bleed sheet. The drawer mechanism, `aria-disabled` pattern, and live-announcer are all kept and will apply automatically again once a page link is re-added for a newly-launched page.

**Retired this pass:** the landing page's six-tile Table of Contents grid (`.toc__entry`, index numerals `01`–`06`) is fully removed, not just hidden — its sole live destination (About Us) now lives in the Venue section's `.venue__button` instead. Its CSS is fully removed, including the `.toc__visual` reference that briefly lingered in the shared seal-stamp keyframe block and in `main.js`'s `sealIcons` selector (cleaned up in a follow-up polish pass); `.cta__icon` is now the seal-stamp system's only member.

Breakpoints: unchanged **900px** (interior-page grids collapse to one column, motifs switch to mobile treatment, nav drawer becomes a full-bleed sheet), **460px** (topbar eventline wraps), **560px** (FAQ summary shrinks; crosslink strip stacks). The landing page's new Venue two-column grid and quick-facts three-column grid both fold to their respective breakpoints via the same `minmax(0,1fr)` pattern already used by every other multi-column block in the system; no new breakpoint was introduced.

## Elevation & Depth

Flat, no-shadow-ramp system on the day band; separation by hairline, whitespace, and paper-grain texture, with one now-confirmed card exception (`.vendor__card`, unchanged by this pass — see Colors → Named Rules). The Team avatar, Past FACTs photo circles, Palengke vendor-logo circles, and now the Venue section's photo placeholder and the CTA's seal icon all carry the same ambient shadow as the pre-existing nav badge/footer mark device (`0 6px 16px rgba(6,4,30,0.28), inset 0 0 0 1px rgba(255,255,255,0.22)`) — reused, not new.

New this pass: the CTA seal icon (`.cta__icon`) adds one further effect on top of the reused ambient shadow — `filter: drop-shadow(0 0 14px rgba(179, 122, 212, 0.55))`, an orchid-tinted outer glow, since this icon needed to read as the section's focal point rather than a plain repeated device. It is the first icon-level glow in the system; reserve it for a section's single, deliberate focal icon rather than applying it to every placeholder circle.

New this pass: the **seal-stamp entrance animation.** Any element carrying `.toc__visual` or `.cta__icon` (in practice, currently only `.cta__icon`, since the TOC section that originated this pattern is retired — see Layout) starts at `opacity: 0` once `.js-seal-armed` is present on `<html>` (an IntersectionObserver feature-detection flag set by `main.js`), then plays a one-shot `seal-stamp` keyframe (`0.6s`, `var(--ease-out-expo)`, scale `0.45→1.05→1` with a `-14deg→3deg→0deg` rotation settle) the moment it scrolls into view at 40% visibility, and is never re-armed. Progressive-enhancement-safe: without JS, the icon is simply visible with no animation. Respects `prefers-reduced-motion` via the system's existing global kill-switch.

New this pass: the trailer poster's scrim (`.trailer__scrim`) and the trailer lightbox's backdrop (`.trailer-modal__scrim`, plus the close button's fill) all reuse the same near-black tint the compact-hero scrim (`.hero--compact .hero__scrim`) and the hero topbar's underlay were already built from, just at different alpha steps for a thumbnail overlay versus a full-viewport backdrop. That shared base is now `--ink-scrim: 6, 4, 22` (a bare RGB triplet in `:root`, `css/styles.css`), consumed everywhere as `rgba(var(--ink-scrim), 0.X)` — a follow-up pass promoted it from a repeated literal to a real token once the trailer's arrival made it a 7-usage value across two files. The video frame's own `#000` background stays a literal — it's a technical fallback (letterboxing before the iframe paints), not a palette color. **Not** folded into `--ink-scrim`: the full-viewport hero's own `.hero__scrim` (the animated/tracking hero, not the compact one), which layers five different near-black-to-violet stops (`rgb(6,3,22)`, `rgb(14,8,36)`, `rgb(20,10,46)`, `rgb(10,6,34)`, plus `rgb(14,21,94)` and `rgb(75,28,113)` for its warm undertone) into one deliberately hand-tuned atmospheric gradient — a genuinely different, artistic multi-stop recipe, not the same value repeated with drift, so consolidating it would have been a real redesign rather than a safe extraction.

### Named Rules
**The No Hard Offset Rule.** Unchanged; the CTA icon's glow and the seal-stamp entrance stay in the same soft/diffuse, non-hard-offset family as every other shadow/effect in the system.

## Shapes

Unchanged binary form language: fully round (`999px`/`50%`) or hard-edged. The Venue photo placeholder reuses `.about__photo`'s existing hard-edged `21/9` rectangle treatment exactly (see Components → Photo Placeholders) rather than introducing a new aspect ratio or corner style. The quick-facts dark band is a full-bleed rectangle with no radius, matching the footer it echoes. No new radius value was introduced.

## Components

### Buttons (Pills)
Three variants: **Solid** and **Ghost** (night-band-only) plus **Ink** (`.pill--ink`), unchanged. The landing page's new Venue button ("About FACT 2026") and CTA button ("Join the Newsletter," with a small authored mail-glyph SVG prefixed via `.cta__button-icon`, not a literal Unicode emoji) are both `.pill--ink`, per the standing rule that any interactive pill on the parchment ground uses this variant.

Every currently-unavailable control — nav links (all but About Us), Login/Donate pills — uses `aria-disabled="true"` instead of the native `disabled` attribute, keeping the control focusable and its "coming soon" reason exposed via a `title` attribute and a `.sr-only` span. `main.js` also raises the same reason as a live screen-reader announcement on activation — a shared, lazily-created `div[aria-live="polite"].sr-only` region is populated with `"<visible label> — <reason>"` on every `[aria-disabled="true"]` click, closing the gap where a keyboard/AT user previously got only a silent `preventDefault()`.

**Locked pills now have two further states, added after a formal critique of the navbar found the nav's two locked pills were its boldest, most inviting-looking elements — a genuine "why did nothing happen" trap for the majority of visitors who aren't hovering with a mouse.** First, `.pill--ghost`/`.pill--solid` (night-band variants only; `.pill--ink` on parchment pages is untouched) drop their gradient fill, shadow, and glossy `::after` sheen once `[aria-disabled="true"]` or `:disabled` — falling back to a flat, dim outline (`border-color: rgba(255,255,255,0.35)`, `color: var(--text-on-photo-dim)`) that reads as genuinely locked rather than as the loudest call-to-action in the row. Second, `main.js` now also shows a visible `.locked-tip` toast on click — a small `rgba(10,8,36,0.94)` rounded-rectangle (`border-radius: 10px`, not a full pill capsule; multi-line text inside `border-radius: 999px` was tried first and broke into an illegible circular blob) positioned via `getBoundingClientRect()` under the clicked control, showing its `title` text for 2.2s, then fading out (or on scroll). This is the touch-user equivalent of the `title` tooltip, which never fires on a touch device at all.

The Newsletter CTA's button is the one genuinely live interactive pill on the landing page besides the Venue button: a real `mailto:` link, not a disabled placeholder.

### Theme Moment (new — landing page's own dedicated identity beat)
`.section--theme` centers `.theme__stage`: the oversized `Mahiwagahan` heading (Theme Display role, `.section__heading--theme`) surrounded by five `.theme__sparkle` glyphs (orchid-400, absolutely positioned around the heading at hand-placed offsets, not a grid) that each fade in and twinkle on a staggered `theme-twinkle` loop (`2.6s ease-in-out infinite`, `0.4s`–`1.8s` staggered delays) once the section scrolls into view. On pointer-capable, motion-permitting devices, moving the mouse near the heading adds a subtle 3D tilt (`perspective(600px) rotateX/rotateY`, max ±3deg) and a proximity glow (`drop-shadow`, 0–16px scaling with cursor distance) via a `requestAnimationFrame` loop, and nudges nearby sparkles toward the cursor. Below it, `.theme__definition` ("Enchanting Our Bright Minds") reuses the Quote role's italic Fraunces treatment at a heavier weight (600). This is the system's one component built specifically to make the conference's theme name feel like a moment rather than a line of text.

### Venue (new — landing page's where/when block)
`.section--venue`: a two-column grid pairing `.venue__body` (an eyebrow-style date label using the Structural Label role, a Title-role `<h2>`, a Body-role description capped at 44ch, and the `.venue__button` linking to About) with `.venue__photo` — a direct reuse of `.about__photo`'s hard-edged `21/9` placeholder-rectangle device (radial-gradient fill, camera-icon SVG, `figcaption`), extended to a third context beyond About and Workshops. No new visual device was introduced; the section's only job is to combine already-documented parts (Title heading, Structural Label, Body text, `.pill--ink`, the photo-placeholder device) into the landing page's first content beat after the Theme moment.

### Quick Facts (rebuilt this pass — dark stat band)
`.section--quickfacts` (no `.section` wrapper — a deliberate full-bleed exception, `background: var(--ink-900)`) holds a three-column `.quickfacts` grid of `.quickfacts__item` entries: a large orchid-400 `.quickfacts__value` (Numeral role, smaller scale) over a dimmed-white `.quickfacts__label` (Structural Label role, `rgba(255,255,255,0.65)`). Previously an equal-weight three-column row on the parchment ground with no dark-band precedent besides the footer; rebuilt to read as a confident, self-contained stat moment rather than one row among several similar rows. No icons — a prior iteration used a per-item icon device and it was deliberately removed to keep the band reading as pure typography (numeral + label), consistent with the system's general reluctance to decorate data with unnecessary iconography.

### Newsletter CTA (new — landing page's closing section)
`.section--cta`, bounded top and bottom by an orchid-tinted hairline (`1px solid rgba(179, 122, 212, 0.3)`), centers a `.cta` column: the seal icon (`.cta__icon` — the standard radial-gradient circle device, plus the new glow and seal-stamp entrance, see Elevation & Depth), a Display-role heading in `--violet-800` ("Ready for FACT 2026?"), an orchid rule, `.cta__text` (Body role, `--ink-on-light-dim`, capped at 44ch — "Registration opens soon — join our newsletter to be the first to know"), and the live `mailto:` `.pill--ink` button with its authored mail-icon prefix. This is the landing page's one section explicitly built as a standalone conversion moment rather than an informational block — separated from Quick Facts above it by the `.landing__soon` line, per the user's explicit "separate section, no card" direction during this pass's design review.

### Trailer (rebuilt this pass — real poster and video, own section, then amplified, quieted, tightened, and cleaned up)
`.trailer__frame.photoframe` is a `<button>`, 16/9, `max-width: 640px`, that used to be a locked gradient placeholder ("Premiering soon") and now shows the real YouTube thumbnail (`.trailer__poster`, `object-fit: cover`, with a JPG-size fallback via an `error` listener in `main.js`) under `.trailer__scrim` (a dark linear-gradient, see Elevation & Depth) so the centered play-icon device (`.trailer__playwrap`, `.trailer__play` circle) and the `.trailer__label` text stay legible regardless of what the thumbnail itself looks like. The play button originally sat inside two infinitely-pulsing `.trailer__ring` rings (staggered radar-ping loop, never stopping); a `quieter` pass removed the ambient always-on motion entirely — one static ring remains as a considered accent around the play circle, and the pulse became a single gentle expand-and-fade on hover/focus only (`transform: scale(1.25); opacity: 0`, `0.4s`). Functional feedback stayed; the decorative loop that ran regardless of whether anyone was looking did not.

A closing `polish` pass retired the `.cta__trailer` modifier class entirely — a leftover from when the trailer lived inside `.section--cta` (hence the "cta" in its name), it had become the *only* rule setting `.trailer__frame`'s margin (`1.75rem auto 0`) since the button always carried both classes together; the base class's own margin value was permanently unreachable dead code. Folded the real value into `.trailer__frame` directly and dropped `.cta__trailer` from both the markup and the stylesheet — one class, doing what its name says, instead of two where one was a silent no-op.

Sits alone in its own section, `.section--trailer` (see Layout). Originally shipped with no heading at all — just a small uppercase `.cta__trailerlabel` eyebrow ("A First Look") sitting directly above the poster, the only section on the landing page without a real `<h2>`. A `bolder` pass diagnosed this as the section quietly opting out of the page's own strongest move (every neighbor — Theme, Venue, Quick Facts, CTA — commits to a real heading at full type-role strength) and promoted the same words into an actual `.section__heading` ("A First Look," Display role, ink-900, centered) with the matching centered `.section__rule` beneath it — the identical rule recipe `.section--cta` uses (120px, 3px, symmetric orchid fade), a deliberate visual rhyme between the two adjacent, hairline-sharing sections. `.cta__trailerlabel` is retired; nothing else referenced it.

### Trailer Lightbox (new — the system's first modal dialog)
`#trailer-modal`, a sibling of `<main>` (not nested inside it, so it stays interactive when the rest of the page goes `inert`), `hidden` by default. Structure: `.trailer-modal__scrim` (full-viewport backdrop, `backdrop-filter: blur(8px)`, see Elevation & Depth) behind a centered `.trailer-modal__dialog` (`max-width: 960px`) holding `.trailer-modal__frame` (16/9, `#000` fallback, ambient shadow) and `.trailer-modal__close` — a 44px circular button (the system's standard circular-icon-button proportions, matching `.photocarousel__nav`) positioned just *above* the frame (`bottom: 100%`) rather than overlapping it, specifically because an earlier version sat inside the frame's top-right corner and visually collided with YouTube's own settings-gear icon there; `.trailer-modal`'s own top padding (`clamp(4rem, 10vw, 5.5rem)`, asymmetric versus its `clamp(1rem, 4vw, 2.5rem)` on the other three sides) exists solely to guarantee room for that external close button without clipping.

`main.js` builds the `youtube-nocookie.com` iframe only when the modal opens (never preloaded) and tears it down completely on close — the only reliable way to guarantee playback actually stops, versus a postMessage pause that can race the close animation. The embed requests `autoplay=1&mute=1`; muted is required for autoplay to actually run under browser autoplay policy, and YouTube's own player chrome supplies the unmute control, so no custom affordance was built for it. Opening the modal sets `inert` on `<header>` and `<main>` (found via `body > header, body > main`, not by ID, so the pattern travels to any future page that adds this component) for the duration — the system's first use of `inert`, chosen over manual Tab/Shift+Tab interception because focus can move into the iframe's own cross-origin document, where a parent-page keydown listener can no longer intercept it; `inert` is enforced at the DOM level regardless of which document currently holds focus. Escape, a backdrop click, or the close button all call the same `closeTrailer()`, which clears `inert`, empties the iframe container, unlocks scroll (`html.has-trailer-open`), and returns focus to the trigger button — verified live, including the visible focus ring reappearing on `#trailer-trigger` after close.

### Disabled Control Announcer (new — cross-page accessibility pattern, not a visual component)
`main.js` creates one shared `div[aria-live="polite"].sr-only` region on first use and repopulates it with `"<label> — <reason>"` on every `[aria-disabled="true"]` click, across nav links and pills alike. Documented here because it's a system-wide behavioral commitment, not a one-off fix: any future launch-gated control should keep the existing `aria-disabled` + `title` + `.sr-only` reason-span pattern, and will automatically pick up the live announcement for free since the handler is attached to the `[aria-disabled="true"]` selector globally.

### Group Heading (shared class — one pattern, previously mis-documented as two)
`.groupheading` is the single Category Label class used by every group/category heading across FAQ, Workshops, Team, and Palengke — confirmed by direct inspection this pass: no `.faq__categoryheading` selector exists anywhere in `sections.css`, and no HTML file references it. Earlier versions of this document described `.groupheading` and `.faq__categoryheading` as a live duplication to eventually merge; that merge had already happened in the codebase by the time this pass checked, the documentation just hadn't caught up. Corrected here rather than "fixed" in code, since there was nothing left in code to fix.

### Vendor Card (the confirmed No-Card exception)
Unchanged by this pass — see prior documentation retained below in Components.

`.vendor__grid` (`<ul>`, `repeat(auto-fill, minmax(220px, 1fr))`, `gap: clamp(1.5rem, 3vw, 2rem)`) of `.vendor__card` (`<li>`) entries, one per Palengke vendor: a 56px `.vendor__logo` circle (the same radial-gradient placeholder device as Team avatars/Past FACTs photos/the Venue photo, holding a monoline shop-icon SVG), a `.vendor__name`, a `.vendor__theme` description, and a `.vendor__handle` line. `background: var(--white)`, `box-shadow: 0 10px 28px rgba(14,21,94,0.12), inset 0 0 0 1px var(--hairline-on-light)`, no border-radius, `padding: clamp(1.5rem, 3vw, 1.85rem)`.

### Photo Frame (new — real photography replaces the placeholder device)
`.photoframe`: `aspect-ratio: 21/9`, `overflow: hidden`, ambient shadow (`0 6px 16px rgba(6,4,30,0.28)`), containing a single `object-fit: cover` `<img>`. Replaces the retired radial-gradient/camera-icon placeholder that both the About page and the Venue section used to share (`.about__photo`, now fully removed — no HTML references it). The Venue section (`index.html`, `.venue__photo.photoframe`) now shows a real photo of a packed FACT auditorium. Same box shape and shadow as the old placeholder, so the swap from placeholder to real photography changed content only, not geometry.

### Photo Carousel (new — About page)
`.photocarousel`: a horizontally scrollable, `scroll-snap-type: x mandatory` track (`<ul class="photocarousel__track">`) of full-width `.photocarousel__slide` (`aspect-ratio: 4/3`, `object-fit: cover`) `<li>` entries — a wider, more forgiving aspect ratio than `.photoframe`'s 21/9 letterbox, chosen because these are varied event photos (crowd shots, stage performances) that need more vertical room than a single curated banner photo does. Two circular 44px `.photocarousel__nav` buttons (white, `box-shadow` matching the photoframe device, reusing the crosslink arrow glyph — mirrored via CSS `rotate(180deg)` for prev, not a second authored icon) float over the slide edges; a row of small dot indicators (`.photocarousel__dot`, orchid-400 when active, `rgba(14,21,94,0.2)` otherwise) sits below the track and reflects the current slide via an `IntersectionObserver` (`threshold: 0.6`, scoped to the track as `root`). `main.js` drives prev/next/dot navigation via `track.scrollTo({behavior:'smooth'})`, with a `setTimeout`-based position correction as a fallback for any environment where the native smooth-scroll animation silently fails to complete (verified necessary in at least one such environment during this build) — `prefers-reduced-motion` skips the animation and jumps directly. About's carousel holds seven real event photos (discussion session, Palengke bakery table, karaoke, a packed auditorium, two performance moments, and a farewell whiteboard), replacing the single placeholder figure the page used to end on. The keyboard experience got two follow-up passes: first, the track (`tabindex="0"`) gained an ArrowLeft/ArrowRight handler wired to the same `carouselScrollTo` the nav buttons use, plus a visible "X / 7" counter (`.photocarousel__status`) and an `aria-live="polite"` announcer mirroring it for screen readers (the counter itself stays `aria-hidden`, since the dots already carry per-photo `aria-label`s and double-announcing would be noisy). Second, `.photocarousel__dots` (`role="tablist"`) now implements the full ARIA APG roving-tabindex pattern instead of leaving every dot independently tabbable: only the active dot carries `tabindex="0"`, the rest `tabindex="-1"`, and ArrowLeft/ArrowRight/Home/End on the dot list move focus *and* activate the target slide (automatic-activation model), toggled in the same `IntersectionObserver` callback that already drove `is-active`/`aria-selected`.

### Workshops Session List, Team Grid, Past FACTs List, Workshops Search
Unchanged by this pass; see prior documentation.

### Photo Placeholders (reused device — now retired from About and Venue)
The radial-gradient circle/shadow device (`orchid-400`→`violet-800`→`ink-900`, `0 6px 16px rgba(6,4,30,0.28), inset 0 0 0 1px rgba(255,255,255,0.22)`) is still used, not reinvented, across:
- **Workshops** (`.workshop__facilitator`): 56px circle, person-silhouette icon.
- **Team / Past FACTs / Palengke**: circle device at their respective scales (68px / 110px–76px / 56px).

**Retired this pass:** `.about__photo` (the placeholder figure previously shared by About's own photo spot and the Venue section, both 21/9 hard-edged rectangles with a camera-icon SVG and a "coming soon" figcaption) is fully removed — no HTML references it anymore. Both consumers now show real photography instead: Venue uses the new `.photoframe` device (see Components), and About uses the new `.photocarousel` (also below). The `text-shadow: 0 2px 6px rgba(4, 2, 20, 0.5)` contrast fix applied to the old `.about__photo figcaption` rule earlier this session is now moot — there is no more figcaption on either page — and was removed along with the rest of the retired rule.

### Navigation (reworked twice this pass cycle — breakpoint behavior and content, not the underlying mechanism)
No longer identical at every breakpoint. `.hero__menu` now renders two ways from the same markup: at ≥900px it's `position:static`, laid out as a plain inline row (`.hero__menu{flex-direction:row}`, `.hero__links{flex-direction:row}`, `.hero__actions{flex-direction:row; padding-top:0; border-top:none}`), all drawer chrome (border/background/blur/shadow) stripped via the media query, and `.hero__navtoggle` is `display:none` — no trigger, no click, everything just sits in the topbar next to the wordmark. Below 900px, the original compact anchored-panel drawer returns (right-aligned, `min-width:240px`-capped, blurred dark panel) — the full-bleed-sheet variant from two passes ago is retired. Content: the six unlaunched page links stay removed from the nav `<ul>` across all eight HTML files (not disabled-and-shown), but `.hero__actions` is back — Login/Donate pills (still `aria-disabled`, still locked) plus a new icon-only Instagram link (`.hero__social`, 44px touch target, the exact SVG path from `.footer__social`, hover/focus tints to `--orchid-400` matching the footer's own hover treatment). Each page's `.hero__navtoggle-label` reads "Menu" (`about.html` briefly read "About Us" here while its `.sr-only` span still said "Menu" — a real accessible-name bug, "About Us Menu" announced together — caught by critique and fixed; now consistent everywhere). The `aria-disabled` + `title` + `.sr-only` + live-announcer pattern stays wired into the shared CSS/JS and will cover any page link the moment it's added back for a newly-launched page.

**About Us link, rebalanced.** The same critique found the one live link had both the smallest tap target (26.79px measured height) and the quietest visual weight of the row's four items — while the two non-functional pills were the tallest and loudest. `.hero__links a` now carries `padding-block: 0.8rem` (~44px tap height, matching the pills) and `font-weight: 600` (up from inherited 400) — enough to hold its own now that the locked pills are quieter, without converting it into a pill itself (would have conflicted with the existing `::after` underline-on-hover/current device, which stays; its `bottom` offset moved from `0` to `0.72rem` so it still hugs the text baseline inside the taller padded box instead of drifting to the box's new outer edge).

### FAQ Accordion, About Split, Program Day, Cross-Link Strip, Footer, Compact Header Page Title
Unchanged; see prior documentation.

## Do's and Don'ts

### Do:
- **Do** reserve the Theme Display type role (`clamp(2.75rem, 8vw, 6rem)`) for the landing page's `Mahiwagahan` heading alone; use the standard Display role for every other heading, including other large moments.
- **Do** treat the dark `.section--quickfacts` band as a deliberate, occasional rhythm break (like the footer) — not a signal that dark bands are now interchangeable with the parchment day band throughout the site.
- **Do** reuse the radial-gradient placeholder-circle/rectangle device for any future placeholder-photo need, including the Venue section's `.about__photo`-class reuse, rather than introducing a fifth placeholder visual.
- **Do** keep the `aria-disabled` + `title` + `.sr-only` reason-span + live-announcer pattern uniform across every launch-gated control (nav links and pills alike) — any newly gated control should pick up all four automatically via the existing global selector and CSS class.
- **Do** use `.pill--ink` for any interactive pill placed directly on the parchment day band; reserve `.pill--solid`/`.pill--ghost` for pills on a photographic or dark surface.
- **Do** flag placeholder content explicitly in-page rather than presenting invented names, numbers, dates, or copy as real.
- **Do** reserve the CTA icon's `drop-shadow` glow for a section's single, deliberate focal icon — not a treatment to apply to every placeholder circle or badge.
- **Do** keep the seal-stamp entrance animation reserved for a section's own one-shot focal icon moment (currently `.cta__icon` and `.mahiwagahan__icon`); it is not a generic reveal-on-scroll utility for arbitrary content.
- **Do** reuse the `inert`-on-background pattern (see Components → Trailer Lightbox) for any future modal, rather than hand-rolling Tab/Shift+Tab interception — it's the only approach that reliably holds when focus can move into a cross-origin iframe.
- **Do** keep each section's conversion ask singular — a critique on the trailer's original placement (inside `.section--cta`) is the concrete lesson: a section documented as one standalone moment should not quietly grow a second ask.

### Don't:
- **Don't** introduce a card, panel, or opaque-background container for grouping content outside the one confirmed exception (`.vendor__card`).
- **Don't** add a kicker/eyebrow label above any heading, including the Venue section's date label (it's a fact, not a category tag).
- **Don't** author a new placeholder-avatar/photo/logo visual device — reuse the existing radial-gradient circle/rectangle.
- **Don't** add hard-offset/neobrutalist shadows anywhere, including the new CTA icon glow or the seal-stamp entrance.
- **Don't** reintroduce a TOC-style grid of disabled tiles for launch-gated pages — nav links carrying `aria-disabled` directly, plus one clear live-link button in context (the Venue section's pattern), replaced it and should stay the pattern for any future "not yet live" surface.
- **Don't** reintroduce a second class for the same Category Label style — `.groupheading` is the one name; a `.faq__categoryheading` selector existed in this document's history but not in the code, and shouldn't be recreated.
- **Don't** reintroduce a two-element, independently-positioned links/actions nav (the retired `top: calc(100% + 168px)` pattern from two passes ago).
- **Don't** add a page's link back into the nav before that page is actually live — the nav lists what's real, not what's planned; remove-then-re-add beats disabled-and-shown for this project's launch phase.

**Stacking fix (prior pass).** The nav drawer previously risked being clipped: `.hero`'s `isolation: isolate` created a stacking context with no explicit `z-index`, which could trap `.hero__menu` beneath `<main>`'s own stacking context. Fixed by giving `.hero` an explicit `z-index: 1`, and narrowing `overflow: hidden` from the whole `.hero` box down to just its photographic layers.

**Accessibility/perf fixes (prior pass).** Footer legal text raised from `rgba(255,255,255,0.45)` to `0.65)` (WCAG AA); `.hero__navtoggle` raised 40px→44px; `.footer__social` padding raised to clear 44px; underline/hover motion converted to `transform`-only; mobile nav panel `backdrop-filter` blur reduced 14px→8px.

**Mobile rendering — now independently verified.** The `resize_window` limitation logged across prior sessions (it doesn't change the page's actual `window.innerWidth`) still holds, but a real mobile viewport was achieved this pass via a same-origin `<iframe>` sized to 386×844px: an iframe's contained document gets its own genuine viewport for `@media` evaluation, independent of the outer window. Confirmed clean at that width: the landing page's full flow (hero, Theme moment, Venue collapse, Quick facts band, Trailer beat, CTA, footer), About's compact hero, photo carousel, and the footer's 3-column-to-1-column collapse.

**Found and fixed during that verification: the Theme Display heading overflowed and was silently clipped on narrow viewports.** `.theme__stage` is `display: inline-block` (intentional — it's the positioning anchor for the five absolutely-positioned sparkle glyphs, sized to hug the heading rather than stretch full-width), so its shrink-to-fit width calculation used the heading's *unwrapped* natural width. At the clamp's old floor (`3.25rem` = 52px), "Mahiwagahan" in Fraunces Black was wider than a ~340px mobile content column, and `.section { overflow: hidden }` clipped the overflow invisibly — the word rendered as "Mahiwagaha," missing its final letter, with no visual indication anything was wrong. Fixed by lowering the Theme Display clamp's floor from `3.25rem` to `2.75rem` (44px) — enough margin to fit "Mahiwagahan" on one line down to ~320px viewports, verified live. The `8vw`/`6rem` upper end of the curve is unchanged. Frontmatter and all prose references to the old floor were updated to match.
