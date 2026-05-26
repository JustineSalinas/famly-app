# Famly — Day 1 + Day 2 Tasks

## Day 1 — Cleanup & Generalize ✅

- [x] Fix `salinas_debt_` → `famly_debt_${profile.id}` in DebtDashboard
- [x] Fix `salinas_milestone_` → `famly_milestone_${profile.id}` in MilestoneDashboard
- [x] Fix `salinas_plans_bong` → `famly_plans_${profile.id}` in PlannerDashboard
- [x] Fix `salinas_tuition_` → `famly_tuition_${profile.id}` in TuitionDashboard
- [x] Remove hardcoded BDO + Security Bank debt defaults → empty slate
- [x] Remove hardcoded school names (University of San Agustin, etc.) → blank defaults
- [x] Remove "Glenda's active debt obligations" → `${profile.name}'s active debt obligations`
- [x] Remove "Salinas Analytics Overview" → "Family Analytics Overview"
- [x] Remove "Salinas" breadcrumb → "Famly"
- [x] Remove hardcoded member ID routing in `getDashboardMeta()` → uses `profile.dashboardType`
- [x] Remove hardcoded routing `['adrian','la','keisha']` → uses `profile.dashboardType`
- [x] Replace static MEMBERS array with dynamic family management system
- [x] Add emoji avatar picker (32+ emoji options)
- [x] Add gradient color picker for profile cards
- [x] Add dashboard type selector (tuition, milestone, debt, planner)
- [x] Add family name setup screen for first-time users
- [x] Add "Manage Family" button to add/edit/delete members
- [x] Persist family config to `famly_family_config` localStorage key
- [x] Remove photo imports (angrybird, smol, peppa, etc.) — replaced with emoji

## Day 2 — Firebase Authentication ✅

- [x] Install Firebase SDK (`npm install firebase`)
- [x] Create `src/firebase.js` — Firebase init with env vars + placeholders
- [x] Create `src/context/AuthContext.jsx` — auth state provider (login, register, logout)
- [x] Create `src/pages/LoginPage.jsx` — email + password login form
- [x] Create `src/pages/RegisterPage.jsx` — family name + email + password registration
- [x] Update `src/App.jsx` — full auth routing (loading → auth → profile → dashboard)
- [x] Add `logout` button to Dashboard settings tab
- [x] Create `.env.example` — Firebase config template
- [ ] **USER ACTION NEEDED**: Create `.env` file and paste Firebase credentials
- [ ] **USER ACTION NEEDED**: Enable Email/Password Auth in Firebase Console
- [ ] Test login/register/logout flow end-to-end

## Up Next — Day 3
- [ ] Enable Firestore in Firebase Console
- [ ] Move all localStorage data to Firestore
- [ ] Create `useFirestore()` custom hook
- [ ] Add loading states while data fetches
