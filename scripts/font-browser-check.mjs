import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true }).catch(() => chromium.launch({ headless: true, channel: 'chrome' }));
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const external = [];
    await context.route('**/*', (route) => {
      if (new URL(route.request().url()).origin === new URL(base).origin) return route.continue();
      external.push(route.request().url());
      return route.abort();
    });
    const page = await context.newPage();
    await page.goto(base);
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    const loaded = await page.evaluate(async () => {
      const body = await document.fonts.load('400 16px Inter');
      const heading = await document.fonts.load('750 32px Inter');
      const quote = await document.fonts.load('italic 500 20px "Cormorant Garamond"');
      return [body, heading, quote].map((faces) => faces.length > 0 && faces.every((face) => face.status === 'loaded'));
    });
    assert.deepEqual(loaded, [true, true, true], 'intended fonts decode with all external requests blocked');
    assert.deepEqual(external, [], 'rendering needs no third-party stylesheet or font requests');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'loaded fonts do not cause horizontal overflow');
    await context.close();
  }
  console.log('Inter body/headings and Cormorant italic load from the site at desktop/mobile widths, with all external requests blocked.');
} finally {
  await browser.close();
}
