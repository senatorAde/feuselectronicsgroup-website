import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { CapabilityStatusTable } from '../components/statusComponents'

/**
 * /sqlops — FEUS SQLOps family page.
 */
export default function SqlOpsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS SQLOps"
        description="FEUS SQLOps brings governed analysis and operational workflows to qualified SQL Server environments."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Core product family</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS SQLOps</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-feus-300/90">
            Available for enterprise deployment
          </p>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS SQLOps is FEUS.ai&rsquo;s SQL Server governance and operations family.
            Every database operation runs through the GovernedExecutionGateway, which
            applies seven gates in order: readiness, audit, environment and identity,
            policy, PII inspection, approval, and execution. FEUS uses the same path
            in its own SQL Server provisioning work, where every batch passed all
            seven gates with a verified audit chain. SQLOps is delivered through the
            Expert / VS Code path for your qualified targets and approved identities.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What you get</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>A governed SQL Server gateway with automated test coverage, used in FEUS&rsquo;s own provisioning work.</li>
              <li>Policy checks that run before execution and default to denial.</li>
              <li>PII inspection that always blocks critical categories, and approvals bound to the operation plan.</li>
              <li>A hash-linked audit trail for every governed operation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">How it is delivered</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>Through the Expert / VS Code path, installed in your environment as part of an engagement.</li>
              <li>Each target server, service identity and entity allowlist is qualified during onboarding.</li>
              <li>The hosted cloud runtime does not execute customer SQL.</li>
              <li>The Agent Control Plane dispatch path is offered in preview through a scoped engagement.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">SQLOps capabilities</h2>
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
            <CTAButton to="/architecture">See the architecture</CTAButton>
            <CTAButton to="/status" variant="secondary">Service status</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
