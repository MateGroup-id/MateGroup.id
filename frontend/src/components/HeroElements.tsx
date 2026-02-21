'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroGlowProps {
  children: ReactNode;
  delay?: number;
}

export function HeroGlow({ children, delay = 0 }: HeroGlowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
      className="relative"
    >
      {/* Glow Background */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(245, 130, 32, 0.3)',
            '0 0 40px rgba(245, 130, 32, 0.5)',
            '0 0 20px rgba(245, 130, 32, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl"
      />

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}

export function PulseRing() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-20 h-20 rounded-full bg-orange-500/20 border border-orange-500/50">
        <motion.div
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-orange-500/50"
        />
      </div>
    </motion.div>
  );
}

export function ShimmerButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold group"
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%', opacity: 0.2 }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  );
}
