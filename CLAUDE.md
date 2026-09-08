## CSS gotcha: unlayered global styles beat Tailwind utilities

`src/styles/live-base.css` and `live-sections.css` are imported directly (not inside any `@layer`). Any bare selector there — e.g. `a { color: inherit }`, `.pill { position: relative }` — silently wins over ALL Tailwind utility classes regardless of specificity or source order, because unlayered CSS always beats layered CSS per the Cascade Layers spec. Caused real bugs: dark text on dark buttons, `position: fixed` silently not applying. Wrap any new global reset/base rule in `@layer base { ... }` to avoid this.

- `NEXT_PUBLIC_*` env vars are baked in at Vercel **build** time — changing one in the dashboard does nothing until the next build (with cache disabled, since a cached build can skip picking it up).
- `TextInput`'s `showCharacters` prop toggles text-vs-password input type, not a character counter — the counter is `showMaxLength`. Easy to confuse; caused a real "counter never showed" bug.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
