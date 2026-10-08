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
        description="The FEUS Control Plane is the coordination layer for typed work orders, routing, approvals, and policy checks, available in preview through a scoped engagement."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <SectionLabel>Architecture component</SectionLabel>
            <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS Control Plane</h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-300/90">
              Preview · available through a scoped engagement
            </p>
            {/* Approved messaging §8 */}
            <p className="mt-6 text-gray-300 leading-relaxed">
              The FEUS Control Plane is the coordination layer of the FEUS.ai
              architecture. It implements typed work-order lifecycles, deterministic
              deny-by-default agent and capability routing, typed sanitized
              cross-agent messages, identity non-propagation across handovers,
              independent approval binding, and policy checks before side effects,
              all covered by automated tests. It is offered in preview through a
              scoped engagement; governed database execution today runs through the
              seven-gate GovernedExecutionGateway.
            </p>
          </div>
          <figure className="mt-12 border-y border-white/10 py-4">
            <img
              src="/brand/feus-governed-pipeline.webp"
              alt="Conceptual illustration of human review, policy controls, evidence, and secure workflow stages"
              width="1672"
              height="941"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="pt-3 text-xs text-slate-400">
              Conceptual operating-model illustration, not a live system view.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="mx-auto grid w-full min-w-0 max-w-4xl grid-cols-[minmax(0,1fr)] gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Governance properties</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Preview scope</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Offered through a scoped engagement, with FEUS engineers alongside your team.</li>
              <li>Acceptance criteria are agreed with you before the preview starts.</li>
              <li>Governed database execution runs through the seven-gate gateway rather than Control Plane dispatch.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Control Plane capabilities</h2>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable family="FEUS Control Plane" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <CTAButton to="/architecture">See the architecture</CTAButton>
            <CTAButton to="/status" variant="secondary">Service status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
