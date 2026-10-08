/**
 * FEUS.ai public presentation data.
 *
 * Public pages present the current product scope confidently and accurately.
 * Internal release evidence lives in the distribution repository's
 * production-truth record, not on public pages.
 *
 * RULES (do not weaken):
 *  - No capability may display a stronger status than it has.
 *  - Preview and roadmap items are labelled as such; they are never
 *    presented as generally available.
 *  - Model access is approved per tenant and per environment.
 *  - Every ROI value is an Estimate with disclosed assumptions.
 *
 * The build fails (scripts/validate-public-claims.mjs) if this file is
 * incomplete or overclaims.
 */

import { HOSTED_RUNTIME, MODEL_QUALIFICATION } from './productionTruth.js'

export const POSTURE = {
  platform: 'FEUS.ai',
  company: 'FEUS Electronics Group',
  lastReviewed: HOSTED_RUNTIME.last_verified_at.slice(0, 10),

  /* ---- Customer-facing positioning (public marketing surfaces) ---- */
  headline: 'Governed AI for Data Operations',
  shortStatement: 'Governance-first AI operations platform, running in production on Microsoft Azure.',
  publicPostureStatement:
    'FEUS.ai is a governance-first AI operations platform. Policy enforcement, least privilege, ' +
    'approvals, and evidence-backed execution are built into every operation.',
  valueStatement:
    'FEUS.ai combines governed AI orchestration, database operations, assurance, evidence, and automation in a unified enterprise platform.',
  architectureStatement:
    'Built around policy enforcement, least privilege, approvals, auditability, and evidence-backed operations.',
  validationStatement:
    'Proven in FEUS engineering and enterprise operating workflows.',
  lifecycleStatement:
    'Every capability has a clearly published status and operating scope, so teams know exactly what they are adopting.',
  availabilityQualifier:
    'Every engagement is expert-guided end to end: FEUS engineers configure each capability for your tenant, environments and approval owners.',
  engagementModel:
    'FEUS delivers through expert-guided engagements. FEUS engineers scope, configure, deploy, and operate each capability with your team, so adoption never depends on a customer integrating the platform alone.',
  /* Neutral strip text for platform routes — never a warning. */
  statusStripNote:
    'FEUS.ai publishes the status and scope of every capability.',
  operationalEvidence:
    'The governed SQL Server path has been used in FEUS provisioning work in which every batch passed all seven governance gates and the recorded audit hash chain verified.',
}

/**
 * Reusable status vocabulary rendered by StatusBadge. Labels are
 * customer-facing; definitions explain how a capability is adopted.
 */
