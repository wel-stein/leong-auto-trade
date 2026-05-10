import { useState, useEffect } from 'react'
import { Car, Menu, X, Bell, ChevronDown, Sparkles } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Browse', href: '#inventory' },
  { label: 'Sell', href: '#sell' },
  { label: 'Finance', href: '#finance' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'glass border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center
                            shadow-glow-blue group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
                            transition-shadow duration-300">
              <Car size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Auto<span className="gradient-text">Premium</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setActiveLink(label)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeLink === label
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg
                         text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg
                               text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              Sign In
              <ChevronDown size={14} />
            </button>

            <a
              href="#sell"
              className="btn-primary text-sm py-2.5"
            >
              <Sparkles size={15} />
              List Your Car
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                       text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300
          ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
            ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-72 glass border-l border-white/[0.07]
                      flex flex-col pt-20 pb-8 px-6 gap-2 transition-transform duration-300
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-slate-300 hover:text-white
                         hover:bg-white/5 font-medium transition-all"
            >
              {label}
            </a>
          ))}
          <div className="mt-auto flex flex-col gap-3">
            <button className="btn-ghost w-full justify-center">Sign In</button>
            <a href="#sell" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>
              <Sparkles size={15} />
              List Your Car
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}
