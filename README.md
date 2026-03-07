# HouseRent (Full Stack)

This repository contains the **HouseRent** project: a full-stack web app with a **React + Vite frontend** and a **Node.js + Express backend**.

## 📂 Repository structure

- `Backend/` - backend API server (Node.js + Express + MongoDB)
- `Frontend/` - frontend application (React + Vite)

## 🚀 Running the project locally

### 1) Backend

```bash
cd Backend
npm install
npm start
```

The backend runs on `http://localhost:8001` by default.

### 2) Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to the backend.

## 🧩 Environment configuration

### Backend (`Backend/.env`)

```env
MONGO_DB=<your-mongo-connection-string>
JWT_KEY=<your-jwt-secret>
```

### Frontend (`Frontend/.env` and `Frontend/.env.production`)

- `Frontend/.env` (dev): keep `VITE_API_URL` empty to use local proxy
- `Frontend/.env.production` (prod): set `VITE_API_URL=https://houserent-eqqo.onrender.com`

## 📸 Screenshots

Add screenshots to `Frontend/public` (or anywhere in the repo), then reference them here:

![Homepage](Frontend/public/screenshot-homepage.png)

---

## 🔧 Notes

- API calls are routed through `Frontend/src/config/api.js`.
- Authentication uses JWT cookies.
- Uploaded images are stored in the backend `uploads/` folder.