export const STATUS_DEFS = {
  IMPLEMENTATION_VERIFIED: {
    label: 'Built and tested',
    kind: 'evidence',
    definition:
      'Implemented and covered by automated tests. Delivered to customers as part of a scoped engagement.',
  },
  DEMONSTRATION_ONLY: {
    label: 'Demonstration',
    kind: 'evidence',
    definition:
      'Shown with sample data in a guided demonstration; enabled for customers through a scoped engagement.',
  },
  DISABLED_PENDING_APPROVAL: {
    label: 'Off by default',
    kind: 'status',
    definition: 'Switched off unless it is approved for your deployment.',
  },
  INTERNAL_ONLY: {
    label: 'Internal',
    kind: 'evidence',
    definition: 'Used internally by FEUS and not offered as a customer capability.',
  },
  AVAILABLE: {
    label: 'Available',
    kind: 'status',
    definition:
      'Available today within your approved tenant, environment and configuration.',
  },
  AVAILABLE_FOR_ENTERPRISE_DEPLOYMENT: {
    label: 'Available for enterprise deployment',
    kind: 'availability',
    definition:
      'Enabled through a scoped enterprise onboarding and deployment engagement.',
  },
  GOVERNED_AVAILABILITY: {
    label: 'Governed availability',
    kind: 'availability',
    definition:
      'Available with the policy, identity, approval, and environment controls appropriate to the action.',
  },
  CUSTOMER_SPECIFIC_ENABLEMENT: {
    label: 'Customer-specific enablement',
    kind: 'availability',
    definition:
      'Enabled after the target integration, identity, permissions, and operating scope are validated for your organisation.',
  },
  PRIVATE_PREVIEW: {
    label: 'Preview',
    kind: 'availability',
    definition:
      'Offered to selected customers through a scoped engagement with agreed acceptance criteria.',
  },
  ROADMAP: {
    label: 'Roadmap',
    kind: 'availability',
    definition:
      'Planned, without a committed availability date.',
  },
  AVAILABLE_WITH_CONSTRAINTS: {
    label: 'Governed availability',
    kind: 'status',
    definition:
      'Available today through an expert-guided engagement. FEUS engineers scope the dependencies and operating conditions with you as part of delivery.',
  },
  OPERATIONALLY_VALIDATED: {
    label: 'Available by engagement',
    kind: 'status',
    definition:
      'Used in FEUS operating workflows and delivered to customers through a scoped engagement.',
  },
  CONTROLLED_ENTERPRISE_ADOPTION: {
    label: 'Available for enterprise deployment',
    kind: 'status',
    definition:
      'Available through a guided engagement that sets scope, identity, environment, controls, and support for your targets.',
  },
  CONTROLLED_PREVIEW: {
    label: 'Preview',
    kind: 'status',
    definition:
      'Available in preview through a scoped engagement, run with FEUS engineers against your environment and acceptance criteria.',
  },
  PREVIEW: {
    label: 'Preview',
    kind: 'status',
    definition:
      'Available in preview through a scoped engagement, with FEUS engineers alongside your team.',
  },
  EARLY_ACCESS: {
    label: 'Design partner',
    kind: 'status',
    definition:
      'Offered to named design partners through an invitation-led engagement with agreed acceptance criteria.',
  },
  INTEGRATION_READY: {
    label: 'Customer-specific enablement',
    kind: 'status',
    definition:
      'Reserved label; not used for any current connector.',
  },
  REQUIRES_CONFIGURATION: {
    label: 'Customer-specific enablement',
    kind: 'status',
    definition:
      'Requires configuration of an external dependency for your organisation.',
  },
  DISABLED: {
    label: 'Not offered',
    kind: 'status',
    definition: 'Not offered on this website.',
  },
  EXTERNALLY_UNVERIFIED: {
    label: 'Customer-specific enablement',
    kind: 'status',
    definition:
      'Qualified against your own target system during onboarding.',
  },
  PLANNED: {
    label: 'Roadmap',
    kind: 'status',
    definition:
      'Planned, without a committed release date.',
  },
  UNAVAILABLE: {
    label: 'Unavailable',
    kind: 'status',
    definition: 'Not currently offered.',
  },
}

/** Service status presentation (updated with each release; not a live monitor). */
export const PLATFORM_STATUS = {
  overall: 'FEUS.ai production service',
  summary:
    'FEUS.ai runs as a production service on Microsoft Azure. This page describes the services in the current release and is updated with each release.',
  releaseLabel: 'October 2026 release',
  basis: 'This page is updated with each release; it is not a live monitor. For operational questions about your deployment, contact your FEUS engagement team.',
  activeIncidents: null,
}

