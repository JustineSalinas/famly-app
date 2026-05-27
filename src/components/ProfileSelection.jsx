import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2, Users, Check, X, ChevronRight, BookOpen, Target, CreditCard, Briefcase, Settings, User, GraduationCap, Upload } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase'
import logo from '../assets/famly.png'

// Available muted, high-density Tailwind colors
const FLAT_COLOR_OPTIONS = [
  'bg-zinc-700',
  'bg-rose-950',
  'bg-emerald-950',
  'bg-blue-950',
  'bg-amber-950',
  'bg-indigo-950',
  'bg-neutral-800',
  'bg-cyan-950',
]

// Hex mapping for smooth avatar badge backgrounds
const COLOR_HEX_MAP = {
  'bg-zinc-700':    '#3f3f46',
  'bg-rose-950':    '#4c0519',
  'bg-emerald-950': '#064e3b',
  'bg-blue-950':    '#172554',
  'bg-amber-950':   '#451a03',
  'bg-indigo-950':  '#1e1b4b',
  'bg-neutral-800': '#262626',
  'bg-cyan-950':    '#083344',
}

// Avatar options
const AVATAR_OPTIONS = [
  { value: 'initials', label: 'Flat Initials' },
  { value: 'User', label: 'User Icon', icon: User },
  { value: 'Briefcase', label: 'Briefcase Icon', icon: Briefcase },
  { value: 'GraduationCap', label: 'Graduation Icon', icon: GraduationCap },
  { value: 'Target', label: 'Target Icon', icon: Target },
  { value: 'upload', label: 'Upload Photo', icon: Upload },
]

