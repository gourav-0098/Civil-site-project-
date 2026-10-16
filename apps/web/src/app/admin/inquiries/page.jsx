'use client';

import { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Building,
  MapPin,
  Save,
  X,
  FileText
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notification, setNotification] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (status !== 'All') params.set('status', status);

      const res = await fetch(`/api/proxy/admin/inquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error('Error loading inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [status]);

  const handleOpenDetail = async (inq) => {
    setSelectedInquiry(inq);
    setInternalNotes(inq.internalNotes || '');

    // Fetch single inquiry to mark as read
    try {
      const res = await fetch(`/api/proxy/admin/inquiries/${inq._id}`);
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(data.data);
        // Update read status in local table
        setInquiries(prev =>
          prev.map(item => (item._id === inq._id ? { ...item, isRead: true } : item))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    try {
      const res = await fetch(`/api/proxy/admin/inquiries/${selectedInquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(data.data);
        setInquiries(prev =>
          prev.map(item => (item._id === selectedInquiry._id ? { ...item, status: newStatus } : item))
        );
        setNotification(`Inquiry status updated to ${newStatus}`);
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/proxy/admin/inquiries/${selectedInquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(data.data);
        setInquiries(prev =>
          prev.map(item => (item._id === selectedInquiry._id ? { ...item, internalNotes } : item))
        );
        setNotification('Internal notes recorded');
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-5">
        <div>
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
            Commercial Inbox
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Inquiries & Tender RFPs
          </h1>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-steel-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchInquiries();
          }}
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by name, company, email..."
            className="w-full pl-10 pr-4 py-2 border border-steel-300 text-xs text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange"
          />
        </form>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-steel-500 font-semibold">Filter Status:</span>
          {['All', 'New', 'In Progress', 'Responded', 'Closed'].map(st => (
            <button
              key={st}
              onClick={() => setStatus(st)}
              className={`px-3 py-1.5 border transition-colors ${
                status === st
                  ? 'bg-navy-900 text-white border-navy-900 font-bold'
                  : 'bg-white text-steel-600 border-steel-200 hover:border-steel-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-steel-200 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-steel-500">
            Querying Incoming Inquiries...
          </div>
        ) : inquiries.length > 0 ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-steel-50 border-b border-steel-200 text-steel-500 font-mono uppercase text-[11px]">
                <th className="py-3 px-4 font-semibold">Sender & Entity</th>
                <th className="py-3 px-4 font-semibold">Category & Subject</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Received</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {inquiries.map(inq => (
                <tr
                  key={inq._id}
                  onClick={() => handleOpenDetail(inq)}
                  className={`hover:bg-steel-50/70 transition-colors cursor-pointer ${
                    !inq.isRead ? 'bg-orange-50/30' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {!inq.isRead && (
                        <span className="w-2 h-2 rounded-full bg-industrial-orange shrink-0" />
                      )}
                      <div>
                        <span className={`text-navy-900 text-sm ${!inq.isRead ? 'font-bold' : 'font-medium'}`}>
                          {inq.name}
                        </span>
                        <p className="text-steel-500 text-[11px]">
                          {inq.organization || inq.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 space-y-0.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-steel-100 text-steel-700">
                      {inq.inquiryType}
                    </span>
                    <p className="font-semibold text-navy-900 text-xs truncate max-w-sm">
                      {inq.subject}
                    </p>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold ${
                        inq.status === 'New'
                          ? 'bg-industrial-orange/10 text-industrial-orange'
                          : inq.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'Responded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-steel-100 text-steel-600'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-steel-500">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(inq);
                      }}
                      className="px-3 py-1 bg-navy-900 hover:bg-navy-800 text-white text-[11px] font-semibold"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-steel-500 text-xs">
            No inquiries located matching this filter.
          </div>
        )}
      </div>

      {/* Detail Slide-over / Modal Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-semibold text-industrial-orange uppercase tracking-wider">
                  Tender Filing Ref #{selectedInquiry._id.slice(-6).toUpperCase()}
                </span>
                <h2 className="text-xl font-bold font-display mt-0.5">
                  {selectedInquiry.subject}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-steel-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              {/* Metadata Cards */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-steel-50 border border-steel-200 text-xs">
                <div className="space-y-1">
                  <span className="text-steel-400 uppercase font-mono text-[10px]">Sender Name</span>
                  <p className="font-bold text-navy-900">{selectedInquiry.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-steel-400 uppercase font-mono text-[10px]">Entity / Organization</span>
                  <p className="font-bold text-navy-900">{selectedInquiry.organization || 'Individual'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-steel-400 uppercase font-mono text-[10px]">Email Contact</span>
                  <p className="font-mono text-navy-900">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-industrial-orange hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-steel-400 uppercase font-mono text-[10px]">Phone Contact</span>
                  <p className="font-mono text-navy-900">{selectedInquiry.phone || 'Not supplied'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-steel-400 uppercase font-mono text-[10px]">Category</span>
                  <p className="font-semibold text-navy-900">{selectedInquiry.inquiryType}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-steel-400 uppercase font-mono text-[10px]">Target Location</span>
                  <p className="font-semibold text-navy-900">{selectedInquiry.projectLocation || 'General'}</p>
                </div>
              </div>

              {/* Message Narrative */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-steel-600 font-mono">
                  Full Transmission Scope & Message
                </label>
                <div className="p-4 bg-white border border-steel-300 text-xs leading-relaxed text-steel-800 whitespace-pre-wrap font-sans">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Control */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-steel-600 font-mono">
                  Pipeline Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['New', 'In Progress', 'Responded', 'Closed'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                        selectedInquiry.status === st
                          ? 'bg-industrial-orange text-white'
                          : 'bg-steel-100 text-steel-700 hover:bg-steel-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-steel-600 font-mono">
                  Internal Administrative Notes (Confidential)
                </label>
                <textarea
                  rows={4}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record commercial estimation progress, meeting minutes, or tender assessment..."
                  className="w-full px-3 py-2 border border-steel-300 text-xs text-navy-900"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingNotes ? 'Saving...' : 'Save Internal Notes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
