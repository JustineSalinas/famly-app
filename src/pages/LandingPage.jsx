// src/pages/LandingPage.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  PiggyBank
} from 'lucide-react'
import '../landing.css'
import ScrollStorySection from '../components/ui/ScrollStorySection'
import FeatureScrollReveal from '../components/ui/FeatureScrollReveal'
import DashboardScrollPreview from '../components/ui/DashboardScrollPreview'
import HowItWorksFlow from '../components/ui/HowItWorksFlow'
import ProblemSolutionResult from '../components/ui/ProblemSolutionResult'

export default function LandingPage({ onGetStarted, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('PHP') // 'PHP' | 'USD'
  const [openFaq, setOpenFaq] = useState(null) // index of open FAQ item
  const [ctaEmail, setCtaEmail] = useState('')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 5
    const rotateY = (x / (rect.width / 2)) * 5
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

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

      {/* ─── Hero Section with 3D Scroll Story ───────────────────────── */}
      <ScrollStorySection currency={currency} onGetStarted={onGetStarted} user={user} />

      {/* ─── Problem, Solution, & Result Section (BSP Data) ─────────── */}
      <ProblemSolutionResult />

      {/* ─── Features / Value Props Section with 3D Cascade ──────── */}
      <FeatureScrollReveal />

      {/* ─── Live Laptop Simulator / Workspace Preview ────────────── */}
      <DashboardScrollPreview />

      {/* ─── How It Works Section with 3D Scroll Flow ─────────────────── */}
      <HowItWorksFlow />


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
          ].map((plan) => {
            const cardContent = (
              <div
                id={plan.id}
                className={`relative flex flex-col bg-[#0C0D0F] rounded-2xl p-6 transition-all duration-200 shadow-sm h-full flex-1 ${
                  plan.featured
                    ? 'border border-transparent'
                    : 'border border-slate-800/60 hover:border-slate-700 hover:shadow-xl'
                }`}
              >
                {/* Recommended badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full shadow-lg shadow-emerald-900/30 uppercase tracking-wide">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Tier label */}
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${
                  plan.featured ? 'text-emerald-400' : 'text-slate-500'
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
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/10 glow-button-emerald'
                      : plan.tier === 'STARTER'
                        ? 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/10 glow-button-blue'
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
            )

            if (plan.featured) {
              return (
                <div key={plan.id} className="circulating-border-wrapper shadow-xl shadow-emerald-950/10 hover:scale-[1.01] transition-transform duration-200">
                  <div className="circulating-border-card">
                    {cardContent}
                  </div>
                </div>
              )
            }

            return (
              <div key={plan.id} className="hover:scale-[1.01] transition-transform duration-200" id={plan.id}>
                {cardContent}
              </div>
            )
          })}
        </div>

        {/* PayMongo footnote */}
        <p className="text-center text-[11px] text-slate-600 mt-8">
          Paid plans are processed securely via <span className="text-slate-500 font-semibold">PayMongo</span> — accepting GCash, Maya, credit/debit cards, and bank transfers.
        </p>
      </section>

      {/* ─── CTA Banner ─────────────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 z-10">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.12) 40%, rgba(9, 10, 15, 1) 100%)'
          }}
          className="border border-indigo-500/20 rounded-[32px] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl shadow-indigo-950/20 flex flex-col items-center justify-center backdrop-blur-sm"
        >
          
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
          <svg className="absolute top-0 right-0 w-64 h-full opacity-35 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="100,0 40,0 100,100" fill="#16181D" />
          </svg>

          <div className="relative z-10 max-w-xl flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Take Full Control of Your Family's Financial Future Starting Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed max-w-md">
              Start taking charge of your finances, eliminating debt backlogs, and hitting savings milestones.
            </p>
            
            {user ? (
              <button
                onClick={() => onGetStarted('app')}
                className="mt-8 px-6 py-3 bg-white hover:bg-slate-100 text-black text-sm font-bold rounded-xl transition-all active:scale-95 duration-75 shadow-lg shadow-white/5 cursor-pointer"
              >
                Enter Workspace
              </button>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onGetStarted('register', 'STARTER', ctaEmail)
                }}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
              >
                <input
                  type="email"
                  required
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  placeholder="Enter your family's email..."
                  className="w-full sm:flex-1 bg-[#090A0F]/90 border border-slate-800/80 focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-black text-sm font-bold rounded-xl transition-all active:scale-95 duration-75 shadow-lg shadow-white/5 cursor-pointer whitespace-nowrap"
                >
                  Get Started
                </button>
              </form>
            )}
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
                className={`py-4 first:pt-2 last:pb-2 transition-all duration-200 hover:bg-slate-900/40 rounded-xl px-4 -mx-4 ${
                  openFaq === i ? 'bg-slate-900/30 border-l-2 border-blue-500 pl-3.5' : 'border-l-2 border-transparent'
                }`}
              >
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-2 text-slate-200 cursor-pointer transition-colors duration-200 group"
                >
                  <span className="text-sm sm:text-base font-bold transition-colors group-hover:text-blue-400">{item.q}</span>
                  <span className="text-lg text-slate-500 font-medium ml-4 shrink-0 select-none transition-colors group-hover:text-blue-400">
                    {openFaq === i ? '×' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-2 text-xs sm:text-sm text-slate-400 leading-relaxed pl-1">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Contact Box Card (Right Column - 4 Cols) */}
          <div className="lg:col-span-4 bg-[#16181D]/80 rounded-2xl p-8 text-center text-slate-200 shadow-2xl border border-white/5 h-full flex flex-col justify-between relative overflow-hidden group backdrop-blur-md">
            {/* Subtle decorative mesh background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
            
            {/* Top section: Support Badge & Title */}
            <div className="space-y-4 pt-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 text-slate-350 text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Support Online
              </div>
              
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight px-2">
                Don't see the answer you need?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold max-w-xs mx-auto">
                No worries! Our team is ready to help your household clear debts and manage tuition issues.
              </p>
            </div>

            {/* Middle section: Creative Interactive Helplist */}
            <div className="my-8 py-6 border-t border-b border-white/5 space-y-4 relative z-10">
              <div className="flex items-center gap-3 text-left bg-[#0C0D10]/60 p-3 rounded-xl border border-white/5 transition-all hover:scale-[1.02] hover:border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  📧
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Direct Email Support</div>
                  <div className="text-[10px] text-slate-500">hello@famly.app</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left bg-[#0C0D10]/60 p-3 rounded-xl border border-white/5 transition-all hover:scale-[1.02] hover:border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Average Response Time</div>
                  <div className="text-[10px] text-slate-500">Under 15 minutes</div>
                </div>
              </div>
            </div>

            {/* Bottom section: CTA button */}
            <div className="pb-4 relative z-10">
              <a
                href="mailto:hello@famly.app"
                className="inline-block w-full bg-white hover:bg-slate-100 text-black text-xs font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-white/5 text-center"
              >
                Contact us
              </a>
              <p className="text-[9px] text-slate-500 mt-2 font-medium">
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
