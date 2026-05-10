# AutoPremium — Project Onboarding

## What This Is
A full **React (Vite) + Tailwind CSS** dark-mode auto car trade marketplace called **AutoPremium**. Built with a 2026 Ultra-Modern design language: glassmorphism, bento-grid layouts, and high-contrast blue accents on a near-black background.

## Repository
- **GitHub:** https://github.com/wel-stein/leong-auto-trade
- **Branch:** `main`
- **Local path:** `D:\www\react-leong-auto-trade`

## Tech Stack
| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 6 |
| Tailwind CSS | 3 |
| lucide-react | 0.469 |
| react-router-dom | 7 |

## Dev Server
```bash
cd D:\www\react-leong-auto-trade
npm run dev
```
Runs at **http://localhost:5173** (preview configured in `.claude/launch.json`).

## Project Structure
```
src/
├── App.jsx                      # Root — wires searchFilter state Hero→Inventory
├── main.jsx
├── index.css                    # Tailwind layers + glass/gradient-text utilities
├── data/
│   └── cars.js                  # 9 vehicles, makes, models, stats, testimonials
└── components/
    ├── Navbar.jsx               # Glassmorphism sticky nav + mobile drawer
    ├── Hero.jsx                 # Full-bleed hero + Make/Model/Price search filter
    ├── StatsBar.jsx             # 4-col animated stats strip
    ├── BentoShowcase.jsx        # Bento grid (7-col hero + 5-col stack + 4 tiles)
    ├── Inventory.jsx            # Filterable/sortable 3-col car grid + layout toggle
    ├── CarCard.jsx              # Hover-scale card with wishlist, specs, price badge
    ├── Testimonials.jsx         # 3-col verified review cards
    ├── SellCTA.jsx              # Full-bleed sell section with perks list
    └── Footer.jsx               # 5-col footer + newsletter signup
```

## Design System
- **Background:** `#0a0b12` (near-black)
- **Surface cards:** `rgba(22,24,38,0.85)` — `.glass-card` utility class
- **Nav/overlays:** `rgba(18,19,30,0.72)` — `.glass` utility class
- **Primary accent:** `#3b82f6` (blue-500) with `shadow-glow-blue`
- **Gradient text:** blue → purple → cyan via `.gradient-text`
- **Typography:** Inter (400–900), loaded via Google Fonts in `index.html`

## Key Custom Utilities (index.css)
```css
.glass          /* backdrop-blur nav/overlays */
.glass-card     /* card surfaces */
.gradient-text  /* blue→purple→cyan headline gradient */
.btn-primary    /* blue CTA with glow shadow */
.btn-ghost      /* bordered ghost button */
.input-dark     /* dark form inputs with focus ring */
.badge          /* small pill labels */
```

## Tailwind Custom Tokens (tailwind.config.js)
```js
colors.primary.*        // blue-50 → blue-900
colors.surface.*        // surface / surface-low / surface-high / surface-highest
boxShadow.glow-blue     // 0 0 24px rgba(59,130,246,0.35)
boxShadow.card          // 0 4px 32px rgba(0,0,0,0.45)
boxShadow.card-hover    // 0 8px 48px rgba(0,0,0,0.65)
animation.fade-up       // fadeUp keyframe (opacity + translateY)
animation.shimmer       // shimmer keyframe
```

## Data (src/data/cars.js)
- `FEATURED_CARS` — 6 cars (Porsche, BMW, Mercedes, Lambo, Tesla, Aston Martin)
- `ALL_CARS` — 9 cars (adds Ferrari, Bentley, Audi)
- `MAKES`, `MODELS` — dropdown data for Hero search
- `PRICE_RANGES` — 5 price bracket objects `{label, min, max}`
- `BODY_STYLES`, `FUEL_TYPES`, `TRANSMISSIONS` — Inventory filter arrays
- `STATS` — 4 stat objects for StatsBar
- `TESTIMONIALS` — 3 review objects

## Search Flow
Hero search → `onSearch(filter)` → `App.jsx` state `searchFilter` → passed as prop to `Inventory.jsx` → `useMemo` filters `ALL_CARS` by make / model / priceRange.

## Reference Design
Original HTML mockups are in `D:\www\react-leong-auto-trade\design\`:
- `homepage_autopremium/code.html`
- `browse_inventory_autopremium/code.html`
- `vehicle_details_autopremium/code.html`
- `financing_tools_autopremium/code.html`
- `sell_your_car_autopremium/code.html`
- `your_dashboard_autopremium/code.html`
- `automotive_excellence_system/DESIGN.md`

## Pending / Next Steps (suggested)
- [ ] Vehicle detail page (`/cars/:id`) with image gallery, spec table, financing calculator
- [ ] Browse/Inventory page with sidebar filters and pagination
- [ ] Sell Your Car multi-step form
- [ ] Dashboard page (saved vehicles, active offers)
- [ ] React Router routes wiring all pages
- [ ] Financing calculator component (loan amount, term, rate sliders)
- [ ] Mobile bottom navigation bar
- [ ] Dark/light mode toggle
