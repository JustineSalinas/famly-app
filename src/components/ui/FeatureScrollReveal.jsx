import { motion } from 'framer-motion'
import {
  TrendingDown,
  GraduationCap,
  PiggyBank,
  Users,
  ClipboardList,
  Plug,
  Laptop,
  Shield,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Accent system — uniform styling tokens per capability color.
   Keeping layout identical across tiles is what removes the
   previous "scattered" feel; only the accent hue varies.
   ───────────────────────────────────────────────────────────── */
const ACCENTS = {
  blue: {
    chip: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    hoverBorder: 'hover:border-blue-500/40',
    glow: 'hover:shadow-[0_24px_60px_-20px_rgba(59,130,246,0.45)]',
    dot: 'bg-blue-400',
    arrow: 'group-hover:text-blue-400'
  },
  rose: {
    chip: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    hoverBorder: 'hover:border-rose-500/40',
    glow: 'hover:shadow-[0_24px_60px_-20px_rgba(244,63,94,0.45)]',
    dot: 'bg-rose-400',
    arrow: 'group-hover:text-rose-400'
  },
  emerald: {
    chip: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_24px_60px_-20px_rgba(16,185,129,0.45)]',
    dot: 'bg-emerald-400',
    arrow: 'group-hover:text-emerald-400'
  },
  amber: {
    chip: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_24px_60px_-20px_rgba(245,158,11,0.45)]',
    dot: 'bg-amber-400',
    arrow: 'group-hover:text-amber-400'
  },
  violet: {
    chip: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    glow: 'hover:shadow-[0_24px_60px_-20px_rgba(139,92,246,0.45)]',
    dot: 'bg-violet-400',
    arrow: 'group-hover:text-violet-400'
  },
  cyan: {
    chip: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-[0_24px_60px_-20px_rgba(6,182,212,0.45)]',
    dot: 'bg-cyan-400',
    arrow: 'group-hover:text-cyan-400'
  }
}

/* Capabilities grouped by the product's real module categories.
   Three rows of three = an organized, scannable bento. */
const GROUPS = [
  {
    label: 'Core Tracking',
    blurb: 'The ledgers your family checks every week.',
    items: [
      { icon: GraduationCap, accent: 'blue', name: 'Tuition Tracker', desc: 'Multi-scholar assessments and installment schedules in one view.', tag: 'Per-scholar' },
      { icon: TrendingDown, accent: 'rose', name: 'Debt Ledger', desc: 'Every creditor, balance, and due date — no more guessing.', tag: 'Multi-creditor' },
      { icon: PiggyBank, accent: 'emerald', name: 'Milestone Tracker', desc: 'Visual savings goals with live progress indicators.', tag: 'Goal-based' }
    ]
  },
  {
    label: 'Household Operations',
    blurb: 'Keep the day-to-day machinery running.',
    items: [
      { icon: ClipboardList, accent: 'amber', name: 'Family Planner', desc: 'Move household projects from idea board to active pipeline.', tag: 'Kanban' },
      { icon: Plug, accent: 'violet', name: 'SubSync / Utilities', desc: 'Monitor and trim recurring subscriptions and bills.', tag: 'Recurring' },
      { icon: Laptop, accent: 'cyan', name: 'Hardware & Assets', desc: 'Register family devices and track warranty windows.', tag: 'Warranty' }
    ]
  },
  {
    label: 'Wealth & Control',
    blurb: 'See the runway and who steers it.',
    items: [
      { icon: Shield, accent: 'emerald', name: 'Liquidity Vault', desc: 'Monitor emergency backing across every cash reserve.', tag: 'Reserves' },
      { icon: TrendingUp, accent: 'blue', name: 'Inbound Cashflow', desc: 'Project monthly runway from each income stream.', tag: 'Runway' },
      { icon: Users, accent: 'emerald', name: 'Personalized Profiles', desc: 'One account, dedicated workspace per family member.', tag: 'Per-member' }
    ]
  }
]

/* Single uniform capability tile */
function CapabilityTile({ item }) {
  const a = ACCENTS[item.accent]
  const Icon = item.icon
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } }
      }}
      className={`group relative flex flex-col gap-4 bg-[#101218] border border-white/5 rounded-2xl p-5 h-full transition-all duration-300 cursor-default ${a.hoverBorder} ${a.glow} hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${a.chip}`}>
          <Icon size={17} />
        </div>
        <ArrowUpRight size={15} className={`text-slate-700 transition-all duration-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${a.arrow}`} />
      </div>

      <div className="text-left">
        <h3 className="text-sm font-bold text-white leading-snug">{item.name}</h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
      </div>

      <div className="mt-auto pt-3 flex items-center gap-2 border-t border-white/5">
        <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{item.tag}</span>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FEATURE SHOWCASE (ROOT EXPORT)
   ───────────────────────────────────────────────────────────── */
export default function FeatureScrollReveal() {
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-slate-800/40 relative z-10">

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <p className="text-xs font-bold text-blue-500 tracking-widest uppercase font-mono">Platform Capabilities</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Every ledger, every asset—<br />live inside your family portal.
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed">
          Nine focused modules that replace the notebook <span className="italic">listahan</span>, scattered group chats, and monthly money misunderstandings — organized into three simple layers.
        </p>
      </div>

      {/* Grouped bento — three clean category rows */}
      <div className="space-y-12">
        {GROUPS.map((group, gi) => (
          <div key={group.label}>
            {/* Category label row */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[11px] font-black font-mono text-slate-600">
                {String(gi + 1).padStart(2, '0')}
              </span>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-sm font-bold text-slate-200 tracking-tight">{group.label}</h3>
                <span className="text-[11px] text-slate-600">{group.blurb}</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-800/80 to-transparent" />
            </div>

            {/* Tiles row */}
            <motion.div
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {group.items.map((item) => (
                <CapabilityTile key={item.name} item={item} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
