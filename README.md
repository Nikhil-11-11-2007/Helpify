# NexaSupport — Frontend

> AI-Powered Customer Support SaaS — React (Vite) Frontend  
> Part of the MERN stack. This repo covers **frontend only**.

---

## What Is This Project?

NexaSupport is a multi-tenant AI customer support platform. Businesses register, connect their FAQ data, and deploy an AI agent that handles customer queries automatically — routing only complex tickets to human agents.

This frontend connects to a separate Express/Node.js backend built by the backend team. Our job is the React UI layer.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | UI framework and dev server |
| React Router DOM v6 | Client-side routing (`createBrowserRouter`) |
| Redux Toolkit | Global state management (slices) |
| Axios | HTTP client for API calls |
| SASS (SCSS) | Styling — modular `.scss` per component |
| GSAP | Advanced animations |

---

## Folder Structure

```
Frontend/
└── src/
    ├── main.jsx                        # App entry point — mounts React + imports global styles
    │
    ├── app/
    │   ├── App.jsx                     # Root component
    │   ├── App.scss                    # App-level style overrides
    │   └── store.js                    # Redux store (configureStore)
    │
    ├── styles/                         # Global shared styles — imported once in main.jsx
    │   ├── _variables.scss             # All colors, spacing, typography tokens
    │   ├── _mixins.scss                # Reusable SCSS mixins (flex helpers, input base, etc.)
    │   ├── _reset.scss                 # CSS normalize/reset
    │   ├── _typography.scss            # Font imports (Sora + DM Sans) and base body styles
    │   └── index.scss                  # Imports all partials — this is the single global entry
    │
    ├── routes/
    │   └── AppRouter.jsx               # All routes defined here using createBrowserRouter
    │
    ├── layers/                         # 4-layer architecture — see below
    │   ├── ui/                         # Layer 1 — UI (pages + components)
    │   ├── state/                      # Layer 2 — Redux slices
    │   ├── hooks/                      # Layer 3 — Custom hooks
    │   ├── services/                   # Layer 4 — API call functions (Axios)
    │   └── animations/                 # GSAP animation functions (separate from hooks)
    │
    └── utils/
        ├── constants.js                # App-wide constants (API base URL, keys, etc.)
        └── helpers.js                  # Pure utility functions
```

---

## 4-Layer Architecture

Every feature follows this strict separation. **Do not mix layers.**

```
UI Layer  →  Hook Layer  →  State Layer  →  Services Layer
(JSX/SCSS)   (useX.js)      (x.slice.js)    (api.x.js)
```

### Layer 1 — UI (`layers/ui/`)
Pages and components. JSX + SCSS only. No direct API calls, no Redux `dispatch` — all that goes through hooks.

```
ui/
├── pages/
│   ├── auth/
│   │   ├── LoginPage/        LoginPage.jsx + LoginPage.scss
│   │   └── RegisterPage/     RegisterPage.jsx + RegisterPage.scss
│   ├── dashboard/            DashboardPage
│   ├── business/             BusinessPage
│   ├── faqs/                 FaqsPage
│   ├── chat/                 ChatPage
│   └── tickets/              TicketsPage
│
└── components/
    ├── shared/               Button, Input, Modal, Loader, Navbar, Sidebar
    └── layout/               AuthLayout, DashboardLayout
```

> **Rule:** Every page and component lives in its own folder with a matching `.scss` file. No inline styles.

---

### Layer 2 — State (`layers/state/`)
Redux Toolkit slices. One slice per domain.

```
state/
├── auth/         auth.slice.js      — user session, tokens
├── business/     business.slice.js  — business profile data
├── faqs/         faqs.slice.js      — FAQ list
├── chat/         chat.slice.js      — active chat sessions
└── tickets/      tickets.slice.js   — support tickets
```

Each slice holds: `initialState`, `reducers`, and `extraReducers` (for async thunks).

---

### Layer 3 — Hooks (`layers/hooks/`)
Custom hooks that connect UI to state and services. This is the only layer allowed to call `useDispatch` / `useSelector`.

```
hooks/
├── useAuth.js
├── useBusiness.js
├── useFaqs.js
├── useChat.js
└── useTickets.js
```

> **Example:** `LoginPage` calls `useAuth()` → hook dispatches → slice updates → service hits the API.

---

### Layer 4 — Services (`layers/services/`)
Pure Axios functions. No React, no Redux — just API calls that return data.

