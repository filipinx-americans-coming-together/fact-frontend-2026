# Graph Report - fact-frontend-2026  (2026-09-27)

## Corpus Check
- 185 files · ~141,306 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 628 nodes · 1574 edges · 48 communities (25 shown, 23 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `705a2760`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- fetchWithCredentials
- LoadingCircle.tsx
- SiteHeader.tsx
- UserAgenda.tsx
- register/page.tsx
- dependencies
- components/NotificationManager.tsx
- devDependencies
- gallery/page.tsx
- compilerOptions
- WorkshopSelect.tsx
- navigation/Navbar.tsx
- app/layout.tsx
- Stats.tsx
- AgendaList.tsx
- server.js
- CountdownTimer.tsx
- FACT 2026 Brand Commitments (palette, wordmark, motifs)
- postcss.config.mjs
- upload-workshop-photos.mjs
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
- Product Principle: delegates must understand what/when/how to register
- FACT (Filipinx Americans Coming Together) Conference
- Mahiwagahan: Enchanting Our Bright Minds (2026 Theme)
- Partner-Built Registration Portal (My FACT)
- DangerZone.tsx
- README.md
- usePromoteAdminStatus.ts

## God Nodes (most connected - your core abstractions)
1. `fetchWithCredentials()` - 67 edges
2. `API_URL` - 56 edges
3. `LoadingCircle()` - 28 edges
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
- `WorkshopSelectProps` --references--> `RegistrationData`  [EXTRACTED]
  src/components/ui/WorkshopSelect.tsx → src/util/types.tsx
- `Workshops Search Structural Rework (9 to 80 sessions)` --references--> `Static HTML/CSS/JS Stack Decision`  [EXTRACTED]
  DESIGN.md → PRODUCT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Site-Wide aria-disabled CTA Pattern (Login/Donate/Register/View Booklet)** — src_app_live_about_page, src_app_live_faq_page, src_app_live_team_page, src_app_live_past_facts_page [EXTRACTED 1.00]
- **Shared Night-Day-Night Page Template Family** — src_app_live_about_page, src_app_live_faq_page, src_app_live_team_page, src_app_live_past_facts_page, design_night_day_night_rhythm [EXTRACTED 1.00]

## Communities (48 total, 23 thin omitted)

### Community 0 - "fetchWithCredentials"
Cohesion: 0.07
Nodes (51): AdminResetConfirm(), fetchApproveSchool(), AgendaItemProps, fetchCreateAgendaItem(), useCreateAgendaItem(), fetchCreateLocation(), LocationProps, fetchCreateNotification() (+43 more)

### Community 1 - "LoadingCircle.tsx"
Cohesion: 0.09
Nodes (45): Accounts(), Agenda(), AddLocationForm(), Button(), DeleteLocationForm(), NumberObject, FormContainer(), FormProps (+37 more)

### Community 2 - "SiteHeader.tsx"
Cohesion: 0.06
Nodes (32): AboutPage(), metadata, DAYS, metadata, DonatePage(), TIER_COLORS, TOP_DONORS, CATEGORIES (+24 more)

### Community 3 - "UserAgenda.tsx"
Cohesion: 0.13
Nodes (16): WorkshopInfo(), extractWorkshopId(), Facilitator, ModalProps, WorkshopDetailContent(), AgendaWorkshop, DATE_OPTIONS, FormattedData (+8 more)

### Community 4 - "register/page.tsx"
Cohesion: 0.06
Nodes (60): NewAccountData, FacilitatorAccountSetUp(), SetUpData, CreateAccount(), Dashboard(), ForgotPassword(), Login(), Profile() (+52 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (44): @emotion/react, @emotion/styled, jspdf, micromatch, @mui/material, @mui/x-charts, dependencies, @emotion/react (+36 more)

### Community 6 - "components/NotificationManager.tsx"
Cohesion: 0.12
Nodes (15): DateTimeInput(), NotificationCard(), NotificationManager(), useCreateNotification(), fetchDeleteNotification(), useDeleteNotification(), Home(), Notification() (+7 more)

### Community 7 - "devDependencies"
Cohesion: 0.05
Nodes (41): autoprefixer, depcheck, eslint, eslint-config-next, jest-mock, jsdom, devDependencies, autoprefixer (+33 more)

### Community 9 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 10 - "WorkshopSelect.tsx"
Cohesion: 0.11
Nodes (25): getLocationByID(), UpdateLocationForm(), useUpdateLocation(), FacilitatorRegistration(), SESSION_NUMBERS, FacilitatorRow(), SESSION_NUMBERS, FacilitatorDashboard() (+17 more)

### Community 11 - "navigation/Navbar.tsx"
Cohesion: 0.15
Nodes (10): Refund(), PageContainerProps, Footer(), PageHeader(), PageHeaderProps, DesktopNav(), MobileNav(), iconList (+2 more)

### Community 12 - "app/layout.tsx"
Cohesion: 0.33
Nodes (4): metadata, LiveSiteInteractions(), QueryProviderWrapper(), initLiveSiteInteractions()

### Community 13 - "Stats.tsx"
Cohesion: 0.39
Nodes (5): RegistrationChart(), Stats(), fetchRegistrationSummary(), RegistrationSummaryData, useRegistrationSummary()

### Community 14 - "AgendaList.tsx"
Cohesion: 0.43
Nodes (5): addLeadingZero(), AgendaItemCard(), AgendaList(), fetchDeleteAgendaItem(), useDeleteAgendaItem()

### Community 15 - "server.js"
Cohesion: 0.40
Nodes (4): app, handle, options, port

### Community 16 - "CountdownTimer.tsx"
Cohesion: 0.40
Nodes (3): CountdownTimeLeft, CountdownTimerProps, INIT_TIME

### Community 17 - "FACT 2026 Brand Commitments (palette, wordmark, motifs)"
Cohesion: 0.67
Nodes (3): FACT 2026 Color Tokens (ink-900, violet-800, orchid-400, cream-100), The Almanac Held to Candlelight (Creative North Star), FACT 2026 Brand Commitments (palette, wordmark, motifs)

### Community 45 - "DangerZone.tsx"
Cohesion: 0.43
Nodes (5): DangerZone(), DangerZoneAction(), useUpdateFlag(), fetchRegistrationFlag(), useRegistrationFlag()

### Community 46 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 47 - "usePromoteAdminStatus.ts"
Cohesion: 0.67
Nodes (3): PromoteConfirm(), fetchPromoteAdminStatus(), usePromoteAdminStatus()

## Knowledge Gaps
- **161 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+156 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `API_URL` connect `fetchWithCredentials` to `LoadingCircle.tsx`, `UserAgenda.tsx`, `register/page.tsx`, `components/NotificationManager.tsx`, `WorkshopSelect.tsx`, `Stats.tsx`, `AgendaList.tsx`, `usePromoteAdminStatus.ts`, `DangerZone.tsx`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `fetchWithCredentials()` connect `fetchWithCredentials` to `LoadingCircle.tsx`, `register/page.tsx`, `components/NotificationManager.tsx`, `WorkshopSelect.tsx`, `AgendaList.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `SiteHeader()` connect `SiteHeader.tsx` to `WorkshopSelect.tsx`, `register/page.tsx`, `components/NotificationManager.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _161 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `fetchWithCredentials` be split into smaller, more focused modules?**
  _Cohesion score 0.06923282544774124 - nodes in this community are weakly interconnected._
- **Should `LoadingCircle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0875 - nodes in this community are weakly interconnected._
- **Should `SiteHeader.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.060109289617486336 - nodes in this community are weakly interconnected._