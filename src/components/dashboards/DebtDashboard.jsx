import { useState, useEffect } from 'react'
import { CreditCard, TrendingDown, AlertCircle, ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react'

function fmt(n) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n)
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${
        status === 'OVERDUE'
          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
          : 'bg-green-500/15 text-green-400 border border-green-500/25'
      }`}
    >
      {status === 'OVERDUE' ? '⚠' : '✓'} {status}
    </span>
  )
}

export default function DebtDashboard({ profile }) {
  const storageKey = `famly_debt_${profile.id}`

  // Load from localStorage or use blank state template
  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    // Default: empty slate for new users
    return []
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(debts))
  }, [debts, storageKey])

  // Form & UI States
  const [expandedRows, setExpandedRows] = useState({})
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDebt, setNewDebt] = useState({
    company: '',
    type: 'Personal Loan',
    icon: '🏦',
    principal: '',
    interestRate: '',
    monthlyPayment: '',
    remainingTotal: '',
    monthsLeft: '',
    nextDue: '',
    status: 'CURRENT',
  })

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddDebt = (e) => {
    e.preventDefault()
    const principal = parseFloat(newDebt.principal) || 0
    const remainingTotal = parseFloat(newDebt.remainingTotal) || 0
    const monthlyPayment = parseFloat(newDebt.monthlyPayment) || 0
    const interestRate = parseFloat(newDebt.interestRate) || 0
    const monthsLeft = parseInt(newDebt.monthsLeft) || 0

    // Choose visual icon class based on type
    let icon = '🏦'
    let iconBg = 'from-blue-600 to-blue-400'
    if (newDebt.type === 'Credit Card') {
      icon = '💳'
      iconBg = 'from-red-600 to-rose-400'
    } else if (newDebt.type === 'Government Loan') {
      icon = '🏛️'
      iconBg = 'from-green-600 to-emerald-400'
    } else if (newDebt.type === 'Housing Loan') {
      icon = '🏠'
      iconBg = 'from-amber-600 to-yellow-400'
    }

    const item = {
      id: Date.now(),
      company: newDebt.company,
      type: newDebt.type,
      icon,
      iconBg,
      principal,
      interestRate,
      monthlyPayment,
      remainingTotal,
      monthsLeft,
      nextDue: newDebt.nextDue || 'N/A',
      status: newDebt.status,
    }

    setDebts(prev => [...prev, item])
    setShowAddModal(false)
    setNewDebt({
      company: '',
      type: 'Personal Loan',
      icon: '🏦',
      principal: '',
      interestRate: '',
      monthlyPayment: '',
      remainingTotal: '',
      monthsLeft: '',
      nextDue: '',
      status: 'CURRENT',
    })
  }

  const handleDeleteDebt = (id, e) => {
    e.stopPropagation()
    setDebts(prev => prev.filter(d => d.id !== id))
  }

  const updateRemainingTotal = (id, newAmount) => {
    setDebts(prev => prev.map(d => {
      if (d.id === id) {
        const val = parseFloat(newAmount) || 0
        return {
          ...d,
          remainingTotal: val,
          status: val === 0 ? 'CURRENT' : d.status,
        }
      }
      return d
    }))
  }

  const updateStatus = (id, newStatus) => {
    setDebts(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, status: newStatus }
      }
      return d
    }))
  }

  // Derived calculations
  const totalRemaining = debts.reduce((s, d) => s + d.remainingTotal, 0)
  const totalMonthly = debts.reduce((s, d) => s + d.monthlyPayment, 0)
  const overdueCount = debts.filter(d => d.status === 'OVERDUE').length

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="slide-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <CreditCard size={22} className="text-rose-400" />
            Debt Ledger
          </h2>
          <p className="text-slate-400 text-sm mt-1">{profile.name}'s active debt obligations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 text-xs font-semibold transition-colors"
          >
            <Plus size={12} /> Add Debt Record
          </button>
          {overdueCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium bg-red-500/10 border-red-500/20 text-red-400 animate-pulse">
              <AlertCircle size={11} />
              {overdueCount} Overdue Account{overdueCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="slide-in grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Debt Remaining', value: fmt(totalRemaining), color: 'text-red-400', glow: 'glow-red', border: 'border-red-500/25' },
          { label: 'Monthly Obligation', value: fmt(totalMonthly), color: 'text-orange-400', glow: '', border: 'border-orange-500/25' },
          { label: 'Active Accounts', value: debts.length, color: 'text-slate-300', glow: '', border: 'border-slate-700' },
          { label: 'Overdue Accounts', value: overdueCount, color: overdueCount > 0 ? 'text-red-400' : 'text-green-400', glow: '', border: overdueCount > 0 ? 'border-red-500/25' : 'border-green-500/25' },
        ].map((s) => (
          <div key={s.label} className={`bg-slate-900 rounded-xl border ${s.border} ${s.glow} p-4`}>
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Interest Rate Warning */}
      {debts.some((d) => d.interestRate >= 30) && (
        <div className="slide-in flex items-start gap-3 px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <AlertCircle size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-orange-300">
            <span className="font-semibold">High-interest Alert:</span> Some accounts carry rates above 30%. Consider prioritizing these for early settlement.
          </p>
        </div>
      )}

      {/* Debt Table list */}
      <section className="slide-in bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_70px_120px_130px_100px_40px] gap-4 px-6 py-3 bg-slate-800/40 border-b border-slate-700/60">
          {['Creditor', 'Principal', 'Rate', 'Min. Monthly', 'Remaining', 'Status', ''].map((h) => (
            <p key={h} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-850">
          {debts.map((debt) => {
            const isExpanded = !!expandedRows[debt.id]
            return (
              <div key={debt.id} className="transition-colors hover:bg-slate-800/20">
                <div
                  onClick={() => toggleExpand(debt.id)}
                  className="px-6 py-4 flex flex-col sm:grid sm:grid-cols-[1fr_120px_70px_120px_130px_100px_40px] gap-3 sm:gap-4 items-start sm:items-center cursor-pointer select-none"
                >
                  {/* Creditor info */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${debt.iconBg} flex items-center justify-center text-lg shadow`}>
                      {debt.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{debt.company}</p>
                      <p className="text-xs text-slate-500">{debt.type}</p>
                    </div>
                  </div>

                  {/* Principal */}
                  <p className="text-sm font-medium text-slate-300 sm:block hidden">{fmt(debt.principal)}</p>

                  {/* Rate */}
                  <p className="text-sm font-semibold text-orange-400 sm:block hidden">{debt.interestRate}%</p>

                  {/* Min. Monthly */}
                  <p className="text-sm font-medium text-slate-300 sm:block hidden">{fmt(debt.monthlyPayment)}</p>

                  {/* Remaining */}
                  <div>
                    <span className="sm:hidden text-xs text-slate-500 block">Remaining: </span>
                    <input
                      type="number"
                      value={debt.remainingTotal}
                      onClick={e => e.stopPropagation()}
                      onChange={e => updateRemainingTotal(debt.id, e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-xs font-bold text-red-400 rounded px-2 py-1 w-24 text-right focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Status */}
                  <div onClick={e => e.stopPropagation()}>
                    <select
                      value={debt.status}
                      onChange={e => updateStatus(debt.id, e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-xs rounded px-1.5 py-1 text-slate-300 focus:outline-none focus:border-red-500"
                    >
                      <option value="CURRENT">CURRENT</option>
                      <option value="OVERDUE">OVERDUE</option>
                    </select>
                  </div>

                  {/* Delete button */}
                  <div className="flex items-center justify-end w-full sm:w-auto">
                    <button
                      onClick={e => handleDeleteDebt(debt.id, e)}
                      className="p-1.5 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Extended Details */}
                {isExpanded && (
                  <div className="px-6 pb-4 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-850 bg-slate-850/20">
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Months Remaining</p>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">{debt.monthsLeft} months</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Next Payment Due</p>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">{debt.nextDue}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Principal Amount</p>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">{fmt(debt.principal)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Interest Rate</p>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">{debt.interestRate}% APR</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {debts.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No debt ledger entries found. Use "Add Debt Record" to register new obligations.
            </div>
          )}
        </div>
      </section>

      {/* Add Debt Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddDebt} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 animate-fade-in">
            <h4 className="text-lg font-bold text-slate-100">Add Creditor Obligation</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Company / Institution Name</label>
                <input
                  type="text" required placeholder="e.g. BDO Unibank"
                  value={newDebt.company}
                  onChange={e => setNewDebt({...newDebt, company: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Loan Category</label>
                  <select
                    value={newDebt.type}
                    onChange={e => setNewDebt({...newDebt, type: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Government Loan">Government Loan</option>
                    <option value="Housing Loan">Housing Loan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Interest Rate (% APR)</label>
                  <input
                    type="number" required placeholder="e.g. 12" step="0.1"
                    value={newDebt.interestRate}
                    onChange={e => setNewDebt({...newDebt, interestRate: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Principal Amount</label>
                  <input
                    type="number" required
                    value={newDebt.principal}
                    onChange={e => setNewDebt({...newDebt, principal: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Remaining Balance</label>
                  <input
                    type="number" required
                    value={newDebt.remainingTotal}
                    onChange={e => setNewDebt({...newDebt, remainingTotal: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Minimum Monthly Payment</label>
                  <input
                    type="number" required
                    value={newDebt.monthlyPayment}
                    onChange={e => setNewDebt({...newDebt, monthlyPayment: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Months Remaining</label>
                  <input
                    type="number" required
                    value={newDebt.monthsLeft}
                    onChange={e => setNewDebt({...newDebt, monthsLeft: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Next Payment Due Date</label>
                <input
                  type="text" required placeholder="e.g. Jun 15, 2025"
                  value={newDebt.nextDue}
                  onChange={e => setNewDebt({...newDebt, nextDue: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                />
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
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-xs font-semibold text-white animate-pulse-subtle"
              >
                Add Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
