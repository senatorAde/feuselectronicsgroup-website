import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import {
  ReleaseDecision, CapabilityStatusTable, CapabilityLifecycleTable,
  KnownLimitationList, EvidenceCallout,
} from '../components/statusComponents'
import { POSTURE, PRODUCT_FAMILIES } from '../data/publicStatus'

/**
 * /feus-ai — platform overview rebuilt against the Session 13A approved
 * messaging (§3–§4). Copy marked "approved" is verbatim from
 * FEUS_VNEXT_APPROVED_MESSAGING.md and must not be reworded.
 */
export default function FeusAiPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS.ai Platform"
        description="FEUS.ai is a governed AI Data Operations platform with an operationally validated core and capability-specific preview boundaries for new agents and integrations."
      />

      {/* Hero — capability-scoped product posture */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Operationally validated core</SectionLabel>
          <h1 className="section-heading text-5xl sm:text-6xl mt-4">FEUS.ai</h1>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed">
            A governed AI Data Operations platform built for accountable enterprise
            workflows, controlled execution, and evidence-producing operations.
          </p>
          <p className="mt-4 text-gray-400">
            Core capabilities are available for controlled enterprise adoption after
            target qualification. New agents and integrations retain capability-specific
            preview limits. The assessed vNext release remains NO-GO above LOCAL.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/agents">Explore the agent portfolio</CTAButton>
            <CTAButton to="/status" variant="secondary">Review the public posture</CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Request an architecture briefing
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Platform overview — approved messaging §3 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white">
            Operational maturity with governance intact
          </h2>
          <p className="mt-6 text-gray-300 leading-relaxed">
            The core GovernedExecutionGateway path has documented real-world FEUS
            SQL Server usage: 48 of 48 provisioning batches passed all seven gates
            and the recorded audit chain verified. Separately, the assessed vNext
            revision completed {POSTURE.testsPassedAtRevision.toLocaleString()}{' '}
            automated tests and established meaningful policy, routing, approval,
            handoff, and execution-truth properties. Its new dispatcher and SQL
            executor are not bound, so that extension remains Controlled Preview.
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
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-300/90">
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

      {/* Exact-revision capability evidence table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Session 12D release evidence</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-4 mb-4">
            Exact-revision capability matrix
          </h2>
          <p className="text-gray-400 max-w-3xl mb-8">
            These rows retain the status and qualification assigned by Session 12D
            for the assessed vNext revision. They do not replace the product lifecycle
            table or erase separate core operational evidence.
          </p>
          <div className="glass-card rounded-2xl p-6">
            <CapabilityStatusTable />
          </div>
        </div>
      </section>

      {/* Limitations + posture */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Known limitations</h2>
            <div className="glass-card rounded-2xl p-6">
              <KnownLimitationList />
            </div>
          </div>
          <ReleaseDecision />
          <div className="flex flex-wrap gap-4">
            <CTAButton to="/architecture" variant="secondary">Current-state architecture</CTAButton>
            <CTAButton to="/trust" variant="secondary">Trust Center</CTAButton>
            <CTAButton to="/faq" variant="secondary">Platform FAQ</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
