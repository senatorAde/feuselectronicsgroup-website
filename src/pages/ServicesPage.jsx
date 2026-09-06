import {
  Database, Workflow, Cloud, Brain, BarChart3, Zap,
  CheckCircle2, ArrowRight, ShieldCheck, Code2, Film, Compass
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SEO from '../components/SEO'

const serviceCategories = [
  {
    id: 'database',
    icon: Database,
    title: 'Database operations',
    tagline: 'Protect the systems the business depends on',
    description: 'Practitioner-led administration, performance, migration, resilience, and operational support across SQL Server, Azure SQL, and modern data estates.',
    benefit: 'More stable, visible, and supportable database operations.',
    outcomes: ['Health and performance baseline', 'Recovery and resilience plan', 'Prioritized optimization roadmap'],
    type: 'database',
  },
  {
    id: 'architecture',
    icon: Workflow,
    title: 'Data architecture & engineering',
    tagline: 'Create a foundation people can use and trust',
    description: 'Architecture and implementation for governed data platforms, pipelines, quality practices, catalogs, and analytical workloads.',
    benefit: 'A coherent data foundation aligned to operating and decision needs.',
    outcomes: ['Target-state architecture', 'Pipeline and quality design', 'Governance and lineage model'],
    type: 'data',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & infrastructure',
    tagline: 'Scale without losing operational discipline',
    description: 'Azure and hybrid architecture, infrastructure automation, observability, security posture, migration, and cost-governance support.',
    benefit: 'Cloud environments shaped for resilience, control, and sustainable operation.',
    outcomes: ['Cloud architecture and migration plan', 'Infrastructure-as-code foundation', 'Observability and cost controls'],
    type: 'cloud',
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'Enterprise AI solutions',
    tagline: 'Move from possibility to responsible use',
    description: 'AI readiness, use-case design, governance, agent and retrieval workflows, evaluation, and implementation support for enterprise teams.',
    benefit: 'A practical path to AI value with boundaries teams can understand.',
    outcomes: ['Prioritized AI use-case portfolio', 'Governance and evaluation approach', 'Capability prototype or implementation plan'],
    type: 'ai',
  },
  {
    id: 'governance',
    icon: ShieldCheck,
    title: 'Governance & security',
    tagline: 'Make trust part of the operating model',
    description: 'Data protection, identity, access, policy, assurance, and responsible-AI advisory tailored to the systems and risks in scope.',
    benefit: 'Controls that support adoption instead of arriving after it.',
    outcomes: ['Risk and control assessment', 'Policy and responsibility model', 'Evidence and remediation roadmap'],
    type: 'governance',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & business intelligence',
    tagline: 'Turn trusted information into clearer decisions',
    description: 'Executive and operational reporting, KPI frameworks, self-service analytics, forecasting, and data storytelling.',
    benefit: 'Shared visibility into performance, priorities, and emerging signals.',
    outcomes: ['Decision and KPI framework', 'Dashboard or reporting experience', 'Data adoption plan'],
    type: 'analytics',
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation & integration',
    tagline: 'Remove friction without removing accountability',
    description: 'Workflow orchestration, approvals, APIs, event-driven integration, delivery pipelines, notifications, and process improvement.',
    benefit: 'More consistent work with fewer fragile handoffs and manual steps.',
    outcomes: ['Workflow and handoff map', 'Prioritized automation backlog', 'Integrated operating workflow'],
    type: 'automation',
  },
  {
    id: 'digital',
    icon: Code2,
    title: 'Digital platforms & web',
    tagline: 'Make the digital experience match the business',
    description: 'Web strategy, UX, content architecture, application delivery, and digital-presence modernization for client and employee experiences.',
    benefit: 'A clearer, faster, and more credible digital journey.',
    outcomes: ['Experience and content strategy', 'Responsive platform implementation', 'Conversion and measurement plan'],
    type: 'digital',
  },
  {
    id: 'media',
    icon: Film,
    title: 'Media, photo & video',
    tagline: 'Show the value with clarity and craft',
    description: 'Photography, video, showcase experiences, and campaign content for brands, properties, products, and business stories.',
    benefit: 'Professional visual assets designed for engagement across channels.',
    outcomes: ['Creative direction and shot plan', 'Optimized photo or video assets', 'Channel-ready showcase content'],
    type: 'media',
  },
  {
    id: 'advisory',
    icon: Compass,
    title: 'Strategy & implementation advisory',
    tagline: 'Translate ambition into a sequenced plan',
    description: 'Executive advisory, assessments, roadmaps, architecture decisions, vendor evaluation, and implementation leadership across FEUS capabilities.',
    benefit: 'A defensible path from decision to delivery.',
    outcomes: ['Current-state assessment', 'Prioritized transformation roadmap', 'Delivery governance model'],
    type: 'strategy',
  },
]

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Technology, AI & Media Services"
        description="Explore FEUS services across enterprise AI, automation, data, cloud, governance, analytics, digital platforms, media, and implementation strategy."
      />
      <PageHero
        label="Our Services"
        title={<>Expertise that connects.<br /><span className="text-feus-300">Delivery that holds together.</span></>}
        subtitle="From enterprise AI and data platforms to digital experiences and media, FEUS brings the disciplines needed to move a business challenge from strategy into operation."
        backgroundImage="/brand/feus-hero-system.webp"
        imagePosition="70% center"
      >
        <CalendlyButton className="btn-accent group" icon={ArrowRight}>
          Discuss your priorities
        </CalendlyButton>
      </PageHero>

      <section className="section-mist py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              tone="light"
              label="Service portfolio"
              title="Start with a capability or bring us the whole challenge"
              subtitle="Each service can stand alone or combine into an integrated engagement. FEUS.ai software adoption is scoped separately by capability, target environment, and governance requirements."
            />
          </AnimatedSection>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((svc, index) => (
              <AnimatedSection key={svc.id} delay={(index % 3) * 70}>
                <article id={svc.id} className="surface-card flex h-full scroll-mt-28 flex-col p-6 sm:p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-feus-50 text-feus-800">
                    <svc.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase text-coral-600">{svc.tagline}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink">{svc.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{svc.description}</p>
                  <p className="mt-5 border-l-2 border-accent-400 pl-4 text-sm font-semibold leading-relaxed text-slate-800">{svc.benefit}</p>
                  <div className="mt-6 flex-1 border-t border-slate-200 pt-5">
                    <h3 className="text-xs font-bold uppercase text-slate-500">Typical outputs</h3>
                    <ul className="mt-3 space-y-2">
                      {svc.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-7">
                    <CTAButton to={`/contact?type=${svc.type}`} variant="outline" className="w-full">
                      Discuss this service
                    </CTAButton>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* Engagement Models */}
      <section className="section-ink py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Engagement Models"
              title="Flexible Delivery, Consistent Quality"
              subtitle="Whether you need a full managed operations engagement or targeted project support, we adapt to your needs."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Managed Operations',
                desc: 'Ongoing managed services with dedicated teams and continuous optimization. Coverage hours and service levels are defined in each executed customer agreement.',
                features: ['Dedicated operations team', 'Service levels defined per agreement', 'Continuous monitoring', 'Regular reporting'],
              },
              {
                title: 'Project Delivery',
                desc: 'Scoped, outcome-based projects with clear milestones — from architecture design to migration execution.',
                features: ['Fixed-scope delivery', 'Clear milestones', 'Knowledge transfer', 'Post-project support'],
              },
              {
                title: 'Advisory & Assessment',
                desc: 'Expert assessment, strategy development, and architectural guidance from senior practitioners.',
                features: ['Architecture review', 'Governance assessment', 'Technology roadmap', 'Risk analysis'],
              },
            ].map((model, i) => (
              <AnimatedSection key={model.title} delay={i * 100}>
                <div className="h-full border-t border-white/20 pt-6">
                  <h3 className="text-xl font-bold text-white mb-3">{model.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{model.desc}</p>
                  <div className="space-y-2">
                    {model.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-feus-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{f}</span>
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

      {/* CTA */}
      <section className="section-light py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <SectionLabel tone="light">Start a conversation</SectionLabel>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-ink">
                Not sure which capability fits?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Tell us what you are trying to change. We will map the relevant disciplines and a practical engagement model.
              </p>
              <div className="mt-8">
                <CTAButton to="/contact?type=services" variant="dark">Start a conversation</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
