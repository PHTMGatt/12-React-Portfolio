import test from 'node:test';
import assert from 'node:assert/strict';
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