export const OPERATIONAL_SERVICES = [
  {
    name: 'FEUS Cloud Runtime',
    detail: 'Browser workbench and APIs on Azure Container Apps, East US 2.',
  },
  {
    name: 'Identity & Authentication',
    detail: 'Microsoft Entra ID sign-in with tenant-bound identity; APIs require authentication.',
  },
  {
    name: 'Multi-Agent Orchestration',
    detail: 'FEUS Supervisor and policy-based specialist routing.',
  },
  {
    name: 'Model Inference',
    detail: 'Microsoft Foundry model catalog and the in-process deterministic engine, routed by the FEUS Policy Router.',
  },
  {
    name: 'Governance & HITL',
    detail: 'Policy evaluation, budgets and human-in-the-loop approval controls.',
  },
  {
    name: 'Audit & Evidence',
    detail: 'Tenant-partitioned, hash-linked audit records in durable storage.',
  },
  {
    name: 'FinOps',
    detail: 'Per-turn token usage and estimated cost, accumulated per tenant.',
  },
  {
    name: 'Observability & Alerting',
    detail: 'Azure Monitor alert rules with an operational notification path.',
  },
  {
    name: 'Client Workbench',
    detail: 'Available at app.feuselectronicsgroup.com for onboarded organisations.',
  },
]

export const ENTERPRISE_CAPABILITY_AVAILABILITY = [
  {
    capability: 'FEUS Auto',
    availability: 'AVAILABLE',
    summary: 'Policy-aware model and agent selection is the default workbench experience.',
  },
  {
    capability: 'Multi-agent orchestration',
    availability: 'AVAILABLE',
    summary: 'The FEUS Supervisor coordinates eligible specialist agents for each request.',
  },
  {
    capability: 'Azure cloud runtime',
    availability: 'AVAILABLE',
    summary: 'The FEUS runtime runs in production on Microsoft Azure with durable cloud state.',
  },
  {
    capability: 'Enterprise identity',
    availability: 'AVAILABLE_FOR_ENTERPRISE_DEPLOYMENT',
    summary: 'Microsoft Entra identity is configured during customer onboarding.',
  },
  {
    capability: 'Audit & evidence',
    availability: 'AVAILABLE',
    summary: 'Execution evidence, correlation, and tenant-partitioned audit records are built in.',
  },
  {
    capability: 'FinOps controls',
    availability: 'AVAILABLE',
    summary: 'Usage, model selection, and estimated cost are recorded for governed reporting.',
  },
  {
    capability: 'Human approval workflows',
    availability: 'GOVERNED_AVAILABILITY',
    summary: 'Risk-sensitive actions require the approval policy assigned to the target and environment.',
  },
  {
    capability: 'Model catalog',
    availability: 'AVAILABLE',
    summary: 'FEUS Policy Router selects among approved Microsoft Foundry models and the deterministic engine.',
  },
  {
    capability: 'Governed SQL Server operations',
    availability: 'AVAILABLE_FOR_ENTERPRISE_DEPLOYMENT',
    summary: 'Delivered through the Expert / VS Code path; the hosted runtime does not execute customer SQL.',
  },
  {
    capability: 'Oracle and ITSM connectors',
    availability: 'PRIVATE_PREVIEW',
    summary: 'Available in preview through a scoped engagement.',
  },
  {
    capability: 'Automatic billing and additional data engines',
    availability: 'ROADMAP',
    summary: 'Planned. Today, payment is by proposal and invoice.',
  },
]

