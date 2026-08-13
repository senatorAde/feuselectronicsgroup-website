import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { POSTURE } from '../data/publicStatus'
import { RELEASE_ASSESSMENT } from '../data/releaseAssessment'

/**
 * /trust/compliance — compliance posture page (Trust Center content plan §26).
 * States plainly that no formal certifications are held and defines what the
 * internal assurance program is and is not.
 */
export default function TrustCompliancePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Compliance Posture"
        description="FEUS.ai compliance posture: no formal certifications are currently asserted. Internal assurance evidence is published honestly and is not a substitute for third-party attestation."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Trust Center · Compliance</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">Compliance posture</h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai publishes its compliance position plainly so evaluators can rely
            on it without interpretation.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Formal certifications</h2>
            <div className="glass-card rounded-2xl p-6 border-l-4 border-rose-500 text-sm text-gray-300 leading-relaxed space-y-3">
              <p className="text-white font-medium">
                FEUS.ai holds no formal third-party certifications at this revision.
              </p>
              <p>
                No SOC 2 examination, ISO/IEC 27001 certification audit, penetration-test
                attestation, FedRAMP authorization, or regulatory compliance opinion has
                been performed or is asserted. Any statement suggesting otherwise is not
                authorized.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What the independent assessment was</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Session 12D was an independent exact-revision release assessment of revision{' '}
                <span className="font-mono break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span>{' '}
                (version {RELEASE_ASSESSMENT.versionAssessed}), performed within the development
                environment. It examined 45 capabilities, 38 security controls, source
                provenance, dependency posture, and release artifacts.
              </p>
              <p>
                Its outcome was a <strong className="text-white">{RELEASE_ASSESSMENT.decision}</strong> release
                decision. It is release-engineering evidence — not an external audit, and not
                a compliance attestation under any framework.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What the internal assurance program is</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                FEUS Assurance is the reserved family name for FEUS.ai&rsquo;s internal
                assurance evaluation and release-evidence tooling. It produces
                revision-bound evidence used in release decisions.
              </p>
              <p className="text-amber-200/80">
                It is not a formal certification, an external audit, or a compliance
                attestation, and its outputs must never be presented as one.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Compliance-sensitive claims we do not make</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              <li>We do not claim an immutable audit trail. The local hash chain is unkeyed and externally unanchored.</li>
              <li>We do not claim guaranteed PII protection. Outbound redaction did not meet the release threshold.</li>
              <li>We do not claim regulatory compliance (HIPAA, GDPR, PCI DSS, SOX, or similar) for the platform.</li>
              <li>We do not claim production availability, recovery, or performance figures. None have been measured.</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500">
            Bound to revision <span className="font-mono break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span> ·
            Last reviewed {POSTURE.lastReviewed} ·{' '}
            <Link to="/trust" className="text-feus-300 underline underline-offset-2">Trust Center</Link> ·{' '}
            <Link to="/trust/security" className="text-feus-300 underline underline-offset-2">Security posture</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
