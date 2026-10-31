import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

// Execute the real parser-blocking head scripts, before styles or React load.
// Removing early preference restoration must fail even if React later repairs it.
test('saved theme is applied before styles and React, with safe storage fallback', async () => {
  const html = await readFile('index.html', 'utf8');
  const head = html.split('<link rel="preconnect"')[0];
  for (const [saved, expected] of [['light', 'light'], ['dark', 'dark'], ['invalid', 'dark'], [null, 'dark'], ['throws', 'dark']]) {
    const attributes = { 'data-theme': 'dark' };
    const context = {
      localStorage: { getItem() { if (saved === 'throws') throw new Error('Storage unavailable'); return saved; } },
      document: { documentElement: { setAttribute(name, value) { attributes[name] = value; } } },
    };
    for (const match of head.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (!match[1].includes('type=') && !match[1].includes('src=')) runInNewContext(match[2], context);
    }
    assert.equal(attributes['data-theme'], expected, `initial theme for ${saved}`);
  }
});
