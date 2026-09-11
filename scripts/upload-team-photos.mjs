import { put } from '@vercel/blob';
import { readFile, readdir, writeFile } from 'fs/promises';

const dir = 'public/images/team';
const urlMap = {};

for (const file of (await readdir(dir)).sort()) {
  if (!file.endsWith('.jpg')) continue;
  const buf = await readFile(`${dir}/${file}`);
  const { url } = await put(`team/${file}`, buf, {
    access: 'public',
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  urlMap[file] = url;
  console.log(file, '->', url);
}

await writeFile('scripts/team-photo-urls.json', JSON.stringify(urlMap, null, 2));
console.log(`\nWrote ${Object.keys(urlMap).length} URLs to scripts/team-photo-urls.json`);
