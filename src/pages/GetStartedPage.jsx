import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import {
  CLOUD_RUNTIME,
  LAUNCH_URL,
  ONBOARDING_FAQ,
  ONBOARDING_STEPS,
  ROUTING_MODES,
  ROUTING_AUTHORITY,
  RUNTIME_SCOPE,
} from '../data/cloudRuntime'
import { POSTURE } from '../data/publicStatus'

/**
 * /get-started — the client onboarding path (W-12).
 *
 * A prospective client should be able to read this page and know what FEUS is,
 * how they sign in, how their tenant is onboarded, how connections and
 * environments are declared, how agent permissions and human approvals are set,
 * how model selection works, and where audit and spend records live — without
 * installing anything.
 */
export default function GetStartedPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Get started with FEUS"
        description="The onboarding path for a new FEUS client: what FEUS is, how you sign in with Microsoft Entra ID, how a tenant is provisioned, how connections and environments are declared, how agent permissions and approvals are set, and where audit and spend records live."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Client onboarding</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Getting started with FEUS
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai is a governed assistant for database and data operations. Every
            request it handles is classified, checked against the Platform
            Constitution, routed to a model that is eligible for that request in
            that environment, executed, and recorded. When FEUS refuses, it names
            the rule that refused and what would have to change.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            You do not need an editor, an agent framework, or a local install to
            evaluate it. The cloud runtime is a browser surface.
          </p>
          <p className="mt-4 text-gray-200 leading-relaxed">
            {POSTURE.engagementModel}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={LAUNCH_URL}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch FEUS
            </a>
            <Link to="/contact" className="btn-secondary">
              Talk to us first
            </Link>
          </div>

          <div className="glass-card mt-8 rounded-2xl border-l-4 border-amber-400/60 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-amber-200">
              What you are signing up to evaluate
            </h2>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {CLOUD_RUNTIME.qualification}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">The onboarding path</h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Eight steps, with the owner of each one named. FEUS does not ask for
            access before the scope of the evaluation is agreed.
          </p>
          <ol className="space-y-4">
            {ONBOARDING_STEPS.map((step) => (
              <li key={step.number} className="glass-card rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-mono text-sm font-bold text-feus-300">{step.number}</span>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                    {step.owner}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">How FEUS Auto chooses a model</h2>
          <p className="text-gray-300 leading-relaxed">{ROUTING_AUTHORITY.statement}</p>
          <p className="mt-3 text-gray-300 leading-relaxed">{ROUTING_AUTHORITY.modeRule}</p>
          <div className="glass-card mt-6 rounded-2xl p-6">
            <dl className="space-y-3">
              {ROUTING_MODES.map((mode) => (
                <div key={mode.id} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-sm font-bold text-white">
                    {mode.label}
                    {mode.isDefault && (
                      <span className="ml-2 text-xs font-semibold text-feus-300">default</span>
                    )}
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed">{mode.summary}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            {ROUTING_AUTHORITY.modelQualification} {ROUTING_AUTHORITY.foundryRouterNote}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Audit and spend</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold text-white">Audit</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Each turn appends a routing record to a hash-linked chain held in
                durable Azure Table Storage, keyed by tenant. The runtime shows a
                correlation identifier for every turn, and the chain can be read
                back by that identifier. Refusals are recorded exactly like
                successful turns.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold text-white">Spend</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Tokens in, tokens out, and an estimated cost are recorded per turn
                and accumulated in a per-tenant ledger. Cost basis is labelled
                estimated because it is derived from published unit rates rather
                than an invoice, so treat the figure as an evaluation signal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Live, preview, and governed</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {RUNTIME_SCOPE.map((group) => (
              <div key={group.heading} className="glass-card rounded-2xl p-6">
                <h3 className="text-base font-bold text-white">{group.heading}</h3>
                <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-gray-400 leading-relaxed">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Questions clients ask first</h2>
          <div className="space-y-3">
            {ONBOARDING_FAQ.map((item) => (
              <details key={item.q} className="glass-card rounded-2xl p-6">
                <summary className="cursor-pointer text-base font-bold text-white">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white">Ready when you are</h2>
          <p className="mt-3 text-gray-300 leading-relaxed">
            Open the runtime if your access is already granted, or start the
            scoping conversation and we will take it from step one.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={LAUNCH_URL}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch FEUS
            </a>
            <Link to="/cloud-runtime" className="btn-secondary">
              What the runtime does
            </Link>
            <Link to="/trust" className="btn-secondary">
              Trust Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
