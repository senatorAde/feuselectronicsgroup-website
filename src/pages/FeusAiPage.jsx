import { Link } from 'react-router-dom'
import {
  ArrowRight, Brain, Database, Shield, Cloud, Zap, BarChart3,
  Workflow, Lock, Cpu, Server, CheckCircle2, Eye, FileSearch,
  GitBranch, Layers, Bot, Globe, Activity, Target, Award,
  AlertTriangle, Users, UserX, FileWarning, Gauge, Sparkles,
  Terminal, MessageSquare, Code2, Monitor, ShieldCheck, Fingerprint
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider, StatCard, ProblemCard } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SocialShare from '../components/SocialShare'
import LeaveReview from '../components/LeaveReview'
import { useROIStats } from '../hooks/useROIStats'

/* ─────────────────────── PROBLEM ─────────────────────── */
const problems = [
  {
    icon: UserX,
    title: 'Your DBAs Are Overwhelmed',
    description: 'Reactive firefighting. No time for optimization. Tribal knowledge locked in one person\'s head. Every incident response is manual, every report is late, every escalation is a scramble.',
  },
  {
    icon: AlertTriangle,
    title: 'Your AI Has No Guardrails',
    description: 'Copilots with unrestricted access to production data. No audit trail. No PII masking. No policy enforcement. One unfiltered query away from a compliance incident.',
  },
  {
    icon: FileWarning,
    title: 'Your Governance Is Manual',
    description: 'Policy enforcement by spreadsheet. Access control by email thread. Compliance by hope. When auditors come, you spend weeks gathering evidence that should be automatic.',
  },
]

/* ─────────────────────── CORE MODULES ─────────────────────── */
const modules = [
  {
    icon: Database,
    title: 'Governed DBA Assistant',
    desc: 'An AI agent for database health assessment, query optimization, and maintenance operations — governed by policy engines, protected by PII guardrails, and controlled by human-in-the-loop approval.',
    features: ['AI-powered query analysis & optimization', 'Automated health monitoring & alerting', 'Policy-driven maintenance workflows', 'Executive-ready reporting'],
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: Sparkles,
    title: 'Synthetic Data Engine',
    desc: 'Generate statistically faithful test and development data without ever exposing production records. Maintains relational integrity, respects foreign keys, and produces realistic datasets on demand.',
    features: ['FK-aware data generation', 'Statistical fidelity preservation', 'Zero production data exposure', 'On-demand dataset creation'],
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Activity,
    title: 'Operational Intelligence',
    desc: 'Continuous monitoring, anomaly detection, and automated diagnostics that transform raw database telemetry into actionable operational insights — with business-context translation.',
    features: ['Real-time anomaly detection', 'Automated diagnostic workflows', 'Business-context translation', 'Predictive health scoring'],
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: Target,
    title: 'Decision Intelligence',
    desc: 'Transform technical operations data into executive-ready business intelligence. Risk scoring, impact analysis, and strategic recommendations — without exposing raw SQL or technical complexity.',
    features: ['Risk scoring & impact analysis', 'Executive-ready summaries', 'Strategic recommendations', 'Cost-impact correlation'],
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-400',
    coming: true,
  },
]

/* ─────────────────────── HOW IT WORKS ─────────────────────── */
const flowSteps = [
  { icon: FileSearch, title: 'Request', desc: 'Natural language input is parsed, validated, and converted into a structured operational intent.' },
  { icon: Shield, title: 'Govern', desc: 'Every intent passes through policy engines, PII guardrails, and RBAC checks before execution.' },
  { icon: Cpu, title: 'Execute', desc: 'Approved operations are executed with full monitoring, rollback capability, and real-time logging.' },
  { icon: BarChart3, title: 'Report', desc: 'Results are translated into business context, audit-logged, and delivered as executive-ready output.' },
]

/* ─────────────────────── GOVERNANCE PILLARS ─────────────────────── */
const governance = [
  { icon: Shield, title: 'Policy Engine', desc: 'Configurable rules that validate every operation against organizational policies before execution. Block, warn, or require approval — automatically.' },
  { icon: Lock, title: 'PII Guardrails', desc: 'Automatic detection and masking of personally identifiable information across all queries, results, and AI outputs — before data leaves the system.' },
  { icon: Eye, title: 'Full Audit Trail', desc: 'Every decision, recommendation, and action is hash-chained and immutably logged with complete provenance. Compliance-ready documentation generated automatically.' },
  { icon: Users, title: 'Role-Based Access', desc: 'Granular RBAC with AAD integration. Environment-aware permissions ensure dev, staging, and production are fully isolated.' },
  { icon: GitBranch, title: 'Human-in-the-Loop', desc: 'AI recommends. Humans approve. Multi-tier approval chains with role-based routing, escalation policies, and time-bound authorization.' },
  { icon: Layers, title: 'Data Classification', desc: 'Automated sensitivity labeling aligned to your organizational taxonomy. Classification happens before data enters any workflow.' },
]

