import { ArrowRight, ArrowUpRight, Boxes, Package } from 'lucide-react'

/**
 * Twin cards rendered side-by-side on the listing detail page:
 *   • "Buy Individually"  — links to the gallery / individual inquiry
 *   • "Buy Together As-Is" — links to bundle inquiry
 *
 * Both cards share styling but use different accents to make the
 * two paths visually distinct. When `newTab` is true, the CTA
 * opens in a new browser tab (handy when the form lives on a
 * separate page so the buyer doesn't lose their place).
 */
export default function SaleOptionCard({
  variant = 'individual', // 'individual' | 'asIs'
  title,
  description,
  price,
  ctaLabel,
  ctaHref,
  newTab = false,
}) {
  const isAsIs = variant === 'asIs'
  const Icon = isAsIs ? Boxes : Package
  const iconBg = isAsIs ? 'bg-accent-500/15 text-accent-300' : 'bg-feus-500/15 text-feus-300'
  const ringHover = isAsIs ? 'hover:border-accent-500/30' : 'hover:border-feus-500/30'

  return (
    <div
      className={`glass-card-static p-7 md:p-8 h-full flex flex-col transition-all duration-500 border border-white/[0.08] ${ringHover}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-gray-400 leading-relaxed flex-1">{description}</p>

      {price && (
        <div className="mt-5 pt-5 border-t border-white/[0.06]">
          <div className="text-[11px] uppercase tracking-wider text-gray-500">
            {isAsIs ? 'Bundle pricing' : 'Item pricing'}
          </div>
          <div className="mt-1 text-lg font-semibold text-white">{price}</div>
        </div>
      )}

      <a
        href={ctaHref}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        className={`mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg px-5 py-2.5 transition-all duration-300 group ${
          isAsIs
            ? 'bg-accent-600 text-white hover:bg-accent-500 shadow-lg shadow-accent-600/25'
            : 'bg-feus-600 text-white hover:bg-feus-500 shadow-lg shadow-feus-600/25'
        }`}
      >
        {ctaLabel}
        {newTab ? (
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        ) : (
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </a>
    </div>
  )
}
