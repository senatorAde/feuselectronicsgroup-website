import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { CapabilityStatusTable } from '../components/statusComponents'
import { DEMO_DISCLAIMER } from '../data/publicStatus'

/**
 * /requestops — FEUS RequestOps extension-family page.
 */
export default function RequestOpsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS RequestOps"
        description="FEUS RequestOps provides governed service-request intake, routing, and ITSM connectors, available in preview through a scoped engagement."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Extension product family</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS RequestOps</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-300/90">
            Preview · available through a scoped engagement
          </p>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS RequestOps is the governed service-request intake and routing
            extension. It provides typed intake and deterministic classification,
            a Service Request Agent with no direct database surface, and an
            outbound path that submits typed work orders to the FEUS Control
            Plane. Connector contracts for ServiceNow, Jira Service Management,
            and Azure DevOps work items run with dry-run defaults. RequestOps is
            available in preview through a scoped engagement.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What it includes</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Typed service-request intake and deterministic classification.</li>
              <li>A structural guarantee: no direct database driver or executor surface in the agent package.</li>
              <li>An outbound path that goes through the Control Plane rather than to a database.</li>
              <li>Connector contracts carrying secret references without inline secret values.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Preview scope</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Your ticket source and ITSM sandbox are connected through a scoped engagement.</li>
              <li>Connectors run in dry-run mode by default; outbound ticket updates are not enabled in the preview.</li>
              <li>Database work arising from a request is handed to a governed specialist.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">RequestOps capabilities</h2>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable family="FEUS RequestOps" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 text-xs text-gray-400 leading-relaxed">
            <p className="font-semibold text-feus-200 mb-2">{DEMO_DISCLAIMER.compact}</p>
            <p>{DEMO_DISCLAIMER.long}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/integrations">Integrations</CTAButton>
            <CTAButton to="/status" variant="secondary">Service status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
