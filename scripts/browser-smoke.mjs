import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

// Browser checks against a running preview build (npm run preview -- --port 4174).
// Base URL: first CLI argument, then SMOKE_BASE_URL, then the CI default.
// Email delivery is intercepted, so no real message is ever sent.
const base = process.argv[2] || process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const routes = ['/', '/work', '/work?type=automation', '/work/zombies-hub-2', '/resume', '/contact', '/does-not-exist'];
// Standalone guide deployments are retired and must never be linked as live.
const retiredHosts = ['der-eisendrache-guide', 'gorod-krovi-guide', 'motd-guide', 'revelations-guide', 'zetsubou-guide', 'origins-wtyd'];

// Use Playwright's bundled Chromium (CI); fall back to an installed Google Chrome locally.
const browser = await chromium.launch({ headless: true }).catch(() => chromium.launch({ headless: true, channel: 'chrome' }));
const results = [];
await fs.mkdir('artifacts/screenshots', { recursive: true });

try {
  for (const viewport of viewports) {
    for (const theme of ['dark', 'light']) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: 'reduce',
      });
      await context.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await context.route('https://api.emailjs.com/**', (route) => route.fulfill({ status: 200, body: 'OK' }));
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });

      for (const route of routes) {
        await page.goto(`${base}${route}`);
        await page.locator('h1').first().waitFor();
        assert.equal(await page.locator('h1').count(), 1, `one h1 on ${route}`);
        assert.equal(await page.locator('main').count(), 1, `one main on ${route}`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme, `theme on ${route}`);
        assert(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          `no horizontal overflow on ${route} at ${viewport.width}px`
        );
        // No AI-generated thumbnail may be referenced anywhere.
        const sources = await page.locator('img').evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src') || ''));
        assert(!sources.some((src) => src.includes('/thumbnails/')), `no AI thumbnails on ${route}`);
        if (route === '/does-not-exist') assert.match(await page.title(), /Page not found/);
        await page.screenshot({
          path: `artifacts/screenshots/${viewport.name}-${theme}-${route.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home'}.png`,
          fullPage: true,
        });
      }

      // Work page: filter state lives in the URL and cards put GitHub first.
      await page.goto(`${base}/work?type=automation`);
      assert.equal(await page.getByRole('button', { name: /Bots & automation/ }).getAttribute('aria-pressed'), 'true');
      const firstActions = await page.locator('.project-card__actions').first().locator('a').allTextContents();
      assert.match(firstActions[0], /GitHub/, 'GitHub is the first card action');
      await page.goto(`${base}/work`);
      // allTextContents() does not wait, so wait for the lazily loaded cards first.
      await page.locator('.project-card__actions').first().waitFor();
      const liveIndex = (await page.locator('.project-card__actions').first().locator('a').allTextContents()).findIndex((t) => /Live/.test(t));
      assert.equal(liveIndex, 1, 'Live is the second action when a deployment exists');
      for (const host of retiredHosts) {
        assert.equal(await page.locator(`a[href*="${host}.onrender.com"]`).count(), 0, `no link to retired ${host}`);
      }
      assert.equal(await page.locator('.status-tag', { hasText: 'Legacy' }).count(), 4, 'four legacy coursework labels');
      assert.equal(await page.locator('.status-tag', { hasText: 'Paused' }).count(), 1, 'Clash Commander is paused');
      // raspbi-pilot in the main grid; the seven legacy guides sit in the collapsed archive.
      assert.equal(await page.locator('.work-grid:not(.archive__grid) .status-tag', { hasText: 'Inactive' }).count(), 1, 'raspbi-pilot is inactive');

      // Keyboard: the first Tab lands on a visible skip link.
      await page.goto(`${base}/`);
      await page.keyboard.press('Tab');
      const skip = page.locator('.skip-link');
      assert(await skip.evaluate((el) => el === document.activeElement), 'skip link receives focus first');
      const box = await skip.boundingBox();
      assert(box && box.y >= 0 && box.width > 0, 'focused skip link is visible');

      // Contact is reachable at every width (inside the menu on small screens).
      const menuToggle = page.locator('.site-nav__toggle');
      if (await menuToggle.isVisible()) await menuToggle.click();
      // Scope to the header: the footer also has a "Contact" link (strict mode would reject two matches).
      await page.locator('.site-nav').getByRole('link', { name: 'Contact', exact: true }).click();
      await page.waitForURL('**/contact');

      // Theme toggle flips the attribute.
      const next = theme === 'dark' ? 'light' : 'dark';
      await page.getByRole('button', { name: `Switch to ${next} theme` }).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), next);

      // Contact: drafts survive Middle-earth mode, then a mocked send succeeds.
      await page.locator('#name').fill('Test visitor');
      await page.locator('#email').fill('test+portfolio@example.com');
      await page.locator('#subject').fill('Draft stays put');
      await page.locator('#message').fill('This is a local test. Do not send.');
      await page.getByText('Middle-earth mode').click();
      assert.equal(await page.locator('#message').inputValue(), 'This is a local test. Do not send.');
      await page.locator('button[type="submit"]').click();
      await page.getByRole('heading', { name: /Message sent/ }).waitFor();

      // Footer quote rotates offline.
      const quote = page.locator('.footer-quote__text');
      const before = await quote.textContent();
      await page.getByRole('button', { name: 'Another quote' }).click();
      await page.waitForFunction((old) => document.querySelector('.footer-quote__text')?.textContent !== old, before);

      if (viewport.name === 'desktop' && theme === 'dark') {
        await page.goto(`${base}/resume`);
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: /Download PDF/ }).click();
        const download = await downloadPromise;
        await download.saveAs('artifacts/resume-test.pdf');
        const pdf = await fs.readFile('artifacts/resume-test.pdf');
        assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
        assert(pdf.length > 1000, 'resume PDF has content');
      }

      assert.deepEqual(errors, [], `no console errors at ${viewport.name}/${theme}`);
      results.push({ viewport: viewport.name, theme, routes: routes.length, passed: true });
      await context.close();
    }
  }
} finally {
  await browser.close();
}

await fs.writeFile('artifacts/browser-smoke.json', JSON.stringify(results, null, 2));
console.log(`${results.length} viewport/theme passes, ${results.length * routes.length} page checks passed. Email delivery was mocked; no message sent.`);
