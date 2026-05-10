import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ALL_CARS } from '../data/cars'

const BODY_STYLES = ['SUV', 'Sedan', 'Coupe', 'Truck', 'Convertible', 'Wagon']
const FUEL_TYPES = ['Gasoline', 'Electric', 'Hybrid', 'Diesel']
const TRANSMISSIONS = ['All Types', 'Automatic', 'Manual']
const SORT_OPTIONS = [
  'Newest Listed',
  'Price: Low to High',
  'Price: High to Low',
  'Lowest Mileage',
]

const fmtPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const fmtMiles = (n) =>
  new Intl.NumberFormat('en-US').format(n) + ' mi'

function VehicleCard({ car }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-[#c2c6d6]/15 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative aspect-video overflow-hidden bg-surface-container">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-primary text-on-primary text-xs font-semibold px-2 py-1 rounded-full">
          {car.badge}
        </span>
        <button
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-[9999px] bg-surface/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-[#c2c6d6]/20 transition-colors hover:bg-surface"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: liked ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", color: liked ? '#ba1a1a' : '#424754' }}
          >
            favorite
          </span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base text-on-surface mb-2 leading-tight">
          {car.year} {car.make} {car.model}
        </h3>

        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-surface-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{car.bodyStyle}</span>
          <span className="bg-surface-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{car.fuel}</span>
          <span className="bg-surface-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{car.transmission}</span>
        </div>

        <p className="text-primary font-extrabold text-2xl tracking-tight mb-3">{fmtPrice(car.price)}</p>

        <div className="grid grid-cols-3 gap-2 mb-4 pb-3 border-b border-[#c2c6d6]/15">
          <div className="flex flex-col items-center gap-0.5">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
            <span className="text-xs text-on-surface-variant font-medium">{car.year}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">speed</span>
            <span className="text-xs text-on-surface-variant font-medium">{fmtMiles(car.mileage)}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              {car.fuel === 'Electric' ? 'bolt' : 'local_gas_station'}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">{car.fuel}</span>
          </div>
        </div>

        <Link
          to={`/inventory/${car.id}`}
          className="block w-full text-center border border-primary text-primary py-2 rounded-xl text-sm font-semibold hover:bg-primary hover:text-on-primary transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default function BrowseInventoryPage() {
  const [search, setSearch] = useState('')
  const [selectedStyles, setStyles] = useState([])
  const [selectedFuels, setFuels] = useState([])
  const [transmission, setTrans] = useState('All Types')
  const [maxMileage, setMaxMileage] = useState('')
  const [priceMax, setPriceMax] = useState(350000)
  const [sort, setSort] = useState('Newest Listed')
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])

  const resetFilters = () => {
    setStyles([])
    setFuels([])
    setTrans('All Types')
    setMaxMileage('')
    setPriceMax(350000)
    setSearch('')
    setPage(1)
  }

  const filtered = useMemo(() => {
    let cars = [...ALL_CARS]
    if (search)
      cars = cars.filter((c) =>
        `${c.make} ${c.model} ${c.year}`.toLowerCase().includes(search.toLowerCase())
      )
    if (selectedStyles.length) cars = cars.filter((c) => selectedStyles.includes(c.bodyStyle))
    if (selectedFuels.length) {
      const map = { Gasoline: 'Petrol', Electric: 'Electric', Hybrid: 'Hybrid', Diesel: 'Diesel' }
      cars = cars.filter((c) => selectedFuels.some((f) => c.fuel === (map[f] || f)))
    }
    if (transmission !== 'All Types') cars = cars.filter((c) => c.transmission === transmission)
    if (maxMileage) cars = cars.filter((c) => c.mileage <= Number(maxMileage.replace(/,/g, '')))
    cars = cars.filter((c) => c.price <= priceMax)
    switch (sort) {
      case 'Price: Low to High':
        return cars.sort((a, b) => a.price - b.price)
      case 'Price: High to Low':
        return cars.sort((a, b) => b.price - a.price)
      case 'Lowest Mileage':
        return cars.sort((a, b) => a.mileage - b.mileage)
      default:
        return cars
    }
  }, [search, selectedStyles, selectedFuels, transmission, maxMileage, priceMax, sort])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Breadcrumb header */}
      <div className="bg-surface/90 backdrop-blur-md border-b border-[#c2c6d6]/20 sticky top-20 z-30">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-2 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Inventory</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-lg">
        <div className="flex gap-lg">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-surface-container-lowest rounded-xl p-md border border-[#c2c6d6]/10 shadow-sm sticky top-24">
              {/* Title + Reset */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-on-surface text-base">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-primary text-xs font-semibold hover:text-primary-container transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Price Range
                </p>
                <input
                  type="range"
                  min={0}
                  max={350000}
                  step={5000}
                  value={priceMax}
                  onChange={(e) => { setPriceMax(Number(e.target.value)); setPage(1) }}
                  className="accent-primary w-full"
                />
                <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                  <span>$0</span>
                  <span className="text-primary font-semibold">
                    Up to ${(priceMax / 1000).toFixed(0)}k
                  </span>
                  <span>$350k+</span>
                </div>
              </div>

              {/* Body Style */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Body Style
                </p>
                <div className="space-y-2">
                  {BODY_STYLES.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStyles.includes(s)}
                        onChange={() => { toggle(selectedStyles, setStyles, s); setPage(1) }}
                        className="w-4 h-4 rounded accent-primary"
                      />
                      <span className={`text-sm transition-colors ${selectedStyles.includes(s) ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Transmission
                </p>
                <select
                  value={transmission}
                  onChange={(e) => { setTrans(e.target.value); setPage(1) }}
                  className="w-full bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl p-2 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {TRANSMISSIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Fuel Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {FUEL_TYPES.map((f) => (
                    <button
                      key={f}
                      onClick={() => { toggle(selectedFuels, setFuels, f); setPage(1) }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedFuels.includes(f)
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Mileage */}
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Max Mileage
                </p>
                <input
                  type="text"
                  value={maxMileage}
                  onChange={(e) => { setMaxMileage(e.target.value); setPage(1) }}
                  placeholder="e.g. 50,000"
                  className="w-full bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl p-2 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search make, model..."
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-on-surface-variant text-sm">
                  <span className="text-on-surface font-semibold">{filtered.length}</span> Vehicles found
                </span>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1) }}
                  className="text-primary font-semibold text-sm bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cards grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
                {paginated.map((car) => (
                  <VehicleCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[28px] text-on-surface-variant">search_off</span>
                </div>
                <h3 className="text-on-surface font-semibold text-lg mb-2">No vehicles found</h3>
                <p className="text-on-surface-variant text-sm mb-5">Try adjusting your filters.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-on-primary transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-xl border border-[#c2c6d6]/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                      p === page
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'border border-[#c2c6d6]/30 text-on-surface-variant hover:text-on-surface hover:border-primary/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-xl border border-[#c2c6d6]/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
