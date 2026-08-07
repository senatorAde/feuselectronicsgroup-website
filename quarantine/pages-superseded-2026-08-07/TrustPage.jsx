import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield, Lock, Eye, CheckCircle2, Server,
  AlertTriangle, FileSearch, UserCheck, Activity, Layers,
  ShieldCheck, ShieldAlert, ClipboardCheck, Fingerprint,
  Download, GitBranch, ScanLine, FileCheck2, Database,
  Network, KeyRound, ScrollText, Scale, Workflow,
  ChevronDown, BookOpen, Building2
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

/* ─────────────────────── TRUST HIGHLIGHTS (top of page) ─────────────────────── */
const trustHighlights = [
  'Fail-closed execution model — if governance is unavailable, no database operation runs',
  '7-gate governance pipeline enforced before any query reaches the database engine',
  'Dual-identity architecture separating user identity from execution identity',
  'PII detection, query evaluation, and policy enforcement on every request',
  'Hash-chained, tamper-evident audit trail with full attribution and provenance',
  'Deployable on-prem, in-tenant, or hybrid — no forced data movement outside your boundary',
]

/* ─────────────────────── CORE SECURITY PRINCIPLES ─────────────────────── */
const corePrinciples = [
  {
    icon: ShieldAlert,
    title: 'Fail-Closed Execution',
    description:
      'When any governance component is degraded, unreachable, or returns an indeterminate result, the pipeline halts and the operation is denied. There is no fallback path that bypasses controls. The safe default is always denial, not execution.',
  },
  {
    icon: Workflow,
    title: 'Governance Before Execution',
    description:
      'Governance is not a wrapper around the engine — it is the only path into the engine. Every request is evaluated by readiness, identity, policy, PII, and approval gates before a connection is opened. Execution is the final stage, not the first.',
  },
  {
    icon: KeyRound,
    title: 'Least Privilege & RBAC',
    description:
      'Users authenticate under their own identity, but execution occurs under a constrained service identity scoped to the operation, environment, and approved policy. Roles determine which operations a user may request; policies determine which the platform will permit.',
  },
  {
    icon: ScrollText,
    title: 'Auditability & Traceability',
    description:
      'Every decision — including denials, warnings, and approvals — is written to a hash-chained audit record before execution proceeds. Each entry carries session, user, role, policy reference, target, and outcome, producing a continuous, tamper-evident chain.',
  },
  {
    icon: Lock,
    title: 'Secure-by-Default Operations',
    description:
      'Destructive operations, production targets, and sensitive data classes default to deny-with-approval. Read-only and synthetic-data paths are preferred wherever the use case allows. Privileged behaviour must be explicitly enabled, never silently inherited.',
  },
]

/* ─────────────────────── GOVERNANCE PIPELINE ─────────────────────── */
const pipelineGates = [
  {
    gate: 'Gate 1',
    title: 'System Readiness',
    description: 'Verify all governance subsystems are operational before accepting any request.',
    icon: Server,
  },
  {
    gate: 'Gate 2',
    title: 'Audit Initiation',
    description: 'Create an immutable audit record for this request before any processing begins.',
    icon: ClipboardCheck,
  },
  {
    gate: 'Gate 3',
    title: 'Environment & Identity',
    description: 'Verify the requesting user, their role, and the target environment (dev, staging, production).',
    icon: UserCheck,
  },
  {
    gate: 'Gate 4',
    title: 'Policy Evaluation',
    description: 'Check the operation against organizational policy rules. Block, warn, or require approval — automatically.',
    icon: FileSearch,
  },
  {
    gate: 'Gate 5',
    title: 'PII Inspection',
    description: 'Scan for personally identifiable information in queries and results. Mask or block before data leaves the system.',
    icon: ShieldCheck,
  },
  {
    gate: 'Gate 6',
    title: 'Approval Verification',
    description: 'For operations that require human approval, verify that authorization has been granted by an appropriate approver.',
    icon: CheckCircle2,
  },
  {
    gate: 'Gate 7',
    title: 'Governed Execution',
    description: 'Only after all gates pass does the operation execute — with full monitoring, rollback capability, and real-time logging.',
    icon: Activity,
  },
]

/* ─────────────────────── SECURITY CONTROLS (categorised) ─────────────────────── */
const controlCategories = [
  {
    icon: UserCheck,
    label: 'Identity & Access',
    items: [
      'Role-based access control (RBAC) with explicit role-to-operation mappings; unmapped roles cannot request privileged actions.',
      'Dual-identity execution: the requesting user is authenticated and audited under their own identity, while database execution occurs under a separate, scoped service identity.',
      'Per-environment identity scoping (dev / staging / production); production identities cannot be used against non-production targets and vice versa.',
      'Session-bound authentication; every request carries a verifiable session reference linked to the user and role at request time.',
    ],
  },
  {
    icon: Database,
    label: 'Data Protection',
    items: [
      'Inline PII detection on inbound queries and outbound result sets; matches trigger masking, denial, or approval routing per policy.',
      'Pre-execution query evaluation against a deterministic policy set (object, action, environment, data class) before any connection is opened.',
      'Synthetic data generation for development and test paths to remove production PII from non-production workflows.',
      'Audit records reference data by category and context, never by raw sensitive values.',
    ],
  },
  {
    icon: ShieldAlert,
    label: 'Execution Controls',
    items: [
      'Fail-closed enforcement: any unavailable, degraded, or indeterminate gate halts execution and records a denial.',
      'Policy-driven execution gating with allow / warn / approve / deny outcomes evaluated per request.',
      'Multi-tier approval workflows for high-impact operations, with role-based routing and explicit reviewer attribution.',
      'A single governed execution path; raw connection construction and ad-hoc string-built SQL paths are scanned out of the source at build time.',
    ],
  },
  {
    icon: Activity,
    label: 'Audit & Monitoring',
    items: [
      'Hash-chained, append-only audit log; modification or deletion of prior entries is detectable on verification.',
      'Full attribution per entry: session, user, role, target environment, policy reference, decision, and outcome.',
      'Activity tracking suitable for compliance reporting, ROI analysis, and operational forensics.',
      'Integration points for enterprise monitoring (e.g. Redgate SQL Monitor) and SIEM forwarding via structured logs.',
    ],
  },
]

