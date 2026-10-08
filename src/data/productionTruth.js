import snapshot from './product-status.public.json' with { type: 'json' }

export const PRODUCTION_TRUTH = snapshot
export const HOSTED_RUNTIME = snapshot.hosted_runtime
export const MODEL_QUALIFICATION =
  'FEUS.ai routes each request to an eligible model from its catalog of Microsoft Foundry deployments, ' +
  'or to the in-process deterministic engine when no model is needed. Model access is approved per tenant and per environment, ' +
  'and frontier models need explicit permission and budget. Per-turn costs are estimates from published model rates, not invoices.'