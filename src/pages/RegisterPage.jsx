// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/famly.png'

export default function RegisterPage({ onSwitchToLogin, plan = 'STARTER' }) {
  const { register, isFirebaseConfigured } = useAuth()
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
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
      // Auth state updates via onAuthStateChanged → App re-renders to show family setup
    } catch (err) {
      setError(getFriendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 60%)' }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-1">
            <img src={logo} alt="Famly" className="h-8 object-contain" />
          </div>
          <h1 className="text-xl font-semibold text-slate-200 mt-2">Create your family</h1>
          <p className="text-slate-400 text-xs mt-1">Start tracking your family ledger roadmaps</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#16181D] border border-slate-800/60 rounded-xl p-6 space-y-4 shadow-xl">
          {!isFirebaseConfigured && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2.5 text-[11px] text-blue-400 leading-relaxed">
              ⚡ <strong>Demo Mode Active</strong>: Firebase configuration is missing in <code className="bg-[#090A0F] px-1 py-0.5 rounded text-[10px] text-slate-300">.env</code>. Running locally via LocalStorage.
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-xs text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Family Name</label>
            <input
              id="register-family-name"
              type="text"
              required
              value={familyName}
              onChange={e => setFamilyName(e.target.value)}
              placeholder="e.g. The Garcia Family"
              className="w-full bg-[#090A0F] border border-slate-800/60 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Email address</label>
            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#090A0F] border border-slate-800/60 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Password</label>
            <input
              id="register-password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#090A0F] border border-slate-800/60 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Confirm Password</label>
            <input
              id="register-confirm-password"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#090A0F] border border-slate-800/60 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all active:scale-95 duration-75 shadow-md shadow-blue-900/10 border border-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account…' : 'Start Tracking'}
          </button>

          <p className="text-center text-[10px] text-slate-500 leading-normal">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>

        {/* Switch to login */}
        <p className="text-center text-xs text-slate-500 mt-5">
          Already have an account?{' '}
          <button
            id="switch-to-login"
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors active:scale-95 duration-75"
          >
            Sign in →
          </button>
        </p>

        {/* Scripture footer */}
        <p className="text-center text-slate-600 text-[10px] uppercase tracking-widest font-bold mt-8">
          "I can do all things through Christ who strengthens me."
        </p>
        <p className="text-center text-slate-600 text-[10px] mt-0.5">
          Philippians 4:13
        </p>
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
