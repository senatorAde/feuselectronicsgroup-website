import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, MapPin, CheckCircle2, Building2, Package, ImageIcon,
  Info, Calendar, ShieldCheck,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import {
  PageHero, SectionLabel, SectionHeader, GlowDivider,
} from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SEO from '../components/SEO'
import Gallery from '../components/media/Gallery'
import AssetCard from '../components/media/AssetCard'
import SaleOptionCard from '../components/media/SaleOptionCard'
import PropertyInquiryForm from '../components/media/PropertyInquiryForm'
import ImageSlideshow from '../components/media/ImageSlideshow'
import {
  getListingBySlug, buildAssetImagePath, getCoverImagePath, getSlideshowImagePaths, getTotalImageCount,
} from '../data/propertyListings'

export default function PropertyListingDetailPage() {
  const { slug } = useParams()
  const listing = getListingBySlug(slug)

  if (!listing) {
    return (
      <>
        <SEO title="Listing not found" description="The requested property listing could not be found." />
        <PageHero
          label="Not Found"
          title={<>Listing<br /><span className="gradient-text">Not Found</span></>}
          subtitle="We couldn't find a property listing for this URL. It may have been moved or the link may be incorrect."
        >
          <Link to="/sales/listings" className="btn-primary group">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to all listings
          </Link>
        </PageHero>
      </>
    )
  }

  const heroImage = getCoverImagePath(listing)
  const slides = getSlideshowImagePaths(listing)

  return (
    <>
      <SEO
        title={listing.seo?.title || listing.title}
        description={listing.seo?.description || listing.summary}
        image={listing.seo?.image}
      />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        {heroImage && (
          <div className="absolute inset-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover opacity-[0.1]" />
          </div>
        )}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-feus-600/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/sales/listings"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-feus-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Link>

          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <SectionLabel>{listing.listingType}</SectionLabel>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                {listing.headline || listing.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                {listing.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-feus-400" />
                    {listing.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-400" />
                  {listing.status}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-feus-400" />
                  {getTotalImageCount(listing)} photos
                </span>
              </div>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl">
                {listing.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#inquiry" className="btn-primary group">
                  Request Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#gallery" className="btn-secondary">
                  View Gallery
                </a>
                <CalendlyButton className="btn-accent" icon={Calendar}>
                  Schedule a Viewing
                </CalendlyButton>
              </div>
            </div>

            <div className="lg:col-span-2">
              {slides.length > 0 && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
                  <ImageSlideshow images={slides} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 glow-line" />
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { key: 'property', icon: Building2, ...listing.overview.property },
              { key: 'contents', icon: Package, ...listing.overview.contents },
            ].map((block, i) => {
              const Icon = block.icon
              return (
                <AnimatedSection key={block.key} delay={i * 80}>
                  <div className="glass-card-static p-7 md:p-9 h-full">
                    <div className="w-12 h-12 rounded-xl bg-feus-500/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-feus-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{block.title}</h2>
                    <p className="mt-3 text-gray-400 leading-relaxed">{block.description}</p>
                    {block.bullets?.length > 0 && (
                      <ul className="mt-5 space-y-2.5">
                        {block.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── SALE OPTIONS ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="How To Buy"
            title="Available Individually or Together"
            subtitle="The same listing supports both paths. Pick the option that fits and we'll take it from there."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <SaleOptionCard
              variant="individual"
              title={listing.saleOptions.individual.title}
              description={listing.saleOptions.individual.description}
              price={listing.askingPrice}
              ctaLabel={listing.saleOptions.individual.cta}
              ctaHref="#inquiry"
            />
            <SaleOptionCard
              variant="asIs"
              title={listing.saleOptions.asIs.title}
              description={listing.saleOptions.asIs.description}
              price={listing.bundlePrice}
              ctaLabel={listing.saleOptions.asIs.cta}
              ctaHref="#inquiry"
            />
          </div>
          {listing.pricingNote && (
            <p className="mt-6 text-xs text-gray-500 text-center max-w-2xl mx-auto">
              <Info className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-gray-500" />
              {listing.pricingNote}
            </p>
          )}
        </div>
      </section>

      <GlowDivider />

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="section-gradient py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Media Gallery"
            title="The Property in Detail"
            subtitle="Tap any thumbnail to enlarge. Use arrow keys or the on-screen controls to navigate."
          />
          <Gallery listing={listing} />
        </div>
      </section>

      <GlowDivider />

      {/* ─── ITEMS & FURNISHINGS — FULL INVENTORY ─── */}
      {listing.assets.length > 0 && (
        <section id="featured-items" className="section-dark py-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              label="Items & Furnishings"
              title={<>Full Inventory <span className="gradient-text">— {listing.assets.length} Items</span></>}
              subtitle="Every item in this listing, organised by room and category. Each piece is offered subject to availability — inquire about any single item or a bundle."
            />

            {Object.entries(
              listing.assets.reduce((acc, asset) => {
                const cat = asset.category || 'Other'
                ;(acc[cat] = acc[cat] || []).push(asset)
                return acc
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="mb-14 last:mb-0">
                <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-white/[0.06]">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{category}</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((asset, i) => (
                    <AnimatedSection key={asset.id} delay={i * 40}>
                      <AssetCard
                        image={buildAssetImagePath(listing, asset.image)}
                        alt={asset.title}
                        title={asset.title}
                        description={asset.description}
                        condition={asset.condition}
                        availability={asset.availability}
                        price={asset.price}
                        assetId={asset.id}
                      />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-10 text-center">
              <a href="#inquiry" className="btn-secondary inline-flex items-center">
                Inquire About Any Item Above
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      <GlowDivider />

      {/* ─── INQUIRY ─── */}
      <section id="inquiry" className="section-gradient py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Inquire"
            title="Talk To Us About This Listing"
            subtitle="Send a quick inquiry and we'll respond within one business day."
          />
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card-static p-6">
                <h3 className="text-base font-semibold text-white mb-4">What to expect</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    Response within one business day
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    Confirmation of availability and condition
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    Inventory list and viewing options on request
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    Documented handover through FEUS Media
                  </li>
                </ul>
              </div>
              <div className="glass-card-static p-6">
                <h3 className="text-base font-semibold text-white mb-3">Prefer a live call?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Schedule a 30-minute consultation to walk through the listing in real time.
                </p>
                <CalendlyButton className="btn-accent w-full" icon={Calendar}>
                  Book a Time
                </CalendlyButton>
              </div>
            </div>
            <div className="lg:col-span-3">
              <PropertyInquiryForm listing={listing} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section className="section-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <ShieldCheck className="w-5 h-5 text-feus-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="text-gray-300 font-medium">Disclaimer.</span>{' '}
              {listing.disclaimer}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
