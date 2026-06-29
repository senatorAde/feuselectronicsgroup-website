import { useEffect, useMemo, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { buildMediaPath } from '../../data/propertyListings'

/**
 * Tabbed responsive gallery with a framer-motion lightbox.
 *
 * Props:
 *   listing — full listing object (uses listing.folderName + listing.gallery)
 *   groups  — optional override for which gallery groups to render
 */
export default function Gallery({ listing, groups }) {
  const renderGroups = groups || listing.gallery
  const [activeId, setActiveId] = useState(renderGroups[0]?.id)
  const activeGroup = useMemo(
    () => renderGroups.find((g) => g.id === activeId) || renderGroups[0],
    [renderGroups, activeId]
  )

  // Lightbox state: index inside the active group's images, or null
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + activeGroup.images.length) % activeGroup.images.length
    )
  }, [activeGroup])
  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % activeGroup.images.length
    )
  }, [activeGroup])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, close, prev, next])

  if (!renderGroups?.length) return null

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2 mb-8">
        {renderGroups.map((group) => {
          const isActive = group.id === activeGroup.id
          return (
            <button
              key={group.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveId(group.id)
                setLightboxIndex(null)
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                isActive
                  ? 'bg-feus-500/15 border-feus-500/40 text-feus-200'
                  : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              {group.title}
              <span className="text-[11px] text-gray-500">{group.images.length}</span>
            </button>
          )
        })}
      </div>

      {/* Group description */}
      {activeGroup.description && (
        <p className="text-sm text-gray-400 mb-6 max-w-3xl">{activeGroup.description}</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {activeGroup.images.map((filename, idx) => {
          const src = buildMediaPath(listing, activeGroup.folder, filename)
          const alt = `${activeGroup.title} — ${listing.title} — image ${idx + 1}`
          return (
            <button
              key={`${activeGroup.id}-${filename}`}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-navy-900 border border-white/[0.05] hover:border-feus-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-feus-500/50"
              aria-label={`Open image ${idx + 1} of ${activeGroup.images.length}`}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white transition-all"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 rounded-lg bg-white/[0.06] text-xs text-gray-300 font-medium tracking-wide">
              {lightboxIndex + 1} / {activeGroup.images.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.img
              key={activeGroup.images[lightboxIndex]}
              src={buildMediaPath(listing, activeGroup.folder, activeGroup.images[lightboxIndex])}
              alt={`${activeGroup.title} — image ${lightboxIndex + 1}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
