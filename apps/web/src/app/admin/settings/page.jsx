'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  KeyRound,
  UserPlus,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  UserCheck
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStatus, setPasswordStatus] = useState({ state: 'idle', message: '' });

  // Superadmin user management
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor'
  });
  const [userStatus, setUserStatus] = useState({ state: 'idle', message: '' });

  const loadProfile = async () => {
    try {
      const res = await fetch('/api/proxy/auth/me');
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/proxy/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch {
      // Non-superadmins will fail safely (403)
    }
  };

  useEffect(() => {
    loadProfile();
    loadUsers();
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ state: 'error', message: 'New passwords do not match' });
      return;
    }

    setPasswordStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch('/api/proxy/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update password');
      }

      setPasswordStatus({ state: 'success', message: 'Password updated securely' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordStatus({ state: 'idle', message: '' }), 4000);
    } catch (err) {
      setPasswordStatus({ state: 'error', message: err.message });
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setUserStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch('/api/proxy/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create user');
      }

      setUserStatus({ state: 'success', message: `Administrator account created for ${newUser.email}` });
      setNewUser({ name: '', email: '', password: '', role: 'editor' });
      loadUsers();
      setTimeout(() => setUserStatus({ state: 'idle', message: '' }), 4000);
    } catch (err) {
      setUserStatus({ state: 'error', message: err.message });
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      const res = await fetch(`/api/proxy/admin/users/${userId}/status`, {
        method: 'PATCH'
      });
      const data = await res.json();
      if (data.success) {
        loadUsers();
      } else {
        alert(data.error || 'Failed to update user status');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-steel-200 pb-5">
        <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
          Access Controls & Account Security
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
          Settings & Governance
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Identity Card */}
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-steel-200 pb-3">
            <UserCheck className="w-5 h-5 text-industrial-orange" />
            <h2 className="text-base font-bold text-navy-900 font-display">
              Active Security Profile
            </h2>
          </div>

          {currentUser ? (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-steel-50 border border-steel-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-steel-500 uppercase">Administrator:</span>
                  <span className="font-bold text-navy-900 font-sans">{currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-500 uppercase">Email:</span>
                  <span className="text-navy-900">{currentUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-500 uppercase">Role Authorization:</span>
                  <span className="px-2 py-0.5 bg-navy-950 text-white uppercase text-[10px] font-bold">
                    {currentUser.role}
                  </span>
                </div>
                {currentUser.lastLoginAt && (
                  <div className="flex justify-between">
                    <span className="text-steel-500 uppercase">Last Authenticated:</span>
                    <span className="text-steel-600">
                      {new Date(currentUser.lastLoginAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-steel-500">Loading user profile...</p>
          )}

          {/* Change Password Form */}
          <div className="pt-4 border-t border-steel-200 space-y-4">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-steel-600" />
              <h3 className="text-sm font-bold text-navy-900 font-display">
                Update Security Password
              </h3>
            </div>

            {passwordStatus.state === 'error' && (
              <div className="p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordStatus.message}</span>
              </div>
            )}

            {passwordStatus.state === 'success' && (
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passwordStatus.message}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-steel-700">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-steel-300 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-steel-700">
                  New Password (Min 8 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-steel-300 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-steel-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-steel-300 text-xs font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={passwordStatus.state === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {passwordStatus.state === 'loading' ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Superadmin User Management */}
        <div className="bg-white border border-steel-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-steel-200 pb-3">
            <Users className="w-5 h-5 text-industrial-orange" />
            <h2 className="text-base font-bold text-navy-900 font-display">
              User Governance (Superadmin Only)
            </h2>
          </div>

          {currentUser?.role === 'superadmin' ? (
            <div className="space-y-6">
              {/* Existing Users Table */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-steel-500 font-semibold">
                  Registered Administrative Accounts
                </span>
                <div className="divide-y divide-steel-100 border border-steel-200 text-xs">
                  {users.map(u => (
                    <div key={u._id} className="p-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-navy-900">{u.name}</p>
                        <p className="text-steel-500 text-[11px] font-mono">{u.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold bg-steel-100 text-navy-900">
                          {u.role}
                        </span>
                        {u._id !== currentUser.id && (
                          <button
                            type="button"
                            onClick={() => handleToggleUserStatus(u._id)}
                            className={`px-2 py-0.5 text-[10px] font-mono font-semibold ${
                              u.isActive ? 'text-rose-600 hover:underline' : 'text-emerald-600 hover:underline'
                            }`}
                          >
                            {u.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create User Form */}
              <div className="pt-4 border-t border-steel-200 space-y-4">
                <h3 className="text-sm font-bold text-navy-900 font-display flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-steel-600" />
                  <span>Provision New Staff Account</span>
                </h3>

                {userStatus.state === 'error' && (
                  <div className="p-3 bg-rose-50 text-rose-700 text-xs">{userStatus.message}</div>
                )}
                {userStatus.state === 'success' && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs">{userStatus.message}</div>
                )}

                <form onSubmit={handleCreateUser} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={newUser.name}
                      onChange={(e) => setNewUser(p => ({ ...p, name: e.target.value }))}
                      className="px-3 py-2 border border-steel-300 text-xs"
                    />
                    <input
                      type="email"
                      placeholder="Work Email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser(p => ({ ...p, email: e.target.value }))}
                      className="px-3 py-2 border border-steel-300 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="password"
                      placeholder="Initial Password (Min 8)"
                      required
                      minLength={8}
                      value={newUser.password}
                      onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))}
                      className="px-3 py-2 border border-steel-300 text-xs font-mono"
                    />
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(p => ({ ...p, role: e.target.value }))}
                      className="px-3 py-2 border border-steel-300 bg-white text-xs font-semibold"
                    >
                      <option value="editor">Editor (Projects & Inquiries)</option>
                      <option value="superadmin">Superadmin (Full Control)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={userStatus.state === 'loading'}
                    className="w-full py-2 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {userStatus.state === 'loading' ? 'Provisioning...' : 'Provision User Account'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-steel-50 border border-steel-200 text-steel-500 text-xs space-y-2">
              <Shield className="w-6 h-6 text-steel-400" />
              <p className="font-semibold text-navy-900">Editor Access Level</p>
              <p>
                Administrative account provisioning and global user governance are reserved for Superadmin security credentials.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
