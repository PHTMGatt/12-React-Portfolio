import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Security headers for every response, on both hosts. Render serves them from
// scripts/asset-cache-plugin.mjs (the `vite preview` production server);
// Netlify reads the same lines from public/_headers. A test keeps the two in
// step, so change them here and copy the printed lines into public/_headers.
//
// The only inline script is the theme restore in index.html's <head>. It has
// to run before styles load, so it stays inline and is allowed by its hash.
// Editing that script changes the hash: run `node --test scripts/` and update
// public/_headers from the failure message.
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
  // The contact form posts through EmailJS.
  "connect-src 'self' https://api.emailjs.com",
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

// Render sits behind Cloudflare with HTTPS only; Netlify already adds HSTS itself.
export const renderOnlyHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [name, value] of Object.entries(securityHeaders)) console.log(`  ${name}: ${value}`);
}
