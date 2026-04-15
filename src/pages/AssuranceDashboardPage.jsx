import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, XCircle, AlertTriangle, Activity, FileText, Clock, ChevronDown, ChevronUp, Eye, Lock } from 'lucide-react'

// ── Demo data (mirrors FEUS-Shared schemas/assurance contracts) ──
const DEMO_RUN = {
  run_id: "ASR-7F3A2B1C90DE",
  status: "COMPLETED",
  profile_name: "quick_scan",
  overall_verdict: "WARN",
  started_at: "2026-04-10T14:30:00Z",
  completed_at: "2026-04-10T14:30:12Z",
  requested_by: "dba-operator@feus.ai",
  environment: "LOCAL",
  domains_tested: ["workflow", "ai_security"],
  behavioral_risk: {
    signal_type: "none_detected",
    confidence: 0.0,
    recommended_action: "proceed",
    explanation: "No behavioral risk signals detected."
  },
  execution_ceiling: {
    decision: "PROCEED",
    reason: "No critical findings — full access",
    max_risk_tier_allowed: "full",
    behavioral_override_applied: false
  },
  findings: [
    {
      finding_id: "WF-A1B2C3D4",
      domain: "workflow",
      check_name: "safety_gate_hardblocks",
      verdict: "PASS",
      severity: "INFO",
      title: "Safety gate hard-blocks are complete",
      description: "All required hard-blocked actions are configured.",
      remediation: "No action required."
    },
    {
      finding_id: "WF-E5F6G7H8",
      domain: "workflow",
      check_name: "kill_switch_defined",
      verdict: "PASS",
      severity: "INFO",
      title: "Kill switch is configured",
      description: "Platform-wide kill switch is defined in safety_gate.yaml.",
      remediation: "No action required."
    },
    {
      finding_id: "WF-I9J0K1L2",
      domain: "workflow",
      check_name: "approval_channels_enabled",
      verdict: "PASS",
      severity: "INFO",
      title: "Approval channels active: [cli_interactive]",
      description: "1 approval channel(s) enabled.",
      remediation: "No action required."
    },
    {
      finding_id: "AI-M3N4O5P6",
      domain: "ai_security",
      check_name: "agent_approval_coverage",
      verdict: "PASS",
      severity: "INFO",
      title: "Agent governance covers all dangerous operations",
      description: "All dangerous SQL operations require approval.",
      remediation: "No action required."
    },
    {
      finding_id: "AI-Q7R8S9T0",
      domain: "ai_security",
      check_name: "pii_catalog_coverage",
      verdict: "WARN",
      severity: "MEDIUM",
      title: "PII catalog has only 4 patterns",
      description: "PII guardrail may have insufficient coverage.",
      remediation: "Add more PII patterns to pii_catalog.json (target: 10+)."
    },
    {
      finding_id: "AI-U1V2W3X4",
      domain: "ai_security",
      check_name: "entity_allowlist_present",
      verdict: "PASS",
      severity: "INFO",
      title: "Entity allowlist is configured (deny-by-default)",
      description: "entity_allowlist.json exists and is loaded.",
      remediation: "No action required."
    }
  ]
}

const PROFILES = [
  { name: "quick_scan", label: "Quick Scan", domains: ["workflow", "ai_security"], description: "Fast governance + AI security check" },
  { name: "governance_audit", label: "Governance Audit", domains: ["workflow", "ai_security", "data_safety"], description: "Full governance and data safety audit" },
  { name: "full_suite", label: "Full Suite", domains: ["workflow", "ai_security", "data_safety", "resilience"], description: "Complete assurance validation" }
]

