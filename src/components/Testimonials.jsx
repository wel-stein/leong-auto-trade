import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/cars'

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Customer Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Trusted by Enthusiasts
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
            ))}
          </div>
          <p className="text-slate-500 text-sm">4.9 average from 8,200+ reviews</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="glass-card rounded-2xl p-6 border border-white/[0.06]
                         hover:border-white/[0.12] transition-all duration-300
                         hover:-translate-y-1 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote size={20} className="text-primary-500/40" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={13} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              {/* Car tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                              bg-primary-500/10 border border-primary-500/20 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                <span className="text-primary-300 text-[11px] font-medium">{t.car}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
                <span className="ml-auto badge bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px]">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
