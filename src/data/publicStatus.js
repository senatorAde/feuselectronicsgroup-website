/**
 * FEUS.ai public posture and capability status — single source of truth.
 *
 * Product-level posture is governed by:
 *   docs/product-posture/FEUS_PRODUCT_OPERATIONAL_POSTURE.md
 *   docs/product-posture/FEUS_CAPABILITY_LIFECYCLE_MATRIX.csv
 *   docs/product-posture/FEUS_PUBLIC_PRODUCT_POSITIONING_GUIDE.md
 *
 * Exact-revision release evidence remains derived from the Session 12D
 * certification and Session 13A claims baseline. The two scopes must not be
 * collapsed into one another.
 *
 * RULES (do not weaken):
 *  - Product maturity, operational validation, certification, and availability
 *    are separate fields.
 *  - No capability may display a stronger status than its lifecycle evidence.
 *  - Every public capability must carry its required qualification.
 *  - Preview extensions must display their restrictions and next milestone.
 *  - Model invocation is DISABLED and must be described exactly that way.
 *  - Every ROI value is an Estimate with disclosed assumptions.
 *
 * The build fails (scripts/validate-public-claims.mjs) if this file is missing,
 * incomplete, or inconsistent with the approved counts.
 */

export const POSTURE = {
  platform: 'FEUS.ai',
  company: 'FEUS Electronics Group',
  productMaturity: 'Operationally validated core',
  publicAvailability: 'Controlled enterprise adoption by capability scope',
  decision: 'NO-GO',
  decisionScope: 'FEUS.ai vNext 5.2.0-enterprise.1 external release assessment',
  decisionDate: '2026-08-07',
  lastReviewed: '2026-08-07',
  certifiedRevision: '3c401504aef201b510c8695bac7c31ad424c2274',
  versionAssessed: '5.2.0-enterprise.1',
  assessment: 'Session 12D final independent release certification',
  shortStatement: 'Operationally validated core. Capability-specific limits apply.',
  statement:
    'FEUS.ai is a governed AI Data Operations platform with core capabilities validated through FEUS enterprise engineering workflows and controlled operational use. ' +
    'Formal release certification applies to named revisions, deployment configurations, environments, and capability scopes. ' +
    'The Session 12D NO-GO decision remains binding for the assessed vNext revision and does not erase the platform\'s documented operational history.',
  trustBanner:
    'FEUS.ai has an operationally validated core. The assessed vNext release remains NO-GO for external deployment above LOCAL, and newer agents and integrations retain capability-specific preview limits.',
  operationalEvidence:
    'The core GovernedExecutionGateway SQL Server path is documented through a controlled FEUS provisioning workflow in which 48 of 48 batches passed all seven governance gates and the recorded audit hash chain verified successfully. The dated JSONL audit file is not retained in this checkout, so this is documented operational validation rather than independent re-attestation.',
  productionVerifiedCapabilities: 0,
  totalCapabilities: 45,
  liveVerifiedIntegrations: 0,
  testsPassedAtRevision: 2320,
  testsQualification:
    'Test passage is revision evidence, not by itself deployment or live-integration evidence. Operational-use claims require separate workflow records.',
  superseded: false,
  supersessionRule:
    'Session 12D remains controlling for the assessed vNext revision. Product-level claims are governed separately by capability lifecycle, environment, configuration, and evidence scope.',
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
 * Reusable status vocabulary. Evidence classes describe what was verified;
 * lifecycle statuses describe how a capability may be adopted. A lifecycle
 * status never overrides an exact-revision release restriction.
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
      'Available within a named, approved capability, environment, configuration, and support scope.',
  },
  AVAILABLE_WITH_CONSTRAINTS: {
    label: 'Available with constraints',
    kind: 'status',
    definition:
      'Evidence exists with material limitations or dependencies that must be read together with the status.',
  },
  OPERATIONALLY_VALIDATED: {
    label: 'Operationally validated',
    kind: 'status',
    definition:
      'Documented real-world FEUS engineering usage exists for the named capability and operating conditions. This is not blanket release certification.',
  },
  CONTROLLED_ENTERPRISE_ADOPTION: {
    label: 'Controlled enterprise adoption',
    kind: 'status',
    definition:
      'Available for governed adoption after target-specific scope, identity, environment, control, and support qualification.',
  },
  CONTROLLED_PREVIEW: {
    label: 'Controlled preview',
    kind: 'status',
    definition:
      'Limited evaluation for named participants under documented restrictions; it is not general availability.',
  },
  PREVIEW: {
    label: 'Preview',
    kind: 'status',
    definition:
      'A bounded capability may be evaluated, but live integration or release qualification remains incomplete.',
  },
  EARLY_ACCESS: {
    label: 'Early access',
    kind: 'status',
    definition:
      'Invitation-only access for a named scope with explicit acceptance criteria and no general availability claim.',
  },
  INTEGRATION_READY: {
    label: 'Integration ready',
    kind: 'status',
    definition:
      'The adapter boundary and safety controls are ready for target-specific sandbox qualification; live compatibility is not implied.',
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
    'The Oracle Operations Agent is a separately classified Controlled Preview extension. It is not one of the publicly available rows in the Session 12D release matrix.',
  internalNote:
    'Session 12D internal-only and non-public matrix rows are counted here but not itemized. Product lifecycle status is reported separately.',
}

