#!/usr/bin/env node
/**
 * validate-public-claims.mjs — public claims compliance gate.
 *
 * Enforces the capability-scoped product posture and the Session 12D
 * exact-revision evidence against the website source before every build
 * (wired as `prebuild` and `npm test`).
 *
 * Checks:
 *  1. Prohibited claim phrases (naming register + approved messaging).
 *  2. Capability-specific preview and external-integration restrictions.
 *  3. publicStatus.js integrity: counts reconcile to 45, every public
 *     capability has an approved status and a required qualification.
 *  4. Required posture strings present (NO-GO, revision, approved OG text).
 *  5. Placeholder text scan.
 *  6. Basic secret scan.
 *
 * Exit code 1 on any violation. Do not weaken these checks without a
 * superseding product-posture or exact-revision evidence.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const errors = []

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (['node_modules', 'dist', 'quarantine', '.git'].includes(name)) continue
      walk(p, exts, out)
    } else if (exts.some((e) => name.endsWith(e))) {
      out.push(p)
    }
  }
  return out
}

const scanFiles = [
  ...walk(join(root, 'src'), ['.jsx', '.js']),
  ...walk(join(root, 'public'), ['.json', '.txt', '.xml', '.html']),
  join(root, 'index.html'),
]

// The controlled vocabulary file may legitimately contain status labels
// (e.g. the reserved "Integration ready" definition marked prohibited).
const VOCAB_FILE = join(root, 'src', 'data', 'publicStatus.js')

/* 1 + 2. Prohibited phrases (case-insensitive). */
const PROHIBITED = [
  { re: /now in production/i, why: 'WEB-001: production availability claim' },
  { re: /production[- ]ready/i, why: 'Prohibited term: production-ready' },
  { re: /production[- ]grade/i, why: 'Prohibited term: production-grade' },
  { re: /production (module|system|environment)s? (managing|running|verified)/i, why: 'Live production operations claim' },
  { re: /\b\d+\+? (verified )?production modules/i, why: 'Fabricated production module count' },
  { re: /immutable/i, why: 'Prohibited term: immutable (audit trail is unkeyed/unanchored)' },
  { re: /zero risk|risk[- ]free/i, why: 'Prohibited absolute-safety claim' },
  { re: /bulletproof|unhackable|military[- ]grade|bank[- ]grade/i, why: 'Prohibited superlative security claim' },
  { re: /world[- ]class|industry[- ]leading|best[- ]in[- ]class|cutting[- ]edge|revolutionary/i, why: 'Prohibited superlative' },
  { re: /ROI Intelligence/i, why: 'Prohibited name: use "FEUS ROI Estimate"' },
  { re: /Recommendations Assurance Engine/i, why: 'Deprecated name: use "FEUS Recommendation Assurance"' },
  { re: /Oracle (operations?|integration|support) (is |are )?(available|live|production[- ]ready|production[- ]grade)/i, why: 'Oracle preview may not be represented as available or live' },
  { re: /zero unprotected/i, why: 'WEB-003: unverifiable protection claim' },
  { re: /\$53[Kk,5]/, why: 'DATA-001: demo-constant ROI figure' },
  { re: /live evidence stream/i, why: 'WEB-041: live-evidence framing prohibited' },
  { re: /proven ROI|measured savings|guaranteed savings/i, why: 'ROI actuals claim (estimates only)' },
  { re: /3,000\+ SQL/i, why: 'CORP-001: unsubstantiated figure variant' },
  { re: /fully (certified|compliant|audited)/i, why: 'Certification claim (none held)' },
  { re: /SOC ?2 (certified|compliant)|ISO ?27001 (certified|compliant)|HIPAA (certified|compliant)/i, why: 'Formal certification claim (none held)' },
  { re: /autonomous(ly)? (database|data) operations/i, why: 'Autonomy claim beyond evidence' },
  { re: /hardening in progress/i, why: 'WEB-042: engine states must render verbatim' },
]

