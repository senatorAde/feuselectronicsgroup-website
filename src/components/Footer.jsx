import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone, Linkedin, Facebook, Instagram } from 'lucide-react'
import { CalendlyButton } from './CalendlyEmbed'
import { POSTURE } from '../data/publicStatus'

const footerLinks = {
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
  ],
  Platform: [
    { name: 'FEUS.ai Overview', href: '/feus-ai' },
    { name: 'Agent Portfolio', href: '/agents' },
    { name: 'OracleOps — Preview', href: '/agents/oracle' },
    { name: 'ITSM Connect — Preview', href: '/integrations/itsm' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Integrations', href: '/integrations' },
  ],
  'Trust Center': [
    { name: 'Platform Status', href: '/status' },
    { name: 'Security Posture', href: '/trust/security' },
    { name: 'Compliance Posture', href: '/trust/compliance' },
    { name: 'Posture History', href: '/release-notes' },
  ],
  Sales: [
    { name: 'Sales Overview', href: '/sales' },
    { name: 'Property Listings', href: '/sales/listings' },
    { name: 'Request Showcase', href: '/contact' },
  ],
  Resources: [
    { name: 'Insights & Blog', href: '/insights' },
    { name: 'Trust Center', href: '/trust' },
    { name: 'Leave a Review', href: '/contact?type=review' },
    { name: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/[0.06]">
      {/* CTA Band */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Let&rsquo;s talk about your data operations
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                Discuss a services engagement or request an architecture briefing on the FEUS.ai platform.
              </p>
            </div>
            <CalendlyButton className="btn-primary whitespace-nowrap group" icon={ArrowRight}>
              Schedule a Consultation
            </CalendlyButton>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/feus-logo.jpg" 
                alt="FEUS Electronics Group" 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">FEUS Electronics</span>
                <span className="text-[10px] font-medium text-feus-400 uppercase tracking-[0.2em]">Group</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Enterprise technology company delivering database, cloud, and AI-governance
              services — and developing FEUS.ai, a governed AI Data Operations platform
              with an operationally validated core.
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
              <span>2208 Hanfred Lane, Suite 104<br />Tucker, GA 30084</span>
            </div>
            <div className="mt-6 flex items-center flex-wrap gap-2">
              <a href="https://www.linkedin.com/company/feus-electronics-group" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-feus-400 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/FEUSElectro" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-feus-400 transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/feuselect" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-feus-400 transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:info@feuselectronicsgroup.com" className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-feus-400 transition-all" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-feus-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-600 mb-4">
            FEUS.ai: {POSTURE.shortStatement} {POSTURE.availabilityQualifier}{' '}
            <Link to="/status" className="underline underline-offset-2 hover:text-gray-400">
              Capability status
            </Link>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} FEUS Electronics Group. All rights reserved.
            </p>
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
              <span className="text-sm text-gray-600">
                Privacy Policy and Terms of Service are in legal review and will be published here.
              </span>
              <Link to="/trust/security" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
