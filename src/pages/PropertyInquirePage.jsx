import { useSearchParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, MapPin, CheckCircle2, Tag } from 'lucide-react'
import SEO from '../components/SEO'
import { SectionLabel } from '../components/ui'
import PropertyInquiryForm from '../components/media/PropertyInquiryForm'
import {
  getListingBySlug, buildAssetImagePath, getCoverImagePath,
} from '../data/propertyListings'

/**
 * Standalone inquiry page for property listings.
 *
 * Opened in a new tab from the listing detail page so buyers don't
 * have to scroll past the entire listing to reach the form.
 *
 * URL: /sales/inquire?listing=<slug>[&asset=<id>][&interest=<type>]
 *   - listing  (required) — listing slug
 *   - asset    (optional) — specific item id; if present, the page
 *                           shows the item's image + title as context
 *                           and the form is prefilled accordingly
 *   - interest (optional) — pre-selects the interest dropdown
 */
export default function PropertyInquirePage() {
  const [searchParams] = useSearchParams()
  const listingSlug = searchParams.get('listing')
  const assetId = searchParams.get('asset')

  const listing = listingSlug ? getListingBySlug(listingSlug) : null

  if (!listing) {
    return <Navigate to="/sales/listings" replace />
  }

  const asset = assetId ? listing.assets?.find((a) => a.id === assetId) : null
  const contextImage = asset
    ? buildAssetImagePath(listing, asset.image)
    : getCoverImagePath(listing)
  const contextTitle = asset?.title || listing.title
  const contextDescription = asset?.description || listing.summary
  const contextPrice = asset?.price || listing.askingPrice

  return (
    <>
      <SEO
        title={`Inquire — ${contextTitle}`}
        description={`Send an inquiry about ${contextTitle}. We respond within one business day.`}
      />

      <section className="relative pt-32 pb-24 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-feus-600/10 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/sales/listings/${listing.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-feus-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {listing.title}
          </Link>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* ─── Context card ─── */}
            <aside className="lg:col-span-2">
              <div className="glass-card-static p-6 sticky top-28">
                <SectionLabel>You're inquiring about</SectionLabel>

                {contextImage && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-navy-900 border border-white/[0.06]">
                    <img
                      src={contextImage}
                      alt={contextTitle}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {asset && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent-500 text-white shadow-md">
                        <CheckCircle2 className="w-3 h-3" />
                        Available
                      </span>
                    )}
                  </div>
                )}

                <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {contextTitle}
                </h1>

                {!asset && listing.location && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-feus-400" />
                    {listing.location}
                  </div>
                )}

                {contextDescription && (
                  <p className="mt-4 text-sm text-gray-400 leading-relaxed line-clamp-5">
                    {contextDescription}
                  </p>
                )}

                {contextPrice && (
                  <div className="mt-5 pt-5 border-t border-white/[0.06]">
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">
                      {asset ? 'Item price' : 'Asking price'}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1.5 text-lg font-semibold text-feus-300">
                      <Tag className="w-4 h-4" />
                      {contextPrice}
                    </div>
                  </div>
                )}

                {asset && listing.location && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {listing.location}
                  </div>
                )}
              </div>
            </aside>

            {/* ─── Inquiry form ─── */}
            <div className="lg:col-span-3">
              <PropertyInquiryForm listing={listing} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
