# FEUS.ai Trust Center Disclosure Boundary

**Date:** 2026-08-13
**Purpose:** Define, unambiguously and enforceably, which statements belong on public
marketing surfaces and which belong on the Trust Center — and how that boundary is
maintained in code.

---

## 1. The boundary rule

> A statement belongs on a **marketing or adoption surface** if it describes what FEUS.ai
> *is, does, and is for*.
>
> A statement belongs on the **Trust Center** if it describes *the conditions, revisions,
> environments, or evidence* under which a specific claim was assessed.

Corollary: **an exact-revision decision is never product positioning.** The Session 12D
`NO-GO` applies to revision `3c401504aef201b510c8695bac7c31ad424c2274` of version
`5.2.0-enterprise.1` under one deployment configuration. Rendering it as a platform verdict
was a scope error, not a candour requirement.

## 2. Layer model

| Layer | Name | Audience | Home |
|---|---|---|---|
| 1 | Product positioning | Prospects, buyers | `/`, `/feus-ai`, `/solutions`, `/services`, `/contact`, `/demo`, `/copilot` |
| 2 | Capability-specific preview disclosure | Evaluators of a specific capability | The capability's own page |
| 3 | Technical assurance & certification | Security reviewers, procurement, auditors | `/trust`, `/trust/security`, `/trust/compliance`, `/status`, `/architecture`, `/assurance`, `/faq` |
| 4 | Internal engineering release history | Internal engineering, design partners | `/release-notes`, `FEUS-Enterprise-Distribution` repo |

Layers descend in specificity and ascend in technical depth. Each layer links downward to
the next; no layer is hidden.

## 3. Data-model binding

`src/data/publicStatus.js` exports two governing objects.

### `POSTURE` — layer 1
Customer-facing product positioning. Safe on every surface.

| Field | Role |
|---|---|
| `headline` | Product headline |
| `shortStatement` | One-line posture (footer, status strip) |
| `publicPostureStatement` | The approved full posture paragraph |
| `valueStatement` | What the platform combines |
| `architectureStatement` | How it is built |
| `validationStatement` | How it was validated |
| `lifecycleStatement` | How capabilities graduate |
| `availabilityQualifier` | Scope qualifier used in place of a warning |
| `statusStripNote` | Neutral pointer to per-capability status |

**Constraint:** `POSTURE` must not contain `decision`, `certifiedRevision`, or
`trustBanner`. These are Trust Center facts. The claims gate fails the build if they reappear.

### `RELEASE_ASSESSMENT` — layer 3/4
Exact-revision certification record. Trust Center surfaces only.

| Field | Role |
|---|---|
| `decision` | `NO-GO` (pinned) |
| `decisionScope` | The precise scope of the decision |
| `decisionDate` | `2026-08-07` |
| `certifiedRevision` | `3c401504aef201b510c8695bac7c31ad424c2274` (pinned) |
| `versionAssessed` | `5.2.0-enterprise.1` |
| `assessment` | Session 12D final independent release certification |
| `superseded` | Supersession state |
| `trustCenterSummary` | Reviewer-facing summary |
| `scopeRule` | "Applies to the assessed revision, version, environment, and deployment configuration only." |
| `supersessionRule` | Conditions under which the decision is replaced |
| `disclosureBoundary` | The public statement of this boundary |

The module carries an inline **SCOPE BOUNDARY** comment stating that `RELEASE_ASSESSMENT`
must not be rendered on the homepage, product page, solutions, adoption, consultation,
sales, or demo surfaces.

## 4. Enforcement

`scripts/validate-public-claims.mjs` runs as both `npm test` and `prebuild`. A violation
fails the build.

### 4.1 Containment (`RELEASE_GATE_LANGUAGE`)
The following patterns are **build-failing outside the allowlist below**:

| Pattern | Rationale |
|---|---|
| `NO-GO` | Release-gate decision language |
| `above LOCAL`, `LOCAL-only`, `LOCAL only` | Environment restriction as positioning |
| `not approved for production`, `not authorized for production` | Release-gate language |
| `pre-release platform`, `experimental platform`, `untested platform` | Product-wide pre-release characterisation |
| `zero capabilities`, `zero of 45`, `0 of 45` | Release-matrix count as positioning |
| `current status and limitations` | Warning-style status framing |
| `remediation round`, `certification failure`, `failed release validation` | Internal remediation history |
| `preview limits` | Product-wide preview framing |

