import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Info, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import { SectionLabel } from '../components/ui'
import CloudEvidence from '../components/CloudEvidence'
import {
  ENTERPRISE_CAPABILITY_AVAILABILITY,
  OPERATIONAL_SERVICES,
  PLATFORM_STATUS,
} from '../data/publicStatus'

/**
 * /status is the customer operational view. Exact-revision release evidence,
 * governance constraints, and assurance findings belong under /trust.
 */
export default function StatusPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Platform Status"
        description="Dated FEUS.ai cloud evaluation evidence and capability scope. A static publication, not live service health or incident monitoring."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Platform status</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            FEUS Platform Status
          </h1>
          <div className="mt-7 flex items-center gap-3 text-feus-300">
            <Info className="h-6 w-6" aria-hidden="true" />
            <p className="text-2xl font-bold text-white">{PLATFORM_STATUS.overall}</p>
          </div>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
            {PLATFORM_STATUS.summary}
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Review date: <time dateTime={PLATFORM_STATUS.lastVerified}>{PLATFORM_STATUS.lastVerified}</time>. {PLATFORM_STATUS.basis}
          </p>
          <div className="mt-6"><CloudEvidence /></div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Services described in the published record</h2>
              <p className="mt-2 text-sm text-gray-400">Descriptions below reflect the cited evaluation scope, not real-time availability. Inference evidence does not establish live SQL or tool execution.</p>
            </div>
            <Activity className="hidden h-7 w-7 text-feus-300 sm:block" aria-hidden="true" />
          </div>
          <div className="mt-7 grid gap-x-10 sm:grid-cols-2">
            {OPERATIONAL_SERVICES.map((service) => (
              <div key={service.name} className="flex gap-4 border-t border-white/10 py-5">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-feus-300" aria-hidden="true" />
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-semibold text-white">{service.name}</h3>
                    <span className="text-xs font-bold uppercase text-feus-300">Published evaluation scope</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{service.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Incident information</h2>
          <p className="mt-4 text-gray-300">No live incident feed is connected to this page. Current incident state is unknown here; absence of a notice is not evidence that there are no incidents. Contact the engagement team for operational information.</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Enterprise capability availability</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">
            Availability describes how a capability can be adopted. It does not override customer-specific identity, policy, provider, or target-system requirements.
          </p>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <caption className="sr-only">Enterprise capability availability</caption>
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th scope="col" className="py-3 pr-5 font-medium text-gray-400">Capability</th>
                  <th scope="col" className="py-3 pr-5 font-medium text-gray-400">Availability</th>
                  <th scope="col" className="py-3 font-medium text-gray-400">What this means</th>
                </tr>
              </thead>
              <tbody>
                {ENTERPRISE_CAPABILITY_AVAILABILITY.map((row) => (
                  <tr key={row.capability} className="border-b border-white/[0.06] align-top">
                    <th scope="row" className="py-4 pr-5 text-left font-semibold text-white">{row.capability}</th>
                    <td className="py-4 pr-5"><StatusBadge status={row.availability} /></td>
                    <td className="py-4 leading-relaxed text-gray-300">{row.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-feus-300" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold text-white">Technical assurance details</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">
                Review exact-revision evidence, security controls, governance scope, provider constraints, release provenance, and known limitations in the Trust Center.
              </p>
            </div>
          </div>
          <Link to="/trust" className="inline-flex flex-shrink-0 items-center gap-2 font-semibold text-feus-300 hover:text-feus-200">
            Open Trust Center
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
