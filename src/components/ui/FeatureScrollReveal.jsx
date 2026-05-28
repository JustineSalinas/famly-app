import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import {
  TrendingDown,
  GraduationCap,
  PiggyBank,
  Users,
  CreditCard,
  ClipboardList,
  Plug,
  Laptop,
  Shield,
  TrendingUp,
  Check,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react'

/* ─────────────────────────────────────────
   Animated counter hook
   ───────────────────────────────────────── */
function useCounter(target, duration, trigger) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const controls = animate(value, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [target, trigger])
  return value
}

/* ─────────────────────────────────────────────────────────────
   1. TUITION TRACKER CARD
   ───────────────────────────────────────────────────────────── */
function TuitionTrackerCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [paid, setPaid] = useState(false)

  const scholars = [
    { label: 'Kuya — College AY 24-25', basePct: 72, targetPct: 100, amt: '₱35,000' },
    { label: 'Ate — High School AY 24-25', basePct: 100, targetPct: 100, amt: '₱12,500' },
    { label: 'Bunso — Backlog Term', basePct: 30, targetPct: 100, amt: '₱8,400' },
  ]

  const totalDues = paid ? 0 : 55900
  const totalCounter = useCounter(totalDues, 1.0, paid)

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-950/25 blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0">
            <GraduationCap size={15} className="text-blue-400/80" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white leading-snug">Tuition Tracker</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Track multi-scholar assessments and installment schedules.
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setPaid(p => !p)
          }}
          className={`px-2 py-1 rounded text-[8px] font-bold border transition-all ${
            paid 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
              : 'bg-blue-600/20 text-blue-400 border-blue-500/20 hover:bg-blue-500/30'
          }`}
        >
          {paid ? 'Reset simulation' : 'Simulate Pay Term'}
        </button>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3.5 space-y-3 relative z-10 text-left">
        {scholars.map((s, i) => {
          const activePct = paid ? s.targetPct : s.basePct
          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-slate-400 font-semibold">{s.label}</span>
                <span className="text-slate-500 tabular-nums">{s.amt}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${paid ? 'bg-emerald-400/60 shadow-[0_0_8px_#10b981]' : i === 2 ? 'bg-rose-500/60' : i === 0 ? 'bg-amber-400/60' : 'bg-emerald-500/60'}`}
                    animate={{ width: `${activePct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[8px] font-bold text-slate-500 w-7 text-right">{activePct}%</span>
              </div>
            </div>
          )
        })}
        <div className="h-px bg-white/5 w-full pt-1" />
        <div className="flex items-center justify-between pt-1">
          <span className="text-[9px] text-slate-500 font-semibold">Total Dues Remaining</span>
          <span className="text-xs font-black text-slate-200 tabular-nums">
            ₱{totalCounter.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   2. DEBT LEDGER CARD
   ───────────────────────────────────────────────────────────── */
function DebtLedgerCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [checkedDebts, setCheckedDebts] = useState([false, false, false])

  const debts = [
    { name: 'BDO Housing Loan', type: 'Mortgage • 7.5%', bal: 312000 },
    { name: 'SSS Calamity Loan', type: 'Govt Loan • 10%', bal: 18400 },
    { name: 'PAGIBIG MP2 Deposit', type: 'Voluntary Savings', bal: 45000 },
  ]

  // Calculate current total
  const remainingTotal = debts.reduce((sum, item, idx) => {
    return sum + (checkedDebts[idx] ? 0 : item.bal)
  }, 0)

  const totalCounter = useCounter(remainingTotal, 0.8, remainingTotal)

  const toggleDebt = (idx, e) => {
    e.stopPropagation()
    setCheckedDebts(prev => {
      const copy = [...prev]
      copy[idx] = !copy[idx]
      return copy
    })
  }

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(244,63,94,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-rose-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center shrink-0">
          <TrendingDown size={15} className="text-rose-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">Debt Ledger</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Stop guessing outstanding balances. Click items to simulate pay-offs.
          </p>
        </div>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10">
        <div className="flex justify-between text-[8px] font-bold text-slate-600 pb-2 border-b border-white/5 uppercase">
          <span>Creditor / Description</span>
          <span>Balance</span>
        </div>

        <div className="space-y-1 mt-1.5 text-left">
          {debts.map((row, i) => (
            <div
              key={i}
              onClick={(e) => toggleDebt(i, e)}
              className="flex items-center justify-between py-1.5 border-b border-white/[0.02] cursor-pointer hover:bg-white/[0.01] px-1 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                  checkedDebts[i] 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
                    : 'border-slate-800 bg-slate-950'
                }`}>
                  {checkedDebts[i] && <Check size={10} strokeWidth={3.5} />}
                </div>
                <div>
                  <span className={`text-[10px] font-bold block ${checkedDebts[i] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                    {row.name}
                  </span>
                  <span className="text-[7.5px] text-slate-500 block leading-none">{row.type}</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold tabular-nums text-right ${checkedDebts[i] ? 'text-slate-600 line-through' : 'text-slate-300'}`}>
                ₱{row.bal.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2.5 mt-1.5 border-t border-white/5">
          <span className="text-[9px] text-slate-500 font-semibold">Total Liabilities</span>
          <span className="text-xs font-black text-slate-200 tabular-nums">
            ₱{totalCounter.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   3. MILESTONE TRACKER CARD
   ───────────────────────────────────────────────────────────── */
function MilestoneTrackerCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [savingsVal, setSavingsVal] = useState(186000)
  const target = 300000

  const r = 40
  const circ = 2 * Math.PI * r
  const pct = Math.min(savingsVal / target, 1.0)
  const offset = circ * (1 - pct)

  const activeCounter = useCounter(savingsVal, 0.6, savingsVal)

  const handleAddSavings = (e) => {
    e.stopPropagation()
    setSavingsVal(v => {
      if (v >= target) return 186000
      return v + 28500
    })
  }

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(16,185,129,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
            <PiggyBank size={15} className="text-emerald-400/80" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white leading-snug">Milestone Tracker</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Track visual savings milestones with progress indicators.
            </p>
          </div>
        </div>
        <button
          onClick={handleAddSavings}
          className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-0.5"
        >
          <Plus size={9} /> {savingsVal >= target ? 'Reset' : '+₱28.5k'}
        </button>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 flex items-center gap-4 relative z-10">
        <div className="relative shrink-0 w-20 h-20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="url(#milestoneGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="milestoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute text-[11px] font-black text-emerald-400 tabular-nums">
            {Math.round(pct * 100)}%
          </span>
        </div>

        <div className="flex-1 space-y-2 text-[10px] text-left">
          <div>
            <div className="flex justify-between items-center font-bold text-slate-300">
              <span>House Fund</span>
            </div>
            <p className="text-[8px] text-slate-500 uppercase font-semibold mt-0.5">Target: ₱300,000</p>
            <div className="flex justify-between text-slate-400 mt-1 font-semibold">
              <span className="tabular-nums">Saved: ₱{activeCounter.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   4. FAMILY PLANNER CARD
   ───────────────────────────────────────────────────────────── */
function FamilyPlannerCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [activeTab, setActiveTab] = useState('IDEA') // 'IDEA' | 'ACTIVE'

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: -2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(245,158,11,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
            <ClipboardList size={15} className="text-amber-400/80" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white leading-snug">Family Planner</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Compile projects and ideas board. Tap status to move card.
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setActiveTab(t => t === 'IDEA' ? 'ACTIVE' : 'IDEA')
          }}
          className="px-2 py-1 rounded bg-amber-600/20 text-amber-400 border border-amber-500/20 text-[8px] font-bold hover:bg-amber-500/30 transition-all"
        >
          {activeTab === 'IDEA' ? 'Move to Active' : 'Reset Idea'}
        </button>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left min-h-[110px] flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Project Boards</span>
          <span className={`text-[7px] font-black px-1.5 py-0.5 rounded ${
            activeTab === 'ACTIVE' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            {activeTab === 'IDEA' ? 'BRAINSTORM' : 'ACTIVE PIPELINE'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'ACTIVE' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'ACTIVE' ? -20 : 20 }}
            transition={{ duration: 0.2 }}
            className="bg-[#121319] border border-white/5 rounded-lg p-2.5 space-y-1.5"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-slate-200">Install Solar Panels</h4>
              <span className="text-[7.5px] px-1 bg-yellow-600/10 text-yellow-400 border border-yellow-500/20 rounded">Finance</span>
            </div>
            <p className="text-[8.5px] text-slate-400 leading-relaxed">
              Convert household rooftop to solar grid to reduce utility costs by 40%.
            </p>
            <div className="flex justify-between text-[8px] text-slate-500 pt-1.5 border-t border-white/[0.02]">
              <span>Est: ₱150,000</span>
              <span>Target: Q4 2026</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   5. SUBSYNC / UTILITIES CARD
   ───────────────────────────────────────────────────────────── */
function SubSyncCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [subs, setSubs] = useState([
    { name: 'Netflix Premium', active: true, cost: 549 },
    { name: 'Spotify Duo', active: true, cost: 149 },
    { name: 'iCloud 200GB', active: false, cost: 149 },
  ])

  const toggleSub = (idx, e) => {
    e.stopPropagation()
    setSubs(prev => prev.map((s, i) => i === idx ? { ...s, active: !s.active } : s))
  }

  const monthlyBurn = subs.filter(s => s.active).reduce((acc, s) => acc + s.cost, 0)
  const burnCounter = useCounter(monthlyBurn, 0.5, monthlyBurn)

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: -2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center shrink-0">
          <Plug size={15} className="text-violet-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">SubSync / Utilities</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Monitor household active subscriptions. Toggle toggles below.
          </p>
        </div>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left space-y-2">
        <div className="space-y-1.5">
          {subs.map((sub, i) => (
            <div 
              key={i} 
              onClick={(e) => toggleSub(i, e)}
              className="flex justify-between items-center py-1 border-b border-white/[0.02]"
            >
              <div>
                <span className="text-[9.5px] font-bold text-slate-200 block">{sub.name}</span>
                <span className="text-[7px] text-slate-500 block leading-none">₱{sub.cost}/mo</span>
              </div>
              <button className="p-0.5 focus:outline-none shrink-0">
                {sub.active 
                  ? <ToggleRight size={20} className="text-violet-400" />
                  : <ToggleLeft size={20} className="text-slate-600" />
                }
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 mt-1 border-t border-white/5">
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active Burn</span>
          <span className="text-xs font-black text-rose-400 tabular-nums">₱{burnCounter}/mo</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   6. HARDWARE & ASSETS CARD
   ───────────────────────────────────────────────────────────── */
function HardwareAssetsCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(null)

  const items = [
    { name: "Mom's MacBook Air M2", type: "Laptop", status: "WARRANTY ACTIVE", date: "Expires Oct 24, 2026", color: "text-emerald-400" },
    { name: "Kuya's iPad Pro", type: "Tablet", status: "EXPIRED", date: "Expired Jan 15, 2026", color: "text-slate-600" },
  ]

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: -2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(6,182,212,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cyan-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center shrink-0">
          <Laptop size={15} className="text-cyan-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">Hardware &amp; Assets</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Register family assets and watch warranty limits. Click items.
          </p>
        </div>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left space-y-2.5 min-h-[110px] flex flex-col justify-center">
        {selectedIdx === null ? (
          <div className="space-y-2">
            {items.map((it, idx) => (
              <div 
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIdx(idx)
                }}
                className="p-2 bg-[#121319] hover:bg-slate-900 border border-white/5 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-[9.5px] font-bold text-slate-200 block leading-tight">{it.name}</span>
                  <span className="text-[7px] text-slate-500 block mt-0.5">{it.type}</span>
                </div>
                <span className={`text-[7px] font-bold uppercase tracking-wider ${it.color}`}>{it.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-2 bg-[#121319] border border-white/5 rounded-lg text-xs space-y-1 relative"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9.5px] font-bold text-slate-200">{items[selectedIdx].name}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIdx(null)
                }}
                className="text-[8px] font-bold text-cyan-400 hover:text-cyan-300"
              >
                Back
              </button>
            </div>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest">{items[selectedIdx].type} Coverage</p>
            <p className="text-[9px] text-slate-400">{items[selectedIdx].date}</p>
            <p className="text-[8px] text-emerald-400 font-semibold mt-1">✓ Covered by AppleCare+ Support</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   7. LIQUIDITY VAULT CARD
   ───────────────────────────────────────────────────────────── */
function LiquidityVaultCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const assets = [
    { label: "Cash on Hand", val: "₱14,000", pct: 20 },
    { label: "BDO Savings", val: "₱75,000", pct: 60 },
    { label: "GCash Wallet", val: "₱15,000", pct: 25 },
  ]

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(16,185,129,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
          <Shield size={15} className="text-emerald-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">Liquidity Vault</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Monitor emergency backing cash reserves. Hover bars for values.
          </p>
        </div>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left space-y-3">
        <div className="space-y-2">
          {assets.map((as, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="space-y-1"
            >
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-slate-400 font-semibold">{as.label}</span>
                <span className={`text-[9px] font-black text-emerald-400 transition-opacity duration-200 ${
                  hoveredIdx === idx ? 'opacity-100' : 'opacity-40'
                }`}>{as.val}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full rounded-full bg-emerald-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${as.pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   8. INBOUND CASHFLOW CARD
   ───────────────────────────────────────────────────────────── */
function InboundCashflowCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [activeIncome, setActiveIncome] = useState([true, true, false])

  const streams = [
    { name: "Mom's Primary Salary", amt: 85000 },
    { name: "Kuya's Part-Time Gigs", amt: 25000 },
    { name: "Household Rental Yield", amt: 15000 },
  ]

  const totalInbound = streams.reduce((sum, item, idx) => {
    return sum + (activeIncome[idx] ? item.amt : 0)
  }, 0)

  // Outbound burn is assumed at ₱45k/mo
  const runwayMonths = totalInbound / 45000
  const runwayCounter = useCounter(totalInbound, 0.6, totalInbound)

  const toggleIncome = (idx, e) => {
    e.stopPropagation()
    setActiveIncome(prev => {
      const copy = [...prev]
      copy[idx] = !copy[idx]
      return copy
    })
  }

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-950/20 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0">
          <TrendingUp size={15} className="text-blue-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">Inbound Cashflow</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Project family monthly runway. Toggle income components below.
          </p>
        </div>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left space-y-3">
        <div className="space-y-1.5">
          {streams.map((st, i) => (
            <div 
              key={i} 
              onClick={(e) => toggleIncome(i, e)}
              className="flex justify-between items-center py-1 border-b border-white/[0.02]"
            >
              <div>
                <span className={`text-[9.5px] font-bold block ${activeIncome[i] ? 'text-slate-200' : 'text-slate-600 line-through'}`}>
                  {st.name}
                </span>
                <span className="text-[7.5px] text-slate-500 block leading-none">₱{st.amt.toLocaleString()}/mo</span>
              </div>
              <button className="p-0.5 focus:outline-none shrink-0">
                {activeIncome[i] 
                  ? <ToggleRight size={20} className="text-blue-400" />
                  : <ToggleLeft size={20} className="text-slate-700" />
                }
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 mt-1 border-t border-white/5">
          <div>
            <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest block leading-none">Monthly Inflow</span>
            <span className="text-[11px] font-black text-slate-200 tabular-nums block mt-1">₱{runwayCounter.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest block leading-none">Runway Factor</span>
            <span className="text-xs font-black text-emerald-400 block mt-1">{runwayMonths.toFixed(1)} Months</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   9. PROFILE SWITCHER CARD
   ───────────────────────────────────────────────────────────── */
const profiles = [
  { name: 'Mom',  emoji: '👩', gradient: 'from-purple-600 to-pink-500',   role: 'Debt + Planner' },
  { name: 'Kuya', emoji: '👦', gradient: 'from-blue-600 to-blue-400',     role: 'Tuition' },
  { name: 'Ate',  emoji: '👧', gradient: 'from-emerald-600 to-teal-400',  role: 'Milestone' },
]

function ProfileSwitcherCard({ variants }) {
  const [hovered, setHovered] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  const handleProfileClick = (idx, e) => {
    e.stopPropagation()
    setActiveIdx(idx)
  }

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: -2,
        scale: 1.02,
        y: -4,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(16,185,129,0.06)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative bg-[#16181D] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col gap-4 origin-center cursor-pointer select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-emerald-950/25 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
          <Users size={15} className="text-emerald-400/80" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-bold text-white leading-snug">Personalized Profiles</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            One household account. Click avatars to swap active profile.
          </p>
        </div>
      </div>

      <div className="bg-[#0E0F14] border border-white/5 rounded-xl p-3 relative z-10 text-left">
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-3">Who's managing today?</p>

        <div className="flex justify-around items-end gap-2">
          {profiles.map((p, i) => {
            const isActive = i === activeIdx
            return (
              <div 
                key={i} 
                onClick={(e) => handleProfileClick(i, e)}
                className="flex flex-col items-center gap-1.5 flex-1 cursor-pointer"
              >
                <div className={`p-[2px] rounded-full transition-all duration-300 ${
                  isActive ? 'ring-1 ring-white/20' : ''
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

/* ─────────────────────────────────────────────────────────────
   FEATURE SCROLL REVEAL (ROOT EXPORT)
   ───────────────────────────────────────────────────────────── */
export default function FeatureScrollReveal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: {
      rotateY: 15,
      opacity: 0,
      y: 35
    },
    visible: {
      rotateY: 0,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 14
      }
    }
  }

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-slate-800/40 relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <p className="text-xs font-bold text-blue-500 tracking-widest uppercase font-mono">Platform Capabilities</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Every ledger, every asset—<br />live inside your family portal.
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed">
          Eight functional modules engineered to replace your family's notebook listahan, scattered group chats, and monthly financial misunderstandings. Click features to explore.
        </p>
      </div>

      {/* 3×3 Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <TuitionTrackerCard variants={cardVariants} />
        <DebtLedgerCard variants={cardVariants} />
        <MilestoneTrackerCard variants={cardVariants} />
        <FamilyPlannerCard variants={cardVariants} />
        <SubSyncCard variants={cardVariants} />
        <HardwareAssetsCard variants={cardVariants} />
        <LiquidityVaultCard variants={cardVariants} />
        <InboundCashflowCard variants={cardVariants} />
        <ProfileSwitcherCard variants={cardVariants} />
      </motion.div>
    </section>
  )
}
