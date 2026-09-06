import { Link } from 'react-router-dom'
import { ArrowRight, CircleDollarSign, FileCheck2, ShieldCheck, UserRoundCheck } from 'lucide-react'
import SEO from '../components/SEO'
import AnimatedSection from '../components/AnimatedSection'
import WorkflowVisual from '../components/WorkflowVisual'
import { SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import {
  CapabilityLifecycleTable, EvidenceCallout,
} from '../components/statusComponents'
import { POSTURE, PRODUCT_FAMILIES } from '../data/publicStatus'

const operatingPrinciples = [
  {
    icon: UserRoundCheck,
    title: 'Human authority',
    description: 'People set intent, choose the target, and remain involved when risk or change requires a decision.',
  },
  {
    icon: ShieldCheck,
    title: 'Bounded execution',
    description: 'Identity, policy, data safeguards, and capability scope constrain what a workflow may do.',
  },
  {
    icon: FileCheck2,
    title: 'Evidence by design',
    description: 'Requests, decisions, and permitted outcomes are structured for review and operational accountability.',
  },
  {
    icon: CircleDollarSign,
    title: 'Cost-aware operation',
    description: 'Architecture and workflow choices can account for resource use, efficiency, and sustainable operating value.',
  },
]

/**
 * /feus-ai — primary FEUS.ai product page.
 *
 * Leads with business outcome, governed automation, operational maturity,
 * platform capabilities, and an adoption CTA. Exact-revision release-gate
 * detail, the Session 12D capability matrix, and known limitations live in the
 * Trust Center (/trust, /status) and are linked from here, never used as the
 * product headline.
 */
export default function FeusAiPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS.ai Platform"
        description="FEUS.ai is a governed AI Data Operations platform with an operationally validated core and capability-specific preview boundaries for new agents and integrations."
      />

      <section className="relative flex min-h-[680px] items-center overflow-hidden bg-ink px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8">
        <img
          src="/brand/feus-hero-system.webp"
          alt=""
          width="1600"
          height="1040"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/25" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <SectionLabel>{POSTURE.headline}</SectionLabel>
            <h1 className="mt-5 font-display text-5xl font-bold text-white sm:text-6xl">FEUS.ai</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-200">
              Turn operational intent into controlled action across AI, data, assurance, and automation.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
              FEUS.ai coordinates agents, tools, policies, approvals, and evidence behind a unified operator experience. {POSTURE.architectureStatement}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton to="/contact?type=demo">Request a capability briefing</CTAButton>
              <CTAButton to="/agents" variant="secondary">Explore the agent portfolio</CTAButton>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400">
              {POSTURE.availabilityQualifier}{' '}
              <Link to="/status" className="font-semibold text-feus-200 underline underline-offset-2">Capability status</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section-light py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <AnimatedSection>
              <SectionLabel tone="light">Operating model</SectionLabel>
              <h2 className="section-heading mt-5 text-ink">From business request to accountable result.</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                FEUS.ai is designed to help teams automate consequential work without obscuring who asked, which controls applied, when a person had to decide, or what actually happened.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CTAButton to="/architecture" variant="dark">Explore architecture</CTAButton>
                <CTAButton to="/trust" variant="outline">Visit the Trust Center</CTAButton>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <WorkflowVisual />
            </AnimatedSection>
          </div>

          <div className="mt-14 grid gap-7 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {operatingPrinciples.map(({ icon: Icon, title, description }, index) => (
              <AnimatedSection key={title} delay={index * 60}>
                <Icon className="h-6 w-6 text-feus-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ink py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Operational evidence</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold text-white">Operational maturity with governance intact</h2>
          <p className="mt-6 text-slate-300 leading-relaxed">
            {POSTURE.validationStatement} The core GovernedExecutionGateway path has documented real-world FEUS SQL Server usage: 48 of 48 provisioning batches passed all seven gates and the recorded audit chain verified. The vNext revision additionally completed {POSTURE.testsPassedAtRevision.toLocaleString()} automated tests and established policy, routing, approval, handoff, and execution-truth properties. {POSTURE.lifecycleStatement}
          </p>
          <div className="mt-8"><EvidenceCallout /></div>
        </div>
      </section>

      <section className="section-mist py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel tone="light">Capability portfolio</SectionLabel>
          <h2 className="text-3xl font-bold text-ink mt-4 mb-4">
            Mature core and controlled expansion
          </h2>
          <p className="text-slate-600 max-w-3xl mb-10">
            Each family carries its own lifecycle. A preview extension does not make
            the entire platform preview, and core maturity does not promote an
            unvalidated integration.
          </p>
          <div className="mb-10">
            <CTAButton to="/agents" variant="outline">Agent and integration portfolio</CTAButton>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCT_FAMILIES.map((fam) => (
              <Link
                key={fam.name}
                to={fam.route}
                className="surface-card block p-6 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-ink">{fam.name}</h3>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-feus-700 flex-shrink-0 mt-1" aria-hidden="true" />
                </div>
                <p className="mt-2 text-xs font-bold uppercase text-feus-800">
                  {fam.statusLine}
                </p>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{fam.description}</p>
                <p className="mt-3 text-xs text-slate-500">See the capability lifecycle and exact restrictions below.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      <section className="section-ink py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Lifecycle and adoption</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-4 mb-4">
            Capability-specific status
          </h2>
          <p className="text-gray-400 max-w-3xl mb-8">
            Operational usage, release certification, public availability,
            environment scope, and next maturity milestone are reported separately.
          </p>
          <div className="glass-card rounded-2xl p-6">
            <CapabilityLifecycleTable />
          </div>
        </div>
      </section>

      <GlowDivider />

      <section className="section-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel tone="light">Adoption</SectionLabel>
          <h2 className="text-3xl font-bold text-ink mt-4">
            Evaluate FEUS.ai for your environment
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Enterprise adoption is scoped by capability, target environment, identity
            model, and governance requirements. Our team will map your estate to the
            capabilities that fit it today and the ones on a controlled validation path.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact?type=demo" variant="dark">Book a consultation</CTAButton>
            <CTAButton to="/demo" variant="outline">Request a demo</CTAButton>
            <CTAButton to="/architecture" variant="outline">Current-state architecture</CTAButton>
          </div>
          <p className="mt-8 text-sm text-slate-600">
            Detailed assurance evidence — the exact-revision capability matrix,
            security-control results, release assessment scope, and known
            limitations — is published in the{' '}
            <Link to="/trust" className="font-semibold text-feus-800 underline underline-offset-2">Trust Center</Link>,
            with per-capability detail on the{' '}
            <Link to="/status" className="font-semibold text-feus-800 underline underline-offset-2">status page</Link>{' '}
            and answers in the{' '}
            <Link to="/faq" className="font-semibold text-feus-800 underline underline-offset-2">platform FAQ</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