/** Capability lifecycle view rendered on the Trust Center. */
export const CAPABILITY_LIFECYCLE = [
  {
    capability: 'Governance engine and seven-gate execution gateway',
    productArea: 'Core platform',
    validation:
      'Readiness, audit, environment and identity, policy, PII inspection, approval, and execution gates run in order for every governed database operation, failing closed at each step.',
    publicStatus: 'CONTROLLED_ENTERPRISE_ADOPTION',
    environment: 'Customer environments configured during onboarding',
    restrictions:
      'Every database operation runs through the fully wired gateway with an approved service identity, policy scope, PII inspection, approval path, and audit sink.',
    nextMilestone: 'Delivered through the Expert / VS Code path as part of a scoped engagement.',
  },
  {
    capability: 'Governed cloud runtime and model routing',
    productArea: 'Core platform',
    validation:
      'The production service on Microsoft Azure classifies each request, routes it to an eligible Microsoft Foundry model or the deterministic engine, and records routing, cost and audit evidence.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Production service on Microsoft Azure with Microsoft Entra ID sign-in',
    restrictions: MODEL_QUALIFICATION,
    nextMilestone: 'Onboard your organisation, approve models per environment, and set budgets.',
  },
  {
    capability: 'SQL Server governed operational workflows',
    productArea: 'Core platform',
    validation:
      'Governed analysis and operational workflows for SQL Server, executed only through the seven-gate gateway.',
    publicStatus: 'CONTROLLED_ENTERPRISE_ADOPTION',
    environment: 'Your SQL Server targets, qualified with approved identities and entity allowlists',
    restrictions:
      'Delivered through the Expert / VS Code path. The hosted runtime does not execute customer SQL.',
    nextMilestone: 'Qualify your target servers and identities during onboarding.',
  },
  {
    capability: 'Policy, PII, approval, and identity controls',
    productArea: 'Core platform',
    validation:
      'Policy, PII inspection, operation-bound approvals and identity checks run on every governed route.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Configured per capability and target',
    restrictions:
      'Critical PII categories are always blocked. Approval owners and data boundaries are set for your organisation during onboarding.',
    nextMilestone: 'Confirm approval owners, data boundaries and policy scope in your readiness pack.',
  },
  {
    capability: 'Audit and evidence framework',
    productArea: 'Core platform',
    validation:
      'Every governed request records a hash-linked, tenant-partitioned audit trail with routing, approval and cost evidence.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Durable Azure storage for the hosted service; your approved evidence stores for installed deployments',
    restrictions:
      'The hash chain detects edits to recorded events; it is not externally anchored. Retention is agreed per deployment.',
    nextMilestone: 'Agree audit access and retention in your readiness pack.',
  },
  {
    capability: 'Synthetic data capabilities',
    productArea: 'Core platform',
    validation:
      'Schema-driven test data generation with referential integrity, environment guards, and no copying of production rows.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Development and test environments',
    restrictions:
      'Production rows are never sampled; each target schema is validated against an approved synthetic-data policy.',
    nextMilestone: 'Validate against a representative schema during your engagement.',
  },
  {
    capability: 'FEUS Recommendation Assurance',
    productArea: 'Core platform',
    validation:
      'Recommendations carry structured assurance metadata and must meet a risk threshold before they can enter a governed workflow.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Approved recommendation workflows',
    restrictions:
      'Recommendations below threshold are never executable; people review and approve consequential changes.',
    nextMilestone: 'Set thresholds and reviewers for your workflows during onboarding.',
  },
  {
    capability: 'ROI tracking and estimate framework',
    productArea: 'Core platform',
    validation:
      'Audit-derived metrics with clear handling of insufficient data and source errors.',
    publicStatus: 'AVAILABLE_WITH_CONSTRAINTS',
    environment: 'Reporting with disclosed assumptions',
    restrictions:
      'All values are labelled Estimate; value is measured against your own agreed baseline.',
    nextMilestone: 'Agree the baseline and measurement method in your readiness pack.',
  },
  {
    capability: 'Agent Control Plane and Protected Execution dispatch',
    productArea: 'New extension',
    validation:
      'Typed work orders, deny-by-default routing, specialist handoffs, and fail-closed execution checks.',
    publicStatus: 'CONTROLLED_PREVIEW',
    environment: 'Preview through a scoped engagement',
    restrictions:
      'Offered in preview; governed database execution today runs through the seven-gate gateway.',
    nextMilestone: 'Discuss a preview engagement with the FEUS team.',
  },
  {
    capability: 'Oracle Operations Agent',
    productArea: 'New extension',
    validation:
      'Read-only Tier 1 observation policy, registered operation templates, and identity continuity checks.',
    publicStatus: 'CONTROLLED_PREVIEW',
    environment: 'Preview through a scoped engagement',
    restrictions:
      'Available in preview through a scoped engagement; read-only observation only. Change operations are not offered.',
    nextMilestone: 'Scope a read-only Oracle preview engagement with the FEUS team.',
  },
  {
    capability: 'Service Request Agent and governed handoffs',
    productArea: 'New extension',
    validation:
      'Typed intake, classification, authorization, handoff, and result verification for service requests.',
    publicStatus: 'CONTROLLED_PREVIEW',
    environment: 'Preview through a scoped engagement',
    restrictions:
      'Offered in preview; requests are handed to governed specialists rather than touching a database directly.',
    nextMilestone: 'Scope a preview engagement around one service-request workflow.',
  },
  {
    capability: 'ITSM automation connectors',
    productArea: 'New extension',
    validation:
      'ServiceNow, Jira Service Management, and Azure DevOps connector contracts with dry-run defaults and least-privilege configuration.',
    publicStatus: 'PREVIEW',
    environment: 'Preview through a scoped engagement',
    restrictions:
      'Available in preview through a scoped engagement; connectors run in dry-run mode by default.',
    nextMilestone: 'Scope an ITSM preview engagement against your sandbox tenant.',
  },
  {
    capability: 'Additional database engines and deployment integrations',
    productArea: 'New extension',
    validation:
      'Design-partner discovery for additional governed data-platform targets.',
    publicStatus: 'EARLY_ACCESS',
    environment: 'Design-partner discovery',
    restrictions:
      'On the roadmap; participation does not include a committed release date.',
    nextMilestone: 'Talk to the FEUS team about becoming a design partner.',
  },
]

