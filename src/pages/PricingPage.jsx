import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import PriceBook from '../components/PriceBook'

/**
 * /pricing — FEUS.ai platform pricing (published price book) followed by
 * FEUS Electronics Group professional-services engagements.
 */

const engagements = [
  {
    title: 'Assessment engagements',
    desc: 'Scoped assessments of database estates, data platforms, or AI-governance readiness, delivered with written findings and recommendations.',
  },
  {
    title: 'Project engagements',
    desc: 'Fixed-scope delivery projects — migrations, modernization, architecture design, and governance framework implementation.',
  },
  {
    title: 'Managed services',
    desc: 'Ongoing operational support for database and data-platform estates under a defined service agreement.',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Pricing"
        description="FEUS.ai platform plans with included model usage, Economy to Frontier model classes, add-ons and service packages, plus FEUS Electronics Group professional services."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Pricing</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            FEUS.ai plans and pricing
          </h1>
          <p className="mt-6 max-w-3xl text-gray-300 leading-relaxed">
            Platform plans include a monthly model usage allowance. FEUS Auto routes every
            request to the lowest-cost eligible model, and usage beyond your allowance is
            metered by model class.
          </p>
          <div className="mt-12">
            <PriceBook />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Professional services</h2>
          <p className="mt-3 text-gray-300">
            FEUS Electronics Group also delivers database and data-platform engagements, scoped
            and priced per engagement.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {engagements.map((e) => (
              <div key={e.title} className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white">{e.title}</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton to="/contact">Discuss an engagement</CTAButton>
            <CTAButton to="/services" variant="secondary">Our services</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
