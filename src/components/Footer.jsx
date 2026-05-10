import { Car, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react'

const LINKS = {
  'Marketplace': ['Browse Inventory', 'Featured Listings', 'New Arrivals', 'Price Drops', 'Sell Your Car'],
  'Finance': ['Auto Loans', 'Pre-Approval', 'Insurance', 'Warranty', 'Trade-In Value'],
  'Company': ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
  'Support': ['Help Center', 'Buyer Guide', 'Seller Guide', 'Safety Tips', 'Terms & Privacy'],
}

const SOCIALS = [
  { Icon: Twitter,   label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin,  label: 'LinkedIn' },
  { Icon: Youtube,   label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-blue">
                <Car size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Auto<span className="gradient-text">Premium</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The world's most trusted marketplace for premium and exotic automobiles.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                             border border-white/[0.08] text-slate-500 hover:text-white
                             hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="text-white font-semibold text-sm mb-4">{section}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-2xl p-6 mb-10 flex flex-col sm:flex-row
                        items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-base mb-1">Stay ahead of the market</p>
            <p className="text-slate-500 text-sm">Get weekly picks and price alerts delivered to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="input-dark flex-1 sm:w-56"
            />
            <button className="btn-primary shrink-0 py-3">
              Subscribe <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                        pt-8 border-t border-white/[0.06]">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} AutoPremium Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map(link => (
              <a key={link} href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