// Dashboard type options with semantic colors
const DASHBOARD_TYPES = [
  { value: 'tuition', label: 'Tuition', icon: BookOpen, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5', desc: 'School tuition tracking' },
  { value: 'milestone', label: 'Milestone', icon: Target, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5', desc: 'Savings & milestones' },
  { value: 'debt', label: 'Debt Ledger', icon: CreditCard, color: 'text-rose-400 border-rose-500/20 bg-rose-500/5', desc: 'Loan & debt tracking' },
  { value: 'planner', label: 'Planner', icon: Briefcase, color: 'text-amber-400 border-emerald-500/20 bg-emerald-500/5', desc: 'Family plans & ideas' },
]

export function getBgClass(gradientOrColor) {
  if (!gradientOrColor) return 'bg-zinc-700'
  if (gradientOrColor.includes('from-')) {
    return `bg-gradient-to-br ${gradientOrColor}`
  }
  return gradientOrColor
}

export function renderAvatarContent(emojiOrIcon, name, size = 18) {
  if (!emojiOrIcon) return <span className="text-zinc-400">👤</span>
  
  if (emojiOrIcon === 'initials') {
    const initials = name
      ? name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
      : 'FT'
    return <span className="font-semibold text-xs tracking-tight text-zinc-255 select-none">{initials}</span>
  }
  
  if (emojiOrIcon === 'User') return <User size={size} className="text-zinc-200" />
  if (emojiOrIcon === 'Briefcase') return <Briefcase size={size} className="text-zinc-200" />
  if (emojiOrIcon === 'GraduationCap') return <GraduationCap size={size} className="text-zinc-200" />
  if (emojiOrIcon === 'Target') return <Target size={size} className="text-zinc-200" />
  
  return <span style={{ fontSize: size }}>👤</span>
}

// ─── Sub-component: Add/Edit Member Modal ────────────────────
function MemberModal({ member, onSave, onClose, gradientIndex }) {
  const { user } = useAuth()
  const isStarter = user?.plan === 'STARTER'
  const fileInputRef = useRef(null)
  
  const [form, setForm] = useState({
    name:          member?.name          || '',
    role:          member?.role          || '',
    emoji:         member?.emoji         || 'initials',
    dashboardType: member?.dashboardType === 'planner' && isStarter ? 'tuition' : (member?.dashboardType || 'tuition'),
    gradient:      member?.gradient      || FLAT_COLOR_OPTIONS[gradientIndex % FLAT_COLOR_OPTIONS.length],
    image:         member?.image         || null,
  })

  // Derived live preview parameters
  const hasPhoto   = form.emoji === 'upload' && form.image
  const previewBg  = COLOR_HEX_MAP[form.gradient] || '#3f3f46'
  const initials   = form.name
    ? form.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
    : '?'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave(form)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result, emoji: 'upload' }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarSelect = (optValue) => {
    if (optValue === 'upload') {
      fileInputRef.current?.click()
    } else {
      setForm(prev => ({ ...prev, emoji: optValue, image: null }))
    }
  }

  const spring = { type: 'spring', stiffness: 400, damping: 25 }
  const softSpring = { type: 'spring', stiffness: 300, damping: 22 }

  const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    show:   { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-[#16181D] border border-slate-800/60 rounded-lg w-full max-w-md shadow-2xl flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.96, y: 12 }}
        transition={spring}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/40 bg-[#121318]">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
            {member ? 'Edit Workspace Member' : 'Add Workspace Member'}
          </h4>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-355 hover:bg-slate-800/30 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Body */}
        <motion.div
          className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto bg-[#16181D]"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          animate="show"
        >
          {/* Identity Block */}
          <div className="flex items-center gap-4">
            <motion.div
              className="relative w-12 h-12 rounded-md flex items-center justify-center overflow-hidden border border-slate-800/60 shadow-md flex-shrink-0 bg-[#090A0F]"
              animate={{ backgroundColor: hasPhoto ? 'transparent' : previewBg }}
              transition={{ duration: 0.25 }}
            >
              {hasPhoto ? (
                <motion.img
                  key="uploaded-img"
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover animate-fade-in"
                />
              ) : (
                <span className="pointer-events-none text-slate-205 font-semibold text-xs tracking-wider select-none uppercase">
                  {form.emoji === 'initials' ? initials : renderAvatarContent(form.emoji, form.name, 20)}
                </span>
              )}
            </motion.div>

            {/* Name Input */}
            <div className="flex-1 space-y-1">
              <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
                Member Name
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder=""
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#090A0F] border border-slate-800/80 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Role Input */}
          <motion.div variants={fieldVariants} transition={softSpring} className="space-y-1">
            <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
              Role / Description <span className="text-slate-500 font-normal normal-case">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Mom, Scholar"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full bg-[#090A0F] border border-slate-800/80 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </motion.div>

          {/* Avatar Style Picker */}
          <motion.div variants={fieldVariants} transition={softSpring} className="space-y-1.5">
            <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
              Avatar Style
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {AVATAR_OPTIONS.map(opt => {
                const IconComp = opt.icon
                const isSelected = form.emoji === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAvatarSelect(opt.value)}
                    className={`relative py-1.5 px-2 rounded-md border text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500/40 text-blue-400 font-semibold shadow-sm'
                        : 'bg-transparent border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {IconComp ? <IconComp size={11} /> : <span className="text-[9px] uppercase font-bold tracking-tight">AB</span>}
                    <span className="truncate">{opt.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Card Color Picker */}
          <motion.div variants={fieldVariants} transition={softSpring} className="space-y-1.5">
            <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
              Card Accent Color
            </label>
            <div className="flex flex-wrap gap-2.5 py-1">
              {FLAT_COLOR_OPTIONS.map(colorClass => {
                const isSelected = form.gradient === colorClass
                return (
                  <button
                    key={colorClass}
                    type="button"
                    onClick={() => setForm({ ...form, gradient: colorClass })}
                    className={`relative w-5 h-5 rounded-full ${colorClass} transition-transform hover:scale-110 active:scale-95`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-[#16181D]" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Dashboard Type Grid */}
          <motion.div variants={fieldVariants} transition={softSpring} className="space-y-1.5">
            <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
              Ledger View / Dashboard Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DASHBOARD_TYPES.map(dt => {
                const Icon = dt.icon
                const isSelected = form.dashboardType === dt.value
                const isLocked = isStarter && dt.value === 'planner'
                return (
                  <button
                    key={dt.value}
                    type="button"
                    disabled={isLocked}
                    onClick={() => setForm({ ...form, dashboardType: dt.value })}
                    className={`flex flex-col items-start text-left p-3 rounded-md border transition-all ${
                      isLocked
                        ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-900 text-slate-500'
                        : isSelected
                        ? 'border-blue-500 bg-blue-600/10 text-slate-100 shadow-sm'
                        : 'bg-[#090A0F]/65 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      <Icon size={12} className={isLocked ? 'text-slate-650' : isSelected ? 'text-blue-400' : 'text-slate-500'} />
                      <span className="text-xs font-semibold">{dt.label}</span>
                      {isLocked ? (
                        <span className="text-[7px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 px-1 py-0.2 rounded ml-auto uppercase">Family/Pro</span>
                      ) : isSelected ? (
                        <Check size={10} className="text-blue-400 ml-auto" />
                      ) : null}
                    </div>
                    <span className="text-[10px] text-slate-550 mt-1 leading-normal font-normal">
                      {isLocked ? 'Unlock family planner dashboard' : dt.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800/40 bg-[#121318] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold transition-all active:scale-95 duration-75 shadow-md shadow-blue-900/10 border border-blue-500/10"
          >
            {member ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}

// ─── Sub-component: Family Setup Screen (Landing Page style) ────
function FamilySetup({ onComplete }) {
  const [familyName, setFamilyName] = useState('')
  const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)

  const { user, isFirebaseConfigured } = useAuth()
  const memberLimit = user?.plan === 'STARTER' ? 1 : 999

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

  const handleSimulatedUpgrade = async () => {
    try {
      if (!isFirebaseConfigured) {
        const savedUser = JSON.parse(localStorage.getItem('famly_mock_user') || '{}')
        savedUser.plan = 'FAMILY'
        localStorage.setItem('famly_mock_user', JSON.stringify(savedUser))
        
        const dbMock = JSON.parse(localStorage.getItem('famly_mock_users_db') || '{}')
        if (savedUser.email && dbMock[savedUser.email]) {
          dbMock[savedUser.email].plan = 'FAMILY'
          localStorage.setItem('famly_mock_users_db', JSON.stringify(dbMock))
        }
        window.location.reload()
      } else {
        await setDoc(doc(db, 'users', user.uid), { plan: 'FAMILY' }, { merge: true })
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleSave = async () => {
    if (!familyName.trim() || members.length === 0 || !user) return
    const config = {
      familyId: `family_${Date.now()}`,
      familyName: familyName.trim(),
      members,
      plan: user?.plan || 'STARTER',
    }
    try {
      if (!isFirebaseConfigured) {
        localStorage.setItem(`famly_mock_family_config_${user.uid}`, JSON.stringify(config))
        onComplete(config)
        return
      }
      await setDoc(doc(db, 'users', user.uid, 'config', 'family'), config)
      onComplete(config)
    } catch (err) {
      console.error("Error saving family config:", err)
    }
  }

  const dtForMember = (type) => DASHBOARD_TYPES.find(d => d.value === type)

  // Staggered load animation definitions
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 350, damping: 25 } 
    }
  }

  return (
    <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glow matching landing page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] lp-radial-glow pointer-events-none z-0 opacity-40" />

      {/* Unified Card Container in Landing Page colors */}
      <motion.div 
        className="w-full max-w-lg bg-[#16181D] border border-slate-800/60 rounded-xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* Card Header (Centered logo only, styled bigger) */}
        <motion.div className="text-center pb-2" variants={itemVariants}>
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Famly" className="h-20 w-auto object-contain" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Set up family workspace</h2>
          <p className="text-slate-400 text-xs mt-1">Configure your family ledger workspace to begin tracking assets</p>
        </motion.div>

        <motion.div className="h-px bg-slate-800/40" variants={itemVariants} />

        {/* Family Name Field */}
        <motion.div className="space-y-1.5" variants={itemVariants}>
          <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">Family Workspace Name</label>
          <input
            type="text"
            placeholder="e.g. The Salinas Family"
            value={familyName}
            onChange={e => setFamilyName(e.target.value)}
            className="w-full bg-[#090A0F] border border-slate-800/80 rounded-md px-3.5 py-2 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
          />
        </motion.div>

        {/* Family Members Section */}
        <motion.div className="space-y-3" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">Workspace Members</label>
              <span className="text-[10px] text-slate-550">Add family members to manage their tracking dashboards</span>
            </div>
            <motion.button
              whileHover={members.length >= memberLimit ? {} : { scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              whileTap={members.length >= memberLimit ? {} : { scale: 0.97 }}
              type="button"
              disabled={members.length >= memberLimit}
              onClick={() => { setEditingIndex(null); setShowModal(true) }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
                members.length >= memberLimit
                  ? 'border-slate-900 text-slate-650 cursor-not-allowed opacity-50'
                  : 'border-slate-800/80 text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <Plus size={11} /> Add Member
            </motion.button>
          </div>

          {/* Members List Box */}
          {members.length === 0 ? (
            <motion.div 
              className="text-center py-8 text-slate-500 text-xs border border-dashed rounded-lg bg-[#090A0F]/55"
              animate={{ borderColor: ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.05)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users size={20} className="mx-auto mb-2 opacity-35 text-slate-400" />
              <span>No members added. Click Add Member to include someone.</span>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <motion.ul layout className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {members.map((m, i) => {
                    const dt = dtForMember(m.dashboardType)
                    const Icon = dt?.icon || BookOpen
                    return (
                      <motion.li 
                        key={m.id} 
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                        className="flex items-center gap-3 p-2 bg-[#090A0F]/75 border border-slate-800/50 rounded-md"
                      >
                        <div className={`w-8 h-8 rounded ${m.image ? '' : getBgClass(m.gradient)} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                          {m.image ? (
                            <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            renderAvatarContent(m.emoji, m.name, 14)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{m.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {m.role && <p className="text-[10px] text-slate-500 truncate">{m.role}</p>}
                            <span className={`inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded border border-slate-800/40 ${dt?.color}`}>
                              <Icon size={8} /> {dt?.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(i)}
                            className="p-1 rounded text-slate-450 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
                          >
                            <Edit2 size={11} />
                          </button>
                          <button
                            onClick={() => handleDelete(i)}
                            className="p-1 rounded text-slate-455 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </motion.li>
                    )
                  })}
                </AnimatePresence>
              </motion.ul>

              {members.length >= memberLimit && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="text-slate-300">
                    <span className="font-bold text-blue-400">STARTER Tier Limit Reached:</span> You can only have 1 member on the free tier.
                  </div>
                  <button
                    type="button"
                    onClick={handleSimulatedUpgrade}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold self-start sm:self-auto transition-colors cursor-pointer"
                  >
                    Upgrade to Family
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div className="h-px bg-slate-800/40 pt-1" variants={itemVariants} />

        {/* CTA Launch Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleSave}
            disabled={!familyName.trim() || members.length === 0}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-900/10 border border-blue-500/10 cursor-pointer"
          >
            <span className="flex items-center justify-center gap-1.5">
              Launch Workspace <ChevronRight size={13} />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* AnimatePresence placed here on the parent triggers exiting animations correctly */}
      <AnimatePresence>
        {showModal && (
          <MemberModal
            member={editingIndex !== null ? members[editingIndex] : null}
            gradientIndex={members.length}
            onSave={handleAddMember}
            onClose={() => { setShowModal(false); setEditingIndex(null) }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Export: Profile Selection / Who's Tracking ─────────
export default function ProfileSelection({ onSelect, familyConfig, onManageFamily }) {
  return (
    <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background radial soft light grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] lp-radial-glow pointer-events-none z-0 opacity-30" />

      {/* Header */}
      <div className="fade-in mb-10 text-center relative z-10 space-y-2.5">
        <div className="flex items-center justify-center mb-4">
          <img src={logo} alt="Famly" className="h-20 w-auto object-contain" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-150">
          Who is tracking?
        </h1>
        <p className="text-slate-505 text-xs uppercase tracking-widest font-semibold">
          {familyConfig.familyName} · Select profile
        </p>
      </div>

      {/* Profile Selector Grid */}
      <div className="fade-in grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-xl">
        {familyConfig.members.map((member, i) => {
          const dt = DASHBOARD_TYPES.find(d => d.value === member.dashboardType)
          const Icon = dt?.icon || BookOpen
          return (
            <button
              key={member.id}
              id={`profile-${member.id}`}
              onClick={() => onSelect(member)}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-lg border cursor-pointer transition-all duration-200 bg-[#16181D] border-slate-800/60 hover:border-slate-700 hover:shadow-lg"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Avatar image container */}
              <div
                className={`w-14 h-14 rounded-md ${member.image ? '' : getBgClass(member.gradient)} flex items-center justify-center overflow-hidden border border-slate-800 shadow-sm transition-transform duration-200 group-hover:scale-105`}
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  renderAvatarContent(member.emoji, member.name, 22)
                )}
              </div>

              {/* Identity details */}
              <div className="text-center">
                <p className="text-slate-100 font-semibold text-xs leading-tight">{member.name}</p>
                <p className="text-slate-500 text-[10px] mt-0.5 font-medium truncate max-w-[120px]">
                  {member.role || dt?.label}
                </p>
              </div>

              {/* Badge for dashboard view type */}
              <span className={`inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded border border-slate-800/40 ${dt?.color}`}>
                <Icon size={8} /> {dt?.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Settings Action Link */}
      <div className="fade-in mt-10 text-center">
        <button
          onClick={onManageFamily}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-800/60 text-xs text-slate-500 hover:text-slate-350 hover:bg-slate-800/30 transition-colors"
        >
          <Settings size={12} /> Manage Family Workspace
        </button>
      </div>

      {/* Verse footer segment */}
      <div className="fade-in mt-12 text-center space-y-2">
        <p className="text-slate-400 text-xs italic font-medium max-w-sm mx-auto">
          "I can do all things through Christ who strengthens me."
        </p>
        <p className="text-slate-500 text-[9px] uppercase tracking-widest font-bold">
          Philippians 4:13
        </p>
        <div className="h-px w-6 bg-slate-800 mx-auto my-3" />
        <p className="text-slate-650 text-[9px]">
          Famly Ledger Workspace
        </p>
      </div>
    </div>
  )
}

// ─── Root wrapper exported to App.jsx ────────────────────────
export function ProfileSelectionRoot({ onSelect }) {
  const { user, isFirebaseConfigured } = useAuth()
  const [familyConfig, setFamilyConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [managing, setManaging] = useState(false)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    if (!isFirebaseConfigured) {
      const localVal = localStorage.getItem(`famly_mock_family_config_${user.uid}`)
      if (localVal !== null) {
        try {
          setFamilyConfig(JSON.parse(localVal))
        } catch (e) {
          setFamilyConfig(null)
        }
      } else {
        setFamilyConfig(null)
      }
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
  }, [user, isFirebaseConfigured])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center font-sans">
        <div className="w-5 h-5 border border-slate-700 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-[10px] mt-3 uppercase tracking-widest font-bold">Syncing Workspace Ledger...</p>
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
