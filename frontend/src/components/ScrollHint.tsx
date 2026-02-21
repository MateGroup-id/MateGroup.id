'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ScrollHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden lg:block pointer-events-none"
    >
      <div className="flex flex-col items-center gap-2">
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-orange-400 text-sm font-medium"
        >
          Scroll untuk lanjut
        </motion.p>
        <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-1 h-2 bg-orange-500 rounded-full mt-2"
          />
        </div>
      </div>
    </motion.div>
  );
}
