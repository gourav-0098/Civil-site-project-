'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * FadeIn Component
 * Smooth entrance animation when entering viewport
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  className = '',
  viewportOnce = true
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 24, opacity: 0 };
      case 'down':
        return { y: -24, opacity: 0 };
      case 'left':
        return { x: 24, opacity: 0 };
      case 'right':
        return { x: -24, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: viewportOnce, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container & Items
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  className = ''
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated Number Counter
 * Animates from 0 to value when scrolled into view
 */
export function CounterTicker({ value, duration = 2, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract numeric part from string if needed
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = numericValue;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const current = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      setDisplayValue(current);

      if (frame >= totalFrames) {
        setDisplayValue(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isInView ? displayValue : 0}
      {suffix}
    </span>
  );
}

/**
 * Text Reveal Animation
 * Splices text into words and animates each sequentially
 */
export function TextReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.05,
            ease: 'easeOut'
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
