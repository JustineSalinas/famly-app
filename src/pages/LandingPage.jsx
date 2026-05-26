// src/pages/LandingPage.jsx
import { useState } from 'react'
import logo from '../assets/famly.png'
import {
  BookOpen,
  CreditCard,
  Target,
  Users,
  ArrowUpRight,
  Menu,
  X,
  Home,
  Search,
  ChevronRight,
  Sparkles,
  Sliders,
  Code,
  Check,
  DollarSign,
  TrendingDown,
  GraduationCap,
  PiggyBank,
  GitBranch
} from 'lucide-react'
import '../landing.css'

export default function LandingPage({ onGetStarted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('PHP') // 'PHP' | 'USD'
  const [openFaq, setOpenFaq] = useState(null) // index of open FAQ item

  // Demo profile definitions for hero mockup display
  const demoProfiles = [
    { name: 'Mom', emoji: '👩', gradient: 'from-purple-600 to-pink-400' },
    { name: 'Kuya', emoji: '👦', gradient: 'from-blue-600 to-blue-400' },
    { name: 'Ate', emoji: '👧', gradient: 'from-emerald-600 to-teal-500' }
  ]

  // Demo tuition table data for hero mockup display
  const demoTuitions = [
    { scholar: 'Kuya', item: 'Downpayment', amount: 35000, date: '06-01', status: 'Paid' },
    { scholar: 'Bunso', item: 'Monthly Inst.', amount: 8400, date: '05-20', status: 'Overdue' },
    { scholar: 'Ate', item: 'Semester Fee', amount: 12500, date: '06-15', status: 'Pending' }
  ]

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 font-sans-inter overflow-x-hidden lp-scrollbar relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] lp-radial-glow pointer-events-none z-0" />

      {/* ─── Header / Navbar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#090A0F]/80 backdrop-blur-md border-b border-slate-800/40 py-3 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1 md:flex-1">
            <img src={logo} alt="Famly" className="h-14 w-auto object-contain" />
            <span className="text-2xl font-bold tracking-tight text-slate-100 -ml-1.5">Famly</span>
          </div>

          {/* Nav links (desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-slate-400 font-medium md:flex-1">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-200 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-slate-200 transition-colors">Pricing</a>
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-3 md:flex-1">
            <button
              onClick={() => onGetStarted('login')}
              className="px-3.5 py-1.5 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-800/30 transition-all active:scale-95 duration-75"
            >
              Sign In
            </button>
            <button
              onClick={() => onGetStarted('register')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 duration-75 shadow-md shadow-blue-900/10 border border-blue-500/10 flex items-center gap-1"
            >
              Start Free
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors active:scale-95 duration-75"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile nav dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800/40 bg-[#16181D]/95 backdrop-blur-md px-6 py-4 space-y-4 absolute top-14 left-0 w-full z-30 shadow-2xl">
          <nav className="flex flex-col gap-3 text-sm text-slate-400 font-medium">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-200 transition-colors">How It Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-200 transition-colors">Pricing</a>
          </nav>
          <div className="h-px bg-slate-800/60 w-full" />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onGetStarted('login')
              }}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all active:scale-95 duration-75"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onGetStarted('register')
              }}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 duration-75 text-center shadow-sm"
            >
              Start Free
            </button>
          </div>
        </div>
      )}

      {/* ─── Hero Section ───────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16 flex flex-col items-center text-center z-10">
        {/* Intro Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Introducing Famly OS
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1] max-w-3xl">
          One place for <br className="hidden sm:inline" />
          <span className="lp-gradient-text">every family goal.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm md:text-base text-slate-400 mt-6 leading-relaxed max-w-2xl">
          The shared operating system for Filipino families to conquer multi-creditor debts, manage tuition backlogs, and hit massive saving milestones—all from a single, beautiful dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <a
            href="#how-it-works"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all active:scale-95 duration-75 shadow-lg shadow-blue-900/20 border border-blue-500/10 flex items-center gap-1.5"
          >
            See how it works
            <ChevronRight size={14} />
          </a>
          <a
            href="https://github.com/JustineSalinas/famly-app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-lg border border-slate-700/60 transition-all active:scale-95 duration-75 flex items-center gap-1.5"
          >
            <GitBranch size={14} />
            View GitHub Repo
          </a>
        </div>

        {/* Hero Mockup Preview Window - Replicates Carbon SaaS dashboard style */}
        <div className="w-full max-w-3xl mt-16 animate-lp-float">
          <div className="bg-[#16181D] border border-slate-800/60 rounded-xl overflow-hidden shadow-2xl relative text-left">
            
            {/* macOS title bar dots */}
            <div className="bg-[#0C0D0F] border-b border-slate-800/40 px-4 py-3.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] text-slate-500 ml-2 select-none font-mono">famly-os_preview.app</span>
            </div>

            {/* Mock Dashboard Layout */}
            <div className="flex h-[340px] sm:h-[400px]">
              
              {/* Mock Sidebar */}
              <aside className="w-36 sm:w-44 bg-[#0C0D0F] border-r border-slate-800/40 p-2.5 flex flex-col justify-between shrink-0">
                <div className="space-y-4">
                  <div className="px-2 py-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Family Ledger
                  </div>
                  <nav className="space-y-1">
                    {[
                      { label: 'Dashboard', icon: Home, active: true },
                      { label: 'Tuitions', icon: BookOpen },
                      { label: 'Debts Ledger', icon: CreditCard },
                      { label: 'Milestones', icon: Target }
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors
                            ${item.active ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500 rounded-l-none' : 'text-slate-400'}`}
                        >
                          <Icon size={12} className={item.active ? 'text-blue-400' : 'text-slate-500'} />
                          <span className="truncate">{item.label}</span>
                        </div>
                      )
                    })}
                  </nav>
                </div>
                <div className="p-1.5 bg-[#16181D]/60 rounded-lg border border-slate-800/40 text-center">
                  <p className="text-[9px] text-slate-400 leading-normal">Interactive Sandbox Mode</p>
                </div>
              </aside>

              {/* Mock Main Workspace */}
              <div className="flex-1 flex flex-col bg-[#090A0F]">
                {/* Mock Header */}
                <header className="h-11 border-b border-slate-800/40 px-3 sm:px-4 flex items-center justify-between shrink-0 bg-[#16181D]/30">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase font-semibold">
                    <span>Preview</span>
                    <ChevronRight size={10} className="text-slate-700" />
                    <span className="text-slate-300">Dashboard</span>
                  </div>

                  {/* Profile switcher preview */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] text-slate-500 font-semibold uppercase">Viewer:</span>
                    <div className="flex gap-0.5 bg-[#0C0D0F] p-0.5 border border-slate-800/40 rounded">
                      {demoProfiles.map((p, idx) => (
                        <div
                          key={idx}
                          className={`w-4 h-4 rounded text-[9px] flex items-center justify-center
                            ${idx === 0 ? `bg-gradient-to-br ${p.gradient} text-white` : 'text-slate-500'}`}
                        >
                          {p.emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </header>

                {/* Mock Content */}
                <div className="flex-1 p-3 sm:p-4 space-y-4 overflow-y-auto lp-scrollbar">
                  
                  {/* Summary row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Total Paid', value: '₱38,200', color: 'text-slate-100' },
                      { label: 'Pending', value: '₱45,900', color: 'text-amber-400' },
                      { label: 'Active Loans', value: '₱78,400', color: 'text-rose-400' }
                    ].map((card, idx) => (
                      <div key={idx} className="bg-[#16181D] p-2 border border-slate-800/40 rounded-lg">
                        <p className="text-[8px] font-bold text-slate-500 uppercase">{card.label}</p>
                        <p className={`text-xs sm:text-sm font-semibold tracking-tight mt-0.5 ${card.color}`}>{card.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* High-density mini table preview */}
                  <div className="bg-[#16181D] border border-slate-800/40 rounded-lg p-2.5 space-y-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Family Tuition ledger</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px] border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800/40 text-left text-slate-500 font-semibold">
                            <th className="pb-1.5">Scholar</th>
                            <th className="pb-1.5">Installment Item</th>
                            <th className="pb-1.5 text-right">Amount</th>
                            <th className="pb-1.5 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {demoTuitions.map((row, idx) => (
                            <tr key={idx} className="border-b border-slate-800/20 hover:bg-slate-800/40 transition-colors">
                              <td className="py-1.5 font-medium text-slate-300">{row.scholar}</td>
                              <td className="py-1.5 text-slate-400">{row.item}</td>
                              <td className="py-1.5 text-right font-semibold text-slate-200">₱{row.amount.toLocaleString()}</td>
                              <td className="py-1.5 text-right">
                                <span className={`inline-flex px-1 py-0.2 rounded-[3px] text-[8px] font-bold
                                  ${row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                    row.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Features / Value Props Section ──────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/40 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Features</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Every peso, every goal—<br />tracked with intention.
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Four core modules engineered to replace your family's scattered spreadsheets, group chats, and memory gaps.
          </p>
        </div>

        {/* Feature 1 — Debt Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700 transition-all group overflow-hidden">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <TrendingDown size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">The Unified Debt Ledger</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Stop guessing exact balances. Track complex, multi-creditor accounts, monitor interest rates, and know exactly what it takes to reach zero.
                </p>
              </div>
            </div>
            {/* Inline mini-mockup: debt rows */}
            <div className="bg-[#070809] border border-slate-800/50 rounded-xl p-3 space-y-2 text-[10px]">
              <div className="flex justify-between text-slate-500 font-semibold pb-1.5 border-b border-slate-800/40">
                <span>Creditor</span><span>Balance</span><span>Rate</span>
              </div>
              {[
                { name: 'SSS Calamity Loan', bal: '₱18,400', rate: '10%', color: 'text-rose-400' },
                { name: 'BDO Housing Loan', bal: '₱312,000', rate: '7.5%', color: 'text-amber-400' },
                { name: 'PAGIBIG MP2', bal: '₱45,000', rate: '5%', color: 'text-emerald-400' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <span className="text-slate-300 font-medium">{row.name}</span>
                  <span className={`font-bold ${row.color}`}>{row.bal}</span>
                  <span className="text-slate-500">{row.rate}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/40 font-bold">
                <span className="text-slate-400">Total Remaining</span>
                <span className="text-rose-400 text-xs">₱375,400</span>
                <span />
              </div>
            </div>
          </div>

          {/* Feature 2 — Tuition Tracker */}
          <div className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700 transition-all group overflow-hidden">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <GraduationCap size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">The Tuition &amp; Education Tracker</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Keep scholars on track. Manage active semester assessments, schedule installment plans, and clear historical unpaid backlogs without the spreadsheet chaos.
                </p>
              </div>
            </div>
            {/* Inline mini-mockup: tuition progress bars */}
            <div className="bg-[#070809] border border-slate-800/50 rounded-xl p-3 space-y-3 text-[10px]">
              {[
                { scholar: 'Kuya — AY 2024–25 Sem 2', paid: 72, amount: '₱35,000', status: 'In Progress' },
                { scholar: 'Ate — AY 2024–25 Sem 1', paid: 100, amount: '₱28,500', status: 'Cleared' },
                { scholar: 'Bunso — Backlog 2023', paid: 30, amount: '₱12,000', status: 'Overdue' },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-medium">{t.scholar}</span>
                    <span className={`font-bold ${
                      t.paid === 100 ? 'text-emerald-400' : t.paid < 40 ? 'text-rose-400' : 'text-amber-400'
                    }`}>{t.paid}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        t.paid === 100 ? 'bg-emerald-400' : t.paid < 40 ? 'bg-rose-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${t.paid}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Feature 3 — Milestones */}
          <div className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700 transition-all group overflow-hidden">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
                <PiggyBank size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Milestone Synchronization</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Turn big dreams into measurable targets. Whether it's a house downpayment or an emergency fund, visualize your family's progress with clear, trackable savings goals.
                </p>
              </div>
            </div>
            {/* Inline mini-mockup: milestone ring + bars */}
            <div className="bg-[#070809] border border-slate-800/50 rounded-xl p-3 flex gap-4 items-center">
              {/* Simulated ring chart */}
              <div className="shrink-0 w-14 h-14 relative flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="3"
                    strokeDasharray="62 88" strokeLinecap="round" />
                </svg>
                <span className="absolute text-[9px] font-bold text-violet-400">62%</span>
              </div>
              <div className="flex-1 space-y-1.5 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-semibold">House Downpayment</span>
                  <span className="text-violet-400 font-bold">₱186k / ₱300k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Emergency Fund</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Graduation Trip</span>
                  <span className="text-amber-400 font-bold">18%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 — Profile Selection */}
          <div className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700 transition-all group overflow-hidden">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Users size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">One Login, Personalized Dashboards</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Total transparency, zero friction. A single household login combined with Netflix-style profile selection ensures everyone only sees the financial focus areas relevant to them.
                </p>
              </div>
            </div>
            {/* Inline mini-mockup: avatar cards */}
            <div className="bg-[#070809] border border-slate-800/50 rounded-xl p-3">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Who's managing today?</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Mom', emoji: '👩', gradient: 'from-purple-600 to-pink-500', role: 'Debt + Planner' },
                  { name: 'Kuya', emoji: '👦', gradient: 'from-blue-600 to-blue-400', role: 'Tuition' },
                  { name: 'Ate', emoji: '👧', gradient: 'from-emerald-600 to-teal-400', role: 'Milestone' },
                ].map((p, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                    i === 0 ? 'border-purple-500/40 bg-purple-500/5' : 'border-slate-800/40 hover:border-slate-700'
                  }`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-base shadow-lg`}>
                      {p.emoji}
                    </div>
                    <span className="text-[9px] font-bold text-slate-200">{p.name}</span>
                    <span className="text-[8px] text-slate-500 text-center leading-tight">{p.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ───────────────────────────────────── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/40 relative z-10 bg-[#0C0D0F]/30">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">How It Works</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Your family's OS, live in minutes
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Four intentional steps from blank slate to full financial clarity—no spreadsheet PhD required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: '01',
              title: 'Register your household',
              desc: 'One secure account becomes the root of your entire family ledger. Firebase Auth keeps credentials encrypted at rest.',
              accent: 'text-blue-400'
            },
            {
              num: '02',
              title: 'Build member profiles',
              desc: 'Give each family member an emoji avatar, a gradient color, and the dashboard type that matches their role—scholar, planner, or admin.',
              accent: 'text-violet-400'
            },
            {
              num: '03',
              title: 'Log debts, tuition & goals',
              desc: 'Enter creditors, semester payment schedules, and savings milestones. Famly structures it all into real-time ledgers automatically.',
              accent: 'text-emerald-400'
            },
            {
              num: '04',
              title: 'Stay aligned, always',
              desc: 'Every update syncs across profiles. Mom sees the debt picture. Kuya tracks his own tuition. Everyone moves in the same direction.',
              accent: 'text-amber-400'
            }
          ].map((step, idx) => (
            <div key={idx} className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-slate-700 transition-all">
              <span className="absolute top-3 right-4 text-5xl font-extrabold text-slate-800/20 font-mono select-none leading-none">{step.num}</span>
              <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${step.accent}`}>Step {step.num}</div>
              <h4 className="text-sm font-bold text-slate-100 leading-snug">{step.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── Pricing Section ─────────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/40 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mt-3 tracking-tight leading-tight">
            Supercharge your family's finances.<br />
            <span className="lp-gradient-text">Start free now.</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3">No credit card required.</p>

          {/* Currency toggle */}
          <div className="inline-flex items-center gap-1 mt-6 bg-[#0C0D0F] border border-slate-800/60 rounded-full p-1">
            <button
              id="currency-php-btn"
              onClick={() => setCurrency('PHP')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                currency === 'PHP'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ₱ PHP
            </button>
            <button
              id="currency-usd-btn"
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              id: 'plan-starter',
              tier: 'STARTER',
              priceLabel: 'Free',
              priceSuffix: null,
              desc: 'Perfect for a single family getting started. Track one member per dashboard type with core tools.',
              cta: 'Start Free Sandbox',
              ctaAction: 'register',
              featured: false,
              paymongo: false,
              features: [
                { label: 'Up to 3 family members', included: true },
                { label: 'Tuition & Debt dashboards', included: true },
                { label: 'Milestone board', included: true },
                { label: 'Shared family profiles', included: true },
                { label: 'Priority support', included: false },
                { label: 'Firestore cloud sync', included: false },
                { label: 'Export to PDF / CSV', included: false },
              ]
            },
            {
              id: 'plan-family',
              tier: 'FAMILY',
              pricePHP: 299,
              priceUSD: 5,
              priceSuffix: 'per month',
              desc: 'For growing families. Unlock cloud sync, unlimited members, and priority email support.',
              cta: 'Get Started',
              ctaAction: 'register',
              featured: true,
              paymongo: true,
              features: [
                { label: 'Unlimited family members', included: true },
                { label: 'All 4 dashboards unlocked', included: true },
                { label: 'Milestone board', included: true },
                { label: 'Shared family profiles', included: true },
                { label: 'Priority support', included: true },
                { label: 'Firestore cloud sync', included: true },
                { label: 'Export to PDF / CSV', included: false },
              ]
            },
            {
              id: 'plan-pro',
              tier: 'PRO',
              pricePHP: 699,
              priceUSD: 12,
              priceSuffix: 'per month',
              desc: 'Everything in Family, plus PDF/CSV exports, analytics insights, and early access to new features.',
              cta: 'Get Started',
              ctaAction: 'register',
              featured: false,
              paymongo: true,
              features: [
                { label: 'Unlimited family members', included: true },
                { label: 'All 4 dashboards unlocked', included: true },
                { label: 'Milestone board', included: true },
                { label: 'Shared family profiles', included: true },
                { label: 'Priority support', included: true },
                { label: 'Firestore cloud sync', included: true },
                { label: 'Export to PDF / CSV', included: true },
              ]
            }
          ].map((plan) => (
            <div
              key={plan.id}
              id={plan.id}
              className={`relative flex flex-col bg-[#0C0D0F] border rounded-2xl p-6 transition-all duration-200 shadow-sm hover:shadow-xl ${
                plan.featured
                  ? 'border-blue-500/50 shadow-blue-900/20 ring-1 ring-blue-500/20'
                  : 'border-slate-800/60 hover:border-slate-700'
              }`}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow-lg shadow-blue-900/30 uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier label */}
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${
                plan.featured ? 'text-blue-400' : 'text-slate-500'
              }`}>{plan.tier}</p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-2">
                {plan.priceLabel ? (
                  <span className="text-4xl font-extrabold text-slate-100">{plan.priceLabel}</span>
                ) : (
                  <>
                    <span className="text-xl font-bold text-slate-400 mb-1">
                      {currency === 'PHP' ? '₱' : '$'}
                    </span>
                    <span className="text-4xl font-extrabold text-slate-100">
                      {currency === 'PHP' ? plan.pricePHP : plan.priceUSD}
                    </span>
                    <span className="text-xs text-slate-500 mb-1 ml-0.5">{plan.priceSuffix}</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-5">{plan.desc}</p>

              {/* PayMongo badge */}
              {plan.paymongo && (
                <div className="flex items-center gap-1.5 mb-4 px-2.5 py-1.5 bg-[#16181D] border border-slate-800/40 rounded-lg w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span className="text-[10px] font-semibold text-slate-400">Powered by <span className="text-emerald-400 font-bold">PayMongo</span></span>
                </div>
              )}

              {/* CTA button */}
              <button
                id={`${plan.id}-cta`}
                onClick={() => onGetStarted(plan.ctaAction)}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 duration-75 mb-6 ${
                  plan.featured
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border border-blue-500/10'
                    : 'bg-[#16181D] hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                }`}
              >
                {plan.cta}
              </button>

              {/* Feature divider */}
              <div className="h-px bg-slate-800/60 w-full mb-5" />

              {/* Features list */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    {feat.included ? (
                      <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check size={9} className="text-emerald-400" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-800/60 border border-slate-700/40 flex items-center justify-center shrink-0">
                        <X size={9} className="text-slate-600" />
                      </span>
                    )}
                    <span className={`text-xs ${
                      feat.included ? 'text-slate-300 font-medium' : 'text-slate-600'
                    }`}>{feat.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PayMongo footnote */}
        <p className="text-center text-[11px] text-slate-600 mt-8">
          Paid plans are processed securely via <span className="text-slate-500 font-semibold">PayMongo</span> — accepting GCash, Maya, credit/debit cards, and bank transfers.
        </p>
      </section>

      {/* ─── CTA Banner ─────────────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 z-10">
        <div className="absolute inset-0 lp-radial-banner pointer-events-none rounded-2xl border border-slate-800/40" />
        <div className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Start organizing your<br />
            <span className="lp-gradient-text">family's future today.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Create your account in seconds. Share access across scholars and parents, and eliminate the finance coordination friction.
          </p>
          <button
            onClick={() => onGetStarted('register')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all active:scale-95 duration-75 shadow-lg shadow-blue-900/10 inline-flex items-center gap-1.5"
          >
            Create Your Free Account
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────────── */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Have questions that<br />
            <span className="lp-gradient-text">need answers?</span>
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Is Famly free to use?',
              a: 'Yes—the Starter plan is completely free forever. You get up to 3 family members, full access to all 4 dashboards, and no credit card required to get started.'
            },
            {
              q: 'How does profile selection work?',
              a: 'When you log in, you\'ll see a Netflix-style profile picker. Each family member has their own emoji avatar and is assigned a dashboard type—so Kuya sees his Tuition dashboard while Mom sees the Debt Ledger. Everyone stays in their lane.'
            },
            {
              q: 'What payment methods does Famly accept?',
              a: 'Paid plans (Family & Pro) are processed securely through PayMongo, supporting GCash, Maya, credit and debit cards, and direct bank transfers—all major Philippine payment channels.'
            },
            {
              q: 'Can I track multiple scholars and multiple debts at the same time?',
              a: 'Absolutely. The Tuition Tracker supports multiple scholars with separate semester schedules, and the Debt Ledger handles multiple creditors simultaneously with per-creditor interest tracking.'
            },
            {
              q: 'Is my family\'s financial data secure?',
              a: 'All authentication is handled by Firebase Auth with encrypted session tokens. Data is stored in Cloud Firestore and scoped to your unique family account—no other family can access your records.'
            },
            {
              q: 'When will Firestore cloud sync be available?',
              a: 'Cloud sync is already included in the Family and Pro plans. For Starter users on local storage, the upgrade path is one click away in your settings.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="border border-slate-800/60 rounded-xl overflow-hidden bg-[#0C0D0F] hover:border-slate-700 transition-colors"
            >
              <button
                id={`faq-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-200 hover:text-slate-100 transition-colors"
              >
                <span>{item.q}</span>
                <span className={`ml-4 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  openFaq === i
                    ? 'border-blue-500/60 bg-blue-500/10 text-blue-400 rotate-45'
                    : 'border-slate-700 text-slate-500'
                }`}>
                  <X size={10} />
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/40 bg-[#0C0D0F] pt-12 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top row: logo + columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="Famly" className="h-5 object-contain opacity-80 hover:opacity-100 transition-opacity mb-3" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The shared operating system for Filipino families.
              </p>
            </div>

            {/* Product */}
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Product</p>
              <ul className="space-y-2">
                {[
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'Features', href: '#features' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'FAQ', href: '#faq' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-slate-400 hover:text-slate-200 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Company</p>
              <ul className="space-y-2">
                {[
                  { label: 'About', href: '#' },
                  { label: 'GitHub', href: 'https://github.com/JustineSalinas/famly-app', external: true },
                  { label: 'Changelog', href: '#' },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Contact</p>
              <ul className="space-y-2">
                {[
                  { label: 'Facebook', href: '#' },
                  { label: 'Instagram', href: '#' },
                  { label: 'Email Us', href: 'mailto:hello@famly.app' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-slate-400 hover:text-blue-400 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Legal</p>
              <ul className="space-y-2">
                {[
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-slate-400 hover:text-slate-200 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-slate-800/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-600">
              © 2026 Famly. Secure financial management for your family.
            </p>
            <p className="text-[11px] text-slate-700">
              Payments powered by <span className="text-slate-500 font-semibold">PayMongo</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
