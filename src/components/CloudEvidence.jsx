import { Link } from 'react-router-dom'
import { CLOUD_RUNTIME, ROUTING_AUTHORITY, LATEST_DEPLOYED_RECORD, HISTORICAL_CLOUD_VALIDATION, STARTER_STATUS } from '../data/cloudRuntime'

/** Published evidence, not a health probe. Retain source dates without re-attesting them. */
export default function CloudEvidence() {
  return (
    <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed" aria-label="Current cloud evaluation evidence">
      <h2 className="text-xl font-bold text-white">Current cloud evaluation · {CLOUD_RUNTIME.releaseVersion} · TST</h2>
      <p className="mt-3 font-semibold text-amber-200">{STARTER_STATUS.summary}</p>
      <p className="mt-3">The published release record describes an Azure workbench with Microsoft Entra ID access, tenant authorization, FEUS Policy Router selection, Microsoft Foundry inference and durable Azure Table Storage evidence.</p>
      <p className="mt-3">{CLOUD_RUNTIME.qualification}</p>
      <p className="mt-3">Live inference does not establish live SQL or tool execution, customer-target integration, or full production qualification. Agent and tool operations retain their own authorization, policy, approval and execution boundary.</p>
      <p className="mt-3">{ROUTING_AUTHORITY.foundryRouterNote}</p>
      <p className="mt-4 text-gray-400">
        Basis: published cloud release evidence. Latest recorded deployment: <span className="font-mono break-all">{LATEST_DEPLOYED_RECORD.revision}</span>.
        {' '}Source <span className="font-mono break-all">{LATEST_DEPLOYED_RECORD.sourceRevision}</span>; signed revision {LATEST_DEPLOYED_RECORD.signedRevision}.
        {' '}Image digest <span className="font-mono break-all">{LATEST_DEPLOYED_RECORD.imageDigest}</span>.
        {' '}Traffic at checkpoint: {LATEST_DEPLOYED_RECORD.trafficPercentAtCheckpoint}% on <time dateTime={LATEST_DEPLOYED_RECORD.checkpointUtc}>{LATEST_DEPLOYED_RECORD.checkpointUtc}</time>.
        {' '}Source verification date (UTC): <time dateTime={CLOUD_RUNTIME.verifiedOn}>{CLOUD_RUNTIME.verifiedOn}</time>.
        {' '}The source date and revision are retained from the published record; this website review is not a new live verification.
      </p>
      <p className="mt-3 text-gray-400">{LATEST_DEPLOYED_RECORD.scope}</p>
      <p className="mt-3 text-gray-400">Historical validation record: <span className="font-mono break-all">{HISTORICAL_CLOUD_VALIDATION.sourceRevision}</span>. Its test counts and release tag belong to that record, not to the latest deployment or pending starter correction.</p>
      <p className="mt-3 text-gray-400">Static evidence summary, not live incident monitoring or a statement of present service health.</p>
      <div className="mt-4 flex flex-wrap gap-4">
        <Link to="/cloud-runtime" className="text-feus-200 underline">Cloud runtime scope</Link>
        <Link to="/demo" className="text-feus-200 underline">Guided live demonstration</Link>
        <Link to="/release-notes" className="text-feus-200 underline">Dated release records</Link>
      </div>
    </div>
  )
}