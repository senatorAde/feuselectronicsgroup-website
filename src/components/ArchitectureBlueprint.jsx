import { Link } from 'react-router-dom'
import { COMPONENT_POSTURE } from '../data/commercialJourney'

const graphicComponents = [
  ['Microsoft Copilot / Teams', 'Roadmap', 'Shown as a future interface option.'],
  ['Apps & APIs', 'Available', 'Authenticated APIs for the FEUS.ai service; integrations are enabled per engagement.'],
  ['Portal / Chat / Workflow', 'Available', 'Browser workbench on the production Azure service, with Microsoft Entra ID sign-in.'],
  ['Azure Foundry', 'Available', 'Microsoft Foundry model catalog, approved per tenant and per environment.'],
  ['OpenAI', 'Available via Microsoft Foundry', 'OpenAI GPT models are offered through the Microsoft Foundry catalog; direct provider connections are on the roadmap.'],
  ['Gemini', 'Roadmap', 'Not in the current model catalog.'],
  ['AWS AI', 'Roadmap', 'Not in the current model catalog.'],
  ['Local models', 'Roadmap', 'Not part of the hosted service today.'],
  ['Intent routing', 'Available', 'Classification and policy-aware routing on every request.'],
  ['Specialized DBA / Data / AI / Cloud / Security / Service Desk agents', 'Available or preview, by agent', 'Each agent has its own published status in the agent portfolio.'],
  ['Governance layer', 'Available', 'Policy, PII and risk controls, with hard safety invariants on every governed route.'],
  ['HITL controls', 'Available', 'Operation-bound approvals by the people you designate — never issued from a browser or by a model.'],
  ['Verification & ROI', 'Available by engagement', 'Audit evidence on every turn; value is measured against your agreed baseline.'],
  ['SQL Server & Azure SQL', 'Available by engagement', 'SQL Server through the governed gateway on the Expert / VS Code path; each target, including Azure SQL, is qualified during onboarding.'],
  ['Fabric & Power BI', 'Roadmap', 'Planned analytics integration.'],
  ['Databricks', 'Roadmap', 'Planned data-engineering integration.'],
  ['Snowflake', 'Roadmap', 'Planned warehouse integration.'],
  ['Oracle', 'Preview', 'Read-only observation through a scoped engagement.'],
  ['AWS / GCP', 'Roadmap', 'Planned cross-cloud operations.'],
  ['ITSM & Ops tools', 'Preview', 'ServiceNow, Jira Service Management and Azure DevOps connectors through a scoped engagement.'],
  ['Provider-neutral / cross-platform / production-aware', 'Design principle', 'Providers sit behind the FEUS Policy Router, and every action is evaluated in its environment context.'],
]

export default function ArchitectureBlueprint() {
  return <section className="commercial-blueprint" aria-labelledby="blueprint-title">
    <h2 id="blueprint-title">The official architecture reference</h2>
    <p>The FEUS.ai reference architecture shows the full component landscape. The tables below show what is available today, what is delivered by engagement, what is in preview, and what is on the roadmap.</p>
    <figure><a href="/brand/feus-ai-architecture-reference.jpg" target="_blank" rel="noopener noreferrer">
      <img src="/brand/feus-ai-architecture-reference.jpg" loading="lazy" width="1122" height="1402"
        alt="FEUS.ai reference architecture: user interfaces and model integrations feed intent routing, specialist agents, governance, human oversight and verification above enterprise data platforms. Availability for each component is listed in the accompanying tables." />
    </a><figcaption>Official reference architecture. Open the original image for detail; the tables below describe each component in text.</figcaption></figure>
    <div className="commercial-grid">
      <article className="commercial-card"><h3>Executive context</h3><p>Agree one outcome, baseline and review decision. Intent → Govern → Execute → Verify → Measure Value is how each engagement shows value, measured against your own baseline. Users, scope, support and terms are agreed for your organisation.</p></article>
      <article className="commercial-card"><h3>Technical context</h3><p>Choose the hosted production service, the Expert installed route, or both. Each route records the request, identity, target, policy decision and execution evidence.</p></article>
      <article className="commercial-card"><h3>Security context</h3><p>Tenant isolation, least privilege, data boundaries, audit and operation-bound approvals apply on every route. No raw database bypass, credentials in leads, browser approvals or automatic production authority. A refusal is a designed, recorded outcome.</p></article>
    </div>
    <div className="commercial-table-wrap"><table><caption>Every named component in the reference architecture</caption><thead><tr><th scope="col">Component</th><th scope="col">Availability</th><th scope="col">Notes</th></tr></thead><tbody>{graphicComponents.map(([component, status, detail]) => <tr key={component}><th scope="row">{component}</th><td>{status}</td><td>{detail}</td></tr>)}</tbody></table></div>
    <div className="commercial-table-wrap"><table><caption>Operational and commercial components</caption><thead><tr><th scope="col">Component</th><th scope="col">Availability</th><th scope="col">Notes</th></tr></thead><tbody>{COMPONENT_POSTURE.map(([component, status, detail]) => <tr key={component}><th scope="row">{component}</th><td>{status}</td><td>{detail}</td></tr>)}</tbody></table></div>
    <p><Link to="/status">Service status</Link> · <Link to="/readiness">Customer readiness pack</Link> · <Link to="/trust/security">Security</Link></p>
  </section>
}
