/**
 * @file storage.routes.ts
 * @description File route untuk menangani operasi penyimpanan file.
 * Menggunakan Supabase Storage untuk menyimpan file dan MongoDB untuk metadata.
 * 
 * FLOW:
 * 1. User upload foto profil
 * 2. File disimpan ke Supabase Storage (bucket: avatars)
 * 3. Metadata (avatarUrl, avatarPath) disimpan ke MongoDB (collection: mategroup_users)
 * 
 * @module routes/storage
 */

import { Router, Request, Response } from "express"
import { supabase } from "@/config/supabase"
import { verifyToken } from "@/middleware/auth"
import { UploadedFile } from "express-fileupload"
import User from "@/models/userModel"

const router = Router()

/**
 * Interface untuk JWT Payload
 */
interface JWTPayload {
  id: string;
  email: string;
  name: string;
  username: string;
  isPremium: boolean;
}

/**
 * Route untuk upload avatar/foto profil
 * @route POST /storage/upload
 * @description Upload foto profil ke Supabase Storage dan simpan metadata ke MongoDB.
 * Jika user sudah punya avatar sebelumnya, file lama akan dihapus.
 * 
 * @requires verifyToken - Middleware untuk verifikasi JWT token
 * 
 * @param {File} req.files.file - File gambar yang akan diupload
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan upload
 * @returns {string} returns.path - Path file di Supabase Storage
 * @returns {string} returns.url - URL publik file
 * 
 * @throws {400} Bad Request - Jika tidak ada file atau format tidak valid
 * @throws {500} Internal Server Error - Jika upload gagal
 */
router.post("/upload", verifyToken, async (req: Request, res: Response) => {
  try {
    const decoded = req.user as JWTPayload
    const uploaded = req.files?.file

    if (!uploaded || Array.isArray(uploaded)) {
      return res.status(400).json({ error: "Please upload a single file" })
    }

    const file = uploaded as UploadedFile

    // Validasi tipe file (hanya gambar)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." 
      })
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return res.status(400).json({ 
        error: "File too large. Maximum size is 5MB." 
      })
    }

    // Cari user untuk mendapatkan avatar lama (jika ada)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Hapus avatar lama dari Supabase Storage jika ada
    if (user.avatarPath) {
      const { error: deleteError } = await supabase.storage
        .from("mategroup_profiles")
        .remove([user.avatarPath])
      
      if (deleteError) {
        console.error("Error deleting old avatar:", deleteError)
        // Continue anyway, old file cleanup is not critical
      }
    }

    // Generate nama file unik
    const fileExtension = file.name.split('.').pop()
    const fileName = `users/${decoded.id}/${Date.now()}.${fileExtension}`

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from("mategroup_profiles")
      .upload(fileName, file.data, {
        contentType: file.mimetype,
        upsert: true
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return res.status(500).json({ error: "Failed to upload file" })
    }

    // Dapatkan URL publik
    const { data: publicUrlData } = supabase.storage
      .from("mategroup_profiles")
      .getPublicUrl(data.path)

    // Update metadata di MongoDB
    await User.findByIdAndUpdate(decoded.id, {
      avatarUrl: publicUrlData.publicUrl,
      avatarPath: data.path
    })

    res.json({
      success: true,
      path: data.path,
      url: publicUrlData.publicUrl
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * Route untuk menghapus avatar/foto profil
 * @route DELETE /storage/avatar
 * @description Menghapus foto profil dari Supabase Storage dan metadata dari MongoDB.
 * 
 * @requires verifyToken - Middleware untuk verifikasi JWT token
 * 
 * @returns {Object} Response JSON
 * @returns {boolean} returns.success - Status keberhasilan penghapusan
 * 
 * @throws {404} Not Found - Jika user atau avatar tidak ditemukan
 * @throws {500} Internal Server Error - Jika penghapusan gagal
 */
router.delete("/avatar", verifyToken, async (req: Request, res: Response) => {
  try {
    const decoded = req.user as JWTPayload

    // Cari user
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    if (!user.avatarPath) {
      return res.status(404).json({ error: "No avatar to delete" })
    }

    // Hapus dari Supabase Storage
    const { error } = await supabase.storage
      .from("mategroup_profiles")
      .remove([user.avatarPath])

    if (error) {
      console.error("Supabase delete error:", error)
      return res.status(500).json({ error: "Failed to delete file" })
    }

    // Hapus metadata dari MongoDB
    await User.findByIdAndUpdate(decoded.id, {
      avatarUrl: null,
      avatarPath: null
    })

    res.json({
      success: true,
      message: "Avatar deleted successfully"
    })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * Route untuk mendapatkan info avatar
 * @route GET /storage/avatar
 * @description Mendapatkan URL avatar user yang sedang login.
 * 
 * @requires verifyToken - Middleware untuk verifikasi JWT token
 * 
 * @returns {Object} Response JSON
 * @returns {string|null} returns.avatarUrl - URL publik avatar atau null
 */
router.get("/avatar", verifyToken, async (req: Request, res: Response) => {
  try {
    const decoded = req.user as JWTPayload

    const user = await User.findById(decoded.id).select("avatarUrl")
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({
      avatarUrl: user.avatarUrl || null
    })
  } catch (error) {
    console.error("Get avatar error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router