/**
 * Product lifecycle view. This complements, but does not replace, the 45-row
 * exact-revision certification matrix below.
 */
export const CAPABILITY_LIFECYCLE = [
  {
    capability: 'Governance engine and seven-gate execution gateway',
    productArea: 'Core platform',
    validation:
      'Documented operational use in a controlled FEUS SQL Server provisioning workflow: the retained record reports 48 of 48 batches passed all seven gates and a valid audit chain; its dated JSONL file is not present in this checkout.',
    certification:
      'Core-path operational record; vNext pre-execution controls are implementation-verified, while vNext dispatch remains outside the certified operating path.',
    publicStatus: 'CONTROLLED_ENTERPRISE_ADOPTION',
    environment: 'Named FEUS or customer-controlled scope after environment qualification',
    restrictions:
      'Every database operation must use a fully wired GEG, approved service identity, policy scope, PII inspection, approval path, and audit sink.',
    nextMilestone: 'Repeatable target-environment qualification and current-version release evidence.',
  },
  {
    capability: 'FEUS Copilot governed operator workflow',
    productArea: 'Core platform',
    validation:
      'Enterprise operator workflow and fail-closed CLI path are implemented and documented for authenticated FEUS usage.',
    certification:
      'Governance bootstrap and routing properties are tested; the public website chat interface is not part of the operational scope.',
    publicStatus: 'CONTROLLED_ENTERPRISE_ADOPTION',
    environment: 'Authenticated operator interface in an approved enterprise scope',
    restrictions:
      'No public browser assistant is offered. Database actions remain subject to the full governed execution path and target authorization.',
    nextMilestone: 'Package an approved enterprise interface with deployment-specific identity and support evidence.',
  },
  {
    capability: 'SQL Server governed operational workflows',
    productArea: 'Core platform',
    validation:
      'The legacy/core pyodbc execution path and a real FEUS SQL Server workflow are documented; the historical run record is retained, but its dated JSONL audit file is not present in this checkout.',
    certification:
      'Session 12D partially confirmed the legacy path and separately found the new vNext dispatcher and executor unbound.',
    publicStatus: 'CONTROLLED_ENTERPRISE_ADOPTION',
    environment: 'Qualified SQL Server targets with approved identities and entity allowlists',
    restrictions:
      'The operational core path must not be represented as proof that the separate vNext Control Plane/PES path is live.',
    nextMilestone: 'Bind and independently validate the vNext dispatcher and executor against a real target.',
  },
  {
    capability: 'Policy, PII, approval, and identity controls',
    productArea: 'Core platform',
    validation:
      'Controls are exercised in the documented core workflow and covered by targeted automated suites.',
    certification:
      'Multiple control properties are verified or verified with constraints; non-LOCAL key custody and durable approval backends remain revision-specific gaps.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Capability and target specific',
    restrictions:
      'Critical PII remains blocked; outbound ITSM redaction is not approved; non-LOCAL activation requires authorized keys and durable stores.',
    nextMilestone: 'Attested key custody, durable approval storage, and independent negative-path validation.',
  },
  {
    capability: 'Audit and evidence framework',
    productArea: 'Core platform',
    validation:
      'The retained core-workflow record reports 288 audit events and a valid local hash chain; its dated JSONL file is not present in this checkout; release evidence and provenance gates are established separately.',
    certification:
      'Local integrity behavior is verified, but adversary-resistant anchoring and a deployed durable sink were not established for the assessed vNext release.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Approved local or enterprise evidence stores',
    restrictions:
      'Do not describe the hash chain as immutable or externally anchored. Retention and sink durability are deployment responsibilities until qualified.',
    nextMilestone: 'Keyed or signed external anchoring plus durable sink and recovery evidence.',
  },
  {
    capability: 'Synthetic data capabilities',
    productArea: 'Core platform',
    validation:
      'Schema-driven generation, referential-integrity handling, environment guards, and no-production-row-copy controls are implemented and tested.',
    certification:
      'Engineering validation exists outside the Session 12D 45-row vNext capability certification scope; customer-specific scale, resemblance, and target-schema qualification are not established.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'LOCAL and TST only unless a narrower deployment approval states otherwise',
    restrictions:
      'No production-row sampling; schema-specific validation and approved synthetic-data policy are required.',
    nextMilestone: 'Scale and statistical-resemblance validation on an approved representative schema.',
  },
  {
    capability: 'FEUS Recommendation Assurance',
    productArea: 'Core platform',
    validation:
      'Risk thresholds, required assurance metadata, and fail-closed behavior when assurance is disabled are implemented and tested.',
    certification:
      'The release assurance gate is implementation-verified outside the Session 12D 45-row vNext capability certification scope; live model confidence signals and provider invocation are not established.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Approved recommendation workflows',
    restrictions:
      'No recommendation becomes executable below threshold; no live model-provider claim is implied.',
    nextMilestone: 'Validate confidence calibration and provenance against an approved model integration.',
  },
  {
    capability: 'ROI tracking and estimate framework',
    productArea: 'Core platform',
    validation:
      'Audit-derived metric handling and fail-closed insufficient-data/source-error states are implemented and tested.',
    certification:
      'Session 12D confirmed estimate-only behavior and found no provider token/cost reconciliation or measured customer outcome.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Controlled reporting with disclosed assumptions',
    restrictions:
      'All values must be labeled Estimate; no measured savings, prevented loss, or customer result may be inferred.',
    nextMilestone: 'Customer-approved baseline methodology and reconciled actual-cost evidence.',
  },
  {
    capability: 'vNext Control Plane and Protected Execution dispatch',
    productArea: 'New extension',
    validation:
      'Typed work orders, routing, handoffs, and fail-closed execution truth are verified in process.',
    certification:
      'Session 12D found no dispatcher and no bound SQL executor; shared safety state is incomplete.',
    publicStatus: 'CONTROLLED_PREVIEW',
    environment: 'In-process evaluation only',
    restrictions:
      'No claim of live end-to-end execution, durable multi-replica safety, or deployment authorization.',
    nextMilestone: 'Real dispatcher/executor receipt plus durable multi-replica control validation.',
  },
  {
    capability: 'Oracle Operations Agent',
    productArea: 'New extension',
    validation:
      'Tier 1 read-only policy, registered templates, identity continuity, and failure behavior are tested against deterministic fakes.',
    certification:
      'Read-only policy is verified with constraints; no Oracle driver, concrete live port, or database compatibility evidence exists.',
    publicStatus: 'CONTROLLED_PREVIEW',
    environment: 'Offline and fixture-based evaluation only',
    restrictions:
      'No live Oracle operation; Tier 2 is not implemented and Tier 3 remains hard-disabled.',
    nextMilestone: 'Pinned driver, concrete read-only adapter, and approved live Tier 1 smoke test.',
  },
  {
    capability: 'Service Request Agent and governed handoffs',
    productArea: 'New extension',
    validation:
      'Intake, classification, authorization, handoff, result verification, and failure paths are covered by end-to-end fixture tests.',
    certification:
      'In-process properties are implementation-verified; no live ticket source or downstream execution path is established.',
    publicStatus: 'CONTROLLED_PREVIEW',
    environment: 'Synthetic or approved non-customer workflows',
    restrictions:
      'In-memory adapter only in the certified path; no live ticket lifecycle or database side effect.',
    nextMilestone: 'Approved sandbox connector smoke test and bound governed specialist execution.',
  },
  {
    capability: 'ITSM automation connectors',
    productArea: 'New extension',
    validation:
      'ServiceNow, Jira Service Management, and Azure DevOps connector contracts are tested against mock transports with dry-run defaults.',
    certification:
      'Contract evidence only; outbound disclosure did not meet the Session 12D release threshold.',
    publicStatus: 'PREVIEW',
    environment: 'Mock transport or approved sandbox with writes disabled',
    restrictions:
      'No live production tenant, write path, or unrestricted free-text egress.',
    nextMilestone: 'Structured-field disclosure control and live sandbox lifecycle validation.',
  },
  {
    capability: 'Model-provider integrations',
    productArea: 'New extension',
    validation:
      'Provider-neutral contracts and fail-closed selection concepts are tested in isolation.',
    certification:
      'No invocation gateway, approved model pin, provider SDK, or network call exists; runtime invocation remains disabled.',
    publicStatus: 'PREVIEW',
    environment: 'Architecture evaluation only',
    restrictions:
      'No provider support, compatibility, fallback, safety, cost, or availability claim.',
    nextMilestone: 'Approved provider adapter through a mandatory invocation gateway with telemetry and safety validation.',
  },
  {
    capability: 'Additional database engines and deployment integrations',
    productArea: 'New extension',
    validation:
      'Architecture and infrastructure concepts exist for selected future integrations.',
    certification:
      'No additional live engine or complete deployed topology was established in Session 12D.',
    publicStatus: 'EARLY_ACCESS',
    environment: 'Design-partner discovery and non-operational qualification',
    restrictions:
      'Invitation does not include live execution or a committed release date.',
    nextMilestone: 'Name a target, implement its adapter, and complete sandbox plus release qualification.',
  },
]

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
      'The core SQL Server gateway contains a real hash-pinned pyodbc path, is covered by automated tests, and has a separate documented FEUS operational workflow record.',
    qualification:
      'Session 12D initiated no database operation and the separate vNext path has no dispatcher or bound executor. The core operational record does not certify that vNext path.',
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
    dependency: 'SQL Server (core GEG path)',
    status: 'OPERATIONALLY_VALIDATED',
    treatment:
      'Documented real FEUS provisioning workflow: 48 of 48 batches passed all seven gates. Customer targets require separate qualification.',
  },
  {
    dependency: 'SQL Server (vNext path)',
    status: 'CONTROLLED_PREVIEW',
    treatment: 'In-process governance evidence only; no dispatcher or bound executor.',
  },
  {
    dependency: 'Oracle Operations Agent',
    status: 'CONTROLLED_PREVIEW',
    treatment:
      'Tier 1 read-only policy and observer behavior are tested against deterministic fakes; no live driver or adapter exists.',
  },
  {
    dependency: 'ServiceNow',
    status: 'PREVIEW',
    treatment: 'Connector contract tested against a mock transport with dry-run controls; no live tenant lifecycle.',
  },
  {
    dependency: 'Jira Service Management',
    status: 'PREVIEW',
    treatment: 'Connector contract tested against a mock transport with dry-run controls; no live tenant lifecycle.',
  },
  {
    dependency: 'Azure DevOps work items',
    status: 'PREVIEW',
    treatment: 'Connector contract tested against a mock transport with dry-run controls; no live organization lifecycle.',
  },
  {
    dependency: 'Model providers',
    status: 'PREVIEW',
    treatment:
      'Provider-neutral contracts are in Preview. Runtime invocation is disabled; no gateway, approved model pin, production importer, or network path exists.',
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
    status: 'PREVIEW',
    treatment:
      'The assessed vNext topology is incomplete and was never compiled, what-if analyzed, or deployed.',
  },
]

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

