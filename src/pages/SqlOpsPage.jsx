import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { CapabilityStatusTable } from '../components/statusComponents'

/**
 * /sqlops — FEUS SQLOps family page. Separates the operational core
 * GEG path from the assessed vNext dispatcher/PES path.
 */
export default function SqlOpsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS SQLOps"
        description="FEUS SQLOps is the SQL Server governance and operations family: its core GEG path has documented operational validation, while vNext dispatch remains Controlled Preview."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Core product family</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS SQLOps</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-feus-300/90">
            Controlled enterprise adoption · vNext dispatch in Controlled Preview
          </p>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS SQLOps is FEUS.ai&rsquo;s SQL Server governance and operations family.
            The core GEG path has documented operational validation in a real FEUS
            provisioning workflow: 48 of 48 batches passed all seven governance
            gates. The separately assessed vNext path implements typed work orders,
            policy checks, approval binding, and pre-execution gates up to a
            fail-closed boundary. It remains Controlled Preview because no execution
            dispatcher exists and no SQL executor is bound. Session 12D initiated
            no database operation and did not certify that vNext path.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What exists today</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>A core SQL Server gateway with documented real-workflow execution and automated test evidence.</li>
              <li>Policy checks that run before the currently reachable execution boundary and default to denial.</li>
              <li>Pre-execution governance gates (stages 0–5) that fail closed under their tested conditions.</li>
              <li>A fail-closed vNext stage 6: with no bound executor, vNext governed requests stop at a verdict.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Current boundaries</h2>
            <ul className="glass-card rounded-2xl p-6 border-l-4 border-slate-500/60 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>A vNext execution dispatcher or bound SQL executor.</li>
              <li>Live governed database execution through the vNext Control Plane/PES path.</li>
              <li>A vNext compensating rollback executor.</li>
              <li>Release authorization for the vNext dispatch path beyond internal evaluation environments.</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              These boundaries apply to the vNext dispatch path only. The core FEUS
              SQLOps gateway is separately available for controlled enterprise adoption.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">SQLOps capability evidence</h2>
            <div className="glass-card rounded-2xl p-6">
              <CapabilityStatusTable family="FEUS SQLOps" />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Control Plane and Protected Execution Service capabilities that support the
              SQLOps path are listed on the{' '}
              <Link to="/status" className="text-feus-300 underline underline-offset-2">platform capability table</Link>.
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
