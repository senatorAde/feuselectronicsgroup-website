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
import CloudEvidence from '../components/CloudEvidence'

/**
 * /trust — Trust Center landing, rebuilt per the Session 13A Trust Center
 * content plan. Evidence-first, no certification symbolism, no scores.
 */

const sections = [
  {
    icon: FileSearch,
    title: 'Platform status',
    to: '/status',
    desc: 'Dated, static evidence and capability availability, not live incident monitoring.',
  },
  {
    icon: ShieldAlert,
    title: 'Security posture',
    to: '/trust/security',
    desc: 'The historical 38-control Session 12D assessment, including failed and not-established controls; not a new cloud assessment.',
  },
  {
    icon: Scale,
    title: 'Compliance posture',
    to: '/trust/compliance',
    desc: 'What has and has not been formally certified, and how FEUS.ai describes its internal assurance evidence.',
  },
  {
    icon: Network,
    title: 'Cloud evaluation architecture',
    to: '/architecture',
    desc: 'The published cloud evaluation path and its governed boundaries, with the historical Session 12D diagram retained separately.',
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
    desc: 'Dated records with separate cloud, product and historical revision scopes.',
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
            Cloud evaluation evidence, scoped assurance
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai, a product of FEUS Electronics Group, offers a governed Azure
            cloud evaluation in TST. This Trust Center separates the current cloud
            release evidence, capability-specific deployment requirements and historical
            assessments. None is a blanket production qualification or formal certification.
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {RELEASE_ASSESSMENT.disclosureBoundary} The release assessment recorded
            in the historical section is scoped to one named revision and deployment configuration; it is
            not a characterization of the platform or of every core capability.
          </p>
          <div className="mt-10">
            <CloudEvidence />
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
          <details id="historical-assessment" className="glass-card rounded-2xl p-6 scroll-mt-24">
            <summary className="cursor-pointer text-xl font-bold text-white">Historical assessment · 5.2.0-enterprise.1 · Session 12D</summary>
            <p className="my-4 text-sm text-gray-300">Historical, exact-revision evidence. The decision remains applicable to its assessed revision; it is not the current 5.3 cloud runtime verdict. Original records and limitations are retained without promotion or reassessment.</p>
            <ReleaseDecision />
            <div className="mt-6"><PostureSummary /></div>
            <h3 className="mt-6 mb-3 text-lg font-bold text-white">Historical assessment limitations</h3>
            <KnownLimitationList />
          </details>
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
                Send security reports to{' '}
                <a href="mailto:info@feuselectronicsgroup.com?subject=Security%20report" className="text-feus-300 underline underline-offset-2">info@feuselectronicsgroup.com</a>{' '}
                with &ldquo;Security report&rdquo; in the subject, or use the{' '}
                <Link to="/contact?type=security#contact-form" className="text-feus-300 underline underline-offset-2">contact form</Link>{' '}
                with Governance &amp; Security preselected. Send only what is needed to
                reproduce the issue, and no credentials or customer data.
              </p>
              <p className="mt-3">
                We acknowledge every report and tell you when it is resolved. We do not
                yet publish a response time or operate a bounty; the scope, the rules,
                and that limitation are set out under{' '}
                <Link to="/security" className="text-feus-300 underline underline-offset-2">responsible disclosure</Link>.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Historical Session 12D evidence is bound to revision{' '}
            <span className="font-mono break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span>{' '}
            and was last reviewed {POSTURE.lastReviewed}. Product maturity is
            capability-scoped. {RELEASE_ASSESSMENT.supersessionRule}
          </p>
        </div>
      </section>
    </div>
  )
}
