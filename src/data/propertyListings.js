// ─────────────────────────────────────────────────────────────────
// FEUS Media & Sales — Property Listing Data
// ─────────────────────────────────────────────────────────────────
//
// Single source of truth for property/asset sales listings.
// Edit this file to update titles, summaries, pricing, gallery
// groupings, featured assets, and per-listing SEO copy.
//
// HOW TO ADD A NEW LISTING:
//   1. Drop photos under:
//        public/media/Sales/property-sales/<folder name>/<group>/
//      (the on-disk folder name can contain spaces — paths are
//       URL-encoded at render time.)
//   2. Append a new object to `propertyListings` below using the
//      same shape as the existing listing.
//   3. Use a URL-safe, kebab-case `slug` — that becomes the URL
//      `/media-sales/listings/<slug>`.
//   4. List image filenames (not paths) under each gallery group's
//      `images` array, and reference the same relative paths from
//      `featuredAssets[].image`.
//
// TODO markers below indicate copy you should review:
//   • Confirm property location, listing description, and pricing.
//   • Replace placeholder featured-asset titles and prices with
//     real names, descriptions, and dollar amounts.
//   • Confirm inquiry contact details displayed on the detail page.
// ─────────────────────────────────────────────────────────────────

const PROPERTY_SALES_BASE = '/media/Sales/property-sales'

