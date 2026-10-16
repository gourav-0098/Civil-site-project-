import { MapPin, Mail, Phone, Clock, ShieldCheck, HardHat } from 'lucide-react';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact Engineering Desk & Tenders',
  description: 'Transmit project briefs, tender requests, or commercial inquiries directly to the Nivara Infrastructure estimating team.'
};

export default function ContactPage() {
  return (
    <div className="bg-steel-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-navy-950 text-white relative py-16 sm:py-20 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
            <HardHat className="w-4 h-4" />
            <span>Commercial & Tender Correspondence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Contact Engineering & Projects Desk
          </h1>
          <p className="text-steel-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Submit tender document packages, expressions of interest, or general construction inquiries directly to our project development group.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information & Operational Details (1 col) */}
          <div className="space-y-8">
            <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-navy-900 font-display border-b border-steel-200 pb-3">
                Corporate Contacts
              </h2>

              <div className="space-y-4 text-sm text-steel-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Engineering Headquarters
                    </span>
                    <p className="text-xs text-steel-600 leading-relaxed">
                      Nivara Infrastructure Corporate Towers, Commercial District, Bandra Kurla Complex (BKC), Mumbai 400051, Maharashtra, India.
                    </p>
                    <p className="text-[11px] text-steel-400 italic">
                      (Regional project execution yards active in Gujarat, Karnataka, Andhra Pradesh & Odisha)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Mail className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Direct Email Correspondence
                    </span>
                    <p className="text-xs font-mono text-steel-800">
                      Tenders: <a href="mailto:tenders@nivarainfra.com" className="text-industrial-orange hover:underline">tenders@nivarainfra.com</a>
                    </p>
                    <p className="text-xs font-mono text-steel-800">
                      General: <a href="mailto:inquiries@nivarainfra.com" className="text-industrial-orange hover:underline">inquiries@nivarainfra.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Phone className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Telephone
                    </span>
                    <p className="text-xs font-mono text-steel-800">+91 (0) 22 5092 4000 (Central Desk)</p>
                    <p className="text-xs font-mono text-steel-800">+91 (0) 22 5092 4001 (Tenders)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-xs uppercase tracking-wider text-navy-900 font-mono block">
                      Operational Hours
                    </span>
                    <p className="text-xs text-steel-600">
                      Monday to Saturday: 08:30 – 18:30 IST
                    </p>
                    <p className="text-[11px] text-steel-500">
                      Site project offices maintain 24/7 continuous operational shifts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Protocol Assurance */}
            <div className="bg-navy-950 text-white p-6 space-y-3 border border-navy-800">
              <div className="flex items-center gap-2 text-xs font-mono text-industrial-orange uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Response Protocol</span>
              </div>
              <h3 className="text-sm font-bold font-display">
                Commercial Prequalification Turnaround
              </h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                All submitted tenders and technical inquiries receive a formal electronic filing acknowledgment within 24 hours. Formal estimation evaluations are processed within 3 business days.
              </p>
            </div>
          </div>

          {/* Interactive Form (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2 mb-4">
              <h2 className="text-2xl font-bold text-navy-900 font-display">
                Electronic Inquiry Transmission
              </h2>
              <p className="text-steel-600 text-xs sm:text-sm">
                Complete the parameters below. Fields marked with an asterisk (<span className="text-rose-500">*</span>) are required to initiate tender logging.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
