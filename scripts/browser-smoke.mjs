import { assertPortfolioTarget } from './target-check.mjs';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

// Browser checks against a running preview build (npm run preview -- --port 4174).
// Base URL: first CLI argument, then SMOKE_BASE_URL, then the CI default.
// Email delivery is intercepted, so no real message is ever sent.
const base = process.argv[2] || process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4174';
await assertPortfolioTarget(base);
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const routes = [
  '/',
  '/work',
  '/work?type=automation',
  '/work/zombies-hub-2',
  '/work/fairway-finder',
  '/work/daily-bytes',
  '/work/clash-automation',
  '/work/3d-modding-showcase',
  '/resume',
  '/contact',
  '/does-not-exist',
];
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
        // The 404 title is set in an effect after the h1 renders, so wait for it
        // instead of reading it once (a single read raced on CI).
        if (route === '/does-not-exist') await page.waitForFunction(() => /Page not found/.test(document.title));
        await page.screenshot({
          path: `artifacts/screenshots/${viewport.name}-${theme}-${route.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home'}.png`,
          fullPage: true,
        });
      }

      // Work page: filter state lives in the URL and cards put GitHub first.
      await page.goto(`${base}/work?type=automation`);
      assert.equal(await page.getByRole('button', { name: /Bots & automation/ }).getAttribute('aria-pressed'), 'true');
      // Private repositories show a label instead, so check cards that link source.
      const firstActions = await page.locator('.project-card__actions:has(.project-card__code)').first().locator('a').allTextContents();
      assert.match(firstActions[0], /GitHub/, 'GitHub is the first card action');
      assert.equal(
        await page.locator('.project-card', { hasText: 'Mithrandir' }).locator('a[href*="github.com"]').count(),
        0,
        'private Mithrandir source is not linked'
      );
      await page.goto(`${base}/work`);
      // allTextContents() does not wait, so wait for the lazily loaded cards first.
      await page.locator('.project-card__actions').first().waitFor();
      const liveIndex = (await page.locator('.project-card__actions').first().locator('a').allTextContents()).findIndex((t) => /Live/.test(t));
      assert.equal(liveIndex, 1, 'Live is the second action when a deployment exists');
      for (const host of retiredHosts) {
        assert.equal(await page.locator(`a[href*="${host}.onrender.com"]`).count(), 0, `no link to retired ${host}`);
      }
      assert.equal(await page.locator('.status-tag', { hasText: 'Legacy' }).count(), 3, 'three legacy coursework labels');
      assert.equal(await page.locator('.status-tag', { hasText: 'Paused' }).count(), 2, 'Mithrandir (parked) and raspbi-pilot (Pi deployment not verified) are paused');
      // Mithrandir and raspbi-pilot (paused) and Clash Commander (inactive) are in the main grid; the seven legacy guides sit in the collapsed archive.
      assert.equal(await page.locator('.work-grid:not(.archive__grid) .status-tag', { hasText: 'Inactive' }).count(), 1, 'Clash Commander is inactive (superseded by War Oracle)');

      // Keyboard: the first Tab lands on a visible skip link.
      await page.goto(`${base}/`);
      const skip = page.locator('.skip-link');
      // Client rendering may finish after the document's load event.
      await skip.waitFor({ state: 'attached' });
      await page.keyboard.press('Tab');
      assert(await skip.evaluate((el) => el === document.activeElement), 'skip link receives focus first');
      // Even reduced-motion transitions need a rendered frame to settle.
      await page.waitForFunction(() => document.querySelector('.skip-link')?.getBoundingClientRect().y >= 0);
      const box = await skip.boundingBox();
      assert(box && box.y >= 0 && box.width > 0, 'focused skip link is visible');

      // Keyboard: the home link is named by its visible text, at every width.
      const brandName = await page.locator('.site-nav__brand').evaluate((el) => el.getAttribute('aria-label') ?? el.innerText.replace(/\s+/g, ' ').trim());
      assert.match(brandName, /^BG Bryen Gatt.*home$/, 'home link keeps its visible text in its name');

      // Keyboard: an in-app navigation moves focus to the new page instead of
      // leaving it on a link that no longer exists.
      await page.getByRole('link', { name: 'View my work' }).focus();
      await page.keyboard.press('Enter');
      await page.waitForURL('**/work');
      await page.waitForFunction(() => document.activeElement?.id === 'main');
      await page.locator('h1').first().waitFor();
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => Boolean(document.activeElement?.closest('main'))), 'the next Tab continues inside the new page');

      // Keyboard: opening the small-screen menu moves focus into it, and
      // tabbing on past the header closes it again.
      const menuToggle = page.locator('.site-nav__toggle');
      if (await menuToggle.isVisible()) {
        await menuToggle.focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => Boolean(document.activeElement?.closest('#site-menu')));
        assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'About', 'focus starts on the first menu link');
        // Work, Resume, theme, Contact, menu toggle, then out into the page.
        for (let step = 0; step < 6; step++) await page.keyboard.press('Tab');
        await page.waitForFunction(() => document.querySelector('.site-nav__toggle').getAttribute('aria-expanded') === 'false');
        assert(await page.evaluate(() => Boolean(document.activeElement?.closest('main'))), 'focus carries on into the page once the menu closes');
        await menuToggle.focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => Boolean(document.activeElement?.closest('#site-menu')));
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => document.activeElement?.classList.contains('site-nav__toggle'));
        assert.equal(await menuToggle.getAttribute('aria-expanded'), 'false', 'Escape closes the menu and returns focus to its button');
      }

      // Contact is reachable at every width (inside the menu on small screens).
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
      const sent = page.getByRole('heading', { name: /Message sent/ });
      await sent.waitFor();
      // The form is replaced, so focus must move to the confirmation, then back to the form.
      assert(await sent.evaluate((el) => el === document.activeElement), 'focus moves to the sent confirmation');
      await page.getByRole('button', { name: 'Send another message' }).click();
      await page.waitForFunction(() => document.activeElement?.id === 'name');

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

  // Image delivery failure: canonical local captures should degrade to the
  // same honest typographic treatment used when a project has no screenshot.
  const imageFailureContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  await imageFailureContext.route(/\.(png|webp)(\?.*)?$/, (route) => route.abort());
  const imageFailurePage = await imageFailureContext.newPage();
  await imageFailurePage.goto(`${base}/work`, { waitUntil: 'networkidle' });
  const imageFailureCard = imageFailurePage.locator('.project-card', { hasText: 'Zombies Hub 2.0' }).first();
  await imageFailureCard.waitFor();
  assert.equal(
    await imageFailureCard.locator('.project-fallback').count(),
    1,
    'failed canonical project image uses typographic fallback'
  );
  assert.equal(await imageFailureCard.locator('.project-shot').count(), 0, 'failed canonical project image is removed');
  await imageFailureContext.close();
} finally {
  await browser.close();
}

await fs.writeFile('artifacts/browser-smoke.json', JSON.stringify(results, null, 2));
console.log(`${results.length} viewport/theme passes, ${results.length * routes.length} page checks passed. Email delivery was mocked; no message sent.`);
