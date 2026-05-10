import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_CARS, MAKES, PRICE_RANGES } from '../data/cars'
import CarCard from '../components/CarCard'

const BODY_TYPES = ['All Types', 'Coupe', 'Sedan', 'SUV', 'Convertible', 'Wagon']

export default function HomePage() {
  const [make, setMake] = useState('')
  const [budget, setBudget] = useState('')
  const [bodyType, setBodyType] = useState('')

  const selectClass =
    'bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl p-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm w-full h-[48px]'

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-[#191b23] py-24 md:py-[120px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-40"
            style={{ filter: 'grayscale(20%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#191b23]/60 via-[#191b23]/40 to-[#191b23]" />
        </div>

        {/* Content */}
        <div className="relative max-w-[1280px] mx-auto px-6 text-center">
          <h1 className="text-display-lg text-white mb-4 tracking-tight">
            Find your dream car
          </h1>
          <p className="text-body-lg text-[#e1e2ec]/80 mb-10 max-w-2xl mx-auto">
            Browse thousands of certified premium vehicles. Transparent pricing, verified sellers, and financing in minutes.
          </p>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto bg-surface p-md rounded-xl shadow-lg border border-[#c2c6d6]/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className={selectClass}
              >
                <option value="">All Makes</option>
                {MAKES.slice(1).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={selectClass}
              >
                <option value="">Any Budget</option>
                {PRICE_RANGES.map((r) => (
                  <option key={r.label} value={r.label}>{r.label}</option>
                ))}
              </select>

              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className={selectClass}
              >
                {BODY_TYPES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <Link
                to="/inventory"
                className="bg-primary h-[48px] rounded-xl text-white flex items-center justify-center gap-2 font-semibold text-sm hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buy a Car */}
          <div className="bg-surface rounded-xl p-xl shadow-lg border border-[#c2c6d6]/10 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div>
              <h2 className="text-headline-md text-on-surface font-bold mb-2">Buy a Car</h2>
              <p className="text-on-surface-variant text-body-md mb-4 max-w-xs">
                Browse our certified inventory with transparent pricing and no-haggle deals.
              </p>
              <Link
                to="/inventory"
                className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Browse Inventory
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <span className="material-symbols-outlined text-[64px] text-primary/10 hidden sm:block select-none">
              directions_car
            </span>
          </div>

          {/* Sell Your Car */}
          <div className="bg-surface rounded-xl p-xl shadow-lg border border-[#c2c6d6]/10 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div>
              <h2 className="text-headline-md text-on-surface font-bold mb-2">Sell Your Car</h2>
              <p className="text-on-surface-variant text-body-md mb-4 max-w-xs">
                Get a certified valuation and sell to verified buyers for the best price.
              </p>
              <Link
                to="/sell"
                className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Get an Offer
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <span className="material-symbols-outlined text-[64px] text-primary/10 hidden sm:block select-none">
              sell
            </span>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="max-w-[1280px] mx-auto px-6 py-xl border-b border-[#c2c6d6]/20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[9999px] bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <p className="font-semibold text-on-surface text-sm">Certified Quality</p>
              <p className="text-on-surface-variant text-xs">250-point inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[9999px] bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">shield</span>
            </div>
            <div>
              <p className="font-semibold text-on-surface text-sm">Buyer Protection</p>
              <p className="text-on-surface-variant text-xs">7-day money back</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[9999px] bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div>
              <p className="font-semibold text-on-surface text-sm">Financing Made Easy</p>
              <p className="text-on-surface-variant text-xs">Instant approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Inventory */}
      <section className="max-w-[1280px] mx-auto px-6 py-xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-headline-lg text-on-surface mb-2">Featured Inventory</h2>
            <p className="text-on-surface-variant text-body-md">
              Handpicked premium vehicles with verified history and certified quality.
            </p>
          </div>
          <Link
            to="/inventory"
            className="hidden md:flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
          >
            View All
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
          {FEATURED_CARS.slice(0, 3).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-on-primary transition-all"
          >
            View All Inventory
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Secondary CTA — Testimonial */}
      <section className="bg-surface-container-low py-xl">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-headline-lg text-on-surface mb-4">Trusted by 50,000+ buyers &amp; sellers</h2>
          <p className="text-on-surface-variant text-body-lg mb-10 max-w-2xl mx-auto">
            AutoPremium is the gold standard for buying and selling premium vehicles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-lg border border-[#c2c6d6]/15 shadow-sm text-left">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <p className="text-on-surface text-sm italic leading-relaxed mb-4">
                "Found my dream Porsche within 48 hours. The entire process was seamless — from browsing to financing."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#c2c6d6]/15">
                <img src="https://i.pravatar.cc/64?img=11" alt="James" className="w-8 h-8 rounded-[9999px] object-cover" />
                <div>
                  <p className="text-on-surface text-xs font-semibold">James Whitfield</p>
                  <p className="text-on-surface-variant text-xs">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-lg border border-[#c2c6d6]/15 shadow-sm text-left">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <p className="text-on-surface text-sm italic leading-relaxed mb-4">
                "Exceptional service and an incredibly curated inventory. The financing tools made everything transparent."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#c2c6d6]/15">
                <img src="https://i.pravatar.cc/64?img=5" alt="Sophia" className="w-8 h-8 rounded-[9999px] object-cover" />
                <div>
                  <p className="text-on-surface text-xs font-semibold">Sophia Laurent</p>
                  <p className="text-on-surface-variant text-xs">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-lg border border-[#c2c6d6]/15 shadow-sm text-left">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <p className="text-on-surface text-sm italic leading-relaxed mb-4">
                "Sold my Ferrari for above asking price. The platform attracted the right buyers and the transaction took less than a week."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#c2c6d6]/15">
                <img src="https://i.pravatar.cc/64?img=33" alt="Marcus" className="w-8 h-8 rounded-[9999px] object-cover" />
                <div>
                  <p className="text-on-surface text-xs font-semibold">Marcus Chen</p>
                  <p className="text-on-surface-variant text-xs">Verified Seller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
