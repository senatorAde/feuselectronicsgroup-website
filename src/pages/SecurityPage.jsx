import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'

/**
 * /security — responsible disclosure.
 *
 * Previously the site said a disclosure process "is being completed", which
 * left a researcher with no route at all. A monitored mailbox and an honest
 * statement about what we do and do not commit to is more useful than a
 * polished programme that does not exist yet. Nothing here promises a
 * response time, a bounty, or a legal safe harbour we have not agreed.
 */
export default function SecurityPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Security & Responsible Disclosure"
        description="How to report a security issue in the FEUS Electronics Group website or the FEUS.ai runtime, what we ask you not to do, and what we commit to in return."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Security</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">
            Reporting a security issue
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed">
            If you believe you have found a vulnerability in this website or in the
            FEUS.ai runtime, we want to hear about it, and we would rather hear about
            it early than completely.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">How to reach us</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Email{' '}
                <a
                  href="mailto:info@feuselectronicsgroup.com?subject=Security%20report"
                  className="text-accent-300 underline underline-offset-2"
                >
                  info@feuselectronicsgroup.com
                </a>{' '}
                with <span className="font-mono">Security report</span> in the subject
                line, or use the{' '}
                <Link to="/contact?type=security#contact-form" className="text-accent-300 underline underline-offset-2">
                  contact form
                </Link>{' '}
                with Governance &amp; Security preselected.
              </p>
              <p className="text-white font-medium">
                Please send only what we need to reproduce the issue.
              </p>
              <p>
                Send the affected URL or endpoint, the steps to reproduce, and what you
                observed. Do not send exploit payloads that damage data, and do not send
                any personal data, credentials, or customer records you encountered.
              </p>
              <p>
                This mailbox is not end-to-end encrypted. If a report cannot safely be
                described without sensitive detail, tell us that much and we will agree
                a secure channel with you before you send it.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What we ask</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-2 list-disc pl-5">
                <li>Give us a reasonable opportunity to fix the issue before disclosing it publicly.</li>
                <li>Do not access, modify, or delete data that is not yours.</li>
                <li>Do not run denial of service, spam, or social engineering tests against us, our staff, or our customers.</li>
                <li>Do not use an automated scanner against the authenticated runtime; tell us what you intend to test and we will arrange it.</li>
                <li>Stay within the law.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What we commit to</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                We will acknowledge your report, tell you whether we are treating it as
                a security issue, and let you know when it is resolved.
              </p>
              <p className="text-white font-medium">
                We are not publishing a response time, a severity scale, or a bounty.
              </p>
              <p>
                A formal vulnerability management programme with a published service
                level is not yet in place, and stating one we do not operate would be
                the wrong way to begin a security relationship. This page will be
                updated when that programme exists, and it will be dated when it is.
              </p>
              <p>
                We are happy to credit you when we publish a fix, if you would like us
                to.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Scope</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                In scope: feuselectronicsgroup.com, its contact endpoint, and the
                FEUS.ai runtime at app.feuselectronicsgroup.com.
              </p>
              <p>
                Out of scope: the infrastructure of our providers, including Vercel,
                Resend, and Microsoft Azure. Please report those to the provider
                directly.
              </p>
              <p>
                Our published security posture, including the controls that have not
                met their threshold, is documented under{' '}
                <Link
                  to="/trust/security"
                  className="text-accent-300 underline underline-offset-2"
                >
                  security posture
                </Link>
                . A finding we have already published is still worth reporting if you
                can show it is worse than we described.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
