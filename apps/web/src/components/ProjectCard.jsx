import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Calendar } from 'lucide-react';

export default function ProjectCard({ project, featured = false }) {
  const {
    title,
    slug,
    category,
    location,
    constructionStatus,
    coverImage,
    shortDescription,
    timeline
  } = project;

  // Status badge styling
  const statusConfig = {
    Ongoing: { bg: 'bg-amber-500/10 text-amber-600 border-amber-500/30' },
    Completed: { bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' },
    Planned: { bg: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
    'On Hold': { bg: 'bg-rose-500/10 text-rose-600 border-rose-500/30' }
  };

  const statusStyle = statusConfig[constructionStatus] || statusConfig.Ongoing;

  const imageUrl = coverImage?.url || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80';

  return (
    <article
      className={`group flex flex-col bg-white border border-steel-200 overflow-hidden hover:border-steel-400 hover:shadow-xl transition-all duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Media Container */}
      <Link href={`/projects/${slug}`} className="relative aspect-[16/10] w-full bg-steel-100 overflow-hidden block">
        <Image
          src={imageUrl}
          alt={coverImage?.alt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="px-2.5 py-1 text-xs font-semibold bg-navy-900/90 text-white backdrop-blur-sm uppercase tracking-wider font-mono">
            {category}
          </span>
          <span className={`px-2.5 py-1 text-xs font-semibold backdrop-blur-sm border ${statusStyle.bg}`}>
            {constructionStatus}
          </span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          {/* Location & Metadata */}
          <div className="flex items-center gap-4 text-xs text-steel-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-industrial-orange shrink-0" />
              <span className="truncate">{location}</span>
            </span>
            {timeline?.startDate && (
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-steel-400 shrink-0" />
                <span>{new Date(timeline.startDate).getFullYear()}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-navy-900 group-hover:text-industrial-orange transition-colors font-display line-clamp-2">
            <Link href={`/projects/${slug}`}>{title}</Link>
          </h3>

          {/* Description */}
          <p className="text-steel-600 text-sm leading-relaxed line-clamp-3">
            {shortDescription}
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-6 mt-4 border-t border-steel-100 flex items-center justify-between">
          <span className="text-xs font-mono text-steel-400">
            Case Study Ref: {slug.slice(0, 12)}
          </span>
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 group-hover:text-industrial-orange uppercase tracking-wider transition-colors"
          >
            <span>Explore Engineering</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
