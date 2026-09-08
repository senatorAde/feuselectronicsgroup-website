import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { ControlStatusTable } from '../components/statusComponents'
import { POSTURE, CONTROL_COUNTS } from '../data/publicStatus'
import { RELEASE_ASSESSMENT } from '../data/releaseAssessment'

/**
 * /trust/security — security posture page (Trust Center content plan §13–§24).
 * Reports the Session 12D control assessment exactly. Never publishes
 * vulnerability details, internal hostnames, or exploit guidance.
 */

const verifiedThemes = [
  'Fail-closed pre-execution governance gates (stages 0–5) under their tested conditions',
  'Deny-by-default capability and agent routing in the tested in-process implementation',
  'Typed, sanitized cross-agent message contracts that reject raw strings',
  'Identity non-propagation across agent handovers with principal rebinding',
  'Approval contracts binding request, target, action, environment, plan, expiry, and separation of duties',
  'HTTPS-only JWKS token validation outside explicitly gated LOCAL loopback development',
  'LOCAL test-identity confinement',
  'Hash-pinned dependency locks and clean supply-chain verification (0 findings across 106 items)',
]

const constrainedThemes = [
  'Approval persistence can silently degrade to process memory; no deployed approval authority exercised',
  'The assessed vNext policy key authorizes verification for LOCAL only, pending an attested key-custody ceremony',
  'Evidence and audit chains are unkeyed and externally unanchored (detects naive edits only)',
  'Identity controls verified against test tokens, not a live identity provider',
]

const notMetThemes = [
  'Outbound data redaction did not meet the release threshold (failed)',
  'Sanitized external ticket updates: four residual leak classes identified (failed)',
  'Runtime evidence integrity is not adversary-resistant (failed)',
  'Production signing-key custody, shared durable state, deployed monitoring, and incident-response operations are not established',
]

export default function TrustSecurityPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Security Posture"
        description="FEUS.ai security posture: 38 controls independently assessed — 12 verified, 12 verified with constraints, 7 partial, 3 failed, 4 not established. Reported exactly as assessed."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Trust Center · Security</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">Security posture</h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            In the Session 12D independent assessment of revision{' '}
            <span className="font-mono text-sm break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span>,{' '}
            {CONTROL_COUNTS.assessed} security controls were assessed. The results
            are published exactly as assessed. FEUS.ai does not reduce control
            posture to a single score, grade, percentage, or seal.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Control assessment results</h2>
            <div className="glass-card rounded-2xl p-6">
              <ControlStatusTable />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What the verified controls establish</h2>
            <p className="text-sm text-gray-400 mb-4">
              Verified means the control&rsquo;s implementation behavior was established under
              its tested conditions — not that it has been exercised in production.
            </p>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              {verifiedThemes.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Material constraints on verified controls</h2>
            <ul className="glass-card rounded-2xl p-6 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              {constrainedThemes.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Controls that did not meet the release threshold
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              These findings are among the reasons the exact-revision release decision is{' '}
              {RELEASE_ASSESSMENT.decision}. They are disclosed as posture facts; exploit-level
              detail is not published.
            </p>
            <ul className="glass-card rounded-2xl p-6 border-l-4 border-slate-500/60 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              {notMetThemes.map((t) => <li key={t}>{t}</li>)}
            </ul>
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
              <p>Source provenance: 748 governed files attested against the signed manifest.</p>
              <p>Release artifacts: 520 artifacts hash-verified.</p>
              <p>Dependency verification: 0 findings across 106 items at the certified revision.</p>
              <p>Audit trail: SHA-256 hash chain, verified end to end.</p>
              <p>
                Signing-key custody: the release key is a non-exportable EC-HSM P-384 key held in
                Azure Key Vault. Signing runs in a hosted workflow that authenticates to the vault
                by federated identity and calls the vault to sign; the private key is never
                exported and does not exist on any workstation.
              </p>
              <p className="text-gray-400">
                Scope: signatures are produced under keys authorized for the environment they
                attest, and release verification names that environment explicitly rather than
                implying a broader one. Custody of the signing key is attested; the running
                deployment still declares the TST environment, so this is supply-chain evidence
                for a governed evaluation release rather than a production service attestation.
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
                We acknowledge every report and tell you when it is resolved. We do not
                yet publish a response time or operate a bounty. Scope and rules of
                engagement are set out under{' '}
                <Link to="/security" className="text-feus-300 underline underline-offset-2">responsible disclosure</Link>.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Bound to revision <span className="font-mono break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span> ·
            Last reviewed {POSTURE.lastReviewed} ·{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">Platform status</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
