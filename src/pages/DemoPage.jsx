import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { DEMO_DISCLAIMER, ROI_STATEMENT } from '../data/publicStatus'

/**
 * /demo — the evaluation entry point.
 *
 * This used to be a noindexed policy note that only existed to constrain how
 * demonstrations are run. The rules still matter and are still here, but a
 * visitor arriving from "Request a demonstration" needs to know what they will
 * actually see and how it differs from adopting the product. Publishing the
 * limits alongside the offer is the point: a demonstration that is honest about
 * running on synthetic data in LOCAL is worth more than one that is not.
 */
export default function DemoPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Request a Controlled Demonstration"
        description="See FEUS.ai run: a controlled demonstration on synthetic data in a LOCAL environment, with the governance decisions and refusals visible. Nothing connects to your systems."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Evaluating FEUS.ai</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            See it working, before you commit to anything
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            A controlled demonstration is run with you by our engineers. There is
            nothing to install, nothing to connect, and no account to create. It is
            the fastest way to judge whether the governance model fits how your
            organisation actually works.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact?type=demo">Request a demonstration</CTAButton>
            <CTAButton to="/get-started" variant="secondary">
              Or see the adoption path
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto grid gap-8">
          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">What you will see</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>A request classified, checked against policy, and routed to a model that is eligible for it.</li>
              <li>A request refused, with the rule that refused it named and what would have to change.</li>
              <li>The evidence kept for each turn: the routing decision, token counts, estimated cost, and the audit reference.</li>
              <li>Where a human approval is required, and what the approver is shown.</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Watching the platform refuse is the part worth your time. Anything can
              answer a question; the question is what it declines to do.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="font-mono text-sm font-semibold text-amber-300/90 mb-3">
              {DEMO_DISCLAIMER.compact}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{DEMO_DISCLAIMER.long}</p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">Demonstration rules</h2>
            <p className="mb-3 text-gray-400">
              Every demonstration follows these, without exception.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Demonstrations run in a LOCAL environment with synthetic or fixture inputs only.</li>
              <li>No customer database, ITSM tenant, identity provider, model provider, secret store, or cloud resource is connected.</li>
              <li>The demo disclaimer remains visible for the duration of the session.</li>
              <li>Connector interactions use mock transports and are identified as such.</li>
              <li>No demonstration output may be represented as a production result.</li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">About ROI figures in demonstrations</h2>
            <p>{ROI_STATEMENT.statement}</p>
            <p className="mt-3 text-gray-400">
              Every FEUS ROI Estimate panel displays: {ROI_STATEMENT.requiredLabels.join(' · ')}.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">What a demonstration is not</h2>
            <p>
              A demonstration is not a trial of your own data and it does not grant
              access to the runtime. Running FEUS against your systems means going
              through{' '}
              <Link to="/get-started" className="text-feus-200 underline underline-offset-2">
                onboarding
              </Link>
              : identity, environments, connections, governance rules, budget policy,
              and validation, agreed with your team before anything is enabled.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/contact?type=demo">Request a controlled demonstration</CTAButton>
            <CTAButton to="/status" variant="secondary">Platform status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
