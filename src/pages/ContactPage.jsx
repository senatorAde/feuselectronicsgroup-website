import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
  Mail, Phone, MapPin, ArrowRight, Send, Building2,
  Clock, Globe, MessageSquare, CheckCircle2, Calendar,
  AlertCircle, Loader2, Star
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionLabel, CTAButton, GlowDivider } from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'

const inquiryTypes = [
  'Request a Controlled Demonstration of FEUS.ai',
  'Managed Database Operations',
  'Data Architecture & Engineering',
  'Cloud & Platform Operations',
  'Enterprise AI Solutions',
  'Analytics & Business Intelligence',
  'Automation & Integration',
  'General Inquiry',
]

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const isReviewMode = searchParams.get('type') === 'review'

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

  // Pre-fill form for review mode
  useEffect(() => {
    if (isReviewMode) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: 'Demo Feedback / Review',
        formType: 'demo_feedback',
      }))
    }
  }, [isReviewMode])

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
      setError(
        err.message || 'Something went wrong. Please try again or email us directly at info@feuselectronicsgroup.com'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        label={isReviewMode ? 'Share Your Experience' : 'Contact Us'}
        title={isReviewMode
          ? <>Tell Us About Your<br /><span className="gradient-text">FEUS Experience</span></>
          : <>Let's Start a<br /><span className="gradient-text">Conversation</span></>
        }
        subtitle={isReviewMode
          ? 'Your feedback helps us improve and helps other teams evaluate governed data operations. It takes less than two minutes.'
          : 'Book a consultation about our services, request a capability-scoped architecture briefing on FEUS.ai — or send us a message and we\'ll respond within one business day.'
        }
      />

      {/* ─── CONTACT FORM (PRIMARY) ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Let's Talk About Your<br />
              <span className="gradient-text">Data Operations</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Fill out the form below and we'll respond within one business day — or book a call at a time that works for you.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We respond to every inquiry within one business day. For urgent matters, reach out directly via email.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-500/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-feus-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Email</h4>
                        <a href="mailto:info@feuselectronicsgroup.com" className="text-sm text-feus-400 hover:text-feus-300 transition-colors">
                          info@feuselectronicsgroup.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-500/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-feus-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Office</h4>
                        <span className="text-sm text-gray-400">2208 Hanfred Lane, Suite 104<br />Tucker, GA 30084</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-500/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-feus-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Website</h4>
                        <span className="text-sm text-gray-400">www.feuselectronicsgroup.com</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-feus-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-feus-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Response Time</h4>
                        <span className="text-sm text-gray-400">Within 1 business day</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card-static p-6">
                    <h4 className="text-sm font-semibold text-white mb-3">What to Expect</h4>
                    <div className="space-y-3">
                      {[
                        'Initial response within 1 business day',
                        'Discovery call to understand your needs',
                        'Tailored assessment and proposal',
                        'No obligation, no pressure',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-400">{item}</span>
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
                <div className="glass-card-static p-8 md:p-10">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-accent-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Thank You</h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        We've received your message and will get back to you within one business day.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-white mb-6">
                        {isReviewMode ? 'Tell Us About Your Experience' : 'Send Us a Message'}
                      </h3>
                      {/* Hidden field for form type */}
                      <input type="hidden" name="formType" value={formData.formType} />
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name *</label>
                            <input
                              type="text" name="firstName" required
                              value={formData.firstName} onChange={handleChange}
                              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
                              placeholder="Your first name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name *</label>
                            <input
                              type="text" name="lastName" required
                              value={formData.lastName} onChange={handleChange}
                              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
                              placeholder="Your last name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">Work Email *</label>
                          <input
                            type="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
                            placeholder="you@company.com"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Company *</label>
                            <input
                              type="text" name="company" required
                              value={formData.company} onChange={handleChange}
                              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Job Title</label>
                            <input
                              type="text" name="jobTitle"
                              value={formData.jobTitle} onChange={handleChange}
                              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
                              placeholder="Your role"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">Area of Interest *</label>
                          <select
                            name="inquiryType" required
                            value={formData.inquiryType} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all appearance-none"
                          >
                            <option value="" className="bg-navy-900">Select an area...</option>
                            {inquiryTypes.map((type) => (
                              <option key={type} value={type} className="bg-navy-900">{type}</option>
                            ))}
                          </select>
                        </div>

                        {/* ─── Review-specific fields ─── */}
                        {isReviewMode && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating *</label>
                              <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                                    className="p-1 rounded transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-feus-500/50 focus:ring-offset-1 focus:ring-offset-transparent"
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
                                  <span className="ml-3 text-sm text-gray-400">
                                    {formData.rating}/5
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Would you recommend FEUS Electronics Group to other teams?
                              </label>
                              <div className="flex gap-3">
                                {['Yes', 'Not yet — needs more time', 'No'].map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, wouldRecommend: opt })}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                      formData.wouldRecommend === opt
                                        ? 'bg-feus-500/20 border-feus-500/40 text-feus-300'
                                        : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-white'
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
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            {isReviewMode ? 'Your Feedback *' : 'Message *'}
                          </label>
                          <textarea
                            name="message" required rows={4}
                            value={formData.message} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all resize-none"
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
                          <div className="flex items-start gap-2 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
                            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-rose-300">{error}</p>
                          </div>
                        )}

                        <p className="text-xs text-gray-600 text-center">
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

      {/* ─── SCHEDULE A CALL (SECONDARY) ─── */}
      <GlowDivider />
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-accent-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prefer a Live Conversation?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Book a free 30-minute discovery call. We'll discuss your environment, your challenges, and how our services can help — no obligation, no pressure.
              </p>
              <CalendlyButton className="btn-accent group text-lg px-8 py-4" icon={ArrowRight}>
                Schedule a Discovery Call
              </CalendlyButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── WHAT TO EXPECT ─── */}
      <GlowDivider />
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <SectionLabel>What Happens Next</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our Engagement Process
              </h2>
              <div className="mt-12 grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Discovery Call', desc: 'A 30-minute conversation to understand your environment, challenges, and goals.' },
                  { step: '2', title: 'Assessment', desc: 'We review your current state and identify opportunities for governed AI operations.' },
                  { step: '3', title: 'Proposal', desc: 'A tailored plan with scope, timeline, and expected outcomes — no generic pitches.' },
                  { step: '4', title: 'Engagement', desc: 'Implementation begins with clear milestones, weekly updates, and measurable results.' },
                ].map((s, i) => (
                  <div key={s.step} className="glass-card p-6 text-center">
                    <span className="text-3xl font-extrabold text-feus-500/20">{s.step}</span>
                    <h4 className="mt-2 text-base font-semibold text-white">{s.title}</h4>
                    <p className="mt-2 text-xs text-gray-500">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Start with Step 1
                </CalendlyButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