/* ─────────────────────── COMPLIANCE: SOC 2 (CC1–CC9) ─────────────────────── */
/* Language is intentionally "aligned to" / "supports" / "designed against" — not "certified". */
const soc2Map = [
  {
    control: 'CC1 — Control Environment',
    description:
      'Commitment to integrity, ethics, governance structure, accountability, and competence across the organisation that designs and operates the system.',
    feus:
      'Documented governance model with named owners for the pipeline, policy set, audit chain, and release process. Code ownership and review responsibilities are recorded in CODEOWNERS and the governance documentation set (GOVERNANCE_MODEL, AIIA_ALIGNMENT, CERTIFICATION_GUIDE).',
    evidence:
      'CODEOWNERS file · governance and certification documents in /docs · signed release manifest naming the responsible owner and reviewer.',
  },
  {
    control: 'CC2 — Communication & Information',
    description:
      'Internal and external communication of objectives, responsibilities, and control information necessary to support the functioning of internal control.',
    feus:
      'Trust & Security page, AIIA Walkthrough PDF, customer-facing changelog, and onboarding documentation describe controls, scope, and operating expectations. Internal release notes and the migration checklist communicate control changes to operators.',
    evidence:
      'Public Trust page · AIIA Walkthrough PDF · CHANGELOG · MIGRATION_CHECKLIST · onboarding pack with explicit control statements.',
  },
  {
    control: 'CC3 — Risk Assessment',
    description:
      'Identification, analysis, and management of risks that could prevent the entity from achieving its objectives, including changes to the system.',
    feus:
      'Risk register maintained alongside the policy set; static bypass scanner enumerates execution-path risks at build time; readiness gate continuously evaluates subsystem availability against the risk model before a session opens.',
    evidence:
      'Bypass scan report (zero net findings across source) · readiness verdict per session · documented risk register reviewed at each release.',
  },
  {
    control: 'CC4 — Monitoring Activities',
    description:
      'Ongoing and separate evaluations to determine whether the components of internal control are present and functioning.',
    feus:
      'Executable cohesion scenario (S10) drives a live multi-operation session through the full pipeline at each release and asserts 11 invariants over the audit chain. Continuous readiness checks run for every session in production.',
    evidence:
      'S10 invariants result (11/11) · virgin-environment checks (12/12) · per-session readiness records · release certification packet (CERT_<timestamp>).',
  },
  {
    control: 'CC5 — Control Activities',
    description:
      'Selection, development, and deployment of control activities that contribute to the mitigation of risks to the achievement of objectives.',
    feus:
      'The 7-gate pipeline is the only path into a database connection. Each gate is a discrete control activity with a defined input contract, deterministic decision, and audit emission. Controls cannot be selectively disabled at runtime.',
    evidence:
      'Per-request audit records showing each gate decision in order · source review confirming a single governed execution path · bypass scan confirming no alternate paths.',
  },
  {
    control: 'CC6.1 — Logical Access · Authentication',
    description:
      'Logical access security software, infrastructure, and architectures restrict access to information assets to authorised users.',
    feus:
      'Session-bound authentication; every request carries a verifiable session reference linked to the user identity at request time. Unauthenticated requests are rejected at Gate 1/2 before any policy or execution stage.',
    evidence:
      'Audit entries containing session id, user id, and authentication outcome · denial records for unauthenticated or session-expired requests.',
  },
  {
    control: 'CC6.2 — Logical Access · Authorisation',
    description:
      'Prior to issuing system credentials, the entity registers and authorises new users; access is removed when no longer required.',
    feus:
      'RBAC with explicit role-to-operation mappings; unmapped roles cannot request privileged actions. Role assignments are externalised to the customer’s identity provider; FEUS consumes claims rather than maintaining a parallel user store.',
    evidence:
      'Role-to-operation mapping artefact in /config · audit entries showing role evaluated per request · access-review export grouped by role and environment.',
  },
  {
    control: 'CC6.3 — Logical Access · Privilege Management',
    description:
      'The entity authorises, modifies, or removes access based on roles, responsibilities, or system design and changes.',
    feus:
      'Dual-identity execution: the requesting user is authenticated under their own identity, but database execution occurs under a separate, scoped service identity bound to the operation, environment, and approved policy.',
    evidence:
      'Audit entries showing requesting identity and execution identity as distinct fields · per-environment identity scope configuration · denial records when scope is violated.',
  },
  {
    control: 'CC6.6 — Logical Access · Boundary Protection',
    description:
      'The entity implements logical access security measures to protect against threats from sources outside its system boundaries.',
    feus:
      'FEUS deploys inside the customer’s network boundary; no outbound channel from the data plane is required for normal operation. Optional integrations (SIEM, monitoring) are explicitly enabled by the customer.',
    evidence:
      'Deployment topology document · network egress configuration showing customer-controlled boundary · integration manifest listing every outbound endpoint and its purpose.',
  },
  {
    control: 'CC6.7 — Logical Access · Data Transmission',
    description:
      'The entity restricts the transmission, movement, and removal of information to authorised internal and external users and processes.',
    feus:
      'Inline PII detection on outbound result sets; matches trigger masking, denial, or approval routing per policy. Audit records reference data categories rather than raw sensitive values, preventing PII propagation through the audit channel.',
    evidence:
      'PII decision records per request (category, action) · masked/denied result samples · audit-chain inspection showing no raw PII fields.',
  },
  {
    control: 'CC6.8 — Logical Access · Malicious Software / Unauthorised Code',
    description:
      'The entity implements controls to prevent or detect and act upon the introduction of unauthorised or malicious software.',
    feus:
      'Static bypass scanner runs as part of release validation, detecting unauthorised raw connections, ad-hoc string-built SQL execution paths, and audit-skips. Dependency authenticity is verified against the published manifest.',
    evidence:
      'Bypass scan report attached to each release · dependency authenticity report · signed release manifest with hash references.',
  },
  {
    control: 'CC7.1 — System Operations · Vulnerability Management',
    description:
      'The entity uses detection and monitoring procedures to identify changes to configurations that result in the introduction of new vulnerabilities.',
    feus:
      'Readiness gate evaluates governance-subsystem availability and configuration before each session. Configuration drift in the policy set, identity scope, or audit pipeline is surfaced as a non-ready verdict and blocks execution.',
    evidence:
      'Per-session readiness verdict (Ready / Partially Ready / Blocked) · configuration drift entries in the audit chain · denied-session records on blocked verdict.',
  },
  {
    control: 'CC7.2 — System Operations · Anomaly Detection & Response',
    description:
      'The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors.',
    feus:
      'Structured events are emitted for every governance decision and execution outcome and are forwarded to customer-side SIEM tooling. Fail-closed behaviour ensures that detection of an anomaly halts execution rather than allowing degraded operation.',
    evidence:
      'SIEM event stream (JSON, structured) · denial records carrying the originating anomaly classification · fail-closed event entries with subsystem identity.',
  },
  {
    control: 'CC7.3 — System Operations · Incident Evaluation',
    description:
      'The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives.',
    feus:
      'Hash-chained audit chain provides a complete, ordered reconstruction of any session for incident review. Every denial, warning, approval, and execution outcome is attributable to a session, identity, and policy reference.',
    evidence:
      'Session reconstruction export · hash-chain verification report · incident timeline derived directly from audit entries.',
  },
  {
    control: 'CC7.4 — System Operations · Incident Response',
    description:
      'The entity responds to identified security incidents by executing a defined incident response programme.',
    feus:
      'Documented runbook for incident classes (governance subsystem unavailable, policy violation, audit-chain anomaly). Fail-closed halt is the default first action; recovery requires explicit operator acknowledgement recorded in the audit chain.',
    evidence:
      'Runbook document · audit entries for incident acknowledgement and recovery · post-incident report referencing audit-chain identifiers.',
  },
  {
    control: 'CC8.1 — Change Management',
    description:
      'The entity authorises, designs, develops, configures, documents, tests, approves, and implements changes to infrastructure, data, and software.',
    feus:
      'Policy-driven gating evaluates every operation as a change request: object, action, environment, and data class are scored against the active policy set, producing allow / warn / approve / deny. Multi-tier approval is required for high-impact changes; reviewer identity is recorded.',
    evidence:
      'Per-request policy decision in the audit chain · approval record naming the reviewer and timestamp · release-level change record signed in the certification packet.',
  },
  {
    control: 'CC9.1 — Risk Mitigation · Business Disruption',
    description:
      'The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.',
    feus:
      'Fail-closed default on any indeterminate or degraded control prevents partial-state operation. Readiness gate enforces a clean baseline before a session is permitted to begin.',
    evidence:
      'Fail-closed denial records · readiness baseline verdict · incident records showing controlled halt rather than degraded execution.',
  },
  {
    control: 'CC9.2 — Risk Mitigation · Vendors & Business Partners',
    description:
      'The entity assesses and manages risks associated with vendors and business partners.',
    feus:
      'On-prem, in-tenant, and hybrid deployment; data plane remains within the customer boundary; no forced egress of customer data to vendor infrastructure. Vendor support access (when used) is gated through the same pipeline as customer operators.',
    evidence:
      'Deployment manifest · network boundary diagram · audit entries for any vendor-side support session, identical in structure to customer-operator sessions.',
  },
  {
    control: 'C1.1 — Confidentiality (TSC)',
    description:
      'The entity identifies and maintains confidential information to meet its objectives related to confidentiality.',
    feus:
      'PII categories are classified and policy-bound at the data-class level. Confidential data classes default to deny-with-approval and are excluded from audit payload bodies; only category and decision are recorded.',
    evidence:
      'Data-class catalogue · audit entries referencing categories without raw values · denial records where confidential class triggered policy block.',
  },
]

