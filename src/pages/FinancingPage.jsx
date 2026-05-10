import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, CheckCircle2, Calculator, TrendingUp, Clock, Shield, ArrowRight } from 'lucide-react'

function calcMonthly(principal, annualRate, months) {
  const r = annualRate / 100 / 12
  if (r === 0) return principal / months
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

const LOAN_TERMS_DATA = [
  { months: 36, apr: 3.99, popular: false },
  { months: 48, apr: 4.49, popular: true },
  { months: 60, apr: 4.99, popular: false },
  { months: 72, apr: 5.99, popular: false },
  { months: 84, apr: 7.49, popular: false },
]

const PROCESS_STEPS = [
  { icon: '📋', step: '1', title: 'Apply Online',    desc: 'Fill out our 2-minute secure application form. No credit impact.' },
  { icon: '⚡', step: '2', title: 'Get Approved',    desc: 'Receive your approval limit and tailored rate within minutes.' },
  { icon: '🚗', step: '3', title: 'Drive Away',      desc: 'Finalize paperwork and pick up your car. Same-day processing available.' },
]

const FAQS = [
  { q: 'Does pre-qualification affect my credit score?', a: 'No. Our pre-qualification uses a soft credit inquiry that does not affect your credit score in any way.' },
  { q: 'What credit score do I need?', a: 'We work with a broad range of credit profiles. Our lending partners can accommodate scores as low as 580, though better scores unlock lower rates.' },
  { q: 'Can I pay off my loan early?', a: 'Yes. We never charge early payoff penalties. You can make extra payments or pay off the entire balance at any time.' },
  { q: 'What documents do I need?', a: 'Government-issued ID, proof of income (last 2 pay stubs), and proof of insurance for the vehicle you are purchasing.' },
]

export default function FinancingPage() {
  const [loanAmount, setLoanAmount] = useState(45000)
  const [duration, setDuration]     = useState(60)
  const [interestRate, setRate]     = useState(4.99)
  const [openFaq, setOpenFaq]       = useState(null)

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const monthly = calcMonthly(loanAmount, interestRate, duration)
  const totalPay = monthly * duration
  const totalInt = totalPay - loanAmount
  const principalPct = Math.round((loanAmount / totalPay) * 100)

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-6">
          <Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            Home <ChevronRight size={13} />
          </Link>
          <span className="text-primary-400 font-semibold">Financing & Tools</span>
        </nav>

        {/* Hero */}
        <section className="text-center py-10 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          bg-primary-500/10 border border-primary-500/25 mb-6">
            <Calculator size={13} className="text-primary-400" />
            <span className="text-primary-300 text-xs font-semibold uppercase tracking-wider">Financing Tools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Finance Your <span className="gradient-text">Premium Drive</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent tools designed for clarity. Calculate your payments,
            compare terms, and get pre-approved in minutes.
          </p>
        </section>

        {/* Loan Calculator + CTA */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
          {/* Calculator Card */}
          <div className="lg:col-span-8 glass-card rounded-3xl border border-white/[0.06] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white">Loan Calculator</h2>
              <Calculator size={22} className="text-primary-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sliders */}
              <div className="space-y-8">
                {/* Loan Amount */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-sm font-semibold">Loan Amount</label>
                    <span className="text-primary-400 font-black text-lg">{fmt(loanAmount)}</span>
                  </div>
                  <input type="range" min={5000} max={350000} step={1000} value={loanAmount}
                    onChange={e => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-primary-500 h-1.5 cursor-pointer" />
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>$5k</span><span>$350k</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-sm font-semibold">Duration (Months)</label>
                    <span className="text-primary-400 font-black text-lg">{duration}mo</span>
                  </div>
                  <input type="range" min={12} max={84} step={12} value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full accent-primary-500 h-1.5 cursor-pointer" />
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>12m</span><span>84m</span>
                  </div>
                </div>

                {/* APR */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-sm font-semibold">Interest Rate (APR)</label>
                    <span className="text-primary-400 font-black text-lg">{interestRate.toFixed(2)}%</span>
                  </div>
                  <input type="range" min={1.99} max={18.99} step={0.25} value={interestRate}
                    onChange={e => setRate(Number(e.target.value))}
                    className="w-full accent-primary-500 h-1.5 cursor-pointer" />
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>1.99%</span><span>18.99%</span>
                  </div>
                </div>
              </div>

              {/* Breakdown visual */}
              <div className="glass rounded-2xl border border-white/[0.06] p-6 flex flex-col items-center justify-center text-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Monthly Payment</p>
                <p className="text-primary-400 font-black text-4xl mb-6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(monthly)}
                </p>

                {/* Bar chart */}
                <div className="w-full h-36 flex items-end gap-2 px-4 mb-5">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg bg-primary-500/25 transition-all duration-500"
                      style={{ height: `${principalPct}%` }} />
                    <span className="text-[10px] text-slate-500">Principal</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg bg-primary-500/70 transition-all duration-500"
                      style={{ height: `${100 - principalPct}%` }} />
                    <span className="text-[10px] text-slate-500">Interest</span>
                  </div>
                </div>

                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-primary-500/30 inline-block" /> Principal
                    </span>
                    <span className="text-white font-semibold">{fmt(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-primary-500/70 inline-block" /> Total Interest
                    </span>
                    <span className="text-white font-semibold">{fmt(totalInt)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                    <span className="text-slate-400 font-semibold">Total Cost</span>
                    <span className="text-primary-300 font-black">{fmt(totalPay)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prequalify CTA */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-3xl border border-white/[0.06] p-6 sm:p-8 h-full flex flex-col
                            relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/8 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <h3 className="text-white font-black text-xl mb-3">Ready to move?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Our secure pre-qualification process takes under 2 minutes and won't affect your credit score.
                </p>

                <ul className="space-y-4 mb-8">
                  {['No Credit Score Impact', 'Instant Approval Limit', 'Access to Premium Rates', 'Flexible Down Payments'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="btn-primary w-full justify-center py-4 text-base mt-auto">
                  Prequalify Now <ArrowRight size={16} />
                </button>
                <p className="text-slate-600 text-[11px] text-center mt-3">
                  No hard inquiry · Results in &lt; 2 min
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Term Comparison Table */}
        <section className="mb-14">
          <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-base">Loan Term Comparison</h2>
                <p className="text-slate-500 text-xs mt-0.5">Based on your {fmt(loanAmount)} selection</p>
              </div>
              <TrendingUp size={18} className="text-primary-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Term', 'Est. APR', 'Monthly Payment', 'Total Interest', 'Action'].map(h => (
                      <th key={h} className="px-5 py-3 text-slate-500 text-xs font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LOAN_TERMS_DATA.map(({ months, apr, popular }) => {
                    const m = calcMonthly(loanAmount, apr, months)
                    const interest = m * months - loanAmount
                    return (
                      <tr key={months}
                        className={`border-b border-white/[0.04] transition-colors
                          ${popular ? 'bg-primary-500/5 hover:bg-primary-500/10' : 'hover:bg-white/[0.02]'}`}>
                        <td className="px-5 py-4 text-white font-semibold">
                          {months} Months
                          {popular && (
                            <span className="ml-2 badge bg-primary-500 text-white text-[9px] border-0">Popular</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-slate-300">{apr.toFixed(2)}%</td>
                        <td className="px-5 py-4 text-primary-300 font-bold">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(m)}
                        </td>
                        <td className="px-5 py-4 text-slate-400">{fmt(interest)}</td>
                        <td className="px-5 py-4">
                          <button className="text-primary-400 text-xs font-semibold hover:text-primary-300 transition-colors">
                            Apply Term →
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">Simple Three-Step Process</h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm">From application to keys in hand — we've made it effortless.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map(({ icon, step, title, desc }, i) => (
              <div key={step}
                className="glass-card rounded-2xl p-6 border border-white/[0.06] text-center relative
                           hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 w-6 h-px bg-white/[0.1] z-10" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20
                                flex items-center justify-center text-2xl mx-auto mb-5">
                  {icon}
                </div>
                <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center
                                text-white text-xs font-black mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="mb-14 relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80"
              alt="" loading="lazy" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b12] to-[#0a0b12]/60" />
          </div>
          <div className="relative px-8 py-14 max-w-xl">
            <h2 className="text-3xl font-black text-white mb-4">
              Lending you can <span className="gradient-text">trust.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              We partner with 30+ premium lenders to give you competitive rates,
              flexible terms, and a transparent experience from start to finish.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Shield, label: 'Bank-Level Security' },
                { icon: Clock, label: 'Same-Day Funding' },
                { icon: CheckCircle2, label: 'No Hidden Fees' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-slate-300">
                  <Icon size={14} className="text-primary-400" /> {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-20">
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
        </section>

      </div>
    </div>
  )
}
