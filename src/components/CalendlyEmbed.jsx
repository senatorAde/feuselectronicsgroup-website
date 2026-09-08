import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Scheduling configuration ───────────────────────────────
// There is deliberately no built-in default. A hardcoded fallback URL is how
// every booking button on the site came to point at a Calendly page that no
// longer accepted bookings: the code looked configured, so nothing reported a
// problem, and visitors met "This Calendly URL is not valid" at the exact
// moment they tried to buy. With no default, an unconfigured site sends people
// to the contact form, which is always answered.
const RAW_CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || ''

/**
 * A configured scheduler has to be a URL we can actually open.
 *
 * A typo, a leftover placeholder, or an http:// link would otherwise be
 * treated as working configuration and would break the same way the hardcoded
 * default did.
 */
function readSchedulerUrl(raw) {
  const value = String(raw || '').trim()
  if (!value) return ''
  try {
    const parsed = new URL(value)
    if (parsed.protocol !== 'https:') return ''
    if (!/(^|\.)calendly\.com$/i.test(parsed.hostname)) return ''
    // A bare profile root is not a bookable event.
    if (parsed.pathname.split('/').filter(Boolean).length < 2) return ''
    return parsed.toString()
  } catch {
    return ''
  }
}

export const CALENDLY_URL = readSchedulerUrl(RAW_CALENDLY_URL)
export const IS_CALENDLY_CONFIGURED = Boolean(CALENDLY_URL)

const WIDGET_PARAMS =
  'hide_gdpr_banner=1&background_color=061326&text_color=e2e8f0&primary_color=16a8f4'

function withParams(url) {
  return url.includes('?') ? `${url}&${WIDGET_PARAMS}` : `${url}?${WIDGET_PARAMS}`
}

/**
 * Load the Calendly widget, and report whether it actually arrived.
 *
 * The previous version assumed the script would load. When it did not -- an ad
 * blocker, a corporate proxy, an offline third party -- the button did nothing
 * at all, which is the worst outcome for a booking control.
 */
function useCalendlyScripts() {
  const [scriptState, setScriptState] = useState(
    IS_CALENDLY_CONFIGURED ? 'loading' : 'unconfigured'
  )

  useEffect(() => {
    if (!IS_CALENDLY_CONFIGURED) return undefined

    const head = document.querySelector('head')
    let cancelled = false

    if (!head.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      head.appendChild(link)
    }

    const existing = head.querySelector(
      'script[src*="calendly.com/assets/external/widget.js"]'
    )
    if (existing) {
      if (window.Calendly) {
        setScriptState('ready')
      } else {
        existing.addEventListener('load', () => !cancelled && setScriptState('ready'))
        existing.addEventListener('error', () => !cancelled && setScriptState('failed'))
      }
      return () => {
        cancelled = true
      }
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.addEventListener('load', () => !cancelled && setScriptState('ready'))
    script.addEventListener('error', () => !cancelled && setScriptState('failed'))
    head.appendChild(script)

    return () => {
      cancelled = true
    }
  }, [])

  return scriptState
}

/** Shown wherever scheduling is offered but not configured. */
function SchedulingUnavailable() {
  return (
    <p className="text-sm leading-relaxed text-slate-300">
      Online scheduling is not open at the moment.{' '}
      <Link to="/contact" className="font-bold underline underline-offset-2">
        Send us a message
      </Link>{' '}
      and we will reply with times, usually within one business day.
    </p>
  )
}

/**
 * Inline scheduler.
 *
 * When no scheduler is configured this renders a route to the contact form
 * rather than nothing. Rendering nothing left the surrounding copy -- "put 30
 * minutes on the calendar" -- promising something the page did not offer.
 */
export function CalendlyInline({ url = CALENDLY_URL, height = '700px', className = '' }) {
  const scriptState = useCalendlyScripts()

  if (!IS_CALENDLY_CONFIGURED) {
    return (
      <div className={className}>
        <SchedulingUnavailable />
      </div>
    )
  }

  return (
    <div className={className}>
      {scriptState === 'failed' && (
        <p className="mb-4 text-sm text-slate-300" role="status">
          The scheduling widget could not be loaded.{' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2"
          >
            Open the booking page in a new tab
          </a>{' '}
          or{' '}
          <Link to="/contact" className="font-bold underline underline-offset-2">
            send us a message
          </Link>
          .
        </p>
      )}
      <div
        className="calendly-inline-widget"
        data-url={withParams(url)}
        style={{ minWidth: '320px', height }}
      />
    </div>
  )
}

/**
 * The site's booking call to action.
 *
 * With no scheduler configured this is a real link to the contact form, not a
 * button that navigates. A link can be opened in a new tab, previewed on
 * hover, and reached by keyboard in the way visitors already expect.
 */
export function CalendlyButton({
  url = CALENDLY_URL,
  children = 'Request a consultation',
  className = 'btn-accent group',
  icon: Icon = null,
}) {
  const scriptState = useCalendlyScripts()
  const openedAt = useRef(0)

  if (!IS_CALENDLY_CONFIGURED) {
    return (
      <Link to="/contact" className={className}>
        {children}
        {Icon && (
          <Icon
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        )}
      </Link>
    )
  }

  const handleClick = (e) => {
    e.preventDefault()

    // Guard against a double-click stacking two overlays.
    const now = Date.now()
    if (now - openedAt.current < 800) return
    openedAt.current = now

    if (scriptState === 'ready' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: withParams(url) })
      return
    }
    // The overlay is unavailable, so open the booking page directly rather
    // than leaving the click with no visible effect.
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
      {Icon && (
        <Icon
          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
          aria-hidden="true"
        />
      )}
    </button>
  )
}

export default CalendlyInline
