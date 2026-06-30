import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeusAiPage from './pages/FeusAiPage'
import CopilotLandingPage from './pages/CopilotLandingPage'
import HowItWorksPage from './pages/HowItWorksPage'
import ServicesPage from './pages/ServicesPage'
import SolutionsPage from './pages/SolutionsPage'
import ContactPage from './pages/ContactPage'
import InsightsPage from './pages/InsightsPage'
import TrustPage from './pages/TrustPage'
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
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/trust" element={<TrustPage />} />
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
