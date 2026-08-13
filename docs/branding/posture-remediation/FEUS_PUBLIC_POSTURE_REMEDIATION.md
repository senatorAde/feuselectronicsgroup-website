# FEUS.ai Public Posture Remediation

**Scope:** `FEUS-Web/feuselectronicsgroup-website`
**Date:** 2026-08-13
**Authority:** `src/data/publicStatus.js` (machine-enforced by `scripts/validate-public-claims.mjs`)
**Non-goal:** This remediation introduced **no** new capability, certification, customer,
performance, ROI, or deployment claim. Every factual assertion already existed in the
source of truth and was only *relocated* or *reframed*.

---

## 1. Problem statement

The public website was rendering **internal release-gate language** as **product
positioning**. A single exact-revision engineering decision — the Session 12D `NO-GO`
for FEUS.ai vNext `5.2.0-enterprise.1` at revision `3c401504…` — had been promoted into
a sitewide red warning banner and repeated on the homepage, the product page, the
solutions page, and the Copilot landing page.

Three distinct failures followed:

1. **Scope inflation.** A decision that legitimately applies to *one revision, one
   version, one deployment configuration* was read by visitors as a verdict on the
   *entire platform*.
2. **Colour misuse.** Red/rose error treatment was applied to normal, expected
   lifecycle states ("Preview", "not yet bound", "next milestone"). Red therefore
   carried no signal and produced constant low-grade alarm.
3. **Audience collision.** Prospective customers, security reviewers, and internal
   engineers were all served the same undifferentiated text, so none of them were
   served well.

The result was a site that was *honest but self-defeating*: it discouraged the very
qualified enterprise conversations the platform is ready to have.

## 2. Remediation principle

> Accuracy is preserved by **placement and scope**, not by volume and colour.

The fix was structural, not cosmetic. The single `POSTURE` object was split into two
objects with explicitly different audiences and different rendering rules.

| Object | Audience | Answers | May render on |
|---|---|---|---|
| `POSTURE` | Prospects, buyers, general public | *What is FEUS.ai and what is it for?* | Every surface |
| `RELEASE_ASSESSMENT` | Security reviewers, procurement, auditors | *What exactly was certified, at which revision, under which conditions?* | Trust Center / status / assurance surfaces only |

`RELEASE_ASSESSMENT` retains the `NO-GO` decision, the certified revision hash, the
assessment date, the scope rule, and the supersession rule **verbatim and unweakened**.
Nothing was deleted; the evidence simply now lives where evidence belongs.

## 3. Four-layer disclosure model

| Layer | Content | Surfaces |
|---|---|---|
| **1. Product positioning** | Value, architecture, governance model, adoption path | `/`, `/feus-ai`, `/solutions`, `/services`, `/contact`, `/demo`, `/copilot` |
| **2. Capability-specific preview disclosure** | Per-capability status, environment scope, restriction, next milestone | The specific capability page only (`/agents/oracle`, `/requestops`, `/control-plane`, `/integrations/itsm`) |
| **3. Technical assurance & certification** | Control counts, exact-revision matrix, release decision, known limitations | `/trust`, `/trust/security`, `/trust/compliance`, `/status`, `/architecture`, `/assurance`, `/faq` |
| **4. Internal engineering release history** | Remediation rounds, session chronology, superseded assessments | `/release-notes` and the `FEUS-Enterprise-Distribution` repository |

A capability in Preview now discloses that fact **on its own page**, next to its own
name — not on the homepage, and not on behalf of the whole platform.

## 4. Approved public posture statement

Rendered from `POSTURE.publicPostureStatement`; enforced as a required non-empty field:

> FEUS.ai is an operationally validated, governance-first AI Data Operations platform.
> Core capabilities are designed for controlled enterprise adoption, while newly
> introduced agents and integrations may follow preview or configuration-specific
> availability.

Supporting fields, all gate-required and all gate-checked for absence of release-gate
language:

| Field | Purpose |
|---|---|
| `headline` | "Governed AI for Data Operations" |
| `shortStatement` | One-line posture for footer and status strip |
| `valueStatement` | What the platform combines |
| `architectureStatement` | How it is built (policy, least privilege, approvals, auditability) |
| `validationStatement` | How it was validated |
| `lifecycleStatement` | How new capabilities graduate |
| `availabilityQualifier` | Honest scope qualifier used in place of a warning |
| `statusStripNote` | Neutral pointer to per-capability status |

## 5. Banner replacement

`ReleaseStatusBanner` → **`PlatformStatusStrip`**.

