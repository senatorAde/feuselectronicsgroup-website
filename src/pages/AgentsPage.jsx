import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  Database,
  Gauge,
  Network,
  PlugZap,
  Sparkles,
  TicketCheck,
} from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import { SectionLabel, CTAButton } from '../components/ui'
import { AGENT_PORTFOLIO } from '../data/publicStatus'

const agentIcons = {
  sqlops: Database,
  copilot: Sparkles,
  oracleops: Database,
  requestops: TicketCheck,
  'control-plane': Network,
  'itsm-connect': PlugZap,
  'recommendation-assurance': Gauge,
  'provider-gateway': Bot,
  'engine-expansion': Network,
}

export default function AgentsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS.ai Agent Portfolio"
        description="Explore the FEUS.ai agent portfolio: an operationally validated governed core with Controlled Preview Oracle and service-request agents, Preview ITSM connectors, and bounded expansion programs."
      />

      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-feus-950/30 via-navy-950 to-navy-950" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto">
          <SectionLabel>FEUS.ai agent portfolio</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-6xl mt-4 max-w-4xl">
            Governed agents, qualified by capability
          </h1>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-3xl">
            FEUS.ai extends its operational governance core through specialist
            agents and integration programs. Each offering carries its own
            lifecycle status, evidence boundary, and promotion milestone.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact">Discuss a controlled evaluation</CTAButton>
            <CTAButton to="/status" variant="secondary">Review lifecycle evidence</CTAButton>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {AGENT_PORTFOLIO.map((agent) => {
              const Icon = agentIcons[agent.id]
              return (
              <Link
                key={agent.id}
                to={agent.route}
                className="glass-card rounded-lg p-6 group hover:border-feus-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="w-8 h-8 text-feus-400" aria-hidden="true" />
                  <StatusBadge status={agent.status} />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {agent.capability}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">{agent.name}</h2>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{agent.summary}</p>
                <p className="mt-4 text-xs text-gray-500 leading-relaxed">{agent.evidence}</p>
                <p className="mt-3 text-xs text-amber-200/80 leading-relaxed">
                  Scope: {agent.restriction}
                </p>
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                  Environment: {agent.environment}
                </p>
                <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                  Next: {agent.nextMilestone}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-feus-300">
                  View capability <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}