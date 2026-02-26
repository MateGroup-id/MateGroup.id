'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { ScrollHint } from '@/components/ScrollHint';
import {
  SiPython,
  SiTensorflow,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiGooglecloud,
  SiFlask,
  SiAmazon,
  SiGooglegemini,
  SiOllama,
} from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

// Tech stack icon mapping
const techIconMap: { [key: string]: any } = {
  'Python': SiPython,
  'TensorFlow': SiTensorflow,
  'React': SiReact,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Next.js': SiNextdotjs,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Google Cloud': SiGooglecloud,
  'Flask': SiFlask,
  'AWS': SiAmazon,
  'Microsoft Azure': FaMicrosoft,
  'Generative AI': SiGooglegemini,
  'Llama AI': SiOllama,
  'Time Series Analysis': SiTensorflow,
};

interface SaaSProduct {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'AI' | 'Education' | 'Wellness' | 'Energy' | 'Marketplace' | 'Creative';
  status: 'Live' | 'Beta' | 'Coming Soon';
  technologies: string[];
  highlights: string[];
  award?: string;
  image?: string;
  link?: string;
}

const products: SaaSProduct[] = [
  {
    id: 'comate',
    title: 'CoMate',
    shortDesc: 'Platform collaborative AI',
    fullDesc: 'Platform kolaboratif inovatif yang memanfaatkan teknologi Llama AI dari Meta untuk pengalaman kolaborasi yang mutakhir dan futuristik.',
    category: 'AI',
    status: 'Beta',
    award: '🚀 Top 50 (Rank 22) Meta Llama Project Incubator',
    technologies: ['Python', 'Llama AI', 'React', 'Node.js', 'Google Cloud'],
    highlights: [
      'Integrasi Llama AI',
      'Workspace collaborative',
      'Partnership Meta',
      'Fitur AI advanced'
    ],
  },
  {
    id: 'coursemate',
    title: 'CourseMate',
    shortDesc: 'Rekomendasi kursus berbasis AI',
    fullDesc: 'Platform pembelajaran cerdas yang menggunakan machine learning untuk menganalisis preferensi pengguna dan memberikan rekomendasi konten edukatif yang dipersonalisasi.',
    category: 'Education',
    status: 'Coming Soon',
    award: '🏆 Top 5 Bangkit Academy 2024 Capstone',
    technologies: ['Python', 'TensorFlow', 'Flask', 'Google Cloud'],
    highlights: [
      'Engine rekomendasi AI',
      'Path pembelajaran personalized',
      'Saran kursus real-time',
      'Dashboard user analytics'
    ],
  },
  {
    id: 'mentalmate-v1',
    title: 'MentalMate v1',
    shortDesc: 'Asisten kesehatan mental berbasis AI',
    fullDesc: 'Platform kesehatan mental yang didukung oleh kecerdasan buatan generatif, menawarkan dukungan emosional, pelacakan suasana hati, dan rekomendasi kesehatan yang canggih.',
    category: 'Wellness',
    status: 'Coming Soon',
    award: '🥇 Microsoft Online Hackathon 2025 Winner',
    technologies: ['Python', 'Generative AI', 'Flask', 'Microsoft Azure'],
    highlights: [
      'Support AI conversational',
      'Tracking mood',
      'Wellness recommendations',
      'Penanganan data secure'
    ],
  },
  {
    id: 'mentymate',
    title: 'MentyMate (v2)',
    shortDesc: 'Platform wellness mental yang enhanced',
    fullDesc: 'Platform kesehatan mental yang ditingkatkan dengan fitur interaktif, pelacakan progres, dukungan komunitas, dan integrasi sumber daya profesional yang lengkap.',
    category: 'Wellness',
    status: 'Coming Soon',
    award: '🏅 Top 30 Yayasan Peduli BUMN Hackathon',
    technologies: ['React', 'TypeScript', 'Python', 'Google Cloud'],
    highlights: [
      'Dashboard wellness interactive',
      'Progress tracking & analytics',
      'Fitur community support',
      'Professional resources'
    ],
  },
  {
    id: 'energymate',
    title: 'EnergyMate',
    shortDesc: 'Sistem manajemen energi yang smart',
    fullDesc: 'Platform pemantauan energi cerdas yang memprediksi pola konsumsi dan memberikan rekomendasi optimalisasi untuk menghemat biaya operasional.',
    category: 'Energy',
    status: 'Coming Soon',
    award: '⭐ Scored 94/100 Laskar AI 2025',
    technologies: ['Python', 'TensorFlow', 'Time Series Analysis', 'Flask'],
    highlights: [
      'Prediksi consumption berbasis ML',
      'Smart optimization algorithms',
      'Hemat energi rata-rata 40%',
      'Dashboard monitoring real-time'
    ],
  },
  {
    id: 'edumate',
    title: 'EduMate',
    shortDesc: 'Platform learning interactive dan monitoring',
    fullDesc: 'Platform edukasi komprehensif yang menggabungkan pengalaman belajar interaktif dengan pemantauan siswa secara cerdas dan jalur pembelajaran adaptif yang dipersonalisasi.',
    category: 'Education',
    status: 'Coming Soon',
    award: '🏆 IDCamp Developer Challenge #2 Winner',
    technologies: ['Next.js', 'React', 'Express', 'MongoDB', 'Google Cloud'],
    highlights: [
      'Module interactive',
      'Monitoring real-time',
      'Adaptive learning paths',
      'Dashboard guru'
    ],
  },
  {
    id: 'checkmate',
    title: 'CheckMate',
    shortDesc: 'Platform product insights berbasis AI',
    fullDesc: 'Platform berbasis AI untuk analisis produk yang komprehensif, penilaian kualitas, dan pengecekan kepatuhan dengan analitik terperinci serta wawasan mendalam.',
    category: 'AI',
    status: 'Coming Soon',
    award: '🎯 Top 20 Hackinfest Sucofindo 2025',
    technologies: ['Python', 'Generative AI', 'TensorFlow', 'Google Cloud'],
    highlights: [
      'Engine quality assessment',
      'Compliance checking',
      'Analytics product',
      'Insights edukatif'
    ],
  },
  {
    id: 'xportmate',
    title: 'XportMate',
    shortDesc: 'Platform digital export',
    fullDesc: 'Platform yang mendukung inisiatif ekspor digital dengan alat analisis pasar, dukungan dokumentasi perdagangan, dan integrasi pembayaran yang aman.',
    category: 'Marketplace',
    status: 'Coming Soon',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    highlights: [
      'Fasilitasi export',
      'Tools market analysis',
      'Trade documentation',
      'Payment integration'
    ],
  },
  {
    id: 'ekrafmate',
    title: 'EkrafMate',
    shortDesc: 'Platform creative talent',
    fullDesc: 'Platform inovatif yang menghubungkan talenta kreatif dengan peluang bisnis, dilengkapi fitur penampilan portofolio dan alat kolaborasi yang andal.',
    category: 'Creative',
    status: 'Coming Soon',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    highlights: [
      'Algoritma talent matching',
      'Portfolio management',
      'Tools kolaborasi',
      'Rekomendasi berbasis skill'
    ],
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const categories = ['AI', 'Education', 'Wellness', 'Energy', 'Marketplace', 'Creative'];
  
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

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
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">Produk SaaS Kami</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Rangkaian lengkap solusi SaaS berbasis AI yang dirancang untuk mengatasi masalah nyata
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 px-2"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-md hover:shadow-orange-500/20'
              }`}
            >
              Semua Produk
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-md hover:shadow-orange-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-orange-500/60 overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 flex flex-col hover:scale-105 hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="p-3 sm:p-4 border-b border-white/10">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {product.title}
                      </h3>

                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                        product.status === 'Live'
                          ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/40 group-hover:shadow-lg group-hover:shadow-green-500/20'
                          : product.status === 'Beta'
                          ? 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/40 group-hover:shadow-lg group-hover:shadow-cyan-500/20'
                          : 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/40 group-hover:shadow-lg group-hover:shadow-yellow-500/20'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 mt-2 break-words">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    {product.award && (
                      <div className="mb-3 p-2 bg-purple-500/20 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                        <p className="text-xs text-purple-200">{product.award}</p>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-gray-400 mb-4 flex-1 leading-relaxed">{product.fullDesc}</p>

                    {/* Tech Stack */}
                    <div className="mb-4 pb-4 border-b border-white/10">
                      <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Stack Teknologi</p>
                      <div className="flex flex-wrap gap-2">
                        {product.technologies.slice(0, 4).map((tech, idx) => {
                          const IconComponent = techIconMap[tech];
                          return (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.15, rotate: 5 }}
                              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                              title={tech}
                            >
                              {IconComponent && (
                                <IconComponent className="text-orange-400 text-sm sm:text-base flex-shrink-0" />
                              )}
                              <span className="text-orange-300 text-xs font-medium hidden sm:inline">{tech}</span>
                            </motion.div>
                          );
                        })}
                        {product.technologies.length > 4 && (
                          <span className="px-2 py-1 text-orange-300 text-xs font-medium rounded-lg bg-orange-500/10 border border-orange-500/30 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300 flex items-center">
                            +{product.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                      className="text-orange-400 text-sm font-semibold flex items-center gap-2 hover:text-orange-300 transition-all duration-300 group/btn"
                    >
                      <span className="group-hover/btn:underline">
                        {expandedProduct === product.id ? 'Sembunyikan' : 'Lihat'} Fitur Utama
                      </span>
                      <motion.div
                        animate={{ rotate: expandedProduct === product.id ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {expandedProduct === product.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-2 border-t border-white/10 pt-4"
                        >
                          {product.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-300"
                            >
                              <Zap size={14} className="text-yellow-400 mt-0.5 flex-shrink-0 group-hover/item:animate-pulse" />
                              <span className="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors duration-300">{highlight}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CTA */}
                  <div className="p-3 sm:p-4 border-t border-white/10 pt-3">
                    {product.status === 'Coming Soon' ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-400 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-gray-700 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    ) : (
                      <a
                        href={product.status === 'Live' ? product.link || '#' : '/contact'}
                        target={product.status === 'Live' ? '_blank' : undefined}
                        rel={product.status === 'Live' ? 'noopener noreferrer' : undefined}
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full px-4 py-2 rounded-lg ${
                            product.status === 'Live'
                              ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500/40 hover:to-orange-600/40 text-orange-400 border border-orange-500/30 cursor-pointer'
                              : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 cursor-pointer'
                          } font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2`}
                        >
                          {product.status === 'Live' ? 'Learn More' : 'Request Early Access'}
                          <motion.div
                            animate={{ x: 3 }}
                            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
                            className="transition-transform"
                          >
                            <ExternalLink size={16} />
                          </motion.div>
                        </motion.button>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
