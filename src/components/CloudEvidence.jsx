import { Link } from 'react-router-dom'
import { CLOUD_RUNTIME, ROUTING_AUTHORITY, MODEL_CATALOG } from '../data/cloudRuntime'
import { CURRENT_RELEASE } from '../data/releaseNotes'

/** Current service summary shared by the runtime, status and trust pages. */
export default function CloudEvidence() {
  return (
    <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed" aria-label="FEUS.ai cloud service summary">
      <h2 className="text-xl font-bold text-white">{CURRENT_RELEASE.label} · {CLOUD_RUNTIME.environmentLabel}</h2>
      <p className="mt-3">{CURRENT_RELEASE.summary}</p>
      <p className="mt-3">Every request is authenticated with Microsoft Entra ID, checked against tenant authorization, classified, and routed by the FEUS Policy Router to an eligible model from a catalog of {MODEL_CATALOG.length} Microsoft Foundry models, or to the deterministic engine. Routing, approvals and estimated cost are recorded in durable Azure storage.</p>
      <p className="mt-3">{CLOUD_RUNTIME.qualification}</p>
      <p className="mt-3">{ROUTING_AUTHORITY.foundryRouterNote}</p>
      <p className="mt-3 text-gray-400">Hosting: {CLOUD_RUNTIME.hosting}. Version {CLOUD_RUNTIME.releaseVersion}.</p>
      <div className="mt-4 flex flex-wrap gap-4">
        <Link to="/cloud-runtime" className="text-feus-200 underline">Cloud runtime</Link>
        <Link to="/demo" className="text-feus-200 underline">Guided live demonstration</Link>
        <Link to="/release-notes" className="text-feus-200 underline">Release notes</Link>
      </div>
    </div>
  )
}
