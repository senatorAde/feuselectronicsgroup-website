#!/usr/bin/env node
/**
 * validate-public-claims.mjs — public claims compliance gate.
 *
 * Customer-facing copy standard (2026-10-08): public pages present the
 * current product scope confidently. Internal release evidence lives in the
 * distribution repository's production-truth record, not on public pages.
 * This gate therefore does NOT require self-deprecating banners. It enforces
 * honesty in the other direction: nothing on the site may overclaim.
 *
 * Checks (wired as `prebuild` and `npm test`):
 *  1. Prohibited overclaim phrases (certifications, SLAs, uptime, unlimited,
 *     testimonials, customer counts, ROI actuals, self-service purchase,
 *     automatic billing, superlatives, absolute-safety claims).
 *  2. Internal release/audit vocabulary kept off public surfaces.
 *  3. Data-module integrity: current claims derive from the pinned canonical
 *     observation; preview and roadmap items never present as available;
 *     model access stays approved per tenant and per environment.
 *  4. Required verbatim strings (approved OG text).
 *  5. Placeholder text scan.
 *  6. Basic secret scan.
 *
 * Exit code 1 on any violation. Do not weaken overclaim checks without a
 * superseding, evidenced product decision.
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

// The status vocabulary file legitimately defines the reserved
// "Integration ready" label (never assigned to a current connector).
const VOCAB_FILE = join(root, 'src', 'data', 'publicStatus.js')
const RELEASE_NOTES_FILE = join(root, 'src', 'data', 'releaseNotes.js')
const CLOUD_RUNTIME_FILE = join(root, 'src', 'data', 'cloudRuntime.js')
const COMMERCIAL_FILE = join(root, 'src', 'data', 'commercialJourney.js')

/* 1. Prohibited overclaim phrases (case-insensitive). */
const PROHIBITED = [
  { re: /now in production/i, why: 'WEB-001: launch-announcement framing; describe the production service plainly' },
  { re: /production[- ]ready/i, why: 'Prohibited term: production-ready' },
  { re: /production[- ]grade/i, why: 'Prohibited term: production-grade' },
  { re: /production (module|system|environment)s? (managing|running|verified)/i, why: 'Live production operations claim' },
  { re: /\b\d+\+? (verified )?production modules/i, why: 'Fabricated production module count' },
  { re: /immutable/i, why: 'Prohibited term: immutable (audit trail is not externally anchored)' },
  { re: /zero risk|risk[- ]free/i, why: 'Prohibited absolute-safety claim' },
  { re: /bulletproof|unhackable|military[- ]grade|bank[- ]grade/i, why: 'Prohibited superlative security claim' },
  { re: /world[- ]class|industry[- ]leading|best[- ]in[- ]class|cutting[- ]edge|revolutionary/i, why: 'Prohibited superlative' },
  { re: /ROI Intelligence/i, why: 'Prohibited name: use "FEUS ROI Estimate"' },
  { re: /Recommendations Assurance Engine/i, why: 'Deprecated name: use "FEUS Recommendation Assurance"' },
  { re: /Oracle (operations?|integration|support) (is |are )?(available|live|production[- ]ready|production[- ]grade|generally available)/i, why: 'Oracle preview may not be represented as available or live' },
  { re: /\b(Oracle|ITSM|ServiceNow|Jira|Azure DevOps)\b[^.]{0,60}\bgenerally available\b/i, why: 'Preview integration presented as generally available' },
  { re: /zero unprotected/i, why: 'WEB-003: unverifiable protection claim' },
  { re: /\$53[Kk,5]/, why: 'DATA-001: demo-constant ROI figure' },
  { re: /live evidence stream/i, why: 'WEB-041: live-evidence framing prohibited' },
  { re: /proven ROI|measured savings|guaranteed (savings|ROI|results|returns?)/i, why: 'ROI actuals claim (estimates only)' },
  { re: /\b\d+(\.\d+)?\s*%\s*(cost |time )?(savings|reduction|faster|cheaper)\b/i, why: 'Invented savings/performance metric' },
  { re: /\b\d+x (faster|cheaper|more productive|ROI)\b/i, why: 'Invented multiplier metric' },
  { re: /\b\d{1,2},\d{3}\+?\s*SQL/i, why: 'CORP-001: unsubstantiated SQL-estate figure' },
  { re: /\$3\.2M|60-person|32\+ clients/i, why: 'CORP-001: unsubstantiated founder metrics' },
  { re: /\b(trusted by|used by|serving|over) \d[\d,]*\+? (customers|clients|enterprises|organi[sz]ations|companies|teams)\b/i, why: 'Customer-count claim (none substantiated)' },
  { re: /\btestimonials?\b|\bcase stud(y|ies)\b/i, why: 'Testimonial or case-study claim (none published)' },
  { re: /Microsoft MVP/i, why: 'CORP-001: award claim pending substantiation and legal review' },
  { re: /\bSLAs?\b|SLA[- ]backed/i, why: 'WEB-019/CORP-002: no published or substantiated SLA' },
  { re: /24\s*\/\s*7|\b24x7\b|around[- ]the[- ]clock/i, why: 'CORP-002: unsubstantiated coverage claim' },
  { re: /\buptime\b|\b99\.9/i, why: 'Availability claim without SLO evidence' },
  { re: /guaranteed (availability|response|uptime)|response within \d|within (one|1|24|48) (business )?(hour|day)/i, why: 'Response-time or availability guarantee', skip: (rel) => /Property|[\\/]media[\\/]/.test(rel) },
  { re: /\bunlimited\b/i, why: 'Unlimited claim (every package is scoped)' },
  { re: /logs\/(assurance_evidence|certification|audit)/, why: 'DATA-006: internal filesystem path in public content' },
  { re: /fully (certified|compliant|audited)/i, why: 'Certification claim (none held)' },
  { re: /(SOC ?2|ISO(\/IEC)? ?27001|HIPAA|GDPR|PCI[- ]?DSS|FedRAMP)[- ](certified|compliant|accredited|authori[sz]ed)/i, why: 'Formal certification or compliance claim (none held)' },
  { re: /\b(certified|compliant) (with|under|to) (SOC ?2|ISO|HIPAA|GDPR|PCI|FedRAMP)/i, why: 'Formal certification or compliance claim (none held)' },
  { re: /autonomous(ly)? (database|data) operations/i, why: 'Autonomy claim beyond evidence' },
  { re: /hardening in progress/i, why: 'WEB-042: engine states must render verbatim' },
  { re: /\b(buy|purchase|subscribe) now\b|\badd to cart\b|\bstart (your )?free trial\b|\binstant (signup|activation|access)\b/i, why: 'Self-service purchase or instant activation claim (sales-led only)' },
  { re: /\b(credit card|card) (required|on file)\b/i, why: 'Self-service payment claim (payment is by proposal and invoice)' },
]