```
services/
├── api.client.js     # Shared Axios instance (baseURL + auth interceptors)
├── api.auth.js       # login, register, logout, refresh
├── api.business.js   # get/update business info
├── api.faqs.js       # CRUD for FAQs
├── api.chat.js       # chat sessions
└── api.tickets.js    # ticket management
```

> **Rule:** `api.client.js` is the only file that sets the base URL and attaches the auth token. All other service files import from it.

---

### Animations (`layers/animations/`)
GSAP animation functions, kept completely separate from hooks and UI logic.

```
animations/
├── gsap.config.js        # Registers GSAP plugins once (import in main.jsx)
├── auth.animations.js    # Login + Register page animations
└── shared.animations.js  # Reusable fadeIn, slideUp, pageExit helpers
```

Usage — call inside `useEffect` with a `ref`:
```js
const pageRef = useRef(null);
useEffect(() => { animateFormEntry(pageRef); }, []);
```

---

## SCSS Architecture

Global styles live in `src/styles/` and are imported **once** in `main.jsx`. Never import `index.scss` inside a component.

Each component imports only what it needs:
```scss
// At top of any component .scss file
@use '../../../../styles/variables' as *;
@use '../../../../styles/mixins' as *;
```

All colors, spacing, fonts, and shadows are defined as variables in `_variables.scss`. **Never hardcode a color value in a component file.**

### Brand Colors
| Variable | Hex | Usage |
|---|---|---|
| `$color-primary` | `#471EA7` | Buttons, links, focus rings, borders |
| `$color-deep` | `#110C29` | CTA buttons, dark backgrounds |
| `$color-white` | `#FFFFFF` | Surfaces, form backgrounds |
| `$color-border` | `#D1D1D1` | Input borders, dividers |
| `$color-bg` | `#F7F6FC` | Page background |

---

## Routing

All routes are defined in `src/routes/AppRouter.jsx` using `createBrowserRouter`.

| URL | Component | Layout |
|---|---|---|
| `/` | → redirects to `/auth/login` | — |
| `/auth/login` | `LoginPage` | `AuthLayout` |
| `/auth/register` | `RegisterPage` | `AuthLayout` |
| `/dashboard` | `DashboardPage` | `DashboardLayout` *(coming soon)* |
| `/business` | `BusinessPage` | `DashboardLayout` *(coming soon)* |
| `/faqs` | `FaqsPage` | `DashboardLayout` *(coming soon)* |
| `/chat` | `ChatPage` | `DashboardLayout` *(coming soon)* |
| `/tickets` | `TicketsPage` | `DashboardLayout` *(coming soon)* |

Protected routes (requiring auth) will use a `<PrivateRoute>` wrapper — to be added when the auth state layer is wired up.

---

## Current Status

| Area | Status |
|---|---|
| Folder structure | ✅ Done |
| Global SCSS setup | ✅ Done |
| `AuthLayout` (left panel + right form area) | ✅ Done |
| `LoginPage` — static UI | ✅ Done |
| `RegisterPage` — static UI | ✅ Done |
| GSAP setup + animation files | ✅ Done |
| Redux store + slices | 🔲 Scaffolded, logic pending |
| Custom hooks | 🔲 Scaffolded, logic pending |
| API service layer | 🔲 Scaffolded, pending backend API |
| Dashboard + inner pages UI | 🔲 Not started |
| Auth logic (login/register) | 🔲 Pending API |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Add backend URL to .env
VITE_API_BASE_URL=http://localhost:5000/api

# 4. Start dev server
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the `Frontend/` root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> All env variables must be prefixed with `VITE_` to be accessible in the React app.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `LoginPage.jsx` |
| SCSS files | PascalCase, match component | `LoginPage.scss` |
| Hook files | camelCase, `use` prefix | `useAuth.js` |
| Service files | camelCase, `api.` prefix | `api.auth.js` |
| Slice files | camelCase, `.slice` suffix | `auth.slice.js` |
| CSS classes | BEM with component prefix | `.login-page__input-wrap` |
| SCSS variables | `$color-`, `$space-`, `$font-` | `$color-primary` |

---

## Team

| Role | Scope |
|---|---|
| Backend | `Backend/` — Express, MongoDB, Socket.IO, AI layer |
| Frontend | `Frontend/` — React, Redux, UI, Animations |

> Backend API docs will be shared separately. Connect via `api.client.js` once endpoints are ready.