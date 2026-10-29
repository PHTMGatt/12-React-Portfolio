import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true }).catch(() =>
  chromium.launch({ headless: true, channel: 'chrome' })
);
const evidence = [];
try {
  for (const deviceScaleFactor of [1, 2, 3]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor });
    const page = await context.newPage();
    const requests = [];
    page.on('response', response => {
      if (response.request().resourceType() === 'image') {
        requests.push(response.body().then(body => ({ url: response.url(), bytes: body.length })));
      }
    });
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    const image = page.locator('.study-tile .project-shot').first();
    await image.evaluate(img => img.decode());
    const selected = await image.evaluate(img => ({ src: img.currentSrc, srcSet: img.srcset }));
    assert(selected.srcSet, 'Work artwork must offer responsive candidates');
    const expectedWidth = { 1: 480, 2: 800, 3: 1280 }[deviceScaleFactor];
    assert.match(selected.src, new RegExp(`-${expectedWidth}-.*\\.webp$`), `appropriate resource for DPR ${deviceScaleFactor}`);
    const images = await Promise.all(requests);
    const bytes = images.reduce((sum, image) => sum + image.bytes, 0);
    assert(bytes < 1_000_000, `initial Work image payload must stay under 1 MB; received ${bytes}`);
    assert(images.every(image => image.url.endsWith('.webp')), 'no original PNG downloads');
    evidence.push({ deviceScaleFactor, bytes, images });
    await context.close();
  }
} finally {
  await browser.close();
}
await fs.mkdir('artifacts', { recursive: true });
await fs.writeFile('artifacts/artwork-delivery.json', JSON.stringify(evidence, null, 2));
console.log(evidence.map(({ deviceScaleFactor, bytes }) => ({ deviceScaleFactor, bytes })));