/* ─────────────────────── COMPLIANCE: ISO/IEC 27001:2022 Annex A ─────────────────────── */
const isoMap = [
  {
    control: 'A.5.15 — Access Control',
    description:
      'Rules to control physical and logical access to information and other associated assets are established, documented, and reviewed.',
    feus:
      'RBAC with explicit role-to-operation mappings enforced at Gate 3 (Environment & Identity). Roles and scopes are externalised to the customer’s identity provider and reviewed as part of the release cycle.',
    evidence:
      'Role-to-operation mapping artefact · audit entries showing role evaluated per request · periodic access-review export.',
  },
  {
    control: 'A.5.16 — Identity Management',
    description:
      'The full life cycle of identities is managed.',
    feus:
      'FEUS does not maintain a parallel user store. Identities are consumed from the customer’s IdP via verifiable claims; lifecycle (provisioning, change, revocation) follows the customer’s existing identity processes.',
    evidence:
      'IdP integration configuration · audit entries citing the IdP-issued identity · denial records when claims are missing or invalid.',
  },
  {
    control: 'A.5.18 — Access Rights',
    description:
      'Access rights to information and other associated assets are provisioned, reviewed, modified, and removed in accordance with the access control policy.',
    feus:
      'Dual-identity execution scopes the database execution identity per environment and per approved policy. Production scopes are not usable against non-production targets and vice versa.',
    evidence:
      'Per-environment scope configuration · audit entries showing requesting and execution identities · denial records on cross-environment scope violation.',
  },
  {
    control: 'A.5.7 — Threat Intelligence',
    description:
      'Information relating to information security threats is collected and analysed to produce threat intelligence.',
    feus:
      'Bypass scanner and dependency authenticity checks run at each release; findings are tracked against the risk register. Anomaly classifications detected in production feed back into the policy set.',
    evidence:
      'Bypass scan report per release · dependency authenticity report · risk register entries with status and remediation reference.',
  },
  {
    control: 'A.5.19 / A.5.20 / A.5.23 — Supplier & Cloud Service Relationships',
    description:
      'Information security in supplier relationships, including cloud services, is established, addressed in agreements, and managed.',
    feus:
      'Customer retains the data plane within their boundary. Supplier (FEUS) access for support is opt-in and gated through the same pipeline; agreements cover scope, retention, and audit-export rights.',
    evidence:
      'Deployment topology document · supplier-access audit records · contractual schedule referencing the technical control set on this page.',
  },
  {
    control: 'A.5.36 — Compliance with Policies, Rules and Standards',
    description:
      'Compliance with the organisation’s information security policy, topic-specific policies, rules and standards is regularly reviewed.',
    feus:
      'Active policy set is the deterministic input to Gate 4; violations produce denial or approval-required outcomes. The policy artefact is versioned and referenced in every audit entry.',
    evidence:
      'Versioned policy artefact · per-request policy reference in audit entries · periodic policy review records.',
  },
  {
    control: 'A.8.2 — Privileged Access Rights',
    description:
      'The allocation and use of privileged access rights is restricted and managed.',
    feus:
      'Privileged operations require approval routing (Gate 6) before reaching execution. Reviewer identity, approval timestamp, and policy reference are bound to the audit record.',
    evidence:
      'Approval records per privileged operation · audit-chain entries linking request, approval, and execution.',
  },
  {
    control: 'A.8.5 — Secure Authentication',
    description:
      'Secure authentication technologies and procedures are implemented based on information access restrictions and the topic-specific policy on access control.',
    feus:
      'Authentication state is required at Gate 1/2; sessions carry verifiable references and expire per policy. FEUS does not store secrets in audit payloads.',
    evidence:
      'Authentication outcome per session · denial records for expired or invalid sessions · audit-chain inspection showing no secret material.',
  },
  {
    control: 'A.8.8 — Management of Technical Vulnerabilities',
    description:
      'Information about technical vulnerabilities of information systems in use is obtained, the organisation’s exposure is evaluated, and appropriate measures are taken.',
    feus:
      'Static analysis (bypass scanner) and dependency authenticity verification run at each release; readiness gate detects configuration drift in production. Findings are tracked through to remediation.',
    evidence:
      'Bypass scan report · dependency authenticity report · readiness drift entries in the audit chain.',
  },
  {
    control: 'A.8.10 — Information Deletion',
    description:
      'Information stored in information systems, devices or in any other storage media is deleted when no longer required.',
    feus:
      'Audit retention is customer-configurable and applied within the customer boundary. Synthetic data is generated for non-production paths to remove the need to retain production PII outside production.',
    evidence:
      'Retention configuration · synthetic data generation logs · audit entries for retention-driven deletion events.',
  },
  {
    control: 'A.8.11 — Data Masking',
    description:
      'Data masking is used in accordance with the organisation’s topic-specific policy on access control and other related topic-specific policies, and business requirements, taking applicable legislation into consideration.',
    feus:
      'Inline PII detection produces masking decisions on outbound result sets at Gate 5 before the result returns to the requesting user. The masking action and category are recorded in the audit chain.',
    evidence:
      'PII decision records (category, action: mask/deny/approve) · sample masked outputs · per-request audit entry citing the masking rule applied.',
  },
  {
    control: 'A.8.12 — Data Leakage Prevention',
    description:
      'Data leakage prevention measures are applied to systems, networks and any other devices that process, store or transmit sensitive information.',
    feus:
      'PII interception runs on both inbound query text and outbound results; audit records carry no raw sensitive values; deployment topology keeps the data plane within the customer boundary.',
    evidence:
      'Inbound and outbound PII decision records · audit-chain inspection showing category-only references · network egress configuration.',
  },
  {
    control: 'A.8.15 — Logging',
    description:
      'Logs that record activities, exceptions, faults and other relevant events are produced, stored, protected and analysed.',
    feus:
      'Append-only, hash-chained audit chain captures every governance decision and execution outcome with full attribution. The chain is structured for analysis and exportable to SIEM.',
    evidence:
      'Audit-chain export with hash linkage · per-entry attribution fields · SIEM event stream sample.',
  },
  {
    control: 'A.8.16 — Monitoring Activities',
    description:
      'Networks, systems and applications are monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.',
    feus:
      'Continuous readiness checks across governance subsystems; structured events for monitoring integrations (e.g. Redgate SQL Monitor) and SIEM forwarding. Anomalies trigger fail-closed halt rather than degraded operation.',
    evidence:
      'Monitoring integration configuration · readiness verdicts per session · denial records for fail-closed halt with originating signal.',
  },
  {
    control: 'A.8.32 — Change Management',
    description:
      'Changes to information processing facilities and information systems are subject to change management procedures.',
    feus:
      'Every operation is evaluated as a change request via the policy set; high-impact changes require explicit approval. Release-level changes are signed in the certification packet and reflected in the bypass-scan baseline.',
    evidence:
      'Per-request policy decision · approval records · release certification packet (CERT_<timestamp>) with signed manifest.',
  },
  {
    control: 'A.8.34 — Protection of Information Systems During Audit Testing',
    description:
      'Audit tests and other assurance activities involving the assessment of operational systems are planned and agreed between the tester and appropriate management.',
    feus:
      'Audit-export and reconstruction operations are themselves governed operations recorded in the chain. Read-only assurance access is a distinct, scoped role and cannot mutate state.',
    evidence:
      'Audit entries for the export operation itself · scoped assurance role definition · denial records for any write attempt under the assurance role.',
  },
]

