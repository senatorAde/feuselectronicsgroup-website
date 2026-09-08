import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const FeusAiPage = lazy(() => import('./pages/FeusAiPage'))
const CopilotLandingPage = lazy(() => import('./pages/CopilotLandingPage'))
const CloudRuntimePage = lazy(() => import('./pages/CloudRuntimePage'))
const GetStartedPage = lazy(() => import('./pages/GetStartedPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))
const AgentsPage = lazy(() => import('./pages/AgentsPage'))
const OracleOpsPage = lazy(() => import('./pages/OracleOpsPage'))
const SqlOpsPage = lazy(() => import('./pages/SqlOpsPage'))
const RequestOpsPage = lazy(() => import('./pages/RequestOpsPage'))
const ControlPlanePage = lazy(() => import('./pages/ControlPlanePage'))
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'))
const ItsmConnectPage = lazy(() => import('./pages/ItsmConnectPage'))
const DemoPage = lazy(() => import('./pages/DemoPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const MediaSalesLandingPage = lazy(() => import('./pages/MediaSalesLandingPage'))
const PropertyListingsPage = lazy(() => import('./pages/PropertyListingsPage'))
const PropertyListingDetailPage = lazy(() => import('./pages/PropertyListingDetailPage'))
const PropertyInquirePage = lazy(() => import('./pages/PropertyInquirePage'))

// Trust and assurance routes remain separate from the marketing entry bundle,
// keeping exact-revision release evidence out of first-visit code.
const TrustPage = lazy(() => import('./pages/TrustPage'))
const TrustSecurityPage = lazy(() => import('./pages/TrustSecurityPage'))
const TrustCompliancePage = lazy(() => import('./pages/TrustCompliancePage'))
const StatusPage = lazy(() => import('./pages/StatusPage'))
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const ReleaseNotesPage = lazy(() => import('./pages/ReleaseNotesPage'))
const AssuranceDashboardPage = lazy(() => import('./pages/AssuranceDashboardPage'))

// Legal drafts and responsible disclosure. Lazy-loaded like the trust routes:
// they must be reachable from every page, but they do not belong in the
// first-visit bundle.
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const SecurityPage = lazy(() => import('./pages/SecurityPage'))

export default function App() {
  return (
    <Suspense fallback={(
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center text-sm font-semibold text-slate-300" role="status">
        Loading FEUS experience...
      </div>
    )}>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feus-ai" element={<FeusAiPage />} />
        <Route path="/copilot" element={<CopilotLandingPage />} />
        <Route path="/cloud-runtime" element={<CloudRuntimePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agents/oracle" element={<OracleOpsPage />} />
        {/* Legacy route: /how-it-works overstated the pipeline; superseded by /architecture */}
        <Route path="/how-it-works" element={<Navigate to="/architecture" replace />} />
        <Route path="/sqlops" element={<SqlOpsPage />} />
        <Route path="/requestops" element={<RequestOpsPage />} />
        <Route path="/control-plane" element={<ControlPlanePage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/integrations/itsm" element={<ItsmConnectPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/release-notes" element={<ReleaseNotesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/trust/security" element={<TrustSecurityPage />} />
        <Route path="/trust/compliance" element={<TrustCompliancePage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<Navigate to="/legal/privacy" replace />} />
        <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/security.txt" element={<Navigate to="/security" replace />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/assurance" element={<AssuranceDashboardPage />} />
        <Route path="/sales" element={<MediaSalesLandingPage />} />
        <Route path="/sales/listings" element={<PropertyListingsPage />} />
        <Route path="/sales/listings/:slug" element={<PropertyListingDetailPage />} />
        <Route path="/sales/inquire" element={<PropertyInquirePage />} />
      </Route>
      </Routes>
    </Suspense>
  )
}
