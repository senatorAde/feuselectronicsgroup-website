import { Link } from 'react-router-dom'
import { FileSearch, ShieldAlert, Scale, MessageCircleQuestion, History, Network } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import {
  CapabilityLifecycleTable, EvidenceCallout,
} from '../components/statusComponents'
import {
  ReleaseDecision, PostureSummary, KnownLimitationList,
} from '../components/releaseComponents'
import { POSTURE } from '../data/publicStatus'
import { RELEASE_ASSESSMENT, AUTHORIZED_USE } from '../data/releaseAssessment'

/**
 * /trust — Trust Center landing, rebuilt per the Session 13A Trust Center
 * content plan. Evidence-first, no certification symbolism, no scores.
 */

const sections = [
  {
    icon: FileSearch,
    title: 'Platform status',
    to: '/status',
    desc: 'Platform maturity, capability lifecycle, exact-revision release status, dependencies, and limitations.',
  },
  {
    icon: ShieldAlert,
    title: 'Security posture',
    to: '/trust/security',
    desc: 'The 38-control Session 12D assessment, reported exactly as assessed — including failed and not-established controls.',
  },
  {
    icon: Scale,
    title: 'Compliance posture',
    to: '/trust/compliance',
    desc: 'What has and has not been formally certified, and how FEUS.ai describes its internal assurance evidence.',
  },
  {
    icon: Network,
    title: 'Current-state architecture',
    to: '/architecture',
    desc: 'The governed request path as it exists today, including the fail-closed execution boundary.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Platform FAQ',
    to: '/faq',
    desc: 'Direct answers to the questions evaluators ask most — production readiness, integrations, audit, PII, and ROI.',
  },
  {
    icon: History,
    title: 'Posture history',
    to: '/release-notes',
    desc: 'How the public posture has changed over time and which assessment currently controls it.',
  },
]

export default function TrustPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Trust Center"
        description="The FEUS.ai Trust Center reports an operationally validated core, capability-specific preview boundaries, exact-revision release decisions, security controls, and limitations."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Trust Center</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Operational evidence, scoped assurance
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {POSTURE.publicPostureStatement} This Trust Center reports product
            posture, security architecture, governance controls, capability status,
            preview capabilities, known limitations, assessment scope, deployment
            responsibilities, and historical assurance evidence without collapsing
            them into a single score, grade, or seal.
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {RELEASE_ASSESSMENT.disclosureBoundary} The release assessment recorded
            below is scoped to one named revision and deployment configuration; it is
            not a characterization of the platform or of every core capability.
          </p>
          <div className="mt-10">
            <ReleaseDecision />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Capability lifecycle</h2>
          <p className="text-sm text-gray-400 max-w-4xl mb-6">
            Core maturity and extension readiness are assessed by capability. Every
            status below includes its evidence boundary, environment, restriction,
            and next maturity milestone.
          </p>
          <div className="glass-card rounded-2xl p-6">
            <CapabilityLifecycleTable />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Posture at a glance</h2>
          <div className="glass-card rounded-2xl p-6">
            <PostureSummary />
          </div>
          <div className="mt-8">
            <EvidenceCallout />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Explore the Trust Center</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map(({ icon: Icon, title, to, desc }) => (
              <Link
                key={to}
                to={to}
                className="glass-card rounded-2xl p-6 block hover:border-feus-500/40 transition-colors"
              >
                <Icon className="w-7 h-7 text-feus-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Known limitations</h2>
            <div className="glass-card rounded-2xl p-6">
              <KnownLimitationList />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Customer responsibilities</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                FEUS.ai does not replace accountable human operators, DBAs, security
                teams, privacy teams, legal counsel, or auditors. For any approved
                evaluation or deployment, the deploying organization remains
                responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>authorization to assess each target system;</li>
                <li>data classification and lawful basis for processing;</li>
                <li>identity governance, role assignment, privileged access management, and access reviews;</li>
                <li>network and endpoint controls;</li>
                <li>database backup, restore, and change-management controls;</li>
                <li>approval ownership and separation of duties;</li>
                <li>validation of recommendations and outputs before acting on them;</li>
                <li>retention and deletion policy;</li>
                <li>monitoring, incident response, and business continuity;</li>
                <li>vendor, model, and subprocessor approval;</li>
                <li>compliance determination with counsel and auditors.</li>
              </ul>
              <p className="text-xs text-gray-500">
                The vNext release assessed by Session 12D is scoped to internal
                evaluation environments. Any core deployment requires separate
                capability, target, environment, and customer authorization before use.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Authorized use</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>{AUTHORIZED_USE.text}</p>
              <p className="text-amber-200/80">{AUTHORIZED_USE.qualification}</p>
              <p className="text-xs text-gray-500">{AUTHORIZED_USE.legalStatus}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Reporting a security concern</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed">
              <p>
                Vulnerability-management process details are being formalized. Security
                concerns should use the monitored
                responsible-disclosure channel once published. Until then, please use
                the <Link to="/contact" className="text-feus-300 underline underline-offset-2">contact form</Link>,
                mark the inquiry as security-related, and do not include sensitive
                technical details.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Exact-release evidence is bound to revision{' '}
            <span className="font-mono break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span>{' '}
            and was last reviewed {POSTURE.lastReviewed}. Product maturity is
            capability-scoped. {RELEASE_ASSESSMENT.supersessionRule}
          </p>
        </div>
      </section>
    </div>
  )
}
