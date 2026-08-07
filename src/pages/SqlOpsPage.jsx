import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { CapabilityStatusTable } from '../components/statusComponents'

/**
 * /sqlops — FEUS SQLOps family page (approved messaging §6).
 * Label: "Implementation evidence only · Not production approved".
 */
export default function SqlOpsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS SQLOps"
        description="FEUS SQLOps is the reserved product family for SQL Server-focused governance and operations. vNext end-to-end execution is not currently available."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Reserved product family</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS SQLOps</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-300/90">
            Implementation evidence only · Not production approved
          </p>
          {/* Approved messaging §6 */}
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS SQLOps is the reserved name for FEUS.ai&rsquo;s SQL Server-focused
            governance and operations family. At the certified revision, a legacy
            SQL Server gateway contains a real hash-pinned pyodbc execution path
            covered by automated tests, and the vNext governance path — typed work
            orders, policy checks, approval binding, and pre-execution gates — is
            implemented up to a fail-closed boundary. End-to-end vNext execution is
            not available: no execution dispatcher exists and no SQL executor is
            bound. No live database operation was initiated at the certified
            revision.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What exists today</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>A tested legacy SQL Server gateway implementation (no live operation initiated).</li>
              <li>Policy checks that run before the currently reachable execution boundary and default to denial.</li>
              <li>Pre-execution governance gates (stages 0–5) that fail closed under their tested conditions.</li>
              <li>A fail-closed stage 6: with no bound executor, governed requests stop at a verdict.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What does not exist yet</h2>
            <ul className="glass-card rounded-2xl p-6 border-l-4 border-rose-500 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>A vNext execution dispatcher or bound SQL executor.</li>
              <li>Live governed database execution of any kind.</li>
              <li>A compensating rollback executor.</li>
              <li>Production deployment approval for any SQLOps capability.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">SQLOps capability evidence</h2>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable family="FEUS SQLOps" />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Control Plane and Protected Execution Service capabilities that support the
              SQLOps path are listed on the{' '}
              <Link to="/feus-ai" className="text-feus-300 underline underline-offset-2">platform capability table</Link>.
            </p>
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
