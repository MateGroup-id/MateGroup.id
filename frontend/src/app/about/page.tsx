'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Heart, Award } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';
import { ScrollHint } from '@/components/ScrollHint';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <ScrollHint />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4">Tentang MateGroup</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Membangun solusi SaaS inovatif dan layanan digital yang transform bisnis
            </p>
          </motion.div>

          {/* Company Info */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Siapa Kami</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                MateGroup adalah perusahaan teknologi yang berpikir maju, spesialisasi dalam solusi SaaS berbasis AI dan layanan digital. Kami passionate menciptakan produk yang solve real problems dan deliver measurable value ke pengguna kami.
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Dengan track record kemenangan hackathon dan produk pemenang award, kami combine innovation, technical excellence, dan design yang user-centric untuk deliver solutions yang truly make a difference.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Tim kami dedicated push boundaries what's possible dengan modern technology, dari machine learning dan AI hingga full-stack development dan cloud architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8"
            >
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">9+</div>
                  <p className="text-gray-400">Produk SaaS Aktif</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">5+</div>
                  <p className="text-gray-400">Penghargaan Hackathon</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                  <p className="text-gray-400">Dukungan Pengguna</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Nilai Kami</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: 'Inovasi',
                  desc: 'Kami terus push boundaries dan embrace teknologi baru untuk solve problems dengan cara creative.'
                },
                {
                  icon: Target,
                  title: 'Kualitas',
                  desc: 'Kami maintain standard tertinggi dalam code quality, design, dan customer service.'
                },
                {
                  icon: Heart,
                  title: 'User-Centric',
                  desc: 'Setiap keputusan kami guided oleh deep understanding terhadap user needs kami.'
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  desc: 'Kami strive untuk excellence dalam segala hal, dari products ke services.'
                }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-white/10 p-12"
          >
            <h2 className="text-3xl font-bold mb-8">Prestasi Terbaru</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '🏆 Top 5 Bangkit Academy 2024 Capstone Project',
                '🥇 Microsoft Online Hackathon 2025 Winner',
                '🏅 Top 30 Yayasan Peduli BUMN Hackathon',
                '⭐ Scored 94/100 in Laskar AI 2025',
                '🏆 IDCamp Developer Challenge #2 Winner',
                '🎯 Top 20 Hackinfest Sucofindo 2025',
                '🚀 Top 50 (Rank 22) Meta Llama Project Incubator',
                '⭐ Recognized by leading tech companies'
              ].map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <span className="text-2xl flex-shrink-0">{achievement.split(' ')[0]}</span>
                  <span className="text-gray-400">{achievement.slice(achievement.indexOf(' '))}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-500/10 border border-orange-500/30 p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Kolaborasi Bareng Yuk</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Siap transform bisnis Anda dengan solusi inovatif dan layanan profesional kami?
            </p>
            <Link href="/contact">
              <AnimatedButton variant="primary" size="lg">
                Hubungi Kami
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
