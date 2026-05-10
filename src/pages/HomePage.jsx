import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FEATURED_CARS, MAKES, PRICE_RANGES, STATS, TESTIMONIALS } from '../data/cars'
import CarCard from '../components/CarCard'

const BODY_TYPES = ['All Types', 'Coupe', 'Sedan', 'SUV', 'Convertible', 'Wagon']

export default function HomePage() {
  const [make, setMake] = useState('')
  const [budget, setBudget] = useState('')
  const [bodyType, setBodyType] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (make) params.set('make', make)
    if (budget) params.set('budget', budget)
    if (bodyType && bodyType !== 'All Types') params.set('body', bodyType)
    navigate(`/inventory?${params.toString()}`)
  }

  const selectClass =
    'bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl p-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm w-full h-[48px]'

  return (
    <div className="pt-20">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative bg-[#191b23] py-24 md:py-[120px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-40"
            style={{ filter: 'grayscale(20%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#191b23]/60 via-[#191b23]/40 to-[#191b23]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-1.5 bg-primary/20 text-[#adc6ff] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-primary/30">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Certified Premium Marketplace
          </span>
          <h1 className="text-display-lg text-white mb-4 tracking-tight">
            Find your dream car
          </h1>
          <p className="text-body-lg text-[#e1e2ec]/80 mb-10 max-w-2xl mx-auto">
            Browse thousands of certified premium vehicles. Transparent pricing, verified sellers,
            and financing in minutes.
          </p>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto bg-surface p-md rounded-xl shadow-lg border border-[#c2c6d6]/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select value={make} onChange={(e) => setMake(e.target.value)} className={selectClass}>
                <option value="">All Makes</option>
                {MAKES.slice(1).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectClass}>
                <option value="">Any Budget</option>
                {PRICE_RANGES.map((r) => (
                  <option key={r.label} value={r.label}>{r.label}</option>
                ))}
              </select>

              <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className={selectClass}>
                {BODY_TYPES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="bg-primary h-[48px] rounded-xl text-white flex items-center justify-center gap-2 font-semibold text-sm hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────── */}
      <div className="bg-on-background py-10 border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold text-white tracking-tight">{value}</p>
              <p className="text-[#c2c6d6]/70 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Cards ───────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 py-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-[#c2c6d6]/15 flex items-center justify-between group hover:border-primary/30 hover:shadow-md transition-all">
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
            <div className="w-16 h-16 rounded-xl bg-primary/8 flex items-center justify-center hidden sm:flex shrink-0 ml-4">
              <span className="material-symbols-outlined text-[36px] text-primary/40">directions_car</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-[#c2c6d6]/15 flex items-center justify-between group hover:border-primary/30 hover:shadow-md transition-all">
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
            <div className="w-16 h-16 rounded-xl bg-primary/8 flex items-center justify-center hidden sm:flex shrink-0 ml-4">
              <span className="material-symbols-outlined text-[36px] text-primary/40">sell</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Signals ───────────────────────────────────── */}
      <div className="border-y border-[#c2c6d6]/20 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            {[
              { icon: 'verified', title: 'Certified Quality', sub: '250-point inspection' },
              { icon: 'shield', title: 'Buyer Protection', sub: '7-day money back' },
              { icon: 'account_balance', title: 'Financing Made Easy', sub: 'Instant approval' },
              { icon: 'support_agent', title: 'Dedicated Support', sub: 'Available 7 days a week' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[9999px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">{icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{title}</p>
                  <p className="text-on-surface-variant text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Inventory ──────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 py-xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Hand-Picked</p>
            <h2 className="text-headline-lg text-on-surface">Featured Inventory</h2>
            <p className="text-on-surface-variant text-body-md mt-1">
              Premium vehicles with verified history and certified quality.
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

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="bg-surface-container-low py-xl border-t border-[#c2c6d6]/20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="text-headline-lg text-on-surface mb-3">Trusted by 50,000+ buyers &amp; sellers</h2>
            <p className="text-on-surface-variant text-body-md max-w-xl mx-auto">
              AutoPremium is the gold standard for buying and selling premium vehicles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-surface-container-lowest rounded-xl p-lg border border-[#c2c6d6]/15 shadow-sm text-left flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px] text-yellow-500"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                    >star</span>
                  ))}
                </div>
                <p className="text-on-surface text-sm italic leading-relaxed mb-3 flex-1">"{t.text}"</p>
                <p className="text-on-surface-variant text-xs mb-3">
                  <span className="material-symbols-outlined text-[12px] align-middle mr-1">directions_car</span>
                  {t.car}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#c2c6d6]/15">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-[9999px] object-cover" />
                  <div>
                    <p className="text-on-surface text-xs font-semibold">{t.name}</p>
                    <p className="text-on-surface-variant text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ───────────────────────────────── */}
      <section className="bg-[#191b23] py-16">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Ready to find your next vehicle?</h2>
            <p className="text-[#c2c6d6]/70 text-body-md">Join thousands of satisfied buyers on AutoPremium today.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/inventory"
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-colors"
            >
              Browse Inventory
            </Link>
            <Link
              to="/financing"
              className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Get Financing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
