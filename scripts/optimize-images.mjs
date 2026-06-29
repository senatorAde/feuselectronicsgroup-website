// scripts/optimize-images.mjs
// ─────────────────────────────────────────────────────────────────
// In-place optimizer for public/media/Sales/property-sales/**/*.JPG
// Resizes anything wider than MAX_WIDTH down to MAX_WIDTH and
// re-encodes at JPEG_QUALITY, stripping EXIF. Keeps a small
// `.optimized-manifest.json` so the script is idempotent across
// runs (already-optimized files are skipped).
//
// Usage:  npm run optimize:images          (only new/unoptimized)
//         npm run optimize:images -- --force   (re-process everything)
// ─────────────────────────────────────────────────────────────────

import { readdir, stat, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import sharp from 'sharp'

const ROOT = resolve(process.cwd(), 'public', 'media', 'Sales', 'property-sales')
const MANIFEST = resolve(process.cwd(), 'public', 'media', 'Sales', '.optimized-manifest.json')

const MAX_WIDTH = 1920
const JPEG_QUALITY = 82
const FORCE = process.argv.includes('--force')

async function walkJpgs(dir) {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      out.push(...(await walkJpgs(full)))
    } else if (/\.(jpe?g)$/i.test(e.name)) {
      out.push(full)
    }
  }
  return out
}

async function loadManifest() {
  if (FORCE || !existsSync(MANIFEST)) return {}
  try {
    return JSON.parse(await readFile(MANIFEST, 'utf8'))
  } catch {
    return {}
  }
}

async function main() {
  if (!existsSync(ROOT)) {
    console.error(`Source folder not found: ${ROOT}`)
    process.exit(1)
  }

  const files = await walkJpgs(ROOT)
  const manifest = await loadManifest()
  let processed = 0
  let skipped = 0
  let savedBytes = 0
  const t0 = Date.now()

  for (const file of files) {
    const rel = relative(process.cwd(), file).replace(/\\/g, '/')
    const beforeStat = await stat(file)

    if (manifest[rel] && manifest[rel].sizeAfter === beforeStat.size && !FORCE) {
      skipped++
      continue
    }

    try {
      // Read full file into a buffer first so sharp can write back to
      // the same path without conflicting with its own open handle.
      const input = await readFile(file)
      const img = sharp(input, { failOn: 'truncated' })
      const meta = await img.metadata()
      const targetWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : null

      const pipeline = img.rotate() // honour EXIF orientation, then drop EXIF
      if (targetWidth) pipeline.resize({ width: targetWidth, withoutEnlargement: true })

      const output = await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toBuffer()

      await writeFile(file, output)
      const afterSize = output.length
      savedBytes += beforeStat.size - afterSize
      manifest[rel] = {
        sizeBefore: beforeStat.size,
        sizeAfter: afterSize,
        width: targetWidth || meta.width,
        height: meta.height && targetWidth ? Math.round((meta.height * targetWidth) / meta.width) : meta.height,
        optimizedAt: new Date().toISOString(),
      }
      processed++
      const pct = (((beforeStat.size - afterSize) / beforeStat.size) * 100).toFixed(0)
      console.log(`  ✓ ${rel}  ${(beforeStat.size / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB  (-${pct}%)`)
    } catch (err) {
      console.error(`  ✗ ${rel}  ${err.message}`)
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2))

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  console.log('')
  console.log(`Done in ${elapsed}s`)
  console.log(`  Processed: ${processed}`)
  console.log(`  Skipped (already optimized): ${skipped}`)
  console.log(`  Saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
