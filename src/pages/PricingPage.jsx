import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, Shield, Database, BarChart3, Sparkles,
  Zap, Building2, Users, Crown, HelpCircle, Cpu, Globe
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider, StatCard } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

/* ─────────────────────── PRICING TIERS ─────────────────────── */
const tiers = [
  {
    name: 'Starter',
    price: '$2,500',
    period: '/month',
    description: 'For teams getting started with governed AI data operations.',
    icon: Zap,
    color: 'border-blue-500/30',
    highlight: false,
    features: [
      'FEUS Copilot — up to 3 users',
      '1 database environment',
      'Synthetic data generation — up to 100K rows/month',
      '7-gate governance pipeline',
      'PII detection & masking',
      'Standard audit trail',
      'Email support',
      'Monthly ROI report',
    ],
    cta: 'Start Free Pilot',
  },
  {
    name: 'Professional',
    price: '$7,500',
    period: '/month',
    description: 'For data teams scaling governed operations across environments.',
    icon: Building2,
    color: 'border-feus-500/40',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'FEUS Copilot — up to 15 users',
      'Up to 5 database environments',
      'Synthetic data generation — up to 1M rows/month',
      '7-gate governance pipeline',
      'Advanced PII catalog + custom rules',
      'Hash-chained audit trail',
      'Priority support (4-hour SLA)',
      'Real-time ROI dashboard',
      'Custom policy rules',
      'Quarterly business review',
    ],
    cta: 'Book a Demo',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring unlimited scale, custom integrations, and dedicated support.',
    icon: Crown,
    color: 'border-amber-500/30',
    highlight: false,
    features: [
      'FEUS Copilot — unlimited users',
      'Unlimited database environments',
      'Unlimited synthetic data generation',
      'Full governance suite + custom gates',
      'Enterprise PII catalog + compliance mapping',
      'Immutable audit trail + export API',
      'Dedicated account team',
      'Live ROI dashboard + executive reports',
      'Custom integrations & workflows',
      'On-site onboarding & training',
      'SLA-backed uptime guarantee',
      'Annual security review',
    ],
    cta: 'Contact Sales',
  },
]

/* ─────────────────────── ADD-ONS ─────────────────────── */
const addons = [
  {
    icon: Sparkles,
    name: 'Extended Synthetic Data',
    price: 'From $1,200/mo',
    desc: 'Scale beyond your tier limit. Additional 500K rows/month with full FK-safety and PII protection.',
  },
  {
    icon: BarChart3,
    name: 'Executive ROI Dashboard',
    price: 'From $800/mo',
    desc: 'Live, shareable ROI dashboard for leadership. Auto-generated executive summaries after every session.',
  },
  {
    icon: Cpu,
    name: 'Custom Integrations',
    price: 'From $3,500 one-time',
    desc: 'Connect FEUS to your CI/CD, ticketing, or data pipelines. Includes ADO, ServiceNow, and Jira connectors.',
  },
  {
    icon: Users,
    name: 'DBA Consulting Hours',
    price: '$275/hr',
    desc: 'Direct access to senior DBA architects for optimization, migration planning, and operational reviews.',
  },
]

/* ─────────────────────── SERVICE PACKAGES ─────────────────────── */
const packages = [
  {
    name: 'FEUS Implementation Package',
    price: 'From $15,000',
    duration: '2–4 weeks',
    ideal: 'Teams adopting FEUS for the first time',
    deliverables: [
      'Environment assessment & readiness audit',
      'FEUS platform deployment & configuration',
      'Governance policy setup (PII catalog, policy rules)',
      'Team onboarding & training (up to 10 users)',
      'First synthetic data generation run',
      'ROI baseline report',
    ],
  },
  {
    name: 'Data Modernization Package',
    price: 'From $35,000',
    duration: '4–8 weeks',
    ideal: 'Organizations modernizing legacy data environments',
    deliverables: [
      'Full database estate assessment',
      'Schema profiling & dependency mapping',
      'Synthetic data strategy & execution plan',
      'Governed data pipeline design',
      'Compliance gap analysis (SOX, GDPR, HIPAA)',
      'Executive ROI projection & roadmap',
    ],
  },
  {
    name: 'Synthetic Data Enablement',
    price: 'From $12,000',
    duration: '1–2 weeks',
    ideal: 'Teams needing production-grade test data fast',
    deliverables: [
      'Schema analysis & FK mapping',
      'Custom synthetic data profile configuration',
      'PII column identification & synthetic rules',
      'Bulk generation run (up to 5M rows)',
      'Data quality validation report',
      'Team handoff & documentation',
    ],
  },
  {
    name: 'ROI & Optimization Program',
    price: 'From $8,000/quarter',
    duration: 'Ongoing quarterly',
    ideal: 'Enterprises tracking continuous AI operations value',
    deliverables: [
      'Quarterly ROI analysis & executive report',
      'Governance posture assessment',
      'Policy rule optimization',
      'Performance benchmarking',
      'Strategic recommendations',
      'C-suite presentation deck',
    ],
  },
]

