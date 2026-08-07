import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { IntegrationStatusTable } from '../components/statusComponents'
import { MODEL_PROVIDER_STATEMENT, POSTURE } from '../data/publicStatus'

/**
 * /integrations — external dependency status page (IMPL-039, IMPL-040).
 * No vendor logos are displayed as support or partnership claims.
 */
export default function IntegrationsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Integration Status"
        description="FEUS.ai external dependency status: zero live-verified product-facing integrations at the certified revision. ITSM connectors are demonstration-only; model invocation is disabled."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Integrations</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            External dependency status
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai has {POSTURE.liveVerifiedIntegrations} product-facing
            live-verified external integrations at the certified revision. The table
            below states the exact public treatment of every external dependency.
            Vendor names appear only to identify contract targets — they are not
            support, partnership, or certification claims.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div className="glass-card rounded-2xl p-6">
            <IntegrationStatusTable />
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-2">
              {MODEL_PROVIDER_STATEMENT.headline}
            </h2>
            <p>{MODEL_PROVIDER_STATEMENT.statement}</p>
            <p className="mt-2 text-gray-400">{MODEL_PROVIDER_STATEMENT.designNote}</p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-lg font-semibold text-white mb-2">
              What &ldquo;demonstration only&rdquo; means for connectors
            </h2>
            <p>
              ServiceNow, Jira Service Management, and Azure DevOps work-item connector
              contracts are exercised against mock transports in controlled
              demonstrations. No live tenant, credentials, field mapping, network
              route, or end-to-end ticket lifecycle has been exercised, and no
              connector is approved for the label &ldquo;integration ready.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/requestops">FEUS RequestOps</CTAButton>
            <CTAButton to="/status" variant="secondary">Platform status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
