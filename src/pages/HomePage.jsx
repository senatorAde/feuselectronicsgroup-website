import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Film,
  Gauge,
  Handshake,
  Layers3,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import AnimatedSection from '../components/AnimatedSection'
import WorkflowVisual from '../components/WorkflowVisual'
import { CalendlyButton } from '../components/CalendlyEmbed'
import { SectionLabel, SectionHeader, CTAButton } from '../components/ui'
import { AGENT_PORTFOLIO, POSTURE } from '../data/publicStatus'

const servicePaths = [
  {
    icon: Sparkles,
    title: 'AI & intelligent automation',
    description: 'Move from experimentation to policy-aware workflows, agents, and automation designed around real operating constraints.',
    benefit: 'Responsible acceleration',
    href: '/services#ai',
    accent: 'bg-feus-50 text-feus-800',
  },
  {
    icon: Database,
    title: 'Data & database platforms',
    description: 'Modernize, tune, migrate, and operate critical data estates with practitioner-led architecture and delivery.',
    benefit: 'Reliable data foundations',
    href: '/services#database',
    accent: 'bg-accent-50 text-accent-800',
  },
  {
    icon: Cloud,
    title: 'Cloud & infrastructure',
    description: 'Shape secure Azure and hybrid environments with infrastructure automation, observability, and cost-aware choices.',
    benefit: 'Scalable operations',
    href: '/services#cloud',
    accent: 'bg-sky-50 text-sky-800',
  },
  {
    icon: BarChart3,
    title: 'Analytics & transformation',
    description: 'Turn governed information into decision-ready reporting, practical roadmaps, and better operating visibility.',
    benefit: 'Clearer decisions',
    href: '/solutions#analytics',
    accent: 'bg-amber-50 text-amber-800',
  },
  {
    icon: Code2,
    title: 'Digital platforms & presence',
    description: 'Design and deliver digital experiences that connect the brand, content, workflows, and technology behind the customer journey.',
    benefit: 'Stronger engagement',
    href: '/contact?type=digital',
    accent: 'bg-coral-400/10 text-coral-600',
  },
  {
    icon: Film,
    title: 'Media & visual storytelling',
    description: 'Create polished photography, video, showcase, and campaign experiences that help people see the value clearly.',
    benefit: 'Memorable communication',
    href: '/sales',
    accent: 'bg-rose-50 text-rose-700',
  },
]

const trustSignals = [
  { icon: Users, title: 'Human-controlled', description: 'People define intent and remain part of risk-sensitive decisions.' },
  { icon: ShieldCheck, title: 'Governance-first', description: 'Policy, identity, data safeguards, and auditability shape execution.' },
  { icon: Gauge, title: 'Status-transparent', description: 'Capability scope and maturity are published without blanket claims.' },
  { icon: Handshake, title: 'Practitioner-led', description: 'Strategy stays connected to the engineers responsible for delivery.' },
]

const useCases = [
  {
    icon: LockKeyhole,
    audience: 'Regulated operations',
    challenge: 'Modernize workflows while preserving oversight, evidence, and accountable decisions.',
  },
  {
    icon: Building2,
    audience: 'Growing businesses',
    challenge: 'Build technology foundations that support the next stage without adding avoidable complexity.',
  },
  {
    icon: Network,
    audience: 'Enterprise platform teams',
    challenge: 'Connect data, cloud, automation, and governance into a more coherent operating model.',
  },
  {
    icon: Layers3,
    audience: 'Customer-facing brands',
    challenge: 'Align digital presence, content, and delivery systems around a stronger client experience.',
  },
]

const outcomes = [
  { title: 'Operational clarity', detail: 'Make ownership, status, and next actions easier to understand.' },
  { title: 'Controlled velocity', detail: 'Move work forward with the right safeguards at the right moment.' },
  { title: 'Resilience by design', detail: 'Reduce fragile manual dependencies and strengthen repeatability.' },
  { title: 'Cost-aware decisions', detail: 'Connect architecture and automation choices to sustainable operations.' },
]

