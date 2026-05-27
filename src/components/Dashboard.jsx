import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/famly.png'
import { getBgClass, renderAvatarContent } from './ProfileSelection'
import { doc, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase'
import {
  ArrowLeftRight, Home, BookOpen, Target, CreditCard,
  Settings, ChevronRight, User, TrendingUp, ChevronDown, BarChart2, Briefcase, Award, X
} from 'lucide-react'
import TuitionDashboard from './dashboards/TuitionDashboard'
import MilestoneDashboard from './dashboards/MilestoneDashboard'
import DebtDashboard from './dashboards/DebtDashboard'
import PlannerDashboard from './dashboards/PlannerDashboard'

function getDashboardMeta(dashboardType) {
  if (dashboardType === 'tuition')
    return { label: 'Tuition', icon: BookOpen, color: 'text-blue-400', accent: 'bg-blue-500/10 border-blue-500/20' }
  if (dashboardType === 'milestone')
    return { label: 'Milestone', icon: Target, color: 'text-emerald-400', accent: 'bg-emerald-500/10 border-emerald-500/20' }
  if (dashboardType === 'debt')
    return { label: 'Debt Ledger', icon: CreditCard, color: 'text-rose-400', accent: 'bg-rose-500/10 border-rose-500/20' }
  return { label: 'Planner', icon: Briefcase, color: 'text-emerald-400', accent: 'bg-emerald-500/10 border-emerald-500/20' }
}

export default function Dashboard({ profile, onSwitch }) {
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard', 'statistics', 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showExportUpgradeModal, setShowExportUpgradeModal] = useState(false)
  const [exportSuccessMessage, setExportSuccessMessage] = useState('')
  const meta = getDashboardMeta(profile.dashboardType)
  const MetaIcon = meta.icon

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

  // Render sub-view
  const renderTabContent = () => {
    if (activeTab === 'statistics') {
      return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 fade-in">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart2 size={20} className="text-emerald-400" />
            Family Analytics Overview
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
              Real-time analytics engine compiles and projects your family ledger balances, monthly payment trends, and savings milestones automatically.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Active Ledger</p>
                <p className="text-base font-bold text-slate-200 mt-1">{meta.label}</p>
              </div>
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl">
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
            Account settings
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
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
            <div className="h-px bg-slate-850 w-full" />
            <p className="text-xs text-slate-500 italic">
              Use "Switch Profile" to select another member. Click below to sign out of your account.
            </p>
            <button
              id="logout-btn"
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors animate-pulse"
            >
              Sign Out
            </button>
          </div>
        </div>
      )
    }

    const type = profile.dashboardType
    if (type === 'tuition') return <TuitionDashboard profile={profile} />
    if (type === 'milestone') return <MilestoneDashboard profile={profile} />
    if (type === 'debt') return <DebtDashboard profile={profile} />
    return <PlannerDashboard profile={profile} />
  }

  return (
    <div className="min-h-screen bg-[#090A0F] flex">
      {/* Mobile Sidebar Toggle Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#16181D] border-r border-slate-800/40 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-[#090A0F] flex items-center">
          <img src={logo} alt="Famly" className="h-5 object-contain select-none" />
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Collapsible/Tree Parent Group */}
          <div className="space-y-1.5">
            {/* The Parent Node Button */}
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#090A0F] border border-slate-800/40 text-slate-100 select-none">
              <div className="flex items-center gap-3">
                <MetaIcon size={16} className="text-slate-400" />
                <span className="text-xs font-semibold tracking-wide">{meta.label}</span>
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </div>

            {/* Tree Branch Container */}
            <div className="relative pl-7 mt-1 space-y-3">
              {/* Vertical line stem */}
              <div className="absolute left-[13px] top-0 bottom-4 w-px bg-slate-850" />

              {/* Branch Node 1: Cards -> Dashboard */}
              <button
                onClick={() => {
                  setActiveTab('dashboard')
                  setSidebarOpen(false)
                }}
                className={`relative w-full flex items-center gap-2.5 py-1 text-xs font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-3.5 h-[1px] bg-slate-850" />
                <Home size={14} className={activeTab === 'dashboard' ? 'text-emerald-550' : 'text-slate-550'} />
                <span>Dashboard</span>
              </button>

              {/* Branch Node 2: Payments -> Statistics */}
              <button
                onClick={() => {
                  setActiveTab('statistics')
                  setSidebarOpen(false)
                }}
                className={`relative w-full flex items-center gap-2.5 py-1 text-xs font-medium transition-colors ${
                  activeTab === 'statistics' ? 'text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-3.5 h-3 border-l border-b border-slate-850 -translate-y-3" />
                <BarChart2 size={14} className={activeTab === 'statistics' ? 'text-emerald-550' : 'text-slate-550'} />
                <span>Statistics</span>
              </button>
            </div>
          </div>

          {/* Root Level Navigation Items */}
          <div className="space-y-1 pt-2 border-t border-slate-850">
            {/* Switch Profile item */}
            <button
              onClick={onSwitch}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ArrowLeftRight size={14} className="text-slate-500" />
                <span>Switch Profile</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-rose-950/40 border border-rose-900/30 text-[9px] font-bold text-rose-450 flex items-center justify-center">
                !
              </span>
            </button>

            {/* Settings item */}
            <button
              onClick={() => {
                setActiveTab('settings')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-[#090A0F] text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <Settings size={14} className={activeTab === 'settings' ? 'text-slate-200' : 'text-slate-550'} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer User detail */}
        <div className="p-5 border-t border-slate-850 bg-[#0c0d12] flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-md ${getBgClass(profile.gradient)} flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/5`}>
            {profile.image ? (
              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              renderAvatarContent(profile.emoji, profile.name, 16)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-100 truncate leading-snug">{profile.name}</p>
            <p className="text-xs text-slate-400 truncate mt-0.5 leading-none">{profile.role}</p>
          </div>
        </div>
      </aside>

      {/* Main Workspace viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#090A0F]">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#16181D] border-b border-slate-800/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Famly" className="h-5 object-contain select-none" />
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onSwitch}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeftRight size={14} />
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        {/* Breadcrumb row */}
        <div className="hidden lg:block border-b border-slate-800/40 bg-[#16181D]/40 px-8 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs uppercase tracking-wider text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Famly</span>
              <ChevronRight size={10} className="text-slate-650" />
              <span className="text-slate-200 font-bold">{profile.name}</span>
              <ChevronRight size={10} className="text-slate-650" />
              <span className={`font-bold ${meta.color}`}>{meta.label}</span>
            </div>

            {/* Export & Plan badge */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-600/10 text-blue-400 border border-blue-500/20 lowercase tracking-normal">
                {user?.plan || 'STARTER'} plan
              </span>
              <button
                onClick={handleExportClick}
                className="px-3 py-1 bg-[#16181D] border border-slate-850 text-slate-250 hover:text-slate-100 hover:bg-slate-850 text-[10px] rounded font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Export Ledger</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main scrollable view area */}
        <main className="flex-1 overflow-auto bg-[#090A0F]">
          <div className="max-w-6xl mx-auto py-2">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Simulated upgrade / success dialogs */}
      {showExportUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#16181D] border border-slate-800/60 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Premium Feature</span>
              <button onClick={() => setShowExportUpgradeModal(false)} className="p-1 rounded text-slate-500 hover:text-slate-350">
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

      {exportSuccessMessage && (
        <div className="fixed bottom-6 right-6 bg-[#16181D] border border-emerald-500/20 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <div className="text-xs">
            <p className="font-bold text-slate-100">Ledger Exported</p>
            <p className="text-slate-400 mt-0.5 text-[10px]">{exportSuccessMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
