import Link from 'next/link';
import { Search, Filter, RotateCcw, ChevronLeft, ChevronRight, Layers, Building } from 'lucide-react';
import ProjectCard from '../../components/ProjectCard';
import SortSelect from '../../components/SortSelect';
import { getPublicProjects } from '../../lib/api';
import { Spotlight } from '../../components/ui/Spotlight';
import { BackgroundGrid } from '../../components/ui/BackgroundGrid';
import { FadeIn } from '../../components/ui/MotionWrapper';

export const metadata = {
  title: 'Infrastructure Projects & Portfolio | Nivara Infrastructure',
  description: 'Explore completed and active civil infrastructure projects, arterial expressways, bridges, transit corridors, and specialized developments by Nivara Infrastructure.'
};

export const revalidate = 60;

const CATEGORIES = [
  'All',
  'Highways and Bridges',
  'Commercial Infrastructure',
  'Industrial and Energy Infrastructure',
  'Urban Infrastructure',
  'Water and Utilities',
  'Transit and Rail',
  'Residential Flats & Apartments',
  'Commercial Properties'
];

const STATUSES = ['All', 'Ongoing', 'Completed', 'Planned', 'Under Construction', 'Ready to Move'];

export default async function ProjectsDirectoryPage({ searchParams }) {
  const currentCategory = searchParams?.category || 'All';
  const currentStatus = searchParams?.status || 'All';
  const currentSearch = searchParams?.search || '';
  const currentSort = searchParams?.sort || '';
  const currentPage = Math.max(1, parseInt(searchParams?.page, 10) || 1);

  let projects = [];
  let pagination = { total: 0, page: 1, limit: 9, totalPages: 1 };

  try {
    const res = await getPublicProjects({
      category: currentCategory,
      status: currentStatus,
      search: currentSearch,
      sort: currentSort,
      page: currentPage,
      limit: 9
    });

    if (res?.success) {
      projects = res.data;
      pagination = res.pagination;
    }
  } catch (err) {
    console.warn('API error fetching projects:', err.message);
  }

  const buildQuery = (newParams) => {
    const params = new URLSearchParams();
    const merged = {
      category: currentCategory,
      status: currentStatus,
      search: currentSearch,
      sort: currentSort,
      page: currentPage,
      ...newParams
    };

    if (merged.category && merged.category !== 'All') params.set('category', merged.category);
    if (merged.status && merged.status !== 'All') params.set('status', merged.status);
    if (merged.search) params.set('search', merged.search);
    if (merged.sort) params.set('sort', merged.sort);
    if (merged.page && merged.page > 1) params.set('page', merged.page);

    const str = params.toString();
    return str ? `/projects?${str}` : '/projects';
  };

  const hasActiveFilters =
    currentCategory !== 'All' ||
    currentStatus !== 'All' ||
    currentSearch.trim() !== '' ||
    currentSort !== '';

  return (
    <div className="bg-steel-50 min-h-screen pb-24">
      {/* 1. Page Header with Aceternity Spotlight */}
      <div className="bg-navy-950 text-white border-b border-navy-800 py-16 sm:py-20 relative overflow-hidden">
        <Spotlight className="-top-30 left-10" fill="#EA580C" />
        <BackgroundGrid className="absolute inset-0 z-0 h-full">
          <div className="absolute inset-0 bg-navy-950/80" />
        </BackgroundGrid>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Infrastructure Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Civil Infrastructure Directory
          </h1>
          <p className="text-steel-400 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
            Explore ongoing and delivered civil works spanning arterial highways, bridges, urban transit, industrial complexes, and regional utility assets.
          </p>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-steel-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          {/* Search, Status & Sorting Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <form action="/projects" method="GET" className="relative flex-1 max-w-md">
              <input type="hidden" name="category" value={currentCategory} />
              <input type="hidden" name="status" value={currentStatus} />
              {currentSort && <input type="hidden" name="sort" value={currentSort} />}
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
              <input
                type="text"
                name="search"
                defaultValue={currentSearch}
                placeholder="Search by title, location, or sector..."
                className="w-full pl-10 pr-4 py-2 bg-steel-50 border border-steel-300 text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange font-sans"
              />
            </form>

            <div className="flex flex-wrap items-center gap-3">
              {/* Construction Status Filter */}
              <div className="flex items-center gap-2 text-xs font-semibold text-steel-600 font-mono">
                <Filter className="w-3.5 h-3.5 text-steel-500" />
                <span>Status:</span>
                <div className="flex flex-wrap gap-1">
                  {STATUSES.map((st) => (
                    <Link
                      key={st}
                      href={buildQuery({ status: st, page: 1 })}
                      className={`px-2.5 py-1 text-xs border transition-all ${
                        currentStatus === st
                          ? 'bg-navy-900 text-white border-navy-900 font-bold shadow-sm'
                          : 'bg-white text-steel-600 border-steel-200 hover:border-steel-400'
                      }`}
                    >
                      {st}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <SortSelect
                currentSort={currentSort}
                currentCategory={currentCategory}
                currentStatus={currentStatus}
                currentSearch={currentSearch}
              />

              {/* Reset Filters */}
              {hasActiveFilters && (
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 font-mono font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </Link>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <Link
                  key={cat}
                  href={buildQuery({ category: cat, page: 1 })}
                  className={`px-3.5 py-1.5 text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-industrial-orange text-white border-industrial-orange shadow-sm'
                      : 'bg-steel-100 text-steel-700 border-steel-200 hover:bg-steel-200'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between text-xs text-steel-500 mb-6 font-mono">
          <span>
            SHOWING {projects.length} OF {pagination.total} PUBLISHED PROJECTS
          </span>
          {hasActiveFilters && <span className="text-industrial-orange font-bold">FILTERS ACTIVE</span>}
        </div>

        {projects.length > 0 ? (
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id || project.slug} project={project} />
              ))}
            </div>
          </FadeIn>
        ) : (
          <div className="bg-white border border-steel-200 p-12 text-center space-y-4 shadow-sm my-8">
            <Building className="w-12 h-12 text-steel-400 mx-auto stroke-[1.5]" />
            <h3 className="text-xl font-bold text-navy-900 font-display">
              No matching projects found
            </h3>
            <p className="text-steel-600 text-sm max-w-md mx-auto font-sans">
              No published projects match your current search and filter combination. Try resetting your filters to explore other sectors.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy-900 text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-navy-800 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </Link>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={buildQuery({ page: currentPage - 1 })}
                className="p-2 border border-steel-300 bg-white text-steel-700 hover:bg-steel-100"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : (
              <span className="p-2 border border-steel-200 bg-steel-100 text-steel-300 cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </span>
            )}

            <span className="px-4 py-2 border border-steel-300 bg-white text-xs font-mono font-semibold text-navy-900">
              PAGE {currentPage} OF {pagination.totalPages}
            </span>

            {currentPage < pagination.totalPages ? (
              <Link
                href={buildQuery({ page: currentPage + 1 })}
                className="p-2 border border-steel-300 bg-white text-steel-700 hover:bg-steel-100"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <span className="p-2 border border-steel-200 bg-steel-100 text-steel-300 cursor-not-allowed">
                <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
