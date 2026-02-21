/**
 * @file supabase.ts
 * @description File konfigurasi untuk menghubungkan aplikasi dengan Supabase Storage.
 * 
 * CATATAN PENTING:
 * Supabase pada project ini HANYA digunakan untuk Storage (penyimpanan file).
 * Autentikasi dan database menggunakan MongoDB + JWT sendiri.
 * 
 * Penggunaan Supabase Storage:
 * - Upload foto profil pengguna
 * - Menyimpan file-file statis lainnya
 * 
 * Metadata file disimpan di MongoDB (collection: mategroup_users)
 * dengan field avatarUrl (URL publik) dan avatarPath (path untuk delete/update)
 * 
 * @module config/supabase
 */

import { createClient } from '@supabase/supabase-js'

/**
 * Instance client Supabase (khusus Storage)
 * @description Client Supabase yang dikonfigurasi untuk operasi Storage saja.
 * TIDAK digunakan untuk autentikasi atau database queries.
 * 
 * @constant
 * @type {SupabaseClient}
 * @requires SUPABASE_URL - URL project Supabase dari environment variable
 * @requires SUPABASE_SERVICE_KEY - Service key Supabase dari environment variable
 * 
 * @example
 * // Upload file ke Supabase Storage
 * const { data, error } = await supabase.storage
 *   .from("avatars")
 *   .upload(`users/${fileName}`, fileData, { contentType: mimeType })
 * 
 * @example
 * // Mendapatkan URL publik file
 * const { data } = supabase.storage
 *   .from("avatars")
 *   .getPublicUrl(filePath)
 * 
 * @example
 * // Menghapus file dari Storage
 * const { error } = await supabase.storage
 *   .from("avatars")
 *   .remove([filePath])
 */
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)
