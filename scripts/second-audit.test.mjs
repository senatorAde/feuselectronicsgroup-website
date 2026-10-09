import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, cpSync, mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createServer } from 'vite'
import { resolveInquiry, focusContactForm, inquiryTypes } from '../src/data/contactNavigation.js'
import { LIVE_DEMO } from '../src/data/demoExperience.js'
import { CLOUD_ARCHITECTURE, CLOUD_RUNTIME, ROUTING_AUTHORITY } from '../src/data/cloudRuntime.js'
import { PLATFORM_STATUS, DEMO_DISCLAIMER } from '../src/data/publicStatus.js'
import { CURRENT_RELEASE, FAQ_ITEMS } from '../src/data/releaseNotes.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const cacheDir = mkdtempSync(join(root, '.second-audit-ssr-'))
// Disable the mapped-drive watcher. SSR transforms use the real Vite/React
// components, not source regexes standing in for rendered copy or navigation.
const server = await createServer({
  root,
  cacheDir,
  server: { middlewareMode: true, watch: { ignored: () => true }, hmr: false, preTransformRequests: false },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
})
after(async () => {
  await server.close()
  rmSync(cacheDir, { recursive: true, force: true })
})
const { renderPage, renderSitePage } = await server.ssrLoadModule('/scripts/audit-render.jsx')
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

test('demo renders the live session first with a genuinely separate offline walkthrough', async () => {
  const html = await page('DemoPage', '/demo')
  const copy = text(html)
  assert.ok(copy.indexOf(LIVE_DEMO.title) < copy.indexOf('Alternative: offline walkthrough'))
  for (const term of ['Microsoft Foundry', 'sample data', 'Microsoft Entra ID', 'model budget', 'refused']) assert.ok(copy.includes(term), term)
  assert.match(copy, /No customer systems are connected during a demonstration/)
  assert.ok(copy.includes(DEMO_DISCLAIMER.compact))
  assert.ok(links(html).includes('/contact?type=demo#contact-form'))
  assert.ok(links(html).includes('/contact?type=offline-demo#contact-form'))
  assert.doesNotMatch(copy, /no account to create|Every demonstration.*LOCAL/)
})

test('main product surfaces present the service confidently and keep demo/adoption separate', async () => {
  for (const [name, route] of [['HomePage', '/'], ['FeusAiPage', '/feus-ai'], ['CloudRuntimePage', '/cloud-runtime'], ['GetStartedPage', '/get-started']]) {
    const html = await page(name, route)
    const copy = text(html)
    for (const term of [/Azure/, /Entra/, /budget/i, /sample data/i]) assert.match(copy, term, name)
    assert.ok(links(html).includes('/demo'), name)
    assert.doesNotMatch(copy, /NO-GO|above LOCAL|\bTST\b|does not establish/, name)
  }
  const started = await page('GetStartedPage', '/get-started')
  assert.ok(links(started).includes('/contact?type=adoption#contact-form'))
})

test('all security reporting surfaces deep-link to the selected and focusable form', async () => {
  for (const [name, route] of [['SecurityPage', '/security'], ['TrustPage', '/trust'], ['TrustSecurityPage', '/trust/security']]) {
    assert.ok(links(await page(name, route)).includes('/contact?type=security#contact-form'), name)
  }
})

test('trust and architecture lead with the current governed service', async () => {
  const trust = text(await page('TrustPage', '/trust'))
  assert.match(trust, /Governance you can inspect/)
  assert.ok(trust.indexOf('How every turn is governed') < trust.indexOf('Capability availability'))
  assert.match(trust, /not yet approved by legal counsel or binding/)
  assert.doesNotMatch(trust, /NO-GO|Historical assessment|Session 12D/)
  const html = await page('ArchitecturePage', '/architecture')
  const copy = text(html)
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.ok(copy.indexOf('The governed cloud path') < copy.indexOf('The official architecture reference'))
  assert.doesNotMatch(copy, /Historical 5\.2 architecture|templates incomplete|undeployed/)
  const expected = ['Public website', 'Azure workbench', 'Microsoft Entra ID', 'Tenant authorization', 'Classification', 'FEUS Policy Router', 'Eligible model / provider', 'Governed agent / tool boundary', 'Durable storage']
  assert.deepEqual(CLOUD_ARCHITECTURE.map((stage) => stage.title), expected)
  let previous = html.indexOf('aria-labelledby="cloud-path"')
  for (const title of expected) {
    const at = html.indexOf(`>${title}</h3>`, previous)
    assert.ok(at > previous, title)
    previous = at
  }
  assert.match(copy, /seven-gate path: readiness, audit, environment and identity, policy, PII inspection, approval, and execution/)
  assert.ok(FAQ_ITEMS.length >= 10)
})

