'use client';

import { motion } from 'framer-motion';

export function FloatingOrbs() {
  const orbs = [
    { delay: 0, size: 'w-96 h-96', top: 'top-20', left: 'left-10', gradient: 'from-orange-500/20 to-orange-600/10' },
    { delay: 0.2, size: 'w-80 h-80', bottom: 'bottom-40', right: 'right-20', gradient: 'from-blue-500/10 to-cyan-500/5' },
    { delay: 0.4, size: 'w-72 h-72', top: 'top-1/2', right: 'right-10', gradient: 'from-purple-500/10 to-pink-500/5' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
          className={`absolute ${orb.size} bg-gradient-to-br ${orb.gradient} rounded-full blur-3xl ${orb.top || ''} ${orb.left || ''} ${orb.bottom || ''} ${orb.right || ''}`}
        />
      ))}
    </div>
  );
}
