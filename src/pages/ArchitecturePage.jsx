import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import CloudEvidence from '../components/CloudEvidence'
import { CLOUD_ARCHITECTURE } from '../data/cloudRuntime'
import ArchitectureBlueprint from '../components/ArchitectureBlueprint'

/** /architecture — the governed cloud path and the reference architecture. */
export default function ArchitecturePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO title="Architecture" description="The FEUS.ai cloud path on Microsoft Azure: website, workbench, Entra identity, tenant authorization, classification, FEUS Policy Router, eligible model, governed tool boundary and durable evidence." />
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>FEUS.ai · Cloud architecture</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">From website to governed cloud turn</h1>
          <p className="mt-6 text-gray-300 leading-relaxed">FEUS.ai is a product of FEUS Electronics Group. The public website explains the offer; the authenticated workbench on Microsoft Azure is where onboarded organisations work. Every turn follows the same governed path.</p>
          <div className="mt-8"><CloudEvidence /></div>
          <h2 className="mt-10 text-2xl font-bold text-white" id="cloud-path">The governed cloud path</h2>
          <p className="mt-3 text-sm text-gray-400">Each boundary can refuse a turn: identity, tenant authorization, policy or budget. A required approval holds it, and a deterministic route contacts no model.</p>
          <ol aria-labelledby="cloud-path" className="mt-6 glass-card rounded-2xl p-6 space-y-6">
            {CLOUD_ARCHITECTURE.map((stage, index) => (
              <li key={stage.title} className="flex gap-4">
                <span aria-hidden="true" className="text-feus-300 font-mono">{index + 1}</span>
                <div><h3 className="font-bold text-white">{stage.title}</h3><p className="mt-1 text-sm text-gray-300 leading-relaxed">{stage.detail}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-gray-300">Database operations follow their own seven-gate path: readiness, audit, environment and identity, policy, PII inspection, approval, and execution. Customer connections are set up during onboarding with your identities, targets and approvals.</p>
          <div className="mt-8 flex flex-wrap gap-4"><CTAButton to="/demo">Request a guided demo</CTAButton><CTAButton to="/trust" variant="secondary">Visit the Trust Center</CTAButton></div>
        </div>
      </section>
      <div className="commercial-page commercial-architecture"><ArchitectureBlueprint /></div>
    </div>
  )
}
