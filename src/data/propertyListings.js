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
//      `assets[].image`.
//
// TODO markers below have been resolved — location, pricing, cover
// image, slideshow images, and full item inventory are populated
// for 1903 Woodsley Ct. Refine copy as the listing evolves.
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
    // the detail-page hero. Alternates front-elevation shots with
    // interior "wow" shots for a curb-appeal → inside-reveal cadence.
    // Falls back to the entire Exterior gallery when this array is
    // empty/absent.
    slideshowImages: [
      'Exterior/DSC_4806.JPG', // front, face-on (cleanest)
      'interior/DSC_4660.JPG', // open-concept great room (living + dining + kitchen)
      'Exterior/DSC_4805.JPG', // front, 3/4 angle from left
      'interior/DSC_4712.JPG', // formal living room (bright, neutral, staged)
      'Exterior/DSC_4807.JPG', // front, with vehicle for scale
    ],
    summary:
      'A well-maintained residential property offered with all interior furnishings and contents. Buyers may purchase select items individually, build a multi-item bundle, or acquire the entire home and its contents together in a single as-is transaction. Every transaction is presented and documented through FEUS Media for clarity, trust, and a clean handover.',

    // ── Pricing (approximate ranges) ─────────────────────────────────────
    // Ranges anchored to the most recent Zillow Zestimate of
    // ~$436,500 for 1903 Woodsley Ct (3 bd / 3 ba / 2,576 sqft).
    // Refine when a formal valuation is in hand.
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

    // ── Inventory of items ────────────────────────────────────────
    // Full curated list of furniture, decor, and household items
    // available for individual purchase or as part of the bundle.
    // Each item is described from visual inspection of the on-site
    // photography; prices reflect typical resale value in the
    // metro Atlanta market and are subject to confirmation.
    // `image` is "<gallery folder>/<filename>" relative to the
    // listing folder; paths are URL-encoded at render time.
    assets: [
      // ── Living Room ──
      {
        id: 'marble-top-coffee-table-x-base',
        title: 'Marble-Top Coffee Table with X-Base',
        category: 'Living Room',
        image: 'items/DSC_4626.JPG',
        description: 'Travertine-style stone top with clipped corners on a dark espresso wood X-brace base. Lower display shelf for added storage.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$185',
      },
      {
        id: 'travertine-side-table-metal-frame',
        title: 'Travertine-Top Side Table with Metal Frame',
        category: 'Living Room',
        image: 'items/DSC_4641.JPG',
        description: 'Travertine stone top with clipped corners on an industrial-style metal frame. Lower decorative shelf with woven basket-pattern panel.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$165',
      },
      {
        id: 'dark-wood-glass-center-coffee-table',
        title: 'Contemporary Coffee Table with Glass Center & Nesting Side Tables',
        category: 'Living Room',
        image: 'items/DSC_4706.JPG',
        description: 'Dark wood cylindrical coffee table with glass top center panel. Includes two smaller nesting round side tables with white tops and chrome feet.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$285',
      },
      {
        id: 'glass-top-console-table',
        title: 'Glass-Top Console Table',
        category: 'Living Room',
        image: 'items/DSC_4706.JPG',
        description: 'Elegant rectangular console table with glass top and metal frame. Ideal for entry halls, behind sofas, or display use.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$225',
      },
      {
        id: 'cognac-leather-power-reclining-sectional',
        title: 'Cognac Leather Power-Reclining Sectional Sofa',
        category: 'Living Room',
        image: 'items/DSC_4650.JPG',
        description: 'Premium leather multi-seater reclining sectional with power recline mechanisms, side and center cup holders, and console storage. High-end home-theater seating.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$1,450',
      },
      {
        id: 'cream-three-seater-sofa',
        title: 'Cream Three-Seater Sofa with Gold Accent Cushions',
        category: 'Living Room',
        image: 'items/DSC_4708.JPG',
        description: 'Transitional three-seater sofa in cream upholstery with decorative gold and cream accent cushions and dark wood legs.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$495',
      },
      {
        id: 'cream-loveseat',
        title: 'Cream Upholstered Loveseat',
        category: 'Living Room',
        image: 'items/DSC_4702.JPG',
        description: 'Transitional two-seater loveseat in cream upholstery with decorative gold and cream accent cushions and dark wood legs. Pairs with the cream three-seater sofa.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$325',
      },
      {
        id: 'cream-armchair',
        title: 'Cream Upholstered Armchair',
        category: 'Living Room',
        image: 'items/DSC_4701.JPG',
        description: 'Classic transitional armchair in cream upholstery with dark wood legs. Comfortable accent seating; pairs with the cream sofa set.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$265',
      },
      {
        id: 'beige-woven-wingback-armchair',
        title: 'Beige Woven Wingback Armchair with Fringe Trim',
        category: 'Living Room',
        image: 'items/DSC_4787.JPG',
        description: 'Classic wingback armchair in beige woven upholstery with rolled arms, dark cherry wood legs, and decorative fringe trim on the arms.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$385',
      },
      {
        id: 'bronze-floor-leaning-mirror',
        title: 'Tall Floor-Leaning Mirror with Bronze Frame',
        category: 'Living Room',
        image: 'items/DSC_4659.JPG',
        description: 'Tall leaning mirror with dark espresso/bronze finish wood frame. Creates the illusion of space in any room.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$185',
      },
      {
        id: 'gold-frame-standing-mirror',
        title: 'Standing Floor Mirror with Gold Frame',
        category: 'Living Room',
        image: 'items/DSC_4695.JPG',
        description: 'Tall standing/leaning mirror with gold finish frame. Pairs well with console tables and brightens any room.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$145',
      },

      // ── Dining ──
      {
        id: 'contemporary-dining-table',
        title: 'Contemporary Dining Table',
        category: 'Dining',
        image: 'items/DSC_4667.JPG',
        description: 'Modern dining table with cream/light wood top and metal frame featuring a glass center-panel detail. Seats four to six.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$425',
      },
      {
        id: 'beige-linen-dining-chairs-set-4',
        title: 'Beige Linen Dining Chairs (Set of 4)',
        category: 'Dining',
        image: 'items/DSC_4668.JPG',
        description: 'Set of four cream linen dining chairs with subtle gold geometric detail on the seat back. Elegant transitional styling that matches the dining table.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$320',
      },

      // ── Bedroom ──
      {
        id: 'cherry-wood-platform-bed-leather-headboard',
        title: 'Cherry Wood Platform Bed with Upholstered Headboard',
        category: 'Bedroom',
        image: 'items/DSC_4729.JPG',
        description: 'Solid cherry wood platform bed frame with a dark leather upholstered curved headboard and decorative nailhead trim.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$745',
      },
      {
        id: 'cherry-six-drawer-dresser-mirror',
        title: 'Cherry Wood Six-Drawer Dresser with Mirror',
        category: 'Bedroom',
        image: 'items/DSC_4727.JPG',
        description: 'Cherry/cognac-finish six-drawer dresser with a decorative wooden mirror frame in the matching finish.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$425',
      },
      {
        id: 'cherry-dresser-rococo-mirror',
        title: 'Cherry Wood Dresser with Curved Drawers & Rococo Mirror',
        category: 'Bedroom',
        image: 'items/DSC_4768.JPG',
        description: 'Quality cherry wood dresser with curved drawer fronts, ornate brass hardware, and an ornate Rococo-style mirror frame with gold-leaf accents and shell detail.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$565',
      },
      {
        id: 'purple-floral-bedding-set',
        title: 'Eggplant Floral Bedding Set with Embroidery',
        category: 'Bedroom',
        image: 'items/DSC_4724.JPG',
        description: 'Bedding ensemble in dark eggplant/purple with floral pattern and white embroidered details. Includes bed skirt and coordinated linens.',
        condition: 'Good',
        availability: 'Available',
        price: '$95',
      },

      // ── Lighting ──
      {
        id: 'black-urn-pedestal-lamp-cream-shade',
        title: 'Bronze Urn Pedestal Lamp with Cream Drum Shade',
        category: 'Lighting',
        image: 'items/DSC_4640.JPG',
        description: 'Dark metal pedestal lamp with a classical urn-shaped base and cream linen drum shade. Classic transitional style; ~30 in. tall.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$95',
      },
      {
        id: 'brass-urn-pedestal-lamp',
        title: 'Brass Urn Pedestal Lamp with White Drum Shade',
        category: 'Lighting',
        image: 'items/DSC_4697.JPG',
        description: 'Tapered brass-finish pedestal lamp with an urn-shaped base and white linen drum shade. Classic transitional lighting.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$85',
      },
      {
        id: 'gold-candlestick-chandelier',
        title: 'Gold Candlestick-Style Chandelier',
        category: 'Lighting',
        image: 'items/DSC_4667.JPG',
        description: 'Brass/gold-finish chandelier with candlestick styling and faux candle details. Dining-room statement lighting.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$185',
      },
      {
        id: 'brushed-brass-ceiling-fan',
        title: 'Brushed-Brass Ceiling Fan with Integrated Light',
        category: 'Lighting',
        image: 'items/DSC_4770.JPG',
        description: 'Brushed brass/gold-finish ceiling fan with five reversible wood blades (dark/light) and integrated downlight with frosted dome. Cathedral/vaulted-ceiling compatible.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$165',
      },
      {
        id: 'tiered-pillar-candle-stand',
        title: 'White Tiered Pillar Candle Stand',
        category: 'Lighting',
        image: 'items/DSC_4631.JPG',
        description: 'Multi-tiered white stand designed to hold pillar candles at varying heights. Decorative and functional.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$28',
      },

      // ── Storage ──
      {
        id: 'ornate-brass-door-bar-cabinet',
        title: 'Ornate Brass-Door Bar Cabinet',
        category: 'Storage',
        image: 'items/DSC_4658.JPG',
        description: 'Decorative bar/buffet cabinet with ornate brass doors featuring a mandala carving, solid wood middle and right sections, and a glass display interior.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$425',
      },
      {
        id: 'tall-narrow-display-shelving',
        title: 'Tall Narrow Multi-Shelf Display Unit',
        category: 'Storage',
        image: 'items/DSC_4636.JPG',
        description: 'Tall narrow wooden display unit with multiple staggered shelves. Ideal for plants, books, decor, and collectibles.',
        condition: 'Good',
        availability: 'Available',
        price: '$125',
      },
      {
        id: 'metal-floor-plant-stand-shelves',
        title: 'Metal Floor Plant Stand with Multiple Shelves',
        category: 'Storage',
        image: 'items/DSC_4709.JPG',
        description: 'Ornamental metal plant stand with scroll/filigree top and three display shelves. Suitable for plants, books, and collectibles.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$85',
      },
      {
        id: 'weathered-metal-ornate-shelf',
        title: 'Weathered Metal Decorative Shelf with Filigree',
        category: 'Storage',
        image: 'items/DSC_4743.JPG',
        description: 'Vintage-style metal display shelf with ornate cut-out filigree pattern in weathered gray finish, glass top insert, and white interior.',
        condition: 'Good',
        availability: 'Available',
        price: '$135',
      },

      // ── Kitchen / Appliances ──
      {
        id: 'compact-refrigerator-magic-chef',
        title: 'Magic Chef Compact Refrigerator',
        category: 'Kitchen',
        image: 'items/DSC_4766.JPG',
        description: 'Stainless-steel compact refrigerator with black trim and top freezer section. Suitable for bedroom, office, or dorm use. Appears fully functional.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$145',
      },
      {
        id: 'flat-screen-tv-40-50in',
        title: 'Flat-Screen TV (40–50 in.)',
        category: 'Kitchen',
        image: 'items/DSC_4762.JPG',
        description: 'Modern flat-screen television, approximately 40–50 inches. Appears to be in working condition. Mounting hardware sold separately.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$245',
      },

      // ── Plants & Greenery ──
      {
        id: 'tall-faux-tree-bronze-planter',
        title: 'Tall Faux Tree (~5 ft) in Glazed Bronze Planter',
        category: 'Plants',
        image: 'items/DSC_4630.JPG',
        description: 'Realistic silk tree on a wood-look trunk, set in a tall glazed bronze ceramic planter. Floor-standing accent for entryways or living areas.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$65',
      },
      {
        id: 'areca-palm-metal-stand',
        title: 'Tall Areca Palm on Black Metal Stand',
        category: 'Plants',
        image: 'items/DSC_4710.JPG',
        description: 'Large Areca palm (or similar tropical) with delicate green fronds in a black pot on a decorative black metal plant stand.',
        condition: 'Good',
        availability: 'Available',
        price: '$65',
      },
      {
        id: 'flowering-plant-wicker-basket',
        title: 'Flowering Plant in Wicker Basket on Black Stand',
        category: 'Plants',
        image: 'items/DSC_4700.JPG',
        description: 'Flowering plant (white hydrangea + yellow blooms) in a woven wicker basket pot on a black metal plant stand with round base.',
        condition: 'Good',
        availability: 'Available',
        price: '$48',
      },
      {
        id: 'white-ribbed-planter-wood-legs',
        title: 'White Ribbed Ceramic Planter on Wood Legs',
        category: 'Plants',
        image: 'items/DSC_4635.JPG',
        description: 'White ceramic planter with vertical ribbed texture mounted on wooden legs. Mid-century modern styling.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$48',
      },
      {
        id: 'small-eucalyptus-ceramic-pot',
        title: 'Small Eucalyptus in Glazed Ceramic Pot',
        category: 'Plants',
        image: 'items/DSC_4632.JPG',
        description: 'Faux eucalyptus arrangement in a white glazed ceramic pot with textured ribbed pattern. Tabletop or shelf accent.',
        condition: 'Good',
        availability: 'Available',
        price: '$18',
      },
      {
        id: 'small-plant-burlap-pot',
        title: 'Small Plant in Burlap-Wrapped Pot',
        category: 'Plants',
        image: 'items/DSC_4654.JPG',
        description: 'Small succulent/house plant in a burlap-wrapped ceramic pot with dried grasses and wheat stems. Rustic shelf accent.',
        condition: 'Good',
        availability: 'Available',
        price: '$28',
      },
      {
        id: 'small-white-orchid',
        title: 'Small White Orchid in Ceramic Pot',
        category: 'Plants',
        image: 'items/DSC_4667.JPG',
        description: 'Live white orchid plant in a ceramic pot. Elegant tabletop or dining centerpiece.',
        condition: 'Good',
        availability: 'Available',
        price: '$35',
      },
      {
        id: 'pink-potted-orchid',
        title: 'Pink Potted Orchid',
        category: 'Plants',
        image: 'items/DSC_4727.JPG',
        description: 'Live pink orchid plant in a ceramic pot. Elegant bedroom or dresser accent.',
        condition: 'Good',
        availability: 'Available',
        price: '$32',
      },

      // ── Wall Art ──
      {
        id: 'brass-gold-metal-floral-wall-art',
        title: 'Brass & Gold Metal Floral Wall Sculpture',
        category: 'Wall Art',
        image: 'items/DSC_4644.JPG',
        description: 'Mixed-metal sculptural wall décor: a cluster of brass and gold flower blossoms in various finishes. Statement piece for a large wall.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$245',
      },
      {
        id: 'gold-white-metal-floral-wall-decor',
        title: 'Gold & White Metal Floral Wall Decorations (Pair)',
        category: 'Wall Art',
        image: 'items/DSC_4687.JPG',
        description: 'Pair of decorative wall-mounted metal floral pieces with scrolled leaves in white, silver, and cream finishes. Contemporary botanical art.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$85',
      },
      {
        id: 'gold-white-fan-wall-decor',
        title: 'Gold & White Fan-Shaped Wall Decor (Set)',
        category: 'Wall Art',
        image: 'items/DSC_4709.JPG',
        description: 'Set of decorative fan-shaped metal wall art in gold and white finishes. Contemporary botanical/geometric styling.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$72',
      },
      {
        id: 'blessing-wall-plaques-set-4',
        title: 'Embossed Pillow-Shaped Blessing Wall Plaques (Set of 4)',
        category: 'Wall Art',
        image: 'items/DSC_4693.JPG',
        description: 'Set of four embossed metal wall plaques with inspirational text: "Bless our home", "Give Thanks", "As for me and my house we will serve", and "Love One Another". Mixed metallic finishes.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$65',
      },
      {
        id: 'decorative-metal-wall-plaques',
        title: 'Decorative Metal Wall Plaques (Pair)',
        category: 'Wall Art',
        image: 'items/DSC_4720.JPG',
        description: 'Pair of decorative brass/gold metal wall plaques with ornate carved designs. Diamond-shaped and rectangular vertical styles.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$95',
      },
      {
        id: 'abstract-watercolor-wall-art',
        title: 'Abstract Watercolor Wall Art',
        category: 'Wall Art',
        image: 'items/DSC_4702.JPG',
        description: 'Contemporary abstract watercolor with yellow and blue tones, framed in dark wood. Modern art suitable for living spaces.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$125',
      },
      {
        id: 'abstract-textured-canvas-wall-art-pair',
        title: 'Abstract Textured Canvas Wall Art (Pair)',
        category: 'Wall Art',
        image: 'items/DSC_4748.JPG',
        description: 'Set of two contemporary canvas paintings with horizontal wave/fiber brushstroke texture in cream and gray tones with subtle silver accents.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$185',
      },
      {
        id: 'framed-floral-wall-art-bedroom',
        title: 'Framed Floral Wall Art (Purple & White)',
        category: 'Wall Art',
        image: 'items/DSC_4724.JPG',
        description: 'Botanical/floral painting featuring purple and white flowers on a dark background, in a decorative frame.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$125',
      },
      {
        id: 'aqua-succulent-wall-sculpture',
        title: 'Aqua Succulent Flower Wall Sculpture',
        category: 'Wall Art',
        image: 'items/DSC_4743.JPG',
        description: 'Decorative wall-mounted sculpture of an aqua/turquoise succulent flower. Contemporary botanical accent.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$38',
      },

      // ── Decor & Accents ──
      {
        id: 'striped-ceramic-pitcher',
        title: 'Striped Ceramic Decorative Pitcher',
        category: 'Decor & Accents',
        image: 'items/DSC_4631.JPG',
        description: 'Hand-painted ceramic pitcher with multicolor striped pattern. Suitable for display or functional use.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$35',
      },
      {
        id: 'wooden-wing-sculpture',
        title: 'Carved Wooden Wing Sculpture on Block Base',
        category: 'Decor & Accents',
        image: 'items/DSC_4634.JPG',
        description: 'Hand-carved wooden wing-shaped sculpture mounted on a natural wood block base. Abstract artistic accent.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$55',
      },
      {
        id: 'white-resin-mandala-sculpture',
        title: 'White Resin Mandala Sculpture on Black Stand',
        category: 'Decor & Accents',
        image: 'items/DSC_4634.JPG',
        description: 'White resin sculptural piece with floral/mandala-inspired carved design mounted on a black metal stand. Contemporary décor.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$45',
      },
      {
        id: 'white-gold-ombre-vase',
        title: 'White & Gold Ombre Decorative Vase',
        category: 'Decor & Accents',
        image: 'items/DSC_4635.JPG',
        description: 'Ceramic vase with white-to-gold gradient finish. Contemporary styling for dried or fresh florals.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$42',
      },
      {
        id: 'yellow-decorative-boat-dish',
        title: 'Yellow Decorative Boat Dish',
        category: 'Decor & Accents',
        image: 'items/DSC_4635.JPG',
        description: 'Ceramic shallow boat-shaped vessel in warm yellow. Tabletop décor or functional catch-all for keys/jewelry.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$32',
      },
      {
        id: 'dried-floral-wicker-pot',
        title: 'Dried Floral Arrangement in Wicker Pot',
        category: 'Decor & Accents',
        image: 'items/DSC_4653.JPG',
        description: 'Natural dried flowers and grasses in neutral tones arranged in a woven wicker/basket-style pot. Low-maintenance floor arrangement.',
        condition: 'Good',
        availability: 'Available',
        price: '$52',
      },
      {
        id: 'white-silk-floral-urn',
        title: 'White Silk Floral Arrangement in Ceramic Urn',
        category: 'Decor & Accents',
        image: 'items/DSC_4655.JPG',
        description: 'Premium silk lilies and hydrangeas with greenery in a white ceramic urn with subtle gold accents. High-end faux arrangement.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$68',
      },
      {
        id: 'decorative-tabletop-tree',
        title: 'Decorative Tabletop Tree with Gold & Red Ornaments',
        category: 'Decor & Accents',
        image: 'items/DSC_4656.JPG',
        description: 'Artificial decorative tree with green branches and mixed metallic ornaments, set in a burlap-wrapped pot with dried grasses. Year-round or holiday décor.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$42',
      },
      {
        id: 'tall-gold-vase-dried-flowers',
        title: 'Tall Gold Vase with Dried Floral Arrangement',
        category: 'Decor & Accents',
        image: 'items/DSC_4657.JPG',
        description: 'Ornate gold/brass-finish tall vase filled with dried orchids, grasses, and golden wheat stems. Elegant floor arrangement.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$75',
      },
      {
        id: 'tall-brass-chevron-floor-vase',
        title: 'Tall Brass Chevron Floor Vase with Dried Arrangement',
        category: 'Decor & Accents',
        image: 'items/DSC_4676.JPG',
        description: 'Tall decorative brass floor vase with weave/chevron pattern, filled with dried burgundy curly branches and golden grasses.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$95',
      },
      {
        id: 'tall-white-ceramic-pampas-arrangement',
        title: 'Tall White Ceramic Vessel with Pampas Grass Arrangement',
        category: 'Decor & Accents',
        image: 'items/DSC_4709.JPG',
        description: 'Large white ceramic pedestal vessel filled with dried pampas grass, golden wheat, white twisted branches, and decorative gold feathers.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$62',
      },
      {
        id: 'ornate-dark-metal-lantern',
        title: 'Ornate Dark Metal Tall Lantern',
        category: 'Decor & Accents',
        image: 'items/DSC_4746.JPG',
        description: 'Tall decorative metal lantern with ornate laser-cut filigree pattern in a dark finish. Polished top surface.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$78',
      },
      {
        id: 'large-wall-clock-roman-numerals',
        title: 'Large Decorative Wall Clock with Roman Numerals',
        category: 'Decor & Accents',
        image: 'items/DSC_4775.JPG',
        description: 'Statement wall clock with black steel frame and double concentric rings featuring gold Roman numerals on a geometric grid background.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$98',
      },
      {
        id: 'flower-garland-bed-wreaths',
        title: 'Pink & White Flower Garland Wreaths',
        category: 'Decor & Accents',
        image: 'items/DSC_4724.JPG',
        description: 'Decorative garland wreaths with pink and white silk flowers, attached to bed-frame posts as ornamental bedroom accents.',
        condition: 'Excellent',
        availability: 'Available',
        price: '$48',
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
