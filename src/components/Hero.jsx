import { useState } from 'react'
import { Search, ChevronDown, ArrowRight, Shield, Star, Zap } from 'lucide-react'
import { MAKES, MODELS, PRICE_RANGES } from '../data/cars'

export default function Hero({ onSearch }) {
  const [make, setMake] = useState('All Makes')
  const [model, setModel] = useState('All Models')
  const [priceRange, setPriceRange] = useState('')

  const models = MODELS[make] || ['All Models']

  const handleMakeChange = (e) => {
    setMake(e.target.value)
    setModel('All Models')
  }

  const handleSearch = () => {
    const range = PRICE_RANGES.find(r => r.label === priceRange)
    onSearch({ make, model, priceRange: range })
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b12]/50 via-[#0a0b12]/70 to-[#0a0b12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b12]/80 via-transparent to-[#0a0b12]/40" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          bg-primary-500/10 border border-primary-500/25 mb-8
                          animate-fade-up">
            <Zap size={13} className="text-primary-400" />
            <span className="text-primary-300 text-xs font-semibold tracking-wider uppercase">
              Premium Auto Marketplace · 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6
                         animate-fade-up animate-delay-100 text-balance">
            Drive the Car{' '}
            <span className="gradient-text">You Deserve.</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl
                        animate-fade-up animate-delay-200">
            12,400+ premium and exotic vehicles. Verified sellers, transparent pricing,
            and seamless financing — all in one place.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-3 mb-10 animate-fade-up animate-delay-300">
            {[
              { icon: Shield, text: 'Verified Listings' },
              { icon: Star, text: '4.9 / 5 Rating' },
              { icon: Zap, text: 'Instant Financing' },
            ].map(({ icon: Icon, text }) => (
              <div key={text}
                   className="flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-white/5 border border-white/8 text-slate-300 text-sm">
                <Icon size={13} className="text-primary-400" />
                {text}
              </div>
            ))}
          </div>

          {/* Search card */}
          <div className="glass rounded-2xl p-4 sm:p-5 animate-fade-up animate-delay-400
                          shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 px-1">
              Find Your Perfect Match
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {/* Make */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                  Make
                </label>
                <div className="relative">
                  <select
                    value={make}
                    onChange={handleMakeChange}
                    className="input-dark appearance-none pr-9 cursor-pointer"
                  >
                    {MAKES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Model */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                  Model
                </label>
                <div className="relative">
                  <select
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    className="input-dark appearance-none pr-9 cursor-pointer"
                  >
                    {models.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Price range */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                  Price Range
                </label>
                <div className="relative">
                  <select
                    value={priceRange}
                    onChange={e => setPriceRange(e.target.value)}
                    className="input-dark appearance-none pr-9 cursor-pointer"
                  >
                    <option value="">Any Price</option>
                    {PRICE_RANGES.map(r => (
                      <option key={r.label} value={r.label}>{r.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="btn-primary w-full justify-center py-3.5 text-base"
            >
              <Search size={17} />
              Search {(make !== 'All Makes' || model !== 'All Models') ? `${make !== 'All Makes' ? make : ''} ${model !== 'All Models' ? model : ''}`.trim() : 'All Vehicles'}
              <ArrowRight size={16} className="ml-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-slate-400 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}
