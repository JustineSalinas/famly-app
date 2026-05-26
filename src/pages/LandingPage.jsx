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
  Code
} from 'lucide-react'
import '../landing.css'

export default function LandingPage({ onGetStarted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      <header className="sticky top-0 z-40 bg-[#090A0F]/80 backdrop-blur-md border-b border-slate-800/40 min-h-[56px] flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo - Simple text, no AI images */}
          <div className="flex items-center">
            <img src={logo} alt="Famly" className="h-6 object-contain" />
          </div>

          {/* Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-200 transition-colors">How It Works</a>
            <a href="#tech-stack" className="hover:text-slate-200 transition-colors">Tech Stack</a>
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
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
            <a href="#tech-stack" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-200 transition-colors">Tech Stack</a>
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

        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-400 mt-6 leading-relaxed max-w-lg">
          Track school tuition fees, active family loans, and milestone timelines together. 
          Give scholars and parents customized dashboards under one secure ledger.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => onGetStarted('register')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all active:scale-95 duration-75 shadow-lg shadow-blue-900/20 border border-blue-500/10 flex items-center gap-1.5"
          >
            Start Free Sandbox
            <ArrowUpRight size={14} />
          </button>
          <a
            href="#features"
            className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-lg border border-slate-700/60 transition-all active:scale-95 duration-75"
          >
            See Features
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

      {/* ─── Features Grid Section ────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/40 relative z-10">
        <div className="text-center max-w-lg mx-auto mb-16">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Features</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Everything your family needs,<br />nothing you don't.
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Ditch complex spreadsheets. Famly structures school tuition schedules, active loans, and graduation timelines cleanly.
          </p>
        </div>

        {/* Feature Cards Grid (Shadcn Minimalist Concept) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Tuition Tracker', desc: 'Track term installments, paid totals, and overdue balances for all scholars.', icon: BookOpen },
            { title: 'Milestone Board', desc: 'Add achievements, thesis defense updates, and graduation goals in one timeline.', icon: Target },
            { title: 'Debt Ledger', desc: 'Monitor active structural loans, lenders, interest, and payoff history in one ledger.', icon: CreditCard },
            { title: 'Shared Profiles', desc: 'Customized dashboard views for students and parents under a secure family root.', icon: Users }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-[#0C0D0F] border border-slate-800/60 rounded-xl p-5 hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <Icon size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── How It Works Section ───────────────────────────────────── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/40 relative z-10 bg-[#0C0D0F]/30">
        <div className="text-center max-w-lg mx-auto mb-16">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Process</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Up and running in 5 minutes
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Four simple steps to centralize and share your family's financial roadmap.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'Register secure account', desc: 'Create your master account. All family data is encrypted and tied to your user ID.' },
            { num: '02', title: 'Add family member profiles', desc: 'Set up profiles for scholars and parents. Assign emojis, gradients, and access roles.' },
            { num: '03', title: 'Populate ledgers', desc: 'Log tuition fees, pending schedules, outstanding debt limits, and milestone goals.' },
            { num: '04', title: 'Track in real-time', desc: 'Sign in across multiple devices. Keep everyone aligned on payments and key goals.' }
          ].map((step, idx) => (
            <div key={idx} className="bg-[#0C0D0F] border border-slate-800/60 rounded-xl p-5 relative overflow-hidden shadow-sm">
              <span className="absolute top-2.5 right-4 text-4xl font-extrabold text-slate-800/30 font-mono select-none">{step.num}</span>
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest">Step {step.num}</h3>
              <h4 className="text-sm font-bold text-slate-200 mt-3">{step.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Tech Stack Section ──────────────────────────────────────── */}
      <section id="tech-stack" className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/40 relative z-10">
        <div className="text-center max-w-lg mx-auto mb-12">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Tech Stack</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Powered by industry-grade tech
          </h2>
        </div>

        {/* Tech Stack items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'React 18', type: 'Frontend Engine', desc: 'State-driven UI' },
            { title: 'Tailwind CSS v4', type: 'Design System', desc: 'Modern styling framework' },
            { title: 'Firebase Auth', type: 'Security Gateway', desc: 'Secure client credentialing' },
            { title: 'Cloud Firestore', type: 'Database Ledger', desc: 'Real-time syncing' }
          ].map((tech, idx) => (
            <div key={idx} className="bg-[#0C0D0F] border border-slate-800/60 rounded-xl p-4 text-center space-y-1 hover:border-slate-700 transition-colors shadow-sm">
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wide">{tech.type}</p>
              <p className="text-sm font-bold text-slate-200">{tech.title}</p>
              <p className="text-[10px] text-slate-500">{tech.desc}</p>
            </div>
          ))}
        </div>
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

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/40 bg-[#0C0D0F] py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={logo} alt="Famly" className="h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            © {new Date().getFullYear()} Famly. Built with ❤️ for Filipino families.
          </p>
        </div>
      </footer>
    </div>
  )
}
