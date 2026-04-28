// Generates public/og-image.png — a 1200x630 social share image.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const ICON_PATH = resolve(root, 'public/icon.png');
const OUT_PATH = resolve(root, 'public/og-image.png');

const W = 1200;
const H = 630;
const ICON_SIZE = 280;
const ICON_X = 96;
const ICON_Y = (H - ICON_SIZE) / 2;
const TEXT_X = ICON_X + ICON_SIZE + 60;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1c8674"/>
      <stop offset="1" stop-color="#0e564a"/>
    </linearGradient>
    <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <circle cx="1050" cy="120" r="220" fill="#48b39d" opacity="0.18"/>
  <circle cx="970" cy="540" r="160" fill="#94d2c5" opacity="0.10"/>

  <text x="${TEXT_X}" y="225"
    font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif"
    font-size="22" font-weight="600"
    letter-spacing="3"
    fill="#bfe4dc"
    filter="url(#textShadow)">EDU PLUS APPS</text>

  <text x="${TEXT_X}" y="305"
    font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif"
    font-size="58" font-weight="800"
    letter-spacing="-1.5"
    fill="#ffffff"
    filter="url(#textShadow)">Software for the way</text>

  <text x="${TEXT_X}" y="370"
    font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif"
    font-size="58" font-weight="800"
    letter-spacing="-1.5"
    fill="#ffffff"
    filter="url(#textShadow)">K-12 work actually</text>

  <text x="${TEXT_X}" y="435"
    font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif"
    font-size="58" font-weight="800"
    letter-spacing="-1.5"
    fill="#ffffff"
    filter="url(#textShadow)">happens.</text>

  <text x="${TEXT_X}" y="510"
    font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif"
    font-size="22" font-weight="500"
    fill="#94d2c5"
    filter="url(#textShadow)">eduplusapps.com</text>
</svg>`;

const iconBuf = await sharp(ICON_PATH).resize(ICON_SIZE, ICON_SIZE).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: iconBuf, top: Math.round(ICON_Y), left: Math.round(ICON_X) }])
  .png()
  .toFile(OUT_PATH);

console.log(`Generated ${OUT_PATH}`);
