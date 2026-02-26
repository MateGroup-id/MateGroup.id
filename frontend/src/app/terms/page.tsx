'use client';

import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import { ScrollHint } from '@/components/ScrollHint';
import { ReactCountryFlag } from 'react-country-flag';

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Syarat &amp; Ketentuan</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Terms of Service &mdash; MateGroup
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
            {/* Bilingual Toggle Info */}
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
                  aria-label="Indonesia flag"
                />
                Bahasa Indonesia
              </h2>

              <p className="text-gray-300 leading-relaxed mb-8">
                Dengan mengakses atau menggunakan layanan MateGroup, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan berikut:
              </p>

              {/* Section 1 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">1. Ruang Lingkup Layanan</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup menyediakan berbagai layanan perangkat lunak berbasis web dan/atau aplikasi yang bertujuan mendukung aktivitas profesional dan bisnis pengguna.
                </p>
              </motion.div>

              {/* Section 2 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">2. Kelayakan Pengguna</h3>
                <p className="text-gray-400 leading-relaxed">
                  Pengguna harus berusia minimal 18 tahun atau memiliki izin dari wali yang sah untuk menggunakan layanan.
                </p>
              </motion.div>

              {/* Section 3 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">3. Akun dan Keamanan</h3>
                <p className="text-gray-400 leading-relaxed">
                  Pengguna bertanggung jawab penuh atas kerahasiaan informasi akun, termasuk kata sandi dan aktivitas yang dilakukan melalui akun tersebut.
                </p>
              </motion.div>

              {/* Section 4 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">4. Penggunaan yang Dilarang</h3>
                <p className="text-gray-400 leading-relaxed mb-3">
                  Pengguna dilarang menggunakan layanan untuk:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Melanggar hukum atau peraturan yang berlaku.</li>
                  <li>Menyebarkan konten berbahaya, menyesatkan, atau melanggar hak pihak lain.</li>
                  <li>Mengganggu keamanan sistem atau layanan.</li>
                </ul>
              </motion.div>

              {/* Section 5 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">5. Hak Kekayaan Intelektual</h3>
                <p className="text-gray-400 leading-relaxed">
                  Seluruh sistem, desain, logo, dan konten yang disediakan merupakan milik MateGroup atau pemegang lisensi resminya.
                </p>
              </motion.div>

              {/* Section 6 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">6. Pembatasan Tanggung Jawab</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup tidak bertanggung jawab atas kerugian tidak langsung, gangguan layanan, atau kehilangan data yang disebabkan oleh faktor di luar kendali wajar.
                </p>
              </motion.div>

              {/* Section 7 */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">7. Perubahan Layanan</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup berhak melakukan perubahan, pembaruan, atau penghentian layanan dengan pemberitahuan yang wajar.
                </p>
              </motion.div>

              {/* Section 8 - Kebijakan Pengembalian Dana */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">8. Kebijakan Pengembalian Dana</h3>
                <p className="text-gray-400 leading-relaxed mb-3">
                  Pengembalian dana (refund) dapat diajukan dalam kondisi berikut:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Layanan tidak dapat digunakan karena kesalahan teknis dari pihak MateGroup.</li>
                  <li>Pembayaran ganda atau kesalahan transaksi yang terverifikasi.</li>
                  <li>Pengajuan refund dilakukan maksimal 7 (tujuh) hari kalender sejak tanggal transaksi.</li>
                </ul>
                <p className="text-gray-400 leading-relaxed mt-3">
                  Pengembalian dana akan diproses dalam waktu 7—14 hari kerja setelah pengajuan disetujui. MateGroup berhak menolak pengajuan refund yang tidak memenuhi syarat di atas.
                </p>
              </motion.div>

              {/* Section 9 - Mata Uang */}
              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">9. Mata Uang Transaksi</h3>
                <p className="text-gray-400 leading-relaxed">
                  Seluruh transaksi pada platform MateGroup menggunakan mata uang Rupiah (IDR). Mata uang lain hanya digunakan sebagai informasi perbandingan pada deskripsi produk, bukan untuk transaksi.
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
                  aria-label="United Kingdom flag"
                />
                English
              </h2>

              <p className="text-gray-300 leading-relaxed mb-8">
                By accessing or using MateGroup services, users agree to the following terms:
              </p>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">1. Service Scope</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup provides web-based and/or application-based software services to support professional and business activities.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">2. User Eligibility</h3>
                <p className="text-gray-400 leading-relaxed">
                  Users must be at least 18 years old or have legal guardian consent.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">3. Account Security</h3>
                <p className="text-gray-400 leading-relaxed">
                  Users are fully responsible for maintaining the confidentiality of their account credentials.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">4. Prohibited Use</h3>
                <p className="text-gray-400 leading-relaxed mb-3">Users may not:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>Violate applicable laws or regulations.</li>
                  <li>Distribute harmful, misleading, or infringing content.</li>
                  <li>Interfere with system security or operations.</li>
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">5. Intellectual Property</h3>
                <p className="text-gray-400 leading-relaxed">
                  All systems, designs, logos, and content are owned by MateGroup or its licensed partners.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">6. Limitation of Liability</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup is not liable for indirect damages, service disruptions, or data loss beyond reasonable control.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">7. Service Modifications</h3>
                <p className="text-gray-400 leading-relaxed">
                  MateGroup reserves the right to modify or discontinue services with reasonable notice.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">8. Refund Policy</h3>
                <p className="text-gray-400 leading-relaxed mb-3">
                  Refunds may be requested under the following conditions:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  <li>The service is unusable due to a technical error on MateGroup&apos;s side.</li>
                  <li>Duplicate payment or a verified transaction error has occurred.</li>
                  <li>The refund request is submitted within 7 (seven) calendar days of the transaction date.</li>
                </ul>
                <p className="text-gray-400 leading-relaxed mt-3">
                  Approved refunds will be processed within 7—14 business days. MateGroup reserves the right to reject refund requests that do not meet the above criteria.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">9. Transaction Currency</h3>
                <p className="text-gray-400 leading-relaxed">
                  All transactions on the MateGroup platform are conducted in Indonesian Rupiah (IDR). Other currencies are used solely for informational comparison in product descriptions, not for transactions.
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
              <div className="flex items-center gap-2 justify-center mt-4 text-sm">
                <p>Lihat juga:</p>
                <Link
                    href="/privacy"
                    className="text-orange-400 hover:text-orange-300 transition-colors underline"
                >
                    Kebijakan Privasi
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
