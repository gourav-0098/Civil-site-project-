import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  FileText,
  Video,
  Layers
} from 'lucide-react';
import LightboxGallery from '../../../components/LightboxGallery';
import VideoPlayer from '../../../components/VideoPlayer';
import ProjectCard from '../../../components/ProjectCard';
import { getProjectBySlug } from '../../../lib/api';

export const revalidate = 60;

export async function generateMetadata({ params, searchParams }) {
  const isPreview = searchParams?.preview === 'true';
  try {
    const res = await getProjectBySlug(params.slug, isPreview);
    if (!res?.success || !res?.data) {
      return { title: 'Project Not Found' };
    }

    const project = res.data;
    const title = project.seo?.title || `${project.title} | Nivara Infrastructure`;
    const description = project.seo?.description || project.shortDescription;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: project.coverImage?.url ? [{ url: project.coverImage.url }] : []
      }
    };
  } catch {
    return { title: 'Project Details' };
  }
}

export default async function ProjectDetailPage({ params, searchParams }) {
  const isPreview = searchParams?.preview === 'true';
  let project = null;

  try {
    const res = await getProjectBySlug(params.slug, isPreview);
    if (res?.success && res.data) {
      project = res.data;
    }
  } catch (err) {
    console.warn(`Error loading project ${params.slug}:`, err.message);
  }

  if (!project) {
    notFound();
  }

  const {
    title,
    category,
    location,
    clientName,
    constructionStatus,
    publicationStatus,
    archiveStatus,
    timeline,
    shortDescription,
    fullDescription,
    scopeOfWork = [],
    specifications = [],
    coverImage,
    gallery = [],
    video,
    relatedProjects = []
  } = project;

  const isDraftOrArchived = publicationStatus === 'Draft' || archiveStatus === 'Archived';

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Draft / Preview Banner */}
      {isDraftOrArchived && (
        <div className="bg-amber-500 text-navy-950 px-4 py-2 text-center text-xs font-bold tracking-wider uppercase font-mono sticky top-20 z-40 shadow-sm">
          ⚠️ Admin Preview Mode: This project is currently [{publicationStatus.toUpperCase()}] and [{archiveStatus.toUpperCase()}]. It is not visible to public visitors.
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-steel-100 border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-steel-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-400" />
            <Link href="/projects" className="hover:text-navy-900 transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-400" />
            <Link
              href={`/projects?category=${encodeURIComponent(category)}`}
              className="hover:text-navy-900 transition-colors"
            >
              {category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-400" />
            <span className="text-navy-900 font-semibold truncate max-w-xs">{title}</span>
          </nav>
        </div>
      </div>

      {/* Project Hero Header */}
      <div className="bg-navy-950 text-white relative py-16 lg:py-20 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 z-0">
          <Image
            src={coverImage?.url || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80'}
            alt={coverImage?.alt || title}
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-industrial-orange text-white text-xs font-bold uppercase tracking-wider font-mono">
              {category}
            </span>
            <span className="px-3 py-1 bg-navy-900 border border-steel-700 text-steel-300 text-xs font-semibold uppercase tracking-wider font-mono">
              Status: {constructionStatus}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display max-w-4xl leading-tight">
            {title}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-navy-800 max-w-4xl text-xs font-mono">
            <div className="space-y-1">
              <span className="text-steel-400 uppercase">Location</span>
              <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-industrial-orange shrink-0" />
                <span>{location}</span>
              </p>
            </div>
            {clientName && (
              <div className="space-y-1">
                <span className="text-steel-400 uppercase">Client / Authority</span>
                <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-industrial-orange shrink-0" />
                  <span className="truncate">{clientName}</span>
                </p>
              </div>
            )}
            {timeline?.startDate && (
              <div className="space-y-1">
                <span className="text-steel-400 uppercase">Commencement</span>
                <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-steel-400 shrink-0" />
                  <span>{new Date(timeline.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </p>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-steel-400 uppercase">
                {constructionStatus === 'Completed' ? 'Completion' : 'Target Handover'}
              </span>
              <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-steel-400 shrink-0" />
                <span>
                  {timeline?.completionDate
                    ? new Date(timeline.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : timeline?.estimatedCompletionDate
                    ? new Date(timeline.estimatedCompletionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Scheduled'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Column (2 cols) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Primary Cover Image Showcase */}
            <div className="relative aspect-[16/9] w-full bg-steel-100 border border-steel-200 overflow-hidden shadow-md">
              <Image
                src={coverImage?.url || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80'}
                alt={coverImage?.alt || title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
              {coverImage?.caption && (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-navy-950/80 backdrop-blur-sm text-xs text-steel-300">
                  {coverImage.caption}
                </div>
              )}
            </div>

            {/* Executive Summary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-navy-900 font-display">
                Engineering Overview
              </h2>
              <p className="text-lg text-steel-700 leading-relaxed font-medium">
                {shortDescription}
              </p>
              <div className="prose prose-slate max-w-none text-steel-600 text-sm leading-relaxed whitespace-pre-line pt-2">
                {fullDescription}
              </div>
            </div>

            {/* Scope of Work */}
            {scopeOfWork.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-industrial-orange" />
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Scope of Civil Construction
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {scopeOfWork.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-steel-50 border border-steel-200 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-industrial-orange mt-0.5 shrink-0" />
                      <span className="text-xs font-medium text-steel-800 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Gallery */}
            {gallery.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Construction Photograph Gallery
                  </h3>
                  <span className="text-xs font-mono text-steel-500">
                    {gallery.length} IMAGES
                  </span>
                </div>
                <LightboxGallery items={gallery} title={title} />
              </div>
            )}

            {/* Project Video */}
            {video && video.provider && video.provider !== 'none' && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-industrial-orange" />
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Construction Documentation Video
                  </h3>
                </div>
                <VideoPlayer video={video} title={title} />
              </div>
            )}
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-8">
            {/* Technical Specifications Card */}
            {specifications.length > 0 && (
              <div className="bg-steel-50 border border-steel-300 p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-steel-200">
                  <FileText className="w-4 h-4 text-industrial-orange" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 font-mono">
                    Technical Specifications
                  </h3>
                </div>
                <dl className="divide-y divide-steel-200 text-xs">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between gap-4">
                      <dt className="text-steel-500 font-medium">{spec.label}</dt>
                      <dd className="font-mono font-bold text-navy-900 text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Project Inquiry Card */}
            <div className="bg-navy-950 text-white p-6 space-y-4 border border-navy-800">
              <span className="text-[10px] font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Tender Correspondence
              </span>
              <h3 className="text-lg font-bold font-display">
                Inquire Regarding Similar Infrastructure
              </h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                Connect with our commercial estimation desk to evaluate specifications, bill of quantities, or joint-venture prequalification for {category}.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Inquiry re: ${title}`)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Discuss Similar Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quality Standard Card */}
            <div className="p-6 bg-white border border-steel-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-steel-500 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification Standards</span>
              </div>
              <p className="text-xs text-steel-600 leading-relaxed">
                All structural calculations, mix designs, and pile load tests conform to certified national standards (IRC, IS, and MoRTH specifications).
              </p>
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-steel-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                  Related Case Studies
                </span>
                <h3 className="text-2xl font-bold text-navy-900 font-display">
                  More in {category}
                </h3>
              </div>
              <Link
                href={`/projects?category=${encodeURIComponent(category)}`}
                className="text-xs font-bold text-navy-900 hover:text-industrial-orange uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <span>View All In Sector</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map(rel => (
                <ProjectCard key={rel._id || rel.slug} project={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
