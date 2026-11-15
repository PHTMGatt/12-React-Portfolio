import test from 'node:test';
import assert from 'node:assert/strict';
import assetCachePlugin from './asset-cache-plugin.mjs';

function middleware() {
  let handler;
  const server = {
    config: { root: process.cwd(), build: { outDir: 'dist' } },
    middlewares: { use: (fn) => { handler = fn; } },
  };
  assetCachePlugin().configurePreviewServer(server);
  return handler;
}

function fakeResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    end(body) { this.body = body; },
    writeHead() {},
  };
}

test('malformed request URLs get a plain 400, never a stack trace', () => {
  const handle = middleware();
  for (const url of ['/%E0%A4%A', '/assets/%E0%A4%A.js', '/work/%']) {
    const response = fakeResponse();
    let passed = false;
    assert.doesNotThrow(() => handle({ url }, response, () => { passed = true; }), url);
    assert.equal(passed, false, `${url} is answered here, not by Vite's fallback`);
    assert.equal(response.statusCode, 400, url);
    assert.equal(response.body, 'Bad Request', url);
  }
});

test('ordinary page requests pass straight through untouched', () => {
  const handle = middleware();
  const response = fakeResponse();
  const original = response.writeHead;
  let passed = false;
  handle({ url: '/work?x=1' }, response, () => { passed = true; });
  assert.ok(passed);
  assert.equal(response.writeHead, original);
});
