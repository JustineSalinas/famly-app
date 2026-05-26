import { useState, useEffect } from 'react'
import { AlertTriangle, BookOpen, CheckCircle2, Clock, Plus, Trash2, Edit2, Check } from 'lucide-react'

function fmt(n) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n)
}

function ProgressBar({ pct, color }) {
  return (
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  )
}

export default function TuitionDashboard({ profile }) {
  const storageKey = `salinas_tuition_${profile.id}`

  // Load from localStorage or use blank state template
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    // Default initial template based on profile
    const isAJ = profile.id === 'adrian'
    const isKeisha = profile.id === 'keisha'
    return {
      school: isAJ || isKeisha ? 'University of San Agustin' : 'Central Philippine University',
      degree: isAJ ? 'BS Information Technology' : isKeisha ? 'BS Medical Technology' : 'BS Computer Science',
      year: isAJ ? '2nd Year' : isKeisha ? '1st Year' : '3rd Year',
      schoolStart: isAJ || isKeisha ? 'July 13' : '',
      color: profile.id === 'la' ? 'purple' : profile.id === 'keisha' ? 'cyan' : 'blue',
      historicalUnpaid: [],
      currentSemester: {
        label: '',
        totalAssessment: 0,
        downpayment: { required: 0, paid: 0 },
        installments: [],
      },
    }
  })

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data))
  }, [data, storageKey])

  // Form states
  const [showSchoolModal, setShowSchoolModal] = useState(false)
  const [schoolForm, setSchoolForm] = useState({
    school: '',
    degree: '',
    year: '',
    schoolStart: '',
  })

  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [historyForm, setHistoryForm] = useState({
    term: '',
    amount: '',
    paid: '',
    dueDate: '',
    status: 'UNPAID',
  })

  const [showSemesterModal, setShowSemesterModal] = useState(false)
  const [semesterForm, setSemesterForm] = useState({
    label: '',
    totalAssessment: '',
    dpRequired: '',
    dpPaid: '',
    numInstallments: '3',
  })

  // Open modals with pre-filled state
  const openSchoolModal = () => {
    setSchoolForm({
      school: data.school,
      degree: data.degree,
      year: data.year,
      schoolStart: data.schoolStart || '',
    })
    setShowSchoolModal(true)
  }

  const openSemesterModal = () => {
    setSemesterForm({
      label: data.currentSemester.label || '',
      totalAssessment: data.currentSemester.totalAssessment || '',
      dpRequired: data.currentSemester.downpayment.required || '',
      dpPaid: data.currentSemester.downpayment.paid || '',
      numInstallments: data.currentSemester.installments.length || '3',
    })
    setShowSemesterModal(true)
  }

  // Handlers
  const handleSaveSchool = (e) => {
    e.preventDefault()
    setData(prev => ({
      ...prev,
      ...schoolForm,
    }))
    setShowSchoolModal(false)
  }

  const handleAddHistory = (e) => {
    e.preventDefault()
    const amt = parseFloat(historyForm.amount) || 0
    const pd = parseFloat(historyForm.paid) || 0
    const newRecord = {
      term: historyForm.term,
      amount: amt,
      paid: pd,
      dueDate: historyForm.dueDate,
      status: pd >= amt ? 'PAID' : pd > 0 ? 'PARTIAL' : 'UNPAID',
    }
    setData(prev => ({
      ...prev,
      historicalUnpaid: [...prev.historicalUnpaid, newRecord],
    }))
    setShowHistoryModal(false)
    setHistoryForm({ term: '', amount: '', paid: '', dueDate: '', status: 'UNPAID' })
  }

  const handleDeleteHistory = (index) => {
    setData(prev => ({
      ...prev,
      historicalUnpaid: prev.historicalUnpaid.filter((_, i) => i !== index),
    }))
  }

  const handleSaveSemester = (e) => {
    e.preventDefault()
    const total = parseFloat(semesterForm.totalAssessment) || 0
    const dpReq = parseFloat(semesterForm.dpRequired) || 0
    const dpPd = parseFloat(semesterForm.dpPaid) || 0
    const instCount = parseInt(semesterForm.numInstallments) || 3

    // Distribute remaining amount among installments
    const remaining = total - dpPd
    const instAmt = Math.max(0, Math.round(remaining / instCount))

    const installments = Array.from({ length: instCount }, (_, i) => ({
      label: `Installment ${i + 1}`,
      amount: instAmt,
      paid: false,
    }))

    setData(prev => ({
      ...prev,
      currentSemester: {
        label: semesterForm.label,
        totalAssessment: total,
        downpayment: { required: dpReq, paid: dpPd },
        installments,
      },
    }))
    setShowSemesterModal(false)
  }

  const toggleInstallment = (index) => {
    setData(prev => {
      const list = [...prev.currentSemester.installments]
      list[index] = { ...list[index], paid: !list[index].paid }
      return {
        ...prev,
        currentSemester: {
          ...prev.currentSemester,
          installments: list,
        },
      }
    })
  }

  const handleQuickPayment = (amount) => {
    setData(prev => {
      const dpPaid = Math.min(prev.currentSemester.downpayment.required, prev.currentSemester.downpayment.paid + amount)
      return {
        ...prev,
        currentSemester: {
          ...prev.currentSemester,
          downpayment: {
            ...prev.currentSemester.downpayment,
            paid: dpPaid,
          },
        },
      }
    })
  }

  // Calculations
  const totalUnpaid = data.historicalUnpaid.reduce((sum, r) => sum + r.amount - (r.paid || 0), 0)
  const { currentSemester: cs } = data
  const totalPaid = cs.downpayment.paid + cs.installments.filter(i => i.paid).reduce((s, i) => s + i.amount, 0)
  const paidPct = cs.totalAssessment > 0 ? Math.round((totalPaid / cs.totalAssessment) * 100) : 0

  const colors = data.color === 'purple'
    ? { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30', bar: 'bg-purple-500' }
    : data.color === 'cyan'
    ? { badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', bar: 'bg-cyan-500' }
    : { badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30', bar: 'bg-blue-500' }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="slide-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen size={22} className="text-blue-400" />
            Tuition Tracker
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {data.school} &nbsp;·&nbsp; {data.degree} &nbsp;·&nbsp; {data.year}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openSchoolModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Edit2 size={12} /> Edit School Info
          </button>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${colors.badge}`}>
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-current inline-block" />
            {data.schoolStart ? `Starts: ${data.schoolStart}` : 'Enrollment Setup'}
          </div>
        </div>
      </div>

      {/* Historical Unpaid Balances */}
      <section className="slide-in bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-sm">Historical Outstanding Balances</h3>
              <p className="text-xs text-slate-500 mt-0.5">Previous semester outstanding debts</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 hover:bg-red-500/25 text-red-400 text-xs font-semibold transition-colors"
          >
            <Plus size={12} /> Add Balances
          </button>
        </div>

        {data.historicalUnpaid.length > 0 ? (
          <div className="divide-y divide-slate-850">
            {data.historicalUnpaid.map((row, i) => {
              const balance = row.amount - (row.paid || 0)
              return (
                <div key={i} className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/10 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">{row.term}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> Due: {row.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Unpaid Balance</p>
                      <p className="text-sm font-bold text-red-400">{fmt(balance)}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteHistory(i)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            No historical unpaid balances recorded. Click "Add Balances" to add records.
          </div>
        )}
      </section>

      {/* Current Semester Assessment Setup / View */}
      <section className="slide-in bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-850 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">Current Semester Payments</h3>
            <p className="text-xs text-slate-500 mt-0.5">{cs.label || 'No active semester set'}</p>
          </div>
          <button
            onClick={openSemesterModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/25 text-blue-400 text-xs font-semibold transition-colors"
          >
            {cs.label ? 'Modify Setup' : 'Setup Semester'}
          </button>
        </div>

        {cs.totalAssessment > 0 ? (
          <div>
            {/* Overall progress */}
            <div className="px-5 py-4 border-b border-slate-850">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-400">Payment Processed</p>
                <p className="text-xs font-bold text-blue-400">{paidPct}%</p>
              </div>
              <ProgressBar pct={paidPct} color={colors.bar} />
              <p className="text-xs text-slate-500 mt-2">
                {fmt(cs.totalAssessment - totalPaid)} remaining of {fmt(cs.totalAssessment)}
              </p>
            </div>

            {/* Downpayment detail */}
            <div className="px-5 py-4 border-b border-slate-850">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-slate-200">Downpayment</p>
                  <p className="text-xs text-slate-500 mt-0.5">Required: {fmt(cs.downpayment.required)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-200">{fmt(cs.downpayment.paid)}</p>
                    <p className={`text-xs font-semibold ${cs.downpayment.paid >= cs.downpayment.required ? 'text-green-400' : 'text-orange-400'}`}>
                      {cs.downpayment.paid >= cs.downpayment.required ? '✓ PAID' : 'PARTIAL'}
                    </p>
                  </div>
                  {cs.downpayment.paid < cs.downpayment.required && (
                    <button
                      onClick={() => handleQuickPayment(1000)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                    >
                      +₱1K
                    </button>
                  )}
                </div>
              </div>
              <ProgressBar
                pct={cs.downpayment.required > 0 ? (cs.downpayment.paid / cs.downpayment.required) * 100 : 0}
                color={cs.downpayment.paid >= cs.downpayment.required ? 'bg-green-500' : 'bg-orange-500'}
              />
            </div>

            {/* Installments */}
            {cs.installments.length > 0 && (
              <div className="px-5 py-4">
                <p className="text-xs font-medium text-slate-400 mb-3">Installment Deadlines</p>
                <div className="space-y-3">
                  {cs.installments.map((inst, i) => (
                    <div key={i} className="flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleInstallment(i)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            inst.paid
                              ? 'bg-green-500/20 border-green-500/40 text-green-400'
                              : 'bg-slate-800 border-slate-700 text-slate-600 hover:border-slate-500'
                          }`}
                        >
                          {inst.paid && <Check size={12} />}
                        </button>
                        <span className="text-sm text-slate-200">{inst.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${inst.paid ? 'text-green-400' : 'text-slate-300'}`}>
                        {fmt(inst.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            No active semester details configured. Click "Setup Semester" to start tracking assessments.
          </div>
        )}
      </section>

      {/* Summary totals */}
      <div className="slide-in grid grid-cols-3 gap-4">
        {[
          { label: 'Unpaid Outstanding', value: fmt(totalUnpaid), color: 'text-red-400' },
          { label: 'Current Term Paid', value: fmt(totalPaid), color: 'text-green-400' },
          { label: 'Total Due', value: fmt((cs.totalAssessment - totalPaid) + totalUnpaid), color: 'text-slate-200' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-sm sm:text-base font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showSchoolModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <form onSubmit={handleSaveSchool} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h4 className="text-lg font-bold text-slate-100">School & Course Setup</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">University / School</label>
                <input
                  type="text" required
                  value={schoolForm.school}
                  onChange={e => setSchoolForm({...schoolForm, school: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Degree / Program</label>
                <input
                  type="text" required
                  value={schoolForm.degree}
                  onChange={e => setSchoolForm({...schoolForm, degree: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Year Level</label>
                  <input
                    type="text" required
                    value={schoolForm.year}
                    onChange={e => setSchoolForm({...schoolForm, year: e.target.value})}
                    placeholder="e.g. 2nd Year"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Starts Date</label>
                  <input
                    type="text"
                    value={schoolForm.schoolStart}
                    onChange={e => setSchoolForm({...schoolForm, schoolStart: e.target.value})}
                    placeholder="e.g. July 13"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button" onClick={() => setShowSchoolModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddHistory} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h4 className="text-lg font-bold text-slate-100">Add Historical Unpaid Balance</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">School Term</label>
                <input
                  type="text" required placeholder="e.g. AY 2023-2024 Sem 1"
                  value={historyForm.term}
                  onChange={e => setHistoryForm({...historyForm, term: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Assessment Amount</label>
                  <input
                    type="number" required
                    value={historyForm.amount}
                    onChange={e => setHistoryForm({...historyForm, amount: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Amount Paid So Far</label>
                  <input
                    type="number"
                    value={historyForm.paid}
                    onChange={e => setHistoryForm({...historyForm, paid: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Original Due Date</label>
                <input
                  type="text" required placeholder="e.g. Aug 2023"
                  value={historyForm.dueDate}
                  onChange={e => setHistoryForm({...historyForm, dueDate: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button" onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-semibold text-white"
              >
                Add Record
              </button>
            </div>
          </form>
        </div>
      )}

      {showSemesterModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveSemester} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h4 className="text-lg font-bold text-slate-100">Setup Semester Fees</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Semester Label</label>
                <input
                  type="text" required placeholder="e.g. AY 2024-25 Sem 2"
                  value={semesterForm.label}
                  onChange={e => setSemesterForm({...semesterForm, label: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Total Term Assessment</label>
                <input
                  type="number" required
                  value={semesterForm.totalAssessment}
                  onChange={e => setSemesterForm({...semesterForm, totalAssessment: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Downpayment Required</label>
                  <input
                    type="number" required
                    value={semesterForm.dpRequired}
                    onChange={e => setSemesterForm({...semesterForm, dpRequired: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Downpayment Paid</label>
                  <input
                    type="number" required
                    value={semesterForm.dpPaid}
                    onChange={e => setSemesterForm({...semesterForm, dpPaid: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Number of Installment Payments</label>
                <select
                  value={semesterForm.numInstallments}
                  onChange={e => setSemesterForm({...semesterForm, numInstallments: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="2">2 Installments</option>
                  <option value="3">3 Installments</option>
                  <option value="4">4 Installments</option>
                  <option value="5">5 Installments</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button" onClick={() => setShowSemesterModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white"
              >
                Create Installments
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
