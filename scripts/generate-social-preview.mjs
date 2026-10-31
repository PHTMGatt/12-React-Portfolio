import sharp from 'sharp';
import { profile } from '../src/data/profile.js';

// Intentional identity card, not an app screenshot. Reuses the approved portrait.
// Run with DejaVu Sans installed when changing the card; commit the resulting JPEG
// so production builds do not depend on the host's font availability.
const escapeXml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0b1320"/>
  <rect x="64" y="68" width="48" height="5" rx="2" fill="#7dd3fc"/>
  <g font-family="DejaVu Sans, sans-serif">
    <text x="64" y="120" font-size="20" letter-spacing="3" fill="#7dd3fc">DEVELOPER PORTFOLIO</text>
    <text x="60" y="236" font-size="70" font-weight="bold" fill="#f5f8fc">${escapeXml(profile.name)}</text>
    <text x="64" y="295" font-size="31" fill="#d4deeb">${escapeXml(profile.role)}</text>
    <text x="64" y="384" font-size="24" fill="#abbace">Web applications. APIs.</text>
    <text x="64" y="421" font-size="24" fill="#abbace">Automation built around real problems.</text>
    <text x="64" y="541" font-size="21" fill="#7dd3fc">${escapeXml(profile.githubHandle)}</text>
  </g>
  <rect x="807" y="99" width="332" height="412" rx="4" fill="#233348"/>
</svg>`);
const portrait = await sharp('src/assets/photos/bryen-headshot.webp').resize(320, 400, { fit: 'contain' }).toBuffer();
await sharp(card).composite([{ input: portrait, left: 813, top: 105 }]).jpeg({ quality: 90, mozjpeg: true }).toFile('public/social-preview.jpg');
console.log('Generated public/social-preview.jpg (1200 × 630)');
