// FEUS.ai published price book (owner directed 2026-10-08).
// Mirrors the distribution repository's docs/commercialization/PACKAGES_AND_ECONOMICS.md.
// USD, exclusive of taxes. A signed customer proposal sets final terms.

export const PLATFORM_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$2,500',
    period: '/month',
    summary: 'For teams starting governed AI operations on one environment.',
    modelClasses: ['Economy'],
    includedUsage: '$150 of model usage / month',
    features: [
      'Up to 3 users',
      '1 database environment',
      'Governed cloud workbench with Microsoft Entra ID sign-in',
      'FEUS Auto model routing across Economy models',
      'Policy, PII protection and human approval controls',
      'Audit trail with routing and cost evidence',
      'Email support',
      'Monthly value report',
    ],
    cta: 'Request an intro',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$7,500',
    period: '/month',
    summary: 'For data teams scaling governed operations across environments.',
    highlight: true,
    badge: 'Recommended for teams',
    modelClasses: ['Economy', 'Balanced'],
    includedUsage: '$750 of model usage / month',
    features: [
      'Up to 15 users',
      'Up to 5 database environments',
      'FEUS Auto routing across Economy and Balanced models',
      'Custom policy rules and PII catalog',
      'Production approval workflows',
      'Hash-chained audit trail',
      'Priority support',
      'Quarterly business review',
    ],
    cta: 'Book a demo',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    summary: 'For organization-wide governed AI operations with premium and frontier models.',
    modelClasses: ['Economy', 'Balanced', 'Premium', 'Frontier'],
    includedUsage: 'Committed model usage pool',
    features: [
      'Organization-wide users and environments, per contract',
      'All model classes, including Premium and Frontier',
      'Dedicated account team',
      'Custom integrations and workflows',
      'Executive value reporting',
      'On-site onboarding and training',
      'Annual security review',
    ],
    cta: 'Contact sales',
  },
]

export const MODEL_CLASSES = [
  { name: 'Economy', models: 'GPT-4.1 mini · GPT-5 mini · GPT-5.6 Luna', use: 'High-volume conversation, summaries and classification' },
  { name: 'Balanced', models: 'GPT-4.1 · GPT-5.4 mini · Kimi K2.6 · MAI-Thinking-1', use: 'Analysis, tool use and structured reasoning' },
  { name: 'Premium', models: 'GPT-5.6 Terra', use: 'Complex multi-step engineering work' },
  { name: 'Frontier', models: 'GPT-5.6 Sol · GPT-5.5 · Claude Opus 5.5', use: 'The hardest reasoning tasks, with explicit tenant permission' },
]

export const USAGE_TERMS = [
  'FEUS Auto routes every request to the lowest-cost eligible model that meets the task’s quality and policy requirements.',
  'Usage beyond your included amount is metered monthly at the Microsoft Foundry list price of the model used, plus a 20% governance and routing fee.',
  'Every turn records its estimated cost, and tenant budgets cap monthly and frontier spend.',
]

export const ADD_ONS = [
  { name: 'Premium & Frontier model access', price: 'From $1,500/mo', detail: 'Professional add-on. Includes $1,000 of Premium and Frontier usage per month, metered thereafter.' },
  { name: 'Extended synthetic data', price: 'From $1,200/mo', detail: 'An additional 500K governed synthetic rows per month with foreign-key safety and PII protection.' },
  { name: 'Executive value reports', price: 'From $800/mo', detail: 'Monthly executive summaries of measured and estimated value, each figure labelled by its basis.' },
  { name: 'Custom integrations', price: 'From $3,500 one-time', detail: 'Connect FEUS to your ticketing, CI/CD or data pipelines, scoped per integration.' },
  { name: 'DBA consulting', price: '$275/hr', detail: 'Senior DBA architects for optimization, migration planning and operational reviews.' },
]

export const SERVICE_PACKAGES = [
  { name: 'FEUS implementation', price: 'From $15,000', duration: '2–4 weeks', deliverables: ['Environment assessment and readiness review', 'FEUS deployment and configuration', 'Governance policy setup (PII catalog, policy rules)', 'Team onboarding (up to 10 users)', 'Value baseline report'] },
  { name: 'Data modernization', price: 'From $35,000', duration: '4–8 weeks', deliverables: ['Database estate assessment', 'Schema profiling and dependency mapping', 'Governed data pipeline design', 'Compliance gap review against your frameworks', 'Executive roadmap'] },
  { name: 'Synthetic data enablement', price: 'From $12,000', duration: '1–2 weeks', deliverables: ['Schema analysis and foreign-key mapping', 'Synthetic data profile configuration', 'PII column rules', 'Bulk generation run (up to 5M rows)', 'Data quality validation report'] },
  { name: 'Value & optimization program', price: 'From $8,000/quarter', duration: 'Ongoing, quarterly', deliverables: ['Quarterly value analysis and executive report', 'Governance posture review', 'Policy rule optimization', 'Model usage and cost optimization', 'Strategic recommendations'] },
]

export const PRICING_NOTES = [
  'Prices in USD, exclusive of taxes. Final terms are set in your signed proposal.',
  'Every engagement starts with an intro call and discovery; a 14-day guided evaluation follows readiness and onboarding.',
  'Invoiced by FEUS Electronics Group. No automatic billing.',
]
