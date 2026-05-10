import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, CheckCircle2, ArrowRight, Shield,
  Zap, Star, ChevronDown, ClipboardList, FlaskConical, Banknote,
} from 'lucide-react'

const MAKES = ['Select Make', 'Porsche', 'BMW', 'Mercedes-Benz', 'Lamborghini', 'Ferrari', 'Aston Martin', 'Bentley', 'Tesla', 'Audi']
const YEARS = ['Select Year', '2024', '2023', '2022', '2021', '2020', '2019', '2018']
const CONDITIONS = [
  { label: 'Excellent', sub: 'Like New', value: 'excellent' },
  { label: 'Good', sub: 'Normal Wear', value: 'good' },
  { label: 'Fair', sub: 'Visible Wear', value: 'fair' },
  { label: 'Poor', sub: 'Major Issues', value: 'poor' },
]

const STEPS_INFO = [
  { Icon: ClipboardList, step: '1', title: 'Enter Details', desc: "Provide your vehicle's make, model, and condition through our secure portal." },
  { Icon: FlaskConical,  step: '2', title: 'Get Inspection', desc: 'Schedule a professional 150-point inspection at your home or our center.' },
  { Icon: Banknote,      step: '3', title: 'Get Paid', desc: 'Receive your funds via instant bank transfer the same day of the sale.' },
]

const TESTIMONIALS = [
  {
    quote: '"The process was unexpectedly smooth. I received a higher offer than my local dealership, and the inspection was done in my driveway. Money was in my account by dinner."',
    name: 'David Chen', role: 'Sold a 2021 BMW M5', avatar: 'https://i.pravatar.cc/64?img=33', stars: 5,
  },
  {
    quote: '"Total transparency from start to finish. Highly recommend for anyone looking to sell a luxury vehicle without the usual stress."',
    name: 'Sarah J.', role: 'Porsche 911 Owner', avatar: 'https://i.pravatar.cc/64?img=5', stars: 5,
  },
  {
    quote: '"Fair price, professional service, and no haggling. The easiest way to sell a premium car."',
    name: 'Michael R.', role: 'Audi RS7 Owner', avatar: 'https://i.pravatar.cc/64?img=11', stars: 5,
  },
]

const FAQS = [
  { q: 'How long does the process take?', a: 'From listing to payment typically takes 3–7 days. With our Express service, same-day offers and next-day payment are available.' },
  { q: 'Is there a fee to list my vehicle?', a: 'No. Listing is completely free. We earn a small success fee only when your car sells.' },
  { q: "How is my car's value determined?", a: 'We use real-time market data, vehicle condition, mileage, and regional demand to generate a certified valuation.' },
  { q: 'Can I sell a car with a loan on it?', a: 'Yes. We handle the payoff directly with your lender and send you the equity difference.' },
]

