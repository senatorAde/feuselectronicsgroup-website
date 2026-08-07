import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { CalendlyButton } from './CalendlyEmbed'

const platformNavigation = [
  { name: 'Platform Overview', href: '/feus-ai' },
  { name: 'Agent Portfolio', href: '/agents' },
  { name: 'Architecture', href: '/architecture' },
  { name: 'Platform Status', href: '/status' },
]

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Sales', href: '/sales' },
  { name: 'Trust Center', href: '/trust' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlatformOpen, setIsPlatformOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    setIsPlatformOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled || isOpen
          ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/feus-logo.jpg" 
                alt="FEUS Electronics Group" 
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-feus-500/20 group-hover:shadow-feus-500/40 transition-shadow duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-feus-500/20 to-accent-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white leading-tight tracking-tight">
                FEUS Electronics
              </span>
              <span className="text-[10px] font-medium text-feus-400 uppercase tracking-[0.2em] leading-tight">
                Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPlatformOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={isPlatformOpen}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-1.5 ${
                  platformNavigation.some((item) => isActive(item.href))
                    ? 'text-feus-300 bg-feus-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Platform
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isPlatformOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {isPlatformOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-white/[0.1] bg-navy-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >
                  {platformNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      role="menuitem"
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                        isActive(item.href)
                          ? 'text-feus-300 bg-feus-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-feus-300 bg-feus-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <CalendlyButton
              className="ml-4 btn-accent text-sm !px-6 !py-2.5"
              icon={ArrowRight}
            >
              Book a Consultation
            </CalendlyButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`lg:hidden ${
            isOpen ? 'block max-h-[80vh] overflow-y-auto pb-6' : 'hidden'
          }`}
        >
          <div className="space-y-1 pt-2">
            <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Platform
            </p>
            {platformNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(item.href)
                    ? 'text-feus-300 bg-feus-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <p className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Company
            </p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(item.href)
                    ? 'text-feus-300 bg-feus-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <CalendlyButton
              className="block mt-4 btn-accent text-center w-full"
              icon={ArrowRight}
            >
              Book a Consultation
            </CalendlyButton>
          </div>
        </div>
      </div>
    </nav>
  )
}
