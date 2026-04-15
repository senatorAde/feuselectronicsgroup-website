import {
  Database, Brain, Shield, CheckCircle2, ArrowRight, Lock, Eye,
  FileSearch, Activity, Workflow, Zap, BarChart3, Cloud,
  GitBranch, Layers, Bot, Server, AlertTriangle, FileCheck,
  UserCheck, ShieldCheck, Sparkles, Target, Gauge
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider, StatCard } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

/* ─── Flagship: Governed DBA Assistant ─── */
const dbaModules = [
  {
    icon: FileSearch,
    title: 'Intent Interpretation',
    desc: 'Natural language understanding that converts user requests into structured, validated operational intents — with ambiguity detection and clarification.',
  },
  {
    icon: Shield,
    title: 'Policy Engine',
    desc: 'Configurable policy enforcement that validates every action against organizational rules before execution. Block, warn, or require approval based on context.',
  },
  {
    icon: Lock,
    title: 'PII Guardrails',
    desc: 'Automatic detection and masking of personally identifiable information across all queries, results, and outputs — before data leaves the system.',
  },
  {
    icon: Workflow,
    title: 'Approval Workflows',
    desc: 'Multi-tier approval chains for sensitive operations. Role-based routing, escalation policies, and time-bound authorization windows.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    desc: 'Intelligent analysis of database health, performance patterns, and optimization opportunities — with executive-ready business context translation.',
  },
  {
    icon: Eye,
    title: 'Full Audit Trail',
    desc: 'Every decision, recommendation, and action is logged with complete provenance. Compliance-ready documentation generated automatically.',
  },
  {
    icon: Activity,
    title: 'Health Monitoring',
    desc: 'Continuous database health assessment with intelligent alerting, anomaly detection, and automated diagnostic workflows.',
  },
  {
    icon: Sparkles,
    title: 'Synthetic Data',
    desc: 'Governed synthetic data generation for development and testing — maintaining statistical fidelity without exposing real data.',
  },
]

const dbaCapabilities = [
  'AI-powered query analysis and optimization recommendations',
  'Automated database health monitoring with intelligent alerting',
  'PII detection and guardrail enforcement across all operations',
  'Policy-driven approval workflows for sensitive database changes',
  'Executive-ready reporting with business context translation',
  'Governed synthetic data generation for safe development workflows',
  'Complete audit trail with compliance-ready documentation',
  'Multi-tenant, role-based access control and data classification',
  'Relational integrity validation before any data modifications',
  'Environment-aware execution (dev/staging/prod isolation)',
  'Semantic schema profiling and data relationship mapping',
  'Automated risk assessment and impact analysis for changes',
]

