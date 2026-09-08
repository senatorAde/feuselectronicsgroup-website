# Website second-live-audit implementation

Review date supplied for this session: **2026-09-07**.
Starting state: **main, 06108ec, clean**.
Continuation branch: **remediation/second-live-audit**. Review dates are local (UTC−04:00); cloud evidence dates are UTC. Actual clock check: **2026-09-07T22:24:36-04:00 = 2026-09-08T02:24:36Z**. The existing **2026-09-08 UTC** evidence is not future-dated. The earlier timezone warning was mistaken and has been removed; no historical timestamp or revision was changed.
Scope: website only. Changes are uncommitted for the coordinating release agent.

## Implemented

- `/demo` now leads with a **guided live Azure TST demonstration** using synthetic inputs and Microsoft Foundry inference. Operating the workbench requires authorized Microsoft Entra ID access and tenant authorization arranged in advance. Session scope, token/spend budgets, policy, eligibility and required approvals remain mandatory. No customer systems are connected.
- The alternative **offline LOCAL fixture simulation** is explicitly separate. Its original disclaimer is retained verbatim, including no provider connections. Mock outputs are not represented as live inference. Both options have distinct contact intents.
- Home, FEUS.ai, Cloud Runtime, Get Started, shared audience paths and Contact describe the same live offer. Adoption is separate from a demo and does not follow automatically from signing in or sending an inquiry.
- Trust and Architecture lead with the current published 5.3 cloud evaluation scope. The historical 5.2 Session 12D decision, diagram, limitations and original records remain available and clearly labelled. The historical summary no longer incorrectly assigns the current three live integrations to Session 12D; it shows zero at that assessment.
- Architecture order: **website → Azure workbench → Microsoft Entra ID → tenant authorization → classification → FEUS Policy Router → eligible model/provider → governed agent/tool boundary → durable storage**. The diagram describes logical boundaries, not unconditional execution. Deterministic turns contact no model. Live inference does not establish live SQL/tool execution, customer-target integration or full production qualification.
- `/status` is explicitly a static evidence publication, not health/incident monitoring. Unknown incident state is not rendered as an empty all-clear list. Source date, website review date, revision and basis are displayed separately.
- Customer-facing “this checkout” language is replaced with the actual limitation: the underlying dated audit file is unavailable for public inspection or independent re-attestation. Historical facts and evidence limits were not strengthened.
- Security reporting links on `/security`, `/trust` and `/trust/security` lead to `/contact?type=security#contact-form`, select **Governance & Security**, scroll to the anchor and focus the area-of-interest field. Demo, adoption, offline and review intents are allowlisted; unknown/prototype keys cannot inject form content. Same-route query changes update the selection and focus. Review mode has a real selectable option and resets on other intents.
- Native pointer verification found that narrow contact navigation focused an offscreen field (top **1941.25 px**, viewport height **844 px**). The helper now reveals the focused select in the viewport after anchor navigation. Final field bounds: **475–525 px** at desktop and **397.25–447.25 px** at narrow width, clear of the fixed header.
- The historical posture table now wraps its full revision within fixed-layout columns. The Trust Center architecture link describes the published cloud path and separately retained historical diagram, not an unqualified current execution path.
- Costs remain estimates based on published rates, not billed actuals. “Frontier models avoided” is explicitly a routing indicator, not measured savings. No new ROI claim is made.
- FEUS.ai is explicitly a **product of FEUS Electronics Group**. Existing emblem imagery remains unchanged; no new logo was created.

## Preserved boundaries

- No app/workbench changes, database connections, provider calls, account provisioning, inquiries, scheduler submissions or authentication flows were performed.
- No commit, push, merge or deployment was performed.
- No dependencies were added or installed.
- Both existing validator scripts are unchanged, including governance/claims restrictions. No obsolete validator required relaxation.
- [Historical release data](../../src/data/releaseAssessment.js), public evidence data, [privacy draft](../../src/pages/PrivacyPage.jsx) and [terms draft](../../src/pages/TermsPage.jsx) are unchanged. Published legal documents remain unapproved drafts.
- Existing operational service records remain in the data module; the status presentation now explicitly scopes them to published evaluation evidence rather than present health.

## Actual validation results

Final `npm test` exited successfully:

> Public claims validation passed (73 files scanned, 22 capability rows verified).
>
> Audit-fix regression check passed (findings 2, 5 and 8 still fixed).
>
> tests 14 · pass 14 · fail 0 · cancelled 0 · skipped 0

The new Node tests render actual React components through Vite SSR, covering inquiry selection, rejected URL values, visible-focus helper behavior, required form fields, primary live/alternative offline copy, demo/adoption routes, all security reporting links, cloud/historical ordering, architecture stages, UTC date basis, static status, cost/governance qualifications and legal draft retention. Additional regressions check strict UTF-8 security disclosure/contact/expiry and actual rendered local image references/stale copy. An isolated temporary copy first passes the existing claims validator, then fails with exit 1 after inserting `NO-GO above LOCAL` into the homepage. The real working tree is not mutated by that negative test.

