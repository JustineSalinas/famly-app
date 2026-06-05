// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/famly.png'
import { AlertCircle } from 'lucide-react'

export default function RegisterPage({ onSwitchToLogin, plan = 'STARTER', initialEmail = '' }) {
  const navigate = useNavigate()
  const { register, isFirebaseConfigured } = useAuth()
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await register(email, password, familyName, plan)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(getFriendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col lg:grid lg:grid-cols-12 overflow-hidden font-sans relative">
      
      {/* Dynamic Keyframes for Animated Dot Grid */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          55% { transform: scale(1.3); opacity: 0.75; }
        }
      `}</style>

      {/* ─── LEFT COLUMN: BRANDING & MINIMALIST HERO (lg:col-span-6) ─── */}
      <div className="hidden lg:flex lg:col-span-6 bg-[#030712] flex-col justify-between p-16 relative overflow-hidden z-10 select-none border-r border-slate-800/20">
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 filter blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)' }}
        />

        {/* Top Header Logo (Using official logo) */}
        <div className="flex items-center gap-2.5 relative z-10">
          <img src={logo} alt="Famly" className="h-10 object-contain" />
          <span className="text-2xl font-bold tracking-tight text-slate-100 -ml-1">Famly</span>
        </div>

        {/* Center Headline Block */}
        <div className="space-y-8 my-auto relative z-10 max-w-md">
          {/* Stacked values */}
          <div className="text-5xl font-black tracking-tight text-white leading-[1.1] space-y-1">
            <div>Track.</div>
            <div className="text-emerald-400">Plan.</div>
            <div>Thrive.</div>
            <div>Together.</div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-medium">
            One shared ledger operating system for your household. Schedule tuition installments, track savings milestones, and manage collaborative debt payoff ledgers.
          </p>

          {/* Quick Metrics / Sub-labels */}
          <div className="flex items-center gap-12 pt-6">
            <div>
              <div className="text-xs font-bold text-emerald-450 tracking-wide">Tuition</div>
              <div className="text-[9px] font-black text-slate-500 tracking-wider uppercase mt-0.5">TRACKER</div>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-450 tracking-wide">Milestone</div>
              <div className="text-[9px] font-black text-slate-500 tracking-wider uppercase mt-0.5">BOARD</div>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-450 tracking-wide">Debt</div>
              <div className="text-[9px] font-black text-slate-500 tracking-wider uppercase mt-0.5">PAYDOWN</div>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="text-[10px] text-slate-500 font-medium relative z-10">
          © 2026 Famly. Designed &amp; built by Justine Salinas.
        </div>
      </div>

      {/* ─── RIGHT COLUMN: GRID DOTS & FORM (lg:col-span-6) ─── */}
      <div 
        className="w-full lg:col-span-6 flex flex-col justify-center items-center px-6 sm:px-12 py-12 relative z-10 bg-[#090A0F] min-h-screen"
        style={{
          backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Breathing Hotspots behind the card */}
        <motion.div
          className="absolute w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [-10, 10, -10],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '15%', left: '15%' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] bg-emerald-600/5 rounded-full blur-[90px] pointer-events-none z-0"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.5, 0.8, 0.5],
            x: [20, -20, 20],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '15%', right: '15%' }}
        />

        {/* Live Animation Dot Grid (Left edge of Right Panel, similar to Commit layout) */}
        <div className="absolute left-6 top-0 bottom-0 w-24 hidden lg:flex flex-col justify-around py-16 pointer-events-none z-0">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              {Array.from({ length: 3 }).map((_, j) => {
                const isGlow = (i + j) % 3 === 0;
                const delay = (i * 0.15 + j * 0.25) % 3;
                return (
                  <div 
                    key={j} 
                    className={`w-1 h-1 rounded-full transition-all duration-1000 ${
                      isGlow ? 'bg-emerald-450 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-slate-800/80'
                    }`}
                    style={{
                      animation: 'pulseDot 3s infinite ease-in-out',
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm relative z-10">
          
          {/* Logo & Header for Mobile Only (hidden on desktop) */}
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img src={logo} alt="Famly" className="h-8 object-contain" />
              <span className="text-xl font-bold tracking-tight text-slate-100 -ml-1">Famly</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">Configure your family shared ledger today</p>
          </div>

          {/* Form Card */}
          <div className="bg-[#121318] border border-slate-800/40 rounded-2xl p-8 space-y-6 shadow-2xl relative z-10">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-slate-100">Create your family</h2>
              <p className="text-xs text-slate-400">Start tracking your family ledger roadmaps</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isFirebaseConfigured && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5 text-[10px] text-emerald-450 leading-relaxed flex gap-2 items-start">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <div>
                    ⚡ <strong>Demo Mode Active</strong>: Firebase configuration is missing. Running locally via LocalStorage.
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-2.5 text-xs text-rose-400 flex gap-2 items-start">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Family Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Family Name
                </label>
                <input
                  id="register-family-name"
                  type="text"
                  required
                  value={familyName}
                  onChange={e => setFamilyName(e.target.value)}
                  placeholder="e.g. The Garcia Family"
                  className="w-full bg-[#090A0F] border border-slate-800/50 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-150"
                />
              </div>

              {/* Email Address Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email address
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#090A0F] border border-slate-800/50 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-150"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#090A0F] border border-slate-800/50 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-150"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Confirm Password
                </label>
                <input
                  id="register-confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#090A0F] border border-slate-800/50 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-150"
                />
              </div>

              {/* Action Button */}
              <motion.button
                id="register-submit-btn"
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#090A0F] rounded-lg text-xs font-bold tracking-wider uppercase transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                {loading ? 'Creating account…' : 'Continue ▸'}
              </motion.button>
            </form>

            <div className="text-center text-[10px] text-slate-500 mt-4">
              Already have an account?{' '}
              <button
                id="switch-to-login"
                onClick={onSwitchToLogin}
                className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile-only Footer Credit */}
          <div className="text-center text-[9px] text-slate-600 mt-8 lg:hidden">
            © 2026 Famly. Designed &amp; built by Justine Salinas.
          </div>
        </div>
      </div>
    </div>
  )
}

function getFriendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.'
    case 'auth/invalid-email':
      return 'Invalid email address.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
