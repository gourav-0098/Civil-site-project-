'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Project Tender / RFP',
    projectLocation: '',
    subject: '',
    message: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '', referenceId: '' });

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Full name is required (min 2 characters)';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'A valid work email address is required';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject is required (min 3 characters)';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide details in your message (min 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus({ state: 'loading', message: '', referenceId: '' });

    try {
      const res = await fetch('/api/proxy/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setStatus({
        state: 'success',
        message: 'Your inquiry has been successfully transmitted to Nivara Infrastructure project development desk.',
        referenceId: data.data?.id || 'REF-NIVARA-' + Date.now().toString().slice(-6)
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        inquiryType: 'Project Tender / RFP',
        projectLocation: '',
        subject: '',
        message: '',
        honeypot: ''
      });
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.message || 'An unexpected error occurred while transmitting your inquiry.',
        referenceId: ''
      });
    }
  };

  if (status.state === 'success') {
    return (
      <div className="bg-white border border-steel-200 p-8 sm:p-10 shadow-lg text-center space-y-5 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-navy-900 font-display">
            Inquiry Successfully Transmitted
          </h3>
          <p className="text-steel-600 text-sm max-w-md mx-auto">
            {status.message}
          </p>
          <div className="pt-2 font-mono text-xs text-steel-400">
            Filing Reference ID: <span className="font-bold text-navy-900">{status.referenceId}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle', message: '', referenceId: '' })}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-steel-200 p-6 sm:p-10 shadow-md space-y-6">
      {status.state === 'error' && (
        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Anand Varma"
            className={`w-full px-4 py-2.5 border text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange ${
              errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-steel-300'
            }`}
          />
          {errors.name && <p className="text-xs text-rose-600">{errors.name}</p>}
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
            Work Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. anand.varma@organization.com"
            className={`w-full px-4 py-2.5 border text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange ${
              errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-steel-300'
            }`}
          />
          {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
            Phone / Contact Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-4 py-2.5 border border-steel-300 text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange"
          />
        </div>

        {/* Company / Organization */}
        <div className="space-y-1.5">
          <label htmlFor="organization" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
            Company / Public Entity
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
            placeholder="e.g. Regional Transport Authority"
            className="w-full px-4 py-2.5 border border-steel-300 text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange"
          />
        </div>

        {/* Inquiry Classification */}
        <div className="space-y-1.5">
          <label htmlFor="inquiryType" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
            Inquiry Category <span className="text-rose-500">*</span>
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-steel-300 text-sm text-navy-900 bg-white focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange"
          >
            <option value="Project Tender / RFP">Project Tender / RFP Submission</option>
            <option value="General Construction Inquiry">General Construction Inquiry</option>
            <option value="Partnership / Joint Venture">Partnership / Joint Venture</option>
            <option value="Vendor / Subcontractor">Vendor / Subcontractor Prequalification</option>
            <option value="Careers">Careers & Talent</option>
            <option value="Other">Other Institutional Inquiries</option>
          </select>
        </div>

        {/* Proposed Location */}
        <div className="space-y-1.5">
          <label htmlFor="projectLocation" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
            Target Project Location / State
          </label>
          <input
            id="projectLocation"
            name="projectLocation"
            type="text"
            value={formData.projectLocation}
            onChange={handleChange}
            placeholder="e.g. Maharashtra, Southern Corridor"
            className="w-full px-4 py-2.5 border border-steel-300 text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange"
          />
        </div>
      </div>

      {/* Subject Line */}
      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
          Inquiry Subject <span className="text-rose-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief summary of tender or infrastructure opportunity"
          className={`w-full px-4 py-2.5 border text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange ${
            errors.subject ? 'border-rose-500 bg-rose-50/20' : 'border-steel-300'
          }`}
        />
        {errors.subject && <p className="text-xs text-rose-600">{errors.subject}</p>}
      </div>

      {/* Detailed Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-steel-700">
          Scope / Project Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Provide project overview, anticipated delivery timeline, technical prerequisites, or tender guidelines..."
          className={`w-full px-4 py-2.5 border text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange ${
            errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-steel-300'
          }`}
        />
        {errors.message && <p className="text-xs text-rose-600">{errors.message}</p>}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-steel-500">
          Confidentiality assured. Data is stored securely and processed exclusively for tender correspondence.
        </p>
        <button
          type="submit"
          disabled={status.state === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-sm font-semibold tracking-wide transition-all shadow-md shadow-industrial-orange/20 disabled:opacity-50"
        >
          {status.state === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Transmit Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
