/**
 * @file auth.routes.ts
 * @description File route untuk menangani semua operasi autentikasi SSO.
 * Menggunakan MongoDB untuk penyimpanan data user dan bcrypt untuk hashing password.
 * Termasuk login, register, logout, validasi token, dan manajemen profil.
 * 
 * Collection: mategroup_users
 * 
 * @module routes/auth
 */

import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User, { IUser, SubscriptionPlan } from "@/models/userModel"
import { verifyToken } from "@/middleware/auth"

/** Instance Router Express untuk route autentikasi */
const router = Router()

/**
 * Interface untuk payload JWT
 */
interface JWTPayload {
  id: string;
  email: string;
  name: string;
  username: string;
  subscriptions: Record<string, SubscriptionPlan>;
}

/**
 * Helper function untuk generate JWT token
 */
const generateToken = (user: IUser): string => {
  // Convert Map to plain object for JWT
  const subscriptionsObj: Record<string, SubscriptionPlan> = {};
  if (user.subscriptions) {
    user.subscriptions.forEach((value, key) => {
      subscriptionsObj[key] = value;
    });
  }

  const payload: JWTPayload = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    username: user.username,
    subscriptions: subscriptionsObj,
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "24h"
  })
}

/**
 * Route untuk login pengguna
 * @route POST /auth/login
 * @description Mengautentikasi pengguna dengan email/username dan password.
 * Jika berhasil, akan membuat JWT token dan menyimpannya di cookie.
 * 
 * @param {Object} req.body - Body request
 * @param {string} req.body.email - Email pengguna (bisa juga username)
 * @param {string} req.body.password - Password pengguna
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan login
 * @returns {string} returns.message - Pesan hasil login
 * @returns {Object} returns.user - Data pengguna (id, email, name, username)
 * @returns {string} returns.token - JWT token untuk autentikasi
 * 
 * @throws {400} Bad Request - Jika email/password tidak disertakan
 * @throws {401} Unauthorized - Jika email atau password salah
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Cari user berdasarkan email atau username
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email.toLowerCase() }
      ]
    })

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Generate token
    const token = generateToken(user)

    // Update token di database
    await User.findByIdAndUpdate(user._id, { token })

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })

    // Convert subscriptions Map to object for response
    const subscriptionsObj: Record<string, SubscriptionPlan> = {};
    if (user.subscriptions) {
      user.subscriptions.forEach((value, key) => {
        subscriptionsObj[key] = value;
      });
    }

    // Return response
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        avatarUrl: user.avatarUrl || null,
        subscriptions: subscriptionsObj
      },
      token
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * Route untuk validasi token SSO dari aplikasi eksternal
 * @route POST /auth/validate-token
 * @description Memvalidasi JWT token yang dikirim dari aplikasi eksternal.
 * Digunakan untuk Single Sign-On (SSO) antar aplikasi.
 * 
 * @param {Object} req.body - Body request
 * @param {string} req.body.token - JWT token yang akan divalidasi
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.valid - Status validitas token
 * @returns {Object} [returns.user] - Data pengguna jika token valid
 * 
 * @throws {400} Bad Request - Jika token tidak disertakan
 * @throws {401} Unauthorized - Jika token tidak valid atau sudah kadaluarsa
 */
router.post("/validate-token", async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ valid: false, error: "Token is required" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    
    // Verifikasi user masih ada di database
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ valid: false, error: "User not found" })
    }

    // Convert subscriptions Map to object for response
    const subscriptionsObj: Record<string, SubscriptionPlan> = {};
    if (user.subscriptions) {
      user.subscriptions.forEach((value, key) => {
        subscriptionsObj[key] = value;
      });
    }

    res.json({
      valid: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        username: decoded.username,
        avatarUrl: user.avatarUrl || null,
        subscriptions: subscriptionsObj
      }
    })
  } catch (error) {
    res.status(401).json({ valid: false, error: "Invalid or expired token" })
  }
})

