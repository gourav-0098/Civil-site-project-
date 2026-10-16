'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
          <div
            key={item._id || idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] bg-steel-100 overflow-hidden border border-steel-200 cursor-pointer hover:border-industrial-orange transition-all duration-200"
          >
            <Image
              src={item.url}
              alt={item.alt || `${title} image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 bg-navy-900/80 text-white rounded-none shadow-md">
                <Maximize2 className="w-5 h-5 text-white" />
              </span>
            </div>
            {item.caption && (
              <div className="absolute bottom-0 inset-x-0 p-2 bg-navy-950/80 backdrop-blur-sm text-[11px] text-steel-200 truncate">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
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

          {/* Main Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 bg-navy-900/80 hover:bg-navy-800 text-white border border-navy-700 transition-colors focus:outline-none focus:ring-2 focus:ring-industrial-orange"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current Image */}
            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={items[selectedIndex].url}
                alt={items[selectedIndex].alt || `${title} photo ${selectedIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 bg-navy-900/80 hover:bg-navy-800 text-white border border-navy-700 transition-colors focus:outline-none focus:ring-2 focus:ring-industrial-orange"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Thumbnails */}
          <div className="text-center z-20 pt-2 border-t border-navy-800">
            <p className="text-sm text-steel-300 font-medium">
              {items[selectedIndex].caption || items[selectedIndex].alt || `${title} engineering view`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
