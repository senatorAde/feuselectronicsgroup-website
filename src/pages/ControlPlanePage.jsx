import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { CapabilityStatusTable } from '../components/statusComponents'

/**
 * /control-plane — FEUS Control Plane architecture component page
 * (approved messaging §8). Not a separately available product.
 */
export default function ControlPlanePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS Control Plane"
        description="The FEUS Control Plane is the implemented in-process coordination layer for typed work orders, routing, approvals, and policy checks. It has no execution dispatcher and is not a separately available product."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Architecture component</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS Control Plane</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-300/90">
            Implementation verified in-process only · Not a separately available product
          </p>
          {/* Approved messaging §8 */}
          <p className="mt-6 text-gray-300 leading-relaxed">
            The FEUS Control Plane is the coordination layer of the FEUS.ai
            architecture. At the certified revision it implements typed work-order
            lifecycles, deterministic deny-by-default agent and capability routing,
            typed sanitized cross-agent messages, identity non-propagation across
            handovers, independent approval binding, and policy checks before side
            effects — all verified in-process by automated tests. It has no
            execution dispatcher: no work order reaches a database, and shared
            durable state has not been established.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Governance properties (tested in-process)</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Typed work-order states and transitions.</li>
              <li>Policy enforcement before any reachable side effect, defaulting to denial.</li>
              <li>Deterministic, deny-by-default agent and capability routing.</li>
              <li>Typed cross-agent contracts that reject raw strings.</li>
              <li>Identity non-propagation: handovers rebind the receiving service principal.</li>
              <li>Approval contracts binding request, target, action, environment, plan, expiry, and separation of duties.</li>
              <li>Operator override that can cancel, deny, or escalate — but never widen authority.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Preview boundaries</h2>
            <ul className="glass-card rounded-2xl p-6 border-l-4 border-slate-500/60 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>No execution dispatcher — governed requests stop at a verdict.</li>
              <li>State is not established as shared, restart-safe, or deployed.</li>
              <li>Approval persistence can silently degrade to process memory.</li>
              <li>No live request source, deployed registry, RBAC system, or identity provider has been exercised.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Control Plane capability evidence</h2>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable family="FEUS Control Plane" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/architecture">See the current-state architecture</CTAButton>
            <CTAButton to="/status" variant="secondary">Platform status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
