import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, cpSync, mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createServer } from 'vite'
import { resolveInquiry, focusContactForm, inquiryTypes } from '../src/data/contactNavigation.js'
import { LIVE_DEMO } from '../src/data/demoExperience.js'
import { CLOUD_ARCHITECTURE, CLOUD_RUNTIME, ROUTING_AUTHORITY } from '../src/data/cloudRuntime.js'
import { PLATFORM_STATUS, DEMO_DISCLAIMER } from '../src/data/publicStatus.js'
import { RELEASE_ASSESSMENT, KNOWN_LIMITATIONS, FAQ_ITEMS } from '../src/data/releaseAssessment.js'

const root = fileURLToPath(new URL('../', import.meta.url))
// Disable the mapped-drive watcher. SSR transforms use the real Vite/React
// components, not source regexes standing in for rendered copy or navigation.
const server = await createServer({
  root,
  server: { middlewareMode: true, watch: { ignored: () => true }, hmr: false, preTransformRequests: false },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
})
after(() => server.close())
const { renderPage } = await server.ssrLoadModule('/scripts/audit-render.jsx')
const page = async (name, location) => {
  const { default: Component } = await server.ssrLoadModule(`/src/pages/${name}.jsx`)
  return renderPage(Component, location)
}
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
const links = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replaceAll('&amp;', '&'))

test('demo, adoption, security and offline intents resolve to selectable options', () => {
  for (const [intent, label] of [
    ['demo', 'Request a Guided Live FEUS.ai Demonstration'],
    ['adoption', 'FEUS.ai Adoption & Onboarding'],
    ['security', 'Governance & Security'],
    ['governance', 'Governance & Security'],
    ['offline-demo', 'Request an Offline Fixture Demonstration'],
  ]) {
    assert.deepEqual(resolveInquiry(intent), { inquiryType: label, formType: 'contact' })
    assert.ok(inquiryTypes.includes(label))
  }
})

test('untrusted URL values and prototype keys cannot inject an inquiry or keep review mode', () => {
  for (const intent of [null, '', 'unknown', '__proto__', 'constructor', 'toString', '<script>', 'DEMO', '%ZZ']) {
    assert.deepEqual(resolveInquiry(intent), { inquiryType: '', formType: 'contact' })
  }
  assert.equal(resolveInquiry('review').formType, 'demo_feedback')
  assert.equal(resolveInquiry('security').formType, 'contact')
  assert.ok(inquiryTypes.includes(resolveInquiry('review').inquiryType))
})

test('contact navigation focuses and reveals the field even below a stacked mobile sidebar', () => {
  const calls = []
  focusContactForm(
    { scrollIntoView: (options) => calls.push(['scroll', options]) },
    {
      focus: (options) => calls.push(['focus', options]),
      scrollIntoView: (options) => calls.push(['reveal', options]),
    },
  )
  assert.deepEqual(calls, [
    ['scroll', { block: 'start', behavior: 'auto' }],
    ['focus', { preventScroll: true }],
    ['reveal', { block: 'center', behavior: 'instant' }],
  ])
  assert.doesNotThrow(() => focusContactForm(null, null))
})

test('rendered contact deep links select the correct option; required fields remain', async () => {
  for (const intent of ['demo', 'adoption', 'security', 'offline-demo', 'review']) {
    const html = await page('ContactPage', `/contact?type=${intent}#contact-form`)
    const options = [...html.matchAll(/<option value="([^"]*)"([^>]*)>/g)]
    const selected = options.find((option) => option[2].includes('selected'))
    assert.equal(selected?.[1].replaceAll('&amp;', '&'), resolveInquiry(intent).inquiryType)
    assert.match(html, /id="contact-form"/)
    assert.match(html, /id="inquiryType"[^>]*required=""/)
    assert.match(html, /id="email"[^>]*required=""/)
  }
  const html = await page('ContactPage', '/contact?type=__proto__')
  assert.match(html, /<option value="" selected="">/)
})

