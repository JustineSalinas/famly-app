import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, TrendingUp, DollarSign, ArrowUpRight, Zap, Target, Users, User, GraduationCap, PiggyBank, Settings, CreditCard, BookOpen, LogOut, ArrowLeft, Loader2, Check, Sparkles, Briefcase } from 'lucide-react'
import logo from '../../assets/famly.png'

const SIM_PROFILES = [
  { id: 'mom',  name: 'Mom',  Icon: User,          role: 'Debt Ledger',       defaultTab: 'debts' },
  { id: 'dad',  name: 'Dad',  Icon: Users,          role: 'Family Planner',    defaultTab: 'planner' },
  { id: 'kuya', name: 'Kuya', Icon: GraduationCap,  role: 'Tuition Tracker',   defaultTab: 'tuition' },
  { id: 'ate',  name: 'Ate',  Icon: PiggyBank,       role: 'Savings Milestones', defaultTab: 'milestones' },
]

export default function DashboardScrollPreview() {
  const containerRef = useRef(null)
  
  // Trigger lid open when section is in view
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.35
  })

  // Simulated interactive states inside the Macbook Screen
  const [simViewState, setSimViewState] = useState('profiles') // 'profiles', 'loading', 'dashboard'
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [activeReplicaTab, setActiveReplicaTab] = useState('debts')

  // MacBook lid rotation animation config
  const lidVariants = {
    closed: {
      rotateX: -95,
      transition: {
        type: 'spring',
        stiffness: 40,
        damping: 15
      }
    },
    open: {
      rotateX: -12, // Tilted slightly back for perfect laptop perspective
      transition: {
        type: 'spring',
        stiffness: 65,
        damping: 18,
        mass: 1.1,
        delay: 0.1
      }
    }
  }

  // Screen glare and content fade config
  const screenContentVariants = {
    closed: {
      opacity: 0,
      filter: 'brightness(0.3) blur(2px)'
    },
    open: {
      opacity: 1,
      filter: 'brightness(1.05) blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.4
      }
    }
  }

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile)
    setSimViewState('loading')
    setTimeout(() => {
      setSimViewState('dashboard')
      setActiveReplicaTab(profile.defaultTab)
    }, 1200)
  }

  const handleLogout = () => {
    setSimViewState('profiles')
    setSelectedProfile(null)
  }

  const getProfileTabs = (profileId) => {
    switch (profileId) {
      case 'mom':
        return [
          { id: 'debts', label: 'Debt Ledger', icon: CreditCard },
          { id: 'vault', label: 'Liquidity Vault', icon: Shield },
          { id: 'milestones', label: 'Savings Goals', icon: Target }
        ]
      case 'dad':
        return [
          { id: 'planner', label: 'Family Planner', icon: Briefcase },
          { id: 'vault', label: 'Liquidity Vault', icon: Shield },
          { id: 'milestones', label: 'Savings Goals', icon: Target }
        ]
      case 'kuya':
        return [
          { id: 'tuition', label: 'Tuition Tracker', icon: BookOpen },
          { id: 'milestones', label: 'Savings Goals', icon: Target }
        ]
      case 'ate':
        return [
          { id: 'milestones', label: 'Savings Goals', icon: Target },
          { id: 'vault', label: 'Liquidity Vault', icon: Shield }
        ]
      default:
        return []
    }
  }

  return (
    <section 
      ref={containerRef} 
      id="product-preview" 
      className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32 border-t border-slate-800/40 relative z-10 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
          <Zap size={12} className="animate-pulse" />
          Live Interactive Simulator
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Experience the Actual Workspace
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
          Scroll down to watch the laptop open. Click profiles inside the simulator to sync a dashboard, and navigate different tabs in real time.
        </p>
      </div>

      {/* 3D Laptop Perspective Wrapper */}
      <div 
        className="relative w-full max-w-[840px] mx-auto flex flex-col items-center select-none"
        style={{ perspective: '1500px' }}
      >
        
        <motion.div
          variants={lidVariants}
          initial="closed"
          animate={isInView ? 'open' : 'closed'}
          className="relative w-[94%] h-[380px] md:h-[460px] bg-black rounded-t-2xl border-[1px] border-slate-700/30 ring-1 ring-[#8c8c94]/90 shadow-2xl flex flex-col overflow-hidden origin-bottom z-20 p-[6px]"
          style={{ 
            transformStyle: 'preserve-3d',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9), 0 -20px 40px -10px rgba(0,0,0,0.5)'
          }}
        >
          {/* Web camera notch */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-b-md z-50 pointer-events-none" />

          <motion.div
            variants={screenContentVariants}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
            className="w-full h-full flex flex-col bg-[#08090C] text-slate-300 relative overflow-hidden"
          >
            {/* macOS Menu Bar */}
            <div className="h-5 bg-[#1a1b21] text-[7.5px] text-slate-400 flex items-center justify-between px-3 shrink-0 border-b border-white/[0.03] select-none relative z-40">
              {/* Left Side: Apple Logo & Menu Items */}
              <div className="flex items-center gap-2.5">
                <span className="text-slate-200 text-[9px] font-semibold leading-none"></span>
                <span className="font-extrabold text-slate-200 tracking-tight">Famly</span>
                <span className="hidden sm:inline hover:text-slate-200 cursor-pointer font-medium transition-colors">File</span>
                <span className="hidden sm:inline hover:text-slate-200 cursor-pointer font-medium transition-colors">Edit</span>
                <span className="hidden md:inline hover:text-slate-200 cursor-pointer font-medium transition-colors">View</span>
                <span className="hover:text-slate-200 cursor-pointer font-medium transition-colors">Go</span>
                <span className="hidden md:inline hover:text-slate-200 cursor-pointer font-medium transition-colors">Window</span>
                <span className="hover:text-slate-200 cursor-pointer font-medium transition-colors">Help</span>
              </div>
              
              {/* Right Side: Status Items */}
              <div className="flex items-center gap-2.5 font-medium">
                <span className="text-[8px] hover:text-slate-200 cursor-pointer transition-colors" title="WiFi">📶</span>
                <span className="text-[8px] hover:text-slate-200 cursor-pointer transition-colors" title="Battery">🔋</span>
                <span className="text-slate-300 text-[7px] font-semibold tracking-wide">Mon 6:14 PM</span>
              </div>
            </div>

            {/* Mock Safari Address Bar */}
            <div className="h-7 bg-[#16171a] border-b border-white/5 flex items-center px-3 justify-between select-none shrink-0 z-40">
              <div className="flex items-center gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56] border border-[#E0443E] block shrink-0" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] block shrink-0" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] border border-[#1AAB29] block shrink-0" />
                </div>
                {/* Back / Forward buttons & Refresh */}
                <div className="flex items-center gap-1.5 text-slate-500 text-[7px] font-bold">
                  <span className="hover:text-slate-300 cursor-pointer">⟨</span>
                  <span className="hover:text-slate-300 cursor-pointer">⟩</span>
                  <span className="hover:text-slate-300 cursor-pointer text-[8px] ml-0.5">⟳</span>
                </div>
              </div>
              
              {/* URL Address Bar aligned to the right */}
              <div className="bg-[#0c0d10] border border-white/5 text-[8px] text-slate-500 rounded-md px-3 py-0.5 w-full max-w-[170px] md:max-w-[190px] truncate flex items-center gap-1">
                <span className="text-[7px]">🔒</span>
                <span className="text-slate-300 font-semibold">famly.app</span>
                <span className="text-slate-600">/workspace</span>
              </div>
            </div>

            {/* SCREEN INNER CONTENT VIEWS */}
            <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-[#090A0F]">
              
              {/* 1. Netflix-style Profile Selection View */}
              {simViewState === 'profiles' && (
                <div className="flex-1 w-full flex flex-col items-center justify-center p-4 relative z-10 text-center">
                  {/* Background Radial Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Header */}
                  <div className="space-y-1 mb-5">
                    <div className="flex items-center justify-center mb-1.5">
                      <img src={logo} alt="Famly" className="h-6 w-auto object-contain" />
                    </div>
                    <h3 className="text-xs md:text-sm font-black text-slate-100 tracking-tight">Who is tracking today?</h3>
                    <p className="text-slate-500 text-[6.5px] uppercase tracking-widest font-bold">Rivera Family · Select Profile</p>
                  </div>

                  {/* Grid of Netflix Profiles */}
                  <div className="grid grid-cols-4 gap-2.5 max-w-sm w-full px-2">
                    {SIM_PROFILES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProfile(p)}
                        className="group flex flex-col items-center gap-1.5 p-1.5 rounded-lg border border-transparent hover:bg-white/[0.02] hover:border-slate-800/40 transition-all duration-200 cursor-pointer"
                      >
                        {/* Avatar square — shadcn-style minimal */}
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-800/80 border border-white/8 flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:bg-slate-700/80 group-hover:border-slate-600/50">
                          <p.Icon size={16} className="text-slate-400 group-hover:text-slate-200 transition-colors duration-200" />
                        </div>
                        {/* Name & Role */}
                        <div className="text-center">
                          <p className="text-slate-200 font-extrabold text-[8px] leading-tight group-hover:text-white transition-colors">{p.name}</p>
                          <p className="text-slate-500 text-[5.5px] mt-0.5 font-medium truncate max-w-[65px]">{p.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Footer / Manage Workspace link */}
                  <div className="mt-6 flex flex-col items-center gap-1">
                    <button className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-slate-800/80 text-[6px] text-slate-500 hover:text-slate-300 hover:bg-slate-800/30 transition-colors">
                      <Settings size={8} /> Manage Family Workspace
                    </button>
                    <p className="text-slate-550 text-[5.5px] italic mt-1 font-medium">"I can do all things through Christ who strengthens me." Philippians 4:13</p>
                  </div>
                </div>
              )}

              {/* 2. Netflix-style Loading/Syncing Transition Screen */}
              {simViewState === 'loading' && selectedProfile && (
                <div className="flex-1 w-full bg-[#090A0F] flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Spinning loader circle */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                      className="absolute inset-0 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    />
                    {/* Avatar scaling up */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center shadow-md"
                    >
                      <selectedProfile.Icon size={15} className="text-slate-300" />
                    </motion.div>
                  </div>
                  <h4 className="text-slate-200 text-[8px] font-extrabold mt-3 uppercase tracking-wider animate-pulse">
                    Syncing {selectedProfile.name}'s Ledger...
                  </h4>
                  <p className="text-slate-555 text-[6px] mt-0.5">Configuring secure end-to-end ledger workspace tunnel</p>
                </div>
              )}

              {/* 3. Logged-in Dashboard View */}
              {simViewState === 'dashboard' && selectedProfile && (
                <div className="flex-1 flex flex-row w-full overflow-hidden relative bg-[#08090C]">
                  {/* Glossy screen glare reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.06] pointer-events-none z-30" />

                  {/* SIMULATOR SIDEBAR */}
                  <div className="w-[28%] md:w-[25%] bg-[#060709] border-r border-white/5 flex flex-col p-2.5 md:p-3 shrink-0 z-10 text-left">
                    {/* Sidebar Brand Logo */}
                    <div className="flex items-center gap-1.5 border-b border-white/5 pb-2.5 mb-3">
                      <div className="w-3.5 h-3.5 rounded bg-blue-600 flex items-center justify-center">
                        <span className="text-[8px] text-white font-extrabold">F</span>
                      </div>
                      <span className="text-[8.5px] font-black text-slate-100 tracking-tight">Famly</span>
                      <span className="text-[5.5px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.2 rounded font-bold ml-auto uppercase tracking-wide">Sync</span>
                    </div>

                    {/* Active Profile Info */}
                    <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 p-1.5 rounded-lg mb-3.5">
                      <div className="w-6 h-6 rounded-md bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
                        <selectedProfile.Icon size={10} className="text-slate-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[7.5px] font-extrabold text-slate-200 truncate leading-tight">{selectedProfile.name}</p>
                        <p className="text-[5.5px] text-slate-500 truncate leading-none mt-0.5">{selectedProfile.role}</p>
                      </div>
                    </div>

                    {/* Dynamic Tabs based on active profile */}
                    <div className="space-y-3.5">
                      <div>
                        <p className="text-[6px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">Ledger Modules</p>
                        <div className="space-y-0.5">
                          {getProfileTabs(selectedProfile.id).map((tab) => {
                            const TabIcon = tab.icon
                            const isTabActive = activeReplicaTab === tab.id
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveReplicaTab(tab.id)}
                                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-[7.5px] font-bold transition-all text-left ${
                                  isTabActive
                                    ? 'bg-blue-600/10 text-blue-400 border-l border-blue-500'
                                    : 'text-slate-500 hover:text-slate-350 hover:bg-white/[0.02]'
                                }`}
                              >
                                <TabIcon size={9} />
                                <span className="truncate">{tab.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Switch Profile Button at the bottom */}
                    <button
                      onClick={handleLogout}
                      className="mt-auto pt-2 border-t border-white/5 flex items-center gap-1 text-[7px] text-slate-500 hover:text-slate-300 transition-colors w-full text-left"
                    >
                      <ArrowLeft size={8} />
                      <span>Switch Profile</span>
                    </button>
                  </div>

                  {/* SIMULATOR MAIN CONTENT VIEW */}
                  <div className="flex-1 bg-[#0c0d12] flex flex-col p-3.5 md:p-4.5 overflow-hidden z-10 text-left">
                    
                    {/* Header inside display */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                      <div>
                        <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-widest leading-none">Fintech Simulation</span>
                        <h3 className="text-[10px] font-black text-slate-100 mt-0.5 leading-tight">
                          {activeReplicaTab === 'vault' && 'Liquidity Vault & Asset Coverage'}
                          {activeReplicaTab === 'debts' && 'Multi-Creditor Debt Ledger'}
                          {activeReplicaTab === 'planner' && 'Family Planner & Goal Sync'}
                          {activeReplicaTab === 'tuition' && 'Scholar Tuition & Backlogs'}
                          {activeReplicaTab === 'milestones' && 'Milestone Goals & Savings'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-[6px] font-bold text-slate-400 bg-slate-900 border border-white/5 px-1.5 py-0.2 rounded">
                        <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                        PRO
                      </div>
                    </div>

                    {/* DYNAMIC VIEW CONTENT */}
                    
                    {/* A. LIQUIDITY VAULT VIEW */}
                    {activeReplicaTab === 'vault' && (
                      <div className="space-y-3 flex-1 flex flex-col min-h-0 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#121319] border border-white/5 p-1.5 rounded-lg">
                            <span className="text-[5.5px] text-slate-500 block font-bold uppercase">Emergency Fund</span>
                            <span className="text-[10px] font-black text-slate-200 block mt-0.5">₱150,000.00</span>
                            <span className="text-[5px] text-emerald-400 mt-0.5 block font-medium">Fully Backed (6 mo runway)</span>
                          </div>
                          <div className="bg-[#121319] border border-white/5 p-1.5 rounded-lg">
                            <span className="text-[5.5px] text-slate-500 block font-bold uppercase">High-Yield Deposits</span>
                            <span className="text-[10px] font-black text-slate-200 block mt-0.5">₱225,400.00</span>
                            <span className="text-[5px] text-blue-400 mt-0.5 block font-medium">Earns 5.5% p.a. compound</span>
                          </div>
                        </div>
                        <div className="bg-[#090A0E] border border-white/5 p-2 rounded-lg flex-1 min-h-0 overflow-y-auto">
                          <div className="flex justify-between text-[5.5px] font-bold text-slate-500 border-b border-white/5 pb-1 mb-1.5">
                            <span>Institution</span>
                            <span>Asset Type</span>
                            <span>Balance</span>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { bank: 'BPI Save-Up', type: 'Cash Equivalents', bal: '₱150,000.00', color: 'text-emerald-400' },
                              { bank: 'Maya Vault', type: 'Liquid Capital', bal: '₱75,400.00', color: 'text-emerald-400' },
                              { bank: 'GoTyme Saver', type: 'Time Deposit', bal: '₱150,000.00', color: 'text-blue-400' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[6.5px] border-b border-white/[0.02] pb-1">
                                <div>
                                  <span className="font-bold text-slate-200 block leading-tight">{item.bank}</span>
                                  <span className="text-[5px] text-slate-500 leading-none">{item.type}</span>
                                </div>
                                <span className="text-slate-500 text-[6px]">Fixed Yield</span>
                                <span className={`font-extrabold ${item.color} text-right`}>{item.bal}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* B. DEBT LEDGER VIEW (Mom) */}
                    {activeReplicaTab === 'debts' && (
                      <div className="space-y-3 flex-1 flex flex-col min-h-0 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#121319] border border-white/5 p-1.5 rounded-lg">
                            <span className="text-[5.5px] text-slate-500 block font-bold uppercase">Total Remaining Debt</span>
                            <span className="text-[10px] font-black text-slate-200 block mt-0.5">₱375,400.00</span>
                            <span className="text-[5px] text-rose-400 mt-0.5 block font-medium">Monthly payments: ₱12,500</span>
                          </div>
                          <div className="bg-[#121319] border border-white/5 p-1.5 rounded-lg flex items-center justify-between">
                            <div>
                              <span className="text-[5.5px] text-slate-500 block font-bold uppercase">Payoff progress</span>
                              <span className="text-[10px] font-black text-slate-200 block mt-0.5">65.2%</span>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-rose-500/20 bg-rose-500/5 flex items-center justify-center">
                              <span className="text-[6.5px] font-black text-rose-400">65%</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#090A0E] border border-white/5 p-2 rounded-lg flex-1 min-h-0 overflow-y-auto">
                          <div className="flex justify-between text-[5.5px] font-bold text-slate-500 border-b border-white/5 pb-1 mb-1.5">
                            <span>Creditor / Account</span>
                            <span className="text-center">Interest</span>
                            <span className="text-right">Balance</span>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { name: 'BDO Housing Loan', type: 'Mortgage', interest: '7.5%', bal: '₱312,000.00', color: 'text-slate-200' },
                              { name: 'SSS Calamity Loan', type: 'State Calamity', interest: '10.0%', bal: '₱18,400.00', color: 'text-slate-200' },
                              { name: 'PAGIBIG MP2 Backlog', type: 'Investment Loan', interest: '5.0%', bal: '₱45,000.00', color: 'text-slate-200' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[6.5px] border-b border-white/[0.02] pb-1">
                                <div>
                                  <span className="font-bold text-slate-200 block leading-tight">{item.name}</span>
                                  <span className="text-[5px] text-slate-550 leading-none">{item.type}</span>
                                </div>
                                <span className="text-slate-500 font-semibold">{item.interest}</span>
                                <span className={`font-extrabold ${item.color} text-right`}>{item.bal}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* C. FAMILY PLANNER VIEW (Dad) */}
                    {activeReplicaTab === 'planner' && (
                      <div className="space-y-3 flex-1 flex flex-col min-h-0 overflow-y-auto">
                        <div className="bg-[#121319] border border-white/5 p-2 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="text-[5.5px] text-slate-505 block font-bold uppercase">Planner Items</span>
                            <span className="text-[10px] font-black text-slate-200 block mt-0.5">3 / 4 Tasks Completed</span>
                          </div>
                          <span className="text-[6px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">75% Done</span>
                        </div>
                        <div className="bg-[#090A0E] border border-white/5 p-2 rounded-lg flex-1 min-h-0 overflow-y-auto space-y-1.5">
                          {[
                            { task: 'Set up family emergency vault', assign: 'Dad', done: true },
                            { task: 'Research graduation cruise itinerary', assign: 'Kuya', done: false },
                            { task: 'Finalize tuition installment schedule', assign: 'Mom', done: true },
                            { task: 'Review housing loan restructuring', assign: 'Mom', done: true }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-1.5 bg-[#121319]/45 border border-white/[0.02] rounded-md text-[6.5px]">
                              <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                                item.done 
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                  : 'bg-transparent border-slate-800 text-slate-650'
                              }`}>
                                {item.done ? <Check size={8} /> : null}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-semibold truncate ${item.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{item.task}</p>
                              </div>
                              <span className="text-[5.5px] text-slate-500 px-1 bg-slate-800 border border-white/5 rounded font-bold">{item.assign}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* D. TUITION TRACKER VIEW (Kuya) */}
                    {activeReplicaTab === 'tuition' && (
                      <div className="space-y-3 flex-1 flex flex-col min-h-0 overflow-y-auto">
                        <div className="bg-[#121319] border border-white/5 p-2 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="text-[5.5px] text-slate-505 block font-bold uppercase">Total School Fees</span>
                            <span className="text-[10px] font-black text-slate-200 block mt-0.5">₱145,000.00</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[5.5px] text-slate-505 block font-bold uppercase">Total Paid</span>
                            <span className="text-[9px] font-bold text-emerald-400 block">₱97,400.00</span>
                          </div>
                        </div>
                        <div className="bg-[#090A0E] border border-white/5 p-2 rounded-lg flex-1 min-h-0 overflow-y-auto space-y-2">
                          {[
                            { scholar: 'Kuya (College AY 2024–25 Sem 2)', paid: 32400, total: 45000, color: 'bg-blue-500/50' },
                            { scholar: 'Ate (Postgrad AY 2024–25 Sem 1)', paid: 50000, total: 50000, color: 'bg-emerald-500/50' },
                            { scholar: 'Bunso (High School Backlog 2023)', paid: 15000, total: 50000, color: 'bg-rose-500/50' }
                          ].map((item, idx) => {
                            const pct = Math.round((item.paid / item.total) * 100)
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[6.5px]">
                                  <span className="font-bold text-slate-300 truncate max-w-[170px]">{item.scholar}</span>
                                  <span className="text-slate-500">₱{item.paid.toLocaleString()} / ₱{item.total.toLocaleString()} ({pct}%)</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* E. SAVINGS MILESTONES VIEW (Ate) */}
                    {activeReplicaTab === 'milestones' && (
                      <div className="space-y-3 flex-1 flex flex-col min-h-0 overflow-y-auto">
                        <div className="bg-[#121319] border border-white/5 p-2 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="text-[5.5px] text-slate-505 block font-bold uppercase">Total Saved Goals</span>
                            <span className="text-[10px] font-black text-slate-200 block mt-0.5">₱354,000.00</span>
                          </div>
                          <div className="w-6 h-6 rounded-full border border-violet-500/20 bg-violet-500/5 flex items-center justify-center">
                            <span className="text-[7.5px] font-black text-violet-400">62%</span>
                          </div>
                        </div>
                        <div className="bg-[#090A0E] border border-white/5 p-2 rounded-lg flex-1 min-h-0 overflow-y-auto space-y-2">
                          {[
                            { name: 'House Downpayment Fund', saved: 186000, target: 300000, progress: 62, color: 'from-violet-500 to-indigo-500' },
                            { name: 'Family Emergency Fund Buffer', saved: 150000, target: 150000, progress: 100, color: 'from-emerald-500 to-teal-500' },
                            { name: 'Graduation Cruise Trip', saved: 18000, target: 100000, progress: 18, color: 'from-amber-500 to-orange-500' }
                          ].map((goal, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-[6.5px]">
                                <span className="font-bold text-slate-350 truncate max-w-[140px]">{goal.name}</span>
                                <span className="text-slate-550">₱{goal.saved.toLocaleString()} / ₱{goal.target.toLocaleString()}</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                                  style={{ width: `${goal.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div> {/* End Simulator Main Content View */}
                </div>
              )}

            </div> {/* End Screen Inner Content Views */}
          </motion.div>
        </motion.div>

        {/* Black Hinge Connector */}
        <div className="w-[94%] h-[6px] bg-[#0c0d11] rounded-t-sm z-15 relative -mt-[4px] shrink-0 border-b border-[#222329]" />

        {/* ─── LAPTOP BASE (KEYBOARD & SHADOW) ─── */}
        <motion.div 
          animate={{ 
            height: isInView ? 92 : 22,
            rotateX: isInView ? 55 : 42,
            y: isInView ? -4 : 0
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.15 }}
          className="relative w-[94%] bg-gradient-to-b from-[#e5e5eb] via-[#dcdce2] to-[#bcbcc4] rounded-b-xl border-t border-white/60 z-10 origin-top overflow-hidden flex flex-col items-center shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
          style={{ 
            transformOrigin: 'top center',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 12px 32px rgba(0,0,0,0.4)'
          }}
        >
          {/* Thumb opening indent notch in the center edge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-[#96969c] rounded-b-sm border-b border-black/10 shrink-0" />
          
          {/* Keyboard & Speaker Grills Container */}
          <div className="w-[94%] flex justify-between items-center mt-1 shrink-0">
            {/* Left Speaker Grill - High-fidelity Dotted Metal Grill */}
            <div 
              className="w-[3%] h-[46px] opacity-40 select-none rounded-[1px]"
              style={{
                backgroundImage: 'radial-gradient(#111 25%, transparent 25%)',
                backgroundSize: '2.2px 2.2px'
              }}
            />

            {/* Keyboard Area - Dark Recess Well */}
            <div className="w-[90%] h-[46px] bg-[#0b0c0f] rounded-md border border-black/40 shadow-inner p-1 flex flex-col gap-[1.5px] justify-between shrink-0 relative">
              {/* Function row */}
              <div className="flex justify-between w-full h-[4.5px]">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className="w-[6%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] shadow-[0_0.5px_0.5px_rgba(0,0,0,0.4)] block" />
                ))}
              </div>
              {/* Number row */}
              <div className="flex justify-between w-full h-[5.5px]">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className="w-[6.2%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] shadow-[0_0.5px_0.5px_rgba(0,0,0,0.4)] block" />
                ))}
              </div>
              {/* QWERTY row */}
              <div className="flex justify-between w-full h-[5.5px]">
                <span className="w-[9%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="w-[6.2%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] shadow-[0_0.5px_0.5px_rgba(0,0,0,0.4)] block" />
                ))}
                <span className="w-[9%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
              </div>
              {/* ASDF row */}
              <div className="flex justify-between w-full h-[5.5px]">
                <span className="w-[11%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="w-[6.2%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] shadow-[0_0.5px_0.5px_rgba(0,0,0,0.4)] block" />
                ))}
                <span className="w-[11%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
              </div>
              {/* ZXCV row */}
              <div className="flex justify-between w-full h-[5.5px]">
                <span className="w-[14%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="w-[6.2%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] shadow-[0_0.5px_0.5px_rgba(0,0,0,0.4)] block" />
                ))}
                <span className="w-[14%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
              </div>
              {/* Spacebar row */}
              <div className="flex justify-between w-full h-[7px] items-center">
                <span className="w-[6%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                <span className="w-[6%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                <span className="w-[7%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                <span className="w-[8%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                <span className="flex-1 mx-1 h-[85%] bg-[#1a1b20] border border-black/60 rounded-[1.5px] shadow-[inset_0_0.5px_0.5px_rgba(255,255,255,0.05),0_0.5px_0.5px_rgba(0,0,0,0.4)] block" />
                <span className="w-[8%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                <span className="w-[7%] h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                {/* Arrow Keys Inverted T */}
                <span className="w-[15%] h-full flex gap-[1px]">
                  <span className="w-1/3 h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                  <span className="w-1/3 h-full flex flex-col justify-between">
                    <span className="h-[45%] bg-[#131417] border border-black/50 rounded-[1px] block" />
                    <span className="h-[45%] bg-[#131417] border border-black/50 rounded-[1px] block" />
                  </span>
                  <span className="w-1/3 h-full bg-[#131417] border border-black/50 rounded-[1.5px] block" />
                </span>
              </div>
            </div>

            {/* Right Speaker Grill - Dotted Metal Grill */}
            <div 
              className="w-[3%] h-[46px] opacity-40 select-none rounded-[1px]"
              style={{
                backgroundImage: 'radial-gradient(#111 25%, transparent 25%)',
                backgroundSize: '2.2px 2.2px'
              }}
            />
          </div>
          
          {/* Touchpad / Trackpad - Large Silver Glass Surface */}
          <div className="w-[44%] h-[26px] bg-gradient-to-b from-[#e1e1e6] via-[#d7d7dd] to-[#c1c1c9] rounded-md border border-[#a2a2aa]/50 mt-1 shadow-inner relative z-20 shrink-0">
            <div className="absolute inset-[0.5px] rounded-md bg-white opacity-20 pointer-events-none" />
          </div>
        </motion.div>

        {/* Glossy Desk Shadow */}
        <div className="absolute -bottom-8 w-[100%] h-12 bg-black/60 rounded-full blur-2xl z-0 pointer-events-none" />
      </div>
    </section>
  )
}
