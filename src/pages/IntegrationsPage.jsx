import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { IntegrationStatusTable } from '../components/statusComponents'
import { MODEL_PROVIDER_STATEMENT } from '../data/publicStatus'

/**
 * /integrations — external dependency status page (IMPL-039, IMPL-040).
 * No vendor logos are displayed as support or partnership claims.
 */
export default function IntegrationsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Integrations"
        description="FEUS.ai integrations: Microsoft Azure, Microsoft Entra ID and the Microsoft Foundry model catalog, governed SQL Server operations, and Oracle and ITSM connectors in preview."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Integrations</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Integrations
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai runs on Microsoft Azure with Microsoft Entra ID sign-in and a
            Microsoft Foundry model catalog. Governed SQL Server operations are
            delivered through the Expert path, and Oracle and ITSM connectors are
            available in preview through scoped engagements. Vendor names identify
            integration targets only; they are not partnership or certification claims.
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
              What &ldquo;Preview&rdquo; means for connectors
            </h2>
            <p>
              ServiceNow, Jira Service Management, and Azure DevOps work-item connectors
              are available in preview through a scoped engagement. They run with
              dry-run defaults and least-privilege configuration, connected to your
              sandbox tenant with field mappings agreed with your team.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/agents/oracle">FEUS OracleOps</CTAButton>
            <CTAButton to="/integrations/itsm" variant="secondary">FEUS ITSM Connect</CTAButton>
            <CTAButton to="/requestops">FEUS RequestOps</CTAButton>
            <CTAButton to="/status" variant="secondary">Service status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
