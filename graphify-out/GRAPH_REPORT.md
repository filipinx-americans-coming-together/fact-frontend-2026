# Graph Report - fact2026-local  (2026-09-27)

## Corpus Check
- 184 files · ~2,470,432 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 625 nodes · 1572 edges · 69 communities (29 shown, 40 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `803e9d1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- fetchWithCredentials
- admin/agenda/page.tsx
- SiteHeader.tsx
- API_URL
- register/page.tsx
- dependencies
- my-fact/dashboard/page.tsx
- devDependencies
- promote-confirm/[token]/page.tsx
- compilerOptions
- scripts
- navigation/Navbar.tsx
- app/layout.tsx
- package.json
- WorkshopSelect.tsx
- server.js
- CountdownTimer.tsx
- FACT 2026 Brand Commitments (palette, wordmark, motifs)
- postcss.config.mjs
- depcheck
- TicketsChart.tsx
- FacilitatorAssistant.tsx
- BackgroundImage.tsx
- FAQSection.tsx
- Disclosed Placeholder Content Practice
- Workshops Search Structural Rework (9 to 80 sessions)
- next.config.mjs
- upload-team-photos.mjs
- Graphify Knowledge Graph Workflow Rules
- .groupheading Class (documented duplication of .faq__categoryheading)
- The Hairline-Only Structure Rule
- Night-Day-Night Band Template Structure
- The No-Card Rule
- .pill--ink Component (day-band interactive pill)
- Radial-Gradient Placeholder Circle Device
- The Two-Ink Rule
- eslint
- Product Principle: delegates must understand what/when/how to register
- FACT (Filipinx Americans Coming Together) Conference
- Mahiwagahan: Enchanting Our Bright Minds (2026 Theme)
- Partner-Built Registration Portal (My FACT)
- SiteFooter
- README.md
- jest-mock
- jsdom
- tailwindcss
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/node
- @types/react
- typescript
- @vitejs/plugin-react
- vitest
- @vitest/ui
- SiteFooter.tsx
- AgendaList.tsx
- workshops/[slug]/page.tsx
- PageContainer.tsx
- gallery/page.tsx
- donate/page.tsx
- about/page.tsx
- faq/page.tsx
- not-found.tsx
- postcss

## God Nodes (most connected - your core abstractions)
1. `fetchWithCredentials()` - 67 edges
2. `API_URL` - 56 edges
3. `LoadingCircle()` - 27 edges
4. `parseApiResponse()` - 21 edges
5. `useAdminUser()` - 20 edges
6. `TextInput()` - 18 edges
7. `RegPageContainer()` - 17 edges
8. `SiteHeader()` - 16 edges
9. `useWorkshops()` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Disclosed Placeholder Content Practice` --semantically_similar_to--> `Product Principle: don't invent registration/sponsor/donation content that doesn't exist yet`  [INFERRED] [semantically similar]
  DESIGN.md → PRODUCT.md
- `The Almanac Held to Candlelight (Creative North Star)` --references--> `FACT 2026 Brand Commitments (palette, wordmark, motifs)`  [INFERRED]
  DESIGN.md → PRODUCT.md
- `FACT 2026 Color Tokens (ink-900, violet-800, orchid-400, cream-100)` --shares_data_with--> `FACT 2026 Brand Commitments (palette, wordmark, motifs)`  [INFERRED]
  DESIGN.md → PRODUCT.md
- `RegistrationChart()` --references--> `react`  [EXTRACTED]
  src/app/admin/components/charts/RegistrationChart.tsx → package.json
- `Workshops Search Structural Rework (9 to 80 sessions)` --references--> `Static HTML/CSS/JS Stack Decision`  [EXTRACTED]
  DESIGN.md → PRODUCT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Site-Wide aria-disabled CTA Pattern (Login/Donate/Register/View Booklet)** — src_app_live_about_page, src_app_live_faq_page, src_app_live_team_page, src_app_live_past_facts_page [EXTRACTED 1.00]
- **Shared Night-Day-Night Page Template Family** — src_app_live_about_page, src_app_live_faq_page, src_app_live_team_page, src_app_live_past_facts_page, design_night_day_night_rhythm [EXTRACTED 1.00]

## Communities (69 total, 40 thin omitted)

### Community 0 - "fetchWithCredentials"
Cohesion: 0.07
Nodes (42): AdminResetConfirm(), fetchApproveSchool(), useApproveSchool(), AgendaItemProps, fetchCreateAgendaItem(), useCreateAgendaItem(), DayOfDelegateProps, fetchCreateDayOfDelegate() (+34 more)

### Community 1 - "admin/agenda/page.tsx"
Cohesion: 0.16
Nodes (24): Accounts(), Agenda(), Button(), DeleteLocationForm(), NumberObject, FormContainer(), FormProps, LINKS (+16 more)

### Community 2 - "SiteHeader.tsx"
Cohesion: 0.17
Nodes (9): ENTRIES, metadata, GROUPS, Member, metadata, PhotoPlaceholderIcon(), NavActive, SiteHeader() (+1 more)

### Community 3 - "API_URL"
Cohesion: 0.06
Nodes (53): AddLocationForm(), fetchCreateLocation(), LocationProps, useCreateLocation(), fetchNewSchools(), useNewSchools(), fetchUploadAgendaItems(), useUploadAgendaItems() (+45 more)

### Community 4 - "register/page.tsx"
Cohesion: 0.07
Nodes (59): getLocationByID(), UpdateLocationForm(), SetUpData, CreateAccount(), ForgotPassword(), Login(), Profile(), performerOptions (+51 more)

### Community 5 - "dependencies"
Cohesion: 0.05
Nodes (38): @emotion/react, @emotion/styled, jspdf, micromatch, @mui/material, @mui/x-charts, next, dependencies (+30 more)

### Community 6 - "my-fact/dashboard/page.tsx"
Cohesion: 0.07
Nodes (28): DangerZone(), DangerZoneAction(), DateTimeInput(), NotificationCard(), NotificationManager(), fetchCreateNotification(), useCreateNotification(), fetchDeleteNotification() (+20 more)

### Community 7 - "devDependencies"
Cohesion: 0.18
Nodes (11): autoprefixer, eslint-config-next, devDependencies, autoprefixer, eslint-config-next, @tailwindcss/postcss, @testing-library/dom, @types/react-dom (+3 more)

### Community 8 - "promote-confirm/[token]/page.tsx"
Cohesion: 0.39
Nodes (6): NewAccountData, PromoteConfirm(), fetchConfirmAdminPromotion(), useConfirmAdminPromotion(), fetchPromoteAdminStatus(), usePromoteAdminStatus()

### Community 9 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 10 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, dev:https, lint, start, test, test:ui

### Community 11 - "navigation/Navbar.tsx"
Cohesion: 0.22
Nodes (7): Refund(), RegistrationClosed(), DesktopNav(), MobileNav(), iconList, NAV_LINKS, Navbar()

### Community 12 - "app/layout.tsx"
Cohesion: 0.33
Nodes (4): metadata, LiveSiteInteractions(), QueryProviderWrapper(), initLiveSiteInteractions()

### Community 13 - "package.json"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 14 - "WorkshopSelect.tsx"
Cohesion: 0.23
Nodes (10): SESSION_NUMBERS, FacilitatorRow(), SESSION_NUMBERS, InteractiveButton(), InteractiveButtonProps, session_labels, WorkshopSelect(), fetchRegisterFacilitator() (+2 more)

### Community 15 - "server.js"
Cohesion: 0.40
Nodes (4): app, handle, options, port

### Community 16 - "CountdownTimer.tsx"
Cohesion: 0.40
Nodes (3): CountdownTimeLeft, CountdownTimerProps, INIT_TIME

### Community 17 - "FACT 2026 Brand Commitments (palette, wordmark, motifs)"
Cohesion: 0.67
Nodes (3): FACT 2026 Color Tokens (ink-900, violet-800, orchid-400, cream-100), The Almanac Held to Candlelight (Creative North Star), FACT 2026 Brand Commitments (palette, wordmark, motifs)

### Community 45 - "SiteFooter"
Cohesion: 0.20
Nodes (5): DAYS, metadata, ACTS, SiteFooter(), { mockUsePathname }

### Community 46 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 59 - "SiteFooter.tsx"
Cohesion: 0.33
Nodes (4): GROUPS, metadata, InstagramIcon(), VendorLogoIcon()

### Community 60 - "AgendaList.tsx"
Cohesion: 0.43
Nodes (5): addLeadingZero(), AgendaItemCard(), AgendaList(), fetchDeleteAgendaItem(), useDeleteAgendaItem()

### Community 61 - "workshops/[slug]/page.tsx"
Cohesion: 0.29
Nodes (4): extractWorkshopId(), Facilitator, ModalProps, WorkshopDetailContent()

### Community 62 - "PageContainer.tsx"
Cohesion: 0.32
Nodes (4): PageContainerProps, Footer(), PageHeader(), PageHeaderProps

### Community 64 - "donate/page.tsx"
Cohesion: 0.50
Nodes (3): DonatePage(), TIER_COLORS, TOP_DONORS

## Knowledge Gaps
- **161 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+156 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _161 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `fetchWithCredentials` be split into smaller, more focused modules?**
  _Cohesion score 0.06838106370543542 - nodes in this community are weakly interconnected._
- **Should `API_URL` be split into smaller, more focused modules?**
  _Cohesion score 0.06442058496853018 - nodes in this community are weakly interconnected._
- **Should `register/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06688963210702341 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05365853658536585 - nodes in this community are weakly interconnected._
- **Should `my-fact/dashboard/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07372549019607844 - nodes in this community are weakly interconnected._