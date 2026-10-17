'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Archive,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [publicationStatus, setPublicationStatus] = useState('All');
  const [archiveStatus, setArchiveStatus] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category !== 'All') params.set('category', category);
      if (publicationStatus !== 'All') params.set('publicationStatus', publicationStatus);
      if (archiveStatus !== 'All') params.set('archiveStatus', archiveStatus);

      const res = await fetch(`/api/proxy/admin/projects?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [category, publicationStatus, archiveStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleTogglePublish = async (id, currentStatus) => {
    setActionLoading(true);
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await fetch(`/api/proxy/admin/projects/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setNotification(`Project marked as ${newStatus}`);
        setTimeout(() => setNotification(null), 3000);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleArchive = async (id, currentStatus) => {
    setActionLoading(true);
    const newStatus = currentStatus === 'Archived' ? 'Active' : 'Archived';
    try {
      const res = await fetch(`/api/proxy/admin/projects/${id}/archive`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setNotification(`Project ${newStatus === 'Archived' ? 'archived' : 'restored'}`);
        setTimeout(() => setNotification(null), 3000);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/proxy/admin/projects/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmId(null);
        setNotification('Project permanently deleted');
        setTimeout(() => setNotification(null), 3000);
        fetchProjects();
      } else {
        alert(data.error || 'Failed to delete project');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-5">
        <div>
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
            Property Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Property Listings Database
          </h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-steel-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties by title, developer, location..."
            className="w-full pl-10 pr-4 py-2 border border-steel-300 text-xs text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-steel-300 bg-white text-navy-900 font-medium"
          >
            <option value="All">All Categories</option>
            <option value="Residential Flats & Apartments">Residential Flats & Apartments</option>
            <option value="Residential Societies & Gated Communities">Residential Societies & Gated Communities</option>
            <option value="Luxury Residences">Luxury Residences & Penthouses</option>
            <option value="Commercial Properties">Commercial Properties</option>
            <option value="Residential Plots">Residential Plots</option>
          </select>

          <select
            value={publicationStatus}
            onChange={(e) => setPublicationStatus(e.target.value)}
            className="px-3 py-2 border border-steel-300 bg-white text-navy-900 font-medium"
          >
            <option value="All">All Publications</option>
            <option value="Published">Published Only</option>
            <option value="Draft">Drafts Only</option>
          </select>

          <select
            value={archiveStatus}
            onChange={(e) => setArchiveStatus(e.target.value)}
            className="px-3 py-2 border border-steel-300 bg-white text-navy-900 font-medium"
          >
            <option value="All">All Archives</option>
            <option value="Active">Active Only</option>
            <option value="Archived">Archived Only</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-steel-200 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-steel-500">
            Querying Property Listings Collection...
          </div>
        ) : projects.length > 0 ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-steel-50 border-b border-steel-200 text-steel-500 font-mono uppercase text-[11px]">
                <th className="py-3 px-4 font-semibold">Property & Category</th>
                <th className="py-3 px-4 font-semibold">Location & Developer</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Publication</th>
                <th className="py-3 px-4 font-semibold">Lifecycle</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {projects.map(proj => (
                <tr key={proj._id} className="hover:bg-steel-50/60 transition-colors">
                  <td className="py-3 px-4 space-y-0.5">
                    <Link
                      href={`/admin/projects/${proj._id}/edit`}
                      className="font-bold text-navy-900 hover:text-industrial-orange transition-colors text-sm"
                    >
                      {proj.title}
                    </Link>
                    <div className="text-[11px] text-steel-500 font-mono flex items-center gap-1.5 flex-wrap">
                      <span>{proj.category}</span>
                      {proj.isFeatured && <span className="text-industrial-orange font-bold">• Featured</span>}
                      {proj.isDemo && (
                        <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold rounded">
                          DEMO
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-steel-700">
                    <div className="font-medium">{proj.location}</div>
                    {(proj.developerName || proj.clientName) && (
                      <div className="text-[11px] text-steel-400">By {proj.developerName || proj.clientName}</div>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 font-mono text-[10px] font-semibold bg-steel-100 text-steel-800">
                      {proj.constructionStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(proj._id, proj.publicationStatus)}
                      disabled={actionLoading}
                      title="Click to toggle publication status"
                      className={`px-2.5 py-1 text-[11px] font-bold font-mono transition-colors ${
                        proj.publicationStatus === 'Published'
                          ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                      }`}
                    >
                      {proj.publicationStatus}
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleArchive(proj._id, proj.archiveStatus)}
                      disabled={actionLoading}
                      title="Click to toggle archive status"
                      className={`px-2 py-0.5 text-[10px] font-mono font-semibold ${
                        proj.archiveStatus === 'Active'
                          ? 'bg-steel-100 text-steel-700 hover:bg-steel-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                    >
                      {proj.archiveStatus}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/projects/${proj.slug}?preview=true`}
                      target="_blank"
                      className="inline-flex items-center gap-1 p-1 text-steel-500 hover:text-navy-900"
                      title="Preview case study"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/projects/${proj._id}/edit`}
                      className="inline-flex items-center gap-1 p-1 text-steel-500 hover:text-industrial-orange"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirmId(proj._id)}
                      className="inline-flex items-center gap-1 p-1 text-steel-400 hover:text-rose-600"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-steel-500 text-xs space-y-3">
            <p>No projects match the selected criteria.</p>
            <Link
              href="/admin/projects/new"
              className="inline-block px-4 py-2 bg-navy-900 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Create New Project
            </Link>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Permanent Delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-steel-200 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-navy-900 font-display">
                Confirm Permanent Deletion
              </h3>
            </div>
            <p className="text-xs text-steel-600 leading-relaxed">
              Are you sure you want to permanently delete this project? This will permanently remove the record from MongoDB and enqueue associated Cloudinary media for asset cleanup. This action cannot be undone.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-steel-100 hover:bg-steel-200 text-navy-900 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                {actionLoading ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
