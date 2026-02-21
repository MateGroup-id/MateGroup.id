'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Produk', href: '/products' },
    { name: 'Layanan', href: '/services' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="transition-all duration-300 hover:drop-shadow-lg"
                >
                  <Image
                    src="/logo.png"
                    alt="MateGroup Logo"
                    width={162}
                    height={54}
                    className="object-contain"
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                    isActive(item.href) ? 'active' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link href="/auth/login">
                <AnimatedButton variant="primary" size="md">
                  Mulai Sekarang
                </AnimatedButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-500/20 transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="text-orange-500 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2 bg-[rgba(20,20,25,0.85)] backdrop-blur-lg shadow-lg rounded-b-xl z-40">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                    isActive(item.href)
                      ? 'bg-orange-500/25 text-orange-500 font-semibold hover:bg-orange-500/35 hover:shadow-lg hover:shadow-orange-500/30'
                      : 'text-gray-400 hover:text-orange-500 hover:bg-orange-500/15 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/contact" className="block w-full">
                <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold mt-4 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30">
                  Mulai Sekarang
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
