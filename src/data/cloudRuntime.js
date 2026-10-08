/**
 * Controlled claim source for the FEUS Cloud Runtime product surface.
 *
 * Public pages present the current product scope confidently. Internal
 * release evidence (revisions, digests, signing runs, acceptance records)
 * lives in the distribution repository's production-truth record, not here.
 *
 * Rules for editing this file:
 *  - Current runtime facts derive from the pinned canonical observation in
 *    product-status.public.json (via productionTruth.js).
 *  - Model access is approved per tenant and per environment; catalog
 *    membership never substitutes for tenant or operation approval.
 *  - Cost figures are estimated from published unit rates, never billed
 *    actuals.
 *  - Nothing here may state an availability or response-time commitment.
 *
 * scripts/validate-public-claims.mjs pins these properties.
 */

import { HOSTED_RUNTIME, MODEL_QUALIFICATION } from './productionTruth.js'

/** Where a signed-in operator reaches the runtime. */
export const LAUNCH_URL = 'https://app.feuselectronicsgroup.com'

/**
 * Binding to the canonical observation. Used by the claims gate to prove the
 * public surface derives from the pinned record; not rendered on any page.
 */
export const LATEST_DEPLOYED_RECORD = {
  sourceRevision: HOSTED_RUNTIME.source_commit,
  signedRevision: HOSTED_RUNTIME.signed_source_commit,
  revision: HOSTED_RUNTIME.active_revision,
  imageDigest: HOSTED_RUNTIME.image_digest,
  checkpointUtc: HOSTED_RUNTIME.last_verified_at,
  trafficPercentAtCheckpoint: HOSTED_RUNTIME.traffic_percent,
}

/** Customer-facing model names for the configured Microsoft Foundry deployments. */
const MODEL_DISPLAY_NAMES = {
  'gpt-4.1': 'GPT-4.1',
  'gpt-4.1-mini': 'GPT-4.1 mini',
  'gpt-5-mini': 'GPT-5 mini',
  'gpt-5.4-mini': 'GPT-5.4 mini',
  'gpt-5.5': 'GPT-5.5',
  'gpt-5.6-luna': 'GPT-5.6 Luna',
  'gpt-5.6-terra': 'GPT-5.6 Terra',
  'gpt-5.6-sol': 'GPT-5.6 Sol',
  'Kimi-K2.6': 'Kimi K2.6',
  'MAI-Thinking-1': 'MAI-Thinking-1',
  'claude-opus-5-5': 'Claude Opus 5.5',
}

export const MODEL_CATALOG = HOSTED_RUNTIME.configured_deployments.map(
  (id) => MODEL_DISPLAY_NAMES[id] ?? id,
)

export const CLOUD_RUNTIME = {
  name: 'FEUS Cloud Runtime',
  appUrl: LAUNCH_URL,
  releaseVersion: HOSTED_RUNTIME.application_version,
  releaseLabel: 'October 2026 release',
  releaseRevision: LATEST_DEPLOYED_RECORD.sourceRevision,
  verifiedOn: HOSTED_RUNTIME.last_verified_at,
  environmentLabel: 'Production service on Microsoft Azure · Microsoft Entra ID sign-in',
  hosting: 'Microsoft Azure Container Apps, East US 2',
  headline: 'FEUS.ai runs in the browser as a governed cloud service',
  summary:
    'FEUS.ai runs in production on Microsoft Azure and is used from the browser. ' +
    'An operator signs in with Microsoft Entra ID, sends a request, and FEUS ' +
    'classifies it, chooses an eligible model, applies policy and approvals, ' +
    'and records the result in a hash-linked audit chain.',
  availabilitySummary:
    'Sign in with Microsoft Entra ID and send a request. FEUS Auto classifies it, selects an eligible Microsoft Foundry model, applies your tenant policy, approvals and budgets, and records routing, audit and estimated-cost evidence for every turn.',
  qualification:
    MODEL_QUALIFICATION + ' Operational alerting is in place. FEUS does not publish ' +
    'an availability or response-time service level; operating terms are agreed in each engagement.',
}

/**
 * What a browser user actually sees. Each entry corresponds to a panel that
 * exists in the shipped workbench.
 */
