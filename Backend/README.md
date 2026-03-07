# Backend (Express + MongoDB)

This folder contains the backend API for the MERN stack house rental project.
It is built with **Express**, **MongoDB (Mongoose)**, **JWT authentication**, and supports file uploads for property images.

---

## 🚀 Quick Start

1. Install dependencies:

```bash
cd Backend
npm install
```

2. Create / update environment variables:

- Copy `.env.example` to `.env` (or set env vars directly)

3. Start the server:

```bash
npm run dev
# or
node index.js
```

> Note: `nodemon` is installed as a dependency, but the project does not include a `dev` script by default. You can run `npx nodemon index.js` to enable auto-reload during development.

---

## ⚙️ Environment Variables

The backend expects the following environment variables:

- `PORT` (optional) – port the server listens on (defaults to `8001`)
- `MONGO_DB` / `MONGO_URI` / `MONGODB_URI` – MongoDB connection string (required)
- `JWT_SECRET` – secret key for signing JWTs (required for authentication)
- `ALLOWED_ORIGINS` (optional) – comma-separated list of allowed CORS origins.

Example `.env`:

```env
PORT=8001
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=supersecret
ALLOWED_ORIGINS=http://localhost:5173,https://your-deployed-frontend.com
```

---

## 📦 API Routes

The API is mounted under `/api`:

### User Routes (`/api/user`)

- `POST /register` – register a new user
- `POST /login` – login and receive token
- `POST /forgotpassword` – send password reset request
- `GET /getAllProperties` – list properties (public)
- `POST /getuserdata` – get logged-in user data (requires auth)
- `POST /bookinghandle/:propertyid` – create/cancel booking (requires auth)
- `GET /getallbookings` – list user bookings (requires auth)

### Owner Routes (`/api/owner`)

- `POST /postproperty` – create a property (requires auth, supports file uploads)
- `GET /getallproperties` – list owner properties (requires auth)
- `GET /getallbookings` – list bookings for owner properties (requires auth)
- `POST /handlebookingstatus` – update booking status (requires auth)
- `DELETE /deleteproperty/:propertyid` – delete a property (requires auth)
- `PATCH /updateproperty/:propertyid` – update property info (requires auth, supports file upload)

### Admin Routes (`/api/admin`)

- `GET /getallusers` – list all users (requires auth)
- `POST /handlestatus` – modify user status (requires auth)
- `GET /getallproperties` – list all properties (requires auth)
- `GET /getallbookings` – list all bookings (requires auth)

---

## 🗂️ Project Structure

```
Backend/
├── config/        # DB connection helpers
├── controllers/   # Route handlers
├── middlewares/   # Auth & other middleware
├── models/        # Mongoose schemas
├── routes/        # Express routers
├── uploads/       # Uploaded files (images)
├── index.js       # Entry point
├── package.json
└── .env.example
```

---

## 🧠 Notes

- Uploaded images are served from the `/uploads` directory using the `/uploads` static route.
- CORS is configured to allow the frontend on `http://localhost:5173` and the deployed frontend URL by default; adjust `ALLOWED_ORIGINS` as needed.
- If the server fails to start due to missing Mongo variables, check your `.env` values.
