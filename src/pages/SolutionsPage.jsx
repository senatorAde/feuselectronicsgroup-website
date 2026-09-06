import { Link } from 'react-router-dom'
import {
  CheckCircle2, ArrowRight, Layers, Bot, Cloud, Workflow, MonitorSmartphone, Camera,
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
    title: 'Modernize a critical data platform',
    when: 'Legacy systems constrain change, reliability, or access to trusted information.',
    desc: 'Assess the current estate, define a target architecture, sequence migration, and improve the governance and operating model around the platform.',
    outcomes: ['Defensible modernization roadmap', 'Migration and resilience approach', 'Governed data foundation'],
    capabilities: 'Data architecture · Database operations · Cloud',
  },
  {
    id: 'enablement',
    icon: Bot,
    title: 'Adopt AI with accountable controls',
    when: 'Teams see valuable AI use cases but need a responsible path from experiment to operation.',
    desc: 'Prioritize use cases, define governance and human decisions, evaluate architecture, and deliver a capability appropriate to the evidence and risk in scope.',
    outcomes: ['Prioritized adoption portfolio', 'Governance and evaluation model', 'Controlled implementation path'],
    capabilities: 'Enterprise AI · Governance · FEUS.ai',
  },
  {
    id: 'cloud-ops',
    icon: Cloud,
    title: 'Create a stronger cloud operating model',
    when: 'Cloud growth has outpaced architecture, cost visibility, security, or operational ownership.',
    desc: 'Connect platform design, infrastructure automation, observability, resilience, and cost governance into a model teams can sustain.',
    outcomes: ['Target cloud architecture', 'Automated delivery foundation', 'Operating and cost-control model'],
    capabilities: 'Cloud · Infrastructure · Security',
  },
  {
    id: 'workflow',
    icon: Workflow,
    title: 'Transform a high-friction workflow',
    when: 'Manual handoffs, repeated decisions, and disconnected systems slow important work.',
    desc: 'Map the operating process, preserve necessary human judgment, and automate the repeatable parts through integrations and governed orchestration.',
    outcomes: ['Current-state workflow evidence', 'Prioritized automation design', 'Integrated and measurable process'],
    capabilities: 'Automation · Integration · Analytics',
  },
  {
    id: 'digital-experience',
    icon: MonitorSmartphone,
    title: 'Rebuild a digital client experience',
    when: 'The website or platform no longer reflects the quality, clarity, or ambition of the business.',
    desc: 'Align brand, content, UX, technology, conversion paths, and measurement into a responsive experience built for real users.',
    outcomes: ['Experience and content direction', 'Responsive digital platform', 'Engagement measurement plan'],
    capabilities: 'Digital strategy · UX · Web platforms',
  },
  {
    id: 'visual-story',
    icon: Camera,
    title: 'Turn an offering into a visual story',
    when: 'A property, product, event, or company story needs stronger presentation across digital channels.',
    desc: 'Shape the narrative, creative direction, capture, post-production, and channel-ready showcase around the audience and decision at hand.',
    outcomes: ['Creative and production plan', 'Professional visual asset set', 'Channel-ready showcase experience'],
    capabilities: 'Photography · Video · Digital presence',
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
        title={<>Start with the change.<br /><span className="text-feus-300">Build the right system around it.</span></>}
        subtitle="FEUS solutions combine the capabilities a business challenge actually needs, from governed AI and platform modernization to digital engagement and visual storytelling."
        backgroundImage="/brand/feus-hero-system.webp"
        imagePosition="70% center"
      >
        <CalendlyButton className="btn-accent group" icon={ArrowRight}>
          Discuss Your Needs
        </CalendlyButton>
      </PageHero>

      <section className="section-light py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              tone="light"
              label="Outcome-led solutions"
              title="Choose the challenge, not the org chart"
              subtitle="Services describe what FEUS can do. Solutions assemble those capabilities around a specific change your organization needs to make."
            />
          </AnimatedSection>

          <div className="grid gap-6 lg:grid-cols-2">
            {solutions.map((sol, i) => (
              <AnimatedSection key={sol.id} delay={i * 100}>
                <article id={sol.id} className="surface-card flex h-full scroll-mt-28 flex-col p-7 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-feus-50 text-feus-800">
                      <sol.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-coral-600">When</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{sol.when}</p>
                    </div>
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-ink">{sol.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{sol.desc}</p>
                  <p className="mt-5 text-xs font-bold uppercase text-feus-800">{sol.capabilities}</p>
                  <div className="mt-6 flex-1 border-t border-slate-200 pt-5">
                    <h3 className="text-xs font-bold uppercase text-slate-500">Designed outcomes</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {sol.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={`/contact?type=${sol.id}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-feus-800">
                    Discuss this challenge <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      <section className="section-ink py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="border-l-2 border-accent-400 pl-6 sm:pl-10">
              <SectionLabel>Operationally validated core</SectionLabel>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
                The FEUS.ai platform
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Alongside our services, we develop FEUS.ai, a governed AI Data Operations platform that combines orchestration, database operations, assurance, evidence, and automation behind policy enforcement, least privilege, approvals, and auditability. {POSTURE.availabilityQualifier}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <CTAButton to="/feus-ai" variant="secondary">Explore FEUS.ai</CTAButton>
                <CTAButton to="/demo" variant="secondary">Request a demo</CTAButton>
                <Link
                  to="/status"
                  className="inline-flex items-center px-4 py-2 text-sm text-feus-300 underline underline-offset-2 hover:text-feus-200"
                >
                  Capability status
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      <section className="section-mist py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <SectionLabel tone="light">Your next move</SectionLabel>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-ink">
                Which change matters most now?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We will map the right mix of strategy, engineering, governance, and experience design to the outcome.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Start a Conversation
                </CalendlyButton>
                <CTAButton to="/services" variant="outline">View all services</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
