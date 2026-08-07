import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel, CTAButton } from '../components/ui'
import { FAQ_ITEMS, POSTURE } from '../data/publicStatus'

/**
 * /faq — platform FAQ (Trust Center content plan §31).
 * Questions and answers are approved text; do not reword answers.
 */

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white font-medium hover:bg-white/[0.03] transition-colors"
        >
          {q}
          <ChevronDown
            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div id={panelId} hidden={!open} className="px-5 pb-4 text-sm text-gray-300 leading-relaxed">
        {a}
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Platform FAQ"
        description="Direct answers about FEUS.ai: production readiness, certifications, integrations, audit trail, PII protection, ROI figures, and authorized use."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Platform FAQ</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Direct answers about FEUS.ai
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            These are the questions evaluators ask most, answered against the
            independently assessed posture of revision{' '}
            <span className="font-mono text-sm break-all">{POSTURE.certifiedRevision}</span>.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
          <div className="pt-8 flex flex-wrap gap-4">
            <CTAButton to="/status">Platform status</CTAButton>
            <CTAButton to="/contact" variant="secondary">Ask a question</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
