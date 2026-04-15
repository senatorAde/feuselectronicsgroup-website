# FEUS Electronics Group — Deployment Guide

## Full Website Upgrade + Contact Form Fix + Calendly Integration

---

## Table of Contents

1. [What Changed](#what-changed)
2. [Contact Form Fix — Two Options](#contact-form-fix)
3. [Calendly Setup](#calendly-setup)
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

## Calendly Setup

### 1. Create Your Calendly Account
- Sign up at [calendly.com](https://calendly.com)
- Choose a plan (Free works for basic scheduling)

### 2. Create Event Types

**Event Type 1: Discovery Consultation (Primary)**
- Name: `30-Minute Discovery Consultation`
- Duration: 30 minutes
- URL slug: `consultation`
- Full URL: `https://calendly.com/feuselectronicsgroup/consultation`
- Location: Zoom or Microsoft Teams
- Questions: Company name, role, primary challenge

**Event Type 2: FEUS.ai Demo (Secondary)**
- Name: `FEUS.ai Platform Demo`
- Duration: 45 minutes
- URL slug: `demo`
- Full URL: `https://calendly.com/feuselectronicsgroup/demo`
- Location: Zoom or Microsoft Teams
- Questions: Company name, role, current tech stack

**Event Type 3: Follow-Up (Post-Call)**
- Name: `Follow-Up Discussion`
- Duration: 30 minutes
- URL slug: `follow-up`
- Full URL: `https://calendly.com/feuselectronicsgroup/follow-up`

### 3. Configure Notifications
- Enable email notifications for new bookings
- Enable calendar integration (Google Calendar / Outlook)
- Enable reminder emails (24 hours before, 1 hour before)

### 4. Set Environment Variable
```
VITE_CALENDLY_URL=https://calendly.com/feuselectronicsgroup/consultation
```

### 5. Integration Points on the Website
The Calendly integration is already built into:
- **Navbar:** "Book a Consultation" button (popup)
- **Homepage Hero:** "Book a Consultation" button (popup)
- **Homepage Final CTA:** "Book a Consultation" button (popup)
- **FEUS.ai Page:** Multiple CTA buttons (popup)
- **How It Works Page:** CTA buttons (popup)
- **Contact Page:** Inline Calendly embed (full widget)
- **Footer:** "Schedule a Consultation" button (popup)

---

## Environment Variables

### For Vercel (Dashboard → Settings → Environment Variables)

| Variable | Required | Value |
|----------|----------|-------|
| `VITE_CALENDLY_URL` | Yes | `https://calendly.com/feuselectronicsgroup/consultation` |
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
npm run dev
```
- Visit `http://localhost:3000`
- Test all routes: `/`, `/about`, `/feus-ai`, `/how-it-works`, `/services`, `/solutions`, `/contact`, `/insights`
- Test the contact form
- Test Calendly buttons (popup should open)
- Test Calendly inline embed on Contact page

### Step 4: Set Vercel Environment Variables
```bash
# Via Vercel CLI
vercel env add VITE_CALENDLY_URL
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
- Check all routes work (no 404s)
- Submit a test contact form
- Click a Calendly button
- Test on mobile

---

## Post-Deployment Verification

### Checklist
- [ ] Homepage loads with updated hero and "How FEUS.ai Works" section
- [ ] `/feus-ai` shows operational model with VS Code/Copilot Chat positioning
- [ ] `/how-it-works` shows full 5-layer architecture
- [ ] `/contact` shows Calendly inline embed + contact form
- [ ] Contact form submissions deliver emails to inbox
- [ ] Contact form shows loading state while sending
- [ ] Contact form shows error state if submission fails
- [ ] Contact form shows success state after submission
- [ ] Navbar "Book a Consultation" opens Calendly popup
- [ ] Footer "Schedule a Consultation" opens Calendly popup
- [ ] All pages' CTA buttons open Calendly popup
- [ ] Mobile navigation works correctly
- [ ] All routes work without 404 on direct access / refresh

---

## Scheduling Workflow

### Lead Conversion Flow
```
Website Visitor
    │
    ├─→ CTA: "Book a Consultation" → Calendly Popup → 30-min Discovery Call
    │
    └─→ Contact Page
          ├─→ Calendly Inline Embed → 30-min Discovery Call
          └─→ Contact Form (fallback) → Email → Manual Follow-up
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
    │     - Link to follow-up Calendly
    │
    ├─→ If interested: Follow-up call (Calendly link in recap email)
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

You can book a follow-up directly here:
[Book a Follow-Up Call](https://calendly.com/feuselectronicsgroup/follow-up)

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

- The Calendly widget loads CSS and JS from Calendly's CDN (`assets.calendly.com`)
- The popup widget uses `window.Calendly.initPopupWidget()` with a fallback to `window.open()` if the script hasn't loaded
- The `X-Frame-Options` header is set to `SAMEORIGIN` (not `DENY`) to allow the Calendly iframe to render
- All routes use React Router client-side routing; `vercel.json` rewrites ensure direct URL access works
- The API route at `/api/contact` is a Vercel Serverless Function (Node.js runtime)