export const RUNTIME_SURFACES = [
  {
    title: 'Sign in with Microsoft Entra ID',
    detail:
      'The runtime holds no client secret and stores no password. It validates ' +
      'every caller against Entra ID and refuses a request that arrives with no ' +
      'token or an invalid one.',
  },
  {
    title: 'Conversations that survive a restart',
    detail:
      'Conversation history, the routing audit chain, the FinOps ledger, and ' +
      'approval evidence are written to Azure Table Storage using a managed ' +
      'identity, so a container restart does not erase them.',
  },
  {
    title: 'Routing mode selector',
    detail:
      'Five operator-facing modes shape model selection. They narrow the ' +
      'set of eligible models; none of them widens eligibility.',
  },
  {
    title: 'Agent roster without a client-side override',
    detail:
      'The FEUS Supervisor assigns the agent from the classified intent. The ' +
      'browser cannot pick the agent, because picking the agent would mean ' +
      'picking the privileges attached to it.',
  },
  {
    title: 'Per-turn decision inspector',
    detail:
      'Every turn reports its status, the model used, the routing authority, ' +
      'the assigned agent, latency, tokens in and out, estimated cost and cost ' +
      'basis, tools used, the audit reference, an evidence digest, and a ' +
      'correlation identifier.',
  },
  {
    title: 'Human-in-the-loop holds',
    detail:
      'When a turn requires approval, FEUS holds it and names the rule that ' +
      'held it. Approval is bound to the operation plan hash and is granted ' +
      'through the governed approval path — never from a browser button.',
  },
  {
    title: 'FinOps ledger and spend report',
    detail:
      'Token consumption and estimated cost accumulate per tenant and are ' +
      'readable from the runtime, so every team has a clear spend record.',
  },
  {
    title: 'Audit lookup by correlation',
    detail:
      'Any turn can be resolved back to its hash-linked routing audit record ' +
      'using the correlation identifier shown in the inspector.',
  },
]

/**
 * The operator-facing model selection modes, exactly as the runtime enumerates
 * them. FEUS Auto is the platform default and is evaluated per turn.
 */
export const ROUTING_MODES = [
  {
    id: 'AUTO',
    label: 'FEUS Auto',
    isDefault: true,
    summary:
      'The FEUS Policy Router classifies the turn and picks the most economical ' +
      'eligible model that meets the requirements it derived.',
  },
  {
    id: 'ECONOMY',
    label: 'Economy',
    isDefault: false,
    summary:
      'Biases selection toward the lowest estimated cost among models that are ' +
      'already eligible for the turn.',
  },
  {
    id: 'BALANCED',
    label: 'Balanced',
    isDefault: false,
    summary:
      'Trades estimated cost against capability within the eligible set.',
  },
  {
    id: 'QUALITY',
    label: 'Quality',
    isDefault: false,
    summary:
      'Prefers the strongest eligible model for the classified task rather ' +
      'than the cheapest.',
  },
  {
    id: 'EXPLICIT',
    label: 'Explicit',
    isDefault: false,
    summary:
      'The operator pins a specific model. The pin still has to clear ' +
      'eligibility; a pinned model that fails policy is refused, not used.',
  },
]

export const ROUTING_AUTHORITY = {
  statement:
    'The FEUS Policy Router is the routing authority. It runs before any model ' +
    'is contacted, because asking a model whether a request is safe to send to ' +
    'a model is not a control.',
  modeRule:
    'A routing mode expresses a preference inside the eligible set. It never ' +
    'adds a model that policy excluded, and it never removes a required ' +
    'approval.',
  foundryRouterNote:
    'FEUS policy routing is the single selection authority; the Microsoft Foundry Model Router is not used.',
  activatedModels: ['Deterministic engine (no model contacted)', ...MODEL_CATALOG],
  modelQualification: MODEL_QUALIFICATION,
}

