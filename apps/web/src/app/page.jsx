import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Shield,
  Layers,
  Compass,
  CheckCircle,
  HardHat,
  ChevronRight,
  Activity,
  FileCheck2,
  Workflow
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { getFeaturedProjects } from '../lib/api';

export const revalidate = 60;

export default async function HomePage() {
  let featuredProjects = [];

  try {
    const res = await getFeaturedProjects();
    if (res?.success && Array.isArray(res.data)) {
      featuredProjects = res.data;
    }
  } catch (error) {
    console.warn('Note: Backend API currently starting or unreachable during static build:', error.message);
  }

  const CAPABILITIES = [
    {
      title: 'Highways & Bridges',
      description: 'Long-span cable-stayed river crossings, elevated marine viaducts, and high-capacity expressways.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Highways+%26+Bridges'
    },
    {
      title: 'Urban & Transit',
      description: 'Grade-separated semi-high-speed mass transit corridors, elevated stations, and multi-modal freight interchanges.',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Urban+%26+Transit'
    },
    {
      title: 'Industrial & Energy',
      description: 'Utility-scale renewable power civil foundations, extra-high-voltage substations, and heavy geotechnical works.',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Industrial+%26+Energy'
    },
    {
      title: 'Water & Utilities',
      description: 'Large-scale river intake systems, high-capacity water treatment plants, and regional pipeline networks.',
      image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Water+%26+Utilities'
    }
  ];

  const PROCESS_STEPS = [
    {
      step: '01',
      title: 'Feasibility & Geotechnical',
      desc: 'Deep geological exploration, hydrodynamic scour assessments, and seismic hazard risk quantification.'
    },
    {
      step: '02',
      title: 'Structural Design & Prefabrication',
      desc: 'BIM 5D modeling, high-performance concrete mix optimization, and precision off-site segmental casting.'
    },
    {
      step: '03',
      title: 'Execution & Zero-Harm Protocol',
      desc: 'Self-launching gantry deployment, rigorous site safety controls, and continuous environmental mitigation.'
    },
    {
      step: '04',
      title: 'Telemetry & Structural Handover',
      desc: 'Embedded fiber-optic structural health sensor calibration and lifecycle maintenance documentation.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-navy-950 text-white overflow-hidden">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=85"
            alt="Heavy civil infrastructure engineering and bridge construction"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-navy-900/90 border border-navy-700 text-xs font-mono text-steel-300 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-industrial-orange animate-pulse" />
              <span>Heavy Civil Engineering & Infrastructure Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
              Engineering Infrastructure. <br />
              <span className="text-industrial-orange">Building Tomorrow.</span>
            </h1>

            <p className="text-lg sm:text-xl text-steel-300 leading-relaxed font-light">
              Nivara Infrastructure delivers considered engineering and construction solutions for the infrastructure that moves communities and industries forward.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-industrial-orange/20"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-900/80 hover:bg-navy-800 border border-steel-700 text-white text-sm font-semibold tracking-wide transition-colors"
              >
                <span>Discuss a Project</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Industrial Status Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-navy-900/80 border-t border-navy-800 py-3 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-steel-400">
            <span>SECTOR FOCUS: TRANSPORT • ENERGY • WATER • URBAN TRANSIT</span>
            <span>SPECIFICATION STANDARD: IRC • IS • AASHTO • BS EN</span>
            <span>SYSTEM HEALTH: MONITORED</span>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES & SECTORS */}
      <section className="py-20 lg:py-28 bg-steel-100 border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Core Sectors
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                Engineering Capabilities Across Critical Sectors
              </h2>
              <p className="text-steel-600 text-sm leading-relaxed">
                From high-load marine crossings to deep utility systems, our multidisciplinary teams integrate specialized equipment with geotechnical acumen.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-industrial-orange uppercase tracking-wider transition-colors shrink-0"
            >
              <span>View All Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap, idx) => (
              <Link
                key={idx}
                href={cap.href}
                className="group relative flex flex-col bg-white border border-steel-200 overflow-hidden hover:border-industrial-orange hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel-200">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-950/30 group-hover:bg-navy-950/10 transition-colors" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-industrial-orange transition-colors font-display">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-steel-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs font-bold text-industrial-orange">
                    <span>Explore Sector</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS PORTFOLIO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                Featured Infrastructure Projects
              </h2>
              <p className="text-steel-600 text-sm leading-relaxed">
                Representative civil construction archetypes engineered with rigorous structural tolerances and modern segmental construction techniques.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <ProjectCard key={project._id || project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="p-12 bg-steel-50 border border-steel-200 text-center space-y-4">
              <p className="text-steel-600 text-sm">
                Project portfolio records are currently being indexed. Explore the complete projects directory to review ongoing and completed infrastructure.
              </p>
              <Link
                href="/projects"
                className="inline-block px-6 py-2.5 bg-industrial-orange text-white text-xs font-semibold tracking-wider uppercase"
              >
                Browse Projects
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. PROJECT DELIVERY APPROACH */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Disciplined Engineering & Project Delivery
            </h2>
            <p className="text-steel-400 text-sm leading-relaxed">
              Every infrastructure asset follows an unbroken chain of custody from initial soil borehole validation to final telemetry calibration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, idx) => (
              <div key={idx} className="relative p-6 bg-navy-950 border border-navy-800 space-y-4">
                <span className="text-3xl font-extrabold text-industrial-orange font-mono">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-steel-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUALITY & SAFETY PILLARS */}
      <section className="py-20 bg-steel-50 border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-steel-200 space-y-4">
              <div className="w-12 h-12 bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                Zero-Incident Culture
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Mandatory daily safety toolbox protocols, continuous hazard identification, and automated machinery proximity sensors across all active work sites.
              </p>
            </div>

            <div className="p-8 bg-white border border-steel-200 space-y-4">
              <div className="w-12 h-12 bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                Material Integrity Testing
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                On-site NABL-calibrated batching plant laboratories verifying 28-day concrete compressive strengths, ultrasonic steel weld flaw tests, and rebar elasticity.
              </p>
            </div>

            <div className="p-8 bg-white border border-steel-200 space-y-4">
              <div className="w-12 h-12 bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                Structural Telemetry
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Integration of fiber-optic Bragg grating sensors within critical deck spans to monitor real-time thermal expansion, vibration frequencies, and scour depth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA BANNER */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
            Partner With Nivara Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
            Ready to Build Durable Infrastructure for the Next Generation?
          </h2>
          <p className="text-steel-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Submit your project brief, RFP, or tender inquiries to our engineering estimation desk. We review specifications and provide rigorous pre-qualification evaluations.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide transition-all shadow-lg"
            >
              <span>Transmit Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-navy-900 border border-steel-700 hover:border-steel-500 text-white text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Review Portfolio Case Studies</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
