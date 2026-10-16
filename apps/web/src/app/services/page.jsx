import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Compass, HardHat } from 'lucide-react';

export const metadata = {
  title: 'Engineering & Construction Services | Nivara Infrastructure',
  description: 'Specialized heavy civil construction services including highways, elevated viaducts, transit rail corridors, renewable energy civil works, and water utilities.'
};

export default function ServicesPage() {
  const SERVICES = [
    {
      id: 'highways',
      title: 'Highways, Expressways & Interchanges',
      category: 'Highways & Bridges',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
      description: 'End-to-end turnkey construction of access-controlled multilane expressways, grade-separated trumpet interchanges, and bypass routes built for high freight axle loadings.',
      capabilities: [
        'Flexible and rigid pavement laying with high-compaction paver trains',
        'Deep subgrade stabilization using lime, cement, and geotextile membranes',
        'Reinforced earth (RE) wall embankments and bridge approach ramps',
        'High-velocity stormwater drainage gutters and automated toll plazas'
      ]
    },
    {
      id: 'bridges',
      title: 'Bridges, Viaducts & Marine Crossings',
      category: 'Highways & Bridges',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      description: 'Design-build execution of signature cable-stayed river crossings, deep-water well caissons, and elevated marine segmental box girder viaducts.',
      capabilities: [
        'Twin self-launching girder gantry systems for long-span marine erection',
        'Deep marine rotary drilling and large-diameter bored pile installation',
        'High-tensile parallel strand stay-cable tensioning and vibration dampers',
        'Continuous seismic isolation bearings and automated structural health sensors'
      ]
    },
    {
      id: 'transit',
      title: 'Urban Mass Transit & Elevated Rail',
      category: 'Urban & Transit',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80',
      description: 'Specialized elevated mass rapid transit (MRTS) civil structures constructed within dense urban corridors with minimal surface traffic disruption.',
      capabilities: [
        'Erection of precast monolithic U-girders and I-beam spans during night shifts',
        'Turnkey civil construction of elevated multi-modal station concourses and platforms',
        'Continuous ballastless plinth concrete pouring and laser track alignment',
        'Heavy maintenance rolling stock depots, stabling lines, and workshops'
      ]
    },
    {
      id: 'energy',
      title: 'Industrial & Clean Energy Civil Infrastructure',
      category: 'Industrial & Energy',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
      description: 'Comprehensive civil foundations and earthworks for utility-scale solar parks, onshore wind turbine arrays, and extra-high-voltage transmission switchyards.',
      capabilities: [
        'Heavy gravity foundation casting for high-capacity multi-megawatt wind turbines',
        'Geotechnical ground remediation across saline mudflats and desert sands',
        'Extra-high-voltage (765kV/400kV) GIS substation concrete plinths and blast walls',
        'Compacted heavy-haul access roads designed for specialized crawler transport'
      ]
    },
    {
      id: 'logistics',
      title: 'Commercial & Intermodal Freight Hubs',
      category: 'Commercial Infrastructure',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      description: 'Large-scale commercial logistics facilities, post-tensioned superflat industrial floors, and rail-linked multimodal container yards.',
      capabilities: [
        'Jointless post-tensioned floor slabs engineered to FM2 superflat standards',
        'Heavy container yard roller-compacted concrete (RCC) pavements',
        'Structural steel clear-span logistics warehouse erection up to 15m clear height',
        'Dedicated rail siding freight loading loops and gantry crane runways'
      ]
    },
    {
      id: 'water',
      title: 'Water Supply, Treatment & Transmission',
      category: 'Water & Utilities',
      image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
      description: 'Potable water intake civil structures, large-capacity clarification basins, rapid sand gravity filtration plants, and regional bulk pipelines.',
      capabilities: [
        'Reinforced concrete river intake wells and heavy submersible pump houses',
        'Water treatment plant civil works (clariflocculators, filter beds, chemical bays)',
        'Trenching, jointing, and cathodic protection of large-diameter MS/DI mains',
        'Underground clear water storage reservoirs and elevated balancing reservoirs'
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
            <HardHat className="w-4 h-4" />
            <span>Heavy Civil Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display max-w-3xl leading-tight">
            Specialized Civil Infrastructure Delivery
          </h1>
          <p className="text-steel-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            From high-load marine crossings to deep utility networks, Nivara Infrastructure provides multidisciplinary engineering and heavy equipment execution capabilities.
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
                  Civil Engineering Sector
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
                  Key Technical Capabilities
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
                  href={`/projects?category=${encodeURIComponent(srv.category)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-industrial-orange uppercase tracking-wider transition-colors"
                >
                  <span>Review {srv.category} Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Inquiry regarding ${srv.title}`)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-steel-500 hover:text-navy-900 transition-colors"
                >
                  <span>Request Scope Review</span>
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
            Require Specialized Civil Contracting For Your Sector?
          </h2>
          <p className="text-steel-400 text-sm max-w-xl mx-auto">
            Our estimating team responds directly to formal RFPs, Expression of Interest (EOI) calls, and direct commercial contracts.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Transmit Project Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
