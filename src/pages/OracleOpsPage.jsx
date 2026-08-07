import {
  Activity,
  BookOpen,
  Database,
  Eye,
  Fingerprint,
  LockKeyhole,
  ShieldAlert,
} from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import { SectionLabel, CTAButton } from '../components/ui'
import { CAPABILITY_LIFECYCLE } from '../data/publicStatus'

const lifecycle = CAPABILITY_LIFECYCLE.find(
  (row) => row.capability === 'Oracle Operations Agent'
)

const tiers = [
  {
    tier: 'Tier 0',
    title: 'Knowledge',
    count: '3',
    status: 'Catalogued',
    icon: BookOpen,
    detail: 'Concept explanation, documentation summaries, and troubleshooting proposals without environment access.',
  },
  {
    tier: 'Tier 1',
    title: 'Observe only',
    count: '13',
    status: 'Fixture validated',
    icon: Eye,
    detail: 'Registered read-only observations with target, identity, host, role, and continuity checks.',
  },
  {
    tier: 'Tier 2',
    title: 'Controlled action',
    count: '4',
    status: 'Contract only',
    icon: LockKeyhole,
    detail: 'Approval-bound action contracts exist, but no live adapter or authorized execution path is active.',
  },
  {
    tier: 'Tier 3',
    title: 'High risk',
    count: '9',
    status: 'Hard-disabled',
    icon: ShieldAlert,
    detail: 'Lifecycle, storage, role-change, recovery, patching, privilege, structural, and destructive actions are denied in code.',
  },
]

const observations = [
  'Instance and database health',
  'CDB and PDB status',
  'Tablespace utilization',
  'ASM disk-group utilization',
  'Blocking sessions',
  'Wait events',
  'Invalid objects',
  'Data Guard status',
  'RAC services and cluster status',
  'RMAN job status',
  'Alert and incident summaries',
  'Configuration inventory',
  'Performance observations',
]

const safeguards = [
  {
    icon: Fingerprint,
    title: 'Target continuity',
    body: 'Identity is probed before and after each observation; a target or role change fails closed.',
  },
  {
    icon: Database,
    title: 'Registered statements',
    body: 'Tier 1 uses server-owned read-only templates with validated bindings and forbidden-operation checks.',
  },
  {
    icon: LockKeyhole,
    title: 'Constrained identity',
    body: 'Normal connection mode is the only admitted mode; elevated SYSDBA behavior is outside the contract.',
  },
  {
    icon: Activity,
    title: 'Normalized evidence',
    body: 'Adapter outcomes become typed observation records, and failures emit validation-phase evidence.',
  },
]

export default function OracleOpsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS OracleOps | Controlled Preview"
        description="FEUS OracleOps is the Controlled Preview Oracle Operations Agent: a 29-operation governed catalog with fixture-validated Tier 1 observe-only controls and no live Oracle adapter claim."
      />

      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/25 via-navy-950 to-navy-950" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_22rem] gap-12 items-end">
          <div>
            <SectionLabel>Oracle Operations Agent</SectionLabel>
            <div className="mt-2"><StatusBadge status="CONTROLLED_PREVIEW" showDefinition /></div>
            <h1 className="section-heading text-4xl sm:text-6xl mt-5">FEUS OracleOps</h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-3xl">
              A governed Oracle operations program designed to keep knowledge,
              observation, controlled action, and high-risk work inside explicit
              capability tiers. The current preview centers on read-only policy,
              target attestation, registered statements, and truthful evidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton to="/contact">Request preview qualification</CTAButton>
              <CTAButton to="/status" variant="secondary">Review evidence status</CTAButton>
            </div>
          </div>
          <div className="border-l-2 border-emerald-400/40 pl-6 py-2">
            <p className="text-sm text-gray-400">Capability catalog</p>
            <p className="mt-2 text-6xl font-bold text-white tabular-nums">29</p>
            <p className="mt-2 text-sm text-gray-300">Oracle-native operations classified before execution is considered.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Capability tiers</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-3">Risk determines the operating boundary</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
            {tiers.map(({ tier, title, count, status, icon: Icon, detail }) => (
              <article key={tier} className="glass-card-static rounded-lg p-5 border-t-2 border-t-emerald-400/40">
                <div className="flex items-center justify-between gap-3">
                  <Icon className="w-6 h-6 text-emerald-300" aria-hidden="true" />
                  <span className="text-3xl font-bold text-white tabular-nums">{count}</span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-emerald-300">{tier}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-xs font-semibold text-amber-200/80">{status}</p>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <SectionLabel>Tier 1 scope</SectionLabel>
            <h2 className="text-3xl font-bold text-white mt-3">Observe before acting</h2>
            <p className="mt-5 text-gray-300 leading-relaxed">
              Thirteen Oracle observation domains are represented by typed,
              read-only contracts. Tests use deterministic fakes, so this list
              describes the governed preview scope rather than live compatibility.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-300">
            {observations.map((observation) => (
              <li key={observation} className="flex items-center gap-3 border-b border-white/[0.06] py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
                {observation}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Governance design</SectionLabel>
          <h2 className="text-3xl font-bold text-white mt-3">Controls carried into every observation</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {safeguards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 border-t border-white/[0.1] pt-5">
                <Icon className="w-6 h-6 text-feus-300 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
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