test('status describes the current release without claiming live monitoring or uptime', async () => {
  const copy = text(await page('StatusPage', '/status'))
  assert.equal(PLATFORM_STATUS.activeIncidents, null)
  assert.match(copy, /FEUS\.ai production service/)
  assert.match(copy, /it is not a live monitor/)
  assert.ok(copy.includes(CURRENT_RELEASE.label))
  assert.doesNotMatch(copy, /No active incidents reported|responding normally|Current health|uptime|\bSLA\b/i)
  assert.doesNotMatch(copy, /source date is later|needs reconciliation|future.dated/i)
  // A real, dated observation that is never in the future (no fixed calendar pin).
  assert.match(CLOUD_RUNTIME.verifiedOn, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
  assert.ok(Date.parse(CLOUD_RUNTIME.verifiedOn) <= Date.now(), 'verification time is not future-dated')
})

test('cost is estimated and catalog membership never implies unrestricted model access', () => {
  assert.match(LIVE_DEMO.cost, /not billed actuals/)
  assert.match(LIVE_DEMO.cost, /frontier models avoided.*not measured savings/)
  assert.match(CLOUD_RUNTIME.qualification, /approved per tenant and per environment/)
  assert.match(CLOUD_RUNTIME.qualification, /frontier models need explicit permission and budget/)
  assert.match(CLOUD_RUNTIME.qualification, /does not publish an availability or response-time service level/)
  assert.match(ROUTING_AUTHORITY.foundryRouterNote, /not used/)
})

test('rendered site navigation has exact legal labels and destinations, including onboarding', async () => {
  const expected = [
    { href: '/legal/privacy', label: 'Privacy notice' },
    { href: '/legal/terms', label: 'Terms of use' },
  ]
  for (const [name, route] of [['HomePage', '/'], ['GetStartedPage', '/get-started'], ['ContactPage', '/contact?type=adoption']]) {
    const { default: Component } = await server.ssrLoadModule(`/src/pages/${name}.jsx`)
    const html = renderSitePage(Component, route)
    const anchors = (markup) => [...markup.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map((match) => ({ href: match[1], label: text(match[2]).trim() }))
    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1]
    assert.ok(footer, `${name}: actual shared footer must render`)
    assert.deepEqual(anchors(footer).filter(({ href, label }) => /\/legal\//.test(href) || /privacy|terms/i.test(label)), expected, name)
    // Check every rendered link, including navbar and onboarding/contact body;
    // in-sentence lowercase labels stay lowercase and prose disclosures stay intact.
    for (const link of anchors(html).filter(({ href, label }) => /\/legal\//.test(href) || /privacy|terms/i.test(label))) {
      const target = expected.find(({ href }) => href === link.href)
      assert.ok(target, `${name}: unexpected legal destination ${link.href}`)
      assert.equal(link.label.toLowerCase(), target.label.toLowerCase(), name)
    }
    if (name === 'ContactPage') assert.match(text(html), /published as a draft pending legal approval/)
  }
})

test('legal documents remain unapproved drafts and evidence copy has no checkout editorial', async () => {
  for (const [name, route] of [['PrivacyPage', '/legal/privacy'], ['TermsPage', '/legal/terms']]) {
    const copy = text(await page(name, route))
    assert.match(copy, /This is a published draft, not a binding agreement\./)
    assert.match(copy, /not (?:yet )?been approved by legal counsel/)
    assert.match(copy, /Draft published 2026-09-07/)
    if (name === 'PrivacyPage') assert.match(copy, /does not form part of any contract/)
    else {
      assert.match(copy, /it creates no contract/)
      assert.match(copy, /does not override any signed agreement/)
    }
  }
  const source = readFileSync(join(root, 'src/data/publicStatus.js'), 'utf8')
  assert.doesNotMatch(source, /this checkout/)
  assert.doesNotMatch(source, /independently (re-)?attested|independently verified|third-party verified/i)
})

test('claims gate rejects internal-audit leakage and overclaims (isolated mutations)', () => {
  const fixture = mkdtempSync(join(root, '.claims-mutation-'))
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
    const original = readFileSync(home, 'utf8')
    for (const injected of ['NO-GO above LOCAL', 'Azure TST · Authorized access', 'synthetic core checks passed', 'SOC 2 certified platform', 'unlimited users', '99.9% uptime', 'Trusted by 500 enterprises', 'Automatic billing starts on day 15']) {
      writeFileSync(home, `${original}\nconst regression = "${injected}"\n`)
      const mutation = run()
      assert.equal(mutation.status, 1, `${injected}: ${mutation.stdout}${mutation.stderr}`)
      assert.match(mutation.stdout + mutation.stderr, /HomePage.jsx/, injected)
    }
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