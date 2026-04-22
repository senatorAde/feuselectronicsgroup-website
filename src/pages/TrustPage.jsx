import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield, Lock, Eye, CheckCircle2, Server,
  AlertTriangle, FileSearch, UserCheck, Activity, Layers,
  ShieldCheck, ShieldAlert, ClipboardCheck, Fingerprint,
  Download, GitBranch, ScanLine, FileCheck2
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

/* ─────────────────────── SAFETY GUARANTEES ─────────────────────── */
const safetyGuarantees = [
  {
    icon: ShieldAlert,
    title: 'Fail-Closed by Design',
    description: 'The governance pipeline is fail-closed — if a governance component is unavailable, the pipeline halts execution. Operations cannot bypass safety checks. The safe default is always "no."',
  },
  {
    icon: Eye,
    title: 'Audit-Before-Execution',
    description: 'Every operation is recorded in a tamper-evident audit trail before it reaches your environment. Every decision, recommendation, and action includes complete provenance — who, what, when, and why.',
  },
  {
    icon: Lock,
    title: 'No Silent Operations',
    description: 'Nothing happens without being announced, approved, and logged. There is no path through the system where an action occurs without the user knowing and a corresponding audit record existing.',
  },
  {
    icon: Fingerprint,
    title: 'Onboarding Safety',
    description: 'The first time FEUS.ai connects to your environment, it performs read-only inspection only. Zero database operations, zero remote execution, zero silent installs. It tells you exactly what it found — truthfully.',
  },
]

/* ─────────────────────── GOVERNANCE PIPELINE ─────────────────────── */
const pipelineGates = [
  {
    gate: 'Gate 1',
    title: 'System Readiness',
    description: 'Verify all governance subsystems are operational before accepting any request.',
    icon: Server,
  },
  {
    gate: 'Gate 2',
    title: 'Audit Initiation',
    description: 'Create an immutable audit record for this request before any processing begins.',
    icon: ClipboardCheck,
  },
  {
    gate: 'Gate 3',
    title: 'Environment & Identity',
    description: 'Verify the requesting user, their role, and the target environment (dev, staging, production).',
    icon: UserCheck,
  },
  {
    gate: 'Gate 4',
    title: 'Policy Evaluation',
    description: 'Check the operation against organizational policy rules. Block, warn, or require approval — automatically.',
    icon: FileSearch,
  },
  {
    gate: 'Gate 5',
    title: 'PII Inspection',
    description: 'Scan for personally identifiable information in queries and results. Mask or block before data leaves the system.',
    icon: ShieldCheck,
  },
  {
    gate: 'Gate 6',
    title: 'Approval Verification',
    description: 'For operations that require human approval, verify that authorization has been granted by an appropriate approver.',
    icon: CheckCircle2,
  },
  {
    gate: 'Gate 7',
    title: 'Governed Execution',
    description: 'Only after all gates pass does the operation execute — with full monitoring, rollback capability, and real-time logging.',
    icon: Activity,
  },
]

/* ─────────────────────── TRUST COMMITMENTS ─────────────────────── */
const trustCommitments = [
  {
    title: 'Your Data Never Leaves Your Environment',
    description: 'FEUS.ai operates inside your infrastructure. Database queries execute in your environment, through your connections, under your authentication. We provide the governance layer — not the data pipeline.',
  },
  {
    title: 'Every Action Is Attributable',
    description: 'Every operation is tied to a session, a user identity, and a timestamp. Audit records are hash-chained for tamper evidence. When auditors ask "who did what and when," the answer is already documented.',
  },
  {
    title: 'AI Recommends. Humans Approve.',
    description: 'FEUS.ai analyzes, detects, and recommends. It does not autonomously execute changes to your production environment. Multi-tier approval workflows with role-based routing ensure human oversight at every critical decision point.',
  },
  {
    title: 'Truthful Readiness Reporting',
    description: 'FEUS.ai never claims capabilities it cannot deliver. When the system starts, it runs a comprehensive self-assessment and tells you exactly what is working, what is missing, and what needs attention — with specific, actionable guidance.',
  },
  {
    title: 'No Blind Execution',
    description: 'Governance is structurally embedded in every execution path. The platform is designed so that operations cannot bypass the governance pipeline. If governance is down, execution is down. That is intentional.',
  },
]

