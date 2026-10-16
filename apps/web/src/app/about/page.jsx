import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, HardHat, Award, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Nivara Infrastructure | Engineering & Construction Philosophy',
  description: 'Learn about Nivara Infrastructure: our mission, values, disciplined engineering approach, and commitment to structural durability.'
};

export default function AboutPage() {
  const VALUES = [
    {
      title: 'Engineering Rigor',
      desc: 'Zero tolerance for structural shortcuts. Every concrete pour, foundation pile, and structural weld undergoes uncompromising verification.'
    },
    {
      title: 'Zero-Harm Safety',
      desc: 'Human life and occupational wellbeing precede all operational targets. Daily safety briefings and proactive hazard mitigation are mandatory.'
    },
    {
      title: 'Operational Precision',
      desc: 'Disciplined supply chain control, calibrated equipment deployment, and adherence to tight contractual project milestones.'
    },
    {
      title: 'Long-Term Durability',
      desc: 'Designing and building assets for a century of operational service under severe environmental, seismic, and tidal challenges.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-navy-950 text-white relative py-20 lg:py-28 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
            alt="Civil engineers inspecting infrastructure works"
            fill
            priority
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
            Corporate Profile
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display max-w-3xl leading-tight">
            Built On Discipline. Engineered For Decades.
          </h1>
          <p className="text-steel-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Nivara Infrastructure delivers considered engineering and heavy civil construction solutions for the vital infrastructure that sustains commerce, transit, and public welfare.
          </p>
        </div>
      </div>

      {/* Overview & Purpose */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Our Purpose & Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                Delivering High-Load Infrastructure With Uncompromising Quality
              </h2>
              <p className="text-steel-600 text-sm leading-relaxed">
                Modern economies depend on reliable highways, safe river crossings, resilient energy grids, and clean water transmission. Nivara Infrastructure was organized to bridge the gap between architectural ambition and ground-truth heavy civil execution.
              </p>
              <p className="text-steel-600 text-sm leading-relaxed">
                By maintaining specialized heavy equipment fleets, cultivating skilled engineering cadres, and employing advanced prefabrication techniques, we minimize on-site disruptions and deliver structures built to endure extreme climatic, seismic, and corrosive environments.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-steel-200">
                <div className="space-y-1">
                  <span className="text-2xl font-bold text-navy-900 font-mono">100+ Yrs</span>
                  <p className="text-xs text-steel-500">Structural Design Life Standard</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold text-navy-900 font-mono">Zero Harm</span>
                  <p className="text-xs text-steel-500">Target Occupational Benchmark</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] bg-steel-100 border border-steel-200 overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Engineers reviewing structural drawings on construction site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-steel-100 border-y border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Foundational Principles
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 font-display">
              Core Engineering Values
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

      {/* Technical Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Operational Standards
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 font-display">
              Quality Assurance & Verification Culture
            </h2>
            <p className="text-steel-600 text-sm leading-relaxed">
              We deploy systematic quality verification checkpoints across all construction activities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-steel-50 border border-steel-200 space-y-3">
              <ShieldCheck className="w-6 h-6 text-industrial-orange" />
              <h3 className="text-base font-bold text-navy-900 font-display">
                Concrete Mix Verification
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Batch-by-batch digital slump and temperature tracking, 7-day and 28-day core compression crushing, and micro-crack ultrasonic velocity checks.
              </p>
            </div>

            <div className="p-6 bg-steel-50 border border-steel-200 space-y-3">
              <Award className="w-6 h-6 text-industrial-orange" />
              <h3 className="text-base font-bold text-navy-900 font-display">
                Geotechnical & Foundation Integrity
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Cross-hole sonic logging (CSL) across every large-diameter bored pile, hydraulic Osterberg-cell load testing, and groundwater salinity monitoring.
              </p>
            </div>

            <div className="p-6 bg-steel-50 border border-steel-200 space-y-3">
              <Target className="w-6 h-6 text-industrial-orange" />
              <h3 className="text-base font-bold text-navy-900 font-display">
                Safety Protocol & PPE Compliance
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Zero tolerance for non-compliance with fall arrest systems, heavy crane exclusion zones, gas detection in deep excavations, and certified rigger supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold font-display">
            Explore Collaboration Opportunities
          </h2>
          <p className="text-steel-400 text-sm max-w-xl mx-auto">
            Discuss joint ventures, EPC packages, or commercial construction tenders with Nivara Infrastructure engineering leadership.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Contact Engineering Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
