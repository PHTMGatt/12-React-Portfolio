// Random quote from The One API (https://the-one-api.dev). The key comes from
// VITE_ONE_API_KEY at build time, so it is public in the bundle by nature: use
// a free, read-only key and rotate it if it is abused. Never throws: it returns
// null on a missing key, a network or HTTP error, a timeout or an odd response,
// and the caller falls back to the built-in quotes.
export const ONE_API_QUOTE_URL = 'https://the-one-api.dev/v2/quote';

// The API holds about 2,300 quotes; staying under that keeps the offset valid.
const QUOTE_POOL = 2000;
const MAX_LENGTH = 300;

export async function fetchOneApiQuote({
  key,
  fetchImpl = globalThis.fetch,
  random = Math.random,
  timeoutMs = 4000,
} = {}) {
  if (!key || typeof fetchImpl !== 'function') return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const offset = Math.floor(random() * QUOTE_POOL);
    const response = await fetchImpl(`${ONE_API_QUOTE_URL}?limit=1&offset=${offset}`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const body = await response.json();
    const text = body?.docs?.[0]?.dialog;
    if (typeof text !== 'string') return null;
    const quote = text.replace(/\s+/g, ' ').trim();
    return quote && quote.length <= MAX_LENGTH ? quote : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