/*
 * Automatic billing is roadmap: it may be named only as absent or planned.
 * The escape list for this rule therefore also accepts roadmap language.
 */
const BILLING_RULES = [
  { re: /auto(matic|matically)?[- ]?(bill(ing|ed|s)?|renew(al|s|ed)?|charg(e|ed|es|ing))/i, why: 'Automatic billing presented as available (roadmap only)', allow: /\b(roadmap|planned)\b/i },
]

// "Integration ready" is prohibited as a claim for current connectors, but the
// reserved status label may exist in the vocabulary file only.
const PROHIBITED_OUTSIDE_VOCAB = [
  { re: /integration[- ]ready/i, why: 'Status "Integration ready" not approved for any current connector' },
]

/*
 * 2. Internal release and audit vocabulary.
 *
 * Release decisions, environment profiles, revision identifiers, acceptance
 * counts and audit history are internal evidence. They live in the
 * distribution repository's production-truth record. None of it may appear
 * in public source, and a negation does not make it acceptable.
 */
const INTERNAL_VOCAB = [
  { re: /\bNO[- ]GO\b/, why: 'Internal release-gate decision on a public surface' },
  { re: /\bGO\/CONDITIONAL\b/, why: 'Internal release-gate decision on a public surface' },
  { re: /\bAzure TST\b|\bTST\b/, why: 'Internal environment profile name on a public surface' },
  { re: /\bPOC\b/, why: 'Internal environment name on a public surface' },
  { re: /\bcandidate\b/i, why: 'Internal release vocabulary (candidate) on a public surface' },
  { re: /\bunverified\b/i, why: 'Internal audit-doubt language on a public surface' },
  { re: /not yet verified|remain(s)? unverified|has not been verified/i, why: 'Internal audit-doubt language on a public surface' },
  { re: /historical (checkpoint|validation)/i, why: 'Internal release history on a public surface' },
  { re: /starter correction/i, why: 'Internal remediation history on a public surface' },
  { re: /synthetic (core|acceptance|checks)/i, why: 'Internal acceptance-test vocabulary on a public surface' },
  { re: /\b31\s*\/\s*31\b|\b31 of 31\b/, why: 'Internal acceptance count on a public surface' },
  { re: /owner-ratified|owner-promoted|owner-approved/i, why: 'Internal approval vocabulary on a public surface' },
  { re: /not a fully released/i, why: 'Self-deprecating release caveat on a public surface' },
  { re: /does not establish/i, why: 'Audit-caveat phrasing on a public surface' },
  { re: /release assessment/i, why: 'Internal assessment vocabulary on a public surface' },
  { re: /Session 1[0-9][A-Z]?\b/, why: 'Internal assessment session name on a public surface' },
  { re: /\bvNext\b/, why: 'Internal release-line name on a public surface' },
  { re: /\b0000008\b|\b0000009\b|ca-feus-runtime--|\brc-[0-9a-f]{7}/, why: 'Internal deployment revision name on a public surface' },
  { re: /sha256:[0-9a-f]{8}/, why: 'Image digest on a public surface' },
  { re: /\b[0-9a-f]{40}\b/, why: 'Git commit SHA on a public surface' },
  { re: /above LOCAL|LOCAL[- ]only/i, why: 'Internal environment restriction on a public surface' },
  { re: /not approved for production|not authorized for production/i, why: 'Release-gate language on a public surface' },
  { re: /pre[- ]release platform|experimental platform|untested platform/i, why: 'Product-wide pre-release characterization' },
  { re: /zero capabilities|zero of 45|0 of 45/i, why: 'Release-matrix count used as product positioning' },
  { re: /remediation round|certification failure|failed release validation|CERTIFICATION_FAILED/i, why: 'Internal remediation history on a public surface' },
  { re: /preview limits\b/i, why: 'Product-wide preview framing (label individual capabilities instead)' },
]

