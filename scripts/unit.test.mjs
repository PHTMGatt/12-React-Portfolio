import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail } from '../src/utils/validation.js';
import { readPreference, writePreference } from '../src/utils/storage.js';
import { screenshots } from '../src/data/screenshots.js';

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

test('PORT-IMG_3 is authoritative for every Work card', () => {
  const required = [
    'zombies-hub-2', 'fairway-finder', 'war-oracle', 'clash-commander', 'raspbi-pilot',
    'captain-hook', 'mern-book-search', 'daily-bytes', 'kanban-board', 'candidate-search',
    'weather-app', 'social-network-api', 'tech-quiz-tests', 'banking-system', 'portfolio',
    'zombies-hub-1', 'origins', 'mob-of-the-dead', 'der-eisendrache', 'zetsubou',
    'gorod-krovi', 'revelations',
  ];

  for (const id of required) {
    assert.ok(screenshots[id], `missing Work image for ${id}`);
    assert.match(screenshots[id].src, /^\/port-img3\//, `${id} must use PORT-IMG_3`);
  }
});
