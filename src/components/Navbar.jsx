import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Inventory', to: '/inventory' },
  { label: 'Sell Your Car', to: '/sell' },
  { label: 'Financing', to: '/financing' },
  { label: 'Dashboard', to: '/dashboard' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-[#c2c6d6]/20 shadow-sm">
        <nav className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-white">directions_car</span>
            </div>
            <span className="text-on-background text-xl font-bold tracking-tight">AutoPremium</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg ${
                      isActive
                        ? 'text-primary bg-primary/8'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/inventory"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#c2c6d6]/30 text-on-surface-variant text-sm font-medium hover:text-primary hover:border-primary/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              Search
            </Link>
            <Link
              to="/sell"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-colors"
            >
              Get an Offer
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute top-0 right-0 h-full w-72 bg-surface border-l border-[#c2c6d6]/20 flex flex-col pt-24 pb-8 px-6 gap-2 shadow-xl">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/8'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-auto flex flex-col gap-2">
              <Link
                to="/inventory"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-xl border border-[#c2c6d6]/30 text-on-surface text-sm font-semibold hover:border-primary/30 hover:text-primary transition-colors"
              >
                Search Inventory
              </Link>
              <Link
                to="/sell"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-xl bg-primary text-on-primary text-sm font-semibold"
              >
                Get an Offer
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
