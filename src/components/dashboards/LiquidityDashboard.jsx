import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Plus, Trash2, TrendingUp, DollarSign, Percent, Lock } from 'lucide-react'

const VAULT_TYPES = ['Emergency Fund', 'Savings Account', 'Money Market', 'Certificate of Deposit', 'Other']

const SAMPLE_VAULTS = [
  { id: 1, name: 'Emergency Fund', type: 'Emergency Fund', balance: 12500, target: 20000, apy: 4.5, locked: false },
  { id: 2, name: 'High-Yield Savings', type: 'Savings Account', balance: 8200, target: 15000, apy: 5.1, locked: false },
  { id: 3, name: '6-Month CD', type: 'Certificate of Deposit', balance: 5000, target: 5000, apy: 5.5, locked: true },
]

export default function LiquidityDashboard({ profile }) {
  const [vaults, setVaults] = useState(SAMPLE_VAULTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'Emergency Fund', balance: '', target: '', apy: '', locked: false })

  const totalBalance = vaults.reduce((a, v) => a + v.balance, 0)
  const totalTarget  = vaults.reduce((a, v) => a + v.target, 0)
  const weightedApy  = vaults.length > 0
    ? vaults.reduce((a, v) => a + v.apy * v.balance, 0) / totalBalance
    : 0

  const handleAdd = () => {
    if (!form.name.trim() || !form.balance) return
    setVaults(prev => [...prev, {
      id: Date.now(), ...form,
      balance: parseFloat(form.balance),
      target:  parseFloat(form.target) || parseFloat(form.balance),
      apy:     parseFloat(form.apy) || 0,
    }])
    setForm({ name: '', type: 'Emergency Fund', balance: '', target: '', apy: '', locked: false })
    setShowForm(false)
  }

  const remove = (id) => setVaults(prev => prev.filter(v => v.id !== id))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Shield size={18} className="text-emerald-400" />
            Liquidity Vault
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage liquid reserves, emergency funds, and savings accounts</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20 text-xs font-semibold transition-all"
        >
          <Plus size={12} /> Add Vault
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Liquid', value: `$${totalBalance.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Target', value: `$${totalTarget.toLocaleString()}`, icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Blended APY', value: `${weightedApy.toFixed(2)}%`, icon: Percent, color: 'text-amber-400' },
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
            className="bg-[#16181D] border border-white/5 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            <input className="col-span-2 sm:col-span-3 bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="Vault name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <select className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/40 transition-colors" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
              {VAULT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <input type="number" className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="Current balance ($)" value={form.balance} onChange={e => setForm(p => ({ ...p, balance: e.target.value }))} />
            <input type="number" className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="APY (%)" value={form.apy} onChange={e => setForm(p => ({ ...p, apy: e.target.value }))} />
            <div className="col-span-2 sm:col-span-3 flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-lg border border-white/5 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all">Add</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vaults List */}
      <div className="space-y-3">
        <AnimatePresence>
          {vaults.map(vault => {
            const pct = Math.min(100, (vault.balance / vault.target) * 100)
            return (
              <motion.div
                key={vault.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="bg-[#16181D] border border-white/5 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      {vault.locked
                        ? <Lock size={13} className="text-amber-400" />
                        : <Shield size={13} className="text-emerald-400" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{vault.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{vault.type} · {vault.apy}% APY</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-400">${vault.balance.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500">of ${vault.target.toLocaleString()}</p>
                    </div>
                    <button onClick={() => remove(vault.id)} className="p-1 rounded text-slate-600 hover:text-rose-400 transition-colors ml-1">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.1 }}
                  />
                </div>
                <p className="text-[10px] text-slate-600 mt-1.5">{pct.toFixed(0)}% of goal</p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
