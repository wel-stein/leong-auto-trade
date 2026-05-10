import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Heart, Tag, ListOrdered, Settings,
  TrendingUp, Shield, ChevronRight, MoreVertical,
  Star, Gauge, Bell, Plus, ArrowUpRight, CheckCircle2,
} from 'lucide-react'
import { FEATURED_CARS } from '../data/cars'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview',    active: true },
  { icon: Heart,           label: 'My Saved Cars' },
  { icon: Tag,             label: 'Active Offers' },
  { icon: ListOrdered,     label: 'My Listings' },
  { icon: Settings,        label: 'Settings' },
]

const SAVED_CARS = [
  {
    id: 1,
    name: 'Porsche 911 Carrera',
    year: 2023, mileage: '8.4k miles', drive: 'AWD',
    price: 124500,
    image: FEATURED_CARS[0].image,
  },
  {
    id: 2,
    name: 'BMW M5 Performance',
    year: 2022, mileage: '12k miles', drive: 'Gasoline',
    price: 98000,
    image: FEATURED_CARS[1].image,
  },
]

const OFFERS = [
  {
    id: 'AP-29384', name: 'Mercedes-Benz S-Class',
    price: 85200, status: 'Pending Inspection',
    statusColor: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
  },
  {
    id: 'AP-41092', name: 'Range Rover Sport',
    price: 72500, status: 'Final Review',
    statusColor: 'bg-primary-500/15 text-primary-300 border-primary-500/25',
  },
  {
    id: 'AP-55831', name: 'Audi RS6 Avant',
    price: 105000, status: 'Offer Accepted',
    statusColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  },
]

