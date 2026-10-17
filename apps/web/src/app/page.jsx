import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { getFeaturedProjects } from '../lib/api';
import {
  HomeHero,
  CapabilitiesSection,
  DeliveryApproachSection,
  ClosingCtaSection
} from '../components/home/HomeClientSections';

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Spotlight, BackgroundGrid, Motion Reveal) */}
      <HomeHero />

      {/* 2. CORE CAPABILITIES (Aceternity BentoGrid) */}
      <CapabilitiesSection />

      {/* 3. FEATURED INFRASTRUCTURE PROJECTS */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Project Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 font-display">
                Featured Infrastructure Projects
              </h2>
              <p className="text-steel-600 text-sm md:text-base leading-relaxed font-sans">
                A selection of ongoing and delivered civil works spanning arterial highways, bridges, urban transit, and regional utilities.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold font-mono text-navy-900 hover:text-industrial-orange uppercase tracking-wider transition-colors shrink-0"
            >
              <span>View Full Directory</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, idx) => (
                <ProjectCard key={project._id || project.slug || idx} project={project} featured={idx === 0} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-steel-300 bg-steel-50 max-w-xl mx-auto">
              <p className="text-steel-600 text-sm font-sans mb-4">
                Featured projects are currently being synchronized from the infrastructure database.
              </p>
              <Link
                href="/projects"
                className="text-xs font-mono font-bold text-industrial-orange uppercase tracking-wider hover:underline"
              >
                Browse All Projects →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. DISCIPLINED PROJECT DELIVERY APPROACH (Accordion) */}
      <DeliveryApproachSection />

      {/* 5. CLOSING CTA (Spotlight & Glow) */}
      <ClosingCtaSection />
    </div>
  );
}
