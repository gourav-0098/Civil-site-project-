import { Suspense } from 'react';
import { MapPin, Mail, Phone, Clock, ShieldCheck, Home } from 'lucide-react';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact Property Advisory & Sales Desk | Nivara Infrastructure',
  description: 'Connect with Nivara Infrastructure to schedule property site visits, request project brochures, or discuss developer marketing partnerships.'
};

export default function ContactPage() {
  return (
    <div className="bg-steel-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-navy-950 text-white relative py-16 sm:py-20 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
            <Home className="w-4 h-4" />
            <span>Property Inquiries & Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Contact Property Sales Desk
          </h1>
          <p className="text-steel-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have questions about a property listing, or wish to schedule a private site visit? Our real estate advisors are here to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information & Operational Details (1 col) */}
          <div className="space-y-8">
            <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-navy-900 font-display border-b border-steel-200 pb-3">
                Advisory Desk Contacts
              </h2>

              <div className="space-y-4 text-sm text-steel-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Corporate Office
                    </span>
                    <p className="text-xs text-steel-600 leading-relaxed">
                      Nivara Infrastructure, Commercial District, Bandra Kurla Complex (BKC), Mumbai 400051, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Mail className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Direct Email
                    </span>
                    <p className="text-xs font-mono text-steel-800">
                      Inquiries: <a href="mailto:inquiries@nivarainfra.com" className="text-industrial-orange hover:underline">inquiries@nivarainfra.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Phone className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Telephone
                    </span>
                    <p className="text-xs font-mono text-steel-800">+91 (0) 22 5092 4000 (Property Advisory)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Operating Hours
                    </span>
                    <p className="text-xs text-steel-600">
                      Monday to Saturday: 09:30 – 18:30 IST
                    </p>
                    <p className="text-[11px] text-steel-500">
                      Site visits can be scheduled for weekends with prior appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Protocol Assurance */}
            <div className="bg-navy-950 text-white p-6 space-y-3 border border-navy-800">
              <div className="flex items-center gap-2 text-xs font-mono text-industrial-orange uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Buyer Confidentiality</span>
              </div>
              <h3 className="text-sm font-bold font-display">
                Dedicated Buyer Advisory
              </h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                All property inquiries are reviewed directly by our advisory team. Your personal information is protected and never distributed to third-party telemarketers.
              </p>
            </div>
          </div>

          {/* Interactive Form (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2 mb-4">
              <h2 className="text-2xl font-bold text-navy-900 font-display">
                Property Inquiry & Visit Scheduling
              </h2>
              <p className="text-steel-600 text-xs sm:text-sm">
                Complete the details below to request a site walkthrough, receive project brochures, or discuss your property requirements.
              </p>
            </div>
            <Suspense fallback={<div className="bg-white border border-steel-200 p-8 text-center text-steel-500 font-mono text-xs">Loading inquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