const process = [
  { step: '01', title: 'Discover', detail: 'Clarify the business outcome, operating context, risks, and constraints.' },
  { step: '02', title: 'Design', detail: 'Shape the service, platform, or experience around a practical path to value.' },
  { step: '03', title: 'Deliver', detail: 'Implement with visible milestones, accountable decisions, and knowledge transfer.' },
  { step: '04', title: 'Improve', detail: 'Review evidence, learn from operation, and evolve what matters next.' },
]

const featuredAgents = AGENT_PORTFOLIO.filter((agent) =>
  ['sqlops', 'requestops', 'oracleops'].includes(agent.id)
)

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-48px)] items-center overflow-hidden bg-ink pt-28 text-white">
      <img
        src="/brand/feus-hero-system.webp"
        alt=""
        width="1600"
        height="1040"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[64%_center] sm:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>Enterprise technology. Governed intelligence.</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl text-balance">
            FEUS builds technology that moves business forward with control.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl text-pretty">
            Strategy, engineering, and governed AI for organizations ready to modernize data, cloud, automation, digital experiences, and operations.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CalendlyButton className="btn-primary" icon={ArrowRight}>Book a consultation</CalendlyButton>
            <CTAButton to="/solutions" variant="secondary">Explore solutions</CTAButton>
          </div>
          <p className="mt-8 flex max-w-xl items-start gap-3 text-sm leading-relaxed text-slate-400">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" aria-hidden="true" />
            Human-delivered services and capability-scoped FEUS.ai adoption, matched to your environment and goals.
          </p>
        </div>
      </div>
    </section>
  )
}

