import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import StatusBadge from '../components/StatusBadge'

/**
 * /copilot — disabled-status stub (IMPL-004).
 * "FEUS Copilot" is a conditional legacy name pending legal review; the page
 * must not present a working AI assistant. noindex per the claims baseline.
 */
export default function CopilotLandingPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS Copilot (Not Available)"
        description="The FEUS Copilot chat interface is not available. FEUS.ai is pre-release and not approved for production deployment."
        noindex
      />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Legacy interface name</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">FEUS Copilot</h1>
          <div className="mt-4">
            <StatusBadge status="DISABLED" showDefinition />
          </div>
          <div className="mt-8 glass-card rounded-2xl p-6 text-gray-300 leading-relaxed space-y-4 text-sm">
            <p>
              &ldquo;FEUS Copilot&rdquo; is a legacy name for a chat-style interface concept
              associated with the FEUS.ai platform. No working chat assistant is
              available on this website, and no AI capability may be exercised here.
            </p>
            <p>
              FEUS.ai itself is pre-release, under controlled evaluation, and not
              approved for production deployment. Zero of 45 capabilities are
              production verified.
            </p>
            <p className="text-xs text-gray-500">
              The &ldquo;Copilot&rdquo; name is retained for historical reference only and
              is under naming review.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/feus-ai" className="text-feus-300 underline underline-offset-2">
              FEUS.ai platform overview
            </Link>
            <Link to="/status" className="text-feus-300 underline underline-offset-2">
              Platform status
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
