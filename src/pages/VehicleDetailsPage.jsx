import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRight, Shield, Star, MapPin, Share2,
  Gauge, Fuel, Settings2, Zap, CheckCircle2,
  Heart, ChevronDown, ArrowLeft, Phone, Calendar,
} from 'lucide-react'
import { ALL_CARS } from '../data/cars'
import CarCard from '../components/CarCard'

const FEATURES = [
  { icon: Shield, title: 'Safety Package', desc: 'Adaptive cruise control, lane-keep assist, and 360° parking cameras.' },
  { icon: Zap,    title: 'Premium Audio',  desc: '16-speaker High-End Surround Sound system for immersive audio.' },
  { icon: Settings2, title: 'Climate Comfort', desc: '4-zone automatic climate control with heated and ventilated seats.' },
]

const LOAN_TERMS = [
  { months: 36, apr: '3.99%', monthly: null, interest: null },
  { months: 48, apr: '4.49%', monthly: null, interest: null, popular: true },
  { months: 60, apr: '4.99%', monthly: null, interest: null },
  { months: 72, apr: '5.99%', monthly: null, interest: null },
]

function calcMonthly(principal, annualRate, months) {
  const r = annualRate / 100 / 12
  return r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

export default function VehicleDetailsPage() {
  const { id } = useParams()
  const car = ALL_CARS.find(c => c.id === Number(id)) || ALL_CARS[0]
  const similar = ALL_CARS.filter(c => c.id !== car.id).slice(0, 3)

  const [liked, setLiked]         = useState(false)
  const [activeImg, setActiveImg]  = useState(0)
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.2))
  const [loanTerm, setLoanTerm]   = useState(60)
  const [apr, setApr]             = useState(4.99)

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const principal = Math.max(0, car.price - downPayment)
  const monthly   = calcMonthly(principal, apr, loanTerm)
  const totalPay  = monthly * loanTerm
  const totalInt  = totalPay - principal

  const images = [car.image,
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
    <div className="min-h-screen pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            Home <ChevronRight size={13} />
          </Link>
          <Link to="/inventory" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            Inventory <ChevronRight size={13} />
          </Link>
          <span className="text-primary-400 font-semibold truncate">{car.year} {car.make} {car.model}</span>
        </nav>

        {/* Hero Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-12 h-[280px] sm:h-[420px] lg:h-[540px]">
          {/* Main image */}
          <div className="lg:col-span-3 h-full relative group overflow-hidden rounded-2xl cursor-pointer">
            <img src={images[activeImg]} alt="Main vehicle"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 glass px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-white text-xs font-semibold">{activeImg + 1} / {images.length} Photos</span>
            </div>
            <button onClick={() => setLiked(!liked)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center
                          backdrop-blur-sm border transition-all duration-200
                          ${liked ? 'bg-red-500/30 border-red-500/50 text-red-400' : 'glass border-white/10 text-slate-300 hover:text-white'}`}>
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="hidden lg:grid grid-rows-3 gap-3 h-full">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`rounded-xl overflow-hidden group relative transition-all duration-200
                  ${activeImg === i ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-[#0a0b12]' : 'opacity-70 hover:opacity-100'}`}>
                <img src={img} alt={`View ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </section>

        {/* Thumbnail row on mobile */}
        <div className="flex gap-2 mb-8 lg:hidden">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)}
              className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all
                ${activeImg === i ? 'ring-2 ring-primary-500' : 'opacity-60 hover:opacity-100'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT — details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge bg-primary-500/15 border border-primary-500/25 text-primary-300">CERTIFIED PRE-OWNED</span>
                <span className="flex items-center gap-1 text-primary-400 text-xs font-semibold">
                  <CheckCircle2 size={13} /> Warranty Verified
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="text-slate-400 text-base">{car.color} · {car.transmission} · {car.fuel}</p>

              {/* Quick specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/[0.07]">
                {[
                  { icon: Gauge, label: 'Mileage', value: new Intl.NumberFormat().format(car.mileage) + ' mi' },
                  { icon: Fuel,  label: 'Fuel Type', value: car.fuel },
                  { icon: Settings2, label: 'Drivetrain', value: 'AWD' },
                  { icon: Zap,   label: 'Power', value: car.specs.power },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-slate-500 text-xs">{label}</span>
                    <span className="text-white font-semibold text-sm flex items-center gap-1.5">
                      <Icon size={14} className="text-slate-500" /> {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features — Bento */}
            <div>
              <h2 className="text-xl font-black text-white mb-5">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-primary-400" />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h2 className="text-xl font-black text-white mb-5">Technical Specifications</h2>
              <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {TECH_SPECS.map(([label, value], i) => (
                    <div key={label}
                      className={`flex items-center justify-between px-5 py-3.5 text-sm
                                  ${i < TECH_SPECS.length - 2 ? 'border-b border-white/[0.05]' : ''}
                                  ${i % 2 === 0 && i < TECH_SPECS.length - 1 ? 'sm:border-r border-white/[0.05]' : ''}`}>
                      <span className="text-slate-500">{label}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle History */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#0a0f1e]" />
              <div className="absolute inset-0 ring-1 ring-white/[0.08] rounded-2xl" />
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-white font-black text-xl mb-1">Vehicle History Report</h2>
                    <p className="text-slate-400 text-sm">Full transparency for your peace of mind.</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10">
                    <CheckCircle2 size={15} className="text-primary-400" fill="currentColor" />
                    <span className="text-white text-sm font-bold">CARFAX 1-OWNER</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] text-center">
                  {[['0', 'Accidents'], ['15', 'Service Records'], ['Personal', 'Vehicle Type']].map(([val, lbl]) => (
                    <div key={lbl}>
                      <span className="block text-white font-black text-2xl mb-1">{val}</span>
                      <span className="text-slate-500 text-xs uppercase tracking-wider">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Similar Vehicles */}
            <div>
              <h2 className="text-xl font-black text-white mb-5">Similar Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similar.map(c => <CarCard key={c.id} car={c} />)}
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky pricing + calculator */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Pricing card */}
              <div className="glass-card rounded-2xl p-6 border border-white/[0.06]">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">List Price</p>
                <p className="text-3xl font-black text-white mb-5">{fmt(car.price)}</p>

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-slate-600'} fill="currentColor" />
                  ))}
                  <span className="text-slate-400 text-xs ml-1">{car.rating} ({car.reviews} reviews)</span>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="btn-primary w-full justify-center py-3.5">
                    <Phone size={16} /> Contact Dealer
                  </button>
                  <button className="btn-ghost w-full justify-center py-3.5">
                    <Calendar size={16} /> Schedule Test Drive
                  </button>
                </div>

                <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/[0.06] text-slate-500 text-xs">
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> Seattle, WA</span>
                  <button className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                    <Share2 size={12} /> Share
                  </button>
                </div>
              </div>

              {/* Financing Calculator */}
              <div className="glass-card rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="text-white font-bold text-base mb-5">Financing Calculator</h3>
                <div className="space-y-5">
                  {/* Down payment */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Down Payment</label>
                      <span className="text-primary-400 text-sm font-bold">{fmt(downPayment)}</span>
                    </div>
                    <input type="range" min={0} max={car.price} step={500} value={downPayment}
                      onChange={e => setDownPayment(Number(e.target.value))}
                      className="w-full accent-primary-500 h-1.5 cursor-pointer" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                      <span>$0</span><span>{fmt(car.price)}</span>
                    </div>
                  </div>

                  {/* Loan term */}
                  <div>
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Loan Term</label>
                    <div className="relative">
                      <select value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))}
                        className="input-dark appearance-none pr-8 text-sm py-2.5 cursor-pointer">
                        {[36, 48, 60, 72, 84].map(m => <option key={m} value={m}>{m} Months</option>)}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* APR */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Interest Rate (APR)</label>
                      <span className="text-primary-400 text-sm font-bold">{apr.toFixed(2)}%</span>
                    </div>
                    <input type="range" min={1.99} max={18.99} step={0.25} value={apr}
                      onChange={e => setApr(Number(e.target.value))}
                      className="w-full accent-primary-500 h-1.5 cursor-pointer" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                      <span>1.99%</span><span>18.99%</span>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="rounded-xl bg-primary-500/10 border border-primary-500/20 p-4 text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Est. Monthly Payment</p>
                    <p className="text-primary-300 font-black text-3xl">{fmt(monthly)}</p>
                    <p className="text-slate-500 text-[11px] mt-1.5">
                      Total interest: {fmt(totalInt)} · Total: {fmt(totalPay)}
                    </p>
                  </div>

                  <button className="btn-primary w-full justify-center py-3">Apply for Financing</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
