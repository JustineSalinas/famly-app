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
import AnimatedTextCycle from '../components/ui/AnimatedTextCycle'
import FamlyFeatures from '../components/ui/FamlyFeatures'

export default function LandingPage({ onGetStarted, user, onLogout }) {
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
            {user ? (
              <>
                <span className="text-xs text-slate-400 font-medium mr-2">
                  Signed in as <strong className="text-slate-200">{user.displayName || user.email}</strong> ({user.plan})
                </span>
                <button
                  onClick={() => onGetStarted('app')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 duration-75 shadow-md shadow-blue-900/10 border border-blue-500/10 flex items-center gap-1 cursor-pointer"
                >
                  Enter Workspace
                  <ArrowUpRight size={13} />
                </button>
                <button
                  onClick={onLogout}
                  className="px-3.5 py-1.5 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-800/30 transition-all active:scale-95 duration-75 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onGetStarted('login')}
                  className="px-3.5 py-1.5 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-800/30 transition-all active:scale-95 duration-75"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onGetStarted('register', 'STARTER')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 duration-75 shadow-md shadow-blue-900/10 border border-blue-500/10 flex items-center gap-1"
                >
                  Start Free
                  <ArrowUpRight size={13} />
                </button>
              </>
            )}
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
          {user ? (
            <div className="flex flex-col gap-2 w-full">
              <div className="text-xs text-slate-400 text-center mb-1">
                Signed in as <strong className="text-slate-200">{user.displayName || user.email}</strong> ({user.plan})
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onGetStarted('app')
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 duration-75 text-center shadow-sm cursor-pointer"
              >
                Enter Workspace
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onLogout()
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-255 text-xs font-semibold rounded-lg transition-all active:scale-95 duration-75 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
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
                  onGetStarted('register', 'STARTER')
                }}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 duration-75 text-center shadow-sm"
              >
                Start Free
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── Hero Section ───────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 lg:pt-28 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Brand & Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Intro Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            ✨ Netflix-Style Family Sync
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1] max-w-2xl">
            One place for <br className="hidden sm:inline" />
            <AnimatedTextCycle 
              words={[
                "every family goal.",
                "conquering debt.",
                "syncing tuition.",
                "savings milestones.",
                "financial peace."
              ]}
              interval={3000}
              className="lp-gradient-text" 
            />
          </h1>

          {/* Sub-headline */}
          <p className="text-sm md:text-base text-slate-400 mt-6 leading-relaxed max-w-xl">
            The shared operating system for Filipino families to conquer multi-creditor debts, manage tuition backlogs, and hit massive saving milestones—all from a single, beautiful dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8 w-full">
            {user ? (
              <button
                onClick={() => onGetStarted('app')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95 duration-75 shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                Enter Workspace
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => onGetStarted('register', 'STARTER')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95 duration-75 shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                Start Free Sandbox
                <ArrowUpRight size={14} />
              </button>
            )}
            <a
              href="#how-it-works"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-950 text-sm font-bold rounded-xl transition-all active:scale-95 duration-75 shadow-lg flex items-center gap-1.5"
            >
              See how it works
              <ChevronRight size={14} />
            </a>
            <a
              href="https://github.com/JustineSalinas/famly-app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-slate-100 text-sm font-semibold rounded-xl border border-slate-800 transition-all active:scale-95 duration-75 flex items-center gap-1.5"
            >
              <GitBranch size={14} />
              View GitHub Repo
            </a>
          </div>
        </div>

        {/* Right Column: Phone Preview Mockup Section */}
        <div className="lg:col-span-5 flex justify-center w-full mt-8 lg:mt-0 relative">
          <div className="phone-mockup-wrapper">
            
            {/* Floating Card 1: On Saves */}
            <div className="lp-floating-card card-on-saves">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">On Saves</span>
              </div>
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                {currency === 'PHP' ? '₱104,002.22' : '$10,400.22'}
              </span>
            </div>

            {/* Floating Card 2: Total Expends */}
            <div className="lp-floating-card card-total-expends">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded bg-rose-500/10 flex items-center justify-center">
                  <CreditCard size={10} className="text-rose-500" />
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Expends</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                {currency === 'PHP' ? '₱6,590.00' : '$659.00'}
              </div>
              <div className="text-[9px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
                <span>↗</span>
                <span>5.23% vs last month</span>
              </div>
            </div>

            {/* Floating Card 3: Cash Available */}
            <div className="lp-floating-card card-cash-available">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded bg-emerald-500/10 flex items-center justify-center">
                  <PiggyBank size={10} className="text-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cash Available</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                {currency === 'PHP' ? '₱5,460.00' : '$546.00'}
              </div>
              <div className="text-[9px] font-semibold text-rose-500 flex items-center gap-0.5 mt-1">
                <span>↘</span>
                <span>5.23% vs last month</span>
              </div>
            </div>

            {/* Phone Bezel Container */}
            <div className="animate-phone-float">
              <div className="phone-bezel">
                <div className="phone-dynamic-island" />
                
                {/* Screen Wrapper */}
                <div className="phone-screen">
                  
                  {/* Status Bar */}
                  <div className="phone-status-bar flex justify-between items-center text-slate-800 px-5 pt-1.5 pb-1">
                    <span className="text-[10px] font-bold tracking-tight text-slate-900">9:41</span>
                    <div className="flex items-center gap-1.5 text-slate-900">
                      {/* Signal */}
                      <svg className="w-3 h-2.5" viewBox="0 0 18 12" fill="currentColor">
                        <rect x="0" y="9" width="2" height="3" rx="0.5" />
                        <rect x="3.5" y="7" width="2" height="5" rx="0.5" />
                        <rect x="7" y="4" width="2" height="8" rx="0.5" />
                        <rect x="10.5" y="2" width="2" height="10" rx="0.5" />
                        <rect x="14" y="0" width="2" height="12" rx="0.5" />
                      </svg>
                      {/* Wifi */}
                      <svg className="w-3 h-2.5" viewBox="0 0 16 12" fill="currentColor">
                        <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.2-4.2a6 6 0 0 1 8.4 0l-1.4 1.4a4 4 0 0 0-5.6 0l-1.4-1.4zm-2.8-2.8a10 10 0 0 1 14 0l-1.4 1.4a8 8 0 0 0-11.2 0l-1.4-1.4z" />
                      </svg>
                      {/* Battery */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-5 h-2.5 border border-slate-900 rounded-[3px] p-[1px] flex items-center">
                          <div className="bg-slate-900 h-full w-full rounded-[1px]" />
                        </div>
                        <div className="w-[1px] h-0.75 bg-slate-900 rounded-r-xs" />
                      </div>
                    </div>
                  </div>

                  {/* App Screen Content: Debt Dashboard Account */}
                  <div className="flex-1 flex flex-col pt-3 px-3">
                    
                    {/* App Small Title */}
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-left">
                      Total Debt Remaining
                    </div>

                    {/* App Balance Value */}
                    <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5 text-left">
                      {currency === 'PHP' ? '₱375,400' : '$37,540'}
                    </div>

                    {/* App Tabs Selection */}
                    <div className="flex gap-1.5 mt-3 bg-slate-200/50 p-1 rounded-xl">
                      <button className="flex-1 py-1 px-2.5 bg-slate-900 text-white rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm">
                        <CreditCard size={10} />
                        Active Ledger
                      </button>
                      <button className="flex-1 py-1 px-2.5 text-slate-600 rounded-lg text-[9px] font-bold flex items-center justify-center">
                        Add Record
                      </button>
                    </div>

                    {/* Summary row */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5">
                      <div className="bg-white border border-slate-100 rounded-xl p-2 text-left shadow-xs">
                        <span className="text-[8px] font-semibold text-slate-400 block uppercase">Monthly Due</span>
                        <span className="text-[11px] font-bold text-slate-800 mt-0.5 block">
                          {currency === 'PHP' ? '₱16,400' : '$1,640'}
                        </span>
                      </div>
                      <div className="bg-white border border-slate-100 rounded-xl p-2 text-left shadow-xs">
                        <span className="text-[8px] font-semibold text-slate-400 block uppercase">Overdue</span>
                        <span className="text-[11px] font-bold text-rose-500 mt-0.5 block flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                          1 Account
                        </span>
                      </div>
                    </div>

                    {/* Active Creditors Obligations */}
                    <div className="mt-4.5 space-y-3 text-left flex-1">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Active Obligations
                      </div>
                      
                      {[
                        { name: 'BDO Housing Loan', type: 'Mortgage • 7.5%', amount: currency === 'PHP' ? '₱312,000' : '$31,200', status: 'CURRENT', statusColor: 'bg-emerald-100 text-emerald-700' },
                        { name: 'SSS Calamity Loan', type: 'Govt Loan • 10%', amount: currency === 'PHP' ? '₱18,400' : '$1,840', status: 'OVERDUE', statusColor: 'bg-rose-100 text-rose-600 animate-pulse' },
                        { name: 'PAGIBIG MP2 Deposit', type: 'Savings Goal', amount: currency === 'PHP' ? '₱45,000' : '$4,500', status: 'CURRENT', statusColor: 'bg-emerald-100 text-emerald-700' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start border-b border-slate-100/60 pb-1">
                          <div>
                            <div className="text-[10px] font-bold text-slate-800 leading-none">{item.name}</div>
                            <div className="text-[8px] font-medium text-slate-400 mt-0.5">{item.type}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-slate-900 leading-none">{item.amount}</div>
                            <span className={`inline-block px-1 py-0.2 rounded-[3px] text-[6.5px] font-bold mt-0.5 ${item.statusColor}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Simple Bottom Bar Indicator & Profile image mock */}
                    <div className="mt-auto pb-2 pt-3 border-t border-slate-100 flex items-center justify-between text-left">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px]">
                          👩
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-slate-800 leading-none">Mom</div>
                          <div className="text-[8px] font-medium text-slate-400 mt-0.5">info@howardella.au</div>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 glow-green" />
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Features / Value Props Section ──────────────────────── */}
      <FamlyFeatures />

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
                onClick={() => {
                  if (user) {
                    onGetStarted('app')
                  } else {
                    onGetStarted(plan.ctaAction, plan.tier)
                  }
                }}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 duration-75 mb-6 cursor-pointer ${
                  plan.featured
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border border-blue-500/10'
                    : 'bg-[#16181D] hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                }`}
              >
                {user ? (user.plan === plan.tier ? 'Current Plan — Enter Workspace' : 'Enter Workspace') : plan.cta}
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
        <div className="bg-black border border-slate-900 rounded-[32px] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl flex flex-col items-center justify-center">
          
          {/* Spiral/Flower Wireframe Backdrop (Left) */}
          <svg className="absolute bottom-[-15%] left-[-8%] w-56 h-56 opacity-25 pointer-events-none" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="wireframe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {[...Array(36)].map((_, i) => {
              const rx = 85;
              const ry = 28;
              return (
                <ellipse
                  key={i}
                  cx="100"
                  cy="100"
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke="url(#wireframe-grad)"
                  strokeWidth="0.5"
                  transform={`rotate(${i * 10} 100 100)`}
                />
              );
            })}
          </svg>

          {/* Overlapping Triangle Backdrop (Right) */}
          <svg className="absolute top-0 right-0 w-64 h-full opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="100,0 40,0 100,100" fill="#16181D" />
          </svg>

          <div className="relative z-10 max-w-xl flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Take Full Control of Your Family's Financial Future Starting Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed max-w-md">
              Start taking charge of your finances, eliminating debt backlogs, and hitting savings milestones.
            </p>
            <button
              onClick={() => onGetStarted(user ? 'app' : 'register')}
              className="mt-8 px-6 py-3 bg-white hover:bg-slate-100 text-black text-sm font-bold rounded-xl transition-all active:scale-95 duration-75 shadow-lg shadow-white/5 cursor-pointer"
            >
              {user ? 'Enter Workspace' : 'Get Started'}
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────────── */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
        
        {/* FAQ Header matching the layout format */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-3 font-semibold">
            These are the questions we hear more often.
          </p>
        </div>

        {/* 2-Column split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* FAQ Accordions (Left Column - 8 Cols) */}
          <div className="lg:col-span-8 divide-y divide-slate-800/60 border-t border-b border-slate-800/60 text-left">
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
                className="py-4 first:pt-2 last:pb-2"
              >
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-2 text-slate-200 hover:text-white transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold">{item.q}</span>
                  <span className="text-lg text-slate-500 font-medium ml-4 shrink-0 select-none">
                    {openFaq === i ? '×' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pt-2 pb-2 text-xs sm:text-sm text-slate-400 leading-relaxed transition-all">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Box Card (Right Column - 4 Cols) */}
          <div className="lg:col-span-4 bg-[#F8FAFC] rounded-2xl p-8 text-center text-slate-900 shadow-xl border border-slate-200 h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle decorative mesh background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
            
            {/* Top section: Support Badge & Title */}
            <div className="space-y-4 pt-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Support Online
              </div>
              
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-tight px-2">
                Don't see the answer you need?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold max-w-xs mx-auto">
                No worries! Our team is ready to help your household clear debts and manage tuition issues.
              </p>
            </div>

            {/* Middle section: Creative Interactive Helplist */}
            <div className="my-8 py-6 border-t border-b border-slate-200/80 space-y-4 relative z-10">
              <div className="flex items-center gap-3 text-left bg-white p-3 rounded-xl shadow-xs border border-slate-100 transition-all hover:scale-[1.02]">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  📧
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Direct Email Support</div>
                  <div className="text-[10px] text-slate-500">hello@famly.app</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left bg-white p-3 rounded-xl shadow-xs border border-slate-100 transition-all hover:scale-[1.02]">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Average Response Time</div>
                  <div className="text-[10px] text-slate-500">Under 15 minutes</div>
                </div>
              </div>
            </div>

            {/* Bottom section: CTA button */}
            <div className="pb-4 relative z-10">
              <a
                href="mailto:hello@famly.app"
                className="inline-block w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-sm text-center"
              >
                Contact us
              </a>
              <p className="text-[9px] text-slate-400 mt-2 font-medium">
                GCash, PayMongo &amp; Setup inquiries handled priority
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/40 bg-[#0C0D0F] pt-12 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top row: logo + columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1 mb-3 -ml-2.5">
                <img src={logo} alt="Famly" className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
                <span className="text-xl font-bold tracking-tight text-slate-100 -ml-1">Famly</span>
              </div>
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
