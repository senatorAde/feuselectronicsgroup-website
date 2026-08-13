import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { useAssuranceStats } from '../hooks/useAssuranceStats'
import { POSTURE } from '../data/publicStatus'
import { RELEASE_ASSESSMENT } from '../data/releaseAssessment'

/**
 * /assurance — FEUS Assurance evidence snapshot (IMPL-012).
 * Rules:
 *  - Internal engine states render VERBATIM (e.g. CERTIFICATION_FAILED) —
 *    never renamed, softened, or restyled as progress (WEB-042).
 *  - No "live evidence stream" framing; this is a revision-bound snapshot.
 *  - Missing data renders as an explicit unavailable state, never as
 *    fabricated numbers.
 */

function Row({ label, value, mono = false }) {
  return (
    <tr className="border-b border-white/[0.06]">
      <th scope="row" className="py-2 pr-4 text-gray-300 font-normal text-left">{label}</th>
      <td className={`py-2 text-white font-medium ${mono ? 'font-mono text-sm break-all' : ''}`}>{value}</td>
    </tr>
  )
}

export default function AssuranceDashboardPage() {
  const { assurance, certification, auditChain, generatedAt, loading, error } = useAssuranceStats()

  const unavailable = !!error

  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS Assurance Evidence Snapshot"
        description="Revision-bound snapshot of FEUS Assurance internal evaluation evidence, reported verbatim. FEUS Assurance is not a formal certification."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>FEUS Assurance · Reserved product family</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Assurance evidence snapshot
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-300/90">
            Internal evaluation evidence · Not a formal certification
          </p>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS Assurance is the reserved family name for FEUS.ai&rsquo;s internal
            assurance evaluation and release-evidence tooling. The snapshot below
            reports internal engine outputs verbatim. It is not a SOC 2 report,
            an ISO/IEC 27001 audit, or any other third-party attestation.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-10">
          {loading && (
            <p className="text-gray-400 text-sm" role="status">Loading evidence snapshot…</p>
          )}

          {!loading && unavailable && (
            <div className="glass-card rounded-2xl p-6 border-l-4 border-rose-500 text-sm text-gray-300">
              Evidence snapshot data is unavailable. No figures are shown in its place.
            </div>
          )}

          {!loading && !unavailable && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Internal certification engine</h2>
                <div className="glass-card rounded-2xl p-6">
                  <table className="w-full text-sm border-collapse">
                    <caption className="sr-only">Internal certification engine snapshot, verbatim states</caption>
                    <tbody>
                      <Row label="Total certification runs" value={certification.total_runs} />
                      <Row
                        label="Highest state achieved (verbatim)"
                        value={certification.highest_state_achieved}
                        mono
                      />
                      <Row
                        label="Promotion targets unlocked"
                        value={
                          certification.promotion_targets_unlocked?.length
                            ? certification.promotion_targets_unlocked.join(', ')
                            : 'None'
                        }
                      />
                      <Row label="Latest run" value={certification.latest_run_at || 'Not recorded'} />
                    </tbody>
                  </table>
                  <p className="mt-4 text-xs text-gray-500">
                    Engine states are internal identifiers reported exactly as produced.
                    CERTIFICATION_FAILED means the internal engine did not certify the run;
                    it is displayed without renaming.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Assurance evaluation runs</h2>
                <div className="glass-card rounded-2xl p-6">
                  <table className="w-full text-sm border-collapse">
                    <caption className="sr-only">Assurance evaluation run counts</caption>
                    <tbody>
                      <Row label="Total assurance runs" value={assurance.total_runs} />
                      <Row label="Finalized runs" value={assurance.finalized_runs} />
                      <Row label="Evidence entries" value={assurance.total_evidence_entries} />
                      <Row label="Latest run" value={assurance.latest_run_at || 'Not recorded'} />
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Audit chain</h2>
                <div className="glass-card rounded-2xl p-6">
                  <table className="w-full text-sm border-collapse">
                    <caption className="sr-only">Audit chain verification snapshot</caption>
                    <tbody>
                      <Row label="Chain verified" value={auditChain?.verified ? 'Yes' : 'No'} />
                      <Row label="Files checked" value={auditChain?.files_checked ?? 0} />
                      <Row label="Broken links" value={auditChain?.broken_links ?? 0} />
                    </tbody>
                  </table>
                  <p className="mt-4 text-xs text-gray-500">
                    The local hash chain is unkeyed and externally unanchored; it can detect
                    naive edits in tests and is not adversary-resistant evidence.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Snapshot generated {generatedAt || 'date not recorded'} · Platform posture bound to
                revision <span className="font-mono break-all">{RELEASE_ASSESSMENT.certifiedRevision}</span> ·{' '}
                <Link to="/trust/compliance" className="text-feus-300 underline underline-offset-2">
                  What this evidence is and is not
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
