import { Lock } from 'lucide-react'
import angrybird from '../assets/angrybird.jpg'
import smol from '../assets/smol.jpg'
import peppa from '../assets/peppa.jpg'
import beaver from '../assets/beaver.jpg'
import raptor from '../assets/raptor.jpg'
import totoro from '../assets/totoro.webp'

const MEMBERS = [
  {
    id: 'adrian',
    name: 'idi',
    image: angrybird,
    gradient: 'from-blue-600 to-blue-400',
    ring: 'ring-blue-500',
    glow: 'glow-blue',
    role: 'Adrian Salinas',
    hoverBorder: 'hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    onHold: false,
  },
  {
    id: 'la',
    name: 'smol',
    image: smol,
    gradient: 'from-purple-600 to-pink-400',
    ring: 'ring-purple-500',
    glow: 'glow-purple',
    role: 'Llarie Salinas',
    hoverBorder: 'hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(192,132,252,0.15)]',
    onHold: false,
  },
  {
    id: 'keisha',
    name: 'med girly',
    image: peppa,
    gradient: 'from-cyan-600 to-teal-400',
    ring: 'ring-cyan-500',
    glow: 'glow-blue',
    role: 'Keisha Salinas',
    hoverBorder: 'hover:border-pink-400/50 hover:shadow-[0_0_15px_rgba(244,114,182,0.15)]',
    onHold: false,
  },
  {
    id: 'cj',
    name: 'beaver',
    image: beaver,
    gradient: 'from-yellow-500 to-orange-400',
    ring: 'ring-yellow-500',
    glow: 'glow-yellow',
    role: 'Christian Salinas',
    hoverBorder: 'hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    onHold: false,
  },
  {
    id: 'bong',
    name: 'bongskie',
    image: raptor,
    gradient: 'from-emerald-600 to-slate-500',
    ring: 'ring-emerald-500',
    glow: '',
    role: 'Bong Salinas',
    hoverBorder: 'hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    onHold: false,
  },
  {
    id: 'glenda',
    name: 'totoro',
    image: totoro,
    gradient: 'from-rose-600 to-red-400',
    ring: 'ring-rose-500',
    glow: 'glow-red',
    role: 'Glenda Salinas',
    hoverBorder: 'hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    onHold: false,
  },
]

export default function ProfileSelection({ onSelect }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Minimal Background Subtle Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(16,185,129,0.02) 0%, transparent 40%)',
        }}
      />

      {/* Header */}
      <div className="fade-in mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span
            className="text-3xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Famly - Salinas Tracker
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight">
          Who is tracking?
        </h1>
        <p className="mt-2 text-slate-400 text-base">Select your profile to view your dashboard</p>
      </div>

      {/* Profile Grid */}
      <div className="fade-in grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-2xl">
        {MEMBERS.map((member, i) => (
          <button
            key={member.id}
            id={`profile-${member.id}`}
            onClick={() => onSelect(member)}
            disabled={member.onHold}
            className={`profile-card group relative flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${
              member.onHold
                ? 'bg-slate-900/50 border-slate-800/50 opacity-50 cursor-not-allowed'
                : `bg-slate-900 border-slate-800 ${member.hoverBorder}`
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* On Hold overlay */}
            {member.onHold && (
              <div className="absolute top-3 right-3 bg-slate-800 rounded-full p-1">
                <Lock size={12} className="text-slate-400" />
              </div>
            )}

            {/* Avatar */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-200 ${
                !member.onHold ? 'group-hover:scale-110' : ''
              }`}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl">{member.emoji}</span>
              )}
            </div>

            {/* Name */}
            <div className="text-center">
                <p className="text-slate-100 font-semibold text-sm sm:text-base leading-tight">{member.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{member.role}</p>
            </div>

            {/* Hover glow bar */}
            {!member.onHold && (
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r ${member.gradient} transition-all duration-300 group-hover:w-3/4`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="fade-in mt-16 text-center space-y-2">
        <p className="text-slate-400 text-xs italic font-medium max-w-md mx-auto">
          "I can do all things through Christ who strengthens me."
        </p>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
          Philippians 4:13
        </p>
        <div className="h-px w-8 bg-slate-800 mx-auto my-3" />
        <p className="text-slate-600 text-[10px]">
          Salinas Tracker • Shared family financial tracker
        </p>
      </div>
    </div>
  )
}
