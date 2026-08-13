import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import {
  CapabilityLifecycleTable, EvidenceCallout,
} from '../components/statusComponents'
import { POSTURE, PRODUCT_FAMILIES } from '../data/publicStatus'

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

      {/* Hero — business outcome first */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>{POSTURE.headline}</SectionLabel>
          <h1 className="section-heading text-5xl sm:text-6xl mt-4">FEUS.ai</h1>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed">
            FEUS.ai brings policy-aware AI orchestration, database operations,
            assurance, and automation into one governed experience.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            From Hello FEUS onboarding to day-to-day operational workflows, FEUS
            coordinates the right agents, tools, policies, approvals, and evidence
            behind a unified chat-first experience. {POSTURE.architectureStatement}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact">Discuss enterprise adoption</CTAButton>
            <CTAButton to="/demo" variant="secondary">Request a demo</CTAButton>
            <CTAButton to="/agents" variant="secondary">
              Explore the agent portfolio
            </CTAButton>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {POSTURE.availabilityQualifier}{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">
              Capability status
            </Link>
          </p>
        </div>
      </section>

      {/* Platform overview — approved messaging §3 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white">
            Operational maturity with governance intact
          </h2>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {POSTURE.validationStatement} The core GovernedExecutionGateway path has
            documented real-world FEUS SQL Server usage: 48 of 48 provisioning batches
            passed all seven gates and the recorded audit chain verified. The vNext
            revision additionally completed{' '}
            {POSTURE.testsPassedAtRevision.toLocaleString()} automated tests and
            established policy, routing, approval, handoff, and execution-truth
            properties. {POSTURE.lifecycleStatement}
          </p>
          <div className="mt-8">
            <EvidenceCallout />
          </div>
        </div>
      </section>

      {/* Product families */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Capability portfolio</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-4 mb-4">
            Mature core and controlled expansion
          </h2>
          <p className="text-gray-400 max-w-3xl mb-10">
            Each family carries its own lifecycle. A preview extension does not make
            the entire platform preview, and core maturity does not promote an
            unvalidated integration.
          </p>
          <div className="mb-10">
            <CTAButton to="/agents" variant="secondary">Agent and integration portfolio</CTAButton>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCT_FAMILIES.map((fam) => (
              <Link
                key={fam.name}
                to={fam.route}
                className="glass-card rounded-2xl p-6 block hover:border-feus-500/40 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{fam.name}</h3>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-feus-300 flex-shrink-0 mt-1" aria-hidden="true" />
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-feus-300/90">
                  {fam.statusLine}
                </p>
                <p className="mt-3 text-gray-300 text-sm leading-relaxed">{fam.description}</p>
                <p className="mt-3 text-xs text-gray-500">See the capability lifecycle and exact restrictions below.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
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

      {/* Adoption CTA + Trust Center pointer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Adoption</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-4">
            Evaluate FEUS.ai for your environment
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Enterprise adoption is scoped by capability, target environment, identity
            model, and governance requirements. Our team will map your estate to the
            capabilities that fit it today and the ones on a controlled validation path.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact">Book a consultation</CTAButton>
            <CTAButton to="/demo" variant="secondary">Request a demo</CTAButton>
            <CTAButton to="/architecture" variant="secondary">Current-state architecture</CTAButton>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            Detailed assurance evidence — the exact-revision capability matrix,
            security-control results, release assessment scope, and known
            limitations — is published in the{' '}
            <Link to="/trust" className="text-feus-300 underline underline-offset-2">Trust Center</Link>,
            with per-capability detail on the{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">status page</Link>{' '}
            and answers in the{' '}
            <Link to="/faq" className="text-feus-300 underline underline-offset-2">platform FAQ</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
