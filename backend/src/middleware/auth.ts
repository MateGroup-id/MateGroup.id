/**
 * @file auth.ts
 * @description Middleware untuk autentikasi dan verifikasi token JWT.
 * File ini berisi middleware yang digunakan untuk memproteksi route
 * yang membutuhkan autentikasi pengguna.
 * @module middleware/auth
 */

import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

/**
 * Middleware untuk memverifikasi token JWT
 * @description Middleware ini memeriksa keberadaan dan validitas token JWT.
 * Token dapat dikirim melalui:
 * 1. Cookie dengan nama 'token'
 * 2. Header Authorization dengan format 'Bearer <token>'
 * 
 * Jika token valid, data user yang terdekode akan disimpan di req.user
 * dan request akan dilanjutkan ke handler berikutnya.
 * 
 * @function verifyToken
 * @param {Request} req - Object request Express yang berisi cookies dan headers
 * @param {Response} res - Object response Express untuk mengirim respons
 * @param {NextFunction} next - Fungsi untuk melanjutkan ke middleware berikutnya
 * @returns {void|Response} Melanjutkan ke next() jika valid, atau mengembalikan error 401
 * 
 * @example
 * // Penggunaan pada route yang membutuhkan autentikasi
 * router.get('/profile', verifyToken, async (req, res) => {
 *   const user = req.user // Data user dari token yang terdekode
 * })
 * 
 * @throws {401} Unauthorized - Jika token tidak ada
 * @throws {401} Invalid or expired token - Jika token tidak valid atau sudah kadaluarsa
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Coba ambil token dari cookie terlebih dahulu, kemudian dari header Authorization
  let token = req.cookies.token
  
  // Periksa header Authorization jika tidak ada token di cookie
  if (!token) {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" })
  }
}
