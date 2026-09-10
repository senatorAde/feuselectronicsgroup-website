// Crawler-compatible derivative of the existing shared-brand artwork.
// Does not regenerate or replace any other brand asset.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../public/brand/feus-social-preview.webp', import.meta.url))
const target = fileURLToPath(new URL('../public/brand/feus-social-preview.jpg', import.meta.url))
await sharp(source).flatten({ background: '#061326' }).jpeg({ quality: 90 }).toFile(target)
console.log('Generated shared-brand social JPEG (1200 × 630)')