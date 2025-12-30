# Copilot Instructions for Event Registration App (Frontend)

## Project Overview
- **React SPA** for event registration, using React Router for navigation.
- Main features: user authentication, event browsing, registration management.
- API communication via `axios` in `Services/api.js` (backend assumed at `http://localhost:9000/api`).

## Key Architecture
- **Pages**: Each route (Home, Login, Register, Events, MyRegistrations) is a separate component in `pages/`.
- **Navigation**: Centralized in `App.js` via a custom `Navigation` component and React Router.
- **Auth Context**: `Context/AuthContext.js` provides authentication state and actions (`login`, `register`, `logout`). Use `useAuth()` for access.
- **API Layer**: All backend calls are abstracted in `Services/api.js` with token-based auth (JWT in localStorage).
- **Styling**: CSS-in-JS for most components, global styles in `App.css`, page-specific styles in `pages/*.css`.

## Developer Workflows
- **Start App**: (Assumed) Use `npm start` or `yarn start` from the project root.
- **API Server**: Must be running at `http://localhost:9000/api` for full functionality.
- **Authentication**: Token is stored in `localStorage` and injected via axios interceptor.
- **Routing**: All navigation uses React Router (`useNavigate`).

## Patterns & Conventions
- **Component Structure**: Pages in `pages/`, shared UI in `components/`, context in `Context/`, API in `Services/`.
- **State Management**: Use React hooks and context; avoid Redux or other state libraries.
- **API Usage**: Always use exported objects from `Services/api.js` (`authAPI`, `eventsAPI`, `registrationsAPI`).
- **Error Handling**: Minimal in UI; backend errors should be surfaced via alerts or context updates.
- **Styling**: Prefer inline styles for small components, CSS files for pages.

## Integration Points
- **Backend**: All data flows through REST API endpoints defined in `Services/api.js`.
- **Auth**: Login/register flows update context and localStorage; logout clears token and context.
- **Registrations**: Event registration and management via `registrationsAPI`.

## Examples
- To fetch events: `eventsAPI.getAll()`
- To register for an event: `registrationsAPI.register(eventId)`
- To login: `authAPI.login(email, password)`
- To access user info: `useAuth().user`

## Key Files
- `App.js`: App entry, routing, navigation
- `Context/AuthContext.js`: Auth state and actions
- `Services/api.js`: API abstraction
- `pages/`: Main UI pages
- `components/Navbar.js`: Shared navigation UI

---
_If any section is unclear or missing, please provide feedback for further refinement._
