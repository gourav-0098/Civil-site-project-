'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Capabilities' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Inquiries' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-navy-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-industrial-orange"
          >
            <div className="w-10 h-10 bg-industrial-orange flex items-center justify-center font-bold text-xl tracking-wider text-white shadow-md shadow-industrial-orange/30 group-hover:scale-105 transition-transform duration-200">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-white uppercase font-display group-hover:text-industrial-orange transition-colors">
                Nivara
              </span>
              <span className="text-[10px] tracking-[0.25em] text-steel-400 font-medium uppercase font-mono">
                Infrastructure
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-steel-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="headerActiveIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-industrial-orange"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="text-xs text-steel-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-navy-800 hover:border-steel-700 font-mono"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-steel-400" />
              <span>Admin Portal</span>
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold font-mono tracking-wide transition-all shadow-md shadow-industrial-orange/20"
              >
                <span>Initiate Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-steel-300 hover:text-white hover:bg-navy-900 focus:outline-none focus:ring-2 focus:ring-industrial-orange"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-navy-800 bg-navy-950 px-4 pt-4 pb-6 space-y-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-navy-900 text-industrial-orange font-semibold border-l-4 border-industrial-orange'
                        : 'text-steel-200 hover:bg-navy-900 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-navy-800 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide shadow-md font-mono"
              >
                <span>Initiate Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-steel-400 bg-navy-900 border border-navy-800 hover:text-white font-mono"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Portal Login</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
