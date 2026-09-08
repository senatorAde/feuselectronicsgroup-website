import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'

/**
 * /legal/terms — published DRAFT terms of use.
 *
 * Published in draft for the same reason as the privacy notice: a visitor
 * deciding whether to rely on anything here needs to know what is and is not
 * promised, and "terms are in legal review" answers none of that. The
 * disclaimers below restate positions already published in the Trust Center
 * rather than introducing new ones.
 */
export default function TermsPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Terms of Use (Draft)"
        description="Draft terms of use for feuselectronicsgroup.com, including what the published evidence does and does not commit FEUS Electronics Group to."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">Terms of use</h1>
          <div className="mt-6 glass-card rounded-2xl p-6 border-l-4 border-amber-400 text-sm leading-relaxed text-gray-300">
            <p className="text-white font-medium">This is a published draft, not a binding agreement.</p>
            <p className="mt-3">
              It has not been approved by legal counsel, it creates no contract, and
              it does not override any signed agreement between you and FEUS
              Electronics Group. It is published so that the limits described here
              are visible rather than implied.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What these terms cover</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                These terms cover your use of the public website at
                feuselectronicsgroup.com and the material published on it.
              </p>
              <p>
                Access to the FEUS.ai governed runtime at
                app.feuselectronicsgroup.com is separate. It is available only to
                people your organisation has authorised, and its use is governed by
                the agreement covering your deployment.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Using this site</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                You may read, quote, and share this material for the purpose of
                evaluating FEUS Electronics Group, with attribution.
              </p>
              <p>
                Please do not attempt to gain unauthorised access to the site or the
                runtime, disrupt their availability, or use them to send unlawful,
                misleading, or abusive content. If you are testing our security,
                read{' '}
                <Link to="/security" className="text-accent-300 underline underline-offset-2">
                  security and responsible disclosure
                </Link>{' '}
                first.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What the published evidence means</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Capability status, test results, release decisions, and deployment
                evidence on this site describe named revisions, environments, and
                configurations at the dates stated. They are engineering evidence.
              </p>
              <p>
                They are not a warranty, a certification, a service level commitment,
                or a statement that any capability will behave the same way in your
                environment. FEUS.ai holds no third-party certification, as set out
                under{' '}
                <Link to="/trust/compliance" className="text-accent-300 underline underline-offset-2">
                  compliance posture
                </Link>
                .
              </p>
              <p>
                Cost figures shown in the product are estimated from a rate card
                unless they are explicitly labelled as billed. An estimate is not an
                invoice.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">No commitment from this site alone</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Nothing on this site is an offer, a quotation, or a commitment to
                supply. Scope, price, availability, and support are agreed in writing
                for each engagement.
              </p>
              <p>
                We may change this material as the product changes. Where a statement
                is superseded we date the new one rather than quietly rewriting the
                old one, so that a previously published position remains checkable.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Content and marks</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                The FEUS name, the FEUS.ai name, and the material on this site belong
                to FEUS Electronics Group unless stated otherwise. Third-party names,
                including Microsoft, Azure, and Oracle, belong to their respective
                owners and are used only to describe interoperability.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Questions about these terms:{' '}
                <a
                  href="mailto:info@feuselectronicsgroup.com"
                  className="text-accent-300 underline underline-offset-2"
                >
                  info@feuselectronicsgroup.com
                </a>
                .
              </p>
              <p className="text-gray-400">
                Draft published 2026-09-07. See also the draft{' '}
                <Link to="/legal/privacy" className="text-accent-300 underline underline-offset-2">
                  privacy notice
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
