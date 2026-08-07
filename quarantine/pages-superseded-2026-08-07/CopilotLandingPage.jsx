import { Link } from 'react-router-dom'
import {
  ArrowRight, Brain, Database, Shield, Zap, BarChart3,
  Lock, CheckCircle2, FileSearch, Cpu, Sparkles, Eye,
  Users, Layers, GitBranch, Clock, DollarSign, TrendingUp,
  AlertTriangle, UserX, FileWarning, Gauge, Activity
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider, StatCard, ProblemCard } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SocialShare from '../components/SocialShare'

/* ─────────────────────── PROBLEMS ─────────────────────── */
const problems = [
  {
    icon: UserX,
    title: 'Your DBAs Are Overwhelmed',
    description: '14+ hours per session on manual data prep. Reactive firefighting. Tribal knowledge in one person\'s head. Every test data request is a bottleneck.',
  },
  {
    icon: AlertTriangle,
    title: 'Your AI Has No Guardrails',
    description: 'AI tools with unrestricted production access. No audit trail. No PII masking. One unfiltered query from a compliance incident.',
  },
  {
    icon: FileWarning,
    title: 'Your Test Data Is a Liability',
    description: 'Production copies in dev. Masked data that misses SSNs in audit tables. Your HIPAA officer doesn\'t know yet.',
  },
]

