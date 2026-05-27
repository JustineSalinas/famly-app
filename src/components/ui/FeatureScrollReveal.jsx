import { useState, useEffect, useRef } from 'react'
import { motion, animate } from 'framer-motion'
import { TrendingDown, GraduationCap, PiggyBank, Users, CreditCard } from 'lucide-react'

/* ─────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────── */
function useCounter(target, duration, trigger) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!trigger) { setValue(0); return }
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [trigger, target, duration])
  return value
}

// ─────────────────────────────────────────
// Animated Card 1 — The Unified Debt Ledger
// ─────────────────────────────────────────
function DebtLedgerCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const total = useCounter(375400, 1.2, hovered)

  const rows = [
    { name: 'SSS Calamity Loan', bal: '₱18,400', rate: '10%' },
    { name: 'BDO Housing Loan',  bal: '₱312,000', rate: '7.5%' },
    { name: 'PAGIBIG MP2',       bal: '₱45,000', rate: '5%' },
  ]

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 3,
        scale: 1.03,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(244,63,94,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Dim rose ambient glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-rose-950/30 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center shrink-0">
          <TrendingDown size={15} className="text-rose-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">The Unified Debt Ledger</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Stop guessing exact balances. Track multi-creditor accounts and know exactly what it takes to reach zero.
          </p>
        </div>
      </div>

      {/* Mini UI */}
      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10">
        {/* Table header */}
        <div className="flex justify-between text-[10px] font-semibold text-slate-600 pb-2 border-b border-white/5">
          <span>Creditor</span>
          <span className="ml-auto mr-4">Rate</span>
          <span>Balance</span>
        </div>

        {/* Rows */}
        <div className="space-y-0.5 mt-1 text-left">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              animate={{ opacity: hovered ? 1 : 0.45 }}
              transition={{ duration: 0.3, delay: hovered ? i * 0.07 : 0 }}
              className="flex items-center justify-between py-1.5 border-b border-white/[0.03]"
            >
              <span className="text-[10px] text-slate-300 font-medium truncate max-w-[120px]">{row.name}</span>
              <span className="text-[10px] text-slate-600 mr-4">{row.rate}</span>
              <span className="text-[10px] text-slate-300 font-bold tabular-nums text-right">{row.bal}</span>
            </motion.div>
          ))}
        </div>

        {/* Total row */}
        <div className="flex items-center justify-between pt-2 mt-1">
          <span className="text-[10px] text-slate-500 font-semibold">Total Remaining</span>
          <span className="text-xs font-black text-slate-200 tabular-nums text-right">
            ₱{total.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// Animated Card 2 — Tuition Tracker Card
// ─────────────────────────────────────────
function TuitionTrackerCard({ variants }) {
  const [hovered, setHovered] = useState(false)

  const scholars = [
    { label: 'Kuya — AY 2024–25 Sem 2', pct: 72 },
    { label: 'Ate — AY 2024–25 Sem 1',  pct: 100 },
    { label: 'Bunso — Backlog 2023',     pct: 30 },
  ]

  const barColors = [
    'bg-amber-400/50',
    'bg-emerald-400/50',
    'bg-rose-400/50',
  ]

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 3,
        scale: 1.03,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Dim blue ambient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-950/25 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0">
          <GraduationCap size={15} className="text-blue-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">The Tuition &amp; Education Tracker</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Manage semester assessments, installment plans, and clear backlogs without the spreadsheet chaos.
          </p>
        </div>
      </div>

      {/* Mini UI — progress bars */}
      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 space-y-3.5 relative z-10 text-left">
        {scholars.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-slate-400 font-medium">{s.label}</span>
              <span className="text-[10px] text-slate-500 tabular-nums text-right">{s.pct}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColors[i]}`}
                initial={{ width: '0%' }}
                animate={{ width: hovered ? `${s.pct}%` : '0%' }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// Animated Card 3 — Milestone Sync Card
// ─────────────────────────────────────────
function MilestoneSyncCard({ variants }) {
  const [hovered, setHovered] = useState(false)

  const r = 44
  const circ = 2 * Math.PI * r
  const pct = 0.62
  const targetOffset = circ * (1 - pct)

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 3,
        scale: 1.03,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Dim violet ambient glow */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-violet-950/30 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center shrink-0">
          <PiggyBank size={15} className="text-violet-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">Milestone Synchronization</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Turn big dreams into measurable targets. Visualize your family's progress with clear, trackable savings goals.
          </p>
        </div>
      </div>

      {/* Mini UI — circular ring + goal list */}
      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 flex items-center gap-4 relative z-10 text-left">
        {/* SVG ring */}
        <div className="relative shrink-0 w-20 h-20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
            {/* Track */}
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            {/* Progress ring */}
            <motion.circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="rgba(139,92,246,0.45)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: hovered ? targetOffset : circ }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          </svg>
          <span className="absolute text-[11px] font-black text-slate-300">62%</span>
        </div>

        {/* Goal list */}
        <div className="flex-1 space-y-2 text-[10px]">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-semibold text-[9px]">House Downpayment</span>
              <span className="text-slate-500 tabular-nums text-right">₱186k / ₱300k</span>
            </div>
            <div className="w-full h-0.5 bg-white/5 rounded-full mt-1 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-violet-400/40"
                initial={{ width: '0%' }}
                animate={{ width: hovered ? '62%' : '0%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Emergency Fund</span>
            <span className="tabular-nums text-right">100%</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Graduation Trip</span>
            <span className="tabular-nums text-right">18%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// Animated Card 4 — Profile Switcher Card
// ─────────────────────────────────────────
const profiles = [
  { name: 'Mom',  emoji: '👩', gradient: 'from-purple-600 to-pink-500',   role: 'Debt + Planner' },
  { name: 'Kuya', emoji: '👦', gradient: 'from-blue-600 to-blue-400',     role: 'Tuition' },
  { name: 'Ate',  emoji: '👧', gradient: 'from-emerald-600 to-teal-400',  role: 'Milestone' },
]

function ProfileSwitcherCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const cycleRef = useRef(null)

  useEffect(() => {
    if (hovered) {
      let i = 0
      cycleRef.current = setInterval(() => {
        i = (i + 1) % profiles.length
        setActiveIdx(i)
      }, 900)
    } else {
      clearInterval(cycleRef.current)
      setActiveIdx(0)
    }
    return () => clearInterval(cycleRef.current)
  }, [hovered])

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 3,
        scale: 1.03,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(16,185,129,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Dim emerald ambient glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-emerald-950/25 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
          <Users size={15} className="text-emerald-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">One Login, Personalized Dashboards</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            A single household login with Netflix-style profile selection — everyone sees only their financial focus.
          </p>
        </div>
      </div>

      {/* Mini UI — avatars */}
      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left">
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-3">Who's managing today?</p>

        <div className="flex justify-around items-end gap-2">
          {profiles.map((p, i) => {
            const isActive = i === activeIdx
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1 cursor-pointer">
                {/* Avatar ring */}
                <div className={`p-[2px] rounded-full transition-all duration-300 ${
                  isActive ? 'ring-1 ring-white/15' : ''
                }`}>
                  <div 
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-lg transition-opacity duration-300`}
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  >
                    {p.emoji}
                  </div>
                </div>

                <span className={`text-[9px] font-bold transition-colors duration-300 ${
                  isActive ? 'text-slate-200' : 'text-slate-600'
                }`}>{p.name}</span>

                <span className={`text-[8px] transition-colors duration-300 ${
                  isActive ? 'text-slate-500' : 'text-slate-700'
                } text-center leading-tight`}>{p.role}</span>

                {/* Active indicator dot */}
                <motion.div
                  animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400/70"
                />
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// FeatureScrollReveal (Root Export)
// ─────────────────────────────────────────
export default function FeatureScrollReveal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const cardVariants = {
    hidden: {
      rotateY: 22,
      opacity: 0,
      y: 45
    },
    visible: {
      rotateY: 0,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 16
      }
    }
  }

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-slate-800/40 relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Features</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Every peso, every goal—<br />tracked with intention.
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed">
          Four core modules engineered to replace your family's scattered spreadsheets, group chats, and memory gaps.
        </p>
      </div>

      {/* 2×2 Grid with 3D perspective wrapper */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <DebtLedgerCard variants={cardVariants} />
        <TuitionTrackerCard variants={cardVariants} />
        <MilestoneSyncCard variants={cardVariants} />
        <ProfileSwitcherCard variants={cardVariants} />
      </motion.div>
    </section>
  )
}
