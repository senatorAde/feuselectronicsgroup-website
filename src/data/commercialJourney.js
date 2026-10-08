export const JOURNEY_CALLS = [
  { title: 'Call 1 · Intro', timing: 'Approximately 20–30 minutes', detail: 'Understand the outcome, decision makers, existing estate and delivery preference. Agree whether a deeper evaluation is useful; no target access is required.' },
  { title: 'Call 2 · Discovery & fit', timing: 'Approximately 30–60 minutes', detail: 'Review one bounded use case, baseline evidence, data sensitivity, delivery route, constraints and commercial expectations. Scope users, resources and entitlements together.' },
  { title: 'Call 3 · Readiness & onboarding', timing: 'Approximately 60–90 minutes', detail: 'Review your customer-specific readiness pack: identity, tenant isolation, target permissions, privacy, model budgets, approval owners, audit and rollback. The trial starts only after onboarding is complete.' },
  { title: 'Call 4 · Value & next decision', timing: 'Around trial day 12–14', detail: 'Review results against the agreed baseline. Choose a paid package, an approved extension, or a clean offboarding. No automatic billing or silent conversion.' },
]

export const READINESS_PACK = [
  ['Customer & owners', 'Customer/tenant reference, sponsor, customer administrator, operational owner, security/privacy reviewer and commercial approver; contact channels and responsibilities.'],
  ['Intent & baseline', 'One agreed problem, scope, exclusions, baseline collection method, success criteria and measurement period. Value is measured against your own baseline.'],
  ['Route & capability', 'Hosted browser or Expert installed route, the capabilities in scope and the acceptance checks for that route.'],
  ['Identity & targets', 'Authorized identities, effective privileges, target references and validation, environment context, tenant isolation and least privilege. Never submit credentials through the website.'],
  ['Approvals & safety', 'Action-specific approvals, operation-bound confirmations, review/expiry rules, PII controls, approved data boundaries, fail-closed decisions and escalation contacts.'],
  ['Models & budgets', 'Approved models for each environment, privacy restrictions, routing preferences, spend limits and who can change them. Frontier models need explicit permission and budget.'],
  ['Trial & entitlements', 'Negotiated users, resources, workloads, support, entitlements, the agreed 14-day term, activation authority and the activation timestamp recorded at onboarding.'],
  ['Evidence & offboarding', 'Audit access, acceptance checklist, reproducible verification, value review, customer consent for conversion, renewal/extension approvals, revocation, retained records and rollback/offboarding plan.'],
]

export const COMPONENT_POSTURE = [
  ['Governed SQL gateway', 'Available by engagement', 'Delivered through the Expert / VS Code path with an authorized identity and a qualified target.'],
  ['Identity, policy, approval, PII & audit', 'Available', 'Applied on every governed route; wiring and privileges are confirmed for your targets during onboarding.'],
  ['Hosted browser & Entra sign-in', 'Available', 'Production service on Microsoft Azure. Access is granted per organisation through Microsoft Entra ID.'],
  ['Model catalog & routing', 'Available', 'Microsoft Foundry catalog routed by the FEUS Policy Router. Models are approved per tenant and per environment.'],
  ['Customer lifecycle & readiness pack', 'Available by engagement', 'Readiness, activation and commercial approvals run in the governed backend; the website is information and contact only.'],
  ['Lead intake & scheduling', 'Available', 'Inquiries arrive by email; scheduling links appear when an event is configured.'],
  ['Specialist integrations & automation', 'Preview / roadmap by capability', 'See the capability register for each integration. Oracle and ITSM connectors are in preview through scoped engagements.'],
]

export const USE_CASE_STORIES = [
  {
    id: 'sql', title: 'A DBA investigates a slow workload', route: 'Expert route · governed SQL gateway',
    steps: [
      'Intent · A DBA asks for a bounded read-only health assessment on an authorized target.',
      'Govern · The governed gateway checks identity, target, policy, PII, action-specific approvals and audit readiness.',
      'Execute · An approved diagnostic request runs through the SQL gateway. This walkthrough illustrates the flow; it does not connect to a database.',
      'Verify · The scoped result and audit evidence are compared, and any proposed change is reviewed before execution.',
      'Measure Value · Diagnostic effort, reproducible latency observations and avoided rework are compared with the agreed baseline.',
    ],
  },
  {
    id: 'hosted', title: 'An enterprise team adopts the hosted route', route: 'Hosted route · production service on Azure',
    steps: [
      'Intent · A sponsor asks for a capability briefing with sample data before granting customer access.',
      'Govern · Tenant, Entra identity, approved models, privacy boundary and budgets are configured.',
      'Execute · Users send requests in the browser; FEUS routes each turn to an eligible model and applies policy and approvals.',
      'Verify · Routing, approvals and audit records are reviewed for each turn.',
      'Measure Value · Task completion, reviewer effort, policy clarity and spend are recorded against the agreed baseline.',
    ],
  },
  {
    id: 'change', title: 'An operations owner considers a change', route: 'Expert route · approval-led change',
    steps: [
      'Intent · Propose a bounded maintenance action with target, identity, expected outcome and rollback.',
      'Govern · Obtain risk-appropriate operation-bound approval; confirm plan hash, identity, target and expiry. The website cannot approve it.',
      'Execute · Permitted execution runs only through the governed gateway; missing readiness blocks the operation.',
      'Verify · Review audit outcome and post-change checks; stop or roll back within the approved plan if criteria fail.',
      'Measure Value · Compare verified completion and rework against the agreed baseline.',
    ],
  },
]
