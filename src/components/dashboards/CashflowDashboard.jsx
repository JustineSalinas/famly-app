import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Plus, Trash2, ArrowUpRight, DollarSign, Calendar, Repeat } from 'lucide-react'

const INCOME_TYPES = ['Salary', 'Freelance', 'Rental', 'Investment', 'Side Business', 'Other']
const FREQUENCIES  = ['Monthly', 'Bi-Weekly', 'Weekly', 'Quarterly', 'Annually']

const SAMPLE_STREAMS = [
  { id: 1, source: 'Primary Salary',    amount: 4500, type: 'Salary',     frequency: 'Monthly' },
  { id: 2, source: 'Freelance Design',  amount: 1200, type: 'Freelance',  frequency: 'Monthly' },
  { id: 3, source: 'Rental Income',     amount: 800,  type: 'Rental',     frequency: 'Monthly' },
]

function toMonthly(stream) {
  if (stream.frequency === 'Monthly')    return stream.amount
  if (stream.frequency === 'Bi-Weekly')  return stream.amount * 2.167
  if (stream.frequency === 'Weekly')     return stream.amount * 4.333
  if (stream.frequency === 'Quarterly')  return stream.amount / 3
  if (stream.frequency === 'Annually')   return stream.amount / 12
  return stream.amount
}

export default function CashflowDashboard({ profile }) {
  const [streams, setStreams] = useState(SAMPLE_STREAMS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ source: '', amount: '', type: 'Salary', frequency: 'Monthly' })

  const totalMonthly = streams.reduce((a, s) => a + toMonthly(s), 0)
  const totalYearly  = totalMonthly * 12

  const typeColors = {
    Salary: 'text-blue-400 bg-blue-600/10 border-blue-500/20',
    Freelance: 'text-violet-400 bg-violet-600/10 border-violet-500/20',
    Rental: 'text-amber-400 bg-amber-600/10 border-amber-500/20',
    Investment: 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20',
    'Side Business': 'text-rose-400 bg-rose-600/10 border-rose-500/20',
    Other: 'text-slate-400 bg-slate-600/10 border-slate-500/20',
  }

  const handleAdd = () => {
    if (!form.source.trim() || !form.amount) return
    setStreams(prev => [...prev, { id: Date.now(), ...form, amount: parseFloat(form.amount) }])
    setForm({ source: '', amount: '', type: 'Salary', frequency: 'Monthly' })
    setShowForm(false)
  }

  const remove = (id) => setStreams(prev => prev.filter(s => s.id !== id))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-400" />
            Inbound Cashflow
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Map all income streams and recurring inflows</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 text-xs font-semibold transition-all"
        >
          <Plus size={12} /> Add Stream
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Monthly Inflow', value: `$${totalMonthly.toFixed(0)}`, icon: ArrowUpRight, color: 'text-blue-400' },
          { label: 'Annual Projection', value: `$${totalYearly.toFixed(0)}`, icon: Calendar, color: 'text-emerald-400' },
          { label: 'Income Streams', value: streams.length, icon: Repeat, color: 'text-violet-400' },
        ].map(card => (
          <div key={card.label} className="bg-[#16181D] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{card.label}</span>
              <card.icon size={13} className={card.color} />
            </div>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
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
              className="col-span-2 bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
              placeholder="Income source"
              value={form.source}
              onChange={e => setForm(p => ({ ...p, source: e.target.value }))}
            />
            <input
              type="number"
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
              placeholder="Amount ($)"
              value={form.amount}
              onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
            />
            <select
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/40 transition-colors"
              value={form.type}
              onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
            >
              {INCOME_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select
              className="col-span-2 bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/40 transition-colors"
              value={form.frequency}
              onChange={e => setForm(p => ({ ...p, frequency: e.target.value }))}
            >
              {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
            </select>
            <div className="col-span-2 flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-lg border border-white/5 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all">Add</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cashflow Breakdown */}
      <div className="bg-[#16181D] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Income Streams</span>
        </div>
        <div className="divide-y divide-white/[0.03]">
          <AnimatePresence>
            {streams.map(stream => {
              const monthly = toMonthly(stream)
              const pct = totalMonthly > 0 ? (monthly / totalMonthly) * 100 : 0
              const colorClass = typeColors[stream.type] || typeColors.Other
              return (
                <motion.div
                  key={stream.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <div className={`w-7 h-7 rounded-md border flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <ArrowUpRight size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{stream.source}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500">{stream.frequency}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${colorClass}`}>{stream.type}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-blue-400">${monthly.toFixed(0)}<span className="text-[10px] text-slate-500 font-normal">/mo</span></p>
                    <p className="text-[10px] text-slate-500">{pct.toFixed(0)}% of total</p>
                  </div>
                  {/* Sparkline bar */}
                  <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden flex-shrink-0">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    />
                  </div>
                  <button onClick={() => remove(stream.id)} className="p-1 rounded text-slate-600 hover:text-rose-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
