import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_CARS } from '../data/cars'

const NAV_ITEMS = [
  { icon: 'dashboard', label: 'Overview' },
  { icon: 'favorite', label: 'My Saved Cars' },
  { icon: 'local_offer', label: 'Active Offers' },
  { icon: 'list_alt', label: 'My Listings' },
  { icon: 'settings', label: 'Settings' },
]

const SAVED_CARS = [
  {
    id: 1,
    name: 'Porsche 911 Carrera',
    year: 2023,
    mileage: '8.4k miles',
    drive: 'AWD',
    price: 124500,
    image: FEATURED_CARS[0].image,
  },
  {
    id: 2,
    name: 'BMW M5 Performance',
    year: 2022,
    mileage: '12k miles',
    drive: 'Gasoline',
    price: 98000,
    image: FEATURED_CARS[1].image,
  },
]

const OFFERS = [
  {
    id: 'AP-29384',
    name: 'Mercedes-Benz S-Class',
    price: 85200,
    status: 'Pending Inspection',
  },
  {
    id: 'AP-41092',
    name: 'Range Rover Sport',
    price: 72500,
    status: 'Final Review',
  },
  {
    id: 'AP-55831',
    name: 'Audi RS6 Avant',
    price: 105000,
    status: 'Offer Accepted',
  },
]

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview')

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-[#c2c6d6]/10 py-xl gap-md px-6 bg-surface shrink-0">
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_ITEMS.map(({ icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeNav === label
                    ? 'bg-primary-container/10 text-primary border border-primary/15'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* User profile */}
          <div className="border-t border-[#c2c6d6]/15 pt-5 mt-5">
            <div className="flex items-center gap-3 px-4">
              <div className="w-10 h-10 rounded-[9999px] bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-sm">
                JD
              </div>
              <div>
                <p className="text-on-surface font-semibold text-sm">John Doe</p>
                <p className="text-on-surface-variant text-xs">Premium Member</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-6 py-xl min-w-0">
          {/* Mobile pill nav */}
          <nav className="md:hidden flex overflow-x-auto gap-2 mb-6 scrollbar-hide">
            {NAV_ITEMS.map(({ icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${
                  activeNav === label
                    ? 'bg-primary-container/10 text-primary border-primary/20'
                    : 'text-on-surface-variant border-[#c2c6d6]/30 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-headline-lg text-on-surface mb-1">Welcome back, John 👋</h1>
              <p className="text-on-surface-variant text-sm">Manage your inventory, tracked vehicles, and active sales.</p>
            </div>
            <Link
              to="/sell"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              List Vehicle
            </Link>
          </div>

          {/* 12-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Left col-span-8 */}
            <div className="lg:col-span-8 space-y-8">
              {/* Saved Vehicles */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-headline-md text-on-surface">Saved Vehicles</h2>
                  <Link
                    to="/inventory"
                    className="text-primary text-xs font-semibold hover:text-primary-container flex items-center gap-1 transition-colors"
                  >
                    View All
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAVED_CARS.map((car) => (
                    <Link
                      to={`/inventory/${car.id}`}
                      key={car.id}
                      className="bg-surface rounded-xl overflow-hidden border border-[#c2c6d6]/15 hover:border-primary/30 transition-all group block"
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        loading="lazy"
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="p-4">
                        <h3 className="text-on-surface font-semibold text-sm mb-2">{car.name}</h3>
                        <div className="flex gap-2 mb-3">
                          {[String(car.year), car.mileage, car.drive].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-surface-container text-on-secondary-container text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-primary font-bold text-lg">{fmt(car.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recommended Bento */}
              <section>
                <h2 className="text-headline-md text-on-surface mb-5">Recommended For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Hero rec — col-span-2 */}
                  <div className="sm:col-span-2 relative group overflow-hidden rounded-xl h-56 cursor-pointer border border-[#c2c6d6]/15">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                      src={FEATURED_CARS[4].image}
                      alt="Recommended vehicle"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 p-5 z-20">
                      <span className="text-xs font-semibold bg-primary text-on-primary px-2 py-1 rounded-full mb-2 inline-block">Best Match</span>
                      <h4 className="text-white font-bold text-lg">{FEATURED_CARS[4].make} {FEATURED_CARS[4].model}</h4>
                      <p className="text-[#e1e2ec]/80 text-sm font-semibold">{fmt(FEATURED_CARS[4].price)}</p>
                    </div>
                  </div>

                  {/* Market Trend card */}
                  <div className="bg-surface-container rounded-xl p-lg border border-primary/15 flex flex-col justify-center">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[22px] text-primary">analytics</span>
                    </div>
                    <h4 className="text-on-surface font-semibold text-sm mb-2">Market Trend</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed mb-4">
                      Values for SUVs like your saved Audi are up{' '}
                      <span className="text-primary font-semibold">4%</span> this month.
                    </p>
                    <button className="text-primary text-xs font-semibold flex items-center gap-1 hover:text-primary-container transition-colors">
                      See details
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Right col-span-4 */}
            <div className="lg:col-span-4 space-y-5">
              {/* Active Offers */}
              <section className="bg-surface-container-lowest border border-[#c2c6d6]/15 rounded-xl p-lg">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-on-surface font-semibold text-base">Active Selling Offers</h2>
                  <span className="text-xs font-semibold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                    {OFFERS.length} active
                  </span>
                </div>

                <div className="space-y-3">
                  {OFFERS.map((offer) => (
                    <div
                      key={offer.id}
                      className="p-4 rounded-xl border border-[#c2c6d6]/15 hover:border-primary/20 transition-all bg-surface-container-low"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-on-surface font-semibold text-sm">{offer.name}</h4>
                          <p className="text-on-surface-variant text-xs">ID: #{offer.id}</p>
                        </div>
                        <span className="text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {offer.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-bold text-base">{fmt(offer.price)}</p>
                        <button
                          aria-label={`More options for ${offer.name}`}
                          className="text-on-surface-variant hover:text-on-surface transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/sell"
                  className="flex items-center justify-center gap-2 w-full mt-5 py-3 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-on-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  List New Vehicle
                </Link>
              </section>

              {/* Trust Card */}
              <section className="bg-on-background text-surface p-lg rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-[#adc6ff]">verified</span>
                  </div>
                  <h3 className="text-white font-semibold text-base">Elite Protection</h3>
                </div>
                <p className="text-[#e1e2ec]/70 text-sm leading-relaxed mb-5">
                  Your account is covered by our Certified Buyer Protection. Every transaction is monitored for 100% security.
                </p>
                <div className="space-y-2 mb-4">
                  {['SSL-Encrypted Transactions', 'Fraud Monitoring 24/7', 'Dispute Resolution Support'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#e1e2ec]/70">
                      <span
                        className="material-symbols-outlined text-[16px] text-[#adc6ff] shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                      >
                        check_circle
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[#e1e2ec]/50 text-xs">
                    Verified member since{' '}
                    <span className="text-[#e1e2ec]/80 font-semibold">Dec 12, 2023</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