function CredibilityRail() {
  return (
    <section className="border-b border-slate-200 bg-white" aria-label="FEUS operating principles">
      <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
        {trustSignals.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-4 py-6 sm:px-5 sm:first:pl-0 sm:last:pr-0">
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-feus-700" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-ink">{title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ValueSection() {
  return (
    <section className="section-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel tone="light">What makes FEUS different</SectionLabel>
              <h2 className="section-heading mt-5 text-ink text-balance">One partner from business intent to operational reality.</h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-600 text-pretty">
              FEUS connects advisory thinking, hands-on engineering, experience design, and governance. That means fewer gaps between the strategy people approve, the systems teams build, and the outcomes clients experience.
            </p>
          </div>
        </AnimatedSection>
        <div className="mt-14 grid gap-8 border-y border-slate-200 py-10 md:grid-cols-3">
          {[
            ['See the whole system', 'Business, data, technology, people, and risk are designed together.'],
            ['Build what can operate', 'Recommendations stay grounded in delivery, ownership, and maintainability.'],
            ['Prove what is ready', 'Maturity and trust are communicated with evidence and explicit boundaries.'],
          ].map(([title, detail], index) => (
            <AnimatedSection key={title} delay={index * 80}>
              <p className="text-xs font-bold text-feus-700">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{detail}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section-mist py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            tone="light"
            label="Capabilities"
            title="A connected portfolio for modern business"
            subtitle="Choose a focused engagement or bring us a challenge that crosses disciplines. Every path starts with the result you need, not a preset technology package."
          />
        </AnimatedSection>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicePaths.map(({ icon: Icon, title, description, benefit, href, accent }, index) => (
            <AnimatedSection key={title} delay={(index % 3) * 70}>
              <Link to={href} className="surface-card group flex h-full flex-col p-6 sm:p-7">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase text-feus-700">{benefit}</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-feus-800">
                  Explore this capability
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/services" variant="outline">View all services</CTAButton>
        </div>
      </div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section className="section-ink py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <AnimatedSection>
            <SectionLabel>FEUS.ai</SectionLabel>
            <h2 className="section-heading mt-5 text-white text-balance">Governed intelligence for real operations.</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {POSTURE.valueStatement} Human intent, policy, identity, approvals, and evidence remain part of the operating model.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {POSTURE.lifecycleStatement} {POSTURE.availabilityQualifier}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton to="/feus-ai">Explore FEUS.ai</CTAButton>
              <CTAButton to="/trust" variant="secondary">Review trust evidence</CTAButton>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <WorkflowVisual />
          </AnimatedSection>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featuredAgents.map((agent) => (
            <Link key={agent.id} to={agent.route} className="group border-t border-white/15 pt-5">
              <StatusBadge status={agent.status} />
              <h3 className="mt-4 text-lg font-bold text-white">{agent.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{agent.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-feus-200">
                View capability
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  return (
    <section className="section-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            tone="light"
            label="Where FEUS fits"
            title="Built for consequential work"
            subtitle="FEUS supports teams that need technology to be ambitious, practical, and accountable at the same time."
          />
        </AnimatedSection>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {useCases.map(({ icon: Icon, audience, challenge }, index) => (
            <AnimatedSection key={audience} delay={(index % 2) * 80}>
              <div className="flex gap-5 border-t border-slate-200 pt-6">
                <Icon className="h-6 w-6 flex-shrink-0 text-coral-500" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-ink">{audience}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{challenge}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutcomesSection() {
  return (
    <section className="bg-feus-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <SectionLabel>Business value</SectionLabel>
              <h2 className="section-heading mt-5 text-white">Outcomes defined before delivery.</h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-300">
              We establish relevant measures during discovery rather than promise universal figures. The goal is a visible connection between the work, the operating change, and the value your team can assess.
            </p>
          </div>
        </AnimatedSection>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <AnimatedSection key={outcome.title} delay={index * 60}>
              <div className="border-t-2 border-accent-400/60 pt-5">
                <h3 className="text-lg font-bold text-white">{outcome.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{outcome.detail}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="section-mist py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            tone="light"
            label="How we work"
            title="A direct path from ambiguity to action"
            subtitle="Engagements stay collaborative, transparent, and grounded in what your organization can operate."
          />
        </AnimatedSection>
        <ol className="grid gap-8 md:grid-cols-4">
          {process.map(({ step, title, detail }, index) => (
            <AnimatedSection key={step} delay={index * 70}>
              <li className="relative border-l-2 border-feus-300 pl-5">
                <span className="text-sm font-bold text-feus-700">{step}</span>
                <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{detail}</p>
              </li>
            </AnimatedSection>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="section-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid overflow-hidden rounded-lg bg-ink text-white lg:grid-cols-[1fr_0.85fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <SectionLabel>Ready to engage?</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl text-balance">Bring us the challenge that matters now.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                Start with a consultation, request a FEUS.ai demonstration, or send a written brief. We will route the conversation to the right capability.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CalendlyButton className="btn-primary" icon={ArrowRight}>Book a consultation</CalendlyButton>
                <CTAButton to="/contact" variant="secondary">Send your brief</CTAButton>
              </div>
            </div>
            <div className="border-t border-white/10 bg-feus-950/60 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
              <p className="text-xs font-bold uppercase text-accent-300">Three ways to begin</p>
              <ul className="mt-6 space-y-5 text-sm text-slate-300">
                <li className="flex gap-3"><Workflow className="h-5 w-5 flex-shrink-0 text-feus-200" aria-hidden="true" /> Scope a services or transformation engagement.</li>
                <li className="flex gap-3"><ShieldCheck className="h-5 w-5 flex-shrink-0 text-feus-200" aria-hidden="true" /> Evaluate governed AI for a defined environment.</li>
                <li className="flex gap-3"><Film className="h-5 w-5 flex-shrink-0 text-feus-200" aria-hidden="true" /> Discuss digital, media, or visual storytelling needs.</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      <SEO
        title="Enterprise Technology & Governed AI"
        description="FEUS connects enterprise AI, data, cloud, automation, digital platforms, and media with practitioner-led delivery and governance-first operating discipline."
      />
      <Hero />
      <CredibilityRail />
      <ValueSection />
      <ServicesSection />
      <PlatformSection />
      <UseCasesSection />
      <OutcomesSection />
      <ProcessSection />
      <ClosingSection />
    </div>
  )
}