/* ─── Other Solutions ─── */
const otherSolutions = [
  {
    id: 'modernization',
    icon: Layers,
    title: 'Data Platform Modernization',
    desc: 'End-to-end modernization of legacy data platforms to modern architectures — lakehouse patterns, cloud-native databases, and governed data pipelines. We assess, plan, migrate, and optimize.',
    outcomes: ['Legacy SQL Server to Azure SQL/Fabric migration', 'Modern data architecture design', 'Data quality and governance baseline', 'Performance optimization post-migration'],
  },
  {
    id: 'enablement',
    icon: Bot,
    title: 'Enterprise AI Enablement',
    desc: 'Safe, governed AI adoption for the enterprise. From AI readiness assessment and governance framework design to custom AI agent development, RAG systems, and copilot deployment — all with PII protection and audit compliance.',
    outcomes: ['AI governance framework deployment', 'Custom copilot and agent development', 'RAG system implementation', 'AI safety and PII guardrail setup'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Operational Intelligence & Analytics',
    desc: 'Turn governed data into actionable intelligence. Executive dashboards, operational KPI monitoring, predictive insights, and automated reporting — all built on trusted data foundations.',
    outcomes: ['Executive analytics dashboards', 'Real-time operational monitoring', 'Predictive maintenance models', 'Automated compliance reporting'],
  },
  {
    id: 'cloud-ops',
    icon: Cloud,
    title: 'Cloud Operations & Optimization',
    desc: 'Full-lifecycle cloud operations — from architecture design and infrastructure automation to cost governance, security compliance, and 24/7 managed support.',
    outcomes: ['Azure infrastructure automation', 'Cost reduction and governance', 'Security posture hardening', 'Operational runbook automation'],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Our Solutions"
        title={<>Purpose-Built Solutions for<br /><span className="gradient-text">Enterprise Challenges</span></>}
        subtitle="From our flagship AI-governed DBA assistant to comprehensive data modernization and enterprise AI enablement — solutions designed for complex, regulated environments."
      >
        <CalendlyButton className="btn-accent group" icon={ArrowRight}>
          Request a Demo of FEUS.ai
        </CalendlyButton>
      </PageHero>

      {/* ═══════ FLAGSHIP: Governed DBA Assistant ═══════ */}
      <section id="dba" className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <SectionLabel>Flagship Solution</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                FEUS.ai Governed DBA &<br />
                <span className="gradient-text">Data Operations Assistant</span>
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A production-grade AI assistant for enterprise database operations that combines deep SQL Server expertise with comprehensive governance — PII protection, policy enforcement, approval workflows, and complete audit trails.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Row */}
          <AnimatedSection delay={100}>
            <div className="glass-card-static p-8 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCard value="20+" label="Integrated Modules" />
                <StatCard value="Active" label="PII Protection" />
                <StatCard value="Full" label="Audit Readiness" />
                <StatCard value="Human" label="In-the-Loop" />
              </div>
            </div>
          </AnimatedSection>

          {/* Architecture Modules */}
          <AnimatedSection>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Architecture Modules</h3>
              <p className="text-gray-400">A modular, governed architecture where every component enforces trust and compliance.</p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dbaModules.map((mod, i) => (
              <AnimatedSection key={mod.title} delay={i * 60}>
                <div className="glass-card p-6 h-full">
                  <mod.icon className="w-5 h-5 text-feus-400 mb-3" />
                  <h4 className="text-sm font-semibold text-white mb-2">{mod.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{mod.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Full Capabilities */}
          <AnimatedSection delay={200}>
            <div className="mt-12 glass-card-static p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-6">Complete Capability List</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {dbaCapabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* How It Works */}
          <AnimatedSection delay={300}>
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Request', desc: 'User submits a natural language request — a question, optimization task, or data operation.' },
                  { step: '02', title: 'Govern', desc: 'The system classifies intent, checks policies, detects PII, and determines approval requirements.' },
                  { step: '03', title: 'Execute', desc: 'Approved actions execute with full monitoring, safety checks, and real-time progress tracking.' },
                  { step: '04', title: 'Report', desc: 'Results are formatted, PII-masked, logged for audit, and translated for the appropriate audience.' },
                ].map((s, i) => (
                  <div key={s.step} className="glass-card p-6 text-center">
                    <span className="text-3xl font-extrabold text-feus-500/20">{s.step}</span>
                    <h4 className="mt-2 text-base font-semibold text-white">{s.title}</h4>
                    <p className="mt-2 text-xs text-gray-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Request a Demo of FEUS.ai
                </CalendlyButton>
                <CTAButton to="/feus-ai" variant="secondary">See Full Platform</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ═══════ OTHER SOLUTIONS ═══════ */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Enterprise Solutions"
              title="Comprehensive Solutions Portfolio"
              subtitle="Beyond our flagship DBA assistant, FEUS.ai delivers end-to-end solutions for the modern enterprise."
            />
          </AnimatedSection>

          <div className="space-y-8">
            {otherSolutions.map((sol, i) => (
              <AnimatedSection key={sol.id} delay={i * 100}>
                <div id={sol.id} className="glass-card p-8 md:p-10">
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-feus-500/10 flex items-center justify-center">
                          <sol.icon className="w-5 h-5 text-feus-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{sol.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{sol.desc}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Key Outcomes</h4>
                      <div className="space-y-2">
                        {sol.outcomes.map((o) => (
                          <div key={o} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* CTA */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Which solution fits your challenge?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Let's map the right solution to your enterprise needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Request a Demo of FEUS.ai
                </CalendlyButton>
                <CTAButton to="/services" variant="secondary">View All Services</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
