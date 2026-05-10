import { Link } from 'react-router-dom'
import { Car, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const LINKS = {
  'Marketplace': [
    { label: 'Browse Inventory', to: '/inventory' },
    { label: 'Featured Listings', to: '/inventory' },
    { label: 'New Arrivals', to: '/inventory' },
    { label: 'Sell Your Car', to: '/sell' },
    { label: 'Price Drops', to: '/inventory' },
  ],
  'Finance': [
    { label: 'Auto Loans', to: '/financing' },
    { label: 'Pre-Approval', to: '/financing' },
    { label: 'Insurance', to: '/financing' },
    { label: 'Warranty', to: '/financing' },
    { label: 'Trade-In Value', to: '/sell' },
  ],
  'Company': [
    { label: 'About Us', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
    { label: 'Partners', to: '/' },
    { label: 'Contact', to: '/' },
  ],
  'Support': [
    { label: 'Help Center', to: '/' },
    { label: 'Buyer Guide', to: '/inventory' },
    { label: 'Seller Guide', to: '/sell' },
    { label: 'Safety Tips', to: '/' },
    { label: 'Terms & Privacy', to: '/' },
  ],
}

const SOCIALS = [
  { Icon: Twitter,   label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin,  label: 'LinkedIn' },
  { Icon: Youtube,   label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="border-t border-white/[0.06] bg-surface-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-blue">
                <Car size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Auto<span className="gradient-text">Premium</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The world's most trusted marketplace for premium and exotic automobiles.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                             border border-white/[0.08] text-slate-500 hover:text-white
                             hover:border-white/20 hover:bg-white/5 transition-all duration-200">
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
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-slate-400 hover:text-white text-sm transition-colors">
                      {label}
                    </Link>
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
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input-dark flex-1 sm:w-56" />
            <button className="btn-primary shrink-0 py-3">
              Subscribe <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                        pt-8 border-t border-white/[0.06]">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} AutoPremium Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map(link => (
              <a key={link} href="#" className="text-slate-400 hover:text-slate-200 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
