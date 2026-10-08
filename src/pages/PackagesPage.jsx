import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CalendlyButton } from '../components/CalendlyEmbed'
import CommercialNotice from '../components/CommercialNotice'
import PriceBook from '../components/PriceBook'

const paths = [
  ['Discovery & assessment', 'Clarify a bounded use case and baseline.', 'Customer-specific findings and readiness proposal.'],
  ['Hosted evaluation', 'Evaluate FEUS.ai in the browser workbench.', 'Your tenant, users, environments and approved model classes, agreed in the readiness pack.'],
  ['Expert evaluation', 'Evaluate installed operator workflows.', 'Agreed installation, target privileges and governed execution scope.'],
  ['Adoption & support', 'Move from evaluation to ongoing use.', 'A platform plan, add-ons and support set out in your signed proposal.'],
]

export default function PackagesPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai plans and pricing" description="FEUS.ai platform plans from $2,500 per month with included model usage, model usage classes from Economy to Frontier, add-ons and service packages." />
    <header><p className="commercial-eyebrow">Plans and pricing</p><h1>Governed AI operations, priced for how you use models.</h1><p>Choose a platform plan, add the model classes and services you need, and pay only for model usage beyond your included allowance. Final terms are set in your signed proposal.</p><div className="commercial-actions"><CalendlyButton>Request an intro</CalendlyButton><Link to="/contact?type=packages#contact-form" className="btn-secondary">Contact sales</Link></div></header>
    <CommercialNotice />
    <PriceBook />
    <section><h2>How you get started</h2><div className="commercial-table-wrap"><table><caption>Engagement paths into a FEUS.ai plan</caption><thead><tr><th scope="col">Path</th><th scope="col">Purpose</th><th scope="col">What is agreed</th></tr></thead><tbody>{paths.map(([title, purpose, scope]) => <tr key={title}><th scope="row">{title}</th><td>{purpose}</td><td>{scope}</td></tr>)}</tbody></table></div><p>Users, environments, model classes, budgets and support are captured in your customer-specific readiness pack. Trials start after onboarding; there is no automatic billing.</p><div className="commercial-actions"><Link to="/readiness" className="btn-secondary">Customer readiness pack</Link><Link to="/pricing" className="btn-secondary">Professional services</Link></div></section>
  </div>
}
