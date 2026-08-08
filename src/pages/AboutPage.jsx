import { Link } from 'react-router-dom'
import {
  ArrowRight, Globe, Users, Award, Target, Heart, Shield,
  Lightbulb, Building2, Rocket, CheckCircle2, Zap, Star
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

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
    title: 'Measurable Impact',
    desc: 'Every service we deliver is tied to outcomes: reduced risk, faster operations, lower cost, better governance.',
  },
]

const milestones = [
  { year: 'Foundation', title: 'Enterprise Data Roots', desc: 'Founded on deep expertise in SQL Server, data platform engineering, and enterprise database operations.' },
  { year: 'Growth', title: 'Managed Services Expansion', desc: 'Expanded into full-service managed database operations, cloud infrastructure, and data architecture.' },
  { year: 'Innovation', title: 'FEUS.ai Development', desc: 'Developed and operationally validated the FEUS.ai governed data-operations core through real FEUS engineering workflows.' },
  { year: 'Future', title: 'Enterprise AI at Scale', desc: 'Working toward evidence-backed, governed AI operations — with production claims made only after independent verification.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title={<>Enterprise Technology Leadership.<br /><span className="gradient-text">Founder-Led. Practitioner-Driven.</span></>}
        subtitle="FEUS Electronics Group is a founder-led enterprise technology company with deep experience managing databases, data platforms, and cloud infrastructure — across healthcare, financial services, aviation, and SaaS."
      />

      {/* Brand Architecture */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel>Brand Architecture</SectionLabel>
                <h2 className="section-heading text-white">
                  Two Brands,<br />
                  <span className="gradient-text">One Mission.</span>
                </h2>
                <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                  <strong className="text-white">FEUS Electronics Group</strong> is the parent enterprise technology company. We are the business entity, the leadership team, and the strategic vision behind everything we build and deliver.
                </p>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  <strong className="text-feus-300">FEUS.ai</strong> is the governed AI Data Operations platform we operate and continue to expand. Its core has documented operational validation; newer agents and integrations carry their own preview status and restrictions.
                </p>
              </div>
              <div className="grid gap-4">
                <AnimatedSection delay={100}>
                  <div className="glass-card p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-feus-500 to-feus-700 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">FEUS Electronics Group</h4>
                        <p className="text-sm text-gray-500">Parent Company</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Enterprise technology company. Business strategy, leadership, and organizational governance.</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <div className="glass-card p-8 border-feus-500/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-feus-400 to-accent-500 flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold gradient-text">FEUS.ai</h4>
                        <p className="text-sm text-gray-500">Platform · Operationally validated core</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">A governed AI Data Operations platform available for controlled enterprise adoption by capability scope.</p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* Our Story */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="section-heading text-white">
                From Enterprise Data Ops to<br />
                <span className="gradient-text">AI-Powered Operations</span>
              </h2>
              <div className="mt-8 space-y-6 text-gray-400 leading-relaxed">
                <p>
                  FEUS Electronics Group was founded by <strong className="text-white">Dr. Tolu Adeniyi</strong> — a data and AI transformation executive whose leadership experience spans enterprise data and technology roles, including Chief Data Officer at HyCite Enterprises, Chief Technology Officer at Fortified Data, and Director of IT Infrastructure at DocuTAP/Experity. Details of engagement history are available on request.
                </p>
                <p>
                  The pattern was the same everywhere: talented engineers drowning in manual operations, governance bolted on after incidents, AI tools deployed without guardrails, and executives waiting weeks for audit evidence that should be automatic. That’s the problem FEUS.ai was built to solve.
                </p>
                <p>
                  <strong className="text-white">FEUS.ai</strong> is the result of that operational experience — a governed data-operations platform designed so that governance, PII inspection, and auditable decision-making are the architecture itself, not a feature roadmap. Its core has documented operational validation, its assessed vNext revision has extensive automated evidence, and every expansion capability publishes its current status and limitations on our <Link to="/status" className="text-feus-300 underline underline-offset-2">status page</Link>.
                </p>
                <p>
                  Dr. Adeniyi is an <strong className="text-white">Azure Solutions Architect Expert</strong>, AWS Solutions Architect Professional, CISSP, PMP, and CDMP. He holds a Ph.D. in Leadership & Business, an MBA from Coventry University, and a B.Eng. in Electrical & Electronics Engineering. He has operated in healthcare, financial services, aviation, telecom, and direct-to-consumer SaaS.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* Journey */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Our Journey"
              title="Building Toward Enterprise Intelligence"
              subtitle="From deep technical roots to a comprehensive AI-powered managed services practice."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 100}>
                <div className="glass-card p-8 h-full relative">
                  <span className="text-sm font-bold text-feus-400 uppercase tracking-wider">{m.year}</span>
                  <h4 className="mt-3 text-lg font-semibold text-white">{m.title}</h4>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* Values */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Our Values"
              title="What Drives Us"
              subtitle="These aren't aspirational statements on a wall — they're operational principles that shape every engagement."
            />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <div className="glass-card p-8 h-full">
                  <v.icon className="w-6 h-6 text-feus-400 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">{v.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* Leadership */}
      <section id="leadership" className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <SectionLabel>Leadership</SectionLabel>
              <h2 className="section-heading text-white">Founder-Led. Practitioner-Driven.</h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                FEUS Electronics Group is led by a practitioner who has spent their career building and operating enterprise data platforms — not advising from the sidelines.
              </p>
              <div className="mt-12 glass-card p-8 text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  <img 
                    src="/dr-tolu-adeniyi.jpg" 
                    alt="Dr. Tolu Adeniyi — Founder & CEO, FEUS Electronics Group" 
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg shadow-feus-500/20 flex-shrink-0"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-bold text-white">Dr. Tolu Adeniyi</h4>
                    <p className="text-sm text-feus-400">Founder & CEO, FEUS Electronics Group</p>
                    <p className="text-xs text-gray-500 mt-1">Ph.D. · MBA · CISSP · PMP · CDMP</p>
                    <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-feus-500/10 border border-feus-500/20 text-xs text-feus-300">Azure Solutions Architect Expert</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-feus-500/10 border border-feus-500/20 text-xs text-feus-300">AWS SA Professional</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Dr. Adeniyi is a data and AI transformation executive whose experience spans healthcare, financial services, aviation, telecom, and SaaS. His leadership roles include Chief Data Officer (HyCite Enterprises), Chief Technology Officer (Fortified Data), and Director of Infrastructure (DocuTAP/Experity). He is an Azure Solutions Architect Expert and an AWS Solutions Architect Professional. Details of engagement history are available on request.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />

      {/* CTA */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Want to Talk Through Your Data Operations?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                30 minutes with a practitioner — a services conversation or an architecture briefing on FEUS.ai.
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
