import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { ReleaseStatusBanner } from './statusComponents'

/**
 * Routes describing the FEUS.ai platform carry a persistent capability-scoped
 * status strip. Company-services and
 * media-sales routes do not, because they describe human-delivered services,
 * not the platform.
 */
const PLATFORM_ROUTE_PREFIXES = [
  '/feus-ai', '/agents', '/sqlops', '/requestops', '/control-plane', '/architecture',
  '/integrations', '/assurance', '/demo', '/copilot', '/faq', '/release-notes',
  '/trust', '/status',
]

export default function Layout() {
  const { pathname } = useLocation()
  const showBanner = PLATFORM_ROUTE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      {showBanner && <ReleaseStatusBanner />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
