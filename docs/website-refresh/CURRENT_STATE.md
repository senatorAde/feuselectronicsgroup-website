# FEUS Website Refresh: Current State

Date: 2026-09-05

## Executive Summary

The website has a sound technical base and unusually strong public-claims controls, but its presentation does not yet match the breadth or value of the FEUS brand. Most pages use the same deep-navy background, purple/green gradient accents, translucent cards, and text-first layouts. This makes services, platform capabilities, trust evidence, and calls to action feel visually similar even when their purpose is different.

The refresh should preserve the existing routing, claim-governance, capability-status, form-delivery, and trust-bundle boundaries. The highest-value changes are a stronger first viewport, a more distinctive visual system, clearer service and audience pathways, richer but honest trust signals, a more usable navigation and contact journey, and responsive visual storytelling.

## Stack and Delivery

- React 18 single-page application built with Vite 5.
- React Router 6 provides 28 declared routes, including one legacy redirect.
- Tailwind CSS 3 provides layout and styling, with shared classes in `src/index.css`.
- Lucide React supplies interface icons.
- Framer Motion is limited mainly to media gallery and slideshow experiences.
- EmailJS delivers the contact form; Calendly is loaded on demand with a route fallback.
- Sharp optimizes property-sales photography through `npm run optimize:images`.
- Deployment configuration exists for Azure Static Web Apps and Vercel.
- Public claim validation runs through `npm test` and automatically before every production build.

## Information Architecture

The site currently includes these primary visitor surfaces:

- Company: Home, About, Services, Solutions, Insights, Contact.
- FEUS.ai: Platform Overview, Agent Portfolio, SQL Operations, Oracle Operations, Request Operations, Control Plane, Integrations, Architecture, Demo, FAQ, and Pricing.
- Trust: Trust Center, Security, Compliance, Status, Assurance Dashboard, and Release Notes.
- Sales: Sales Overview, Property Listings, listing detail, and inquiry routes.

The route coverage is broad, but the desktop navigation exposes too many peers at once. Platform, services, solutions, trust, sales, insights, and contact compete for attention. Mobile navigation is functional but mirrors that density instead of helping visitors choose a path by intent.

## Reusable Components

Strong foundations to preserve:

- `Layout.jsx` keeps platform status chrome off conversion-focused routes.
- `SEO.jsx` manages route-level title, description, canonical, Open Graph, Twitter, and indexation metadata without another dependency.
- `AnimatedSection.jsx` uses IntersectionObserver and removes observation after reveal.
- `CalendlyEmbed.jsx` loads scheduling only when needed and falls back to the contact route.
- `StatusBadge.jsx` and `statusComponents.jsx` expose capability maturity without inventing blanket availability claims.
- Trust and assurance routes are lazy loaded so exact-revision release evidence stays outside the main marketing bundle.
- `publicStatus.js` remains the single public source for platform posture and capability status.

Components needing redesign:

- `Navbar.jsx` uses the retired 2021 logo and presents seven peer links plus the platform menu and CTA.
- `Footer.jsx` has six uneven columns and a dense posture/legal bottom section.
- `ui.jsx` assumes dark surfaces and hard-codes white/gray text into most primitives.
- `PageHero` relies on blurred decorative circles rather than meaningful visual content.
- `index.css` concentrates nearly every surface in navy, purple, and translucent glass.

## Brand Assets

### Approved direction

The refresh brief explicitly identifies `FEUS-Shared/branding/FEUS logo 2026.png` as the new primary logo. It uses a blue and lime circuit mark, a deep ink field, and a modern FEUS wordmark. This should replace the current public 2021 logo in navigation, footer, metadata, and social preview assets.

### Existing assets reviewed

- `FEUS logo 2026.png`: selected as the new primary mark by the project brief.
- `FEUS logo 2023.jpg`: superseded and not selected.
- `Feus hero banner.jpg`: explicitly retired in the brand guide and contains legacy wording that is not suitable for current public claims.
- `DSC_4281.JPG`: source portrait with useful founder imagery but unsuitable orientation, color balance, and crop for direct web use.
- `public/dr-tolu-adeniyi.jpg`: existing rotated portrait crop used on the About page; it needs a corrected, optimized derivative.
- Property-sales photography under `public/media/Sales`: useful only on the sales experience, not as generic technology imagery.

There are no current enterprise technology photographs or polished platform visuals. The homepage therefore depends almost entirely on typography and cards.

## Existing Visual System

- Primary hue: indigo/violet.
- Secondary hue: emerald.
- Main background: near-black navy.
- Accent usage: gradients, glows, translucent borders, and blurred circles.
- Typography: Inter for display and body, JetBrains Mono for technical text.
- Repeated pattern: dark section, centered heading, three-column glass-card grid.

The visual system is coherent but one-note. It reads as a generic dark software theme rather than a distinct company spanning enterprise services, governed AI, cloud, data, automation, and media.

## Page Findings

### Homepage

