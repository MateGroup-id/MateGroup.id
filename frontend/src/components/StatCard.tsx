'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
  suffix?: string;
}

export function StatCard({ value, label, delay = 0, suffix = '' }: StatCardProps) {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    // Extract numeric value from string
    const numericValue = parseInt(value.replace(/\D/g, ''));
    
    // If value doesn't contain numbers, just display it as-is
    if (isNaN(numericValue)) {
      element.textContent = value + suffix;
      return;
    }

    const duration = 3000;
    const startTime = Date.now();

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(numericValue * progress);

      if (element) {
        element.textContent = currentValue + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  }, [value, suffix, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
    >
      <div
        ref={counterRef}
        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300 mb-2"
      >
        {value}
      </div>
      <p className="text-gray-400 text-sm md:text-base font-medium">{label}</p>
    </motion.div>
  );
}
