import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import StatusBadge from './StatusBadge'
import {
  POSTURE, PUBLIC_CAPABILITIES, CAPABILITY_LIFECYCLE, INTEGRATION_STATUS,
} from '../data/publicStatus'

/**
 * Status presentation components.
 * Neutral evidence treatment only — no success badges, scores, or seals, and
 * no warning/error styling for normal capability lifecycle states. Red/rose
 * treatment is reserved for active incidents, outages, and security
 * emergencies, which this component set does not render.
 *
 * This module is imported by Layout and marketing pages and ships in the
 * main bundle.
 */

/**
 * Neutral, subtle capability-status strip for FEUS.ai platform routes.
 * Informational only: it points to per-capability status and never advertises
 * internal release history or product-wide preview.
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

/** Public capability table — one row per publicly representable capability. */
export function CapabilityStatusTable({ family }) {
  const rows = family
    ? PUBLIC_CAPABILITIES.filter((c) => c.family === family)
    : PUBLIC_CAPABILITIES
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <caption className="sr-only">
          FEUS.ai capabilities with status and operating scope
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Capability</th>
            {!family && (
              <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Family</th>
            )}
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Status</th>
            <th scope="col" className="py-3 text-gray-400 font-medium">Description and scope</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((cap) => (
            <tr key={cap.id} className="border-b border-white/[0.06] align-top">
              <th scope="row" className="py-3 pr-4 text-white font-medium text-left">
                {cap.name}
              </th>
              {!family && <td className="py-3 pr-4 text-gray-400">{cap.family}</td>}
              <td className="py-3 pr-4"><StatusBadge status={cap.status} /></td>
              <td className="py-3 text-gray-300">
                {cap.description}
                <span className="block mt-1 text-xs text-gray-400">
                  Scope: {cap.qualification}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

/** Capability availability table. */
export function CapabilityLifecycleTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[960px]">
        <caption className="sr-only">
          FEUS.ai core and extension capability availability and scope
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Capability</th>
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Availability</th>
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">What it includes</th>
            <th scope="col" className="py-3 text-gray-400 font-medium">Scope and how to start</th>
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
              </td>
              <td className="py-4 text-gray-300 leading-relaxed">
                {row.restrictions}
                <span className="block mt-2 text-xs text-gray-400">
                  How to start: {row.nextMilestone}
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
          External integrations and their availability
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Dependency</th>
            <th scope="col" className="py-3 pr-4 text-gray-400 font-medium">Status</th>
            <th scope="col" className="py-3 text-gray-400 font-medium">Scope</th>
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
