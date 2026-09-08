/** Guided evaluation offer; not runtime authorization or a production claim. */
export const LIVE_DEMO = {
  title: 'Guided live Azure demonstration',
  label: 'LIVE DEMO · TST · SYNTHETIC INPUTS · NOT PRODUCTION',
  summary: 'Explore FEUS.ai, a product of FEUS Electronics Group, in a guided live Azure TST session with Microsoft Foundry inference and synthetic inputs. No customer systems are connected.',
  access: 'A FEUS engineer guides the session. Anyone operating the workbench needs authorized Microsoft Entra ID access and tenant authorization arranged in advance; signing in does not create access.',
  budget: 'Agree the session scope, token and spend budgets before starting. Budget, eligibility, policy and required approval checks remain in force; no eligible model means refusal.',
  boundary: 'Live model inference is not evidence of live SQL or tool execution, customer integration, or full production qualification. No customer database, ITSM tenant, identity provider, secret store, or cloud resource is connected during the demo.',
  cost: 'Token costs are estimates from published unit rates, not billed actuals. A count of frontier models avoided is a routing indicator, not measured savings. ROI figures use disclosed assumptions and are not customer results.',
}