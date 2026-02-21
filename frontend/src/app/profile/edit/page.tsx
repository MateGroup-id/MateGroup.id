'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormAlert, SubmitButton } from '@/components/AuthComponents';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingOrbs } from '@/components/FloatingOrbs';

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  bio: string;
  phoneNumber: string;
  company: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    phoneNumber: '',
    company: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev): UserProfile => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev): Record<string, string> => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    setErrors({});

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlert({ type: 'error', message: data.error || 'Update profil gagal' });
        return;
      }

      setAlert({ type: 'success', message: 'Profil berhasil diperbarui!' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      setAlert({ type: 'error', message: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingOrbs />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Edit Profil</h1>
              <p className="text-gray-400 text-sm">Perbarui informasi profil Anda</p>
            </div>
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>

          {alert && <FormAlert type={alert.type} message={alert.message} />}

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <FormInput
              label="Nama Lengkap"
              id="fullName"
              placeholder="Nama Lengkap"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-200 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                disabled
                className="w-full px-4 py-3 border border-white/10 rounded-lg text-sm bg-gray-800/50 text-gray-400 cursor-not-allowed"
              />
              <p className="text-gray-500 text-xs mt-1">Username tidak dapat diubah</p>
            </div>

            <FormInput
              label="Email"
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormInput
              label="Nomor Telepon"
              id="phoneNumber"
              type="tel"
              placeholder="+62..."
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <FormInput
              label="Perusahaan"
              id="company"
              placeholder="PT..."
              value={formData.company}
              onChange={handleChange}
            />

            <div>
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-200 mb-2">
                Biografi
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Ceritakan tentang diri Anda..."
                rows={4}
                className="w-full px-4 py-3 border border-white/20 rounded-lg text-sm bg-gray-800/50 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            <SubmitButton loading={loading}>
              Simpan Perubahan
            </SubmitButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
