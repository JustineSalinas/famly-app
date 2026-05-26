import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProfileSelectionRoot } from './components/ProfileSelection'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// ─── Inner app: runs inside AuthProvider ─────────────────────
function AppInner() {
  const { user } = useAuth()
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'

  // Still checking auth state (Firebase onAuthStateChanged hasn't fired yet)
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Not logged in → show auth pages
  if (user === null) {
    if (authMode === 'register') {
      return <RegisterPage onSwitchToLogin={() => setAuthMode('login')} />
    }
    return <LoginPage onSwitchToRegister={() => setAuthMode('register')} />
  }

  // Logged in → show profile selection / dashboard
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

// ─── Root: wraps everything with AuthProvider ─────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </div>
  )
}
