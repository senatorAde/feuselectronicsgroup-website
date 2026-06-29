import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Tag } from 'lucide-react'

/**
 * Reusable card for a single asset/item.
 * - image:         public URL (already URL-encoded)
 * - title:         item name
 * - description:   short description
 * - condition:     "New", "Like New", "Good", "Fair"...
 * - availability:  "Available", "Reserved", "Sold"
 * - price:         string ("$1,200" or "Contact for pricing")
 * - assetId:       passed via ?asset=<id> so the inquiry form pre-fills
 * - inquiryHash:   hash target on the same page (default "#inquiry")
 */
export default function AssetCard({
  image,
  alt,
  title,
  description,
  condition,
  availability = 'Available',
  price,
  assetId,
  inquiryHash = '#inquiry',
}) {
  const isAvailable = availability?.toLowerCase() === 'available'

  return (
    <article className="glass-card overflow-hidden flex flex-col h-full group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
        {image ? (
          <img
            src={image}
            alt={alt || title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
            No image
          </div>
        )}
        {/* Availability badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
            isAvailable
              ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
              : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
          }`}
        >
          {isAvailable && <CheckCircle2 className="w-3 h-3" />}
          {availability}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
        {description && (
          <p className="mt-1.5 text-sm text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          {condition && (
            <div>
              <dt className="text-gray-500 uppercase tracking-wide">Condition</dt>
              <dd className="mt-0.5 text-gray-200 font-medium">{condition}</dd>
            </div>
          )}
          <div>
            <dt className="text-gray-500 uppercase tracking-wide">Price</dt>
            <dd className="mt-0.5 inline-flex items-center gap-1 text-feus-300 font-semibold">
              <Tag className="w-3 h-3" />
              {price}
            </dd>
          </div>
        </dl>

        {(assetId || inquiryHash) && (
          <Link
            to={{
              search: assetId ? `?asset=${encodeURIComponent(assetId)}` : '',
              hash: inquiryHash,
            }}
            className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-feus-300 hover:text-feus-200 transition-colors group/btn"
          >
            Inquire about this item
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </article>
  )
}
