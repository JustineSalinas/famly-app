import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ProblemSolutionResult() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef(null)

  const steps = [
    {
      category: "Challenge",
      colorClass: "text-rose-500/90",
      headline: "Scattered tracking & structural debt traps",
      highlightText: "Over 34% of Filipino borrowers face repayment crises, with 8% falling into debt loops.",
      body: "According to the Bangko Sentral ng Pilipinas (BSP) 2025/2026 data, households lack centralized financial visibility. Tuition deadlines, calamity loans, and family expenses are managed in scattered Messenger threads or paper lists, leading to late penalties and mounting household friction.",
      subText: "We also needed a system that replaces the traditional high-stress 'listahan' with a clean, shared roadmap.",
      highlightStyle: "bg-rose-500/10 text-rose-300 border-rose-500/20"
    },
    {
      category: "Solution",
      colorClass: "text-blue-500/90",
      headline: "A unified operating ledger for the household",
      highlightText: "Famly structures every obligation under a secure, real-time shared workspace.",
      body: "Our work connects every family member under a centralized Firestore database, enabling dedicated modules for tuition, milestone goals, active liabilities, and monthly subscription utility checkouts. Everyone coordinates in real time.",
      subText: "Netflix-style profile switching grants individuals agency over their specific financial dashboards.",
      highlightStyle: "bg-blue-500/10 text-blue-300 border-blue-500/20"
    },
    {
      category: "Result",
      colorClass: "text-emerald-500/90",
      headline: "Predictable runways & zero missed deadlines",
      highlightText: "Obligations are cleared automatically, preventing late interest build-ups.",
      body: "By moving from scattered manual checks to visual payment pathways, households build a stable financial runway. Families hit milestone savings buffers, secure school terms, and eliminate late payment penalties together.",
      subText: "Philippine paymentsGCash, Maya, cardsare handled securely with integrated PayMongo pathways.",
      highlightStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
    }
  ]

  const active = steps[activeStep]

  return (
    <div ref={containerRef} className="psr-outer bg-[#090A0F] border-t border-slate-800/40">
      
      {/* 1. Sticky Display Container */}
      <div className="psr-sticky z-10 pointer-events-none">
        
        {/* Subtle background glow that adapts to the active step */}
        <div 
          className="absolute w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20" 
          style={{
            background: activeStep === 0 
              ? 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)'
              : activeStep === 1
                ? 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div className="max-w-5xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pointer-events-auto">
          
          {/* Left Column: Stage Label */}
          <div className="lg:col-span-4 text-left pt-1">
            <motion.div
              key={`label-${activeStep}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1"
            >
              <h3 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${active.colorClass}`}>
                {active.category}
              </h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                Stage {activeStep + 1} of 3
              </p>
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 text-left space-y-6">
            <motion.div
              key={`content-${activeStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <h4 className="text-xl md:text-3xl font-extrabold text-slate-100 tracking-tight leading-tight">
                {active.headline}
              </h4>

              <p className="text-sm md:text-lg text-slate-350 leading-relaxed font-normal">
                <span className={`inline px-1.5 py-0.5 rounded border ${active.highlightStyle} font-semibold mr-1.5 transition-all duration-300`}>
                  {active.highlightText}
                </span>{' '}
                {active.body}
              </p>

              <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-xl">
                {active.subText}
              </p>

              <div className="w-full h-px bg-slate-800/40 pt-4" />
            </motion.div>
          </div>
        </div>

        {/* Minimal dot navigation indicator on the right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 pointer-events-auto">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => {
                const stepElement = document.getElementById(`step-trigger-${idx}`)
                if (stepElement) {
                  stepElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              }}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              aria-label={`Jump to stage ${step.category}`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === idx 
                    ? activeStep === 0 
                      ? 'bg-rose-500 scale-125 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                      : activeStep === 1
                        ? 'bg-blue-500 scale-125 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                        : 'bg-emerald-500 scale-125 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 2. Scroll Trigger Background Landmarks (fills parent) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col">
        <ScrollTrigger index={0} id="step-trigger-0" setActiveStep={setActiveStep} />
        <ScrollTrigger index={1} id="step-trigger-1" setActiveStep={setActiveStep} />
        <ScrollTrigger index={2} id="step-trigger-2" setActiveStep={setActiveStep} />
        <ScrollTrigger index={2} id="step-trigger-spacer" setActiveStep={setActiveStep} />
      </div>
    </div>
  )
}

function ScrollTrigger({ index, id, setActiveStep }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    // Triggers step change when trigger section crosses middle of viewport
    margin: "-45% 0px -45% 0px",
    once: false
  })

  useEffect(() => {
    if (isInView) {
      setActiveStep(index)
    }
  }, [isInView, index, setActiveStep])

  return (
    <div 
      ref={ref} 
      id={id} 
      className="h-screen w-full pointer-events-none" 
    />
  )
}
