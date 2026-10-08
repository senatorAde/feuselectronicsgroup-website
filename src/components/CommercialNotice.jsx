import { Link } from 'react-router-dom'

/** Short, positive explanation of how a FEUS.ai engagement runs. */
export default function CommercialNotice() {
  return <aside className="commercial-notice" aria-label="How FEUS.ai engagements work">
    <strong>How engagements work</strong>
    <p>Intro call → discovery → customer-specific readiness pack → onboarding → 14-day controlled trial → value review → your plan. Trials start after onboarding, and there is no automatic billing: plans follow the published price book, with final terms in your signed proposal and invoice.</p>
    <Link to="/journey">The evaluation journey</Link>
    {' · '}<Link to="/packages">Plans and pricing</Link>
  </aside>
}