const STATS = [
  { label: 'Saved Cars',    value: '12',     icon: Heart,      color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  { label: 'Active Offers', value: '3',      icon: Tag,        color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  { label: 'My Listings',   value: '2',      icon: ListOrdered, color: 'text-primary-400 bg-primary-500/10 border-primary-500/20' },
  { label: 'Profile Score', value: '94%',    icon: TrendingUp, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
]

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [mobileNav, setMobileNav] = useState(false)

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="min-h-screen pt-[72px] flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/[0.06] py-8 px-5 bg-surface-low shrink-0 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => setActiveNav(label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${activeNav === label
                  ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'}`}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* User profile */}
        <div className="border-t border-white/[0.06] pt-5 mt-5">
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 border border-primary-500/30
                            flex items-center justify-center text-primary-300 font-bold text-sm">
              JD
            </div>
            <div>
              <p className="text-white font-semibold text-sm">John Doe</p>
              <p className="text-slate-500 text-xs">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 py-8 min-w-0">
        {/* Mobile horizontal section nav — hidden on md+ where sidebar is shown */}
        <nav className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-4 px-4">
          {NAV_ITEMS.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => setActiveNav(label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border
                ${activeNav === label
                  ? 'bg-primary-500/15 text-primary-300 border-primary-500/30'
                  : 'text-slate-400 border-white/[0.08] hover:text-white hover:border-white/15'}`}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Welcome back, John 👋</h1>
            <p className="text-slate-500 text-sm">Manage your inventory, tracked vehicles, and active sales.</p>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="relative w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center
                               text-slate-400 hover:text-white hover:border-white/15 transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </button>
            <Link to="/sell" className="btn-primary text-sm py-2.5">
              <Plus size={15} /> List Vehicle
            </Link>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 border ${color}`}>
                <Icon size={15} />
              </div>
              <p className="text-white font-black text-2xl mb-0.5">{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — Saved + Recommended */}
          <div className="lg:col-span-8 space-y-8">
            {/* Saved vehicles */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-white">Saved Vehicles</h2>
                <Link to="/inventory" className="text-primary-400 text-xs font-semibold hover:text-primary-300 flex items-center gap-1 transition-colors">
                  View All <ArrowUpRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAVED_CARS.map(car => (
                  <Link to={`/inventory/${car.id}`} key={car.id}
                    className="glass-card rounded-2xl overflow-hidden border border-white/[0.06]
                               hover:border-primary-500/30 transition-all group block">
                    <img src={car.image} alt={car.name} loading="lazy"
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="p-4">
                      <h3 className="text-white font-bold text-sm mb-2">{car.name}</h3>
                      <div className="flex gap-2 mb-3">
                        {[String(car.year), car.mileage, car.drive].map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-surface-high text-slate-400 text-[10px] font-medium">{tag}</span>
                        ))}
                      </div>
                      <p className="text-primary-400 font-black text-lg">{fmt(car.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recommended — Bento */}
            <section>
              <h2 className="text-lg font-black text-white mb-5">Recommended For You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Hero rec */}
                <div className="sm:col-span-2 relative group overflow-hidden rounded-2xl h-56 cursor-pointer border border-white/[0.06]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img src={FEATURED_CARS[4].image} alt="Recommended vehicle" loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 p-5 z-20">
                    <span className="badge bg-primary-500 text-white border-0 mb-2">Best Match</span>
                    <h4 className="text-white font-black text-lg">{FEATURED_CARS[4].make} {FEATURED_CARS[4].model}</h4>
                    <p className="text-slate-300 text-sm font-semibold">{fmt(FEATURED_CARS[4].price)}</p>
                  </div>
                </div>

                {/* Market trend card */}
                <div className="glass-card rounded-2xl p-5 border border-primary-500/20 bg-primary-500/[0.04] flex flex-col justify-center">
                  <div className="w-11 h-11 rounded-xl bg-primary-500/15 flex items-center justify-center mb-4">
                    <TrendingUp size={20} className="text-primary-400" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Market Trend</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">
                    Values for SUVs like your saved Audi are up <span className="text-emerald-400 font-semibold">4%</span> this month.
                  </p>
                  <button className="text-primary-400 text-xs font-semibold flex items-center gap-1 hover:text-primary-300 transition-colors">
                    See details <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right — Offers + Trust */}
          <div className="lg:col-span-4 space-y-5">
            {/* Active Offers */}
            <section className="glass-card rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-black text-white">Active Selling Offers</h2>
                <span className="badge bg-primary-500/15 border border-primary-500/25 text-primary-300">
                  {OFFERS.length} active
                </span>
              </div>

              <div className="space-y-3">
                {OFFERS.map(offer => (
                  <div key={offer.id}
                    className="p-4 rounded-xl border border-white/[0.06] hover:border-primary-500/30 transition-all bg-surface-high/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{offer.name}</h4>
                        <p className="text-slate-500 text-[11px]">ID: #{offer.id}</p>
                      </div>
                      <span className={`badge border text-[10px] ${offer.statusColor}`}>{offer.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-primary-400 font-black text-base">{fmt(offer.price)}</p>
                      <button aria-label={`More options for ${offer.name}`} className="text-slate-500 hover:text-slate-300 transition-colors">
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/sell"
                className="flex items-center justify-center gap-2 w-full mt-5 py-3 rounded-xl
                           border border-white/[0.08] text-slate-400 text-sm font-semibold
                           hover:text-white hover:border-white/15 transition-all">
                <Plus size={15} /> List New Vehicle
              </Link>
            </section>

            {/* Trust / Protection Card */}
            <section className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#0a0f1e]" />
              <div className="absolute inset-0 ring-1 ring-white/[0.07] rounded-2xl" />
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Shield size={18} className="text-primary-400" />
                  </div>
                  <h3 className="text-white font-bold text-base">Elite Protection</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Your account is covered by our Certified Buyer Protection. Every transaction is monitored for 100% security.
                </p>
                <div className="space-y-2 mb-4">
                  {['SSL-Encrypted Transactions', 'Fraud Monitoring 24/7', 'Buyer-Seller Dispute Resolution'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <p className="text-slate-500 text-[11px]">
                    Verified member since <span className="text-slate-300 font-semibold">Dec 12, 2023</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Quick stats */}
            <section className="glass-card rounded-2xl p-5 border border-white/[0.06]">
              <h3 className="text-white font-bold text-sm mb-4">Activity Overview</h3>
              <div className="space-y-3">
                {[
                  { label: 'Profile Views', value: '1,284', change: '+12%', up: true },
                  { label: 'Listing Views', value: '496',   change: '+8%',  up: true },
                  { label: 'Messages',       value: '23',    change: '-3%',  up: false },
                ].map(({ label, value, change, up }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Gauge size={13} className="text-slate-600" />
                      <span className="text-slate-400">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{value}</span>
                      <span className={`text-[10px] font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>{change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
