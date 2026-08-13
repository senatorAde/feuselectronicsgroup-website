import { POSTURE, CONTROL_COUNTS } from '../data/publicStatus'
import { RELEASE_ASSESSMENT, KNOWN_LIMITATIONS } from '../data/releaseAssessment'

/**
 * Release-evidence presentation components — Trust Center scope ONLY.
 *
 * SCOPE BOUNDARY — these components render exact-revision release-gate
 * content and must only be imported by lazy-loaded Trust Center / assurance
 * pages, never by Layout, marketing pages, or shared components. This keeps
 * release-gate language physically out of the marketing bundle.
 */

/**
 * Exact-revision release decision block — Trust Center scope only.
 * Neutral presentation: this is a scoped assessment record, not a product
 * health warning, so it uses the standard evidence treatment.
 */
export function ReleaseDecision({ compact = false }) {
  return (
    <div className="border-l-4 border-slate-500/60 bg-white/[0.03] rounded-r-xl p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        Assessed vNext release decision
      </p>
      <p className="mt-1 text-2xl font-bold text-white">{RELEASE_ASSESSMENT.decision}</p>
      <p className="mt-1 text-gray-300">{RELEASE_ASSESSMENT.scopeRule}</p>
      <p className="mt-2 text-xs text-gray-500 font-mono break-all">
        Revision {RELEASE_ASSESSMENT.certifiedRevision}
      </p>
      {!compact && (
        <>
          <p className="mt-2 text-xs text-gray-500">
            Version assessed {RELEASE_ASSESSMENT.versionAssessed} · Decision date{' '}
            {RELEASE_ASSESSMENT.decisionDate} · Last reviewed {POSTURE.lastReviewed} ·
            Authority: {RELEASE_ASSESSMENT.assessment}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {RELEASE_ASSESSMENT.trustCenterSummary}
          </p>
          {RELEASE_ASSESSMENT.superseded && (
            <p className="mt-2 text-xs font-semibold text-amber-300">SUPERSEDED</p>
          )}
        </>
      )}
    </div>
  )
}

/** At-a-glance posture table (Trust Center Content Plan §4.2). */
export function PostureSummary() {
  const rows = [
    ['Platform maturity', POSTURE.productMaturity],
    ['Public availability', POSTURE.publicAvailability],
    ['Assessed vNext release decision', RELEASE_ASSESSMENT.decision],
    ['Session 12D production-verified rows', `${POSTURE.productionVerifiedCapabilities} of ${POSTURE.totalCapabilities}`],
    ['Session 12D live-verified integrations', String(POSTURE.liveVerifiedIntegrations)],
    ['Security controls assessed', String(CONTROL_COUNTS.assessed)],
    ['Verified', String(CONTROL_COUNTS.verified)],
    ['Verified with constraints', String(CONTROL_COUNTS.verifiedWithConstraints)],
    ['Partial', String(CONTROL_COUNTS.partial)],
    ['Failed', String(CONTROL_COUNTS.failed)],
    ['Not established', String(CONTROL_COUNTS.notEstablished)],
    ['Assessed vNext deployment scope', 'Internal LOCAL evaluation'],
    ['Model invocation', 'Disabled'],
    ['Oracle Operations Agent', 'Controlled Preview'],
    ['ROI', 'Estimate only'],
  ]
  return (
    <table className="w-full text-sm border-collapse">
      <caption className="sr-only">FEUS.ai release posture at a glance</caption>
      <thead>
        <tr className="border-b border-white/10 text-left">
          <th scope="col" className="py-2 pr-4 text-gray-400 font-medium">Item</th>
          <th scope="col" className="py-2 text-gray-400 font-medium">Public value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-white/[0.06]">
            <th scope="row" className="py-2 pr-4 text-gray-300 font-normal text-left">{k}</th>
            <td className="py-2 text-white font-medium">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** Known limitations list (Trust Center Content Plan §25). */
export function KnownLimitationList() {
  return (
    <ol className="space-y-2 list-decimal list-inside text-gray-300 text-sm leading-relaxed">
      {KNOWN_LIMITATIONS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}