export default function TrustPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <PageHero
        label="Trust & Security"
        title={<>How FEUS.ai Ensures<br /><span className="gradient-text">Safe AI Operations</span></>}
        subtitle="Enterprise AI should be governed by design — not by hope. FEUS.ai is built on a fail-closed architecture where safety is the default, governance is the structure, and every operation is auditable."
      >
        <div className="flex flex-wrap gap-4">
          <CalendlyButton className="btn-accent group" icon={ArrowRight}>
            Discuss Your Security Requirements
          </CalendlyButton>
          <CTAButton to="/feus-ai" variant="secondary">See the Platform</CTAButton>
        </div>
      </PageHero>

      <GlowDivider />

      {/* ─── CORE SAFETY GUARANTEES ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Core Safety Guarantees"
              title="Four Principles That Never Bend"
              subtitle="These aren't features — they're architectural constraints. They cannot be disabled, bypassed, or configured away."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {safetyGuarantees.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="glass-card p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-feus-500/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-feus-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── GOVERNANCE PIPELINE ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Governance Pipeline"
              title={<>Every Operation. Seven Gates.<br /><span className="gradient-text">No Exceptions.</span></>}
              subtitle="Before any operation reaches your database, it passes through a multi-stage governance pipeline. Execution is the last step — not the first."
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {pipelineGates.map((gate, i) => (
              <AnimatedSection key={gate.gate} delay={i * 80}>
                <div className="glass-card p-6 flex items-start gap-5 group hover:border-feus-500/30 transition-colors duration-300">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-feus-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <gate.icon className="w-6 h-6 text-feus-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-feus-500/50 uppercase tracking-wider mb-1">{gate.gate}</div>
                    <h4 className="text-lg font-semibold text-white mb-1">{gate.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{gate.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── LIVE COHESION PROOF — v5.2.0 ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Live Cohesion Proof · Platform v5.2.0"
              title={<>The Architecture Doesn’t Just Look Cohesive.<br /><span className="gradient-text">It Is Cohesive — And We Prove It.</span></>}
              subtitle="Cohesion is verified by an executable scenario (S10 Full Session Audit Trail) that drives a real session through every gate, then asserts 11 invariants across the audit chain. Bypass attempts are independently scanned out of the source. Evidence is hash-chained and reproducible."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <AnimatedSection delay={0}>
              <div className="glass-card p-6 h-full border-emerald-500/20">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <FileCheck2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white">11 / 11</div>
                <div className="text-sm text-emerald-400 font-semibold mt-1">VERIFIED</div>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  S10 cohesion invariants — readiness gate, audit ordering, hash chain integrity, policy/PII/approval/governed-execution chronology, attribution coverage, and immutability.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="glass-card p-6 h-full border-emerald-500/20">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <ScanLine className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-sm text-emerald-400 font-semibold mt-1">NET BYPASS VIOLATIONS</div>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  Static bypass scanner across 71 source files — unauthorised raw connections, f-string SQL execution paths, and audit-skips are detected at build time. Any exemption is file-scoped and justified.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="glass-card p-6 h-full border-emerald-500/20">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white">12 / 12</div>
                <div className="text-sm text-emerald-400 font-semibold mt-1">VIRGIN-ENVIRONMENT CHECKS</div>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  First-contact behaviour is proved on a clean machine — no DB ops, no silent installs, truthful readiness verdict, complete session-traced audit from byte zero.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={240}>
            <div className="glass-card-static p-8 md:p-10 border-feus-500/20">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <SectionLabel>Three-Layer No-Bypass Proof</SectionLabel>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Structural. Behavioural. Evidential.
                  </h3>
                  <p className="mt-4 text-gray-400 leading-relaxed">
                    The platform proves that governance cannot be skipped on three independent axes. Any one of them failing breaks certification — fail-closed.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Layer 1 — Structural</div>
                        <div className="text-sm text-gray-400">Bootstrap, gates, and the governed executor are the only paths into a database connection. There is no second path.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Layer 2 — Behavioural</div>
                        <div className="text-sm text-gray-400">S10 drives a live multi-operation session and asserts that every required event appears, in the required order, with the required correlation.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-feus-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">Layer 3 — Evidential</div>
                        <div className="text-sm text-gray-400">Bypass scanner + dependency authenticity + hash-chained manifest — the evidence pack itself is independently verifiable after the fact.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-feus-400 font-semibold mb-3">Executive Walkthrough</div>
                  <h4 className="text-xl font-semibold text-white mb-3">FEUS AIIA Walkthrough — PDF</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    A 7-section executive packet: architecture, three-layer proof, S10 invariants table, session lifecycle worked example, verdict reading guide, and reproducibility steps. Built directly from the live evidence run, with hash references to the manifest.
                  </p>
                  <a
                    href="/FEUS_AIIA_Walkthrough.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-feus-600 hover:bg-feus-500 text-white font-semibold text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download AIIA Walkthrough (PDF)
                  </a>
                  <div className="mt-5 text-[11px] text-gray-500 font-mono leading-relaxed">
                    Generated from CERT_20260422T195909Z_585A54<br />
                    Manifest hash chain: SHA-256 · immutable · reproducible<br />
                    Confidential — prepared for AIIA review
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FIRST INTERACTION — DONE RIGHT ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel>First Interaction — Done Right</SectionLabel>
                <h2 className="section-heading text-white">
                  Before FEUS.ai Does Anything,<br />
                  <span className="gradient-text">It Tells You the Truth</span>
                </h2>
                <p className="mt-6 text-gray-400 leading-relaxed">
                  The first time FEUS.ai connects to your environment, it doesn't assume anything works. It runs a comprehensive, read-only self-assessment — checking your runtime, your configuration, your governance stack, and your integration points.
                </p>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Then it tells you exactly what it found. Not what it wishes were true. Not a marketing message. A truthful readiness report with specific, actionable guidance for anything that needs attention.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'Zero database operations during first contact',
                    'Zero silent installs — every action requires explicit approval',
                    'Truthful readiness verdict: Ready, Partially Ready, or Blocked',
                    'Specific capability flags: what it can do right now vs. what it cannot',
                    'Session-traced audit trail from the very first interaction',
                    'Verified install sources with risk assessment for anything missing',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatedSection delay={100}>
                <div className="glass-card-static p-8 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-feus-500/5 rounded-full blur-[60px]" />
                  <div className="relative space-y-2 text-gray-300">
                    <p className="text-feus-400">{'>'} hello feus</p>
                    <p className="text-white font-semibold mt-3">👋 Hello! I'm FEUS.ai — your governed DBA assistant.</p>
                    <p className="text-gray-400 mt-2">I just ran my first-contact checks and here's what I found:</p>
                    <div className="mt-3 space-y-1 text-xs">
                      <p>✅ Python 3.11.9 on WORKSTATION-01</p>
                      <p>✅ Governance: All 8 gates operational</p>
                      <p>✅ PII controls: Armed</p>
                      <p>✅ Audit chain: Active</p>
                      <p>⚠️ 2 optional extensions not found</p>
                      <p className="text-gray-500 mt-2">14 of 16 checks passed</p>
                      <p className="text-gray-500">Verdict: PARTIALLY_READY</p>
                    </div>
                    <p className="text-gray-400 mt-3 text-xs">Nothing runs without your explicit approval.</p>
                    <p className="text-gray-600 mt-2 text-[10px]">Session: feus-20260407-a3f8c21b</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── TRUST COMMITMENTS ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Trust Commitments"
              title="What We Guarantee"
              subtitle="These are non-negotiable commitments built into the architecture — not marketing promises that bend under pressure."
            />
          </AnimatedSection>

          <div className="space-y-6 max-w-4xl mx-auto">
            {trustCommitments.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 80}>
                <div className="glass-card p-8">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-feus-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── COMPLIANCE READY ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-8 md:p-12 border-feus-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-feus-500/5 rounded-full blur-[100px]" />
              <div className="relative">
                <SectionLabel>Compliance Ready</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  When Auditors Ask,<br />
                  <span className="gradient-text">The Evidence Is Already There</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl">
                  Every operation through FEUS.ai generates a structured, hash-chained audit record. Every decision includes provenance. Every action includes attribution. Compliance evidence isn't generated after the fact — it's produced as a natural byproduct of governed operations.
                </p>
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-feus-500/5 border border-feus-500/20">
                    <h4 className="text-base font-semibold text-white mb-2">Tamper-Evident Logs</h4>
                    <p className="text-sm text-gray-400">Hash-chained audit entries ensure that any modification to the audit trail is immediately detectable.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h4 className="text-base font-semibold text-white mb-2">PII-Safe Records</h4>
                    <p className="text-sm text-gray-400">Audit records log operations by category and context — never by raw PII values. Sensitive data stays out of the audit trail.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
                    <h4 className="text-base font-semibold text-white mb-2">Complete Provenance</h4>
                    <p className="text-sm text-gray-400">Every record includes: who requested it, what policy approved it, what was executed, and what the outcome was. No gaps.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FINAL CTA ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Security Is the Architecture.<br />
                <span className="gradient-text">Not an Afterthought.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-400">
                See how FEUS.ai's governed execution model integrates with your environment, your compliance requirements, and your team's existing workflows.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Discuss Your Security Requirements
                </CalendlyButton>
                <CTAButton to="/feus-ai" variant="secondary">Explore the Platform</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
