import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const read = (path) => fs.readFile(path, 'utf8');

const approvedWebp = async (path, label) => {
  const bytes = await fs.readFile(path);
  assert(bytes.length > 1024, `${label} should contain real artwork`);
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', `${label} should be a RIFF WebP`);
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', `${label} should be a WebP image`);
};

test('approved Banking and Clash artwork is wired into the Portfolio', async () => {
  await approvedWebp('src/assets/photos/Banking System.webp', 'Banking System artwork');
  await approvedWebp('src/assets/photos/Clash Commander.webp', 'Clash Commander artwork');

  const screenshots = await read('src/data/screenshots.js');
  assert.match(screenshots, /import bankingSystem from '\.\.\/assets\/photos\/Banking System\.webp';/);
  assert.match(screenshots, /'banking-system': artwork\(bankingSystem\)/);
  assert.match(screenshots, /'clash-commander': artwork\(clashCommander\)/);

  const caseStudies = await read('src/data/caseStudies.js');
  assert.match(
    caseStudies,
    /slug: 'clash-automation'[\s\S]*image: screenshotFor\('clash-commander'\)/,
    'Clash of Clans Discord Suite case study should use the approved Clash Commander artwork'
  );
});
