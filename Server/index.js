const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

const app = express();

//////dotenv config/////////////////////
dotenv.config();


const PORT = process.env.PORT || 8001;


app.use(express.json());

// Allow requests from the frontend (local dev + deployed app)
// If ALLOWED_ORIGINS is not set, we default to the known frontends used by this project.
// In strict mode, set ALLOWED_ORIGINS to a comma-separated list.
const defaultOrigins = ['http://localhost:5173', 'https://house-rent-nine.vercel.app'];
const allowedOriginsRaw = process.env.ALLOWED_ORIGINS;
const allowAllOrigins = !allowedOriginsRaw || allowedOriginsRaw.trim() === '*' || allowedOriginsRaw.trim() === '';
const allowedOrigins = allowAllOrigins
  ? defaultOrigins
  : allowedOriginsRaw.split(',').map((o) => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (like Postman) where origin is undefined
    if (!origin) return callback(null, true);
    if (allowAllOrigins) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: origin '${origin}' not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/user', require('./routes/userRoutes.js'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/owner', require('./routes/ownerRoutes'))



app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});