import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/inventory', icon: 'directions_car', label: 'Inventory' },
  { to: '/sell', icon: 'sell', label: 'Sell' },
  { to: '/dashboard', icon: 'person', label: 'Profile' },
]

const FILLED = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
const OUTLINE = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24"

export default function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-[#c2c6d6]/20 flex justify-around items-center px-2 py-2 shadow-lg"
    >
      {ITEMS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 flex-1 py-1 transition-all duration-200 rounded-xl ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`w-12 h-7 flex items-center justify-center rounded-full transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? FILLED : OUTLINE }}
                >
                  {icon}
                </span>
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
