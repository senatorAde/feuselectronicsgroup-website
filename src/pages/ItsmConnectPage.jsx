import {
  Ban,
  Braces,
  CloudCog,
  FileLock2,
  Gauge,
  KeyRound,
  RefreshCcw,
  Workflow,
} from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import { SectionLabel, CTAButton } from '../components/ui'
import { CAPABILITY_LIFECYCLE } from '../data/publicStatus'

const lifecycle = CAPABILITY_LIFECYCLE.find(
  (row) => row.capability === 'ITSM automation connectors'
)

const connectors = [
  {
    name: 'ServiceNow',
    contract: 'Table and attachment metadata APIs',
    control: 'Expected-state re-read and sys_mod_count verification protect against stale updates.',
  },
  {
    name: 'Jira Service Management',
    contract: 'Jira REST API v2 issue workflow',
    control: 'Transitions use IDs returned by the workflow contract; unavailable routes are refused.',
  },
  {
    name: 'Azure DevOps Work Items',
    contract: 'Work Item Tracking REST 7.1',
    control: 'JSON Patch revision tests provide optimistic concurrency for field updates.',
  },
]

const controls = [
  { icon: Ban, title: 'Writes off by default', body: 'Every connector starts non-production, dry-run enabled, and deny-all for writes.' },
  { icon: Braces, title: 'Closed operation registry', body: 'Methods, paths, parameters, fields, and transitions come from bounded registries rather than agent-generated API calls.' },
  { icon: KeyRound, title: 'Secret references only', body: 'Configuration carries a reference to an environment or managed secret source, never the credential value.' },
  { icon: RefreshCcw, title: 'Idempotent and concurrency aware', body: 'Per-ticket locking, stale-state checks, retry bounds, and idempotency receipts constrain repeated work.' },
  { icon: FileLock2, title: 'Attachment metadata only', body: 'Content-download endpoints are not registered; downstream use requires a separately approved scanning path.' },
  { icon: Gauge, title: 'Bounded synchronization', body: 'Page counts, page size, retries, throttling, and cursors are explicit and auditable.' },
]

export default function ItsmConnectPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS ITSM Connect | Preview"
        description="FEUS ITSM Connect is the Preview connector program for ServiceNow, Jira Service Management, and Azure DevOps work items, contract-tested against mock transports with dry-run defaults."
      />

      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/25 via-navy-950 to-navy-950" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_21rem] gap-12 items-end">
          <div>
            <SectionLabel>ITSM automation connectors</SectionLabel>
            <div className="mt-2"><StatusBadge status="PREVIEW" showDefinition /></div>
            <h1 className="section-heading text-4xl sm:text-6xl mt-5">FEUS ITSM Connect</h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-3xl">
              Governed connector contracts that bring service-management work into
              FEUS RequestOps without giving an agent an open-ended API surface.
              Every provider begins with dry-run, deny-all writes, bounded
              operations, and explicit identity configuration.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton to="/contact">Plan a sandbox qualification</CTAButton>
              <CTAButton to="/requestops" variant="secondary">Explore RequestOps</CTAButton>
            </div>
          </div>
          <div className="border-l-2 border-cyan-400/40 pl-6 py-2">
            <p className="text-sm text-gray-400">Connector contract suite</p>
            <p className="mt-2 text-6xl font-bold text-white tabular-nums">109</p>
            <p className="mt-2 text-sm text-gray-300">Tests across mapping, paging, retries, concurrency, authorization, redaction, and dry-run interception.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Connector portfolio</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-3">Three vendor contracts, one governed boundary</h2>
          <p className="mt-4 text-sm text-gray-500 max-w-3xl">
            Vendor names identify technical contract targets only. They do not imply partnership, certification, live compatibility, or support availability.
          </p>
          <div className="grid lg:grid-cols-3 gap-6 mt-10">
            {connectors.map((connector) => (
              <article key={connector.name} className="glass-card-static rounded-lg p-6 border-t-2 border-t-cyan-400/40">
                <CloudCog className="w-7 h-7 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-white">{connector.name}</h3>
                <p className="mt-2 text-sm font-medium text-cyan-200">{connector.contract}</p>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">{connector.control}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber-200/80">Mock transport · Dry-run</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Shared controls</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-3">The connector cannot choose its own authority</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-10">
            {controls.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-white/[0.1] pt-5">
                <Icon className="w-6 h-6 text-feus-300" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <Workflow className="w-10 h-10 text-cyan-300" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-white mt-5">Preview-to-adoption path</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Qualification advances one customer-controlled environment at a
              time. Preview does not authorize unrestricted writes or a production
              tenant connection.
            </p>
          </div>
          <ol className="space-y-5">
            {[
              ['1', 'Read-only sandbox', 'Provision least-privileged identity, retain dry-run, and validate health plus bounded reads.'],
              ['2', 'Governed dry-run writes', 'Exercise the intended field and transition allowlists without sending provider changes.'],
              ['3', 'Disclosure control closure', 'Replace open free-text egress with approved structured-field or allowlist controls.'],
              ['4', 'Sandbox lifecycle evidence', 'Validate idempotency, concurrency, rollback, audit, and incident ownership end to end.'],
            ].map(([number, title, body]) => (
              <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/[0.08] pb-5">
                <span className="w-10 h-10 rounded-full border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-semibold tabular-nums">{number}</span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-semibold text-white">Current environment</p>
            <p className="mt-2 text-gray-400 leading-relaxed">{lifecycle.environment}</p>
          </div>
          <div>
            <p className="font-semibold text-white">Preview restriction</p>
            <p className="mt-2 text-gray-400 leading-relaxed">{lifecycle.restrictions}</p>
          </div>
          <div>
            <p className="font-semibold text-white">Next maturity milestone</p>
            <p className="mt-2 text-amber-200/80 leading-relaxed">{lifecycle.nextMilestone}</p>
          </div>
        </div>
      </section>
    </div>
  )
}