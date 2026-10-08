import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CalendlyButton } from '../components/CalendlyEmbed'
import CommercialNotice from '../components/CommercialNotice'
import UseCaseStories from '../components/UseCaseStories'
import { JOURNEY_CALLS } from '../data/commercialJourney'

export default function CommercialJourneyPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai evaluation journey" description="Start with an intro, qualify one use case, agree customer readiness and evaluate verified value. No trial clock before onboarding or automatic billing." />
    <header>
      <p className="commercial-eyebrow">From business intent to verified value</p>
      <h1>A useful first conversation.<br />A controlled path to adoption.</h1>
      <p>Explore FEUS.ai around your actual workload, governance needs and evidence—not a promise that every illustrated capability is live.</p>
      <div className="commercial-actions"><CalendlyButton>Request an intro</CalendlyButton><Link to="/trial" className="btn-secondary">Review the evaluation trial</Link></div>
      <p className="commercial-small">Requesting an intro does not book an appointment. A booking requires a confirmed Calendly event or an agreed time by email.</p>
    </header>
    <CommercialNotice />
    <section aria-labelledby="calls-title"><h2 id="calls-title">Four conversations, with clear decisions</h2>
      <ol className="commercial-grid">{JOURNEY_CALLS.map(call => <li className="commercial-card" key={call.title}>
        <h3>{call.title}</h3><p className="commercial-timing">{call.timing}</p><p>{call.detail}</p>
      </li>)}</ol>
    </section>
    <UseCaseStories />
    <section><h2>Choose the route that fits your team</h2><div className="commercial-grid">
      <article className="commercial-card"><h3>Hosted browser route</h3><p>For organizations evaluating a browser experience with Entra-based scoped access. No editor or Git is needed for ordinary users. Hosted inference evidence is distinct from governed live customer SQL.</p><Link to="/readiness#hosted">Hosted readiness</Link></article>
      <article className="commercial-card"><h3>Expert installed route</h3><p>For DBA/operator-led evaluation in an agreed customer environment. Qualify installed candidate dependencies, gateway wiring and effective target privileges. Installed-product use does not require Git.</p><Link to="/readiness#expert">Expert readiness</Link></article>
    </div></section>
    <section><h2>Agree the commercial scope, not an invented tier</h2><p>Users, resources, capabilities, support and entitlements are negotiated for your customer-specific pack. Package pricing is approved and quoted in your scoped proposal; contact sales to start.</p><div className="commercial-actions"><Link to="/packages" className="btn-secondary">Compare engagement options</Link><Link to="/readiness" className="btn-secondary">Review your readiness pack</Link></div></section>
  </div>
}
