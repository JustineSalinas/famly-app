import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Users, Shield, Plus, Check, ArrowRight, Zap, Play, HelpCircle } from 'lucide-react'

// Steps data
const STEPS = [
  {
    num: '01',
    title: 'Register your household',
    desc: 'One secure account becomes the root of your entire family ledger. Firebase Auth keeps credentials encrypted at rest, establishing a blank slate for all assets, debts, and timelines.',
    accent: 'text-blue-400',
    bgGlow: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    num: '02',
    title: 'Build member profiles',
    desc: 'Give each family member a custom emoji avatar, a gradient color theme, and select the dashboard matching their specific role—scholar, planner, or administrator.',
    accent: 'text-violet-400',
    bgGlow: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20'
  },
  {
    num: '03',
    title: 'Log debts, tuition & goals',
    desc: 'Input outstanding creditors, semester installment schedules, and key savings milestones. Famly structures these records automatically into clean, individual views.',
    accent: 'text-emerald-400',
    bgGlow: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    num: '04',
    title: 'Stay aligned, always',
    desc: 'Every transaction syncs instantly across devices. Mom oversees the liability ratios, Kuya tracks tuition clearance, and Ate manages savings targets in perfect coordination.',
    accent: 'text-amber-400',
    bgGlow: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20'
  }
]

