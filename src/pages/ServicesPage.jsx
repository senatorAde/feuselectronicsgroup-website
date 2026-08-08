import {
  Database, Workflow, Cloud, Brain, BarChart3, Zap,
  CheckCircle2, ArrowRight, Server, Shield, Lock, Cpu,
  MonitorDot, FileCode2, Cog, GitBranch, Activity, LineChart
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

const serviceCategories = [
  {
    id: 'database',
    icon: Database,
    color: 'from-blue-500 to-blue-700',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    title: 'Database Operations',
    tagline: 'Practitioner-Led DBA Services',
    description: 'Enterprise database operations delivered by experienced engineers — continuous monitoring, performance optimization, governance enforcement, and proactive maintenance across SQL Server, Azure SQL, and modern data platforms.',
    offerings: [
      'Database health monitoring & intelligent alerting',
      'Query performance analysis & optimization',
      'Automated index management & maintenance',
      'Backup, recovery & disaster recovery operations',
      'Security auditing & compliance reporting',
      'Capacity planning & growth forecasting',
      'Migration planning & execution',
      'High availability & failover management',
    ],
  },
  {
    id: 'architecture',
    icon: Workflow,
    color: 'from-violet-500 to-violet-700',
    iconColor: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    title: 'Data Architecture & Engineering',
    tagline: 'Modern Data Platforms Built to Scale',
    description: 'Design and implementation of modern data architectures — from lakehouse patterns and data mesh to real-time pipelines and governed data platforms that serve both operational and analytical workloads.',
    offerings: [
      'Data platform strategy & architecture',
      'Lakehouse & data mesh design',
      'ETL/ELT pipeline development & automation',
      'Data governance framework implementation',
      'Data quality validation & monitoring',
      'Master data management',
      'Schema evolution & lifecycle management',
      'Data catalog & lineage implementation',
    ],
  },
  {
    id: 'cloud',
    icon: Cloud,
    color: 'from-cyan-500 to-cyan-700',
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    title: 'Cloud & Platform Operations',
    tagline: 'Infrastructure That Runs Itself',
    description: 'End-to-end cloud and platform managed services — infrastructure provisioning, security configuration, cost optimization, monitoring, and managed operational support across Azure and hybrid environments, with coverage defined in each customer agreement.',
    offerings: [
      'Azure infrastructure design & deployment',
      'Infrastructure as Code (Bicep, Terraform)',
      'Cost governance & optimization',
      'Security posture management',
      'Monitoring, alerting & incident response',
      'Hybrid & multi-cloud architecture',
      'Container & Kubernetes operations',
      'Network design & management',
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    color: 'from-emerald-500 to-emerald-700',
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    title: 'Enterprise AI Solutions',
    tagline: 'Governance Before AI Touches Data',
    description: 'AI enablement consulting for the enterprise — readiness assessment, governance framework design, PII-protection guardrails, and implementation support for AI agents, RAG systems, and vendor assistant tooling on your stack.',
    offerings: [
      'AI strategy & readiness assessment',
      'AI governance framework design',
      'PII detection & guardrail design',
      'Custom AI agent development',
      'RAG system design & implementation',
      'Synthetic data generation for dev/test',
      'Vendor AI assistant rollout support',
      'Model evaluation & monitoring design',
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    color: 'from-amber-500 to-amber-700',
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    title: 'Analytics & Business Intelligence',
    tagline: 'Intelligence That Drives Decisions',
    description: 'Operational and executive analytics built on clean, governed data — from real-time dashboards and KPI tracking to predictive insights and automated reporting.',
    offerings: [
      'Executive dashboard design & development',
      'Operational KPI monitoring',
      'Self-service BI enablement',
      'Predictive analytics & forecasting',
      'Data visualization & storytelling',
      'Automated report generation',
      'Real-time streaming analytics',
      'Business context translation',
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    color: 'from-rose-500 to-rose-700',
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    title: 'Automation & Integration',
    tagline: 'Less Manual. More Governed.',
    description: 'Intelligent workflow automation, approval orchestration, and system integration — reducing manual effort, enforcing governance, and connecting your enterprise technology ecosystem.',
    offerings: [
      'Workflow automation design & implementation',
      'Approval chain orchestration',
      'API integration & gateway management',
      'Event-driven architecture',
      'Scheduled task management',
      'DevOps pipeline automation',
      'Notification & escalation systems',
      'Process mining & optimization',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Services"
        title={<>Enterprise Managed Services,<br /><span className="gradient-text">Delivered by Practitioners</span></>}
        subtitle="Six core service domains covering enterprise data, platform, and AI operations — delivered by experienced engineers with governance built in. These practitioner-led services are scoped separately from FEUS.ai software adoption."
      >
        <CalendlyButton className="btn-accent group" icon={ArrowRight}>
          Discuss Your Needs
        </CalendlyButton>
      </PageHero>

      {/* Service Categories */}
      {serviceCategories.map((svc, i) => (
        <div key={svc.id}>
          {i > 0 && <GlowDivider />}
          <section id={svc.id} className={i % 2 === 0 ? 'section-gradient py-24' : 'section-dark py-24'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center`}>
                        <svc.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
                        <p className="text-sm text-feus-400">{svc.tagline}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{svc.description}</p>
                    <div className="mt-8">
                      <CTAButton to="/contact" variant="secondary">
                        Learn More
                      </CTAButton>
                    </div>
                  </div>

                  <div className="glass-card-static p-6">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">What's Included</h4>
                    <div className="space-y-3">
                      {svc.offerings.map((offering) => (
                        <div key={offering} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{offering}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </div>
      ))}

      <GlowDivider />

      {/* Engagement Models */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Engagement Models"
              title="Flexible Delivery, Consistent Quality"
              subtitle="Whether you need a full managed operations engagement or targeted project support, we adapt to your needs."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Managed Operations',
                desc: 'Ongoing managed services with dedicated teams and continuous optimization. Coverage hours and service levels are defined in each executed customer agreement.',
                features: ['Dedicated operations team', 'Service levels defined per agreement', 'Continuous monitoring', 'Regular reporting'],
              },
              {
                title: 'Project Delivery',
                desc: 'Scoped, outcome-based projects with clear milestones — from architecture design to migration execution.',
                features: ['Fixed-scope delivery', 'Clear milestones', 'Knowledge transfer', 'Post-project support'],
              },
              {
                title: 'Advisory & Assessment',
                desc: 'Expert assessment, strategy development, and architectural guidance from senior practitioners.',
                features: ['Architecture review', 'Governance assessment', 'Technology roadmap', 'Risk analysis'],
              },
            ].map((model, i) => (
              <AnimatedSection key={model.title} delay={i * 100}>
                <div className="glass-card p-8 h-full">
                  <h3 className="text-xl font-bold text-white mb-3">{model.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{model.desc}</p>
                  <div className="space-y-2">
                    {model.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-feus-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* CTA */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Need a specific capability?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Tell us what you're trying to solve. We'll map the right services and engagement model.
              </p>
              <div className="mt-8">
                <CTAButton to="/contact" variant="primary">Start a Conversation</CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
