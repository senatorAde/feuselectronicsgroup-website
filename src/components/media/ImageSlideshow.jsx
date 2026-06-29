import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Auto-advancing image slideshow with fade transitions, pause-on-hover,
 * keyboard navigation, dot indicators, and reduced-motion support.
 *
 * Props:
 *   images:    [{ src, alt }] — already-resolved URLs
 *   interval:  ms between advances (default 4500)
 *   className: extra classes for the outer container
 *   showDots:  show pagination dots (default true)
 */
export default function ImageSlideshow({
  images,
  interval = 4500,
  className = '',
  showDots = true,
}) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mql.matches)
    const handler = (e) => setReduceMotion(e.matches)
    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    if (!images?.length || images.length < 2 || isPaused || reduceMotion) return
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => clearTimeout(timerRef.current)
  }, [index, images, isPaused, interval, reduceMotion])

  if (!images?.length) return null

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-navy-900 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Preload neighbouring image so the next fade has no flash */}
      {images.length > 1 && (
        <link
          rel="preload"
          as="image"
          href={images[(index + 1) % images.length].src}
        />
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-navy-950/60 backdrop-blur-sm">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Go to slide ${i + 1} of ${images.length}`}
              aria-current={i === index ? 'true' : 'false'}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIndex(i)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-5 bg-white'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
