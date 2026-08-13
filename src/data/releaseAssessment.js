/**
 * releaseAssessment.js — Trust Center / assurance content ONLY.
 *
 * SCOPE BOUNDARY — everything in this module describes exact-revision release
 * evidence, release history, known limitations, and authorization scope. It is
 * NOT product positioning and must never be imported by homepage, product,
 * solutions, adoption, consultation, sales, or demo surfaces, nor by any
 * module those surfaces import (Layout, Footer, statusComponents).
 *
 * This module is intentionally isolated so that release-gate language is
 * physically absent from the marketing JavaScript bundle: only lazy-loaded
 * Trust Center routes import it. The claims gate
 * (scripts/validate-public-claims.mjs) enforces this boundary and pins the
 * decision and revision below — do not weaken either without a superseding
 * assessment recorded in the canonical product-posture source.
 */

/**
 * Exact-revision release assessment record (Session 12D).
 * It describes one named revision and one named deployment scope. It is NOT a
 * characterization of the FEUS.ai product. Public marketing surfaces read
 * POSTURE and per-capability lifecycle status from publicStatus.js instead.
 */
export const RELEASE_ASSESSMENT = {
  decision: 'NO-GO',
  decisionScope: 'FEUS.ai vNext 5.2.0-enterprise.1 external release assessment',
  decisionDate: '2026-08-07',
  certifiedRevision: '3c401504aef201b510c8695bac7c31ad424c2274',
  versionAssessed: '5.2.0-enterprise.1',
  assessment: 'Session 12D final independent release certification',
  superseded: false,
  /* Trust Center summary — the approved place for release-gate language. */
  trustCenterSummary:
    'Session 12D was an independent release assessment of a named vNext revision and deployment scope. ' +
    'Its outcome does not authorize external deployment of that revision above LOCAL and does not replace ' +
    'the separately documented operational history of the core platform.',
  scopeRule:
    'This decision applies to the assessed revision, version, environment, and deployment configuration only.',
  supersessionRule:
    'Session 12D remains controlling for the assessed vNext revision. Product-level claims are governed separately by capability lifecycle, environment, configuration, and evidence scope.',
  disclosureBoundary:
    'FEUS applies capability-specific assurance and release validation. Availability and deployment requirements may differ by feature, environment, and integration.',
}

/** Known limitations (Trust Center Content Plan §25). */
export const KNOWN_LIMITATIONS = [
  'The Session 12D vNext release remains NO-GO for external deployment above LOCAL.',
  'The vNext execution path has no dispatcher or bound SQL executor; the documented core GEG path is separate.',
  'No Oracle, ITSM, identity-provider, model-provider, or Azure integration was live-verified by Session 12D.',
  'Model-provider invocation remains disabled.',
  'The Oracle Operations Agent is Controlled Preview with fixture evidence only and no live adapter.',
  'Target-tier signing-key custody and authorization remain absent for the assessed vNext release.',
  'Runtime evidence is not adversary-resistant.',
  'Outbound data redaction did not meet the release threshold.',
  'Shared durable state for vNext safety and replay controls is not established.',
  'The assessed vNext path has no compensating rollback executor.',
  'The assessed vNext Azure infrastructure is incomplete and undeployed.',
  'No availability, recovery, performance, or ROI actuals.',
]

/** Authorized use (product-posture draft; Legal approval pending for binding terms). */
export const AUTHORIZED_USE = {
  text:
    'FEUS.ai is intended for authorized users, service identities, environments, and systems operating within a named capability scope. Core enterprise adoption requires target-specific identity, governance, policy, PII, approval, audit, support, and customer authorization. Preview extensions are limited to their published environment, data, participant, and operation boundaries. Attempts to bypass FEUS security, governance, approval, licensing, tenant, or access controls are prohibited.',
  qualification:
    'Session 12D authorizes no use of the assessed vNext 5.2.0-enterprise.1 release above LOCAL. That exact-revision decision does not itself grant or revoke a separately documented core capability deployment; each deployment requires its own authorization.',
  legalStatus:
    'Product-posture language. Legal counsel must approve this language before it appears in binding terms.',
}

