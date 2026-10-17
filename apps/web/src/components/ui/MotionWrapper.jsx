'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * FadeIn Component
 * Smooth entrance animation when entering viewport, with automatic reduced-motion fallback
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.45,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  className = '',
  viewportOnce = true
}) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) {
      return { opacity: 0 };
    }
    switch (direction) {
      case 'up':
        return { y: 20, opacity: 0 };
      case 'down':
        return { y: -20, opacity: 0 };
      case 'left':
        return { x: 20, opacity: 0 };
      case 'right':
        return { x: -20, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { y: 0, x: 0, opacity: 1 }}
      viewport={{ once: viewportOnce, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
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
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className = ''
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: shouldReduceMotion ? 0 : delayChildren
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0.2 : 0.4,
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
 * Animates cleanly into view, or shows immediate final value if reduced-motion is requested
 */
export function CounterTicker({ value, duration = 1.8, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? numericValue : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(numericValue);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const end = numericValue;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Smooth cubic deceleration
      const current = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      setDisplayValue(current);

      if (frame >= totalFrames) {
        setDisplayValue(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

/**
 * Text Reveal Animation
 * Splices text into words with graceful reduced-motion handling
 */
export function TextReveal({ text, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            delay: delay + i * 0.04,
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
