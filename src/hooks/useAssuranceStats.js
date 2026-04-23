import { useState, useEffect } from 'react'

/**
 * Hook to fetch live assurance + certification posture from
 * /data/assurance-stats.json (regenerated from FEUS-AI platform run logs).
 *
 * Usage:
 *   const { assurance, certification, auditChain, loading } = useAssuranceStats()
 */

const DEFAULTS = {
  assurance: {
    total_runs: 0,
    finalized_runs: 0,
    latest_run_at: null,
    total_evidence_entries: 0,
    packs_invoked: {},
    ceiling_decisions: {},
    data_source: 'empty',
  },
  certification: {
    total_runs: 0,
    highest_state_achieved: 'NONE',
    latest_verdict: null,
    latest_run_at: null,
    verdict_distribution: {},
    promotion_targets_unlocked: [],
    data_source: 'empty',
  },
  audit_chain: { verified: false, files_checked: 0, broken_links: 0 },
  generated_at: null,
  source: null,
}

export function useAssuranceStats() {
  const [data, setData]     = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/data/assurance-stats.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData({
            assurance:     { ...DEFAULTS.assurance,     ...(json.assurance     || {}) },
            certification: { ...DEFAULTS.certification, ...(json.certification || {}) },
            audit_chain:   { ...DEFAULTS.audit_chain,   ...(json.audit_chain   || {}) },
            generated_at:  json.generated_at || null,
            source:        json.source       || null,
          })
        }
      })
      .catch((e) => { if (!cancelled) setError(e) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return {
    assurance:     data.assurance,
    certification: data.certification,
    auditChain:    data.audit_chain,
    generatedAt:   data.generated_at,
    source:        data.source,
    loading,
    error,
  }
}
