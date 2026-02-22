'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Target, Rocket, BarChart3, Shield, CheckCircle2 } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';
import { GlassCard } from '@/components/GlassCard';
import { FeatureCard } from '@/components/FeatureCard';
import { StatCard } from '@/components/StatCard';
import { ScrollHint } from '@/components/ScrollHint';

const FloatingOrbs = dynamic(() => import('@/components/FloatingOrbs').then(m => ({ default: m.FloatingOrbs })), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const stats = [
    { label: 'Produk SaaS', value: '9', suffix: '+' },
    { label: 'Kemenangan Hackathon', value: '5', suffix: '+' },
    { label: 'Dukungan Pengguna', value: '24', suffix: '/7' },
    { label: 'Uptime', value: '99', suffix: '%' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Powered by AI',
      description: 'Teknologi AI terbaru dengan machine learning untuk otomasi yang lebih cerdas dan efisien.'
    },
    {
      icon: BarChart3,
      title: 'Enterprise Scale',
      description: 'Infrastruktur yang scalable untuk mendukung pertumbuhan bisnis dengan ukuran apapun.'
    },
    {
      icon: Target,
      title: 'Results Oriented',
      description: 'Track record proven dengan ROI terukur dan impact bisnis yang signifikan.'
    }
  ];

  const benefits = [
    'Integrasi mudah dengan sistem existing',
    'Support 24/7 dari tim ahli kami',
    'Keamanan tingkat enterprise',
    'Dashboard analytics real-time',
    'API dokumentasi lengkap',
    'Customizable sesuai kebutuhan'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <ScrollHint />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center">
        {/* Floating Background Elements */}
        <FloatingOrbs />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-orange-300 text-sm font-semibold">
                  <Rocket className="w-4 h-4" />
                  Transformasi Digital Dimulai di Sini
                </span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">AI-Powered </span>
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500">
                SaaS Solutions
              </span>
              <span className="text-white"> untuk Bisnis Modern</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Rangkaian produk SaaS inovatif berbasis teknologi AI, dirancang untuk mempercepat transformasi digital dan meningkatkan efisiensi operasional bisnis Anda.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton href="/products" variant="primary" size="lg" className="min-w-max">
                <span className="flex items-center gap-2">
                  Jelajahi Produk <ArrowRight className="w-5 h-5" aria-hidden="true"/>
                </span>
              </AnimatedButton>
              <AnimatedButton href="/services" variant="outline" size="lg" className="min-w-max">
                Lihat Layanan Kami
              </AnimatedButton>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-8"
            >
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  value={stat.value}
                  label={stat.label}
                  delay={idx}
                  suffix={stat.suffix}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative -mt-12">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 to-transparent opacity-40" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Mengapa Pilih MateGroup?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Kombinasi sempurna antara teknologi canggih, desain modern, dan layanan pelanggan yang responsif.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={idx * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Fitur & Keuntungan Eksklusif</h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 className="w-6 h-6 text-orange-500" />
                    </motion.div>
                    <span className="text-gray-300 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Glass Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <GlassCard delay={0.1} hover={false}>
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Keamanan Terjamin</h3>
                    <p className="text-gray-400">Enkripsi end-to-end dengan standar keamanan internasional.</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.2} hover={false}>
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Performa Maksimal</h3>
                    <p className="text-gray-400">99.9% uptime dengan infrastruktur cloud terdepan.</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.3} hover={false}>
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Dukungan Premium</h3>
                    <p className="text-gray-400">Tim ahli siap membantu Anda 24/7 tanpa henti.</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          animate={{
            background: [
              'linear-gradient(to right, rgba(245, 130, 32, 0.1), transparent)',
              'linear-gradient(to right, transparent, rgba(245, 130, 32, 0.1))',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Siap Mentransformasi Bisnis Anda?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ratusan perusahaan yang telah meningkatkan efisiensi dan profitabilitas mereka bersama solusi kami.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AnimatedButton href="/contact" variant="primary" size="lg">
                Konsultasi Gratis Sekarang
              </AnimatedButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-500 mt-8 text-sm"
            >
              Tidak ada komitmen. Tanpa biaya tersembunyi. Cukup berbicara dengan ahli kami.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