/** Product families (approved naming register, one-sentence descriptions). */
export const PRODUCT_FAMILIES = [
  {
    name: 'FEUS SQLOps',
    route: '/sqlops',
    role: 'Core product family',
    description:
      'FEUS.ai\u2019s SQL Server governance and operations family: the core GEG path has documented operational validation, while vNext dispatch remains Controlled Preview.',
    statusLine: 'Controlled enterprise adoption · vNext dispatch in preview',
  },
  {
    name: 'FEUS RequestOps',
    route: '/requestops',
    role: 'Extension product family',
    description:
      'Governed service-request intake, routing, and handoffs in Controlled Preview; current vendor connectors are Preview against mock transports.',
    statusLine: 'Controlled preview · ITSM connectors in preview',
  },
  {
    name: 'FEUS Assurance',
    route: '/assurance',
    role: 'Reserved product family',
    description:
      'The reserved family for internal assurance evaluation and release evidence; it is not a formal certification or compliance attestation.',
    statusLine: 'Available with constraints · not formal certification',
  },
  {
    name: 'FEUS Control Plane',
    route: '/control-plane',
    role: 'Architecture component',
    description:
      'The in-process coordination layer for typed work orders, routing, approvals, policy checks, and agent handovers. It remains Controlled Preview because it has no execution dispatcher.',
    statusLine: 'Controlled preview · in-process only',
  },
]

