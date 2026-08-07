import { Link } from 'react-router-dom'
import {
  ArrowRight, Calendar, Clock, User, Tag,
  BookOpen, TrendingUp, Shield, Brain, Database
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionHeader, SectionLabel, CTAButton, GlowDivider } from '../components/ui'

const articles = [
  {
    category: 'Enterprise AI',
    icon: Brain,
    title: 'Why Governance Must Come Before AI Enablement',
    excerpt: 'Most enterprises rush to deploy AI without governance foundations. Here\'s why that approach creates more risk than value — and what to do instead.',
    date: 'March 2026',
    readTime: '8 min read',
    featured: true,
  },
  {
    category: 'Database Operations',
    icon: Database,
    title: 'The Case for AI-Augmented DBA Services',
    excerpt: 'Enterprise database operations haven\'t fundamentally changed in decades. AI changes that — but only when combined with governance, policy enforcement, and human oversight.',
    date: 'February 2026',
    readTime: '6 min read',
    featured: true,
  },
  {
    category: 'Security & Governance',
    icon: Shield,
    title: 'PII Protection in the Age of AI Assistants',
    excerpt: 'When AI assistants query enterprise databases, PII exposure becomes a real risk. Here\'s how we think about designing guardrails that protect sensitive data without limiting utility.',
    date: 'February 2026',
    readTime: '7 min read',
    featured: false,
  },
  {
    category: 'Data Architecture',
    icon: TrendingUp,
    title: 'Building Data Platforms That Serve Both Operations and Analytics',
    excerpt: 'The divide between operational and analytical data is a legacy constraint. Modern architectures — lakehouses, data mesh, event-driven patterns — dissolve it.',
    date: 'January 2026',
    readTime: '10 min read',
    featured: false,
  },
  {
    category: 'Enterprise AI',
    icon: Brain,
    title: 'Synthetic Data: A Practical Guide for Enterprise Teams',
    excerpt: 'Synthetic data enables safe AI development and testing without exposing real customer information. Here\'s a practical approach to governed synthetic datasets.',
    date: 'January 2026',
    readTime: '9 min read',
    featured: false,
  },
  {
    category: 'Cloud Operations',
    icon: Database,
    title: 'Cost Governance in Azure: Beyond the Basics',
    excerpt: 'Azure cost management tools are a starting point, but real cost governance requires policy enforcement, tagging discipline, and automated optimization workflows.',
    date: 'December 2025',
    readTime: '7 min read',
    featured: false,
  },
]

const categories = ['All', 'Enterprise AI', 'Database Operations', 'Security & Governance', 'Data Architecture', 'Cloud Operations']

export default function InsightsPage() {
  const featured = articles.filter(a => a.featured)
  const regular = articles.filter(a => !a.featured)

  return (
    <>
      <PageHero
        label="Insights & Perspectives"
        title={<>Thinking from the<br /><span className="gradient-text">Operations Floor</span></>}
        subtitle="Perspectives on enterprise AI, data operations, governance, and modernization — from practitioners who build and operate these systems every day."
      />

      {/* Featured Articles */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel>Featured</SectionLabel>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {featured.map((article, i) => (
              <AnimatedSection key={article.title} delay={i * 100}>
                <article className="glass-card p-8 h-full group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-feus-500/10 flex items-center justify-center">
                      <article.icon className="w-4 h-4 text-feus-400" />
                    </div>
                    <span className="text-xs font-semibold text-feus-400 uppercase tracking-wider">{article.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-feus-300 transition-colors mb-3">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-feus-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* All Articles */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="All Insights"
              title="Latest Perspectives"
              subtitle="Deep dives into the technologies, strategies, and practices that power modern enterprise operations."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((article, i) => (
              <AnimatedSection key={article.title} delay={i * 80}>
                <article className="glass-card p-6 h-full group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <article.icon className="w-4 h-4 text-feus-400" />
                    <span className="text-xs font-semibold text-feus-400 uppercase tracking-wider">{article.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-feus-300 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* Newsletter CTA */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-8 md:p-12 text-center max-w-2xl mx-auto">
              <BookOpen className="w-8 h-8 text-feus-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Stay Informed</h3>
              <p className="text-gray-400 mb-6">
                Get occasional insights on enterprise AI, data operations, and governance delivered to your inbox. No spam, no fluff — just practical perspectives from practitioners.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
                />
                <button className="btn-primary whitespace-nowrap !px-6">
                  Subscribe
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
