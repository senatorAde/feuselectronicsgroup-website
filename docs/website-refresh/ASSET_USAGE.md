# FEUS Website Refresh: Asset Usage

Date: 2026-09-06

## Source Assets

All refresh-specific imagery originates from organization-provided files in `FEUS-Shared/branding`. No third-party stock photography, customer marks, or synthetic customer evidence was added.

| Source | Role | Treatment |
| --- | --- | --- |
| `FEUS-Shared/branding/FEUS logo 2026.png` | Approved primary logo | Resized and encoded for logo, favicon, hero, and social-preview derivatives |
| `FEUS-Shared/branding/DSC_4281.JPG` | Founder portrait | EXIF rotation, attention crop, restrained color adjustment, and WebP encoding |

The superseded `FEUS logo 2023.jpg` and retired `Feus hero banner.jpg` are not used by the refreshed site.

## Generated Outputs

| Public asset | Dimensions | Size | Usage |
| --- | ---: | ---: | --- |
| `/brand/feus-logo-2026.webp` | 720 x 720 | 27,290 bytes | Shared `BrandMark`, navigation, footer, and Organization structured data |
| `/brand/feus-favicon-2026.png` | 96 x 96 | 5,863 bytes | Browser favicon |
| `/brand/feus-hero-system.webp` | 1600 x 1040 | 42,302 bytes | Home, About, Services, Solutions, FEUS.ai, and Contact hero imagery |
| `/brand/feus-social-preview.webp` | 1200 x 630 | 34,168 bytes | Default Open Graph and Twitter preview |
| `/brand/founder-portrait.webp` | 1000 x 1200 | 85,706 bytes | About leadership section |

## Generation Details

The reproducible pipeline is `scripts/generate-brand-assets.mjs`, exposed as:

```powershell
npm run brand:assets
```

The script uses Sharp to:

- create a 720 px WebP logo and 96 px palette PNG favicon;
- composite the approved logo over a generated FEUS circuit/grid field and encode the result as a WebP hero bitmap;
- generate a 1200 x 630 social card with the FEUS name and approved positioning line;
- rotate, crop, resize, lightly desaturate, and encode the founder portrait as WebP.

## Loading and Accessibility

- The homepage hero has explicit dimensions and `fetchPriority="high"` because it is a first-viewport asset.
- Shared page heroes use the same stable background asset and fixed layout dimensions.
- The founder portrait has explicit width and height, uses `loading="lazy"`, and has a descriptive alt attribute naming Dr. Tolu Adeniyi and his role.
- Decorative hero imagery uses empty alternative text because the page heading carries the meaning.
- Logo meaning is supplied by the surrounding home-link label and visible wordmark.
- Generated brand files receive one-day browser caching with a seven-day stale-revalidation window through both hosting configurations.

## Usage Boundaries

- Property and asset photography remains confined to `/sales` routes.
- The generated workflow visual uses semantic HTML, CSS, and Lucide icons; it is explicitly labeled as an illustrative operating model, not disclosed platform architecture.
- Source branding files remain in `FEUS-Shared`; generated web derivatives live in `public/brand` and should not be edited by hand.