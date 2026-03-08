# HomeBuddy Backend (Node.js + Express)

This folder contains the backend API for the HomeBuddy house rental platform.
It is built with **Node.js**, **Express 5**, **MongoDB (Mongoose)**, **JWT auth**, and supports file uploads for property images.

---

## 🚀 Quick Start

```bash
cd Server
npm install
npm start
```

The backend will start on `http://localhost:8001` by default.

> If you prefer auto-reload during development, run:
>
> ```bash
> npx nodemon index.js
> ```

---

## ⚙️ Environment Variables

Create a `Server/.env` file with the following values:

```env
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
PORT=8001
FRONTEND_URL=http://localhost:5173
FRONTEND_ORIGIN=http://127.0.0.1:5173
```

> The backend uses these vars to connect to MongoDB, sign JWTs, and enforce CORS.

---

## 📦 API Endpoints

The API is mounted under `/api`.

### User APIs (`/api/user`)

- `POST /register` — Register user (Renter/Owner/Admin)
- `POST /login` — Login and receive JWT
- `POST /forgotpassword` — Reset password
- `GET /getAllProperties` — Get all listed properties
- `POST /getuserdata` — Get current user data (auth required)
- `POST /bookinghandle/:propertyid` — Create booking (auth required)
- `GET /getallbookings` — Get renter bookings (auth required)

### Owner APIs (`/api/owner`)

- `POST /postproperty` — Add new property with images (auth required)
- `GET /getallproperties` — Get owner properties (auth required)
- `GET /getallbookings` — Get owner bookings (auth required)
- `POST /handlebookingstatus` — Update booking status (auth required)
- `DELETE /deleteproperty/:propertyid` — Delete owner property (auth required)
- `PATCH /updateproperty/:propertyid` — Update owner property (auth required)

### Admin APIs (`/api/admin`)

- `GET /getallusers` — Get all users (auth required)
- `POST /handlestatus` — Approve/reject owner status (auth required)
- `GET /getallproperties` — Get all properties (auth required)
- `GET /getallbookings` — Get all bookings (auth required)

---

## 🗂️ Folder Structure

```
Server/
├── config/        # DB connection helper
├── controllers/   # Route handlers
├── middlewares/   # Auth & other middleware
├── models/        # Mongoose schemas
├── routes/        # Express routers
├── uploads/       # Uploaded files (images)
├── index.js       # Entry point
└── package.json
```

---

## 🔧 Notes

- Uploaded images are served from `/uploads` using an Express static route.
- Auth uses JWT stored in HTTP-only cookies; Bearer token fallback is supported.
- If API calls fail due to CORS, verify `FRONTEND_URL` / `FRONTEND_ORIGIN` in `.env`.
