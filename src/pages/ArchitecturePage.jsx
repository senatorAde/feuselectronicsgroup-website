import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { POSTURE, MODEL_PROVIDER_STATEMENT } from '../data/publicStatus'

/**
 * /architecture — assessed vNext current-state architecture page.
 * Diagram rules (Session 13A visual requirements §13 / Trust plan §8):
 *  - CURRENT STATE label, revision binding, environment, legend, alt text.
 *  - Solid = implemented and tested; dashed/red = missing, mock, or disabled.
 *  - The flow STOPS at the fail-closed execution boundary. No connected
 *    database, provider logos, or green end-to-end arrows.
 */

const implementedStages = [
  {
    n: '1',
    title: 'Typed service request intake',
    body: 'A service request enters through FEUS RequestOps as a typed, classified request (tested against an in-memory adapter — no live ticket source).',
  },
  {
    n: '2',
    title: 'Governed work order',
    body: 'The request becomes a typed work order submitted to the FEUS Control Plane. The agent package has no direct database surface.',
  },
  {
    n: '3',
    title: 'Routing, policy, and approval',
    body: 'Deny-by-default routing selects a specialist; policy checks run before any side effect; approvals bind request, target, action, environment, plan, expiry, and separation of duties.',
  },
  {
    n: '4',
    title: 'Pre-execution governance gates (stages 0–5)',
    body: 'The Protected Execution Service evaluates identity, environment, policy, approval, and evidence gates. Each gate fails closed under its tested conditions.',
  },
]

export default function ArchitecturePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="vNext Current-State Architecture"
        description="The assessed FEUS.ai vNext request path: typed intake, governed work orders, deny-by-default routing, pre-execution gates, and a fail-closed unbound execution boundary."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Architecture · Assessed vNext current state</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            How the assessed vNext request flows
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            This page shows the RequestOps-to-Control-Plane-to-PES path at the
            Session 12D assessed revision, including where it intentionally stops.
            In this vNext design, stages 0–5 are implemented and fail closed, while
            stage 6 is unbound because no dispatcher or executor exists. This diagram
            does not represent the separately documented operational core GEG SQL
            Server workflow.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          {/* Diagram metadata block */}
          <div
            role="img"
            aria-label={
              'Current-state diagram of the assessed FEUS.ai vNext governed request path. ' +
              'Implemented and tested: a typed service request enters FEUS RequestOps, becomes a governed work order, ' +
              'passes through Control Plane routing, policy, and approval, then through pre-execution governance gates stages zero through five. ' +
              'The path then reaches a fail-closed execution boundary: stage six execution is unavailable because no dispatcher or SQL executor exists, ' +
              'so the request stops at a recorded verdict with local evidence. ' +
              'Not implemented or mock in this vNext path: live ITSM connectors, sanitized outbound ticket updates, model invocation, live database execution, and rollback. The diagram does not describe the operational core GEG path.'
            }
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 border-b border-white/[0.08] pb-4 mb-6">
              <span className="font-semibold text-amber-300/90 uppercase tracking-wide">Assessed vNext current state</span>
              <span>Diagram FEUS-ARCH-PUB-001 · v1.0</span>
              <span className="font-mono break-all">Revision {POSTURE.certifiedRevision}</span>
              <span>Assessed environment: LOCAL / test evidence only</span>
            </div>

            <ol className="space-y-0">
              {implementedStages.map((s, i) => (
                <li key={s.n} className="relative pl-12 pb-8">
                  {i < implementedStages.length - 1 && (
                    <span className="absolute left-4 top-8 bottom-0 w-0.5 bg-feus-500/50" aria-hidden="true" />
                  )}
                  <span
                    className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-feus-500/70 bg-navy-900 text-feus-300 text-sm font-bold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <h3 className="text-white font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">{s.body}</p>
                </li>
              ))}

              {/* Fail-closed boundary — the flow stops here */}
              <li className="relative pl-12">
                <span
                  className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-dashed border-rose-500 bg-navy-900 text-rose-300 text-sm font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  ✕
                </span>
                <div className="border-l-4 border-rose-500 bg-rose-500/5 rounded-r-xl p-4">
                  <h3 className="text-white font-semibold">
                    Fail-closed execution boundary — stage 6 execution unavailable
                  </h3>
                  <p className="mt-1 text-sm text-gray-300 leading-relaxed">
                    No execution dispatcher exists and no SQL executor is bound. The
                    governed request stops here at a recorded verdict with local
                    evidence. No database is reached through the vNext path.
                  </p>
                </div>
              </li>
            </ol>

            {/* Not-implemented lane */}
            <div className="mt-8 border-t border-dashed border-white/[0.15] pt-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Not implemented, mock, or disabled at this revision
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-400">
                <li className="border border-dashed border-rose-500/40 rounded-lg px-3 py-2">Live ITSM connectors (mock transports only)</li>
                <li className="border border-dashed border-rose-500/40 rounded-lg px-3 py-2">Sanitized outbound ticket updates (not released)</li>
                <li className="border border-dashed border-rose-500/40 rounded-lg px-3 py-2">Model invocation (disabled)</li>
                <li className="border border-dashed border-rose-500/40 rounded-lg px-3 py-2">vNext live database execution (no dispatcher/executor)</li>
                <li className="border border-dashed border-rose-500/40 rounded-lg px-3 py-2">Compensating rollback (does not exist)</li>
                <li className="border border-dashed border-rose-500/40 rounded-lg px-3 py-2">Cloud deployment (templates incomplete, undeployed)</li>
              </ul>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-6 h-0.5 bg-feus-500/70" aria-hidden="true" />
                Implemented and tested (in-process)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-6 border-t-2 border-dashed border-rose-500/70" aria-hidden="true" />
                Missing, mock, or disabled
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Security review: SEC-REV-13B-ARCH-001 · This diagram intentionally shows no
              connected database, vendor tenant, or model provider.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
              <h2 className="text-lg font-semibold text-white mb-2">About &ldquo;seven-stage&rdquo; language</h2>
              <p>
                In this assessed vNext architecture, seven-stage refers to gate stages
                0–6. Stages 0–5 are implemented and fail closed under their tested
                conditions. Stage 6 is unbound at this revision. The core GEG has its
                own seven-gate operational workflow and evidence record.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
              <h2 className="text-lg font-semibold text-white mb-2">{MODEL_PROVIDER_STATEMENT.headline}</h2>
              <p>{MODEL_PROVIDER_STATEMENT.statement}</p>
              <p className="mt-2 text-gray-400">{MODEL_PROVIDER_STATEMENT.designNote}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton to="/feus-ai">Platform overview</CTAButton>
            <CTAButton to="/status" variant="secondary">Platform status</CTAButton>
            <CTAButton to="/integrations" variant="secondary">Integration status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
