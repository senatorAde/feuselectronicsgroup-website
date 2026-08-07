import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import StatusBadge from './StatusBadge'
import {
  POSTURE, CONTROL_COUNTS, CAPABILITY_SUMMARY, PUBLIC_CAPABILITIES,
  CAPABILITY_LIFECYCLE, INTEGRATION_STATUS, KNOWN_LIMITATIONS,
} from '../data/publicStatus'

/**
 * Status presentation components (Session 13A visual requirements §9, §12).
 * Neutral evidence treatment only — no success badges, scores, or seals.
 */

/** Persistent capability-scoped posture strip for every FEUS.ai product route. */
export function ReleaseStatusBanner() {
  return (
    <div
      role="note"
      aria-label="Current release posture"
      className="relative z-40 bg-navy-950 border-b border-l-4 border-white/[0.08] border-l-rose-500 px-4 py-2.5 mt-20"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <Info className="w-4 h-4 text-rose-400 flex-shrink-0" aria-hidden="true" />
        <span className="font-semibold text-white">{POSTURE.shortStatement}</span>
        <span className="text-gray-400">
          Core maturity and extension release status are assessed separately.
        </span>
        <Link to="/status" className="text-feus-300 underline underline-offset-2 hover:text-feus-200">
          Current status and limitations
        </Link>
      </div>
    </div>
  )
}

