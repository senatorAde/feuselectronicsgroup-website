import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Star } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import { SectionLabel } from './ui'
import { CalendlyButton } from './CalendlyEmbed'

/**
 * LeaveReview — Post-demo review capture CTA.
 *
 * Provides two clear actions:
 *   1. Navigate to /contact?type=review to leave feedback
 *   2. Book another consultation via Calendly
 *
 * Designed for placement after demo sections, CTA areas,
 * and post-consultation confirmation zones.
 *
 * @param {'full'|'compact'|'inline'} variant - Display variant
 * @param {string} className - Additional container classes
 */
export default function LeaveReview({ variant = 'full', className = '' }) {
  if (variant === 'inline') {
    return <InlineReviewCTA className={className} />
  }

  if (variant === 'compact') {
    return <CompactReviewCTA className={className} />
  }

  return (
    <section className={`py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="glass-card-static p-8 md:p-12 border-feus-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-[100px]" />
            <div className="relative grid md:grid-cols-2 gap-10 items-center">

              {/* Left: Messaging */}
              <div>
                <SectionLabel>After Your Demo</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Had a Demo?<br />
                  <span className="gradient-text">Share Your Experience</span>
                </h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Your feedback helps us improve — and helps other teams evaluate whether governed AI operations are right for them. Takes less than two minutes.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span>from enterprise teams like yours</span>
                </div>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col gap-4">
                <Link
                  to="/contact?type=review"
                  className="btn-accent group text-center justify-center"
                >
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Share Your Experience
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <CalendlyButton className="btn-secondary group text-center justify-center" icon={ArrowRight}>
                  Book Another Session
                </CalendlyButton>
                <p className="text-xs text-gray-600 text-center mt-1">
                  Your review is submitted through our secure contact form. We never share your information.
                </p>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/**
 * Compact variant — single-line CTA for tight spaces.
 */
function CompactReviewCTA({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 py-6 ${className}`}>
      <p className="text-sm text-gray-400">
        Had a demo? We'd love your feedback.
      </p>
      <Link
        to="/contact?type=review"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium hover:bg-accent-500/20 hover:border-accent-500/40 transition-all duration-200"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Leave a Review
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

/**
 * Inline variant — subtle text link for embedding in content.
 */
function InlineReviewCTA({ className = '' }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      Had a demo?{' '}
      <Link
        to="/contact?type=review"
        className="text-feus-400 hover:text-feus-300 font-medium transition-colors"
      >
        Share your experience →
      </Link>
    </p>
  )
}