// Legal pages carry legal-status statements that are owner/legal decisions;
// their wording is governed by the legal-page checks, not this vocabulary list.
const LEGAL_FILES = new Set([
  join(root, 'src', 'pages', 'PrivacyPage.jsx'),
  join(root, 'src', 'pages', 'TermsPage.jsx'),
])

// Data modules that bind to the canonical observation may hold identifiers
// (never rendered). Commit SHAs and digests are read from the JSON, not typed.
const IDENTIFIER_ALLOWED = new Set([CLOUD_RUNTIME_FILE])

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

const NEGATION = /\b(not|no|never|none|nor|without|prohibited|excluded|do(es)? not|don'?t|isn'?t|are not|denied|removed|retired|deprecated name|instead of)\b/i

for (const file of scanFiles) {
  const rel = relative(root, file)
  const text = readFileSync(file, 'utf8')
  const lines = text.split(/\r?\n/)
  const isVocab = file === VOCAB_FILE
  const isPublicAsset = rel.startsWith('public')

  const rules = [
    ...PROHIBITED,
    ...BILLING_RULES,
    ...(isVocab ? [] : PROHIBITED_OUTSIDE_VOCAB),
    ...(LEGAL_FILES.has(file) ? [] : INTERNAL_VOCAB)
      .filter((r) => !(IDENTIFIER_ALLOWED.has(file) && /SHA|digest|revision/.test(r.why)))
      .filter((r) => !(isPublicAsset && /SHA|digest/.test(r.why)))
      .map((r) => ({ ...r, noNegationEscape: true })),
    ...PLACEHOLDERS,
    ...SECRETS,
  ]

  lines.forEach((line, i) => {
    for (const rule of rules) {
      if (rule.re.test(line) && !rule.skip?.(rel)) {
        // Honest "we do not claim X" language remains allowed for overclaim
        // rules. Context window: the matching line and the preceding line
        // (plus the following line for roadmap qualifiers).
        const ctx = `${lines[i - 1] ?? ''} ${line}`
        if (!rule.noNegationEscape &&
            (NEGATION.test(ctx) || rule.allow?.test(`${ctx} ${lines[i + 1] ?? ''}`))) {
          continue
        }
        errors.push(`${rel}:${i + 1} — ${rule.why}\n    ${line.trim().slice(0, 160)}`)
      }
    }
  })
}

