import { ArrowUpRight, Shield, Star, TrendingUp, Zap } from 'lucide-react'
import { FEATURED_CARS } from '../data/cars'

export default function BentoShowcase() {
  const [hero, second, third] = FEATURED_CARS

  const fmtPrice = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0b12] via-surface-low to-[#0a0b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Editor's Picks
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            This Week's Highlights
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Hand-curated selections from our team. Exceptional machines, verified provenance.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

          {/* Hero card — large */}
          <div className="md:col-span-7 group relative glass-card rounded-3xl overflow-hidden
                          cursor-pointer hover:shadow-card-hover hover:border-white/[0.12]
                          transition-all duration-500 min-h-[420px]">
            <img
              src={hero.image}
              alt={hero.model}
              className="absolute inset-0 w-full h-full object-cover object-center
                         transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="badge bg-primary-500/20 border border-primary-500/40 text-primary-300">
                #1 This Week
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-primary-300 text-xs font-semibold uppercase tracking-wider mb-1">{hero.make}</p>
              <h3 className="text-white font-black text-2xl sm:text-3xl tracking-tight mb-1">{hero.model}</h3>
              <p className="text-slate-400 text-sm mb-4">{hero.year} · {hero.specs.power} · {hero.specs.acceleration} 0–60</p>
              <div className="flex items-center justify-between">
                <p className="text-white font-black text-2xl">{fmtPrice(hero.price)}</p>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                                   bg-primary-500 hover:bg-primary-400 text-white text-sm font-semibold
                                   transition-all duration-200 shadow-glow-blue">
                  View Car <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Right column — stacked smaller cards */}
          <div className="md:col-span-5 grid grid-rows-2 gap-4">

            {/* Second car */}
            <div className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer
                            hover:shadow-card-hover hover:border-white/[0.12] transition-all duration-500 min-h-[196px]">
              <img
                src={second.image}
                alt={second.model}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="badge bg-red-500/20 border border-red-500/35 text-red-300 text-[11px]">Hot Deal</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-slate-300 text-xs">{second.year} {second.make}</p>
                    <h4 className="text-white font-bold text-lg leading-tight">{second.model}</h4>
                  </div>
                  <p className="text-white font-black text-lg">{fmtPrice(second.price)}</p>
                </div>
              </div>
            </div>

            {/* Third car */}
            <div className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer
                            hover:shadow-card-hover hover:border-white/[0.12] transition-all duration-500 min-h-[196px]">
              <img
                src={third.image}
                alt={third.model}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="badge bg-purple-500/20 border border-purple-500/35 text-purple-300 text-[11px]">Premium</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-slate-300 text-xs">{third.year} {third.make}</p>
                    <h4 className="text-white font-bold text-lg leading-tight">{third.model}</h4>
                  </div>
                  <p className="text-white font-black text-lg">{fmtPrice(third.price)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bento stat tiles */}
          {[
            {
              Icon: Shield,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              title: 'Verified & Inspected',
              desc: 'Every vehicle passes our 210-point inspection before listing.',
            },
            {
              Icon: Zap,
              color: 'text-primary-400',
              bg: 'bg-primary-500/10 border-primary-500/20',
              title: 'Instant Financing',
              desc: 'Get pre-approved in minutes with our in-house lending partners.',
            },
            {
              Icon: TrendingUp,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20',
              title: 'Market Pricing',
              desc: 'Real-time price comparison against 50,000+ listings nationwide.',
            },
            {
              Icon: Star,
              color: 'text-yellow-400',
              bg: 'bg-yellow-500/10 border-yellow-500/20',
              title: '4.9 / 5 Rated',
              desc: 'Over 8,200 five-star reviews from verified buyers and sellers.',
            },
          ].map(({ Icon, color, bg, title, desc }) => (
            <div
              key={title}
              className={`md:col-span-3 glass-card rounded-2xl p-5 border
                          hover:border-white/[0.12] transition-all duration-300 ${bg}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
                              ${bg}`}>
                <Icon size={20} className={color} />
              </div>
              <h4 className="text-white font-bold text-sm mb-1.5">{title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