export const propertyListings = [
  {
    slug: '1903-woodsley-ct',
    folderName: '1903 Woodsley Ct', // must match on-disk folder

    // ── Sales summary ─────────────────────────────────────────────
    status: 'Available',
    listingType: 'Residential Property & Contents',
    title: '1903 Woodsley Ct — Property & Contents Sale',
    headline:
      'A Move-In-Ready Residence and Its Curated Contents — Available Individually or Together As-Is',
    location: 'Loganville, GA 30052',
    // Front-elevation shot used as the listing cover (hero, list
    // card, and OG/SEO image). Path is "<gallery folder>/<filename>"
    // relative to the listing folder. Swap this to change the cover
    // without reordering the gallery array.
    coverImage: 'Exterior/DSC_4806.JPG',
    // Curated set rotated by the ImageSlideshow on listing cards and
    // the detail-page hero. Falls back to the entire Exterior gallery
    // when this array is empty/absent.
    slideshowImages: [
      'Exterior/DSC_4806.JPG', // front, face-on (cleanest)
      'Exterior/DSC_4805.JPG', // front, 3/4 angle from left
      'Exterior/DSC_4807.JPG', // front, with vehicle for scale
    ],
    summary:
      'A well-maintained residential property offered with all interior furnishings and contents. Buyers may purchase select items individually, build a multi-item bundle, or acquire the entire home and its contents together in a single as-is transaction. Every transaction is presented and documented through FEUS Media for clarity, trust, and a clean handover.',

    // ── Pricing (placeholders) ────────────────────────────────────
    // TODO: replace placeholders with actual asking prices.
    askingPrice: '$425,000 – $445,000',
    bundlePrice: '$445,000 – $470,000',
    pricingNote:
      'Pricing shown is an indicative range based on the recent Zillow Zestimate (~$436,500) for 1903 Woodsley Ct. Final figures are subject to confirmation in writing following inspection and negotiation.',

    // ── Property + contents overview ──────────────────────────────
    overview: {
      property: {
        title: 'The Property',
        description:
          'A single-family residence in established condition, presented for sale by FEUS Media on behalf of the owner. The building, lot, and existing improvements are conveyed as-is at closing.',
        bullets: [
          'Single-family residential building in Loganville, GA',
          'Established, move-in-ready condition',
          'Off-street parking and outdoor space',
          'Available for individual viewing by appointment',
        ],
      },
      contents: {
        title: 'The Contents',
        description:
          'Interior furnishings, household goods, and select equipment captured across the gallery. Items can be purchased individually, in groups, or together with the property as a single as-is bundle.',
        bullets: [
          'Furniture across living, dining, and bedroom areas',
          'Kitchen appliances and household items',
          'Decor, fixtures, and assorted equipment',
          'Inventory list available on request',
        ],
      },
    },

    // ── Sale options ──────────────────────────────────────────────
    saleOptions: {
      individual: {
        title: 'Buy Individually',
        description:
          'Browse the contents gallery and select the pieces you want. Each item is offered subject to availability and confirmation. Multiple items can be combined into a single inquiry.',
        cta: 'Inquire About Individual Items',
      },
      asIs: {
        title: 'Buy Everything As-Is',
        description:
          'Acquire the property and all of its contents in a single transaction. Sold strictly as-is, where-is, with documentation provided by FEUS Media for a clean handover.',
        cta: 'Inquire About the Full Bundle',
      },
    },

    // ── Gallery groups ────────────────────────────────────────────
    // Filenames are listed directly; folder paths are assembled and
    // URL-encoded at render time via `buildMediaPath()`.
    gallery: [
      {
        id: 'exterior',
        title: 'Exterior & Building',
        description: 'Front, back, and surrounding views of the property.',
        folder: 'Exterior',
        images: [
          'DSC_4797.JPG', 'DSC_4798.JPG', 'DSC_4799.JPG', 'DSC_4800.JPG',
          'DSC_4801.JPG', 'DSC_4802.JPG', 'DSC_4803.JPG', 'DSC_4805.JPG',
          'DSC_4806.JPG', 'DSC_4807.JPG',
        ],
      },
      {
        id: 'interior',
        title: 'Interior',
        description: 'Living spaces, kitchen, bedrooms, and finishes throughout the home.',
        folder: 'interior',
        images: [
          'DSC_4660.JPG', 'DSC_4661.JPG', 'DSC_4662.JPG', 'DSC_4663.JPG',
          'DSC_4664.JPG', 'DSC_4665.JPG', 'DSC_4666.JPG', 'DSC_4669.JPG',
          'DSC_4670.JPG', 'DSC_4671.JPG', 'DSC_4672.JPG', 'DSC_4673.JPG',
          'DSC_4674.JPG', 'DSC_4675.JPG', 'DSC_4677.JPG', 'DSC_4678.JPG',
          'DSC_4679.JPG', 'DSC_4680.JPG', 'DSC_4681.JPG', 'DSC_4682.JPG',
          'DSC_4683.JPG', 'DSC_4684.JPG', 'DSC_4685.JPG', 'DSC_4686.JPG',
          'DSC_4689.JPG', 'DSC_4690.JPG', 'DSC_4691.JPG', 'DSC_4692.JPG',
          'DSC_4694.JPG', 'DSC_4712.JPG', 'DSC_4713.JPG', 'DSC_4714.JPG',
          'DSC_4715.JPG', 'DSC_4716.JPG', 'DSC_4717.JPG', 'DSC_4718.JPG',
          'DSC_4719.JPG', 'DSC_4721.JPG', 'DSC_4723.JPG', 'DSC_4725.JPG',
          'DSC_4726.JPG', 'DSC_4730.JPG', 'DSC_4731.JPG', 'DSC_4732.JPG',
          'DSC_4733.JPG', 'DSC_4735.JPG', 'DSC_4736.JPG', 'DSC_4738.JPG',
          'DSC_4739.JPG', 'DSC_4740.JPG', 'DSC_4741.JPG', 'DSC_4742.JPG',
          'DSC_4744.JPG', 'DSC_4745.JPG', 'DSC_4747.JPG', 'DSC_4754.JPG',
          'DSC_4755.JPG', 'DSC_4756.JPG', 'DSC_4757.JPG', 'DSC_4758.JPG',
          'DSC_4759.JPG', 'DSC_4761.JPG', 'DSC_4771.JPG', 'DSC_4772.JPG',
          'DSC_4773.JPG', 'DSC_4774.JPG', 'DSC_4777.JPG', 'DSC_4778.JPG',
          'DSC_4782.JPG', 'DSC_4783.JPG', 'DSC_4784.JPG', 'DSC_4785.JPG',
          'DSC_4786.JPG',
        ],
      },
      {
        id: 'items',
        title: 'Items & Furnishings',
        description: 'Furniture, fixtures, and items available individually or as part of the bundle.',
        folder: 'items',
        images: [
          'DSC_4626.JPG', 'DSC_4627.JPG', 'DSC_4628.JPG', 'DSC_4629.JPG',
          'DSC_4630.JPG', 'DSC_4631.JPG', 'DSC_4632.JPG', 'DSC_4633.JPG',
          'DSC_4634.JPG', 'DSC_4635.JPG', 'DSC_4636.JPG', 'DSC_4639.JPG',
          'DSC_4640.JPG', 'DSC_4641.JPG', 'DSC_4642.JPG', 'DSC_4643.JPG',
          'DSC_4644.JPG', 'DSC_4645.JPG', 'DSC_4646.JPG', 'DSC_4647.JPG',
          'DSC_4648.JPG', 'DSC_4649.JPG', 'DSC_4650.JPG', 'DSC_4651.JPG',
          'DSC_4652.JPG', 'DSC_4653.JPG', 'DSC_4654.JPG', 'DSC_4655.JPG',
          'DSC_4656.JPG', 'DSC_4657.JPG', 'DSC_4658.JPG', 'DSC_4659.JPG',
          'DSC_4667.JPG', 'DSC_4668.JPG', 'DSC_4676.JPG', 'DSC_4687.JPG',
          'DSC_4693.JPG', 'DSC_4695.JPG', 'DSC_4697.JPG', 'DSC_4698.JPG',
          'DSC_4699.JPG', 'DSC_4700.JPG', 'DSC_4701.JPG', 'DSC_4702.JPG',
          'DSC_4704.JPG', 'DSC_4706.JPG', 'DSC_4707.JPG', 'DSC_4708.JPG',
          'DSC_4709.JPG', 'DSC_4710.JPG', 'DSC_4711.JPG', 'DSC_4720.JPG',
          'DSC_4724.JPG', 'DSC_4727.JPG', 'DSC_4729.JPG', 'DSC_4737.JPG',
          'DSC_4743.JPG', 'DSC_4746.JPG', 'DSC_4748.JPG', 'DSC_4762.JPG',
          'DSC_4766.JPG', 'DSC_4768.JPG', 'DSC_4769.JPG', 'DSC_4770.JPG',
          'DSC_4775.JPG', 'DSC_4776.JPG', 'DSC_4787.JPG', 'DSC_4788.JPG',
        ],
      },
    ],

    // ── Featured assets ───────────────────────────────────────────
    // These cards appear in the "Featured Items" section.
    // TODO: rename, describe, condition, and price each item.
    // `image` is "<gallery folder>/<filename>" relative to the
    // listing folder; paths are URL-encoded at render time.
    featuredAssets: [
      {
        id: 'asset-01',
        title: 'TODO: Featured item #1',
        description: 'TODO: Brief description of this item (material, dimensions, notable details).',
        condition: 'Good',
        availability: 'Available',
        price: 'Contact for pricing',
        image: 'items/DSC_4626.JPG',
      },
      {
        id: 'asset-02',
        title: 'TODO: Featured item #2',
        description: 'TODO: Brief description of this item.',
        condition: 'Good',
        availability: 'Available',
        price: 'Contact for pricing',
        image: 'items/DSC_4630.JPG',
      },
      {
        id: 'asset-03',
        title: 'TODO: Featured item #3',
        description: 'TODO: Brief description of this item.',
        condition: 'Good',
        availability: 'Available',
        price: 'Contact for pricing',
        image: 'items/DSC_4640.JPG',
      },
      {
        id: 'asset-04',
        title: 'TODO: Featured item #4',
        description: 'TODO: Brief description of this item.',
        condition: 'Good',
        availability: 'Available',
        price: 'Contact for pricing',
        image: 'items/DSC_4650.JPG',
      },
      {
        id: 'asset-05',
        title: 'TODO: Featured item #5',
        description: 'TODO: Brief description of this item.',
        condition: 'Good',
        availability: 'Available',
        price: 'Contact for pricing',
        image: 'items/DSC_4697.JPG',
      },
      {
        id: 'asset-06',
        title: 'TODO: Featured item #6',
        description: 'TODO: Brief description of this item.',
        condition: 'Good',
        availability: 'Available',
        price: 'Contact for pricing',
        image: 'items/DSC_4710.JPG',
      },
    ],

    // ── Disclaimer ────────────────────────────────────────────────
    disclaimer:
      'All listings, items, pricing, and condition descriptions are presented in good faith and are subject to final confirmation in writing. Availability may change without notice. Buyers are encouraged to inspect items in person where practical. The property and its contents are offered strictly as-is, where-is.',

    // ── SEO ───────────────────────────────────────────────────────
    seo: {
      title: '1903 Woodsley Ct — Property & Contents for Sale in Loganville, GA',
      description:
        'A residential property in Loganville, Georgia and its complete contents, available individually or together as-is. Showcased by FEUS Media — high-quality photography, transparent listings, and a direct inquiry channel.',
      image: '/media/Sales/property-sales/1903 Woodsley Ct/Exterior/DSC_4806.JPG',
    },
  },
]

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

