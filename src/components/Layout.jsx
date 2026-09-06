import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { PlatformStatusStrip } from './statusComponents'

/**
 * FEUS.ai platform routes carry a subtle, neutral capability-status strip that
 * points to per-capability status. It is informational, never a warning.
 *
 * Adoption surfaces (homepage, solutions, contact, consultation, demo, sales,
 * and company-services routes) deliberately do NOT carry it, so that product
 * positioning and adoption CTAs are not framed by status chrome.
 */
const PLATFORM_ROUTE_PREFIXES = [
  '/agents', '/sqlops', '/requestops', '/control-plane', '/architecture',
  '/integrations', '/assurance', '/faq', '/release-notes',
  '/trust', '/status',
]

export default function Layout() {
  const { pathname } = useLocation()
  const showStatusStrip = PLATFORM_ROUTE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-gold-400 px-4 py-3 text-sm font-bold text-ink shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      {showStatusStrip && <PlatformStatusStrip />}
      <main id="main-content" tabIndex="-1" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
