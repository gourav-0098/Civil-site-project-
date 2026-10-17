'use client';
import React from 'react';

/**
 * Architectural Engineering Grid Pattern (Aceternity-style)
 * Gives deep, technical civil engineering aesthetic with subtle coordinate grid
 */
export function BackgroundGrid({
  children,
  className = '',
  pattern = 'grid', // 'grid' | 'dots'
  mask = true
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          pattern === 'dots'
            ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25'
            : 'bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20'
        }`}
      />
      {/* Radial Gradient Mask for smooth blending */}
      {mask && (
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-navy-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-80" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
