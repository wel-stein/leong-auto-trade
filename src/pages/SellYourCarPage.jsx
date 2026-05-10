import { useState } from 'react'
import { Link } from 'react-router-dom'

const MAKES = ['Porsche', 'BMW', 'Mercedes-Benz', 'Lamborghini', 'Ferrari', 'Aston Martin', 'Bentley', 'Tesla', 'Audi']
const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018']
const CONDITIONS = [
  { label: 'Excellent', sub: 'Like New', value: 'Excellent' },
  { label: 'Good', sub: 'Normal Wear', value: 'Good' },
  { label: 'Fair', sub: 'Visible Wear', value: 'Fair' },
  { label: 'Poor', sub: 'Major Issues', value: 'Poor' },
]

const TESTIMONIALS = [
  {
    quote: 'The process was unexpectedly smooth. I received a higher offer than my local dealership, and the inspection was done in my driveway. Money was in my account by dinner.',
    name: 'David Chen',
    role: 'Sold a 2021 BMW M5',
    avatar: 'https://i.pravatar.cc/64?img=33',
    stars: 5,
  },
  {
    quote: 'Total transparency from start to finish. Highly recommend for anyone looking to sell a luxury vehicle without the usual stress.',
    name: 'Sarah J.',
    role: 'Porsche 911 Owner',
    avatar: 'https://i.pravatar.cc/64?img=5',
    stars: 5,
  },
  {
    quote: 'Fair price, professional service, and no haggling. The easiest way to sell a premium car.',
    name: 'Michael R.',
    role: 'Audi RS7 Owner',
    avatar: 'https://i.pravatar.cc/64?img=11',
    stars: 5,
  },
]

const FAQS = [
  { q: 'How long does the process take?', a: 'From listing to payment typically takes 3–7 days. With our Express service, same-day offers and next-day payment are available.' },
  { q: 'Is there a fee to list my vehicle?', a: 'No. Listing is completely free. We earn a small success fee only when your car sells.' },
  { q: "How is my car's value determined?", a: 'We use real-time market data, vehicle condition, mileage, and regional demand to generate a certified valuation.' },
  { q: 'Can I sell a car with a loan on it?', a: 'Yes. We handle the payoff directly with your lender and send you the equity difference.' },
]

