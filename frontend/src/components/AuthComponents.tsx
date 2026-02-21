/**
 * @file AuthComponents.tsx
 * @description Kumpulan komponen reusable untuk halaman autentikasi.
 * File ini berisi komponen-komponen UI yang digunakan bersama
 * di halaman login, register, dan halaman autentikasi lainnya.
 * 
 * Komponen yang tersedia:
 * - AuthLayoutComponent: Layout wrapper untuk halaman autentikasi
 * - AuthCard: Kartu container dengan animasi
 * - AuthImageContent: Konten gambar/fitur di sisi kiri kartu
 * - FormInput: Input field dengan label dan error handling
 * - FormAlert: Komponen alert untuk pesan sukses/error
 * - SubmitButton: Tombol submit dengan loading state
 * 
 * @author MateGroup Team
 * @version 1.0.0
 */

import type { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Props untuk komponen AuthLayoutComponent.
 * @interface AuthLayoutProps
 * @property {ReactNode} children - Konten yang akan ditampilkan dalam layout
 * @property {boolean} [showLogo=true] - Menampilkan logo MateGroup
 * @property {string} [title] - Judul halaman (tidak digunakan langsung)
 * @property {string} [subtitle] - Subjudul yang ditampilkan di bawah logo
 */
interface AuthLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
  title?: string;
  subtitle?: string;
}

/**
 * Komponen layout wrapper untuk halaman autentikasi.
 * @description Menyediakan layout dengan background gradient oranye,
 * logo MateGroup, dan container untuk konten autentikasi.
 * 
 * @param {AuthLayoutProps} props - Props komponen
 * @returns {JSX.Element} Layout wrapper dengan styling autentikasi
 * 
 * @example
 * <AuthLayoutComponent subtitle="Masuk ke akun Anda">
 *   <AuthCard>...</AuthCard>
 * </AuthLayoutComponent>
 */
