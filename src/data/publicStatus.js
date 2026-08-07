/**
 * FEUS.ai public posture and capability status — single source of truth.
 *
 * Derived from the Session 13A approved claims baseline:
 *   docs/branding/vnext/FEUS_VNEXT_PUBLIC_CAPABILITY_MATRIX.csv
 *   docs/branding/vnext/FEUS_VNEXT_PUBLIC_CLAIMS_REGISTER.csv
 *   docs/branding/vnext/FEUS_VNEXT_APPROVED_MESSAGING.md
 *   docs/branding/vnext/FEUS_VNEXT_PUBLIC_POSTURE_STATEMENT.md
 *   docs/branding/vnext/FEUS_VNEXT_TRUST_CENTER_CONTENT_PLAN.md
 *
 * RULES (do not weaken):
 *  - No capability may display a stronger status than the public capability matrix.
 *  - Every public capability must carry its required qualification.
 *  - Oracle capability is excluded from public product representation.
 *  - Internal-only and must-not-be-marketed capabilities appear only as counts.
 *  - Model invocation is DISABLED and must be described exactly that way.
 *  - Every ROI value is an Estimate with disclosed assumptions.
 *
 * The build fails (scripts/validate-public-claims.mjs) if this file is missing,
 * incomplete, or inconsistent with the approved counts.
 */

export const POSTURE = {
  platform: 'FEUS.ai',
  company: 'FEUS Electronics Group',
  decision: 'NO-GO',
  decisionDate: '2026-08-07',
  lastReviewed: '2026-08-07',
  certifiedRevision: '3c401504aef201b510c8695bac7c31ad424c2274',
  versionAssessed: '5.2.0-enterprise.1',
  assessment: 'Session 12D final independent release certification',
  shortStatement: 'Pre-release. Not production approved.',
  statement:
    'FEUS.ai vNext is a pre-release governed data-operations platform under controlled evaluation. ' +
    'It is not approved for production deployment or for any environment above LOCAL. ' +
    'Session 12D found zero of 45 capabilities production verified and no product-facing external integration live verified.',
  trustBanner:
    'Current posture: NO-GO. FEUS.ai vNext is pre-release and not approved for production deployment. ' +
    'Zero of 45 capabilities are production verified.',
  productionVerifiedCapabilities: 0,
  totalCapabilities: 45,
  liveVerifiedIntegrations: 0,
  testsPassedAtRevision: 2320,
  testsQualification:
    'Test passage is not deployment or live-integration evidence.',
  superseded: false,
  supersessionRule:
    'This posture remains controlling until a later exact-revision independent assessment explicitly supersedes it.',
}

/** Security controls assessed in Session 12D (exact counts — do not soften). */
export const CONTROL_COUNTS = {
  assessed: 38,
  verified: 12,
  verifiedWithConstraints: 12,
  partial: 7,
  failed: 3,
  notEstablished: 4,
}

/**
 * Reusable status vocabulary.
 * Evidence classes come from the public capability matrix; product statuses
 * define visual grammar for current and future states. "AVAILABLE" and
 * "CONTROLLED_PREVIEW" are currently unused: zero capabilities are production
 * verified and no preview program exists. "INTEGRATION_READY" is prohibited
 * for current connectors and is retained only so the component can render the
 * label if a future assessment authorizes it.
 */
