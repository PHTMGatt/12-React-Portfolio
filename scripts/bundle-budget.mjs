// Fails the build check when the entry chunk grows past its gzip budget.
// Usage: npm run build && npm run check:bundle
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const BUDGET_KB = 100;
// Resolve dist/ from the repo root, not the caller's working directory.
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const dir = path.join(dist, 'assets');
const indexHtml = path.join(dist, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('dist/index.html is missing. Run npm run build first.');
  process.exit(1);
}
const html = fs.readFileSync(indexHtml, 'utf8');
const entry = html.match(/<script type="module" crossorigin src="\/?assets\/([^"]+\.js)"/)?.[1];
if (!entry) {
  console.error('Could not find the entry script in dist/index.html. Run npm run build first.');
  process.exit(1);
}
const gz = zlib.gzipSync(fs.readFileSync(path.join(dir, entry))).length / 1000;
const line = `${entry}: ${gz.toFixed(2)} kB gz (budget ${BUDGET_KB} kB)`;
if (gz > BUDGET_KB) {
  console.error(`Over budget. ${line}`);
  process.exit(1);
}
console.log(`Within budget. ${line}`);