export default function SellYourCarPage() {
  const [step, setStep] = useState(1)
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [condition, setCondition] = useState('Excellent')
  const [faqOpen, setFaqOpen] = useState([])

  const toggleFaq = (i) =>
    setFaqOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  const selectClass =
    'w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none appearance-none'

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[800px] flex items-center overflow-hidden py-xl">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1400&q=80"
            alt=""
            loading="eager"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5)' }}
          />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-[#e1e2ec]/60 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-white font-semibold">Sell Your Car</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <h1 className="text-display-lg text-white mb-5 leading-tight">
                Get a Guaranteed Offer in Minutes.
              </h1>
              <p className="text-[#e1e2ec]/80 text-body-lg leading-relaxed mb-8">
                No haggling, no hidden fees — just a fair, market-driven value for your premium vehicle.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#e1e2ec] text-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">verified</span>
                  Certified Valuation
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#e1e2ec] text-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">payments</span>
                  Instant Payout
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-surface rounded-xl shadow-lg p-xl border border-[#c2c6d6]/10">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-primary text-sm font-semibold">
                  Step {step} of 3
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === step
                          ? 'bg-primary w-8'
                          : s < step
                          ? 'bg-primary w-5'
                          : 'bg-surface-container-highest w-5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1.5">Year</label>
                      <div className="relative">
                        <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
                          <option value="">Select Year</option>
                          {YEARS.map((y) => <option key={y}>{y}</option>)}
                        </select>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1.5">Make</label>
                      <div className="relative">
                        <select value={make} onChange={(e) => setMake(e.target.value)} className={selectClass}>
                          <option value="">Select Make</option>
                          {MAKES.map((m) => <option key={m}>{m}</option>)}
                        </select>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1.5">Model</label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. 911 Carrera S"
                      className="w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-2">Condition</label>
                    <div className="grid grid-cols-2 gap-2">
                      {CONDITIONS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setCondition(c.value)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            condition === c.value
                              ? 'border-primary bg-primary-container/10'
                              : 'border-[#c2c6d6]/30 hover:border-primary/30'
                          }`}
                        >
                          <span className={`font-semibold text-sm ${condition === c.value ? 'text-primary' : 'text-on-surface'}`}>
                            {c.label}
                          </span>
                          <span className="text-on-surface-variant text-xs">{c.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full h-14 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
                  >
                    Next: Get Your Estimate
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-2">Mileage</label>
                    <input
                      type="text"
                      placeholder="e.g. 24,500"
                      className="w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-2">Color</label>
                    <input
                      type="text"
                      placeholder="e.g. Midnight Blue"
                      className="w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="h-12 rounded-xl border border-[#c2c6d6]/30 text-on-surface-variant font-semibold text-sm hover:border-primary/30 hover:text-primary transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
                    >
                      Next
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider block mb-1.5">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-surface border border-[#c2c6d6]/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="h-12 rounded-xl border border-[#c2c6d6]/30 text-on-surface-variant font-semibold text-sm hover:border-primary/30 hover:text-primary transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
                    >
                      Get My Offer
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Process */}
      <section className="py-xl bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-headline-lg text-on-surface mb-3">Our Seamless Three-Step Process</h2>
            <p className="text-on-surface-variant text-body-md max-w-md mx-auto">
              From listing to payment in as little as 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'edit_note', step: '1', title: 'Enter Details', desc: "Provide your vehicle's make, model, and condition through our secure portal." },
              { icon: 'biotech', step: '2', title: 'Get Inspection', desc: 'Schedule a professional 150-point inspection at your home or our center.' },
              { icon: 'payments', step: '3', title: 'Get Paid', desc: 'Receive your funds via instant bank transfer the same day of the sale.' },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-[9999px] bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px] text-on-primary-container">{icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-[9999px] bg-primary flex items-center justify-center text-on-primary text-xs font-black">
                    {step}
                  </div>
                </div>
                <h3 className="text-on-surface font-semibold text-base mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-[240px] mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-xl bg-background">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-headline-lg text-on-surface mb-2">
                Trusted by thousands of premium car owners.
              </h2>
              <p className="text-on-surface-variant text-sm">The top-rated destination for selling luxury vehicles.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-[9999px] border border-[#c2c6d6]/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-9 h-9 rounded-[9999px] border border-[#c2c6d6]/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Featured */}
            <div className="lg:col-span-7 bg-surface-container-low p-xl rounded-xl border border-[#c2c6d6]/15">
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <p className="text-on-surface text-headline-md font-normal italic leading-relaxed mb-6">
                "{TESTIMONIALS[0].quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#c2c6d6]/15">
                <img
                  src={TESTIMONIALS[0].avatar}
                  alt={TESTIMONIALS[0].name}
                  loading="lazy"
                  className="w-12 h-12 rounded-[9999px] object-cover border border-[#c2c6d6]/20"
                />
                <div>
                  <p className="text-on-surface font-semibold text-sm">{TESTIMONIALS[0].name}</p>
                  <p className="text-on-surface-variant text-xs">{TESTIMONIALS[0].role}</p>
                </div>
                <span className="ml-auto text-xs font-semibold bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Stacked 2 */}
            <div className="lg:col-span-5 flex flex-col gap-lg">
              {TESTIMONIALS.slice(1).map((t) => (
                <div key={t.name} className="bg-surface-container-lowest rounded-xl p-lg border border-[#c2c6d6]/15 flex-1">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.stars)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[14px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-2">
                    <img src={t.avatar} alt={t.name} loading="lazy" className="w-8 h-8 rounded-[9999px] object-cover" />
                    <span className="text-on-surface text-sm font-semibold">{t.name}</span>
                    <span className="text-on-surface-variant text-xs">· {t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-xl bg-surface-container-highest/20">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-headline-md text-on-surface text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-surface rounded-lg border border-[#c2c6d6]/20 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="text-on-surface font-semibold text-sm pr-4">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-on-surface-variant shrink-0 transition-transform duration-200 ${
                      faqOpen.includes(i) ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {faqOpen.includes(i) && (
                  <div className="px-6 pb-5 text-on-surface-variant text-sm leading-relaxed border-t border-[#c2c6d6]/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
