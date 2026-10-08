# Commercialization website candidate

Candidate implementation only. No commit, push, deployment, operator enablement, customer approval, billing or live provider test is performed by this website change.

## Journey and scope

`/journey` leads with an intro and four approximate conversations: 20–30 minute intro, 30–60 minute fit/discovery, 60–90 minute readiness/onboarding, and value review around trial day 12–14. `/trial`, `/readiness` and `/packages` explain the customer-specific pack, negotiated entitlements, activation approvals, execution-anchored 14-day evaluation, explicit conversion consent, extension review and offboarding. No clock before onboarding or automatic billing. Hosted and Expert readiness are separate; ordinary users do not need Git. The website does not create or approve runtime packs.

The existing owner-promoted hosted runtime is now separately reconciled from the
new commercialization candidate. `product-status.public.json` is copied from the
distribution's existing generated projection and pinned to candidate source in CI.
Current runtime revision/digest/date and eleven-deployment catalog derive from it.
Historical release evidence remains unchanged except explicit supersession labels.
Catalog eligibility remains tenant/environment/privacy/capability/budget-specific;
existing live hosting does not approve the new journey or qualify a customer.

The distribution repository is private and this website repository is public.
The pinned-source comparison therefore runs in distribution CI
(`website-truth.yml`), which reads this repository's pin and copy anonymously and
compares them with its own Git objects; no cross-repository credential exists.
Website CI keeps the local pin/hash integrity check. Operators can still run
`node scripts/check-production-truth.mjs --remote` with an authenticated `gh`
session; tokens are never read or printed. Neither check is a production release.

Main's earlier artwork/release-history integration has now been merged into
this feature branch without rewriting either accepted candidate history or
main. The real conflict was September checkpoint/EmailJS wording versus the
new canonical observation and guarded server transport; corrected semantics,
historic evidence, shared artwork and crawler previews are all retained.
Cloud inference validation is surface-scoped and never enables an unbound
Hello FEUS executor. The pinned observation remains dated evidence, not an
authorization, live monitoring feed or fresh model invocation result.

The authenticated backend interface is `GET /api/v1/customer/journey` and `POST /api/v1/customer/journey/commands` with `{action,payload,expected_revision,idempotency_key}`. A configured human owner uses separate `/api/v1/customer/owner/journey` and `/api/v1/customer/owner/journey/commands` for readiness review and notification delivery. All require bearer identity, stable `X-Session-ID` and explicit `X-FEUS-Organization`; there is no anonymous activation path. `/readiness` links only to the existing workbench root (`LAUNCH_URL`) and names **Workspace & account**, not an invented deep-link route. The public website sends no lifecycle commands. Payload/decision contracts are owned by distribution `docs/commercialization/TRIAL_WORKFLOW.md`.

Interactive stories are original user-controlled walkthroughs/simulations. No database or model calls, auto-play, production outcomes, invented ROI, customer references, certifications or prices. Native keyboard buttons, live-region stage updates, touch-sized controls and reduced-motion styling are included.

## Official architecture asset

Only the approved user-supplied `FEUS.ai architecture diagram.jpg` was copied from shared branding to `public/brand/feus-ai-architecture-reference.jpg`; the source remains unchanged. `/architecture` retains historical diagrams and adds executive, technical and security context, accessible text and a component-by-component available/limited/roadmap table. The graphic does not attest every depicted component or execution arrow.

## Lead delivery operational gate

FEUS/contact leads no longer use EmailJS. The browser reads `GET /api/contact` and posts to the existing server-side Resend endpoint only when available. Default state is unavailable. Separate legacy property inquiries retain their existing provider; no durable CRM is claimed.

Required operator attestations: `CONTACT_DELIVERY_ENABLED=true`, `CONTACT_PRIVACY_ENABLED=true`, `CONTACT_ABUSE_CONTROLS_ENABLED=true`. Required server-only configuration: `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`, `CONTACT_SITE_ORIGIN`, `CONTACT_RATE_LIMIT_URL`, `CONTACT_RATE_LIMIT_TOKEN`, `CONTACT_RATE_LIMIT_SALT`. Never put secrets in `VITE_*`. The rate endpoint must implement authenticated Redis REST atomic EVAL; process-local counters are deliberately not used.

The operator must verify sender/domain authorization, notification and acknowledgement acceptance/inbox results, bounce/error handling, provider/DPA/privacy notice and retention/deletion/access practices, trusted client-address routing and shared rate-counter behavior before enabling. Privacy approval is an operator decision, not inferred by this draft or automated tests. Counters contain salted IP hashes and expire after 600 seconds; inquiry content is not sent to the rate service. Limits are five inquiries per client and 100 globally per 600-second window. Missing client identity, counter failure, invalid input, honeypot or consent failure refuses delivery. Vercel uses its platform-provided `x-vercel-forwarded-for` only when `VERCEL=1`; another deployment must supply a trusted socket address or an explicitly reviewed adapter. Untrusted `x-forwarded-for` is not used.

