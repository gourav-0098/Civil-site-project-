'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * shadcn-inspired Accordion with Framer Motion collapse/expand
 */
export function Accordion({ items, allowMultiple = false, className = '' }) {
  const [openIndices, setOpenIndices] = useState([0]); // First item open by default

  const toggleIndex = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`divide-y divide-steel-200 border-y border-steel-200 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);

        return (
          <div key={index} className="py-4">
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="flex w-full items-center justify-between text-left focus:outline-none group"
            >
              <div className="flex items-center gap-3">
                {item.number && (
                  <span className="font-mono text-xs font-bold text-industrial-orange">
                    {item.number}
                  </span>
                )}
                <span className="font-display font-semibold text-navy-950 group-hover:text-industrial-orange transition-colors text-base md:text-lg">
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-steel-400 group-hover:text-navy-900"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-2 text-sm md:text-base text-steel-600 leading-relaxed font-sans pl-7">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
