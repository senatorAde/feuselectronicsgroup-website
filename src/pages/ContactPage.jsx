import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
  Mail, MapPin, ArrowRight, Send, BrainCircuit, BriefcaseBusiness,
  Clock, Globe, MessageSquare, CheckCircle2, Calendar,
  AlertCircle, Loader2, Star, Film
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SEO from '../components/SEO'

const inquiryTypes = [
  'Request a Controlled Demonstration of FEUS.ai',
  'Managed Database Operations',
  'Data Architecture & Engineering',
  'Cloud & Platform Operations',
  'Enterprise AI Solutions',
  'Governance & Security',
  'Analytics & Business Intelligence',
  'Automation & Integration',
  'Digital Platforms & Web',
  'Media, Photo & Video',
  'Strategy & Implementation Advisory',
  'General Inquiry',
]

const queryInquiryTypes = {
  demo: inquiryTypes[0],
  database: inquiryTypes[1],
  data: inquiryTypes[2],
  modernization: inquiryTypes[2],
  cloud: inquiryTypes[3],
  'cloud-ops': inquiryTypes[3],
  ai: inquiryTypes[4],
  enablement: inquiryTypes[4],
  governance: inquiryTypes[5],
  analytics: inquiryTypes[6],
  automation: inquiryTypes[7],
  workflow: inquiryTypes[7],
  digital: inquiryTypes[8],
  'digital-experience': inquiryTypes[8],
  media: inquiryTypes[9],
  'visual-story': inquiryTypes[9],
  strategy: inquiryTypes[10],
  services: inquiryTypes[11],
}

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
    description: 'Request a capability-scoped platform demonstration or architecture briefing.',
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
  const requestedType = searchParams.get('type')
  const isReviewMode = requestedType === 'review'

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '',
    jobTitle: '', inquiryType: '', message: '',
    // Review-specific fields
    rating: 0,
    wouldRecommend: '',
    formType: 'contact',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    if (isReviewMode) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: 'Demo Feedback / Review',
        formType: 'demo_feedback',
      }))
      return
    }

    const inquiryType = queryInquiryTypes[requestedType]
    if (inquiryType) {
      setFormData((prev) => ({
        ...prev,
        inquiryType,
        formType: 'contact',
      }))
    }
  }, [isReviewMode, requestedType])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const reviewSuffix = isReviewMode && formData.rating
        ? `\n\n--- Review Details ---\nRating: ${formData.rating}/5 stars\nWould Recommend: ${formData.wouldRecommend || 'Not specified'}\nForm Type: demo_feedback`
        : ''

      await emailjs.send(
        'service_e5n5jan',
        'template_0opftvh',
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          company: formData.company,
          job_title: formData.jobTitle,
          inquiry_type: formData.inquiryType,
          message: formData.message + reviewSuffix,
        },
        'wF0ChRLXEfBrHG029'
      )

      setSubmitted(true)
    } catch (err) {
      console.error('Contact form error:', err)
      setError('We could not send your message through the form')
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
          : 'Book a consultation, request a capability-scoped FEUS.ai briefing, or send a written inquiry. We will respond within one business day.'
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

      <section id="contact-form" className="section-mist scroll-mt-24 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel tone="light">Get in touch</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              Tell us what you want to change.
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Share enough context for us to route your inquiry well. We will respond within one business day.
            </p>
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
                        <span className="text-sm text-slate-600">Within 1 business day</span>
                      </div>
                    </div>
                  </div>

                  <div className="signal-panel p-6">
                    <h4 className="text-sm font-semibold text-ink mb-3">What to expect</h4>
                    <div className="space-y-3">
                      {[
                        'Initial response within 1 business day',
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
                        We've received your message and will get back to you within one business day.
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
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1.5">First name *</label>
                            <input
                              id="firstName" type="text" name="firstName" autoComplete="given-name" required
                              value={formData.firstName} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Your first name"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1.5">Last name *</label>
                            <input
                              id="lastName" type="text" name="lastName" autoComplete="family-name" required
                              value={formData.lastName} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Your last name"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Work email *</label>
                          <input
                            id="email" type="email" name="email" autoComplete="email" required
                            value={formData.email} onChange={handleChange}
                            className={fieldClass}
                            placeholder="you@company.com"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1.5">Company *</label>
                            <input
                              id="company" type="text" name="company" autoComplete="organization" required
                              value={formData.company} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <label htmlFor="jobTitle" className="block text-sm font-semibold text-slate-700 mb-1.5">Job title</label>
                            <input
                              id="jobTitle" type="text" name="jobTitle" autoComplete="organization-title"
                              value={formData.jobTitle} onChange={handleChange}
                              className={fieldClass}
                              placeholder="Your role"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="inquiryType" className="block text-sm font-semibold text-slate-700 mb-1.5">Area of interest *</label>
                          <select
                            id="inquiryType" name="inquiryType" required
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
                            id="message" name="message" required rows={5}
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
                          disabled={submitting}
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
                          By submitting this form, you consent to FEUS Electronics Group using the details you provide to respond to your inquiry. Messages are delivered through our form-delivery provider. A formal privacy policy is in legal review and will be published on this site.
                        </p>
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
                <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">Put 30 minutes on the calendar.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                  We will discuss the outcome, current environment, and constraints, then identify a useful next step without forcing a preset package.
                </p>
                <div className="mt-7">
                  <CalendlyButton className="btn-primary" icon={ArrowRight}>Schedule a discovery call</CalendlyButton>
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
