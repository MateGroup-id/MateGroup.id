/**
 * @file route.ts
 * @description API Route untuk menangani proses registrasi pengguna baru.
 * File ini menyediakan endpoint POST untuk mendaftarkan akun baru
 * dan secara otomatis melakukan login setelah registrasi berhasil
 * dengan mengatur cookie SSO untuk sesi lintas subdomain.
 */

import { NextRequest, NextResponse } from 'next/server';

/** URL API backend, diambil dari environment variable atau default ke localhost */
const API_URL = process.env.API_URL || 'http://localhost:5000';

/**
 * Mendapatkan domain cookie untuk berbagi cookie antar subdomain
 * @description Fungsi ini menentukan domain yang tepat untuk cookie
 * agar dapat diakses oleh semua subdomain dalam sistem SSO
 * @param {string} host - Hostname dari request (contoh: sso.mategroup.id)
 * @returns {string | undefined} Domain cookie dengan prefix titik (.) untuk subdomain sharing,
 * atau undefined jika localhost
 * @example
 * // Untuk localhost
 * getCookieDomain('localhost:3000') // returns undefined
 * // Untuk production
 * getCookieDomain('sso.mategroup.id') // returns '.mategroup.id'
 */
function getCookieDomain(host: string): string | undefined {
  if (host.includes('localhost')) {
    return undefined;
  }
  const parts = host.split('.');
  if (parts.length >= 2) {
    return '.' + parts.slice(-2).join('.');
  }
  return undefined;
}

/**
 * Handler untuk HTTP POST request - Proses Registrasi Pengguna Baru
 * @description Fungsi ini menangani proses pendaftaran akun baru dengan:
 * 1. Menerima data registrasi (email, password, fullName, dll) dari body request
 * 2. Meneruskan request ke backend API untuk membuat akun baru
 * 3. Jika registrasi menyertakan auto-login (token dikembalikan), mengatur cookie SSO
 * 4. Mengembalikan data user dan token ke client
 * @param {NextRequest} req - Object request dari Next.js yang berisi body JSON dengan data registrasi:
 * - email: Alamat email pengguna
 * - password: Password untuk akun baru
 * - fullName: Nama lengkap pengguna
 * - username (opsional): Username yang diinginkan
 * @returns {Promise<NextResponse>} Response JSON berisi:
 * - Sukses: data user baru dan token (jika auto-login) dengan cookie SSO yang sudah diset
 * - Gagal: pesan error dengan status code yang sesuai (400 untuk validasi gagal, 409 untuk email sudah terdaftar, 500 untuk error server)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const host = req.headers.get('host') || 'localhost';

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Set cookies for cross-subdomain SSO if registration includes auto-login
    const res = NextResponse.json(data);
    const cookieDomain = getCookieDomain(host);
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (data.token && data.user) {
      res.cookies.set('sso_token', data.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/',
        ...(cookieDomain && { domain: cookieDomain }),
      });
      
      const userInfo = JSON.stringify({
        email: data.user.email,
        name: data.user.name || body.fullName || '',
        username: data.user.username || '',
      });
      res.cookies.set('sso_user', userInfo, {
        httpOnly: false,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/',
        ...(cookieDomain && { domain: cookieDomain }),
      });
    }

    return res;
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
