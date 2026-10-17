import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Search,
  Building,
  Home,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Compass,
  MapPin,
  Tag,
  KeyRound,
  FileCheck2,
  Users
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
    console.warn('Note: Backend API query during page render:', error.message);
  }

  const PROPERTY_CATEGORIES = [
    {
      title: 'Residential Flats & Apartments',
      description: 'Thoughtfully planned 2, 3 & 4 BHK apartments in prime connected urban locations.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Residential+Flats+%26+Apartments',
      countLabel: 'High-Demand City Units'
    },
    {
      title: 'Gated Societies & Villas',
      description: 'Expansive private villas and townhomes surrounded by green parks and community amenities.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Residential+Societies+%26+Gated+Communities',
      countLabel: 'Serene Master Enclaves'
    },
    {
      title: 'Luxury Residences & Penthouses',
      description: 'Bespoke sea-facing penthouses and premium residences with private concierge services.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Luxury+Residences',
      countLabel: 'Exclusive Signature Homes'
    },
    {
      title: 'Commercial Spaces & Suites',
      description: 'Grade-A corporate office suites, retail showrooms, and modern business hubs.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      href: '/projects?category=Commercial+Properties',
      countLabel: 'Prime Business Addresses'
    }
  ];

  const BUYING_STEPS = [
    {
      step: '01',
      title: 'Discover & Shortlist',
      desc: 'Browse residential and commercial properties matching your preferred location, configuration, and budget.'
    },
    {
      step: '02',
      title: 'Guided Site Tours',
      desc: 'Experience properties firsthand with scheduled walkthroughs, sample flat visits, and neighborhood inspections.'
    },
    {
      step: '03',
      title: 'Developer Coordination',
      desc: 'Benefit from transparent information exchange, developer-provided layout plans, pricing clarity, and documentation support.'
    },
    {
      step: '04',
      title: 'Property Acquisition',
      desc: 'Receive helpful coordination from initial visit request through developer booking and registration milestones.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-navy-950 text-white overflow-hidden">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Modern luxury real estate residence interior and architecture"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-navy-900/90 border border-navy-700 text-xs font-mono text-steel-300 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-industrial-orange animate-pulse" />
              <span>Real Estate Marketing & Property Sales</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15]">
              Find a Place <br />
              <span className="text-industrial-orange">You’ll Love to Call Home.</span>
            </h1>

            <p className="text-lg sm:text-xl text-steel-300 leading-relaxed font-light">
              Explore thoughtfully selected residential and commercial properties, discover the right community, and connect with us to take your next step.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-industrial-orange/20"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-900/80 hover:bg-navy-800 border border-steel-700 text-white text-sm font-semibold tracking-wide transition-colors"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>

            {/* Quick Property Search Bar */}
            <form
              action="/projects"
              method="GET"
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-none flex flex-col sm:flex-row gap-2 max-w-2xl shadow-2xl"
            >
              <div className="flex-1 flex items-center px-3 py-2 bg-white text-navy-900">
                <Search className="w-4 h-4 text-steel-400 shrink-0 mr-2" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by city, property name, or builder..."
                  className="w-full text-xs sm:text-sm placeholder-steel-400 focus:outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Search Listings
              </button>
            </form>
          </div>
        </div>

        {/* Identity & Compliance Note Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-navy-900/90 border-t border-navy-800 py-3 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-steel-400">
            <span>PORTFOLIO: FLATS • VILLAS • PENTHOUSES • COMMERCIAL • PLOTS</span>
            <span>ROLE: REAL ESTATE MARKETING & SALES FACILITATION</span>
            <span>MARKETED BY: NIVARA INFRASTRUCTURE</span>
          </div>
        </div>
      </section>

      {/* 2. PROPERTY CATEGORIES GRID */}
      <section className="py-20 lg:py-28 bg-steel-100 border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Property Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                Explore Diverse Real Estate Categories
              </h2>
              <p className="text-steel-600 text-sm leading-relaxed">
                Whether you seek a modern high-rise flat, an independent gated villa, or high-yield commercial property, our team helps connect you with vetted opportunities.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-industrial-orange uppercase tracking-wider transition-colors shrink-0"
            >
              <span>View All Properties</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_CATEGORIES.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex flex-col bg-white border border-steel-200 overflow-hidden hover:border-industrial-orange hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel-200">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/10 transition-colors" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-steel-400">
                      {cat.countLabel}
                    </span>
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-industrial-orange transition-colors font-display">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-steel-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs font-bold text-industrial-orange">
                    <span>Explore Listings</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES PORTFOLIO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Curated Inventory
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                Featured Properties For Sale
              </h2>
              <p className="text-steel-600 text-sm leading-relaxed">
                Handpicked residential and commercial projects marketed by Nivara Infrastructure in partnership with reputable builders and developers.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
            >
              <span>Explore All Listings</span>
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
                Property listings are currently loading. Browse the complete properties directory to explore available homes and commercial suites.
              </p>
              <Link
                href="/projects"
                className="inline-block px-6 py-2.5 bg-industrial-orange text-white text-xs font-semibold tracking-wider uppercase"
              >
                Browse Properties
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY BUYERS CONTACT NIVARA */}
      <section className="py-20 bg-steel-50 border-y border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Property Marketing
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 font-display">
              Why Buyers & Investors Choose Nivara
            </h2>
            <p className="text-steel-600 text-sm leading-relaxed">
              We assist property buyers with clear property information and structured site visit coordination with developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-steel-200 space-y-4">
              <div className="w-12 h-12 bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                Carefully Curated Projects
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                We market projects developed by established builders with documented track records, clear statutory approvals, and transparent construction timelines.
              </p>
            </div>

            <div className="p-8 bg-white border border-steel-200 space-y-4">
              <div className="w-12 h-12 bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                Personalized Site Walkthroughs
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Enjoy hassle-free property viewing coordination. Our advisors arrange on-ground visits, review layout orientations, and answer your practical queries.
              </p>
            </div>

            <div className="p-8 bg-white border border-steel-200 space-y-4">
              <div className="w-12 h-12 bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                Transparent Information
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Clear information without fabricated claims. We provide builder specifications, floor plans, and pricing guidance to facilitate informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP BUYING ASSISTANCE PROCESS */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Seamless Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              A Simple, Guided Property Buying Process
            </h2>
            <p className="text-steel-400 text-sm leading-relaxed">
              From your initial property search to getting keys in hand, Nivara Infrastructure assists you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BUYING_STEPS.map((item, idx) => (
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

      {/* 6. CLOSING CTA BANNER */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
            Connect With Our Property Advisors
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
            Ready to Discover Your Next Home or Commercial Investment?
          </h2>
          <p className="text-steel-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out to our property marketing desk to schedule personalized site visits, review detailed brochures, and discuss your preferred locations.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide transition-all shadow-lg"
            >
              <span>Schedule a Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-navy-900 border border-steel-700 hover:border-steel-500 text-white text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Browse All Properties</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
