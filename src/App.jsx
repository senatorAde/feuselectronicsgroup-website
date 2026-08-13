import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeusAiPage from './pages/FeusAiPage'
import CopilotLandingPage from './pages/CopilotLandingPage'
import ServicesPage from './pages/ServicesPage'
import SolutionsPage from './pages/SolutionsPage'
import ContactPage from './pages/ContactPage'
import InsightsPage from './pages/InsightsPage'
import AgentsPage from './pages/AgentsPage'
import OracleOpsPage from './pages/OracleOpsPage'
import SqlOpsPage from './pages/SqlOpsPage'
import RequestOpsPage from './pages/RequestOpsPage'
import ControlPlanePage from './pages/ControlPlanePage'
import IntegrationsPage from './pages/IntegrationsPage'
import ItsmConnectPage from './pages/ItsmConnectPage'
import DemoPage from './pages/DemoPage'
import PricingPage from './pages/PricingPage'
import MediaSalesLandingPage from './pages/MediaSalesLandingPage'
import PropertyListingsPage from './pages/PropertyListingsPage'
import PropertyListingDetailPage from './pages/PropertyListingDetailPage'
import PropertyInquirePage from './pages/PropertyInquirePage'

/*
 * Trust Center / assurance surfaces are lazy-loaded so exact-revision release
 * evidence (data/releaseAssessment.js) ships in its own chunk and is absent
 * from the marketing bundle.
 */
const TrustPage = lazy(() => import('./pages/TrustPage'))
const TrustSecurityPage = lazy(() => import('./pages/TrustSecurityPage'))
const TrustCompliancePage = lazy(() => import('./pages/TrustCompliancePage'))
const StatusPage = lazy(() => import('./pages/StatusPage'))
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const ReleaseNotesPage = lazy(() => import('./pages/ReleaseNotesPage'))
const AssuranceDashboardPage = lazy(() => import('./pages/AssuranceDashboardPage'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feus-ai" element={<FeusAiPage />} />
        <Route path="/copilot" element={<CopilotLandingPage />} />
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
