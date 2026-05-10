import { Heart, Fuel, Gauge, Zap, Star, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const BADGE_STYLES = {
  blue:   'bg-primary-500/20 text-primary-300 border-primary-500/30',
  red:    'bg-red-500/20 text-red-300 border-red-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  green:  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  gold:   'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  teal:   'bg-teal-500/20 text-teal-300 border-teal-500/30',
}

export default function CarCard({ car, featured = false }) {
  const [liked, setLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  const fmtPrice = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  const fmtMiles = (n) =>
    new Intl.NumberFormat('en-US').format(n) + ' mi'

  return (
    <article
      className={`group relative glass-card rounded-2xl overflow-hidden
                  transition-all duration-500 ease-out cursor-pointer
                  hover:shadow-card-hover hover:-translate-y-1.5
                  hover:border-white/[0.12]
                  ${featured ? 'ring-1 ring-primary-500/20' : ''}`}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-high">
        {!imgError ? (
          <img
            src={car.image}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover object-center
                       transition-transform duration-700 ease-out
                       group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-high">
            <span className="text-slate-600 text-sm">{car.make} {car.model}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        <span
          className={`badge absolute top-3 left-3 border
                      ${BADGE_STYLES[car.badgeColor] || BADGE_STYLES.blue}`}
        >
          {car.badge}
        </span>

        {/* Wishlist button */}
        <button
          aria-label="Save to wishlist"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                      backdrop-blur-sm border transition-all duration-200
                      ${liked
                        ? 'bg-red-500/30 border-red-500/50 text-red-400'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                      }`}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Price badge on image */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl
                        bg-black/50 backdrop-blur-sm border border-white/10">
          <span className="text-white font-bold text-sm">{fmtPrice(car.price)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-0.5">
              {car.make}
            </p>
            <h3 className="text-white font-bold text-base leading-tight">
              {car.model}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">{car.year} · {car.color}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            <span className="text-slate-300 text-xs font-semibold">{car.rating}</span>
            <span className="text-slate-600 text-xs">({car.reviews})</span>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Gauge size={12} className="text-slate-500" />
            {fmtMiles(car.mileage)}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Fuel size={12} className="text-slate-500" />
            {car.fuel}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Zap size={12} className="text-slate-500" />
            {car.specs.power}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-[11px] uppercase tracking-wider">Price</p>
            <p className="text-white font-black text-xl tracking-tight">{fmtPrice(car.price)}</p>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                       bg-primary-500/10 border border-primary-500/25
                       text-primary-400 text-xs font-semibold
                       hover:bg-primary-500 hover:text-white hover:border-transparent
                       transition-all duration-200 group/btn"
          >
            View Details
            <ArrowUpRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
