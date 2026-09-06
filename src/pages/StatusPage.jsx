import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import {
  ControlStatusTable,
  CapabilityLifecycleTable, IntegrationStatusTable, CapabilityStatusTable,
  EvidenceCallout,
} from '../components/statusComponents'
import {
  ReleaseDecision, PostureSummary, KnownLimitationList,
} from '../components/releaseComponents'
import {
  POSTURE, CAPABILITY_SUMMARY, MODEL_PROVIDER_STATEMENT,
} from '../data/publicStatus'
import { RELEASE_ASSESSMENT } from '../data/releaseAssessment'

/**
 * /status — machine-readable-adjacent public posture page.
 * Every strong public claim on the site links here (IMPL-035).
 * Content is bound to the certified revision; do not edit numbers by hand —
 * change src/data/publicStatus.js only when a superseding assessment exists.
 */
export default function StatusPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Platform Status"
        description="Current FEUS.ai capability status: platform posture, per-capability lifecycle, environment scope, dependency status, security-control results, and assessment scope."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Platform status</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            FEUS.ai current posture
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">{POSTURE.publicPostureStatement}</p>
          <p className="mt-4 text-gray-300 leading-relaxed">{POSTURE.statement}</p>
          <p className="mt-3 text-sm text-gray-500">{RELEASE_ASSESSMENT.supersessionRule}</p>

          <div className="mt-10">
            <ReleaseDecision />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-[minmax(0,1fr)] gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">At a glance</h2>
            <div className="glass-card rounded-2xl p-6">
              <PostureSummary />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Capability lifecycle</h2>
            <p className="text-gray-400 text-sm mb-6">
              Product lifecycle status is separate from the exact-revision release
              matrix. It identifies how each core capability or extension may be
              adopted or evaluated today.
            </p>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityLifecycleTable />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Session 12D release-matrix counts</h2>
            <p className="text-gray-400 text-sm mb-6">
              Session 12D assessed {POSTURE.totalCapabilities} rows for the named
              vNext revision and release scope. These counts are retained exactly;
              they are not a platform-lifetime operational usage measure.{' '}
              {CAPABILITY_SUMMARY.internalNote}
            </p>
            <div className="glass-card rounded-2xl p-6">
              <table className="w-full text-sm border-collapse">
                <caption className="sr-only">Capability status counts</caption>
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th scope="col" className="py-2 pr-4 text-gray-400 font-medium">Status</th>
                    <th scope="col" className="py-2 text-gray-400 font-medium">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Implementation verified', CAPABILITY_SUMMARY.implementationVerified],
                    ['Demonstration only', CAPABILITY_SUMMARY.demonstrationOnly],
                    ['Disabled pending approval', CAPABILITY_SUMMARY.disabledPendingApproval],
                    ['Internal only', CAPABILITY_SUMMARY.internalOnly],
                    ['Not approved for public representation', CAPABILITY_SUMMARY.notPubliclyRepresented],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-white/[0.06]">
                      <th scope="row" className="py-2 pr-4 text-gray-300 font-normal text-left">{k}</th>
                      <td className="py-2 text-white font-medium tabular-nums">{v}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="py-2 pr-4 text-gray-400 font-medium text-left">Production verified in Session 12D matrix</th>
                    <td className="py-2 text-white font-semibold tabular-nums">0</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-xs text-gray-500">{CAPABILITY_SUMMARY.oracleNote}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Exact-revision capability matrix</h2>
            <p className="text-gray-400 text-sm mb-6">
              These rows retain the status and qualification assigned by Session 12D
              for the assessed vNext revision. They do not replace the product
              lifecycle table above or the separately documented core operational
              evidence.
            </p>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Security controls (38 assessed)</h2>
            <div className="glass-card rounded-2xl p-6">
              <ControlStatusTable />
              <p className="mt-4 text-xs text-gray-500">
                Counts are reported exactly as assessed. FEUS.ai does not summarize control
                posture into a single score, grade, or seal.{' '}
                <Link to="/trust/security" className="text-feus-300 underline underline-offset-2">
                  Security posture detail
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">External dependencies</h2>
            <div className="glass-card rounded-2xl p-6">
              <IntegrationStatusTable />
              <p className="mt-4 text-sm text-gray-400">
                <strong className="text-white">{MODEL_PROVIDER_STATEMENT.headline}.</strong>{' '}
                {MODEL_PROVIDER_STATEMENT.statement}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Known limitations</h2>
            <div className="glass-card rounded-2xl p-6">
              <KnownLimitationList />
            </div>
          </div>

          <EvidenceCallout />

          <div className="text-sm text-gray-400 flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/trust" className="text-feus-300 underline underline-offset-2">Trust Center</Link>
            <Link to="/release-notes" className="text-feus-300 underline underline-offset-2">Posture history</Link>
            <Link to="/architecture" className="text-feus-300 underline underline-offset-2">Current-state architecture</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
