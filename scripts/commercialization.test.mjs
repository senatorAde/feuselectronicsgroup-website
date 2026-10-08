import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { createServer } from 'vite'
import handler, { createContactHandler } from '../api/contact.js'
import { contactAvailable, consumeContactRate } from '../api/contactControls.js'
import { readContactAvailability, sendContact } from '../src/services/contactClient.js'
import { JOURNEY_CALLS, READINESS_PACK, USE_CASE_STORIES } from '../src/data/commercialJourney.js'
import { resolveInquiry } from '../src/data/contactNavigation.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = path => readFileSync(join(root, path), 'utf8')
const fixtureValue = label => ['fixture', label, 'not', 'a', 'credential'].join('-')
const configured = {
  CONTACT_DELIVERY_ENABLED: 'true', CONTACT_PRIVACY_ENABLED: 'true', CONTACT_ABUSE_CONTROLS_ENABLED: 'true',
  RESEND_API_KEY: fixtureValue('provider'), CONTACT_EMAIL_TO: 'test@example.invalid', CONTACT_EMAIL_FROM: 'test@example.invalid',
  CONTACT_RATE_LIMIT_URL: 'https://rate.example.invalid', CONTACT_RATE_LIMIT_TOKEN: fixtureValue('rate'),
  CONTACT_RATE_LIMIT_SALT: 'synthetic-salt', CONTACT_SITE_ORIGIN: 'https://example.invalid',
}
const response = () => ({ headers: {}, setHeader(k, v) { this.headers[k] = v }, status(code) { this.code = code; return this }, json(body) { this.body = body; return this } })
const request = () => ({ method: 'POST', headers: { origin: configured.CONTACT_SITE_ORIGIN }, socket: { remoteAddress: '192.0.2.1' }, body: { firstName: 'Test', lastName: 'User', email: 'test@example.invalid', company: 'Fixture', inquiryType: 'Request a FEUS.ai Intro', message: 'Synthetic inquiry', privacyConsent: true, website: '' } })

async function withConfig(callback) {
  const previous = Object.fromEntries(Object.keys(configured).map(key => [key, process.env[key]]))
  Object.assign(process.env, configured)
  try { await callback() } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  }
}

test('contact is unavailable unless every operator control and provider dependency is configured', () => {
  assert.equal(Boolean(contactAvailable({})), false)
  assert.equal(Boolean(contactAvailable(configured)), true)
  for (const key of Object.keys(configured)) {
    assert.equal(Boolean(contactAvailable({ ...configured, [key]: '' })), false, key)
  }
  assert.equal(Boolean(contactAvailable({ ...configured, CONTACT_PRIVACY_ENABLED: 'TRUE' })), false)
  assert.equal(Boolean(contactAvailable({ ...configured, CONTACT_RATE_LIMIT_URL: 'http://example.invalid' })), false)
})

test('configuration guard refuses delivery and GET describes no CRM without returning secrets', async () => {
  await withConfig(async () => {
    process.env.CONTACT_DELIVERY_ENABLED = 'false'
    const res = response()
    await handler(request(), res)
    assert.equal(res.code, 503)
    const status = response()
    await handler({ method: 'GET' }, status)
    assert.deepEqual(status.body, { available: false, delivery: 'email_provider', durableCRM: false })
    assert.equal(status.headers['Cache-Control'], 'no-store')
    assert.ok(!JSON.stringify(status.body).includes(configured.CONTACT_RATE_LIMIT_TOKEN))
    assert.ok(!JSON.stringify(status.body).includes(configured.RESEND_API_KEY))
  })
})

test('server rejects whitespace, objects, oversized fields, wrong intents, honeypot and missing consent before provider', async () => {
  await withConfig(async () => {
    let rates = 0
    const guarded = createContactHandler({ rateCheck: async () => { rates++; throw new Error('Should not call') } })
    for (const patch of [{ firstName: ' ' }, { company: {} }, { message: 'x'.repeat(5001) }, { inquiryType: 'arbitrary' }, { website: 'bot.example' }, { privacyConsent: false }, { email: 'a@b.invalid\r\nBcc: injected@b.invalid' }]) {
      const req = request(); Object.assign(req.body, patch)
      const res = response(); await guarded(req, res)
      assert.equal(res.code, 400, JSON.stringify(patch).slice(0, 70))
    }
    assert.equal(rates, 0)
    const crossOrigin = request(); crossOrigin.headers.origin = 'https://attacker.invalid'
    const res = response(); await guarded(crossOrigin, res)
    assert.equal(res.code, 403)
  })
})

test('shared rate protection fails closed and reports throttling visibly', async () => {
  await withConfig(async () => {
    for (const [rateCheck, expected] of [[async () => false, 429], [async () => { throw new Error('offline') }, 503]]) {
      const res = response()
      await createContactHandler({ rateCheck })(request(), res)
      assert.equal(res.code, expected)
      assert.equal(res.body.success, undefined)
      if (expected === 429) assert.equal(res.headers['Retry-After'], '600')
    }
  })
})

test('real rate adapter uses atomic shared counters and never sends raw IP or inquiry', async () => {
  let payload
  const transport = async (_url, options) => { payload = JSON.parse(options.body); return { ok: true, json: async () => ({ result: 1 }) } }
  assert.equal(await consumeContactRate(request(), configured, transport), true)
  assert.equal(payload[0], 'EVAL')
  assert.match(payload[1], /INCR/)
  assert.match(payload[1], /EXPIRE/)
  assert.doesNotMatch(JSON.stringify(payload), /192\.0\.2\.1|Synthetic inquiry|test@example/)
  assert.equal(await consumeContactRate(request(), configured, async () => ({ ok: true, json: async () => ({ result: 0 }) })), false)
  await assert.rejects(consumeContactRate(request(), configured, async () => ({ ok: true, json: async () => ({ result: 'unknown' }) })), /unavailable/)
  await assert.rejects(consumeContactRate({ headers: { 'x-forwarded-for': 'spoof' } }, configured, transport), /Trusted client/)
})

