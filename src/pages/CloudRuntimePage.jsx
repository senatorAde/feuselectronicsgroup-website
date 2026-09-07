import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import {
  CLOUD_RUNTIME,
  LAUNCH_URL,
  ROUTING_MODES,
  ROUTING_AUTHORITY,
  RUNTIME_SURFACES,
  RUNTIME_EVIDENCE,
  RUNTIME_SCOPE,
  TURN_PIPELINE,
} from '../data/cloudRuntime'

/**
 * /cloud-runtime — the FEUS Cloud Runtime as a current product surface.
 *
 * Every claim on this page is sourced from src/data/cloudRuntime.js, which the
 * public-claims gate pins. Nothing is asserted here that the verified 5.3 cloud
 * release did not establish.
 */
export default function CloudRuntimePage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS Cloud Runtime"
        description="FEUS.ai runs in the browser as a governed cloud runtime on Azure. Sign in with Microsoft Entra ID, send a governed turn, and read the routing, cost, and audit record for every decision."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Available now</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            {CLOUD_RUNTIME.headline}
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-feus-200">
            Declared environment {CLOUD_RUNTIME.declaredEnvironment} · Governed evaluation surface
          </p>
          <p className="mt-6 text-gray-300 leading-relaxed">{CLOUD_RUNTIME.summary}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={LAUNCH_URL}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch FEUS
            </a>
            <Link to="/get-started" className="btn-secondary">
              See the onboarding path
            </Link>
          </div>

          <div className="glass-card mt-8 rounded-2xl border-l-4 border-amber-400/60 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-amber-200">
              Scope of this claim
            </h2>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {CLOUD_RUNTIME.qualification}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What the release established</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {RUNTIME_EVIDENCE.map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-6">
                <p className="text-2xl font-bold text-feus-200">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-500 leading-relaxed">
            FEUS.ai {CLOUD_RUNTIME.releaseVersion}, verified {CLOUD_RUNTIME.verifiedOn} at
            revision <span className="font-mono">{CLOUD_RUNTIME.releaseRevision.slice(0, 12)}</span>.
            Hosting: {CLOUD_RUNTIME.hosting}.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What you get in the browser</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {RUNTIME_SURFACES.map((surface) => (
              <div key={surface.title} className="glass-card rounded-2xl p-6">
                <h3 className="text-base font-bold text-white">{surface.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{surface.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">How FEUS chooses a model</h2>
          <p className="text-gray-300 leading-relaxed">{ROUTING_AUTHORITY.statement}</p>
          <p className="mt-3 text-gray-300 leading-relaxed">{ROUTING_AUTHORITY.modeRule}</p>

          <div className="mt-6 grid gap-3">
            {ROUTING_MODES.map((mode) => (
              <div key={mode.id} className="glass-card rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-bold text-white">{mode.label}</h3>
                  {mode.isDefault && (
                    <span className="rounded-full bg-feus-400/10 px-3 py-1 text-xs font-bold text-feus-200">
                      Platform default
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{mode.summary}</p>
              </div>
            ))}
          </div>

          <div className="glass-card mt-6 rounded-2xl border-l-4 border-slate-500/60 p-6">
            <h3 className="text-base font-bold text-white">Activated models</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-300 font-mono">
              {ROUTING_AUTHORITY.activatedModels.map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {ROUTING_AUTHORITY.modelQualification}
            </p>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              {ROUTING_AUTHORITY.foundryRouterNote}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What happens to one turn</h2>
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white">Open it and send a turn</h2>
          <p className="mt-3 text-gray-300 leading-relaxed">
            You will need a Microsoft Entra ID account that has been granted access.
            If you do not have one yet, start with the onboarding path.
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
            <Link to="/get-started" className="btn-secondary">
              How onboarding works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
