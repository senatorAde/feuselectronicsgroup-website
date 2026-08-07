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
import TrustPage from './pages/TrustPage'
import TrustSecurityPage from './pages/TrustSecurityPage'
import TrustCompliancePage from './pages/TrustCompliancePage'
import StatusPage from './pages/StatusPage'
import ArchitecturePage from './pages/ArchitecturePage'
import SqlOpsPage from './pages/SqlOpsPage'
import RequestOpsPage from './pages/RequestOpsPage'
import ControlPlanePage from './pages/ControlPlanePage'
import IntegrationsPage from './pages/IntegrationsPage'
import FaqPage from './pages/FaqPage'
import DemoPage from './pages/DemoPage'
import ReleaseNotesPage from './pages/ReleaseNotesPage'
import PricingPage from './pages/PricingPage'
import AssuranceDashboardPage from './pages/AssuranceDashboardPage'
import MediaSalesLandingPage from './pages/MediaSalesLandingPage'
import PropertyListingsPage from './pages/PropertyListingsPage'
import PropertyListingDetailPage from './pages/PropertyListingDetailPage'
import PropertyInquirePage from './pages/PropertyInquirePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feus-ai" element={<FeusAiPage />} />
        <Route path="/copilot" element={<CopilotLandingPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        {/* Legacy route: /how-it-works overstated the pipeline; superseded by /architecture */}
        <Route path="/how-it-works" element={<Navigate to="/architecture" replace />} />
        <Route path="/sqlops" element={<SqlOpsPage />} />
        <Route path="/requestops" element={<RequestOpsPage />} />
        <Route path="/control-plane" element={<ControlPlanePage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
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
  )
}