Final `npm run build` exited successfully:

> vite v5.4.21 · 2013 modules transformed · built in 19.50s

- Actual HTML entry: `/assets/index-CKdFNfQi.js`, 289.91 kB / 87.47 kB gzip.
- Exact-release phrases `NO-GO` / `above LOCAL` in that entry: **0**.
- `git diff --check`: clean.
- Editor diagnostics on changed source/test files: no errors reported.
- Direct diff comparison confirmed no changes to historical release data, public evidence data, existing validators or the two legal drafts.

### Built-site browser checks

Local Vite preview only, at loopback port 4178. No forms were submitted. The reproducible [browser audit](../../scripts/browser-audit.mjs) uses installed Edge in headless mode and Node 20's experimental WebSocket support; no dependency installation is needed. Browser requests to external origins and all non-GET requests are blocked.

| Check | Final result |
| --- | --- |
| 12 routes × 2 viewports | **24/24 passed** at **1440 × 1000** and **390 × 844**; no document-level horizontal overflow or detected broken images |
| Demo, adoption, security, offline CTAs × 2 | **8/8 native pointer clicks**; correct URL, selection, focus and visible field bounds |
| Historical Trust and Architecture disclosures × 2 | **4/4 native pointer clicks**; opened with no document overflow |
| Same-contact-route security → demo × 2 | **2/2 native pointer clicks**; selection and focus updated |
| FAQ expansion × 2 | **2/2 native pointer clicks**; expanded state verified |
| Narrow navigation menu | **1/1 native pointer click**; expanded state verified |
| Local asset responses | **25 distinct asset URLs observed**, no local HTTP errors |
| Submission guard | **0 non-GET requests**, no inquiry submission |
| Screenshots | **39 captured**; representative desktop/narrow layouts visually reviewed, including the corrected contact focus |

The 12 routes were `/`, `/feus-ai`, `/cloud-runtime`, `/get-started`, `/demo`, `/contact`, `/trust`, `/trust/security`, `/security`, `/architecture`, `/status` and `/faq`. All **17** pointer checks used native browser mouse input through CDP; observed click events had **isTrusted=true** and **pointerType=mouse**, not DOM-dispatched click events. Tables designed with their own horizontal scroll retain that behavior on narrow screens.

Final screenshot/report directory (outside the repository): **%TEMP%/feus-web-pointer-audit-qyj5eH**. Failed reproduction evidence: **%TEMP%/feus-web-pointer-audit-6kMfXk**. No screenshots were added to public assets.

**Limitations:** the integrated browser remained hidden even after viewport sizing; a normal locator click timed out after 3 seconds, and a coordinate mouse click produced no event. Neither attempt is counted as pointer success. Earlier DOM-dispatched checks are superseded by the Edge results above. Edge was headless, not a physical desktop/mobile device or a full keyboard/screen-reader audit. External fonts were blocked along with all external requests, so screenshots use available fallback fonts and do not verify Google Fonts delivery. Contact delivery, authentication, runtime inference and provider integration were not exercised.

### Direct security disclosure validation

Read-only GETs were made to the [local source](../../public/.well-known/security.txt) via preview and to the public `https://feuselectronicsgroup.com/.well-known/security.txt` endpoint. No report was submitted.

| Property | Local preview | Public endpoint |
| --- | --- | --- |
| HTTP status | 200 | 200 |
| Content-Type | `text/plain` | `text/plain; charset=utf-8` |
| Strict UTF-8 decoding | Passed | Passed |
| Bytes | 426 (CRLF) | 417 (LF) |
| HTML fallback | None | None |
| Contact | `mailto:info@feuselectronicsgroup.com` and `https://feuselectronicsgroup.com/security` | Same |
| Expires | `2027-09-07T00:00:00.000Z`, unexpired | Same |
| Canonical | `https://feuselectronicsgroup.com/.well-known/security.txt` | Same |

Bodies are identical after CRLF/LF normalization. The disclosure source and deployment configuration were not changed.

### Final scope/counts

- **24 pending files: 17 tracked modifications + 7 new files.** Breakdown: **12 pages, 7 shared components/data files, 4 package/test files, 1 document**.
- **Only changed document:** [SECOND_LIVE_AUDIT.md](SECOND_LIVE_AUDIT.md), new/untracked. No other documentation was edited.
- **0 asset changes**; existing logo/emblem and public evidence files remain unchanged. **0 changes** to historical release data, legal drafts or either original validator.
- Search across source/public/docs found **0 customer-copy occurrences** of the stale checkout phrase, mock-only claims or mistaken later-date/reconciliation warnings. The quoted removed phrase and explicit timezone correction in this handoff are intentional audit explanations, not customer warnings.
- No commits, pushes, merges, deployments, dependency installs or inquiry submissions.

## Branding handoff for the app agent

Use the **existing 2026 Group emblem** with textual product endorsement, not a new FEUS.ai symbol:

