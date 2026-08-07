import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight, Calendar } from 'lucide-react'
import { CalendlyButton } from './CalendlyEmbed'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'FEUS.ai', href: '/feus-ai' },
  { name: 'Architecture', href: '/architecture' },
  { name: 'Status', href: '/status' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Sales', href: '/sales' },
  { name: 'Trust Center', href: '/trust' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.href
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
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="space-y-1 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  location.pathname === item.href
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
