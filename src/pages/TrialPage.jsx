import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CalendlyButton } from '../components/CalendlyEmbed'
import CommercialNotice from '../components/CommercialNotice'

export default function TrialPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai controlled evaluation trial" description="A customer-specific 14-day evaluation proposal, activated only after onboarding and governed approvals. No automatic billing or conversion." />
    <header><p className="commercial-eyebrow">Evaluate with evidence</p><h1>A trial begins when readiness is accepted—not when you click.</h1>
      <p>Discuss a 14-day controlled trial with FEUS. Route and scope are agreed in your readiness pack, and the trial is activated by your administrator after onboarding — this website does not create accounts or activate trials.</p>
      <div className="commercial-actions"><CalendlyButton>Request an intro</CalendlyButton><Link to="/readiness" className="btn-secondary">Review readiness first</Link></div>
    </header>
    <CommercialNotice />
    <section><h2>Before the clock starts</h2><ol className="commercial-list">
      <li>Agree the customer-specific pack: use case, route, users/resources, negotiated entitlements, term, budgets, support, owners and acceptance criteria.</li>
      <li>Complete route-specific onboarding, identity/target validation, privacy review, approvals and audit checks.</li>
      <li>The configured commercial approver reviews activation in the governed backend. Trial start and expiry are recorded from successful authorized activation, not the inquiry, intro, demo or browser clock.</li>
    </ol><p><strong>No clock before onboarding. No auto-billing.</strong> Neither elapsed time nor a website request authorizes a charge.</p></section>
    <section><h2>During the evaluation</h2><p>Work within the approved scope and effective privileges. Record results, reviewer effort and spend against the agreed baseline. Scope changes are reviewed, and access can be paused or revoked at any time.</p></section>
    <section><h2>Day 12–14: decide deliberately</h2><p>Review value and readiness together on Call 4. Convert only after an approved commercial proposal, explicit customer consent and the governed lifecycle decision. Extension requires review and approval; it is not a browser entitlement. If you stop or the trial expires, follow the agreed offboarding and retained-records plan.</p><p>Value is measured against your own baseline; no ROI figure or service level is promised in advance.</p></section>
    <section><h2>What happens to your inquiry?</h2><p>Your inquiry reaches our team by email, and we confirm a time with you. It does not create an account or grant runtime access.</p><Link to="/contact?type=intro#contact-form">Contact sales or use the direct email fallback</Link></section>
  </div>
}