// "Integration ready" is prohibited as a claim for current connectors, but the
// reserved status label may exist in the vocabulary file only.
const PROHIBITED_OUTSIDE_VOCAB = [
  { re: /integration[- ]ready/i, why: 'Status "Integration ready" not approved for any current connector' },
]

/* 5. Placeholders. */
const PLACEHOLDERS = [
  { re: /\bTODO\b|\bFIXME\b|\bXXX\b/, why: 'Placeholder marker' },
  { re: /lorem ipsum/i, why: 'Placeholder text' },
]

/* 6. Secrets. */
const SECRETS = [
  { re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, why: 'Private key material' },
  { re: /\bAKIA[0-9A-Z]{16}\b/, why: 'AWS access key id' },
  { re: /(api[_-]?key|client[_-]?secret|password)\s*[:=]\s*['"][^'"]{8,}/i, why: 'Hardcoded credential' },
]

for (const file of scanFiles) {
  const rel = relative(root, file)
  const text = readFileSync(file, 'utf8')
  const lines = text.split(/\r?\n/)
  const isVocab = file === VOCAB_FILE

  const rules = [
    ...PROHIBITED,
    ...(isVocab ? [] : PROHIBITED_OUTSIDE_VOCAB),
    ...PLACEHOLDERS,
    ...SECRETS,
  ]

  lines.forEach((line, i) => {
    for (const rule of rules) {
      if (rule.re.test(line)) {
        // Allow explicit negations, denials, and prohibition notices — honest
        // "we do not claim X" language is required by the claims baseline.
        // Context window: the matching line and the preceding line.
        const ctx = `${lines[i - 1] ?? ''} ${line}`
        if (/\b(not|no|never|none|nor|without|prohibited|excluded|do(es)? not|don'?t|isn'?t|are not|denied|removed|retired|deprecated name|instead of)\b/i.test(ctx)) {
          continue
        }
        // FAQ questions in the controlled vocabulary file are approved verbatim
        // (each is answered with an honest denial).
        if (isVocab && /^\s*q:\s*['"]/.test(line)) {
          continue
        }
        errors.push(`${rel}:${i + 1} — ${rule.why}\n    ${line.trim().slice(0, 160)}`)
      }
    }
  })
}

/* 3. publicStatus.js integrity. */
const status = await import(pathToFileURL(VOCAB_FILE).href)
const {
  POSTURE, CAPABILITY_SUMMARY, CAPABILITY_LIFECYCLE, PUBLIC_CAPABILITIES,
  AGENT_PORTFOLIO, CONTROL_COUNTS, STATUS_DEFS,
} = status

if (POSTURE.decision !== 'NO-GO') {
  errors.push('publicStatus.js: decision must be NO-GO until a superseding assessment exists')
}
if (POSTURE.certifiedRevision !== '3c401504aef201b510c8695bac7c31ad424c2274') {
  errors.push('publicStatus.js: certified revision changed without authorization')
}
if (POSTURE.productionVerifiedCapabilities !== 0 || POSTURE.totalCapabilities !== 45) {
  errors.push('publicStatus.js: capability totals do not match the certified assessment (0 of 45)')
}

const sumControls =
  CONTROL_COUNTS.verified + CONTROL_COUNTS.verifiedWithConstraints +
  CONTROL_COUNTS.partial + CONTROL_COUNTS.failed + CONTROL_COUNTS.notEstablished
if (sumControls !== CONTROL_COUNTS.assessed || CONTROL_COUNTS.assessed !== 38) {
  errors.push(`publicStatus.js: control counts do not reconcile (${sumControls} vs ${CONTROL_COUNTS.assessed})`)
}

const sumCaps =
  CAPABILITY_SUMMARY.implementationVerified + CAPABILITY_SUMMARY.demonstrationOnly +
  CAPABILITY_SUMMARY.disabledPendingApproval + CAPABILITY_SUMMARY.internalOnly +
  CAPABILITY_SUMMARY.notPubliclyRepresented
if (sumCaps !== 45) {
  errors.push(`publicStatus.js: capability summary does not reconcile to 45 (got ${sumCaps})`)
}

const publicCount =
  CAPABILITY_SUMMARY.implementationVerified + CAPABILITY_SUMMARY.demonstrationOnly +
  CAPABILITY_SUMMARY.disabledPendingApproval
if (PUBLIC_CAPABILITIES.length !== publicCount) {
  errors.push(`publicStatus.js: PUBLIC_CAPABILITIES has ${PUBLIC_CAPABILITIES.length} rows, expected ${publicCount}`)
}

const ALLOWED_PUBLIC_STATUSES = new Set([
  'IMPLEMENTATION_VERIFIED', 'DEMONSTRATION_ONLY', 'DISABLED_PENDING_APPROVAL',
])
for (const cap of PUBLIC_CAPABILITIES) {
  if (!ALLOWED_PUBLIC_STATUSES.has(cap.status)) {
    errors.push(`${cap.id}: status "${cap.status}" exceeds the approved public ceiling`)
  }
  if (!STATUS_DEFS[cap.status]) {
    errors.push(`${cap.id}: status "${cap.status}" missing from STATUS_DEFS`)
  }
  if (!cap.qualification || cap.qualification.length < 20) {
    errors.push(`${cap.id}: missing required qualification`)
  }
  if (/oracle/i.test(`${cap.name} ${cap.description} ${cap.qualification}`)) {
    errors.push(`${cap.id}: Oracle reference in public capability row`)
  }
}

const ALLOWED_CORE_LIFECYCLE_STATUSES = new Set([
  'OPERATIONALLY_VALIDATED', 'CONTROLLED_ENTERPRISE_ADOPTION',
  'AVAILABLE_WITH_CONSTRAINTS',
])
const ALLOWED_EXTENSION_LIFECYCLE_STATUSES = new Set([
  'CONTROLLED_PREVIEW', 'PREVIEW', 'EARLY_ACCESS', 'INTEGRATION_READY',
  'PLANNED', 'DISABLED', 'UNAVAILABLE',
])

for (const row of CAPABILITY_LIFECYCLE) {
  const allowed = row.productArea === 'Core platform'
    ? ALLOWED_CORE_LIFECYCLE_STATUSES
    : ALLOWED_EXTENSION_LIFECYCLE_STATUSES
  if (!allowed.has(row.publicStatus)) {
    errors.push(`${row.capability}: lifecycle status "${row.publicStatus}" is not allowed for ${row.productArea}`)
  }
  if (!STATUS_DEFS[row.publicStatus]) {
    errors.push(`${row.capability}: lifecycle status "${row.publicStatus}" missing from STATUS_DEFS`)
  }
  for (const field of ['validation', 'certification', 'environment', 'restrictions', 'nextMilestone']) {
    if (!row[field] || row[field].length < 20) {
      errors.push(`${row.capability}: missing or incomplete lifecycle field "${field}"`)
    }
  }
}

const oracleLifecycle = CAPABILITY_LIFECYCLE.find((row) => /Oracle Operations Agent/i.test(row.capability))
if (!oracleLifecycle || !['CONTROLLED_PREVIEW', 'PREVIEW', 'UNAVAILABLE'].includes(oracleLifecycle.publicStatus)) {
  errors.push('Oracle Operations Agent must remain preview or unavailable until live adapter evidence exists')
} else if (!/no Oracle driver|no live Oracle operation/i.test(
  `${oracleLifecycle.certification} ${oracleLifecycle.restrictions}`
)) {
  errors.push('Oracle Operations Agent must disclose the missing live driver/operation boundary')
}

const itsmLifecycle = CAPABILITY_LIFECYCLE.find((row) => row.capability === 'ITSM automation connectors')
if (!itsmLifecycle || itsmLifecycle.publicStatus === 'INTEGRATION_READY') {
  errors.push('ITSM automation connectors cannot be integration ready while disclosure and live-tenant evidence remain open')
}

const providerLifecycle = CAPABILITY_LIFECYCLE.find((row) => row.capability === 'Model-provider integrations')
if (!providerLifecycle || !/invocation remains disabled/i.test(providerLifecycle.certification)) {
  errors.push('Model-provider lifecycle row must disclose that runtime invocation remains disabled')
}

const REQUIRED_PORTFOLIO_IDS = new Set([
  'sqlops', 'copilot', 'oracleops', 'requestops', 'control-plane',
  'itsm-connect', 'recommendation-assurance', 'provider-gateway',
  'engine-expansion',
])
for (const id of REQUIRED_PORTFOLIO_IDS) {
  if (!AGENT_PORTFOLIO.some((agent) => agent.id === id)) {
    errors.push(`publicStatus.js: required agent portfolio entry missing: ${id}`)
  }
}
for (const agent of AGENT_PORTFOLIO) {
  if (!STATUS_DEFS[agent.status]) {
    errors.push(`${agent.name}: portfolio status "${agent.status}" missing from STATUS_DEFS`)
  }
  for (const field of ['name', 'capability', 'route']) {
    if (!agent[field] || agent[field].length < 2) {
      errors.push(`${agent.id}: missing or incomplete portfolio field "${field}"`)
    }
  }
  for (const field of ['summary', 'evidence', 'environment', 'restriction', 'nextMilestone']) {
    if (!agent[field] || agent[field].length < 12) {
      errors.push(`${agent.id}: missing or incomplete portfolio field "${field}"`)
    }
  }
}

const oraclePortfolio = AGENT_PORTFOLIO.find((agent) => agent.id === 'oracleops')
if (oraclePortfolio?.status !== 'CONTROLLED_PREVIEW' ||
    !/no live Oracle driver, adapter/i.test(oraclePortfolio?.restriction ?? '')) {
  errors.push('FEUS OracleOps must remain Controlled Preview and disclose its missing live driver and adapter')
}
const itsmPortfolio = AGENT_PORTFOLIO.find((agent) => agent.id === 'itsm-connect')
if (itsmPortfolio?.status !== 'PREVIEW' ||
    !/mock transports/i.test(itsmPortfolio?.evidence ?? '') ||
    !/no live production tenant/i.test(itsmPortfolio?.restriction ?? '')) {
  errors.push('FEUS ITSM Connect must remain Preview with mock-transport and live-tenant qualifications')
}
const providerPortfolio = AGENT_PORTFOLIO.find((agent) => agent.id === 'provider-gateway')
if (providerPortfolio?.status !== 'PREVIEW' ||
    !/runtime model invocation is disabled/i.test(providerPortfolio?.restriction ?? '')) {
  errors.push('FEUS Provider Gateway must remain Preview and disclose disabled runtime invocation')
}

/* 4. Required verbatim strings. */
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8')
const APPROVED_OG =
  'FEUS.ai is a governed AI Data Operations platform with an operationally validated core and capability-specific preview boundaries for new agents and integrations.'
if (!indexHtml.includes(APPROVED_OG)) {
  errors.push('index.html: approved OG description missing or altered')
}
if (indexHtml.includes('feus-preview.png')) {
  errors.push('index.html: broken/unapproved OG image reference present')
}

/* Quarantined public assets must never reappear in the web root. */
const QUARANTINED_PUBLIC = [
  'public/data/roi-stats.json',
  'public/feus-hero-banner.jpg',
  'public/FEUS_AIIA_Walkthrough.pdf',
]
for (const q of QUARANTINED_PUBLIC) {
  try {
    statSync(join(root, ...q.split('/')))
    errors.push(`${q}: quarantined asset present in the public web root (Session 13A claims baseline)`)
  } catch {
    /* absent — correct */
  }
}

/* Report. */
if (errors.length) {
  console.error(`\nPUBLIC CLAIMS VALIDATION FAILED — ${errors.length} violation(s):\n`)
  for (const e of errors) console.error(`  ✗ ${e}\n`)
  process.exit(1)
} else {
  console.log(`Public claims validation passed (${scanFiles.length} files scanned, ${PUBLIC_CAPABILITIES.length} capability rows verified).`)
}
