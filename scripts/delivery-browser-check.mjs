import { assertPortfolioTarget } from './target-check.mjs';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

// Delivery checks against a running preview build: the preloads each entry
// point declares are the files the page really uses, opening images are not
// lazy, fingerprinted assets are cached long-term and HTML is not.
const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
await assertPortfolioTarget(base);
const browser = await chromium.launch({ headless: true }).catch(() => chromium.launch({ headless: true, channel: 'chrome' }));

// The image each route opens with, and whether it must load eagerly.
const routes = [
  ['/', '.hero__portrait img'],
  ['/work', '.study-tile .project-shot'],
  ['/work/zombies-hub-2', '.case-study__hero .project-shot'],
  ['/work/fairway-finder', '.case-study__hero .project-shot'],
  ['/work/mithrandir', '.case-study__hero .project-shot'],
  ['/work/clash-automation', '.case-study__hero .project-shot'],
  ['/resume', null],
  ['/contact', null],
];
const screens = [
  { width: 1440, height: 900, deviceScaleFactor: 1 },
  { width: 1440, height: 900, deviceScaleFactor: 2 },
  { width: 390, height: 844, deviceScaleFactor: 2 },
  { width: 390, height: 844, deviceScaleFactor: 3 },
  { width: 844, height: 390, deviceScaleFactor: 3 },
];
let checks = 0;

try {
  for (const screen of screens) {
    const context = await browser.newContext({ viewport: { width: screen.width, height: screen.height }, deviceScaleFactor: screen.deviceScaleFactor });
    const page = await context.newPage();
    for (const [route, selector] of routes) {
      const where = `${route} at ${screen.width}x${screen.height} @${screen.deviceScaleFactor}x`;
      const requested = [];
      const onRequest = (request) => requested.push(request.url());
      page.on('request', onRequest);
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      page.off('request', onRequest);
      const count = (url) => requested.filter((item) => item === url).length;

      assert.doesNotMatch(response.headers()['cache-control'] ?? '', /immutable|max-age=[1-9]/, `HTML must not be cached long-term: ${where}`);

      // Every script and stylesheet the entry point names is used by this page.
      const hinted = await page.evaluate(() =>
        [...document.querySelectorAll('link[rel="modulepreload"], link[rel="stylesheet"], link[rel="preload"][as="font"]')].map((link) => link.href)
      );
      assert.ok(hinted.some((url) => /inter-latin-wght-normal-[\w-]+\.woff2$/.test(url)), `font preload present: ${where}`);
      for (const url of hinted) assert.equal(count(url), 1, `hinted file is fetched exactly once: ${url} on ${where}`);
      assert.ok(await page.evaluate(() => document.fonts.check('16px Inter')), `preloaded font is the one in use: ${where}`);

      // The preloaded opening image is the candidate the page renders.
      const preloads = await page.locator('link[rel="preload"][as="image"]').count();
      assert.equal(preloads, selector ? 1 : 0, `image preload count: ${where}`);
      if (selector) {
        const image = page.locator(selector).first();
        await image.evaluate((img) => img.decode());
        const shown = await image.evaluate((img) => ({ src: img.currentSrc, loading: img.loading }));
        assert.notEqual(shown.loading, 'lazy', `opening image is not lazy: ${where}`);
        assert.equal(count(shown.src), 1, `opening image is fetched exactly once: ${where}`);
        // No second candidate of the same artwork (a mismatched preload would fetch one).
        const artwork = decodeURI(shown.src).replace(/^.*\/assets\//, '').replace(/-\d+-[\w-]{8}\.webp$|-[\w-]{8}\.webp$/, '');
        const sameArtwork = [...new Set(requested.filter((url) => decodeURI(url).includes(`/assets/${artwork}`) && /\.webp$/.test(url)))];
        if (route !== '/work') assert.deepEqual(sameArtwork, [shown.src], `one candidate per opening image: ${where}`);
      }
      checks++;
    }
    await context.close();
  }

  // Fingerprinted assets are cached for a year; the app shell for a missing one is not.
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const assets = await page.evaluate(() => performance.getEntriesByType('resource').map((entry) => entry.name).filter((url) => url.includes('/assets/')));
  assert.ok(assets.length >= 4, 'home page loads fingerprinted assets');
  for (const url of assets) {
    const headers = (await context.request.get(url)).headers();
    assert.equal(headers['cache-control'], 'public, max-age=31536000, immutable', `long-lived cache for ${url}`);
  }
  const missing = await context.request.get(`${base}/assets/not-a-real-file-00000000.js`);
  assert.doesNotMatch(missing.headers()['cache-control'] ?? '', /immutable/, 'a missing asset is never cached as immutable');
  await context.close();

  console.log(`Delivery: ${checks} route/screen checks. Preloads match what each page uses, opening images are eager, assets are immutable, HTML is not.`);
} finally {
  await browser.close();
}
