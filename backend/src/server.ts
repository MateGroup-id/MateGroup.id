/**
 * @file server.ts
 * @description File utama untuk menjalankan SSO (Single Sign-On) Server.
 * File ini mengkonfigurasi Express.js dengan berbagai middleware keamanan
 * dan menghubungkan route-route yang tersedia.
 * 
 * Database: MongoDB (shared database dengan CoMate)
 * Storage: Supabase Storage (untuk foto profil)
 * Auth: Custom JWT-based authentication
 * 
 * Collection Naming Convention:
 * - mategroup_* : Data untuk MateGroup SSO
 * - comate_* : Data untuk CoMate
 * 
 * @module server
 * @requires dotenv/config - Untuk membaca environment variables
 * @requires express - Framework web untuk Node.js
 * @requires helmet - Middleware keamanan untuk HTTP headers
 * @requires cors - Middleware untuk Cross-Origin Resource Sharing
 * @requires cookie-parser - Middleware untuk parsing cookies
 * @requires express-rate-limit - Middleware untuk membatasi jumlah request
 * @requires express-fileupload - Middleware untuk upload file
 */

import "dotenv/config" 
import express from "express"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"
import fileUpload from "express-fileupload"

import connectDb from "@/config/dbConnection"
import authRoutes from "@/routes/auth.routes"
import storageRoutes from "@/routes/storage.routes"

/**
 * Instance aplikasi Express
 * @description Aplikasi Express yang sudah dikonfigurasi dengan berbagai middleware
 * @constant
 * @type {express.Application}
 */
const app = express()

/**
 * Konfigurasi Helmet untuk keamanan HTTP headers
 * @description Mengatur Content Security Policy (CSP) untuk melindungi
 * aplikasi dari serangan XSS dan injection lainnya.
 * - default-src: 'none' - Blokir semua sumber secara default
 * - connect-src: 'self' - Hanya izinkan koneksi ke domain sendiri
 * - frame-ancestors: 'none' - Cegah embedding dalam iframe
 * - base-uri: 'none' - Cegah manipulasi base URL
 * - form-action: 'none' - Blokir form submissions
 */
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "connect-src": ["'self'"],
        "frame-ancestors": ["'none'"],
        "base-uri": ["'none'"],
        "form-action": ["'none'"],
      },
    },
  })
);

/**
 * Daftar origin yang diizinkan untuk CORS
 * @description Daftar URL yang diperbolehkan mengakses API ini.
 * Termasuk localhost untuk development dan URL frontend dari environment variable.
 * @constant
 * @type {string[]}
 */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  process.env.FRONTEND_URL || 'http://localhost:3000'
]

/**
 * Konfigurasi CORS (Cross-Origin Resource Sharing)
 * @description Mengatur akses cross-origin untuk API:
 * - origin: Fungsi untuk memvalidasi origin yang diizinkan
 * - credentials: true - Mengizinkan pengiriman cookies cross-origin
 * - methods: HTTP methods yang diizinkan
 * - allowedHeaders: Headers yang diizinkan dalam request
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

/** Middleware untuk parsing JSON body */
app.use(express.json())

/** Middleware untuk parsing cookies dari request */
app.use(cookieParser())

/** Middleware untuk menangani upload file */
app.use(fileUpload())

/**
 * Konfigurasi Rate Limiter
 * @description Membatasi jumlah request untuk mencegah abuse/DDoS.
 * - windowMs: 15 menit (periode waktu untuk menghitung request)
 * - max: 100 request per IP dalam periode tersebut
 * - standardHeaders: Menggunakan header RateLimit standar
 * - legacyHeaders: Tidak menggunakan header X-RateLimit lama
 * @constant
 * @type {RateLimitRequestHandler}
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,  
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later."
  
})
app.use(limiter)

/**
 * Endpoint Health Check
 * @route GET /health
 * @description Endpoint untuk memeriksa status server.
 * Berguna untuk monitoring dan load balancer health checks.
 * @returns {Object} Object JSON dengan status server
 * @returns {string} returns.status - Status server "SSO Server running"
 */
app.get("/health", (req, res) => {
  res.json({ status: "SSO Server running" })
})

/**
 * Route untuk autentikasi
 * @description Menghubungkan route autentikasi ke path /auth
 * Termasuk: login, register, logout, profile, validate-token
 */
app.use("/auth", authRoutes)

/**
 * Route untuk penyimpanan/storage
 * @description Menghubungkan route storage ke path /storage
 * Untuk operasi upload dan manajemen file (foto profil)
 * File disimpan di Supabase Storage, metadata di MongoDB
 */
app.use("/storage", storageRoutes)

/**
 * Inisialisasi Server
 * @description Menghubungkan ke MongoDB dan menjalankan Express server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDb()
    
    // Start Express server
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`MateGroup + SSO Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
