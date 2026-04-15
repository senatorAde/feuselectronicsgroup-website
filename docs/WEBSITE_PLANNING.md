# FEUS Electronics Group — Website Planning Document

## Sitemap & Information Architecture

```
www.feuselectronicsgroup.com
│
├── / (Homepage)
│   ├── Hero Section
│   ├── What We Do (6 Service Domains)
│   ├── Why FEUS.ai (Differentiators)
│   ├── Flagship Solution (Governed DBA Assistant)
│   ├── Industries We Serve
│   ├── How We Work (4-Step Process)
│   ├── Trust & Governance
│   ├── About Teaser
│   └── Final CTA
│
├── /about
│   ├── Brand Architecture (Parent + FEUS.ai)
│   ├── Our Story
│   ├── Journey / Milestones
│   ├── Our Values
│   └── Leadership
│
├── /feus-ai
│   ├── Platform Overview
│   ├── Core Capabilities (6 Domains)
│   ├── What Makes FEUS.ai Different
│   └── Technology Foundation
│
├── /services
│   ├── Database Operations
│   ├── Data Architecture & Engineering
│   ├── Cloud & Platform Operations
│   ├── Enterprise AI Solutions
│   ├── Analytics & Business Intelligence
│   ├── Automation & Integration
│   └── Engagement Models
│
├── /solutions
│   ├── ★ Flagship: Governed DBA & Data Operations Assistant
│   │   ├── Architecture Modules (8 modules)
│   │   ├── Full Capability List (12 capabilities)
│   │   └── How It Works (4-step flow)
│   ├── Data Platform Modernization
│   ├── Enterprise AI Enablement
│   ├── Operational Intelligence & Analytics
│   └── Cloud Operations & Optimization
│
├── /contact
│   ├── Contact Form (7 fields)
│   ├── Contact Information
│   └── What to Expect
│
└── /insights
    ├── Featured Articles
    ├── All Articles Grid
    └── Newsletter Signup
```

---

## CTA Strategy

### Primary CTAs (High Intent)
- **"Schedule a Consultation"** — Homepage hero, footer, page bottoms
- **"Request a Demo"** — Solutions page, flagship section
- **"Send Message"** — Contact form submission

### Secondary CTAs (Exploration)
- **"Explore FEUS.ai"** — Homepage hero, About page
- **"Explore Solutions"** — Homepage CTA section
- **"View All Services"** — What We Do section
- **"Our Story"** — About teaser

### Micro CTAs
- **"Learn More"** — Service/solution cards
- **"Get Started"** — Navbar button

### CTA Placement Pattern
1. Hero section: 2 CTAs (primary + secondary)
2. After every 2 major sections: section-level CTA
3. Footer: persistent CTA band
4. Navbar: "Get Started" button (always visible)
5. Page bottom: always ends with CTA section

---

## Visual Direction & Brand Style Guide

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#6366f1` | Buttons, accents, interactive elements |
| Primary Dark | `#312e81` | Gradients, deep backgrounds |
| Accent | `#10b981` | Success states, check marks, secondary highlights |
| Navy Background | `#0a0c1a` | Primary background |
| Navy Surface | `#1a1f3a` | Cards, elevated surfaces |

### Design Principles
1. **Dark-first premium aesthetic** — Deep navy backgrounds, glass-morphism cards
2. **Gradient accents** — Indigo → Emerald gradients for brand identity
3. **Generous whitespace** — Sections with 6-8rem vertical padding
4. **Subtle animations** — Scroll-triggered fade-up, not flashy
5. **Typography hierarchy** — Bold display headings, comfortable body text
6. **Glass-morphism cards** — Semi-transparent with border/blur effects
7. **Glow dividers** — Subtle light-line separators between sections

### Typography Scale
- Hero: `text-7xl` (72px) — extrabold
- Section headings: `text-5xl` (48px) — bold
- Card titles: `text-lg` (18px) — semibold
- Body: `text-base` (16px) — regular
- Small/labels: `text-sm` (14px) — medium
- Micro: `text-xs` (12px) — regular

---

## Tech Stack

### Current Implementation (Production)
- **React 18.3.1** — Component framework
- **Vite 5.4.x** — Build tool (fast, modern)
- **Tailwind CSS 3.4.14** — Utility-first CSS
- **React Router 6.26.2** — Client-side SPA routing
- **Lucide React 0.453.0** — Consistent icon system
- **Framer Motion 11.11.1** — Available (custom IntersectionObserver used instead)

