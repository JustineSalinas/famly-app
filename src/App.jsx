import { useState, useEffect, Component } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProfileSelectionRoot } from './components/ProfileSelection'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'

// ─── Auth Guard: redirects unauthenticated users to /login ────
function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (user === undefined) return <LoadingSpinner />
  if (user === null) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

// ─── Guest Guard: redirects logged-in users to /app ──────────
function RequireGuest({ children }) {
  const { user } = useAuth()
  if (user === undefined) return <LoadingSpinner />
  if (user !== null) return <Navigate to="/app" replace />
  return children
}

function LoadingSpinner() {
  return (
    <div style={{ minHeight: '100vh', background: '#050507', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 24, height: 24, border: '2px solid #0066FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── App Workspace (profile selection + dashboard) ────────────
function AppWorkspace() {
  const [selectedProfile, setSelectedProfile] = useState(null)

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

// ─── Landing wrapper — passes nav helpers to LandingPage ─────
function LandingWrapper() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <LandingPage
      user={user}
      onLogout={logout}
      onGetStarted={(mode = 'login', plan = 'STARTER', email = '') => {
        if (mode === 'app') {
          navigate('/app')
        } else if (mode === 'register') {
          navigate('/register', { state: { plan, email } })
        } else {
          navigate('/login')
        }
      }}
    />
  )
}

// ─── Register wrapper — receives plan/email from router state ─
function RegisterWrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const { plan = 'STARTER', email = '' } = location.state || {}

  return (
    <RegisterPage
      onSwitchToLogin={() => navigate('/login')}
      plan={plan}
      initialEmail={email}
    />
  )
}

// ─── Login wrapper ────────────────────────────────────────────
function LoginWrapper() {
  const navigate = useNavigate()

  return (
    <LoginPage
      onSwitchToRegister={() => navigate('/register', { state: { plan: 'STARTER', email: '' } })}
      onBack={() => navigate('/')}
    />
  )
}

// ─── Inner router (needs AuthContext already mounted) ─────────
function AppInner() {
  return (
    <Routes>
      <Route path="/" element={<LandingWrapper />} />

      <Route
        path="/login"
        element={
          <RequireGuest>
            <LoginWrapper />
          </RequireGuest>
        }
      />

      <Route
        path="/register"
        element={
          <RequireGuest>
            <RegisterWrapper />
          </RequireGuest>
        }
      />

      <Route
        path="/app/*"
        element={
          <RequireAuth>
            <AppWorkspace />
          </RequireAuth>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// ─── Error Boundary ───────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
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
              An unexpected error occurred. This is usually caused by a Firebase initialization or configuration issue.
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

// ─── Root ─────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ErrorBoundary>
  )
}
