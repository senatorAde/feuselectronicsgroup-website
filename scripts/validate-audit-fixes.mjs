#!/usr/bin/env node
/**
 * validate-audit-fixes.mjs — regression gate for the first-user audit findings.
 *
 * The claims validator (validate-public-claims.mjs) proves the site does not
 * say things that are untrue. This file proves the site still *does* the
 * things that were broken and then fixed. They are separate concerns and are
 * deliberately separate gates: a claim can be honest about a feature that has
 * since regressed.
 *
 * Every check below corresponds to a defect a real first user hit on the live
 * site. Deleting a check without a superseding decision re-opens the defect it
 * guards.
 *
 * Exit code 1 on any violation.
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const errors = []

const read = (...parts) => {
  const p = join(root, ...parts)
  if (!existsSync(p)) {
    errors.push(`missing file: ${parts.join('/')}`)
    return ''
  }
  return readFileSync(p, 'utf8')
}

/** Assert `re` matches, otherwise record `why`. */
const must = (text, re, where, why) => {
  if (!re.test(text)) errors.push(`${where} — ${why}`)
}
/** Assert `re` does NOT match, otherwise record `why`. */
const mustNot = (text, re, where, why) => {
  if (re.test(text)) errors.push(`${where} — ${why}`)
}

/* ------------------------------------------------------------------ *
 * Finding 2 — every booking call to action was broken.
 *
 * Root cause: a hard-coded default scheduler URL. It returned HTTP 200 but
 * was an empty stub, so the "is it configured?" flag was permanently true and
 * the contact-form fallback written for this exact case was dead code.
 *
 * A hard-coded default for external configuration is worse than no default:
 * it hides the breakage and disables the fallback.
 * ------------------------------------------------------------------ */
{
  const where = 'src/components/CalendlyEmbed.jsx'
  const src = read('src', 'components', 'CalendlyEmbed.jsx')

  mustNot(
    src, /https:\/\/calendly\.com\/[a-z0-9-]+\//i, where,
    'a scheduler URL is hard-coded; it must come only from VITE_CALENDLY_URL so an unconfigured site falls back to the contact form'
  )
  must(
    src, /import\.meta\.env\.VITE_CALENDLY_URL\s*\|\|\s*''/, where,
    'the scheduler URL must default to empty, not to a guessed link'
  )
  must(
    src, /calendly\.com/i, where,
    'the configured URL must still be host-validated against calendly.com'
  )
  must(
    src, /IS_CALENDLY_CONFIGURED/, where,
    'the configured/unconfigured distinction must remain observable to callers'
  )
  must(
    src, /to=["']\/contact["']/, where,
    'with no scheduler configured the button must route to the contact form'
  )

  // The site promises what it can actually do. Nothing here books anything;
  // a human replies with times.
  for (const [file, parts] of [
    ['src/components/Footer.jsx', ['src', 'components', 'Footer.jsx']],
    ['src/pages/ContactPage.jsx', ['src', 'pages', 'ContactPage.jsx']],
    ['src/pages/HomePage.jsx', ['src', 'pages', 'HomePage.jsx']],
    ['src/pages/AboutPage.jsx', ['src', 'pages', 'AboutPage.jsx']],
  ]) {
    mustNot(
      read(...parts), /\bBook (a|your|an)\b/i, file,
      'a "Book …" label promises instant scheduling the site cannot deliver; use "Request …"'
    )
  }
}

/* ------------------------------------------------------------------ *
 * Finding 2b — the contact endpoint interpolated form input into outbound
 * HTML email without escaping (OWASP A03), and set no reply address.
 * ------------------------------------------------------------------ */
{
  const where = 'api/contact.js'
  const src = read('api', 'contact.js')

  must(src, /function escapeHtml\(/, where, 'form input must be HTML-escaped before it is placed in an email body')
  must(src, /&amp;|&#39;|&quot;/, where, 'the escape table must cover HTML metacharacters')
  must(src, /replace\(\/\[\\r\\n\]\+\/g/, where, 'newlines must be stripped from the subject to prevent header injection')
  must(src, /replyTo\s*:/, where, 'replies must reach the enquirer, not the sending identity')
  mustNot(src, /calendly\.com\/feuselectronicsgroup/i, where, 'the auto-reply must not link a scheduler page that returns 404')
}

/* ------------------------------------------------------------------ *
 * Finding 5 — demonstration and adoption were the same undifferentiated
 * path, and the most prominent action on the site was a sign-in wall for a
 * tenant the visitor is not in.
 * ------------------------------------------------------------------ */
{
  const nav = read('src', 'components', 'Navbar.jsx')
  must(nav, /to=["']\/demo["']/, 'src/components/Navbar.jsx', 'the primary navigation action must be the demonstration path, not sign-in')
  must(
    nav, /organisation has (already )?granted/i, 'src/components/Navbar.jsx',
    'sign-in must state the access requirement rather than let the visitor discover it at the wall'
  )

  const paths = read('src', 'components', 'AudiencePaths.jsx')
  must(paths, /\/demo/, 'src/components/AudiencePaths.jsx', 'the evaluation path must be offered')
  must(paths, /\/get-started/, 'src/components/AudiencePaths.jsx', 'the adoption path must be offered')
  must(paths, /Sign[- ]in will not create one/i, 'src/components/AudiencePaths.jsx', 'sign-in must not be presented as self-service')

  const demo = read('src', 'pages', 'DemoPage.jsx')
  // A robots directive, not the word in prose — the page explains that it used
  // to be noindexed, and that explanation is worth keeping.
  mustNot(
    demo, /robots['"\s:=]+[^\n]*noindex|content=["'][^"']*noindex/i, 'src/pages/DemoPage.jsx',
    'the evaluation entry point must be indexable'
  )
  must(demo, /refus(e|ed|al)/i, 'src/pages/DemoPage.jsx', 'a demonstration must include a refusal; success alone demonstrates nothing about governance')

  const started = read('src', 'pages', 'GetStartedPage.jsx')
  must(
    started, /not open to the public|not open for public/i, 'src/pages/GetStartedPage.jsx',
    'the adoption page must state that the runtime is not publicly accessible'
  )
}

/* ------------------------------------------------------------------ *
 * Finding 8 — privacy, terms and security disclosure were unpublished, so a
 * visitor could not learn what happens to what they type, and a security
 * researcher had no route to report anything.
 * ------------------------------------------------------------------ */
{
  const app = read('src', 'App.jsx')
  for (const route of ['/legal/privacy', '/legal/terms', '/security']) {
    must(app, new RegExp(`path=["']${route}["']`), 'src/App.jsx', `route ${route} must be registered`)
  }

  const privacy = read('src', 'pages', 'PrivacyPage.jsx')
  must(privacy, /draft/i, 'src/pages/PrivacyPage.jsx', 'an unapproved notice must be labelled a draft')
  must(privacy, /no cookies|sets no cookies/i, 'src/pages/PrivacyPage.jsx', 'the notice must state the site\'s actual browser-storage behaviour')
  must(privacy, /Vercel/, 'src/pages/PrivacyPage.jsx', 'sub-processors must be named')
  must(privacy, /Resend/, 'src/pages/PrivacyPage.jsx', 'sub-processors must be named')

  const terms = read('src', 'pages', 'TermsPage.jsx')
  must(terms, /draft/i, 'src/pages/TermsPage.jsx', 'an unapproved document must be labelled a draft')
  must(terms, /estimate\s+is\s+not\s+an\s+invoice/i, 'src/pages/TermsPage.jsx', 'the cost basis must be stated where commitments are described')

  const security = read('src', 'pages', 'SecurityPage.jsx')
  must(security, /not (publishing|published) a response time/i, 'src/pages/SecurityPage.jsx', 'do not imply a response commitment that is not enforced')
  must(security, /not end-to-end encrypted/i, 'src/pages/SecurityPage.jsx', 'the reporting channel\'s protection level must be stated before someone sends a finding to it')

  const wellKnown = read('public', '.well-known', 'security.txt')
  must(wellKnown, /^Contact:\s*mailto:/m, 'public/.well-known/security.txt', 'a machine-readable contact is required')
  must(wellKnown, /^Expires:/m, 'public/.well-known/security.txt', 'RFC 9116 requires an expiry')

  const footer = read('src', 'components', 'Footer.jsx')
  mustNot(
    footer, /in legal review and will be published/i, 'src/components/Footer.jsx',
    'the footer must link the published drafts rather than promise them'
  )
  must(footer, /\/legal\/privacy/, 'src/components/Footer.jsx', 'the privacy notice must be reachable from every page')
  must(footer, /\/security/, 'src/components/Footer.jsx', 'the disclosure route must be reachable from every page')

  const sitemap = read('public', 'sitemap.xml')
  for (const route of ['/legal/privacy', '/legal/terms', '/security', '/demo']) {
    must(sitemap, new RegExp(route.replace(/\//g, '\\/')), 'public/sitemap.xml', `${route} must be listed`)
  }
}

/* ------------------------------------------------------------------ */
if (errors.length) {
  console.error('\nAudit-fix regression check FAILED:\n')
  for (const e of errors) console.error(`  ✗ ${e}`)
  console.error(`\n${errors.length} regression(s). Each corresponds to a defect a real user hit.\n`)
  process.exit(1)
}
console.log('Audit-fix regression check passed (findings 2, 5 and 8 still fixed).')
