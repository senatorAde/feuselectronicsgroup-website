import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1))
      const scrollToTarget = () => {
        const target = document.getElementById(targetId)
        if (!target) return false
        target.scrollIntoView({ block: 'start' })
        return true
      }

      if (scrollToTarget()) return undefined

      const observer = new MutationObserver(() => {
        if (scrollToTarget()) observer.disconnect()
      })
      observer.observe(document.body, { childList: true, subtree: true })
      const timeout = window.setTimeout(() => observer.disconnect(), 2000)

      return () => {
        observer.disconnect()
        window.clearTimeout(timeout)
      }
    }

    window.scrollTo(0, 0)
    return undefined
  }, [pathname, search, hash])
  return null
}
