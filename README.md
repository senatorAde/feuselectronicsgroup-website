# FEUS Electronics Group — Enterprise Website

> **[www.feuselectronicsgroup.com](https://www.feuselectronicsgroup.com)** — AI-Powered Enterprise Technology

| | |
|---|---|
| **Status** | ✅ Live in Production |
| **URL** | [feuselectronicsgroup.com](https://www.feuselectronicsgroup.com) |
| **GitHub** | [senatorAde/feuselectronicsgroup-website](https://github.com/senatorAde/feuselectronicsgroup-website) |
| **Hosting** | Vercel (auto-deploy on push) |
| **Domain Registrar** | Squarespace Domains |
| **SSL** | Auto-provisioned by Vercel |
| **CDN** | Vercel Edge Network (global) |

A modern, premium, enterprise-ready website for **FEUS Electronics Group** and its flagship AI-powered managed services platform **FEUS.ai**.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (v20.18.1 LTS used in production)
- npm (comes with Node.js)
- [Git](https://git-scm.com/) for version control & auto-deploy

### Local Development

```bash
# Working directory (primary — contains Git repo)
cd C:\feuswebsite

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:3000`.

### Deploy Changes (Git CI/CD — Recommended)

```bash
cd C:\feuswebsite
# 1. Make your edits in src/pages/ or src/components/
# 2. Stage & commit
git add -A
git commit -m "description of your change"
# 3. Push — Vercel auto-builds & deploys in ~15 seconds
git push origin master
```

### Manual Build (Fallback Only)

```bash
npm run build     # Build for production → dist/
npm run preview   # Preview the production build locally
vercel --prod     # Manual deploy to Vercel (not normally needed)
```

---

## 📁 Project Structure

```
C:\feuswebsite/                        ← Primary working directory
├── .git/                              # Git repository
├── .gitignore                         # node_modules, dist, .env, .vercel
├── .vercel/                           # Vercel project link config
├── index.html                         # Entry HTML
├── package.json                       # Dependencies & scripts
├── package-lock.json                  # Dependency lock file
├── vite.config.js                     # Vite bundler config
├── tailwind.config.js                 # Tailwind CSS theme & extensions
├── postcss.config.js                  # PostCSS config
├── staticwebapp.config.json           # SPA routing, security headers, caching
├── README.md                          # This file
├── docs/
│   └── WEBSITE_PLANNING.md            # Sitemap, IA, wireframes, copy strategy
├── public/
│   ├── feus-favicon.svg               # SVG favicon (gradient "F")
│   └── feus-logo.jpg                  # Official FEUS logo (90KB)
└── src/
    ├── main.jsx                       # React entry point
    ├── App.jsx                        # Router configuration (7 routes)
    ├── index.css                      # Global styles & Tailwind layers
    ├── components/
    │   ├── Layout.jsx                 # Page layout wrapper
    │   ├── Navbar.jsx                 # Navigation bar (responsive, glass-on-scroll)
    │   ├── Footer.jsx                 # Site footer with CTA band & links
    │   ├── AnimatedSection.jsx        # IntersectionObserver scroll animations
    │   ├── ScrollToTop.jsx            # Scroll restoration on route change
    │   └── ui.jsx                     # Reusable: SectionLabel, SectionHeader, CTAButton, etc.
    └── pages/
        ├── HomePage.jsx               # 9-section homepage with AI node constellation hero
        ├── AboutPage.jsx              # Brand architecture, story, values, leadership
        ├── FeusAiPage.jsx             # Platform capabilities, tech stack, differentiators
        ├── ServicesPage.jsx           # 6 service domains (48 offerings) + engagement models
        ├── SolutionsPage.jsx          # Flagship Governed DBA assistant + 4 enterprise solutions
        ├── ContactPage.jsx            # 7-field contact form + company info
        └── InsightsPage.jsx           # 6 articles + newsletter signup
```

> **Backup copy** also exists at `\\vmware-host\Shared Folders\FEUStraining\FEUS-Web\feuselectronicsgroup-website\` but `C:\feuswebsite` is the source of truth.

---

## 🛠️ Tech Stack

### Application
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | UI component framework |
| **Vite** | 5.4.x | Build tool & dev server |
| **Tailwind CSS** | 3.4.14 | Utility-first styling |
| **React Router** | 6.26.2 | Client-side SPA routing |
| **Lucide React** | 0.453.0 | Icon system (48+ icons used) |
| **Framer Motion** | 11.11.1 | Animation library (available, custom IntersectionObserver used instead) |

### Infrastructure
| Technology | Purpose |
|---|---|
| **Vercel** | Hosting, CDN, SSL, auto-deploy |
| **GitHub** | Source control, CI/CD trigger |
| **Squarespace Domains** | DNS management, domain registrar |
| **Google Workspace** | Email (SPF + DKIM records preserved) |
| **Node.js** | v20.18.1 LTS — build runtime |

---

## 🎨 Brand & Design System

### Colors
- **Primary (FEUS):** Indigo spectrum (`#6366f1` → `#1e1b4b`)
- **Accent:** Emerald (`#10b981` → `#064e3b`)
- **Background:** Deep navy (`#0a0c1a` → `#1a1f3a`)

### Typography
- **Display & Body:** Inter
- **Monospace:** JetBrains Mono

### Design Tokens
- `.glass-card` — frosted glass card with hover effects
- `.gradient-text` — brand gradient text
- `.btn-primary` / `.btn-secondary` / `.btn-accent` — CTA buttons
- `.section-dark` / `.section-gradient` — section backgrounds
- `.glow-line` — divider with glow effect

---

## 📄 Pages & Sitemap

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Hero, services, differentiators, flagship, industries, trust |
| `/about` | About | Brand architecture, story, values, leadership |
| `/feus-ai` | FEUS.ai | Platform capabilities, tech stack, differentiators |
| `/services` | Services | 6 service domains with detail |
| `/solutions` | Solutions | Flagship DBA assistant + enterprise solutions |
| `/contact` | Contact | Lead capture form + company info |
| `/insights` | Insights | Blog/articles listing |

---

## 🏗️ Deployment

### Production (Current — Vercel + GitHub CI/CD)

The site is deployed to **Vercel** with automatic deployments on every `git push`.

| Component | Detail |
|---|---|
| **Vercel Project** | `feuswebsite` |
| **GitHub Repo** | [senatorAde/feuselectronicsgroup-website](https://github.com/senatorAde/feuselectronicsgroup-website) |
| **Branch** | `master` → auto-deploy to production |
| **Build Command** | `npm run build` (Vite) |
| **Output Directory** | `dist/` |
| **Framework** | Vite (auto-detected) |
| **Build Time** | ~15 seconds |

### DNS Configuration (Squarespace Domains)

| Record | Name | Value | Purpose |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | Apex → Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | WWW → Vercel |
| **TXT** | `_vercel` | `ns1.vercel-dns.com` | Domain verification |
| **TXT** | `@` | *(existing)* | Google Workspace SPF |
| **TXT** | `google._domainkey` | *(existing)* | DKIM for email |

### Production Build Output
- `index.html` — 0.61 KB
- CSS bundle — 6.14 KB gzip
- JS bundle — 75.16 KB gzip

### Alternative Deployment (Manual Fallback)
```bash
npm run build              # Build locally
vercel --prod --yes        # Deploy dist/ to Vercel manually
```

---

## 📝 Content Management Notes

All content is currently in React components. For future CMS integration:
- Article data in `InsightsPage.jsx` can be sourced from a headless CMS
- Service/solution data is structured as arrays — easy to externalize
- Contact form needs backend integration (API endpoint — consider Azure Functions or Formspree)

---

## 📐 Architecture Decisions

1. **No CSS framework bloat** — Tailwind utility classes only, purged in production
2. **Component-based sections** — Each homepage section is a self-contained component
3. **Scroll animations** — IntersectionObserver-based, no heavy animation libraries
4. **Dark theme** — Premium enterprise feel, distinctive brand identity
5. **Responsive-first** — All layouts built mobile-up with Tailwind breakpoints
6. **Accessible** — Semantic HTML, proper heading hierarchy, focus states
7. **Static SPA** — No server required; fully static output with client-side routing
8. **Git-based deploys** — Single source of truth in GitHub, Vercel auto-deploys

---

## 🔧 Infrastructure & Maintenance

### What Keeps the Site Alive 24/7
| Layer | Provider | Auto-Renews |
|---|---|---|
| Domain registration | Squarespace Domains | ✅ Annual (check renewal date) |
| DNS resolution | Squarespace DNS | ✅ Always on |
| Hosting + CDN + SSL | Vercel (Hobby plan) | ✅ Free tier, auto-renews SSL |
| Source control | GitHub | ✅ Free tier |

### Risks to Monitor
| Risk | Mitigation |
|---|---|
| Domain expires | Set auto-renew ON at Squarespace |
| Vercel free tier limits | 100GB bandwidth/month — sufficient for enterprise brochure site |
| GitHub account access | Keep credentials safe; enable 2FA |
| Google Workspace email | SPF/DKIM records preserved in DNS |

### Update Workflow
```
cd C:\feuswebsite
# 1. Edit files in src/
# 2. git add -A && git commit -m "what changed"
# 3. git push origin master
# → Vercel auto-deploys in ~15 seconds
```

### Clone on a New Machine
```bash
git clone https://github.com/senatorAde/feuselectronicsgroup-website.git
cd feuselectronicsgroup-website
npm install
npm run dev
```

---

## 🏢 FEUS Ecosystem

| Project | Location | Purpose |
|---|---|---|
| **FEUS Website** | This repo / `C:\feuswebsite` | Enterprise marketing site |
| **FEUS.ai DBA Assistant** | `FEUS-AI/Local-DBA-ai-Asisstant/` | Governed AI-powered DBA & Data Ops platform |
| **FEUS Shared** | `FEUS-Shared/` | Shared branding assets (logos, etc.) |

---

© 2026 FEUS Electronics Group. All rights reserved.
