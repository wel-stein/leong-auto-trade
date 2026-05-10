import { useState } from 'react'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import BentoShowcase from '../components/BentoShowcase'
import Inventory from '../components/Inventory'
import Testimonials from '../components/Testimonials'
import SellCTA from '../components/SellCTA'

export default function HomePage() {
  const [searchFilter, setSearchFilter] = useState(null)

  return (
    <>
      <Hero onSearch={setSearchFilter} />
      <StatsBar />
      <BentoShowcase />
      <Inventory searchFilter={searchFilter} />
      <Testimonials />
      <SellCTA />
    </>
  )
}
