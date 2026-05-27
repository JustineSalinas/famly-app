import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Users, Shield, Plus, Check, Calendar, ArrowRight, Smartphone, Zap } from 'lucide-react'

// Steps data
const STEPS = [
  {
    num: '01',
    title: 'Register your household',
    desc: 'One secure account becomes the root of your entire family ledger. Firebase Auth keeps credentials encrypted at rest.',
    accent: 'text-blue-400',
    bgGlow: 'bg-blue-500/10'
  },
  {
    num: '02',
    title: 'Build member profiles',
    desc: 'Give each family member an emoji avatar, a gradient color, and the dashboard type that matches their role—scholar, planner, or admin.',
    accent: 'text-violet-400',
    bgGlow: 'bg-violet-500/10'
  },
  {
    num: '03',
    title: 'Log debts, tuition & goals',
    desc: 'Enter creditors, semester payment schedules, and savings milestones. Famly structures it all into real-time ledgers automatically.',
    accent: 'text-emerald-400',
    bgGlow: 'bg-emerald-500/10'
  },
  {
    num: '04',
    title: 'Stay aligned, always',
    desc: 'Every update syncs across profiles. Mom sees the debt picture. Kuya tracks his own tuition. Everyone moves in the same direction.',
    accent: 'text-amber-400',
    bgGlow: 'bg-amber-500/10'
  }
]

