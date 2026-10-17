'use client';

import { useRouter } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

export default function SortSelect({
  currentSort = '',
  currentCategory = 'All',
  currentStatus = 'All',
  currentSearch = ''
}) {
  const router = useRouter();

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const params = new URLSearchParams();

    if (currentCategory && currentCategory !== 'All') params.set('category', currentCategory);
    if (currentStatus && currentStatus !== 'All') params.set('status', currentStatus);
    if (currentSearch && currentSearch.trim()) params.set('search', currentSearch.trim());
    if (newSort) params.set('sort', newSort);

    const query = params.toString();
    router.push(query ? `/projects?${query}` : '/projects');
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-steel-600 font-semibold border-l border-steel-200 pl-3">
      <ArrowUpDown className="w-3.5 h-3.5 text-steel-500" />
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="px-2 py-1 bg-white border border-steel-200 text-xs font-medium text-navy-900 focus:outline-none"
      >
        <option value="">Sort: Featured First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="title">Alphabetical (A-Z)</option>
        <option value="oldest">Oldest Listed</option>
      </select>
    </div>
  );
}
