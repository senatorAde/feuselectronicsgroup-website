import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Calendly Configuration ─────────────────────────────────
// Override with VITE_CALENDLY_URL env var if needed.
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ife-feus/30min'
const IS_CALENDLY_CONFIGURED = Boolean(CALENDLY_URL)

/** Load Calendly scripts + CSS (only when a valid URL is configured) */
function useCalendlyScripts() {
  useEffect(() => {
    if (!IS_CALENDLY_CONFIGURED) return

    const head = document.querySelector('head')

    if (!head.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      head.appendChild(script)
    }

    if (!head.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      head.appendChild(link)
    }
  }, [])
}

/**
 * Inline Calendly widget — embeds the scheduling UI directly on the page.
 * Shows nothing when Calendly is not configured.
 */
export function CalendlyInline({ url = CALENDLY_URL, height = '700px', className = '' }) {
  useCalendlyScripts()

  if (!IS_CALENDLY_CONFIGURED) return null

  return (
    <div className={className}>
      <div
        className="calendly-inline-widget"
        data-url={`${url}?hide_gdpr_banner=1&background_color=0a0c1a&text_color=e5e7eb&primary_color=6366f1`}
        style={{ minWidth: '320px', height }}
      />
    </div>
  )
}

/**
 * Calendly popup button — opens the scheduling widget in an overlay.
 * When Calendly is NOT configured, navigates to /contact instead.
 */
export function CalendlyButton({
  url = CALENDLY_URL,
  children = 'Book a Consultation',
  className = 'btn-accent group',
  icon: Icon = null,
}) {
  const navigate = useNavigate()
  useCalendlyScripts()

  const handleClick = (e) => {
    e.preventDefault()

    // If Calendly isn't set up yet, route to the contact page
    if (!IS_CALENDLY_CONFIGURED) {
      navigate('/contact')
      return
    }

    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: `${url}?hide_gdpr_banner=1&background_color=0a0c1a&text_color=e5e7eb&primary_color=6366f1`,
      })
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
    </button>
  )
}

export default CalendlyInline
