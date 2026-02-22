'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import { SiFacebook, SiInstagram, SiThreads } from 'react-icons/si';
import { motion } from 'framer-motion';

const year = new Date().getFullYear();

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const footerLinks = {
    produk: [
      { label: 'Semua Produk', href: '/products' },
      { label: 'Solusi SaaS', href: '/products' },
      { label: 'Alat Enterprise', href: '/products' },
    ],
    layanan: [
      { label: 'Pengembangan Web', href: '/services' },
      { label: 'Aplikasi Mobile', href: '/services' },
      { label: 'Konsultasi', href: '/services' },
    ],
    perusahaan: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
      { label: 'Kebijakan Privasi', href: '/privacy' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/mategroup-id', label: 'LinkedIn' },
    { icon: SiInstagram, href: 'https://www.instagram.com/mategroup.id', label: 'Instagram' },
    { icon: SiFacebook, href: 'https://facebook.com/people/MateGroupid/61587349823694', label: 'Facebook' },
    { icon: SiThreads, href: 'https://www.threads.com/@mategroup.id', label: 'Threads' },
  ];

  // Detect scroll position to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      // Show button when user scrolls 50% of the page
      setShowScrollButton(scrollPercent > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-black/50 to-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="mb-4 w-fit cursor-pointer"
            >
              <Image
                src="/logo.png"
                alt="MateGroup Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Platform SaaS inovatif dengan teknologi AI untuk transformasi digital bisnis Anda.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500/30 transition-all"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Produk */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-4 text-lg">Produk</h3>
            <ul className="space-y-3">
              {footerLinks.produk.map((link, idx) => (
                <li key={`produk-${idx}`}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm group flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Layanan */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-4 text-lg">Layanan</h3>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link, idx) => (
                <li key={`layanan-${idx}`}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm group flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Perusahaan */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-4 text-lg">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link, idx) => (
                <li key={`perusahaan-${idx}`}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm group flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-4 text-lg">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-orange-400 transition-colors">
                <a href="mailto:support@mategroup.id" target="_blank" rel="noopener noreferrer">support@mategroup.id</a>
              </li>
              <li className="hover:text-orange-400 transition-colors">
                <a href="https://wa.me/6285774932078" target="_blank" rel="noopener noreferrer">+62 857-7493-2078</a>
              </li>
              <li>Banten, Indonesia</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 origin-left"
        />

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {year} MateGroup. All rights reserved.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            {[
              { label: 'Kebijakan Privasi', href: '/privacy' },
              { label: 'Syarat & Ketentuan', href: '/terms' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-gray-500 hover:text-orange-400 transition-colors text-sm">
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={showScrollButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, pointerEvents: 'none' }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition-all z-40 shadow-lg hover:shadow-orange-600/50"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-5 h-5 -rotate-90" />
      </motion.button>
    </footer>
  );
}
