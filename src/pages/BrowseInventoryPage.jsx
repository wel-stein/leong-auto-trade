import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  SlidersHorizontal, ChevronRight, Heart, Star,
  Gauge, Fuel, Zap, ChevronDown, X, RotateCcw,
  Grid3X3, List, ChevronLeft, Search,
} from 'lucide-react'
import { ALL_CARS } from '../data/cars'

const BODY_STYLES = ['SUV', 'Sedan', 'Coupe', 'Truck', 'Convertible', 'Wagon']
const FUEL_TYPES  = ['Gasoline', 'Electric', 'Hybrid', 'Diesel']
const TRANSMISSIONS = ['All Types', 'Automatic', 'Manual']
const SORT_OPTIONS = [
  'Newest Listed',
  'Price: Low to High',
  'Price: High to Low',
  'Lowest Mileage',
  'Highest Rated',
]

const BADGE_COLORS = {
  blue:   'bg-primary-500/15 text-primary-300 border-primary-500/25',
  red:    'bg-red-500/15 text-red-300 border-red-500/25',
  purple: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  orange: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  green:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  gold:   'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
  teal:   'bg-teal-500/15 text-teal-300 border-teal-500/25',
}

function VehicleCard({ car }) {
  const [liked, setLiked] = useState(false)
  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <Link to={`/inventory/${car.id}`}
      className="group glass-card rounded-2xl overflow-hidden border border-white/[0.06]
                 hover:border-white/[0.14] hover:-translate-y-1.5 hover:shadow-card-hover
                 transition-all duration-400 block">
      <div className="relative aspect-video overflow-hidden bg-surface-high">
        <img src={car.image} alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className={`badge absolute top-3 left-3 border ${BADGE_COLORS[car.badgeColor] || BADGE_COLORS.blue}`}>
          {car.badge}
        </span>
        <button onClick={e => { e.preventDefault(); setLiked(!liked) }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                      backdrop-blur-sm border transition-all
                      ${liked ? 'bg-red-500/30 border-red-500/50 text-red-400' : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'}`}>
          <Heart size={13} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-sm border border-white/10">
          <span className="text-white font-bold text-sm">{fmt(car.price)}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-primary-400 text-[10px] font-bold uppercase tracking-widest">{car.make}</p>
            <h3 className="text-white font-bold text-base">{car.model}</h3>
            <p className="text-slate-500 text-xs mt-0.5">{car.year} · {car.color}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={11} className="text-yellow-400" fill="currentColor" />
            <span className="text-slate-300 text-xs font-semibold">{car.rating}</span>
            <span className="text-slate-600 text-xs">({car.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-3 border-b border-white/[0.06]">
          <span className="flex items-center gap-1"><Gauge size={11} />{new Intl.NumberFormat().format(car.mileage)} mi</span>
          <span className="flex items-center gap-1"><Fuel size={11} />{car.fuel}</span>
          <span className="flex items-center gap-1"><Zap size={11} />{car.specs.power}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-black text-lg">{fmt(car.price)}</p>
          <span className="text-primary-400 text-xs font-semibold px-3 py-1.5 rounded-lg
                           bg-primary-500/10 border border-primary-500/20
                           group-hover:bg-primary-500 group-hover:text-white group-hover:border-transparent
                           transition-all duration-200">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function BrowseInventoryPage() {
  const [search, setSearch]           = useState('')
  const [selectedStyles, setStyles]   = useState([])
  const [selectedFuels, setFuels]     = useState([])
  const [transmission, setTrans]      = useState('All Types')
  const [maxMileage, setMaxMileage]   = useState('')
  const [priceMin, setPriceMin]       = useState(0)
  const [priceMax, setPriceMax]       = useState(350000)
  const [sort, setSort]               = useState('Newest Listed')
  const [layout, setLayout]           = useState('grid')
  const [page, setPage]               = useState(1)
  const [mobileFilters, setMobFilter] = useState(false)
  const ITEMS_PER_PAGE = 6

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const resetFilters = () => {
    setStyles([]); setFuels([]); setTrans('All Types')
    setMaxMileage(''); setPriceMin(0); setPriceMax(350000); setSearch('')
  }

  const filtered = useMemo(() => {
    let cars = [...ALL_CARS]
    if (search) cars = cars.filter(c =>
      `${c.make} ${c.model} ${c.year}`.toLowerCase().includes(search.toLowerCase()))
    if (selectedStyles.length) cars = cars.filter(c => selectedStyles.includes(c.bodyStyle))
    if (selectedFuels.length) {
      const map = { Gasoline: 'Petrol', Electric: 'Electric', Hybrid: 'Hybrid', Diesel: 'Diesel' }
      cars = cars.filter(c => selectedFuels.some(f => c.fuel === (map[f] || f)))
    }
    if (transmission !== 'All Types') cars = cars.filter(c => c.transmission === transmission)
    if (maxMileage) cars = cars.filter(c => c.mileage <= Number(maxMileage.replace(/,/g, '')))
    cars = cars.filter(c => c.price >= priceMin && c.price <= priceMax)
    switch (sort) {
      case 'Price: Low to High':  return cars.sort((a, b) => a.price - b.price)
      case 'Price: High to Low':  return cars.sort((a, b) => b.price - a.price)
      case 'Lowest Mileage':      return cars.sort((a, b) => a.mileage - b.mileage)
      case 'Highest Rated':       return cars.sort((a, b) => b.rating - a.rating)
      default: return cars
    }
  }, [search, selectedStyles, selectedFuels, transmission, maxMileage, priceMin, priceMax, sort])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const hasFilters = selectedStyles.length || selectedFuels.length || transmission !== 'All Types' || maxMileage

  const SidebarContent = () => (
    <div className="glass-card rounded-2xl p-5 border border-white/[0.06] sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-base flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-primary-400" /> Filters
        </h2>
        {hasFilters && (
          <button onClick={resetFilters}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-xs transition-colors">
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Price Range</p>
        <div className="space-y-2">
          <input type="range" min={0} max={350000} step={5000} value={priceMax}
            onChange={e => setPriceMax(Number(e.target.value))}
            className="w-full accent-primary-500 h-1.5 bg-surface-high rounded-lg cursor-pointer" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$0</span>
            <span className="text-primary-400 font-semibold">
              Up to ${(priceMax / 1000).toFixed(0)}k
            </span>
            <span>$350k+</span>
          </div>
        </div>
      </div>

      {/* Body Style */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Body Style</p>
        <div className="space-y-2">
          {BODY_STYLES.map(s => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedStyles.includes(s)}
                onChange={() => toggle(selectedStyles, setStyles, s)}
                className="rounded border-white/20 bg-surface-high text-primary-500 focus:ring-primary-500/30 w-4 h-4" />
              <span className={`text-sm transition-colors ${selectedStyles.includes(s) ? 'text-primary-300' : 'text-slate-400 group-hover:text-white'}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Transmission</p>
        <div className="relative">
          <select value={transmission} onChange={e => setTrans(e.target.value)}
            className="input-dark appearance-none pr-8 cursor-pointer text-sm py-2.5">
            {TRANSMISSIONS.map(t => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Fuel Type */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Fuel Type</p>
        <div className="flex flex-wrap gap-2">
          {FUEL_TYPES.map(f => (
            <button key={f} onClick={() => toggle(selectedFuels, setFuels, f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${selectedFuels.includes(f)
                  ? 'bg-primary-500/20 border-primary-500/40 text-primary-300'
                  : 'border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Max Mileage */}
      <div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Max Mileage</p>
        <input type="text" value={maxMileage} onChange={e => setMaxMileage(e.target.value)}
          placeholder="e.g. 50,000"
          className="input-dark text-sm py-2.5" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            Home <ChevronRight size={13} />
          </Link>
          <span className="text-primary-400 font-semibold">Inventory</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <SidebarContent />
          </aside>

          {/* Main content */}
          <section className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
                    placeholder="Search make, model..."
                    className="input-dark pl-9 text-sm py-2.5 w-full" />
                </div>
                {/* Mobile filter toggle */}
                <button onClick={() => setMobFilter(true)}
                  className="md:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.08]
                             text-slate-400 text-sm hover:text-white hover:border-white/15 transition-all">
                  <SlidersHorizontal size={14} /> Filters
                </button>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-slate-500 text-sm shrink-0">
                  <span className="text-white font-semibold">{filtered.length}</span> vehicles
                </p>
                {/* Sort */}
                <div className="relative">
                  <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}
                    className="appearance-none bg-surface-high border border-white/[0.08] rounded-xl
                               pl-3 pr-7 py-2 text-slate-300 text-xs focus:outline-none
                               focus:border-primary-500/40 cursor-pointer transition-all">
                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                {/* Layout toggle */}
                <div className="flex items-center gap-1 p-1 bg-surface-high rounded-xl border border-white/[0.06]">
                  {[{ id: 'grid', I: Grid3X3 }, { id: 'list', I: List }].map(({ id, I }) => (
                    <button key={id} onClick={() => setLayout(id)}
                      className={`p-1.5 rounded-lg transition-all
                        ${layout === id ? 'bg-primary-500/20 text-primary-400' : 'text-slate-500 hover:text-slate-300'}`}>
                      <I size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedStyles.map(s => (
                  <span key={s} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs
                                          bg-primary-500/10 border border-primary-500/25 text-primary-300">
                    {s}
                    <button onClick={() => toggle(selectedStyles, setStyles, s)}><X size={11} /></button>
                  </span>
                ))}
                {selectedFuels.map(f => (
                  <span key={f} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs
                                          bg-primary-500/10 border border-primary-500/25 text-primary-300">
                    {f}
                    <button onClick={() => toggle(selectedFuels, setFuels, f)}><X size={11} /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            {paginated.length > 0 ? (
              <div className={layout === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'flex flex-col gap-4'}>
                {paginated.map(car => <VehicleCard key={car.id} car={car} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 rounded-2xl bg-surface-high flex items-center justify-center mb-4">
                  <Search size={22} className="text-slate-600" />
                </div>
                <h3 className="text-white font-bold mb-2">No vehicles found</h3>
                <p className="text-slate-500 text-sm mb-5">Try adjusting your filters.</p>
                <button onClick={resetFilters} className="btn-ghost text-sm py-2">Clear Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center
                             text-slate-400 hover:text-white disabled:opacity-30 transition-all">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all
                      ${p === page
                        ? 'bg-primary-500 text-white shadow-glow-blue'
                        : 'border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/15'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center
                             text-slate-400 hover:text-white disabled:opacity-30 transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobFilter(false)} />
          <aside className="absolute top-0 right-0 h-full w-80 glass border-l border-white/[0.07]
                            flex flex-col pt-4 pb-8 px-5 gap-0 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <span className="text-white font-bold">Filters</span>
              <button onClick={() => setMobFilter(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </div>
  )
}
