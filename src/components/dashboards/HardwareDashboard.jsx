import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Plus, Trash2, Monitor, Smartphone, HardDrive, DollarSign, Calendar, TrendingDown, Package } from 'lucide-react'

const ASSET_TYPES = [
  { label: 'Laptop', icon: Laptop },
  { label: 'Desktop', icon: Monitor },
  { label: 'Phone', icon: Smartphone },
  { label: 'Storage', icon: HardDrive },
  { label: 'Other', icon: Package },
]

const SAMPLE_ASSETS = [
  { id: 1, name: 'MacBook Pro 14"', type: 'Laptop', value: 1999, purchased: '2023-03', depreciation: 20 },
  { id: 2, name: 'iPhone 15 Pro', type: 'Phone', value: 1099, purchased: '2024-01', depreciation: 25 },
  { id: 3, name: 'External SSD 2TB', type: 'Storage', value: 89, purchased: '2022-06', depreciation: 10 },
]

function currentValue(asset) {
  const yearsSince = (new Date() - new Date(asset.purchased + '-01')) / (1000 * 60 * 60 * 24 * 365)
  return Math.max(0, asset.value * Math.pow(1 - asset.depreciation / 100, yearsSince))
}

export default function HardwareDashboard({ profile }) {
  const [assets, setAssets] = useState(SAMPLE_ASSETS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'Laptop', value: '', purchased: '', depreciation: 20 })

  const totalCost     = assets.reduce((a, x) => a + x.value, 0)
  const totalCurrent  = assets.reduce((a, x) => a + currentValue(x), 0)
  const totalLost     = totalCost - totalCurrent

  const handleAdd = () => {
    if (!form.name.trim() || !form.value) return
    setAssets(prev => [...prev, { id: Date.now(), ...form, value: parseFloat(form.value), depreciation: parseFloat(form.depreciation) || 20 }])
    setForm({ name: '', type: 'Laptop', value: '', purchased: '', depreciation: 20 })
    setShowForm(false)
  }

  const remove = (id) => setAssets(prev => prev.filter(a => a.id !== id))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Laptop size={18} className="text-cyan-400" />
            Hardware & Assets
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Track depreciating tech and physical assets</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-600/20 text-xs font-semibold transition-all"
        >
          <Plus size={12} /> Add Asset
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Original Cost', value: `$${totalCost.toFixed(0)}`, icon: DollarSign, color: 'text-slate-300' },
          { label: 'Current Value', value: `$${totalCurrent.toFixed(0)}`, icon: TrendingDown, color: 'text-cyan-400' },
          { label: 'Depreciated', value: `$${totalLost.toFixed(0)}`, icon: Calendar, color: 'text-rose-400' },
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
              className="col-span-2 bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
              placeholder="Asset name"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
            <select
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/40 transition-colors"
              value={form.type}
              onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
            >
              {ASSET_TYPES.map(t => <option key={t.label}>{t.label}</option>)}
            </select>
            <input
              type="number"
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
              placeholder="Purchase price ($)"
              value={form.value}
              onChange={e => setForm(p => ({ ...p, value: e.target.value }))}
            />
            <input
              type="month"
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/40 transition-colors"
              value={form.purchased}
              onChange={e => setForm(p => ({ ...p, purchased: e.target.value }))}
            />
            <input
              type="number"
              className="bg-[#090A0F] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
              placeholder="Annual depreciation %"
              value={form.depreciation}
              onChange={e => setForm(p => ({ ...p, depreciation: e.target.value }))}
            />
            <div className="col-span-2 flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-lg border border-white/5 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all">Add</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assets Table */}
      <div className="bg-[#16181D] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Asset Registry</span>
          <span className="text-[10px] text-slate-600">{assets.length} assets</span>
        </div>
        <div className="divide-y divide-white/[0.03]">
          <AnimatePresence>
            {assets.map(asset => {
              const cur = currentValue(asset)
              const pct = ((cur / asset.value) * 100).toFixed(0)
              const TypeIcon = ASSET_TYPES.find(t => t.label === asset.type)?.icon || Package
              return (
                <motion.div
                  key={asset.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <div className="w-8 h-8 rounded-md bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <TypeIcon size={13} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{asset.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{asset.type} · Purchased {asset.purchased}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-cyan-400">${cur.toFixed(0)}</p>
                    <p className="text-[10px] text-slate-500">{pct}% of ${asset.value}</p>
                  </div>
                  <button onClick={() => remove(asset.id)} className="p-1 rounded text-slate-600 hover:text-rose-400 transition-colors">
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
