# HomeBuddy Frontend

This is the **React + Vite** frontend for the HomeBuddy house rental platform.

## 🧱 Project structure

- `src/` - application source code
  - `config/api.js` - centralized API helper and base-url logic
  - `context/UserContext.jsx` - auth/user state management
  - `modules/` - feature pages and components (admin, owner, renter, common)
  - `main.jsx` - app bootstrap
- `public/` - static assets (images, favicons, index.html)

## ⚙️ Environment variables

The frontend reads environment variables from `.env` files.

- `Client/.env` (development): leave `VITE_API_URL` empty to use the Vite dev proxy.
- `Client/.env.production` (production): set `VITE_API_URL` to your deployed backend.

Example (`Client/.env.production`):

```env
VITE_API_URL=https://your-backend-url.com
```

> In development, API calls are proxied through Vite (no CORS setup needed).

## 🚀 Run locally

```bash
cd Client
npm install
npm run dev
```

Then open: `http://localhost:5173`

## 🧰 Build for production

```bash
cd Client
npm run build
```

The build output will be in `dist/`.

## 🔧 Notes

- API calls go through `src/config/api.js`.
- Auth is handled via JWT cookies (with `withCredentials: true`) and/or Bearer tokens.
- If you change the backend URL, update `VITE_API_URL` in the appropriate `.env`.
