import { Link } from 'react-router-dom'
import { useState } from 'react'

const fmtPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const fmtMiles = (n) =>
  new Intl.NumberFormat('en-US').format(n) + ' mi'

const FUEL_ICON = {
  Electric: 'bolt',
  Hybrid: 'ev_station',
  Diesel: 'local_gas_station',
  Petrol: 'local_gas_station',
}

export default function CarCard({ car }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-[#c2c6d6]/15 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-surface-container">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        <span className="absolute top-3 left-3 bg-primary text-on-primary text-xs font-semibold px-2 py-1 rounded-full">
          {car.badge}
        </span>
        {/* Wishlist */}
        <button
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-[9999px] bg-surface/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-[#c2c6d6]/20 transition-colors hover:bg-surface"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{
              fontVariationSettings: liked
                ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              color: liked ? '#ba1a1a' : '#424754',
            }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-md">
        {/* Name + Rating row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base text-on-surface leading-tight">
            {car.year} {car.make} {car.model}
          </h3>
          {car.rating && (
            <div className="flex items-center gap-1 shrink-0">
              <span
                className="material-symbols-outlined text-[14px] text-yellow-500"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
              >star</span>
              <span className="text-xs font-semibold text-on-surface">{car.rating}</span>
              <span className="text-xs text-on-surface-variant">({car.reviews})</span>
            </div>
          )}
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-surface-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{car.bodyStyle}</span>
          <span className="bg-surface-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{car.fuel}</span>
          <span className="bg-surface-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{car.transmission}</span>
        </div>

        {/* Price */}
        <p className="text-primary font-extrabold text-2xl tracking-tight mb-3">{fmtPrice(car.price)}</p>

        {/* Specs row */}
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
              {FUEL_ICON[car.fuel] || 'local_gas_station'}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">{car.fuel}</span>
          </div>
        </div>

        {/* CTA */}
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
