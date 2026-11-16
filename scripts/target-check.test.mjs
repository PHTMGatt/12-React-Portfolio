import test from 'node:test';
import assert from 'node:assert/strict';

import { assertPortfolioTarget, titleOf } from './target-check.mjs';

const page = (title, status = 200) => async () => ({ ok: status < 400, status, text: async () => `<html><head><title>${title}</title></head></html>` });

test('titleOf reads and tidies the title', () => {
  assert.equal(titleOf('<title>\n Hello   there </title>'), 'Hello there');
  assert.equal(titleOf('no title'), '');
});

test('the real Portfolio passes', async () => {
  assert.equal(await assertPortfolioTarget('http://x', page('Bryen Gatt — Full-Stack Developer')), 'Bryen Gatt — Full-Stack Developer');
});

test('another project on the port is refused with a clear message', async () => {
  await assert.rejects(assertPortfolioTarget('http://127.0.0.1:4174', page('Zombies Hub 2.0 | Maps')), /not this Portfolio.*Zombies Hub 2\.0.*SMOKE_BASE_URL/);
});

test('an error page and a dead port are refused too', async () => {
  await assert.rejects(assertPortfolioTarget('http://x', page('Bryen Gatt', 500)), /not this Portfolio \(HTTP 500/);
  await assert.rejects(assertPortfolioTarget('http://x', async () => { throw Object.assign(new Error('fetch failed'), { cause: { code: 'ECONNREFUSED' } }); }), /Nothing is answering.*ECONNREFUSED/);
});
