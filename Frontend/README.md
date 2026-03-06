# HouseRent Frontend

This is the frontend application for the **HouseRent** project, built with **React + Vite**.

## 🧱 Project structure

- `src/` - application source code
  - `config/api.js` - centralized API helper and base-url logic
  - `modules/` - feature pages and components (admin, user, common)
  - `context/` - shared React context (user/session)
  - `images/` - static image assets
  - `main.jsx` - app bootstrap
- `public/` - static public assets

## ⚙️ Environment variables

Environment variables are stored in `.env` files.

- `.env` (local development): use proxy mode by leaving `VITE_API_URL` empty.
- `.env.production`: points to the live backend (e.g. `https://houserent-eqqo.onrender.com`).

Example:
```env
VITE_API_URL=https://houserent-eqqo.onrender.com
```

## 🚀 Running locally

```bash
npm install
npm run dev
```

Then open: `http://localhost:5173`

## 🧩 API handling

API calls use `src/config/api.js`:
- relative `/api/*` calls are proxied in dev
- production uses the URL in `VITE_API_URL`

Cookies and session auth are enabled via `withCredentials: true`.

## 🧰 Build for production

```bash
npm run build
```

The production build output is in `dist/`.

---

If you want the frontend to use a different backend URL in production, update `.env.production`.
