import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/inventory', icon: 'directions_car', label: 'Inventory' },
  { to: '/sell', icon: 'sell', label: 'Sell' },
  { to: '/dashboard', icon: 'person', label: 'Profile' },
]

export default function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-[#c2c6d6]/20 flex justify-around items-center px-4 py-3 shadow-lg"
    >
      {ITEMS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 transition-all duration-200 ${
              isActive
                ? 'text-primary font-semibold bg-[#2170e4]/10 rounded-xl px-3 py-1'
                : 'text-on-secondary-container opacity-70 px-3 py-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
