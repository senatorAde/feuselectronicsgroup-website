import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import StatusBadge from './StatusBadge'
import {
  POSTURE, CONTROL_COUNTS, CAPABILITY_SUMMARY, PUBLIC_CAPABILITIES,
  CAPABILITY_LIFECYCLE, INTEGRATION_STATUS,
} from '../data/publicStatus'

/**
 * Status presentation components.
 * Neutral evidence treatment only — no success badges, scores, or seals, and
 * no warning/error styling for normal capability lifecycle states. Red/rose
 * treatment is reserved for active incidents, outages, and security
 * emergencies, which this component set does not render.
 *
 * SCOPE BOUNDARY — this module is imported by Layout and marketing pages and
 * therefore ships in the main bundle. Exact-revision release components
 * (ReleaseDecision, PostureSummary, KnownLimitationList) live in
 * releaseComponents.jsx and must not be re-added here.
 */

/**
 * Neutral, subtle capability-status strip for FEUS.ai platform routes.
 * Informational only: it points to per-capability status and never advertises
 * release-gate outcomes, environment restrictions, or product-wide preview.
 */
export function PlatformStatusStrip() {
  return (
    <div
      role="note"
      aria-label="FEUS.ai capability status"
      className="relative z-40 bg-navy-950 border-b border-white/[0.08] px-4 py-2.5 mt-20"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <Info className="w-4 h-4 text-feus-400 flex-shrink-0" aria-hidden="true" />
        <span className="font-semibold text-white">{POSTURE.shortStatement}</span>
        <span className="text-gray-400">{POSTURE.statusStripNote}</span>
        <Link to="/status" className="text-feus-300 underline underline-offset-2 hover:text-feus-200">
          Capability status
        </Link>
      </div>
    </div>
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
                <span className="block mt-2 text-xs text-gray-400">
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

/** Known limitations list moved to releaseComponents.jsx (Trust Center scope). */

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
