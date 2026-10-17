import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronRight, Home, Building, Compass, Users, MapPin, Tag } from 'lucide-react';

export const metadata = {
  title: 'Real Estate Marketing & Property Sales Services | Nivara Infrastructure',
  description: 'Explore the property marketing and buyer advisory services offered by Nivara Infrastructure, including property discovery, viewing coordination, and developer representation.'
};

export default function ServicesPage() {
  const SERVICES = [
    {
      id: 'residential-discovery',
      title: 'Residential Property Marketing & Discovery',
      category: 'Residential Flats & Apartments',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      description: 'Connecting prospective homebuyers with 2, 3 & 4 BHK apartments, flats, and duplex homes tailored to family preferences, preferred locations, and price expectations.',
      capabilities: [
        'Curated shortlisting of ready-to-move and under-construction residences',
        'Detailed comparison of builder floor plans, unit orientations, and carpet areas',
        'Transparent price breakdown and payment milestone clarification',
        'Objective neighborhood evaluation including transit, schools, and essential amenities'
      ]
    },
    {
      id: 'gated-communities',
      title: 'Gated Societies & Luxury Villa Marketing',
      category: 'Residential Societies & Gated Communities',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      description: 'Specialized representation and promotion of master-planned villa societies, independent townhomes, and private residential communities offering green expanses and clubhouses.',
      capabilities: [
        'Enclave master plan walkthroughs and individual villa plot demarcation',
        'Highlighting community amenities, sports complexes, and eco-initiatives',
        'Coordination with developer architects for layout customization options',
        'Phased handover and construction progress updates'
      ]
    },
    {
      id: 'site-viewing',
      title: 'Property Viewing & Site Tour Coordination',
      category: 'All Properties',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      description: 'Seamless on-ground viewing experiences organized by experienced property coordinators to help you inspect sample flats, construction progress, and community features firsthand.',
      capabilities: [
        'Scheduled private site visits at your preferred day and time',
        'On-site guided walkthroughs of show flats, amenities, and parking structures',
        'Verification of physical views, natural sunlight, and cross-ventilation',
        'Direct developer representative introductions during site visits'
      ]
    },
    {
      id: 'commercial-marketing',
      title: 'Commercial Property & Office Suite Marketing',
      category: 'Commercial Properties',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      description: 'Promoting Grade-A commercial office suites, high-street retail stores, and commercial developments to corporate occupiers, investors, and growing enterprises.',
      capabilities: [
        'Commercial floor plate space mapping from boutique suites to full floors',
        'Analysis of commercial connectivity, parking ratios, and power redundancies',
        'Marketing representation for retail spaces and business centers',
        'Connecting commercial buyers directly with authorized developer sales desks'
      ]
    },
    {
      id: 'developer-representation',
      title: 'Developer Project Marketing & Promotion',
      category: 'Marketing Partnerships',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      description: 'Promotional marketing services for property builders looking to expand their project reach through digital presentation and structured sales facilitation.',
      capabilities: [
        'Omni-channel project digital presentation and high-quality listing exposure',
        'Targeted outreach to pre-qualified homebuyers and active investors',
        'Professional handling of customer inquiries, brochure distribution, and follow-ups',
        'Organized customer feedback loops and conversion reporting'
      ]
    },
    {
      id: 'plot-discovery',
      title: 'Residential Plotted Developments Showcase',
      category: 'Residential Plots',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      description: 'Showcasing plotted layout developments positioned in developing suburban corridors for prospective villa builders and land investors.',
      capabilities: [
        'Presentation of developer layout blueprints and road network specifications',
        'Clarification of internal utility infrastructure provisions',
        'Facilitating site visits to inspect physical plot locations and topography',
        'Connecting buyers with developer documentation and sub-registrar desks'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-navy-950 text-white relative py-20 lg:py-28 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
            <Home className="w-4 h-4" />
            <span>Real Estate Services</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display max-w-3xl leading-tight">
            Property Marketing & Sales Services
          </h1>
          <p className="text-steel-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            From discovering your ideal residential apartment to marketing established developer projects, Nivara Infrastructure provides thoughtful, professional property services.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {SERVICES.map((srv, idx) => (
          <section
            key={srv.id}
            id={srv.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center p-8 sm:p-10 border border-steel-200 bg-steel-50/50 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual */}
            <div className={`relative aspect-[16/10] bg-steel-200 border border-steel-200 overflow-hidden shadow-md ${
              idx % 2 === 1 ? 'lg:order-2' : ''
            }`}>
              <Image
                src={srv.image}
                alt={srv.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Description & Capabilities */}
            <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
                  Service Area • {srv.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 font-display">
                  {srv.title}
                </h2>
                <p className="text-steel-600 text-sm leading-relaxed pt-1">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-navy-900 uppercase tracking-widest font-mono">
                  What We Provide
                </h3>
                <ul className="space-y-2 text-xs text-steel-700">
                  {srv.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-industrial-orange shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex items-center gap-4 border-t border-steel-200">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-industrial-orange uppercase tracking-wider transition-colors"
                >
                  <span>Browse Relevant Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Inquiry regarding ${srv.title}`)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-steel-500 hover:text-navy-900 transition-colors"
                >
                  <span>Talk to an Advisor</span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-navy-950 text-white p-10 sm:p-14 text-center space-y-6">
          <h2 className="text-3xl font-extrabold font-display">
            Looking to Market Your Property or Find a New Home?
          </h2>
          <p className="text-steel-400 text-sm max-w-xl mx-auto">
            Connect directly with Nivara Infrastructure to discuss property requirements or promotional marketing for real estate developments.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Connect with Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
