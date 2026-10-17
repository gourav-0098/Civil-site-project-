import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Home, Target, ArrowRight, CheckCircle2, Building, Users } from 'lucide-react';

export const metadata = {
  title: 'About Nivara Infrastructure | Real Estate Marketing & Property Sales',
  description: 'Learn about Nivara Infrastructure: our mission, values, transparent property marketing approach, and commitment to assisting property buyers.'
};

export default function AboutPage() {
  const VALUES = [
    {
      title: 'Curated Representation',
      desc: 'We collaborate with established builders and developers to market residential and commercial properties.'
    },
    {
      title: 'Customer-Focused Assistance',
      desc: 'We prioritize the buyer’s practical preferences, budget limits, and lifestyle needs over aggressive sales quotas.'
    },
    {
      title: 'Transparent Information',
      desc: 'We provide clear floor plans, genuine price guidance, statutory details, and realistic possession timelines without misleading promises.'
    },
    {
      title: 'End-to-End Coordination',
      desc: 'From scheduling initial site tours to facilitating documentation and developer coordination, we support you through your journey.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-navy-950 text-white relative py-20 lg:py-28 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Modern residential architecture"
            fill
            priority
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
            Company Profile
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display max-w-3xl leading-tight">
            Guiding You to the Right Property with Clarity & Trust.
          </h1>
          <p className="text-steel-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Nivara Infrastructure is a dedicated real estate marketing and property sales consultancy, helping homebuyers and investors discover quality residential and commercial properties.
          </p>
        </div>
      </div>

      {/* Role & Business Identity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Our Business Identity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                Connecting Prospective Buyers with Quality Properties
              </h2>
              <p className="text-steel-600 text-sm leading-relaxed">
                Navigating today’s property landscape can be complex and overwhelming. Nivara Infrastructure bridges the gap between buyers seeking quality properties and the builders who develop them.
              </p>
              <p className="text-steel-600 text-sm leading-relaxed">
                As a real estate marketing and sales facilitation company, Nivara Infrastructure presents carefully selected residential flats, gated villa societies, luxury residences, commercial office suites, and residential plots constructed by established developers.
              </p>
              <div className="p-4 bg-steel-50 border-l-4 border-industrial-orange space-y-1">
                <p className="text-xs font-bold text-navy-900 uppercase font-mono">
                  Our Clear Business Role
                </p>
                <p className="text-xs text-steel-600">
                  Nivara Infrastructure markets properties and assists customers in purchasing them. Nivara does not claim to have constructed, engineered, or developed the properties displayed on this website unless explicitly stated.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] bg-steel-100 border border-steel-200 overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="Real estate advisors discussing property plans"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-steel-100 border-y border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Our Principles
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 font-display">
              How We Serve Homebuyers & Investors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <div key={idx} className="p-6 bg-white border border-steel-200 space-y-3">
                <span className="text-xs font-mono font-bold text-industrial-orange">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-navy-900 font-display">
                  {val.title}
                </h3>
                <p className="text-xs text-steel-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Commitments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Transparency
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 font-display">
              Our Commitment to Accurate Property Information
            </h2>
            <p className="text-steel-600 text-sm leading-relaxed">
              We hold ourselves to rigorous standards of accuracy in how property information is communicated:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-steel-50 border border-steel-200 space-y-3">
              <ShieldCheck className="w-6 h-6 text-industrial-orange" />
              <h3 className="text-base font-bold text-navy-900 font-display">
                Developer Information
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                We present developer credentials, project brochures, and published statutory registration parameters provided by the builder.
              </p>
            </div>

            <div className="p-6 bg-steel-50 border border-steel-200 space-y-3">
              <Home className="w-6 h-6 text-industrial-orange" />
              <h3 className="text-base font-bold text-navy-900 font-display">
                Guided Site Access
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                We coordinate personalized site inspections, sample flat walkthroughs, and community reviews so you can evaluate properties in person.
              </p>
            </div>

            <div className="p-6 bg-steel-50 border border-steel-200 space-y-3">
              <Building className="w-6 h-6 text-industrial-orange" />
              <h3 className="text-base font-bold text-navy-900 font-display">
                Direct Developer Link
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                We facilitate direct communication between you and the property developer, ensuring smooth documentation, booking, and handover processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold font-display">
            Start Your Property Search Today
          </h2>
          <p className="text-steel-400 text-sm max-w-xl mx-auto">
            Connect with our advisory team to discuss your residential or commercial property requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 border border-steel-700 hover:border-steel-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Contact Our Advisors</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
