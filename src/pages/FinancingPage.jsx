import { useState } from 'react'
import { Link } from 'react-router-dom'

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
]

const FAQS = [
  {
    q: 'Does pre-qualification affect my credit score?',
    a: 'No. Our pre-qualification uses a soft credit inquiry that does not affect your credit score in any way.',
  },
  {
    q: 'What credit score do I need?',
    a: 'We work with a broad range of credit profiles. Our lending partners can accommodate scores as low as 580, though better scores unlock lower rates.',
  },
  {
    q: 'Can I pay off my loan early?',
    a: 'Yes. We never charge early payoff penalties. You can make extra payments or pay off the entire balance at any time.',
  },
  {
    q: 'What documents do I need?',
    a: 'Government-issued ID, proof of income (last 2 pay stubs), and proof of insurance for the vehicle you are purchasing.',
  },
]

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const fmtDec = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

export default function FinancingPage() {
  const [loanAmount, setLoanAmount] = useState(45000)
  const [loanDuration, setLoanDuration] = useState(60)
  const [apr, setApr] = useState(4.99)
  const [openFaq, setOpenFaq] = useState(null)

  const monthly = calcMonthly(loanAmount, apr, loanDuration)
  const totalPay = monthly * loanDuration
  const totalInt = totalPay - loanAmount
  const principalPct = Math.min(95, Math.max(5, Math.round((loanAmount / totalPay) * 100)))

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-on-surface-variant py-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Financing</span>
        </nav>

        {/* Hero */}
        <section className="text-center py-8 mb-6">
          <h1 className="text-display-lg text-on-surface mb-4">Finance Your Premium Drive</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Transparent tools designed for clarity. Calculate your payments, compare terms, and get pre-approved in minutes.
          </p>
        </section>

        {/* Loan Calculator + Pre-qualify */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg mb-10">
          {/* Calculator */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-[#c2c6d6]/15 p-xl shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-headline-md text-on-surface">Loan Calculator</h2>
              <span className="material-symbols-outlined text-[24px] text-primary">calculate</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sliders left */}
              <div className="space-y-8">
                {/* Loan Amount */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-on-surface-variant text-sm font-semibold">Loan Amount</label>
                    <span className="text-primary font-black text-lg">{fmt(loanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={150000}
                    step={1000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>$5k</span><span>$150k</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-on-surface-variant text-sm font-semibold">Duration (Months)</label>
                    <span className="text-primary font-black text-lg">{loanDuration}mo</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={84}
                    step={12}
                    value={loanDuration}
                    onChange={(e) => setLoanDuration(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>12m</span><span>84m</span>
                  </div>
                </div>

                {/* APR */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-on-surface-variant text-sm font-semibold">Interest Rate (APR)</label>
                    <span className="text-primary font-black text-lg">{apr.toFixed(2)}%</span>
                  </div>
                  <input
                    type="range"
                    min={1.99}
                    max={18.99}
                    step={0.25}
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>1.99%</span><span>18.99%</span>
                  </div>
                </div>
              </div>

              {/* Breakdown right */}
              <div className="bg-surface-container-low rounded-xl p-lg flex flex-col items-center text-center">
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-2">
                  Estimated Monthly Payment
                </p>
                <p className="text-price-xl text-primary mb-6">{fmtDec(monthly)}</p>

                {/* Bar chart */}
                <div className="w-full h-36 flex items-end gap-4 px-6 mb-5">
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-primary transition-all duration-500"
                      style={{ height: `${principalPct}%` }}
                    />
                    <span className="text-xs text-on-surface-variant">Principal</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-primary-fixed-dim transition-all duration-500"
                      style={{ height: `${100 - principalPct}%` }}
                    />
                    <span className="text-xs text-on-surface-variant">Interest</span>
                  </div>
                </div>

                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-[9999px] bg-primary inline-block" />
                      Principal
                    </span>
                    <span className="text-on-surface font-semibold">{fmt(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-[9999px] bg-primary-fixed-dim inline-block" />
                      Total Interest
                    </span>
                    <span className="text-on-surface font-semibold">{fmt(totalInt)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#c2c6d6]/20">
                    <span className="text-on-surface font-semibold">Total Cost</span>
                    <span className="text-primary font-black">{fmt(totalPay)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-qualify card */}
          <div className="lg:col-span-4">
            <div className="bg-on-background text-surface rounded-xl p-xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-white font-bold text-xl mb-3">Ready to move?</h3>
                <p className="text-[#e1e2ec]/70 text-sm leading-relaxed mb-8">
                  Our secure pre-qualification process takes under 2 minutes and won't affect your credit score.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    'No Credit Score Impact',
                    'Instant Approval Limit',
                    'Access to Premium Rates',
                    'Flexible Down Payments',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className="material-symbols-outlined text-[18px] text-[#adc6ff] shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                      >
                        check_circle
                      </span>
                      <span className="text-[#e1e2ec]/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button className="w-full h-[48px] rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
                  Prequalify Now
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <p className="text-[#e1e2ec]/40 text-xs text-center mt-3">
                  No hard inquiry · Results in &lt; 2 min
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Term Comparison Table */}
        <section className="mb-14">
          <div className="bg-surface-container-lowest rounded-xl border border-[#c2c6d6]/15 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#c2c6d6]/15 flex items-center justify-between">
              <div>
                <h2 className="text-on-surface font-semibold text-base">Loan Term Comparison</h2>
                <p className="text-on-surface-variant text-xs mt-0.5">Based on your {fmt(loanAmount)} selection</p>
              </div>
              <span className="material-symbols-outlined text-[20px] text-primary">analytics</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#c2c6d6]/15">
                    {['Term', 'APR', 'Monthly', 'Total Interest', 'Action'].map((h) => (
                      <th key={h} className="px-5 py-3 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LOAN_TERMS_DATA.map(({ months, apr: rowApr, popular }) => {
                    const m = calcMonthly(loanAmount, rowApr, months)
                    const interest = m * months - loanAmount
                    return (
                      <tr
                        key={months}
                        className={`border-b border-[#c2c6d6]/10 transition-colors ${
                          popular ? 'bg-primary/5' : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <td className="px-5 py-4 text-on-surface font-semibold">
                          {months} Months
                          {popular && (
                            <span className="ml-2 text-[10px] font-semibold bg-primary text-on-primary px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-on-surface-variant">{rowApr.toFixed(2)}%</td>
                        <td className="px-5 py-4 text-primary font-bold">{fmtDec(m)}</td>
                        <td className="px-5 py-4 text-on-surface-variant">{fmt(interest)}</td>
                        <td className="px-5 py-4">
                          <button className="text-primary text-xs font-semibold hover:text-primary-container transition-colors">
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

        {/* How Financing Works */}
        <section className="mb-14">
          <div className="text-center mb-10">
            <h2 className="text-headline-lg text-on-surface mb-3">How Financing Works</h2>
            <p className="text-on-surface-variant text-body-md max-w-md mx-auto">
              From application to keys in hand — we've made it effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'search', step: '1', title: 'Apply Online', desc: 'Fill out our 2-minute secure application form. No credit impact.' },
              { icon: 'description', step: '2', title: 'Get Approved', desc: 'Receive your approval limit and tailored rate within minutes.' },
              { icon: 'verified', step: '3', title: 'Drive Away', desc: 'Finalize paperwork and pick up your car. Same-day processing available.' },
            ].map(({ icon, step, title, desc }) => (
              <div
                key={step}
                className="bg-surface-container-lowest rounded-xl p-lg border border-[#c2c6d6]/15 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-[9999px] bg-primary-container flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[28px] text-on-primary-container">{icon}</span>
                </div>
                <div className="w-7 h-7 rounded-[9999px] bg-primary flex items-center justify-center text-on-primary text-xs font-black mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-on-surface font-semibold text-base mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="mb-14 relative h-[400px] rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80"
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#191b23]/90 via-[#191b23]/70 to-[#191b23]/30" />
          <div className="relative h-full flex items-center px-10 max-w-xl">
            <div>
              <h2 className="text-headline-lg text-white mb-4">Lending you can trust.</h2>
              <p className="text-[#e1e2ec]/70 text-body-md leading-relaxed mb-8">
                We partner with 30+ premium lenders to give you competitive rates, flexible terms, and a transparent experience from start to finish.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: 'lock', label: 'Bank-Level Security' },
                  { icon: 'bolt', label: 'Same-Day Funding' },
                  { icon: 'verified', label: 'No Hidden Fees' },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-[#e1e2ec]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[800px] mx-auto mb-20">
          <h2 className="text-headline-md text-on-surface text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-surface rounded-lg border border-[#c2c6d6]/20 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-on-surface font-semibold text-sm pr-4">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-on-surface-variant shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-on-surface-variant text-sm leading-relaxed border-t border-[#c2c6d6]/10 pt-4">
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