/* ─────────────────────── FEATURES ─────────────────────── */
const features = [
  {
    icon: Brain,
    title: 'FEUS Copilot',
    tagline: 'Your AI command center for database operations.',
    desc: 'Interact naturally. FEUS Copilot understands DBA intent, translates requests into governed operations, and delivers results in business language. Every action is policy-checked, PII-protected, and audit-logged.',
    bullets: ['Natural language interaction', 'Policy-driven workflows', 'Executive-ready reporting', 'Instant health monitoring'],
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: Sparkles,
    title: 'Synthetic Data Generation',
    tagline: 'Production-quality test data. Zero exposure.',
    desc: 'Generate FK-safe, PII-free synthetic datasets on demand. 12,850 rows in 4.7 seconds. Full relational integrity. Zero production data touched.',
    bullets: ['FK-aware topological generation', 'Statistical fidelity preservation', 'PII columns automatically synthesized', '97.3% quality score'],
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: BarChart3,
    title: 'Real-Time ROI',
    tagline: 'Know exactly what FEUS saves — in dollars.',
    desc: 'Every session generates a live ROI dashboard: hours saved, risk events prevented, PII exposures caught, compliance score, and cost avoidance — from actual operations, not projections.',
    bullets: ['Time savings vs. manual effort', 'Risk reduction in dollars', 'Compliance grade with audit trail', 'Board-ready executive reports'],
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-400',
  },
  {
    icon: Shield,
    title: 'Governance & Security',
    tagline: '7-gate governance. The architecture, not a feature.',
    desc: 'Every AI action passes through 7 mandatory governance gates before execution. The platform is designed so that every operation passes through governance before execution.',
    bullets: ['Intent validation & policy check', 'Automatic PII detection & blocking', 'Human-in-the-loop approval chains', 'Immutable hash-chained audit trail'],
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
]

/* ─────────────────────── HOW IT WORKS ─────────────────────── */
const steps = [
  { icon: FileSearch, title: 'Request', desc: 'Natural language input is parsed, validated, and converted into a structured operational intent.', time: 'Instant' },
  { icon: Shield, title: 'Govern', desc: 'Every intent passes through 7 gates: policy engines, PII guardrails, RBAC checks, and approval workflows.', time: '< 1 second' },
  { icon: Cpu, title: 'Execute', desc: 'Approved operations execute with full monitoring, rollback capability, and real-time audit logging.', time: '4.7 seconds' },
  { icon: BarChart3, title: 'Report', desc: 'Results are translated into business context and delivered as executive-ready output with dollar-value ROI.', time: 'Real-time' },
]

/* ─────────────────────── ROI PROOF ─────────────────────── */
const roiMetrics = [
  { icon: Clock, value: '14.36 hrs', label: 'Saved Per Session', detail: 'vs. 14.5 hours manual DBA effort' },
  { icon: DollarSign, value: '$53,500', label: 'Risk Cost Avoided', detail: 'Governance violations + PII exposure prevention' },
  { icon: TrendingUp, value: '99.1%', label: 'Time Improvement', detail: '8.2 minutes vs. 14.5 hours' },
  { icon: Shield, value: 'Grade A', label: 'Compliance Score', detail: '97.6% governance pass rate' },
]

export default function CopilotLandingPage() {
  return (
    <>
      {/* ─── HERO — ROI-FOCUSED ─── */}
      <PageHero
        label="FEUS Copilot"
        title={<>Save 14 Hours Per Session.<br />Prevent $53K in Risk.<br /><span className="gradient-text">See Your ROI in 30 Minutes.</span></>}
        subtitle="FEUS Copilot is the AI-powered data platform that generates governed synthetic data, enforces compliance automatically, and shows you the dollar value of every operation — in real time."
      >
        <div className="flex flex-wrap gap-4">
          <CalendlyButton className="btn-accent group" icon={ArrowRight}>
            See Your ROI in 30 Minutes
          </CalendlyButton>
          <CTAButton to="/pricing" variant="secondary">View Pricing</CTAButton>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-400" />No credit card required</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-400" />Live demo in your environment</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-400" />ROI report included</span>
        </div>
      </PageHero>

      {/* ─── KEY STATS ─── */}
      <section className="section-darker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="14+" label="Hours Saved Per Session" />
            <StatCard value="$53K" label="Avg. Risk Cost Avoided" />
            <StatCard value="97%" label="Governance Compliance" />
            <StatCard value="<5 min" label="To First ROI Report" />
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── THE PROBLEM ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="The Problem"
              title="Your Data Operations Are Costing You More Than You Think"
              subtitle="Manual governance. Unprotected AI. Production data in dev environments. Every week you wait costs time, money, and risk."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 100}>
                <ProblemCard icon={p.icon} title={p.title} description={p.description} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── VALUE PROP — WHAT FEUS DELIVERS ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-8 md:p-12 border-feus-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-feus-500/5 rounded-full blur-[100px]" />
              <div className="relative">
                <SectionLabel>The FEUS Difference</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  AI + Governed Synthetic Data + Real-Time ROI<br />
                  <span className="gradient-text">= Decision Intelligence</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl">
                  FEUS Copilot doesn't just generate data or answer questions. It <span className="text-violet-400 font-semibold">governs every operation</span>, <span className="text-emerald-400 font-semibold">protects every PII column</span>, and <span className="text-amber-400 font-semibold">quantifies every dollar of value</span> — so your team works faster while your executives see proof.
                </p>
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
                    <Brain className="w-6 h-6 text-violet-400 mb-3" />
                    <h4 className="text-base font-semibold text-white mb-2">AI That Understands Your Data</h4>
                    <p className="text-sm text-gray-400">Schema analysis, PII detection, and synthetic data generation — all through natural language.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <Shield className="w-6 h-6 text-emerald-400 mb-3" />
                    <h4 className="text-base font-semibold text-white mb-2">Governance by Architecture</h4>
                    <p className="text-sm text-gray-400">7 mandatory gates. No bypass. Governance pipeline is fail-closed. Compliance is structural, not optional.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <BarChart3 className="w-6 h-6 text-amber-400 mb-3" />
                    <h4 className="text-base font-semibold text-white mb-2">ROI You Can Prove</h4>
                    <p className="text-sm text-gray-400">Every session produces a dollar-value ROI report from actual operations. Not estimates. Not projections.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FEATURES ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Platform Capabilities"
              title="Four Capabilities. One Governed Platform."
              subtitle="Every capability is production-grade, connected through the same governance and audit framework, and accessible through the FEUS Copilot Chat Interface."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 100}>
                <div className="glass-card p-8 md:p-10 h-full group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-feus-400 font-medium mb-3">{f.tagline}</p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">{f.desc}</p>
                  <div className="space-y-2">
                    {f.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{b}</span>
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

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="How It Works"
              title="Request → Govern → Execute → Report"
              subtitle="Every operation follows the same governed pipeline — from a natural language request to executive-ready output."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 100}>
                <div className="glass-card p-8 h-full text-center group">
                  <div className="w-14 h-14 rounded-xl bg-feus-500/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <s.icon className="w-7 h-7 text-feus-400" />
                  </div>
                  <div className="text-xs font-bold text-feus-500/40 uppercase tracking-wider mb-2">Step {i + 1}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{s.desc}</p>
                  <span className="text-xs font-mono text-accent-400">{s.time}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── LIVE ROI PROOF ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Proven ROI"
              title={<>Real Numbers. From a Real Session.<br /><span className="gradient-text">Not a Projection.</span></>}
              subtitle="These metrics were generated from a single 8.2-minute FEUS Copilot session — analyzing 7 tables, generating 12,850 rows of synthetic data, and producing a full compliance audit trail."
            />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {roiMetrics.map((m, i) => (
              <AnimatedSection key={m.label} delay={i * 100}>
                <div className="glass-card p-8 h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-feus-500/10 flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-6 h-6 text-feus-400" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{m.value}</div>
                  <div className="text-sm font-semibold text-white mb-2">{m.label}</div>
                  <p className="text-xs text-gray-500">{m.detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={200}>
            <div className="mt-12 glass-card-static p-8 font-mono text-sm relative overflow-hidden max-w-3xl mx-auto">
              <div className="absolute top-0 right-0 w-48 h-48 bg-feus-500/5 rounded-full blur-[60px]" />
              <div className="relative space-y-1 text-gray-300 text-xs">
                <p className="text-feus-400 text-sm mb-3">{'>'} Show me my session ROI</p>
                <p className="text-white font-semibold">FEUS Copilot — Session ROI Dashboard</p>
                <p className="mt-2">⏱️  FEUS session: 8.2 min | Manual estimate: 14.5 hrs | <span className="text-accent-400">Saved: 14.36 hrs (99.1%)</span></p>
                <p>🛡️  Ops blocked: 3 | PII cols protected: 5 | <span className="text-accent-400">Cost avoided: $53,500</span></p>
                <p>📋  Governance: 97.6% | Grade: A | <span className="text-accent-400">DBA cost saved: $1,974.50</span></p>
                <p className="text-gray-500 mt-3 text-[10px]">All metrics audit-derived. Every number traces to an auditable event.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── SOCIAL PROOF ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Built by Operators"
              title={<>15+ Years of Enterprise<br /><span className="gradient-text">Data Operations Leadership</span></>}
              subtitle="FEUS wasn't conceived in a lab. It was built by a team with CDO/CTO-level experience across healthcare, financial services, aviation, and SaaS."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '3,150+', label: 'SQL Instances Managed' },
              { value: '32+', label: 'Enterprise Clients Served' },
              { value: '15+', label: 'Years in Data Operations' },
              { value: '$3.2M', label: 'Technology Budgets Led' },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 80}>
                <div className="text-3xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 text-sm text-gray-400">{s.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── PRICING PREVIEW ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Pricing"
              title="Transparent Pricing. Measurable Value."
              subtitle="Every FEUS plan delivers governed AI operations with real-time ROI tracking. Choose the tier that fits your team."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Starter', price: '$2,500', period: '/month', desc: 'Up to 3 users, 1 environment, 100K rows/month', highlight: false },
              { name: 'Professional', price: '$7,500', period: '/month', desc: 'Up to 15 users, 5 environments, 1M rows/month', highlight: true, badge: 'Most Popular' },
              { name: 'Enterprise', price: 'Custom', period: '', desc: 'Unlimited users, environments, and synthetic data', highlight: false },
            ].map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 100}>
                <div className={`glass-card p-8 h-full text-center relative ${tier.highlight ? 'border-feus-500/40 ring-1 ring-feus-500/20' : ''}`}>
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full bg-feus-500 text-white shadow-lg shadow-feus-500/30">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white mt-2">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1 justify-center">
                    <span className="text-3xl font-bold gradient-text">{tier.price}</span>
                    {tier.period && <span className="text-gray-400 text-sm">{tier.period}</span>}
                  </div>
                  <p className="mt-3 text-sm text-gray-400">{tier.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={200}>
            <div className="mt-8 text-center">
              <CTAButton to="/pricing" variant="primary">View Full Pricing & Packages</CTAButton>
              <p className="mt-3 text-xs text-gray-500">All plans include 7-gate governance, PII protection, and audit trails. Annual billing saves 15%.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FINAL CTA ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <SectionLabel>See It Live</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                See Your ROI<br />
                <span className="gradient-text">in 30 Minutes</span>
              </h2>
              <p className="mt-6 text-lg text-gray-400">
                Book a live demo with your own data schema. We'll generate governed synthetic data, run compliance checks, and show you the exact dollar value FEUS delivers — in a single session.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Book Your ROI Demo
                </CalendlyButton>
                <CTAButton to="/pricing" variant="secondary">View Pricing</CTAButton>
              </div>
              <p className="mt-4 text-sm text-gray-500">No commitment. No credit card. ROI report included with every demo.</p>
              <div className="mt-10">
                <SocialShare
                  url="https://feuselectronicsgroup.com/copilot"
                  title="FEUS Copilot — See Your Data Operations ROI in 30 Minutes"
                  description="Governed AI that generates synthetic data, enforces compliance, and proves ROI in real time."
                  layout="horizontal"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
