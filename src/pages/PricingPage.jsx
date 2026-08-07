import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'

/**
 * /pricing — replaced platform pricing with a professional-services
 * engagement page. Platform adoption is scoped through a capability and
 * target qualification; no public self-service tiers are offered here.
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
        title="Engagements"
        description="FEUS Electronics Group professional-services engagements are scoped and priced individually. FEUS.ai adoption is capability and target specific; public self-service pricing is not offered."
        noindex
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Engagements</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Working with FEUS Electronics Group
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Our professional services are scoped and priced per engagement. The
            FEUS.ai core is considered for controlled enterprise adoption through
            capability, target, governance, and support qualification. Public
            self-service plans and blanket platform licensing terms are not offered
            on this page.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
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
