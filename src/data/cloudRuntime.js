/**
 * Controlled claim source for the FEUS Cloud Runtime product surface.
 *
 * Every statement in this file is traceable to the verified 5.3 cloud release
 * or to a live probe of the running deployment. Nothing here may be widened
 * without new release evidence.
 *
 * Rules for editing this file:
 *  - The runtime is deployed as a cloud evaluation surface with a declared
 *    environment of TST. Never describe it as a production surface.
 *  - The activated model set is proposed and not ratified, and no PROD model
 *    eligibility exists. Both facts must survive every rewrite.
 *  - Cost figures are estimated from published unit rates, never billed
 *    actuals.
 *  - Alerting is deployed and delivery-verified, and response is expert-guided
 *    under the engagement model. Nothing here may state a response time or an
 *    availability commitment: neither has been measured or contracted.
 *
 * scripts/validate-public-claims.mjs pins these properties. Breaking one
 * fails the build rather than shipping a softened claim.
 */

/** Where a signed-in operator reaches the runtime. */
export const LAUNCH_URL = 'https://app.feuselectronicsgroup.com'

export const CLOUD_RUNTIME = {
  name: 'FEUS Cloud Runtime',
  appUrl: LAUNCH_URL,
  releaseVersion: '5.3.0-enterprise.1',
  releaseRevision: '78ef0630650f41ddd72fd7eb3df55ed42e5bc562',
  releaseTag: 'dist/5.3.0-enterprise.1-cloud-runtime-azure-verified',
  verifiedOn: '2026-09-08',
  declaredEnvironment: 'TST',
  hosting: 'Azure Container Apps, East US 2, single replica',
  headline: 'FEUS.ai runs in the browser as a governed cloud runtime',
  summary:
    'The FEUS Cloud Runtime is deployed on Azure and reachable from a browser. ' +
    'An operator signs in with a Microsoft Entra ID account, sends a turn, and ' +
    'watches FEUS classify it, choose an eligible model, run it, and record the ' +
    'result in a hash-linked audit chain. The deployment declares the TST ' +
    'environment; it is a governed evaluation surface, not a production service.',
  availabilitySummary:
    'Use FEUS Auto from a browser to coordinate specialist agents, select an eligible model, apply policy and approval controls, and retain audit and cost evidence for every turn.',
  qualification:
    'Scope: the runtime declares the TST environment. The activated model set ' +
    'is proposed and not ratified, and no PROD model eligibility exists, so a ' +
    'PROD request finds no eligible model and is refused. Cost is estimated ' +
    'from published unit rates rather than billed actuals. Alerting is ' +
    'deployed and delivery-verified, and response is expert-guided under the ' +
    'engagement model, but there is no availability commitment because no ' +
    'response time has been measured or contracted.',
}

/**
 * What a browser user actually sees. Each entry corresponds to a panel that
 * exists in the shipped workbench, not to a roadmap intention.
 */
export const RUNTIME_SURFACES = [
  {
    title: 'Sign in with Microsoft Entra ID',
    detail:
      'The runtime holds no client secret and stores no password. It validates ' +
      'the caller against Entra ID and refuses a request that arrives with no ' +
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
      'Five operator-facing modes constrain model selection. They narrow the ' +
      'candidate set; none of them widens eligibility.',
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
      'readable from the runtime, so an evaluation has a spend record instead ' +
      'of a surprise.',
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
      'The FEUS Policy Router classifies the turn and picks the cheapest ' +
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
    'The Microsoft Foundry Model Router is not active in this deployment. ' +
    'Deployment capacity for it was zero in every region probed, so FEUS ' +
    'policy routing is the only selection authority in use.',
  activatedModels: [
    'deterministic (no model contacted)',
    'foundry.gpt-4.1',
    'foundry.gpt-4.1-mini',
    'foundry.gpt-5-mini',
  ],
  modelQualification:
    'The three Microsoft Foundry deployments above are activated for the TST ' +
    'environment only. The activated set is proposed and not ratified, and no ' +
    'PROD model eligibility exists.',
}

/**
 * The governed path a single turn takes. Ordered, and each step is implemented
 * in the deployed runtime.
 */
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
    step: 'Execute',
    detail:
      'The assigned agent runs the turn, with any tool call passing through ' +
      'the tool gateway rather than around it.',
  },
  {
    step: 'Record',
    detail:
      'Routing decision, token counts, estimated cost, and an evidence digest ' +
      'are appended to the hash-linked audit chain and the FinOps ledger.',
  },
]

