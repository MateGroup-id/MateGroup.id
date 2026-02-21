'use client';

import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';
import Link from 'next/link';
import ReactCountryFlag from "react-country-flag";
import { ScrollHint } from '@/components/ScrollHint';

export default function PrivacyPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <ScrollHint />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Kebijakan Privasi</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Privacy Policy &mdash; MateGroup
            </p>
            <p className="text-gray-500 text-sm mt-2">Terakhir diperbarui: 22 Februari 2026</p>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 md:p-12 space-y-10"
          >
            {/* Bilingual Info */}
            <div className="text-center pb-6 border-b border-white/10">
              <p className="text-gray-400 text-sm">
                Dokumen ini tersedia dalam Bahasa Indonesia dan English.
              </p>
            </div>

            {/* ========== BAHASA INDONESIA ========== */}
            <div>
              <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <ReactCountryFlag
                  countryCode="ID"
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title="Indonesia"
                />
                Bahasa Indonesia
              </h2>

              <p className="text-gray-300 leading-relaxed mb-8">
                MateGroup berkomitmen melindungi data pribadi pengguna sesuai dengan peraturan perlindungan data yang berlaku.
              </p>

              {/* Section 1 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">1. Data yang Dikumpulkan</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Informasi identitas (nama, email, nomor kontak)</li>
                  <li>Informasi akun dan penggunaan layanan</li>
                  <li>Data teknis (alamat IP, perangkat, browser)</li>
                </ul>
              </motion.div>

              {/* Section 2 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">2. Tujuan Penggunaan Data</h3>
                <p className="text-gray-400 leading-relaxed mb-3">Data digunakan untuk:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Menyediakan dan mengelola layanan</li>
                  <li>Meningkatkan kualitas produk</li>
                  <li>Keperluan komunikasi dan dukungan pelanggan</li>
                </ul>
              </motion.div>

              {/* Section 3 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">3. Penyimpanan dan Keamanan</h3>
                <p className="text-gray-400 leading-relaxed">
                  Data disimpan menggunakan sistem yang menerapkan standar keamanan industri.
                </p>
              </motion.div>

              {/* Section 4 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">4. Pembagian Data</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup tidak menjual data pribadi pengguna kepada pihak ketiga. Data hanya dibagikan jika diwajibkan oleh hukum atau untuk kepentingan operasional yang sah.
                </p>
              </motion.div>

              {/* Section 5 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">5. Hak Pengguna</h3>
                <p className="text-gray-400 leading-relaxed">
                  Pengguna berhak mengakses, memperbarui, atau menghapus data pribadinya sesuai ketentuan yang berlaku.
                </p>
              </motion.div>

              {/* Section 6 - Cookie */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">6. Penggunaan Cookie</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna, menganalisis trafik, dan menyediakan fitur yang relevan. Pengguna dapat mengelola preferensi cookie melalui pengaturan browser masing-masing.
                </p>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            {/* ========== ENGLISH ========== */}
            <div>
              <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <ReactCountryFlag
                  countryCode="GB"
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title="United Kingdom"
                />
                English
              </h2>

              <p className="text-gray-300 leading-relaxed mb-8">
                MateGroup is committed to protecting user personal data in accordance with applicable data protection regulations.
              </p>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">1. Collected Data</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Identity information (name, email, contact number)</li>
                  <li>Account and service usage data</li>
                  <li>Technical data (IP address, device, browser)</li>
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">2. Data Usage Purpose</h3>
                <p className="text-gray-400 leading-relaxed mb-3">Data is used to:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Provide and manage services</li>
                  <li>Improve product quality</li>
                  <li>Support communication and customer service</li>
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">3. Data Storage and Security</h3>
                <p className="text-gray-400 leading-relaxed">
                  Data is stored using systems that follow industry-standard security measures.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">4. Data Sharing</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup does not sell personal data to third parties. Data is only shared when legally required or operationally necessary.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">5. User Rights</h3>
                <p className="text-gray-400 leading-relaxed">
                  Users have the right to access, update, or delete their personal data.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">6. Cookie Usage</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup uses cookies and similar tracking technologies to enhance user experience, analyze traffic, and deliver relevant features. Users may manage cookie preferences through their browser settings.
                </p>
              </motion.div>
            </div>

            {/* Contact Footer */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 justify-center">
                <Mail className="w-5 h-5 text-orange-400" />
                <p className="text-gray-400">
                  Pertanyaan? Hubungi kami di{' '}
                  <a href="mailto:support@mategroup.id" className="text-orange-400 hover:text-orange-300 transition-colors underline">
                    support@mategroup.id
                  </a>
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-4">
                <Link href="/terms" className="text-orange-400 hover:text-orange-300 transition-colors text-sm underline">
                  Syarat &amp; Ketentuan
                </Link>
                <Link href="/payment" className="text-orange-400 hover:text-orange-300 transition-colors text-sm underline">
                  Halaman Pembayaran
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
