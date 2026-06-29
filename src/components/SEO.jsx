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

/**
 * Imperatively sets <title> and meta tags on mount and route change.
 * Keeps SEO per-page without adding react-helmet as a dependency.
 */
export default function SEO({ title, description, image, type = 'website' }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    setMeta('description', description)
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
      setMeta('twitter:image', fullImage)
      setMeta('twitter:card', 'summary_large_image')
    } else {
      setMeta('twitter:card', 'summary')
    }
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [title, description, image, type, pathname])

  return null
}
