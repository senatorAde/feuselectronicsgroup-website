import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { createServer } from 'vite'
import { Resend } from 'resend'
import { createContactHandler } from '../api/contact.js'
import { CLOUD_RUNTIME, HISTORICAL_CLOUD_VALIDATION, HISTORICAL_DEPLOYMENT_0000009, LATEST_DEPLOYED_RECORD, STARTER_STATUS, ROUTING_AUTHORITY } from '../src/data/cloudRuntime.js'
import { HOSTED_RUNTIME } from '../src/data/productionTruth.js'
import { POSTURE_HISTORY } from '../src/data/releaseAssessment.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('deployment checkpoint is distinct from historical validation and pending starter acceptance', () => {
  assert.equal(HISTORICAL_CLOUD_VALIDATION.sourceRevision, '78ef0630650f41ddd72fd7eb3df55ed42e5bc562')
  assert.equal(HISTORICAL_DEPLOYMENT_0000009.sourceRevision, '72b306570fa3eea731c57f5ede8b2a6ee9e0e3e4')
  assert.equal(HISTORICAL_DEPLOYMENT_0000009.signedRevision, 'ff67fc8')
  assert.equal(HISTORICAL_DEPLOYMENT_0000009.revision, 'ca-feus-runtime--0000009')
  assert.equal(HISTORICAL_DEPLOYMENT_0000009.imageDigest, 'sha256:843813f417c4d276d19788d3e1130ade91ba2a4f386941d654e4c0f589c49459')
  assert.equal(LATEST_DEPLOYED_RECORD.sourceRevision, HOSTED_RUNTIME.source_commit)
  assert.equal(LATEST_DEPLOYED_RECORD.revision, HOSTED_RUNTIME.active_revision)
  assert.equal(LATEST_DEPLOYED_RECORD.imageDigest, HOSTED_RUNTIME.image_digest)
  assert.equal(LATEST_DEPLOYED_RECORD.trafficPercentAtCheckpoint, 100)
  assert.equal(LATEST_DEPLOYED_RECORD.checkpointUtc, HOSTED_RUNTIME.last_verified_at)
  assert.equal(CLOUD_RUNTIME.releaseRevision, LATEST_DEPLOYED_RECORD.sourceRevision)
  assert.equal(STARTER_STATUS.failureReference, 'cf7aa36f')
  assert.equal(STARTER_STATUS.status, 'bounded_core_acceptance_only')
  assert.match(CLOUD_RUNTIME.qualification, /customer-browser.*unverified/)
  assert.match(ROUTING_AUTHORITY.modelQualification, /owner-ratified/)
  assert.match(ROUTING_AUTHORITY.modelQualification, /tenant- and environment-scoped approval/)
  assert.doesNotMatch(ROUTING_AUTHORITY.modelQualification, /not ratified|no PROD model eligibility/)
})

test('historical evidence is unchanged; supersession flags and new observation are explicit', async () => {
  // Baseline is the branch parent recorded at task start; no remote access.
  const baseline = execFileSync('git', ['show', '06108ec0902dd1278f90f0b8ecede84df39549ac:src/data/releaseAssessment.js'], { cwd: root, encoding: 'utf8' })
  const original = await import(`data:text/javascript;base64,${Buffer.from(baseline).toString('base64')}`)
  const evidence = ({ current, controllingLabel, ...record }) => record
  assert.deepEqual(POSTURE_HISTORY.slice(0, original.POSTURE_HISTORY.length).map(evidence), original.POSTURE_HISTORY.map(evidence))
  assert.equal(POSTURE_HISTORY.length, original.POSTURE_HISTORY.length + 2)
  assert.equal(POSTURE_HISTORY.filter(record => record.authority === 'Cloud runtime release verification' && record.current).length, 1)
})