/** The governed path a single turn takes, in order. */
export const TURN_PIPELINE = [
  {
    step: 'Classify',
    detail:
      'The turn is classified for sensitivity and task class before any model ' +
      'is chosen. Over-classifying costs money; under-classifying costs data.',
  },
  {
    step: 'Check eligibility',
    detail:
      'The Platform Constitution decides which models may see this turn in ' +
      'this environment. Ineligibility is returned with a reason.',
  },
  {
    step: 'Route',
    detail:
      'The FEUS Policy Router selects from the eligible set, honouring the ' +
      'operator routing mode.',
  },
  {
    step: 'Hold if approval is required',
    detail:
      'A turn that needs a human decision stops here and names the rule that ' +
      'stopped it.',
  },
  {
    step: 'Infer within scope',
    detail:
      'An eligible model generates the response. Any proposed agent or tool action ' +
      'passes its own governed execution checks before it runs.',
  },
  {
    step: 'Record',
    detail:
      'Routing decision, token counts, estimated cost, and an evidence digest ' +
      'are appended to the hash-linked audit chain and the FinOps ledger.',
  },
]

/** Logical cloud path, in order. */
export const CLOUD_ARCHITECTURE = [
  { title: 'Public website', detail: 'Explains FEUS.ai, arranges guided demonstrations and links to the authenticated workbench.' },
  { title: 'Azure workbench', detail: 'The browser workbench, served from Azure Container Apps in East US 2 as the FEUS.ai production service.' },
  { title: 'Microsoft Entra ID', detail: 'Authenticates the operator. Missing or invalid credentials are refused, and access is granted per organisation.' },
  { title: 'Tenant authorization', detail: 'Checks the authorized tenant and operator scope before any tenant-bound conversation or evidence record is read.' },
  { title: 'Classification', detail: 'Classifies task and data sensitivity before provider selection; environment context is part of eligibility.' },
  { title: 'FEUS Policy Router', detail: 'Applies eligibility, routing preference and budget constraints. A preference cannot override policy; when nothing is eligible the turn is refused, and required approvals always apply.' },
  { title: 'Eligible model / provider', detail: MODEL_QUALIFICATION },
  { title: 'Governed agent / tool boundary', detail: 'Agent assignment and permitted tools stay governed. Each proposed tool action carries its own target, identity, policy and approval checks.' },
  { title: 'Durable storage', detail: 'Azure Table Storage retains tenant-bound conversations, routing audit, approval evidence and estimated-cost records using a managed identity.' },
]

/** Service facts shown on the runtime page. */
export const RUNTIME_FACTS = [
  {
    label: 'Hosting',
    value: 'Microsoft Azure',
    detail: 'Azure Container Apps in East US 2, with durable state in Azure Table Storage.',
  },
  {
    label: 'Sign-in',
    value: 'Microsoft Entra ID',
    detail: 'Every API call requires an authenticated caller; unauthenticated requests are refused.',
  },
  {
    label: 'Model catalog',
    value: `${MODEL_CATALOG.length} Microsoft Foundry models`,
    detail: 'Plus the in-process deterministic engine. Access is approved per tenant and per environment.',
  },
  {
    label: 'Secrets in the runtime',
    value: 'None',
    detail:
      'The container authenticates to Azure with a managed identity and holds ' +
      'no provider key or client secret.',
  },
]

/** The path a new client follows, with the owner of each step named. */
export const ONBOARDING_STEPS = [
  {
    number: '01',
    title: 'Organization',
    owner: 'FEUS and client together',
    detail:
      'Create the customer organization record, agree the operating scope, and ' +
      'identify the outcomes that will define a successful onboarding.',
  },
  {
    number: '02',
    title: 'Users and roles',
    owner: 'Client identity administrator',
    detail:
      'The client consents to the FEUS application in their Microsoft Entra ' +
      'directory, nominates the people who may sign in, and assigns operator, ' +
      'approver, and administrator roles. FEUS never receives a password.',
  },
  {
    number: '03',
    title: 'Environment',
    owner: 'Client, confirmed by FEUS',
    detail:
      'Register each operating environment and designate it as development, ' +
      'test, or production so policy can evaluate the intended target.',
  },
  {
    number: '04',
    title: 'Connections',
    owner: 'Client system owner',
    detail:
      'Register customer systems by reference and validate network reachability ' +
      'and effective permissions without placing credentials in the browser.',
  },
  {
    number: '05',
    title: 'Agents and tools',
    owner: 'FEUS operator and client owner',
    detail:
      'Select the specialist agents and governed tools permitted for the ' +
      'organization. Unlisted capabilities stay off by default.',
  },
  {
    number: '06',
    title: 'Governance and approvals',
    owner: 'Client, configured by FEUS',
    detail:
      'Define risk rules, designate human approvers, and confirm which actions ' +
      'require authorization before execution.',
  },
  {
    number: '07',
    title: 'Model and budget policy',
    owner: 'Client administrator',
    detail:
      'Choose permitted models, routing boundaries, and spend limits. FEUS Auto ' +
      'uses only the eligible set defined for the organization.',
  },
  {
    number: '08',
    title: 'Validation',
    owner: 'FEUS and client together',
    detail:
      'Run onboarding, connectivity, identity, policy, budget, isolation, and ' +
      'negative-path checks before activation.',
  },
  {
    number: '09',
    title: 'Go live',
    owner: 'Authorized client administrator',
    detail:
      'Review the validation evidence and activate the approved scope. Any ' +
      'later expansion is reviewed as a new governed change.',
  },
]