/**
 * Route untuk registrasi pengguna baru
 * @route POST /auth/register
 * @description Mendaftarkan pengguna baru dengan email dan password.
 * Termasuk verifikasi Cloudflare Turnstile untuk keamanan.
 * Username akan digenerate otomatis dari email jika tidak disediakan.
 * 
 * @param {Object} req.body - Body request
 * @param {string} req.body.email - Email pengguna
 * @param {string} req.body.password - Password pengguna (minimal 6 karakter)
 * @param {string} req.body.fullName - Nama lengkap pengguna
 * @param {string} [req.body.username] - Username (opsional, akan digenerate jika tidak ada)
 * @param {string} req.body.turnstileToken - Token verifikasi Cloudflare Turnstile
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan registrasi
 * @returns {string} returns.message - Pesan hasil registrasi
 * @returns {Object} returns.user - Data pengguna yang baru dibuat
 * @returns {string} returns.token - JWT token untuk auto-login
 * 
 * @throws {400} Bad Request - Jika field wajib tidak ada atau email sudah terdaftar
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, username: providedUsername, turnstileToken } = req.body

    // Validasi field wajib
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    if (!fullName) {
      return res.status(400).json({ error: "Full name is required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    // Verifikasi Turnstile (jika diaktifkan)
    if (turnstileToken) {
      try {
        const turnstileResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              secret: process.env.TURNSTILE_SECRET_KEY,
              response: turnstileToken,
            }),
          }
        );

        const turnstileData = await turnstileResponse.json() as { success: boolean };

        if (!turnstileData.success) {
          return res.status(400).json({ error: "Security verification failed. Please try again." })
        }
      } catch (error) {
        console.error('Turnstile verification error:', error);
        return res.status(500).json({ error: "Security verification error" })
      }
    }

    // Cek apakah email sudah terdaftar
    const existingEmail = await User.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      return res.status(400).json({ error: "Email ini sudah terdaftar. Silakan login." })
    }

    // Generate username jika tidak disediakan
    let username = providedUsername
    if (!username) {
      const emailPrefix = email.split("@")[0].toLowerCase()
      const cleanEmail = emailPrefix.replace(/[^a-z0-9]/g, "")
      const randomSuffix = Math.floor(100 + Math.random() * 900)
      username = `${cleanEmail}${randomSuffix}`
    }

    // Cek apakah username sudah dipakai
    const existingUsername = await User.findOne({ username: username.toLowerCase() })
    if (existingUsername) {
      // Generate username baru dengan suffix random
      const randomSuffix = Math.floor(100 + Math.random() * 900)
      username = `${username}${randomSuffix}`
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Buat user baru
    const user = await User.create({
      name: fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      subscriptions: new Map() // Empty subscriptions for new user
    })

    // Generate token untuk auto-login
    const token = generateToken(user)

    // Update token di database
    await User.findByIdAndUpdate(user._id, { token })

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })

    res.status(201).json({
      success: true,
      message: "Registration successful! You have been logged in.",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        subscriptions: {} // New user has no subscriptions
      },
      token
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return res.status(400).json({ error: `${field} sudah digunakan.` })
    }
    
    res.status(500).json({ error: error.message || "Registration failed" })
  }
})

/**
 * Route untuk logout pengguna
 * @route POST /auth/logout
 * @description Menghapus cookie token untuk logout pengguna.
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan logout (selalu true)
 */
router.post("/logout", async (_, res) => {
  res.clearCookie("token")
  res.json({ success: true, message: "Logged out successfully" })
})

