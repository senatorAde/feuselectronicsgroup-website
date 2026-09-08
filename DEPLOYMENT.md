# FEUS Electronics Group — Deployment Guide

## Full Website Upgrade + Contact Form Fix + Calendly Integration

---

## Table of Contents

1. [What Changed](#what-changed)
2. [Contact Form Fix — Two Options](#contact-form-fix)
3. [Scheduling Setup (optional)](#scheduling-setup-optional)
4. [Environment Variables](#environment-variables)
5. [Deployment Steps](#deployment-steps)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Scheduling Workflow](#scheduling-workflow)
8. [Follow-Up Email Templates](#follow-up-email-templates)

---

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `src/components/CalendlyEmbed.jsx` | Reusable Calendly inline embed + popup button |
| `src/pages/HowItWorksPage.jsx` | Full "How FEUS.ai Works" page with 5-layer model |
| `api/contact.js` | Vercel serverless function for email delivery |
| `.env.example` | Environment variable template |
| `DEPLOYMENT.md` | This file |

### Modified Files
| File | Changes |
|------|---------|
| `vercel.json` | Added API rewrites, CORS headers, SAMEORIGIN for Calendly |
| `package.json` | Added `@emailjs/browser` and `resend` dependencies |
| `src/App.jsx` | Added `/how-it-works` route |
| `src/components/Navbar.jsx` | Added "How It Works" nav item, Calendly CTA button |
| `src/components/Footer.jsx` | Updated links, Calendly CTA |
| `src/pages/HomePage.jsx` | New "How FEUS.ai Works" section, Calendly CTAs, stronger hero |
| `src/pages/FeusAiPage.jsx` | Complete rewrite with operational model, VS Code/Copilot positioning |
| `src/pages/ContactPage.jsx` | Working email form + Calendly booking widget |
| `src/pages/AboutPage.jsx` | Calendly CTAs |
| `src/pages/ServicesPage.jsx` | Calendly CTAs |
| `src/pages/SolutionsPage.jsx` | Calendly CTAs |

---

## Contact Form Fix

### Root Cause
The original contact form only set `setSubmitted(true)` on submit — no backend, no email service, no API call. Messages were never delivered anywhere.

### OPTION A — EmailJS (Fastest, Frontend-Only)

**Best for:** Getting the form working in under 10 minutes with no backend.

1. **Sign up** at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)

2. **Create an Email Service:**
   - Go to Email Services → Add New Service
   - Connect your Gmail / Outlook / SMTP
   - Note the **Service ID** (e.g., `service_abc123`)

3. **Create an Email Template:**
   - Go to Email Templates → Create New Template
   - Subject: `[FEUS Contact] {{inquiry_type}} — {{from_name}}`
   - Body:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Company: {{company}}
     Job Title: {{job_title}}
     Area of Interest: {{inquiry_type}}
     
     Message:
     {{message}}
     ```
   - Note the **Template ID** (e.g., `template_xyz789`)

4. **Get your Public Key:**
   - Go to Account → API Keys
   - Copy the **Public Key**

5. **Set environment variables** in `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

6. **Enable EmailJS in ContactPage.jsx:**
   - Uncomment the EmailJS block
   - Comment out the backend API block
   - Add `import emailjs from '@emailjs/browser'` at the top

7. **Set the same variables in Vercel:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Add all three `VITE_EMAILJS_*` variables

---

### OPTION B — Backend API (Production-Grade, Recommended)

**Best for:** Production use with auto-reply, branded emails, and reliability.

1. **Sign up for Resend** at [resend.com](https://resend.com) (free tier: 3,000 emails/month)

2. **Get your API key:**
   - Dashboard → API Keys → Create API Key
   - Copy the key (starts with `re_`)

3. **Verify your domain** (optional but recommended):
   - Resend Dashboard → Domains → Add Domain
   - Add the DNS records Resend provides
   - This lets you send from `noreply@feuselectronicsgroup.com`

4. **Set environment variables in Vercel:**
   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL_TO=info@feuselectronicsgroup.com
   CONTACT_EMAIL_FROM=FEUS Website <noreply@feuselectronicsgroup.com>
   ```

5. **The API is already built:**
   - File: `api/contact.js`
   - Vercel automatically deploys this as a serverless function at `/api/contact`
   - No additional configuration needed

6. **The frontend is already configured:**
   - `ContactPage.jsx` already calls `fetch('/api/contact', ...)` by default
   - Just deploy and the form will work

---

## Scheduling Setup (optional)

**Current state: no scheduler is configured, and that is a supported state.**

The site ships with `VITE_CALENDLY_URL` unset. With no scheduler configured,
every "Request a consultation" control routes to `/contact`, the enquiry
reaches `info@feuselectronicsgroup.com`, and a human replies with times. The
site is fully functional this way. Nothing is broken and nothing needs to be
turned on.

> **Why there is no default URL.** This component previously carried a
> hard-coded scheduler link. The link returned HTTP 200 but was an empty stub,
> so the "is a scheduler configured?" flag was permanently true, the
> contact-form fallback written for exactly this case became unreachable, and
> every booking control on the site rendered "This Calendly URL is not valid".
> A hard-coded default for external configuration is worse than no default: it
> hides the breakage and disables the fallback. Do not reintroduce one.

### To enable live scheduling

1. Create the event type in Calendly and copy its public URL. It must be
   `https://calendly.com/<owner>/<event>` — the component rejects anything that
   is not HTTPS, not a `calendly.com` host, or missing an event path segment.
2. Confirm the URL loads a real scheduling page in a private browser window.
   A 200 response is not sufficient evidence; a stub page also returns 200.
3. Set the variables in Vercel → Settings → Environment Variables:

   ```
   VITE_CALENDLY_URL=https://calendly.com/<owner>/<event>   # build-time, client bundle
   BOOKING_URL=https://calendly.com/<owner>/<event>         # runtime, contact API auto-reply
   ```

   `VITE_CALENDLY_URL` is inlined into the client bundle at build time, so a
   change requires a redeploy. `BOOKING_URL` is read at request time by
   `api/contact.js`; when it is unset, the auto-reply simply omits the booking
   button instead of linking a dead page.
4. Redeploy and confirm the widget opens. If the Calendly script fails to load
   (blocked by an extension or a network policy), the button falls back to a
   plain link and then to `/contact`.

### Integration points

`CalendlyButton` is used by the Navbar, Footer, Home, FEUS.ai, Contact, About,
Media Sales, Property Listing, and Leave Review surfaces. All of them are
labelled "Request …" rather than "Book …", because until a scheduler is
configured the site cannot confirm a time — it can only pass the request to a
person.

---

## Environment Variables

### For Vercel (Dashboard → Settings → Environment Variables)

| Variable | Required | Value |
|----------|----------|-------|
| `VITE_CALENDLY_URL` | No | Public Calendly event URL. Unset ⇒ scheduling controls route to `/contact`. |
| `BOOKING_URL` | No | Same URL, read at runtime by the contact API auto-reply. Unset ⇒ no booking button in the email. |
| `RESEND_API_KEY` | Option B only | Your Resend API key |
| `CONTACT_EMAIL_TO` | Option B only | `info@feuselectronicsgroup.com` |
| `CONTACT_EMAIL_FROM` | Option B only | `FEUS Website <noreply@feuselectronicsgroup.com>` |
| `VITE_EMAILJS_SERVICE_ID` | Option A only | Your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Option A only | Your EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Option A only | Your EmailJS public key |

---

## Deployment Steps

### Step 1: Install Dependencies
```bash
cd feuselectronicsgroup-website
npm install
```

### Step 2: Create `.env` File
```bash
cp .env.example .env
# Edit .env with your actual values
```

### Step 3: Test Locally
```bash
npm test      # claims gate + audit-fix regression gate
npm run dev
```
- Visit `http://localhost:3000`
- Test all routes, including `/demo`, `/get-started`, `/legal/privacy`,
  `/legal/terms`, and `/security`
- Test the contact form
- Click a "Request a consultation" control. With no scheduler configured it
  must land on `/contact` — that is the correct behaviour, not a failure.

### Step 4: Set Vercel Environment Variables
```bash
# Via Vercel CLI. VITE_CALENDLY_URL and BOOKING_URL are optional; set them
# only once a real scheduling URL has been confirmed to load.
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL_TO
vercel env add CONTACT_EMAIL_FROM
```

Or set them in the Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add each variable for Production, Preview, and Development

### Step 5: Deploy
```bash
# If using Vercel CLI
vercel --prod

# Or push to your connected Git branch
git add .
git commit -m "Website upgrade: FEUS.ai platform positioning, contact form fix, Calendly integration"
git push origin main
```

### Step 6: Verify Production Deployment
- Check all routes work (no 404s), including the legal and security routes
- Submit a test contact form
- Click a "Request a consultation" control and confirm where it lands
- Test on mobile

---

## Post-Deployment Verification

### Checklist
- [ ] Homepage loads with the demonstration / adoption / sign-in paths, and
      sign-in is not the most prominent action
- [ ] `/demo` is reachable, indexable, and describes what a demonstration shows
- [ ] `/get-started` states that the runtime is not open to the public
- [ ] `/legal/privacy`, `/legal/terms` and `/security` load and are marked as drafts
      where they are drafts
- [ ] `/.well-known/security.txt` returns the file, not the SPA shell
- [ ] Contact form submissions deliver emails to the inbox
- [ ] Contact form shows loading, error and success states
- [ ] Every "Request a consultation" control reaches `/contact` while no
      scheduler is configured, and opens the scheduler once one is
- [ ] No control anywhere is labelled "Book …" unless a scheduler is configured
- [ ] Mobile navigation works correctly
- [ ] All routes work without 404 on direct access / refresh

---

## Scheduling Workflow

### Lead Conversion Flow
```
Website Visitor
    │
    ├─→ CTA: "Request a consultation"
    │     ├─ scheduler configured  → Calendly popup → 30-min discovery call
    │     └─ not configured (today) → /contact → email → a human replies with times
    │
    └─→ Contact Page
          ├─→ Scheduler embed, only when one is configured
          └─→ Contact Form → Email → Manual follow-up
```

### Post-Booking Flow
```
Booking Confirmed
    │
    ├─→ Visitor receives: Confirmation email + calendar invite + meeting link
    │
    └─→ FEUS team receives: Notification email + calendar event
```

### Post-Call Workflow
```
Discovery Call Complete
    │
    ├─→ FEUS sends: Recap email (within 24 hours)
    │     - Summary of discussion
    │     - Identified opportunities
    │     - Recommended next steps
    │     - Link to follow-up scheduling, only if a scheduler is configured
    │
    ├─→ If interested: Follow-up call
    │     - Detailed proposal review
    │     - Technical deep-dive
    │     - Scope and pricing discussion
    │
    └─→ If not ready: Nurture sequence
          - Monthly insights email
          - Relevant case studies
          - Open invitation to reconnect
```

---

## Follow-Up Email Templates

### Post-Discovery Call Recap

**Subject:** Following Up — FEUS.ai Discovery Call with [Client Name]

---

Hi [First Name],

Thank you for taking the time to speak with us today. It was great learning about your environment and the challenges you're facing with [specific challenge discussed].

Here's a quick recap of what we discussed:

**Current State:**
- [Summary of their environment — e.g., "Managing 200+ SQL Server instances across Azure and on-prem"]
- [Key pain point — e.g., "Manual DBA operations consuming 60% of team bandwidth"]
- [Governance gap — e.g., "No automated PII protection or audit trail for AI-assisted operations"]

**What We Recommended:**
- [Specific solution — e.g., "FEUS.ai Governed DBA Assistant to automate routine database health monitoring and query optimization"]
- [Governance outcome — e.g., "Policy engine + PII guardrails to bring AI operations into compliance"]
- [Timeline — e.g., "Phased deployment starting with a 2-week assessment"]

**Recommended Next Steps:**
1. We'll prepare a tailored assessment proposal based on today's discussion
2. Schedule a follow-up to review the proposal and answer technical questions

Reply to this email with a few times that suit you and we will confirm one.
(Once a scheduling link is configured, paste it here instead.)

In the meantime, feel free to explore:
- [How FEUS.ai Works](https://feuselectronicsgroup.com/how-it-works)
- [FEUS.ai Platform](https://feuselectronicsgroup.com/feus-ai)

Looking forward to the next conversation.

Best regards,
Dr. Tolu Adeniyi
Founder & CEO, FEUS Electronics Group
[feuselectronicsgroup.com](https://feuselectronicsgroup.com)

---

### Post-Form-Submission Auto-Reply

(Already built into `api/contact.js` — sends automatically when using Option B)

---

## Notes

- With no scheduler configured, nothing is loaded from Calendly's CDN at all.
- When one is configured, the widget loads CSS and JS from `assets.calendly.com`
- The popup uses `window.Calendly.initPopupWidget()`, falling back to
  `window.open()` if the script has not loaded, and to `/contact` if neither is
  available. All three paths are reachable and all three are honest.
- The `X-Frame-Options` header is set to `SAMEORIGIN` (not `DENY`) to allow the
  scheduler iframe to render
- All routes use React Router client-side routing; `vercel.json` rewrites ensure direct URL access works
- The API route at `/api/contact` is a Vercel Serverless Function (Node.js runtime)
