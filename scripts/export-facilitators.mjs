// One-time: writes the hardcoded facilitator cards as JSON for the backend's
// import_hardcoded_facilitators command. Node 24 strips the .ts types itself.
// Run: node scripts/export-facilitators.mjs <output.json>
import { writeFileSync } from 'node:fs';
import { FACILITATORS_BY_WORKSHOP_TITLE } from '../src/util/facilitatorPhotos.ts';

const out = Object.entries(FACILITATORS_BY_WORKSHOP_TITLE).map(([title, info]) => ({ title, ...info }));
const target = process.argv[2] ?? 'hardcoded_facilitators.json';
writeFileSync(target, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${out.length} facilitators to ${target}`);
