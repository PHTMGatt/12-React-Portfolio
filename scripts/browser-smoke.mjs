import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true });
const results = [];
await fs.mkdir('artifacts/screenshots', { recursive: true });
try {
  for (const width of [375, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/work', '/contact', '/resume', '/does-not-exist']) {
      await page.goto(`${base}${route}`);
      await page.locator('h1').waitFor();
      await page.waitForTimeout(150);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('main').count(), 1);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow ${route}`);
      if (route === '/does-not-exist') assert.match(await page.title(), /Page not found/);
      if (route === '/work') {
        await page.getByRole('heading', { name: 'Same map. A better-integrated app.' }).waitFor();
        assert.equal(await page.getByRole('link', { name: 'Guide in 2.0', exact: true }).count(), 5);
        assert.equal(await page.getByRole('link', { name: 'Try Origins in 1.0', exact: true }).count(), 0, 'do not advertise an unverified legacy endpoint as live');
        assert.equal(await page.getByRole('link', { name: 'Legacy reference', exact: true }).count(), 0);
        assert.equal(await page.locator('.project-card__inactive').filter({ hasText: 'Hosting pending' }).count(), 2);
        for (const host of ['der-eisendrache-guide', 'gorod-krovi-guide', 'motd-guide', 'revelations-guide', 'zetsubou-guide']) {
          assert.equal(await page.locator(`a[href*="${host}.onrender.com"]`).count(), 0);
        }
      }
      await page.screenshot({ path: `artifacts/screenshots/${width}-${route.replace(/\W/g, '-') || 'home'}.png` });
      results.push({ width, route, passed: true });
    }
    await page.goto(`${base}/`);
    await page.getByRole('button', { name: /Switch to light theme/ }).click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    await page.screenshot({ path: `artifacts/screenshots/${width}-home-light.png` });
    if (width === 1440) {
      await page.goto(`${base}/resume`);
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: /Download PDF/ }).click();
      const download = await downloadPromise;
      await download.saveAs('artifacts/resume-test.pdf');
      const pdf = await fs.readFile('artifacts/resume-test.pdf');
      assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
      assert(pdf.length > 1000, 'resume PDF has content');
    }
    const quote = page.locator('.quote-text');
    const oldQuote = await quote.textContent();
    await page.getByRole('button', { name: 'New Hobbit Quote' }).click();
    assert.notEqual(await quote.textContent(), oldQuote);
    await page.goto(`${base}/contact`);
    await page.locator('#name').fill('Test visitor');
    await page.locator('#email').fill('test+portfolio@example.com');
    await page.locator('#subject').fill('Draft stays put');
    await page.locator('#message').fill('This is a local test. Do not send.');
    await page.locator('[data-tooltip="Cycle scroll theme categories"]').click();
    assert.equal(await page.locator('#message').inputValue(), 'This is a local test. Do not send.');
    // Stub EmailJS: verify the form without sending a real message.
    await page.route('https://api.emailjs.com/**', route => route.fulfill({ status: 200, body: 'OK' }));
    await page.locator('button[type="submit"]').click();
    await page.locator('.form-success').waitFor();
    assert.deepEqual(errors, []);
    results.push({ width, interactions: 'theme, quote, draft preservation, mocked contact send', passed: true });
    await context.close();
  }
} finally { await browser.close(); }
await fs.writeFile('artifacts/browser-smoke.json', JSON.stringify(results, null, 2));
console.log(`${results.length} portfolio checks passed. Email delivery was mocked; no message sent.`);
