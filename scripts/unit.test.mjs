import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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

test('portfolio image registry uses PORT-IMG_3 artwork for every matching project', () => {
  const source = readFileSync(new URL('../src/data/screenshots.js', import.meta.url), 'utf8');
  const expectedArtwork = [
    'Candidate Search.png',
    'Captain Hook.png',
    'Clash Commander.png',
    'DE.png',
    'Daily Bytes.png',
    'Fairway Finder.png',
    'GK.png',
    'Kanban.png',
    'MOTD.png',
    'Mern Book.png',
    'Origins.png',
    'Portfolio.png',
    'Rev.png',
    'Social Network API.png',
    'Tech Quiz.png',
    'War Oracle.png',
    'Weather App.png',
    'Zetsubou.png',
    'Zombies Hub.png',
    'raspbi.png',
  ];

  for (const artwork of expectedArtwork) {
    assert.match(source, new RegExp(artwork.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${artwork}`);
  }
});
