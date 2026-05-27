import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plug, Plus, Trash2, ToggleLeft, ToggleRight, DollarSign, Calendar, Tag, TrendingDown } from 'lucide-react'

const CYCLES = ['Monthly', 'Yearly', 'Weekly']
const CATEGORIES = ['Streaming', 'Cloud', 'Utility', 'Software', 'Other']

const SAMPLE_SUBS = [
  { id: 1, name: 'Netflix', amount: 15.99, cycle: 'Monthly', category: 'Streaming', active: true },
  { id: 2, name: 'iCloud Storage', amount: 2.99, cycle: 'Monthly', category: 'Cloud', active: true },
  { id: 3, name: 'Spotify', amount: 9.99, cycle: 'Monthly', category: 'Streaming', active: false },
  { id: 4, name: 'Adobe CC', amount: 54.99, cycle: 'Monthly', category: 'Software', active: true },
]

function totalMonthly(subs) {
  return subs
    .filter(s => s.active)
    .reduce((acc, s) => {
      if (s.cycle === 'Monthly') return acc + s.amount
      if (s.cycle === 'Yearly')  return acc + s.amount / 12
      if (s.cycle === 'Weekly')  return acc + s.amount * 4
      return acc
    }, 0)
}

export default function SubSyncDashboard({ profile }) {
  const [subs, setSubs] = useState(SAMPLE_SUBS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', cycle: 'Monthly', category: 'Streaming' })

  const monthly = totalMonthly(subs)
  const yearly = monthly * 12

  const handleAdd = () => {
    if (!form.name.trim() || !form.amount) return
    setSubs(prev => [...prev, { id: Date.now(), ...form, amount: parseFloat(form.amount), active: true }])
    setForm({ name: '', amount: '', cycle: 'Monthly', category: 'Streaming' })
    setShowForm(false)
  }

  const toggle = (id) => setSubs(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
  const remove  = (id) => setSubs(prev => prev.filter(s => s.id !== id))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Plug size={18} className="text-violet-400" />
            SubSync / Utilities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Track recurring subscriptions and household utilities</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/10 border border-violet-500/20 text-violet-400 hover:bg-violet-600/20 text-xs font-semibold transition-all"
        >
          <Plus size={12} /> Add Subscription
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Monthly Burn', value: `$${monthly.toFixed(2)}`, sub: 'Active subs only', icon: TrendingDown, color: 'text-rose-400' },
          { label: 'Projected Yearly', value: `$${yearly.toFixed(2)}`, sub: 'Annualized cost', icon: Calendar, color: 'text-amber-400' },
          { label: 'Active Count', value: subs.filter(s => s.active).length, sub: `of ${subs.length} total`, icon: Plug, color: 'text-violet-400' },
        ].map(card => (
          <div key={card.label} className="bg-[#16181D] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{card.label}</span>
              <card.icon size={13} className={card.color} />
            </div>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-[10px] text-slate-600">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-[#16181D] border border-white/5 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <input
              className="col-span-2 sm:col-span-2 bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/40 transition-colors"
              placeholder="Service name"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
            <input
              type="number"
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/40 transition-colors"
              placeholder="Amount ($)"
              value={form.amount}
              onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
            />
            <select
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-violet-500/40 transition-colors"
              value={form.cycle}
              onChange={e => setForm(p => ({ ...p, cycle: e.target.value }))}
            >
              {CYCLES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              className="col-span-2 bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-violet-500/40 transition-colors"
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="col-span-2 flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-lg border border-white/5 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold transition-all">Add</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscriptions List */}
      <div className="bg-[#16181D] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Subscriptions</span>
          <span className="text-[10px] text-slate-600">{subs.length} entries</span>
        </div>
        <div className="divide-y divide-white/[0.03]">
          <AnimatePresence>
            {subs.map(sub => (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: sub.active ? 1 : 0.4, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="w-7 h-7 rounded-md bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Plug size={12} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{sub.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-500">{sub.cycle}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">{sub.category}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-200">${sub.amount.toFixed(2)}</p>
                <button onClick={() => toggle(sub.id)} className="p-1 rounded transition-colors">
                  {sub.active
                    ? <ToggleRight size={18} className="text-violet-400" />
                    : <ToggleLeft  size={18} className="text-slate-600" />
                  }
                </button>
                <button onClick={() => remove(sub.id)} className="p-1 rounded text-slate-600 hover:text-rose-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
