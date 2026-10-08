import { contactAvailable, consumeContactRate } from './contactControls.js';
import { inquiryTypes } from '../src/data/contactNavigation.js';

// ─────────────────────────────────────────────────────────
// OPTION B: Vercel Serverless Function — Contact Form API
// ─────────────────────────────────────────────────────────
// This file runs as a serverless function on Vercel.
// It receives contact form submissions and sends emails.
//
// SETUP:
//   1. npm install resend (or nodemailer / @sendgrid/mail)
//   2. Set RESEND_API_KEY in Vercel Environment Variables
//   3. Set CONTACT_EMAIL_TO in Vercel Environment Variables
//   4. Optionally set BOOKING_URL to offer direct scheduling
//   5. Deploy — the endpoint is /api/contact
// ─────────────────────────────────────────────────────────

// Anything a stranger types is untrusted, and these emails are HTML. Without
// escaping, a submitted name containing markup is rendered as markup in the
// inbox of whoever reads it -- including links that appear to come from us.
const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

// Field limits. The form already constrains these in the browser, which is a
// convenience for honest users and no constraint at all on anyone else.
const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  company: 200,
  jobTitle: 200,
  inquiryType: 100,
  message: 5000,
};

/** Trim, bound, strip control characters, then escape for HTML. */
function clean(value, limit) {
  return escapeHtml(
    String(value == null ? '' : value)
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
      .trim()
      .slice(0, limit)
  );
}

/** A booking link is only included when one is actually configured. */
function bookingUrl() {
  const raw = String(process.env.BOOKING_URL || '').trim();
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'https:' && /(^|\.)calendly\.com$/i.test(parsed.hostname) &&
      parsed.pathname.split('/').filter(Boolean).length >= 2 ? parsed.toString() : '';
  } catch {
    return '';
  }
}

export function createContactHandler({ rateCheck = consumeContactRate } = {}) {
return async function handler(req, res) {
  res.setHeader?.('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    return res.status(200).json({ available: Boolean(contactAvailable()), delivery: 'email_provider', durableCRM: false });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!contactAvailable()) return res.status(503).json({ error: 'Online inquiries are not operationally enabled. Please use the direct email fallback.' });
  if (req.headers?.origin !== new URL(process.env.CONTACT_SITE_ORIGIN).origin) {
    return res.status(403).json({ error: 'Origin not permitted' });
  }
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) return res.status(400).json({ error: 'Invalid submission' });
  const { firstName, lastName, email, company, jobTitle, inquiryType, message } = req.body || {};

  for (const [field, limit] of Object.entries(LIMITS)) {
    const value = req.body[field];
    if (field === 'jobTitle' && value === undefined) continue;
    if (typeof value !== 'string' || value.length > limit ||
        (field !== 'jobTitle' && !value.trim()) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
      return res.status(400).json({ error: 'Invalid or oversized fields' });
    }
  }
  if (!inquiryTypes.includes(inquiryType) || req.body.privacyConsent !== true ||
      (req.body.website !== undefined && req.body.website !== '')) return res.status(400).json({ error: 'Invalid submission or missing privacy consent' });

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || /[\r\n]/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const safe = {
    firstName: clean(firstName, LIMITS.firstName),
    lastName: clean(lastName, LIMITS.lastName),
    email: clean(email, LIMITS.email),
    company: clean(company, LIMITS.company),
    jobTitle: clean(jobTitle, LIMITS.jobTitle),
    inquiryType: clean(inquiryType, LIMITS.inquiryType),
    message: clean(message, LIMITS.message),
  };

  try {
    if (!await rateCheck(req)) {
      res.setHeader?.('Retry-After', '600');
      return res.status(429).json({ error: 'Too many inquiries. Please wait before retrying or use direct email.' });
    }
  } catch {
    return res.status(503).json({ error: 'Abuse protection is unavailable. No message was sent; please use direct email.' });
  }

  try {
    // ═══════════════════════════════════════════
    // PROVIDER: Resend (recommended)
    // ═══════════════════════════════════════════
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const toEmail = process.env.CONTACT_EMAIL_TO;
    const fromEmail = process.env.CONTACT_EMAIL_FROM;

    const notification = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email.trim(),
      subject: `[FEUS Contact] ${safe.inquiryType} — ${safe.firstName} ${safe.lastName} (${safe.company})`
        .replace(/[\r\n]+/g, ' '),
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0c1a; color: #e5e7eb; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #818cf8; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
            <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">FEUS Electronics Group Website</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #f3f4f6; font-size: 14px; font-weight: 600;">${safe.firstName} ${safe.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${safe.email}" style="color: #818cf8; text-decoration: none;">${safe.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px;">Company</td>
              <td style="padding: 8px 0; color: #f3f4f6; font-size: 14px;">${safe.company}</td>
            </tr>
            ${safe.jobTitle ? `<tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px;">Job Title</td>
              <td style="padding: 8px 0; color: #f3f4f6; font-size: 14px;">${safe.jobTitle}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px;">Interest Area</td>
              <td style="padding: 8px 0; color: #f3f4f6; font-size: 14px;">${safe.inquiryType}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
            <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
            <p style="color: #e5e7eb; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safe.message}</p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="color: #6b7280; font-size: 11px; margin: 0;">
              Submitted from feuselectronicsgroup.com at ${new Date().toISOString()}
            </p>
          </div>
        </div>
      `,
    });

    // Resend can resolve with an error instead of rejecting. Never report success.
    if (notification.error || !notification.data?.id) {
      return res.status(502).json({ error: 'The email provider did not accept the inquiry. Please email info@feuselectronicsgroup.com directly.' });
    }

    // Acknowledgement failure must not misreport an accepted inquiry as unsent.
    const booking = bookingUrl();
    const acknowledgement = await resend.emails.send({
      from: fromEmail,
      to: [email],
      replyTo: toEmail,
      subject: `Thank you for contacting FEUS Electronics Group`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h1 style="color: #1f2937; font-size: 20px;">Thank you, ${safe.firstName}.</h1>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.7;">
            Your inquiry regarding <strong>${safe.inquiryType}</strong> was accepted by our email provider. This is not proof of inbox delivery. Response time is not guaranteed.
          </p>
          ${booking ? `<p style="color: #4b5563; font-size: 14px; line-height: 1.7;">
            In the meantime, if you'd like to schedule a consultation directly, you can book a time here:
          </p>
          <p style="margin: 20px 0;">
            <a href="${escapeHtml(booking)}"
               style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
              Book a Consultation
            </a>
          </p>` : `<p style="color: #4b5563; font-size: 14px; line-height: 1.7;">
            If you would like to speak to us directly, reply to this email and we will send you a few times that work.
          </p>`}
          <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">
            — The FEUS Electronics Group Team<br/>
            <a href="https://feuselectronicsgroup.com" style="color: #818cf8;">feuselectronicsgroup.com</a>
          </p>
        </div>
      `,
    }).catch(() => ({ error: true }));

    return res.status(200).json({
      success: true,
      delivery: 'provider_accepted',
      acknowledgementAccepted: !acknowledgement.error && Boolean(acknowledgement.data?.id),
      message: 'The email provider accepted the inquiry; inbox delivery is not confirmed.',
    });

  } catch {
    console.error('Contact form provider request failed');
    return res.status(500).json({ 
      error: 'The provider request failed; delivery is unknown. Please email info@feuselectronicsgroup.com directly before retrying.'
    });
  }
};
}

export default createContactHandler();
