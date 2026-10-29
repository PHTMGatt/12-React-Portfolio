import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

test('artwork derivatives preserve originals and aspect ratio without upscaling', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-artwork-'));
  try {
    const input = path.join(root, 'source');
    const output = path.join(root, 'generated');
    await fs.mkdir(input);
    const original = await sharp({ create: { width: 1000, height: 500, channels: 3, background: '#295570' } }).png().toBuffer();
    await fs.writeFile(path.join(input, 'Approved Art.png'), original);
    await fs.writeFile(path.join(input, '.partial.png'), 'unfinished work');
    const { generateArtwork } = await import('./generate-artwork.mjs');
    const manifest = await generateArtwork(input, output);
    const image = manifest['Approved Art.png'];
    assert.deepEqual(image.variants.map(v => v.width), [480, 800, 1000]);
    for (const variant of image.variants) {
      const metadata = await sharp(path.join(output, variant.file)).metadata();
      assert.equal(metadata.format, 'webp');
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.width / 2);
    }
    assert.deepEqual(await fs.readFile(path.join(input, 'Approved Art.png')), original);
    assert.deepEqual(Object.keys(manifest), ['Approved Art.png']);

    // A replacement at the same canonical path must regenerate dimensions.
    await sharp({ create: { width: 200, height: 100, channels: 3, background: '#fff' } }).png().toFile(path.join(input, 'Approved Art.png'));
    const updated = await generateArtwork(input, output);
    assert.deepEqual(updated['Approved Art.png'].variants.map(v => v.width), [200]);
    assert.deepEqual((await fs.readdir(output)).sort(), ['Approved Art.png-200.webp', 'index.js']);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
