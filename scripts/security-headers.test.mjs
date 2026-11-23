import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import assetCachePlugin from './asset-cache-plugin.mjs';
import { securityHeaders, renderOnlyHeaders, inlineScriptHashes } from './security-headers.mjs';

test('CSP allows exactly the inline scripts in index.html, by hash', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.ok(!html.includes('\r'), 'index.html must be LF (see .gitattributes) or the CSP hash differs from production');
  const hashes = inlineScriptHashes(html);
  assert.equal(hashes.length, 1, 'one inline script: the theme restore');
  const scriptSrc = securityHeaders['Content-Security-Policy'].split('; ').find((d) => d.startsWith('script-src'));
  assert.equal(scriptSrc, `script-src 'self' ${hashes[0]}`);
  assert.ok(!securityHeaders['Content-Security-Policy'].includes("'unsafe-"), 'no unsafe-inline or unsafe-eval');
});

test('the Render preview server sends the security headers on every response', () => {
  let handle;
  assetCachePlugin().configurePreviewServer({
    config: { root: process.cwd(), build: { outDir: 'dist' } },
    middlewares: { use: (fn) => { handle = fn; } },
  });
  for (const url of ['/', '/work/zombies-hub', '/%E0%A4%A']) {
    const headers = {};
    const response = { setHeader(name, value) { headers[name] = value; }, end() {}, writeHead() {} };
    handle({ url }, response, () => {});
    for (const [name, value] of Object.entries({ ...securityHeaders, ...renderOnlyHeaders })) {
      assert.equal(headers[name], value, `${name} on ${url}`);
    }
  }
});
