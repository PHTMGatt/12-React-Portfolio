import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.argv[2] || process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true }).catch(() =>
  chromium.launch({ headless: true, channel: 'chrome' })
);

await fs.mkdir('artifacts/screenshots', { recursive: true });

const assertDecodedImage = async (page, image, label) => {
  await image.scrollIntoViewIfNeeded();
  await image.waitFor({ state: 'visible' });
  const handle = await image.elementHandle();
  assert(handle, `${label} should have an image element`);

  await page.waitForFunction(
    (img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0,
    handle,
    { timeout: 10000 }
  );

  const metrics = await image.evaluate((img) => {
    const rect = img.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 36;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let minLuma = 255;
    let maxLuma = 0;
    let sum = 0;
    let sumSq = 0;
    let count = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      const luma = pixels[index] * 0.2126 + pixels[index + 1] * 0.7152 + pixels[index + 2] * 0.0722;
      minLuma = Math.min(minLuma, luma);
      maxLuma = Math.max(maxLuma, luma);
      sum += luma;
      sumSq += luma * luma;
      count += 1;
    }
    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    return {
      src: img.currentSrc || img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: rect.width,
      renderedHeight: rect.height,
      lumaRange: maxLuma - minLuma,
      lumaStdDev: Math.sqrt(Math.max(variance, 0)),
    };
  });

  assert(metrics.naturalWidth > 0, `${label} should decode pixels`);
  assert(metrics.naturalHeight > 0, `${label} should decode pixels`);
  assert(metrics.renderedWidth > 0, `${label} should occupy visible width`);
  assert(metrics.renderedHeight > 0, `${label} should occupy visible height`);
  assert(metrics.lumaRange > 20, `${label} should contain visible image detail, not a flat panel`);
  assert(metrics.lumaStdDev > 5, `${label} should contain meaningful pixel variation`);
  return metrics;
};

const evidence = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    });
    await context.addInitScript(() => localStorage.setItem('theme', 'dark'));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    const cards = page.locator('.work-grid:not(.archive__grid) .project-card');
    const cardCount = await cards.count();
    assert(cardCount > 0, 'Work page should contain active project cards');

    const cardResults = [];
    for (let index = 0; index < cardCount; index += 1) {
      const card = cards.nth(index);
      const title = (await card.locator('.project-card__title').textContent())?.trim() || `project ${index + 1}`;
      await card.scrollIntoViewIfNeeded();
      assert.equal(await card.locator('.project-fallback').count(), 0, `${title} must not render a fallback panel`);
      assert.equal(await card.locator('.project-shot').count(), 1, `${title} must render exactly one project image`);
      const metrics = await assertDecodedImage(page, card.locator('.project-shot'), `${title} card artwork`);
      cardResults.push({ title, ...metrics });
    }

    const caseStudyLinks = await page.locator('.project-card__study').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))]
    );
    assert(caseStudyLinks.length > 0, 'Work page should expose case-study links');

    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    for (let index = 0; index < cardCount; index += 1) {
      const card = page.locator('.work-grid:not(.archive__grid) .project-card').nth(index);
      const title = (await card.locator('.project-card__title').textContent())?.trim() || `project ${index + 1}`;
      await assertDecodedImage(page, card.locator('.project-shot'), `${title} card artwork screenshot gate`);
    }
    await page.screenshot({
      path: `artifacts/screenshots/${viewport.name}-dark-work-all-artwork.png`,
      fullPage: true,
    });

    const caseStudyResults = [];
    for (const href of caseStudyLinks) {
      await page.goto(`${base}${href}`, { waitUntil: 'networkidle' });
      const title = (await page.locator('h1').first().textContent())?.trim() || href;
      const hero = page.locator('.case-study__hero');
      assert.equal(await hero.locator('.project-fallback').count(), 0, `${title} case-study hero must not render fallback`);
      assert.equal(await hero.locator('.project-shot').count(), 1, `${title} case-study hero must render exactly one image`);
      const metrics = await assertDecodedImage(page, hero.locator('.project-shot'), `${title} case-study hero`);
      caseStudyResults.push({ href, title, ...metrics });
      await page.screenshot({
        path: `artifacts/screenshots/${viewport.name}-dark-${href.replace(/\W+/g, '-').replace(/^-|-$/g, '')}-artwork.png`,
        fullPage: true,
      });
    }

    assert.deepEqual(errors, [], `no browser errors during artwork verification at ${viewport.name}`);
    evidence.push({ viewport: viewport.name, cards: cardResults, caseStudies: caseStudyResults });
    await context.close();
  }
} finally {
  await browser.close();
}

await fs.writeFile('artifacts/artwork-browser-check.json', JSON.stringify(evidence, null, 2));
console.log(`Artwork verification passed for ${evidence[0]?.cards.length ?? 0} active cards and ${evidence[0]?.caseStudies.length ?? 0} case-study heroes on desktop and mobile.`);
