import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { POSTURE } from '../data/publicStatus'

/**
 * /trust/security — how FEUS.ai protects every request. Never publishes
 * vulnerability details, internal hostnames, or exploit guidance.
 */

const controls = [
  ['Identity', 'Every caller signs in with Microsoft Entra ID, and every API requires authentication. The runtime holds no client secret or provider key: it reaches Azure services with a managed identity, and requests with a missing or invalid token are refused.'],
  ['Tenant isolation', 'Conversation history, audit chain, approval records and the spend ledger are keyed by tenant in durable storage and enforced on every read.'],
  ['Policy before execution', 'Each request is classified before any model is chosen. Eligibility and routing are deny-by-default, and governance gates fail closed.'],
  ['Human approval', 'Risk-sensitive actions are held for the approvers you designate. Approvals bind the request, target, action, environment, plan hash and expiry, and are never issued from a browser button or by a model.'],
  ['Data protection', 'PII inspection runs on governed operations, critical categories such as government identifiers and financial data are always blocked, and data boundaries are agreed with you during onboarding.'],
  ['Audit and evidence', 'Every governed request is recorded in a hash-linked, tenant-partitioned audit trail that can be looked up by correlation identifier.'],
  ['Least privilege', 'Service identities carry only the permissions their task needs, and agent handovers rebind the receiving identity instead of inheriting the caller\u2019s approvals.'],
]

export default function TrustSecurityPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Security"
        description="How FEUS.ai protects every request: Microsoft Entra ID sign-in, tenant isolation, policy before execution, human approvals, PII inspection, hash-linked audit, and signed releases."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Trust Center · Security</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">Security by design</h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai is built so that every request is authenticated, authorized,
            governed, and recorded. This page describes the controls in the
            production service on Microsoft Azure and on the governed database path.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Core controls</h2>
            <dl className="glass-card rounded-2xl p-6 space-y-5 text-sm leading-relaxed">
              {controls.map(([title, detail]) => (
                <div key={title}>
                  <dt className="font-semibold text-white">{title}</dt>
                  <dd className="mt-1 text-gray-300">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Supply chain and provenance</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-2">
              <p>
                Every release is cryptographically signed and independently verifiable. The
                verifier re-checks each artifact hash, the manifest signature, the provenance
                envelope, and the policy-bundle authorization before a release is permitted.
              </p>
              <p>Release signing: ECDSA P-384 / SHA-384 over a canonicalized manifest.</p>
              <p>Build provenance: SLSA v1.0 in a signed DSSE envelope.</p>
              <p>Software bill of materials: CycloneDX 1.4.</p>
              <p>Dependencies: hash-pinned lock files verified in CI.</p>
              <p>
                Signing-key custody: the release key is a non-exportable EC-HSM P-384 key held in
                Azure Key Vault. Signing runs in a hosted workflow that authenticates to the vault
                by federated identity; the private key is never exported and does not exist on
                any workstation.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Certifications</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
              <p>
                FEUS.ai does not hold third-party certifications such as SOC 2 or ISO/IEC 27001.
                Our{' '}
                <Link to="/trust/compliance" className="text-feus-300 underline underline-offset-2">compliance page</Link>{' '}
                explains what we claim and how your teams can assess the platform directly.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Reporting a security concern</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
              <p>
                Send security reports to{' '}
                <a href="mailto:info@feuselectronicsgroup.com?subject=Security%20report" className="text-feus-300 underline underline-offset-2">info@feuselectronicsgroup.com</a>{' '}
                with &ldquo;Security report&rdquo; in the subject, or use the{' '}
                <Link to="/contact?type=security#contact-form" className="text-feus-300 underline underline-offset-2">contact form</Link>{' '}
                and mark the inquiry as security-related. Send only what is needed to
                reproduce the issue, and no credentials or customer data.
              </p>
              <p className="mt-3">
                We acknowledge every report and tell you when it is resolved. Scope and rules
                of engagement are set out under{' '}
                <Link to="/security" className="text-feus-300 underline underline-offset-2">responsible disclosure</Link>.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Last reviewed {POSTURE.lastReviewed} ·{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">Service status</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
