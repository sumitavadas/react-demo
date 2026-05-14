# AdminKit — React Admin Panel

A complete React admin panel with login, dashboard, and user management (add/edit/delete).

## Features

- **Login page** — Email + password auth with form validation
- **Dashboard** — Stats cards, department breakdown, recent users
- **Users page** — Searchable/filterable table with role & status badges
- **Add user** — Form with validation (name, email, department, role)
- **Edit user** — Pre-filled form with all existing user data
- **Delete user** — Confirmation modal before removal

## Demo credentials

```
Email:    admin@demo.com
Password: admin123
```

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Project structure

```
src/
  App.jsx          # All pages, contexts, and components (single-file approach)
  main.jsx         # React entry point
index.html
vite.config.js
package.json
```

## Architecture

The app uses a **single-file architecture** for simplicity. As the project grows, split into:

```
src/
  pages/
    LoginPage.jsx
    DashboardPage.jsx
    UsersPage.jsx
    UserFormPage.jsx
  components/
    layout/Shell.jsx
    ui/StatusBadge.jsx
    ui/RoleBadge.jsx
    ui/Toast.jsx
  context/
    AuthContext.jsx
    UsersContext.jsx
  hooks/
    useAuth.js
    useUsers.js
```

## Tech stack

- React 18 with hooks
- Vite for bundling
- CSS variables (design tokens) — no external CSS library
- No routing library — simple state-based page switching
- No backend — mock data in memory

## Adding a real backend

Replace the in-memory `INITIAL_USERS` state and context functions with API calls:

```js
// services/userService.js
export const getUsers = () => fetch("/api/users").then(r => r.json());
export const createUser = (data) => fetch("/api/users", { method: "POST", body: JSON.stringify(data) });
export const updateUser = (id, data) => fetch(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteUser = (id) => fetch(`/api/users/${id}`, { method: "DELETE" });
```
