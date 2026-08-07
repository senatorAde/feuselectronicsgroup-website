import { useId, useState } from 'react'
import {
  CircleCheck, TriangleAlert, FlaskConical, CirclePause, CircleSlash,
  CalendarClock, Wrench, PlugZap, CircleHelp, Ban,
} from 'lucide-react'
import { STATUS_DEFS } from '../data/publicStatus'

/**
 * StatusBadge — the only approved way to render a capability, dependency,
 * or feature status on public surfaces.
 *
 * Rules (Session 13A visual requirements):
 *  - Text, icon, and accessible label always render together; hue is never
 *    the only signal.
 *  - No certification symbolism (shields, seals, medals, grades, scores).
 *  - Statuses map 1:1 to STATUS_DEFS in src/data/publicStatus.js; unknown
 *    statuses render as an explicit "Unknown status" error state rather
 *    than defaulting to anything positive.
 */

const STYLE = {
  AVAILABLE: {
    icon: CircleCheck,
    classes: 'text-sky-300 bg-sky-500/10 border-sky-500/40',
  },
  AVAILABLE_WITH_CONSTRAINTS: {
    icon: TriangleAlert,
    classes: 'text-orange-300 bg-orange-500/10 border-orange-500/40',
  },
  OPERATIONALLY_VALIDATED: {
    icon: CircleCheck,
    classes: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/40',
  },
  CONTROLLED_ENTERPRISE_ADOPTION: {
    icon: CircleCheck,
    classes: 'text-teal-300 bg-teal-500/10 border-teal-500/40',
  },
  CONTROLLED_PREVIEW: {
    icon: FlaskConical,
    classes: 'text-amber-300 bg-amber-500/10 border-amber-500/40',
  },
  PREVIEW: {
    icon: FlaskConical,
    classes: 'text-amber-300 bg-amber-500/10 border-amber-500/40',
  },
  EARLY_ACCESS: {
    icon: CalendarClock,
    classes: 'text-sky-300 bg-sky-500/10 border-sky-500/40',
  },
  INTEGRATION_READY: {
    icon: PlugZap,
    classes: 'text-teal-300 bg-teal-500/10 border-teal-500/40',
  },
  REQUIRES_CONFIGURATION: {
    icon: Wrench,
    classes: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/40',
  },
  DISABLED_PENDING_APPROVAL: {
    icon: CirclePause,
    classes: 'text-gray-300 bg-gray-500/10 border-gray-500/40',
  },
  DISABLED: {
    icon: CirclePause,
    classes: 'text-gray-300 bg-gray-500/10 border-gray-500/40',
  },
  EXTERNALLY_UNVERIFIED: {
    icon: CircleHelp,
    classes: 'text-violet-300 bg-violet-500/10 border-violet-500/40',
  },
  PLANNED: {
    icon: CalendarClock,
    classes: 'text-slate-300 bg-slate-500/10 border-slate-500/40',
  },
  IMPLEMENTATION_VERIFIED: {
    icon: FlaskConical,
    classes: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/40',
  },
  DEMONSTRATION_ONLY: {
    icon: FlaskConical,
    classes: 'text-amber-300 bg-amber-500/10 border-amber-500/40',
  },
  INTERNAL_ONLY: {
    icon: CircleSlash,
    classes: 'text-gray-400 bg-gray-500/10 border-gray-500/40',
  },
  UNAVAILABLE: {
    icon: Ban,
    classes: 'text-rose-300 bg-rose-500/10 border-rose-500/40',
  },
}

export default function StatusBadge({ status, showDefinition = false, className = '' }) {
  const [open, setOpen] = useState(false)
  const tipId = useId()
  const def = STATUS_DEFS[status]
  const style = STYLE[status]

  if (!def || !style) {
    return (
      <span
        role="status"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-rose-500/50 bg-rose-500/10 text-rose-300 text-xs font-semibold"
      >
        <TriangleAlert className="w-3.5 h-3.5" aria-hidden="true" />
        Unknown status
      </span>
    )
  }

  const Icon = style.icon
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <button
        type="button"
        aria-label={`Status: ${def.label}. ${def.definition}`}
        aria-expanded={open}
        aria-controls={showDefinition ? undefined : tipId}
        onClick={() => setOpen((v) => !v)}
        title={def.definition}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold uppercase tracking-wide cursor-help text-left ${style.classes}`}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        {def.label}
      </button>
      {(showDefinition || open) && (
        <span id={tipId} className="mt-1.5 text-xs text-gray-400 leading-relaxed max-w-md">
          {def.definition}
        </span>
      )}
    </span>
  )
}
