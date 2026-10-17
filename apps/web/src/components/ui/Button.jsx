'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * shadcn-inspired Button with framer-motion micro-interactions
 */
export function Button({
  children,
  variant = 'orange', // 'orange' | 'navy' | 'outline' | 'ghost' | 'white'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  href = null,
  onClick,
  disabled = false,
  type = 'button',
  icon = null
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-mono font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-xs md:text-sm px-5 py-3 gap-2',
    lg: 'text-sm md:text-base px-7 py-3.5 gap-2.5'
  };

  const variantStyles = {
    orange:
      'bg-industrial-orange text-white hover:bg-industrial-orangeHover focus:ring-industrial-orange shadow-sm',
    navy:
      'bg-navy-900 text-white hover:bg-navy-800 border border-navy-700 focus:ring-navy-900 shadow-sm',
    outline:
      'bg-transparent text-navy-900 border border-steel-300 hover:border-navy-900 hover:bg-steel-50 focus:ring-navy-900',
    white:
      'bg-white text-navy-950 hover:bg-steel-100 shadow-md focus:ring-white',
    ghost:
      'bg-transparent text-navy-900 hover:bg-steel-100 focus:ring-navy-900'
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={classes}
        >
          {children}
          {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  );
}
