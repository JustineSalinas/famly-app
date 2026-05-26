import { useState, useEffect } from 'react'
import { Plus, Trash2, ArrowRight, ArrowLeft, Check, ClipboardList, Lightbulb, PlayCircle, CheckCircle2 } from 'lucide-react'

function fmt(n) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n)
}

export default function PlannerDashboard({ profile }) {
  const storageKey = `famly_plans_${profile.id}`

  // Load from localStorage or use blank state template
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    // Default initial blank template
    return []
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(plans))
  }, [plans, storageKey])

  // Form states
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    category: 'Finance',
    budget: '',
    targetDate: '',
    status: 'IDEA', // IDEA, ACTIVE, DONE
  })

  const handleAddPlan = (e) => {
    e.preventDefault()
    const item = {
      id: Date.now(),
      title: newPlan.title,
      description: newPlan.description,
      category: newPlan.category,
      budget: parseFloat(newPlan.budget) || 0,
      targetDate: newPlan.targetDate || 'TBD',
      status: newPlan.status,
    }
    setPlans(prev => [...prev, item])
    setShowAddModal(false)
    setNewPlan({
      title: '',
      description: '',
      category: 'Finance',
      budget: '',
      targetDate: '',
      status: 'IDEA',
    })
  }

  const handleDeletePlan = (id) => {
    setPlans(prev => prev.filter(p => p.id !== id))
  }

  const updatePlanStatus = (id, newStatus) => {
    setPlans(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: newStatus }
      }
      return p
    }))
  }

  // Column groupings
  const ideas = plans.filter(p => p.status === 'IDEA')
  const active = plans.filter(p => p.status === 'ACTIVE')
  const done = plans.filter(p => p.status === 'DONE')

  // Calculated Stats
  const totalBudgetActive = active.reduce((s, p) => s + p.budget, 0)
  const totalBudgetIdeas = ideas.reduce((s, p) => s + p.budget, 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="slide-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ClipboardList size={22} className="text-emerald-400" />
            Family Planner & Ideas Board
          </h2>
          <p className="text-slate-400 text-sm mt-1">Compile and structure family project plans, budgets, and future ideas</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 text-xs font-semibold transition-colors"
        >
          <Plus size={14} /> Add New Plan / Idea
        </button>
      </div>

      {/* Stats Summary cards */}
      <div className="slide-in grid grid-cols-3 gap-4">
        {[
          { label: 'Unscheduled Ideas', count: ideas.length, value: fmt(totalBudgetIdeas), border: 'border-yellow-500/25', text: 'text-yellow-400' },
          { label: 'Active Executing Plans', count: active.length, value: fmt(totalBudgetActive), border: 'border-emerald-500/25', text: 'text-emerald-400' },
          { label: 'Archived / Done', count: done.length, value: `${done.length} Projects Completed`, border: 'border-slate-800', text: 'text-slate-400' },
        ].map((s, idx) => (
          <div key={idx} className={`bg-slate-900 rounded-xl border ${s.border} p-4`}>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{s.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-100">{s.count}</span>
              <span className={`text-xs font-semibold ${s.text}`}>{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board Columns */}
      <div className="slide-in grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Brainstorm / Ideas */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-4 flex flex-col min-h-[50vh]">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-850">
            <div className="w-6 h-6 rounded-md bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <Lightbulb size={14} />
            </div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Brainstorm & Ideas ({ideas.length})</h3>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[55vh] pr-1">
            {ideas.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-850 rounded-xl p-3.5 hover:border-slate-750 transition-all space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <button
                    onClick={() => handleDeletePlan(p.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{p.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.description || 'No notes added.'}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-850">
                  <span>Est: {fmt(p.budget)}</span>
                  <span>Due: {p.targetDate}</span>
                </div>
                <div className="pt-2 flex justify-end gap-1.5">
                  <button
                    onClick={() => updatePlanStatus(p.id, 'ACTIVE')}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold transition-all"
                  >
                    Activate <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
            {ideas.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center text-slate-600 text-xs italic">
                No unscheduled ideas. Click "Add New Plan" to list a brainstorm idea.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Active Execution */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-4 flex flex-col min-h-[50vh]">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-850">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <PlayCircle size={14} />
            </div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Execution ({active.length})</h3>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[55vh] pr-1">
            {active.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-850 rounded-xl p-3.5 hover:border-slate-750 transition-all space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <button
                    onClick={() => handleDeletePlan(p.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{p.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.description || 'No notes added.'}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-850">
                  <span>Budget: {fmt(p.budget)}</span>
                  <span>Target: {p.targetDate}</span>
                </div>
                <div className="pt-2 flex justify-between gap-1.5">
                  <button
                    onClick={() => updatePlanStatus(p.id, 'IDEA')}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-400 text-[10px] font-bold transition-all"
                  >
                    <ArrowLeft size={10} /> Idea
                  </button>
                  <button
                    onClick={() => updatePlanStatus(p.id, 'DONE')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[10px] font-bold transition-all"
                  >
                    Mark Done <Check size={10} />
                  </button>
                </div>
              </div>
            ))}
            {active.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center text-slate-600 text-xs italic">
                No active plans currently executing. Move ideas here to execute.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Done & Completed */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-4 flex flex-col min-h-[50vh]">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-850">
            <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-slate-400">
              <CheckCircle2 size={14} />
            </div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Archived / Completed ({done.length})</h3>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[55vh] pr-1">
            {done.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-850 rounded-xl p-3.5 hover:border-slate-750 transition-all space-y-2 opacity-65">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-800 border border-slate-750 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <button
                    onClick={() => handleDeletePlan(p.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 line-through">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{p.description}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-600 pt-2 border-t border-slate-850">
                  <span>Spent: {fmt(p.budget)}</span>
                  <span>Done Date: {p.targetDate}</span>
                </div>
                <div className="pt-2 flex justify-start gap-1.5">
                  <button
                    onClick={() => updatePlanStatus(p.id, 'ACTIVE')}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-400 text-[10px] font-bold transition-all"
                  >
                    <ArrowLeft size={10} /> Re-activate
                  </button>
                </div>
              </div>
            ))}
            {done.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center text-slate-600 text-xs italic">
                No archived projects. Completed family projects will show here.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddPlan} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 animate-fade-in">
            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <ClipboardList size={18} className="text-emerald-400" />
              Compile New Idea / Plan
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Project / Idea Title</label>
                <input
                  type="text" required placeholder="e.g. Install Solar Panels"
                  value={newPlan.title}
                  onChange={e => setNewPlan({...newPlan, title: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Description / Notes (Explain clearly)</label>
                <textarea
                  placeholder="Details of the idea, who will do it, potential issues..."
                  value={newPlan.description} rows={3}
                  onChange={e => setNewPlan({...newPlan, description: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Category Category</label>
                  <select
                    value={newPlan.category}
                    onChange={e => setNewPlan({...newPlan, category: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Finance">Finance</option>
                    <option value="Household">Household</option>
                    <option value="Investment">Investment</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Project Status</label>
                  <select
                    value={newPlan.status}
                    onChange={e => setNewPlan({...newPlan, status: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="IDEA">Brainstorm Idea</option>
                    <option value="ACTIVE">Active Plan</option>
                    <option value="DONE">Completed Project</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Budget Allocation (PHP)</label>
                  <input
                    type="number" required placeholder="e.g. 50000"
                    value={newPlan.budget}
                    onChange={e => setNewPlan({...newPlan, budget: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Date / TBD</label>
                  <input
                    type="text" placeholder="e.g. Q4 2026"
                    value={newPlan.targetDate}
                    onChange={e => setNewPlan({...newPlan, targetDate: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button" onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-xs font-semibold text-slate-950"
              >
                Compile Plan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
