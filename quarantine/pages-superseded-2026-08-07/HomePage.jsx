import { Link } from 'react-router-dom'
import {
  ArrowRight, Database, Brain, Shield, Cloud, BarChart3, Workflow,
  Cpu, Lock, Server, Zap, CheckCircle2, ChevronRight, Sparkles,
  Building2, Factory, Landmark, HeartPulse, ShoppingCart, GraduationCap,
  ArrowUpRight, Globe, Users, Award, TrendingUp, AlertTriangle,
  Terminal, MessageSquare, Code2, Eye, Download, FileCheck2
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { SectionHeader, SectionLabel, CTAButton, StatCard, GlowDivider, ProofPoint } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import AssuranceProof from '../components/AssuranceProof'

/* ─────────────────────── HERO ─────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0">
        <img src="/feus-hero-banner.jpg" alt="" className="w-full h-full object-cover opacity-[0.07]" />
      </div>
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-feus-600/15 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-feus-500/8 rounded-full blur-[150px]" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-accent-400 mr-2" />
              <span className="text-sm font-medium text-accent-300">FEUS.ai — Now in Production</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
              Enterprise Data Operations.{' '}
              <span className="gradient-text">Governed by AI.</span>{' '}
              <span className="text-gray-300">Delivered Through the Tools You Already Use.</span>
            </h1>

            <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-xl">
              FEUS.ai partners with your environment to establish a governed operational foundation and deliver decision intelligence — through the tools your team already uses. Built on 15 years of managing 3,000+ SQL instances at CDO/CTO level across healthcare, financial services, and regulated industries.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                Book a Consultation
              </CalendlyButton>
              <CTAButton to="/how-it-works" variant="secondary">
                See How It Works
              </CTAButton>
            </div>

            {/* Trust Markers */}
            <div className="mt-14 grid grid-cols-3 gap-6">
              <StatCard value="15+" label="Years Enterprise Data Ops" />
              <StatCard value="3,000+" label="SQL Instances Managed" />
              <StatCard value="0" label="Unprotected Operations" />
            </div>
          </div>

          {/* Right — Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-gradient-to-br from-feus-600 to-feus-800 flex items-center justify-center shadow-2xl shadow-feus-500/30 animate-float z-10 overflow-hidden">
                <img src="/feus-logo-2023.jpg" alt="FEUS Electronics Group" className="w-full h-full object-cover" />
              </div>

              {/* Orbiting nodes */}
              {[
                { Icon: Database, top: '8%', left: '50%', delay: '0s', color: 'from-blue-500 to-blue-700' },
                { Icon: Shield, top: '30%', left: '90%', delay: '0.5s', color: 'from-emerald-500 to-emerald-700' },
                { Icon: Cloud, top: '70%', left: '85%', delay: '1s', color: 'from-violet-500 to-violet-700' },
                { Icon: BarChart3, top: '88%', left: '50%', delay: '1.5s', color: 'from-amber-500 to-amber-700' },
                { Icon: Lock, top: '70%', left: '10%', delay: '2s', color: 'from-rose-500 to-rose-700' },
                { Icon: Cpu, top: '30%', left: '5%', delay: '2.5s', color: 'from-cyan-500 to-cyan-700' },
              ].map(({ Icon, top, left, delay, color }, i) => (
                <div
                  key={i}
                  className="absolute w-14 h-14 rounded-xl flex items-center justify-center shadow-lg animate-float"
                  style={{ top, left, animationDelay: delay, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-full h-full rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}

              {/* Connection lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                {[
                  [200, 32, 200, 168], [360, 120, 232, 184], [340, 280, 232, 216],
                  [200, 352, 200, 232], [40, 280, 168, 216], [20, 120, 168, 184]
                ].map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="6 4" />
                ))}
              </svg>

              {/* Outer ring */}
              <div className="absolute inset-4 rounded-full border border-feus-500/10" />
              <div className="absolute inset-12 rounded-full border border-feus-500/5" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  )
}

/* ─────────────────────── WHAT WE DO ─────────────────────── */
const services = [
  {
    icon: Database,
    num: '01',
    title: 'Database Operations',
    desc: 'AI-augmented DBA services that keep your databases healthy, optimized, and governed — without growing your headcount.',
    outcome: 'Reduce unplanned downtime by design',
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: Workflow,
    num: '02',
    title: 'Data Architecture & Engineering',
    desc: 'Modern data platforms, pipelines, and lakehouse architectures designed for scale, compliance, and analytical readiness.',
    outcome: 'Pipelines that are governed from day one',
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: Cloud,
    num: '03',
    title: 'Cloud & Platform Operations',
    desc: 'Infrastructure managed services across Azure, hybrid, and multi-cloud — with automation, monitoring, and cost governance built in.',
    outcome: 'Infrastructure costs you can actually explain',
    color: 'from-cyan-500/20 to-cyan-600/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Brain,
    num: '04',
    title: 'Enterprise AI Solutions',
    desc: 'Governed AI enablement with PII protection, audit trails, policy enforcement, and safe synthetic data workflows.',
    outcome: 'AI you can deploy without a compliance incident',
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: BarChart3,
    num: '05',
    title: 'Analytics & Business Intelligence',
    desc: 'Operational dashboards, executive reporting, and real-time insights built on governed, trusted data foundations.',
    outcome: 'Insights your executives will actually trust',
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-400',
  },
  {
    icon: Zap,
    num: '06',
    title: 'Automation & Integration',
    desc: 'Intelligent workflow automation, approval engines, and system integration — reducing manual effort and operational risk.',
    outcome: 'Manual processes that disappear permanently',
    color: 'from-rose-500/20 to-rose-600/5',
    iconColor: 'text-rose-400',
  },
]

function WhatWeDo() {
  return (
    <section className="section-gradient py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="What We Do"
            title={<>Six Domains. One Integrated<br />Operations Team.</>}
            subtitle="We don't sell piecemeal. Every domain is interconnected — governed by the same AI platform, the same policy engine, the same audit trail."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 80}>
              <div className="glass-card p-8 h-full group relative">
                <span className="absolute top-4 right-4 text-xs font-mono font-bold text-feus-500/20 group-hover:text-feus-500/40 transition-colors">
                  {svc.num}
                </span>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <svc.icon className={`w-6 h-6 ${svc.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{svc.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{svc.desc}</p>
                <div className="flex items-center gap-2 text-accent-400 text-sm font-medium">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{svc.outcome}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <div className="mt-12 text-center">
            <CTAButton to="/services" variant="secondary">
              Explore All Services
            </CTAButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────── WHY FEUS.AI ─────────────────────── */
function WhyFeus() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div>
              <SectionLabel>Why FEUS.ai</SectionLabel>
              <h2 className="section-heading text-white">
                Not Another Vendor.<br />
                <span className="gradient-text">Your Operations Team.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                Most MSPs give you bodies and tickets. We give you an engineering-led operations team with AI embedded into every workflow — delivered through FEUS Copilot, governed, auditable, and built to scale with your enterprise.
              </p>
              <div className="mt-8">
                <CTAButton to="/feus-ai">
                  Meet FEUS.ai
                </CTAButton>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            <AnimatedSection delay={0}>
              <ProofPoint
                title="Governance-Native, Not Bolted On"
                description="Every AI operation runs through policy engines, PII guardrails, and audit trails before it touches your data."
              />
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <ProofPoint
                title="Engineers Who Build and Operate"
                description="Founder-led team of senior data engineers and architects. No hand-offs. No account manager layers."
              />
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <ProofPoint
                title="Production-Grade, Not Demo-Ready"
                description="Our AI systems run in production environments managing real enterprise databases — not in sandboxed demos."
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── HOW FEUS.AI WORKS (HOME) ─────────────────────── */
function HowFeusWorks() {
  return (
    <section className="section-gradient py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="How FEUS.ai Works"
            title={<>Embedded in Your Workflow.<br /><span className="gradient-text">Governed by Design.</span></>}
            subtitle="FEUS.ai operates through five layers — from your client environment, through the FEUS Copilot interface, through governance and intelligence, to actionable outputs."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-4">
          {[
            { label: 'Client Environment', desc: 'Your SQL, Azure, pipelines', color: 'border-blue-500/30', textColor: 'text-blue-400' },
            { label: 'FEUS Copilot', desc: 'Natural language interface', color: 'border-violet-500/30', textColor: 'text-violet-400' },
            { label: 'Governance Layer', desc: 'Policy · PII · RBAC · Audit', color: 'border-emerald-500/30', textColor: 'text-emerald-400' },
            { label: 'Intelligence Layer', desc: 'AI agents & decision engine', color: 'border-amber-500/30', textColor: 'text-amber-400' },
            { label: 'Decision Outputs', desc: 'Reports · Recommendations', color: 'border-rose-500/30', textColor: 'text-rose-400' },
          ].map((layer, i) => (
            <AnimatedSection key={layer.label} delay={i * 80}>
              <div className={`glass-card p-5 h-full text-center border-t-2 ${layer.color}`}>
                <span className="text-xs font-bold text-feus-500/30">0{i + 1}</span>
                <h4 className={`mt-2 text-sm font-semibold ${layer.textColor}`}>{layer.label}</h4>
                <p className="mt-1 text-xs text-gray-500">{layer.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <div className="mt-12 text-center">
            <CTAButton to="/how-it-works" variant="primary">
              See the Full Architecture
            </CTAButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────── FLAGSHIP SOLUTION ─────────────────────── */
function FlagshipSolution() {
  const capabilities = [
    'AI-powered query analysis & optimization recommendations',
    'Automated health monitoring with intelligent alerting',
    'PII detection & guardrail enforcement across all operations',
    'Policy-driven approval workflows for sensitive changes',
    'Executive-ready reporting with business context translation',
    'Governed synthetic data generation for safe development',
    'Full audit trail with compliance-ready documentation',
    'Multi-tenant, role-based access control',
  ]

  return (
    <section className="section-gradient py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="glass-card-static p-8 md:p-12 lg:p-16 relative overflow-hidden border-feus-500/10">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-feus-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-full blur-[80px]" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel>Introducing</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  FEUS.ai Governed DBA &<br />
                  <span className="gradient-text">Data Operations Assistant</span>
                </h2>
                <p className="mt-3 text-lg font-semibold text-feus-300">
                  8 governance modules. 0 unprotected operations.
                </p>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Our production-grade AI assistant for database operations combines deep SQL Server expertise with enterprise governance. Delivered through FEUS Copilot, it doesn't just find problems — it recommends fixes, enforces policies, protects sensitive data, and generates executive-ready reports — all under human oversight.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <CTAButton to="/how-it-works">
                    See How It Works
                  </CTAButton>
                  <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                    Request a Live Demo
                  </CalendlyButton>
                </div>
              </div>

              <div className="space-y-3">
                {capabilities.map((cap, i) => (
                  <AnimatedSection key={i} delay={i * 60}>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{cap}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────── INDUSTRIES ─────────────────────── */
const industries = [
  { icon: Landmark, name: 'Financial Services', desc: 'Regulated data operations with compliance-first governance', tag: 'SOX-aware' },
  { icon: HeartPulse, name: 'Healthcare', desc: 'HIPAA-aware data management and AI-safe workflows', tag: 'HIPAA-aligned' },
  { icon: Factory, name: 'Manufacturing', desc: 'Operational intelligence and IoT data platform modernization', tag: 'OT-ready' },
  { icon: ShoppingCart, name: 'Retail & Commerce', desc: 'Real-time analytics, customer data governance, and scale', tag: 'PCI-aware' },
  { icon: Building2, name: 'Professional Services', desc: 'Multi-tenant operations and knowledge management', tag: 'Multi-tenant' },
  { icon: GraduationCap, name: 'Education', desc: 'Student data protection and institutional analytics', tag: 'FERPA-ready' },
]

function Industries() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Industries We Serve"
            title="Built for Environments Where Governance Isn't Optional"
            subtitle="Financial services, healthcare, and manufacturing don't get to 'move fast and break things.' Neither do we. FEUS.ai is built for organizations where compliance, auditability, and data protection are baseline requirements."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, i) => (
            <AnimatedSection key={ind.name} delay={i * 80}>
              <div className="glass-card p-6 flex items-start gap-4 h-full">
                <div className="w-10 h-10 rounded-lg bg-feus-500/10 flex items-center justify-center flex-shrink-0">
                  <ind.icon className="w-5 h-5 text-feus-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-semibold text-white">{ind.name}</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">
                      {ind.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{ind.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── HOW WE WORK ─────────────────────── */
const steps = [
  { step: '01', title: 'Discover & Assess', desc: 'We audit your current environment, identify risks, map governance gaps, and define a modernization baseline.', timeline: 'Week 1–2' },
  { step: '02', title: 'Architect & Plan', desc: 'Collaborative design of target architecture, service models, automation strategies, and governance frameworks.', timeline: 'Week 3–4' },
  { step: '03', title: 'Implement & Automate', desc: 'Hands-on deployment with full automation, monitoring, AI integration, and validation at every stage.', timeline: 'Week 5–8' },
  { step: '04', title: 'Operate & Optimize', desc: 'Continuous managed operations with AI-driven insights, proactive maintenance, and ongoing improvement.', timeline: 'Ongoing' },
]

function HowWeWork() {
  return (
    <section className="section-gradient py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="How We Work"
            title="From Assessment to Managed Operations in Four Stages"
            subtitle="A proven engagement model that takes you from current state to fully governed, AI-enhanced operations."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <AnimatedSection key={s.step} delay={i * 100}>
              <div className="glass-card p-8 h-full relative group">
                <span className="text-5xl font-extrabold text-feus-500/10 group-hover:text-feus-500/20 transition-colors absolute top-4 right-4">
                  {s.step}
                </span>
                <div className="relative">
                  <h4 className="text-lg font-semibold text-white mb-1">{s.title}</h4>
                  <span className="inline-block text-xs font-medium text-accent-400 mb-3">{s.timeline}</span>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── CREDIBILITY ─────────────────────── */
function Credibility() {
  const signals = [
    {
      title: '3,150+ SQL Instances Managed Directly',
      desc: 'Our founder has directly managed 3,150+ SQL Server instances across 32+ enterprise clients — including HA/DR, performance engineering, and cloud migration at scale. FEUS.ai is built from that operational reality.',
    },
    {
      title: 'CDO/CTO-Level Leadership',
      desc: 'Led engineering organizations of 35–60 people with $2–3.2M budgets. Owned enterprise data/AI roadmaps at HyCite, Fortified Data, and DocuTAP. This platform comes from executive decision-making experience, not just engineering.',
    },
    {
      title: 'HIPAA, SOX, and Regulated Environments',
      desc: 'Implemented HIPAA-aligned security frameworks reducing audit findings by 78%. Operated in healthcare, financial services, aviation, and direct sales — all with strict compliance requirements. Governance is not theoretical here.',
    },
    {
      title: 'Microsoft MVP + Enterprise Certifications',
      desc: 'Microsoft MVP for Data Platform & AI (2024/2025), Azure Solutions Architect Expert, AWS SA Professional, CISSP, PMP, CDMP, Ph.D. Built by a practitioner recognized by the industry, not just a startup idea.',
    },
  ]

  return (
    <section className="section-darker py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Why Trust Us"
            title="Built by Operators. Backed by Evidence."
            subtitle="15+ years, 3,150+ SQL instances, CDO/CTO-level leadership across regulated industries — this is operational history, not a pitch deck."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {signals.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 100}>
              <div className="flex gap-4 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 h-full">
                <div className="w-1 rounded-full bg-gradient-to-b from-accent-400 to-accent-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── TRUST / GOVERNANCE ─────────────────────── */
function TrustGovernance() {
  const pillars = [
    { title: 'PII Protection', desc: 'Automatic detection and masking of personally identifiable information across all operations and outputs.', impact: 'Your customer data never appears in AI outputs' },
    { title: 'Policy Enforcement', desc: 'Configurable policy engines that enforce organizational rules before any action reaches production.', impact: 'Rules your legal team sets are enforced by software, not memos' },
    { title: 'Audit Trails', desc: 'Every decision, recommendation, and action is logged with full provenance for compliance and review.', impact: 'Every AI action is traceable to a specific decision chain' },
    { title: 'Role-Based Access', desc: 'Granular access controls ensuring the right people have the right permissions at the right time.', impact: 'Your DBA and your CFO see different things — by design' },
    { title: 'Data Classification', desc: 'Automated sensitivity labeling and data classification aligned to your organizational taxonomy.', impact: 'Sensitivity labels applied before data enters any workflow' },
    { title: 'Human-in-the-Loop', desc: 'AI recommends, humans approve. Critical operations always require explicit authorization.', impact: 'AI recommends. Your team approves. Always.' },
  ]

  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Trust & Governance"
            title={<>Enterprise AI, Governed by Design —<br /><span className="gradient-text">Not by Accident</span></>}
            subtitle="We built governance into the foundation — not bolted on as an afterthought. Every AI capability we deliver is auditable, policy-compliant, and safe."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 60}>
              <div className="glass-card p-6 h-full">
                <div className="w-2 h-2 rounded-full bg-accent-400 mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">{p.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{p.desc}</p>
                <p className="text-xs font-medium text-accent-400 leading-relaxed">→ {p.impact}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── ABOUT TEASER ─────────────────────── */
function AboutTeaser() {
  return (
    <section className="section-gradient py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>About FEUS Electronics Group</SectionLabel>
              <h2 className="section-heading text-white">
                Built by Practitioners.<br />
                Run Like a Company.
              </h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                FEUS Electronics Group is a founder-led enterprise technology company. We started with deep expertise in data platform engineering and SQL Server operations — and we've expanded into a full AI-powered managed services practice through FEUS.ai.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                We're not a startup chasing hype. We're engineers who've spent decades running enterprise data systems at scale — and we've built FEUS.ai to deliver that expertise with AI-enhanced precision and governance.
              </p>
              <div className="mt-8">
                <CTAButton to="/about">
                  Our Story
                </CTAButton>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '15+', label: 'Years in Enterprise Data' },
                { value: 'AI-First', label: 'Service Delivery Model' },
                { value: '6', label: 'Core Service Domains' },
                { value: '100%', label: 'Governance Coverage' },
              ].map((stat, i) => (
                <AnimatedSection key={stat.label} delay={i * 100}>
                  <div className="glass-card p-6 text-center">
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="mt-1 text-xs text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────── FINAL CTA ─────────────────────── */
function FinalCTA() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Let's Build Something<br />
              <span className="gradient-text">That Actually Runs.</span>
            </h2>
            <p className="mt-6 text-xl text-gray-400 leading-relaxed">
              Whether you need governed database operations, a modern data platform, or enterprise AI that's safe to deploy — we're ready to execute.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                Book a Consultation
              </CalendlyButton>
              <CTAButton to="/feus-ai" variant="secondary">
                Explore FEUS.ai
              </CTAButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────── HOME PAGE ─────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <GlowDivider />
      <WhatWeDo />
      <GlowDivider />
      <WhyFeus />
      <GlowDivider />
      <HowFeusWorks />
      <GlowDivider />
      <FlagshipSolution />
      <GlowDivider />
      <AssuranceProof />
      <GlowDivider />
      <Industries />
      <GlowDivider />
      <HowWeWork />
      <GlowDivider />
      <Credibility />
      <GlowDivider />
      <TrustGovernance />
      <GlowDivider />
      <AboutTeaser />
      <GlowDivider />
      <FinalCTA />
    </>
  )
}
