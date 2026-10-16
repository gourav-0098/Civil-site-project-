import Link from 'next/link';
import { ArrowUpRight, Building2, MapPin, Mail, Phone } from 'lucide-react';

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
              Nivara Infrastructure delivers considered engineering and heavy civil construction solutions for the infrastructure that moves communities, freight, and clean energy forward.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-steel-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Safety First • Quality Engineering • Precision Handover</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-400 mb-4 font-mono">
              Corporate
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-steel-300 hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-steel-300 hover:text-white transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-steel-300 hover:text-white transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-steel-300 hover:text-white transition-colors">
                  About Nivara
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-steel-300 hover:text-white transition-colors">
                  Contact & Tenders
                </Link>
              </li>
            </ul>
          </div>

          {/* Infrastructure Sectors */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-400 mb-4 font-mono">
              Sectors
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projects?category=Highways+%26+Bridges" className="text-steel-300 hover:text-white transition-colors">
                  Highways & Bridges
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Urban+%26+Transit" className="text-steel-300 hover:text-white transition-colors">
                  Urban & Transit
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Industrial+%26+Energy" className="text-steel-300 hover:text-white transition-colors">
                  Industrial & Energy
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Commercial+Infrastructure" className="text-steel-300 hover:text-white transition-colors">
                  Commercial Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Water+%26+Utilities" className="text-steel-300 hover:text-white transition-colors">
                  Water & Utilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-400 mb-4 font-mono">
              Inquiries Desk
            </h3>
            <div className="space-y-3 text-sm text-steel-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-industrial-orange mt-0.5 shrink-0" />
                <span className="text-xs text-steel-400">
                  Engineering Headquarters (Regional Project Offices across Southern & Western Corridors)
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
                  <span>CMS Portal Access</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Notice */}
        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-steel-500">
          <div>
            <p>© {new Date().getFullYear()} Nivara Infrastructure. All rights reserved.</p>
            <p className="text-[11px] text-steel-500 mt-1">
              Demonstration corporate architecture. Case studies and models are fictional demonstration archetypes.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-steel-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
