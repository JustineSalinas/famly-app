// src/pages/LandingPage.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import logo from '../assets/famly.png'
import {
  BookOpen,
  CreditCard,
  Target,
  Users,
  User,
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
  Mail,
  Zap,
  MessageSquare
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
  const [navScrolled, setNavScrolled] = useState(false)

  // Global page reading-progress (drives the thin top bar)
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Elevate the navbar once the user scrolls past the hero fold
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <div className="min-h-screen bg-[#090A0F] text-slate-100 font-sans-inter overflow-x-clip lp-scrollbar relative">
      {/* Subtle film-grain texture for a premium, band-free finish */}
      <div className="lp-grain" aria-hidden="true" />

      {/* Top reading-progress bar */}
      <motion.div className="lp-progress-bar" style={{ scaleX: progressScaleX }} aria-hidden="true" />

      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] lp-radial-glow pointer-events-none z-0" />

      {/* ─── Header / Navbar ────────────────────────────────────────── */}
      <header className={`sticky top-0 z-40 bg-[#090A0F]/90 backdrop-blur-md border-b border-slate-800/40 transition-all duration-300 ${navScrolled ? 'lp-nav-scrolled backdrop-blur-xl' : ''}`}>
        <div className="max-w-6xl mx-auto w-full px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-1">
            <img src={logo} alt="Famly" className="h-7 w-auto object-contain" />
            <span className="text-[15px] font-bold tracking-tight text-slate-200">Famly</span>
          </div>

          {/* Nav links (desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-xs text-slate-400 font-semibold md:flex-1 tracking-wide">
            <a href="#features" className="hover:text-slate-200 transition-colors duration-150">Features</a>
            <a href="#how-it-works" className="hover:text-slate-200 transition-colors duration-150">How It Works</a>
            <a href="#pricing" className="hover:text-slate-200 transition-colors duration-150">Pricing</a>
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-2.5 flex-1">
            {user ? (
              <>
                <span className="text-xs text-slate-500 font-medium mr-1 truncate max-w-[160px]">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={() => onGetStarted('app')}
                  className="lp-cta-primary px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg active:scale-95 shadow-md shadow-blue-900/10 border border-blue-500/10 flex items-center gap-1 cursor-pointer transition-colors duration-150"
                >
                  Enter Workspace
                  <ArrowUpRight size={12} />
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-800/40 transition-all active:scale-95 duration-75 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onGetStarted('login')}
                  className="px-3 py-1.5 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-800/40 transition-all active:scale-95 duration-75"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onGetStarted('register', 'STARTER')}
                  className="lp-cta-primary px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg active:scale-95 shadow-md shadow-blue-900/10 border border-blue-500/10 flex items-center gap-1 transition-colors duration-150"
                >
                  Start Free
                  <ArrowUpRight size={12} />
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-900/80 border border-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors active:scale-95 duration-75"
          >
            {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
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
                <div key={plan.id} className="relative hover:scale-[1.01] transition-transform duration-200 mt-3 md:mt-0">
                  {/* Recommended badge — sits outside the clipping border wrapper so it never gets cut off */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40">
                    <span className="px-3.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow-lg shadow-emerald-900/40 uppercase tracking-wide ring-1 ring-emerald-300/30">
                      Recommended
                    </span>
                  </div>
                  <div className="circulating-border-wrapper shadow-xl shadow-emerald-950/10">
                    <div className="circulating-border-card">
                      {cardContent}
                    </div>
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
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="bg-[#0B0D12] border border-emerald-400/20 rounded-[32px] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-emerald-950/30 flex flex-col items-center justify-center"
        >
          {/* On-brand layered gradient wash */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{ background: 'radial-gradient(120% 130% at 50% 0%, rgba(16,185,129,0.20) 0%, rgba(6,182,212,0.12) 32%, rgba(11,13,18,1) 68%)' }}
          />

          {/* Aurora glow orbs */}
          <div className="absolute -top-24 left-1/4 -translate-x-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 right-1/4 translate-x-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Subtle dotted grid, faded toward the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px] opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

          <div className="relative z-10 max-w-xl flex flex-col items-center">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-semibold mb-6">
              <Sparkles size={12} />
              Your family's financial OS
            </div>

            <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-white tracking-tight leading-[1.12]">
              Take full control of your family's<br className="hidden sm:inline" />{' '}
              <span className="lp-gradient-text">financial future</span>, starting today.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed max-w-md">
              Charge ahead on your finances, eliminate debt backlogs, and hit savings milestones—together, in one shared workspace.
            </p>

            {user ? (
              <button
                onClick={() => onGetStarted('app')}
                className="lp-cta-primary mt-8 px-7 py-3 bg-white hover:bg-slate-100 text-black text-sm font-bold rounded-xl active:scale-95 shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                Enter Workspace
              </button>
            ) : (
              <>
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
                    className="w-full sm:flex-1 bg-[#090A0F]/80 border border-white/10 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/15 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="lp-cta-primary w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold rounded-xl active:scale-95 shadow-lg shadow-emerald-900/30 cursor-pointer whitespace-nowrap"
                  >
                    Get Started
                  </button>
                </form>
                {/* Trust line */}
                <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> No credit card required</span>
                  <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Free forever plan</span>
                </div>
              </>
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
                a: 'When you log in, you\'ll see your personalized member profile. Each family member has their own role-based dashboard—Kuya sees his Tuition Tracker, Mom sees the Debt Ledger, and Ate sees her Savings Milestones. Everyone stays focused on what matters to them.'
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
          <div className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-[#13141A] to-[#0E0F14] p-7 text-left text-slate-200 shadow-2xl h-full flex flex-col">
            {/* Ambient glow — neutral blue, subtle */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top: live status + agent avatars */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                {/* Keep green dot — it's a universal "live" signal */}
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Support Online
                </span>
                {/* Shadcn-style minimal user avatars */}
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center ring-2 ring-[#0E0F14]">
                      <User size={13} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                <MessageSquare size={21} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-4 leading-snug">
                Still have questions?
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Our team replies fast and helps your household clear debts and manage tuition—no judgment, just answers.
              </p>
            </div>

            {/* Middle: contact rows */}
            <div className="relative z-10 mt-6 space-y-2.5">
              <a
                href="mailto:hello@famly.app"
                className="group flex items-center gap-3 p-3 rounded-xl bg-[#0C0D10]/70 border border-white/5 hover:border-blue-500/20 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-200">Direct email support</div>
                  <div className="text-[10px] text-slate-500">hello@famly.app</div>
                </div>
                <ChevronRight size={15} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0C0D10]/70 border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-slate-400 shrink-0">
                  <Zap size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-200">Average response time</div>
                  <div className="text-[10px] text-slate-500">Under 15 minutes</div>
                </div>
              </div>
            </div>

            {/* Bottom: CTA */}
            <div className="relative z-10 mt-auto pt-6">
              <a
                href="mailto:hello@famly.app"
                className="lp-cta-primary flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 rounded-xl active:scale-95 shadow-lg shadow-blue-900/20 cursor-pointer transition-colors duration-150"
              >
                <MessageSquare size={15} />
                Contact us
              </a>
              <p className="text-[10px] text-slate-500 mt-2.5 text-center">
                GCash, PayMongo &amp; setup inquiries handled priority
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
