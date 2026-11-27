import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { access, readdir, readFile } from 'node:fs/promises';
import { immutableAssets } from './asset-cache-plugin.mjs';

test('built case-study entry points identify the shared project before JavaScript runs', async () => {
  execFileSync(process.execPath, ['scripts/generate-artwork.mjs'], { stdio: 'pipe' });
  execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--outDir', 'artifacts/metadata-test'], { stdio: 'pipe' });
  for (const [path, title] of [
    ['work/fairway-finder', 'Fairway Finder case study'],
    ['work/zombies-hub-2', 'Zombies Hub 2.0 case study'],
    ['work/daily-bytes', 'The Daily Bytes case study'],
    ['work/clash-automation', 'Clash of Clans Discord Suite case study'],
    ['work/3d-modding-showcase', 'Forge &amp; Mod: 3D Modding Showcase case study'],
    ['work', 'Work'], ['resume', 'Resume'], ['contact', 'Contact'],
  ]) {
    const html = await readFile(`artifacts/metadata-test/${path}.html`, 'utf8').catch(() => '');
    assert.ok(html.includes(`<title>${title} — Bryen Gatt</title>`), `${path} needs its own built title`);
    assert.ok(html.includes(`rel="canonical" href="https://one2-react-portfolio.onrender.com/${path}"`));
    assert.ok(html.includes(`property="og:url" content="https://one2-react-portfolio.onrender.com/${path}"`));
    assert.ok(html.includes(`property="og:title" content="${title} — Bryen Gatt"`));
    assert.ok(html.includes(`name="twitter:title" content="${title} — Bryen Gatt"`));
    assert.ok(html.includes('property="og:image" content="https://one2-react-portfolio.onrender.com/social-preview.jpg"'), 'share image must be available before JavaScript');
    assert.ok(html.includes('name="twitter:image" content="https://one2-react-portfolio.onrender.com/social-preview.jpg"'));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.match(html, /type="module"[^>]+src="\/assets\//, 'entry keeps compiled application');
  }
  const image = await sharp('artifacts/metadata-test/social-preview.jpg').metadata();
  assert.equal(image.format, 'jpeg');
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
});

// Runs after the build above (node:test runs a file's tests in order).
test('built entry points start their own page, font and opening image downloads early', async () => {
  const out = 'artifacts/metadata-test';
  const built = async (url) => access(`${out}${decodeURI(url)}`).then(() => true, () => false);
  const hrefs = (html, pattern) => [...html.matchAll(pattern)].map((match) => match[1]);

  for (const [file, pageChunk, opening] of [
    ['index.html', null, /bryen-headshot/],
    ['work.html', 'Portfolio', /Zombies%20Hub\.png/],
    ['work/zombies-hub-2.html', 'CaseStudy', /Zombies%20Hub\.png/],
    ['work/fairway-finder.html', 'CaseStudy', /Fairway%20Finder\.png/],
    ['work/daily-bytes.html', 'CaseStudy', /Daily(%20| )Bytes\.png/],
    ['work/clash-automation.html', 'CaseStudy', /Clash%20Suite\.webp/],
    ['work/3d-modding-showcase.html', 'CaseStudy', /3D(%20| )Modding(%20| )Showcase\.webp/],
    ['resume.html', 'Resume', null],
    ['contact.html', 'Contact', null],
  ]) {
    const html = await readFile(`${out}/${file}`, 'utf8');

    const fonts = hrefs(html, /<link rel="preload" href="([^"]+)" as="font" type="font\/woff2" crossorigin/g);
    assert.equal(fonts.length, 1, `${file} preloads the one font every page uses`);
    assert.match(fonts[0], /^\/assets\/inter-latin-wght-normal-[\w-]+\.woff2$/);

    const scripts = hrefs(html, /<link rel="modulepreload" crossorigin href="([^"]+)">/g);
    const styles = hrefs(html, /<link rel="stylesheet" crossorigin href="([^"]+)">/g);
    if (pageChunk) {
      assert.ok(scripts.some((href) => href.startsWith(`/assets/${pageChunk}-`)), `${file} preloads its ${pageChunk} page chunk`);
      assert.ok(styles.some((href) => href.startsWith(`/assets/${pageChunk}-`)), `${file} links its ${pageChunk} page styles`);
    } else {
      assert.deepEqual(scripts.filter((href) => /\/(Portfolio|CaseStudy|Resume|Contact)-/.test(href)), [], `${file} preloads no other page`);
    }
    assert.equal(new Set(scripts).size, scripts.length, `${file} preloads each script once`);

    const images = [...html.matchAll(/<link rel="preload" as="image" href="([^"]+)" imagesrcset="([^"]+)" imagesizes="([^"]+)">/g)];
    assert.equal(images.length, opening ? 1 : 0, `${file} preloads ${opening ? 'its opening image' : 'no image'}`);
    const candidates = images.flatMap(([, href, srcset]) => [href, ...srcset.split(', ').map((candidate) => candidate.replace(/ \d+w$/, ''))]);
    if (opening) {
      assert.match(images[0][1], opening);
      assert.ok(candidates.length > 2, `${file} offers responsive candidates for its opening image`);
    }

    for (const url of [...fonts, ...scripts, ...styles, ...candidates]) assert.ok(await built(url), `${file} points at a built file: ${url}`);
  }

  assert.equal(immutableAssets, 'public, max-age=31536000, immutable', 'the Render preview server caches fingerprinted assets for a year');
  for (const file of await readdir(`${out}/assets`)) {
    assert.match(file, /-[\w-]{8}\.\w+$/, `${file} must be fingerprinted to be cached as immutable`);
  }
});