/* 3. Controlled data-module integrity. */
const status = await import(pathToFileURL(VOCAB_FILE).href)
const {
  POSTURE, CAPABILITY_LIFECYCLE, PUBLIC_CAPABILITIES, AGENT_PORTFOLIO, STATUS_DEFS,
  MODEL_PROVIDER_STATEMENT, ENTERPRISE_CAPABILITY_AVAILABILITY, INTEGRATION_STATUS,
  PLATFORM_STATUS, ROI_STATEMENT,
} = status
const notes = await import(pathToFileURL(RELEASE_NOTES_FILE).href)
const { CURRENT_RELEASE, RELEASE_NOTES, FAQ_ITEMS, AUTHORIZED_USE } = notes
const cloud = await import(pathToFileURL(CLOUD_RUNTIME_FILE).href)
const {
  CLOUD_RUNTIME, LAUNCH_URL, ROUTING_MODES, ROUTING_AUTHORITY, ONBOARDING_STEPS,
  ONBOARDING_FAQ, RUNTIME_SCOPE, RUNTIME_FACTS, MODEL_CATALOG, LATEST_DEPLOYED_RECORD,
} = cloud
const commercial = await import(pathToFileURL(COMMERCIAL_FILE).href)

/* 3a. Current claims derive from the pinned canonical observation. */
const truth = JSON.parse(readFileSync(join(root, 'src', 'data', 'product-status.public.json'), 'utf8'))
const observed = truth.hosted_runtime
if (truth.authority !== 'observation_only_not_release_authorization' ||
    !/^sha256:[0-9a-f]{64}$/.test(observed?.image_digest ?? '') ||
    !/^[0-9a-f]{40}$/.test(observed?.source_commit ?? '') ||
    CLOUD_RUNTIME?.releaseRevision !== observed?.source_commit ||
    LATEST_DEPLOYED_RECORD?.revision !== observed?.active_revision ||
    LATEST_DEPLOYED_RECORD?.signedRevision !== observed?.signed_source_commit ||
    LATEST_DEPLOYED_RECORD?.imageDigest !== observed?.image_digest ||
    CLOUD_RUNTIME?.verifiedOn !== observed?.last_verified_at ||
    CLOUD_RUNTIME?.releaseVersion !== observed?.application_version ||
    CURRENT_RELEASE?.version !== observed?.application_version ||
    MODEL_CATALOG?.length !== observed?.configured_deployments?.length ||
    ROUTING_AUTHORITY?.activatedModels?.length !== observed?.configured_deployments?.length + 1) {
  errors.push('cloudRuntime.js / releaseNotes.js: current claims must derive from the pinned canonical observation')
}
const catalogFact = (RUNTIME_FACTS ?? []).find((f) => /model catalog/i.test(f.label ?? ''))
if (!catalogFact || Number((catalogFact.value ?? '').replace(/[^0-9]/g, '')) !== observed?.configured_deployments?.length) {
  errors.push('cloudRuntime.js: RUNTIME_FACTS must state the model catalog size from the canonical observation')
}

/*
 * 3b. Capabilities the canonical observation restricts may never be presented
 * as available. If the record still says hosted customer SQL or automatic
 * billing is not offered, the site must say so in neutral product scope.
 */
const restricted = new Set(observed?.restricted_capabilities ?? [])
const scopeText = JSON.stringify(RUNTIME_SCOPE ?? [])
if ([...restricted].some((r) => /hosted_customer_sql/.test(r)) &&
    !/hosted runtime does not execute customer SQL/i.test(scopeText)) {
  errors.push('cloudRuntime.js: RUNTIME_SCOPE must state that the hosted runtime does not execute customer SQL')
}
if (restricted.has('no_automatic_billing')) {
  const billing = ENTERPRISE_CAPABILITY_AVAILABILITY?.find((r) => /billing/i.test(r.capability))
  if (!billing || billing.availability !== 'ROADMAP') {
    errors.push('publicStatus.js: automatic billing must remain Roadmap while the canonical record restricts it')
  }
}

