// Attributes every byte of a built chunk to its source module using the
// sourcemap, then groups by npm package or src/ folder.
// Usage: npm run build -- --sourcemap && node scripts/bundle-report.mjs [chunk-prefix] [package-to-expand]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const prefix = process.argv[2] || 'index-';
const expand = process.argv[3];
const dir = 'dist/assets';
const file = fs.readdirSync(dir).find((f) => f.startsWith(prefix) && f.endsWith('.js'));
if (!file || !fs.existsSync(path.join(dir, `${file}.map`))) {
  console.error(`No ${prefix}*.js with a .map in ${dir}. Build with --sourcemap first.`);
  process.exit(1);
}
const code = fs.readFileSync(path.join(dir, file), 'utf8');
const map = JSON.parse(fs.readFileSync(path.join(dir, `${file}.map`), 'utf8'));

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const decode = (str) => {
  const out = [];
  let value = 0;
  let shift = 0;
  for (const ch of str) {
    const digit = B64.indexOf(ch);
    value += (digit & 31) << shift;
    if (digit & 32) shift += 5;
    else {
      out.push(value & 1 ? -(value >>> 1) : value >>> 1);
      value = 0;
      shift = 0;
    }
  }
  return out;
};

const group = (source) => {
  const s = source.replace(/\\/g, '/');
  const nm = s.lastIndexOf('node_modules/');
  if (nm !== -1) {
    const parts = s.slice(nm + 13).split('/');
    const pkg = parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];
    return pkg === expand ? s.slice(nm + 13) : pkg;
  }
  const src = s.indexOf('src/');
  return src !== -1 ? s.slice(src).split('/').slice(0, 3).join('/') : s;
};

const lines = code.split('\n');
const slices = new Map();
let sourceIndex = 0;
map.mappings.split(';').forEach((lineMap, lineNo) => {
  const line = lines[lineNo] ?? '';
  let col = 0;
  const segs = [];
  for (const seg of lineMap.split(',')) {
    if (!seg) continue;
    const v = decode(seg);
    col += v[0];
    if (v.length > 1) sourceIndex += v[1];
    segs.push({ col, src: v.length > 1 ? sourceIndex : -1 });
  }
  segs.forEach((s, i) => {
    const end = i + 1 < segs.length ? segs[i + 1].col : line.length;
    const key = s.src === -1 ? '(unmapped)' : group(map.sources[s.src]);
    slices.set(key, (slices.get(key) || '') + line.slice(s.col, end));
  });
});

const rows = [...slices].map(([key, text]) => ({ key, raw: text.length, gz: zlib.gzipSync(text).length }));
rows.sort((a, b) => b.raw - a.raw);
const kb = (n) => (n / 1024).toFixed(1).padStart(7);
console.log(`${file}: ${kb(code.length)} kB raw, ${kb(zlib.gzipSync(code).length)} kB gz (whole file)`);
console.log('   raw kB   gz kB*  module');
for (const r of rows.slice(0, 25)) console.log(`${kb(r.raw)} ${kb(r.gz)}  ${r.key}`);
console.log('* per-group gzip is standalone, so it overstates each group a little.');