/**
 * Detailed capability rows rendered on product-family pages.
 * status must be a STATUS_DEFS key. qualification is REQUIRED and renders
 * with the row as its operating scope.
 */
export const PUBLIC_CAPABILITIES = [
  {
    id: 'CAP-01',
    family: 'FEUS SQLOps',
    name: 'SQL Server governed execution',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The SQL Server gateway executes approved operations through the seven-gate governance pipeline and is covered by automated tests.',
    qualification:
      'Delivered through the Expert / VS Code path for qualified targets and approved identities.',
  },
  {
    id: 'CAP-03',
    family: 'FEUS Assurance',
    name: 'Policy bundle verification',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Policy bundles are verified with purpose-separated registered keys before they are trusted.',
    qualification:
      'Verification is bound to each release; a key authorized for one purpose is never reused for another.',
  },
  {
    id: 'CAP-04',
    family: 'FEUS Control Plane',
    name: 'Work-order lifecycle',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Typed work-order states and transitions are implemented and covered by automated tests.',
    qualification: 'Part of the Agent Control Plane, offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-05',
    family: 'FEUS Control Plane',
    name: 'Policy enforcement before side effect',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Policy checks run before any execution boundary and default to denial.',
    qualification: 'Part of the Agent Control Plane, offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-07',
    family: 'FEUS Control Plane',
    name: 'Deterministic agent routing',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Deny-by-default routing produces deterministic specialist selection for supported typed requests.',
    qualification: 'Part of the Agent Control Plane, offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-08',
    family: 'FEUS Control Plane',
    name: 'Deny-by-default capability routing',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Capability routing denies unmapped operations by default.',
    qualification: 'Role mappings are configured for your organisation during onboarding.',
  },
  {
    id: 'CAP-09',
    family: 'FEUS Control Plane',
    name: 'Typed cross-agent messages',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Cross-agent contracts require typed, sanitized content and reject raw strings.',
    qualification: 'Part of the Agent Control Plane, offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-10',
    family: 'FEUS Control Plane',
    name: 'Identity non-propagation',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Each handover rebinds the receiving service principal and never copies parent approvals.',
    qualification: 'Service identities are configured for your organisation during onboarding.',
  },
  {
    id: 'CAP-11',
    family: 'FEUS Control Plane',
    name: 'Independent approval binding',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Approvals bind request, target, action, environment, plan, expiry, and separation of duties.',
    qualification: 'Approval owners and durable approval storage are configured per deployment.',
  },
  {
    id: 'CAP-16',
    family: 'FEUS Control Plane',
    name: 'Override cannot widen authority',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Operator overrides can cancel, deny, or escalate, and can never force an approval.',
    qualification: 'Part of the Agent Control Plane, offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-18',
    family: 'FEUS Protected Execution Service',
    name: 'Pre-execution governance gates (stages 0–5)',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Identity, environment, policy, approval, and evidence gates run before execution and fail closed.',
    qualification: 'Part of the Protected Execution Service, offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-20',
    family: 'FEUS Protected Execution Service',
    name: 'HTTPS-only JWKS',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Token validation requires HTTPS key discovery for every deployed environment.',
    qualification: 'Applies to every deployed environment; loopback key discovery is limited to local development.',
  },
  {
    id: 'CAP-21',
    family: 'FEUS Protected Execution Service',
    name: 'Test identity confinement',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Test identities are rejected outside local development.',
    qualification: 'Deployed environments accept only real, configured identities.',
  },
  {
    id: 'CAP-29',
    family: 'FEUS RequestOps',
    name: 'Ticket intake and classification',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Typed service-request intake and deterministic classification.',
    qualification: 'Offered in preview; your ticket source is connected through a scoped engagement.',
  },
  {
    id: 'CAP-30',
    family: 'FEUS RequestOps',
    name: 'No direct database surface',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The Service Request Agent has no direct database driver or executor surface.',
    qualification: 'Database work is always handed to a governed specialist.',
  },
  {
    id: 'CAP-31',
    family: 'FEUS RequestOps',
    name: 'Outbound path through the Control Plane',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The Service Request Agent submits typed work orders to the Control Plane rather than accessing a database directly.',
    qualification: 'Offered in preview through a scoped engagement.',
  },
  {
    id: 'CAP-33',
    family: 'FEUS ROI Estimate',
    name: 'Workflow and ROI estimate demonstration',
    status: 'DEMONSTRATION_ONLY',
    description:
      'A demonstration calculates an assumption-based ROI estimate from sample inputs.',
    qualification:
      'Every figure is labelled Estimate with its assumptions; value for your organisation is measured against your own baseline.',
  },
  {
    id: 'CAP-35',
    family: 'FEUS RequestOps',
    name: 'ServiceNow connector contract',
    status: 'DEMONSTRATION_ONLY',
    description:
      'A ServiceNow connector contract with dry-run defaults.',
    qualification: 'Available in preview through a scoped engagement against your sandbox tenant.',
  },
  {
    id: 'CAP-36',
    family: 'FEUS RequestOps',
    name: 'Jira Service Management connector contract',
    status: 'DEMONSTRATION_ONLY',
    description:
      'A Jira Service Management connector contract with dry-run defaults.',
    qualification: 'Available in preview through a scoped engagement against your sandbox tenant.',
  },
  {
    id: 'CAP-37',
    family: 'FEUS RequestOps',
    name: 'Azure DevOps work-item connector contract',
    status: 'DEMONSTRATION_ONLY',
    description:
      'An Azure DevOps work-item connector contract with dry-run defaults.',
    qualification: 'Available in preview through a scoped engagement against your sandbox organization.',
  },
  {
    id: 'CAP-38',
    family: 'FEUS RequestOps',
    name: 'Connector secret references',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'Connector contracts carry secret references and never render secret values inline.',
    qualification: 'References resolve against your approved vault during onboarding.',
  },
  {
    id: 'CAP-45',
    family: 'FEUS.ai platform',
    name: 'Installable package with locked dependencies',
    status: 'IMPLEMENTATION_VERIFIED',
    description:
      'The Expert path installs as a Python package with hash-pinned dependency locks.',
    qualification: 'Installed for customers as part of an Expert engagement.',
  },
]

