import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import StatusBadge from '../components/StatusBadge'
import { SectionLabel } from '../components/ui'
import CloudEvidence from '../components/CloudEvidence'
import {
  ENTERPRISE_CAPABILITY_AVAILABILITY,
  OPERATIONAL_SERVICES,
  PLATFORM_STATUS,
} from '../data/publicStatus'

/** /status — services in the current release and capability availability. */
export default function StatusPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Service Status"
        description="The FEUS.ai production service on Microsoft Azure: services in the current release and the availability of each capability."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Service status</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            FEUS.ai Service Status
          </h1>
          <div className="mt-7 flex items-center gap-3 text-feus-300">
            <CircleCheck className="h-6 w-6" aria-hidden="true" />
            <p className="text-2xl font-bold text-white">{PLATFORM_STATUS.overall}</p>
          </div>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
            {PLATFORM_STATUS.summary}
          </p>
          <p className="mt-3 text-sm text-gray-500">{PLATFORM_STATUS.basis}</p>
          <div className="mt-6"><CloudEvidence /></div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Services in the {PLATFORM_STATUS.releaseLabel}</h2>
          <div className="mt-7 grid gap-x-10 sm:grid-cols-2">
            {OPERATIONAL_SERVICES.map((service) => (
              <div key={service.name} className="flex gap-4 border-t border-white/10 py-5">
                <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-feus-300" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{service.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Capability availability</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">
            Availability describes how each capability is adopted. Every deployment is configured for your tenant, environments and approval owners.
          </p>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <caption className="sr-only">Capability availability</caption>
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
              <h2 className="text-xl font-bold text-white">Security and governance</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">
                See how every request is governed, how data is protected, and how releases are signed in the Trust Center.
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
