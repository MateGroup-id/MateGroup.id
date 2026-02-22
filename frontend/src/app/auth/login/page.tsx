/**
 * @file login/page.tsx
 * @description Halaman login untuk sistem autentikasi SSO MateGroup.
 * File ini menangani proses login pengguna dengan dukungan redirect
 * ke aplikasi eksternal yang diizinkan (seperti CoMate).
 * 
 * @author MateGroup Team
 * @version 1.0.0
 */

'use client';

import { useState, FormEvent, ChangeEvent, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormInput, FormAlert, SubmitButton } from '@/components/AuthComponents';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';

/**
 * Memeriksa apakah URL merupakan redirect eksternal yang diizinkan.
 * @description Fungsi ini memvalidasi URL redirect untuk memastikan
 * bahwa hanya domain yang terdaftar dalam ALLOWED_EXTERNAL_DOMAINS
 * yang dapat menerima redirect setelah login berhasil.
 * 
 * @param {string} url - URL yang akan diperiksa
 * @returns {boolean} True jika URL adalah redirect eksternal yang diizinkan, false jika tidak
 * 
 * @example
 * isExternalRedirect('https://comate.mategroup.id/dashboard'); // true
 * isExternalRedirect('https://malicious-site.com'); // false
 */
function isExternalRedirect(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const { hostname, protocol } = urlObj;

    // Only allow http or https
    if (protocol !== 'http:' && protocol !== 'https:') {
      return false;
    }

    // Allow ALL localhost ports
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return true;
    }

    // Allow root domain and all subdomains
    if (hostname === 'mategroup.id' || hostname.endsWith('.mategroup.id')) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Komponen konten utama halaman login.
 * @description Komponen ini menampilkan formulir login dengan fitur:
 * - Input email dan password
 * - Opsi "Ingat saya" untuk sesi persisten
 * - Link ke halaman lupa password
 * - Link ke halaman pendaftaran
 * - Redirect otomatis setelah login berhasil
 * 
 * @returns {JSX.Element} Komponen React untuk konten halaman login
 */
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  /** State untuk menampilkan pesan alert (error atau sukses) */
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  /** State untuk menandakan proses loading saat submit */
  const [loading, setLoading] = useState(false);
  /** State untuk menandakan proses pengecekan autentikasi */
  const [checkingAuth, setCheckingAuth] = useState(true);

  /**
   * Mengecek apakah user sudah login saat halaman dimuat.
   * Jika sudah login, redirect ke halaman profile atau redirectUrl.
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          // User sudah login, redirect ke profile atau redirectUrl
          if (redirectUrl.startsWith('http') && isExternalRedirect(redirectUrl)) {
            window.location.href = redirectUrl;
          } else if (!redirectUrl.startsWith('http')) {
            router.push(redirectUrl === '/dashboard' ? '/profile' : redirectUrl);
          } else {
            router.push('/profile');
          }
        }
      } catch {
        // User belum login, tampilkan form login
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router, redirectUrl]);

  /**
   * Menangani perubahan input pada formulir.
   * @description Fungsi ini memperbarui state formData setiap kali
   * pengguna mengubah nilai input. Untuk checkbox, menggunakan
   * nilai checked, untuk input lainnya menggunakan value.
   * Juga menghapus error pada field yang sedang diubah.
   * 
   * @param {ChangeEvent<HTMLInputElement>} e - Event perubahan input
   * @returns {void}
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev): typeof formData => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev): Record<string, string> => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Menangani pengiriman formulir login.
   * @description Fungsi async ini mengirim data login ke API backend,
   * memproses response, dan mengarahkan pengguna ke halaman yang sesuai
   * setelah login berhasil. Mendukung redirect ke aplikasi internal
   * maupun eksternal (seperti CoMate).
   * 
   * @param {FormEvent<HTMLFormElement>} e - Event submit formulir
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    setErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlert({ type: 'error', message: data.error || 'Login failed' });
        return;
      }

      setAlert({ type: 'success', message: 'Login successful!' });
      
      // Redirect - cookies are automatically shared across subdomains
      setTimeout(() => {
        if (redirectUrl.startsWith('http')) {
          // External redirect (e.g., CoMate)
          if (isExternalRedirect(redirectUrl)) {
            window.location.href = redirectUrl;
          } else {
            setAlert({ type: 'error', message: 'Redirect URL tidak diizinkan' });
          }
        } else {
          // Internal redirect
          router.push(redirectUrl);
        }
      }, 1000);
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-gray-400">Memeriksa autentikasi...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      <FloatingOrbs />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 my-8"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Mate
              </span>
              <span className="text-white">
                Group
              </span>
            </h1>
            <p className="text-gray-400">Masuk ke akun Anda</p>
          </div>

          {alert && <FormAlert type={alert.type} message={alert.message} />}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="Email"
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-gray-800 border border-white/20 cursor-pointer accent-orange-500"
                />
                <span className="text-gray-300">Ingat saya</span>
              </label>
              <Link href="/auth/forgot" className="text-orange-400 hover:text-orange-300 font-medium">
                Lupa password?
              </Link>
            </div>

            <SubmitButton loading={loading} className='cursor-pointer'>
              Masuk
            </SubmitButton>

            <div className="text-center text-sm text-gray-400 mt-6">
              Belum punya akun?{' '}
              <Link href={`/auth/register${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`} className="text-orange-400 hover:text-orange-300 font-semibold">
                Daftar di sini
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Komponen halaman login utama.
 * @description Komponen ini merupakan halaman login yang di-export
 * sebagai default. Menggunakan React Suspense untuk menangani
 * loading state dari useSearchParams hook.
 * 
 * @returns {JSX.Element} Halaman login dengan Suspense wrapper
 * 
 * @example
 * // Diakses melalui route /auth/login
 * // Dengan redirect: /auth/login?redirect=/dashboard
 */
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
