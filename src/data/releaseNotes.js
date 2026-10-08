/**
 * Customer-facing release notes, FAQ and authorized-use text.
 *
 * Public pages present the current product scope. Internal release evidence
 * (assessments, revisions, signing runs, acceptance records) lives in the
 * distribution repository's production-truth record, not here.
 */

import { HOSTED_RUNTIME, MODEL_QUALIFICATION } from './productionTruth.js'
import { MODEL_CATALOG } from './cloudRuntime.js'

export const CURRENT_RELEASE = {
  label: 'October 2026 release',
  version: HOSTED_RUNTIME.application_version,
  date: HOSTED_RUNTIME.deployed_at.slice(0, 10),
  summary:
    'FEUS.ai runs in production on Microsoft Azure as a governed cloud service, with a Microsoft Foundry model catalog and a guided evaluation journey from first conversation to paid package.',
  highlights: [
    'Governed cloud runtime in production on Microsoft Azure (Container Apps, East US 2), with Microsoft Entra ID sign-in. Every API requires authentication.',
    `A catalog of ${MODEL_CATALOG.length} Microsoft Foundry models — ${MODEL_CATALOG.join(', ')} — plus the in-process deterministic engine.`,
    'FEUS Auto routing with Economy, Balanced, Quality and Explicit modes, per-tenant model approval, frontier-model permission and budgets.',
    'Guided evaluation journey: intro call, discovery, customer-specific readiness pack, onboarding, a 14-day controlled trial and a value review.',
    'Per-turn decision inspector with routing, token, latency, estimated-cost and audit evidence.',
  ],
}

export const RELEASE_NOTES = [
  {
    id: '2026-10',
    title: 'October 2026',
    items: CURRENT_RELEASE.highlights,
  },
  {
    id: '2026-09',
    title: 'September 2026',
    items: [
      'FEUS Cloud Runtime launched on Microsoft Azure with Microsoft Entra ID sign-in.',
      'Durable conversation history, routing audit chain, approval evidence and FinOps ledger in Azure Table Storage.',
      'Five routing modes, with FEUS Auto as the default.',
      'Refusals record the rule that refused and stay readable with the conversation.',
      'Release artifacts signed with a non-exportable HSM key held in Azure Key Vault.',
    ],
  },
]

/** Authorized use (product description, not contract terms). */
export const AUTHORIZED_USE = {
  text:
    'FEUS.ai is intended for authorized users, service identities, environments, and systems operating within an agreed capability scope. Enterprise adoption sets up identity, governance, policy, PII, approval, audit, and support for your organisation. Preview capabilities are used within their agreed engagement scope. Attempts to bypass FEUS security, governance, approval, licensing, tenant, or access controls are prohibited.',
  qualification:
    'Each deployment is configured for your tenant, environments and approval owners, and activated by an authorized administrator.',
  legalStatus:
    'This describes product posture, not contract terms. Draft terms of use are published at /legal/terms and are not yet approved by legal counsel or binding.',
}

/** Platform FAQ. */
export const FAQ_ITEMS = [
  {
    q: 'Is FEUS.ai available in production?',
    a: 'Yes. FEUS.ai runs as a production service on Microsoft Azure, used from the browser with Microsoft Entra ID sign-in. Each organisation is onboarded with its own tenant, environments, approval owners and budgets before use.',
  },
  {
    q: 'Is FEUS.ai formally certified?',
    a: 'FEUS.ai does not hold third-party certifications such as SOC 2 or ISO/IEC 27001, and does not claim regulatory compliance on your behalf. We publish how the platform governs each request so your security and compliance teams can assess it directly.',
  },
  {
    q: 'Does FEUS.ai connect to my databases?',
    a: 'Governed SQL Server operations run through the seven-gate GovernedExecutionGateway — readiness, audit, environment and identity, policy, PII inspection, approval, and execution — delivered through the Expert / VS Code path. The hosted runtime does not execute customer SQL.',
  },
  {
    q: 'Does FEUS.ai support Oracle?',
    a: 'The Oracle Operations Agent is available in preview through a scoped engagement, for read-only observation workflows.',
  },
  {
    q: 'Which ITSM integrations are available?',
    a: 'ServiceNow, Jira Service Management, and Azure DevOps work-item connectors are available in preview through a scoped engagement, with dry-run defaults.',
  },
  {
    q: 'Which models are supported?',
    a: `The catalog includes ${MODEL_CATALOG.join(', ')}. ` + MODEL_QUALIFICATION,
  },
  {
    q: 'Is the audit trail tamper-evident?',
    a: 'Every governed request is recorded in a hash-linked, tenant-partitioned audit chain, so edits to recorded events are detectable. The chain is not externally anchored, and we do not describe it as immutable.',
  },
  {
    q: 'How does FEUS.ai handle personal data?',
    a: 'Requests are classified before any model is chosen, PII inspection runs on governed operations, and critical categories such as government identifiers and financial data are always blocked. Data boundaries are agreed with you during onboarding. No tool can guarantee PII protection on its own; FEUS makes every decision visible and auditable.',
  },
  {
    q: 'Are ROI figures measured?',
    a: 'Demonstrations show illustrative estimates with disclosed assumptions. For your organisation, value is measured against a baseline agreed during discovery and reviewed at the end of the trial.',
  },
  {
    q: 'How is FEUS.ai deployed?',
    a: 'Two routes: the hosted production service on Microsoft Azure, used from the browser, and the Expert installed route for DBA/operator-led work in your environment. Both are configured for your organisation during onboarding.',
  },
  {
    q: 'How do trials and billing work?',
    a: 'A 14-day controlled trial starts only after onboarding is complete. There is no automatic billing: packages are quoted per scope and payment is by proposal and invoice.',
  },
  {
    q: 'How do I report a security concern?',
    a: 'Email info@feuselectronicsgroup.com with "Security report" in the subject, or use the contact form and mark the inquiry as security-related. Send only what is needed to reproduce the issue, and no credentials or customer data. We acknowledge every report and tell you when it is resolved. Details are on the /security page.',
  },
  {
    q: 'Who is authorized to use FEUS.ai?',
    a: 'People and service identities your organisation authorizes through Microsoft Entra ID, within the capability scope agreed during onboarding.',
  },
]
