'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/proxy/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      router.replace('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 bg-industrial-orange flex items-center justify-center font-bold text-2xl text-white shadow-lg">
            N
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-bold tracking-widest text-white uppercase font-display">
              Nivara
            </span>
            <span className="text-[10px] tracking-[0.25em] text-steel-400 font-medium uppercase">
              Infrastructure
            </span>
          </div>
        </Link>
        <h2 className="text-xl font-bold text-white tracking-wide font-display pt-2">
          Administrative Control Portal
        </h2>
        <p className="text-xs text-steel-400 font-mono">
          Authorized personnel only • All sessions monitored
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-navy-900 border border-navy-800 py-8 px-6 sm:px-10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 bg-rose-500/10 border-l-4 border-rose-500 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-steel-300 font-mono">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@nivarainfra.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-navy-950 border border-steel-700 text-sm text-white placeholder-steel-500 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-steel-300 font-mono">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-navy-950 border border-steel-700 text-sm text-white placeholder-steel-500 focus:outline-none focus:ring-1 focus:ring-industrial-orange focus:border-industrial-orange font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-navy-800 text-center">
            <Link
              href="/"
              className="text-xs text-steel-400 hover:text-white transition-colors"
            >
              ← Return to Corporate Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
