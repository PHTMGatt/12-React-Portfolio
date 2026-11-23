import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fetchOneApiQuote, ONE_API_QUOTE_URL } from '../src/utils/oneApiQuote.js';
import { securityHeaders } from './security-headers.mjs';

const ok = (body) => async () => ({ ok: true, json: async () => body });

test('without a key it makes no request and returns null (built-in quotes are used)', async () => {
  let calls = 0;
  const fetchImpl = async () => { calls += 1; return { ok: true, json: async () => ({}) }; };
  assert.equal(await fetchOneApiQuote({ key: '', fetchImpl }), null);
  assert.equal(await fetchOneApiQuote({ key: undefined, fetchImpl }), null);
  assert.equal(calls, 0);
});

test('with a key it asks The One API for one random quote using a Bearer header', async () => {
  let seen;
  const fetchImpl = async (url, options) => {
    seen = { url, options };
    return { ok: true, json: async () => ({ docs: [{ dialog: '  Fly, you   fools!  ' }] }) };
  };
  const quote = await fetchOneApiQuote({ key: 'test-key', fetchImpl, random: () => 0.5 });
  assert.equal(quote, 'Fly, you fools!');
  assert.equal(seen.url, `${ONE_API_QUOTE_URL}?limit=1&offset=1000`);
  assert.equal(seen.options.headers.Authorization, 'Bearer test-key');
});

test('every failure falls back to null instead of throwing', async () => {
  const key = 'test-key';
  assert.equal(await fetchOneApiQuote({ key, fetchImpl: async () => { throw new Error('offline'); } }), null, 'network error');
  assert.equal(await fetchOneApiQuote({ key, fetchImpl: async () => ({ ok: false, status: 401 }) }), null, 'HTTP error');
  assert.equal(await fetchOneApiQuote({ key, fetchImpl: async () => ({ ok: true, json: async () => { throw new Error('bad json'); } }) }), null, 'invalid JSON');
  assert.equal(await fetchOneApiQuote({ key, fetchImpl: ok({ docs: [] }) }), null, 'no quotes');
  assert.equal(await fetchOneApiQuote({ key, fetchImpl: ok({ docs: [{ dialog: 42 }] }) }), null, 'wrong type');
  assert.equal(await fetchOneApiQuote({ key, fetchImpl: ok({ docs: [{ dialog: 'x'.repeat(500) }] }) }), null, 'absurdly long');
});

test('a hung request times out and falls back', async () => {
  const fetchImpl = (url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')));
  });
  assert.equal(await fetchOneApiQuote({ key: 'test-key', fetchImpl, timeoutMs: 20 }), null);
});

test('the CSP lets the browser reach The One API, and the footer keeps its built-in quotes', async () => {
  const connect = securityHeaders['Content-Security-Policy'].split('; ').find((d) => d.startsWith('connect-src'));
  assert.ok(connect.includes('https://the-one-api.dev'), connect);
  const footer = await readFile('src/components/Footer/HobbitQuoteGenerator.jsx', 'utf8');
  assert.match(footer, /import\.meta\.env\.VITE_ONE_API_KEY/);
  assert.match(footer, /Not all those who wander are lost/);
  assert.doesNotMatch(footer, /Bearer\s+[A-Za-z0-9_-]{12,}/, 'no key literal in the source');
});
