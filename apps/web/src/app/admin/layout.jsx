'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  User,
  PlusCircle
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects Portfolio', icon: FolderKanban },
  { href: '/admin/inquiries', label: 'Inquiries & Tenders', icon: Inbox },
  { href: '/admin/settings', label: 'Settings & Security', icon: Settings }
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Verify session
    async function checkAuth() {
      try {
        const res = await fetch('/api/proxy/auth/me');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.success && data.data) {
          setCurrentUser(data.data);
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        console.error('Session check error:', err);
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/proxy/auth/logout', { method: 'POST' });
    } catch {
      // Ignore
    }
    router.replace('/admin/login');
  };

  // If on login page, render child without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-navy-950 text-white">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center space-y-4 text-white">
        <div className="w-10 h-10 border-4 border-industrial-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono uppercase tracking-widest text-steel-400">
          Authenticating Nivara Security Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-steel-100 flex flex-col md:flex-row text-navy-900">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-950 text-white border-b border-navy-800 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-industrial-orange flex items-center justify-center font-bold text-sm text-white">
            N
          </div>
          <span className="font-bold tracking-wider text-sm font-display uppercase">
            Nivara CMS
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-steel-400 hover:text-white"
          aria-label="Toggle admin sidebar"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-navy-950 text-white border-r border-navy-800 flex flex-col justify-between z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Wordmark */}
          <div className="p-6 border-b border-navy-800 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-industrial-orange flex items-center justify-center font-bold text-lg text-white">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-widest text-white uppercase font-display">
                  Nivara
                </span>
                <span className="text-[9px] tracking-[0.25em] text-steel-400 font-medium uppercase">
                  Control Center
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Create Action */}
          <div className="p-4 border-b border-navy-800">
            <Link
              href="/admin/projects/new"
              onClick={() => setSidebarOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Project</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {ADMIN_NAV.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-navy-900 text-industrial-orange border-l-4 border-industrial-orange font-bold'
                      : 'text-steel-400 hover:text-white hover:bg-navy-900/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account & Bottom Actions */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 space-y-3">
          {currentUser && (
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-steel-300">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">{currentUser.name}</span>
                <span className="text-[10px] text-steel-400 font-mono capitalize">
                  {currentUser.role}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-navy-900 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-steel-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
