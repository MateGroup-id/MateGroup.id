/**
 * @file route.ts
 * @description API Route untuk memperbarui data profil pengguna.
 * File ini menyediakan endpoint POST untuk mengubah informasi profil
 * seperti nama, username, avatar, dan data lainnya.
 */

import { NextRequest, NextResponse } from 'next/server';

/** URL API backend, diambil dari environment variable atau default ke localhost */
const API_URL = process.env.API_URL || 'http://localhost:5000';

/**
 * Handler untuk HTTP POST request - Memperbarui Data Profil Pengguna
 * @description Fungsi ini menangani pembaruan profil dengan:
 * 1. Mengambil token autentikasi dari cookie (sso_token atau token)
 * 2. Memvalidasi keberadaan token (return 401 jika tidak ada)
 * 3. Membaca data profil baru dari body request
 * 4. Meneruskan request PUT ke backend API dengan data yang diperbarui
 * 5. Mengembalikan response dari backend ke client
 * @param {NextRequest} req - Object request dari Next.js yang berisi:
 * - Cookie: token autentikasi untuk otorisasi
 * - Body JSON: data profil yang akan diperbarui, contoh:
 *   - name: Nama lengkap baru
 *   - username: Username baru
 *   - avatar: URL avatar baru
 *   - bio: Deskripsi profil
 * @returns {Promise<NextResponse>} Response JSON berisi:
 * - Sukses: data profil yang sudah diperbarui
 * - Gagal 401: { error: 'No token found' } jika tidak ada token
 * - Gagal 400: error validasi dari backend (username sudah dipakai, dll)
 * - Gagal 500: { error: 'Internal server error' } jika terjadi kesalahan server
 */
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('sso_token')?.value || req.cookies.get('token')?.value;
    const body = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: 'No token found' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Profile update API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
