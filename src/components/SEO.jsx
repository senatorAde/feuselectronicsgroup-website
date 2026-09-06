import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'FEUS Electronics Group'
const ORIGIN = 'https://feuselectronicsgroup.com'

function setMeta(name, content, useProperty = false) {
  if (content == null || content === '') return
  const attr = useProperty ? 'property' : 'name'
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"][data-seo]`)
  if (!href) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('data-seo', '')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Imperatively sets <title> and meta tags on mount and route change.
 * Keeps SEO per-page without adding react-helmet as a dependency.
 *
 * noindex: set true on routes that must not be indexed (approved claims
 * baseline — e.g. /copilot, /pricing, /demo).
 */
export default function SEO({
  title,
  description,
  image = '/brand/feus-social-preview.webp',
  imageAlt = 'FEUS Electronics Group brand mark and enterprise technology message',
  type = 'website',
  noindex = false,
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', noindex ? null : `${ORIGIN}${pathname}`)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:type', type, true)
    setMeta('og:url', `${ORIGIN}${pathname}`, true)
    setMeta('og:site_name', SITE_NAME, true)

    if (image) {
      const fullImage = image.startsWith('http')
        ? image
        : `${ORIGIN}${encodeURI(image)}`
      setMeta('og:image', fullImage, true)
      setMeta('og:image:alt', imageAlt, true)
      setMeta('twitter:image', fullImage)
      setMeta('twitter:image:alt', imageAlt)
      setMeta('twitter:card', 'summary_large_image')
    } else {
      setMeta('twitter:card', 'summary')
    }
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [title, description, image, imageAlt, type, noindex, pathname])

  return null
}