/* ─────────────────────── COMPLIANCE: CIS SQL Server Benchmarks ─────────────────────── */
const cisMap = [
  {
    control: 'CIS 2.x — Surface Area Configuration',
    description:
      'Disable unused features and services to reduce the SQL Server attack surface (e.g. xp_cmdshell, CLR, external scripts, unless explicitly required).',
    feus:
      'Policy set treats surface-area-expanding statements (xp_cmdshell, sp_configure for high-privilege options, CLR enable) as deny-by-default at Gate 4. Approval routing is required for any exception.',
    evidence:
      'Policy artefact entries for surface-area statements · denial records for default rejection · approval records where exception was granted.',
  },
  {
    control: 'CIS 3.x — Authentication',
    description:
      'Use Windows Authentication where possible, enforce strong password policies, and avoid shared accounts.',
    feus:
      'Authentication identity is consumed from the customer’s IdP; FEUS does not introduce shared accounts. Dual-identity execution prevents the requesting user’s credentials from being reused as a database principal.',
    evidence:
      'IdP integration configuration · audit entries showing distinct requesting and execution identities · absence of shared-credential paths in source (verified by bypass scanner).',
  },
  {
    control: 'CIS 4.x — Password Policies',
    description:
      'Ensure SQL authentication accounts (where used) enforce password complexity, expiration, and lockout policies.',
    feus:
      'Where SQL authentication is used for the scoped execution identity, secrets are sourced from the customer’s secret store; FEUS does not persist or echo the secret material. Rotation is governed by the customer’s policy.',
    evidence:
      'Secrets-integration configuration · audit-chain inspection showing no secret material · rotation evidence from the customer’s secret store.',
  },
  {
    control: 'CIS 5.x — Auditing & Logging',
    description:
      'SQL Server Audit is configured to capture login events, privileged operations, and schema changes; logs are protected from tampering.',
    feus:
      'FEUS audit chain captures every operation it issues, in addition to any server-side SQL Server Audit the customer has configured. Hash chaining makes silent modification of the FEUS chain detectable.',
    evidence:
      'FEUS audit-chain export · hash-chain verification report · cross-reference between FEUS audit entries and server-side SQL Server Audit records.',
  },
  {
    control: 'CIS 6.x — Application Development',
    description:
      'Use parameterised queries, avoid dynamic string concatenation, and prevent SQL injection in application code paths that reach SQL Server.',
    feus:
      'Static bypass scanner detects f-string / string-concatenated SQL execution paths in the source and fails the build. The governed executor is the only path to a connection; ad-hoc string SQL paths are rejected at build time.',
    evidence:
      'Bypass scan report (zero net findings) · build-pipeline failure record on detection · source-review notes from each release.',
  },
  {
    control: 'CIS 7.x — Encryption',
    description:
      'Encrypt data in transit (TLS) and, where applicable, at rest; protect certificate and key material.',
    feus:
      'FEUS uses the customer-configured TLS for SQL connections and does not introduce alternative transport. Key and certificate material remains under customer control; FEUS does not persist key material in its own state or audit chain.',
    evidence:
      'Connection configuration showing TLS enforcement · audit-chain inspection showing no key material · customer-side certificate inventory.',
  },
  {
    control: 'CIS 8.x — Appendix · Additional Considerations',
    description:
      'Review database object ownership, schema permissions, and administrative role membership periodically.',
    feus:
      'FEUS provides governed read-only inspection capabilities for ownership, role membership, and permission state, with results returned through the same gated pipeline. Inspection itself is auditable.',
    evidence:
      'Inspection-operation audit entries · periodic ownership/permission report · audit-chain reference for the report-generation operation.',
  },
]

