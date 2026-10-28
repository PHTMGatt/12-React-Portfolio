import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateEmail } from '../src/utils/validation.js';
import { readPreference, writePreference } from '../src/utils/storage.js';

test('contact validation accepts plus tags and rejects incomplete addresses', () => {
  for (const email of ['person+project@example.com', ' hello@example.co.uk ', 'a.b@example.org']) assert(validateEmail(email));
  for (const email of ['', 'hello', 'x@y', 'x y@example.com', null]) assert(!validateEmail(email));
});
test('blocked browser storage uses safe defaults instead of crashing', () => {
  globalThis.window = { get localStorage() { throw new Error('Blocked'); } };
  assert.equal(readPreference('theme', 'dark'), 'dark');
  assert.doesNotThrow(() => writePreference('theme', 'light'));
  delete globalThis.window;
});

test('external links that open new tabs announce that behavior', async () => {
  const files = [
    '../src/components/Footer/Footer.jsx',
    '../src/pages/Contact/Contact.jsx',
    '../src/pages/Resume/Resume.jsx',
  ];

  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8');
    const externalLinks = source.match(/<a\b(?=[^>]*target="_blank")[^>]*>[\s\S]*?<\/a>/g) ?? [];

    assert(externalLinks.length > 0, `${file} should contain external links`);
    for (const link of externalLinks) {
      assert.match(link, /rel="noopener noreferrer"/, `${file} external links should be protected`);
      assert.match(link, /opens in a new tab/, `${file} external links should announce new-tab behavior`);
    }
  }
});