export const STATUS_DEFS = {
  // Evidence classifications (from the public capability matrix)
  IMPLEMENTATION_VERIFIED: {
    label: 'Implementation verified',
    kind: 'evidence',
    definition:
      'Source and automated tests establish a bounded implementation property. It does not mean deployed or operational.',
  },
  DEMONSTRATION_ONLY: {
    label: 'Demonstration only',
    kind: 'evidence',
    definition:
      'Synthetic or fixture inputs may be shown with a permanent disclaimer. It does not mean preview availability.',
  },
  DISABLED_PENDING_APPROVAL: {
    label: 'Disabled pending approval',
    kind: 'status',
    definition: 'The current authorization state intentionally blocks use.',
  },
  INTERNAL_ONLY: {
    label: 'Internal only',
    kind: 'evidence',
    definition: 'Not approved for public representation; counted but not itemized.',
  },
  // Product status grammar (visual system; mostly unused at this revision)
  AVAILABLE: {
    label: 'Available',
    kind: 'status',
    definition:
      'Production use explicitly approved for a named scope and revision. Unused: zero capabilities are production verified at this revision.',
  },
  AVAILABLE_WITH_CONSTRAINTS: {
    label: 'Available with constraints',
    kind: 'status',
    definition:
      'Evidence exists with material limitations or dependencies that must be read together with the status.',
  },
  CONTROLLED_PREVIEW: {
    label: 'Controlled preview',
    kind: 'status',
    definition:
      'A written, time-bounded preview program for named participants. Unused: FEUS.ai does not currently operate a preview program.',
  },
  INTEGRATION_READY: {
    label: 'Integration ready',
    kind: 'status',
    definition:
      'Reserved future state. Not approved for any current connector: current connectors are contract-tested against mock transports only.',
  },
  REQUIRES_CONFIGURATION: {
    label: 'Requires configuration',
    kind: 'status',
    definition:
      'Reserved future state for externally configured dependencies. Not an approved substitute for missing implementation.',
  },
  DISABLED: {
    label: 'Disabled',
    kind: 'status',
    definition: 'Runtime or public use is intentionally unavailable.',
  },
  EXTERNALLY_UNVERIFIED: {
    label: 'Externally unverified',
    kind: 'status',
    definition:
      'Implementation or contract evidence exists, but no live external target has been exercised.',
  },
  PLANNED: {
    label: 'Planned — no date commitment',
    kind: 'status',
    definition:
      'A non-committed concept approved for public roadmap mention. Not a promise, target quarter, or release date.',
  },
  UNAVAILABLE: {
    label: 'Unavailable',
    kind: 'status',
    definition: 'The capability or dependency does not exist at the assessed revision.',
  },
}

/** Public capability status counts (must reconcile to 45). */
export const CAPABILITY_SUMMARY = {
  implementationVerified: 17,
  demonstrationOnly: 4,
  disabledPendingApproval: 1,
  internalOnly: 12,
  notPubliclyRepresented: 11,
  oracleNote:
    'Oracle capability is not available and is excluded from public product representation at this revision.',
  internalNote:
    'Internal-only capabilities and capabilities not approved for public representation are counted here but not itemized.',
}

/**
 * Publicly representable capability rows (22 of 45).
 * status must be a STATUS_DEFS key. qualification is REQUIRED and must render
 * with the row. Text is the approved public description from the matrix.
 */
