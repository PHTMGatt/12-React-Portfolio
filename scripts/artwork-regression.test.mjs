import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const read = (path) => fs.readFile(path, 'utf8');

const approvedSvg = async (path, label) => {
  const source = await read(path);
  assert(source.length > 1000, `${label} should contain real artwork`);
  assert.match(source, /<svg\b/, `${label} should be SVG artwork`);
  assert.match(source, /viewBox="0 0 1536 864"/, `${label} should preserve the 16:9 artwork canvas`);
  assert.match(source, /<(?:path|rect|circle|ellipse)\b/, `${label} should contain visible vector shapes`);
};

const collectMatches = (source, regex) => [...source.matchAll(regex)].map((match) => match[1]);

test('every Portfolio project card and case study is wired to artwork', async () => {
  await approvedSvg('src/assets/photos/Banking System.svg', 'Banking System artwork');
  await approvedSvg('src/assets/photos/Clash Commander.svg', 'Clash Commander artwork');
  await approvedSvg('src/assets/photos/Clash Suite.svg', 'Clash Suite artwork');

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

  assert.match(screenshots, /import bankingSystem from '\.\.\/assets\/photos\/Banking System\.svg';/);
  assert.match(screenshots, /import clashCommander from '\.\.\/assets\/photos\/Clash Commander\.svg';/);
  assert.match(screenshots, /import clashSuite from '\.\.\/assets\/photos\/Clash Suite\.svg';/);
  assert.match(screenshots, /'banking-system': artwork\(bankingSystem\)/);
  assert.match(screenshots, /'clash-commander': artwork\(clashCommander\)/);
  assert.match(screenshots, /'clash-suite': artwork\(clashSuite\)/);
  assert.match(
    caseStudies,
    /slug: 'clash-automation'[\s\S]*image: screenshotFor\('clash-suite'\)/,
    'Clash of Clans Discord Suite should use its own artwork rather than a blank or borrowed card image'
  );
});
