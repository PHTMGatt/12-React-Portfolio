import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
const origin = 'https://one2-react-portfolio.onrender.com';
const browser = await chromium.launch({ headless: true }).catch(() => chromium.launch({ headless: true, channel: 'chrome' }));
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const [path, title] of [
      ['/work/fairway-finder', 'Fairway Finder case study'],
      ['/work/zombies-hub-2', 'Zombies Hub 2.0 case study'],
      ['/work/clash-automation', 'Clash of Clans Discord Suite case study'],
    ]) {
      const response = await page.goto(`${base}${path}`);
      const raw = await response.text();
      assert.ok(raw.includes(`<title>${title} — Bryen Gatt</title>`), 'crawler receives project title without JS');
      await page.locator('h1').waitFor();
      await page.waitForFunction((url) => document.querySelector('link[rel="canonical"]').href === url, `${origin}${path}`);
      assert.equal(await page.title(), `${title} — Bryen Gatt`);
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), `${origin}${path}`);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow');
      assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), await page.locator('meta[property="og:description"]').getAttribute('content'));
      await page.getByRole('link', { name: 'All work', exact: true }).click();
      await page.waitForFunction(() => document.title === 'Work — Bryen Gatt');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${origin}/work`);
      await page.goBack();
      await page.waitForFunction((expected) => document.title === expected, `${title} — Bryen Gatt`);
    }
    await page.goto(`${base}/work?type=automation`);
    await page.waitForFunction(() => document.title === 'Work — Bryen Gatt');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${origin}/work`);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow');
    await page.goto(`${base}/does-not-exist`);
    await page.waitForFunction(() => document.title === 'Page not found — Bryen Gatt');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), null);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    await page.getByRole('link', { name: 'Back home' }).click();
    await page.waitForFunction(() => document.title === 'Bryen Gatt — Full-Stack Developer');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${origin}/`);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow');
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('Route metadata: raw HTTP, client navigation, history, filters, robots directives, and missing-page recovery pass at 1440px and 390px.');
} finally {
  await browser.close();
}
