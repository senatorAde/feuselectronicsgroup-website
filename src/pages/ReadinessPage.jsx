import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CalendlyButton } from '../components/CalendlyEmbed'
import CommercialNotice from '../components/CommercialNotice'
import { READINESS_PACK } from '../data/commercialJourney'
import { LAUNCH_URL } from '../data/cloudRuntime'

export default function ReadinessPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai customer readiness pack" description="Customer-specific hosted and Expert readiness, approvals, trial activation, identity, privacy, entitlements, budgets, acceptance evidence and offboarding." />
    <header><p className="commercial-eyebrow">Customer-specific, approval-led</p><h1>Your readiness pack connects scope to safe use.</h1><p>Use this checklist in discovery and onboarding. It is documentation, not a browser-issued approval. Customer administrators and authorized FEUS operators review the actual pack in the governed backend; website form fields cannot grant runtime authority.</p><div className="commercial-actions"><CalendlyButton>Request an intro</CalendlyButton><Link to="/trial" className="btn-secondary">Understand activation</Link></div></header>
    <CommercialNotice />
    <section id="hosted"><h2>Hosted readiness</h2><p>Confirm organization/tenant onboarding, Entra sign-in, authorized roles, privacy boundary, approved models and routing, budgets and route acceptance checks. Customer targets are registered by reference; execution against them is qualified separately on the Expert route. Ordinary hosted users do not need Git, a local editor or a source checkout.</p></section>
    <section id="expert"><h2>Expert installed readiness</h2><p>Confirm supported installation and dependency versions, local operational owner, approved identities and target reachability, all five gateway subsystem adapters, real execution binding, policy/PII/approval rules, audit health and rollback. The Expert route runs from a FEUS-provided distribution checkout set up with you. Never bypass the governed gateway to prove connectivity.</p></section>
    <section><h2>The complete customer-specific pack</h2><dl className="commercial-pack">{READINESS_PACK.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl></section>
    <section><h2>Readiness is a decision, not a badge</h2><p>Capture each check as open, accepted with evidence, constrained or blocked, naming its owner and evidence reference. Hard safety controls fail closed. An optional dependency affects only the capabilities that use it. Customer data and production execution are enabled only once their checks are accepted.</p><p>Activation requires onboarding completion and applicable approvals. There is no trial clock before onboarding. Commercial conversion requires explicit customer consent; a lead, successful demo or timer never triggers automatic billing.</p><Link to="/architecture">Architecture components and availability</Link></section>
    <section><h2>Continue in the authenticated workspace</h2><p>If your organization has already granted access, open the workbench and choose <strong>Workspace &amp; account</strong> for discovery, readiness, onboarding, trial, evidence, conversion and offboarding. Sign-in uses the access your organisation has been granted.</p><a href={LAUNCH_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">Workspace &amp; account (already onboarded)</a><p>The backend binds the stable session and organization to authenticated commands, revision checks and idempotency. A configured human owner reviews readiness and notification delivery; this public website never sends lifecycle commands or creates runtime authority.</p></section>
  </div>
}