/* 3c. Model access stays approved per tenant and per environment. */
const MODEL_PINS = [
  { re: /approved per tenant and per environment/i, why: 'per-tenant, per-environment model approval' },
  { re: /frontier models need explicit permission and budget/i, why: 'frontier-model permission and budget' },
  { re: /estimate/i, why: 'that cost is estimated, not billed' },
]
const modelSurfaces = [
  ['CLOUD_RUNTIME.qualification', CLOUD_RUNTIME?.qualification],
  ['ROUTING_AUTHORITY.modelQualification', ROUTING_AUTHORITY?.modelQualification],
  ['MODEL_PROVIDER_STATEMENT.statement', MODEL_PROVIDER_STATEMENT?.statement],
  ['RUNTIME_SCOPE', scopeText],
  ['provider-gateway scope', AGENT_PORTFOLIO?.find((a) => a.id === 'provider-gateway')?.scope],
  ['model-routing lifecycle row', CAPABILITY_LIFECYCLE?.find((r) => /model routing/i.test(r.capability))?.restrictions],
]
for (const [name, value] of modelSurfaces) {
  for (const pin of MODEL_PINS) {
    if (!pin.re.test(value ?? '')) {
      errors.push(`${name} must disclose ${pin.why}`)
    }
  }
}

/* 3d. No availability or response-time commitment. */
if (!/does not publish an availability or response-time service level/i.test(CLOUD_RUNTIME?.qualification ?? '')) {
  errors.push('cloudRuntime.js: CLOUD_RUNTIME.qualification must state that no availability or response-time service level is published')
}

/* 3e. Customer-facing posture fields are required and free of gate language. */
const POSTURE_MARKETING_FIELDS = [
  'headline', 'shortStatement', 'publicPostureStatement', 'valueStatement',
  'architectureStatement', 'validationStatement', 'lifecycleStatement',
  'availabilityQualifier', 'statusStripNote',
]
for (const field of POSTURE_MARKETING_FIELDS) {
  const value = POSTURE?.[field]
  if (!value || value.length < 12) {
    errors.push(`publicStatus.js: POSTURE.${field} is required public positioning copy`)
    continue
  }
  for (const rule of INTERNAL_VOCAB) {
    if (rule.re.test(value)) {
      errors.push(`publicStatus.js: POSTURE.${field} contains internal vocabulary — ${rule.why}`)
    }
  }
}
if (POSTURE?.decision || POSTURE?.certifiedRevision || POSTURE?.trustBanner) {
  errors.push('publicStatus.js: release-decision fields do not belong on public posture')
}
if (PLATFORM_STATUS?.activeIncidents !== null) {
  errors.push('publicStatus.js: the static status page must not assert an incident state')
}
for (const label of ['Estimate', 'Assumptions']) {
  if (!ROI_STATEMENT?.requiredLabels?.includes(label)) {
    errors.push(`publicStatus.js: ROI panels must carry the "${label}" label`)
  }
}

/* 3f. Public capability rows never exceed their approved ceiling. */
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
    errors.push(`${cap.id}: missing required scope statement`)
  }
  if (/oracle/i.test(`${cap.name} ${cap.description} ${cap.qualification}`)) {
    errors.push(`${cap.id}: Oracle reference in public capability row`)
  }
}

const ALLOWED_CORE_LIFECYCLE_STATUSES = new Set([
  'OPERATIONALLY_VALIDATED', 'CONTROLLED_ENTERPRISE_ADOPTION',
  'AVAILABLE_WITH_CONSTRAINTS',
])
const PREVIEW_STATUSES = new Set([
  'CONTROLLED_PREVIEW', 'PREVIEW', 'PRIVATE_PREVIEW', 'EARLY_ACCESS',
  'PLANNED', 'ROADMAP', 'DISABLED', 'UNAVAILABLE',
])
for (const row of CAPABILITY_LIFECYCLE) {
  const allowed = row.productArea === 'Core platform' ? ALLOWED_CORE_LIFECYCLE_STATUSES : PREVIEW_STATUSES
  if (!allowed.has(row.publicStatus)) {
    errors.push(`${row.capability}: lifecycle status "${row.publicStatus}" is not allowed for ${row.productArea}`)
  }
  if (!STATUS_DEFS[row.publicStatus]) {
    errors.push(`${row.capability}: lifecycle status "${row.publicStatus}" missing from STATUS_DEFS`)
  }
  for (const field of ['validation', 'environment', 'restrictions', 'nextMilestone']) {
    if (!row[field] || row[field].length < 20) {
      errors.push(`${row.capability}: missing or incomplete lifecycle field "${field}"`)
    }
  }
}

