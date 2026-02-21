'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingOrbs } from '@/components/FloatingOrbs';

interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  bio?: string;
  phoneNumber?: string;
  company?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/auth/login?redirect=/profile');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data.profile || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-gray-300">Loading...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Profile not found'}</p>
          <Link
            href="/dashboard"
            className="text-orange-400 hover:text-orange-300 font-medium"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 relative overflow-hidden">
      <FloatingOrbs />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto pt-20 relative z-10"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Profil Saya</h1>
            <div className="flex gap-3">
              <Link
                href="/profile/edit"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all"
              >
                Edit
              </Link>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
              >
                Kembali
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {profile.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{profile.fullName}</h2>
                <p className="text-gray-400">@{profile.username}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm font-medium">Email</label>
                <p className="text-white mt-1">{profile.email}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium">Username</label>
                <p className="text-white mt-1">@{profile.username}</p>
              </div>

              {profile.phoneNumber && (
                <div>
                  <label className="text-gray-400 text-sm font-medium">Nomor Telepon</label>
                  <p className="text-white mt-1">{profile.phoneNumber}</p>
                </div>
              )}

              {profile.company && (
                <div>
                  <label className="text-gray-400 text-sm font-medium">Perusahaan</label>
                  <p className="text-white mt-1">{profile.company}</p>
                </div>
              )}
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="pt-6 border-t border-white/10">
                <label className="text-gray-400 text-sm font-medium">Biografi</label>
                <p className="text-white mt-2 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Metadata */}
            {profile.createdAt && (
              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  Bergabung sejak {new Date(profile.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link
            href="/dashboard"
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors"
          >
            <p className="text-gray-300 font-medium">Kembali ke Dashboard</p>
          </Link>
          <Link
            href="/auth/logout"
            className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-center hover:bg-red-500/20 transition-colors"
          >
            <p className="text-red-400 font-medium">Logout</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
