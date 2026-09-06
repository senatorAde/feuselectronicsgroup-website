import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function SectionLabel({ children, tone = 'dark', className = '' }) {
  return (
    <div className={`${tone === 'light' ? 'eyebrow-light' : 'eyebrow-dark'} ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ label, title, subtitle, center = true, tone = 'dark' }) {
  const isLight = tone === 'light'
  return (
    <div className={`${center ? 'text-center' : ''} mb-12 md:mb-16`}>
      {label && <SectionLabel tone={tone}>{label}</SectionLabel>}
      <h2 className={`section-heading mt-5 text-balance ${isLight ? 'text-ink' : 'text-white'}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subheading mt-5 text-pretty ${isLight ? 'text-slate-600' : 'text-slate-300'} ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function CTAButton({ to, children, variant = 'primary', className = '' }) {
  const styles = {
    primary: 'btn-primary',
    accent: 'btn-accent',
    secondary: 'btn-secondary',
    dark: 'btn-dark',
    outline: 'btn-outline-dark',
  }
  const base = styles[variant] || styles.primary
  return (
    <Link to={to} className={`${base} group ${className}`}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}

export function StatCard({ value, label, detail, tone = 'dark' }) {
  const isLight = tone === 'light'
  return (
    <div className={`border-t-2 pt-5 ${isLight ? 'border-feus-500/25' : 'border-feus-300/30'}`}>
      <div className={`font-display text-3xl font-bold md:text-4xl ${isLight ? 'text-ink' : 'text-white'}`}>{value}</div>
      <div className={`mt-2 text-sm font-bold ${isLight ? 'text-slate-700' : 'text-feus-100'}`}>{label}</div>
      {detail && <p className={`mt-2 text-xs leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{detail}</p>}
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

export function PageHero({ label, title, subtitle, children, backgroundImage, imagePosition = 'center' }) {
  return (
    <section className="page-hero-field relative min-h-[540px] overflow-hidden pt-32 pb-20 text-white">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            width="1600"
            height="1040"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/35" aria-hidden="true" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 sm:text-xl text-pretty">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 glow-line" aria-hidden="true" />
    </section>
  )
}
