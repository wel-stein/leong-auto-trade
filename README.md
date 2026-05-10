# Leong Auto Trade

A modern, premium car dealership web app built with React, Vite, and Tailwind CSS.

**Live demo:** [leong-auto-trade.vercel.app](https://leong-auto-trade.vercel.app/)

## Features

- Hero section with integrated search and filtering
- Inventory grid with detailed car cards
- Bento-style showcase highlighting featured vehicles
- Customer testimonials and trust stats
- Sell-your-car call-to-action flow
- Responsive dark-themed UI

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/) with `@tailwindcss/forms`
- [React Router 7](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/wel-stein/leong-auto-trade.git
cd leong-auto-trade
npm install
```

### Development

```bash
npm run dev
```

Open the URL printed in your terminal (typically http://localhost:5173) to view the app.

### Production Build

```bash
npm run build
npm run preview
```

The optimized build is emitted to `dist/`.

## Project Structure

```
src/
├── App.jsx              # Root component, page composition
├── main.jsx             # React entry point
├── index.css            # Tailwind base styles
├── components/          # UI components (Hero, Inventory, CarCard, ...)
└── data/cars.js         # Inventory data
```

## Deployment

The app is deployed on [Vercel](https://vercel.com/) at
[leong-auto-trade.vercel.app](https://leong-auto-trade.vercel.app/). Pushes to
the default branch trigger an automatic build and deploy.

To deploy your own copy:

1. Push the repo to GitHub.
2. Import the project in Vercel — it auto-detects Vite settings.
3. Use defaults: build command `npm run build`, output directory `dist`.
