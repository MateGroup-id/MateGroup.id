'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { User, Shield, Bell, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-gray-900 to-black px-8 py-6 pt-24 relative overflow-hidden">
      <FloatingOrbs />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">Dashboard</h1>
          <p className="text-gray-400 mb-8">Selamat datang di MateGroup SSO</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/profile/edit" className="group block p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-6 h-6" />
                <h2 className="text-xl font-bold">Edit Profil</h2>
              </div>
              <p className="text-orange-100">Perbarui informasi akun Anda</p>
            </Link>
            
            <div className="p-6 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-300">Keamanan</h2>
              </div>
              <p>Kelola password dan 2FA</p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-6 h-6 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-300">Notifikasi</h2>
              </div>
              <p>Atur preferensi notifikasi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link href="/profile" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500/50 transition-all">
              <Settings className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300 font-medium">Lihat Profil</span>
            </Link>
            <Link href="/api/auth/logout" className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all">
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Logout</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
