import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  ArrowLeftRight, Home, BookOpen, Target, CreditCard,
  Settings, ChevronRight, User, TrendingUp, ChevronDown, BarChart2, Briefcase, Award
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
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard', 'statistics', 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const meta = getDashboardMeta(profile.dashboardType)
  const MetaIcon = meta.icon

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
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${profile.gradient} flex items-center justify-center overflow-hidden shadow-lg`}>
                {profile.image ? (
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{profile.emoji}</span>
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors"
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
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile Sidebar Toggle Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel (Custom tree line structure from NU.FINANCE) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-950 border-r border-slate-850 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-slate-900">
          <span className="text-sm font-black tracking-widest text-slate-100 select-none">
            Famly
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          
          {/* Collapsible/Tree Parent Group: "Banking" style */}
          <div className="space-y-1.5">
            {/* The Parent Node Button */}
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-100 select-none">
              <div className="flex items-center gap-3">
                <MetaIcon size={16} className="text-slate-400" />
                <span className="text-xs font-semibold tracking-wide">{meta.label}</span>
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </div>

            {/* Tree Branch Container */}
            <div className="relative pl-7 mt-1 space-y-3">
              {/* Vertical line stem */}
              <div className="absolute left-[13px] top-0 bottom-4 w-px bg-slate-800" />

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
                {/* Horizontal branch L-connector line */}
                <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-3.5 h-[1px] bg-slate-800" />
                <Home size={14} className={activeTab === 'dashboard' ? 'text-emerald-500' : 'text-slate-500'} />
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
                {/* Horizontal branch L-connector line */}
                <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-3.5 h-3 border-l border-b border-slate-800 -translate-y-3" />
                <BarChart2 size={14} className={activeTab === 'statistics' ? 'text-emerald-500' : 'text-slate-500'} />
                <span>Statistics</span>
              </button>
            </div>
          </div>

          {/* Root Level Navigation Items */}
          <div className="space-y-1 pt-2 border-t border-slate-900">
            {/* Switch Profile item */}
            <button
              onClick={onSwitch}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ArrowLeftRight size={14} className="text-slate-500" />
                <span>Switch Profile</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">
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
                activeTab === 'settings' ? 'bg-slate-900 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <Settings size={14} className={activeTab === 'settings' ? 'text-slate-200' : 'text-slate-500'} />
              <span>Settings</span>
            </button>
          </div>

        </div>

        {/* Sidebar Footer User detail */}
        <div className="p-5 border-t border-slate-900 bg-slate-950/60 flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${profile.gradient} flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-800`}>
            {profile.image ? (
              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">{profile.emoji}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-100 truncate leading-snug">{profile.name}</p>
            <p className="text-xs text-slate-400 truncate mt-0.5 leading-none">{profile.role}</p>
          </div>
        </div>
      </aside>

      {/* Main Workspace viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-850 px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-black tracking-widest text-slate-200 select-none">Famly</span>
          
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
        <div className="hidden lg:block border-b border-slate-900 bg-slate-950 px-8 py-4">
          <div className="max-w-6xl mx-auto flex items-center text-xs uppercase tracking-wider text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Famly</span>
              <ChevronRight size={10} className="text-slate-650" />
              <span className="text-slate-200 font-bold">{profile.name}</span>
              <ChevronRight size={10} className="text-slate-650" />
              <span className={`font-bold ${meta.color}`}>{meta.label}</span>
            </div>
          </div>
        </div>

        {/* Main scrollable view area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto py-2">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