test('raw HTML contains absolute JPEG homepage OG for non-JavaScript crawlers', async () => {
  const html = read('index.html')
  const tag = (attribute, name) => html.match(new RegExp(`<meta ${attribute}="${name}" content="([^"]+)"`))?.[1]
  const image = new URL(tag('property', 'og:image'))
  assert.equal(image.href, 'https://feuselectronicsgroup.com/brand/feus-social-preview.jpg')
  assert.equal(tag('property', 'og:url'), 'https://feuselectronicsgroup.com/')
  assert.equal(tag('property', 'og:title'), 'FEUS Electronics Group')
  assert.equal(tag('name', 'twitter:image'), image.href)
  const metadata = await sharp(fileURLToPath(new URL(`../public${image.pathname}`, import.meta.url))).metadata()
  assert.equal(metadata.format, 'jpeg')
  assert.equal(tag('property', 'og:image:type'), 'image/jpeg')
  assert.equal(Number(tag('property', 'og:image:width')), metadata.width)
  assert.equal(Number(tag('property', 'og:image:height')), metadata.height)
  assert.equal(metadata.width, 1200)
  assert.equal(metadata.height, 630)
  assert.match(read('src/components/SEO.jsx'), /image = '\/brand\/feus-social-preview.jpg'/)
  assert.match(html, /distinct route previews require prerendering or SSR/)
})

test('shared experience artwork is optimized and rendered on its owning surfaces', async () => {
  const visuals = [
    ['feus-secure-cloud-operations.webp', 'src/pages/HomePage.jsx'],
    ['feus-agent-orchestration.webp', 'src/pages/AgentsPage.jsx'],
    ['feus-governed-pipeline.webp', 'src/pages/ControlPlanePage.jsx'],
  ]
  for (const [assetName, page] of visuals) {
    const asset = readFileSync(new URL(`../public/brand/${assetName}`, import.meta.url))
    const metadata = await sharp(asset).metadata()
    assert.equal(metadata.format, 'webp', assetName)
    assert.equal(metadata.width, 1672, assetName)
    assert.equal(metadata.height, 941, assetName)
    assert.ok(asset.length < 300_000, `${assetName} should stay below 300 KB`)
    assert.match(read(page), new RegExp(`/brand/${assetName}`), page)
  }
  assert.match(
    read('src/pages/ControlPlanePage.jsx'),
    /Conceptual operating-model illustration, not a live system view/,
  )
})

test('contact transport and legal disclosures do not claim delivery or a response deadline', () => {
  const contact = read('src/pages/ContactPage.jsx')
  assert.match(contact, /sendContact/)
  assert.doesNotMatch(contact, /emailjs/)
  assert.match(read('src/services/contactClient.js'), /transport\('\/api\/contact'/)
  assert.match(contact, /delivery, privacy and shared abuse controls/)
  assert.match(contact, /End-to-end inbox delivery has not been verified/)
  assert.match(contact, /provider accepted your request/)
  assert.doesNotMatch(contact, /within (?:one|1) business day|Messages are delivered|We've received your message/i)
  const privacy = read('src/pages/PrivacyPage.jsx')
  for (const term of [/EmailJS/, /Resend/, /calls that endpoint/, /not yet been approved by legal counsel/, /Draft published 2026-09-07/]) assert.match(privacy, term)
  assert.doesNotMatch(read('api/contact.js'), /console\.error\([^\n]*,\s*(?:err|error)\)/)
})

test('actual corrected pages render release distinctions and contact/legal limits', async () => {
  const cacheDir = mkdtempSync(join(root, '.test-ssr-'))
  const server = await createServer({
    root,
    cacheDir,
    server: { middlewareMode: true, watch: { ignored: () => true }, hmr: false, preTransformRequests: false },
    appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] },
  })
  try {
    for (const [name, route, patterns] of [
      ['CloudRuntimePage', '/cloud-runtime', [/rc-d057b81-chn/, /d057b81/, /8bd0ccd/, /78ef063/, /customer-browser.*unverified/, /Historical validation evidence/]],
      ['ReleaseNotesPage', '/release-notes', [/0000009/, /Historical validation record/, /NO-GO/, /STARTER CORRECTION PENDING/]],
      ['ContactPage', '/contact', [/server-side Resend/, /End-to-end inbox delivery has not been verified/, /Response time is not guaranteed/]],
      ['PrivacyPage', '/legal/privacy', [/EmailJS/, /Resend/, /published draft, not a binding agreement/]],
    ]) {
      const { default: Component } = await server.ssrLoadModule(`/src/pages/${name}.jsx`)
      const html = renderToStaticMarkup(React.createElement(StaticRouter, { location: route }, React.createElement(Component)))
      const copy = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')
      for (const pattern of patterns) assert.match(copy, pattern, name)
    }
  } finally {
    await server.close()
    rmSync(cacheDir, { recursive: true, force: true })
  }
})

