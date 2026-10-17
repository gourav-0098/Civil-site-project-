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
  Sparkles,
  Building,
  Home,
  Tag,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';
import { compressImageBeforeUpload, formatBytes } from '../../lib/clientImageCompressor';

const COMMON_AMENITIES = [
  '24/7 Security & CCTV',
  'Clubhouse',
  'Swimming Pool',
  'Equipped Gymnasium',
  'Landscaped Gardens',
  'Children’s Play Area',
  '100% Power Backup',
  'Covered Car Parking',
  'High-Speed Elevators',
  'Indoor Games Room',
  'Jogging / Walking Track',
  'EV Charging Points'
];

export default function ProjectForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    developerName: initialData?.developerName || initialData?.clientName || '',
    clientName: initialData?.clientName || '',
    category: initialData?.category || 'Residential Flats & Apartments',
    location: initialData?.location || '',
    price: initialData?.price || '',
    priceNumeric: initialData?.priceNumeric || 0,
    configuration: initialData?.configuration || '',
    area: initialData?.area || '',
    amenities: initialData?.amenities || [],
    reraId: initialData?.reraId || '',
    possessionDate: initialData?.possessionDate || '',
    constructionStatus: initialData?.constructionStatus || 'Under Construction',
    publicationStatus: initialData?.publicationStatus || 'Draft',
    archiveStatus: initialData?.archiveStatus || 'Active',
    isFeatured: initialData?.isFeatured || false,
    isDemo: initialData?.isDemo || false,
    timeline: {
      startDate: initialData?.timeline?.startDate ? initialData.timeline.startDate.slice(0, 10) : '',
      estimatedCompletionDate: initialData?.timeline?.estimatedCompletionDate ? initialData.timeline.estimatedCompletionDate.slice(0, 10) : '',
      completionDate: initialData?.timeline?.completionDate ? initialData.timeline.completionDate.slice(0, 10) : ''
    },
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    scopeOfWork: initialData?.scopeOfWork || [],
    specifications: initialData?.specifications || [],
    coverImage: {
      url: initialData?.coverImage?.url || '',
      alt: initialData?.coverImage?.alt || '',
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
  const [uploadProgress, setUploadProgress] = useState(null);
  const [newAmenityInput, setNewAmenityInput] = useState('');

  // Tab definitions for Property Management
  const TABS = [
    { id: 'basic', label: '1. Basic & Developer' },
    { id: 'pricing', label: '2. Pricing & Units' },
    { id: 'content', label: '3. Overview & Highlights' },
    { id: 'amenities_specs', label: '4. Amenities & Specs' },
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

  // Amenities helpers
  const toggleAmenity = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const addCustomAmenity = () => {
    if (!newAmenityInput.trim()) return;
    const trimmed = newAmenityInput.trim();
    if (!formData.amenities.includes(trimmed)) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, trimmed] }));
    }
    setNewAmenityInput('');
  };

  // Highlights / Assistance items
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

  // Direct signed Cloudinary upload helper (with browser-native image compression)
  const handleDirectUpload = async (e, targetField = 'cover') => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress({ current: 0, total: files.length, status: `Preparing ${files.length} file(s)...` });
    setError('');

    try {
      const sigRes = await fetch('/api/proxy/admin/media/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'nivara/properties' })
      });
      const sigData = await sigRes.json();

      if (!sigRes.ok || !sigData.success) {
        throw new Error(sigData.error || 'Failed to generate upload signature');
      }

      const { timestamp, signature, apiKey, cloudName, folder } = sigData.data;

      if (targetField === 'cover') {
        const rawFile = files[0];
        setUploadProgress({ current: 0, total: 1, status: `Compressing cover image (${formatBytes(rawFile.size)})...` });

        // In-browser compression before network transfer
        const { file: uploadFile, originalSize, compressedSize, wasCompressed, reductionPercent } =
          await compressImageBeforeUpload(rawFile);

        const statusMsg = wasCompressed
          ? `Uploading compressed cover (${formatBytes(originalSize)} → ${formatBytes(compressedSize)}, -${reductionPercent}%)...`
          : `Uploading cover (${formatBytes(uploadFile.size)})...`;

        setUploadProgress({ current: 1, total: 1, status: statusMsg });

        const uploadForm = new FormData();
        uploadForm.append('file', uploadFile);
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
          setFormData(prev => ({
            ...prev,
            coverImage: {
              ...prev.coverImage,
              url: cloudData.secure_url,
              publicId: cloudData.public_id,
              alt: rawFile.name
            }
          }));
        } else {
          throw new Error(cloudData.error?.message || 'Cloudinary upload rejected');
        }
      } else {
        // Multi-image batch upload for gallery directly to Cloudinary with progressive compression
        const uploadedItems = [];
        let completed = 0;

        for (let i = 0; i < files.length; i++) {
          const rawFile = files[i];

          setUploadProgress({
            current: i + 1,
            total: files.length,
            status: `Compressing image ${i + 1} of ${files.length} (${formatBytes(rawFile.size)})...`
          });

          // In-browser compression before network transfer
          const { file: uploadFile, originalSize, compressedSize, wasCompressed, reductionPercent } =
            await compressImageBeforeUpload(rawFile);

          const statusMsg = wasCompressed
            ? `Uploading ${i + 1}/${files.length} (${formatBytes(originalSize)} → ${formatBytes(compressedSize)}, -${reductionPercent}%)...`
            : `Uploading ${i + 1}/${files.length} (${formatBytes(uploadFile.size)})...`;

          setUploadProgress({
            current: i + 1,
            total: files.length,
            status: statusMsg
          });

          const uploadForm = new FormData();
          uploadForm.append('file', uploadFile);
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
            uploadedItems.push({
              url: cloudData.secure_url,
              publicId: cloudData.public_id,
              alt: rawFile.name,
              caption: '',
              order: (formData.gallery?.length || 0) + uploadedItems.length + 1
            });
          } else {
            console.warn(`Failed to upload ${rawFile.name}:`, cloudData.error?.message);
          }
          completed++;
        }

        if (uploadedItems.length > 0) {
          setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, ...uploadedItems]
          }));
        }
      }
    } catch (uploadErr) {
      setError(`Media upload notice: ${uploadErr.message}. You can also paste an absolute direct image URL.`);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      e.target.value = '';
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

    // Validation guard: If publishing, coverImage is required
    if (formData.publicationStatus === 'Published' && !formData.coverImage.url.trim()) {
      setError('A valid cover image is required to publish this property listing.');
      setLoading(false);
      setActiveTab('media');
      return;
    }

    const payload = {
      ...formData,
      clientName: formData.developerName || formData.clientName || '',
      developerName: formData.developerName || '',
      coverImage: {
        ...formData.coverImage,
        url: formData.coverImage.url.trim(),
        alt: formData.coverImage.alt.trim() || formData.title
      },
      priceNumeric: Number(formData.priceNumeric) || 0,
      timeline: {
        startDate: formData.timeline.startDate || null,
        estimatedCompletionDate: formData.timeline.estimatedCompletionDate || null,
        completionDate: formData.timeline.completionDate || null
      },
      scopeOfWork: formData.scopeOfWork.filter(s => s && s.trim().length > 0),
      specifications: formData.specifications.filter(s => s && s.label && s.label.trim().length > 0 && s.value && s.value.trim().length > 0),
      gallery: formData.gallery.filter(item => item && item.url && item.url.trim().length > 0),
      amenities: formData.amenities.filter(Boolean),
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
        let errorMsg = data.error || 'Failed to save property. Please check required fields.';
        if (Array.isArray(data.details) && data.details.length > 0) {
          const detailStrings = data.details.map(d => `${d.field}: ${d.message}`);
          errorMsg = `Validation failed: ${detailStrings.join(' • ')}`;
        }
        throw new Error(errorMsg);
      }

      setSuccess(`Property ${isEdit ? 'updated' : 'created'} successfully!`);
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
              {isEdit ? 'Update Property Listing' : 'New Property Listing Draft'}
            </span>
            <h1 className="text-2xl font-bold text-navy-900 font-display">
              {formData.title || 'Untitled Property Listing'}
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
                <span>Save Property</span>
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

      {/* TAB 1: BASIC INFORMATION & DEVELOPER */}
      {activeTab === 'basic' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            1. Property Identity & Developer Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Property / Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleTextChange}
                placeholder="e.g. The Skyview Residences"
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
                Developer / Builder Name
              </label>
              <input
                type="text"
                name="developerName"
                value={formData.developerName}
                onChange={handleTextChange}
                placeholder="e.g. Horizon Luxury Estates Ltd."
                className="w-full px-4 py-2 border border-steel-300 text-xs text-steel-900"
              />
              <p className="text-[11px] text-steel-500">
                Identifies the actual builder. The site displays: &ldquo;Marketed by Nivara • Developed by [Developer]&rdquo;.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Property Category / Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-steel-300 bg-white text-xs text-navy-900 font-medium"
              >
                <option value="Residential Flats & Apartments">Residential Flats & Apartments</option>
                <option value="Residential Societies & Gated Communities">Residential Societies & Gated Communities</option>
                <option value="Luxury Residences">Luxury Residences & Penthouses</option>
                <option value="Commercial Properties">Commercial Properties & Office Suites</option>
                <option value="Residential Plots">Residential Plots & Land</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Geographic Location / City / Neighborhood <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleTextChange}
                placeholder="e.g. Worli Sea Face, Mumbai"
                className="w-full px-4 py-2 border border-steel-300 text-xs text-navy-900 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                RERA / Registration ID (Optional)
              </label>
              <input
                type="text"
                name="reraId"
                value={formData.reraId}
                onChange={handleTextChange}
                placeholder="e.g. P51900024881 (Only enter if verified)"
                className="w-full px-4 py-2 border border-steel-300 text-xs text-steel-900 font-mono"
              />
              <p className="text-[11px] text-steel-500">
                Never invent a RERA number. Leave empty if unverified.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRICING & UNITS */}
      {activeTab === 'pricing' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            2. Pricing, Configuration & Construction Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Price / Price Range (Display)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleTextChange}
                placeholder="e.g. ₹95 Lakh – ₹1.65 Cr or ₹75 Lakh onwards"
                className="w-full px-4 py-2.5 border border-steel-300 text-xs font-bold text-navy-900"
              />
              <p className="text-[11px] text-steel-500">
                Customer-facing pricing text. Leave blank if Price on Request.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Numeric Starting Price (for sorting)
              </label>
              <input
                type="number"
                name="priceNumeric"
                value={formData.priceNumeric}
                onChange={handleTextChange}
                placeholder="e.g. 9500000"
                className="w-full px-4 py-2.5 border border-steel-300 text-xs font-mono text-navy-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Configuration / Unit Types
              </label>
              <input
                type="text"
                name="configuration"
                value={formData.configuration}
                onChange={handleTextChange}
                placeholder="e.g. 2 & 3 BHK Apartments or 4 BHK Villas"
                className="w-full px-4 py-2 border border-steel-300 text-xs text-navy-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Property Area / Carpet Size
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleTextChange}
                placeholder="e.g. 1,280 – 1,940 sq.ft. or 30x40 sq.yd."
                className="w-full px-4 py-2 border border-steel-300 text-xs text-navy-900 font-mono"
              />
              <p className="text-[11px] text-steel-500">
                Always include the measurement unit (e.g. sq.ft., sq.yd., or acres).
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Availability / Construction Status <span className="text-rose-500">*</span>
              </label>
              <select
                name="constructionStatus"
                value={formData.constructionStatus}
                onChange={handleTextChange}
                className="w-full px-4 py-2.5 border border-steel-300 bg-white text-xs font-bold text-navy-900"
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Upcoming / Pre-Launch">Upcoming / Pre-Launch</option>
                <option value="Completed">Completed</option>
                <option value="Planned">Planned</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Possession Timeline (Text)
              </label>
              <input
                type="text"
                name="possessionDate"
                value={formData.possessionDate}
                onChange={handleTextChange}
                placeholder="e.g. Ready to Move or December 2026"
                className="w-full px-4 py-2 border border-steel-300 text-xs text-navy-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DESCRIPTIONS & HIGHLIGHTS */}
      {activeTab === 'content' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
            3. Property Marketing Descriptions & Highlights
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Short Marketing Summary (Card & Search results) <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="shortDescription"
                rows={2}
                maxLength={400}
                required
                value={formData.shortDescription}
                onChange={handleTextChange}
                placeholder="Provide a concise marketing summary of the property..."
                className="w-full px-4 py-2.5 border border-steel-300 text-xs text-navy-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                Full Property Description & Neighborhood Overview <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="fullDescription"
                rows={7}
                required
                value={formData.fullDescription}
                onChange={handleTextChange}
                placeholder="Detailed property narrative including layout benefits, architectural finishes, connectivity, and developer background..."
                className="w-full px-4 py-2.5 border border-steel-300 text-xs text-navy-900"
              />
            </div>

            {/* Nivara Buyer Assistance Highlights */}
            <div className="pt-4 border-t border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Nivara Assistance Points for this Property (List)
                </label>
                <button
                  type="button"
                  onClick={addScopeItem}
                  className="inline-flex items-center gap-1 text-xs text-industrial-orange font-bold hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Point</span>
                </button>
              </div>

              {formData.scopeOfWork.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleScopeChange(idx, e.target.value)}
                    placeholder="e.g. Scheduled site tour with sample flat inspection"
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

      {/* TAB 4: AMENITIES & SPECIFICATIONS */}
      {activeTab === 'amenities_specs' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2">
              Property Amenities & Lifestyle Features
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {COMMON_AMENITIES.map(amenity => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-2.5 text-xs text-left border transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-industrial-orange/10 border-industrial-orange text-navy-900 font-semibold'
                        : 'bg-white border-steel-200 text-steel-600 hover:border-steel-400'
                    }`}
                  >
                    <span>{amenity}</span>
                    {isSelected && <span className="text-industrial-orange font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2 pt-2 max-w-md">
              <input
                type="text"
                value={newAmenityInput}
                onChange={(e) => setNewAmenityInput(e.target.value)}
                placeholder="Add custom amenity (e.g. Squash Court)"
                className="flex-1 px-3 py-1.5 border border-steel-300 text-xs"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="px-4 py-1.5 bg-navy-900 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div className="space-y-4 pt-6 border-t border-steel-200">
            <div className="flex items-center justify-between border-b border-steel-200 pb-2">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Property Dimensions & Technical Specs
              </h3>
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
                    placeholder="Metric Label (e.g. Tower Height)"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                    className="sm:col-span-2 px-3 py-2 border border-steel-300 text-xs font-semibold text-steel-700"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. G+32 Floors)"
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
        </div>
      )}

      {/* TAB 5: MEDIA & GALLERY */}
      {activeTab === 'media' && (
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Cover Image Section */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-navy-900 font-display border-b border-steel-200 pb-2 flex items-center justify-between">
              <span>Primary Property Cover Image</span>
              {uploading && (
                <span className="text-xs font-mono text-industrial-orange animate-pulse">
                  {uploadProgress?.status || 'Uploading file to Cloudinary...'}
                </span>
              )}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Cover Image URL (Direct Cloudinary Upload or Link)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.coverImage.url}
                    onChange={(e) => handleNestedChange('coverImage', 'url', e.target.value)}
                    placeholder="https://images.unsplash.com/... or upload directly"
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
                  placeholder="e.g. Modern residential apartment tower"
                  className="w-full px-4 py-2 border border-steel-300 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={formData.coverImage.caption}
                  onChange={(e) => handleNestedChange('coverImage', 'caption', e.target.value)}
                  placeholder="e.g. Exterior facade view"
                  className="w-full px-4 py-2 border border-steel-300 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Gallery Items Section */}
          <div className="space-y-4 pt-6 border-t border-steel-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-steel-200 pb-2">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Additional Property Photographs & Floorplans
                </h3>
                {uploading && uploadProgress && (
                  <p className="text-xs font-mono text-industrial-orange animate-pulse mt-0.5">
                    {uploadProgress.status || `Uploading ${uploadProgress.current} of ${uploadProgress.total} images...`}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-steel-100 border border-steel-300 hover:bg-steel-200 text-navy-900 text-xs font-bold uppercase cursor-pointer transition-colors shadow-sm">
                  <Upload className="w-3.5 h-3.5 text-industrial-orange" />
                  <span>Upload Multiple Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
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
                    placeholder="Caption (e.g. Master Bedroom)"
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
              Virtual Property Tour & Video
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
                  placeholder="Leave blank to use default property title"
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
                  placeholder="Custom search snippet description for homebuyers..."
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
                  placeholder="apartments, luxury residences, flats for sale, property"
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
                  Highlight this property on the homepage featured listings grid.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-5 h-5 accent-industrial-orange"
              />
            </div>

            {/* Demonstration Property toggle */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 font-mono">
                  Demonstration / Sample Listing
                </label>
                <p className="text-[11px] text-steel-600">
                  Mark this property as a demonstration listing. It will be clearly labelled to public visitors as simulated preview content.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.isDemo}
                onChange={(e) => setFormData(prev => ({ ...prev, isDemo: e.target.checked }))}
                className="w-5 h-5 accent-amber-600"
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
          Cancel and return to properties
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
              <span>{isEdit ? 'Update Property' : 'Publish / Save Property'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