export default function SellYourCarPage() {
  const [step, setStep]         = useState(1)
  const [year, setYear]         = useState('')
  const [make, setMake]         = useState('')
  const [model, setModel]       = useState('')
  const [condition, setCondition] = useState('')
  const [mileage, setMileage]   = useState('')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [openFaq, setOpenFaq]   = useState(null)

  const SelectWrapper = ({ value, onChange, children, placeholder }) => (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="input-dark appearance-none pr-8 cursor-pointer text-sm h-12">
        <option value="">{placeholder}</option>
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
    </div>
  )

  return (
    <div className="min-h-screen pt-[72px]">

      {/* Hero Section */}
      <section className="relative min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1400&q=80"
            alt="" loading="eager" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b12] via-[#0a0b12]/85 to-[#0a0b12]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b12]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
            <Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-1">
              Home <ChevronRight size={13} />
            </Link>
            <span className="text-primary-400 font-semibold">Sell Your Car</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                              bg-emerald-500/10 border border-emerald-500/25 mb-6">
                <Zap size={13} className="text-emerald-400" />
                <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Instant Offers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5 text-balance">
                Get a Guaranteed Offer <span className="gradient-text">in Minutes.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                No haggling, no hidden fees — just a fair, market-driven value for your premium vehicle.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, label: 'Certified Valuation' },
                  { icon: Zap,    label: 'Instant Payout' },
                  { icon: CheckCircle2, label: 'No Fees' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-slate-300 text-sm">
                    <Icon size={13} className="text-primary-400" /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-step form */}
            <div className="glass-card rounded-3xl border border-white/[0.07] p-6 sm:p-8">
              {/* Step indicators */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-primary-400 text-sm font-semibold">
                  Step {step} of 3: {step === 1 ? 'Vehicle Details' : step === 2 ? 'Condition & Mileage' : 'Your Information'}
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`h-1.5 rounded-full transition-all duration-300
                      ${s <= step ? 'bg-primary-500 w-8' : 'bg-white/10 w-5'}`} />
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Year</label>
                      <SelectWrapper value={year} onChange={setYear} placeholder="Select Year">
                        {YEARS.filter(y => y !== 'Select Year').map(y => <option key={y}>{y}</option>)}
                      </SelectWrapper>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Make</label>
                      <SelectWrapper value={make} onChange={setMake} placeholder="Select Make">
                        {MAKES.filter(m => m !== 'Select Make').map(m => <option key={m}>{m}</option>)}
                      </SelectWrapper>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Model</label>
                    <input type="text" value={model} onChange={e => setModel(e.target.value)}
                      placeholder="e.g. 911 Carrera S" className="input-dark h-12 text-sm" />
                  </div>
                  <button onClick={() => setStep(2)} className="btn-primary w-full justify-center py-4">
                    Next: Condition & Mileage <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vehicle Condition</label>
                    <div className="grid grid-cols-2 gap-2">
                      {CONDITIONS.map(c => (
                        <button key={c.value} onClick={() => setCondition(c.value)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                            ${condition === c.value
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/10 hover:border-white/20'}`}>
                          <span className={`font-bold text-sm ${condition === c.value ? 'text-primary-300' : 'text-white'}`}>{c.label}</span>
                          <span className="text-slate-500 text-xs">{c.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Mileage</label>
                    <input type="text" value={mileage} onChange={e => setMileage(e.target.value)}
                      placeholder="e.g. 24,500" className="input-dark h-12 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setStep(1)} className="btn-ghost justify-center py-3.5">← Back</button>
                    <button onClick={() => setStep(3)} className="btn-primary justify-center py-3.5">
                      Next <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder="John Doe" className="input-dark h-12 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="john@example.com" className="input-dark h-12 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000" className="input-dark h-12 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setStep(2)} className="btn-ghost justify-center py-3.5">← Back</button>
                    <button onClick={() => setStep(1)} className="btn-primary justify-center py-3.5">
                      Get My Offer 🎉
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 bg-surface-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">Our Seamless Three-Step Process</h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm">From listing to payment in as little as 24 hours.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {STEPS_INFO.map(({ Icon, step: s, title, desc }, i) => (
              <div key={s} className="flex flex-col items-center text-center group">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-primary-500/15 border border-primary-500/25
                                  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-primary-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary-500
                                  flex items-center justify-center text-white text-xs font-black">
                    {s}
                  </div>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                Trusted by thousands of premium car owners.
              </h2>
              <p className="text-slate-500 text-sm">The top-rated destination for selling luxury vehicles.</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />)}
              <span className="text-slate-400 text-sm ml-2">4.9 / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Featured */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-7 border border-white/[0.06]">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />)}
              </div>
              <p className="text-white text-xl font-medium italic leading-relaxed mb-6">{TESTIMONIALS[0].quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <img src={TESTIMONIALS[0].avatar} alt={TESTIMONIALS[0].name} loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div>
                  <p className="text-white font-bold">{TESTIMONIALS[0].name}</p>
                  <p className="text-slate-500 text-xs">{TESTIMONIALS[0].role}</p>
                </div>
                <span className="ml-auto badge bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px]">Verified</span>
              </div>
            </div>

            {/* Stacked */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {TESTIMONIALS.slice(1).map(t => (
                <div key={t.name} className="glass-card rounded-2xl p-5 border border-white/[0.06] flex-1">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} size={11} className="text-yellow-400" fill="currentColor" />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{t.quote}</p>
                  <div className="flex items-center gap-2">
                    <img src={t.avatar} alt={t.name} loading="lazy" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-white text-sm font-semibold">{t.name}</span>
                    <span className="text-slate-600 text-xs">· {t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
                <button className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronRight size={16} className={`text-slate-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/[0.04] pt-4">
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
