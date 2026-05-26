import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProfileSelectionRoot } from './components/ProfileSelection'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'

// ─── Inner app: runs inside AuthProvider ─────────────────────
function AppInner() {
  const { user } = useAuth()
  const [selectedProfile, setSelectedProfile] = useState(null)
  // 'landing' | 'login' | 'register'
  const [authMode, setAuthMode] = useState('landing')

  // Still checking auth state (Firebase onAuthStateChanged hasn't fired yet)
  if (user === undefined) {
    return (
      <div style={{ minHeight: '100vh', background: '#050507', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 24, height: 24, border: '2px solid #0066FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // Already logged in → skip landing & auth
  if (user !== null) {
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

  // Not logged in → show landing / auth
  if (authMode === 'landing') {
    return (
      <LandingPage onGetStarted={(mode = 'login') => setAuthMode(mode)} />
    )
  }

  if (authMode === 'register') {
    return <RegisterPage onSwitchToLogin={() => setAuthMode('login')} />
  }

  return <LoginPage
    onSwitchToRegister={() => setAuthMode('register')}
    onBack={() => setAuthMode('landing')}
  />
}

// ─── Root: wraps everything with AuthProvider ─────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
