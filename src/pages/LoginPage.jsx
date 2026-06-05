import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import { auth, isFirebaseConfigured } from '../firebase'
import logo from '../assets/famly.png'

export default function LoginPage({ onSwitchToRegister, onBack }) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(getFriendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email address above, then click Forgot password.')
      return
    }
    if (!isFirebaseConfigured) {
      setError('Password reset is only available when Firebase is configured.')
      return
    }
    setResetLoading(true)
    setError('')
    try {
      await sendPasswordResetEmail(auth, email.trim())
      setResetSent(true)
    } catch (err) {
      setError(getFriendlyError(err.code))
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090A0F] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 60%)' }}
      />

      <div className="w-full max-w-sm relative z-10">
        {onBack && (
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1 mb-6 transition-colors active:scale-95 duration-75"
          >
            ← Back to home
          </button>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-1">
            <img src={logo} alt="Famly" className="h-8 object-contain" />
          </div>
          <h1 className="text-xl font-semibold text-slate-200 mt-2">Welcome back</h1>
          <p className="text-slate-400 text-xs mt-1">Sign in to your family ledger dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#16181D] border border-slate-800/60 rounded-xl p-6 space-y-4 shadow-xl">
          {!isFirebaseConfigured && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2.5 text-[11px] text-blue-400 leading-relaxed">
              ⚡ <strong>Demo Mode Active</strong>: Firebase configuration is missing in{' '}
              <code className="bg-[#090A0F] px-1 py-0.5 rounded text-[10px] text-slate-300">.env</code>. Running locally via LocalStorage.
            </div>
          )}

          {resetSent && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5 text-xs text-emerald-400">
              Password reset email sent. Check your inbox.
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-xs text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Email address</label>
            <input
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-400">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-[11px] text-slate-500 hover:text-blue-400 transition-colors disabled:opacity-50"
              >
                {resetLoading ? 'Sending…' : 'Forgot password?'}
              </button>
            </div>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#090A0F] border border-slate-800/60 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all active:scale-95 duration-75 shadow-sm disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-5">
          No account yet?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors active:scale-95 duration-75"
          >
            Create your family →
          </button>
        </p>

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
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