/** What the 5.3 cloud release actually verified. */
export const RUNTIME_EVIDENCE = [
  {
    label: 'Cloud acceptance checks',
    value: '31 of 31',
    detail:
      'Run against both the Azure origin and the public hostname. Two of the ' +
      'checks pass only when FEUS refuses: a PROD request must find no ' +
      'eligible model, and an unauthenticated call must be rejected.',
  },
  {
    label: 'Automated test suite',
    value: '3,165 tests',
    detail: 'Collected and passing at the verified revision.',
  },
  {
    label: 'Readiness dependencies',
    value: '5 of 5 satisfied',
    detail:
      'Durable table state, inference provider, identity, configuration, and ' +
      'audit sink all report satisfied on the running revision.',
  },
  {
    label: 'Secrets in the runtime',
    value: 'None',
    detail:
      'The container authenticates to Azure with a managed identity and holds ' +
      'no provider key or client secret.',
  },
]

/**
 * W-12: the path a new client follows. This is deliberately honest about which
 * steps FEUS performs for the client and which the client performs itself.
 */
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
      'organization. Unlisted capabilities remain unavailable by default.',
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
      'negative-path checks before any activation decision.',
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
    q: 'Do I need VS Code or a local install to try FEUS?',
    a:
      'No. The cloud runtime is a browser surface. Sign in with a Microsoft ' +
      'Entra ID account and send a turn. The VS Code and command-line paths ' +
      'remain available for teams that prefer them.',
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
      'Three Microsoft Foundry deployments and a deterministic path that ' +
      'contacts no model. The activated set is proposed and not ratified, is ' +
      'scoped to the TST environment, and carries no PROD eligibility.',
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
      'No. The deployment declares the TST environment and is offered as a ' +
      'governed evaluation surface. Alerting is deployed and its delivery has ' +
      'been verified, and response is expert-guided by the engagement team, ' +
      'but there is no availability commitment: no response time has been ' +
      'measured or contracted.',
  },
  {
    q: 'How is a tenant separated from another tenant?',
    a:
      'Each tenant has its own conversation history, audit chain, approval ' +
      'record, and spend ledger, keyed by tenant in durable storage and ' +
      'enforced on every read.',
  },
]

/** What is live, what is preview, what is governed — stated once. */
export const RUNTIME_SCOPE = [
  {
    heading: 'Live services',
    items: [
      'Browser sign-in against Microsoft Entra ID, with unauthenticated calls refused.',
      'Governed turns routed by the FEUS Policy Router to a Microsoft Foundry model.',
      'Durable conversation history, audit chain, approval evidence, and spend ledger.',
      'Per-turn cost, token, latency, and routing disclosure.',
    ],
  },
  {
    heading: 'Private preview details',
    items: [
      'Model-provider integrations: governed invocation is confined to TST, the activated model set is not ratified, and no PROD model eligibility exists.',
      'Agent capabilities beyond the verified evaluation scope remain preview and are labelled individually on the platform status page.',
    ],
  },
  {
    heading: 'Governed rather than optional',
    items: [
      'Agent assignment: decided by the FEUS Supervisor from classified intent, with no client-side override.',
      'Approvals: bound to the operation plan hash and granted through the governed path, not from the browser.',
      'Environment declaration: an input to eligibility, never a bypass.',
      'Widening scope: a governed decision recorded as evidence, not a setting.',
    ],
  },
]
