import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { ControlStatusTable } from '../components/statusComponents'
import { POSTURE, CONTROL_COUNTS } from '../data/publicStatus'

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
  'Policy verification is authorized for LOCAL only, pending an attested key-custody ceremony',
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
            <span className="font-mono text-sm break-all">{POSTURE.certifiedRevision}</span>,{' '}
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
              These findings are among the reasons the current release decision is{' '}
              {POSTURE.decision}. They are disclosed as posture facts; exploit-level
              detail is not published.
            </p>
            <ul className="glass-card rounded-2xl p-6 border-l-4 border-rose-500 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
              {notMetThemes.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Supply chain and provenance</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-2">
              <p>Dependency verification: 0 findings across 106 items at the certified revision.</p>
              <p>Source provenance: 552 of 552 source files accounted for in the release manifest.</p>
              <p>Release artifacts: 442 artifacts hash-verified.</p>
              <p className="text-amber-200/80">
                Qualification: artifact signatures were produced under LOCAL-authorized keys whose
                custody is not independently attested. This is supply-chain evidence, not a
                production-signing attestation.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Reporting a security concern</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
              <p>
                Vulnerability-management process details are being formalized for the
                pre-release platform. Security concerns should use the monitored
                responsible-disclosure channel once published. Until then, use the{' '}
                <Link to="/contact" className="text-feus-300 underline underline-offset-2">contact form</Link>{' '}
                and mark the inquiry as security-related without including sensitive details.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Bound to revision <span className="font-mono break-all">{POSTURE.certifiedRevision}</span> ·
            Last reviewed {POSTURE.lastReviewed} ·{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">Platform status</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