// ── Verdict styling ──
const verdictConfig = {
  PASS:  { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: CheckCircle, label: "PASS" },
  FAIL:  { color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30",     icon: XCircle,    label: "FAIL" },
  WARN:  { color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   icon: AlertTriangle, label: "WARN" },
  ERROR: { color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30",     icon: XCircle,    label: "ERROR" },
}

const severityColor = {
  CRITICAL: "text-red-400 bg-red-500/10",
  HIGH: "text-orange-400 bg-orange-500/10",
  MEDIUM: "text-amber-400 bg-amber-500/10",
  LOW: "text-blue-400 bg-blue-500/10",
  INFO: "text-slate-400 bg-slate-500/10",
}

const domainLabel = {
  workflow: "Workflow",
  ai_security: "AI Security",
  data_safety: "Data Safety",
  resilience: "Resilience",
}

const ceilingColor = {
  PROCEED: "text-emerald-400",
  RESTRICT: "text-amber-400",
  ESCALATE: "text-orange-400",
  BLOCK: "text-red-400",
}

// ── Components ──

function VerdictBadge({ verdict }) {
  const cfg = verdictConfig[verdict] || verdictConfig.ERROR
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg} border ${cfg.border}`}>
      <Icon size={14} />
      {cfg.label}
    </span>
  )
}

function SeverityBadge({ severity }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${severityColor[severity] || "text-slate-400"}`}>
      {severity}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, subtext, color = "text-white" }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-slate-700/50 rounded-lg">
          <Icon size={18} className="text-blue-400" />
        </div>
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {subtext && <div className="text-xs text-slate-500 mt-1">{subtext}</div>}
    </div>
  )
}

