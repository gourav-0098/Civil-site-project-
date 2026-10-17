'use client';
import React from 'react';
import { motion } from 'framer-motion';

/**
 * BentoGrid & BentoCard (Aceternity / modern Apple style)
 * Clean modular architecture showcase
 */
export function BentoGrid({ children, className = '' }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  header,
  icon,
  className = '',
  href,
  badge = null
}) {
  const content = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between overflow-hidden border border-steel-200 bg-white p-6 md:p-8 hover:border-steel-400 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-steel-100 to-transparent pointer-events-none opacity-60" />

      {/* Optional Top Media/Header */}
      {header && <div className="mb-6 overflow-hidden">{header}</div>}

      <div>
        <div className="flex items-center justify-between mb-4">
          {icon && (
            <div className="p-3 bg-steel-100 text-navy-900 group-hover:bg-industrial-orange group-hover:text-white transition-colors duration-300 w-fit">
              {icon}
            </div>
          )}
          {badge && (
            <span className="text-xs font-mono font-semibold uppercase px-2.5 py-0.5 bg-steel-100 text-steel-700 tracking-wider">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-display font-bold text-navy-900 group-hover:text-industrial-orange transition-colors duration-200 mb-2">
          {title}
        </h3>
        <p className="text-sm text-steel-600 leading-relaxed font-sans">{description}</p>
      </div>

      {href && (
        <div className="mt-6 flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-navy-900 group-hover:text-industrial-orange group-hover:translate-x-1 transition-all">
          <span>Explore Capability</span>
          <span>→</span>
        </div>
      )}
    </motion.div>
  );

  return href ? (
    <a href={href} className="block h-full">
      {content}
    </a>
  ) : (
    content
  );
}
