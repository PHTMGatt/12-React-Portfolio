import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

// A case study without its own metadata falls back to the not-found
// directives (noindex, "page could not be found"), so every slug must be
// registered in pageMetadata.js and listed in the sitemap.
test('every case study has route metadata and a sitemap entry', async () => {
  const [caseStudies, metadata, sitemap] = await Promise.all([
    fs.readFile('src/data/caseStudies.js', 'utf8'),
    fs.readFile('src/data/pageMetadata.js', 'utf8'),
    fs.readFile('public/sitemap.xml', 'utf8'),
  ]);
  const slugs = [...caseStudies.matchAll(/\bslug: '([^']+)'/g)].map((match) => match[1]);
  assert.ok(slugs.length > 0, 'caseStudies.js should declare case studies');
  for (const slug of slugs) {
    assert.ok(metadata.includes(`'/work/${slug}': {`), `${slug} needs an entry in pageMetadata.js`);
    assert.ok(
      sitemap.includes(`<loc>https://one2-react-portfolio.onrender.com/work/${slug}</loc>`),
      `${slug} needs a sitemap entry`
    );
  }
});
