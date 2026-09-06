# FEUS Website Refresh Plan

Date: 2026-09-05

## Design Direction

The refreshed site will feel like an enterprise transformation studio with a governed AI platform, not a generic dark software template. The visual language will combine:

- Deep ink for high-trust hero and platform moments.
- Clear white and cool-mist bands for readability and editorial rhythm.
- Electric blue from the 2026 logo for navigation, links, and technical signals.
- Signal lime for verified progress, governance, and positive status.
- Warm coral for human-service and engagement accents.
- Restrained amber for high-intent calls to action.

Typography will move to a distinctive display/body pairing with fewer downloaded weights and resilient fallbacks. Corners will remain compact, grids will be structured, and visual hierarchy will come from scale, spacing, contrast, imagery, and layout rather than layers of nested cards.

## Brand and Asset Strategy

1. Copy and optimize `FEUS logo 2026.png` into the website's public brand directory.
2. Produce context-sized WebP derivatives for navigation, footer, and social sharing.
3. Correct and optimize the founder portrait for the About page.
4. Create a lightweight branded hero bitmap that uses the FEUS circuit language without exposing platform internals or embedding unsupported copy.
5. Build an abstract workflow visual for FEUS.ai from accessible HTML/CSS and Lucide icons; it will be illustrative, not an architectural disclosure.
6. Keep property-sales photography scoped to sales/media routes.
7. Set explicit image dimensions, responsive `sizes`, lazy loading below the fold, and high-priority loading only for the primary hero image.

## Design System Changes

- Define semantic CSS variables for ink, paper, mist, blue, lime, coral, amber, border, and muted text.
- Add light and dark section primitives with predictable text colors.
- Replace generic glass-card dependence with reusable `surface-card`, `outline-card`, `signal-panel`, and `dark-panel` patterns.
- Redesign primary, secondary, and inverse CTA styles with clear hierarchy and focus states.
- Update shared page hero, section label, heading, stat, and proof components.
- Add reduced-motion behavior and a visible skip link.
- Use stable image, icon-button, and card dimensions to prevent layout shifts.

## Information Architecture

### Primary navigation

- Services
- Solutions
- FEUS.ai
- Company dropdown: About, Insights, Sales & Media
- Trust Center
- Primary CTA: Talk to FEUS

The platform dropdown will remain available within FEUS.ai surfaces and the footer, while the main navigation will prioritize first-time buyer comprehension.

### Footer

Reorganize into four clear groups:

- Explore
- FEUS.ai
- Trust
- Connect

Add a concise brand statement, verified contact details, social destinations, asynchronous contact option, capability qualifier, and honest legal-status language.

## Homepage Journey

1. Full-bleed branded hero: literal FEUS name, buyer outcome, two clear CTAs, and the 2026 mark.
2. Credibility rail: governed execution, human control, capability transparency, and practitioner delivery without invented client logos or metrics.
3. Value proposition: connect strategy, implementation, and governed operation.
4. Service pathways: enterprise AI, data, cloud, automation, digital platforms, and media.
5. FEUS.ai feature: a visual model of intent, policy, human decision, action, and evidence.
6. Industries/use cases: regulated operations, growing businesses, platform teams, and customer-facing brands.
7. Business outcomes: reusable benefit categories rather than unsupported numeric claims.
8. Engagement process: discover, design, deliver, improve.
9. Why FEUS: practitioner access, honest status, governance-first thinking, and connected delivery.
10. Conversion band: consultation, demo, and written inquiry paths.

## Page Changes

### About

- Lead with mission and the relationship between FEUS Electronics Group and FEUS.ai.
- Use the corrected founder portrait as a meaningful human anchor.
- Replace repeated value cards with a visual operating-principles layout.
- Convert milestones into a readable timeline.
- Remove legacy terminology and tighten unsupported or overly detailed biography claims where necessary.

### Services

- Group offerings into six buyer-oriented service pillars.
- Include digital platforms and media/content production as visible paths.
- Give every service a concise situation, benefit, outcomes, and contextual CTA.
- Distinguish advisory, project delivery, and managed engagement models.

### Solutions

- Reframe around client scenarios and transformation outcomes.
- Clarify how Solutions differs from Services.
- Add direct links to relevant service or contact paths.

### FEUS.ai

- Lead with business value and human-controlled governance.
- Add an illustrative governed-workflow visual.
- Present trust principles before detailed lifecycle material.
- Keep public posture data and capability lifecycle truthful and sourced.
- Surface responsible AI, security, workflow automation, and cost-awareness without exposing internals or claiming unverified savings.
- Give security-conscious buyers a prominent Trust Center path.

### Contact

- Add intent cards for consultation, platform demonstration, services, and sales/media.
- Preselect inquiry type from a safe query parameter.
- Simplify and group inquiry options.
- Improve focus, status announcements, error recovery, and direct-email fallback.
- Preserve the one-business-day response statement already published by the site.

## Content Strategy

- Lead with concrete buyer problems and operational outcomes.
- Use short, declarative headlines and supporting detail that can be scanned.
- Separate human-delivered services from FEUS.ai software adoption.
- Keep platform maturity language capability-specific.
- Replace generic CTAs such as "Learn More" with intent-specific actions.
- Do not add testimonials, client logos, adoption figures, ROI actuals, or certifications without approved evidence.
- Use qualitative benefit language for speed, control, visibility, resilience, and cost awareness.

## Component Strategy

Update:

- `Navbar`
- `Footer`
- `AnimatedSection`
- shared components in `ui.jsx`
- `SEO`

Add only small, reusable components where they remove real repetition, likely:

- `BrandMark`
- `ServicePathCard`
- `OutcomeStrip`
- `WorkflowVisual`

Keep page-specific arrays near their owning page unless they are reused.

## Performance Plan

- Keep trust and assurance routes lazy loaded.
- Lazy load additional secondary pages where it reduces the initial graph without harming navigation.
- Convert new photography and brand graphics to WebP/AVIF where practical.
- Remove unused font weights and avoid animation libraries on core marketing pages.
- Use transform/opacity only for reveal motion.
- Respect reduced-motion preferences.
- Add explicit image width and height attributes.
- Review production bundle sizes after implementation.

## Accessibility Plan

- Add a keyboard-visible skip link and `main` target.
- Add robust focus-visible states.
- Make desktop menus dismiss on Escape and outside interaction.
- Lock page scroll while the mobile menu is open.
- Maintain semantic heading order.
- Ensure icon-only controls have names and decorative icons are hidden.
- Use `aria-live` for contact submission feedback.
- Verify contrast on light and dark surfaces.
- Test at 320, 375, 768, 1024, and 1440 px widths.

## SEO Plan

- Replace old logo metadata with the new social image.
- Add Organization structured data with only verified public facts.
- Improve page titles and descriptions around buyer intent.
- Ensure stale route-specific social images are removed when absent.
- Reconcile sitemap routes with the final information architecture.
- Keep noindex behavior for non-public evaluation surfaces.

## Validation and Acceptance

The implementation is ready to ship when:

- Public claims validation passes.
- The production build succeeds.
- All internal navigation targets resolve to declared routes.
- Homepage, About, Services, Solutions, FEUS.ai, Contact, Trust, and Sales render without console errors.
- Primary navigation and contact interaction work by keyboard and pointer.
- Mobile, tablet, and desktop screenshots show no overlap, clipping, or unreadable text.
- The 2026 logo is used in the first viewport, footer, and metadata.
- Generated and transformed assets are documented with source and usage.
- Final implementation, asset, and content documentation is complete.