/* ─────────────────────── SECURITY FAQ ─────────────────────── */
const securityFaq = [
  {
    q: 'Is FEUS SOC 2 or ISO 27001 certified?',
    a: 'No. FEUS does not currently hold SOC 2 or ISO 27001 certification and does not represent itself as certified. The platform is designed against the SOC 2 Trust Services Criteria and ISO 27001 Annex A controls, with a documented control mapping (see the Compliance Alignment section). A formal certification roadmap is in progress; the underlying controls are already implemented and verifiable.',
  },
  {
    q: 'How does FEUS handle PII?',
    a: 'PII is intercepted at two points: on inbound query text before execution, and on outbound result sets before return. Matches are evaluated against policy and produce a masking, denial, or approval-required outcome. Audit records reference detected categories (for example, "email", "national-id") and the policy decision, never the raw values. For non-production environments, synthetic data generation provides realistic structures without exposing real PII.',
  },
  {
    q: 'Can FEUS execute unsafe queries?',
    a: 'No. There is a single governed execution path. Every request is evaluated by the 7-gate pipeline before a connection is opened, and execution is denied if any gate fails or returns indeterminate. Raw connection construction and ad-hoc string-built SQL paths are scanned out of the source at build time, and the bypass scanner runs as part of release validation. If governance is unavailable, execution is unavailable — by design.',
  },
  {
    q: 'How is activity audited and how do we access the evidence?',
    a: 'Every governance decision and execution outcome is written to an append-only, hash-chained audit log with full attribution: session, user, role, target environment, policy reference, decision, and result. Logs can be exported for SIEM ingestion, retained per customer policy, and verified independently using the published hash chain. Evidence packs (including the executable cohesion scenario and bypass scan) are reproducible on demand for internal audit and external review.',
  },
  {
    q: 'Where is customer data stored or processed?',
    a: 'FEUS deploys inside the customer’s environment — on-prem, in-tenant in the customer’s cloud, or hybrid. Database queries execute against the customer’s own databases, through the customer’s own network and authentication boundaries. The platform provides the governance layer; it does not act as a data pipeline and does not require egress of customer data to vendor infrastructure.',
  },
  {
    q: 'How is FEUS different from a general-purpose AI copilot?',
    a: 'A general-purpose copilot generates text and may invoke tools opportunistically. FEUS treats every model-suggested action as a request that must pass the same governance pipeline as a human-issued request. The model cannot open connections, cannot bypass policy, and cannot execute outside the governed path. AI assists the operator; governance — not the model — decides what reaches the database.',
  },
]

