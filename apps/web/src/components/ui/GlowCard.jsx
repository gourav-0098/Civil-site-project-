'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Aceternity & shadcn inspired GlowCard
 * Cursor-tracking dynamic border glow effect for high-end cards
 */
export function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(234, 88, 12, 0.25)', // Industrial orange glow
  onClick
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: -100, y: -100 });
      }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-sm transition-all duration-300 ${className}`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-sm"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 65%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
