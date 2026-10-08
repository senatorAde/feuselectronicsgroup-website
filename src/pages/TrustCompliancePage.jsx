import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { POSTURE } from '../data/publicStatus'

/**
 * /trust/compliance — compliance position. States plainly that no formal
 * certifications are held and what FEUS Assurance is and is not.
 */
export default function TrustCompliancePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Compliance"
        description="FEUS.ai compliance position: what we claim, what we do not, and how your security and compliance teams can assess the platform directly."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Trust Center · Compliance</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">Compliance</h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai states its compliance position plainly so your teams can rely on
            it without interpretation, and gives them the evidence to assess the
            platform directly.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Formal certifications</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p className="text-white font-medium">
                FEUS.ai does not hold formal third-party certifications.
              </p>
              <p>
                No SOC 2 examination, ISO/IEC 27001 certification audit, penetration-test
                attestation, FedRAMP authorization, or regulatory compliance opinion is
                asserted. Any statement suggesting otherwise is not authorized.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What your teams can assess</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Every governed request produces a hash-linked, tenant-partitioned audit
                record with its routing decision, approvals and estimated cost. Releases
                are signed with a non-exportable HSM key and ship with SLSA provenance and
                a CycloneDX software bill of materials.
              </p>
              <p>
                FEUS Assurance is the FEUS.ai family for recommendation assurance and
                evidence tooling. It is not a formal certification, an external audit, or
                a compliance attestation, and its outputs are never presented as one.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Claims we do not make</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>We do not describe the audit trail as immutable. The hash chain detects edits to recorded events but is not externally anchored.</li>
              <li>We do not guarantee PII protection. PII inspection and agreed data boundaries reduce risk; your teams remain responsible for data classification.</li>
              <li>We do not claim regulatory compliance (HIPAA, GDPR, PCI DSS, SOX, or similar) for the platform.</li>
              <li>We do not publish availability, recovery, or performance figures or service levels.</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500">
            Last reviewed {POSTURE.lastReviewed} ·{' '}
            <Link to="/trust" className="text-feus-300 underline underline-offset-2">Trust Center</Link> ·{' '}
            <Link to="/trust/security" className="text-feus-300 underline underline-offset-2">Security</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
