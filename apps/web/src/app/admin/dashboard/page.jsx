'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  FileText,
  Inbox,
  CheckCircle2,
  Clock,
  Archive,
  ArrowRight,
  PlusCircle,
  Activity,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/proxy/admin/stats');
        const data = await res.json();
        if (data.success && data.data) {
          setStats(data.data);
        } else {
          setError(data.error || 'Failed to load dashboard metrics');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-industrial-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-steel-500 uppercase tracking-widest">
          Loading Real-Time Portfolio Metrics...
        </p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 text-sm">
        Failed to load administrative telemetry: {error}
      </div>
    );
  }

  const { metrics, recentProjects = [], recentInquiries = [], recentAuditLogs = [] } = stats;

  const METRIC_CARDS = [
    {
      title: 'Total Projects',
      value: metrics.totalProjects,
      desc: 'All database records',
      icon: FolderKanban,
      color: 'text-navy-900',
      bg: 'bg-white'
    },
    {
      title: 'Published & Public',
      value: metrics.publishedProjects,
      desc: 'Visible on corporate website',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/50'
    },
    {
      title: 'Draft Projects',
      value: metrics.draftProjects,
      desc: 'Internal only (unpublished)',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50/50'
    },
    {
      title: 'Ongoing Construction',
      value: metrics.ongoingProjects,
      desc: 'Active site execution',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50/50'
    },
    {
      title: 'Completed Infrastructure',
      value: metrics.completedProjects,
      desc: 'Delivered & commissioned',
      icon: ShieldAlert,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/50'
    },
    {
      title: 'New Inquiries',
      value: metrics.newInquiries,
      desc: 'Pending tender reviews',
      icon: Inbox,
      color: 'text-industrial-orange',
      bg: 'bg-orange-50/50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-5">
        <div>
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
            Operational Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            CMS Executive Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Project</span>
          </Link>
          <Link
            href="/projects"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-steel-300 hover:bg-steel-50 text-navy-900 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Directory</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {METRIC_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 border border-steel-200 shadow-sm flex flex-col justify-between ${card.bg}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-steel-500 uppercase tracking-wider font-mono">
                  {card.title}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div>
                <span className={`text-3xl font-extrabold font-mono ${card.color}`}>
                  {card.value}
                </span>
                <p className="text-[10px] text-steel-500 mt-1">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Projects & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white border border-steel-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-steel-200 pb-3">
            <h2 className="text-base font-bold text-navy-900 font-display flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-industrial-orange" />
              <span>Recently Updated Projects</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-navy-900 hover:text-industrial-orange transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="divide-y divide-steel-100 text-xs">
            {recentProjects.map(proj => (
              <div key={proj._id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <Link
                    href={`/admin/projects/${proj._id}/edit`}
                    className="font-bold text-navy-900 hover:text-industrial-orange transition-colors truncate block"
                  >
                    {proj.title}
                  </Link>
                  <div className="flex items-center gap-2 text-steel-500 text-[11px]">
                    <span>{proj.category}</span>
                    <span>•</span>
                    <span className="font-mono text-steel-400">
                      {new Date(proj.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold font-mono ${
                      proj.publicationStatus === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {proj.publicationStatus}
                  </span>
                  <Link
                    href={`/admin/projects/${proj._id}/edit`}
                    className="px-2.5 py-1 bg-steel-100 hover:bg-steel-200 text-steel-800 text-[11px] font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white border border-steel-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-steel-200 pb-3">
            <h2 className="text-base font-bold text-navy-900 font-display flex items-center gap-2">
              <Inbox className="w-4 h-4 text-industrial-orange" />
              <span>Incoming Tenders & Inquiries</span>
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-navy-900 hover:text-industrial-orange transition-colors"
            >
              View Inbox →
            </Link>
          </div>

          <div className="divide-y divide-steel-100 text-xs">
            {recentInquiries.length > 0 ? (
              recentInquiries.map(inq => (
                <div key={inq._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!inq.isRead && (
                        <span className="w-2 h-2 rounded-full bg-industrial-orange shrink-0" />
                      )}
                      <span className={`truncate text-navy-900 ${!inq.isRead ? 'font-bold' : 'font-medium'}`}>
                        {inq.subject}
                      </span>
                    </div>
                    <p className="text-steel-500 text-[11px] truncate">
                      {inq.name} ({inq.email})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 text-[10px] font-semibold font-mono bg-steel-100 text-steel-700">
                      {inq.status}
                    </span>
                    <Link
                      href={`/admin/inquiries`}
                      className="px-2.5 py-1 bg-navy-900 hover:bg-navy-800 text-white text-[11px]"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-steel-500 text-xs">
                No tender inquiries received yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Audit Log Activity Feed */}
      <div className="bg-white border border-steel-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-steel-500" />
          <span>Security Audit Log & Lifecycle Activity</span>
        </h2>

        <div className="divide-y divide-steel-100 text-xs">
          {recentAuditLogs.map(log => (
            <div key={log._id} className="py-2.5 flex items-center justify-between text-steel-600 gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-navy-900 bg-steel-100 px-2 py-0.5">
                  {log.action}
                </span>
                <span className="truncate">
                  {log.userEmail || 'System'} • {log.resourceType}{' '}
                  {log.details?.title ? `("${log.details.title}")` : ''}
                </span>
              </div>
              <span className="text-[11px] font-mono text-steel-400 shrink-0">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
