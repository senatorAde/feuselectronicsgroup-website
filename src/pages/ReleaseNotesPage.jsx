import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import { CURRENT_RELEASE, RELEASE_NOTES } from '../data/releaseNotes'
import CloudEvidence from '../components/CloudEvidence'

/** /release-notes — customer-facing release notes. */
export default function ReleaseNotesPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Release Notes"
        description="What is new in FEUS.ai: the governed cloud runtime in production on Microsoft Azure, the Microsoft Foundry model catalog, and the guided evaluation journey."
      />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Release notes</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            What&rsquo;s new in FEUS.ai
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {CURRENT_RELEASE.summary}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto space-y-6">
          {RELEASE_NOTES.map((release, index) => (
            <article
              key={release.id}
              className={`glass-card rounded-2xl p-6 ${index === 0 ? 'border-l-4 border-l-feus-500/70' : ''}`}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                {index === 0 && (
                  <span className="font-semibold text-feus-200 uppercase tracking-wide">Current release</span>
                )}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white">{release.title}</h2>
              <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-gray-300 leading-relaxed">
                {release.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}

          <CloudEvidence />

          <p className="text-sm text-gray-400 pt-4">
            Capability availability:{' '}
            <Link to="/status" className="text-feus-300 underline underline-offset-2">
              Service status
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
