import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CalendlyButton } from '../components/CalendlyEmbed'
import CommercialNotice from '../components/CommercialNotice'

const options = [
  ['Discovery & assessment', 'Clarify a bounded use case and baseline.', 'Customer-specific findings and readiness proposal; no runtime access implied.'],
  ['Hosted evaluation', 'Evaluate the qualified browser route.', 'Scoped tenant access and agreed inference capabilities; customer execution requires separate qualification.'],
  ['Expert evaluation', 'Evaluate installed operator workflows.', 'Agreed installation, target privileges and governed execution scope; not a blanket license.'],
  ['Adoption & support', 'Move from accepted evidence to ongoing use.', 'Approved commercial scope, explicit consent, negotiated entitlements and support responsibilities.'],
]

export default function PackagesPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai engagement comparison" description="Compare scoped assessment, hosted, Expert and adoption engagements. Contact sales; prices and user/resource entitlements require approved customer-specific terms." />
    <header><p className="commercial-eyebrow">Scope before commitment</p><h1>Compare engagement paths, not unapproved price tiers.</h1><p>Contact sales for a customer-specific proposal. Prices are unpublished pending approval. There are no fabricated user limits, resource counts, included tokens or guaranteed service levels.</p><div className="commercial-actions"><CalendlyButton>Request an intro</CalendlyButton><Link to="/contact?type=packages#contact-form" className="btn-secondary">Contact sales</Link></div></header>
    <CommercialNotice />
    <section><h2>Which path serves your outcome?</h2><div className="commercial-table-wrap"><table><caption>Engagement comparison — subject to qualification and negotiated terms</caption><thead><tr><th scope="col">Path</th><th scope="col">Purpose</th><th scope="col">Scope boundary</th><th scope="col">Price</th></tr></thead><tbody>{options.map(([title, purpose, scope]) => <tr key={title}><th scope="row">{title}</th><td>{purpose}</td><td>{scope}</td><td>Contact sales · unpublished</td></tr>)}</tbody></table></div></section>
    <section><h2>Agree what is included</h2><p>Negotiate scope, users, resources, capabilities, environments, entitlements, model spend, support, ownership and acceptance evidence. Capture exclusions and change control in the customer-specific pack. No option automatically includes every component in the architecture graphic.</p><p>Trial activation follows readiness and commercial approval. Conversion requires approved terms and explicit customer consent; no auto-billing. Ordinary users do not need Git.</p><div className="commercial-actions"><Link to="/readiness" className="btn-secondary">Customer readiness pack</Link><Link to="/pricing" className="btn-secondary">Professional services engagements</Link></div></section>
  </div>
}
