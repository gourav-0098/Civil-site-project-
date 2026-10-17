import Link from 'next/link';
import { ArrowUpRight, Building2, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 inline-block">
              <div className="w-9 h-9 bg-industrial-orange flex items-center justify-center font-bold text-lg text-white">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-widest text-white uppercase font-display">
                  Nivara
                </span>
                <span className="text-[10px] tracking-[0.25em] text-steel-400 font-medium uppercase">
                  Infrastructure
                </span>
              </div>
            </Link>
            <p className="text-steel-400 text-sm leading-relaxed max-w-sm pt-2">
              Nivara Infrastructure is a real estate marketing and property sales consultancy. We connect homebuyers and investors with residential apartments, gated societies, luxury residences, and commercial spaces developed by independent builders.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-steel-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Independent Developers • Site Visit Coordination • Transparent Information</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-400 mb-4 font-mono">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-steel-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-steel-300 hover:text-white transition-colors">
                  Explore Properties
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-steel-300 hover:text-white transition-colors">
                  Marketing Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-steel-300 hover:text-white transition-colors">
                  About Nivara
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-steel-300 hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-400 mb-4 font-mono">
              Property Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projects?category=Residential+Flats+%26+Apartments" className="text-steel-300 hover:text-white transition-colors">
                  Flats & Apartments
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Residential+Societies+%26+Gated+Communities" className="text-steel-300 hover:text-white transition-colors">
                  Gated Societies & Villas
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Luxury+Residences" className="text-steel-300 hover:text-white transition-colors">
                  Luxury Residences
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Commercial+Properties" className="text-steel-300 hover:text-white transition-colors">
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Residential+Plots" className="text-steel-300 hover:text-white transition-colors">
                  Residential Plots
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-400 mb-4 font-mono">
              Property Sales & Inquiries Desk
            </h3>
            <div className="space-y-3 text-sm text-steel-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-industrial-orange mt-0.5 shrink-0" />
                <span className="text-xs text-steel-400">
                  Nivara Infrastructure Property Inquiries, Bandra Kurla Complex (BKC), Mumbai, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-industrial-orange shrink-0" />
                <span className="text-xs text-steel-300 font-mono">inquiries@nivarainfra.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-industrial-orange shrink-0" />
                <span className="text-xs text-steel-300 font-mono">+91 (0) 22 5092 4000</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1 text-xs text-steel-400 hover:text-white transition-colors font-mono"
                >
                  <span>Admin CMS Access</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Regulatory Disclaimer */}
        <div className="pt-8 border-t border-navy-800 space-y-4 text-xs text-steel-500">
          <div className="p-4 bg-navy-900/60 border border-navy-800/80 rounded-none text-[11px] leading-relaxed text-steel-400 space-y-1.5">
            <p className="font-semibold text-steel-300 uppercase tracking-wider font-mono text-[10px]">
              Legal Notice & Real Estate Disclaimer
            </p>
            <p>
              Nivara Infrastructure is a real estate marketing and property sales consultancy. Nivara Infrastructure markets properties developed and constructed by other builders and developers, and assists interested buyers in purchasing those properties. Nivara Infrastructure is not the builder, contractor, civil engineer, or developer of properties displayed on this website unless explicitly stated in writing for a specific asset.
            </p>
            <p>
              All property information, visual representations, floor plans, pricing estimates, amenities, and possession timelines are provided for general informational purposes and are based on data supplied by respective builders/developers. Buyers are advised to independently verify all project details, including statutory approvals and applicable RERA registrations, prior to entering into any transaction.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-steel-400">
            <p>© {new Date().getFullYear()} Nivara Infrastructure. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
