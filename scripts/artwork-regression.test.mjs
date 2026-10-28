import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';

const read = (path) => fs.readFile(path, 'utf8');

// Approved assets reconciled from main at a3eea0f. Update these fingerprints
// only when a newly approved replacement has been visually reviewed.
const approvedArtwork = {
  'Banking System': '81dc95293e79685fbd1b5e56db901ce6464e9d9abeb61d4361ccac4c4d309799',
  'Clash Commander': 'b2f59289d891ba524cabdf89bf1055028b54b6338f592d96ff50c050d29cd2d4',
  'Clash Suite': '69393f656cbf761da79bc582364886ec3005897e21ca069f0774d6e1e7bca986',
};

test('approved artwork bytes are preserved, not replaced with substitutes', async () => {
  for (const [name, digest] of Object.entries(approvedArtwork)) {
    const bytes = await fs.readFile(`src/assets/photos/${name}.webp`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), digest, `${name} must use the reviewed artwork`);
  }
});

const collectMatches = (source, regex) => [...source.matchAll(regex)].map((match) => match[1]);

test('every Portfolio project card and case study is wired to artwork', async () => {

  const [screenshots, projects, caseStudies] = await Promise.all([
    read('src/data/screenshots.js'),
    read('src/data/projects.js'),
    read('src/data/caseStudies.js'),
  ]);

  const activeProjects = projects.match(/export const projects = \[([\s\S]*?)\n\];/);
  assert(activeProjects, 'projects.js should expose the active projects array');

  const projectIds = collectMatches(activeProjects[1], /\bid: '([^']+)'/g);
  const projectImageIds = collectMatches(activeProjects[1], /\bimage: screenshotFor\('([^']+)'\)/g);
  assert(projectIds.length > 0, 'Portfolio should contain active project cards');
  assert.equal(projectImageIds.length, projectIds.length, 'Every active Portfolio project card must declare an image');

  for (const id of projectIds) {
    assert(projectImageIds.includes(id), `${id} should use its matching screenshotFor() artwork`);
    assert.match(
      screenshots,
      new RegExp(`['\"]?${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]?: artwork\\(`),
      `${id} should resolve to canonical artwork in screenshots.js`
    );
  }

  const caseStudySlugs = collectMatches(caseStudies, /\bslug: '([^']+)'/g);
  const caseStudyImageIds = collectMatches(caseStudies, /\bimage: screenshotFor\('([^']+)'\)/g);
  assert(caseStudySlugs.length > 0, 'Portfolio should contain case studies');
  assert.equal(caseStudyImageIds.length, caseStudySlugs.length, 'Every case study must declare visible artwork');
  assert.doesNotMatch(caseStudies, /\bimage:\s*null\b/, 'Case studies must not fall back to blank artwork panels');

  for (const id of caseStudyImageIds) {
    assert.match(
      screenshots,
      new RegExp(`['\"]?${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]?: artwork\\(`),
      `${id} case-study artwork should resolve in screenshots.js`
    );
  }

  assert.match(screenshots, /import bankingSystem from '\.\.\/assets\/photos\/Banking System\.webp';/);
  assert.match(screenshots, /import clashCommander from '\.\.\/assets\/photos\/Clash Commander\.webp';/);
  assert.match(screenshots, /import clashSuite from '\.\.\/assets\/photos\/Clash Suite\.webp';/);
  assert.match(screenshots, /'banking-system': artwork\(bankingSystem\)/);
  assert.match(screenshots, /'clash-commander': artwork\(clashCommander\)/);
  assert.match(screenshots, /'clash-suite': artwork\(clashSuite\)/);
  assert.match(
    caseStudies,
    /slug: 'clash-automation'[\s\S]*image: screenshotFor\('clash-suite'\)/,
    'Clash of Clans Discord Suite should use its own artwork rather than a blank or borrowed card image'
  );
});
