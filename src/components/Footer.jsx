import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'
import { CalendlyButton } from './CalendlyEmbed'
import { POSTURE } from '../data/publicStatus'
import BrandMark from './BrandMark'

const footerLinks = {
  Explore: [
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About FEUS', href: '/about' },
    { name: 'Insights', href: '/insights' },
    { name: 'Sales & Media', href: '/sales' },
  ],
  'FEUS.ai': [
    { name: 'FEUS.ai Overview', href: '/feus-ai' },
    { name: 'Agent Portfolio', href: '/agents' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Capability Status', href: '/status' },
    { name: 'Platform FAQ', href: '/faq' },
  ],
  Trust: [
    { name: 'Trust Center', href: '/trust' },
    { name: 'Security', href: '/trust/security' },
    { name: 'Compliance', href: '/trust/compliance' },
    { name: 'Posture History', href: '/release-notes' },
  ],
  Connect: [
    { name: 'Contact FEUS', href: '/contact' },
    { name: 'Request a Demo', href: '/contact?type=demo' },
    { name: 'Service Inquiry', href: '/contact?type=services' },
    { name: 'Media Inquiry', href: '/contact?type=media' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <div className="border-b border-white/10 bg-feus-950/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-accent-300">Start with the outcome</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              Build the next system with clarity and control.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Bring us the business challenge. We will help shape the right services engagement or a capability-scoped FEUS.ai evaluation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CalendlyButton className="btn-primary whitespace-nowrap" icon={ArrowRight}>
              Book a consultation
            </CalendlyButton>
            <Link to="/contact" className="btn-secondary whitespace-nowrap">Send a message</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_2fr]">
          <div className="max-w-md">
            <Link to="/" aria-label="FEUS Electronics Group home" className="inline-flex rounded-lg">
              <BrandMark imageClassName="!h-16 !w-16" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Enterprise technology services and governed intelligence for organizations that need progress without losing control.
            </p>
            <div className="mt-5 flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-feus-300" aria-hidden="true" />
              <span>2208 Hanfred Lane, Suite 104<br />Tucker, GA 30084</span>
            </div>
            <p className="mt-4 flex items-center gap-3 text-sm text-slate-400">
              <Mail className="h-4 w-4 flex-shrink-0 text-feus-300" aria-hidden="true" />
              <a href="mailto:info@feuselectronicsgroup.com" className="hover:text-white">
                info@feuselectronicsgroup.com
              </a>
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <a href="https://www.linkedin.com/company/feus-electronics-group" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 p-3 text-slate-400 transition-colors hover:border-feus-300/40 hover:text-feus-200" aria-label="FEUS on LinkedIn">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com/FEUSElectro" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 p-3 text-slate-400 transition-colors hover:border-feus-300/40 hover:text-feus-200" aria-label="FEUS on Facebook">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/feuselect" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 p-3 text-slate-400 transition-colors hover:border-feus-300/40 hover:text-feus-200" aria-label="FEUS on Instagram">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-bold uppercase text-white">{category}</h3>
                <ul className="mt-5 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="text-sm text-slate-400 transition-colors hover:text-feus-200">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <p className="mb-5 max-w-4xl text-xs leading-relaxed text-slate-500">
            FEUS.ai: {POSTURE.shortStatement} {POSTURE.availabilityQualifier}{' '}
            <Link to="/status" className="underline underline-offset-2 hover:text-slate-300">
              Capability status
            </Link>
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} FEUS Electronics Group. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-sm text-slate-500">
                Privacy Policy and Terms of Service are in legal review and will be published here.
              </span>
              <Link to="/trust/security" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
