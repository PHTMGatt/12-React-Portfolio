// Guard for the browser checks: make sure the base URL really serves this Portfolio.
//
// The checks default to http://127.0.0.1:4174. `vite preview` silently moves to the next free port when its
// own is busy, so a different project's preview (for example Zombies Hub) can end up on 4174. The checks
// would then run against the wrong site and fail with confusing errors (such as a missing data-theme).
// This turns that into one clear message. It does not loosen any check.

export const PORTFOLIO_TITLE = /Bryen Gatt/;

export const titleOf = (html) => /<title[^>]*>([\s\S]*?)<\/title>/i.exec(String(html ?? ''))?.[1].replace(/\s+/g, ' ').trim() ?? '';

export async function assertPortfolioTarget(base, fetchImpl = fetch) {
  let res;
  try {
    res = await fetchImpl(base, { redirect: 'follow' });
  } catch (error) {
    throw new Error(`Nothing is answering at ${base} (${error?.cause?.code ?? error?.message}). Start the Portfolio preview first, for example: npm run preview -- --host 127.0.0.1 --port 4174`);
  }
  const title = titleOf(await res.text());
  if (!res.ok || !PORTFOLIO_TITLE.test(title)) {
    throw new Error(
      `${base} is not this Portfolio (HTTP ${res.status}, title "${title || 'none'}"). Another project's preview server may own this port. ` +
        'Start the Portfolio preview on a free port and pass it as SMOKE_BASE_URL (or the first argument of browser-smoke.mjs).'
    );
  }
  return title;
}
