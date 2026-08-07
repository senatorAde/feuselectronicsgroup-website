import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import {
  ReleaseDecision, CapabilityStatusTable, KnownLimitationList, EvidenceCallout,
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
        description="FEUS.ai is a pre-release governed data-operations architecture under controlled evaluation. It is not approved for production deployment."
      />

      {/* Hero — approved messaging §1 */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Pre-release · Controlled evaluation</SectionLabel>
          <h1 className="section-heading text-5xl sm:text-6xl mt-4">FEUS.ai</h1>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed">
            A governed data-operations architecture with implementation properties
            validated in LOCAL and test environments.
          </p>
          <p className="mt-4 text-gray-400">
            Not approved for production deployment. Zero of 45 capabilities are
            production verified.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/status">Review the public posture</CTAButton>
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
            Governance architecture first. Production claims only after evidence.
          </h2>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai is built around a fail-closed principle: operations that cannot
            complete their governance path do not execute. At the certified revision,
            typed work orders, deny-by-default routing, approval binding, policy
            checks before side effects, and pre-execution governance gates are
            implemented and covered by {POSTURE.testsPassedAtRevision.toLocaleString()}{' '}
            automated tests. End-to-end governed database execution is not yet
            available: the execution dispatcher does not exist and no SQL executor
            is bound, so the platform stops — by design — at a verdict rather than
            performing an unproven operation.
          </p>
          <div className="mt-8">
            <EvidenceCallout />
          </div>
        </div>
      </section>

      {/* Product families — approved messaging §4 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Product families</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-4 mb-4">
            Reserved families and architecture components
          </h2>
          <p className="text-gray-400 max-w-3xl mb-10">
            FEUS SQLOps, FEUS RequestOps, and FEUS Assurance are reserved product
            family names. Family names describe intended scope; the status label on
            each family — not the name — describes what exists today.
          </p>
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
                <p className="mt-3 text-xs text-gray-500">Implementation evidence only · Not production approved</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* Capability table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Capability evidence</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-4 mb-4">
            Publicly representable capabilities
          </h2>
          <p className="text-gray-400 max-w-3xl mb-8">
            Every capability below carries the status and qualification assigned by
            the independent Session 12D assessment. No capability may be displayed
            with a stronger status than this table.
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
