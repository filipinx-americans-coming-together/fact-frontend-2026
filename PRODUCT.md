# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js 14 (App Router) + TypeScript, deployed on Vercel. The design was first built as a static HTML/CSS/JS prototype and then ported into this repo (see the implementation note in `DESIGN.md`). This codebase now also contains the registration frontend (`src/app/my-fact/`, `src/app/facilitators/`, `src/app/admin/`), backed by the Django API in the separate `fact-website-backend` repo.

## Users

Primary: students learning about, registering for, and planning to attend FACT Conference 2026 — the decision-making visitor is a prospective delegate.
Secondary (confirmed but not primary): sponsors/partners evaluating sponsorship, past delegates/alumni, general public/press.

## Product Purpose

FACT (Filipinx Americans Coming Together) is the annual conference hosted by the Philippine Student Association at the University of Illinois Urbana-Champaign — the largest Filipinx-interest conference in the Midwest, 1,000+ delegates yearly. This site is the public-facing website for FACT 2026: it informs prospective delegates about the conference and hosts the registration flow (account creation, Eventbrite ticket purchase, workshop selection), which talks to the separate `fact-website-backend` Django API.

## Positioning

Not limited to delegates of Filipinx descent — facilitators and delegates come from varied backgrounds; workshops span a wide range of topics. FACT's mission: build a community of leaders by uniting, enlightening, and empowering Filipinx/Fil-Am/non-Filipinx youth nationwide, so delegates carry cultural knowledge and leadership into their professional lives and communities.

## Operating Context

- Conference dates: October 16–18, 2026.
- Venue: University of Illinois Urbana-Champaign.
- Theme: **Mahiwagahan: Enchanting Our Bright Minds** — Mahiwagahan = "to be mystified, to be intrigued"; Hiwaga = "mystery, magic, wonder."
- Registration: built into this site under `/my-fact` (delegates), `/facilitators`, and `/admin`; data and payment verification live in the `fact-website-backend` API, tickets are sold through Eventbrite.
- Donation: live at `/donate` (embedded Blackbaud donation form).
- Site sections referenced in existing visual reference: About Us, Agenda, FAQ, Login, Donate, plus a live countdown to the conference.

## Capabilities and Constraints

- Registration UI lives in this site; business logic (payment verification, workshop capacity, auth) lives in the backend API — don't duplicate it client-side.
- Countdown-to-conference display is a confirmed feature (seen in reference hero).

## Brand Commitments

- Name/mark: "FACT" wordmark with butterfly + floral flourish motif (see `assets/FINAL FACT26 Typemark.png`), used in white/reversed form over imagery.
- Palette (confirmed hex): `#0E155E`, `#4B1C71`, `#3681AB`, `#B37AD4`, `#FFFFDD`. Accent colors undecided — candidates mentioned: silver, white, light green. Direction: vibrant, shiny, dynamic — explicitly not muted or flat.
- Theme motifs: mystery/magic/wonder (Mahiwagahan), florals, butterfly.
- Social presence: Instagram [@psa_fact](https://www.instagram.com/psa_fact/?hl=en) — only external social channel.
- Strong binding visual constraint: the user wants the site hero to closely match the reference screenshot at `assets/hero section.png` — purple floral macro photography background (`assets/FACT Background3 copy (1).jpg` is the source image), reversed-white FACT wordmark lockup with "enchanting our bright minds" script tagline and "Mahiwagahan 2026" serif type, top bar with date + live countdown (left/right), nav (About Us / Agenda / FAQ), Login + Donate buttons top right. Treat this as the committed hero direction, not a starting suggestion.

## Evidence on Hand

(The `assets/` paths below belonged to the original static prototype; there is no `assets/` folder in this repo — web images live under `public/`.)

- `assets/FINAL FACT26 Typemark.png` — official FACT 2026 wordmark (white, transparent).
- `assets/FACT Background3 copy (1).jpg` — purple macro floral photo used as hero background source.
- `assets/hero section.png` — reference screenshot of the committed hero design (see Brand Commitments).
- `assets/_1270101.RW2` — raw photo file, likely source/alternate of the background image; unconverted RAW, needs processing before web use.
- Real copy, workshop/facilitator data, and team info have since been supplied and are live on the site. Anything still missing (e.g. sponsor logos, testimonials) should not be fabricated; use placeholders clearly marked TBD until supplied.

## Product Principles

1. Prospective delegates must be able to quickly understand what FACT is, when/where it happens, and how to register (via `/my-fact`).
2. Honor the Mahiwagahan theme (mystery, magic, wonder) and the confirmed purple/violet palette everywhere; keep the feel vibrant and dynamic, never muted or flat.
3. Inclusivity is core to positioning — copy and imagery should read as welcoming beyond one ethnicity while still centering Filipinx culture and identity.
4. Treat the hero reference screenshot as a committed contract, not a mood board — replicate its structure, type treatment, and mood faithfully.
5. Don't invent sponsor content or other copy that doesn't exist yet, and keep registration rules in the backend rather than the UI — placeholder clearly where content is missing.

## Accessibility & Inclusion

No product-specific accessibility requirement established beyond standard web accessibility practice.