/**
 * Route untuk mendapatkan profil pengguna
 * @route GET /auth/profile
 * @description Mengambil data profil pengguna yang sedang login.
 * Membutuhkan autentikasi (verifyToken middleware).
 * 
 * @requires verifyToken - Middleware untuk verifikasi JWT token
 * 
 * @returns {Object} Response JSON dengan data profil
 * 
 * @throws {401} Unauthorized - Jika token tidak valid
 * @throws {404} Not Found - Jika user tidak ditemukan
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const decoded = req.user as JWTPayload
    
    const user = await User.findById(decoded.id).select("-password -token")
    
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Convert subscriptions Map to object for response
    const subscriptionsObj: Record<string, SubscriptionPlan> = {};
    if (user.subscriptions) {
      user.subscriptions.forEach((value, key) => {
        subscriptionsObj[key] = value;
      });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl || null,
      subscriptions: subscriptionsObj,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ error: "Failed to fetch profile" })
  }
})

/**
 * Route untuk memperbarui profil pengguna
 * @route PUT /auth/update-profile
 * @description Memperbarui data profil pengguna yang sedang login.
 * Dapat memperbarui nama, username, dan password (opsional).
 * 
 * @requires verifyToken - Middleware untuk verifikasi JWT token
 * 
 * @param {Object} req.body - Body request
 * @param {string} req.body.name - Nama lengkap baru pengguna
 * @param {string} req.body.username - Username baru pengguna
 * @param {string} [req.body.password] - Password baru (opsional, minimal 6 karakter)
 * @param {string} [req.body.currentPassword] - Password saat ini (wajib jika mengubah password)
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan update
 * @returns {Object} returns.user - Data pengguna yang diperbarui
 * 
 * @throws {400} Bad Request - Jika validasi gagal
 * @throws {401} Unauthorized - Jika token tidak valid atau password salah
 */
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const decoded = req.user as JWTPayload
    const { name, username, password, currentPassword } = req.body

    if (!name || !username) {
      return res.status(400).json({ error: "Name and username are required" })
    }

    // Cari user
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Cek apakah username sudah dipakai user lain
    if (username.toLowerCase() !== user.username) {
      const existingUsername = await User.findOne({ 
        username: username.toLowerCase(),
        _id: { $ne: user._id }
      })
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" })
      }
    }

    // Siapkan data update
    const updateData: Partial<IUser> = {
      name,
      username: username.toLowerCase()
    }

    // Handle password update
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" })
      }
      
      // Verifikasi password saat ini jika mengubah password
      if (currentPassword) {
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if (!isCurrentPasswordValid) {
          return res.status(401).json({ error: "Current password is incorrect" })
        }
      }
      
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password -token")

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" })
    }

    // Generate token baru dengan data terbaru
    const newToken = generateToken(updatedUser)
    await User.findByIdAndUpdate(decoded.id, { token: newToken })

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    })

    // Convert subscriptions Map to object for response
    const subscriptionsObj: Record<string, SubscriptionPlan> = {};
    if (updatedUser.subscriptions) {
      updatedUser.subscriptions.forEach((value, key) => {
        subscriptionsObj[key] = value;
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        username: updatedUser.username,
        avatarUrl: updatedUser.avatarUrl || null,
        subscriptions: subscriptionsObj
      },
      token: newToken
    })
  } catch (error: any) {
    console.error('Profile update error:', error)
    
    if (error.code === 11000) {
      return res.status(400).json({ error: "Username already taken" })
    }
    
    res.status(500).json({ error: "Failed to update profile" })
  }
})

/**
 * Route untuk menghapus akun pengguna
 * @route DELETE /auth/delete-account
 * @description Menghapus akun pengguna secara permanen.
 * 
 * @requires verifyToken - Middleware untuk verifikasi JWT token
 * 
 * @param {Object} req.body - Body request
 * @param {string} req.body.password - Password untuk konfirmasi
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan penghapusan
 */
router.delete("/delete-account", verifyToken, async (req, res) => {
  try {
    const decoded = req.user as JWTPayload
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ error: "Password is required for confirmation" })
    }

    // Cari dan verifikasi user
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" })
    }

    // Hapus user
    await User.findByIdAndDelete(decoded.id)

    // Clear cookie
    res.clearCookie("token")

    res.json({
      success: true,
      message: "Account deleted successfully"
    })
  } catch (error) {
    console.error('Account deletion error:', error)
    res.status(500).json({ error: "Failed to delete account" })
  }
})

export default router
