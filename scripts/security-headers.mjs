import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Security headers for every response. Render is the only host and serves them
// from scripts/asset-cache-plugin.mjs (the `vite preview` production server).
//
// The only inline script is the theme restore in index.html's <head>. It has
// to run before styles load, so it stays inline and is allowed by its hash,
// which is computed here from index.html, so editing that script needs no
// manual hash update.
const indexHtml = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');

export function inlineScriptHashes(html = indexHtml) {
  return [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes]) => !attributes.includes('src=') && !attributes.includes('type='))
    .map(([, , body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`);
}

export const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' ${inlineScriptHashes().join(' ')}`,
  "style-src 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // The contact form posts through EmailJS; the footer asks The One API for a quote.
  "connect-src 'self' https://api.emailjs.com https://the-one-api.dev",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

export const securityHeaders = {
  'Content-Security-Policy': contentSecurityPolicy,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

// Render sits behind Cloudflare with HTTPS only.
export const renderOnlyHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [name, value] of Object.entries(securityHeaders)) console.log(`  ${name}: ${value}`);
}
