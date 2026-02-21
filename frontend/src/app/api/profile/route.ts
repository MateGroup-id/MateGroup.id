/**
 * @file route.ts
 * @description API Route untuk mengambil data profil pengguna yang sedang login.
 * File ini menyediakan endpoint GET untuk mendapatkan informasi profil
 * berdasarkan token autentikasi yang tersimpan di cookie SSO.
 */

import { NextRequest, NextResponse } from 'next/server';

/** URL API backend, diambil dari environment variable atau default ke localhost */
const API_URL = process.env.API_URL || 'http://localhost:5000';

/**
 * Handler untuk HTTP GET request - Mengambil Data Profil Pengguna
 * @description Fungsi ini menangani pengambilan data profil dengan:
 * 1. Mengambil token autentikasi dari cookie (sso_token atau token)
 * 2. Memvalidasi keberadaan token (return 401 jika tidak ada)
 * 3. Meneruskan request ke backend API dengan header Authorization
 * 4. Mengembalikan data profil pengguna ke client
 * @param {NextRequest} req - Object request dari Next.js yang berisi cookie autentikasi
 * @returns {Promise<NextResponse>} Response JSON berisi:
 * - Sukses: data profil pengguna (email, name, username, avatar, dll)
 * - Gagal 401: { error: 'No token found' } jika tidak ada token
 * - Gagal 401/403: error dari backend jika token tidak valid
 * - Gagal 500: { error: 'Internal server error' } jika terjadi kesalahan server
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('sso_token')?.value || req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token found' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
