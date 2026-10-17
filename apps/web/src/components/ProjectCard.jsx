import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Building, Home, Maximize2, Tag } from 'lucide-react';

export default function ProjectCard({ project, featured = false }) {
  const {
    title,
    slug,
    category,
    location,
    developerName,
    clientName,
    price,
    configuration,
    area,
    constructionStatus,
    coverImage,
    shortDescription
  } = project;

  // Status badge styling tailored to real estate
  const statusConfig = {
    'Ready to Move': { bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30' },
    'Under Construction': { bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30' },
    'Upcoming / Pre-Launch': { bg: 'bg-blue-500/10 text-blue-700 border-blue-500/30' },
    Ongoing: { bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30' },
    Completed: { bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30' },
    Planned: { bg: 'bg-blue-500/10 text-blue-700 border-blue-500/30' },
    'On Hold': { bg: 'bg-rose-500/10 text-rose-700 border-rose-500/30' }
  };

  const statusStyle = statusConfig[constructionStatus] || statusConfig['Under Construction'];

  const imageUrl = coverImage?.url?.trim() || null;
  const developerDisplay = developerName || clientName || null;
  const isDemo = Boolean(
    project.isDemo ||
    ['the-skyview-residences', 'palm-meadows-gated-community', 'aura-grand-urban-apartments', 'the-pinnacle-commercial-business-suites', 'emerald-valley-residential-enclave', 'serenity-lakeview-penthouses'].includes(slug)
  );

  return (
    <article
      className={`group flex flex-col bg-white border border-steel-200 overflow-hidden hover:border-steel-400 hover:shadow-xl transition-all duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Media Container */}
      <Link href={`/projects/${slug}`} className="relative aspect-[16/10] w-full bg-steel-100 overflow-hidden block">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-steel-100 text-steel-400 p-6 text-center">
            <Building className="w-12 h-12 mb-2 stroke-[1.5]" />
            <span className="text-xs font-mono uppercase tracking-wider">Property Visual</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent opacity-70 group-hover:opacity-45 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {isDemo && (
            <span className="px-2.5 py-1 text-xs font-bold bg-amber-400 text-navy-950 uppercase tracking-wider font-mono shadow-sm">
              Sample Demo
            </span>
          )}
          <span className="px-2.5 py-1 text-xs font-semibold bg-navy-900/90 text-white backdrop-blur-sm uppercase tracking-wider font-mono">
            {category}
          </span>
          <span className={`px-2.5 py-1 text-xs font-semibold backdrop-blur-sm border ${statusStyle.bg}`}>
            {constructionStatus}
          </span>
        </div>

        {/* Bottom Price Tag on Image */}
        {price && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-3 py-1 bg-white/95 text-navy-950 text-xs font-bold font-mono tracking-tight shadow-md flex items-center gap-1.5 backdrop-blur-sm">
              <Tag className="w-3 h-3 text-industrial-orange" />
              <span>{price}</span>
            </span>
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          {/* Location & Developer Attribution */}
          <div className="flex flex-col gap-1 text-xs text-steel-500">
            <div className="flex items-center gap-1 text-steel-600">
              <MapPin className="w-3.5 h-3.5 text-industrial-orange shrink-0" />
              <span className="truncate font-medium">{location}</span>
            </div>
            {developerDisplay && (
              <div className="flex items-center gap-1 text-[11px] text-steel-400">
                <Building className="w-3 h-3 text-steel-400 shrink-0" />
                <span className="truncate">By {developerDisplay}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-navy-900 group-hover:text-industrial-orange transition-colors font-display line-clamp-2">
            <Link href={`/projects/${slug}`}>{title}</Link>
          </h3>

          {/* Configuration & Area Pills */}
          {(configuration || area) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {configuration && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-steel-100 text-steel-700 text-[11px] font-medium font-mono">
                  <Home className="w-3 h-3 text-steel-500" />
                  <span>{configuration}</span>
                </span>
              )}
              {area && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-steel-100 text-steel-700 text-[11px] font-medium font-mono">
                  <Maximize2 className="w-3 h-3 text-steel-500" />
                  <span>{area}</span>
                </span>
              )}
            </div>
          )}

          {/* Short Marketing Description */}
          {shortDescription && (
            <p className="text-steel-600 text-sm leading-relaxed line-clamp-2 pt-1">
              {shortDescription}
            </p>
          )}
        </div>

        {/* Action Link & Marketing Role */}
        <div className="pt-5 mt-4 border-t border-steel-100 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-steel-400">
            {isDemo ? 'Demonstration Listing' : 'Marketed by Nivara'}
          </span>
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 group-hover:text-industrial-orange uppercase tracking-wider transition-colors"
          >
            <span>View Property</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
