#!/usr/bin/env node
/**
 * validate-public-claims.mjs — public claims compliance gate.
 *
 * Enforces the Session 13A approved claims baseline against the website
 * source before every build (wired as `prebuild` and `npm test`).
 *
 * Checks:
 *  1. Prohibited claim phrases (naming register + approved messaging).
 *  2. Oracle public-representation prohibition.
 *  3. publicStatus.js integrity: counts reconcile to 45, every public
 *     capability has an approved status and a required qualification.
 *  4. Required posture strings present (NO-GO, revision, approved OG text).
 *  5. Placeholder text scan.
 *  6. Basic secret scan.
 *
 * Exit code 1 on any violation. Do not weaken these checks without a
 * superseding independent assessment.
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
  { re: /\boracle\b/i, why: 'Oracle is excluded from public product representation' },
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
    ...PROHIBITED.filter((r) => !(isVocab && /oracle/i.source === r.re.source)),
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
  POSTURE, CAPABILITY_SUMMARY, PUBLIC_CAPABILITIES, CONTROL_COUNTS, STATUS_DEFS,
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

/* 4. Required verbatim strings. */
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8')
const APPROVED_OG =
  'FEUS.ai is a pre-release governed data-operations architecture under controlled evaluation. It is not approved for production deployment.'
if (!indexHtml.includes(APPROVED_OG)) {
  errors.push('index.html: approved OG description missing or altered')
}
if (indexHtml.includes('feus-preview.png')) {
  errors.push('index.html: broken/unapproved OG image reference present')
}

/* Report. */
if (errors.length) {
  console.error(`\nPUBLIC CLAIMS VALIDATION FAILED — ${errors.length} violation(s):\n`)
  for (const e of errors) console.error(`  ✗ ${e}\n`)
  process.exit(1)
} else {
  console.log(`Public claims validation passed (${scanFiles.length} files scanned, ${PUBLIC_CAPABILITIES.length} capability rows verified).`)
}
