'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Lock, CreditCard, Shield, Clock, Mail, CheckCircle, Code, Smartphone, Brain, Zap, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { ScrollHint } from '@/components/ScrollHint';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  icon: any;
  features: string[];
}

const availableServices: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Pengembangan Web',
    description: 'Aplikasi web modern dan scalable sesuai kebutuhan bisnis Anda.',
    price: 'Rp 500.000',
    priceValue: 500000,
    icon: Code,
    features: ['Aplikasi Next.js & React', 'Full-stack development', 'Cloud deployment'],
  },
  {
    id: 'mobile-dev',
    title: 'Aplikasi Mobile',
    description: 'Solusi mobile native dan cross-platform dengan performa optimal.',
    price: 'Rp 800.000',
    priceValue: 800000,
    icon: Smartphone,
    features: ['iOS & Android', 'Cross-platform', 'UI/UX design'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Solusi intelligent dengan teknologi AI dan ML terdepan.',
    price: 'Rp 1.000.000',
    priceValue: 1000000,
    icon: Brain,
    features: ['ML model development', 'AI integration', 'Predictive analytics'],
  },
  {
    id: 'saas-dev',
    title: 'Pengembangan SaaS',
    description: 'Build dan launch produk SaaS dari concept hingga market.',
    price: 'Rp 1.500.000',
    priceValue: 1500000,
    icon: Zap,
    features: ['Arsitektur SaaS', 'Multi-tenant system', 'Payment integration'],
  },
  {
    id: 'consulting',
    title: 'Konsultasi Digital',
    description: 'Guidance strategis untuk transformasi digital bisnis Anda.',
    price: 'Hubungi Kami',
    priceValue: 0,
    icon: TrendingUp,
    features: ['Technology assessment', 'Digital strategy', 'Architecture planning'],
  },
  {
    id: 'team-augmentation',
    title: 'Augmentasi Tim',
    description: 'Perluas tim dengan expert developers yang dedicated.',
    price: 'Hubungi Kami',
    priceValue: 0,
    icon: Users,
    features: ['Developer dedicated', 'Flexible engagement', 'Quality assurance'],
  },
];

function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PaymentPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const selected = availableServices.find((s) => s.id === selectedService);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <ScrollHint />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Pembayaran</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Pilih layanan yang Anda butuhkan dan lakukan pembayaran dengan aman. Semua transaksi menggunakan mata uang <span className="text-orange-400 font-semibold">Rupiah (IDR)</span>.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Service Selection */}
            <div className="lg:col-span-2 space-y-4">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold mb-4"
              >
                Pilih Layanan
              </motion.h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {availableServices.map((service, idx) => {
                  const Icon = service.icon;
                  const isSelected = selectedService === service.id;

                  return (
                    <motion.button
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      onClick={() => setSelectedService(isSelected ? null : service.id)}
                      className={`text-left rounded-xl p-6 border transition-all duration-300 cursor-pointer group ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10'
                          : 'bg-gradient-to-br from-gray-900 to-black border-white/10 hover:border-orange-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'bg-orange-500/30' : 'bg-orange-500/20 group-hover:bg-orange-500/30'
                        }`}>
                          <Icon className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold mb-1 transition-colors ${
                            isSelected ? 'text-orange-400' : 'text-white group-hover:text-orange-400'
                          }`}>
                            {service.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3">{service.description}</p>

                          <ul className="space-y-1 mb-3">
                            {service.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                <CheckCircle className="w-3 h-3 text-orange-500/60 flex-shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>

                          <div className="pt-2 border-t border-white/5">
                            <span className="text-orange-400 font-semibold text-sm">
                              {service.priceValue > 0
                                ? `Mulai dari ${service.price}`
                                : service.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3"
                        >
                          <CheckCircle className="w-5 h-5 text-orange-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right: Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 sticky top-28"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-orange-400" />
                  Ringkasan Pesanan
                </h2>

                {selected ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="font-semibold text-white">{selected.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{selected.description}</p>
                    </div>

                    <div className="flex justify-between text-sm text-gray-400 pt-2">
                      <span>Subtotal</span>
                      <span>
                        {selected.priceValue > 0
                          ? formatRupiah(selected.priceValue)
                          : 'Custom'}
                      </span>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-orange-400">
                        {selected.priceValue > 0
                          ? formatRupiah(selected.priceValue)
                          : 'Hubungi Kami'}
                      </span>
                    </div>

                    {/* Mata Uang Note */}
                    <p className="text-xs text-gray-500 text-center">
                      * Seluruh harga dalam mata uang Rupiah (IDR)
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Pilih layanan untuk melihat ringkasan pesanan.</p>
                  </div>
                )}

                {/* Disabled Checkout Button */}
                <div className="mt-6 space-y-3">
                  <button
                    disabled
                    className="w-full py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-gray-700/50 text-gray-400 border border-gray-600/50 cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </button>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Sistem pembayaran sedang dalam proses integrasi. Untuk pemesanan saat ini, silakan{' '}
                    <Link href="/contact" className="text-orange-400 hover:text-orange-300 underline">
                      hubungi kami
                    </Link>{' '}
                    langsung.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="w-3.5 h-3.5 text-green-500/70" />
                    <span>Pembayaran diproses secara aman</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5 text-green-500/70" />
                    <span>Data dilindungi dengan enkripsi SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CreditCard className="w-3.5 h-3.5 text-green-500/70" />
                    <span>Transaksi dalam Rupiah (IDR)</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Info & Legal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center space-y-4"
          >
            <p className="text-gray-500 text-sm">
              Dengan melakukan pemesanan, Anda menyetujui{' '}
              <Link href="/terms" className="text-orange-400 hover:text-orange-300 underline">
                Syarat &amp; Ketentuan
              </Link>{' '}
              dan{' '}
              <Link href="/privacy" className="text-orange-400 hover:text-orange-300 underline">
                Kebijakan Privasi
              </Link>{' '}
              kami.
            </p>
            <div className="flex items-center gap-2 justify-center text-gray-500 text-sm">
              <Mail className="w-4 h-4 text-orange-400" />
              <span>
                Butuh bantuan?{' '}
                <a href="mailto:support@mategroup.id" className="text-orange-400 hover:text-orange-300 underline">
                  support@mategroup.id
                </a>{' '}
                |{' '}
                <a href="https://wa.me/6285774932078" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
                  +62 857-7493-2078
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
