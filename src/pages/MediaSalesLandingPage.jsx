import { Link } from 'react-router-dom'
import {
  ArrowRight, Camera, Building2, Tag, Home, Boxes, MessageSquare,
  ImageIcon, CheckCircle2, MapPin,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import {
  PageHero, SectionLabel, SectionHeader, CTAButton, GlowDivider,
} from '../components/ui'
import { CalendlyButton } from '../components/CalendlyEmbed'
import SEO from '../components/SEO'
import ImageSlideshow from '../components/media/ImageSlideshow'
import { propertyListings, getSlideshowImagePaths, getTotalImageCount } from '../data/propertyListings'
import { mediaServices, mediaSalesHighlights } from '../data/mediaServices'

const ICONS = { Camera, Building2, Tag, Home, Boxes, MessageSquare }

export default function MediaSalesLandingPage() {
  const featured = propertyListings[0]

  return (
    <>
      <SEO
        title="FEUS Media & Sales — Property and Asset Showcases"
        description="FEUS Media presents properties, equipment, and business assets with clarity. Showcase pages, asset sales, real estate media, and liquidation workflows — built for buyers and sellers."
        image={featured?.seo?.image}
      />

      <PageHero
        label="FEUS Media & Sales"
        title={
          <>
            Property & Asset Sales,<br />
            <span className="gradient-text">Powered by FEUS Media</span>
          </>
        }
        subtitle="High-quality photography, structured showcase pages, and direct buyer inquiries — for residential property, business assets, and full-property liquidations. Available individually or together as-is."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton to="/sales/listings" variant="primary">
            View Featured Listings
          </CTAButton>
          <CTAButton to="/contact" variant="secondary">
            Talk to FEUS Media
          </CTAButton>
        </div>
      </PageHero>

      {/* ─── CAPABILITIES ─── */}
      <section className="section-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="What We Do"
            title="Media, Sales, and Showcase — In One Place"
            subtitle="From a single item to a full estate, FEUS Media presents what's for sale with the clarity buyers expect and the documentation sellers need."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaServices.map((service, i) => {
              const Icon = ICONS[service.icon] || Camera
              return (
                <AnimatedSection key={service.id} delay={i * 60}>
                  <div className="glass-card p-7 h-full">
                    <div className="w-12 h-12 rounded-xl bg-feus-500/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-feus-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── HIGHLIGHTS ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {mediaSalesHighlights.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 80}>
                <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] h-full">
                  <CheckCircle2 className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1.5">{h.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{h.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ─── FEATURED LISTING ─── */}
      {featured && (
        <section className="section-gradient py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              label="Featured Listing"
              title="Available Now"
              subtitle="A residential property and its complete contents — available individually or together as-is."
            />
            <AnimatedSection>
              <div className="glass-card overflow-hidden grid lg:grid-cols-2 gap-0">
                <div className="relative aspect-[4/3] lg:aspect-auto bg-navy-900 overflow-hidden">
                  <ImageSlideshow
                    images={getSlideshowImagePaths(featured)}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent lg:from-transparent lg:via-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-300 border border-accent-500/30 pointer-events-none">
                    <CheckCircle2 className="w-3 h-3" />
                    {featured.status}
                  </span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <SectionLabel>{featured.listingType}</SectionLabel>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{featured.title}</h3>
                  {featured.location && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-feus-400" />
                      {featured.location}
                    </div>
                  )}
                  <p className="mt-5 text-gray-400 leading-relaxed line-clamp-4">{featured.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.05] text-gray-300">
                      <ImageIcon className="w-3.5 h-3.5 text-feus-400" />
                      {getTotalImageCount(featured)} photos
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.05] text-gray-300">
                      <Boxes className="w-3.5 h-3.5 text-accent-400" />
                      {featured.featuredAssets.length} featured items
                    </span>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={`/sales/listings/${featured.slug}`}
                      className="btn-primary group"
                    >
                      View Listing
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to={`/sales/listings/${featured.slug}#inquiry`}
                      className="btn-secondary"
                    >
                      Request Details
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <GlowDivider />

      {/* ─── CLOSING CTA ─── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card-static p-10 md:p-14 text-center">
              <SectionLabel>Working With FEUS Media</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have property, assets, or inventory to present?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                We&apos;ll capture, structure, and publish your sale with the same care you see on
                the featured listing. From a single asset to a full estate.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <CalendlyButton className="btn-accent group" icon={ArrowRight}>
                  Book a Consultation
                </CalendlyButton>
                <CTAButton to="/contact" variant="secondary">
                  Send a Message
                </CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
