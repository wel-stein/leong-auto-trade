import { useState, useMemo } from 'react'
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react'
import CarCard from './CarCard'
import { ALL_CARS, BODY_STYLES, FUEL_TYPES, TRANSMISSIONS } from '../data/cars'

const SORT_OPTIONS = [
  { label: 'Price: Low to High', fn: (a, b) => a.price - b.price },
  { label: 'Price: High to Low', fn: (a, b) => b.price - a.price },
  { label: 'Lowest Mileage',     fn: (a, b) => a.mileage - b.mileage },
  { label: 'Highest Rated',      fn: (a, b) => b.rating - a.rating },
]

export default function Inventory({ searchFilter }) {
  const [layout, setLayout] = useState('grid')
  const [sortIdx, setSortIdx] = useState(0)
  const [bodyStyle, setBodyStyle] = useState('All')
  const [fuel, setFuel] = useState('All')
  const [transmission, setTransmission] = useState('All')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let cars = [...ALL_CARS]

    if (searchFilter) {
      const { make, model, priceRange } = searchFilter
      if (make && make !== 'All Makes')   cars = cars.filter(c => c.make === make)
      if (model && model !== 'All Models') cars = cars.filter(c => c.model === model)
      if (priceRange) {
        cars = cars.filter(c => c.price >= priceRange.min && c.price < (priceRange.max === Infinity ? 99999999 : priceRange.max))
      }
    }

    if (bodyStyle !== 'All')      cars = cars.filter(c => c.bodyStyle === bodyStyle)
    if (fuel !== 'All')           cars = cars.filter(c => c.fuel === fuel)
    if (transmission !== 'All')   cars = cars.filter(c => c.transmission === transmission)

    return cars.sort(SORT_OPTIONS[sortIdx].fn)
  }, [searchFilter, bodyStyle, fuel, transmission, sortIdx])

  const clearFilters = () => {
    setBodyStyle('All')
    setFuel('All')
    setTransmission('All')
  }

  const hasActiveFilters = bodyStyle !== 'All' || fuel !== 'All' || transmission !== 'All'

  return (
    <section id="inventory" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-primary-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Browse Collection
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Premium Inventory
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortIdx}
                onChange={e => setSortIdx(Number(e.target.value))}
                className="appearance-none bg-surface-high border border-white/[0.08] rounded-xl
                           pl-4 pr-8 py-2.5 text-slate-300 text-sm focus:outline-none
                           focus:border-primary-500/50 cursor-pointer transition-all"
              >
                {SORT_OPTIONS.map((o, i) => (
                  <option key={o.label} value={i}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium
                          transition-all duration-200
                          ${filtersOpen || hasActiveFilters
                            ? 'bg-primary-500/15 border-primary-500/40 text-primary-300'
                            : 'border-white/[0.08] text-slate-400 hover:text-white hover:border-white/15'
                          }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 flex items-center justify-center bg-primary-500 text-white text-[10px] font-bold rounded-full">
                  {[bodyStyle, fuel, transmission].filter(f => f !== 'All').length}
                </span>
              )}
            </button>

            {/* Layout toggle */}
            <div className="flex items-center gap-1 p-1 bg-surface-high rounded-xl border border-white/[0.06]">
              {[{ id: 'grid', Icon: Grid3X3 }, { id: 'list', Icon: List }].map(({ id, Icon }) => (
                <button
                  key={id}
                  onClick={() => setLayout(id)}
                  className={`p-2 rounded-lg transition-all duration-200
                    ${layout === id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="glass-card rounded-2xl p-5 mb-8 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold text-sm">Refine Results</span>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-slate-400 hover:text-white text-xs transition-colors"
                >
                  <X size={13} /> Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Body Style', value: bodyStyle, options: BODY_STYLES, set: setBodyStyle },
                { label: 'Fuel Type',  value: fuel,      options: FUEL_TYPES,   set: setFuel },
                { label: 'Transmission', value: transmission, options: TRANSMISSIONS, set: setTransmission },
              ].map(({ label, value, options, set }) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => set(opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                          ${value === opt
                            ? 'bg-primary-500/20 border-primary-500/40 text-primary-300'
                            : 'border-white/[0.08] text-slate-400 hover:border-white/15 hover:text-white'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Car grid */}
        {filtered.length > 0 ? (
          <div
            className={
              layout === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'flex flex-col gap-4'
            }
          >
            {filtered.map((car, i) => (
              <div
                key={car.id}
                className="animate-fade-up"
                style={{ animationDelay: `${(i % 6) * 60}ms` }}
              >
                <CarCard car={car} featured={i === 0} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-high flex items-center justify-center mb-4">
              <SlidersHorizontal size={24} className="text-slate-600" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">No vehicles found</h3>
            <p className="text-slate-500 text-sm mb-6">Try adjusting your filters or search criteria.</p>
            <button onClick={clearFilters} className="btn-ghost text-sm py-2">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
