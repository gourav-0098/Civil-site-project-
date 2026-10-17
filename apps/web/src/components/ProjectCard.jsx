'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building, Home, Maximize2, Tag, Calendar, Layers } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { getOptimizedImageUrl, IMAGE_PRESETS } from '../lib/imageOptimizer';

export default function ProjectCard({ project, featured = false }) {
  const {
    title,
    slug,
    category,
    location,
    clientName,
    developerName,
    price,
    configuration,
    area,
    constructionStatus,
    timeline,
    coverImage,
    shortDescription
  } = project;

  // Status badge styling
  const statusConfig = {
    'Ready to Move': { bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30' },
    'Under Construction': { bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30' },
    'Upcoming / Pre-Launch': { bg: 'bg-blue-500/10 text-blue-700 border-blue-500/30' },
    Ongoing: { bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30' },
    Completed: { bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30' },
    Planned: { bg: 'bg-blue-500/10 text-blue-700 border-blue-500/30' },
    'On Hold': { bg: 'bg-rose-500/10 text-rose-700 border-rose-500/30' }
  };

  const statusStyle = statusConfig[constructionStatus] || statusConfig['Ongoing'] || statusConfig['Under Construction'];
  const rawImageUrl = coverImage?.url?.trim() || null;
  const imageUrl = rawImageUrl
    ? getOptimizedImageUrl(rawImageUrl, featured ? IMAGE_PRESETS.medium : IMAGE_PRESETS.thumbnail)
    : null;
  const clientOrDev = clientName || developerName || null;

  const isDemo = Boolean(
    project.isDemonstration ||
    project.isDemo ||
    ['the-skyview-residences', 'palm-meadows-gated-community', 'aura-grand-urban-apartments', 'the-pinnacle-commercial-business-suites', 'emerald-valley-residential-enclave', 'serenity-lakeview-penthouses'].includes(slug)
  );

  const locationDisplay =
    typeof location === 'object' && location !== null
      ? `${location.city || ''}${location.state ? `, ${location.state}` : ''}`
      : location || 'Strategic Location';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`h-full ${featured ? 'lg:col-span-2' : ''}`}
    >
      <GlowCard className="group flex flex-col h-full bg-white border border-steel-200 hover:border-steel-400 hover:shadow-2xl transition-all duration-300">
        {/* Media Container */}
        <Link href={`/projects/${slug}`} className="relative aspect-[16/10] w-full bg-steel-100 overflow-hidden block">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={coverImage?.alt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-steel-100 text-steel-400 p-6 text-center">
              <Building className="w-12 h-12 mb-2 stroke-[1.5]" />
              <span className="text-xs font-mono uppercase tracking-wider">Project Visual</span>
            </div>
          )}

          {/* High-end gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <div className="flex flex-wrap gap-1.5">
              {isDemo && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-navy-950 uppercase tracking-wider font-mono shadow-sm">
                  Case Study
                </span>
              )}
              <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-navy-900/90 text-white backdrop-blur-sm uppercase tracking-wider font-mono border border-navy-700/50">
                {category}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md border ${statusStyle.bg}`}>
              {constructionStatus}
            </span>
          </div>

          {/* Bottom Metatag on Image */}
          {price ? (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="px-3 py-1 bg-white/95 text-navy-950 text-xs font-bold font-mono tracking-tight shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                <Tag className="w-3 h-3 text-industrial-orange" />
                <span>{price}</span>
              </span>
            </div>
          ) : timeline?.fiscalYear || timeline?.duration ? (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-navy-950/90 text-white text-[11px] font-mono tracking-tight shadow-md flex items-center gap-1.5 backdrop-blur-md border border-white/10">
                <Calendar className="w-3 h-3 text-industrial-orange" />
                <span>{timeline.fiscalYear || timeline.duration}</span>
              </span>
            </div>
          ) : null}
        </Link>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div className="space-y-3">
            {/* Location & Client Attribution */}
            <div className="flex items-center justify-between text-xs text-steel-500">
              <div className="flex items-center gap-1 text-steel-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-industrial-orange shrink-0" />
                <span className="truncate">{locationDisplay}</span>
              </div>
              {clientOrDev && (
                <span className="text-[11px] font-mono text-steel-400 truncate max-w-[140px]">
                  {clientOrDev}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-navy-900 group-hover:text-industrial-orange transition-colors font-display line-clamp-2 leading-snug">
              <Link href={`/projects/${slug}`}>{title}</Link>
            </h3>

            {/* Configuration or Civil Infrastructure Specs */}
            {(configuration || area) ? (
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
            ) : null}

            {/* Short Description */}
            {shortDescription && (
              <p className="text-steel-600 text-sm leading-relaxed line-clamp-2 pt-1 font-sans">
                {shortDescription}
              </p>
            )}
          </div>

          {/* Action Link & Status Footer */}
          <div className="pt-5 mt-4 border-t border-steel-100 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-steel-400 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>{isDemo ? 'Civil Case Study' : 'Infrastructure Asset'}</span>
            </span>
            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 group-hover:text-industrial-orange uppercase tracking-wider font-mono transition-colors"
            >
              <span>View Project</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
