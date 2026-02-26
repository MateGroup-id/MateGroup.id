'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Code, Bot, Brain, Zap, Users, TrendingUp, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { ScrollHint } from '@/components/ScrollHint';
import { AnimatedButton } from '@/components/AnimatedButton';

interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: any;
  features: string[];
  process: string[];
  startingPrice?: string;
}

const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Pengembangan Web',
    description: 'Aplikasi web sesuai kebutuhan bisnis Anda',
    longDescription: 'Kami membangun aplikasi web modern dan scalable dengan teknologi terkini. Mulai dari desain responsive hingga sistem backend yang kompleks, kami menghadirkan solusi yang mendorong pertumbuhan dan memaksimalkan performa bisnis Anda.',
    icon: Code,
    features: [
      'Aplikasi Next.js & React',
      'Full-stack development',
      'Pengembangan API',
      'Desain database',
      'Cloud deployment',
      'Optimasi performa'
    ],
    process: ['Discovery', 'Desain', 'Development', 'Testing', 'Deployment', 'Support'],
    startingPrice: 'Rp 500.000,-'
  },
  {
    id: 'automation',
    title: 'Otomasi & Bot',
    description: 'Otomasi proses bisnis Anda dengan mudah',
    longDescription: 'Kami membantu bisnis mengotomasi alur kerja yang berulang dan membangun bot cerdas, mulai dari RPA, chatbot berbasis AI, hingga integrasi antar sistem. Tingkatkan efisiensi operasional dan kurangi human error secara signifikan.',
    icon: Bot,
    features: [
      'Robotic Process Automation (RPA)',
      'Chatbot & virtual assistant',
      'Integrasi API & webhook',
      'Workflow automation',
      'Notifikasi & scheduling otomatis',
      'Monitoring & alerting'
    ],
    process: ['Analisis Proses', 'Desain Alur', 'Development', 'Testing', 'Deployment', 'Support'],
    startingPrice: 'Rp 800.000,-'
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Solusi cerdas berbasis AI dan machine learning',
    longDescription: 'Manfaatkan teknologi AI dan machine learning terdepan untuk mengotomatiskan proses, menggali wawasan dari data, serta membangun sistem cerdas yang andal dan scalable sesuai kebutuhan bisnis Anda.',
    icon: Brain,
    features: [
      'Pengembangan ML model',
      'Integrasi AI',
      'Analisis data',
      'Predictive analytics',
      'Natural language processing',
      'Computer vision'
    ],
    process: ['Penilaian Data', 'Model Building', 'Training', 'Validation', 'Deployment', 'Optimasi'],
    startingPrice: 'Rp 1.000.000,-'
  },
  {
    id: 'saas-dev',
    title: 'Pengembangan SaaS',
    description: 'Bangun dan luncurkan produk SaaS Anda bersama kami',
    longDescription: 'Dari konsep hingga pasar, kami membantu Anda membangun, meluncurkan, dan mengembangkan skala produk SaaS dengan arsitektur modern serta best practice yang telah terbukti menghasilkan produk berkualitas tinggi.',
    icon: Zap,
    features: [
      'Arsitektur SaaS',
      'Sistem multi-tenant',
      'Payment integration',
      'Authentication & security',
      'Perencanaan scalability',
      'Analytics & monitoring'
    ],
    process: ['Perencanaan', 'MVP Development', 'Beta Launch', 'Feedback', 'Scale', 'Growth'],
    startingPrice: 'Rp 1.500.000,-'
  },
  {
    id: 'consulting',
    title: 'Konsultasi Digital',
    description: 'Panduan strategis untuk transformasi digital bisnis Anda',
    longDescription: 'Kami membantu bisnis dalam menjalani perjalanan transformasi digital dengan saran ahli mengenai technology strategy, architecture design, dan implementation roadmap yang terstruktur dan strategis.',
    icon: TrendingUp,
    features: [
      'Penilaian teknologi',
      'Strategi digital',
      'Perencanaan arsitektur',
      'Augmentasi tim',
      'Optimasi proses',
      'Change management'
    ],
    process: ['Konsultasi Awal', 'Penilaian', 'Strategi', 'Perencanaan', 'Implementation', 'Review'],
    startingPrice: 'Custom'
  },
  {
    id: 'team-augmentation',
    title: 'Augmentasi Tim',
    description: 'Perluas kapasitas tim Anda dengan developer berpengalaman',
    longDescription: 'Dapatkan akses ke developer terampil yang terintegrasi secara mulus dengan tim Anda. Solusi tepat untuk memperluas kapasitas pengembangan secara cepat, efisien, dan sesuai dengan kebutuhan proyek.',
    icon: Users,
    features: [
      'Developer dedicated',
      'Flexible engagement',
      'Skill matching',
      'Tools komunikasi',
      'Manajemen project',
      'Quality assurance'
    ],
    process: ['Analisis Requirement', 'Developer Selection', 'Onboarding', 'Integrasi', 'Kolaborasi', 'Review'],
    startingPrice: 'Custom'
  },
];

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ServicesContent />
    </Suspense>
  );
}

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const selected = services.find((s) => s.id === serviceId);

  /* ── DETAIL VIEW ── */
  if (selected) {
    const Icon = selected.icon;
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        <ScrollHint />
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => router.push('/services')}
              className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-10 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Layanan
            </motion.button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-5 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 cursor-default"
              >
                <Icon className="w-8 h-8 text-orange-400" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{selected.title}</h1>
                <p className="text-gray-400 text-lg">{selected.description}</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 mb-6 hover:scale-105 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              <p className="text-gray-300 leading-relaxed text-base">{selected.longDescription}</p>
            </motion.div>

            {/* Features & Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-6"
            >
              {/* Features */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 hover:scale-105 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  Fitur Utama
                </h3>
                <ul className="space-y-3">
                  {selected.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-400 text-sm flex items-start gap-2 hover:text-gray-200 hover:translate-x-1 transition-all duration-200 cursor-default">
                      <span className="text-orange-400 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 hover:scale-105 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  Proses Kami
                </h3>
                <div className="space-y-3">
                  {selected.process.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/step hover:translate-x-1 transition-all duration-200 cursor-default">
                      <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0 group-hover/step:bg-orange-500/50 group-hover/step:scale-110 transition-all duration-200">
                        {idx + 1}
                      </div>
                      <span className="text-gray-400 text-sm group-hover/step:text-gray-200 transition-colors duration-200">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pricing & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/15 transition-all duration-200"
            >
              <div>
                <p className="text-sm text-gray-400 mb-1">Mulai dari</p>
                <p className="text-3xl font-bold text-orange-400">{selected.startingPrice ?? 'Custom'}</p>
                <p className="text-xs text-gray-500 mt-1">* Harga dalam Rupiah (IDR). Final harga menyesuaikan kebutuhan proyek.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <AnimatedButton href="/payment" variant="primary" size="md">
                  Pesan Sekarang
                </AnimatedButton>
                <AnimatedButton href="/contact" variant="secondary" size="md">
                  Jadwalkan Konsultasi
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  /* ── GRID VIEW ── */
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <ScrollHint />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4">Layanan Kami</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Solusi digital lengkap untuk mempercepat pertumbuhan dan inovasi bisnis Anda
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => router.push(`/services?service=${service.id}`)}
                  className="rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-orange-500/30 hover:scale-105 p-8 group transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 flex flex-col cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-all">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 space-y-4 border-t border-white/10">
                    {service.startingPrice && (
                      <div>
                        <p className="text-xs text-gray-500">Mulai dari</p>
                        <p className="text-orange-400 font-semibold">{service.startingPrice}</p>
                      </div>
                    )}
                    <div className="block w-full px-4 py-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 text-orange-400 font-semibold text-sm transition-all text-center">
                      Lihat Detail
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-500/10 border border-orange-500/30 p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Siap Mulai?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Pilih layanan yang sesuai kebutuhan Anda dan lakukan pemesanan sekarang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/payment" variant="primary" size="lg">
                Pesan &amp; Bayar
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="secondary" size="lg">
                Jadwalkan Konsultasi
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
