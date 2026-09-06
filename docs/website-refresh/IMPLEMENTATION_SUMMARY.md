# FEUS Website Refresh: Implementation Summary

Date: 2026-09-06
Branch: `feature/feus-website-refresh`

## Outcome

The refresh replaces the previous generic dark-software presentation with a distinct FEUS brand system and a clearer buyer journey. The first viewport now establishes FEUS Electronics Group as the company, presents FEUS.ai as its governed AI platform, and gives visitors direct paths into services, solutions, trust evidence, and contact.

The implementation preserves the existing public-claims controls, capability-status source, contact delivery, Calendly integration, sales routes, and the separate Trust Center release-evidence bundle.

## Implemented Scope

### Brand and visual system

- Adopted the approved 2026 FEUS logo in navigation, footer, favicon, metadata, and structured data.
- Introduced semantic ink, paper, mist, blue, lime, coral, and gold tokens.
- Added purpose-specific light, mist, ink, surface-card, signal-panel, and dark-panel treatments.
- Replaced decorative hero effects with an optimized FEUS-branded bitmap.
- Added `BrandMark` and an accessible, illustrative `WorkflowVisual`.
- Moved display typography to Sora and body typography to Manrope, with resilient local fallbacks.

### Information architecture

- Reduced desktop navigation to Services, Solutions, FEUS.ai, Company, Trust Center, and one primary CTA.
- Grouped About, Insights, and Sales & Media under Company.
- Reorganized the footer into Explore, FEUS.ai, Trust, and Connect paths.
- Added direct email and LinkedIn contact options.
- Preserved all registered routes and the `/how-it-works` legacy redirect.

### Core pages

- Rebuilt the homepage around value, capabilities, FEUS.ai, use cases, outcomes, delivery process, and conversion.
- Reframed About around company purpose, operating model, story, principles, milestones, and founder leadership.
- Expanded Services to ten buyer-oriented capabilities with benefits, typical outputs, and contextual inquiry links.
- Reframed Solutions around six business-change scenarios rather than internal service categories.
- Reworked FEUS.ai around controlled action, human authority, governance, evidence, and capability-scoped adoption.
- Added four contact-intent paths and safe query-string preselection to the contact form.
- Aligned scheduling and engagement-process sections with the new visual system.

### Accessibility and interaction

- Added a keyboard-visible skip link and stable `main` target.
- Added reduced-motion handling to reveal animations.
- Added Escape and outside-interaction dismissal to the desktop Company menu.
- Added mobile-menu scroll locking and route-close behavior.
- Preserved visible labels, native required fields, focus states, and live submission feedback.
- Added lazy-route-aware hash scrolling so links such as `/services#ai` land below the fixed header.
- Removed the hard 320 px body floor and constrained the Status page evidence grid to prevent page-level overflow.

### SEO and performance

- Added verified Organization JSON-LD with name, site URL, logo, public email, and LinkedIn URL.
- Updated favicon, Open Graph, Twitter, and route-level social-image defaults.
- Reconciled the sitemap with indexable static routes; noindex routes remain intentionally omitted.
- Added immutable caching for versioned `/brand/*` assets.
- Lazy loaded every secondary route while keeping the homepage eager.
- Preserved separate Trust Center chunks for exact-revision release evidence.
- Reduced the main JavaScript entry from approximately 563 KB to 264.91 KB (80.09 KB gzip).

## Validation Evidence

- `npm test`: passed; 62 public files scanned and 22 capability rows verified.
- `npm run build`: passed with 2,003 modules transformed and no compilation errors.
- Route smoke test: all 30 registered/redirect test paths returned HTTP 200, rendered one H1, and produced no page or console errors.
- Redirect checks: `/how-it-works` resolved to `/architecture`; context-free `/sales/inquire` resolved to `/sales/listings`.
- Core responsive matrix: Home, About, Services, Solutions, FEUS.ai, and Contact passed at 320, 375, 768, 1024, and 1440 px with no page-level overflow, clipped H1 text, or broken loaded images.
- Status responsive matrix: passed at the same five widths; wide evidence tables remain scrollable inside their containers.
- Navigation: desktop Company menu items, Escape behavior, mobile menu state, mobile body scroll lock, route-close behavior, and active states verified.
- Contextual navigation: `/services#ai` landed the Enterprise AI card at the fixed-header offset.
- Contact: `?type=digital` selected `Digital Platforms & Web`; all seven controls had labels; native validity passed after test-only completion; no message was submitted.
- Assets: logo, hero, social preview, and 1000 x 1200 founder portrait returned successfully and decoded in the browser.

## Deliberate Constraints

- No customer logos, testimonials, adoption counts, savings percentages, service-level promises, or certification claims were added without approved evidence.
- Qualitative outcomes are used instead of universal ROI figures.
- FEUS.ai maturity and availability remain capability-specific and link to public status evidence.
- Review mode remains `noindex`; no unapproved review is displayed as social proof.
- Dynamic property-detail URLs are not hand-written into the sitemap because no authoritative generated listing feed exists.
- Privacy and terms remain described as under legal review rather than linked to nonexistent policies.

## Operational Notes

- Regenerate branded assets with `npm run brand:assets` from the website root.
- Validate public copy with `npm test`.
- Produce the deployment artifact with `npm run build`.
- The build emits a non-blocking Browserslist data-age advisory; it does not affect compilation or runtime validation.