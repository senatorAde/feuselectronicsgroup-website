import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'

/** /assurance — FEUS Assurance product family. Not a formal certification. */

const features = [
  ['Recommendation assurance', 'Recommendations carry structured assurance metadata and must meet a risk threshold before they can enter a governed workflow. Anything below threshold is never executable.'],
  ['Audit evidence', 'Every governed request is recorded in a hash-linked, tenant-partitioned audit trail with routing, approval and cost evidence, retrievable by correlation identifier.'],
  ['Release evidence', 'FEUS.ai releases are signed with a non-exportable HSM key and verified, with SLSA provenance and a CycloneDX software bill of materials.'],
  ['Estimates with assumptions', 'ROI and cost figures are labelled Estimate with their assumptions; value for your organisation is measured against your own agreed baseline.'],
]

export default function AssuranceDashboardPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="FEUS Assurance"
        description="FEUS Assurance: recommendation thresholds, hash-linked audit evidence, and signed releases. FEUS Assurance is not a formal certification."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>FEUS Assurance</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Evidence behind every decision
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS Assurance is the FEUS.ai family for recommendation assurance, audit
            evidence and release evidence. It gives your reviewers the record they need
            to see what was asked, which controls applied, who approved, and what happened.
            It is a product capability, not a SOC 2 report, an ISO/IEC 27001 audit, or any
            other third-party attestation.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          {features.map(([title, detail]) => (
            <div key={title} className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto mt-10 flex flex-wrap gap-4">
          <CTAButton to="/trust">Visit the Trust Center</CTAButton>
          <CTAButton to="/contact" variant="secondary">Talk to the team</CTAButton>
        </div>
        <p className="max-w-4xl mx-auto mt-6 text-xs text-gray-500">
          <Link to="/trust/compliance" className="text-feus-300 underline underline-offset-2">
            What FEUS Assurance is and is not
          </Link>
        </p>
      </section>
    </div>
  )
}
