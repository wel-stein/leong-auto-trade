import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#191b23] text-[#e1e2ec]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-white">directions_car</span>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">AutoPremium</span>
            </Link>
            <p className="text-[#e1e2ec]/60 text-sm leading-relaxed mb-5">
              The world's most trusted marketplace for premium and certified pre-owned automobiles. Quality, trust, and transparency in every transaction.
            </p>
            <div className="flex items-center gap-2">
              {['language', 'article', 'groups'].map((icon) => (
                <div key={icon} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-[#adc6ff]">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Browse column */}
          <div>
            <p className="text-[#d8e2ff] font-semibold text-sm uppercase tracking-wider mb-4">Browse</p>
            <ul className="space-y-3">
              <li><Link to="/inventory" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">All Inventory</Link></li>
              <li><Link to="/inventory" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Featured Listings</Link></li>
              <li><Link to="/inventory" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">New Arrivals</Link></li>
              <li><Link to="/inventory" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Price Drops</Link></li>
              <li><Link to="/inventory" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Electric Vehicles</Link></li>
            </ul>
          </div>

          {/* Services column */}
          <div>
            <p className="text-[#d8e2ff] font-semibold text-sm uppercase tracking-wider mb-4">Services</p>
            <ul className="space-y-3">
              <li><Link to="/sell" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Sell Your Car</Link></li>
              <li><Link to="/financing" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Auto Financing</Link></li>
              <li><Link to="/financing" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Pre-Approval</Link></li>
              <li><Link to="/financing" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Insurance</Link></li>
              <li><Link to="/sell" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Trade-In Value</Link></li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <p className="text-[#d8e2ff] font-semibold text-sm uppercase tracking-wider mb-4">Legal</p>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Cookie Preferences</Link></li>
              <li><Link to="/" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Accessibility</Link></li>
              <li><Link to="/" className="text-[#e1e2ec]/80 hover:text-white text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-[#e1e2ec]/50 text-xs">
            © {new Date().getFullYear()} AutoPremium Inc. All rights reserved.
          </p>
          <p className="text-[#e1e2ec]/40 text-xs">
            Trusted by 50,000+ buyers and sellers worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