/** Trust Center FAQ (Trust Center Content Plan §31). */
export const FAQ_ITEMS = [
  {
    q: 'Is FEUS.ai production ready?',
    a: 'Production readiness is capability, version, environment, and configuration specific. The core GEG SQL Server workflow has documented operational validation and is available for controlled enterprise adoption after target qualification. The assessed vNext 5.2.0-enterprise.1 release is not authorized above LOCAL, and newer extensions retain the statuses shown in the lifecycle matrix.',
  },
  {
    q: 'Is FEUS.ai formally certified?',
    a: 'No formal certification is asserted. Session 12D was an independent exact-revision release assessment performed within the development environment; it is not a SOC 2 examination, ISO/IEC 27001 certification audit, penetration-test attestation, or regulatory opinion.',
  },
  {
    q: 'What was independently assessed?',
    a: 'A named revision (3c401504aef201b510c8695bac7c31ad424c2274) and its implementation and release-artifact evidence, including 2,320 automated tests, source provenance, dependency checks, and 38 security controls.',
  },
  {
    q: 'Does FEUS.ai connect to a live database?',
    a: 'The documented core GEG path has executed a real FEUS SQL Server provisioning workflow. The separate vNext Control Plane/PES path assessed by Session 12D has no dispatcher or bound SQL executor and remains Controlled Preview.',
  },
  {
    q: 'Does FEUS.ai support Oracle?',
    a: 'The Oracle Operations Agent is in Controlled Preview. Tier 1 read-only policy and observer behavior are tested against deterministic fakes. No live Oracle driver, adapter, compatibility result, or production support claim exists.',
  },
  {
    q: 'Which ITSM integrations are available?',
    a: 'Three connector contracts (ServiceNow, Jira Service Management, and Azure DevOps work items) are in Preview against mock transports with dry-run defaults. No live production tenant lifecycle is qualified.',
  },
  {
    q: 'Which model providers are supported?',
    a: 'No runtime model provider is currently supported. Provider-neutral contracts are in Preview, model invocation is disabled, and the approved model set is empty.',
  },
  {
    q: 'Is the audit trail immutable?',
    a: 'No. Local hash-chain behavior can detect naive edits in tests, but the chain is unkeyed and externally unanchored, and evidence integrity failed the Session 12D release threshold.',
  },
  {
    q: 'Does FEUS.ai guarantee PII protection?',
    a: 'No. PII inspection and disclosure controls exist in tested code paths, but outbound data redaction did not meet the Session 12D release threshold.',
  },
  {
    q: 'Are ROI figures measured?',
    a: 'No. Controlled demonstrations may show illustrative estimates only, with disclosed assumptions and zero governed operations.',
  },
  {
    q: 'Can FEUS.ai be deployed on-premises or in Azure?',
    a: 'Deployment is capability and target specific. The assessed vNext Azure topology remains Preview: its templates are incomplete and were never compiled, what-if analyzed, or deployed. Core adoption requires a separate deployment qualification.',
  },
  {
    q: 'How do I report a security concern?',
    a: 'The formal vulnerability-management and responsible-disclosure process is being completed. Until a monitored channel is published, use the general contact form, mark the inquiry as security-related, and do not include sensitive technical details.',
  },
  {
    q: 'Who is authorized to use FEUS.ai?',
    a: 'Authorization is capability and environment specific. Core use requires an approved enterprise scope and controls. Session 12D restricts the assessed vNext release to authorized internal LOCAL development, testing, evidence review, and controlled demonstrations.',
  },
]

/** Public release-posture history (release notes page). */
export const POSTURE_HISTORY = [
  {
    date: '2026-08-07',
    revision: 'product-level, capability scoped',
    version: 'FEUS.ai platform posture',
    authority: 'Product, Governance, Trust Center, and Release Assurance',
    decision: 'PRODUCT POSTURE CORRECTED WITH PREVIEW LIMITATIONS',
    scope:
      'Separates documented core operational validation from exact-revision release certification and assigns lifecycle statuses to new extensions.',
    current: true,
    controllingLabel: 'Current product posture',
  },
  {
    date: '2026-08-07',
    revision: '3c401504aef201b510c8695bac7c31ad424c2274',
    version: '5.2.0-enterprise.1',
    authority: 'Session 12D final independent release certification',
    decision: 'NO-GO',
    scope:
      'Exact-revision assessment: 45 capabilities, 38 security controls, release-artifact evidence, and dependency posture.',
    current: true,
    controllingLabel: 'Current vNext release decision',
  },
  {
    date: '2026-04-25',
    revision: 'internal (superseded)',
    version: '5.2.x internal',
    authority: 'Internal certification engine runs',
    decision: 'CERTIFICATION_FAILED',
    scope:
      'Internal assurance and certification engine runs. Superseded as public authority by the Session 12D exact-revision assessment.',
    current: false,
    controllingLabel: 'Superseded',
  },
]
