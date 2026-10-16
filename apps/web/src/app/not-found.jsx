import Link from 'next/link';
import { HardHat, ArrowRight, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-steel-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-steel-200 p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-navy-950 text-industrial-orange flex items-center justify-center mx-auto">
          <HardHat className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-industrial-orange uppercase tracking-widest">
            Error 404 • Resource Not Located
          </span>
          <h1 className="text-2xl font-bold text-navy-900 font-display">
            Project or Page Unavailable
          </h1>
          <p className="text-steel-600 text-xs sm:text-sm leading-relaxed">
            The requested infrastructure record, case study, or document has not been published or has been archived from public index.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/projects"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-steel-100 hover:bg-steel-200 text-navy-900 border border-steel-300 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Projects Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
