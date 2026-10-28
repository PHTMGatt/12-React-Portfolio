import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const read = (path) => fs.readFile(path, 'utf8');

const substantialAsset = async (path, label) => {
  const stat = await fs.stat(path);
  assert(
    stat.size > 100_000,
    `${label} should be the approved full-resolution artwork, not a tiny placeholder (${stat.size} bytes)`
  );
};

test('approved Banking and Clash artwork is wired into the Portfolio', async () => {
  await substantialAsset('src/assets/photos/Banking System.webp', 'Banking System artwork');
  await substantialAsset('src/assets/photos/Clash Commander.webp', 'Clash Commander artwork');
  await substantialAsset('src/assets/photos/Clash Suite.webp', 'Clash Suite artwork');

  const screenshots = await read('src/data/screenshots.js');
  assert.match(screenshots, /'banking-system': artwork\(bankingSystem\)/);
  assert.match(screenshots, /'clash-commander': artwork\(clashCommander\)/);

  const caseStudies = await read('src/data/caseStudies.js');
  assert.match(
    caseStudies,
    /slug: 'clash-automation'[\s\S]*image: screenshotFor\('clash-suite'\)/,
    'Clash of Clans Discord Suite case study should use the approved Clash Suite artwork'
  );
});
