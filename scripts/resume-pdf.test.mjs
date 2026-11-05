import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { jsPDF } from 'jspdf';
import { profile } from '../src/data/profile.js';

// Exercise the actual download builder with real PDF layout and annotations.
// Only the browser download boundary is replaced to inspect the result in Node.
const source = await fs.readFile(new URL('../src/pages/Resume/Resume.jsx', import.meta.url), 'utf8');
const builder = source.slice(source.indexOf('const PORTFOLIO_URL'), source.indexOf('const Resume ='))
  .replace("const { default: jsPDF } = await import('jspdf');", '');

async function downloadResume() {
  let output;
  let pages;
  const bounds = [];
  function Pdf(options) {
    const doc = new jsPDF(options);
    const text = doc.text.bind(doc);
    doc.text = (value, x, y, ...rest) => {
      for (const line of Array.isArray(value) ? value : [value]) {
        bounds.push({ text: line, x, right: x + doc.getTextWidth(line), y });
      }
      return text(value, x, y, ...rest);
    };
    doc.save = () => { output = doc.output(); pages = doc.getNumberOfPages(); };
    return doc;
  }
  await new Function('jsPDF', 'profile', `${builder}; return buildPdf();`)(Pdf, profile);
  return { output, bounds, pages };
}

test('downloaded resume keeps every text line inside printable margins', async () => {
  const { bounds } = await downloadResume();
  for (const line of bounds) {
    assert(line.x >= 48 && line.right <= 564.1, `Text exceeds page margins: ${line.text} (${line.right.toFixed(1)}pt)`);
    assert(line.y >= 48 && line.y <= 744, `Text exceeds vertical margins: ${line.text}`);
  }
});

test('downloaded resume includes actionable contact links from the shared profile', async () => {
  const { output } = await downloadResume();
  for (const url of [`mailto:${profile.email}`, profile.github, profile.linkedin, 'https://one2-react-portfolio.onrender.com']) {
    assert(output.includes(`/URI (${url})`), `Missing clickable PDF contact: ${url}`);
  }
});

test('current resume fits one page with no overlapping inline text', async () => {
  const { pages, bounds } = await downloadResume();
  assert.equal(pages, 1, 'avoid an orphaned second page for the current resume');
  for (let i = 1; i < bounds.length; i++) {
    const previous = bounds[i - 1];
    const line = bounds[i];
    if (line.y === previous.y) assert(line.x >= previous.right + 4, `Overlapping inline text: ${line.text}`);
  }
});