/* 3g. Preview and roadmap integrations never present as available. */
const previewText = (row) => `${row?.environment ?? ''} ${row?.restrictions ?? ''} ${row?.scope ?? ''} ${row?.treatment ?? ''} ${row?.summary ?? ''}`
const oracleLifecycle = CAPABILITY_LIFECYCLE.find((row) => /Oracle Operations Agent/i.test(row.capability))
if (!oracleLifecycle || !['CONTROLLED_PREVIEW', 'PREVIEW', 'UNAVAILABLE'].includes(oracleLifecycle.publicStatus) ||
    !/preview/i.test(previewText(oracleLifecycle)) || !/engagement/i.test(previewText(oracleLifecycle))) {
  errors.push('Oracle Operations Agent must remain preview, offered through a scoped engagement')
}
const itsmLifecycle = CAPABILITY_LIFECYCLE.find((row) => row.capability === 'ITSM automation connectors')
if (!itsmLifecycle || !PREVIEW_STATUSES.has(itsmLifecycle.publicStatus) || !/preview/i.test(previewText(itsmLifecycle))) {
  errors.push('ITSM automation connectors must remain preview')
}
for (const id of ['oracleops', 'itsm-connect', 'requestops', 'control-plane']) {
  const agent = AGENT_PORTFOLIO.find((a) => a.id === id)
  if (!agent || !PREVIEW_STATUSES.has(agent.status) || !/preview/i.test(previewText(agent))) {
    errors.push(`publicStatus.js: ${id} must remain preview and say so in its scope`)
  }
}
for (const row of INTEGRATION_STATUS ?? []) {
  if (/Oracle|ServiceNow|Jira|Azure DevOps/i.test(row.dependency) &&
      (!PREVIEW_STATUSES.has(row.status) || !/preview/i.test(row.treatment))) {
    errors.push(`publicStatus.js: integration "${row.dependency}" must remain preview`)
  }
}
for (const row of ENTERPRISE_CAPABILITY_AVAILABILITY ?? []) {
  if (/Oracle|ITSM/i.test(row.capability) && !PREVIEW_STATUSES.has(row.availability)) {
    errors.push(`publicStatus.js: "${row.capability}" must remain preview`)
  }
  if (/billing|additional data engines|local and edge/i.test(row.capability) && row.availability !== 'ROADMAP') {
    errors.push(`publicStatus.js: "${row.capability}" must remain Roadmap`)
  }
}
for (const [component, availability] of commercial.COMPONENT_POSTURE ?? []) {
  if (/integration|automation|Oracle|ITSM/i.test(component) && /^Available\b(?! by engagement)/.test(availability)) {
    errors.push(`commercialJourney.js: "${component}" must not be presented as generally available`)
  }
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
  for (const field of ['summary', 'scope']) {
    if (!agent[field] || agent[field].length < 12) {
      errors.push(`${agent.id}: missing or incomplete portfolio field "${field}"`)
    }
  }
}

/* 3h. Release notes, FAQ and authorized use. */
if (!Array.isArray(RELEASE_NOTES) || RELEASE_NOTES.length < 1 || RELEASE_NOTES[0].items !== CURRENT_RELEASE?.highlights) {
  errors.push('releaseNotes.js: the first release note must be the current release')
}
if (!Array.isArray(FAQ_ITEMS) || FAQ_ITEMS.length < 10) {
  errors.push('releaseNotes.js: FAQ_ITEMS must keep at least ten answered questions')
}
const certificationAnswer = FAQ_ITEMS?.find((item) => /certified/i.test(item.q))?.a ?? ''
if (!/does not hold third-party certifications/i.test(certificationAnswer)) {
  errors.push('releaseNotes.js: the certification FAQ must state that no third-party certification is held')
}
const billingAnswer = FAQ_ITEMS?.find((item) => /billing/i.test(item.q))?.a ?? ''
if (!/no automatic billing/i.test(billingAnswer) || !/after onboarding/i.test(billingAnswer)) {
  errors.push('releaseNotes.js: the billing FAQ must state that trials start after onboarding with no automatic billing')
}
if (!/draft/i.test(AUTHORIZED_USE?.legalStatus ?? '') || !/not yet approved by legal counsel/i.test(AUTHORIZED_USE?.legalStatus ?? '')) {
  errors.push('releaseNotes.js: AUTHORIZED_USE.legalStatus must retain the draft legal status')
}

