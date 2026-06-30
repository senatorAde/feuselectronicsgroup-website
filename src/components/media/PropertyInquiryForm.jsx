import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
  Send, CheckCircle2, AlertCircle, Loader2, Mail, MessageSquare,
} from 'lucide-react'

// Reuses the existing FEUS contact pipeline (same EmailJS service +
// template as src/pages/ContactPage.jsx). Property-specific fields
// (listing slug, interest, phone, preferred contact, asset id) are
// packed into the existing `inquiry_type` and `message` template
// fields so no EmailJS template change is required.
const EMAILJS_SERVICE_ID = 'service_e5n5jan'
const EMAILJS_TEMPLATE_ID = 'template_0opftvh'
const EMAILJS_PUBLIC_KEY = 'wF0ChRLXEfBrHG029'

const INTEREST_OPTIONS = [
  { value: 'entire-property', label: 'Entire property & contents (as-is)' },
  { value: 'individual-item', label: 'A single individual item' },
  { value: 'multiple-items', label: 'Several items / bundle' },
  { value: 'media-services', label: 'Media services (photography / showcase)' },
  { value: 'other', label: 'Other' },
]

const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'either', label: 'Either is fine' },
]

const FALLBACK_EMAIL = 'info@feuselectronicsgroup.com'

export default function PropertyInquiryForm({ listing }) {
  const [searchParams] = useSearchParams()
  const presetAssetId = searchParams.get('asset') || ''
  // Resolve the friendly title for the asset id so the prefilled
  // message and the email body carry the readable name (e.g.
  // "Marble-Top Coffee Table") instead of the slug.
  const presetAsset = presetAssetId
    ? listing.assets?.find((a) => a.id === presetAssetId)
    : null
  const presetAssetLabel = presetAsset?.title || presetAssetId
  const presetInterestParam = searchParams.get('interest')
  const presetInterest = INTEREST_OPTIONS.find((o) => o.value === presetInterestParam)?.value
    || (presetAssetId ? 'individual-item' : '')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: presetInterest,
    preferredContact: 'email',
    message: presetAssetId
      ? `I'm interested in "${presetAssetLabel}" from ${listing.title}.\n\n`
      : '',
    assetId: presetAssetId,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (presetAssetId || presetInterest) {
      setFormData((prev) => ({
        ...prev,
        assetId: presetAssetId,
        interest: presetInterest || prev.interest,
        message: presetAssetId
          ? `I'm interested in "${presetAssetLabel}" from ${listing.title}.\n\n`
          : prev.message,
      }))
    }
  }, [presetAssetId, presetInterest, presetAssetLabel, listing.title])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const interestLabel = () =>
    INTEREST_OPTIONS.find((o) => o.value === formData.interest)?.label || 'Other'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const messageBody = [
        formData.message?.trim(),
        '',
        '── Inquiry details ──',
        `Listing: ${listing.title} (${listing.slug})`,
        `Interest: ${interestLabel()}`,
        formData.assetId ? `Asset of interest: ${presetAssetLabel} (${formData.assetId})` : null,
        `Phone: ${formData.phone || '(not provided)'}`,
        `Preferred contact: ${
          CONTACT_METHODS.find((c) => c.value === formData.preferredContact)?.label || 'Email'
        }`,
      ]
        .filter((line) => line !== null)
        .join('\n')

      // To route property inquiries to a different mailbox in the
      // future, create a separate EmailJS template + service and
      // swap the IDs here. The shared inbox currently receives every
      // submission with the [PROPERTY SALES] subject prefix for
      // filtering.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: '(Property Sales Inquiry)',
          job_title: '',
          inquiry_type: `[PROPERTY SALES] ${listing.title} — ${interestLabel()}`,
          message: messageBody,
        },
        EMAILJS_PUBLIC_KEY
      )

      setSubmitted(true)
    } catch (err) {
      console.error('Property inquiry error:', err)
      setError(
        err?.message
          || `Something went wrong. Please try again or email us directly at ${FALLBACK_EMAIL}.`
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-card-static p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-accent-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Inquiry Received</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Thank you. We&apos;ve logged your inquiry for{' '}
          <span className="text-feus-300 font-medium">{listing.title}</span> and will respond
          within one business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card-static p-7 md:p-9 space-y-6"
      aria-label="Property and asset inquiry form"
    >
      {/* Hidden context fields */}
      <input type="hidden" name="listingSlug" value={listing.slug} />
      <input type="hidden" name="assetId" value={formData.assetId} />

      <div>
        <h3 className="text-xl font-bold text-white">Send an Inquiry</h3>
        <p className="mt-1.5 text-sm text-gray-400">
          Tell us what you&apos;re interested in and how to reach you. We&apos;ll respond within
          one business day.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-name" className="block text-sm font-medium text-gray-300 mb-1.5">
            Name *
          </label>
          <input
            id="inq-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="inq-email" className="block text-sm font-medium text-gray-300 mb-1.5">
            Email *
          </label>
          <input
            id="inq-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-phone" className="block text-sm font-medium text-gray-300 mb-1.5">
            Phone
          </label>
          <input
            id="inq-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="inq-contact" className="block text-sm font-medium text-gray-300 mb-1.5">
            Preferred contact
          </label>
          <select
            id="inq-contact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all appearance-none"
          >
            {CONTACT_METHODS.map((c) => (
              <option key={c.value} value={c.value} className="bg-navy-900">
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inq-interest" className="block text-sm font-medium text-gray-300 mb-1.5">
          Interested in *
        </label>
        <select
          id="inq-interest"
          name="interest"
          required
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all appearance-none"
        >
          <option value="" className="bg-navy-900">
            Select an option...
          </option>
          {INTEREST_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-navy-900">
              {o.label}
            </option>
          ))}
        </select>
        {formData.assetId && (
          <p className="mt-2 text-xs text-gray-500">
            Referring to item:{' '}
            <span className="text-feus-300 font-medium">{presetAssetLabel}</span>
          </p>
        )}
      </div>

      <div>
        <label htmlFor="inq-message" className="block text-sm font-medium text-gray-300 mb-1.5">
          Message *
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-feus-500/50 focus:ring-1 focus:ring-feus-500/30 transition-all resize-none"
          placeholder="Tell us which items or arrangement you're interested in, and any questions you have."
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
            Send Inquiry
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

      {/* Direct contact fallback */}
      <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
        <a
          href={`mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
            `Property inquiry — ${listing.title}`
          )}`}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-feus-300 transition-colors"
        >
          <Mail className="w-4 h-4 text-feus-400" />
          {FALLBACK_EMAIL}
        </a>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MessageSquare className="w-4 h-4 text-feus-400" />
          Response within 1 business day
        </div>
      </div>
    </form>
  )
}