export default function HowItWorksFlow() {
  const containerRef = useRef(null)
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

  // Hook into scroll progress of the works container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Calculate active step index based on progress (0.0 to 1.0)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Divide into 4 sections
      if (latest < 0.25) {
        setActiveStep(0)
      } else if (latest >= 0.25 && latest < 0.5) {
        setActiveStep(1)
      } else if (latest >= 0.5 && latest < 0.75) {
        setActiveStep(2)
      } else {
        setActiveStep(3)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Track glowing connector height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // If mobile, show a simplified standard grid list with staggered entry
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
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#0C0D0F] border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-slate-700 transition-all"
            >
              <span className="absolute top-3 right-4 text-5xl font-extrabold text-slate-800/20 font-mono select-none leading-none">{step.num}</span>
              <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${step.accent}`}>Step {step.num}</div>
              <h4 className="text-sm font-bold text-slate-100 leading-snug">{step.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div ref={containerRef} className="how-it-works-outer w-full bg-[#090A0F]">
      
      {/* Sticky Inner Container */}
      <div className="how-it-works-sticky w-full">
        
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-12 gap-8 items-center h-full max-h-[85vh] relative">
          
          {/* ──────────────────────────────────────────────────────── */}
          {/* LEFT PANEL: Glowing Step List                            */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="col-span-5 relative flex flex-col justify-center h-full py-10">
            <div className="mb-8 text-left">
              <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Process Flow</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
                Your family's OS, live in minutes
              </h2>
            </div>

            {/* Steps Connector Pipeline */}
            <div className="relative pl-8 space-y-6">
              
              {/* Vertical connector line track */}
              <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-slate-800" />
              
              {/* Glowing active path line */}
              <motion.div 
                className="absolute left-[9px] top-4 w-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] origin-top"
                style={{ height: lineHeight }}
              />

              {STEPS.map((step, idx) => {
                const isActive = idx === activeStep
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      opacity: isActive ? 1 : 0.28,
                      x: isActive ? 8 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="relative flex gap-4 text-left group cursor-pointer"
                  >
                    {/* Step Number Dot */}
                    <div className={`absolute -left-[30px] w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center bg-[#090A0F] z-10 transition-all duration-300 ${
                      isActive 
                        ? 'border-blue-500 shadow-[0_0_6px_#3b82f6]' 
                        : 'border-slate-800'
                    }`}>
                      <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                        isActive ? 'bg-blue-500' : 'bg-transparent'
                      }`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold font-mono tracking-wider ${step.accent}`}>
                          STEP {step.num}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-100 mt-1 leading-snug">
                        {step.title}
                      </h3>
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-slate-400 mt-2 leading-relaxed"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* RIGHT PANEL: Morphing Visual Cards                       */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="col-span-7 flex justify-center items-center h-full relative pl-8">
            <div className="relative w-full max-w-[480px] h-[340px] bg-[#121319]/80 border border-white/5 rounded-2xl p-6 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Decorative inner visual grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              <AnimatePresence mode="wait">
                
                {/* STEP 1: Registration visual */}
                {activeStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="w-[310px] bg-[#090A0F] border border-white/10 rounded-xl p-5 shadow-xl text-left relative z-10"
                  >
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                      <Shield size={14} className="text-blue-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Initialize Household</span>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <label className="text-[8px] font-bold text-slate-500 block uppercase mb-1">Household Title</label>
                        <div className="h-7 border border-white/10 bg-white/[0.02] rounded-md px-2.5 flex items-center text-xs text-slate-200">
                          Salinas Family
                          <motion.span 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-1 h-3.5 bg-blue-500 ml-0.5 inline-block"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[8px] font-bold text-slate-500 block uppercase mb-1">Root Admin Account</label>
                        <div className="h-7 border border-white/10 bg-white/[0.02] rounded-md px-2.5 flex items-center text-xs text-slate-400">
                          justine@salinas-household.com
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-[10px] flex items-center justify-center gap-1.5 shadow-md mt-4"
                      >
                        Create Secure Vault
                        <ArrowRight size={11} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Profile Selection Visual */}
                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="w-full max-w-[360px] text-center"
                  >
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-6">Choose Member Dashboard</p>
                    
                    <div className="flex justify-between gap-3">
                      {[
                        { name: 'Mom', emoji: '👩', grad: 'from-purple-600 to-pink-500', role: 'Admin', delay: 0 },
                        { name: 'Kuya', emoji: '👦', grad: 'from-blue-600 to-blue-400', role: 'Scholar', delay: 0.08 },
                        { name: 'Ate', emoji: '👧', grad: 'from-emerald-600 to-teal-500', role: 'Planner', delay: 0.16 }
                      ].map((profile, pi) => (
                        <motion.div
                          key={profile.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: profile.delay }}
                          className="flex-1 bg-[#090A0F] border border-white/5 rounded-xl p-3 flex flex-col items-center hover:border-white/10 transition-all cursor-pointer shadow-md"
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${profile.grad} flex items-center justify-center text-2xl shadow-inner mb-2`}>
                            {profile.emoji}
                          </div>
                          <span className="text-[10px] font-black text-slate-200">{profile.name}</span>
                          <span className="text-[7.5px] font-semibold text-slate-500 mt-0.5">{profile.role}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Ledger Addition Visual */}
                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="w-[330px] bg-[#090A0F] border border-white/10 rounded-xl p-4 shadow-xl text-left"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Plus size={10} className="text-emerald-400" />
                        Log Obligation
                      </span>
                      <span className="text-[7.5px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">ACTIVE</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'BDO Housing Loan', type: 'Mortgage', amt: '₱312,000', completed: true, delay: 0 },
                        { title: 'SSS Calamity Loan', type: 'Salary Deduction', amt: '₱18,400', completed: true, delay: 0.1 },
                        { title: 'PAGIBIG MP2 Deposit', type: 'Savings Goal', amt: '₱45,000', completed: false, delay: 0.2 }
                      ].map((item, idx) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: item.delay }}
                          className="flex items-center justify-between p-2 bg-[#121319] border border-white/5 rounded-lg text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                              item.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-600'
                            }`}>
                              <Check size={9} strokeWidth={3} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-200 text-[9px] leading-tight">{item.title}</p>
                              <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">{item.type}</p>
                            </div>
                          </div>
                          <span className="font-black text-slate-200 text-[9.5px]">{item.amt}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Real-time sync visual */}
                {activeStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="w-full max-w-[340px] flex flex-col items-center relative"
                  >
                    {/* Database Core */}
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shadow-lg relative z-20">
                      <Zap className="text-blue-400 animate-pulse" size={24} />
                      {/* Radiating sync rings */}
                      <span className="absolute inset-0 rounded-2xl border border-blue-500/30 animate-ping opacity-35" />
                    </div>

                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-3 mb-8">Central Sync Hub</div>

                    {/* Surrounding Client Profiles */}
                    <div className="flex justify-between w-full relative z-20">
                      {[
                        { emoji: '👩', title: 'Mom', desc: 'Sync Active', color: 'border-purple-500/20' },
                        { emoji: '👦', title: 'Kuya', desc: 'Sync Active', color: 'border-blue-500/20' },
                        { emoji: '👧', title: 'Ate', desc: 'Sync Active', color: 'border-emerald-500/20' }
                      ].map((item, idx) => (
                        <div key={idx} className={`bg-[#090A0F] border ${item.color} rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-md`}>
                          <div className="text-xs">{item.emoji}</div>
                          <div className="text-left">
                            <span className="text-[7.5px] font-bold text-slate-200 block leading-tight">{item.title}</span>
                            <span className="text-[5.5px] text-emerald-400 font-medium block flex items-center gap-0.5">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                              {item.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Connecting laser paths */}
                    <svg className="absolute inset-0 w-full h-[180px] top-[10px] pointer-events-none z-0">
                      {/* Path to Mom (left) */}
                      <path d="M 170 30 L 50 140" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                      {/* Path to Kuya (center) */}
                      <path d="M 170 30 L 170 140" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                      {/* Path to Ate (right) */}
                      <path d="M 170 30 L 290 140" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                    </svg>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