export const PUBLIC_CAPABILITIES = [
  {
    id: 'CAP-01',
    family: 'FEUS SQLOps',
    name: 'Legacy SQL Server governed execution',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'A legacy SQL Server gateway contains a real hash-pinned pyodbc path and is covered by automated tests.',
    qualification:
      'No live database operation was initiated at the certified revision; the vNext path has no dispatcher or bound executor.',
  },
  {
    id: 'CAP-03',
    family: 'FEUS Assurance',
    name: 'Policy bundle verification',
    status: 'DISABLED_PENDING_APPROVAL',
    description:
      'Policy bundles can be verified in LOCAL under the current key authorization.',
    qualification:
      'TST/PROD use is disabled until an attested dual-control key-custody ceremony and truthful target-tier authorization occur.',
  },
  {
    id: 'CAP-04',
    family: 'FEUS Control Plane',
    name: 'Work-order lifecycle',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Typed work-order states and transitions are implemented and covered by in-process tests.',
    qualification:
      'State is not established as shared, restart-safe, or deployed; no work order reaches a database.',
  },
  {
    id: 'CAP-05',
    family: 'FEUS Control Plane',
    name: 'Policy enforcement before side effect',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Policy checks occur before the currently reachable execution boundary and default to denial.',
    qualification:
      'No database side effect is reachable, so production bypass prevention has not been exercised.',
  },
  {
    id: 'CAP-07',
    family: 'FEUS Control Plane',
    name: 'Deterministic agent routing',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Deny-by-default in-process routing produces deterministic specialist selection for supported typed requests.',
    qualification:
      'No live request source, deployed registry, or multi-process behavior was exercised.',
  },
  {
    id: 'CAP-08',
    family: 'FEUS Control Plane',
    name: 'Deny-by-default capability routing',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Capability routing denies unmapped operations by default in the tested in-process implementation.',
    qualification: 'No deployed RBAC or live principal was exercised.',
  },
  {
    id: 'CAP-09',
    family: 'FEUS Control Plane',
    name: 'Typed cross-agent messages',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Cross-agent contracts require typed sanitized content, and raw strings are rejected by the implementation.',
    qualification: 'No live agent traffic or external tool output was processed.',
  },
  {
    id: 'CAP-10',
    family: 'FEUS Control Plane',
    name: 'Identity non-propagation',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The handover contract rebinds the receiving service principal and does not copy parent approvals.',
    qualification:
      'No live identity provider or deployed service identity was exercised.',
  },
  {
    id: 'CAP-11',
    family: 'FEUS Control Plane',
    name: 'Independent approval binding',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Approval contracts bind request, target, action, environment, plan, expiry, and separation of duties.',
    qualification:
      'The underlying repository can silently degrade to process memory; no deployed approval authority was exercised.',
  },
  {
    id: 'CAP-16',
    family: 'FEUS Control Plane',
    name: 'Override cannot widen authority',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The override contract allows cancel, deny, or escalate actions and cannot force approval.',
    qualification:
      'No live operator action or deployed authorization system was exercised.',
  },
  {
    id: 'CAP-18',
    family: 'FEUS Protected Execution Service',
    name: 'Pre-execution governance gates (stages 0–5)',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The pre-execution governance-gate classes are implemented, tested, and fail closed under their tested conditions.',
    qualification:
      'No operation reaches a live engine; signing and backend constraints remain unresolved.',
  },
  {
    id: 'CAP-20',
    family: 'FEUS Protected Execution Service',
    name: 'HTTPS-only JWKS',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The token-validator implementation requires HTTPS outside explicitly gated LOCAL loopback development.',
    qualification: 'No live identity provider was contacted.',
  },
  {
    id: 'CAP-21',
    family: 'FEUS Protected Execution Service',
    name: 'LOCAL test identity confinement',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Test identities are rejected outside the LOCAL tier by the implementation.',
    qualification: 'No live identity provider or deployed tier was exercised.',
  },
  {
    id: 'CAP-29',
    family: 'FEUS RequestOps',
    name: 'Ticket intake and classification',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Typed service-request intake and deterministic classification are implemented and tested against an in-memory adapter.',
    qualification: 'No live ticket source or tenant was exercised.',
  },
  {
    id: 'CAP-30',
    family: 'FEUS RequestOps',
    name: 'No direct database surface',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The Service Request Agent package contains no direct database driver or executor surface.',
    qualification:
      'This structural property does not establish a live ITSM or database workflow.',
  },
  {
    id: 'CAP-31',
    family: 'FEUS RequestOps',
    name: 'Outbound path through the Control Plane',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The tested Service Request Agent path submits typed work orders to the Control Plane rather than accessing a database directly.',
    qualification: 'The path stops at a verdict because dispatch does not exist.',
  },
  {
    id: 'CAP-33',
    family: 'FEUS ROI Estimate',
    name: 'Workflow and ROI estimate demonstration',
    status: 'DEMONSTRATION_ONLY',
    description:
      'A demonstration can calculate an assumption-based ROI estimate from synthetic inputs.',
    qualification:
      'Every figure and visualization must say Estimate and identify its assumptions; no provider actuals, token counter, or realized savings exist.',
  },
  {
    id: 'CAP-35',
    family: 'FEUS RequestOps',
    name: 'ServiceNow connector contract',
    status: 'DEMONSTRATION_ONLY',
    description:
      'A ServiceNow connector contract can be demonstrated against a mock transport.',
    qualification:
      'No live tenant, credentials, field mapping, network route, or end-to-end ticket lifecycle was exercised.',
  },
  {
    id: 'CAP-36',
    family: 'FEUS RequestOps',
    name: 'Jira Service Management connector contract',
    status: 'DEMONSTRATION_ONLY',
    description:
      'A Jira Service Management connector contract can be demonstrated against a mock transport.',
    qualification:
      'No live tenant, credentials, field mapping, network route, or end-to-end ticket lifecycle was exercised.',
  },
  {
    id: 'CAP-37',
    family: 'FEUS RequestOps',
    name: 'Azure DevOps work-item connector contract',
    status: 'DEMONSTRATION_ONLY',
    description:
      'An Azure DevOps work-item connector contract can be demonstrated against a mock transport.',
    qualification:
      'No live organization, credentials, field mapping, network route, or end-to-end lifecycle was exercised.',
  },
  {
    id: 'CAP-38',
    family: 'FEUS RequestOps',
    name: 'Connector secret references',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Connector contracts carry secret references without rendering secret values inline.',
    qualification:
      'References were not resolved against a live vault or used by a live connector; outbound redaction remains a failed control.',
  },
  {
    id: 'CAP-45',
    family: 'FEUS.ai platform',
    name: 'Installable package with locked dependencies',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The source builds and installs as a Python package with hash-pinned dependency locks in CI.',
    qualification:
      'No package was published to a public or private registry and this does not authorize product deployment.',
  },
]

