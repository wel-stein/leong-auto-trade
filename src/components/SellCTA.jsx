import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, DollarSign, Clock, Users } from 'lucide-react'

const PERKS = [
  { icon: DollarSign, text: 'Get the best market value' },
  { icon: Clock,       text: 'List in under 10 minutes' },
  { icon: Users,       text: 'Reach 200K+ monthly buyers' },
  { icon: CheckCircle2, text: 'Free professional photography' },
]

export default function SellCTA() {
  return (
    <section id="sell" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b12] via-[#0a0b12]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0b12]/40" />
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/[0.08]" />

          {/* Ambient */}
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64
                          bg-primary-500/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative px-8 sm:px-12 py-16 max-w-2xl">
            <p className="text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Sell With Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 text-balance">
              Your Car Deserves{' '}
              <span className="gradient-text">a Premium Stage.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Join thousands of sellers who trust AutoPremium to connect them with
              serious, qualified buyers. No lowballs, no hassle.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-primary-500/15 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-primary-400" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link to="/sell" className="btn-primary">
                List Your Car Free
                <ArrowRight size={16} />
              </Link>
              <button className="btn-ghost">
                Learn How It Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
