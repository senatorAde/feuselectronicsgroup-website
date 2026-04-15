import {
  ArrowRight, Monitor, MessageSquare, Shield, Brain, BarChart3,
  CheckCircle2, Workflow, Lock, Eye, Cpu, Server, GitBranch,
  Layers, Users, FileSearch, Activity, Sparkles, Code2, Terminal
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

/* ─────────────────────── OPERATIONAL MODEL LAYERS ─────────────────────── */
const operationalLayers = [
  {
    step: '01',
    label: 'CLIENT ENVIRONMENT',
    title: 'Your Infrastructure & Data Systems',
    description: 'FEUS.ai begins with your environment. Your SQL Server instances, Azure resources, data pipelines, and cloud infrastructure remain exactly where they are. Nothing moves. Nothing is re-platformed. FEUS.ai connects to your existing systems through secure, governed channels.',
    items: ['SQL Server / Azure SQL databases', 'Cloud infrastructure (Azure, hybrid, multi-cloud)', 'Data pipelines & ETL/ELT workflows', 'Existing monitoring & alerting systems'],
    color: 'border-blue-500/40',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    icon: Server,
  },
  {
    step: '02',
    label: 'INTERACTION LAYER',
    title: 'VS Code + GitHub Copilot Chat',
    description: 'Your team interacts with FEUS.ai through tools they already use — VS Code and GitHub Copilot Chat. There is no new UI to learn, no separate portal to manage. Engineers submit requests, ask questions, and receive recommendations directly in their development environment. Copilot Chat serves as the natural language interface — the conversation layer between your team and the FEUS.ai intelligence engine.',
    items: ['Natural language requests via Copilot Chat', 'VS Code as the primary workspace', 'No new tools to learn or deploy', 'Context-aware interactions within your IDE'],
    color: 'border-violet-500/40',
    bgColor: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    icon: Terminal,
  },
  {
    step: '03',
    label: 'GOVERNANCE LAYER',
    title: 'FEUS.ai Policy & Compliance Engine',
    description: 'Before any action reaches your environment, it passes through the FEUS.ai governance layer. Every request is validated against organizational policies, checked for PII exposure, routed through approval workflows, and logged for audit. This is not a feature — it is the architecture. Governance is the foundation every operation is built on.',
    items: ['Policy engine validation on every operation', 'PII detection & automatic masking', 'Role-based access control (RBAC) with AAD integration', 'Multi-tier approval workflows with escalation', 'Environment isolation (dev / staging / production)'],
    color: 'border-emerald-500/40',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    icon: Shield,
  },
  {
    step: '04',
    label: 'INTELLIGENCE LAYER',
    title: 'FEUS.ai AI & Decision Engine',
    description: 'The FEUS.ai intelligence layer is where operational expertise meets AI. Purpose-built agents analyze database health, optimize queries, detect anomalies, generate synthetic data, and translate technical findings into executive-ready insights. Every AI output is governed — checked against policies, stripped of PII, and logged with full provenance before it reaches your team.',
    items: ['AI-powered database health assessment', 'Query analysis & optimization recommendations', 'Anomaly detection & predictive diagnostics', 'Synthetic data generation with relational integrity', 'Business-context translation for executive reporting'],
    color: 'border-amber-500/40',
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    icon: Brain,
  },
  {
    step: '05',
    label: 'DECISION OUTPUTS',
    title: 'Actionable, Auditable Results',
    description: 'Every FEUS.ai operation produces structured, governed outputs — delivered back through Copilot Chat or as automated reports. Optimization recommendations come with impact analysis. Health assessments include risk scoring. Every output is audit-logged with a complete decision chain, ready for compliance review at any time.',
    items: ['Optimization recommendations with impact scoring', 'Health reports with risk assessment', 'Executive summaries in business language', 'Complete audit trail with hash-chained provenance', 'Automated compliance documentation'],
    color: 'border-rose-500/40',
    bgColor: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    icon: BarChart3,
  },
]

/* ─────────────────────── DIFFERENTIATORS ─────────────────────── */
const differentiators = [
  {
    title: 'Embeds Into Existing Workflows',
    description: 'FEUS.ai does not require your team to adopt a new platform, learn a new interface, or change their development workflow. It meets engineers where they already work — inside VS Code and Copilot Chat.',
    icon: Code2,
  },
  {
    title: 'Copilot Chat Is the Interface',
    description: 'GitHub Copilot Chat serves as the natural language interaction layer. Your team asks questions, submits requests, and receives governed responses — all within a conversational interface they already use daily.',
    icon: MessageSquare,
  },
  {
    title: 'FEUS.ai Is the Governance + Intelligence Layer',
    description: 'Behind every Copilot Chat interaction, FEUS.ai enforces policies, protects PII, routes approvals, executes governed operations, and delivers AI-powered intelligence — invisibly and automatically.',
    icon: Shield,
  },
  {
    title: 'Every Operation Is Auditable',
    description: 'From the initial request to the final output, every step is logged, hash-chained, and traceable. When auditors ask "what did the AI do?", you have a complete, tamper-evident answer.',
    icon: Eye,
  },
]

/* ─────────────────────── WORKFLOW EXAMPLE ─────────────────────── */
const workflowSteps = [
  { label: 'Engineer types', text: '"Analyze slow queries on PROD-SQL-03"', sublabel: 'In Copilot Chat within VS Code' },
  { label: 'FEUS.ai parses', text: 'Intent classified: performance analysis', sublabel: 'Request validated against policies' },
  { label: 'Governance checks', text: 'RBAC verified → PII scan passed → Environment: production', sublabel: 'Approval auto-granted (read-only analysis)' },
  { label: 'AI executes', text: 'Top 5 slow queries identified, root causes analyzed', sublabel: 'Index recommendations generated' },
  { label: 'Results delivered', text: 'Copilot Chat returns optimization report', sublabel: 'Full audit trail logged, executive summary available' },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <PageHero
        label="How FEUS.ai Works"
        title={<>Five Layers. One Governed Pipeline.<br />From Request to <span className="gradient-text">Auditable Result.</span></>}
        subtitle="Every operation follows the same path: your team asks a question in Copilot Chat, FEUS.ai governs and executes it, and a structured, auditable result is delivered — without your team leaving VS Code."
      >
        <div className="flex flex-wrap gap-4">
          <CalendlyButton className="btn-accent group" icon={ArrowRight}>
            Book a Demo
          </CalendlyButton>
          <CTAButton to="/feus-ai" variant="secondary">Explore the Platform</CTAButton>
        </div>
      </PageHero>

      {/* ─── OPERATING MODEL SUMMARY ─── */}
      <section className="section-darker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-8 md:p-12 text-center">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                <span className="text-white font-semibold">FEUS.ai</span> partners with client environments using{' '}
                <span className="text-violet-400 font-semibold">VS Code</span> and{' '}
                <span className="text-violet-400 font-semibold">GitHub Copilot Chat</span>{' '}
                as the interaction layer to establish a{' '}
                <span className="text-emerald-400 font-semibold">governed operational foundation</span>{' '}
                and deliver{' '}
                <span className="text-amber-400 font-semibold">environment and operational decision intelligence</span>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FIVE-LAYER OPERATIONAL MODEL ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Operational Architecture"
              title="Five Layers, One Governed Pipeline"
              subtitle="Every FEUS.ai operation flows through five distinct layers — from your client environment through governance and intelligence, to actionable, auditable outputs."
            />
          </AnimatedSection>

          <div className="space-y-8">
            {operationalLayers.map((layer, i) => (
              <AnimatedSection key={layer.step} delay={i * 100}>
                <div className={`glass-card-static p-8 md:p-10 ${layer.color} border-l-4 relative overflow-hidden`}>
                  {/* Step number watermark */}
                  <span className="absolute top-4 right-6 text-6xl font-extrabold text-white/[0.03]">
                    {layer.step}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${layer.bgColor} flex items-center justify-center`}>
                        <layer.icon className={`w-6 h-6 ${layer.iconColor}`} />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                          {layer.label}
                        </span>
                        <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
                      {layer.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {layer.items.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connector arrow */}
                  {i < operationalLayers.length - 1 && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                      <div className="w-10 h-10 rounded-full bg-navy-950 border border-white/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-feus-400 rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── LIVE WORKFLOW EXAMPLE ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="In Practice"
              title="A Real Workflow, Start to Finish"
              subtitle="Here's what happens when an engineer submits a request through Copilot Chat."
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {workflowSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="flex gap-5 mb-6 last:mb-0">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-feus-500/15 border border-feus-500/30 flex items-center justify-center text-sm font-bold text-feus-400">
                      {i + 1}
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-feus-500/30 to-transparent mt-2" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="pb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {step.label}
                    </span>
                    <p className="mt-1 text-base font-semibold text-white font-mono bg-white/[0.03] px-4 py-2 rounded-lg border border-white/[0.06] inline-block">
                      {step.text}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{step.sublabel}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── WHY THIS ARCHITECTURE ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Why This Architecture"
              title="Designed for Enterprise Adoption"
              subtitle="FEUS.ai's architecture is intentionally built for minimal friction and maximum governance."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((d, i) => (
              <AnimatedSection key={d.title} delay={i * 100}>
                <div className="flex gap-5 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-feus-500/10 flex items-center justify-center flex-shrink-0">
                    <d.icon className="w-6 h-6 text-feus-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{d.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{d.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── ARCHITECTURE DIAGRAM (TEXT) ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <SectionLabel>System Architecture</SectionLabel>
              <h2 className="section-heading text-white">End-to-End Flow</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="glass-card-static p-8 md:p-12 max-w-4xl mx-auto font-mono text-sm">
              {/* Visual flow */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <span className="text-blue-400 font-semibold">CLIENT ENVIRONMENT</span>
                    <span className="block text-xs text-gray-500 mt-1">SQL Server · Azure · Data Pipelines</span>
                  </div>
                </div>

                <div className="text-center text-feus-500/40">↕</div>

                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-violet-500/10 border border-violet-500/30 rounded-xl">
                    <span className="text-violet-400 font-semibold">VS CODE + GITHUB COPILOT CHAT</span>
                    <span className="block text-xs text-gray-500 mt-1">Interaction Layer · Natural Language Interface</span>
                  </div>
                </div>

                <div className="text-center text-feus-500/40">↕</div>

                <div className="text-center">
                  <div className="inline-block px-6 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <span className="text-emerald-400 font-semibold">FEUS.ai GOVERNANCE LAYER</span>
                    <span className="block text-xs text-gray-500 mt-1">Policy Engine · PII Guards · RBAC · Approvals · Audit</span>
                  </div>
                </div>

                <div className="text-center text-feus-500/40">↕</div>

                <div className="text-center">
                  <div className="inline-block px-6 py-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <span className="text-amber-400 font-semibold">FEUS.ai INTELLIGENCE LAYER</span>
                    <span className="block text-xs text-gray-500 mt-1">AI Agents · Decision Engine · Analytics · Synthetic Data</span>
                  </div>
                </div>

                <div className="text-center text-feus-500/40">↕</div>

                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                    <span className="text-rose-400 font-semibold">DECISION OUTPUTS</span>
                    <span className="block text-xs text-gray-500 mt-1">Recommendations · Reports · Audit Logs · Compliance Docs</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── CTA ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                See FEUS.ai in Action<br />
                <span className="gradient-text">Inside Your Environment</span>
              </h2>
              <p className="mt-6 text-lg text-gray-400">
                Book a 30-minute consultation to see how FEUS.ai integrates with your existing tools and infrastructure — governed, auditable, and ready for production.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Book a Consultation
                </CalendlyButton>
                <CTAButton to="/contact" variant="secondary">Send Us a Message</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