test('browser lead client reports network, malformed responses, operational guard and provider errors', async () => {
  assert.equal(await readContactAvailability(async () => { throw new Error('offline') }), false)
  assert.equal(await readContactAvailability(async () => ({ ok: true, json: async () => ({ available: 'true' }) })), false)
  assert.equal(await readContactAvailability(async () => ({ ok: true, json: async () => ({ available: true }) })), true)
  await assert.rejects(sendContact({}, async () => { throw new Error('offline') }), /Delivery is unknown/)
  await assert.rejects(sendContact({}, async () => ({ ok: true, json: async () => { throw new Error('not JSON') } })), /invalid response/)
  await assert.rejects(sendContact({}, async () => ({ ok: false, status: 503, json: async () => ({}) })), /unavailable/)
  await assert.rejects(sendContact({}, async () => ({ ok: false, status: 429, json: async () => ({ error: 'Too many inquiries' }) })), /Too many/)
  await assert.rejects(sendContact({}, async () => ({ ok: true, json: async () => ({ success: true }) })), /did not confirm/)
  assert.equal((await sendContact({}, async () => ({ ok: true, json: async () => ({ success: true, delivery: 'provider_accepted' }) }))).delivery, 'provider_accepted')
})

test('commercial data has the four approximate calls, full pack and bounded walkthroughs', () => {
  assert.equal(JOURNEY_CALLS.length, 4)
  for (const [index, duration] of ['20–30', '30–60', '60–90', '12–14'].entries()) assert.ok(JOURNEY_CALLS[index].timing.includes(duration))
  assert.equal(READINESS_PACK.length, 8)
  for (const story of USE_CASE_STORIES) {
    assert.equal(story.steps.length, 5)
    for (const [index, title] of ['Intent', 'Govern', 'Execute', 'Verify', 'Measure Value'].entries()) assert.ok(story.steps[index].startsWith(title))
  }
  assert.equal(resolveInquiry('intro').inquiryType, 'Request a FEUS.ai Intro')
  assert.equal(resolveInquiry('trial').inquiryType, 'FEUS.ai Readiness & Trial')
})

test('actual candidate pages SSR retain journey boundaries, email fallback and accessible walkthrough', async () => {
  const cacheDir = mkdtempSync(join(root, '.commercial-ssr-'))
  const server = await createServer({ root, cacheDir, server: { middlewareMode: true, watch: { ignored: () => true }, hmr: false, preTransformRequests: false }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] } })
  try {
    for (const [name, route, patterns] of [
      ['CommercialJourneyPage', '/journey', [/Request an intro/, /20–30/, /30–60/, /60–90/, /12–14/, /aria-pressed="true"/, /aria-live="polite"/, /not live execution/, /owner-ratified/, /not yet deployed/, /Existing runtime evidence does not approve/]],
      ['TrialPage', '/trial', [/No clock before onboarding/, /No auto-billing/, /explicit customer consent/, /day 12–14/i]],
      ['ReadinessPage', '/readiness', [/Hosted readiness/, /Expert installed readiness/, /all five gateway/, /do not need Git/, /not a browser-issued approval/, /customer-specific pack/]],
      ['PackagesPage', '/packages', [/Quoted per scope/, /approved/, /negotiated/, /Contact sales/, /<caption>/, /scope="row"/]],
      ['ContactPage', '/contact?type=intro', [/Request a FEUS.ai Intro/, /disabled=""/, /name="privacyConsent"/, /tabindex="-1"/, /mailto:info@feuselectronicsgroup.com/, /not yet booked/]],
      ['ArchitecturePage', '/architecture', [/official architecture reference/, /Not every component or arrow is implemented/, /feus-ai-architecture-reference.jpg/, /Snowflake/, /Databricks/, /Executive context/, /Technical context/, /Security context/]],
    ]) {
      const module = await server.ssrLoadModule(`/src/pages/${name}.jsx`)
      const html = renderToStaticMarkup(React.createElement(StaticRouter, { location: route }, React.createElement(module.default)))
      for (const pattern of patterns) assert.match(html, pattern, name)
    }
    const scheduler = await server.ssrLoadModule('/src/components/CalendlyEmbed.jsx')
    for (const value of ['', 'javascript:alert(1)', 'http://calendly.com/user/event', 'https://calendly.com/user', 'https://calendly.com.attacker.invalid/user/event']) assert.equal(scheduler.readSchedulerUrl(value), '')
    assert.equal(scheduler.readSchedulerUrl('https://calendly.com/fixture/event'), 'https://calendly.com/fixture/event')
    const fallback = renderToStaticMarkup(React.createElement(StaticRouter, {}, React.createElement(scheduler.CalendlyButton)))
    assert.match(fallback, /href="\/contact"/)
    assert.match(fallback, /appointment not yet booked/)
    assert.match(read('src/index.css'), /prefers-reduced-motion: reduce/)
    assert.match(read('src/index.css'), /min-height: 44px/)
    assert.match(read('src/components/UseCaseStories.jsx'), /No auto-play/)
    assert.doesNotMatch(read('src/components/UseCaseStories.jsx'), /setInterval|fetch\(|setTimeout/)
    assert.ok(existsSync(join(root, 'public', 'brand', 'feus-ai-architecture-reference.jpg')))
  } finally { await server.close(); rmSync(cacheDir, { recursive: true, force: true }) }
})
