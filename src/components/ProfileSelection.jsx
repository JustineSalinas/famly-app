import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Users, Check, X, ChevronRight, BookOpen, Target, CreditCard, Briefcase, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Available emoji avatars to choose from
const EMOJI_OPTIONS = [
  '😊','😎','🥳','🤓','👨','👩','👦','👧','🧑','👴','👵','🧔',
  '🐱','🐶','🦊','🐻','🐼','🦁','🐯','🐸','🐧','🦄','🐲','🦋',
  '🌟','⚡','🔥','💎','🌙','🎯','🏆','🎮','🎸','🎨','🚀','💡',
]

// Dashboard type options
const DASHBOARD_TYPES = [
  { value: 'tuition', label: 'Tuition', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', desc: 'School tuition tracking' },
  { value: 'milestone', label: 'Milestone', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', desc: 'Savings goals & milestones' },
  { value: 'debt', label: 'Debt Ledger', icon: CreditCard, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', desc: 'Loan & debt tracking' },
  { value: 'planner', label: 'Planner', icon: Briefcase, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', desc: 'Family plans & ideas' },
]

// Gradient options for profile cards
const GRADIENT_OPTIONS = [
  'from-blue-600 to-blue-400',
  'from-purple-600 to-pink-400',
  'from-cyan-600 to-teal-400',
  'from-yellow-500 to-orange-400',
  'from-emerald-600 to-teal-500',
  'from-rose-600 to-red-400',
  'from-indigo-600 to-violet-400',
  'from-amber-500 to-yellow-400',
]

// LocalStorage helpers removed in favor of real-time Firestore database sync

// ─── Sub-component: Emoji Picker ─────────────────────────────
function EmojiPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-1">
      {EMOJI_OPTIONS.map(e => (
        <button
          key={e}
          type="button"
          onClick={() => onSelect(e)}
          className={`text-xl p-1.5 rounded-lg transition-all hover:bg-slate-700 ${selected === e ? 'bg-slate-600 ring-2 ring-blue-500' : ''}`}
        >
          {e}
        </button>
      ))}
    </div>
  )
}

// ─── Sub-component: Add/Edit Member Modal ────────────────────
function MemberModal({ member, onSave, onClose, gradientIndex }) {
  const [form, setForm] = useState({
    name: member?.name || '',
    role: member?.role || '',
    emoji: member?.emoji || '😊',
    dashboardType: member?.dashboardType || 'tuition',
    gradient: member?.gradient || GRADIENT_OPTIONS[gradientIndex % GRADIENT_OPTIONS.length],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5"
        style={{ animation: 'fadeIn 0.15s ease' }}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-100">
            {member ? 'Edit Member' : 'Add Family Member'}
          </h4>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Avatar preview */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${form.gradient} flex items-center justify-center text-3xl shadow-lg`}>
            {form.emoji}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-slate-400">Member Name</p>
            <input
              type="text"
              required
              placeholder="e.g. Maria"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Role label */}
        <div>
          <label className="text-xs text-slate-400 block mb-1">Role / Description (optional)</label>
          <input
            type="text"
            placeholder="e.g. Mom, Dad, College Student..."
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Emoji picker */}
        <div>
          <label className="text-xs text-slate-400 block mb-2">Choose Avatar</label>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-2">
            <EmojiPicker selected={form.emoji} onSelect={emoji => setForm({ ...form, emoji })} />
          </div>
        </div>

        {/* Gradient picker */}
        <div>
          <label className="text-xs text-slate-400 block mb-2">Card Color</label>
          <div className="flex flex-wrap gap-2">
            {GRADIENT_OPTIONS.map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setForm({ ...form, gradient: g })}
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g} transition-all ${form.gradient === g ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Dashboard type */}
        <div>
          <label className="text-xs text-slate-400 block mb-2">Dashboard Type</label>
          <div className="grid grid-cols-2 gap-2">
            {DASHBOARD_TYPES.map(dt => {
              const Icon = dt.icon
              return (
                <button
                  key={dt.value}
                  type="button"
                  onClick={() => setForm({ ...form, dashboardType: dt.value })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                    form.dashboardType === dt.value
                      ? `${dt.bg} ${dt.color} border-current`
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Icon size={13} />
                  {dt.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white transition-colors"
          >
            {member ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Sub-component: Family Setup Screen ──────────────────────
function FamilySetup({ onComplete }) {
  const [familyName, setFamilyName] = useState('')
  const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)

  const handleAddMember = (form) => {
    const newMember = {
      id: `member_${Date.now()}`,
      ...form,
    }
    if (editingIndex !== null) {
      setMembers(prev => prev.map((m, i) => i === editingIndex ? { ...m, ...form } : m))
      setEditingIndex(null)
    } else {
      setMembers(prev => [...prev, newMember])
    }
    setShowModal(false)
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setShowModal(true)
  }

  const handleDelete = (index) => {
    setMembers(prev => prev.filter((_, i) => i !== index))
  }

  const { user } = useAuth()
  const handleSave = async () => {
    if (!familyName.trim() || members.length === 0 || !user) return
    const config = {
      familyId: `family_${Date.now()}`,
      familyName: familyName.trim(),
      members,
    }
    try {
      await setDoc(doc(db, 'users', user.uid, 'config', 'family'), config)
      onComplete(config)
    } catch (err) {
      console.error("Error saving family config:", err)
    }
  }

  const dtForMember = (type) => DASHBOARD_TYPES.find(d => d.value === type)

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />

      <div className="w-full max-w-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Famly" className="h-8 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mt-2">Set up your family</h1>
          <p className="text-slate-400 text-sm mt-1">Create your family workspace in 2 minutes</p>
        </div>

        {/* Family Name */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Family Name</label>
          <input
            type="text"
            placeholder="e.g. The Garcia Family"
            value={familyName}
            onChange={e => setFamilyName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Members list */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Family Members</p>
              <p className="text-[10px] text-slate-600 mt-0.5">Each member gets their own financial dashboard</p>
            </div>
            <button
              type="button"
              onClick={() => { setEditingIndex(null); setShowModal(true) }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              <Plus size={12} /> Add Member
            </button>
          </div>

          {members.length === 0 ? (
            <div className="text-center py-8 text-slate-600 text-xs border-2 border-dashed border-slate-800 rounded-xl">
              <Users size={24} className="mx-auto mb-2 opacity-40" />
              No members yet. Add your first family member.
            </div>
          ) : (
            <div className="space-y-2">
              {members.map((m, i) => {
                const dt = dtForMember(m.dashboardType)
                const Icon = dt?.icon || BookOpen
                return (
                  <div key={m.id} className="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-750 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-xl flex-shrink-0`}>
                      {m.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">{m.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {m.role && <p className="text-[11px] text-slate-500 truncate">{m.role}</p>}
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${dt?.bg} ${dt?.color}`}>
                          <Icon size={9} /> {dt?.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(i)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleSave}
          disabled={!familyName.trim() || members.length === 0}
          className="w-full py-3 rounded-2xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: familyName.trim() && members.length > 0
              ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
              : '#1e293b',
            color: 'white',
          }}
        >
          {familyName.trim() && members.length > 0 ? (
            <span className="flex items-center justify-center gap-2">
              Launch Dashboard <ChevronRight size={16} />
            </span>
          ) : (
            'Fill in family name and add at least one member'
          )}
        </button>
      </div>

      {showModal && (
        <MemberModal
          member={editingIndex !== null ? members[editingIndex] : null}
          gradientIndex={members.length}
          onSave={handleAddMember}
          onClose={() => { setShowModal(false); setEditingIndex(null) }}
        />
      )}
    </div>
  )
}

// ─── Main Export: Profile Selection / Who's Tracking ─────────
export default function ProfileSelection({ onSelect, familyConfig, onManageFamily }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Subtle bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.03) 0%, transparent 40%)' }}
      />

      {/* Header */}
      <div className="fade-in mb-10 text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <img src={logo} alt="Famly" className="h-8 object-contain" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight">
          Who is tracking?
        </h1>
        <p className="mt-2 text-slate-400 text-base">
          {familyConfig.familyName} · Select your profile
        </p>
      </div>

      {/* Profile Grid */}
      <div className="fade-in grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-2xl">
        {familyConfig.members.map((member, i) => {
          const dt = DASHBOARD_TYPES.find(d => d.value === member.dashboardType)
          const Icon = dt?.icon || BookOpen
          return (
            <button
              key={member.id}
              id={`profile-${member.id}`}
              onClick={() => onSelect(member)}
              className={`profile-card group relative flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-pointer transition-all duration-200 bg-slate-900 border-slate-800 hover:border-slate-600 hover:shadow-[0_0_20px_rgba(148,163,184,0.08)]`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Avatar */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-3xl sm:text-4xl shadow-lg transition-transform duration-200 group-hover:scale-110`}
              >
                {member.emoji}
              </div>

              {/* Name */}
              <div className="text-center">
                <p className="text-slate-100 font-semibold text-sm sm:text-base leading-tight">{member.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{member.role || dt?.label}</p>
              </div>

              {/* Dashboard type badge */}
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${dt?.bg} ${dt?.color}`}>
                <Icon size={9} /> {dt?.label}
              </span>

              {/* Hover glow bar */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r ${member.gradient} transition-all duration-300 group-hover:w-3/4`}
              />
            </button>
          )
        })}
      </div>

      {/* Manage family link */}
      <div className="fade-in mt-10 text-center">
        <button
          onClick={onManageFamily}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Settings size={12} /> Manage Family
        </button>
      </div>

      {/* Footer */}
      <div className="fade-in mt-8 text-center space-y-2">
        <p className="text-slate-400 text-xs italic font-medium max-w-md mx-auto">
          "I can do all things through Christ who strengthens me."
        </p>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
          Philippians 4:13
        </p>
        <div className="h-px w-8 bg-slate-800 mx-auto my-3" />
        <p className="text-slate-600 text-[10px]">
          Famly · Family financial tracker
        </p>
      </div>
    </div>
  )
}

// ─── Root wrapper exported to App.jsx ────────────────────────
export function ProfileSelectionRoot({ onSelect }) {
  const { user } = useAuth()
  const [familyConfig, setFamilyConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [managing, setManaging] = useState(false)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    const docRef = doc(db, 'users', user.uid, 'config', 'family')
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setFamilyConfig(docSnap.data())
      } else {
        setFamilyConfig(null)
      }
      setLoading(false)
    }, (err) => {
      console.error("Firestore family config sync error:", err)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center font-sans">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-xs mt-3 uppercase tracking-widest font-bold">Syncing Family Ledger...</p>
      </div>
    )
  }

  // First-time setup or managing existing family
  if (!familyConfig || managing) {
    return (
      <FamilySetup
        onComplete={(config) => {
          setFamilyConfig(config)
          setManaging(false)
        }}
      />
    )
  }

  return (
    <ProfileSelection
      familyConfig={familyConfig}
      onSelect={onSelect}
      onManageFamily={() => setManaging(true)}
    />
  )
}
