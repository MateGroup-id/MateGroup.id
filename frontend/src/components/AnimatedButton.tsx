'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
    outline: 'border border-orange-500 text-orange-500 hover:bg-orange-500/10',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[44px] min-w-[44px]',
    md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[44px] min-w-[44px]',
  };

  const baseClass = `relative font-semibold rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.95 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={baseClass}>
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      className={baseClass}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
