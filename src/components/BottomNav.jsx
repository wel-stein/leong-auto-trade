import { NavLink } from 'react-router-dom'
import { Search, Tag, Calculator, LayoutDashboard, Home } from 'lucide-react'

const ITEMS = [
  { to: '/',          icon: Home,          label: 'Home'      },
  { to: '/inventory', icon: Search,        label: 'Browse'    },
  { to: '/sell',      icon: Tag,           label: 'Sell'      },
  { to: '/financing', icon: Calculator,    label: 'Finance'   },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
]

export default function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50
                 glass border-t border-white/[0.08]
                 flex items-center justify-around
                 px-2 py-2 safe-bottom"
    >
      {ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl
             transition-all duration-200 min-w-[52px]
             ${isActive
               ? 'text-primary-400 bg-primary-500/10'
               : 'text-slate-500 hover:text-slate-300'
             }`
          }
        >
          <Icon size={20} strokeWidth={1.8} />
          <span className="text-[10px] font-semibold tracking-wide">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
