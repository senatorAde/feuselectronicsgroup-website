import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { DEMO_DISCLAIMER, ROI_STATEMENT } from '../data/publicStatus'

/**
 * /demo — controlled demonstration policy page (IMPL-049).
 * noindex: demos are by arrangement, not a public product surface.
 */
export default function DemoPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Controlled Demonstrations"
        description="FEUS.ai controlled demonstration policy: LOCAL environment, synthetic inputs, permanent demo disclaimer, and estimate-only ROI figures."
        noindex
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Controlled demonstrations</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            How FEUS.ai demonstrations work
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai can be shown in a controlled demonstration by arrangement.
            Every demonstration follows the policy below, without exception.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto grid gap-8">
          <div className="glass-card rounded-2xl p-6">
            <p className="font-mono text-sm font-semibold text-amber-300/90 mb-3">
              {DEMO_DISCLAIMER.compact}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{DEMO_DISCLAIMER.long}</p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-3">Demonstration rules</h2>
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

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/contact">Request a controlled demonstration</CTAButton>
            <CTAButton to="/status" variant="secondary">Platform status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
