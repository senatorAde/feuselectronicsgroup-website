import snapshot from './product-status.public.json' with { type: 'json' }

export const PRODUCTION_TRUTH = snapshot
export const HOSTED_RUNTIME = snapshot.hosted_runtime
export const MODEL_QUALIFICATION =
  'Eleven Microsoft Foundry deployments are configured in the dated live TST observation. ' +
  'The catalog is owner-ratified and includes PROD eligibility, but tenant- and environment-scoped approval, ' +
  'data boundaries, frontier permission and budgets remain required. This observation does not attest customer PROD inference. ' +
  'Cost is estimated, not billed. Inference is not customer SQL or tool execution.'