export function getListingBySlug(slug) {
  return propertyListings.find((listing) => listing.slug === slug)
}

/**
 * Build a public URL for an image inside a gallery group.
 * Spaces and other reserved characters in the folder name are
 * URL-encoded so the existing on-disk folder structure works as-is.
 */
export function buildMediaPath(listing, folder, filename) {
  return encodeURI(`${PROPERTY_SALES_BASE}/${listing.folderName}/${folder}/${filename}`)
}

/**
 * Build a public URL for a featured-asset image. `relativePath`
 * is "<folder>/<filename>" relative to the listing's root folder.
 */
export function buildAssetImagePath(listing, relativePath) {
  return encodeURI(`${PROPERTY_SALES_BASE}/${listing.folderName}/${relativePath}`)
}

/**
 * Returns the URL of the listing's cover/hero image. Falls back to
 * the first photo of the first gallery group when `coverImage` is
 * not set.
 */
export function getCoverImagePath(listing) {
  if (listing.coverImage) {
    return buildAssetImagePath(listing, listing.coverImage)
  }
  const firstGroup = listing.gallery?.[0]
  const firstFile = firstGroup?.images?.[0]
  if (firstGroup && firstFile) {
    return buildMediaPath(listing, firstGroup.folder, firstFile)
  }
  return null
}

/**
 * Returns a curated set of {src, alt} entries for the listing
 * slideshow. Uses listing.slideshowImages when provided, otherwise
 * falls back to every photo in the first gallery group (typically
 * the Exterior set).
 */
export function getSlideshowImagePaths(listing) {
  if (listing.slideshowImages?.length) {
    return listing.slideshowImages.map((relativePath, i) => ({
      src: buildAssetImagePath(listing, relativePath),
      alt: `${listing.title} — view ${i + 1}`,
    }))
  }
  const firstGroup = listing.gallery?.[0]
  if (!firstGroup?.images?.length) return []
  return firstGroup.images.map((filename, i) => ({
    src: buildMediaPath(listing, firstGroup.folder, filename),
    alt: `${listing.title} — ${firstGroup.title} ${i + 1}`,
  }))
}

/**
 * Convenience: total image count across all gallery groups.
 */
export function getTotalImageCount(listing) {
  return listing.gallery.reduce((sum, group) => sum + group.images.length, 0)
}
