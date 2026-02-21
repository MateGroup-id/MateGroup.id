/**
 * @file register/page.tsx
 * @description Halaman pendaftaran (registrasi) untuk sistem autentikasi SSO MateGroup.
 * File ini menangani proses pendaftaran pengguna baru dengan validasi password
 * yang ketat dan integrasi Cloudflare Turnstile untuk keamanan.
 * 
 * @author MateGroup Team
 * @version 1.0.0
 */

'use client';

import { useState, FormEvent, ChangeEvent, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormInput, FormAlert, SubmitButton } from '@/components/AuthComponents';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';

/**
 * Interface untuk requirement password.
 * @description Mendefinisikan struktur objek persyaratan password
 * yang digunakan untuk validasi kekuatan password.
 * 
 * @interface Requirement
 * @property {string} label - Label yang ditampilkan kepada pengguna
 * @property {function} test - Fungsi untuk menguji apakah password memenuhi persyaratan
 * @property {boolean} met - Status apakah persyaratan sudah terpenuhi
 */
interface Requirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

/**
 * Daftar persyaratan password yang harus dipenuhi.
 * @description Array ini berisi semua validasi yang diperlukan
 * untuk membuat password yang kuat dan aman.
 * @constant {Requirement[]}
 */
const PASSWORD_REQUIREMENTS: Requirement[] = [
  { label: 'Minimal 8 karakter', test: (p) => p.length >= 8, met: false },
  { label: 'Mengandung huruf besar (A-Z)', test: (p) => /[A-Z]/.test(p), met: false },
  { label: 'Mengandung huruf kecil (a-z)', test: (p) => /[a-z]/.test(p), met: false },
  { label: 'Mengandung angka (0-9)', test: (p) => /[0-9]/.test(p), met: false },
  { label: 'Mengandung karakter khusus (!@#$%)', test: (p) => /[!@#$%^&*]/.test(p), met: false },
];

/**
 * Deklarasi global untuk Cloudflare Turnstile API.
 * @description Menambahkan tipe untuk objek turnstile pada window
 * yang digunakan untuk verifikasi CAPTCHA tanpa interaksi pengguna.
 */
declare global {
  interface Window {
    turnstile?: {
      render(container: string | HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId?: string): void;
      remove(widgetId?: string): void;
      getResponse(widgetId?: string): string | undefined;
    };
  }
}

/**
 * Daftar domain eksternal yang diizinkan untuk redirect setelah registrasi.
 * @description Domain-domain ini adalah aplikasi yang terintegrasi
 * dengan SSO MateGroup dan dapat menerima redirect setelah pendaftaran.
 * @constant {string[]}
 */
const ALLOWED_EXTERNAL_DOMAINS = [
  'localhost:5173',
  'localhost:3001',
  'comate.mategroup.id',
  'app.mategroup.id',
];

/**
 * Memeriksa apakah URL merupakan redirect eksternal yang diizinkan.
 * @description Fungsi ini memvalidasi URL redirect untuk memastikan
 * bahwa hanya domain yang terdaftar dalam ALLOWED_EXTERNAL_DOMAINS
 * yang dapat menerima redirect setelah registrasi berhasil.
 * 
 * @param {string} url - URL yang akan diperiksa
 * @returns {boolean} True jika URL adalah redirect eksternal yang diizinkan
 * 
 * @example
 * isExternalRedirect('https://comate.mategroup.id/dashboard'); // true
 * isExternalRedirect('https://unknown-site.com'); // false
 */
function isExternalRedirect(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ALLOWED_EXTERNAL_DOMAINS.some(domain => 
      urlObj.host === domain || urlObj.host.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Komponen konten utama halaman pendaftaran.
 * @description Komponen ini menampilkan formulir pendaftaran dengan fitur:
 * - Input nama lengkap, email, password, dan konfirmasi password
 * - Validasi real-time persyaratan kekuatan password
 * - Integrasi Cloudflare Turnstile untuk keamanan anti-bot
 * - Persetujuan syarat dan ketentuan
 * - Redirect otomatis setelah pendaftaran berhasil
 * 
 * @returns {JSX.Element} Komponen React untuk konten halaman pendaftaran
 */
function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  /** State untuk menandakan proses pengecekan autentikasi */
  const [checkingAuth, setCheckingAuth] = useState(true);
  /** State untuk melacak status pemenuhan persyaratan password */
  const [passwordRequirements, setPasswordRequirements] = useState<Requirement[]>(PASSWORD_REQUIREMENTS);

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
        // User belum login, tampilkan form register
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router, redirectUrl]);

  /**
   * Effect untuk memuat dan menginisialisasi Cloudflare Turnstile widget.
   * @description Hook ini memuat script Turnstile secara dinamis dan
   * merender widget CAPTCHA untuk verifikasi keamanan.
   * Widget akan dihapus saat komponen di-unmount.
   */
  useEffect(() => {
    let widgetId: string | null = null;
    
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) {
        const container = document.getElementById('turnstile-widget');
        if (container && container.childElementCount === 0) {
          widgetId = window.turnstile.render('#turnstile-widget', {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
            theme: 'dark',
          });
        }
      }
    };
    document.head.appendChild(script);

    // Cleanup function: hapus widget dan script saat unmount
    return () => {
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  /**
   * Menangani perubahan input pada formulir.
   * @description Fungsi ini memperbarui state formData dan juga
   * memvalidasi password secara real-time untuk memperbarui
   * status pemenuhan persyaratan password.
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

    if (name === 'password') {
      setPasswordRequirements(
        PASSWORD_REQUIREMENTS.map((req: Requirement) => ({
          ...req,
          met: req.test(value),
        }))
      );
    }

    // Hapus error pada field yang sedang diubah
    if (errors[name]) {
      setErrors((prev): typeof errors => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Memvalidasi seluruh data formulir pendaftaran.
   * @description Fungsi ini memeriksa semua field formulir dan
   * mengumpulkan error jika ada validasi yang gagal.
   * 
   * Validasi yang dilakukan:
   * - Nama lengkap harus diisi
   * - Email harus diisi
   * - Password harus diisi dan memenuhi semua persyaratan
   * - Konfirmasi password harus cocok dengan password
   * - Pengguna harus menyetujui syarat dan ketentuan
   * 
   * @returns {boolean} True jika semua validasi berhasil, false jika ada error
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = 'Nama lengkap diperlukan';
    if (!formData.email) newErrors.email = 'Email diperlukan';
    if (!formData.password) newErrors.password = 'Password diperlukan';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    if (!passwordRequirements.every((req: Requirement) => req.met)) {
      newErrors.password = 'Password tidak memenuhi persyaratan';
    }
    if (!formData.terms) newErrors.terms = 'Anda harus menerima syarat dan ketentuan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Menangani pengiriman formulir pendaftaran.
   * @description Fungsi async ini:
   * 1. Memvalidasi formulir
   * 2. Mengambil token Turnstile untuk verifikasi keamanan
   * 3. Mengirim data pendaftaran ke API backend
   * 4. Mengarahkan pengguna ke halaman login setelah berhasil
   * 
   * @param {FormEvent<HTMLFormElement>} e - Event submit formulir
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlert({ type: 'error', message: 'Silakan periksa kembali formulir Anda' });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const turnstileToken = window.turnstile?.getResponse?.();
      if (!turnstileToken) {
        setAlert({ type: 'error', message: 'Verifikasi keamanan diperlukan' });
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlert({ type: 'error', message: data.error || 'Pendaftaran gagal' });
        return;
      }

      setAlert({ type: 'success', message: 'Pendaftaran berhasil!' });
      
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
          // Internal redirect to login
          router.push(`/auth/login${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`);
        }
      }, 1500);
    } catch (error) {
      setAlert({ type: 'error', message: 'Terjadi kesalahan. Silakan coba lagi.' });
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
            <p className="text-gray-400">Buat akun baru Anda</p>
          </div>

          {alert && <FormAlert type={alert.type} message={alert.message} />}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="Nama Lengkap"
              id="fullName"
              placeholder="Nama Lengkap"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />

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

            <div>
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
              <div className="mt-3 space-y-2">
                {passwordRequirements.map((req: Requirement, idx: number) => (
                  <div
                    key={idx}
                    className={`text-xs flex items-center gap-2 ${
                      req.met ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      req.met 
                        ? 'border-green-500 bg-green-500/20' 
                        : 'border-gray-500'
                    }`}>
                      {req.met && <span className="text-green-400 font-bold text-xs">✓</span>}
                    </span>
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            <FormInput
              label="Konfirmasi Password"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            {/* Turnstile Widget */}
            <div className="mt-5 flex justify-center">
              <div
                id="turnstile-widget"
                className="origin-top scale-80 sm:scale-100"
              ></div>
            </div>

            <label className="flex items-start gap-3 text-xs text-gray-400">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-5 h-5 mt-0.5 rounded bg-gray-800 border border-white/20 cursor-pointer accent-orange-500"
              />
              <span>
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-orange-400 hover:text-orange-300 font-semibold">
                  Syarat dan Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-orange-400 hover:text-orange-300 font-semibold">
                  Kebijakan Privasi
                </Link>
              </span>
            </label>
            {errors.terms && <p className="text-red-400 text-xs">{errors.terms}</p>}

            <div className="mt-6">
              <SubmitButton loading={loading}>
                Daftar
              </SubmitButton>
            </div>

            <div className="text-center text-sm text-gray-400 mt-6">
              Sudah punya akun?{' '}
              <Link href={`/auth/login${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`} className="text-orange-400 hover:text-orange-300 font-semibold">
                Masuk di sini
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Komponen halaman pendaftaran utama.
 * @description Komponen ini merupakan halaman pendaftaran yang di-export
 * sebagai default. Menggunakan React Suspense untuk menangani
 * loading state dari useSearchParams hook.
 * 
 * @returns {JSX.Element} Halaman pendaftaran dengan Suspense wrapper
 * 
 * @example
 * // Diakses melalui route /auth/register
 * // Dengan redirect: /auth/register?redirect=/dashboard
 */
export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