/** External dependency treatment (Session 12D Phase 6). */
export const INTEGRATION_STATUS = [
  {
    dependency: 'SQL Server (legacy path)',
    status: 'EXTERNALLY_UNVERIFIED',
    treatment:
      'Implementation exists; no live operation was initiated at the assessed revision.',
  },
  {
    dependency: 'SQL Server (vNext path)',
    status: 'UNAVAILABLE',
    treatment: 'Unavailable; no dispatcher or bound executor.',
  },
  {
    dependency: 'ServiceNow',
    status: 'DEMONSTRATION_ONLY',
    treatment: 'Contract tested against a mock transport; demonstration only.',
  },
  {
    dependency: 'Jira Service Management',
    status: 'DEMONSTRATION_ONLY',
    treatment: 'Contract tested against a mock transport; demonstration only.',
  },
  {
    dependency: 'Azure DevOps work items',
    status: 'DEMONSTRATION_ONLY',
    treatment: 'Contract tested against a mock transport; demonstration only.',
  },
  {
    dependency: 'Model providers',
    status: 'DISABLED',
    treatment:
      'Model invocation is disabled. No invocation gateway, approved model pin, production importer, or provider network path exists.',
  },
  {
    dependency: 'Identity provider (Entra ID)',
    status: 'EXTERNALLY_UNVERIFIED',
    treatment:
      'Implementation and tier tests only; no live identity provider was contacted.',
  },
  {
    dependency: 'Key Vault / managed HSM',
    status: 'UNAVAILABLE',
    treatment:
      'Required future custody model; not implemented or authorized for production.',
  },
  {
    dependency: 'Azure deployment',
    status: 'UNAVAILABLE',
    treatment:
      'Unavailable; templates are incomplete and were never compiled, what-if analyzed, or deployed.',
  },
]

/** Known limitations (Trust Center Content Plan §25). */
export const KNOWN_LIMITATIONS = [
  'No production-approved capability or environment.',
  'No vNext execution dispatcher or bound SQL executor.',
  'No live product-facing integration.',
  'Model invocation disabled.',
  'Oracle excluded from public product representation.',
  'Production signing-key custody and authorization absent.',
  'Runtime evidence is not adversary-resistant.',
  'Outbound data redaction did not meet the release threshold.',
  'Shared durable state for safety and replay controls is not established.',
  'No compensating rollback executor.',
  'Infrastructure is incomplete and undeployed.',
  'No availability, recovery, performance, or ROI actuals.',
]

/** Product families (approved naming register, one-sentence descriptions). */
export const PRODUCT_FAMILIES = [
  {
    name: 'FEUS SQLOps',
    route: '/sqlops',
    role: 'Reserved product family',
    description:
      'The reserved name for FEUS.ai\u2019s SQL Server-focused governance and operations family; vNext end-to-end execution is not currently available.',
    statusLine: 'Reserved family · vNext execution unavailable',
  },
  {
    name: 'FEUS RequestOps',
    route: '/requestops',
    role: 'Reserved product family',
    description:
      'The reserved name for governed service-request intake and routing; current vendor connectors are contract-tested against mocks and are not live-integrated.',
    statusLine: 'Reserved family · live ITSM unavailable',
  },
  {
    name: 'FEUS Assurance',
    route: '/assurance',
    role: 'Reserved product family',
    description:
      'The reserved family for internal assurance evaluation and release evidence; it is not a formal certification or compliance attestation.',
    statusLine: 'Reserved family · not formal certification',
  },
  {
    name: 'FEUS Control Plane',
    route: '/control-plane',
    role: 'Architecture component',
    description:
      'The implemented in-process coordination layer for typed work orders, routing, approvals, policy checks, and agent handovers. It has no execution dispatcher and is not a separately available product.',
    statusLine: 'Architecture component · implementation verified in-process only',
  },
]