function FindingRow({ finding, isExpanded, onToggle }) {
  return (
    <div className="border border-slate-700/50 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <VerdictBadge verdict={finding.verdict} />
          <SeverityBadge severity={finding.severity} />
          <span className="text-sm text-slate-300 truncate">{finding.title}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-400`}>
            {domainLabel[finding.domain] || finding.domain}
          </span>
          {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </div>
      </button>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-4 pb-4 border-t border-slate-700/30"
        >
          <div className="pt-3 space-y-2">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Description</span>
              <p className="text-sm text-slate-300 mt-1">{finding.description}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Remediation</span>
              <p className="text-sm text-blue-300 mt-1">{finding.remediation}</p>
            </div>
            <div className="flex gap-4 pt-1">
              <span className="text-xs text-slate-500">Check: <span className="text-slate-400 font-mono">{finding.check_name}</span></span>
              <span className="text-xs text-slate-500">ID: <span className="text-slate-400 font-mono">{finding.finding_id}</span></span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ── Main Page ──

export default function AssuranceDashboardPage() {
  const [selectedProfile, setSelectedProfile] = useState("quick_scan")
  const [runData, setRunData] = useState(DEMO_RUN)
  const [expandedFindings, setExpandedFindings] = useState(new Set())
  const [isRunning, setIsRunning] = useState(false)

  const toggleFinding = (id) => {
    setExpandedFindings(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleRunAssurance = () => {
    setIsRunning(true)
    // Simulate run delay for demo
    setTimeout(() => {
      setIsRunning(false)
      setRunData({ ...DEMO_RUN, run_id: `ASR-${Math.random().toString(36).substr(2, 12).toUpperCase()}` })
    }, 2000)
  }

  const passCount = runData.findings.filter(f => f.verdict === "PASS").length
  const warnCount = runData.findings.filter(f => f.verdict === "WARN").length
  const failCount = runData.findings.filter(f => f.verdict === "FAIL").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <Shield size={28} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Security Assurance</h1>
              <p className="text-slate-400 text-sm">Enterprise Security Validation & Assurance Suite</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock size={12} />
            <span>Policy-bound • Approval-aware • Evidence-driven • Auditable</span>
          </div>
        </motion.div>

        {/* ── Profile Selector + Run Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-3">Assurance Profile</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROFILES.map(profile => (
                  <button
                    key={profile.name}
                    onClick={() => setSelectedProfile(profile.name)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      selectedProfile === profile.name
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-slate-700/50 hover:border-slate-600/50 bg-slate-800/30"
                    }`}
                  >
                    <div className="text-sm font-medium text-white">{profile.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{profile.description}</div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {profile.domains.map(d => (
                        <span key={d} className="text-[10px] px-1.5 py-0.5 bg-slate-700/50 rounded text-slate-400">
                          {domainLabel[d]}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleRunAssurance}
              disabled={isRunning}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {isRunning ? (
                <>
                  <Activity size={16} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Run Assurance
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* ── Summary Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={Shield}
            label="Overall Verdict"
            value={runData.overall_verdict}
            color={verdictConfig[runData.overall_verdict]?.color || "text-white"}
          />
          <StatCard
            icon={FileText}
            label="Total Findings"
            value={runData.findings.length}
            subtext={`${passCount} pass · ${warnCount} warn · ${failCount} fail`}
          />
          <StatCard
            icon={Activity}
            label="Execution Ceiling"
            value={runData.execution_ceiling.decision}
            subtext={`Tier: ${runData.execution_ceiling.max_risk_tier_allowed}`}
            color={ceilingColor[runData.execution_ceiling.decision]}
          />
          <StatCard
            icon={Eye}
            label="Behavioral Risk"
            value={runData.behavioral_risk.signal_type === "none_detected" ? "Clean" : runData.behavioral_risk.signal_type}
            subtext={`Action: ${runData.behavioral_risk.recommended_action}`}
            color={runData.behavioral_risk.signal_type === "none_detected" ? "text-emerald-400" : "text-amber-400"}
          />
        </motion.div>

        {/* ── Run Metadata ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 mb-8"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-400">
            <span>Run: <span className="text-slate-300 font-mono">{runData.run_id}</span></span>
            <span>Profile: <span className="text-slate-300">{runData.profile_name}</span></span>
            <span>Env: <span className="text-slate-300">{runData.environment}</span></span>
            <span>By: <span className="text-slate-300">{runData.requested_by}</span></span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {new Date(runData.started_at).toLocaleString()}
            </span>
            <span>
              Domains: {runData.domains_tested.map(d => domainLabel[d] || d).join(", ")}
            </span>
          </div>
        </motion.div>

        {/* ── Findings ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={18} className="text-blue-400" />
            Findings
          </h2>
          <div className="space-y-2">
            {runData.findings.map(finding => (
              <FindingRow
                key={finding.finding_id}
                finding={finding}
                isExpanded={expandedFindings.has(finding.finding_id)}
                onToggle={() => toggleFinding(finding.finding_id)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Behavioral Risk Detail ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Eye size={18} className="text-blue-400" />
            Behavioral Risk Analysis
            <span className="text-xs text-slate-500 font-normal ml-2">Secondary control signal — never grants access</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Signal Type</span>
              <p className="text-sm text-slate-300 mt-1 font-mono">{runData.behavioral_risk.signal_type}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Confidence</span>
              <p className="text-sm text-slate-300 mt-1">{(runData.behavioral_risk.confidence * 100).toFixed(0)}%</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Action</span>
              <p className="text-sm text-slate-300 mt-1">{runData.behavioral_risk.recommended_action}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Ceiling Override</span>
              <p className="text-sm text-slate-300 mt-1">{runData.execution_ceiling.behavioral_override_applied ? "Yes" : "No"}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">{runData.behavioral_risk.explanation}</p>
        </motion.div>

        {/* ── Execution Ceiling Detail ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lock size={18} className="text-blue-400" />
            Execution Ceiling
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Decision</span>
              <p className={`text-lg font-bold mt-1 ${ceilingColor[runData.execution_ceiling.decision]}`}>
                {runData.execution_ceiling.decision}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Max Tier Allowed</span>
              <p className="text-sm text-slate-300 mt-1 font-mono">{runData.execution_ceiling.max_risk_tier_allowed}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Reason</span>
              <p className="text-sm text-slate-300 mt-1">{runData.execution_ceiling.reason}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <div className="mt-12 text-center text-xs text-slate-600">
          FEUS.ai Security Assurance Suite v1.0 · Enterprise-Grade · Policy-Bound · Auditable
        </div>
      </div>
    </div>
  )
}
