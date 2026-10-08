import { Link } from 'react-router-dom'
import { COMMERCIAL_CANDIDATE } from '../data/commercialJourney'

export default function CommercialNotice() {
  return <aside className="commercial-notice" aria-label="Candidate availability and evidence">
    <strong>{COMMERCIAL_CANDIDATE.status}</strong>
    <p>{COMMERCIAL_CANDIDATE.reconciliation}</p>
    <p>Older entry-page availability, routing and non-ratification statements describe the named historical checkpoints; they do not override the newer catalog or establish current production eligibility. This candidate is not a fully released production offer.</p>
    <Link to="/status">Published status &amp; historical evidence</Link>
    {' · '}<Link to="/readiness">Customer-specific readiness</Link>
  </aside>
}