/** Model-provider statement (approved messaging §14). */
export const MODEL_PROVIDER_STATEMENT = {
  headline: 'Model invocation is disabled',
  statement:
    'FEUS.ai has no runtime invocation gateway, approved model pin, production importer of the provider-policy contract, or provider network-invocation path at this revision.',
  designNote:
    'Provider-selection and fallback contracts exist in isolated tests; they do not establish a governed model runtime.',
}

/** ROI estimate framing (approved messaging §15). */
export const ROI_STATEMENT = {
  statement:
    'ROI values shown in a controlled demonstration are illustrative estimates based on disclosed assumptions and synthetic inputs. They are not measured savings, prevented loss, delivered value, audit-derived actuals, or customer results.',
  requiredLabels: [
    'Estimate',
    'Assumptions',
    'Benchmark source',
    'Calculation version',
    'Generated date',
    'Governed operations: 0',
  ],
}

/** Demo disclaimer (approved messaging §11). */
export const DEMO_DISCLAIMER = {
  long:
    'Demonstration only. This session uses synthetic or fixture inputs in a LOCAL environment. It does not connect to a customer database, ITSM tenant, identity provider, model provider, secret store, or cloud resource. Outputs, performance figures, and ROI values are illustrative estimates and are not production results.',
  compact: 'DEMO · LOCAL · SYNTHETIC INPUTS · NOT PRODUCTION',
}

/** Authorized use (product-posture draft; Legal approval pending for binding terms). */
export const AUTHORIZED_USE = {
  text:
    'FEUS.ai is intended for use only by authorized users, service identities, environments, and systems within the permissions and operating conditions established by the deploying organization. At the assessed revision, authorized use is limited to internal LOCAL development, testing, evidence review, and controlled demonstrations using synthetic or approved non-customer data. Attempts to bypass FEUS security, governance, approval, licensing, tenant, or access controls are prohibited. Capabilities used outside their documented configuration, authorization, or supported operating conditions are outside the assessed FEUS operating envelope.',
  qualification:
    'The assessed FEUS operating envelope is not a production-certified envelope. No use above LOCAL and no customer-system operation is authorized by Session 12D.',
  legalStatus:
    'Product-posture language. Legal counsel must approve this language before it appears in binding terms.',
}

/** Trust Center FAQ (Trust Center Content Plan §31). */
export const FAQ_ITEMS = [
  {
    q: 'Is FEUS.ai production ready?',
    a: 'No. FEUS.ai vNext is pre-release and not approved for production deployment. Session 12D found zero of 45 capabilities production verified.',
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
    a: 'Not through the vNext path at this revision. The Control Plane has no execution dispatcher and the Protected Execution Service has no bound SQL executor; the boundary fails closed.',
  },
  {
    q: 'Does FEUS.ai support Oracle?',
    a: 'No public Oracle capability is represented at this revision.',
  },
  {
    q: 'Which ITSM integrations are available?',
    a: 'None live. Three connector contracts (ServiceNow, Jira Service Management, Azure DevOps work items) are contract-tested against mock transports for demonstrations only.',
  },
  {
    q: 'Which model providers are supported?',
    a: 'Model invocation is disabled. FEUS.ai has no runtime invocation gateway, approved model pin, production importer, or provider network-invocation path at this revision.',
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
    a: 'No deployment model is currently available. Infrastructure templates are incomplete and were never compiled, what-if analyzed, or deployed.',
  },
  {
    q: 'How do I report a security concern?',
    a: 'Vulnerability-management process details are being formalized for the pre-release platform. Security concerns should use the monitored responsible-disclosure channel once published; until then, use the general contact form and mark the inquiry as security-related without including sensitive details.',
  },
  {
    q: 'Who is authorized to use FEUS.ai?',
    a: 'At this revision, only authorized internal users and service identities operating in LOCAL for approved development, testing, evidence review, or controlled demonstrations with synthetic or approved non-customer data.',
  },
]

/** Public release-posture history (release notes page). */
export const POSTURE_HISTORY = [
  {
    date: '2026-08-07',
    revision: '3c401504aef201b510c8695bac7c31ad424c2274',
    version: '5.2.0-enterprise.1',
    authority: 'Session 12D final independent release certification',
    decision: 'NO-GO',
    scope:
      'Exact-revision assessment: 45 capabilities, 38 security controls, release-artifact evidence, and dependency posture.',
    current: true,
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
  },
]

export default POSTURE
