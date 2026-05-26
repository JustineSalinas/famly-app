import { PauseCircle, ArrowLeftRight } from 'lucide-react'

export default function OnHoldDashboard({ profile }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center max-w-sm fade-in">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-800 border border-slate-700 mb-6 mx-auto">
          <PauseCircle size={44} className="text-slate-500" />
        </div>

        {/* Avatar */}
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-3xl opacity-50`}
        >
          {profile.emoji}
        </div>

        <h2 className="text-2xl font-bold text-slate-300 mb-2">{profile.name}'s Account</h2>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-slate-600 inline-block" />
          Account on Hold
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">
          This account has been temporarily suspended. Please contact a family admin to restore access and view financial data.
        </p>

        {/* Decorative grid */}
        <div className="mt-8 grid grid-cols-3 gap-3 opacity-20 pointer-events-none select-none">
          {['Balance', 'History', 'Reports', 'Goals', 'Budget', 'Cards'].map((label) => (
            <div key={label} className="h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center">
              <span className="text-xs text-slate-600">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-700">
          Locked • Famly Financial Tracker
        </p>
      </div>
    </div>
  )
}
