import {
  BadgeCheck,
  ClipboardCheck,
  FileSearch,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react'

const workflowSteps = [
  {
    icon: MessageSquareText,
    label: 'Intent',
    detail: 'A person defines the business request.',
  },
  {
    icon: FileSearch,
    label: 'Context',
    detail: 'Target, identity, and scope are resolved.',
  },
  {
    icon: ShieldCheck,
    label: 'Controls',
    detail: 'Policy and data safeguards evaluate the work.',
  },
  {
    icon: ClipboardCheck,
    label: 'Decision',
    detail: 'Human review is applied when risk requires it.',
  },
  {
    icon: BadgeCheck,
    label: 'Evidence',
    detail: 'Permitted outcomes are recorded for review.',
  },
]

export default function WorkflowVisual({ className = '' }) {
  return (
    <div
      className={`dark-panel relative overflow-hidden p-6 sm:p-8 ${className}`}
      aria-label="Illustrative FEUS.ai governed workflow"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-feus-400 via-accent-400 to-gold-400" aria-hidden="true" />
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-feus-200">Governed workflow</p>
          <h3 className="mt-2 text-xl font-bold text-white">Human intent stays in control</h3>
        </div>
        <span className="text-xs text-slate-400">Illustrative operating model</span>
      </div>

      <ol className="mt-7 grid gap-6 md:grid-cols-5">
        {workflowSteps.map(({ icon: Icon, label, detail }, index) => (
          <li key={label} className="relative border-t border-white/15 pt-5 md:border-l md:border-t-0 md:pl-5 md:pt-0">
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-feus-400/10 text-feus-200">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold text-accent-300">0{index + 1}</p>
            <h4 className="mt-1 font-bold text-white">{label}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}