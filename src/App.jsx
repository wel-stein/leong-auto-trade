import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import BrowseInventoryPage from './pages/BrowseInventoryPage'
import VehicleDetailsPage from './pages/VehicleDetailsPage'
import FinancingPage from './pages/FinancingPage'
import SellYourCarPage from './pages/SellYourCarPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0b12] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0">
          <Routes>
            <Route path="/"              element={<HomePage />} />
            <Route path="/inventory"     element={<BrowseInventoryPage />} />
            <Route path="/inventory/:id" element={<VehicleDetailsPage />} />
            <Route path="/financing"     element={<FinancingPage />} />
            <Route path="/sell"          element={<SellYourCarPage />} />
            <Route path="/dashboard"     element={<DashboardPage />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
