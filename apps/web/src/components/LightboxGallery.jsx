'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function LightboxGallery({ items = [], title = 'Project Gallery' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isOpen = selectedIndex !== null;

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  }, [selectedIndex, items.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  }, [selectedIndex, items.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handleNext, handlePrev]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <motion.div
            key={item._id || idx}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] bg-steel-100 overflow-hidden border border-steel-200 cursor-pointer hover:border-industrial-orange transition-all duration-200 shadow-sm"
          >
            <Image
              src={item.url}
              alt={item.alt || `${title} image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-navy-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 bg-navy-900/90 text-white rounded-none shadow-md">
                <Maximize2 className="w-5 h-5 text-white" />
              </span>
            </div>
            {item.caption && (
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-navy-950/85 backdrop-blur-sm text-[11px] text-steel-200 truncate font-sans">
                {item.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
            className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white z-20 pb-4 border-b border-navy-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest text-steel-400 uppercase">
                  {title} • {selectedIndex + 1} / {items.length}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-navy-900 text-steel-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-industrial-orange"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-w-5xl max-h-[75vh]"
                >
                  <Image
                    src={items[selectedIndex].url}
                    alt={items[selectedIndex].alt || title}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Navigation Controls */}
              {items.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-navy-900/80 hover:bg-navy-800 text-white border border-steel-700 transition-colors focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 bg-navy-900/80 hover:bg-navy-800 text-white border border-steel-700 transition-colors focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div className="text-center text-steel-300 text-sm py-2 border-t border-navy-800/80 font-sans">
              <p>{items[selectedIndex].caption || items[selectedIndex].alt || title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
