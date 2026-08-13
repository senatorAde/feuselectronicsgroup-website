import { Link } from 'react-router-dom'
import {
  Database, Cloud, Brain, LineChart, ShieldCheck, Wrench, ArrowRight, Building2,
} from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import AnimatedSection from '../components/AnimatedSection'
import { SectionLabel, SectionHeader, CTAButton, GlowDivider } from '../components/ui'
import { AGENT_PORTFOLIO, POSTURE, PRODUCT_FAMILIES } from '../data/publicStatus'

const featuredAgents = AGENT_PORTFOLIO.filter((agent) =>
  ['oracleops', 'requestops', 'itsm-connect'].includes(agent.id)
)

/**
 * Homepage — rebuilt against the Session 13A approved messaging (§1–§2).
 * Two clearly separated narratives:
 *   1. FEUS Electronics Group — human-delivered consulting and managed services.
 *   2. FEUS.ai — operationally validated core plus capability-scoped extensions.
 * No blanket availability claims, fabricated metrics, or unqualified integrations.
 */

const services = [
  {
    icon: Database,
    title: 'Database & Data Platform Services',
    desc: 'SQL Server administration, performance tuning, migration planning, and data platform modernization delivered by experienced engineers.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    desc: 'Azure architecture, infrastructure design, and cloud migration engagements scoped and delivered as professional services.',
  },
  {
    icon: Brain,
    title: 'AI Governance Consulting',
    desc: 'AI readiness assessment and governance framework design for enterprises that need policy, audit, and access control before AI touches data.',
  },
  {
    icon: LineChart,
    title: 'Data Architecture & Analytics',
    desc: 'Modern data architecture design — from warehouse and lakehouse patterns to reporting and analytics enablement.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance Advisory',
    desc: 'Data protection reviews, access control design, and compliance-oriented documentation support for regulated environments.',
  },
  {
    icon: Wrench,
    title: 'Managed Operations',
    desc: 'Ongoing operational support for database estates and data platforms under defined service agreements.',
  },
]

function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-feus-950/40 via-navy-950 to-navy-950"
        aria-hidden="true"
      />
      <div className="relative max-w-5xl mx-auto">
        <SectionLabel>FEUS Electronics Group</SectionLabel>
        <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-4xl">
          Enterprise data operations,
          <span className="gradient-text"> governed by design</span>
        </h1>
        <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-3xl">
          FEUS Electronics Group delivers database, cloud, and AI-governance
          consulting and managed services — and develops FEUS.ai, a governed AI
          Data Operations platform with an operationally validated core and a
          controlled roadmap of expanding agents and integrations.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton to="/services">Explore our services</CTAButton>
          <CTAButton to="/feus-ai" variant="secondary">
            About the FEUS.ai platform
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="What we do"
          title="Professional services delivered by people"
          subtitle="Our consulting and managed-service engagements are delivered by engineers. FEUS.ai software adoption is scoped separately by capability, target environment, and governance requirements."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map(({ icon: Icon, title, desc }) => (
            <AnimatedSection key={title}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <Icon className="w-8 h-8 text-feus-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/services" variant="secondary">
            All services <ArrowRight className="w-4 h-4 ml-2 inline" aria-hidden="true" />
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <SectionLabel>The FEUS.ai platform</SectionLabel>
          <h2 className="section-heading text-4xl mt-4">
            Operationally validated governance, controlled expansion
          </h2>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {POSTURE.valueStatement} {POSTURE.architectureStatement} The core
            GovernedExecutionGateway SQL Server path has a retained FEUS workflow
            record in which 48 of 48 batches passed all seven gates, and the vNext
            revision completed{' '}
            {POSTURE.testsPassedAtRevision.toLocaleString()} automated tests.{' '}
            {POSTURE.lifecycleStatement}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <CTAButton to="/feus-ai">Explore FEUS.ai</CTAButton>
            <CTAButton to="/contact" variant="secondary">Book a consultation</CTAButton>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {PRODUCT_FAMILIES.map((fam) => (
            <Link
              key={fam.name}
              to={fam.route}
              className="glass-card rounded-2xl p-6 block hover:border-feus-500/40 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{fam.name}</h3>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-feus-300 flex-shrink-0 mt-1" aria-hidden="true" />
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-feus-300/90">
                {fam.statusLine}
              </p>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{fam.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <SectionLabel>Expanding agent portfolio</SectionLabel>
            <h3 className="text-2xl font-bold text-white">Specialists with explicit preview boundaries</h3>
            <p className="mt-3 text-sm text-gray-400 max-w-2xl leading-relaxed">
              Oracle operations, service-request coordination, and ITSM connectors
              are visible roadmap products with evidence, restrictions, and
              promotion milestones published by capability.
            </p>
          </div>
          <CTAButton to="/agents" variant="secondary">Explore all agents</CTAButton>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {featuredAgents.map((agent) => (
            <Link
              key={agent.id}
              to={agent.route}
              className="glass-card rounded-lg p-5 block hover:border-feus-500/40 transition-colors group"
            >
              <StatusBadge status={agent.status} />
              <h3 className="mt-5 text-lg font-semibold text-white">{agent.name}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{agent.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-feus-300">
                View capability <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-xs text-gray-500">
          {POSTURE.availabilityQualifier}{' '}
          <Link to="/status" className="text-feus-300 underline underline-offset-2">
            Capability status
          </Link>
        </p>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto text-center">
        <SectionLabel>Trust through transparency</SectionLabel>
        <h2 className="section-heading text-4xl mt-4">
          We publish evidence, not promises
        </h2>
        <p className="mt-6 text-gray-300 leading-relaxed">
          The FEUS.ai Trust Center documents operational evidence, capability
          lifecycle, release assessment scope, security-control results, and
          deployment responsibilities. Core maturity does not promote an unvalidated
          extension, and a preview module does not downgrade the whole platform.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <CTAButton to="/contact">Book a consultation</CTAButton>
          <CTAButton to="/trust" variant="secondary">
            Visit the Trust Center
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

function CompanySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start">
          <Building2 className="w-10 h-10 text-feus-400 flex-shrink-0" aria-hidden="true" />
          <div>
            <h2 className="text-2xl font-bold text-white">About FEUS Electronics Group</h2>
            <p className="mt-3 text-gray-300 leading-relaxed">
              FEUS Electronics Group is an enterprise technology company based in
              Tucker, Georgia, providing data platform, cloud, and AI-governance
              services to organizations that need their data operations to be
              auditable, policy-compliant, and safe.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-2 text-feus-300 underline underline-offset-2 hover:text-feus-200"
            >
              Learn more about us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        description="FEUS Electronics Group delivers database, cloud, and AI-governance services and develops FEUS.ai, a governed AI Data Operations platform with an operationally validated core."
      />
      <Hero />
      <GlowDivider />
      <ServicesSection />
      <PlatformSection />
      <TrustSection />
      <CompanySection />
    </div>
  )
}
