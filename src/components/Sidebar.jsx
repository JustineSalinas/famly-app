import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Receipt,
  Target,
  CalendarDays,
  Plug,
  Laptop,
  Shield,
  TrendingUp,
  Settings,
  ArrowLeftRight,
  Lock,
  ChevronRight,
  CreditCard,
} from 'lucide-react'
import { getBgClass, renderAvatarContent } from './ProfileSelection'

// ─── Nav structure ────────────────────────────────────────────
const NAV_CATEGORIES = [
  {
    label: 'Core Tracking',
    items: [
      { id: 'tuition',   label: 'Tuition Tracker',    icon: GraduationCap },
      { id: 'debt',      label: 'Debt Ledger',         icon: CreditCard },
      { id: 'milestone', label: 'Milestone Tracker',   icon: Target },
    ],
  },
  {
    label: 'Household Ops',
    items: [
      { id: 'planner',  label: 'Family Planner',       icon: CalendarDays },
      { id: 'subsync',  label: 'SubSync / Utilities',  icon: Plug },
      { id: 'hardware', label: 'Hardware & Assets',    icon: Laptop },
    ],
  },
  {
    label: 'Wealth & Cashflow',
    items: [
      { id: 'liquidity', label: 'Liquidity Vault',    icon: Shield },
      { id: 'cashflow',  label: 'Inbound Cashflow',   icon: TrendingUp },
    ],
  },
]

// ─── Helper: find item by id ──────────────────────────────────
export function findNavItem(id) {
  for (const cat of NAV_CATEGORIES) {
    const found = cat.items.find(i => i.id === id)
    if (found) return found
  }
  return null
}

// ─── Sidebar Component ────────────────────────────────────────
export default function Sidebar({ activeTab, onNavigate, onSwitch, profile }) {
  const isSuspended = profile?.status === 'suspended'

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#090A0F] border-r border-white/5 z-50 flex flex-col select-none">

      {/* ── Brand Header ── */}
      <div className="px-5 py-5 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-sm bg-blue-400" />
          </div>
          <span className="text-sm font-bold text-slate-100 tracking-tight">Famly</span>
          <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">
            Dashboard
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_CATEGORIES.map((category) => (
          <div key={category.label} className="space-y-1">
            {/* Section Header */}
            <p className="text-[10px] tracking-widest uppercase text-slate-500 font-semibold px-2 mb-2">
              {category.label}
            </p>

            {/* Links */}
            <div className="space-y-0.5">
              {category.items.map((item) => {
                const isActive = activeTab === item.id
                const Icon = item.icon
                return (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={isActive}
                    Icon={Icon}
                    onNavigate={onNavigate}
                  />
                )
              })}
            </div>
          </div>
        ))}

        {/* ── Utility links ── */}
        <div className="border-t border-white/5 pt-4 space-y-0.5">
          {/* Switch Profile */}
          <button
            onClick={onSwitch}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] transition-all duration-150 group"
          >
            <motion.span
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <ArrowLeftRight size={14} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
            </motion.span>
            <span className="text-sm font-medium">Switch Profile</span>
            <span className="ml-auto w-3.5 h-3.5 rounded-full bg-rose-950/50 border border-rose-900/40 text-[8px] font-bold text-rose-400 flex items-center justify-center flex-shrink-0">!</span>
          </button>

          {/* Settings */}
          <NavItem
            item={{ id: 'settings', label: 'Settings', icon: Settings }}
            isActive={activeTab === 'settings'}
            Icon={Settings}
            onNavigate={onNavigate}
          />
        </div>
      </nav>

      {/* ── User Profile Block ── */}
      <ProfileBlock profile={profile} isSuspended={isSuspended} />
    </aside>
  )
}

// ─── NavItem with Framer Motion layoutId sliding indicator ───
function NavItem({ item, isActive, Icon, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(item.id)}
      className={`relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 group ${
        isActive
          ? 'text-slate-50'
          : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {/* Sliding background pill */}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute inset-0 rounded-lg bg-white/5 border-l-2 border-blue-500/60"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Icon with micro-interaction */}
      <motion.span
        className="relative z-10 flex-shrink-0"
        whileHover={{ x: 2, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <Icon
          size={14}
          className={`transition-colors ${isActive ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-300'}`}
        />
      </motion.span>

      <span className="relative z-10 truncate">{item.label}</span>

      {isActive && (
        <motion.span
          className="relative z-10 ml-auto"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
        >
          <ChevronRight size={11} className="text-slate-500" />
        </motion.span>
      )}
    </button>
  )
}

// ─── Bottom profile block with suspended state ───────────────
function ProfileBlock({ profile, isSuspended }) {
  return (
    <div
      className={`border-t border-white/5 p-4 flex-shrink-0 transition-all duration-300 ${
        isSuspended ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-md ${getBgClass(profile?.gradient)} flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/[0.06] shadow-sm`}
        >
          {profile?.image ? (
            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            renderAvatarContent(profile?.emoji, profile?.name, 14)
          )}
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-100 truncate leading-snug">
            {profile?.name || 'Member'}
          </p>
          <p className="text-[10px] text-slate-500 truncate mt-0.5 leading-none">
            {isSuspended ? 'Account Suspended' : (profile?.role || 'Member')}
          </p>
        </div>

        {/* Lock icon for suspended */}
        <AnimatePresence>
          {isSuspended && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex-shrink-0"
            >
              <Lock size={12} className="text-slate-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
