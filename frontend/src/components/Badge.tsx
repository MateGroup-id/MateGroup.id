'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon?: LucideIcon;
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  animated?: boolean;
}

export function Badge({ 
  icon: Icon, 
  text, 
  variant = 'default', 
  animated = true 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    danger: 'bg-red-500/10 border-red-500/30 text-red-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${variantClasses[variant]}`}
    >
      {Icon && (
        <motion.div
          animate={animated ? { rotate: 360 } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
      )}
      <span className="text-sm font-semibold">{text}</span>
    </motion.div>
  );
}

export function BadgeGroup({ badges }: { badges: BadgeProps[] }) {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {badges.map((badge, idx) => (
        <Badge key={idx} {...badge} />
      ))}
    </motion.div>
  );
}
