import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'

/**
 * /legal/privacy — published DRAFT privacy notice.
 *
 * This is published deliberately, and deliberately labelled a draft. The
 * previous position -- "a privacy policy is in legal review and will be
 * published here" -- told visitors nothing about what actually happens to the
 * details they type into the contact form, which is the only question a
 * privacy notice needs to answer before someone decides to use it.
 *
 * Every statement below describes behaviour that is true of the deployed site
 * today. Nothing here is aspirational, and nothing describes a control that is
 * not in place.
 */
export default function PrivacyPage() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <SEO
        title="Privacy Notice (Draft)"
        description="Draft privacy notice for feuselectronicsgroup.com: what FEUS Electronics Group collects, why, who processes it, and how to ask for it to be deleted."
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="section-heading text-4xl sm:text-5xl mt-4">Privacy notice</h1>
          <div className="mt-6 glass-card rounded-2xl p-6 border-l-4 border-amber-400 text-sm leading-relaxed text-gray-300">
            <p className="text-white font-medium">This is a published draft, not a binding agreement.</p>
            <p className="mt-3">
              It is published in draft so you can see how your details are handled
              before you send them, rather than being asked to trust an unpublished
              document. It has not yet been approved by legal counsel and does not
              form part of any contract. It describes what the site does today, and
              it will be replaced by an approved notice.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What this notice covers</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                This notice covers the public website at feuselectronicsgroup.com.
              </p>
              <p>
                It does not cover the FEUS.ai governed runtime at
                app.feuselectronicsgroup.com, which is available only to people your
                organisation has authorised. Data handling there is governed by the
                agreement covering your deployment, and is summarised under{' '}
                <Link to="/trust" className="text-accent-300 underline underline-offset-2">Trust</Link>.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What we collect</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p className="text-white font-medium">Only what you type into a form.</p>
              <p>
                When you submit the contact form we collect your first and last name,
                email address, company, job title if you supply one, the interest area
                you select, and your message.
              </p>
              <p>
                The site sets no cookies, runs no analytics or advertising trackers,
                and stores nothing in your browser. We do not build a profile of you,
                and we do not sell or share your details for anyone else&rsquo;s marketing.
              </p>
              <p>
                Our hosting provider records ordinary server logs, including IP address
                and request details, for delivery, security, and abuse prevention. We
                do not use those logs to identify individual visitors.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Why we use it, and for how long</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                We use what you send to answer your enquiry and to continue that
                conversation. We do not use it for automated decision-making.
              </p>
              <p>
                Contact form submissions are intended for the
                info@feuselectronicsgroup.com mailbox. Inbox delivery has not been
                verified in this website review. Enquiries received are retained as
                ordinary business correspondence. We have not yet fixed a retention
                period, and we will publish one in the approved notice rather than
                state a period we do not currently enforce.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Who else processes it</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-4">
              <p>
                The implementation uses the providers below. Their handling is
                subject to their terms and the configured service; this draft does
                not attest provider configuration or end-to-end delivery.
              </p>
              <ul className="space-y-3">
                <li>
                  <span className="text-white font-medium">Vercel</span> — hosts the
                  website. A separate serverless contact endpoint is present in the
                  repository, but the current browser contact form does not call it.
                </li>
                <li>
                  <span className="text-white font-medium">EmailJS</span> — the current
                  browser contact form sends your submitted details to this provider
                  for email processing. Acceptance is not proof of inbox delivery.
                </li>
                <li>
                  <span className="text-white font-medium">Resend</span> — used by the
                  separate serverless endpoint if configured and invoked, not by the
                  current browser contact form. Its delivery has not been verified here.
                </li>
                <li>
                  <span className="text-white font-medium">Mailbox provider</span> —
                  processes enquiries that reach our inbox; its current configuration
                  has not been verified in this review. Microsoft provides Azure identity
                  and hosting for the separate FEUS.ai runtime, not evidence of website
                  contact delivery.
                </li>
              </ul>
              <p>
                These providers operate infrastructure in the United States and
                elsewhere, so your details may be processed outside your own country.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Your choices</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                You can ask us what we hold about you, ask us to correct it, or ask us
                to delete it. Email{' '}
                <a
                  href="mailto:info@feuselectronicsgroup.com"
                  className="text-accent-300 underline underline-offset-2"
                >
                  info@feuselectronicsgroup.com
                </a>{' '}
                and say what you would like us to do.
              </p>
              <p>
                We will acknowledge your request. We are not yet publishing a guaranteed
                response time, because we would rather commit to one in the approved
                notice than publish a target we have not put behind an agreement.
              </p>
              <p>
                Depending on where you live you may also have the right to complain to a
                data protection authority.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Reporting a security problem</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                If you have found a security issue, please see{' '}
                <Link to="/security" className="text-accent-300 underline underline-offset-2">
                  security and responsible disclosure
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <div className="glass-card rounded-2xl p-6 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                FEUS Electronics Group,{' '}
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
                <Link to="/legal/terms" className="text-accent-300 underline underline-offset-2">
                  terms of use
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