export default function HowItWorksFlow() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // If mobile, show a simplified standard grid list
  if (isMobile) {
    return (
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/40 relative z-10 bg-[#0C0D0F]/30">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">How It Works</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
            Your family's OS, live in minutes
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Four intentional steps from blank slate to full financial clarity—no spreadsheet PhD required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden shadow-sm"
            >
              <span className="absolute top-3 right-4 text-5xl font-extrabold text-slate-850 font-mono select-none leading-none">{step.num}</span>
              <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${step.accent}`}>Step {step.num}</div>
              <h4 className="text-sm font-bold text-slate-100 leading-snug">{step.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * 4), 3)
    setActiveStep(step)
  })

  // Handle clicking on a step to scroll to it
  const handleStepClick = (index) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const sectionTop = rect.top + scrollTop
    const sectionHeight = rect.height
    // Map index (0 to 3) to scroll position inside the section height
    const targetScroll = sectionTop + (index + 0.5) * 0.25 * (sectionHeight - window.innerHeight)
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <section 
      ref={containerRef} 
      id="how-it-works" 
      className="w-full bg-[#090A0F] border-t border-slate-800/40 relative z-10 h-[300vh]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center z-20 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col justify-center h-full">
          
          {/* Section Header */}
          <div className="text-left max-w-2xl mb-8">
            <p className="text-xs font-bold text-blue-500 tracking-widest uppercase font-mono">Process Flow</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 mt-2 tracking-tight">
              Your family's OS, live in minutes.
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2">
              Watch the system activate step-by-step. Scroll down to trigger the timeline elements sequentially.
            </p>
          </div>

          {/* 2-Column Split: List on Left, Mockup on Right */}
          <div className="grid grid-cols-12 gap-8 items-center mt-4">
            
            {/* LEFT COLUMN: Scroll-pinned steps */}
            <div className="col-span-5 space-y-6 relative z-10">
              {/* Continuous vertical timeline line */}
              <div className="absolute left-[16px] top-2 bottom-2 w-[2px] bg-slate-800 z-0" />
              {/* Active colored line segment */}
              <motion.div 
                className="absolute left-[16px] top-2.5 w-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] z-0"
                initial={{ height: 0 }}
                animate={{
                  height: activeStep === 0 ? 0 : 
                          activeStep === 1 ? '33%' : 
                          activeStep === 2 ? '66%' : '95%'
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {STEPS.map((step, idx) => (
                <StepRow
                  key={idx}
                  step={step}
                  index={idx}
                  activeStep={activeStep}
                  onClick={() => handleStepClick(idx)}
                />
              ))}
            </div>

            {/* RIGHT COLUMN: Visual mockup */}
            <div className="col-span-7 flex justify-center z-20">
              <div className="relative w-full max-w-[580px] h-[400px] bg-[#121319]/80 border border-white/5 rounded-2xl p-8 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {activeStep === 0 && <StepOneVisual key="step-0" />}
                  {activeStep === 1 && <StepTwoVisual key="step-1" />}
                  {activeStep === 2 && <StepThreeVisual key="step-2" />}
                  {activeStep === 3 && <StepFourVisual key="step-3" />}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   Step Row Component
   ───────────────────────────────────────────────────────────── */
function StepRow({ step, index, activeStep, onClick }) {
  const isActive = index === activeStep

  return (
    <div 
      onClick={onClick}
      className={`text-left relative pl-10 transition-all duration-500 cursor-pointer ${
        isActive ? 'opacity-100 scale-[1.02]' : 'opacity-30 scale-100'
      }`}
    >
      {/* Timeline Bullet */}
      <div className={`absolute left-[9px] top-1.5 w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center bg-[#090A0F] z-10 transition-all duration-500 ${
        isActive ? 'border-blue-500 shadow-[0_0_8px_#3b82f6]' : 'border-slate-800'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
          isActive ? 'bg-blue-500' : 'bg-transparent'
        }`} />
      </div>

      <div className="space-y-1">
        <span className={`text-[10px] font-bold font-mono tracking-wider transition-colors duration-500 ${
          isActive ? step.accent : 'text-slate-500'
        }`}>
          STEP {step.num}
        </span>
        <h3 className="text-sm font-extrabold text-slate-100 tracking-tight leading-snug">
          {step.title}
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Step 1 Mockup Visual
   ───────────────────────────────────────────────────────────── */
function StepOneVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 48 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, x: -32 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="w-[360px] bg-[#090A0F] border border-white/10 rounded-xl p-6 shadow-xl text-left relative z-10"
    >
      <div className="flex items-center gap-2.5 border-b border-white/5 pb-3 mb-4">
        <Shield size={15} className="text-blue-500" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Initialize Household</span>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <label className="text-[9px] font-bold text-slate-500 block uppercase mb-1.5">Household Title</label>
          <div className="h-9 border border-white/10 bg-white/[0.02] rounded-md px-3 flex items-center text-slate-200 font-medium">
            Salinas Family
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1.5 h-4 bg-blue-500 ml-0.5 inline-block"
            />
          </div>
        </div>

        <div>
          <label className="text-[9px] font-bold text-slate-500 block uppercase mb-1.5">Root Admin Account</label>
          <div className="h-9 border border-white/10 bg-white/[0.02] rounded-md px-3 flex items-center text-slate-400">
            justine@salinas-household.com
          </div>
        </div>

        <button className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-md mt-3">
          Create Secure Vault
          <ArrowRight size={12} />
        </button>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Step 2 Mockup Visual
   ───────────────────────────────────────────────────────────── */
function StepTwoVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 48 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, x: -32 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="w-full max-w-[420px] text-center"
    >
      <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-6">Choose Member Profile</p>
      
      <div className="flex justify-between gap-4">
        {[
          { name: 'Mom', emoji: '👩', grad: 'from-purple-600 to-pink-500', role: 'Admin', delay: 0 },
          { name: 'Kuya', emoji: '👦', grad: 'from-blue-600 to-blue-400', role: 'Scholar', delay: 0.05 },
          { name: 'Ate', emoji: '👧', grad: 'from-emerald-600 to-teal-500', role: 'Planner', delay: 0.1 }
        ].map((profile, pi) => (
          <motion.div
            key={profile.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: profile.delay }}
            className="flex-1 bg-[#090A0F] border border-white/5 rounded-xl p-4 flex flex-col items-center hover:border-white/10 transition-all cursor-pointer shadow-md"
          >
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${profile.grad} flex items-center justify-center text-2xl shadow-inner mb-3.5`}>
              {profile.emoji}
            </div>
            <span className="text-xs font-bold text-slate-200">{profile.name}</span>
            <span className="text-[9px] font-semibold text-slate-500 mt-1">{profile.role}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Step 3 Mockup Visual
   ───────────────────────────────────────────────────────────── */
function StepThreeVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 48 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, x: -32 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="w-[380px] bg-[#090A0F] border border-white/10 rounded-xl p-5 shadow-xl text-left"
    >
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Plus size={12} className="text-emerald-400" />
          Log Obligation
        </span>
        <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">ACTIVE</span>
      </div>

      <div className="space-y-2.5 text-xs">
        {[
          { title: 'BDO Housing Loan', type: 'Mortgage', amt: '₱312,000', completed: true, delay: 0 },
          { title: 'SSS Calamity Loan', type: 'Govt Loan', amt: '₱18,400', completed: true, delay: 0.05 },
          { title: 'PAGIBIG MP2 Deposit', type: 'Savings Goal', amt: '₱45,000', completed: false, delay: 0.1 }
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.delay }}
            className="flex items-center justify-between p-3 bg-[#121319] border border-white/5 rounded-lg"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-600'
              }`}>
                <Check size={11} strokeWidth={3.5} />
              </div>
              <div>
                <p className="font-bold text-slate-200 text-xs leading-tight">{item.title}</p>
                <p className="text-[8px] text-slate-500 leading-none mt-1">{item.type}</p>
              </div>
            </div>
            <span className="font-black text-slate-200 text-xs">{item.amt}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Step 4 Mockup Visual
   ───────────────────────────────────────────────────────────── */
function StepFourVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 48 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, x: -32 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="w-full max-w-[500px] flex flex-col items-center relative"
    >
      {/* Central Sync Hub Icon */}
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-950/20 relative z-20">
        <Zap className="text-blue-400 animate-pulse" size={26} />
        <span className="absolute inset-0 rounded-2xl border border-blue-500/30 animate-ping opacity-35" />
      </div>

      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4 mb-14">Central Sync Hub</div>

      {/* Sync Member Cards */}
      <div className="flex justify-between w-full relative z-20 gap-4">
        {[
          { emoji: '👩', title: 'Mom', role: 'Admin', desc: 'Active', color: 'border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5' },
          { emoji: '👦', title: 'Kuya', role: 'Scholar', desc: 'Active', color: 'border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5' },
          { emoji: '👧', title: 'Ate', role: 'Planner', desc: 'Active', color: 'border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5' }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className={`border ${item.color} rounded-2xl p-4 flex flex-col items-center gap-3 shadow-xl flex-1 transition-all duration-300`}
          >
            {/* Avatar (Head Profile) */}
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {item.emoji}
            </div>

            {/* Member Details */}
            <div className="text-center space-y-0.5">
              <span className="text-xs font-bold text-slate-100 block leading-tight">{item.title}</span>
              <span className="text-[8.5px] text-slate-400 font-semibold block uppercase tracking-wider">{item.role}</span>
            </div>

            {/* Active Status Under Card */}
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[7.5px] font-bold uppercase tracking-wider text-emerald-400 mt-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
              {item.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Connection paths */}
      <svg viewBox="0 0 500 240" preserveAspectRatio="none" className="absolute inset-0 w-full h-[240px] top-[24px] pointer-events-none z-0">
        <path d="M 250 32 L 83 136" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        <path d="M 250 32 L 250 136" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        <path d="M 250 32 L 417 136" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      </svg>
    </motion.div>
  )
}