/** Exact-revision release decision block — plain text, no certification symbolism. */
export function ReleaseDecision({ compact = false }) {
  return (
    <div className="border-l-4 border-rose-500 bg-white/[0.03] rounded-r-xl p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        Assessed vNext release decision
      </p>
      <p className="mt-1 text-2xl font-bold text-white">{POSTURE.decision}</p>
      <p className="mt-1 text-gray-300">
        Exact revision · External release above LOCAL not authorized
      </p>
      <p className="mt-2 text-xs text-gray-500 font-mono break-all">
        Revision {POSTURE.certifiedRevision}
      </p>
      {!compact && (
        <>
          <p className="mt-2 text-xs text-gray-500">
            Version assessed {POSTURE.versionAssessed} · Decision date {POSTURE.decisionDate} ·
            Last reviewed {POSTURE.lastReviewed} · Authority: {POSTURE.assessment}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            This decision applies to the named release scope. It is not a verdict on
            FEUS.ai&rsquo;s complete operational history or every core capability.
          </p>
          {POSTURE.superseded && (
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
    ['Assessed vNext release decision', POSTURE.decision],
    ['Session 12D production-verified rows', `${POSTURE.productionVerifiedCapabilities} of ${POSTURE.totalCapabilities}`],
    ['Session 12D live-verified integrations', String(POSTURE.liveVerifiedIntegrations)],
    ['Security controls assessed', String(CONTROL_COUNTS.assessed)],
    ['Verified', String(CONTROL_COUNTS.verified)],
    ['Verified with constraints', String(CONTROL_COUNTS.verifiedWithConstraints)],
    ['Partial', String(CONTROL_COUNTS.partial)],
    ['Failed', String(CONTROL_COUNTS.failed)],
    ['Not established', String(CONTROL_COUNTS.notEstablished)],
    ['Assessed vNext deployment', 'Not authorized above LOCAL'],
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

/** 38-control assessment table — five explicit states, never collapsed. */
export function ControlStatusTable() {
  const rows = [
    ['Verified', CONTROL_COUNTS.verified],
    ['Verified with constraints', CONTROL_COUNTS.verifiedWithConstraints],
    ['Partial', CONTROL_COUNTS.partial],
    ['Failed', CONTROL_COUNTS.failed],
    ['Not established', CONTROL_COUNTS.notEstablished],
  ]
  return (
    <table className="w-full text-sm border-collapse">
      <caption className="sr-only">
        Session 12D security control assessment: {CONTROL_COUNTS.assessed} controls
      </caption>
      <thead>
        <tr className="border-b border-white/10 text-left">
          <th scope="col" className="py-2 pr-4 text-gray-400 font-medium">Assessment verdict</th>
          <th scope="col" className="py-2 text-gray-400 font-medium">Count</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-white/[0.06]">
            <th scope="row" className="py-2 pr-4 text-gray-300 font-normal text-left">{k}</th>
            <td className="py-2 text-white font-medium tabular-nums">{v}</td>
          </tr>
        ))}
        <tr>
          <th scope="row" className="py-2 pr-4 text-gray-400 font-medium text-left">Total assessed</th>
          <td className="py-2 text-white font-semibold tabular-nums">{CONTROL_COUNTS.assessed}</td>
        </tr>
      </tbody>
    </table>
  )
}

/** Public capability table — one row per publicly representable capability. */
export function CapabilityStatusTable({ family }) {
  const rows = family
    ? PUBLIC_CAPABILITIES.filter((c) => c.family === family)
    : PUBLIC_CAPABILITIES
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <caption className="sr-only">
          Publicly representable FEUS.ai capabilities with evidence status and required qualifications
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Capability</th>
            {!family && (
              <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Family</th>
            )}
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Status</th>
            <th scope="col" className="py-3 text-gray-400 font-medium">Description and required qualification</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((cap) => (
            <tr key={cap.id} className="border-b border-white/[0.06] align-top">
              <th scope="row" className="py-3 pr-4 text-white font-medium text-left">
                {cap.name}
                <span className="block text-xs text-gray-500 font-mono font-normal mt-0.5">{cap.id}</span>
              </th>
              {!family && <td className="py-3 pr-4 text-gray-400">{cap.family}</td>}
              <td className="py-3 pr-4"><StatusBadge status={cap.status} /></td>
              <td className="py-3 text-gray-300">
                {cap.description}
                <span className="block mt-1 text-xs text-amber-200/80">
                  Qualification: {cap.qualification}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-gray-500">{CAPABILITY_SUMMARY.internalNote}</p>
      <p className="mt-1 text-xs text-gray-500">{CAPABILITY_SUMMARY.oracleNote}</p>
    </div>
  )
}

/** Product lifecycle table — separate from exact-revision certification rows. */
export function CapabilityLifecycleTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[960px]">
        <caption className="sr-only">
          FEUS.ai core and extension capability lifecycle, evidence, restrictions, and milestones
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Capability</th>
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Public status</th>
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Validation and certification scope</th>
            <th scope="col" className="py-3 text-gray-400 font-medium">Restrictions and next milestone</th>
          </tr>
        </thead>
        <tbody>
          {CAPABILITY_LIFECYCLE.map((row) => (
            <tr key={row.capability} className="border-b border-white/[0.06] align-top">
              <th scope="row" className="py-4 pr-4 text-white font-medium text-left">
                {row.capability}
                <span className="block mt-1 text-xs text-gray-500 font-normal">{row.productArea}</span>
              </th>
              <td className="py-4 pr-4">
                <StatusBadge status={row.publicStatus} />
                <span className="block mt-2 text-xs text-gray-500">{row.environment}</span>
              </td>
              <td className="py-4 pr-4 text-gray-300 leading-relaxed">
                {row.validation}
                <span className="block mt-2 text-xs text-gray-400">
                  Certification: {row.certification}
                </span>
              </td>
              <td className="py-4 text-gray-300 leading-relaxed">
                {row.restrictions}
                <span className="block mt-2 text-xs text-amber-200/80">
                  Next milestone: {row.nextMilestone}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** External dependency status table. */
export function IntegrationStatusTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[560px]">
        <caption className="sr-only">
          External dependency verification status at the certified revision
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Dependency</th>
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Status</th>
            <th scope="col" className="py-3 text-gray-400 font-medium">Public treatment</th>
          </tr>
        </thead>
        <tbody>
          {INTEGRATION_STATUS.map((row) => (
            <tr key={row.dependency} className="border-b border-white/[0.06] align-top">
              <th scope="row" className="py-3 pr-4 text-white font-medium text-left">{row.dependency}</th>
              <td className="py-3 pr-4"><StatusBadge status={row.status} /></td>
              <td className="py-3 text-gray-300">{row.treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

/** Evidence callout (approved messaging §3). */
export function EvidenceCallout() {
  return (
    <div className="border-l-4 border-cyan-500/60 bg-white/[0.03] rounded-r-xl p-5 text-sm">
      <p className="text-white font-medium">
        {POSTURE.testsPassedAtRevision.toLocaleString()} automated tests passed at the certified revision.
      </p>
      <p className="mt-1 text-gray-400">{POSTURE.testsQualification}</p>
    </div>
  )
}