test('Resend endpoint reports acceptance honestly with only local provider stubs', async () => {
  const originalPost = Resend.prototype.post
  const originalFetch = globalThis.fetch
  const originalKey = process.env.RESEND_API_KEY
  const keys = ['CONTACT_DELIVERY_ENABLED', 'CONTACT_PRIVACY_ENABLED', 'CONTACT_ABUSE_CONTROLS_ENABLED', 'CONTACT_EMAIL_TO', 'CONTACT_EMAIL_FROM', 'CONTACT_RATE_LIMIT_TOKEN', 'CONTACT_RATE_LIMIT_SALT', 'CONTACT_RATE_LIMIT_URL', 'CONTACT_SITE_ORIGIN']
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]))
  Object.assign(process.env, { CONTACT_DELIVERY_ENABLED: 'true', CONTACT_PRIVACY_ENABLED: 'true', CONTACT_ABUSE_CONTROLS_ENABLED: 'true', CONTACT_EMAIL_TO: 'test@example.invalid', CONTACT_EMAIL_FROM: 'test@example.invalid', CONTACT_RATE_LIMIT_TOKEN: ['fixture', 'rate', 'not', 'credential'].join('-'), CONTACT_RATE_LIMIT_SALT: 'test-salt', CONTACT_RATE_LIMIT_URL: 'https://rate.example.invalid', CONTACT_SITE_ORIGIN: 'https://example.invalid' })
  const handler = createContactHandler({ rateCheck: async () => true })
  process.env.RESEND_API_KEY = ['fixture', 'provider', 'not', 'credential'].join('-')
  globalThis.fetch = () => { throw new Error('Network forbidden in contact tests') }
  const req = { method: 'POST', headers: { origin: 'https://example.invalid' }, body: { firstName: '<Test>', lastName: 'User', email: 'test@example.invalid', company: 'Fixture', inquiryType: 'General Inquiry', message: 'Synthetic fixture only', privacyConsent: true, website: '' } }
  const response = () => ({ status(code) { this.code = code; return this }, json(body) { this.body = body; return this } })
  try {
    let calls = []
    Resend.prototype.post = async (_path, body) => { calls.push(body); return { error: { message: 'rejected' }, data: null } }
    let res = response()
    await handler(req, res)
    assert.equal(res.code, 502)
    assert.equal(calls.length, 1)
    assert.equal(res.body.success, undefined)
    assert.match(calls[0].html, /&lt;Test&gt;/)
    assert.doesNotMatch(calls[0].html, /<Test>/)
    for (const ackFailure of ['resolved', 'thrown', 'none']) {
      calls = []
      Resend.prototype.post = async (_path, body) => {
        calls.push(body)
        if (calls.length === 2 && ackFailure === 'thrown') throw new Error('stub failure')
        if (calls.length === 2 && ackFailure === 'resolved') return { error: { message: 'rejected' } }
        return { data: { id: 'fixture-id' }, error: null }
      }
      res = response()
      await handler(req, res)
      assert.equal(res.code, 200)
      assert.equal(res.body.delivery, 'provider_accepted')
      assert.equal(res.body.acknowledgementAccepted, ackFailure === 'none')
      assert.match(res.body.message, /inbox delivery is not confirmed/)
    }
    res = response()
    await handler({ method: 'POST', headers: req.headers }, res)
    assert.equal(res.code, 400)
  } finally {
    Resend.prototype.post = originalPost
    globalThis.fetch = originalFetch
    if (originalKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = originalKey
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key]
      else process.env[key] = previous[key]
    }
  }
})