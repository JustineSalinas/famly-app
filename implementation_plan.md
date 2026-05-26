# Famly — Day 1 + Day 2 Implementation Plan

## Goal
Complete Day 1 (remove all Salinas-specific hardcoding, make the app generic) and Day 2 (Firebase Authentication) in one session.

---

## Day 1 — Cleanup & Generalize

### What's still hardcoded (to fix):

| Item | Location | Fix |
|------|----------|-----|
| `salinas_` localStorage prefixes | All 4 dashboards | → `famly_${familyId}_...` |
| Salinas family member names/images | `ProfileSelection.jsx` | → Emoji avatar picker |
| `"Salinas Tracker"` title | `ProfileSelection.jsx` | → `"Famly"` |
| `"Salinas Analytics Overview"` | `Dashboard.jsx` | → Dynamic family name |
| `"Salinas"` breadcrumb | `Dashboard.jsx` | → Dynamic family name |
| Hardcoded member IDs in routing | `Dashboard.jsx` (`getDashboardMeta`) | → Use `profile.dashboardType` |
| `"Salinas Tracker • Shared family financial tracker"` footer | `ProfileSelection.jsx` | → Generic |
| `"Glenda's active debt obligations"` | `DebtDashboard.jsx` | → `${profile.name}'s...` |

### Architecture Changes
- Replace static `MEMBERS` array with **dynamic family config** stored in `localStorage`
- Add a **"Set Up Your Family"** flow: first-time users enter family name + add members (name, emoji avatar, dashboard type)
- Support 4 dashboard types: `tuition`, `milestone`, `debt`, `planner`
- Use `famly_${familyId}_${dashboardType}_${memberId}` as storage keys

---

## Day 2 — Firebase Authentication

### Setup
- Install Firebase: `npm install firebase`
- Create `src/firebase.js` with config
- Enable Email/Password Auth in Firebase Console

### New Files
| File | Purpose |
|------|---------|
| `src/firebase.js` | Firebase init |
| `src/context/AuthContext.jsx` | Auth state provider |
| `src/pages/LoginPage.jsx` | Login form |
| `src/pages/RegisterPage.jsx` | Register (family name + email + password) |

### Modified Files
| File | Change |
|------|--------|
| `src/App.jsx` | Add auth routing (if not logged in → Login, if new family → Onboarding) |
| `src/components/Dashboard.jsx` | Add logout button in Settings tab |
| `src/components/ProfileSelection.jsx` | Make family members editable, load from auth context |

### Auth Flow
```
App loads
  ├── Not logged in → LoginPage / RegisterPage
  ├── Logged in, no family set up → OnboardingPage (Day 5)
  └── Logged in, family set up → ProfileSelection → Dashboard
```

> [!IMPORTANT]
> For Day 2, Firebase credentials (API key, project ID, etc.) will be needed. The user must create a Firebase project and provide the config, OR we can scaffold the code with placeholder config that the user fills in.

---

## Execution Order

1. Fix all hardcoded Salinas text/data in existing files (Day 1)
2. Build family setup/onboarding flow with emoji picker (Day 1)
3. Install Firebase + scaffold auth files (Day 2)
4. Build Login & Register pages (Day 2)
5. Wire up auth context to App.jsx (Day 2)
6. Add logout to Settings (Day 2)

## Verification
- App loads with no Salinas-specific data for a new browser session
- Family can be set up with custom name and members
- Login / Register / Logout works with Firebase
