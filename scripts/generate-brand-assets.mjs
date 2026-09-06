import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const sharedBrandRoot = resolve(projectRoot, '..', '..', 'FEUS-Shared', 'branding')
const outputRoot = resolve(projectRoot, 'public', 'brand')
const logoSource = resolve(sharedBrandRoot, 'FEUS logo 2026.png')
const portraitSource = resolve(sharedBrandRoot, 'DSC_4281.JPG')

const heroArtwork = Buffer.from(`
  <svg width="1600" height="1040" viewBox="0 0 1600 1040" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#061326"/>
        <stop offset="0.55" stop-color="#082443"/>
        <stop offset="1" stop-color="#073a46"/>
      </linearGradient>
      <radialGradient id="signal" cx="78%" cy="43%" r="52%">
        <stop offset="0" stop-color="#0b9cff" stop-opacity="0.34"/>
        <stop offset="0.52" stop-color="#38d996" stop-opacity="0.11"/>
        <stop offset="1" stop-color="#061326" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
        <path d="M64 0H0V64" fill="none" stroke="#a7c8e8" stroke-opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="1600" height="1040" fill="url(#bg)"/>
    <rect width="1600" height="1040" fill="url(#signal)"/>
    <rect width="1600" height="1040" fill="url(#grid)"/>
    <g fill="none" stroke-linecap="round">
      <path d="M-120 840 C260 660 430 900 760 704 S1190 470 1710 650" stroke="#11a8ff" stroke-width="3" stroke-opacity="0.34"/>
      <path d="M-90 910 C270 730 515 944 790 754 S1220 560 1710 710" stroke="#78df4f" stroke-width="2" stroke-opacity="0.28"/>
      <path d="M-60 760 C290 612 480 820 748 640 S1210 392 1670 548" stroke="#ffbd4a" stroke-width="2" stroke-opacity="0.2"/>
    </g>
    <g fill="#b7e8ff">
      <circle cx="170" cy="772" r="6" opacity="0.72"/>
      <circle cx="430" cy="800" r="5" opacity="0.58"/>
      <circle cx="714" cy="661" r="7" opacity="0.72"/>
      <circle cx="1008" cy="545" r="6" opacity="0.64"/>
      <circle cx="1322" cy="522" r="5" opacity="0.52"/>
      <circle cx="1490" cy="606" r="7" opacity="0.72"/>
    </g>
    <g fill="none" stroke="#d8efff" stroke-opacity="0.16">
      <circle cx="1240" cy="430" r="310"/>
      <circle cx="1240" cy="430" r="370"/>
      <circle cx="1240" cy="430" r="430"/>
    </g>
    <path d="M0 0H770C600 242 585 764 760 1040H0Z" fill="#061326" fill-opacity="0.48"/>
  </svg>
`)

const socialArtwork = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#061326"/>
        <stop offset="0.64" stop-color="#0a2b4c"/>
        <stop offset="1" stop-color="#07505a"/>
      </linearGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0H0V48" fill="none" stroke="#9ed6f5" stroke-opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <path d="M0 510C240 420 405 590 620 460S970 294 1230 390" fill="none" stroke="#10a7ff" stroke-width="3" stroke-opacity="0.38"/>
    <path d="M0 550C260 450 430 620 650 490S970 355 1230 432" fill="none" stroke="#78df4f" stroke-width="2" stroke-opacity="0.3"/>
    <text x="86" y="282" fill="#ffffff" font-family="Arial, sans-serif" font-size="60" font-weight="700">FEUS Electronics Group</text>
    <text x="90" y="344" fill="#bcd0e5" font-family="Arial, sans-serif" font-size="27">Enterprise technology. Governed intelligence.</text>
    <rect x="90" y="382" width="138" height="7" rx="3.5" fill="#78df4f"/>
  </svg>
`)

async function buildLogo() {
  await sharp(logoSource)
    .resize({ width: 720, height: 720, fit: 'cover' })
    .webp({ quality: 88, effort: 6 })
    .toFile(resolve(outputRoot, 'feus-logo-2026.webp'))

  await sharp(logoSource)
    .resize({ width: 96, height: 96, fit: 'cover' })
    .png({ compressionLevel: 9, palette: true })
    .toFile(resolve(outputRoot, 'feus-favicon-2026.png'))
}

async function buildHero() {
  const logoOverlay = await sharp(logoSource)
    .resize({ width: 650, height: 650, fit: 'contain' })
    .png()
    .toBuffer()

  await sharp(heroArtwork)
    .composite([{ input: logoOverlay, left: 900, top: 128, blend: 'screen' }])
    .webp({ quality: 86, effort: 6 })
    .toFile(resolve(outputRoot, 'feus-hero-system.webp'))
}

async function buildSocialPreview() {
  const logoOverlay = await sharp(logoSource)
    .resize({ width: 360, height: 360, fit: 'contain' })
    .png()
    .toBuffer()

  await sharp(socialArtwork)
    .composite([{ input: logoOverlay, left: 800, top: 128, blend: 'screen' }])
    .webp({ quality: 88, effort: 6 })
    .toFile(resolve(outputRoot, 'feus-social-preview.webp'))
}

async function buildPortrait() {
  await sharp(portraitSource)
    .rotate()
    .resize({ width: 1000, height: 1200, fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.9, brightness: 0.96 })
    .webp({ quality: 84, effort: 6 })
    .toFile(resolve(outputRoot, 'founder-portrait.webp'))
}

await mkdir(outputRoot, { recursive: true })
await Promise.all([buildLogo(), buildHero(), buildSocialPreview(), buildPortrait()])

console.log('Generated FEUS brand assets in public/brand')