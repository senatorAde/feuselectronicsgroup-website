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
        description="FEUS RequestOps is a Controlled Preview extension for governed service-request intake and routing. Vendor connectors remain Preview against mock transports."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Extension product family</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS RequestOps</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-300/90">
            Controlled Preview · ITSM connectors in Preview
          </p>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS RequestOps is the governed service-request intake and routing
            extension. At the assessed revision, typed intake and deterministic
            classification are implemented and tested against an in-memory adapter,
            the Service Request Agent package contains no direct database surface,
            and its tested outbound path submits typed work orders to the FEUS
            Control Plane. Vendor connector contracts for ServiceNow, Jira Service
            Management, and Azure DevOps work items are in Preview against mock
            transports with dry-run defaults. No live ticket source, tenant, or
            end-to-end ticket lifecycle has been exercised.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What exists today</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Typed service-request intake and deterministic classification (in-memory adapter).</li>
              <li>A structural guarantee: no direct database driver or executor surface in the agent package.</li>
              <li>An outbound path that goes through the Control Plane rather than to a database.</li>
              <li>Connector contracts carrying secret references without inline secret values.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What does not exist yet</h2>
            <ul className="glass-card rounded-2xl p-6 border-l-4 border-rose-500 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Any live ITSM integration — no tenant, credentials, field mapping, or network route has been exercised.</li>
              <li>Sanitized outbound ticket updates that meet the release threshold (four residual leak classes identified).</li>
              <li>A production-qualified ITSM adapter; current vendor connectors remain mock-tested with dry-run defaults.</li>
              <li>Execution of the resulting work orders — the Control Plane path stops at a verdict.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">RequestOps capability evidence</h2>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable family="FEUS RequestOps" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 text-xs text-gray-400 leading-relaxed">
            <p className="font-mono font-semibold text-amber-300/90 mb-2">{DEMO_DISCLAIMER.compact}</p>
            <p>{DEMO_DISCLAIMER.long}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/integrations">Integration status</CTAButton>
            <CTAButton to="/status" variant="secondary">Platform status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
