import { STATS } from '../data/cars'

export default function StatsBar() {
  return (
    <section className="relative py-12 border-y border-white/[0.06]
                        bg-gradient-to-r from-surface-low via-surface-DEFAULT to-surface-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center text-center group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span
                className="text-3xl sm:text-4xl font-black tracking-tight mb-1
                           bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent"
              >
                {value}
              </span>
              <span className="text-slate-500 text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
