'use client';
import React from 'react';

/**
 * shadcn-inspired Badge with construction status variants
 */
export function Badge({
  children,
  variant = 'default', // 'default' | 'ongoing' | 'completed' | 'planned' | 'onhold' | 'orange' | 'outline'
  className = ''
}) {
  const variantStyles = {
    default: 'bg-navy-900 text-white',
    orange: 'bg-industrial-orange text-white',
    ongoing: 'bg-amber-500/10 text-amber-600 border border-amber-500/30',
    completed: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30',
    planned: 'bg-blue-500/10 text-blue-600 border border-blue-500/30',
    onhold: 'bg-rose-500/10 text-rose-600 border border-rose-500/30',
    outline: 'border border-steel-300 text-steel-700 bg-transparent'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
