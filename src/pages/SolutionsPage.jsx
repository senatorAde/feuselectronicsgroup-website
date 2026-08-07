import { Link } from 'react-router-dom'
import {
  CheckCircle2, ArrowRight, Layers, Bot, BarChart3, Cloud,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import SEO from '../components/SEO'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import { POSTURE } from '../data/publicStatus'

/*
 * Solutions — consulting and delivery engagements performed by FEUS
 * Electronics Group engineers. FEUS.ai software adoption is scoped
 * separately from these practitioner-delivered engagements.
 */

const solutions = [
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
    desc: 'Safe, governed AI adoption for the enterprise. From AI readiness assessment and governance framework design to custom AI agent development, RAG systems, and vendor assistant rollout support — with PII-protection and audit practices designed in.',
    outcomes: ['AI governance framework design', 'Custom AI agent development', 'RAG system implementation', 'AI safety and PII guardrail design'],
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
    desc: 'Full-lifecycle cloud operations — from architecture design and infrastructure automation to cost governance, security compliance, and managed support.',
    outcomes: ['Azure infrastructure automation', 'Cost reduction and governance', 'Security posture hardening', 'Operational runbook automation'],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <SEO
        title="Solutions"
        description="Consulting and delivery engagements from FEUS Electronics Group: data platform modernization, enterprise AI enablement, operational analytics, and cloud operations."
      />
      <PageHero
        label="Our Solutions"
        title={<>Purpose-Built Solutions for<br /><span className="gradient-text">Enterprise Challenges</span></>}
        subtitle="Data modernization, enterprise AI enablement, analytics, and cloud operations — engagements designed for complex, regulated environments and delivered by practitioners."
      >
        <CalendlyButton className="btn-accent group" icon={ArrowRight}>
          Discuss Your Needs
        </CalendlyButton>
      </PageHero>

      {/* Solutions portfolio */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Enterprise Solutions"
              title="Comprehensive Solutions Portfolio"
              subtitle="End-to-end engagements for the modern enterprise, delivered by FEUS Electronics Group engineers."
            />
          </AnimatedSection>

          <div className="space-y-8">
            {solutions.map((sol, i) => (
              <AnimatedSection key={sol.id} delay={i * 100}>
                <div id={sol.id} className="glass-card p-8 md:p-10">
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-feus-500/10 flex items-center justify-center">
                          <sol.icon className="w-5 h-5 text-feus-400" aria-hidden="true" />
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
                            <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
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

      {/* FEUS.ai cross-reference */}
      <section className="section-gradient py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-10">
              <SectionLabel>Operationally validated core</SectionLabel>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
                The FEUS.ai platform
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Alongside our services, we develop FEUS.ai — a governed AI Data
                Operations platform with a documented operational core and
                capability-specific preview extensions. The Session 12D NO-GO
                remains binding for its assessed vNext revision and deployment
                scope. We publish the product lifecycle, release evidence, and
                limitations openly.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <CTAButton to="/feus-ai" variant="secondary">Platform overview</CTAButton>
                <CTAButton to="/demo" variant="secondary">Request a controlled demonstration</CTAButton>
                <Link
                  to="/status"
                  className="inline-flex items-center px-4 py-2 text-sm text-feus-300 underline underline-offset-2 hover:text-feus-200"
                >
                  Current status
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* CTA */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Which solution fits your challenge?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Let's map the right engagement to your enterprise needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Start a Conversation
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
