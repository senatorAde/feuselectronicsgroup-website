import { Link } from 'react-router-dom'
import { FileSearch, ShieldCheck, Scale, MessageCircleQuestion, History, Network } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { CapabilityLifecycleTable } from '../components/statusComponents'
import { POSTURE } from '../data/publicStatus'
import { AUTHORIZED_USE } from '../data/releaseNotes'
import { TURN_PIPELINE } from '../data/cloudRuntime'
import CloudEvidence from '../components/CloudEvidence'

/** /trust — Trust Center landing. Evidence-first, no certification symbolism. */

const sections = [
  {
    icon: FileSearch,
    title: 'Service status',
    to: '/status',
    desc: 'The services in the current release and the availability of each capability.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    to: '/trust/security',
    desc: 'Identity, isolation, approvals, audit, data handling and release signing.',
  },
  {
    icon: Scale,
    title: 'Compliance',
    to: '/trust/compliance',
    desc: 'What FEUS.ai claims, what it does not, and how your teams can assess it.',
  },
  {
    icon: Network,
    title: 'Architecture',
    to: '/architecture',
    desc: 'The governed cloud path and the reference architecture, component by component.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Platform FAQ',
    to: '/faq',
    desc: 'Direct answers on production use, integrations, models, audit, personal data and billing.',
  },
  {
    icon: History,
    title: 'Release notes',
    to: '/release-notes',
    desc: 'What is new in each FEUS.ai release.',
  },
]

export default function TrustPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Trust Center"
        description="The FEUS.ai Trust Center: how every request is governed, capability availability, security, compliance, and authorized use."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Trust Center</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Governance you can inspect
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai, a product of FEUS Electronics Group, runs in production on
            Microsoft Azure. Every request is authenticated, classified, checked
            against policy, held for approval where required, and recorded. This
            Trust Center explains how, and what is available today.
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {POSTURE.publicPostureStatement}
          </p>
          <div className="mt-10">
            <CloudEvidence />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">How every turn is governed</h2>
          <ol className="glass-card rounded-2xl p-6 space-y-4">
            {TURN_PIPELINE.map((stage, index) => (
              <li key={stage.step} className="flex gap-4">
                <span className="shrink-0 text-sm font-mono font-bold text-feus-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{stage.step}</p>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Capability availability</h2>
          <p className="text-sm text-gray-400 max-w-4xl mb-6">
            Each capability has its own status: available, available by engagement,
            preview, or roadmap. The table shows what each includes and how to start.
          </p>
          <div className="glass-card rounded-2xl p-6">
            <CapabilityLifecycleTable />
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-10">
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
                FEUS engineers work through each of these with your team during onboarding.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Authorized use</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>{AUTHORIZED_USE.text}</p>
              <p>{AUTHORIZED_USE.qualification}</p>
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
                We acknowledge every report and tell you when it is resolved. The scope
                and rules of engagement are set out under{' '}
                <Link to="/security" className="text-feus-300 underline underline-offset-2">responsible disclosure</Link>.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
