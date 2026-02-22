'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { ScrollHint } from '@/components/ScrollHint';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
  };

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
            <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ada pertanyaan atau siap mulai project bareng? Chat dengan team kami sekarang!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            {[
              {
                icon: Mail,
                title: 'Email',
                detail: 'support@mategroup.id',
                link: 'mailto:support@mategroup.id'
              },
              {
                icon: SiWhatsapp,
                title: 'WhatsApp',
                detail: '+62 857-7493-2078',
                link: 'https://wa.me/6285774932078'
              },
              {
                icon: MapPin,
                title: 'Lokasi',
                detail: 'Banten, Indonesia',
                link: '#'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-orange-500/30 p-8 transition-all group text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-orange-500/30 transition-all">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 group-hover:text-orange-400 transition-colors">{item.detail}</p>
                </motion.a>
              );
            })}
          </div>

          {/* Contact Form */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold mb-8">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500/50 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500/50 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Perusahaan</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500/50 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="Nama Perusahaan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Subjek</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500/50 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="Bagaimana kami bisa bantu?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500/50 focus:outline-none transition-all text-white placeholder-gray-500 resize-none"
                  placeholder="Ceritain project Anda..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
              >
                Kirim Pesan <Send size={18} />
              </motion.button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-center"
                >
                  ✓ Pesan terkirim! Kami akan balas segera.
                </motion.div>
              )}
            </form>
          </motion.div> */}

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Pertanyaan yang Sering Diajukan</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: 'Berapa lama timeline project biasanya?',
                  a: 'Timeline tergantung kompleksitas. Project sederhana 4-6 minggu, yang lebih kompleks bisa 3-6 bulan. Kami discuss detail saat konsultasi.'
                },
                {
                  q: 'Apakah ada support setelah project launch?',
                  a: 'Absolutely! Kami provide ongoing support, maintenance, dan updates untuk semua projects. Bisa diskusi package yang sesuai kebutuhan.'
                },
                {
                  q: 'Teknologi apa yang MateGroup specialize?',
                  a: 'Kami specialize modern web dan mobile tech: React, Next.js, Node.js, Python, AI/ML, dan cloud platforms.'
                },
                {
                  q: 'Bisa kerja sama dengan tim existing?',
                  a: 'Definitely! Kami excel di team augmentation dan seamlessly integrate dengan existing development team Anda.'
                },
                {
                  q: 'Bagaimana pricing model MateGroup?',
                  a: 'Flexible! Fixed project pricing, time & materials, atau retainer-based arrangements sesuai kebutuhan Anda.'
                },
                {
                  q: 'Gimana cara mulai project?',
                  a: 'Fill out form di atas atau email kami. Kami schedule konsultasi untuk discuss project dan requirements Anda.'
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6"
                >
                  <h3 className="font-bold text-orange-400 mb-3">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
