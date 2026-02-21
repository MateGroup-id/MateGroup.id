/**
 * @file route.ts
 * @description API Route untuk menangani proses login pengguna.
 * File ini menyediakan endpoint POST untuk autentikasi pengguna
 * dan mengatur cookie SSO (Single Sign-On) untuk berbagi sesi
 * antar subdomain.
 */

import { NextRequest, NextResponse } from 'next/server';

/** URL API backend, diambil dari environment variable atau default ke localhost */
const API_URL = process.env.API_URL || 'http://localhost:5000';

/**
 * Mendapatkan domain cookie untuk berbagi cookie antar subdomain
 * @description Fungsi ini menentukan domain yang tepat untuk cookie
 * agar dapat diakses oleh semua subdomain (misal: sso.mategroup.id dan comate.mategroup.id)
 * @param {string} host - Hostname dari request (contoh: sso.mategroup.id)
 * @returns {string | undefined} Domain cookie dengan prefix titik (.) untuk subdomain sharing,
 * atau undefined jika localhost (cookie tetap bekerja tanpa domain pada localhost)
 * @example
 * // Untuk localhost
 * getCookieDomain('localhost:3000') // returns undefined
 * // Untuk production
 * getCookieDomain('sso.mategroup.id') // returns '.mategroup.id'
 */
function getCookieDomain(host: string): string | undefined {
  // Untuk localhost, tidak perlu set domain (cookie akan bekerja lintas port)
  if (host.includes('localhost')) {
    return undefined;
  }
  // Untuk production, set domain dengan prefix titik untuk subdomain sharing
  // contoh: .mategroup.id memungkinkan akses dari sso.mategroup.id dan comate.mategroup.id
  const parts = host.split('.');
  if (parts.length >= 2) {
    return '.' + parts.slice(-2).join('.');
  }
  return undefined;
}

/**
 * Handler untuk HTTP POST request - Proses Login Pengguna
 * @description Fungsi ini menangani proses autentikasi pengguna dengan:
 * 1. Menerima kredensial login (email/username dan password) dari body request
 * 2. Meneruskan request ke backend API untuk validasi
 * 3. Jika berhasil, mengatur cookie SSO untuk sesi lintas subdomain
 * 4. Mengembalikan data user dan token ke client
 * @param {NextRequest} req - Object request dari Next.js yang berisi body JSON dengan kredensial login
 * @returns {Promise<NextResponse>} Response JSON berisi:
 * - Sukses: data user dan token dengan cookie SSO yang sudah diset
 * - Gagal: pesan error dengan status code yang sesuai (401 untuk kredensial salah, 500 untuk error server)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const host = req.headers.get('host') || 'localhost';

    const response = await fetch(`${API_URL}/auth/login`, {
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

    // Set cookies for cross-subdomain SSO
    const res = NextResponse.json(data);
    const cookieDomain = getCookieDomain(host);
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (data.token) {
      // Main auth token (httpOnly for security)
      res.cookies.set('sso_token', data.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
        ...(cookieDomain && { domain: cookieDomain }),
      });
      
      // User info cookie (readable by JS for client-side auth check)
      const userInfo = JSON.stringify({
        email: data.user.email,
        name: data.user.name || '',
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
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
