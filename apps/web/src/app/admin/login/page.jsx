'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  ShieldAlert,
  Terminal,
  Activity,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleKeyUp = (e) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'));
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@nivarainfra.com',
      password: 'NivaraAdmin2026!'
    });
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
    <div className="min-h-screen bg-navy-950 flex flex-col lg:flex-row text-white selection:bg-industrial-orange selection:text-white">
      {/* LEFT COLUMN: Visual Brand Showcase (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 xl:p-16 overflow-hidden border-r border-navy-800">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80"
            alt="Elevated marine expressway viaduct civil construction"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-15" />
        </div>

        {/* Top Branding */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 bg-industrial-orange flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-industrial-orange/30 group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-white uppercase font-display">
                Nivara
              </span>
              <span className="text-[10px] tracking-[0.25em] text-steel-400 font-medium uppercase">
                Infrastructure
              </span>
            </div>
          </Link>
        </div>

        {/* Center Narrative & Security Protocol */}
        <div className="relative z-10 space-y-6 max-w-lg my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-900/90 border border-steel-700 text-[11px] font-mono text-steel-300 uppercase tracking-wider backdrop-blur-sm">
            <Terminal className="w-3.5 h-3.5 text-industrial-orange" />
            <span>Operational Control Console v2.6</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-white font-display leading-tight">
            Centralized Infrastructure Telemetry & Portfolio Operations
          </h2>

          <p className="text-steel-300 text-sm leading-relaxed font-light">
            Secure command portal for managing multi-sector civil assets, Cloudinary media assets, tender requests, and high-frequency edge cache revalidation.
          </p>

          {/* Security Protocols List */}
          <div className="space-y-3 pt-4 border-t border-navy-800/80">
            <div className="flex items-center gap-3 text-xs text-steel-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-Trust Role-Based Authorization (Superadmin & Editor)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-steel-300">
              <Activity className="w-4 h-4 text-industrial-orange shrink-0" />
              <span>Real-Time Audit Logging on All Mutations & Deletions</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-steel-300">
              <Lock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Session Cryptography via HttpOnly SameSite Lax Cookies</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="relative z-10 pt-6 border-t border-navy-800 flex items-center justify-between text-[11px] font-mono text-steel-500">
          <span>PORTFOLIO CLUSTERS: 6 ACTIVE</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MONGODB ATLAS ENCRYPTED</span>
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Login Console */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 relative">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none lg:hidden" />

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 bg-industrial-orange flex items-center justify-center font-bold text-lg text-white">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-widest text-white uppercase font-display">
                Nivara
              </span>
              <span className="text-[9px] tracking-[0.25em] text-steel-400 font-medium uppercase">
                Infrastructure
              </span>
            </div>
          </Link>
          <Link href="/" className="text-xs text-steel-400 hover:text-white transition-colors">
            ← Public Site
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto relative z-10 space-y-8">
          {/* Form Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-orange/10 border border-industrial-orange/30 text-[11px] font-mono text-industrial-orange uppercase tracking-wider">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Identity Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
              Administrative Control Portal
            </h1>
            <p className="text-xs sm:text-sm text-steel-400">
              Enter your authorized staff credentials to access the Nivara Infrastructure portfolio management console.
            </p>
          </div>

          {/* Quick-Fill Demo Helper Badge */}
          <div className="p-3.5 bg-navy-900 border border-navy-700/80 rounded-none flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="font-semibold text-steel-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-industrial-orange" />
                <span>Quick Demonstration Access</span>
              </div>
              <p className="text-[11px] text-steel-400">Default Superadmin credentials pre-configured</p>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-3 py-1.5 bg-industrial-orange/15 hover:bg-industrial-orange/25 border border-industrial-orange/40 text-industrial-orange text-[11px] font-bold font-mono uppercase tracking-wider transition-colors shrink-0"
            >
              Auto-Fill
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-rose-500/10 border-l-4 border-rose-500 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-200">Authentication Failed</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* CapsLock Warning */}
          {capsLockActive && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Notice: Caps Lock is currently activated.</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-steel-300 font-mono"
              >
                Work Email Address
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
                  className="w-full pl-10 pr-4 py-3 bg-navy-900 border border-steel-700 text-sm text-white placeholder-steel-500 focus:outline-none focus:ring-2 focus:ring-industrial-orange/50 focus:border-industrial-orange font-mono transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-steel-300 font-mono"
                >
                  Security Key / Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-navy-900 border border-steel-700 text-sm text-white placeholder-steel-500 focus:outline-none focus:ring-2 focus:ring-industrial-orange/50 focus:border-industrial-orange font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-steel-500 hover:text-white p-1 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-industrial-orange/20 hover:shadow-industrial-orange/30 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating Security Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security & Return Footer */}
          <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel-400">
            <Link
              href="/"
              className="text-steel-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>← Return to Public Website</span>
            </Link>
            <span className="text-[11px] text-steel-500 font-mono">
              TLS 1.3 • AES-256 Protected
            </span>
          </div>
        </div>

        {/* Desktop Bottom Footnote */}
        <div className="hidden lg:block text-center text-[11px] text-steel-500 font-mono pt-8">
          Nivara Infrastructure Management Portal • Confidential Corporate System
        </div>
      </div>
    </div>
  );
}
