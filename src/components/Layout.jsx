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
      <ScrollToTop />
      <Navbar />
      {showStatusStrip && <PlatformStatusStrip />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
