import { useState, useCallback } from 'react'
import { Linkedin, Mail, Link2, Check, Facebook, MessageCircle } from 'lucide-react'

/**
 * SocialShare — Enterprise-grade social sharing component.
 *
 * LinkedIn-first sharing with X, Email, and Copy Link support.
 * Uses native share URLs only — no third-party SDKs.
 *
 * @param {string} url        - The URL to share (defaults to current page)
 * @param {string} title      - Share title / headline
 * @param {string} description - Share description (used in email body)
 * @param {string} className  - Additional container classes
 * @param {'horizontal'|'compact'} layout - Layout variant
 */
export default function SocialShare({
  url,
  title = 'FEUS.ai — Governed AI for Enterprise Data Operations',
  description = 'Transform how your organization interacts with data — safely, intelligently, and with full governance.',
  className = '',
  layout = 'horizontal',
}) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://feuselectronicsgroup.com/feus-ai')

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const channels = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: 'Share on LinkedIn',
      primary: true,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Share on Facebook',
      primary: false,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      label: 'Share on WhatsApp',
      primary: false,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      label: 'Share via Email',
      primary: false,
    },
  ]

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [shareUrl])

  return (
    <div className={`flex items-center gap-3 ${className}`} role="group" aria-label="Share this page">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-1">Share</span>

      {channels.map((ch) => (
        <a
          key={ch.name}
          href={ch.href}
          target={ch.name !== 'Email' ? '_blank' : undefined}
          rel={ch.name !== 'Email' ? 'noopener noreferrer' : undefined}
          aria-label={ch.label}
          className={`
            inline-flex items-center justify-center rounded-lg transition-all duration-200
            ${ch.primary
              ? 'gap-2 px-4 py-2 bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40'
              : 'w-9 h-9 bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.16]'
            }
          `}
        >
          <ch.icon className="w-4 h-4" />
          {ch.primary && <span className="text-sm font-medium">LinkedIn</span>}
        </a>
      ))}

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        aria-label={copied ? 'Link copied' : 'Copy link to clipboard'}
        className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
          ${copied
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.16]'
          }
        `}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  )
}

/**
 * X (Twitter) icon — simple inline SVG since lucide's Twitter icon
 * still shows the old bird. This renders the clean "𝕏" mark.
 */
function XIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