/* 3i. Cloud Runtime product-surface facts. */
if (LAUNCH_URL !== 'https://app.feuselectronicsgroup.com') {
  errors.push('cloudRuntime.js: LAUNCH_URL changed without authorization')
}
if (CLOUD_RUNTIME?.appUrl !== LAUNCH_URL) {
  errors.push('cloudRuntime.js: CLOUD_RUNTIME.appUrl must match LAUNCH_URL')
}
if (!/Microsoft Entra ID/.test(CLOUD_RUNTIME?.environmentLabel ?? '')) {
  errors.push('cloudRuntime.js: the environment label must name Microsoft Entra ID sign-in')
}

const EXPECTED_MODES = ['AUTO', 'ECONOMY', 'BALANCED', 'QUALITY', 'EXPLICIT']
const actualModes = (ROUTING_MODES ?? []).map((m) => m.id)
if (actualModes.join(',') !== EXPECTED_MODES.join(',')) {
  errors.push(`cloudRuntime.js: routing modes must match the runtime enumeration ${EXPECTED_MODES.join('/')}, found ${actualModes.join('/') || '(none)'}`)
}
if ((ROUTING_MODES ?? []).filter((m) => m.isDefault).length !== 1 ||
    !ROUTING_MODES?.find((m) => m.isDefault)?.label?.includes('FEUS Auto')) {
  errors.push('cloudRuntime.js: FEUS Auto must be the single declared default routing mode')
}
for (const mode of ROUTING_MODES ?? []) {
  if (!mode.label || !mode.summary || mode.summary.length < 20) {
    errors.push(`cloudRuntime.js: routing mode ${mode.id} is missing a usable label or summary`)
  }
}
if (!/eligib/i.test(ROUTING_AUTHORITY?.modeRule ?? '')) {
  errors.push('cloudRuntime.js: ROUTING_AUTHORITY.modeRule must state that a mode selects within the eligible set')
}
if (!/FEUS Policy Router/.test(ROUTING_AUTHORITY?.statement ?? '')) {
  errors.push('cloudRuntime.js: the FEUS Policy Router must be named as the routing authority')
}
if (!/Model Router is not used/i.test(ROUTING_AUTHORITY?.foundryRouterNote ?? '')) {
  errors.push('cloudRuntime.js: the Microsoft Foundry Model Router must not be presented as in use')
}

if (!Array.isArray(ONBOARDING_STEPS) || ONBOARDING_STEPS.length < 6) {
  errors.push('cloudRuntime.js: the onboarding path must keep at least six steps')
}
for (const step of ONBOARDING_STEPS ?? []) {
  for (const field of ['number', 'title', 'owner', 'detail']) {
    if (!step?.[field] || String(step[field]).length < 2) {
      errors.push(`cloudRuntime.js: onboarding step ${step?.number ?? '?'} is missing "${field}"`)
    }
  }
}
if (!Array.isArray(ONBOARDING_FAQ) || ONBOARDING_FAQ.length < 6) {
  errors.push('cloudRuntime.js: the onboarding FAQ must keep at least six answered questions')
}
const scopeHeadings = (RUNTIME_SCOPE ?? []).map((g) => g.heading).join(' | ')
for (const required of [/live/i, /preview/i, /governed/i]) {
  if (!required.test(scopeHeadings)) {
    errors.push('cloudRuntime.js: RUNTIME_SCOPE must separate what is live, what is preview, and what is governed')
  }
}

/* 4. Required verbatim strings. */
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8')
const APPROVED_OG =
  'FEUS.ai is an operationally validated, governance-first AI Data Operations platform: governed AI orchestration, database operations, assurance, and automation. Availability varies by capability.'
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
