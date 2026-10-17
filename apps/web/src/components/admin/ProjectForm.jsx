'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Video,
  Image as ImageIcon,
  FileText,
  Sliders,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    clientName: initialData?.clientName || '',
    category: initialData?.category || 'Highways & Bridges',
    location: initialData?.location || '',
    constructionStatus: initialData?.constructionStatus || 'Ongoing',
    publicationStatus: initialData?.publicationStatus || 'Draft',
    archiveStatus: initialData?.archiveStatus || 'Active',
    isFeatured: initialData?.isFeatured || false,
    timeline: {
      startDate: initialData?.timeline?.startDate ? initialData.timeline.startDate.slice(0, 10) : '',
      estimatedCompletionDate: initialData?.timeline?.estimatedCompletionDate ? initialData.timeline.estimatedCompletionDate.slice(0, 10) : '',
      completionDate: initialData?.timeline?.completionDate ? initialData.timeline.completionDate.slice(0, 10) : ''
    },
    shortDescription: initialData?.shortDescription || 'High-capacity heavy civil infrastructure project engineered for regional connectivity.',
    fullDescription: initialData?.fullDescription || 'Disciplined engineering, structural modeling, geotechnical soil validation, and heavy civil construction delivery.',
    scopeOfWork: initialData?.scopeOfWork && initialData.scopeOfWork.length > 0
      ? initialData.scopeOfWork
      : ['Fabrication and segmental deck span erection'],
    specifications: initialData?.specifications && initialData.specifications.length > 0
      ? initialData.specifications
      : [{ label: 'Structural Concrete', value: 'M60 Grade' }],
    coverImage: {
      url: initialData?.coverImage?.url || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80',
      alt: initialData?.coverImage?.alt || 'Civil infrastructure engineering project',
      caption: initialData?.coverImage?.caption || '',
      publicId: initialData?.coverImage?.publicId || ''
    },
    gallery: initialData?.gallery || [],
    video: {
      provider: initialData?.video?.provider || 'none',
      url: initialData?.video?.url || '',
      embedUrl: initialData?.video?.embedUrl || ''
    },
    seo: {
      title: initialData?.seo?.title || '',
      description: initialData?.seo?.description || '',
      keywords: initialData?.seo?.keywords?.join(', ') || ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  // Tab definitions
  const TABS = [
    { id: 'basic', label: '1. Basic & Location' },
    { id: 'timeline', label: '2. Status & Timeline' },
    { id: 'content', label: '3. Scope & Details' },
    { id: 'specs', label: '4. Specifications' },
    { id: 'media', label: '5. Cover & Gallery' },
    { id: 'video_seo', label: '6. Video & SEO' },
    { id: 'publish', label: '7. Publication' }
  ];

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  // Scope of work item helpers
  const handleScopeChange = (idx, val) => {
    const nextScope = [...formData.scopeOfWork];
    nextScope[idx] = val;
    setFormData(prev => ({ ...prev, scopeOfWork: nextScope }));
  };

  const addScopeItem = () => {
    setFormData(prev => ({ ...prev, scopeOfWork: [...prev.scopeOfWork, ''] }));
  };

  const removeScopeItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      scopeOfWork: prev.scopeOfWork.filter((_, i) => i !== idx)
    }));
  };

  // Specifications helpers
  const handleSpecChange = (idx, field, val) => {
    const nextSpecs = [...formData.specifications];
    nextSpecs[idx] = { ...nextSpecs[idx], [field]: val };
    setFormData(prev => ({ ...prev, specifications: nextSpecs }));
  };

  const addSpecItem = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }]
    }));
  };

  const removeSpecItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== idx)
    }));
  };

  // Gallery item helpers
  const addGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        { url: '', alt: '', caption: '', order: prev.gallery.length + 1 }
      ]
    }));
  };

  const handleGalleryChange = (idx, field, val) => {
    const nextGallery = [...formData.gallery];
    nextGallery[idx] = { ...nextGallery[idx], [field]: val };
    setFormData(prev => ({ ...prev, gallery: nextGallery }));
  };

  const removeGalleryItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
  };

  // Direct signed Cloudinary upload helper
  const handleDirectUpload = async (e, targetField = 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // 1. Request signature from backend API
      const sigRes = await fetch('/api/proxy/admin/media/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'nivara/projects' })
      });
      const sigData = await sigRes.json();

      if (!sigRes.ok || !sigData.success) {
        throw new Error(sigData.error || 'Failed to generate upload signature');
      }

      const { timestamp, signature, apiKey, cloudName, folder } = sigData.data;

      // 2. Direct upload to Cloudinary API
      const uploadForm = new FormData();
      uploadForm.append('file', file);
      uploadForm.append('api_key', apiKey);
      uploadForm.append('timestamp', timestamp);
      uploadForm.append('signature', signature);
      uploadForm.append('folder', folder);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: uploadForm }
      );
      const cloudData = await cloudRes.json();

      if (cloudData.secure_url) {
        if (targetField === 'cover') {
          setFormData(prev => ({
            ...prev,
            coverImage: {
              ...prev.coverImage,
              url: cloudData.secure_url,
              publicId: cloudData.public_id,
              alt: file.name
            }
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            gallery: [
              ...prev.gallery,
              {
                url: cloudData.secure_url,
                publicId: cloudData.public_id,
                alt: file.name,
                caption: '',
                order: prev.gallery.length + 1
              }
            ]
          }));
        }
      } else {
        throw new Error(cloudData.error?.message || 'Cloudinary upload rejected');
      }
    } catch (uploadErr) {
      setError(`Media upload notice: ${uploadErr.message}. You can also paste an absolute direct image URL.`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Pre-process keywords
    const keywordsArray = formData.seo.keywords
      ? formData.seo.keywords.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      coverImage: {
        ...formData.coverImage,
        url: formData.coverImage.url.trim() || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80',
        alt: formData.coverImage.alt.trim() || 'Civil infrastructure engineering project'
      },
      timeline: {
        startDate: formData.timeline.startDate || null,
        estimatedCompletionDate: formData.timeline.estimatedCompletionDate || null,
        completionDate: formData.timeline.completionDate || null
      },
      scopeOfWork: formData.scopeOfWork.filter(s => s && s.trim().length > 0),
      specifications: formData.specifications.filter(s => s && s.label && s.label.trim().length > 0 && s.value && s.value.trim().length > 0),
      gallery: formData.gallery.filter(item => item && item.url && item.url.trim().length > 0),
      seo: {
        ...formData.seo,
        keywords: keywordsArray
      }
    };

    try {
      const endpoint = isEdit
        ? `/api/proxy/admin/projects/${initialData._id}`
        : '/api/proxy/admin/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let errorMsg = data.error || 'Failed to save project. Please check required fields.';
        if (Array.isArray(data.details) && data.details.length > 0) {
          const detailStrings = data.details.map(d => `${d.field}: ${d.message}`);
          errorMsg = `Validation failed: ${detailStrings.join(' • ')}`;
        }
        throw new Error(errorMsg);
      }

      setSuccess(`Project ${isEdit ? 'updated' : 'created'} successfully!`);
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);
    } catch (err) {
      setError(err.message);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 bg-white border border-steel-300 hover:bg-steel-50 text-steel-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
              {isEdit ? 'Update Existing Project' : 'New Project Draft'}
            </span>
            <h1 className="text-2xl font-bold text-navy-900 font-display">
              {formData.title || 'Untitled Infrastructure Project'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Project</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-xs font-medium flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs font-medium flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Tabs Header */}
      <div className="border-b border-steel-200 bg-white flex items-center overflow-x-auto scrollbar-none shadow-sm">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 font-mono uppercase tracking-wider ${
              activeTab === tab.id
                ? 'border-industrial-orange text-navy-900 bg-steel-50'
                : 'border-transparent text-steel-500 hover:text-navy-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BASIC INFORMATION */}
      {activeTab === 'basic' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            1. Basic Project Identity & Geography
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleTextChange}
                placeholder="e.g. Godavari River Cable-Stayed Bridge"
                className="w-full px-4 py-2.5 border border-steel-300 text-sm font-semibold text-navy-900 focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Custom URL Slug (Optional)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleTextChange}
                placeholder="auto-generated-if-blank"
                className="w-full px-4 py-2 border border-steel-300 text-xs font-mono text-steel-700 focus:ring-1 focus:ring-industrial-orange"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Client / Authority Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleTextChange}
                placeholder="e.g. National Highway Infrastructure Authority"
                className="w-full px-4 py-2 border border-steel-300 text-xs text-steel-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Infrastructure Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-steel-300 bg-white text-xs text-navy-900 font-medium"
              >
                <option value="Highways & Bridges">Highways & Bridges</option>
                <option value="Urban & Transit">Urban & Transit</option>
                <option value="Industrial & Energy">Industrial & Energy</option>
                <option value="Commercial Infrastructure">Commercial Infrastructure</option>
                <option value="Water & Utilities">Water & Utilities</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Geographic Location / State <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleTextChange}
                placeholder="e.g. Rajahmundry, Andhra Pradesh"
                className="w-full px-4 py-2 border border-steel-300 text-xs text-navy-900 font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATUS & TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            2. Construction Lifecycle Status & Timeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Construction Execution Status <span className="text-rose-500">*</span>
              </label>
              <select
                name="constructionStatus"
                value={formData.constructionStatus}
                onChange={handleTextChange}
                className="w-full px-4 py-2.5 border border-steel-300 bg-white text-xs font-bold text-navy-900"
              >
                <option value="Planned">Planned (Tender Stage)</option>
                <option value="Ongoing">Ongoing (Active Construction)</option>
                <option value="Completed">Completed (Commissioned)</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Commencement Date
              </label>
              <input
                type="date"
                value={formData.timeline.startDate}
                onChange={(e) => handleNestedChange('timeline', 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-steel-300 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Estimated Completion Date
              </label>
              <input
                type="date"
                value={formData.timeline.estimatedCompletionDate}
                onChange={(e) => handleNestedChange('timeline', 'estimatedCompletionDate', e.target.value)}
                className="w-full px-4 py-2 border border-steel-300 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Actual Completion Date (if completed)
              </label>
              <input
                type="date"
                value={formData.timeline.completionDate}
                onChange={(e) => handleNestedChange('timeline', 'completionDate', e.target.value)}
                className="w-full px-4 py-2 border border-steel-300 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DESCRIPTIONS & SCOPE */}
      {activeTab === 'content' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            3. Project Descriptions & Civil Scope
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Executive Short Description (Max 400 characters) <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="shortDescription"
                rows={2}
                maxLength={400}
                required
                value={formData.shortDescription}
                onChange={handleTextChange}
                placeholder="Concise technical overview displayed on cards and search results..."
                className="w-full px-4 py-2.5 border border-steel-300 text-xs text-navy-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Comprehensive Engineering Overview <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="fullDescription"
                rows={7}
                required
                value={formData.fullDescription}
                onChange={handleTextChange}
                placeholder="In-depth narrative on geological conditions, engineering methodologies, equipment deployed..."
                className="w-full px-4 py-2.5 border border-steel-300 text-xs text-navy-900"
              />
            </div>

            {/* Scope of Work Items */}
            <div className="pt-4 border-t border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Key Scope Deliverables (List)
                </label>
                <button
                  type="button"
                  onClick={addScopeItem}
                  className="inline-flex items-center gap-1 text-xs text-industrial-orange font-bold hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Deliverable</span>
                </button>
              </div>

              {formData.scopeOfWork.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleScopeChange(idx, e.target.value)}
                    placeholder="e.g. Fabrication and erection of precast box girders"
                    className="flex-1 px-4 py-2 border border-steel-300 text-xs text-navy-900"
                  />
                  <button
                    type="button"
                    onClick={() => removeScopeItem(idx)}
                    className="p-2 text-steel-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPECIFICATIONS */}
      {activeTab === 'specs' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-steel-200 pb-2">
            <h2 className="text-base font-bold text-navy-900 font-display">
              4. Technical Engineering Specifications
            </h2>
            <button
              type="button"
              onClick={addSpecItem}
              className="inline-flex items-center gap-1 text-xs text-industrial-orange font-bold hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.specifications.map((spec, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                <input
                  type="text"
                  placeholder="Metric Label (e.g. Main Span)"
                  value={spec.label}
                  onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                  className="sm:col-span-2 px-3 py-2 border border-steel-300 text-xs font-semibold text-steel-700"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 480 meters)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                  className="sm:col-span-2 px-3 py-2 border border-steel-300 text-xs font-mono text-navy-900"
                />
                <button
                  type="button"
                  onClick={() => removeSpecItem(idx)}
                  className="p-2 text-steel-400 hover:text-rose-600 text-left sm:text-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MEDIA & GALLERY */}
      {activeTab === 'media' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Cover Image Section */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2 flex items-center justify-between">
              <span>Cover Image</span>
              {uploading && <span className="text-xs font-mono text-industrial-orange animate-pulse">Uploading file to Cloudinary...</span>}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Cover Image URL <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={formData.coverImage.url}
                    onChange={(e) => handleNestedChange('coverImage', 'url', e.target.value)}
                    placeholder="https://images.unsplash.com/... or uploaded Cloudinary URL"
                    className="flex-1 px-4 py-2 border border-steel-300 text-xs font-mono text-navy-900"
                  />
                  <label className="px-4 py-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-navy-800 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDirectUpload(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={formData.coverImage.alt}
                  onChange={(e) => handleNestedChange('coverImage', 'alt', e.target.value)}
                  placeholder="Descriptive alt text for accessibility"
                  className="w-full px-4 py-2 border border-steel-300 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Caption
                </label>
                <input
                  type="text"
                  value={formData.coverImage.caption}
                  onChange={(e) => handleNestedChange('coverImage', 'caption', e.target.value)}
                  placeholder="Caption displayed under cover image"
                  className="w-full px-4 py-2 border border-steel-300 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Gallery Items Section */}
          <div className="space-y-4 pt-6 border-t border-steel-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Additional Gallery Photographs
              </h3>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-steel-100 border border-steel-300 hover:bg-steel-200 text-navy-900 text-xs font-bold uppercase cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload To Gallery</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleDirectUpload(e, 'gallery')}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="inline-flex items-center gap-1 text-xs text-industrial-orange font-bold hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add URL</span>
                </button>
              </div>
            </div>

            {formData.gallery.map((item, idx) => (
              <div key={idx} className="p-4 bg-steel-50 border border-steel-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-steel-500">
                  <span>Photo #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(idx)}
                    className="text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={item.url}
                    onChange={(e) => handleGalleryChange(idx, 'url', e.target.value)}
                    className="sm:col-span-2 px-3 py-1.5 border border-steel-300 text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Caption"
                    value={item.caption}
                    onChange={(e) => handleGalleryChange(idx, 'caption', e.target.value)}
                    className="px-3 py-1.5 border border-steel-300 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: VIDEO & SEO */}
      {activeTab === 'video_seo' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Video Integration */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
              Video Showcase
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Video Provider
                </label>
                <select
                  value={formData.video.provider}
                  onChange={(e) => handleNestedChange('video', 'provider', e.target.value)}
                  className="w-full px-4 py-2 border border-steel-300 bg-white text-xs font-medium"
                >
                  <option value="none">None</option>
                  <option value="youtube">YouTube Embed</option>
                  <option value="vimeo">Vimeo Embed</option>
                  <option value="cloudinary">Cloudinary Hosted Video</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Video URL / Embed URL
                </label>
                <input
                  type="text"
                  value={formData.video.url}
                  onChange={(e) => handleNestedChange('video', 'url', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2 border border-steel-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Search Engine Optimization */}
          <div className="space-y-4 pt-6 border-t border-steel-200">
            <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
              SEO & Social Sharing Metadata
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Custom Page Title
                </label>
                <input
                  type="text"
                  value={formData.seo.title}
                  onChange={(e) => handleNestedChange('seo', 'title', e.target.value)}
                  placeholder="Leave blank to use default project title"
                  className="w-full px-4 py-2 border border-steel-300 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={formData.seo.description}
                  onChange={(e) => handleNestedChange('seo', 'description', e.target.value)}
                  placeholder="Custom search snippet description..."
                  className="w-full px-4 py-2 border border-steel-300 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.seo.keywords}
                  onChange={(e) => handleNestedChange('seo', 'keywords', e.target.value)}
                  placeholder="viaduct, marine construction, bridge, civil engineering"
                  className="w-full px-4 py-2 border border-steel-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PUBLICATION CONTROLS */}
      {activeTab === 'publish' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            7. Publication, Archival & Homepage Visibility
          </h2>

          <div className="space-y-6 max-w-xl">
            {/* Publication Status */}
            <div className="p-4 bg-steel-50 border border-steel-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 font-mono">
                Publication Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="publicationStatus"
                    value="Draft"
                    checked={formData.publicationStatus === 'Draft'}
                    onChange={handleTextChange}
                  />
                  <span>Draft (Hidden from public site)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="publicationStatus"
                    value="Published"
                    checked={formData.publicationStatus === 'Published'}
                    onChange={handleTextChange}
                  />
                  <span className="text-emerald-700">Published (Publicly Accessible)</span>
                </label>
              </div>
            </div>

            {/* Archive Status */}
            <div className="p-4 bg-steel-50 border border-steel-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 font-mono">
                Archive Lifecycle Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="archiveStatus"
                    value="Active"
                    checked={formData.archiveStatus === 'Active'}
                    onChange={handleTextChange}
                  />
                  <span>Active</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="archiveStatus"
                    value="Archived"
                    checked={formData.archiveStatus === 'Archived'}
                    onChange={handleTextChange}
                  />
                  <span className="text-rose-700">Archived (Removed from public view)</span>
                </label>
              </div>
            </div>

            {/* Featured toggle */}
            <div className="p-4 bg-steel-50 border border-steel-200 flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 font-mono">
                  Featured on Homepage
                </label>
                <p className="text-[11px] text-steel-500">
                  Highlight this project on the corporate homepage portfolio grid.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-5 h-5 accent-industrial-orange"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-steel-200">
        <Link
          href="/admin/projects"
          className="text-xs font-semibold text-steel-500 hover:text-navy-900"
        >
          Cancel and return to projects
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Update Project' : 'Publish / Save Project'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
