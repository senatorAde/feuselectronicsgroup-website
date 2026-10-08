import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { readContactAvailability, sendContact } from '../services/contactClient'
import {
  Mail, MapPin, ArrowRight, Send, BrainCircuit, BriefcaseBusiness,
  Clock, Globe, MessageSquare, CheckCircle2, Calendar,
  AlertCircle, Loader2, Star, Film
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SEO from '../components/SEO'
import { inquiryTypes, resolveInquiry, focusContactForm } from '../data/contactNavigation'
import { LIVE_DEMO } from '../data/demoExperience'

const contactPaths = [
  {
    icon: BriefcaseBusiness,
    title: 'Plan a consultation',
    description: 'Discuss a business challenge, assessment, transformation, or delivery engagement.',
    type: 'services',
  },
  {
    icon: BrainCircuit,
    title: 'Explore FEUS.ai',
    description: 'Request a guided live Azure TST demo with synthetic inputs, authorized Entra access, and agreed budgets. No customer connections.',
    type: 'demo',
  },
  {
    icon: MessageSquare,
    title: 'Ask about a service',
    description: 'Tell us which technical, strategic, or digital capability you need.',
    type: 'strategy',
  },
  {
    icon: Film,
    title: 'Start a media project',
    description: 'Discuss photography, video, showcase, or campaign content needs.',
    type: 'media',
  },
]

const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink placeholder-slate-400 transition-colors focus:border-feus-600 focus:ring-2 focus:ring-feus-200'

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const formSectionRef = useRef(null)
  const inquiryRef = useRef(null)
  const requestedType = searchParams.get('type') || location.state?.inquiry
  const isReviewMode = requestedType === 'review'

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '',
    jobTitle: '', message: '', website: '', privacyConsent: false,
    // Review-specific fields
    rating: 0,
    wouldRecommend: '',
    ...resolveInquiry(requestedType),
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [hoverRating, setHoverRating] = useState(0)
  const [contactAvailable, setContactAvailable] = useState(false)

  useEffect(() => {
    let active = true
    readContactAvailability().then(available => { if (active) setContactAvailable(available) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...resolveInquiry(requestedType) }))
  }, [requestedType])

  useEffect(() => {
    if (location.hash !== '#contact-form' && !resolveInquiry(requestedType).inquiryType) return
    focusContactForm(formSectionRef.current, inquiryRef.current)
  }, [location.key, location.hash, requestedType])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contactAvailable) { setError('Online inquiries are unavailable. Please use direct email'); return }
    setSubmitting(true)
    setError(null)

    try {
      const reviewSuffix = isReviewMode && formData.rating
        ? `\n\n--- Review Details ---\nRating: ${formData.rating}/5 stars\nWould Recommend: ${formData.wouldRecommend || 'Not specified'}\nForm Type: demo_feedback`
        : ''

      await sendContact({ ...formData, message: formData.message + reviewSuffix })

      setSubmitted(true)
    } catch (err) {
      console.error('Contact form provider request failed')
      setError(err.message || 'We could not send your message through the form')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title={isReviewMode ? 'Share Feedback' : 'Contact FEUS'}
        description="Contact FEUS to discuss enterprise technology services, request a FEUS.ai capability briefing, or start a digital or media engagement."
        noindex={isReviewMode}
      />
      <PageHero
        label={isReviewMode ? 'Share Your Experience' : 'Contact Us'}
        title={isReviewMode
          ? <>Tell Us About Your<br /><span className="gradient-text">FEUS Experience</span></>
          : <>Bring us the challenge.<br /><span className="text-feus-300">We will shape the next step.</span></>
        }
        subtitle={isReviewMode
          ? 'Your feedback helps us improve and helps other teams evaluate governed data operations. It takes less than two minutes.'
                : 'Request a consultation, ask for a capability-scoped FEUS.ai briefing, or send a written inquiry. Response time is not guaranteed.'
        }
        backgroundImage="/brand/feus-hero-system.webp"
        imagePosition="70% center"
      />

      {!isReviewMode && (
        <section className="section-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {contactPaths.map(({ icon: Icon, title, description, type }) => (
                <Link key={title} to={`/contact?type=${type}#contact-form`} className="surface-card group p-6">
                  <Icon className="h-6 w-6 text-feus-700" aria-hidden="true" />
                  <h2 className="mt-5 text-lg font-bold text-ink">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-feus-800">
                    Choose this path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact-form" ref={formSectionRef} className="section-mist scroll-mt-24 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel tone="light">Get in touch</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              Tell us what you want to change.
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Share enough context for us to route your inquiry well. Response time is not guaranteed.
            </p>
            {requestedType === 'demo' && (
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{LIVE_DEMO.access} {LIVE_DEMO.budget}</p>
            )}
            {requestedType === 'adoption' && (
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Adoption starts with scope, identity, target permissions, budgets and validation. Sending this form does not provision access or connect customer systems.</p>
            )}
            {(requestedType === 'security' || requestedType === 'governance') && (
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Governance &amp; Security is selected. Do not include credentials, customer data or sensitive exploit details. This form is not an encrypted disclosure channel; see our <Link to="/security" className="text-feus-800 underline">responsible disclosure guidance</Link>.</p>
            )}
          </div>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-ink mb-4">Direct contact</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Prefer email or need to include supporting context? Reach us directly and we will route the conversation.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-feus-800" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink">Email</h4>
                        <a href="mailto:info@feuselectronicsgroup.com" className="text-sm font-semibold text-feus-800 hover:text-feus-600 transition-colors">
                          info@feuselectronicsgroup.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-feus-800" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink">Office</h4>
                        <span className="text-sm text-slate-600">2208 Hanfred Lane, Suite 104<br />Tucker, GA 30084</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-50 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-feus-800" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink">Website</h4>
                        <span className="text-sm text-slate-600">www.feuselectronicsgroup.com</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-feus-800" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink">Response time</h4>
                        <span className="text-sm text-slate-600">Not guaranteed</span>
                      </div>
                    </div>
                  </div>

                  <div className="signal-panel p-6">
                    <h4 className="text-sm font-semibold text-ink mb-3">What to expect</h4>
                    <div className="space-y-3">
                      {[
                        'Response timing agreed during the conversation',
                        'Discovery call to understand your needs',
                        'Tailored assessment and proposal',
                        'No obligation, no pressure',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-700 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-xs text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={100}>
                <div className="surface-card p-8 md:p-10">
                  {submitted ? (
                    <div className="text-center py-12" role="status" aria-live="polite">
                      <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-accent-700" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-bold text-ink mb-3">Thank you</h3>
                      <p className="text-slate-600 max-w-md mx-auto">
                        The email provider accepted your request. This is not confirmation of inbox delivery, a booked appointment, CRM registration, trial activation, or a guaranteed response time. You can also email info@feuselectronicsgroup.com.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-ink mb-6">
                        {isReviewMode ? 'Tell Us About Your Experience' : 'Send Us a Message'}
                      </h3>
                      {/* Hidden field for form type */}
                      <input type="hidden" name="formType" value={formData.formType} />
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <p role="status" className="text-sm text-slate-700">
                          {contactAvailable ? 'Server-side email inquiries are enabled by the operator.' : 'Online inquiries are unavailable until delivery, privacy and shared abuse controls are operator enabled.'}{' '}
                          <a href="mailto:info@feuselectronicsgroup.com" className="underline">Email us directly</a>. An intro request is not yet booked.
                        </p>
                        <div className="contact-honeypot" aria-hidden="true">
                          <label htmlFor="website">Leave this field empty</label>
                          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1.5">First name *</label>
                            <input
                              id="firstName" type="text" name="firstName" autoComplete="given-name" required maxLength={100}
                              value={formData.firstName} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Your first name"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1.5">Last name *</label>
                            <input
                              id="lastName" type="text" name="lastName" autoComplete="family-name" required maxLength={100}
                              value={formData.lastName} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Your last name"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Work email *</label>
                          <input
                            id="email" type="email" name="email" autoComplete="email" required maxLength={254}
                            value={formData.email} onChange={handleChange}
                            className={fieldClass}
                            placeholder="you@company.com"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1.5">Company *</label>
                            <input
                              id="company" type="text" name="company" autoComplete="organization" required maxLength={200}
                              value={formData.company} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <label htmlFor="jobTitle" className="block text-sm font-semibold text-slate-700 mb-1.5">Job title</label>
                            <input
                              id="jobTitle" type="text" name="jobTitle" autoComplete="organization-title" maxLength={200}
                              value={formData.jobTitle} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Your role"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="inquiryType" className="block text-sm font-semibold text-slate-700 mb-1.5">Area of interest *</label>
                          <select
                            id="inquiryType" name="inquiryType" required ref={inquiryRef}
                            value={formData.inquiryType} onChange={handleChange}
                            className={`${fieldClass} appearance-none`}
                          >
                            <option value="">Select an area...</option>
                            {inquiryTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        {/* ─── Review-specific fields ─── */}
                        {isReviewMode && (
                          <>
                            <div>
                              <span className="block text-sm font-semibold text-slate-700 mb-2">Your rating *</span>
                              <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                                    className="p-1 rounded transition-transform hover:scale-110"
                                  >
                                    <Star
                                      className={`w-7 h-7 transition-colors duration-150 ${
                                        star <= (hoverRating || formData.rating)
                                          ? 'text-amber-400 fill-amber-400'
                                          : 'text-gray-600'
                                      }`}
                                    />
                                  </button>
                                ))}
                                {formData.rating > 0 && (
                                  <span className="ml-3 text-sm text-slate-600">
                                    {formData.rating}/5
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <span className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Would you recommend FEUS Electronics Group to other teams?
                              </span>
                              <div className="flex flex-wrap gap-3">
                                {['Yes', 'Not yet — needs more time', 'No'].map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, wouldRecommend: opt })}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                      formData.wouldRecommend === opt
                                        ? 'bg-feus-50 border-feus-500 text-feus-900'
                                        : 'bg-white border-slate-300 text-slate-600 hover:border-feus-500 hover:text-ink'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        <div>
                          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            {isReviewMode ? 'Your Feedback *' : 'Message *'}
                          </label>
                          <textarea
                            id="message" name="message" required rows={5} maxLength={isReviewMode ? 4500 : 5000}
                            value={formData.message} onChange={handleChange}
                            className={`${fieldClass} resize-y`}
                            placeholder={isReviewMode
                              ? 'What stood out during your demonstration or engagement? How could we improve? What would you tell a peer considering FEUS Electronics Group?'
                              : 'Tell us about your current challenges and what you\'re looking to accomplish...'
                            }
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting || !contactAvailable}
                          className="btn-primary w-full group disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>

                        {error && (
                          <div className="flex items-start gap-2 p-4 rounded-lg bg-rose-50 border border-rose-200" role="alert" aria-live="assertive">
                            <AlertCircle className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <p className="text-sm text-rose-800">
                              {error}. You can also email{' '}
                              <a href="mailto:info@feuselectronicsgroup.com" className="font-bold underline underline-offset-2">info@feuselectronicsgroup.com</a>.
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-slate-500 text-center">
                          This candidate form calls /api/contact and, only when enabled, sends your details through the server-side Resend provider. End-to-end inbox delivery has not been verified in this website review; provider acceptance is not proof of delivery. Do not include credentials or sensitive customer data. Our{' '}
                          <Link to="/legal/privacy" className="underline underline-offset-2">privacy notice</Link>{' '}
                          explains what we collect and who processes it; it is published as a draft pending legal approval.
                        </p>
                        <label className="flex gap-3 text-sm text-slate-700">
                          <input type="checkbox" name="privacyConsent" required checked={formData.privacyConsent} onChange={handleChange} />
                          I have read the draft privacy notice and agree to use of these details to respond to this inquiry.
                        </label>
                      </form>
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <GlowDivider />
      <section className="section-ink py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent-400/10">
                <Calendar className="h-8 w-8 text-accent-300" aria-hidden="true" />
              </div>
              <div>
                <SectionLabel>Prefer a live conversation?</SectionLabel>
                <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">Start with a 20–30 minute intro.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                  Tell us the outcome you are after, your current environment, and your constraints. We will reply with times, then identify a useful next step without forcing a preset package.
                </p>
                <div className="mt-7">
                  <CalendlyButton className="btn-primary" icon={ArrowRight}>Request a discovery call</CalendlyButton>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GlowDivider />
      <section className="section-light py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <SectionLabel tone="light">What happens next</SectionLabel>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-ink">
                A clear engagement process
              </h2>
              <div className="mt-12 grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Discover', desc: 'Understand the outcome, current environment, stakeholders, and constraints.' },
                  { step: '2', title: 'Assess', desc: 'Review the relevant systems, experience, risks, and opportunities.' },
                  { step: '3', title: 'Shape', desc: 'Define the scope, sequence, responsibilities, and ways to assess progress.' },
                  { step: '4', title: 'Deliver', desc: 'Begin with clear milestones, agreed communication, and accountable decisions.' },
                ].map((s, i) => (
                  <div key={s.step} className="border-t-2 border-feus-300 pt-6 text-left">
                    <span className="text-sm font-bold text-feus-700">0{s.step}</span>
                    <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <CalendlyButton className="btn-dark" icon={ArrowRight}>
                  Start with discovery
                </CalendlyButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