/* Reusable compliance table renderer — used for the SOC 2, ISO 27001, and CIS mappings */
function ComplianceTable({ rows }) {
  return (
    <div className="glass-card-static p-3 md:p-4 border-feus-500/15 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-xs uppercase tracking-wider text-feus-400 font-semibold w-1/5 align-top">Control</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider text-feus-400 font-semibold w-1/4 align-top">Control Description</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider text-feus-400 font-semibold w-2/5 align-top">FEUS Implementation</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider text-feus-400 font-semibold w-1/4 align-top">Evidence Produced</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.control} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
              <td className="px-4 py-4 align-top text-white font-semibold">{row.control}</td>
              <td className="px-4 py-4 align-top text-gray-400 leading-relaxed">{row.description}</td>
              <td className="px-4 py-4 align-top text-gray-300 leading-relaxed">{row.feus}</td>
              <td className="px-4 py-4 align-top text-gray-400 leading-relaxed">{row.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TrustPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      {/* ─── HERO ─── */}
      <PageHero
        label="Trust & Security"
        title={<>Governed by Design.<br /><span className="gradient-text">Built for Enterprise Review.</span></>}
        subtitle="FEUS is a governed enterprise AI-powered DBA assistant. Every operation passes through a fail-closed, 7-gate governance pipeline before any database action is permitted. This page describes the controls, the architecture, and the framework alignments that make FEUS suitable for review by enterprise security, risk, and audit teams."
      >
        <div className="flex flex-wrap gap-4">
          <CalendlyButton className="btn-accent group" icon={ArrowRight}>
            Request a Security Review
          </CalendlyButton>
          <CTAButton to="/feus-ai" variant="secondary">See the Platform</CTAButton>
        </div>
      </PageHero>

      {/* ─── TRUST HIGHLIGHTS BOX (top of page) ─── */}
      <section className="section-dark pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-6 md:p-8 border-feus-500/20">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="w-5 h-5 text-feus-400" />
                <SectionLabel>Trust Highlights</SectionLabel>
              </div>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {trustHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-200 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 1. EXECUTIVE TRUST STATEMENT ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel>1 · Executive Trust Statement</SectionLabel>
            <h2 className="section-heading text-white mt-3">
              FEUS is governance-first,<br />
              <span className="gradient-text">not AI-first.</span>
            </h2>
            <div className="mt-6 space-y-4 text-gray-300 leading-relaxed">
              <p>
                FEUS exists to make AI-assisted database operations safe enough for regulated and audit-sensitive environments. The platform is built on a fail-closed execution model: if a governance control is unavailable, degraded, or returns an indeterminate result, the operation is denied — never silently allowed. AI capabilities are scoped to assist the operator; they do not have an independent path to the database.
              </p>
              <p>
                Every request — human-issued or model-suggested — is evaluated by a deterministic 7-gate pipeline before a connection is opened. Every decision is written to a hash-chained, append-only audit trail with full attribution. RBAC, dual-identity execution, PII interception, and policy-driven gating are not optional add-ons; they are the only path through the system.
              </p>
              <p>
                FEUS is designed against SOC 2 Trust Services Criteria and ISO 27001 Annex A controls, with a documented control mapping. The platform is intended to give CIOs, CISOs, and security reviewers an AI assistant they can adopt with the same rigour they apply to any other privileged production tool.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 2. CORE SECURITY PRINCIPLES ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="2 · Core Security Principles"
              title="Five Principles That Govern Every Operation"
              subtitle="These are architectural constraints, not configuration options. They cannot be disabled at runtime, deferred, or selectively bypassed."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePrinciples.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 80}>
                <div className="glass-card p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-feus-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 3. GOVERNANCE ARCHITECTURE OVERVIEW (7-GATE PIPELINE) ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="3 · Governance Architecture Overview"
              title={<>The 7-Gate Governance Pipeline<br /><span className="gradient-text">Pre-execution. Deterministic. Fail-closed.</span></>}
              subtitle="Every request — whether issued by a human operator or suggested by an AI component — is processed through the same ordered pipeline. Each gate has a defined input contract, a deterministic decision, and an audit emission. Execution is the final stage, not the first."
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {pipelineGates.map((gate, i) => (
              <AnimatedSection key={gate.gate} delay={i * 60}>
                <div className="glass-card p-6 flex items-start gap-5 group hover:border-feus-500/30 transition-colors duration-300">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-feus-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <gate.icon className="w-6 h-6 text-feus-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-feus-500/60 uppercase tracking-wider mb-1">{gate.gate}</div>
                    <h4 className="text-lg font-semibold text-white mb-1">{gate.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{gate.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
            <div className="mt-10 max-w-3xl mx-auto glass-card-static p-6 border-feus-500/15">
              <h4 className="text-base font-semibold text-white mb-2">Pipeline Properties</h4>
              <ul className="text-sm text-gray-300 space-y-2 leading-relaxed">
                <li><span className="text-feus-400 font-semibold">Pre-execution validation:</span> Gates 1–6 run before any database connection is opened.</li>
                <li><span className="text-feus-400 font-semibold">Policy enforcement checkpoints:</span> Gate 4 (policy) and Gate 5 (PII) produce explicit allow / warn / approve / deny outcomes recorded in the audit chain.</li>
                <li><span className="text-feus-400 font-semibold">Approval flow:</span> When an operation requires human approval, Gate 6 verifies the authorisation record and reviewer identity before Gate 7 may proceed.</li>
                <li><span className="text-feus-400 font-semibold">Post-execution logging:</span> Gate 7 emits the execution result, error class (if any), and rollback state into the same hash-chained audit record opened at Gate 2.</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 4. SECURITY CONTROLS IMPLEMENTED ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="4 · Security Controls Implemented"
              title="Controls by Category"
              subtitle="Each control below is implemented in the platform today and exercised by the executable cohesion scenario referenced in Section 6."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {controlCategories.map((cat, i) => (
              <AnimatedSection key={cat.label} delay={i * 80}>
                <div className="glass-card p-7 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-feus-500/10 flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-feus-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{cat.label}</h3>
                  </div>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 5. COMPLIANCE ALIGNMENT — DETAILED CONTROL MAPPING (audit-review document) ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="5 · Compliance Alignment · Detailed Control Mapping"
              title={<>Audit-Ready Control Mapping<br /><span className="gradient-text">Aligned, Not Certified — Stated Plainly.</span></>}
              subtitle="The tables below provide a control-by-control mapping of FEUS implementations to recognised frameworks, with the evidence that each control produces. The format is suitable for inclusion in internal audit documentation, vendor-risk reviews, and pre-attestation readiness assessments. FEUS does not currently hold certification under any of these frameworks; the language used is intentionally precise."
            />
          </AnimatedSection>

          {/* SOC 2 */}
          <AnimatedSection delay={80}>
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-5 h-5 text-feus-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">5.1 · SOC 2 (Trust Services Criteria)</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-4xl">
                Mapping covers the Common Criteria (CC1–CC9) and the Confidentiality category (C1.1). Each row identifies the criterion, summarises the control intent, describes the FEUS implementation, and lists the evidence artefacts produced for that control.
              </p>
              <ComplianceTable rows={soc2Map} />
            </div>
          </AnimatedSection>

          {/* ISO 27001 */}
          <AnimatedSection delay={160}>
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-feus-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">5.2 · ISO/IEC 27001:2022 — Annex A</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-4xl">
                Mapping covers the Annex A controls most directly engaged by an AI-mediated database operations platform: organisational, people, and technological controls relating to access, privileged operation, data handling, logging, monitoring, change, and supplier management.
              </p>
              <ComplianceTable rows={isoMap} />
            </div>
          </AnimatedSection>

          {/* CIS SQL Server */}
          <AnimatedSection delay={240}>
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-feus-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">5.3 · CIS Microsoft SQL Server Benchmarks</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-4xl">
                Alignment to the CIS Microsoft SQL Server Benchmarks at the section level. FEUS does not replace the customer’s SQL Server hardening responsibilities; it operates within them and adds a governed-execution layer that reinforces several control families (notably authentication, auditing, and application-development practices).
              </p>
              <ComplianceTable rows={cisMap} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={320}>
            <div className="mt-10 max-w-4xl mx-auto text-xs text-gray-500 leading-relaxed text-center">
              References to SOC 2 Trust Services Criteria, ISO/IEC 27001:2022 Annex A controls, and CIS Microsoft SQL Server Benchmarks are provided for control-mapping purposes only. They do not represent or imply certification, attestation, or endorsement by AICPA, ISO, or CIS. Customers are responsible for assessing the suitability of these mappings against their own scope and audit requirements.
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 6. AUDIT & ASSURANCE CAPABILITIES (with live cohesion proof) ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="6 · Audit & Assurance Capabilities"
              title={<>Evidence Is Generated as a Byproduct<br /><span className="gradient-text">of Governed Operation.</span></>}
              subtitle="FEUS does not produce audit evidence on demand; it produces it continuously. Every governance decision and execution outcome is written to a hash-chained, append-only record. Internal audit and compliance teams can verify the chain independently of the runtime."
            />
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <AnimatedSection delay={0}>
              <div className="glass-card p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                  <ScrollText className="w-5 h-5 text-feus-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Audit Readiness</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Logs are structured, queryable, and exportable. Common audit questions — who issued the request, under what role, against which environment, with which policy outcome — are answerable directly from the chain without reconstruction.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="glass-card p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                  <FileCheck2 className="w-5 h-5 text-feus-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Evidence Generation</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Each session produces a complete execution history: gate decisions, policy references, approval records, and execution outcomes. Evidence packs include a hash-chained manifest that can be re-verified at any later point.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="glass-card p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                  <Scale className="w-5 h-5 text-feus-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Compliance Validation</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Customers can use FEUS audit output as a primary evidence source for internal control testing, periodic access reviews, change-management attestation, and SIEM-driven compliance reporting.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Live Cohesion Proof — preserved evidential block */}
          <AnimatedSection delay={240}>
            <div className="glass-card-static p-8 md:p-10 border-feus-500/20">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <SectionLabel>Live Cohesion Proof · Platform v5.2.0</SectionLabel>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mt-2">
                    Structural. Behavioural. Evidential.
                  </h3>
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    Cohesion is verified by an executable scenario (S10 Full Session Audit Trail) that drives a real session through every gate, then asserts 11 invariants across the audit chain. Bypass attempts are independently scanned out of the source. Evidence is hash-chained and reproducible.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">11 / 11</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1 uppercase tracking-wider">S10 Invariants</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">0</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1 uppercase tracking-wider">Net Bypass Findings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">12 / 12</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1 uppercase tracking-wider">Virgin-Env Checks</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Layer 1 — Structural</div>
                        <div className="text-sm text-gray-400">Bootstrap, gates, and the governed executor are the only paths into a database connection. There is no second path.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Layer 2 — Behavioural</div>
                        <div className="text-sm text-gray-400">S10 drives a live multi-operation session and asserts that every required event appears, in the required order, with the required correlation.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Layer 3 — Evidential</div>
                        <div className="text-sm text-gray-400">Bypass scanner, dependency authenticity, and a hash-chained manifest — the evidence pack itself is independently verifiable after the fact.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-feus-400 font-semibold mb-3">Executive Walkthrough</div>
                  <h4 className="text-xl font-semibold text-white mb-3">FEUS AIIA Walkthrough — PDF</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    A 7-section executive packet: architecture, three-layer proof, S10 invariants table, session lifecycle worked example, verdict reading guide, and reproducibility steps. Built directly from the live evidence run, with hash references to the manifest.
                  </p>
                  <a
                    href="/FEUS_AIIA_Walkthrough.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-feus-600 hover:bg-feus-500 text-white font-semibold text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download AIIA Walkthrough (PDF)
                  </a>
                  <div className="mt-5 text-[11px] text-gray-500 font-mono leading-relaxed">
                    Generated from CERT_20260422T195909Z_585A54<br />
                    Manifest hash chain: SHA-256 · immutable · reproducible<br />
                    Confidential — prepared for security review
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 7. DEPLOYMENT SECURITY MODEL ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="7 · Deployment Security Model"
              title="Inside Your Boundary, Under Your Controls"
              subtitle="FEUS is delivered as a deployable platform, not a hosted service that processes customer data on vendor infrastructure. Deployment topology is selected by the customer to fit existing security and data-residency requirements."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedSection delay={0}>
              <div className="glass-card p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-feus-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">On-Premises & Hybrid</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  FEUS runs against SQL Server, Azure SQL, and hybrid estates. The control plane and data plane can be deployed entirely within the customer’s network, with selective integrations to cloud services where the customer has approved them.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="glass-card p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                  <Network className="w-5 h-5 text-feus-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">No Forced Data Movement</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Database queries execute against the customer’s databases over the customer’s network, under the customer’s authentication. The platform does not require egress of customer data, query text, or result sets to vendor infrastructure.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="glass-card p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-feus-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-feus-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Integrates With Existing Boundaries</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  FEUS aligns with existing identity providers, network segmentation, secrets management, monitoring, and SIEM tooling (including integrations with platforms such as Redgate SQL Monitor) rather than introducing a parallel control surface.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 8. SECURE AI OPERATIONS (DIFFERENTIATOR) ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="8 · Secure AI Operations"
              title={<>The Model Does Not Have a Privileged Path<br /><span className="gradient-text">to Your Database.</span></>}
              subtitle="This is the property that distinguishes FEUS from general-purpose AI copilots: AI suggestions are treated as requests, and requests pass through the same governance pipeline as any other operation."
            />
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-6">
            <AnimatedSection delay={0}>
              <div className="glass-card p-7 h-full">
                <h4 className="text-lg font-semibold text-white mb-3">Governed AI Interactions</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Every model-suggested action is converted into a request object that enters the 7-gate pipeline at Gate 1. The model has no out-of-band ability to construct connections, issue queries, or write to the audit chain. AI exists to assist the operator, not to act on the database.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="glass-card p-7 h-full">
                <h4 className="text-lg font-semibold text-white mb-3">Prevention of Unsafe Queries</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Inbound query text — whether typed by a user or proposed by the model — is evaluated for PII exposure, destructive operation classes, and policy violations before any connection is opened. The pipeline produces a deterministic decision recorded in the audit chain.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="glass-card p-7 h-full">
                <h4 className="text-lg font-semibold text-white mb-3">Guardrails Before Tool Execution</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Tool calls invoked by the AI layer (for example, schema inspection, query execution, synthetic-data generation) are gated by the same RBAC, policy, and approval controls that apply to human-issued operations. There is no AI-only fast path.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={240}>
              <div className="glass-card p-7 h-full">
                <h4 className="text-lg font-semibold text-white mb-3">Why This Differs From Typical AI Copilots</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  General-purpose copilots place the model in front of the tool. FEUS places governance in front of the tool, and the model in front of the operator. The result is that AI capability can be expanded over time without expanding the platform’s execution privileges.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 9. ROADMAP & CERTIFICATION POSITIONING ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel>9 · Roadmap & Certification Positioning</SectionLabel>
            <h2 className="section-heading text-white mt-3">
              Controls Are Implemented Today.<br />
              <span className="gradient-text">Certification Is on the Roadmap.</span>
            </h2>
            <div className="mt-6 space-y-4 text-gray-300 leading-relaxed">
              <p>
                FEUS does not currently hold SOC 2 or ISO 27001 certification. We state this plainly because it matters for procurement, vendor risk, and audit-committee review. What is in place today is the underlying control set: fail-closed governance, RBAC with dual-identity execution, PII interception, hash-chained audit, and a documented mapping to recognised frameworks.
              </p>
              <p>
                The certification roadmap covers SOC 2 Type II (Security, Confidentiality, and Availability) and ISO/IEC 27001:2022. Sequencing, observation windows, and the selected auditor are tracked in our internal compliance programme and shared under NDA with prospective enterprise customers on request.
              </p>
              <p>
                Until formal attestation is in place, customers can rely on (a) the implemented controls described on this page, (b) the executable cohesion proof and bypass scan referenced in Section 6, and (c) the AIIA walkthrough document for independent review by their own security and audit teams.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── BONUS B · SECURITY FAQ ─── */}
      <section className="section-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Security FAQ"
              title="Direct Answers to Common Review Questions"
              subtitle="Drafted for security reviewers, vendor-risk teams, and procurement. Each answer is intentionally precise and avoids marketing language."
            />
          </AnimatedSection>

          <div className="space-y-3">
            {securityFaq.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <AnimatedSection key={item.q} delay={i * 50}>
                  <div className={`glass-card overflow-hidden transition-colors ${isOpen ? 'border-feus-500/30' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full flex items-start justify-between gap-4 p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                        <span className="text-base font-semibold text-white">{item.q}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pl-14 text-sm text-gray-300 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── 10. CLOSING STATEMENT + CTA ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <SectionLabel>10 · Closing Statement</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mt-3">
                A Platform Built for<br />
                <span className="gradient-text">Controlled AI Adoption.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                FEUS is intended for organisations that need to introduce AI-assisted database operations without weakening their existing security posture. Governance is the default, fail-closed is the discipline, and the audit trail is the evidence. Controls are implemented today; certification is on a defined roadmap. Reviewers are invited to inspect the architecture, the control mapping, and the executable evidence directly.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Request a Security Review
                </CalendlyButton>
                <CTAButton to="/feus-ai" variant="secondary">Explore the Platform</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
