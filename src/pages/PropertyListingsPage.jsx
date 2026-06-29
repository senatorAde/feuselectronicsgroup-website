import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, CheckCircle2, ImageIcon, Boxes } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PageHero, SectionLabel, GlowDivider } from '../components/ui'
import SEO from '../components/SEO'
import ImageSlideshow from '../components/media/ImageSlideshow'
import {
  propertyListings, getSlideshowImagePaths, getTotalImageCount,
} from '../data/propertyListings'

export default function PropertyListingsPage() {
  return (
    <>
      <SEO
        title="Featured Property & Asset Listings"
        description="Active property and asset listings presented by FEUS Media. Browse photo galleries, item details, and inquiry options for each listing."
      />

      <PageHero
        label="FEUS Media & Sales"
        title={
          <>
            Featured Property &<br />
            <span className="gradient-text">Asset Listings</span>
          </>
        }
        subtitle="Browse current listings. Each showcase includes a full media gallery, sales summary, item details, and a direct inquiry channel."
      />

      <GlowDivider />

      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {propertyListings.length === 0 ? (
            <div className="glass-card-static p-12 text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-3">No active listings</h2>
              <p className="text-gray-400 mb-6">
                There are no active listings at the moment. Check back soon, or contact
                FEUS Media to discuss an upcoming sale.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact FEUS Media
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {propertyListings.map((listing, i) => {
                const slides = getSlideshowImagePaths(listing)
                return (
                  <AnimatedSection key={listing.slug} delay={i * 80}>
                    <Link
                      to={`/sales/listings/${listing.slug}`}
                      className="glass-card overflow-hidden block h-full group"
                    >
                      <div className="relative aspect-[16/10] bg-navy-900 overflow-hidden">
                        {slides.length > 0 && (
                          <ImageSlideshow
                            images={slides}
                            showDots={slides.length > 1}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-300 border border-accent-500/30 pointer-events-none">
                          <CheckCircle2 className="w-3 h-3" />
                          {listing.status}
                        </span>
                      </div>
                      <div className="p-7">
                        <SectionLabel>{listing.listingType}</SectionLabel>
                        <h2 className="text-xl font-bold text-white">{listing.title}</h2>
                        {listing.location && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-400">
                            <MapPin className="w-3.5 h-3.5 text-feus-400" />
                            {listing.location}
                          </div>
                        )}
                        <p className="mt-4 text-sm text-gray-400 leading-relaxed line-clamp-3">
                          {listing.summary}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.05] text-gray-300">
                            <ImageIcon className="w-3 h-3 text-feus-400" />
                            {getTotalImageCount(listing)} photos
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.05] text-gray-300">
                            <Boxes className="w-3 h-3 text-accent-400" />
                            {listing.featuredAssets.length} featured items
                          </span>
                        </div>
                        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-feus-300 group-hover:text-feus-200 transition-colors">
                          View listing
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