### Production Infrastructure (Live)
- **Hosting:** Vercel (Hobby plan — free tier, global CDN, auto SSL)
- **CI/CD:** GitHub → Vercel auto-deploy on `git push origin master`
- **GitHub Repo:** [senatorAde/feuselectronicsgroup-website](https://github.com/senatorAde/feuselectronicsgroup-website)
- **Domain:** [feuselectronicsgroup.com](https://www.feuselectronicsgroup.com) (Squarespace Domains)
- **DNS:** A record → Vercel (`76.76.21.21`), CNAME www → `cname.vercel-dns.com`
- **Email:** Google Workspace (SPF + DKIM records preserved in DNS)
- **Node.js:** v20.18.1 LTS (build runtime)

### Future Recommendations
- **Analytics:** Plausible or PostHog (privacy-respecting)
- **Forms:** Azure Functions backend or Formspree for contact form delivery
- **CMS (future):** Sanity, Contentful, or Strapi for blog content
- **SEO:** React Helmet for meta tags, sitemap.xml generation
- **Performance:** Image optimization (next-gen formats), lazy loading

---

## Homepage Wireframe (Section Flow)

```
┌────────────────────────────────────────────────┐
│  NAVBAR (fixed, glass on scroll)               │
│  Logo | About | FEUS.ai | Services | Solutions │
│        | Insights | Contact | [Get Started]    │
├────────────────────────────────────────────────┤
│                                                │
│  ★ HERO                                        │
│  "Enterprise Intelligence, Delivered."         │
│  Subtitle + 2 CTAs + Trust Markers             │
│  [Animated AI node visualization]              │
│                                                │
├────────────────────────────────────────────────┤
│  WHAT WE DO — 6 service cards (3x2 grid)       │
│  Database | Architecture | Cloud               │
│  AI | Analytics | Automation                   │
├────────────────────────────────────────────────┤
│  WHY FEUS.AI — 2-column                        │
│  Left: heading + copy + CTA                    │
│  Right: 6 differentiator mini-cards (2x3)      │
├────────────────────────────────────────────────┤
│  FLAGSHIP — full-width card                    │
│  Governed DBA Assistant spotlight              │
│  Left: description + CTAs                      │
│  Right: 8 capability checkmarks                │
├────────────────────────────────────────────────┤
│  INDUSTRIES — 6 cards (3x2)                    │
│  Financial | Healthcare | Manufacturing        │
│  Retail | Professional Services | Education    │
├────────────────────────────────────────────────┤
│  HOW WE WORK — 4 step cards (4-col)            │
│  01 Discover → 02 Architect → 03 Implement → 04│
├────────────────────────────────────────────────┤
│  TRUST & GOVERNANCE — 6 pillar cards (3x2)     │
│  PII Protection | Policy | Audit               │
│  RBAC | Classification | Human-in-Loop         │
├────────────────────────────────────────────────┤
│  ABOUT TEASER — 2-column                       │
│  Left: story + CTA                             │
│  Right: 4 stat cards (2x2)                     │
├────────────────────────────────────────────────┤
│  FINAL CTA — centered, bold                    │
│  "Let's Build Something That Actually Runs."   │
│  2 CTAs                                        │
├────────────────────────────────────────────────┤
│  FOOTER                                        │
│  CTA Band + Link Grid (5 columns) + Legal      │
└────────────────────────────────────────────────┘
```

---

## Copy Themes by Section

| Section | Theme | Tone |
|---------|-------|------|
| Hero | "Enterprise Intelligence, Delivered." | Bold, confident, founder-led |
| What We Do | AI-powered managed services across 6 domains | Clear, structured, specific |
| Why FEUS.ai | "Not Another Vendor. Your Operations Team." | Differentiated, provocative |
| Flagship | Governed DBA & Data Ops Assistant | Technical credibility, depth |
| Industries | "Built for Regulated, Complex Enterprises" | Trust, compliance-aware |
| How We Work | Assessment → Architecture → Implement → Operate | Process-oriented, reliable |
| Trust | "Enterprise AI, Governed by Design" | Security, trust, safety |
| About | "Built by Practitioners. Run Like a Company." | Authentic, experienced |
| CTA | "Let's Build Something That Actually Runs." | Action-oriented, genuine |
