import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import BentoShowcase from './components/BentoShowcase'
import Inventory from './components/Inventory'
import Testimonials from './components/Testimonials'
import SellCTA from './components/SellCTA'
import Footer from './components/Footer'

export default function App() {
  const [searchFilter, setSearchFilter] = useState(null)

  return (
    <div className="min-h-screen bg-[#0a0b12] text-white">
      <Navbar />
      <main>
        <Hero onSearch={setSearchFilter} />
        <StatsBar />
        <BentoShowcase />
        <Inventory searchFilter={searchFilter} />
        <Testimonials />
        <SellCTA />
      </main>
      <Footer />
    </div>
  )
}