The generic negation escape hatch — which allows a prohibited marketing phrase when the
surrounding line negates it — is **disabled** for these rules. Otherwise "not approved for
production" would pass as an apparent denial while still reading to a visitor as a warning.

### 4.2 Allowlist (`TRUST_SURFACE_FILES`)
Release-gate vocabulary is permitted only in:

```
src/data/publicStatus.js
src/components/statusComponents.jsx
src/pages/TrustPage.jsx
src/pages/TrustSecurityPage.jsx
src/pages/TrustCompliancePage.jsx
src/pages/StatusPage.jsx
src/pages/ReleaseNotesPage.jsx
src/pages/ArchitecturePage.jsx
src/pages/AssuranceDashboardPage.jsx
src/pages/FaqPage.jsx
src/pages/DemoPage.jsx
```

Adding a file to this list is a governance decision, not a convenience.

### 4.3 Positive checks
1. All nine `POSTURE` marketing fields must exist and be non-trivial.
2. None of them may contain release-gate language.
3. `RELEASE_ASSESSMENT.decision` must be `NO-GO` until a superseding assessment exists.
4. `RELEASE_ASSESSMENT.certifiedRevision` must equal the pinned hash.
5. `decisionScope`, `decisionDate`, `versionAssessed`, `assessment`, `trustCenterSummary`,
   `scopeRule`, and `supersessionRule` must all be present.
6. `POSTURE.productionVerifiedCapabilities === 0` and `POSTURE.totalCapabilities === 45`.
7. Control counts must reconcile to 38.
8. The approved OG/Twitter description string must appear verbatim in `index.html`.

### 4.4 Mutation test of record
Injecting `The assessed vNext release remains NO-GO above LOCAL.` into
`src/pages/HomePage.jsx` produced:

```
PUBLIC CLAIMS VALIDATION FAILED — 2 violation(s):
  ✗ src\pages\HomePage.jsx:87 — Release-gate decision language outside the Trust Center
  ✗ src\pages\HomePage.jsx:87 — Environment restriction stated outside the Trust Center
EXIT=1
```

The mutation was reverted. Re-run this test whenever the containment rules change.

## 5. Public statement of the boundary

Rendered on `/trust` from `RELEASE_ASSESSMENT.disclosureBoundary`:

> FEUS applies capability-specific assurance and release validation. Availability and
> deployment requirements may differ by feature, environment, and integration.

## 6. Change procedure

1. Product posture changes → edit `POSTURE` in `src/data/publicStatus.js`.
2. Release-gate facts change → edit `RELEASE_ASSESSMENT`, and update the pinned assertions
   in the validator in the same commit, with the superseding assessment identified.
3. A new capability enters preview → add it to `CAPABILITY_LIFECYCLE` and
   `AGENT_PORTFOLIO`; disclose it on its own page. **Do not** add a platform-wide caveat.
4. The approved OG string changes → update `index.html` **and** `APPROVED_OG` in the
   validator together, or the build fails.
5. Never edit posture copy directly in a JSX page. If a page needs a posture sentence, it
   must read it from `publicStatus.js`.

## 7. Non-negotiable retentions

The following are legitimate legal, security, or assurance disclosures and are **not
eligible for removal** under any confidence-uplift work:

- The Session 12D `NO-GO` decision and its full scope and supersession rules.
- All twelve `KNOWN_LIMITATIONS` entries.
- The 45-capability matrix and the `0 of 45` production-verified count.
- The 38 assessed control counts.
- `DEMO_DISCLAIMER`, `AUTHORIZED_USE`, `MODEL_PROVIDER_STATEMENT`, `ROI_STATEMENT`.
- The Privacy Policy / Terms of Service legal-review notice.
- Every prohibited-claim regex in the validator.

Confidence is achieved by placement and scope. It is never achieved by deletion.
