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
  Home,
  Maximize2,
  Tag,
  Check,
  PhoneCall,
  Sparkles,
  Award
} from 'lucide-react';
import LightboxGallery from '../../../components/LightboxGallery';
import VideoPlayer from '../../../components/VideoPlayer';
import ProjectCard from '../../../components/ProjectCard';
import ContactForm from '../../../components/ContactForm';
import { getProjectBySlug } from '../../../lib/api';
import { getOptimizedImageUrl, IMAGE_PRESETS } from '../../../lib/imageOptimizer';

export const revalidate = 60;

export async function generateMetadata({ params, searchParams }) {
  const isPreview = searchParams?.preview === 'true';
  try {
    const res = await getProjectBySlug(params.slug, isPreview);
    if (!res?.success || !res?.data) {
      return { title: 'Property Not Found' };
    }

    const project = res.data;
    const title = project.seo?.title || `${project.title} | Marketed by Nivara Infrastructure`;
    const description = project.seo?.description || project.shortDescription || `Explore ${project.title} in ${project.location}.`;

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
    return { title: 'Property Details' };
  }
}

export default async function PropertyDetailPage({ params, searchParams }) {
  const isPreview = searchParams?.preview === 'true';
  let project = null;

  try {
    const res = await getProjectBySlug(params.slug, isPreview);
    if (res?.success && res.data) {
      project = res.data;
    }
  } catch (err) {
    console.warn(`Error loading property ${params.slug}:`, err.message);
  }

  if (!project) {
    notFound();
  }

  const {
    title,
    category,
    location,
    developerName,
    clientName,
    price,
    configuration,
    area,
    amenities = [],
    reraId,
    possessionDate,
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
  const developerDisplay = developerName || clientName || 'Independent Developer';
  const slug = project.slug || params.slug;
  const isDemo = Boolean(
    project.isDemo ||
    ['the-skyview-residences', 'palm-meadows-gated-community', 'aura-grand-urban-apartments', 'the-pinnacle-commercial-business-suites', 'emerald-valley-residential-enclave', 'serenity-lakeview-penthouses'].includes(slug)
  );

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Draft / Preview Banner */}
      {isDraftOrArchived && (
        <div className="bg-amber-500 text-navy-950 px-4 py-2 text-center text-xs font-bold tracking-wider uppercase font-mono sticky top-20 z-40 shadow-sm">
          ⚠️ Admin Preview Mode: This property is currently [{publicationStatus.toUpperCase()}] and [{archiveStatus.toUpperCase()}]. It is not visible to public visitors.
        </div>
      )}

      {/* Demonstration Listing Banner */}
      {isDemo && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-950 px-4 py-2.5 text-center text-xs font-medium">
          <span className="font-bold uppercase font-mono tracking-wider mr-2 bg-amber-200 px-1.5 py-0.5">Sample Demonstration Listing</span>
          This property is displayed for platform demonstration. Pricing, developer credits, and specifications shown are simulated and do not represent an active market offering.
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-steel-100 border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-steel-500 overflow-x-auto scrollbar-none" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-navy-900 transition-colors whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-400 shrink-0" />
            <Link href="/projects" className="hover:text-navy-900 transition-colors whitespace-nowrap">
              Properties
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-400 shrink-0" />
            <Link
              href={`/projects?category=${encodeURIComponent(category)}`}
              className="hover:text-navy-900 transition-colors whitespace-nowrap"
            >
              {category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-400 shrink-0" />
            <span className="text-navy-900 font-semibold truncate max-w-xs">{title}</span>
          </nav>
        </div>
      </div>

      {/* Property Hero Header */}
      <div className="bg-navy-950 text-white relative py-16 lg:py-20 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 z-0">
          {coverImage?.url ? (
            <Image
              src={getOptimizedImageUrl(coverImage.url, IMAGE_PRESETS.hero)}
              alt={coverImage?.alt || title}
              fill
              priority
              className="object-cover opacity-25 mix-blend-luminosity"
            />
          ) : (
            <div className="w-full h-full bg-navy-950 opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent" />
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
            <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold font-mono">
              Marketed by Nivara Infrastructure
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display max-w-4xl leading-tight">
            {title}
          </h1>

          {/* Key Property Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-navy-800 max-w-5xl text-xs font-mono">
            {/* Price */}
            {price && (
              <div className="space-y-1">
                <span className="text-steel-400 uppercase">Price Range</span>
                <p className="text-white font-sans text-base font-bold flex items-center gap-1.5 text-industrial-orange">
                  <Tag className="w-4 h-4 shrink-0 text-industrial-orange" />
                  <span>{price}</span>
                </p>
              </div>
            )}

            {/* Location */}
            <div className="space-y-1">
              <span className="text-steel-400 uppercase">Location</span>
              <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-industrial-orange shrink-0" />
                <span className="truncate">{location}</span>
              </p>
            </div>

            {/* Developer Attribution */}
            <div className="space-y-1">
              <span className="text-steel-400 uppercase">Developed By</span>
              <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                <Building className="w-4 h-4 text-steel-400 shrink-0" />
                <span className="truncate">{developerDisplay}</span>
              </p>
            </div>

            {/* Configuration or Possession */}
            <div className="space-y-1">
              <span className="text-steel-400 uppercase">
                {configuration ? 'Configuration' : 'Handover / Possession'}
              </span>
              <p className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                {configuration ? (
                  <>
                    <Home className="w-4 h-4 text-steel-400 shrink-0" />
                    <span className="truncate">{configuration}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-steel-400 shrink-0" />
                    <span>{possessionDate || 'Inquire'}</span>
                  </>
                )}
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
            {coverImage?.url && (
              <div className="relative aspect-[16/10] w-full bg-steel-100 border border-steel-200 overflow-hidden shadow-md">
                <Image
                  src={getOptimizedImageUrl(coverImage.url, IMAGE_PRESETS.medium)}
                  alt={coverImage?.alt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                {coverImage?.caption && (
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-navy-950/85 backdrop-blur-sm text-xs text-steel-300">
                    {coverImage.caption}
                  </div>
                )}
              </div>
            )}

            {/* Property Overview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-steel-200 pb-3">
                <h2 className="text-2xl font-bold text-navy-900 font-display">
                  Property Overview
                </h2>
                {area && (
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-steel-100 text-navy-900 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-industrial-orange" />
                    <span>Area: {area}</span>
                  </span>
                )}
              </div>

              {shortDescription && (
                <p className="text-lg text-steel-700 leading-relaxed font-medium">
                  {shortDescription}
                </p>
              )}

              {fullDescription && (
                <div className="prose prose-slate max-w-none text-steel-600 text-sm leading-relaxed whitespace-pre-line pt-2">
                  {fullDescription}
                </div>
              )}
            </div>

            {/* Key Amenities */}
            {amenities && amenities.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-industrial-orange" />
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Project Amenities & Lifestyle Features
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-steel-50 border border-steel-200 flex items-center gap-2.5 text-xs font-semibold text-navy-900"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Buyer Assistance Scope / Highlights */}
            {scopeOfWork.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-industrial-orange" />
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Nivara Buying Assistance for this Property
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

            {/* Property Photo Gallery */}
            {gallery.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Property Gallery
                  </h3>
                  <span className="text-xs font-mono text-steel-500">
                    {gallery.length} PHOTOGRAPHS
                  </span>
                </div>
                <LightboxGallery items={gallery} title={title} />
              </div>
            )}

            {/* Virtual Tour / Documentation Video */}
            {video && video.provider && video.provider !== 'none' && (
              <div className="space-y-6 pt-6 border-t border-steel-200">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-industrial-orange" />
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Virtual Property Tour & Video
                  </h3>
                </div>
                <VideoPlayer video={video} title={title} />
              </div>
            )}

            {/* Real Estate Marketing & Developer Disclosure Banner */}
            <div className="p-6 bg-steel-50 border border-steel-200 text-xs text-steel-600 space-y-2">
              <span className="font-bold text-navy-900 uppercase font-mono tracking-wider block text-[11px]">
                Statutory Notice & Developer Information
              </span>
              <p>
                <strong>Marketed by:</strong> Nivara Infrastructure.
                <br />
                <strong>Developed by:</strong> {developerDisplay}.
              </p>
              {isDemo ? (
                <p className="text-amber-800 text-[11px] font-mono">
                  <strong>Notice:</strong> Demonstration listing for platform preview. Not an active market offering.
                </p>
              ) : reraId ? (
                <p>
                  <strong>Registration Details:</strong> {reraId}.
                </p>
              ) : null}
              <p className="text-[11px] text-steel-500 pt-1">
                Nivara Infrastructure facilitates property discovery, site visits, and sales representation. All floor plans, amenities, pricing estimates, and possession timelines are supplied by the developer and should be verified prior to signing formal purchase agreements.
              </p>
            </div>
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-8">
            {/* Quick Action: Schedule Visit / Inquiry */}
            <div className="bg-navy-950 text-white p-6 space-y-4 border border-navy-800 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                  Direct Buyer Support
                </span>
                <h3 className="text-xl font-bold font-display">
                  Interested in {title}?
                </h3>
              </div>
              <p className="text-xs text-steel-300 leading-relaxed">
                Schedule a guided site tour, request a detailed brochure, or verify unit availability with our property team.
              </p>

              {price && (
                <div className="p-3 bg-navy-900 border border-navy-800 space-y-1">
                  <span className="text-[10px] font-mono text-steel-400 uppercase">Estimated Pricing</span>
                  <p className="text-base font-bold text-industrial-orange font-mono">{price}</p>
                </div>
              )}

              <ContactForm
                propertyId={project._id}
                propertyTitle={title}
                defaultInquiryType="Schedule a Site Visit"
              />
            </div>

            {/* Property Specifications / Highlights Card */}
            {specifications.length > 0 && (
              <div className="bg-steel-50 border border-steel-300 p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-steel-200">
                  <FileText className="w-4 h-4 text-industrial-orange" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 font-mono">
                    Property Specifications
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

            {/* Trust & Verification Card */}
            <div className="p-6 bg-white border border-steel-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-steel-500 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification Standards</span>
              </div>
              <p className="text-xs text-steel-600 leading-relaxed">
                Nivara verifies developer documentation, title clarity, and statutory permissions to ensure a transparent property discovery experience.
              </p>
            </div>
          </div>
        </div>

        {/* Related Properties Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-steel-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                  Similar Opportunities
                </span>
                <h3 className="text-2xl font-bold text-navy-900 font-display">
                  More in {category}
                </h3>
              </div>
              <Link
                href={`/projects?category=${encodeURIComponent(category)}`}
                className="text-xs font-bold text-navy-900 hover:text-industrial-orange uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <span>View All In Category</span>
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
