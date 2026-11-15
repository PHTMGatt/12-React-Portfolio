import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

// Regression: sharp <= 0.35.5-rc.1 bundles libvips with known CVEs (GHSA-f88m-g3jw-g9cj).
test('sharp is on the patched 0.35 line and still processes an image', async () => {
  const { version } = JSON.parse(readFileSync(new URL('../node_modules/sharp/package.json', import.meta.url), 'utf8'));
  const [, minor] = version.split('.').map(Number);
  assert.ok(minor >= 35, `sharp ${version} is too old`);
  const buf = await sharp({ create: { width: 4, height: 2, channels: 3, background: '#fff' } }).webp().toBuffer();
  assert.equal((await sharp(buf).metadata()).width, 4);
});