export function AuthLayoutComponent({
  children,
  showLogo = true,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl">
        {showLogo && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">MateGroup</h1>
            {subtitle && <p className="text-orange-100">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/**
 * Props untuk komponen AuthCard.
 * @interface AuthCardProps
 * @property {ReactNode} children - Konten utama kartu (form, dll)
 * @property {ReactNode} [imageContent] - Konten opsional untuk sisi kiri kartu
 */
interface AuthCardProps {
  children: ReactNode;
  imageContent?: ReactNode;
}

/**
 * Komponen kartu container untuk halaman autentikasi.
 * @description Menampilkan kartu dengan layout grid 2 kolom.
 * Sisi kiri menampilkan konten gambar/fitur (opsional),
 * sisi kanan menampilkan konten utama (form).
 * Dilengkapi dengan animasi slideUp saat muncul.
 * 
 * @param {AuthCardProps} props - Props komponen
 * @returns {JSX.Element} Kartu container dengan styling dan animasi
 * 
 * @example
 * <AuthCard imageContent={<AuthImageContent ... />}>
 *   <form>...</form>
 * </AuthCard>
 */
export function AuthCard({ children, imageContent }: AuthCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[600px] animate-[slideUp_0.5s_ease-out]">
      {/* Left Section - Image/Features */}
      {imageContent && (
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hidden md:flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div className="absolute w-48 h-48 bg-white/10 rounded-full -top-12 -right-12 animate-[float_6s_ease-in-out_infinite]" />
          <div className="relative z-10">{imageContent}</div>
        </div>
      )}

      {/* Right Section */}
      <div className={`flex flex-col items-center justify-center p-8 md:p-12 ${!imageContent ? 'md:col-span-2' : ''}`}>
        {children}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Komponen konten gambar/fitur untuk sisi kiri AuthCard.
 * @description Menampilkan judul, deskripsi, dan daftar fitur
 * dengan ikon centang. Digunakan untuk menampilkan keunggulan
 * atau informasi produk di halaman autentikasi.
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.title - Judul yang ditampilkan
 * @param {string} props.description - Deskripsi singkat
 * @param {string[]} props.features - Array daftar fitur yang ditampilkan
 * @returns {JSX.Element} Konten dengan daftar fitur
 * 
 * @example
 * <AuthImageContent
 *   title="Selamat Datang"
 *   description="Kelola proyek dengan mudah"
 *   features={['Fitur 1', 'Fitur 2', 'Fitur 3']}
 * />
 */
export function AuthImageContent({ title, description, features }: {
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-orange-100 mb-8">{description}</p>
      
      <div className="space-y-4 text-left">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-xl">✓</span>
            <span className="text-orange-100">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Komponen input field yang dapat digunakan kembali.
 * @description Menyediakan input field dengan label, placeholder,
 * validasi error, dan styling yang konsisten untuk formulir autentikasi.
 * Mendukung berbagai tipe input (text, email, password, dll).
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.label - Label yang ditampilkan di atas input
 * @param {string} props.id - ID unik untuk input (juga digunakan sebagai htmlFor label)
 * @param {string} [props.name] - Nama input untuk form data (default: sama dengan id)
 * @param {string} [props.type='text'] - Tipe input HTML (text, email, password, dll)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} props.value - Nilai input yang dikontrol
 * @param {function} props.onChange - Handler untuk perubahan nilai input
 * @param {string} [props.error] - Pesan error yang ditampilkan di bawah input
 * @param {boolean} [props.required=false] - Menandai field sebagai wajib diisi
 * @param {boolean} [props.disabled=false] - Menonaktifkan input
 * @returns {JSX.Element} Input field dengan label dan error handling
 * 
 * @example
 * <FormInput
 *   label="Email"
 *   id="email"
 *   type="email"
 *   placeholder="contoh@email.com"
 *   value={email}
 *   onChange={handleChange}
 *   error={errors.email}
 *   required
 * />
 */
export function FormInput({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}: {
  label: string;
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-200 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none ${
          error
            ? 'border-red-500/50 focus:border-red-500'
            : 'border-white/20 focus:border-orange-500'
        } ${disabled ? 'bg-gray-800 cursor-not-allowed' : ''}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

/**
 * Komponen alert untuk menampilkan pesan sukses atau error.
 * @description Menampilkan pesan dalam kotak dengan styling berbeda
 * berdasarkan tipe alert. Error menggunakan warna merah,
 * sukses menggunakan warna hijau.
 * 
 * @param {Object} props - Props komponen
 * @param {'error' | 'success'} props.type - Tipe alert (error atau success)
 * @param {string} props.message - Pesan yang ditampilkan
 * @returns {JSX.Element} Kotak alert dengan pesan
 * 
 * @example
 * <FormAlert type="error" message="Email atau password salah" />
 * <FormAlert type="success" message="Login berhasil!" />
 */
export function FormAlert({
  type,
  message,
}: {
  type: 'error' | 'success';
  message: string;
}) {
  return (
    <div className={`p-4 rounded-lg text-sm font-medium ${
      type === 'error'
        ? 'bg-red-500/10 text-red-400 border border-red-500/50'
        : 'bg-green-500/10 text-green-400 border border-green-500/50'
    }`}>
      {message}
    </div>
  );
}

/**
 * Komponen tombol submit dengan loading state.
 * @description Tombol submit yang mendukung state loading dengan
 * indikator spinner. Secara otomatis dinonaktifkan saat loading
 * atau disabled. Menggunakan gradient oranye sebagai warna utama.
 * 
 * @param {Object} props - Props komponen
 * @param {ReactNode} props.children - Konten/teks tombol
 * @param {boolean} [props.loading=false] - Menampilkan state loading dengan spinner
 * @param {boolean} [props.disabled=false] - Menonaktifkan tombol
 * @param {function} [props.onClick] - Handler untuk klik tombol
 * @param {string} [props.className] - Class CSS tambahan
 * @returns {JSX.Element} Tombol submit dengan styling dan loading state
 * 
 * @example
 * <SubmitButton loading={isSubmitting}>
 *   Masuk
 * </SubmitButton>
 */
export function SubmitButton({
  children,
  loading,
  disabled,
  onClick,
  className,
}: {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const baseClass = `w-full py-3 rounded-lg font-semibold text-white transition-all ${
    disabled || loading
      ? 'bg-gray-600 cursor-not-allowed'
      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25'
  }`;
  
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      onClick={onClick}
      className={className ? `${baseClass} ${className}` : baseClass}
    >
      {loading && <span className="inline-block animate-spin mr-2">⏳</span>}
      {children}
    </button>
  );
}
