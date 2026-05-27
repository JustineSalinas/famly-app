import { useState, useEffect, Component } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProfileSelectionRoot } from './components/ProfileSelection'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'

function AppInner() {
  const { user, logout } = useAuth()
  const [selectedProfile, setSelectedProfile] = useState(null)
  // 'landing' | 'login' | 'register' | 'app'
  const [authMode, setAuthMode] = useState('landing')
  const [selectedPlan, setSelectedPlan] = useState('STARTER')

  // Auto-route to app on login/register success, and back to landing on sign out
  useEffect(() => {
    if (user !== null && (authMode === 'login' || authMode === 'register')) {
      setAuthMode('app')
    }
    if (user === null && authMode === 'app') {
      setAuthMode('landing')
    }
  }, [user, authMode])

  // Still checking auth state (Firebase onAuthStateChanged hasn't fired yet)
  if (user === undefined) {
    return (
      <div style={{ minHeight: '100vh', background: '#050507', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 24, height: 24, border: '2px solid #0066FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // If logged in AND authMode is 'app', enter the profile/dashboard workspace
  if (user !== null && authMode === 'app') {
    if (selectedProfile === null) {
      return <ProfileSelectionRoot onSelect={setSelectedProfile} />
    }
    return (
      <Dashboard
        profile={selectedProfile}
        onSwitch={() => setSelectedProfile(null)}
      />
    )
  }

  // Not logged in OR authMode is not 'app' → show landing / auth pages
  if (authMode === 'landing') {
    return (
      <LandingPage
        user={user}
        onLogout={logout}
        onGetStarted={(mode = 'login', plan = 'STARTER') => {
          if (mode === 'app') {
            setAuthMode('app')
          } else {
            setAuthMode(mode)
            setSelectedPlan(plan)
          }
        }}
      />
    )
  }

  if (authMode === 'register') {
    return <RegisterPage onSwitchToLogin={() => setAuthMode('login')} plan={selectedPlan} />
  }

  return <LoginPage
    onSwitchToRegister={() => {
      setSelectedPlan('STARTER')
      setAuthMode('register')
    }}
    onBack={() => setAuthMode('landing')}
  />
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="w-full max-w-md bg-[#16181D] border border-red-500/20 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <h2 className="text-base font-bold text-red-400">Application Error</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected error occurred in the React rendering tree. This is usually caused by a Firebase initialization, configuration, or database rules issue.
            </p>
            <div className="bg-[#090A0F] border border-white/5 rounded-xl p-3 text-[10px] font-mono text-red-300 overflow-auto max-h-40 whitespace-pre-wrap">
              {this.state.error?.toString() || 'Unknown Error'}
            </div>
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 duration-75"
            >
              Reset Session &amp; Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// ─── Root: wraps everything with AuthProvider ─────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ErrorBoundary>
  )
}
