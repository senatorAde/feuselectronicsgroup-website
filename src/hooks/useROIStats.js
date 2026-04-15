import { useState, useEffect } from 'react'

/**
 * Hook to fetch live ROI stats from /data/roi-stats.json
 * Falls back to hardcoded defaults if fetch fails.
 *
 * Usage:
 *   const { stats, platform, loading } = useROIStats()
 *   // stats.time_saved_hours → "14+"
 *   // platform.sql_instances_managed → "3,150+"
 */

const DEFAULTS = {
  session_metrics: {
    time_saved_hours: '14+',
    risk_cost_avoided: '$53K',
    governance_compliance_pct: '97%',
    time_to_first_roi: '<5 min',
    compliance_grade: 'A',
    operations_governed: 42,
    pii_columns_protected: 5,
    dba_cost_saved_usd: 1974.50,
  },
  platform_metrics: {
    sql_instances_managed: '3,150+',
    enterprise_clients: '32+',
    years_experience: '15+',
    technology_budget: '$3.2M',
    governance_gates: 7,
    production_modules: '30+',
  },
}

export function useROIStats() {
  const [data, setData] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/data/roi-stats.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData({
            session_metrics: { ...DEFAULTS.session_metrics, ...json.session_metrics },
            platform_metrics: { ...DEFAULTS.platform_metrics, ...json.platform_metrics },
          })
        }
      })
      .catch(() => {
        // Silently fall back to defaults — site always works
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return {
    stats: data.session_metrics,
    platform: data.platform_metrics,
    loading,
  }
}
