import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react'

export default function ProblemSolutionResult() {
  const cards = [
    {
      title: "The Problem",
      subtitle: "BSP 2025 CFIS Research Data",
      icon: AlertCircle,
      color: "from-rose-500/20 to-red-500/5 border-rose-500/20",
      glow: "rgba(239, 68, 68, 0.05)",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      content: (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-rose-400 tracking-tight">34%</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">of Borrowers Struggle</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            According to the Bangko Sentral ng Pilipinas (BSP) 2025 Consumer Finance and Inclusion Survey, over a third of Filipino borrowers report severe difficulty making repayments, with <strong className="text-slate-200">8% falling into debt traps</strong> (borrowing from new lenders to service old loans) due to a complete lack of shared visibility.
          </p>
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-rose-500/10 flex items-start gap-2">
            <span className="text-xs shrink-0 mt-0.5">⚠️</span>
            <p className="text-[10.5px] text-rose-300/80 leading-snug">
              Tuition backlogs &amp; daily family operations are managed in scattered Messenger chats, leading to late penalties and family stress.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "The Solution",
      subtitle: "A Centralized Family Ledger OS",
      icon: ShieldCheck,
      color: "from-blue-500/20 to-indigo-500/5 border-blue-500/20",
      glow: "rgba(59, 130, 246, 0.05)",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      content: (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-blue-400 tracking-tight">100%</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Real-Time Sync</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Famly replaces notebooks and chats with a secure, real-time shared database. By connecting the whole household under a single secure login, every payment obligation is clear, transparent, and structured.
          </p>
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-blue-500/10 flex items-start gap-2">
            <span className="text-xs shrink-0 mt-0.5">💡</span>
            <p className="text-[10.5px] text-blue-300/80 leading-snug">
              Every family member gets their own Netflix-style profile. Mom tracks the mortgage, scholars see their semesters, Ate runs the planner.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "The Result",
      subtitle: "Financial Alignment & Growth",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20",
      glow: "rgba(16, 185, 129, 0.05)",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      content: (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-emerald-400 tracking-tight">0%</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Missed Deadlines</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            By shifting from manual notebooks to visual, automated payment pathways, households build a stable runway. Families clear debt interest backlogs, hit savings targets, and establish educational security together.
          </p>
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-emerald-500/10 flex items-start gap-2">
            <span className="text-xs shrink-0 mt-0.5">✅</span>
            <p className="text-[10.5px] text-emerald-300/80 leading-snug">
              15-minute average response time on GCC/setup issues, backed by PayMongo payment pathways accepting GCash, Maya, and local cards.
            </p>
          </div>
        </div>
      )
    }
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/40 relative z-10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">The Financial Reality</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Aligning Filipino households.<br />Solving structural debt.
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed">
          Why scattered chat groups and memory logs fail to keep your family budget secure—and how shared alignment cures financial stress.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {cards.map((card, idx) => {
          const IconComponent = card.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -6, 
                boxShadow: `0 30px 60px -15px rgba(0,0,0,0.8), 0 0 30px ${card.glow}`,
                borderColor: "rgba(255,255,255,0.12)"
              }}
              className={`bg-[#0C0D12] border ${card.color} rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300`}
            >
              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${card.badgeColor} uppercase tracking-wider`}>
                      {card.title}
                    </span>
                    <p className="text-[10px] text-slate-500 font-semibold">{card.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
                    <IconComponent size={16} />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 w-full" />

                {/* Content */}
                {card.content}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
