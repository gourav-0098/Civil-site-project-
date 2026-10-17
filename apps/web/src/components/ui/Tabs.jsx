'use client';
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Tabs component with Framer Motion layoutId pill indicator
 */
export function AnimatedTabs({
  tabs,
  activeTab,
  onChange,
  className = '',
  pillColor = 'bg-navy-900',
  activeTextColor = 'text-white',
  inactiveTextColor = 'text-steel-600 hover:text-navy-950'
}) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1.5 bg-steel-100 rounded-sm w-fit ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id || activeTab === tab.label;

        return (
          <button
            key={tab.id || tab.label}
            onClick={() => onChange(tab.id || tab.label)}
            className={`relative px-4 py-2 text-xs md:text-sm font-mono font-medium transition-colors select-none focus:outline-none ${
              isActive ? activeTextColor : inactiveTextColor
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className={`absolute inset-0 rounded-sm shadow-sm ${pillColor}`}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-steel-200 text-steel-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
