import { Link } from 'react-router-dom'
import CommercialNotice from './CommercialNotice'
import { COMPONENT_POSTURE } from '../data/commercialJourney'

const graphicComponents = [
  ['Microsoft Copilot / Teams', 'Roadmap / integration not attested', 'Graphic illustrates an interface option, not an installed Teams application or approved execution channel.'],
  ['Apps & APIs', 'Limited', 'Candidate API surfaces require authenticated tenant access and route-specific acceptance; not every illustrated integration is implemented.'],
  ['Portal / Chat / Workflow', 'Limited', 'Hosted workbench has historical TST evidence; current candidate deployment and customer readiness remain unverified.'],
  ['Azure Foundry', 'Limited · owner-ratified candidates', '2026-10-07 catalog ratification is subject to tenant, environment, privacy, capability and budget checks.'],
  ['OpenAI', 'Roadmap / provider route not attested here', 'A logo is not evidence of enabled direct-provider credentials or model eligibility.'],
  ['Gemini', 'Roadmap / provider route not attested here', 'No blanket Google model availability is asserted.'],
  ['AWS AI', 'Roadmap / provider route not attested here', 'No blanket AWS model availability is asserted.'],
  ['Local models', 'Limited / target-specific', 'Requires an eligible registered model and validated local dependencies; not guaranteed by this illustration.'],
  ['Intent routing', 'Available core with constraints', 'Classification and policy-aware routing do not establish a live executor for every route.'],
  ['Specialized DBA / Data / AI / Cloud / Security / Service Desk agents', 'Limited / roadmap by agent', 'The agent portfolio has distinct maturity and scope; no universal execution permission.'],
  ['Governance layer', 'Available core with constraints', 'Policy, PII and risk controls require verified route wiring; hard safety invariants remain mandatory.'],
  ['HITL controls', 'Available core with constraints', 'Operation-bound approval and oversight, not model self-approval or browser-issued authority.'],
  ['Verification & ROI', 'Limited / measurement plan', 'Audit and verification evidence must be reviewed. ROI is customer-specific measured value, not a claimed guaranteed return.'],
  ['SQL Server & Azure SQL', 'Limited · controlled legacy SQL evidence', 'SQL Server governed evidence is not blanket Azure SQL qualification or hosted customer execution. Validate the selected target.'],
  ['Fabric & Power BI', 'Roadmap / integration not attested here', 'Analytics, semantic models and reports in the graphic do not establish a live connector.'],
  ['Databricks', 'Roadmap / integration not attested here', 'Data engineering and lakehouse execution require separate implementation and qualification evidence.'],
  ['Snowflake', 'Roadmap / integration not attested here', 'No warehouse/sharing execution entitlement is implied.'],
  ['Oracle', 'Limited / scope-specific', 'Inspect the published Oracle agent scope; graphic does not establish full live operational coverage.'],
  ['AWS / GCP', 'Roadmap / integration not attested here', 'No general cross-cloud execution authority or accepted customer deployment is asserted.'],
  ['ITSM & Ops tools', 'Limited / roadmap by connector', 'Historical in-memory request evidence is not a live ITSM integration; qualify each connector separately.'],
  ['Provider-neutral / cross-platform / production-aware', 'Design intent with constraints', 'These labels are architectural aims, not multi-provider certification or autonomous production approval.'],
]

export default function ArchitectureBlueprint() {
  return <section className="commercial-blueprint" aria-labelledby="blueprint-title">
    <h2 id="blueprint-title">The official architecture reference—and its boundaries</h2>
    <p>This user-supplied FEUS.ai reference presents the intended component landscape. <strong>Not every component or arrow is implemented or currently available.</strong> Treat it as a conceptual architecture, not a live system view or deployment attestation.</p>
    <figure><a href="/brand/feus-ai-architecture-reference.jpg" target="_blank" rel="noopener noreferrer">
      <img src="/brand/feus-ai-architecture-reference.jpg" loading="lazy" width="1122" height="1402"
        alt="FEUS.ai conceptual architecture: user interfaces and model integrations feed intent routing, specialist agents, governance, human oversight and verification above enterprise data platforms. Implementation boundaries are listed in the accompanying tables." />
    </a><figcaption>Official supplied reference. Open the original image for detail; the text tables below provide an accessible explanation and implementation limits.</figcaption></figure>
    <CommercialNotice />
    <div className="commercial-grid">
      <article className="commercial-card"><h3>Executive context</h3><p>Agree one outcome, baseline and review decision. Intent → Govern → Execute → Verify → Measure Value describes the evaluation method, not guaranteed savings. Users, scope, support and terms need customer-specific agreement.</p></article>
      <article className="commercial-card"><h3>Technical context</h3><p>Separate controlled legacy SQL, hosted inference and installed candidate evidence. Record the route, revision, identity, target and verified execution binding; an architecture arrow cannot substitute for acceptance tests.</p></article>
      <article className="commercial-card"><h3>Security context</h3><p>Validate tenant isolation, least privilege, data boundaries, audit and operation-bound approvals. No raw database bypass, credentials in leads, browser approvals or automatic production authority. A refusal or constrained route may be the safe outcome.</p></article>
    </div>
    <div className="commercial-table-wrap"><table><caption>Every named graphic component — availability and evidence limits</caption><thead><tr><th scope="col">Component</th><th scope="col">Posture</th><th scope="col">Boundary</th></tr></thead><tbody>{graphicComponents.map(([component, status, detail]) => <tr key={component}><th scope="row">{component}</th><td>{status}</td><td>{detail}</td></tr>)}</tbody></table></div>
    <div className="commercial-table-wrap"><table><caption>Operational and commercial components accompanying the reference</caption><thead><tr><th scope="col">Component</th><th scope="col">Posture</th><th scope="col">Qualification</th></tr></thead><tbody>{COMPONENT_POSTURE.map(([component, status, detail]) => <tr key={component}><th scope="row">{component}</th><td>{status}</td><td>{detail}</td></tr>)}</tbody></table></div>
    <p><Link to="/status">Capability register</Link> · <Link to="/readiness">Customer readiness pack</Link> · <Link to="/trust/security">Security evidence</Link></p>
  </section>
}