test('demo renders live evaluation first with a genuinely separate offline simulation', async () => {
  const html = await page('DemoPage', '/demo')
  const copy = text(html)
  assert.ok(copy.indexOf(LIVE_DEMO.title) < copy.indexOf('Alternative: offline fixture demonstration'))
  for (const term of ['Microsoft Foundry', 'TST', 'synthetic inputs', 'Microsoft Entra ID', 'tenant authorization', 'spend budgets', 'refused']) assert.ok(copy.includes(term), term)
  assert.match(copy, /Live model inference is not evidence of live SQL or tool execution/)
  assert.match(copy, /SIMULATION/)
  assert.ok(copy.includes(DEMO_DISCLAIMER.compact))
  assert.ok(links(html).includes('/contact?type=demo#contact-form'))
  assert.ok(links(html).includes('/contact?type=offline-demo#contact-form'))
  assert.doesNotMatch(copy, /no account to create|Every demonstration.*LOCAL/)
})

test('main evaluation surfaces explain live demo constraints and keep demo/adoption separate', async () => {
  for (const [name, route] of [['HomePage', '/'], ['FeusAiPage', '/feus-ai'], ['CloudRuntimePage', '/cloud-runtime'], ['GetStartedPage', '/get-started']]) {
    const html = await page(name, route)
    const copy = text(html)
    for (const term of [/TST/, /synthetic inputs/i, /Entra/, /budget/i, /no customer connections/i]) assert.match(copy, term, name)
    assert.ok(links(html).includes('/demo'), name)
    assert.doesNotMatch(copy, /NO-GO|above LOCAL/, name)
  }
  const started = await page('GetStartedPage', '/get-started')
  assert.ok(links(started).includes('/contact?type=adoption#contact-form'))
})

test('all security reporting surfaces deep-link to the selected and focusable form', async () => {
  for (const [name, route] of [['SecurityPage', '/security'], ['TrustPage', '/trust'], ['TrustSecurityPage', '/trust/security']]) {
    assert.ok(links(await page(name, route)).includes('/contact?type=security#contact-form'), name)
  }
})

test('trust and architecture lead current cloud scope; historical evidence stays labelled and retained', async () => {
  const trust = text(await page('TrustPage', '/trust'))
  assert.ok(trust.indexOf('Current cloud evaluation') < trust.indexOf('NO-GO'))
  assert.match(trust, /Historical assessment · 5\.2\.0-enterprise\.1/)
  const html = await page('ArchitecturePage', '/architecture')
  const copy = text(html)
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.ok(copy.indexOf('Cloud evaluation path') < copy.indexOf('Historical 5.2 architecture'))
  const expected = ['Public website', 'Azure workbench', 'Microsoft Entra ID', 'Tenant authorization', 'Classification', 'FEUS Policy Router', 'Eligible model / provider', 'Governed agent / tool boundary', 'Durable storage']
  assert.deepEqual(CLOUD_ARCHITECTURE.map((stage) => stage.title), expected)
  let previous = html.indexOf('aria-labelledby="cloud-path"')
  for (const title of expected) {
    const at = html.indexOf(`>${title}</h3>`, previous)
    assert.ok(at > previous, title)
    previous = at
  }
  assert.match(copy, /Live inference is not live SQL or tool execution/)
  assert.match(copy, /Historical assessed vNext state/)
  assert.equal(RELEASE_ASSESSMENT.decision, 'NO-GO')
  assert.equal(RELEASE_ASSESSMENT.certifiedRevision, '3c401504aef201b510c8695bac7c31ad424c2274')
  assert.ok(KNOWN_LIMITATIONS.length >= 12)
  assert.ok(FAQ_ITEMS.length >= 13)
})

test('status is static, incident state unknown, and publication dates are honest', async () => {
  const copy = text(await page('StatusPage', '/status'))
  assert.equal(PLATFORM_STATUS.activeIncidents, null)
  assert.match(copy, /Static evidence summary, not live incident monitoring/)
  assert.match(copy, /Current incident state is unknown/)
  assert.doesNotMatch(copy, /No active incidents reported|responding normally|Current health/)
  assert.ok(copy.includes(CLOUD_RUNTIME.verifiedOn))
  assert.match(copy, /Source verification date \(UTC\): 2026-09-08/)
  assert.match(copy, /local time \(UTC−04:00\)/)
  assert.doesNotMatch(copy, /source date is later|needs reconciliation|future.dated/i)
  assert.equal(CLOUD_RUNTIME.verifiedOn, '2026-09-08')
  assert.match(copy, /published cloud release evidence/i)
})

