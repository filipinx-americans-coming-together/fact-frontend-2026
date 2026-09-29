This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About this repo

Public website and registration frontend for FACT 2026 (Filipinx Americans Coming Together), deployed on Vercel. It talks to the Django backend in the separate `fact-website-backend` repo (deployed on DigitalOcean App Platform). This repo supersedes the 2025 frontend (`fact-website-frontend`).

Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 4 plus the global stylesheets in `src/styles/`, MUI, TanStack Query, Vitest.

Layout of `src/app/`:

- `(live)/` — public pages: home, about, agenda, workshops, team, past-facts, variety-show, palengke, faq, donate.
- `my-fact/` — delegate account and registration flow (create-account, login, register, dashboard, workshops, profile, password reset).
- `facilitators/` — facilitator account set-up and dashboard.
- `admin/` — FACT admin tools (dashboard, bulk uploads for locations/workshops/schools/agenda, accounts/admin promotion, day-of registration, facilitator accounts).
- `registration-closed/`, `registration-maintenance/` — fallback pages used by `src/middleware.ts`.

API hooks live in `src/hooks/api/` (and `src/app/admin/hooks/`); authenticated requests go through `src/util/fetchWithCredentials.ts`, which attaches the CSRF token. Design system and product notes are in `DESIGN.md` and `PRODUCT.md`.

### Environment variables

- `NEXT_PUBLIC_API_URL` — backend base URL (defaults to `http://localhost:8000`). Baked in at build time; see `CLAUDE.md`.
- `BLOB_READ_WRITE_TOKEN` — only needed by `scripts/upload-team-photos.mjs` (uploads photos to Vercel Blob).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. For registration/login to work locally, also run the backend at `localhost:8000`.

You can start editing the page by modifying `src/app/(live)/page.tsx`. The page auto-updates as you edit the file.

Fonts are self-hosted (Jost and Fraunces, via `@font-face` in `src/styles/live-fonts.css`), not loaded through `next/font`.

Other scripts: `npm run build`, `npm run lint`, `npm test` (Vitest).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

This repo deploys through Vercel's Git integration (there is no GitHub Actions workflow here), so `next build` is the only check before a deploy.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
