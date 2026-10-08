// Candidate documentation, not a runtime grant or an attestation of deployment.
export const COMMERCIAL_CANDIDATE = {
  status: 'Installed candidate; live deployment unverified',
  reconciliation: 'The 2026-10-07 catalog records owner-ratified Foundry candidates. Eligibility still depends on tenant, environment, privacy, capability and budget checks. Product-status metadata is stale and conflicts with that catalog; reconciliation and deployment evidence are required. Historical hosted checkpoints are not current candidate acceptance.',
}

export const JOURNEY_CALLS = [
  { title: 'Call 1 · Intro', timing: 'Approximately 20–30 minutes', detail: 'Understand the outcome, decision makers, existing estate and delivery preference. Agree whether a deeper evaluation is useful; no target access is required.' },
  { title: 'Call 2 · Discovery & fit', timing: 'Approximately 30–60 minutes', detail: 'Review one bounded use case, baseline evidence, data sensitivity, delivery route, constraints and commercial expectations. Scope users, resources and entitlements together.' },
  { title: 'Call 3 · Readiness & onboarding', timing: 'Approximately 60–90 minutes', detail: 'Review the customer-specific pack, confirm identity, tenant isolation, target permissions, privacy, model budgets, approval owners, audit and rollback. Missing prerequisites hold activation; there is no trial clock before onboarding.' },
  { title: 'Call 4 · Value & next decision', timing: 'Around trial day 12–14', detail: 'Review verified outcomes against the agreed baseline. Choose conversion, extension subject to approval, or stop and offboard. No automatic billing or silent conversion.' },
]

export const READINESS_PACK = [
  ['Customer & owners', 'Customer/tenant reference, sponsor, customer administrator, operational owner, security/privacy reviewer and commercial approver; contact channels and responsibilities.'],
  ['Intent & baseline', 'One agreed problem, scope, exclusions, baseline collection method, success criteria and measurement period. No guaranteed ROI or invented performance uplift.'],
  ['Route & capability', 'Hosted browser or Expert installed route, exact candidate revision, capability constraints and route-specific acceptance evidence. No inference-to-execution equivalence.'],
  ['Identity & targets', 'Authorized identities, effective privileges, target references and validation, environment context, tenant isolation and least privilege. Never submit credentials through the website.'],
  ['Approvals & safety', 'Action-specific approvals, operation-bound confirmations, review/expiry rules, PII controls, approved data boundaries, fail-closed decisions and escalation contacts.'],
  ['Models & budgets', 'Eligible owner-ratified catalog candidates, tenant/environment/privacy restrictions, model routing, spend limits and who can change them. Catalog ratification alone is not runtime access.'],
  ['Trial & entitlements', 'Negotiated users, resources, workloads, support, entitlements, agreed 14-day term, activation authority, readiness evidence and execution-anchored activation timestamp.'],
  ['Evidence & offboarding', 'Audit access, acceptance checklist, reproducible verification, value review, customer consent for conversion, renewal/extension approvals, revocation, retained records and rollback/offboarding plan.'],
]

export const COMPONENT_POSTURE = [
  ['Governed SQL gateway', 'Available in controlled legacy SQL evidence', 'Target-specific readiness and authorized identity required; not proof of hosted live SQL.'],
  ['Identity, policy, approval, PII & audit', 'Available core with constraints', 'Verify wiring, effective privileges and audit health on the selected route before execution.'],
  ['Hosted browser & Entra entry', 'Limited · historical deployment checkpoints', 'Current candidate live deployment and starter acceptance are not attested. Customer targets are not enabled by a demo.'],
  ['Model catalog & routing', 'Limited · owner-ratified Foundry candidates', 'Tenant, environment, privacy, capability and budget checks remain required; stale product-status metadata conflicts.'],
  ['Commercial lifecycle & customer pack', 'Installed candidate · deployment unverified', 'Readiness/activation and commercial approvals belong to the governed backend. The website is documentation and lead intake, not an authority source.'],
  ['Lead delivery & scheduling', 'Configuration dependent', 'Server-side provider, privacy and shared abuse controls must be enabled. Calendly requires an operator-configured valid event. No durable CRM is implemented here.'],
  ['Specialist integrations & autonomous operation', 'Limited / roadmap by capability', 'Consult the published capability register. Diagram placement does not establish implementation, certification or autonomous production authority.'],
]

export const USE_CASE_STORIES = [
  {
    id: 'sql', title: 'A DBA investigates a slow workload', route: 'Controlled legacy SQL evidence',
    steps: [
      'Intent · A DBA asks for a bounded read-only health assessment on an authorized target.',
      'Govern · Verify selected identity, target, policy, PII, action-specific approvals and audit readiness through the governed gateway.',
      'Execute · Illustrate an approved diagnostic request routed through the SQL gateway. This walkthrough does not connect or run SQL.',
      'Verify · Compare the scoped result and audit evidence, record limitations and review any proposed change before execution.',
      'Measure Value · Agree a before/after diagnostic effort baseline, reproducible latency observations and avoided rework. No uplift is promised.',
    ],
  },
  {
    id: 'hosted', title: 'An enterprise team evaluates the hosted route', route: 'Hosted candidate / historical TST evidence',
    steps: [
      'Intent · A sponsor requests a synthetic-input capability briefing before granting customer access.',
      'Govern · Qualify tenant, Entra identity, eligible model, privacy boundary, budgets and exact deployed revision.',
      'Execute · Illustrate a browser inference turn after scoped access. Model inference is not live SQL or tool execution.',
      'Verify · Check route/revision acceptance and visible decisions against evidence. Historical TST evidence does not attest the current candidate.',
      'Measure Value · Record task completion, reviewer effort, policy clarity and spend using an agreed baseline. Customer acceptance is still required.',
    ],
  },
  {
    id: 'change', title: 'An operations owner considers a change', route: 'Expert route · approval-led illustration',
    steps: [
      'Intent · Propose a bounded maintenance action with target, identity, expected outcome and rollback.',
      'Govern · Obtain risk-appropriate operation-bound approval; confirm plan hash, identity, target and expiry. The website cannot approve it.',
      'Execute · Illustrate permitted execution only through the wired governed gateway. Missing readiness blocks the operation.',
      'Verify · Review audit outcome and post-change checks; stop or roll back within the approved plan if criteria fail.',
      'Measure Value · Compare verified completion and rework against the agreed baseline. Simulation results are not customer production outcomes.',
    ],
  },
]
