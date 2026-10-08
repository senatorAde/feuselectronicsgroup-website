import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { DEMO_DISCLAIMER, ROI_STATEMENT } from '../data/publicStatus'
import { LIVE_DEMO } from '../data/demoExperience'
import { CLOUD_RUNTIME } from '../data/cloudRuntime'

/**
 * /demo — the evaluation entry point.
 *
 * The guided live session is the primary offer; the offline walkthrough is a
 * separate option with its own label.
 */
export default function DemoPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Request a Guided Live Demonstration"
        description={LIVE_DEMO.summary}
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Evaluating FEUS.ai</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Guided live demonstration
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {LIVE_DEMO.summary}
          </p>
          <p className="mt-4 text-sm font-semibold text-feus-200">{LIVE_DEMO.label}</p>
          <p className="mt-4 text-gray-300 leading-relaxed">{LIVE_DEMO.access}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact?type=demo#contact-form">Request a guided live demo</CTAButton>
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
              <li>A sample request classified, checked by the FEUS Policy Router, and routed to an eligible Microsoft Foundry model on the production Azure service.</li>
              <li>A request refused, with the rule that refused it named and what would have to change.</li>
              <li>The evidence kept for each turn: the routing decision, token counts, estimated cost, and the audit reference.</li>
              <li>Where a human approval is required: a held request and its named rule, not an approval bypass.</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Watching the platform refuse is the part worth your time. Anything can
              answer a question; the question is what it declines to do.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">How the live session runs</h2>
            <p>{LIVE_DEMO.budget}</p>
            <p className="mt-3">{LIVE_DEMO.boundary}</p>
            <p className="mt-3">The live session uses the FEUS.ai production service on Microsoft Azure, with Microsoft Entra ID sign-in and Microsoft Foundry models.</p>
            <p className="mt-3 text-gray-400">{CLOUD_RUNTIME.qualification}</p>
          </div>

          <div id="offline-demo" className="glass-card rounded-2xl p-6 scroll-mt-24">
            <h2 className="text-lg font-semibold text-white mb-3">Alternative: offline walkthrough</h2>
            <p className="text-sm text-gray-300 mb-3">Choose a guided offline walkthrough when a live session is not convenient. It uses recorded sample responses, and no Entra access is needed.</p>
            <p className="text-sm font-semibold text-feus-200 mb-3">{DEMO_DISCLAIMER.compact}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{DEMO_DISCLAIMER.long}</p>
            <div className="mt-5"><CTAButton to="/contact?type=offline-demo#contact-form" variant="secondary">Request the offline option</CTAButton></div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">About ROI figures in demonstrations</h2>
            <p>{ROI_STATEMENT.statement}</p>
            <p className="mt-3">{LIVE_DEMO.cost}</p>
            <p className="mt-3 text-gray-400">
              Every FEUS ROI Estimate panel displays: {ROI_STATEMENT.requiredLabels.join(' · ')}.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">What a demonstration is not</h2>
            <p>
              A demonstration is not a trial of your own data. Demo access is limited
              to the agreed session and does not grant customer-system access. Adoption means going
              through{' '}
              <Link to="/get-started" className="text-feus-200 underline underline-offset-2">
                onboarding
              </Link>
              : identity, environments, connections, governance rules, budget policy,
              and validation, agreed with your team before anything is enabled.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/contact?type=demo#contact-form">Request a guided live demo</CTAButton>
            <CTAButton to="/status" variant="secondary">Service status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