/** Branded agent and governed-capability portfolio. */
export const AGENT_PORTFOLIO = [
  {
    id: 'sqlops',
    name: 'FEUS SQLOps',
    capability: 'SQL Server governed operations',
    status: 'CONTROLLED_ENTERPRISE_ADOPTION',
    route: '/sqlops',
    summary:
      'Governed SQL Server operations through mandatory policy, identity, PII, approval, execution, and audit controls.',
    evidence:
      'The core GEG path has a documented FEUS workflow in which 48 of 48 provisioning batches passed all seven gates.',
    environment: 'Named enterprise scope after target qualification',
    restriction:
      'The separate vNext dispatcher and Protected Execution Service path remains unbound.',
    nextMilestone: 'Bind and validate the vNext dispatcher and executor against an approved target.',
  },
  {
    id: 'copilot',
    name: 'FEUS Copilot',
    capability: 'Governed operator experience',
    status: 'AVAILABLE_WITH_CONSTRAINTS',
    route: '/copilot',
    summary:
      'An authenticated operator experience for governed analysis and approved operational workflows.',
    evidence:
      'Core conversational workflows are documented in FEUS engineering usage; database actions remain governed separately.',
    environment: 'Authenticated FEUS or customer-controlled operator context',
    restriction:
      'The public website does not expose a working assistant, and model-provider invocation remains disabled in the assessed vNext path.',
    nextMilestone: 'Qualify an approved model-provider gateway and customer-specific identity boundary.',
  },
  {
    id: 'oracleops',
    name: 'FEUS OracleOps',
    capability: 'Oracle Operations Agent',
    status: 'CONTROLLED_PREVIEW',
    route: '/agents/oracle',
    summary:
      'Oracle-native knowledge and observe-only workflows governed by registered templates, target identity checks, and fail-closed policy.',
    evidence:
      'A 29-operation catalog and Tier 1 observer behavior are tested against deterministic fixtures.',
    environment: 'Offline and fixture-based evaluation',
    restriction:
      'No live Oracle driver, adapter, connection, or compatibility result exists; Tier 3 remains hard-disabled.',
    nextMilestone: 'Pin a driver, bind a read-only adapter, and complete an approved live Tier 1 smoke test.',
  },
  {
    id: 'requestops',
    name: 'FEUS RequestOps',
    capability: 'Service Request Agent',
    status: 'CONTROLLED_PREVIEW',
    route: '/requestops',
    summary:
      'Governed service-request intake, deterministic classification, authorization, handoff, and result verification.',
    evidence:
      'End-to-end intake, routing, verification, and failure behavior are exercised with fixtures and in-memory adapters.',
    environment: 'Synthetic or approved non-customer workflows',
    restriction:
      'No live ticket source or bound downstream execution is established in the assessed path.',
    nextMilestone: 'Complete an approved sandbox connector smoke test and bind governed specialist execution.',
  },
  {
    id: 'control-plane',
    name: 'FEUS Agent Control Plane',
    capability: 'Governed multi-agent coordination',
    status: 'CONTROLLED_PREVIEW',
    route: '/control-plane',
    summary:
      'Typed work orders, policy-aware routing, specialist handoffs, and fail-closed execution truth for coordinated agents.',
    evidence:
      'In-process workflow, routing, approval binding, identity rebinding, and handoff behavior are implementation-verified.',
    environment: 'In-process evaluation',
    restriction:
      'No dispatcher, bound executor, or durable multi-replica safety state is established.',
    nextMilestone: 'Validate distributed state, dispatcher receipts, and restart behavior across replicas.',
  },
  {
    id: 'itsm-connect',
    name: 'FEUS ITSM Connect',
    capability: 'ServiceNow, Jira Service Management, and Azure DevOps connectors',
    status: 'PREVIEW',
    route: '/integrations/itsm',
    summary:
      'Governed ITSM connector contracts with dry-run defaults, closed operations, least-privilege configuration, and audit evidence.',
    evidence:
      'Vendor-specific contracts are tested against mock transports; writes default to disabled and dry-run.',
    environment: 'Mock transport or approved sandbox with writes disabled',
    restriction:
      'No live production tenant, qualified write lifecycle, or unrestricted free-text egress is claimed.',
    nextMilestone: 'Close structured disclosure controls and complete an approved live sandbox lifecycle.',
  },
  {
    id: 'recommendation-assurance',
    name: 'FEUS Recommendation Assurance',
    capability: 'Recommendation evidence and execution thresholding',
    status: 'AVAILABLE_WITH_CONSTRAINTS',
    route: '/assurance',
    summary:
      'Structured assurance metadata and fail-closed thresholds for recommendations entering governed workflows.',
    evidence:
      'Assurance metadata and below-threshold blocking are implementation-verified in engineering workflows.',
    environment: 'Approved recommendation workflows',
    restriction:
      'No correctness guarantee, live model confidence calibration, or formal certification is implied.',
    nextMilestone: 'Validate confidence calibration and provenance through an approved model integration.',
  },
  {
    id: 'provider-gateway',
    name: 'FEUS Provider Gateway',
    capability: 'Model-provider governance boundary',
    status: 'PREVIEW',
    route: '/integrations',
    summary:
      'A provider-neutral control boundary for future model selection, policy, telemetry, safety, and cost governance.',
    evidence:
      'Provider-neutral contracts and fail-closed selection behavior are tested in isolation.',
    environment: 'Architecture evaluation',
    restriction:
      'Runtime model invocation is disabled; no provider support, compatibility, or availability is claimed.',
    nextMilestone: 'Validate an approved adapter through a mandatory invocation gateway with telemetry and safety controls.',
  },
  {
    id: 'engine-expansion',
    name: 'FEUS Engine Expansion',
    capability: 'Additional governed data-engine agents',
    status: 'EARLY_ACCESS',
    route: '/contact',
    summary:
      'Design-partner discovery for additional governed database and data-platform targets.',
    evidence:
      'Architecture concepts support target qualification; no additional live engine is established.',
    environment: 'Invitation-only design-partner discovery',
    restriction:
      'Participation does not include live execution, production support, or a committed release date.',
    nextMilestone: 'Select a target, implement its adapter, and complete sandbox plus release qualification.',
  },
]

/** Model-provider statement (approved messaging §14). */
export const MODEL_PROVIDER_STATEMENT = {
  headline: 'Provider integrations are in Preview; invocation is disabled',
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

export default POSTURE