test('cost and model governance cannot imply measured savings or production eligibility', () => {
  assert.match(LIVE_DEMO.cost, /not billed actuals/)
  assert.match(LIVE_DEMO.cost, /frontier models avoided.*not measured savings/)
  assert.match(CLOUD_RUNTIME.qualification, /proposed and not ratified/)
  assert.match(CLOUD_RUNTIME.qualification, /no PROD model eligibility/)
  assert.match(ROUTING_AUTHORITY.foundryRouterNote, /not active/)
})

test('legal documents remain unapproved drafts and evidence copy has no checkout editorial', async () => {
  for (const [name, route] of [['PrivacyPage', '/legal/privacy'], ['TermsPage', '/legal/terms']]) {
    assert.match(text(await page(name, route)), /published draft, not a binding agreement/)
  }
  const source = readFileSync(join(root, 'src/data/publicStatus.js'), 'utf8')
  assert.doesNotMatch(source, /this checkout/)
  assert.match(source, /not available for public inspection/)
})

test('existing claims gate still rejects marketing release-gate leakage (isolated mutation)', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'feus-claims-mutation-'))
  try {
    const allowed = new Set(['.js', '.jsx', '.mjs', '.json', '.txt', '.xml', '.html'])
    for (const directory of ['src', 'public']) {
      cpSync(join(root, directory), join(fixture, directory), {
        recursive: true,
        filter: (source) => !extname(source) || allowed.has(extname(source)),
      })
    }
    mkdirSync(join(fixture, 'scripts'))
    cpSync(join(root, 'scripts/validate-public-claims.mjs'), join(fixture, 'scripts/validate-public-claims.mjs'))
    cpSync(join(root, 'index.html'), join(fixture, 'index.html'))
    writeFileSync(join(fixture, 'package.json'), '{"type":"module"}')
    const run = () => spawnSync(process.execPath, [join(fixture, 'scripts/validate-public-claims.mjs')], { encoding: 'utf8' })
    const baseline = run()
    assert.equal(baseline.status, 0, baseline.stdout + baseline.stderr)
    const home = join(fixture, 'src/pages/HomePage.jsx')
    writeFileSync(home, readFileSync(home, 'utf8') + '\nconst regression = "NO-GO above LOCAL"\n')
    const mutation = run()
    assert.equal(mutation.status, 1, mutation.stdout + mutation.stderr)
    assert.match(mutation.stdout + mutation.stderr, /HomePage.jsx/)
  } finally {
    rmSync(fixture, { recursive: true, force: true })
  }
})

test('security disclosure is strict UTF-8 with valid contacts, canonical URL and unexpired date', () => {
  const body = new TextDecoder('utf-8', { fatal: true }).decode(readFileSync(join(root, 'public/.well-known/security.txt')))
  const contacts = [...body.matchAll(/^Contact:\s*(.+)$/gm)].map(match => match[1].trim())
  assert.deepEqual(contacts, ['mailto:info@feuselectronicsgroup.com', 'https://feuselectronicsgroup.com/security'])
  assert.match(body, /^Canonical: https:\/\/feuselectronicsgroup.com\/\.well-known\/security.txt\r?$/m)
  const expires = body.match(/^Expires:\s*(.+)$/m)?.[1].trim()
  assert.match(expires, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/)
  assert.ok(Date.parse(expires) > Date.now(), 'Renew the security disclosure before expiration')
  assert.doesNotMatch(body, /<!doctype|<html/i)
})

test('reviewed pages retain local image assets and contain no stale checkout or mock-only editorial', async () => {
  const assets = new Set()
  for (const name of ['HomePage', 'FeusAiPage', 'CloudRuntimePage', 'GetStartedPage', 'DemoPage', 'ContactPage', 'TrustPage', 'TrustSecurityPage', 'SecurityPage', 'ArchitecturePage', 'StatusPage', 'FaqPage']) {
    const html = await page(name, '/')
    assert.doesNotMatch(text(html), /this checkout|mock.only|source date is later|needs reconciliation/i, name)
    for (const match of html.matchAll(/(?:src|poster)="(\/(?:brand|media)\/[^"?]+)(?:\?[^" ]*)?"/g)) {
      assets.add(match[1])
      assert.ok(existsSync(join(root, 'public', match[1])), `${name}: missing ${match[1]}`)
    }
  }
  assert.ok(assets.size > 0, 'Asset regression test must check actual rendered images')
})