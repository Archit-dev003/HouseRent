import axios from "axios";

// Configured backend URL (set via env). If missing, default to local backend.
const configuredApiUrl = (import.meta.env.VITE_API_URL || "http://localhost:8001").replace(/\/$/, "");

// In local dev, we use Vite proxy (same-origin). In deployed builds, use the configured URL.
const isLocalDevHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export const API_BASE_URL = isLocalDevHost ? "" : configuredApiUrl;

export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const assetUrl = (path = "") => {
  const safePath = path || "";
  const normalizedPath = safePath.startsWith("/") ? safePath : `/${safePath}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
