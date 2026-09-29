## CSS gotcha: unlayered global styles beat Tailwind utilities

`src/styles/live-base.css` and `live-sections.css` are imported directly (not inside any `@layer`). Any bare selector there — e.g. `a { color: inherit }`, `.pill { position: relative }` — silently wins over ALL Tailwind utility classes regardless of specificity or source order, because unlayered CSS always beats layered CSS per the Cascade Layers spec. Caused real bugs: dark text on dark buttons, `position: fixed` silently not applying. Wrap any new global reset/base rule in `@layer base { ... }` to avoid this.

- `NEXT_PUBLIC_*` env vars are baked in at Vercel **build** time — changing one in the dashboard does nothing until the next build (with cache disabled, since a cached build can skip picking it up).
- `TextInput`'s `showCharacters` prop toggles text-vs-password input type, not a character counter — the counter is `showMaxLength`. Easy to confuse; caused a real "counter never showed" bug.

## graphify

A combined knowledge graph of this repo and the backend (`fact-website-backend`) lives in the parent folder: `../graphify-out/` (not in this repo). It has god nodes, community structure, and cross-file and frontend-to-backend relationships.

Rules:
- For codebase questions, run graphify from the parent folder when `../graphify-out/graph.json` exists: `graphify query "<question>"`, `graphify path "<A>" "<B>"` for relationships, `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Read `../graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain do not surface enough context.
- The graph covers only this repo and the backend (code and docs; no images or PDFs). After modifying code, refresh it from the parent folder with `graphify update` (AST-only, no API cost).
