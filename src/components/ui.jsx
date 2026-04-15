import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-feus-500/10 border border-feus-500/20 text-feus-400 text-sm font-medium tracking-wide mb-6">
      {children}
    </div>
  )
}

export function SectionHeader({ label, title, subtitle, center = true }) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-16`}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="section-heading text-white">{title}</h2>
      {subtitle && (
        <p className={`section-subheading mt-4 ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function CTAButton({ to, children, variant = 'primary', className = '' }) {
  const base = variant === 'primary' ? 'btn-primary' : variant === 'accent' ? 'btn-accent' : 'btn-secondary'
  return (
    <Link to={to} className={`${base} group ${className}`}>
      {children}
      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

export function StatCard({ value, label }) {
  return (
    <div className="text-center border-t-2 border-feus-500/20 pt-5">
      <div className="text-3xl md:text-4xl font-bold gradient-text">{value}</div>
      <div className="mt-1 text-sm text-gray-300 font-medium">{label}</div>
    </div>
  )
}

export function ProofPoint({ title, description }) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
      <div className="w-1 rounded-full bg-gradient-to-b from-accent-400 to-accent-600 flex-shrink-0" />
      <div>
        <h4 className="text-base font-semibold text-white mb-1.5">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function ProblemCard({ icon: Icon, title, description }) {
  return (
    <div className="glass-card p-8 h-full group">
      <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-rose-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}

export function GlowDivider() {
  return <div className="glow-line my-0" />
}

export function PageHero({ label, title, subtitle, children, backgroundImage }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      {backgroundImage && (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        </div>
      )}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-feus-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-xl text-gray-400 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  )
}