/** Plain answers to what a prospective client asks first. */
export const ONBOARDING_FAQ = [
  {
    q: 'Do I need VS Code or a local install to use FEUS?',
    a:
      'No. The cloud runtime is used from the browser: sign in with a Microsoft ' +
      'Entra ID account your organisation has been granted and send a request. ' +
      'The VS Code and command-line paths remain available for teams that prefer them.',
  },
  {
    q: 'What does FEUS see of my data?',
    a:
      'Only what the declared environment permits for the classified turn. ' +
      'Classification runs before a model is selected, and the environment ' +
      'declaration decides how much of a payload may leave the boundary.',
  },
  {
    q: 'Which models are used?',
    a:
      `The catalog includes ${MODEL_CATALOG.join(', ')}. ` + MODEL_QUALIFICATION,
  },
  {
    q: 'Can I pin a model myself?',
    a:
      'Yes, using Explicit mode. The pin is still checked against eligibility ' +
      'and is refused if policy excludes it.',
  },
  {
    q: 'How do I know what a turn cost?',
    a:
      'Every turn reports tokens in and out and an estimated cost, and the ' +
      'totals accumulate in a per-tenant ledger. Cost basis is labelled ' +
      'estimated because it is derived from published unit rates rather than ' +
      'an invoice.',
  },
  {
    q: 'What happens when FEUS refuses?',
    a:
      'It tells you which rule refused and what would have to change. A ' +
      'refusal is a designed outcome and is recorded in the audit chain like ' +
      'any other turn.',
  },
  {
    q: 'Is this a production service?',
    a:
      'Yes. FEUS.ai runs as a production service on Microsoft Azure. Each ' +
      'customer is onboarded with its own tenant, environments, approval owners ' +
      'and budgets. Operational alerting is in place; FEUS does not publish an ' +
      'availability or response-time service level.',
  },
  {
    q: 'How is a tenant separated from another tenant?',
    a:
      'Each tenant has its own conversation history, audit chain, approval ' +
      'record, and spend ledger, keyed by tenant in durable storage and ' +
      'enforced on every read.',
  },
]

/** What is live, what is in preview, and what is governed. */
export const RUNTIME_SCOPE = [
  {
    heading: 'Live today',
    items: [
      'Browser sign-in with Microsoft Entra ID; unauthenticated calls are refused.',
      'Governed turns routed by the FEUS Policy Router to an eligible Microsoft Foundry model or the deterministic engine.',
      'Durable conversation history, audit chain, approval evidence, and spend ledger.',
      'Per-turn cost, token, latency, and routing disclosure.',
    ],
  },
  {
    heading: 'In preview, by engagement',
    items: [
      'Oracle and ITSM/service-desk connectors are available in preview through a scoped engagement.',
      'Governed SQL Server operations are delivered through the Expert / VS Code path; the hosted runtime does not execute customer SQL.',
      'Automatic billing and additional data engines are on the roadmap.',
    ],
  },
  {
    heading: 'Governed by design',
    items: [
      MODEL_QUALIFICATION,
      'Agent assignment is decided by the FEUS Supervisor from classified intent, with no client-side override.',
      'Approvals are bound to the operation plan hash and granted through the governed path, never from the browser.',
      'Widening scope is a governed decision recorded as evidence, not a setting.',
    ],
  },
]
