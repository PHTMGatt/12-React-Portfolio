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
      // Read through a buffer: on Windows, libvips keeps file-backed inputs open,
      // which makes the later stale-variant cleanup fail with EBUSY.
      const metadata = await sharp(await fs.readFile(path.join(output, variant.file))).metadata();
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
    assert.deepEqual((await fs.readdir(output)).sort(), ['Approved Art.png-200.webp', 'Approved Art.png.js', 'index.js']);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('the hero portrait gets smaller derivatives while the approved file stays the largest, untouched', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-portrait-'));
  try {
    const output = path.join(root, 'generated');
    const source = path.join(root, 'bryen-headshot.webp');
    const original = await sharp({ create: { width: 640, height: 800, channels: 3, background: '#7a5a48' } }).webp().toBuffer();
    await fs.writeFile(source, original);
    const { generatePortrait } = await import('./generate-artwork.mjs');
    const variants = await generatePortrait(source, output);
    assert.deepEqual(variants.map(v => v.width), [240, 360, 480, 640]);
    for (const variant of variants.slice(0, -1)) {
      const metadata = await sharp(await fs.readFile(path.join(output, variant.file))).metadata();
      assert.equal(metadata.format, 'webp');
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.width * 1.25, 'derivatives keep the 4:5 portrait shape');
    }
    assert.equal(variants.at(-1).file, '../bryen-headshot.webp', 'the largest candidate is the approved file itself');
    assert.deepEqual(await fs.readFile(source), original);
    const module = await fs.readFile(path.join(output, 'bryen-headshot.webp.js'), 'utf8');
    assert.match(module, /src: full, srcSet: w240 \+ ' 240w' \+ ', ' \+ w360 \+ ' 360w' \+ ', ' \+ w480 \+ ' 480w' \+ ', ' \+ full \+ ' 640w', width: 640, height: 800/);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('SVG canonical artwork stays browser-rendered instead of being flattened by Sharp', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-artwork-svg-'));
  try {
    const input = path.join(root, 'source');
    const output = path.join(root, 'generated');
    await fs.mkdir(input);
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="633" height="552" viewBox="0 0 633 552"><rect width="633" height="552" fill="#10212b"/></svg>';
    await fs.writeFile(path.join(input, 'Mithrandir.svg'), svg);
    const { generateArtwork } = await import('./generate-artwork.mjs');
    const manifest = await generateArtwork(input, output);
    const image = manifest['Mithrandir.svg'];
    assert.ok(image, 'SVG source should be included in the artwork manifest');
    assert.deepEqual(image.variants.map(v => ({ file: v.file, width: v.width, height: v.height })), [
      { file: '../Mithrandir.svg', width: 633, height: 552 },
    ]);
    const module = await fs.readFile(path.join(output, 'Mithrandir.svg.js'), 'utf8');
    assert.match(module, /from "\.\.\/Mithrandir\.svg"/);
    const index = await fs.readFile(path.join(output, 'index.js'), 'utf8');
    assert.match(index, /from "\.\/Mithrandir\.svg\.js"/);
    assert.deepEqual((await fs.readdir(output)).sort(), ['Mithrandir.svg.js', 'index.js']);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
