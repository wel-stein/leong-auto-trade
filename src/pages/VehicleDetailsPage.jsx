import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ALL_CARS } from '../data/cars'
import CarCard from '../components/CarCard'

const FEATURES = [
  {
    icon: 'shield',
    title: 'Safety Package',
    desc: 'Adaptive cruise control, lane-keep assist, and 360° parking cameras.',
  },
  {
    icon: 'ac_unit',
    title: 'Climate Comfort',
    desc: '4-zone automatic climate control with heated and ventilated seats.',
  },
  {
    icon: 'settings_input_component',
    title: 'Premium Audio',
    desc: '16-speaker High-End Surround Sound system for immersive audio.',
  },
]

function calcMonthly(principal, annualRate, months) {
  const r = annualRate / 100 / 12
  return r === 0
    ? principal / months
    : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function VehicleDetailsPage() {
  const { id } = useParams()
  const car = ALL_CARS.find((c) => c.id === Number(id)) || ALL_CARS[0]
  const similar = ALL_CARS.filter((c) => c.id !== car.id).slice(0, 3)

  const [liked, setLiked] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.2))
  const [loanTerm, setLoanTerm] = useState(60)
  const [apr, setApr] = useState(4.99)

  const principal = Math.max(0, car.price - downPayment)
  const monthly = calcMonthly(principal, apr, loanTerm)
  const totalPay = monthly * loanTerm
  const totalInt = totalPay - principal

  const images = [
    car.image,
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
  ]

  const TECH_SPECS = [
    ['Exterior Color', car.color],
    ['Interior Color', 'Black Merino Leather'],
    ['Transmission', car.transmission + ' (8-Speed)'],
    ['Horsepower', car.specs.power],
    ['0–60 mph', car.specs.acceleration],
    ['Top Speed', car.specs.topSpeed],
    ['Fuel Type', car.fuel],
    ['VIN', '1AP' + String(car.id).padStart(13, '0')],
  ]

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-6 py-lg">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-xs text-on-surface-variant mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/inventory" className="hover:text-primary transition-colors">Inventory</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold truncate">
            {car.year} {car.make} {car.model}
          </span>
        </nav>

        {/* Hero Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-6 h-[300px] sm:h-[400px] lg:h-[600px]">
          {/* Main image */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-xl group">
            <img
              src={images[activeImg]}
              alt="Main vehicle"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Photo counter */}
            <div className="absolute bottom-4 right-4 bg-[#191b23]/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-[16px]">photo_library</span>
              <span className="text-white text-xs font-semibold">{activeImg + 1} / {images.length} Photos</span>
            </div>
            {/* Heart button */}
            <button
              onClick={() => setLiked(!liked)}
              aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
              className="absolute top-4 right-4 w-10 h-10 rounded-[9999px] bg-surface/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-[#c2c6d6]/20 hover:bg-surface transition-colors"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: liked ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  color: liked ? '#ba1a1a' : '#424754',
                }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Thumbnails desktop */}
          <div className="hidden lg:grid grid-rows-3 gap-3 h-full">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`View photo ${i + 1}`}
                className={`rounded-xl overflow-hidden transition-all duration-200 ${
                  activeImg === i
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Vehicle photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Mobile thumbnail row */}
        <div className="flex gap-2 mb-8 lg:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              aria-label={`View photo ${i + 1}`}
              className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
                activeImg === i ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Vehicle photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full">
                  CERTIFIED PRE-OWNED
                </span>
                <span className="flex items-center gap-1 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Warranty Verified
                </span>
              </div>

              <h1 className="text-display-lg text-on-surface tracking-tight mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="text-on-surface-variant text-body-md">{car.color} · {car.transmission} · {car.fuel}</p>

              {/* Quick specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 pt-6 border-t border-[#c2c6d6]/20">
                {[
                  { icon: 'speed', label: 'Mileage', value: new Intl.NumberFormat().format(car.mileage) + ' mi' },
                  { icon: 'local_gas_station', label: 'Fuel Type', value: car.fuel },
                  { icon: 'settings', label: 'Drivetrain', value: 'AWD' },
                  { icon: 'bolt', label: 'Power', value: car.specs.power },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-on-surface-variant text-xs">{label}</span>
                    <span className="text-on-surface font-semibold text-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{icon}</span>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-headline-md text-on-surface mb-5">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FEATURES.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-surface-container-low p-lg rounded-xl border border-[#c2c6d6]/15 hover:border-primary/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[20px] text-primary">{icon}</span>
                    </div>
                    <h3 className="text-on-surface font-semibold text-sm mb-2">{title}</h3>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h2 className="text-headline-md text-on-surface mb-5">Technical Specifications</h2>
              <div className="bg-surface-container-lowest rounded-xl border border-[#c2c6d6]/15 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {TECH_SPECS.map(([label, value], i) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between px-5 py-3.5 text-sm border-b border-[#c2c6d6]/10 ${
                        i % 2 === 0 ? 'sm:border-r border-[#c2c6d6]/10' : ''
                      }`}
                    >
                      <span className="text-on-surface-variant">{label}</span>
                      <span className="text-on-surface font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle History */}
            <div className="bg-on-background text-on-primary p-xl rounded-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-white font-bold text-xl mb-1">Vehicle History Report</h2>
                  <p className="text-[#e1e2ec]/60 text-sm">Full transparency for your peace of mind.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                  <span className="material-symbols-outlined text-[16px] text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                  <span className="text-white text-sm font-bold">CARFAX 1-OWNER</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
                {[['0', 'Accidents'], ['15', 'Service Records'], ['Personal', 'Vehicle Type']].map(([val, lbl]) => (
                  <div key={lbl}>
                    <span className="block text-white font-black text-2xl mb-1">{val}</span>
                    <span className="text-[#e1e2ec]/50 text-xs uppercase tracking-wider">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Vehicles */}
            <div>
              <h2 className="text-headline-md text-on-surface mb-5">Similar Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similar.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Pricing card */}
              <div className="bg-surface-container-lowest border border-[#c2c6d6]/20 p-xl rounded-xl shadow-sm">
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">LIST PRICE</p>
                <p className="text-price-xl text-primary mb-5">{fmt(car.price)}</p>

                <div className="flex flex-col gap-3">
                  <button className="w-full h-[48px] rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-[18px]">phone</span>
                    Contact Dealer
                  </button>
                  <button className="w-full h-[48px] rounded-xl border border-primary text-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    Schedule Test Drive
                  </button>
                </div>

                <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#c2c6d6]/15 text-on-surface-variant text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    Seattle, WA
                  </span>
                  <button className="flex items-center gap-1.5 hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[14px]">share</span>
                    Share
                  </button>
                </div>
              </div>

              {/* Financing Calculator */}
              <div className="bg-surface-container border border-[#c2c6d6]/20 p-xl rounded-xl">
                <h3 className="text-on-surface font-semibold text-base mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">calculate</span>
                  Financing Calculator
                </h3>

                <div className="space-y-5">
                  {/* Down Payment */}
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1">
                      Down Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-medium">$</span>
                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full pl-7 pr-4 py-2 bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1">
                      Loan Term
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl p-2 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      {[36, 48, 60, 72, 84].map((m) => (
                        <option key={m} value={m}>{m} Months</option>
                      ))}
                    </select>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1">
                      Interest Rate (APR)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={apr}
                      onChange={(e) => setApr(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-surface-container-low border border-[#c2c6d6]/30 rounded-xl text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  {/* Result */}
                  <div className="bg-primary-container/10 border border-primary/15 p-md rounded-xl text-center">
                    <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">
                      Estimated Monthly Payment
                    </p>
                    <p className="text-price-xl text-primary">{fmt(monthly)}</p>
                    <p className="text-on-surface-variant text-xs mt-1.5">
                      Total interest: {fmt(totalInt)} · Total: {fmt(totalPay)}
                    </p>
                  </div>

                  <Link
                    to="/financing"
                    className="block w-full text-center bg-primary text-on-primary py-3 rounded-xl text-sm font-semibold hover:bg-primary-container transition-colors"
                  >
                    Apply for Financing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
