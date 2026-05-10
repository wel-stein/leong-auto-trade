import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/cars'

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(numeric)) { setCount(target); return }

    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * numeric)

      // Reconstruct with original suffix/prefix
      const prefix = target.match(/^[^0-9]*/)?.[0] || ''
      const suffix = target.match(/[^0-9.]+$/)?.[0] || ''
      setCount(`${prefix}${current.toLocaleString()}${suffix}`)

      if (progress < 1) requestAnimationFrame(step)
      else setCount(target) // snap to exact final value
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count || '0'
}

function StatItem({ value, label, delay, started }) {
  const animated = useCountUp(value, 1800, started)

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className={`text-3xl sm:text-4xl font-black tracking-tight mb-1
                   bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent
                   transition-all duration-700
                   ${started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {animated}
      </span>
      <span className="text-slate-500 text-sm font-medium">{label}</span>
    </div>
  )
}

export default function StatsBar() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-12 border-y border-white/[0.06]
                 bg-gradient-to-r from-surface-low via-surface-DEFAULT to-surface-low"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }, i) => (
            <StatItem key={label} value={value} label={label} delay={i * 120} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}