- The hero is text-only and does not foreground the logo or a distinctive FEUS visual.
- It explains both the company and platform accurately, but the main sentence is long and the visitor must parse the brand architecture immediately.
- Services appear as six nearly identical cards with no buyer-oriented outcomes or dedicated pathways.
- There is no industries/use-cases section, engagement process, measurable benefits framework, or audience routing.
- Trust content is accurate but presented as another text block instead of a visual differentiator.
- The final company card is informative but does not create a strong closing conversion moment.

### About

- Vision, values, founder background, and milestones exist, but the page is text-heavy.
- Company and product architecture is explained twice without a memorable visual model.
- The existing founder photo is incorrectly oriented and too small to provide meaningful human presence.
- Several headings use legacy "AI-Powered" language that conflicts with current brand terminology.
- Values and milestones repeat the same card pattern as the rest of the site.

### Services and Solutions

- Six substantial service domains exist, but each section carries eight offerings, producing a long undifferentiated page.
- Service descriptions emphasize scope more than the client situation, benefit, or expected engagement output.
- Services do not currently include a clear web/digital-presence or media-production pathway despite those FEUS offerings appearing elsewhere.
- Services and Solutions overlap without clearly explaining the difference between a capability, an outcome-led solution, and an engagement model.
- Calls to action use generic wording and do not preselect the visitor's area of interest.

### FEUS.ai

- Current content is disciplined and capability-status aware.
- The hero has no platform visual and asks the visitor to process dense posture language early.
- Operational evidence appears in paragraph form before the buyer sees a simple value model.
- The capability lifecycle table is valuable for evaluators but dominates the primary product narrative.
- Human-in-the-loop governance, responsible automation, security boundaries, ROI/FinOps awareness, and workflow value need a clearer visual story without exposing implementation internals.

### Contact

- The form has real labels, required fields, loading, success, and failure states.
- The contact path offers both asynchronous messaging and Calendly scheduling.
- Eight ungrouped inquiry types increase choice cost.
- The error path includes direct-email guidance but should expose it as a working link.
- The form does not use route/query context to preselect a service, platform demo, or media inquiry.
- Review mode is present but not appropriate as public social proof until approved review content exists.

### Navigation and Footer

- Primary navigation is crowded and mixes company, product, sales, and trust destinations.
- The click-only desktop dropdown does not close on outside click or Escape.
- There is no skip link.
- The footer repeats many specialist links without first clarifying the major visitor paths.
- Privacy and terms are described as under review rather than linked, which is honest but visually awkward.

## SEO and Metadata

Current strengths:

- Canonical URLs and route-level descriptions are implemented.
- Open Graph and Twitter metadata are supported.
- Robots and sitemap files exist.
- Sensitive demo/pricing routes can be marked `noindex`.

Current gaps:

- The default social image is the old logo.
- The default font request loads many Inter weights and creates an external render dependency.
- No organization structured data is present in the document shell.
- The sitemap is hand-maintained and must be checked against navigation changes.
- Route changes can leave a previous Open Graph image in place when a later route omits `image`.

## Responsive and Accessibility Baseline

Current strengths:

- Layouts use consistent `sm`, `md`, and `lg` breakpoints.
- Navigation has an accessible toggle label and expanded state.
- Form controls have visible labels and required attributes.
- Most decorative icons are hidden from assistive technology.

Gaps to address:

- No skip-to-content link or stable main-content target.
- Motion does not honor `prefers-reduced-motion`.
- Dropdown keyboard behavior and outside-click dismissal are incomplete.
- Several low-contrast secondary text colors are used on deep backgrounds.
- Touch targets and wrapping need visual verification at 320 px and 375 px.
- Hero and card typography use fixed utility combinations without safeguards for long labels.

## Performance Baseline

- Trust routes are already code split.
- The current marketing route set is imported eagerly in `App.jsx`, so most non-trust pages enter the initial graph.
- The home experience has few images, but the external font request adds connection and font-loading cost.
- Existing logo derivatives are JPEG and not sized for each context.
- Page-level imagery lacks explicit dimensions in several places, increasing layout-shift risk.
- The existing image optimizer only covers property-sales JPEG files.

## Constraints to Preserve

- Do not move release-assessment evidence into the marketing bundle.
- Do not fabricate customer logos, testimonials, outcome metrics, certifications, availability, or service commitments.
- Every FEUS.ai capability must retain its qualified lifecycle status.
- Keep exact release evidence and detailed restrictions on trust/status surfaces.
- Use current public terminology and avoid exposing internal implementation detail.
- Keep EmailJS and Calendly behavior functional unless a tested replacement is introduced.
- Keep the sales routes and their media assets intact.

## Baseline Validation

The refresh will use these repository-supported checks:

1. `npm test` for public-claims and bundle-boundary rules.
2. `npm run build` for production compilation and asset output.
3. Built-site preview for route, form, navigation, and responsive inspection.
4. Browser screenshots at mobile, tablet, and desktop widths.
5. Link extraction and route checks against the React route table.
