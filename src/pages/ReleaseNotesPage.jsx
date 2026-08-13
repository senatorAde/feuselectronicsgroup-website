import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { POSTURE_HISTORY, RELEASE_ASSESSMENT } from '../data/releaseAssessment'

/**
 * /release-notes — product-posture and exact-revision release history.
 */
export default function ReleaseNotesPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Posture History"
        description="FEUS.ai posture history: product maturity decisions and exact-revision release assessments, each retained with its governing scope."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Posture history</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            How the public posture has changed
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai records product maturity and exact-revision release decisions
            separately. {RELEASE_ASSESSMENT.supersessionRule}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto space-y-6">
          {POSTURE_HISTORY.map((entry) => (
            <article
              key={`${entry.date}-${entry.decision}`}
              className={`glass-card rounded-2xl p-6 ${entry.current ? 'border-l-4 border-l-feus-500/70' : 'opacity-80'}`}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>{entry.date}</span>
                <span className="font-mono break-all">{entry.revision}</span>
                <span>{entry.version}</span>
                {entry.current ? (
                  <span className="font-semibold text-amber-300/90 uppercase tracking-wide">
                    {entry.controllingLabel ?? 'Current'}
                  </span>
                ) : (
                  <span className="font-semibold text-gray-400 uppercase tracking-wide">
                    {entry.controllingLabel ?? 'Superseded'}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white">
                {entry.decision}
              </h2>
              <p className="mt-1 text-sm text-gray-400">{entry.authority}</p>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">{entry.scope}</p>
            </article>
          ))}

          <p className="text-sm text-gray-400 pt-4">
            Current posture detail:{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">
              Platform status
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
