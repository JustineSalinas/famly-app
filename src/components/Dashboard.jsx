import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/famly.png'
import { getBgClass, renderAvatarContent } from './ProfileSelection'
import { doc, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase'
import {
  ChevronRight, Settings, BarChart2, AlignJustify, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar, { findNavItem } from './Sidebar'

// Feature dashboards
import TuitionDashboard    from './dashboards/TuitionDashboard'
import MilestoneDashboard  from './dashboards/MilestoneDashboard'
import DebtDashboard       from './dashboards/DebtDashboard'
import PlannerDashboard    from './dashboards/PlannerDashboard'
import SubSyncDashboard    from './dashboards/SubSyncDashboard'
import HardwareDashboard   from './dashboards/HardwareDashboard'
import LiquidityDashboard  from './dashboards/LiquidityDashboard'
import CashflowDashboard   from './dashboards/CashflowDashboard'

// ─── Section header colors ──────────────────────────────────────
const NAV_COLORS = {
  tuition:  'text-blue-400',
  debt:     'text-rose-400',
  milestone:'text-emerald-400',
  planner:  'text-amber-400',
  subsync:  'text-violet-400',
  hardware: 'text-cyan-400',
  liquidity:'text-emerald-400',
  cashflow: 'text-blue-400',
  statistics:'text-slate-400',
  settings:  'text-slate-400',
}

export default function Dashboard({ profile, onSwitch }) {
  const { logout, user } = useAuth()
  // Default active tab is mapped from profile's dashboardType
  const [activeTab, setActiveTab] = useState(profile.dashboardType || 'tuition')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showExportUpgradeModal, setShowExportUpgradeModal] = useState(false)
  const [exportSuccessMessage, setExportSuccessMessage] = useState('')

  const navItem = findNavItem(activeTab)

  const handleExportClick = () => {
    if (user?.plan === 'PRO') {
      setExportSuccessMessage('CSV and PDF sheets downloaded successfully.')
      setTimeout(() => setExportSuccessMessage(''), 3000)
    } else {
      setShowExportUpgradeModal(true)
    }
  }

  const handleUpgradeToPro = async () => {
    try {
      if (!isFirebaseConfigured) {
        const savedUser = JSON.parse(localStorage.getItem('famly_mock_user') || '{}')
        savedUser.plan = 'PRO'
        localStorage.setItem('famly_mock_user', JSON.stringify(savedUser))
        const dbMock = JSON.parse(localStorage.getItem('famly_mock_users_db') || '{}')
        if (savedUser.email && dbMock[savedUser.email]) {
          dbMock[savedUser.email].plan = 'PRO'
          localStorage.setItem('famly_mock_users_db', JSON.stringify(dbMock))
        }
        window.location.reload()
      } else {
        await setDoc(doc(db, 'users', user.uid), { plan: 'PRO' }, { merge: true })
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleNavigate = (tab) => {
    setActiveTab(tab)
    setMobileSidebarOpen(false)
  }

  // ─── Main content renderer ─────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'statistics') {
      return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 fade-in">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart2 size={20} className="text-emerald-400" />
            Family Analytics Overview
          </h2>
          <div className="bg-[#16181D] border border-white/5 rounded-2xl p-6 text-center space-y-4">
            <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
              Real-time analytics engine compiles and projects your family ledger balances, monthly payment trends, and savings milestones automatically.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-[#090A0F] p-4 border border-white/5 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Active Ledger</p>
                <p className="text-base font-bold text-slate-200 mt-1">{navItem?.label || profile.dashboardType}</p>
              </div>
              <div className="bg-[#090A0F] p-4 border border-white/5 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Integrity State</p>
                <p className="text-base font-bold text-emerald-400 mt-1">Synced</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === 'settings') {
      return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 fade-in">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Settings size={20} className="text-slate-400" />
            Account Settings
          </h2>
          <div className="bg-[#16181D] border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-md ${getBgClass(profile.gradient)} flex items-center justify-center overflow-hidden shadow-md`}>
                {profile.image ? (
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  renderAvatarContent(profile.emoji, profile.name, 20)
                )}
              </div>
              <div>
                <p className="text-base font-bold text-slate-200">{profile.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{profile.role}</p>
              </div>
            </div>
            <div className="h-px bg-white/5 w-full" />
            <p className="text-xs text-slate-500 italic">
              Use "Switch Profile" to select another member. Click below to sign out of your account.
            </p>
            <button
              id="logout-btn"
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )
    }

    // Feature dashboards
    if (activeTab === 'tuition')   return <TuitionDashboard   profile={profile} />
    if (activeTab === 'milestone') return <MilestoneDashboard profile={profile} />
    if (activeTab === 'debt')      return <DebtDashboard      profile={profile} />
    if (activeTab === 'planner')   return <PlannerDashboard   profile={profile} />
    if (activeTab === 'subsync')   return <SubSyncDashboard   profile={profile} />
    if (activeTab === 'hardware')  return <HardwareDashboard  profile={profile} />
    if (activeTab === 'liquidity') return <LiquidityDashboard profile={profile} />
    if (activeTab === 'cashflow')  return <CashflowDashboard  profile={profile} />

    // Fallback
    return <TuitionDashboard profile={profile} />
  }

  const tabColor = NAV_COLORS[activeTab] || 'text-slate-400'
  const tabLabel = navItem?.label
    || (activeTab === 'settings' ? 'Settings' : activeTab === 'statistics' ? 'Statistics' : activeTab)

  return (
    <div className="min-h-screen bg-[#090A0F] flex">

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onSwitch={onSwitch}
          profile={profile}
        />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/75 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full z-50 lg:hidden"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              <Sidebar
                activeTab={activeTab}
                onNavigate={handleNavigate}
                onSwitch={onSwitch}
                profile={profile}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#090A0F]">

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#090A0F] border-b border-white/5 px-5 py-4 flex items-center justify-between">
          <img src={logo} alt="Famly" className="h-5 object-contain select-none" />
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <AlignJustify size={15} />
          </button>
        </header>

        {/* Desktop breadcrumb / topbar */}
        <div className="hidden lg:flex border-b border-white/5 bg-[#090A0F]/80 backdrop-blur-sm px-7 py-3.5 items-center justify-between sticky top-0 z-30">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-slate-600">Famly</span>
            <ChevronRight size={10} className="text-slate-700" />
            <span className="text-slate-400 font-medium">{profile.name}</span>
            <ChevronRight size={10} className="text-slate-700" />
            <span className={`font-semibold ${tabColor}`}>{tabLabel}</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-600/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">
              {user?.plan || 'STARTER'} plan
            </span>
            <button
              onClick={handleExportClick}
              className="px-3 py-1.5 bg-[#16181D] border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5 text-[10px] rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer"
            >
              Export Ledger
            </button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="max-w-6xl mx-auto py-2"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Export Upgrade Modal ── */}
      {showExportUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#16181D] border border-white/5 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Premium Feature</span>
              <button onClick={() => setShowExportUpgradeModal(false)} className="p-1 rounded text-slate-500 hover:text-slate-300">
                <X size={14} />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Export Ledger Accounts</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upgrade your family workspace to the <strong className="text-slate-200">PRO</strong> tier to unlock PDF reports, CSV data tables, and advanced analytics export support.
            </p>
            <button
              onClick={handleUpgradeToPro}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-all"
            >
              Simulate Upgrade to PRO
            </button>
          </div>
        </div>
      )}

      {/* ── Export Success Toast ── */}
      <AnimatePresence>
        {exportSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 bg-[#16181D] border border-emerald-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <div className="text-xs">
              <p className="font-bold text-slate-100">Ledger Exported</p>
              <p className="text-slate-400 mt-0.5 text-[10px]">{exportSuccessMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
