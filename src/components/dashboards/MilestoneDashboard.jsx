import { useState, useEffect } from 'react'
import { TrendingUp, Home, PlusCircle, Calendar, Edit2, Plus, Trash2 } from 'lucide-react'

function fmt(n) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n)
}

function ProgressRing({ pct }) {
  const radius = 88
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
        {/* Track */}
        <circle cx="110" cy="110" r={radius} fill="none" stroke="#1E293B" strokeWidth="18" />
        {/* Glow */}
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke="rgba(234,179,8,0.15)"
          strokeWidth="22"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        {/* Arc */}
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="16"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-black text-yellow-400">{pct}%</p>
        <p className="text-xs text-slate-400 mt-1">of goal</p>
      </div>
    </div>
  )
}

function MiniBar({ value, max, month }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full h-16 bg-slate-800 rounded-md relative flex items-end overflow-hidden">
        <div
          className="w-full bg-gradient-to-t from-yellow-500 to-orange-400 rounded-md transition-all duration-700"
          style={{ height: `${pct}%` }}
        />
      </div>
      <p className="text-slate-500 text-xs">{month.split(' ')[0].slice(0, 3)}</p>
    </div>
  )
}

export default function MilestoneDashboard({ profile }) {
  const storageKey = `salinas_milestone_${profile.id}`

  // Load from localStorage or use blank state template
  const [goal, setGoal] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    return {
      name: '',
      target: 0,
      saved: 0,
      monthlyContribution: 0,
      targetDate: '',
      contributions: [],
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(goal))
  }, [goal, storageKey])

  // Modals & Form states
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [goalForm, setGoalForm] = useState({
    name: '',
    target: '',
    saved: '',
    monthlyContribution: '',
    targetDate: '',
  })

  const [showContribModal, setShowContribModal] = useState(false)
  const [contribForm, setContribForm] = useState({
    month: '',
    amount: '',
  })

  const openGoalModal = () => {
    setGoalForm({
      name: goal.name,
      target: goal.target,
      saved: goal.saved,
      monthlyContribution: goal.monthlyContribution,
      targetDate: goal.targetDate,
    })
    setShowGoalModal(true)
  }

  const handleSaveGoal = (e) => {
    e.preventDefault()
    setGoal(prev => ({
      ...prev,
      name: goalForm.name,
      target: parseFloat(goalForm.target) || 0,
      saved: parseFloat(goalForm.saved) || 0,
      monthlyContribution: parseFloat(goalForm.monthlyContribution) || 0,
      targetDate: goalForm.targetDate,
    }))
    setShowGoalModal(false)
  }

  const handleAddContrib = (e) => {
    e.preventDefault()
    const amt = parseFloat(contribForm.amount) || 0
    const newContrib = {
      month: contribForm.month,
      amount: amt,
    }
    setGoal(prev => ({
      ...prev,
      saved: prev.saved + amt,
      contributions: [...prev.contributions, newContrib],
    }))
    setShowContribModal(false)
    setContribForm({ month: '', amount: '' })
  }

  const handleDeleteContrib = (index) => {
    const amt = goal.contributions[index].amount
    setGoal(prev => ({
      ...prev,
      saved: Math.max(0, prev.saved - amt),
      contributions: prev.contributions.filter((_, i) => i !== index),
    }))
  }

  const pct = goal.target > 0 ? Math.round((goal.saved / goal.target) * 100) : 0
  const remaining = Math.max(0, goal.target - goal.saved)
  const monthsLeft = goal.monthlyContribution > 0 ? Math.ceil(remaining / goal.monthlyContribution) : 0
  const maxContrib = goal.contributions.length > 0 ? Math.max(...goal.contributions.map(c => c.amount)) : 0

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="slide-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Home size={22} className="text-yellow-400" />
            Milestone Tracker
          </h2>
          <p className="text-slate-400 text-sm mt-1">Goal tracking & savings dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openGoalModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Edit2 size={12} /> Edit Goal Setup
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium bg-yellow-500/10 border-yellow-500/20 text-yellow-400">
            <TrendingUp size={11} />
            On Track
          </div>
        </div>
      </div>

      {/* Main Goal Progress Panel */}
      <section className="slide-in bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden glow-yellow">
        <div className="px-5 py-5 border-b border-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
              <Home size={18} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">{goal.name || 'Setup savings goal name'}</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <Calendar size={10} /> Target Date: {goal.targetDate || 'No deadline set'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <ProgressRing pct={pct} />
          </div>

          <div className="flex-1 w-full space-y-3.5">
            {[
              { label: 'Target Amount', value: fmt(goal.target), color: 'text-slate-300', bg: 'bg-slate-800/40' },
              { label: 'Total Saved So Far', value: fmt(goal.saved), color: 'text-yellow-400', bg: 'bg-yellow-500/5' },
              { label: 'Remaining Balance Required', value: fmt(remaining), color: 'text-orange-400', bg: 'bg-orange-500/5' },
              { label: 'Target Monthly Contribution', value: fmt(goal.monthlyContribution), color: 'text-slate-300', bg: 'bg-slate-800/40' },
              { label: 'Est. Months to Target', value: monthsLeft > 0 ? `~${monthsLeft} months` : 'N/A', color: 'text-slate-300', bg: 'bg-slate-800/40' },
            ].map((s) => (
              <div key={s.label} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${s.bg} border border-slate-800`}>
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bar */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>₱0</span>
            <span>{fmt(goal.target)}</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #F59E0B, #F97316)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Contributions Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Chart */}
        <section className="slide-in bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2 mb-4">
              <TrendingUp size={15} className="text-yellow-400" />
              Contribution Performance
            </h3>
          </div>
          {goal.contributions.length > 0 ? (
            <div className="flex gap-2 items-end h-24">
              {goal.contributions.map((c, i) => (
                <MiniBar key={i} value={c.amount} max={maxContrib} month={c.month} />
              ))}
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center text-slate-600 text-xs italic">
              No contributions recorded. Add one using the form.
            </div>
          )}
        </section>

        {/* Right: List & Delete option */}
        <section className="slide-in bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-100 text-sm">Recent Ledger</h3>
            <button
              onClick={() => setShowContribModal(true)}
              className="text-xs text-yellow-400 font-bold hover:underline flex items-center gap-1"
            >
              <Plus size={12} /> Add Deposit
            </button>
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {goal.contributions.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-800/40 text-xs">
                <div>
                  <p className="font-medium text-slate-200">{c.month}</p>
                  <p className="text-[10px] text-slate-500">Savings Deposit</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-yellow-400">{fmt(c.amount)}</span>
                  <button
                    onClick={() => handleDeleteContrib(i)}
                    className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-slate-700 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
            {goal.contributions.length === 0 && (
              <p className="text-center text-slate-500 text-xs py-4">No deposits tracked yet.</p>
            )}
          </div>
        </section>
      </div>

      {/* Modals */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveGoal} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 animate-fade-in">
            <h4 className="text-lg font-bold text-slate-100">Savings Goal Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Goal Label Name</label>
                <input
                  type="text" required
                  value={goalForm.name}
                  onChange={e => setGoalForm({...goalForm, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Saving</label>
                  <input
                    type="number" required
                    value={goalForm.target}
                    onChange={e => setGoalForm({...goalForm, target: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Current Saved Base</label>
                  <input
                    type="number" required
                    value={goalForm.saved}
                    onChange={e => setGoalForm({...goalForm, saved: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Monthly Target</label>
                  <input
                    type="number" required
                    value={goalForm.monthlyContribution}
                    onChange={e => setGoalForm({...goalForm, monthlyContribution: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Month/Year</label>
                  <input
                    type="text" required placeholder="e.g. December 2028"
                    value={goalForm.targetDate}
                    onChange={e => setGoalForm({...goalForm, targetDate: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button" onClick={() => setShowGoalModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-xs font-semibold text-slate-950"
              >
                Update Goal
              </button>
            </div>
          </form>
        </div>
      )}

      {showContribModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddContrib} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h4 className="text-lg font-bold text-slate-100">Add Savings Contribution</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Month Period</label>
                <input
                  type="text" required placeholder="e.g. Jan 2025"
                  value={contribForm.month}
                  onChange={e => setContribForm({...contribForm, month: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Deposit Amount</label>
                <input
                  type="number" required
                  value={contribForm.amount}
                  onChange={e => setContribForm({...contribForm, amount: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button" onClick={() => setShowContribModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-xs font-semibold text-slate-950"
              >
                Record Deposit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