/* ─────────────────────── BUSINESS IMPACT ─────────────────────── */
const impacts = [
  {
    icon: Shield,
    title: 'Reduce Operational Risk',
    desc: 'Every AI action is policy-checked, PII-protected, and auditable. Zero unprotected operations means zero compliance surprises.',
    stat: 'Zero',
    statLabel: 'Unprotected operations',
  },
  {
    icon: Users,
    title: 'Lower Staffing Pressure',
    desc: 'AI handles routine monitoring, diagnostics, and reporting. Your engineers focus on strategic projects — not firefighting.',
    stat: 'Up to 80%',
    statLabel: 'Routine tasks automated',
  },
  {
    icon: Gauge,
    title: 'Accelerate Compliance',
    desc: 'Audit-ready documentation generated automatically. When auditors come, evidence is already organized, timestamped, and complete.',
    stat: 'Minutes',
    statLabel: 'Not weeks, for audit prep',
  },
]

export default function FeusAiPage() {
  const { stats } = useROIStats()

  return (
    <>
      {/* ─── HERO ─── */}
      <PageHero
        label="FEUS.ai Platform"
        title={<>Save 14 Hours Per Session.<br />Prevent $53K in Risk.<br /><span className="gradient-text">See Your ROI in 30 Minutes.</span></>}
        subtitle="FEUS Copilot is the AI-powered data platform that generates governed synthetic data, enforces compliance automatically, and shows you the dollar value of every operation — in real time. No unprotected AI. No manual audit prep. No guesswork."
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
            <StatCard value={stats.time_saved_hours} label="Hours Saved Per Session" />
            <StatCard value={stats.risk_cost_avoided} label="Avg. Risk Cost Avoided" />
            <StatCard value={stats.governance_compliance_pct} label="Governance Compliance" />
            <StatCard value={stats.time_to_first_roi} label="To First ROI Report" />
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── OPERATING MODEL CALLOUT ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-8 md:p-12 border-feus-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-feus-500/5 rounded-full blur-[100px]" />
              <div className="relative">
                <SectionLabel>Operating Model</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Your Data. Your Environment.<br />
                  <span className="gradient-text">Our Governance & Intelligence.</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl">
                  FEUS Copilot is your <span className="text-violet-400 font-semibold">conversational AI interface</span> for enterprise data operations — establishing a <span className="text-emerald-400 font-semibold">governed operational foundation</span> and delivering <span className="text-amber-400 font-semibold">real-time decision intelligence</span> with every interaction.
                </p>
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
                    <Terminal className="w-6 h-6 text-violet-400 mb-3" />
                    <h4 className="text-base font-semibold text-white mb-2">FEUS Copilot Is the Interface</h4>
                    <p className="text-sm text-gray-400">Your team interacts with FEUS through a conversational AI copilot. No new portals, no new logins, no training overhead.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <Shield className="w-6 h-6 text-emerald-400 mb-3" />
                    <h4 className="text-base font-semibold text-white mb-2">Governance Is the Architecture</h4>
                    <p className="text-sm text-gray-400">Every request passes through policy engines, PII guardrails, and approval workflows before reaching your environment.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <Brain className="w-6 h-6 text-amber-400 mb-3" />
                    <h4 className="text-base font-semibold text-white mb-2">Intelligence Delivers Results</h4>
                    <p className="text-sm text-gray-400">AI agents analyze, optimize, detect anomalies, and generate governed insights — translated into business-ready outputs.</p>
                  </div>
                </div>
                <div className="mt-8">
                  <CTAButton to="/how-it-works" variant="primary">See the Full Architecture</CTAButton>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── THE PROBLEM ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="The Problem"
              title="Enterprise Data Operations Are Broken"
              subtitle="Your data is growing. Your team isn't. And the tools you're using weren't built for governance, auditability, or AI-safe operations."
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

      {/* ─── WHY THIS APPROACH ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel>Why This Approach Exists</SectionLabel>
              <h2 className="section-heading text-white">
                Built by Operators,<br />
                <span className="gradient-text">Not Researchers</span>
              </h2>
              <div className="mt-8 space-y-5 text-gray-400 leading-relaxed">
                <p>
                  FEUS.ai wasn't conceived in a lab. It was born from 15+ years of managing enterprise database operations — 3,150+ SQL instances across 32+ clients, $3.2M technology budgets, and engineering organizations of 60 people. We've operated at CDO and CTO level in healthcare, financial services, aviation, and SaaS.
                </p>
                <p>
                  We saw the same pattern everywhere: AI tools that had unrestricted access to production data. Governance bolted on as an afterthought. DBAs overwhelmed with manual work while executives waited weeks for audit evidence. So we built governance into the foundation — policy engines, PII guardrails, approval workflows, and tamper-evident audit trails — not as features, but as the architecture itself.
                </p>
                <p>
                  That's why FEUS.ai has 30+ verified production modules, 8 governance components, and a complete synthetic data provisioning suite. And it's why FEUS Copilot is designed to integrate into your existing workflows — so your team gets governed AI intelligence without changing how they work.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── PLATFORM ARCHITECTURE ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel>Platform Architecture</SectionLabel>
                <h2 className="section-heading text-white">
                  Built on<br />
                  <span className="gradient-text">Enterprise-Grade Technology</span>
                </h2>
                <p className="mt-6 text-gray-400 leading-relaxed">
                  FEUS.ai is built on Microsoft's enterprise technology stack — Azure, SQL Server, Power Platform, and Azure AI — combined with our proprietary governance layer, automation frameworks, and AI orchestration engine. The FEUS Copilot serves as the intelligent, conversational interface for all operations.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'FEUS Copilot — conversational AI interface',
                    'Microsoft Azure & SQL Server ecosystem',
                    'Azure AI & OpenAI integration',
                    'Proprietary governance & policy engine',
                    'MCP-compliant tool orchestration',
                    'Enterprise-grade audit & compliance layer',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatedSection delay={100}>
                <div className="glass-card-static p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-feus-500/5 rounded-full blur-[60px]" />
                  <div className="relative space-y-4">
                    {[
                      { label: 'Interaction Layer', items: 'FEUS Copilot · Natural Language · Chat Interface', color: 'border-violet-500/30' },
                      { label: 'AI Layer', items: 'Azure OpenAI · Custom Agents · Governed Pipeline', color: 'border-feus-500/30' },
                      { label: 'Governance Layer', items: 'Policy Engine · PII Guards · Audit · RBAC', color: 'border-accent-500/30' },
                      { label: 'Orchestration', items: 'MCP Server · Workflow Engine · Approval Chains', color: 'border-blue-500/30' },
                      { label: 'Data Platform', items: 'SQL Server · Azure SQL · Synapse · Fabric', color: 'border-cyan-500/30' },
                    ].map((layer) => (
                      <div key={layer.label} className={`border-l-2 ${layer.color} pl-4 py-3`}>
                        <h5 className="text-sm font-semibold text-white">{layer.label}</h5>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">{layer.items}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── CORE MODULES ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Core Modules"
              title="Four Capabilities. One Governed Platform."
              subtitle="Each module is production-grade, independently deployable, and connected through the same governance and audit framework."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {modules.map((mod, i) => (
              <AnimatedSection key={mod.title} delay={i * 100}>
                <div className="glass-card p-8 md:p-10 h-full group relative">
                  {mod.coming && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-feus-500/10 text-feus-400 border border-feus-500/20">
                      Coming Soon
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <mod.icon className={`w-6 h-6 ${mod.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{mod.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">{mod.desc}</p>
                  <div className="space-y-2">
                    {mod.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{f}</span>
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
            {flowSteps.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 100}>
                <div className="glass-card p-8 h-full text-center group">
                  <div className="w-14 h-14 rounded-xl bg-feus-500/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <s.icon className="w-7 h-7 text-feus-400" />
                  </div>
                  <div className="text-xs font-bold text-feus-500/40 uppercase tracking-wider mb-2">Step {i + 1}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── GOVERNANCE & SECURITY ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Governance & Security"
              title={<>Enterprise AI, Governed by Design —<br /><span className="gradient-text">Not by Accident</span></>}
              subtitle="Every AI capability is built with governance as the foundation — not bolted on after launch. This is how enterprise AI should work."
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {governance.map((g, i) => (
              <AnimatedSection key={g.title} delay={i * 80}>
                <div className="glass-card p-6 h-full">
                  <g.icon className="w-6 h-6 text-feus-400 mb-4" />
                  <h4 className="text-base font-semibold text-white mb-2">{g.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{g.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FIRST INTERACTION — DONE RIGHT ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel>First Interaction — Done Right</SectionLabel>
                <h2 className="section-heading text-white">
                  Before FEUS.ai Does Anything,<br />
                  <span className="gradient-text">It Tells You the Truth</span>
                </h2>
                <p className="mt-6 text-gray-400 leading-relaxed">
                  The first time FEUS.ai connects to your environment, it performs a comprehensive, read-only self-assessment. It checks your runtime, your configuration, your governance stack, and your integration points — then reports exactly what it found.
                </p>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  No dummy data. No fake readiness claims. No silent installs. A truthful readiness report with actionable guidance.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'Zero database operations during first contact',
                    'Every install requires explicit user approval',
                    'Truthful readiness verdict with specific capability flags',
                    'Session-traced audit trail from the very first interaction',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <AnimatedSection delay={100}>
                <div className="glass-card-static p-8 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-feus-500/5 rounded-full blur-[60px]" />
                  <div className="relative space-y-2 text-gray-300">
                    <p className="text-feus-400">{'>'} hello feus</p>
                    <p className="text-white font-semibold mt-3">👋 Hello! I'm FEUS.ai — your governed DBA assistant.</p>
                    <p className="text-gray-400 mt-2 text-xs">Environment grounded. Here's what I found:</p>
                    <div className="mt-3 space-y-1 text-xs">
                      <p>✅ Python 3.11.9 on WORKSTATION-01</p>
                      <p>✅ All 8 governance modules operational</p>
                      <p>✅ PII controls armed • Audit chain active</p>
                      <p>⚠️ 2 optional extensions not found</p>
                      <p className="text-gray-500 mt-2">14 of 16 checks passed — PARTIALLY_READY</p>
                    </div>
                    <p className="text-gray-500 mt-3 text-[10px]">Nothing runs without your explicit approval.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── HOW FEUS.AI ENSURES SAFE AI OPERATIONS ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Operational Safety"
              title={<>How FEUS.ai Ensures<br /><span className="gradient-text">Safe AI Operations</span></>}
              subtitle="Governance isn't a feature we added — it's the foundation everything is built on. These safety guarantees are architectural constraints that cannot be bypassed."
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Environment Grounding', desc: 'Every session begins with a truthful assessment of what is available, what is configured, and what is safe to use — before any operation is attempted.' },
              { icon: Eye, title: 'Governance-First Execution', desc: 'No operation reaches your database without passing through policy evaluation, PII inspection, and approval verification. Execution is always the last step.' },
              { icon: Lock, title: 'Approval-Gated Actions', desc: 'AI recommends. Humans approve. Every action that modifies your environment requires explicit, time-bound authorization from an appropriate approver.' },
              { icon: Fingerprint, title: 'Tamper-Evident Audit', desc: 'Every decision and action is recorded in a hash-chained audit trail. Compliance evidence is produced automatically — not assembled after the fact.' },
              { icon: Shield, title: 'Fail-Closed Architecture', desc: 'The governance pipeline is fail-closed — if a governance component is unavailable, the pipeline refuses to execute. Safety checks cannot be skipped.' },
              { icon: AlertTriangle, title: 'No Blind Execution', desc: 'Governance is structurally embedded — every operation is routed through the governance pipeline before execution.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 80}>
                <div className="glass-card p-6 h-full">
                  <item.icon className="w-6 h-6 text-feus-400 mb-4" />
                  <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
            <div className="mt-12 text-center">
              <CTAButton to="/trust" variant="primary">Read Our Full Security Commitment</CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── BUSINESS IMPACT ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Business Impact"
              title="Measurable Results, Not Promises"
              subtitle="FEUS.ai delivers quantifiable impact across operational risk, staffing efficiency, and compliance readiness."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((imp, i) => (
              <AnimatedSection key={imp.title} delay={i * 100}>
                <div className="glass-card p-8 h-full text-center">
                  <div className="text-4xl font-bold gradient-text mb-1">{imp.stat}</div>
                  <div className="text-xs text-accent-400 font-medium uppercase tracking-wider mb-5">{imp.statLabel}</div>
                  <h4 className="text-lg font-semibold text-white mb-3">{imp.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{imp.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── SOCIAL PROOF ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Built by Operators"
              title={<>15+ Years of Enterprise<br /><span className="gradient-text">Data Operations Leadership</span></>}
              subtitle="FEUS.ai was built by a team with CDO/CTO-level experience across healthcare, financial services, aviation, and SaaS."
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

              {/* Share this page */}
              <div className="mt-10">
                <SocialShare
                  url="https://feuselectronicsgroup.com/feus-ai"
                  title="FEUS.ai — See Your Data Operations ROI in 30 Minutes"
                  description="FEUS Copilot: governed AI that generates synthetic data, enforces compliance, and proves ROI in real time."
                  layout="horizontal"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Post-Demo Review CTA */}
      <LeaveReview variant="compact" />
    </>
  )
}