- Source artwork: `Z:/FEUStraining/FEUS-Shared/branding/FEUS logo 2026.png` (confirmed present).
- Preferred existing web asset: [public/brand/feus-logo-2026.webp](../../public/brand/feus-logo-2026.webp), 720 × 720. Public URL `/brand/feus-logo-2026.webp`.
- Compact/browser icon: [public/brand/feus-favicon-2026.png](../../public/brand/feus-favicon-2026.png), 96 × 96. Public URL `/brand/feus-favicon-2026.png`.
- Shared treatment: [BrandMark](../../src/components/BrandMark.jsx) uses the unchanged emblem on dark navy, with accessible meaning supplied by the parent link/visible name. Keep the square asset aspect ratio; do not redraw or stretch it.
- App text recommendation: **FEUS.ai** with **“A product of FEUS Electronics Group”** as the secondary line. The website now uses that relationship explicitly.
- Optional backgrounds only: [hero](../../public/brand/feus-hero-system.webp), 1600 × 1040; [social card](../../public/brand/feus-social-preview.webp), 1200 × 630. Neither is a substitute for the compact emblem.
- Exact current interface tokens from [Tailwind configuration](../../tailwind.config.js): ink/navy-950 **#061326**; navy-900 **#0b2138**; FEUS blue-500 **#16a8f4**, blue-300 **#88d7ff**; accent green-500 **#58c72f**, green-300 **#a4f87d**; primary CTA gold-400 **#ffc45e**; paper **#fbfdff**. These are UI tokens, not claimed pixel samples from the artwork.
- Fonts: **Sora** display, **Manrope** body, **JetBrains Mono** technical annotations. Retain sufficient contrast and do not use green as an unqualified health/certification signal.
- The older shared brand guide contains a retired violet/emerald palette and older asset reference; the current website implementation and [asset-usage record](ASSET_USAGE.md) establish the actual 2026 visual treatment. No shared guideline or original artwork was edited.

## Remaining concerns / release-owner decisions

1. **Evidence scope:** the existing current cloud record retains its **2026-09-08 UTC** date and revision. The local website review is not fresh cloud verification; the timezone relationship is clarified above and requires no release-owner date reconciliation.
2. **No live-health feed:** static publication cannot report current incidents. Connecting monitoring would require a separately scoped implementation and evidence.
3. **Legal approval remains pending.** No privacy/terms approval is implied by passing tests.
4. **App/demo operational controls remain app-owned:** enforce the visible demo label, synthetic-only inputs, authorized tenant, budgets, tool boundary and provider eligibility in the actual guided session. Website copy does not itself enforce runtime policy.
5. **Non-blocking existing warnings:** React 18 SSR warns about the existing `fetchPriority` prop; the build warns that Browserslist/caniuse-lite is six months old. Neither caused a failure; no unrelated dependency upgrade was performed.
6. **Contact transport was not end-to-end tested.** Existing form delivery and response-time wording were not revalidated because this task prohibits sending inquiries. Security reporting remains a channel without end-to-end encryption, as disclosed on `/security`.

## Changed files

### Pages
- [HomePage.jsx](../../src/pages/HomePage.jsx)
- [FeusAiPage.jsx](../../src/pages/FeusAiPage.jsx)
- [CloudRuntimePage.jsx](../../src/pages/CloudRuntimePage.jsx)
- [GetStartedPage.jsx](../../src/pages/GetStartedPage.jsx)
- [DemoPage.jsx](../../src/pages/DemoPage.jsx)
- [ContactPage.jsx](../../src/pages/ContactPage.jsx)
- [TrustPage.jsx](../../src/pages/TrustPage.jsx)
- [TrustSecurityPage.jsx](../../src/pages/TrustSecurityPage.jsx)
- [SecurityPage.jsx](../../src/pages/SecurityPage.jsx)
- [ArchitecturePage.jsx](../../src/pages/ArchitecturePage.jsx)
- [StatusPage.jsx](../../src/pages/StatusPage.jsx)
- [FaqPage.jsx](../../src/pages/FaqPage.jsx)

### Shared presentation and data
- [AudiencePaths.jsx](../../src/components/AudiencePaths.jsx)
- [releaseComponents.jsx](../../src/components/releaseComponents.jsx)
- [CloudEvidence.jsx](../../src/components/CloudEvidence.jsx) — new
- [cloudRuntime.js](../../src/data/cloudRuntime.js)
- [publicStatus.js](../../src/data/publicStatus.js)
- [demoExperience.js](../../src/data/demoExperience.js) — new
- [contactNavigation.js](../../src/data/contactNavigation.js) — new

### Tests and documentation
- [package.json](../../package.json)
- [audit-render.jsx](../../scripts/audit-render.jsx) — new
- [second-audit.test.mjs](../../scripts/second-audit.test.mjs) — new
- [browser-audit.mjs](../../scripts/browser-audit.mjs) — new, native-pointer local-only verification
- [SECOND_LIVE_AUDIT.md](SECOND_LIVE_AUDIT.md) — new, this handoff