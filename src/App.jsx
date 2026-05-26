import { useState } from 'react'
import ProfileSelection from './components/ProfileSelection'
import Dashboard from './components/Dashboard'

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      {selectedProfile === null ? (
        <ProfileSelection onSelect={setSelectedProfile} />
      ) : (
        <Dashboard profile={selectedProfile} onSwitch={() => setSelectedProfile(null)} />
      )}
    </div>
  )
}
