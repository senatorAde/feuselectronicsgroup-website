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
    desc: 'We make claims we can support with evidence. When something is pre-release or unproven, we say so plainly — in our engagements and about our own platform.',
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
  { year: 'Innovation', title: 'FEUS.ai Development', desc: 'Began developing FEUS.ai — a governed data-operations platform, currently pre-release and under controlled evaluation.' },
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
                  <strong className="text-feus-300">FEUS.ai</strong> is the platform we are building — a governed data-operations architecture, currently pre-release and under controlled evaluation. It is not yet approved for production deployment, and we publish its status honestly.
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
                        <p className="text-sm text-gray-500">Platform · Pre-release</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">A governed data-operations platform under controlled evaluation. Not approved for production deployment.</p>
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
                  FEUS Electronics Group was founded by <strong className="text-white">Dr. Tolu Adeniyi</strong> — a data and AI transformation executive with 15+ years of experience modernizing enterprise technology ecosystems. Before starting FEUS, Dr. Adeniyi served as Chief Data Officer at HyCite Enterprises (leading a 60-person org with a $3.2M budget), Chief Technology Officer at Fortified Data (managing 3,150+ SQL instances across 32+ clients), and Director of IT Infrastructure at DocuTAP/Experity.
                </p>
                <p>
                  The pattern was the same everywhere: talented engineers drowning in manual operations, governance bolted on after incidents, AI tools deployed without guardrails, and executives waiting weeks for audit evidence that should be automatic. That’s the problem FEUS.ai was built to solve.
                </p>
                <p>
                  <strong className="text-white">FEUS.ai</strong> is the result of that operational experience — a governed data-operations platform designed so that governance, PII inspection, and auditable decision-making are the architecture itself, not a feature roadmap. The platform is pre-release: its implementation properties are validated by automated tests in LOCAL and test environments, and we publish its current status — including what does not work yet — on our <Link to="/status" className="text-feus-300 underline underline-offset-2">status page</Link>.
                </p>
                <p>
                  Dr. Adeniyi is a <strong className="text-white">Microsoft MVP for Data Platform & AI (2024/2025)</strong>, Azure Solutions Architect Expert, AWS Solutions Architect Professional, CISSP, PMP, and CDMP. He holds a Ph.D. in Leadership & Business, an MBA from Coventry University, and a B.Eng. in Electrical & Electronics Engineering. He has operated in healthcare (HIPAA), financial services, aviation (Emirates Group), telecom (Alcatel-Lucent), and direct-to-consumer SaaS.
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
                    <p className="text-xs text-gray-500 mt-1">Ph.D. · MBA · CISSP · PMP · CDMP · Microsoft MVP 2024/2025</p>
                    <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-feus-500/10 border border-feus-500/20 text-xs text-feus-300">Azure Solutions Architect Expert</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-feus-500/10 border border-feus-500/20 text-xs text-feus-300">AWS SA Professional</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-xs text-accent-300">Microsoft MVP</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Dr. Adeniyi is a data and AI transformation executive with 15+ years of experience across healthcare, financial services, aviation, telecom, and SaaS. He has served as Chief Data Officer (HyCite, 60-person org, $3.2M budget), Chief Technology Officer (Fortified Data: 3,150+ SQL instances), and Director of Infrastructure (DocuTAP/Experity). He is an Azure Solutions Architect Expert, AWS Solutions Architect Professional, and a recognized Microsoft MVP for Data Platform & AI.
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-lg font-bold gradient-text">3,150+</div>
                    <div className="text-xs text-gray-500 mt-1">SQL Instances</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-lg font-bold gradient-text">60</div>
                    <div className="text-xs text-gray-500 mt-1">Team Size Led</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-lg font-bold gradient-text">$3.2M</div>
                    <div className="text-xs text-gray-500 mt-1">Budget Owned</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-lg font-bold gradient-text">MVP</div>
                    <div className="text-xs text-gray-500 mt-1">Microsoft 2024/25</div>
                  </div>
                </div>
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
