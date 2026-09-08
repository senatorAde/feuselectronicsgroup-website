/** Allowlisted inquiry intents. URL input never becomes arbitrary form content. */
export const inquiryTypes = [
  'Request a Guided Live FEUS.ai Demonstration',
  'Managed Database Operations',
  'Data Architecture & Engineering',
  'Cloud & Platform Operations',
  'Enterprise AI Solutions',
  'Governance & Security',
  'Analytics & Business Intelligence',
  'Automation & Integration',
  'Digital Platforms & Web',
  'Media, Photo & Video',
  'Strategy & Implementation Advisory',
  'General Inquiry',
  'FEUS.ai Adoption & Onboarding',
  'Request an Offline Fixture Demonstration',
  'Demo Feedback / Review',
]

const queryInquiryTypes = {
  demo: inquiryTypes[0],
  database: inquiryTypes[1],
  data: inquiryTypes[2],
  modernization: inquiryTypes[2],
  cloud: inquiryTypes[3],
  'cloud-ops': inquiryTypes[3],
  ai: inquiryTypes[4],
  enablement: inquiryTypes[4],
  governance: inquiryTypes[5],
  security: inquiryTypes[5],
  analytics: inquiryTypes[6],
  automation: inquiryTypes[7],
  workflow: inquiryTypes[7],
  digital: inquiryTypes[8],
  'digital-experience': inquiryTypes[8],
  media: inquiryTypes[9],
  'visual-story': inquiryTypes[9],
  strategy: inquiryTypes[10],
  services: inquiryTypes[11],
  adoption: inquiryTypes[12],
  'offline-demo': inquiryTypes[13],
  review: inquiryTypes[14],
}

export function resolveInquiry(type) {
  return {
    inquiryType: Object.hasOwn(queryInquiryTypes, type) ? queryInquiryTypes[type] : '',
    formType: type === 'review' ? 'demo_feedback' : 'contact',
  }
}

/** Called after the contact route has rendered, including same-route navigation. */
export function focusContactForm(section, field) {
  if (!section || !field) return
  section.scrollIntoView({ block: 'start', behavior: 'auto' })
  field.focus({ preventScroll: true })
  // The stacked mobile sidebar can put the focused select far below the anchor.
  // Keep keyboard focus visible and clear of the fixed navigation on all widths.
  field.scrollIntoView({ block: 'center', behavior: 'instant' })
}