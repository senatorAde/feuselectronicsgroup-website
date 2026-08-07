import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { POSTURE_HISTORY, POSTURE } from '../data/publicStatus'

/**
 * /release-notes — public posture history. Shows which assessment currently
 * controls the public posture and what it superseded.
 */
export default function ReleaseNotesPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Posture History"
        description="FEUS.ai public posture history: which independent assessment currently controls the public status and what it superseded."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Posture history</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            How the public posture has changed
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            FEUS.ai&rsquo;s public status is controlled by exact-revision independent
            assessments. {POSTURE.supersessionRule}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto space-y-6">
          {POSTURE_HISTORY.map((entry) => (
            <article
              key={entry.date}
              className={`glass-card rounded-2xl p-6 ${entry.current ? 'border-l-4 border-l-rose-500' : 'opacity-80'}`}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>{entry.date}</span>
                <span className="font-mono break-all">{entry.revision}</span>
                <span>{entry.version}</span>
                {entry.current ? (
                  <span className="font-semibold text-amber-300/90 uppercase tracking-wide">Controlling</span>
                ) : (
                  <span className="font-semibold text-gray-400 uppercase tracking-wide">Superseded</span>
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
