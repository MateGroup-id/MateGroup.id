/**
 * @file route.ts
 * @description API Route untuk menangani proses logout pengguna.
 * File ini menyediakan endpoint POST dan GET untuk mengakhiri sesi pengguna,
 * menghapus semua cookie SSO, dan memberitahu backend tentang logout.
 * Mendukung dua metode: POST untuk logout via API call, GET untuk logout via navigasi langsung.
 */

import { NextRequest, NextResponse } from 'next/server';

/** URL API backend, diambil dari environment variable atau default ke localhost */
const API_URL = process.env.API_URL || 'http://localhost:5000';

/**
 * Mendapatkan domain cookie untuk berbagi cookie antar subdomain
 * @description Fungsi ini menentukan domain yang tepat untuk menghapus cookie
 * dari semua subdomain dalam sistem SSO
 * @param {string} host - Hostname dari request (contoh: sso.mategroup.id)
 * @returns {string | undefined} Domain cookie dengan prefix titik (.) untuk subdomain sharing,
 * atau undefined jika localhost
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
 * Menghapus semua cookie SSO dari response
 * @description Fungsi helper untuk membersihkan semua cookie yang terkait dengan
 * sesi SSO. Menghapus cookie 'token', 'sso_token', dan 'sso_user' dari
 * domain yang sesuai untuk memastikan logout menyeluruh di semua subdomain.
 * @param {NextResponse} res - Object response Next.js untuk memanipulasi cookie
 * @param {string} [cookieDomain] - Domain cookie yang akan dihapus (opsional, untuk subdomain sharing)
 * @returns {void}
 */
function clearSSOCookies(res: NextResponse, cookieDomain?: string) {
  const cookieOptions = {
    path: '/',
    ...(cookieDomain && { domain: cookieDomain }),
  };
  
  res.cookies.delete({ name: 'token', ...cookieOptions });
  res.cookies.delete({ name: 'sso_token', ...cookieOptions });
  res.cookies.delete({ name: 'sso_user', ...cookieOptions });
}

/**
 * Handler untuk HTTP POST request - Proses Logout via API Call
 * @description Fungsi ini menangani proses logout pengguna dengan:
 * 1. Mengambil token dari cookie (sso_token atau token)
 * 2. Mengirim request logout ke backend API (jika token ada)
 * 3. Menghapus semua cookie SSO dari browser
 * 4. Mengembalikan response sukses meskipun backend error (prioritas: hapus cookie)
 * @param {NextRequest} req - Object request dari Next.js
 * @returns {Promise<NextResponse>} Response JSON dengan { success: true } dan cookie yang sudah dihapus
 */
export async function POST(req: NextRequest) {
  try {
    const host = req.headers.get('host') || 'localhost';
    const cookieDomain = getCookieDomain(host);
    const token = req.cookies.get('sso_token')?.value || req.cookies.get('token')?.value;
    
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).catch(() => {
        // Ignore backend errors, still clear cookies
      });
    }

    const res = NextResponse.json({ success: true });
    clearSSOCookies(res, cookieDomain);
    return res;
  } catch (error) {
    console.error('Logout API error:', error);
    const res = NextResponse.json({ success: true });
    res.cookies.delete('token');
    res.cookies.delete('sso_token');
    res.cookies.delete('sso_user');
    return res;
  }
}

/**
 * Handler untuk HTTP GET request - Proses Logout via Navigasi Langsung
 * @description Fungsi ini menangani logout ketika pengguna mengakses URL logout
 * secara langsung (contoh: klik link logout). Proses yang dilakukan:
 * 1. Mengambil token dari cookie
 * 2. Mengirim request logout ke backend API
 * 3. Menghapus semua cookie SSO
 * 4. Redirect pengguna ke halaman utama (/) setelah logout
 * @param {NextRequest} req - Object request dari Next.js
 * @returns {Promise<NextResponse>} Redirect response ke halaman utama dengan cookie yang sudah dihapus
 */
export async function GET(req: NextRequest) {
  try {
    const host = req.headers.get('host') || 'localhost';
    const cookieDomain = getCookieDomain(host);
    const token = req.cookies.get('sso_token')?.value || req.cookies.get('token')?.value;
    
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).catch(() => {
        // Ignore backend errors, still clear cookies
      });
    }

    // Redirect to home page after logout
    const response = NextResponse.redirect(new URL('/', req.url));
    clearSSOCookies(response, cookieDomain);
    return response;
  } catch (error) {
    console.error('Logout API error:', error);
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.delete('token');
    response.cookies.delete('sso_token');
    response.cookies.delete('sso_user');
    return response;
  }
}
