'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Zap, Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';
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
    id: 'mobile-dev',
    title: 'Aplikasi Mobile',
    description: 'Solusi aplikasi mobile native dan cross-platform',
    longDescription: 'Kami menghadirkan pengalaman mobile yang menarik berkat keahlian kami dalam pengembangan native iOS/Android dan cross-platform. Kami berfokus pada user experience yang luar biasa serta performa yang optimal.',
    icon: Smartphone,
    features: [
      'Pengembangan iOS',
      'Pengembangan Android',
      'Aplikasi cross-platform',
      'Desain UI/UX',
      'App store deployment',
      'Maintenance & updates'
    ],
    process: ['Perencanaan', 'Desain', 'Development', 'Beta Testing', 'Launch', 'Support'],
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
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <ScrollHint />
      {/* Header Section */}
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
                  className="rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-orange-500/30 hover:scale-105 p-8 group transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 flex flex-col"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-all">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-all">
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

                    <Link href="/payment" className="block w-full px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-semibold text-sm transition-all text-center">
                      Pesan Sekarang
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Detail Layanan
          </motion.h2>

          <div className="space-y-12">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-gradient-to-r from-gray-900/50 to-black border border-white/10 p-8 md:p-12"
                >
                  <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-orange-400 mb-2">{service.title}</h3>
                      <p className="text-gray-400">{service.longDescription}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-orange-400" />
                        Fitur Utama
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-orange-400 mt-1">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-400" />
                        Proses Kami
                      </h4>
                      <div className="space-y-2">
                        {service.process.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400">
                              {sIdx + 1}
                            </div>
                            <span className="text-gray-400 text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