/** External dependency treatment. */
export const INTEGRATION_STATUS = [
  {
    dependency: 'SQL Server (governed gateway)',
    status: 'OPERATIONALLY_VALIDATED',
    treatment:
      'Governed SQL Server operations through the seven-gate gateway, delivered via the Expert / VS Code path. Your targets are qualified during onboarding.',
  },
  {
    dependency: 'Oracle Operations Agent',
    status: 'CONTROLLED_PREVIEW',
    treatment:
      'Read-only Oracle observation, available in preview through a scoped engagement.',
  },
  {
    dependency: 'ServiceNow',
    status: 'PREVIEW',
    treatment: 'Connector with dry-run defaults, available in preview through a scoped engagement.',
  },
  {
    dependency: 'Jira Service Management',
    status: 'PREVIEW',
    treatment: 'Connector with dry-run defaults, available in preview through a scoped engagement.',
  },
  {
    dependency: 'Azure DevOps work items',
    status: 'PREVIEW',
    treatment: 'Connector with dry-run defaults, available in preview through a scoped engagement.',
  },
  {
    dependency: 'Model providers (Microsoft Foundry)',
    status: 'AVAILABLE_WITH_CONSTRAINTS',
    treatment: MODEL_QUALIFICATION,
  },
  {
    dependency: 'Identity provider (Microsoft Entra ID)',
    status: 'AVAILABLE',
    treatment:
      'Sign-in for the FEUS.ai service. The runtime holds no secrets, authenticates every caller against Entra ID, and refuses absent or invalid tokens.',
  },
  {
    dependency: 'Azure Key Vault (HSM)',
    status: 'AVAILABLE',
    treatment:
      'Release signing uses a non-exportable HSM key held in Azure Key Vault and invoked from a hosted workflow; the private key never leaves the vault.',
  },
  {
    dependency: 'Microsoft Azure hosting',
    status: 'AVAILABLE',
    treatment:
      'Production service on Azure Container Apps (East US 2) over TLS, with durable evidence storage, managed identity, and operational alerting. No availability or response-time service level is published.',
  },
]