Client timeouts/malformed responses remain visible with delivery-unknown warnings. Provider rejection is an error, never a success; acknowledgement failure does not erase accepted notification. Acceptance is not proof of inbox delivery, booking, account creation or trial activation. Input remains available for retry; direct `mailto:info@feuselectronicsgroup.com` fallback is retained. Static hosting without `/api/contact` cannot deliver and defaults unavailable.

## Scheduling and privacy

Only existing `VITE_CALENDLY_URL`/`BOOKING_URL` configuration is used, HTTPS and Calendly event-path validated. No invented URL. Unconfigured scheduling requests an intro through contact and explicitly says an appointment is not yet booked. Failed/loading widgets retain a native event link; no guaranteed response deadline. The Calendly privacy banner is not suppressed. Candidate privacy copy describes server provider, shared abuse service, legacy property inquiries and scheduling; live deployment and legal approval are not asserted.

## Documentation/release gate hook

Before release, the parent gate should require this document and link its reviewed website source revision to:

1. Current candidate capability reconciliation, model ratification and dated existing-runtime evidence, with new-candidate acceptance separate.
2. Backend lifecycle contract and customer-pack/activation/conversion acceptance evidence for the actual revision.
3. Website `npm test` and `npm run build` outputs, plus mobile/browser and reduced-motion acceptance.
4. Delivery/privacy/abuse-control operator acceptance and scheduler verification, or explicit unavailable-mode acceptance.
5. Owner-approved packages and pricing basis (2026-10-08): public pages present approved packages with pricing quoted per customer scope. No public numeric list price was supplied, so none is published; self-service purchase and automatic billing remain unavailable.

Website tests use local provider/rate stubs; they prove behavior, not operational configuration, inbox receipt, privacy approval or live deployment. Historical assertions are retained; directly coupled EmailJS/no-endpoint expectations were replaced by stronger server transport/guard assertions.

Local browser fallback verification used installed Edge with a fresh private profile and loopback CDP, not an existing user browser or any newly installed tool. Against the built preview at `127.0.0.1:5188`, `/journey`, `/trial`, `/readiness`, `/packages`, `/contact?type=intro` and `/architecture` had no document overflow at 1440px or 390px. Native Tab/Enter selected walkthrough stages, advanced execution and reset to the hosted story; native intro activation selected the correct inquiry. Unconfigured delivery stayed visibly unavailable with a disabled send and email fallback, and scheduling explicitly remained not booked. Reduced-motion emulation produced no animation and zero transition duration. Eighteen checks passed with no runtime exceptions or non-GET requests. External network requests were blocked; live Calendly, email, authentication and backend lifecycle behavior remain unverified. The launched browser was closed and its profile removed; screenshots/report remain private under `.git`, not tracked public assets.

The parent-added `.github/documentation-policy.json` defines `public_experience` changes and requires this document; `.github/documentation-impact.json` declares its update. `.github/workflows/documentation-impact.yml` executes vendored `scripts/check_documentation_impact.py` against the actual diff and review evidence on PRs, and the diff on branch pushes. Its canonical source is `senatorAde/FEUS-Enterprise-Distribution:scripts/check_documentation_impact.py`; the parent-supplied current source/vendor SHA-256 is `e0f2d9a80a03500a6268c4473bacee54d5594955c28c9961eb93aa564eca01c2`, computed over committed UTF-8 LF content (the earlier `748818a9…` value hashed Windows CRLF working-tree bytes and was not reproducible on Linux CI). This gate version also reports both sides of renames, so moving a scoped file out of scope still requires review. Human review for a no-impact declaration requires GitHub author association OWNER, MEMBER or COLLABORATOR; outsider approvals are not accepted. Re-verify equality after any gate edit; this declaration is not approval or a bypass of change-specific evidence.

## Post-release re-pin (2026-10-08)

The projection is re-pinned to distribution main `b24684119934329ec90984f1349ad3145bf8f379`, which records the owner-approved release `ca-feus-runtime--rc-0877cd5-chp` (digest `sha256:3397d06c2663ddf2b0bee855c895081017ae1f1bd5619cc30fb3d7ee5c8f0e14`) serving 100% with single rollback `rc-d057b81-chn`. Current revision, digest and date on public pages derive from that projection.
