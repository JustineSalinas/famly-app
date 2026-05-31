import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ChevronRight,
  GraduationCap
} from 'lucide-react'
import AnimatedTextCycle from './AnimatedTextCycle'

export default function ScrollStorySection({ currency, onGetStarted, user }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Use the simplified static layout for small screens OR when the user
  // prefers reduced motion (accessibility-first, avoids scroll-jacking).
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const check = () => {
      setIsMobile(window.innerWidth < 1024 || reduceMotion.matches)
    }
    check()
    window.addEventListener('resize', check)
    reduceMotion.addEventListener('change', check)
    return () => {
      window.removeEventListener('resize', check)
      reduceMotion.removeEventListener('change', check)
    }
  }, [])

  // Hook into scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Raw scroll progress (no spring) keeps the animation locked 1:1 to scroll
  const smoothProgress = scrollYProgress

  // iPhone inner screen scroll — pans through the 3 dashboard panels
  const phoneScreenY = useTransform(smoothProgress, [0.50, 0.95], [0, -904])

  // ────────────────────────────────────────────────────────
  // SCROLL STORY MAPS (smoothProgress [0 -> 1])
  // ────────────────────────────────────────────────────────

  // Hero text column: fades & blurs out as we zoom into the phone
  const textOpacity = useTransform(smoothProgress, [0, 0.24, 0.36], [1, 1, 0])
  const textFilter = useTransform(smoothProgress, [0.22, 0.36], ["blur(0px)", "blur(10px)"])
  const textX = useTransform(smoothProgress, [0, 0.24, 0.36], ["0%", "0%", "-22%"])
  const textScale = useTransform(smoothProgress, [0, 0.24, 0.36], [1, 1, 0.96])

  // iPhone body: tilts up, settles flat, then zooms in toward center and holds
  const phoneRotateX = useTransform(smoothProgress, [0, 0.16, 0.40], [12, 0, 0])
  const phoneRotateY = useTransform(smoothProgress, [0, 0.16, 0.40], [-10, 0, 0])
  const phoneScale = useTransform(smoothProgress, [0, 0.16, 0.44], [0.98, 1.05, 1.5])
  const phoneX = useTransform(smoothProgress, [0, 0.30, 0.44], ["0%", "0%", "-36%"])
  const phoneY = useTransform(smoothProgress, [0, 0.16], [70, 0])

  // iPhone floating badges: reveal then tuck away before the zoom
  const floatCard1X = useTransform(smoothProgress, [0.16, 0.28], ["100px", "0px"])
  const floatCard1Opacity = useTransform(smoothProgress, [0.16, 0.21, 0.32, 0.40], [0, 1, 1, 0])

  const floatCard2X = useTransform(smoothProgress, [0.17, 0.29], ["-100px", "0px"])
  const floatCard2Opacity = useTransform(smoothProgress, [0.17, 0.22, 0.32, 0.40], [0, 1, 1, 0])

  const floatCard3X = useTransform(smoothProgress, [0.18, 0.30], ["-80px", "0px"])
  const floatCard3Y = useTransform(smoothProgress, [0.18, 0.30], ["70px", "0px"])
  const floatCard3Opacity = useTransform(smoothProgress, [0.18, 0.24, 0.32, 0.40], [0, 1, 1, 0])

  // Ambient radial blue glow adjustments - smoother progression
  const glowScale = useTransform(smoothProgress, [0, 0.32, 0.50], [1, 1.15, 1.3])
  const glowOpacity = useTransform(smoothProgress, [0, 0.32, 0.50], [0.25, 0.5, 0.6])

  // If mobile, show a simplified standard layout
  if (isMobile) {
    return (
      <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-16 grid grid-cols-1 gap-12 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            Netflix-Style Family Sync
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.1] max-w-2xl">
            One place for <br />
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

          <p className="text-sm text-slate-400 mt-6 leading-relaxed max-w-lg">
            The shared operating system for Filipino families to conquer multi-creditor debts, manage tuition backlogs, and hit massive saving milestones—all from a single, beautiful dashboard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 w-full">
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
          </div>
        </motion.div>

        {/* Static phone preview for mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center w-full mt-4 relative"
        >
          <div className="phone-mockup-wrapper max-w-[270px]">
            <div className="phone-bezel !h-[586px]">
              <div className="phone-dynamic-island" />
              <div className="phone-screen bg-[#f8fafc]">
                <div className="phone-status-bar flex justify-between items-center text-slate-800 px-5 pt-1.5 pb-1">
                  <span className="text-[10px] font-bold tracking-tight text-slate-900">9:41</span>
                  <div className="flex items-center gap-1.5 text-slate-900">
                    <div className="w-5 h-2.5 border border-slate-900 rounded-[3px] p-[1px]" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col pt-3 px-3">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-left">
                    Total Debt Remaining
                  </div>
                  <div className="text-xl font-black text-slate-900 tracking-tight mt-0.5 text-left">
                    {currency === 'PHP' ? '₱375,400' : '$37,540'}
                  </div>
                  <div className="flex gap-1.5 mt-3 bg-slate-200/50 p-1 rounded-xl">
                    <button className="flex-1 py-1 px-2.5 bg-slate-900 text-white rounded-lg text-[9px] font-bold">
                      Active Ledger
                    </button>
                  </div>
                  <div className="mt-4 space-y-2 text-left flex-1">
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Obligations</div>
                    <div className="border-b border-slate-100/60 pb-1 flex justify-between">
                      <span className="text-[9px] font-bold text-slate-800">BDO Housing Loan</span>
                      <span className="text-[9px] font-bold text-slate-900">{currency === 'PHP' ? '₱312,000' : '$31,200'}</span>
                    </div>
                    <div className="border-b border-slate-100/60 pb-1 flex justify-between">
                      <span className="text-[9px] font-bold text-slate-800">SSS Calamity Loan</span>
                      <span className="text-[9px] font-rose-500 font-bold">{currency === 'PHP' ? '₱18,400' : '$1,840'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <div ref={containerRef} className="scroll-story-outer relative w-full bg-[#090A0F]">
      {/* Sticky Inner Container */}
      <div className="scroll-story-sticky w-full flex items-center justify-center">
        {/* Dynamic Background Glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] lp-radial-glow pointer-events-none z-0"
          style={{
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />

        <div className="max-w-6xl w-full mx-auto px-6 relative z-10 grid grid-cols-12 gap-8 items-center h-full max-h-[85vh]">
          
          {/* Left Column: Brand & Copy (Hero Text) */}
          <motion.div
            style={{
              opacity: textOpacity,
              x: textX,
              scale: textScale,
              filter: textFilter,
            }}
            className="col-span-7 flex flex-col items-start text-left preserve-3d"
          >
            {/* Intro Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              Netflix-Style Family Sync
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
            <div className="flex flex-wrap items-center justify-start gap-3 mt-8 w-full">
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
            </div>
          </motion.div>

          {/* Right Column: Phone and Dashboard Mockups */}
          <div className="col-span-5 flex justify-center w-full relative h-[650px] items-center">
            
            {/* ─── 3D iPhone Mockup Container ─── */}
            <motion.div
              style={{
                x: phoneX,
                y: phoneY,
                rotateX: phoneRotateX,
                rotateY: phoneRotateY,
                scale: phoneScale,
                perspective: "1200px",
                transformStyle: "preserve-3d"
              }}
              className="absolute z-20 phone-mockup-wrapper pointer-events-auto"
            >
              
              {/* Floating Card 1: On Saves */}
              <motion.div 
                style={{ x: floatCard1X, opacity: floatCard1Opacity }}
                className="lp-floating-card card-on-saves"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">On Saves</span>
                </div>
                <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                  {currency === 'PHP' ? '₱104,002.22' : '$10,400.22'}
                </span>
              </motion.div>

              {/* Floating Card 2: Total Expends */}
              <motion.div 
                style={{ x: floatCard2X, opacity: floatCard2Opacity }}
                className="lp-floating-card card-total-expends"
              >
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
              </motion.div>

              {/* Floating Card 3: Cash Available */}
              <motion.div 
                style={{ x: floatCard3X, y: floatCard3Y, opacity: floatCard3Opacity }}
                className="lp-floating-card card-cash-available"
              >
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
              </motion.div>

              {/* Phone Bezel */}
              <div className="phone-bezel">
                <div className="phone-dynamic-island" />
                
                {/* Screen Wrapper */}
                <div className="phone-screen">
                  
                  {/* Status Bar */}
                  <div className="phone-status-bar flex justify-between items-center text-slate-800 px-5 pt-1.5 pb-1">
                    <span className="text-[10px] font-bold tracking-tight text-slate-900">9:41</span>
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <svg className="w-3 h-2.5" viewBox="0 0 18 12" fill="currentColor">
                        <rect x="0" y="9" width="2" height="3" rx="0.5" />
                        <rect x="3.5" y="7" width="2" height="5" rx="0.5" />
                        <rect x="7" y="4" width="2" height="8" rx="0.5" />
                        <rect x="10.5" y="2" width="2" height="10" rx="0.5" />
                        <rect x="14" y="0" width="2" height="12" rx="0.5" />
                      </svg>
                      <svg className="w-3 h-2.5" viewBox="0 0 16 12" fill="currentColor">
                        <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.2-4.2a6 6 0 0 1 8.4 0l-1.4 1.4a4 4 0 0 0-5.6 0l-1.4-1.4zm-2.8-2.8a10 10 0 0 1 14 0l-1.4 1.4a8 8 0 0 0-11.2 0l-1.4-1.4z" />
                      </svg>
                      <div className="flex items-center gap-0.5">
                        <div className="w-5 h-2.5 border border-slate-900 rounded-[3px] p-[1px] flex items-center">
                          <div className="bg-slate-900 h-full w-full rounded-[1px]" />
                        </div>
                        <div className="w-[1px] h-0.75 bg-slate-900 rounded-r-xs" />
                      </div>
                    </div>
                  </div>

                  {/* App Screen Content: Scrollable dashboards wrapper */}
                  <div className="flex-1 overflow-hidden relative mt-2 rounded-b-[35px]">
                    <motion.div 
                      style={{ y: phoneScreenY }}
                      className="absolute inset-x-0 top-0 flex flex-col"
                    >
                      {/* ─── PANEL 1: DEBT LEDGER ─── */}
                      <div className="h-[450px] w-full flex flex-col pt-1 px-3 shrink-0 text-left select-none justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Total Debt Remaining
                          </div>

                          <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                            {currency === 'PHP' ? '₱375,400' : '$37,540'}
                          </div>

                          <div className="flex gap-1.5 mt-3 bg-slate-200/50 p-1 rounded-xl">
                            <button className="flex-1 py-1 px-2.5 bg-slate-900 text-white rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm">
                              <CreditCard size={10} />
                              Active Ledger
                            </button>
                            <button className="flex-1 py-1 px-2.5 text-slate-600 rounded-lg text-[9px] font-bold flex items-center justify-center">
                              Add Record
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-3">
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

                          <div className="mt-4 space-y-2 flex-1">
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Active Obligations
                            </div>
                            
                            {[
                              { name: 'BDO Housing Loan', type: 'Mortgage • 7.5%', amount: currency === 'PHP' ? '₱312,000' : '$31,200', status: 'CURRENT', statusColor: 'bg-emerald-100 text-emerald-700' },
                              { name: 'SSS Calamity Loan', type: 'Govt Loan • 10%', amount: currency === 'PHP' ? '₱18,400' : '$1,840', status: 'OVERDUE', statusColor: 'bg-rose-100 text-rose-600 animate-pulse' },
                              { name: 'PAGIBIG MP2 Deposit', type: 'Savings Goal', amount: currency === 'PHP' ? '₱45,000' : '$4,500', status: 'CURRENT', statusColor: 'bg-emerald-100 text-emerald-700' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex justify-between items-start border-b border-slate-100/60 pb-1">
                                <div>
                                  <div className="text-[9.5px] font-bold text-slate-800 leading-none">{item.name}</div>
                                  <div className="text-[7.5px] text-slate-400 mt-0.5">{item.type}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[9.5px] font-black text-slate-900 leading-none">{item.amount}</div>
                                  <span className={`inline-block px-1 py-0.2 rounded-[3px] text-[6px] font-bold mt-0.5 ${item.statusColor}`}>
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Static Footer inside Debt Ledger Panel */}
                        <div className="pb-3 pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[9px]">👩</div>
                            <div>
                              <div className="text-[8px] font-bold text-slate-800 leading-none">Mom</div>
                              <div className="text-[7px] text-slate-400 mt-0.5 leading-none">Admin</div>
                            </div>
                          </div>
                          <span className="text-[7px] font-semibold text-slate-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                            Synced
                          </span>
                        </div>
                      </div>

                      {/* ─── PANEL 2: TUITION TRACKER ─── */}
                      <div className="h-[450px] w-full flex flex-col pt-1 px-3 shrink-0 text-left select-none justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Tuition Assessments
                          </div>

                          <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                            {currency === 'PHP' ? '₱55,900' : '$5,590'}
                          </div>

                          <div className="flex gap-1.5 mt-3 bg-slate-200/50 p-1 rounded-xl">
                            <button className="flex-1 py-1 px-2.5 bg-slate-900 text-white rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm">
                              <GraduationCap size={10} />
                              Scholars Sync
                            </button>
                            <button className="flex-1 py-1 px-2.5 text-slate-600 rounded-lg text-[9px] font-bold flex items-center justify-center">
                              Add Term
                            </button>
                          </div>

                          {/* Scholar Progress bars */}
                          <div className="mt-4 space-y-3.5 flex-1">
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Active Semesters
                            </div>

                            {[
                              { name: 'Kuya — College AY 24-25', pct: 72, amt: currency === 'PHP' ? '₱35,000' : '$3,500', barColor: 'bg-amber-400' },
                              { name: 'Ate — High School AY 24-25', pct: 100, amt: currency === 'PHP' ? '₱12,500' : '$1,250', barColor: 'bg-emerald-450' },
                              { name: 'Bunso — Backlog Term', pct: 30, amt: currency === 'PHP' ? '₱8,400' : '$840', barColor: 'bg-rose-500' }
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-center text-[9.5px]">
                                  <span className="font-bold text-slate-800 truncate max-w-[170px]">{item.name}</span>
                                  <span className="font-black text-slate-900">{item.amt}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.barColor}`} style={{ width: `${item.pct}%` }} />
                                  </div>
                                  <span className="text-[8px] font-bold text-slate-500 w-7 text-right">{item.pct}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Static Footer inside Tuition Tracker Panel */}
                        <div className="pb-3 pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-[9px]">👦</div>
                            <div>
                              <div className="text-[8px] font-bold text-slate-800 leading-none">Kuya</div>
                              <div className="text-[7px] text-slate-400 mt-0.5 leading-none">Scholar</div>
                            </div>
                          </div>
                          <span className="text-[7px] font-semibold text-slate-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                            Synced
                          </span>
                        </div>
                      </div>

                      {/* ─── PANEL 3: MILESTONE TRACKER ─── */}
                      <div className="h-[450px] w-full flex flex-col pt-1 px-3 shrink-0 text-left select-none justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Savings Milestones
                          </div>

                          <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                            {currency === 'PHP' ? '₱104,002' : '$10,400'}
                          </div>

                          <div className="flex gap-1.5 mt-3 bg-slate-200/50 p-1 rounded-xl">
                            <button className="flex-1 py-1 px-2.5 bg-slate-900 text-white rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm">
                              <PiggyBank size={10} />
                              Milestones Sync
                            </button>
                            <button className="flex-1 py-1 px-2.5 text-slate-600 rounded-lg text-[9px] font-bold flex items-center justify-center">
                              New Goal
                            </button>
                          </div>

                          {/* Savings goals list */}
                          <div className="mt-4 space-y-3.5 flex-1">
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Target Goals
                            </div>

                            {[
                              { name: 'House Downpayment', saved: '₱186k', target: '₱300k', pct: 62, color: 'bg-violet-500' },
                              { name: 'Emergency Fund', saved: '₱150k', target: '₱150k', pct: 100, color: 'bg-emerald-500' },
                              { name: 'Graduation Cruise Trip', saved: '₱18k', target: '₱100k', pct: 18, color: 'bg-amber-400' }
                            ].map((goal, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-center text-[9.5px]">
                                  <span className="font-bold text-slate-800">{goal.name}</span>
                                  <span className="text-slate-500 text-[8px] font-semibold">{goal.saved} / {goal.target}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${goal.color}`} style={{ width: `${goal.pct}%` }} />
                                  </div>
                                  <span className="text-[8px] font-bold text-slate-500 w-7 text-right">{goal.pct}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Static Footer inside Milestone Tracker Panel */}
                        <div className="pb-3 pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[9px]">👧</div>
                            <div>
                              <div className="text-[8px] font-bold text-slate-800 leading-none">Ate</div>
                              <div className="text-[7px] text-slate-400 mt-0.5 leading-none">Planner</div>
                            </div>
                          </div>
                          <span className="text-[7px] font-semibold text-slate-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                            Synced
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
