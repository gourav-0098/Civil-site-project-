'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // If in admin dashboard routes, render minimal admin topbar or let admin layout handle it
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-navy-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-industrial-orange">
            <div className="w-10 h-10 bg-industrial-orange flex items-center justify-center font-bold text-xl tracking-wider text-white shadow-md shadow-industrial-orange/20">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-white uppercase font-display group-hover:text-industrial-orange transition-colors">
                Nivara
              </span>
              <span className="text-[10px] tracking-[0.25em] text-steel-400 font-medium uppercase">
                Infrastructure
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors py-2 border-b-2 ${
                    isActive
                      ? 'text-white border-industrial-orange font-semibold'
                      : 'text-steel-300 border-transparent hover:text-white hover:border-steel-500'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="text-xs text-steel-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-navy-800 hover:border-steel-700"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-steel-400" />
              <span>Admin Portal</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide transition-all shadow-md shadow-industrial-orange/20"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-navy-800 bg-navy-950 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-base font-medium rounded-none transition-colors ${
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
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide shadow-md"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-steel-400 bg-navy-900 border border-navy-800 hover:text-white"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
