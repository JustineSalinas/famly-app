import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, TrendingUp, DollarSign, ArrowUpRight, Zap, Target } from 'lucide-react'

export default function DashboardScrollPreview() {
  const containerRef = useRef(null)
  
  // Trigger lid open when section is in view
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.35
  })

  const [activeReplicaTab, setActiveReplicaTab] = useState('liquidity')

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
          Scroll down to watch the laptop open. Click navigation tabs inside the simulator to explore different sub-dashboards in real time.
        </p>
      </div>

      {/* 3D Laptop Perspective Wrapper */}
      <div 
        className="relative w-full max-w-[840px] mx-auto flex flex-col items-center select-none"
        style={{ perspective: '1500px' }}
      >
        
        {/* ─── LAPTOP LID (SCREEN) ─── */}
        <motion.div
          variants={lidVariants}
          initial="closed"
          animate={isInView ? 'open' : 'closed'}
          className="relative w-[92%] h-[380px] md:h-[460px] bg-[#16181D] rounded-t-2xl border-[10px] border-[#22242a] shadow-2xl flex flex-col overflow-hidden origin-bottom z-20"
          style={{ 
            transformStyle: 'preserve-3d',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9), 0 -20px 40px -10px rgba(0,0,0,0.5)'
          }}
        >
          {/* Web camera notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-b-md z-50 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#111] border border-blue-900/40 shadow-inner" />
          </div>

          {/* Screen Content Wrapper */}
          <motion.div
            variants={screenContentVariants}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
            className="w-full h-full flex flex-row bg-[#08090C] text-slate-300 relative overflow-hidden"
          >
            {/* Glossy screen glare reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.07] pointer-events-none z-30" />

            {/* Screen Inner Glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />

            {/* SIMULATOR SIDEBAR */}
            <div className="w-[28%] md:w-[25%] bg-[#060709] border-r border-white/5 flex flex-col p-2.5 md:p-4 shrink-0 z-10 text-left">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center">
                  <span className="text-[9px] text-white font-extrabold">F</span>
                </div>
                <span className="text-[10px] font-black text-slate-100 tracking-tight">Famly</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[6.5px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">Assets & Wealth</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveReplicaTab('liquidity')}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[8px] font-bold transition-all ${
                        activeReplicaTab === 'liquidity'
                          ? 'bg-blue-600/10 text-blue-400 border-l border-blue-500'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                      }`}
                    >
                      <Shield size={10} />
                      Liquidity Vault
                    </button>
                    <button
                      onClick={() => setActiveReplicaTab('cashflow')}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[8px] font-bold transition-all ${
                        activeReplicaTab === 'cashflow'
                          ? 'bg-blue-600/10 text-blue-400 border-l border-blue-500'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                      }`}
                    >
                      <TrendingUp size={10} />
                      Inbound Cashflow
                    </button>
                    <button
                      onClick={() => setActiveReplicaTab('milestones')}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[8px] font-bold transition-all ${
                        activeReplicaTab === 'milestones'
                          ? 'bg-blue-600/10 text-blue-400 border-l border-blue-500'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                      }`}
                    >
                      <Target size={10} />
                      Savings Goals
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[6.5px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">Active profiles</p>
                  <div className="flex -space-x-1">
                    {['👩', '👦', '👧'].map((avatar, idx) => (
                      <div 
                        key={idx} 
                        className="w-4 h-4 rounded-full border border-[#060709] bg-slate-800 flex items-center justify-center text-[7px]"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom status */}
              <div className="mt-auto border-t border-white/5 pt-2.5 flex items-center gap-1.5 text-[7px] text-slate-500">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                <span>Sim Connected</span>
              </div>
            </div>

            {/* SIMULATOR MAIN CONTENT VIEW */}
            <div className="flex-1 bg-[#0c0d12] flex flex-col p-4 md:p-6 overflow-hidden z-10 text-left">
              
              {/* Header inside display */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-4">
                <div>
                  <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Fintech Simulation</span>
                  <h3 className="text-xs font-black text-slate-100 mt-0.5">
                    {activeReplicaTab === 'liquidity' && 'Liquidity Vault & Asset Coverage'}
                    {activeReplicaTab === 'cashflow' && 'Inbound Cashflow & Monthly Runway'}
                    {activeReplicaTab === 'milestones' && 'Milestone Goals & Savings Sync'}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[7px] font-bold text-slate-400 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                  <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                  PRO
                </div>
              </div>

              {/* DYNAMIC VIEW CONTENT */}
              {activeReplicaTab === 'liquidity' && (
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-[#121319] border border-white/5 p-2 rounded-lg">
                      <span className="text-[6px] text-slate-500 block font-bold uppercase">Emergency Fund Buffer</span>
                      <span className="text-[11px] font-black text-slate-200 block mt-0.5">₱150,000.00</span>
                      <span className="text-[5px] text-emerald-400 mt-0.5 block font-medium">Fully Backed (6 months runway)</span>
                    </div>
                    <div className="bg-[#121319] border border-white/5 p-2 rounded-lg">
                      <span className="text-[6px] text-slate-500 block font-bold uppercase">High-Yield Deposits</span>
                      <span className="text-[11px] font-black text-slate-200 block mt-0.5">₱225,400.00</span>
                      <span className="text-[5px] text-blue-400 mt-0.5 block font-medium">Earns 5.5% p.a. compound interest</span>
                    </div>
                  </div>

                  {/* Asset ledger table */}
                  <div className="bg-[#090A0E] border border-white/5 p-3 rounded-lg flex-1">
                    <div className="flex justify-between text-[6px] font-bold text-slate-500 border-b border-white/5 pb-1 mb-2">
                      <span>Holding Institution</span>
                      <span>Asset Class</span>
                      <span>Balance</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { bank: 'BPI Save-Up Account', type: 'Cash Equivalents', bal: '₱150,000.00', color: 'text-emerald-400' },
                        { bank: 'Maya Business Vault', type: 'Liquid Capital', bal: '₱75,400.00', color: 'text-emerald-400' },
                        { bank: 'Gotyme Goal Saver', type: 'Time Deposit', bal: '₱150,000.00', color: 'text-blue-400' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[7px] border-b border-white/[0.02] pb-1">
                          <div>
                            <span className="font-bold text-slate-200 block leading-tight">{item.bank}</span>
                            <span className="text-[5.5px] text-slate-500 leading-none">{item.type}</span>
                          </div>
                          <span className="text-slate-500">Fixed Yield</span>
                          <span className={`font-extrabold ${item.color} text-right`}>{item.bal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeReplicaTab === 'cashflow' && (
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-[#121319] border border-white/5 p-2 rounded-lg">
                      <span className="text-[6px] text-slate-500 block font-bold uppercase">Household Monthly Net</span>
                      <span className="text-[11px] font-black text-slate-200 block mt-0.5">₱84,200.00</span>
                      <span className="text-[5px] text-emerald-400 mt-0.5 block font-medium">↗ 12.3% from payroll sources</span>
                    </div>
                    <div className="bg-[#121319] border border-white/5 p-2 rounded-lg">
                      <span className="text-[6px] text-slate-500 block font-bold uppercase">Fixed Subscriptions</span>
                      <span className="text-[11px] font-black text-slate-200 block mt-0.5">₱4,590.00</span>
                      <span className="text-[5px] text-rose-400 mt-0.5 block font-medium">Includes Netflix, ISP & Cloud storage</span>
                    </div>
                  </div>

                  {/* Cashflow bar chart */}
                  <div className="bg-[#090A0E] border border-white/5 p-3 rounded-lg flex-1 flex flex-col justify-between">
                    <div className="text-[6px] font-bold text-slate-500 uppercase tracking-wider mb-2">Net Cashflow Inflow (Last 5 Months)</div>
                    <div className="flex justify-between items-end h-[60px] px-2 mt-auto">
                      {[
                        { month: 'Jan', val: 40, amt: '₱65k' },
                        { month: 'Feb', val: 55, amt: '₱72k' },
                        { month: 'Mar', val: 70, amt: '₱80k' },
                        { month: 'Apr', val: 65, amt: '₱78k' },
                        { month: 'May', val: 90, amt: '₱84k' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 gap-1">
                          <span className="text-[5px] text-slate-400 font-semibold">{item.amt}</span>
                          <div className="w-4 bg-blue-500/20 hover:bg-blue-500/40 rounded-t border-t border-blue-400/40 transition-all cursor-pointer" style={{ height: `${item.val}px` }} />
                          <span className="text-[5.5px] text-slate-500">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeReplicaTab === 'milestones' && (
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Goal Overview */}
                  <div className="bg-[#121319] border border-white/5 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[6px] text-slate-500 block font-bold uppercase">Total Goals Stashed</span>
                      <span className="text-[11px] font-black text-slate-200 block mt-0.5">₱450,000.00</span>
                      <span className="text-[5.5px] text-slate-400 mt-0.5 block">62.5% combined progress across 3 targets</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-violet-500/20 bg-violet-500/5 flex items-center justify-center">
                      <span className="text-[9px] font-black text-violet-400">62%</span>
                    </div>
                  </div>

                  {/* Goal Progress Blocks */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {[
                      { name: 'House Downpayment Fund', saved: '₱186,000', target: '₱300,000', progress: 62, color: 'from-violet-500 to-indigo-500' },
                      { name: 'Family Emergency Fund Buffer', saved: '₱150,000', target: '₱150,000', progress: 100, color: 'from-emerald-500 to-teal-500' },
                      { name: 'Graduation Cruise Trip', saved: '₱18,000', target: '₱100,000', progress: 18, color: 'from-amber-500 to-orange-500' }
                    ].map((goal, idx) => (
                      <div key={idx} className="bg-[#090A0E] border border-white/5 p-2 rounded-lg">
                        <div className="flex justify-between items-center text-[7.5px] mb-1">
                          <span className="font-bold text-slate-300">{goal.name}</span>
                          <span className="text-slate-500">{goal.saved} / {goal.target}</span>
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

            </div>
          </motion.div>
        </motion.div>

        {/* ─── LAPTOP BASE (KEYBOARD & SHADOW) ─── */}
        <div 
          className="relative w-full h-[35px] bg-[#1d1f24] rounded-b-xl border-t border-[#31333a] z-10 origin-top overflow-hidden flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          style={{ 
            transform: 'rotateX(50deg) translateY(-2px)',
            transformOrigin: 'top center',
            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.15)'
          }}
        >
          {/* Subtle metal keyboard indentation */}
          <div className="w-[85%] h-5 bg-[#14151a] rounded-md mt-1.5 border border-[#2a2c33] shadow-inner relative flex justify-center items-center">
            {/* Keyboard Grid Effect */}
            <div className="w-[96%] h-[70%] border-t border-b border-[#2d303b]/40 flex justify-between px-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-[4%] h-full bg-[#1b1c21] border-l border-r border-[#262832]/40 rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* Touchpad details */}
          <div className="w-[20%] h-3.5 bg-[#1e2026] rounded-sm mt-0.5 border border-[#2c2e36] shadow-sm" />
        </div>

        {/* Glossy Desk Shadow */}
        <div className="absolute -bottom-8 w-[100%] h-12 bg-black/60 rounded-full blur-2xl z-0 pointer-events-none" />
      </div>
    </section>
  )
}
