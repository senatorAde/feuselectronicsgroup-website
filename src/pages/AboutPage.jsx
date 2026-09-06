import { Link } from 'react-router-dom'
import {
  ArrowRight, Users, Target, Heart, Shield,
  Lightbulb, Building2, Rocket, Zap
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SEO from '../components/SEO'

const values = [
  {
    icon: Shield,
    title: 'Governance First',
    desc: 'We believe AI must be auditable, policy-compliant, and safe. We build governance into the foundation of everything we deliver.',
  },
  {
    icon: Zap,
    title: 'Evidence Over Hype',
    desc: 'We make claims we can support with evidence. When a capability is preview, constrained, or not yet integrated, we say so plainly.',
  },
  {
    icon: Users,
    title: 'Practitioner-Led',
    desc: 'Our team is made up of engineers who build and operate — not generalists who delegate. Senior talent, direct access.',
  },
  {
    icon: Heart,
    title: 'Client Partnership',
    desc: 'We work as an extension of your team. We invest in understanding your business, not just your tickets.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    desc: 'We stay at the frontier of AI, data, and cloud — and bring those capabilities to our clients as fast as they mature.',
  },
  {
    icon: Target,
    title: 'Business Relevance',
    desc: 'Every engagement starts with the operating outcome and the evidence the client will use to assess progress.',
  },
]

const milestones = [
  { year: 'Foundation', title: 'Enterprise Data Roots', desc: 'Founded on deep expertise in SQL Server, data platform engineering, and enterprise database operations.' },
  { year: 'Growth', title: 'Managed Services Expansion', desc: 'Expanded into full-service managed database operations, cloud infrastructure, and data architecture.' },
  { year: 'Innovation', title: 'FEUS.ai Development', desc: 'Developed and operationally validated the FEUS.ai governed data-operations core through real FEUS engineering workflows.' },
  { year: 'Next', title: 'Grow with Evidence', desc: 'Expanding governed capabilities through controlled validation, transparent status, and environment-specific adoption.' },
]

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About FEUS"
        description="Meet FEUS Electronics Group: a practitioner-led enterprise technology company connecting data, cloud, automation, digital experience, and governed AI."
      />
      <PageHero
        label="About FEUS"
        title={<>Technology should create momentum.<br /><span className="text-feus-300">Control should make it durable.</span></>}
        subtitle="FEUS Electronics Group is a practitioner-led enterprise technology company connecting strategy, implementation, experience, and governance to create practical business value."
        backgroundImage="/brand/feus-hero-system.webp"
        imagePosition="68% center"
      />

      {/* Brand Architecture */}
      <section className="section-light py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel tone="light">One connected vision</SectionLabel>
                <h2 className="section-heading mt-5 text-ink">
                  Enterprise delivery and governed intelligence, built together.
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  <strong className="text-ink">FEUS Electronics Group</strong> is the parent enterprise technology company. It brings business strategy, engineering, digital experience, and delivery leadership into one client relationship.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  <strong className="text-feus-800">FEUS.ai</strong> is the governed AI Data Operations platform we operate and continue to expand. Its core has documented operational validation; newer agents and integrations publish their own scope and status.
                </p>
              </div>
              <div className="grid gap-6 border-l border-slate-200 pl-6 sm:pl-10">
                <AnimatedSection delay={100}>
                  <div className="border-t-2 border-feus-500 pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-feus-50">
                        <Building2 className="w-5 h-5 text-feus-800" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">FEUS Electronics Group</h3>
                        <p className="text-sm text-slate-500">Services, strategy, and delivery</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">The people, partnerships, and multidisciplinary expertise behind every engagement.</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <div className="border-t-2 border-accent-500 pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50">
                        <Rocket className="w-5 h-5 text-accent-800" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">FEUS.ai</h3>
                        <p className="text-sm text-slate-500">Governed AI Data Operations platform</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">An operationally validated core with controlled enterprise adoption defined by capability and environment.</p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      <section className="section-mist py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <SectionLabel tone="light">Our story</SectionLabel>
                <h2 className="section-heading mt-5 text-ink">Built from the realities of enterprise operations.</h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  FEUS Electronics Group was founded by <strong className="text-ink">Dr. Tolu Adeniyi</strong>, a data and AI transformation executive whose experience spans enterprise data, infrastructure, security, and technology leadership.
                </p>
                <p>
                  The same operating tension appeared repeatedly: teams needed to move faster, but fragmented systems, manual work, unclear controls, and late-stage governance made progress harder to sustain. FEUS was built to close that gap between ambition and accountable operation.
                </p>
                <p>
                  <strong className="text-ink">FEUS.ai</strong> grew from that experience. Governance, data safeguards, human decisions, and evidence are treated as operating architecture. Each capability publishes its current maturity and scope on the <Link to="/status" className="font-bold text-feus-800 underline underline-offset-2">status page</Link>.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      <section className="section-ink py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Our Journey"
              title="Building toward governed enterprise intelligence"
              subtitle="The FEUS story connects deep data-platform practice, managed operations, multidisciplinary services, and evidence-led platform development."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 100}>
                <div className="h-full border-t border-white/20 pt-6">
                  <span className="text-xs font-bold uppercase text-accent-300">{m.year}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{m.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      <section className="section-light py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Our Values"
              title="What Drives Us"
              subtitle="These are operating principles for how FEUS communicates, designs, delivers, and earns trust."
              tone="light"
            />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <div className="h-full border-t border-slate-200 pt-6">
                  <v.icon className="mb-4 h-6 w-6 text-feus-700" aria-hidden="true" />
                  <h3 className="mb-2 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      <section id="leadership" className="section-mist py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div className="overflow-hidden rounded-lg bg-ink">
                <img
                  src="/brand/founder-portrait.webp"
                  alt="Dr. Tolu Adeniyi, Founder and CEO of FEUS Electronics Group"
                  width="1000"
                  height="1200"
                  loading="lazy"
                  className="aspect-[5/6] h-full w-full object-cover"
                />
              </div>
              <div>
                <SectionLabel tone="light">Leadership</SectionLabel>
                <h2 className="section-heading mt-5 text-ink">Founder-led. Practitioner-driven.</h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  FEUS is led by a practitioner whose career has centered on building, operating, and governing enterprise technology, with experience across healthcare, financial services, aviation, telecom, and SaaS.
                </p>
                <div className="mt-8 border-t border-slate-300 pt-6">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-bold text-ink">Dr. Tolu Adeniyi</h3>
                      <p className="mt-1 text-sm font-bold text-feus-800">Founder & CEO, FEUS Electronics Group</p>
                      <p className="mt-2 text-xs text-slate-500">Ph.D. · MBA · CISSP · PMP · CDMP</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-feus-200 bg-feus-50 px-3 py-1.5 text-xs font-semibold text-feus-900">Azure Solutions Architect Expert</span>
                      <span className="inline-flex items-center rounded-full border border-feus-200 bg-feus-50 px-3 py-1.5 text-xs font-semibold text-feus-900">AWS Solutions Architect Professional</span>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-slate-600">
                    His background combines executive leadership, architecture, data operations, cybersecurity, program delivery, and organizational change. That range shapes FEUS&rsquo;s emphasis on systems that work for both the business and the people responsible for operating them.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      <section className="section-ink py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Build what your organization can trust and operate.
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Start with a focused conversation about the business outcome, the operating context, and the right path forward.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Schedule a Consultation
                </CalendlyButton>
                <CTAButton to="/feus-ai" variant="secondary">Explore FEUS.ai</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