| | Before | After |
|---|---|---|
| Treatment | Rose/red alert bar | `bg-navy-950`, hairline bottom border |
| Icon | Alert, rose | `Info`, `feus-400` |
| Copy | Release `NO-GO` decision text | `POSTURE.shortStatement` + `POSTURE.statusStripNote` |
| Link | "Read the decision" | "Capability status" → `/status` |
| `aria-label` | — | `FEUS.ai capability status` |
| Shown on | All platform routes incl. `/feus-ai`, `/demo`, `/copilot` | Assurance/technical routes only |

It was **not** replaced with a second prominent negative banner. It is an informational
wayfinding strip.

## 6. Colour discipline

Red/rose is now reserved for: active service incidents, security emergencies, actual
outages, and critical user action required.

Normal lifecycle disclosures were converted from rose to neutral slate/`feus` accents on
`/sqlops`, `/control-plane`, `/requestops`, `/trust/security`, `/release-notes`, and in
`ReleaseDecision`. Amber uppercase status lines on the homepage, `/feus-ai`, and
`/sqlops` product-family cards were converted to neutral `feus-300`.

**One rose treatment was deliberately retained:** the "Evidence snapshot data is
unavailable" state on `/assurance`. That is a genuine data-unavailable error condition
and correctly qualifies for error treatment.

## 7. Source-of-truth enforcement

The website holds **no independent hand-edited posture**. `scripts/validate-public-claims.mjs`
was **strengthened**, never relaxed:

1. Release-gate assertions rebound from `POSTURE` to `RELEASE_ASSESSMENT`; the `NO-GO`
   decision and the certified revision hash remain pinned and immutable to casual edits.
2. New required-evidence check: `decisionScope`, `decisionDate`, `versionAssessed`,
   `assessment`, `trustCenterSummary`, `scopeRule`, `supersessionRule` must all be present.
3. New **containment rule** (`RELEASE_GATE_LANGUAGE`): `NO-GO`, `above LOCAL`,
   `LOCAL-only`, `not approved for production`, `pre-release platform`, `zero of 45`,
   `current status and limitations`, `remediation round`, and `preview limits` are
   **build-failing** outside an explicit Trust Center file allowlist.
4. The negation escape hatch was **disabled** for containment rules, so "not approved for
   production" can no longer slip through as an apparent denial.
5. New positive check: the nine `POSTURE` marketing fields must exist, be non-trivial,
   and must not themselves contain release-gate language.
6. New structural check: `POSTURE.decision`, `POSTURE.certifiedRevision`, and
   `POSTURE.trustBanner` must **not** exist — exact-revision fields belong to
   `RELEASE_ASSESSMENT`.

The containment rule was mutation-tested: injecting
`The assessed vNext release remains NO-GO above LOCAL.` into `HomePage.jsx` produced two
violations and exit code 1. The mutation was reverted.

## 8. What was intentionally retained

- The Session 12D `NO-GO` decision, its revision hash, date, scope rule, and supersession rule.
- All twelve entries in `KNOWN_LIMITATIONS`.
- The full 45-capability matrix and the `0 of 45` production-verified count.
- All 38 assessed control counts.
- Per-capability restrictions, environments, and next milestones.
- `DEMO_DISCLAIMER`, `AUTHORIZED_USE`, `MODEL_PROVIDER_STATEMENT`, `ROI_STATEMENT`.
- The legal-review notice for Privacy Policy and Terms of Service.
- Every prohibited-claim regex in the validator.

## 9. Verification

| Check | Result |
|---|---|
| `npm test` (claims gate) | Pass — 58 files scanned, 22 capability rows verified |
| `npm run build` (prebuild gate + Vite) | Pass — 1998 modules, built in 14.0s |
| Containment-rule mutation test | Fails correctly (exit 1, 2 violations) |
| `dist/` scan: `not production ready`, `preview limits`, `current status and limitations`, `zero of 45` | 0 occurrences |
| `dist/` scan: `Governed AI for Data Operations` | Present |

`NO-GO` (×3) and `above LOCAL` (×4) remain in the JavaScript bundle because the site
ships as a single un-split chunk and those strings belong to the Trust Center data
module. They are **not reachable on any marketing or adoption surface**. Code-splitting
the Trust Center route would remove them from the initial payload; it is recorded as a
residual item, not a defect.

## 10. Residual items

1. Single 590 kB bundle — Trust Center strings ship with every route. Route-level code
   splitting would improve both payload and string locality.
2. No automated accessibility test harness in the repo; contrast and landmark review for
   the new status strip was manual.
3. Privacy Policy and Terms of Service remain in legal review.