/** Product families (approved naming register, one-sentence descriptions). */
export const PRODUCT_FAMILIES = [
  {
    name: 'FEUS SQLOps',
    route: '/sqlops',
    role: 'Core product family',
    description:
      'FEUS.ai\u2019s SQL Server governance and operations family, delivered through a qualified identity, target scope, and governed execution path.',
    statusLine: 'Available for enterprise deployment',
  },
  {
    name: 'FEUS RequestOps',
    route: '/requestops',
    role: 'Extension product family',
    description:
      'Governed service-request intake, routing, and handoffs, with customer connectors enabled per engagement.',
    statusLine: 'Preview · by engagement',
  },
  {
    name: 'FEUS Assurance',
    route: '/assurance',
    role: 'Product family',
    description:
      'Assurance evaluation and release evidence tooling; it is not a formal certification or compliance attestation.',
    statusLine: 'Governed availability',
  },
  {
    name: 'FEUS Control Plane',
    route: '/control-plane',
    role: 'Architecture component',
    description:
      'The coordination layer for typed work orders, routing, approvals, policy checks, and accountable agent handovers.',
    statusLine: 'Preview · by engagement',
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
    scope: 'Delivered through the Expert / VS Code path for qualified targets and approved identities.',
  },
  {
    id: 'copilot',
    name: 'FEUS Copilot',
    capability: 'Governed operator experience',
    status: 'AVAILABLE_WITH_CONSTRAINTS',
    route: '/copilot',
    summary:
      'An authenticated operator experience for governed analysis and approved operational workflows.',
    scope: 'Used inside the authenticated FEUS workbench and operator tools; this public website does not host an assistant.',
  },
  {
    id: 'oracleops',
    name: 'FEUS OracleOps',
    capability: 'Oracle Operations Agent',
    status: 'CONTROLLED_PREVIEW',
    route: '/agents/oracle',
    summary:
      'Oracle-native knowledge and observe-only workflows governed by registered templates, target identity checks, and fail-closed policy.',
    scope: 'Available in preview through a scoped engagement; read-only observation only.',
  },
  {
    id: 'requestops',
    name: 'FEUS RequestOps',
    capability: 'Service Request Agent',
    status: 'CONTROLLED_PREVIEW',
    route: '/requestops',
    summary:
      'Governed service-request intake, deterministic classification, authorization, handoff, and result verification.',
    scope: 'Available in preview through a scoped engagement.',
  },
  {
    id: 'control-plane',
    name: 'FEUS Agent Control Plane',
    capability: 'Governed multi-agent coordination',
    status: 'CONTROLLED_PREVIEW',
    route: '/control-plane',
    summary:
      'Typed work orders, policy-aware routing, specialist handoffs, and fail-closed execution checks for coordinated agents.',
    scope: 'Available in preview through a scoped engagement.',
  },
  {
    id: 'itsm-connect',
    name: 'FEUS ITSM Connect',
    capability: 'ServiceNow, Jira Service Management, and Azure DevOps connectors',
    status: 'PREVIEW',
    route: '/integrations/itsm',
    summary:
      'Governed ITSM connector contracts with dry-run defaults, closed operations, least-privilege configuration, and audit evidence.',
    scope: 'Available in preview through a scoped engagement; connectors run in dry-run mode by default.',
  },
  {
    id: 'recommendation-assurance',
    name: 'FEUS Recommendation Assurance',
    capability: 'Recommendation evidence and execution thresholding',
    status: 'AVAILABLE_WITH_CONSTRAINTS',
    route: '/assurance',
    summary:
      'Structured assurance metadata and fail-closed thresholds for recommendations entering governed workflows.',
    scope: 'Thresholds and reviewers are configured for your workflows; people approve consequential changes.',
  },
  {
    id: 'provider-gateway',
    name: 'FEUS Provider Gateway',
    capability: 'Model-provider governance boundary',
    status: 'AVAILABLE_WITH_CONSTRAINTS',
    route: '/integrations',
    summary:
      'The provider-neutral control boundary that decides model selection, policy, telemetry, safety, and cost governance before any provider call is made.',
    scope: MODEL_QUALIFICATION,
  },
  {
    id: 'engine-expansion',
    name: 'FEUS Engine Expansion',
    capability: 'Additional governed data-engine agents',
    status: 'EARLY_ACCESS',
    route: '/contact',
    summary:
      'Design-partner discovery for additional governed database and data-platform targets.',
    scope: 'On the roadmap; design-partner participation has no committed release date.',
  },
]

/** Model-provider statement. */
export const MODEL_PROVIDER_STATEMENT = {
  headline: 'Governed model routing across a Microsoft Foundry catalog',
  statement:
    'FEUS.ai decides model eligibility with its own policy router before any provider call is made. ' + MODEL_QUALIFICATION,
  designNote:
    'FEUS is the control plane and the model provider is an execution platform. Every routed turn records the model chosen, the routing authority, token counts, latency, and cost basis.',
}

/** ROI estimate framing. */
export const ROI_STATEMENT = {
  statement:
    'ROI values shown in a demonstration are illustrative estimates based on disclosed assumptions and sample inputs. They are not measured savings or customer results; value for your organisation is measured against your own agreed baseline.',
  requiredLabels: [
    'Estimate',
    'Assumptions',
    'Benchmark source',
    'Calculation version',
    'Generated date',
  ],
}

/** Offline walkthrough label. */
export const DEMO_DISCLAIMER = {
  long:
    'Offline walkthrough. This session uses sample fixture data on FEUS equipment. It does not connect to a customer database, ITSM tenant, identity provider, model provider, secret store, or cloud resource. Outputs and ROI values are illustrative.',
  compact: 'OFFLINE WALKTHROUGH · SAMPLE DATA',
}

export default POSTURE
