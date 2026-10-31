import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

test('built case-study entry points identify the shared project before JavaScript runs', async () => {
  execFileSync(process.execPath, ['scripts/generate-artwork.mjs'], { stdio: 'pipe' });
  execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--outDir', 'artifacts/metadata-test'], { stdio: 'pipe' });
  for (const [path, title] of [
    ['work/fairway-finder', 'Fairway Finder case study'],
    ['work/zombies-hub-2', 'Zombies Hub 2.0 case study'],
    ['work/clash-automation', 'Clash of Clans Discord Suite case study'],
    ['work', 'Work'], ['resume', 'Resume'], ['contact', 'Contact'],
  ]) {
    const html = await readFile(`artifacts/metadata-test/${path}.html`, 'utf8').catch(() => '');
    assert.ok(html.includes(`<title>${title} — Bryen Gatt</title>`), `${path} needs its own built title`);
    assert.ok(html.includes(`rel="canonical" href="https://one2-react-portfolio.onrender.com/${path}"`));
    assert.ok(html.includes(`property="og:url" content="https://one2-react-portfolio.onrender.com/${path}"`));
    assert.ok(html.includes(`property="og:title" content="${title} — Bryen Gatt"`));
    assert.ok(html.includes(`name="twitter:title" content="${title} — Bryen Gatt"`));
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.match(html, /type="module"[^>]+src="\/assets\//, 'entry keeps compiled application');
  }
});