/* ─────────────────────── FAQ ─────────────────────── */
const faqs = [
  {
    q: 'Can I try FEUS before committing to a plan?',
    a: 'Yes. Every engagement starts with a free 30-minute ROI demo using your own schema. No credit card, no commitment. You\'ll see real results before you spend a dollar.',
  },
  {
    q: 'How is pricing determined for Enterprise?',
    a: 'Enterprise pricing is value-based and depends on the number of environments, data volume, compliance requirements, and integration complexity. We\'ll scope it together during discovery.',
  },
  {
    q: 'What does "governed synthetic data" mean?',
    a: 'Every synthetic data generation request passes through our 7-gate governance pipeline — including PII detection, policy enforcement, and approval checks — before a single row is created. Zero production data is ever accessed.',
  },
  {
    q: 'Do you support on-premises deployment?',
    a: 'Yes. FEUS can be deployed on-premises, in your Azure tenant, or as a hybrid model. Enterprise tier includes custom deployment architecture.',
  },
  {
    q: 'What compliance standards does FEUS support?',
    a: 'FEUS is built with SOX, GDPR, and HIPAA compliance patterns. Our hash-chained audit trail, PII protection, and approval workflows are designed to meet enterprise audit requirements.',
  },
  {
    q: 'What\'s included in the ROI report?',
    a: 'Every ROI report includes: time saved vs. manual DBA effort, risk events prevented, PII exposures caught, compliance score, cost avoidance in dollars, and an executive summary.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <PageHero
        label="Pricing"
        title={<>Transparent Pricing.<br /><span className="gradient-text">Measurable Value.</span></>}
        subtitle="Every FEUS plan delivers governed AI operations with real-time ROI tracking. Choose the tier that fits your team — and see the value from day one."
      >
        <div className="flex flex-wrap gap-4">
          <CalendlyButton className="btn-accent group" icon={ArrowRight}>
            See Your ROI in 30 Minutes
          </CalendlyButton>
          <CTAButton to="/contact" variant="secondary">Contact Sales</CTAButton>
        </div>
      </PageHero>

      {/* ─── PRICING TIERS ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 100}>
                <div className={`relative glass-card p-8 h-full flex flex-col ${
                  tier.highlight ? 'border-feus-500/40 ring-1 ring-feus-500/20' : ''
                }`}>
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full bg-feus-500 text-white shadow-lg shadow-feus-500/30">
                      {tier.badge}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-feus-500/20 to-feus-600/5 flex items-center justify-center mb-5`}>
                    <tier.icon className="w-6 h-6 text-feus-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                    {tier.period && <span className="text-gray-400 text-sm">{tier.period}</span>}
                  </div>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{tier.description}</p>
                  <div className="mt-6 space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    {tier.highlight ? (
                      <CalendlyButton className="btn-accent w-full text-center justify-center" icon={ArrowRight}>
                        {tier.cta}
                      </CalendlyButton>
                    ) : tier.name === 'Enterprise' ? (
                      <CTAButton to="/contact" variant="primary" className="w-full text-center justify-center">{tier.cta}</CTAButton>
                    ) : (
                      <CalendlyButton className="btn-secondary w-full text-center justify-center" icon={ArrowRight}>
                        {tier.cta}
                      </CalendlyButton>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
            <p className="mt-8 text-center text-sm text-gray-500">
              All plans include 7-gate governance, PII protection, and audit trails. Annual billing available (save 15%).
            </p>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── ADD-ONS ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Add-Ons"
              title="Scale What Matters Most"
              subtitle="Extend your FEUS plan with purpose-built add-ons for synthetic data, reporting, integrations, and expert consulting."
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {addons.map((a, i) => (
              <AnimatedSection key={a.name} delay={i * 80}>
                <div className="glass-card p-6 h-full">
                  <a.icon className="w-6 h-6 text-feus-400 mb-4" />
                  <h4 className="text-base font-semibold text-white mb-1">{a.name}</h4>
                  <div className="text-sm font-medium text-accent-400 mb-3">{a.price}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{a.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── SERVICE PACKAGES ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Professional Services"
              title="Productized Service Packages"
              subtitle="Fixed-scope, fixed-price engagements designed to accelerate time-to-value. No open-ended consulting."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, i) => (
              <AnimatedSection key={pkg.name} delay={i * 100}>
                <div className="glass-card p-8 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                    <span className="text-sm font-semibold text-accent-400 whitespace-nowrap">{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-5 text-xs text-gray-400">
                    <span className="px-2.5 py-1 rounded-full bg-feus-500/10 border border-feus-500/20 text-feus-400">{pkg.duration}</span>
                    <span>Ideal for: {pkg.ideal}</span>
                  </div>
                  <div className="space-y-2">
                    {pkg.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FAQ ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="FAQ"
              title="Common Questions"
              subtitle="Everything you need to know about FEUS pricing, deployment, and compliance."
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 60}>
                <div className="glass-card p-6">
                  <h4 className="text-base font-semibold text-white flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="mt-3 pl-8 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FINAL CTA ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Not sure which plan?<br />
                <span className="gradient-text">See your ROI first.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-400">
                Book a free 30-minute demo. We'll show you the exact ROI FEUS delivers for your environment — then recommend the right plan.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Book Your ROI Demo
                </CalendlyButton>
                <CTAButton to="/contact" variant="secondary">Talk to Sales</CTAButton>
              </div>
              <p className="mt-4 text-sm text-gray-500">No commitment. No credit card. ROI report included.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
