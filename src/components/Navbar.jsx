import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { CalendlyButton } from './CalendlyEmbed'
import BrandMark from './BrandMark'

const primaryNavigation = [
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'FEUS.ai', href: '/feus-ai' },
]

const companyNavigation = [
  { name: 'About', href: '/about' },
  { name: 'Insights', href: '/insights' },
  { name: 'Sales & Media', href: '/sales' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const companyMenuRef = useRef(null)
  const location = useLocation()
  const isActive = (href) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setIsCompanyOpen(false)
  }, [location])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (companyMenuRef.current && !companyMenuRef.current.contains(event.target)) {
        setIsCompanyOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCompanyOpen(false)
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled || isOpen
          ? 'border-b border-white/10 bg-navy-950/95 shadow-xl shadow-black/15 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[84px] items-center justify-between">
          <Link to="/" aria-label="FEUS Electronics Group home" className="rounded-lg">
            <BrandMark />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {primaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                  isActive(item.href)
                    ? 'bg-feus-400/10 text-feus-200'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative" ref={companyMenuRef}>
              <button
                type="button"
                onClick={() => setIsCompanyOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={isCompanyOpen}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                  companyNavigation.some((item) => isActive(item.href))
                    ? 'bg-feus-400/10 text-feus-200'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                Company
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {isCompanyOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-white/10 bg-navy-950/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
                >
                  {companyNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      role="menuitem"
                      className={`block rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive(item.href)
                          ? 'bg-feus-400/10 text-feus-200'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/trust"
              aria-current={isActive('/trust') ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                isActive('/trust')
                  ? 'bg-feus-400/10 text-feus-200'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Trust Center
            </Link>
            <CalendlyButton
              className="btn-primary ml-3 !min-h-11 !px-5 !py-2.5"
              icon={ArrowRight}
            >
              Talk to FEUS
            </CalendlyButton>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg p-3 text-slate-200 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`lg:hidden ${
            isOpen ? 'block max-h-[calc(100svh-84px)] overflow-y-auto pb-8' : 'hidden'
          }`}
        >
          <div className="space-y-1 border-t border-white/10 pt-4">
            <p className="px-3 pb-2 text-xs font-bold uppercase text-slate-500">Explore</p>
            {[...primaryNavigation, { name: 'Trust Center', href: '/trust' }].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`block rounded-lg px-3 py-3 text-base font-bold transition-colors ${
                  isActive(item.href)
                    ? 'bg-feus-400/10 text-feus-200'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <p className="px-3 pb-2 pt-5 text-xs font-bold uppercase text-slate-500">
              Company
            </p>
            {companyNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`block rounded-lg px-3 py-3 text-base font-bold transition-colors ${
                  isActive(item.href)
                    ? 'bg-feus-400/10 text-feus-200'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <CalendlyButton
              className="btn-primary mt-5 w-full"
              icon={ArrowRight}
            >
              Talk to FEUS
            </CalendlyButton>
            <Link to="/contact" className="btn-secondary mt-3 w-full">Send a message</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
