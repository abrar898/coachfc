'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db';
import { User, Role } from '@/lib/types';
import { 
  ShieldCheck, 
  Users, 
  Plus, 
  Check, 
  X, 
  Lock, 
  Key, 
  UserCheck 
} from 'lucide-react';

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<User[]>(() => db.getUsers());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'COACH' as Role,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: form.name,
      email: form.email,
      role: form.role,
      avatarUrl: form.avatarUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  const permissionsMatrix = [
    { module: 'Club & System Settings', superAdmin: true, clubAdmin: true, coach: false, analyst: false, viewer: false },
    { module: 'Register & Edit Players', superAdmin: true, clubAdmin: true, coach: true, analyst: false, viewer: false },
    { module: 'Create Fixtures & Scorelines', superAdmin: true, clubAdmin: true, coach: true, analyst: false, viewer: false },
    { module: 'Live Match Event & Minute Recorder', superAdmin: true, clubAdmin: true, coach: true, analyst: true, viewer: false },
    { module: 'Tactical Lineup & Formation Builder', superAdmin: true, clubAdmin: false, coach: true, analyst: true, viewer: false },
    { module: 'Squad Rotation Simulator', superAdmin: true, clubAdmin: false, coach: true, analyst: true, viewer: true },
    { module: 'Publish News Articles', superAdmin: true, clubAdmin: true, coach: false, analyst: false, viewer: false },
    { module: 'Manage Media & Video Streams', superAdmin: true, clubAdmin: true, coach: false, analyst: false, viewer: false },
    { module: 'User & Role Access Management', superAdmin: true, clubAdmin: false, coach: false, analyst: false, viewer: false },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Security & Access Control
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            USERS & ROLE-BASED PERMISSIONS
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Manage authenticated staff members, assign system roles, and audit access across Coach FC operations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Provision User Access</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#171F2C] border-b border-[#283141] flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-[#F5F7FA]">
            Authorized System Accounts ({users.length})
          </h3>
          <span className="text-[10px] font-mono text-[#22C55E]">
            ● All Accounts Active & Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171F2C]/50 border-b border-[#283141] text-[#929BA9] font-mono uppercase">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-center">Assigned Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#283141]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#171F2C]/50 transition-colors">
                  <td className="p-4 font-bold text-[#F5F7FA] flex items-center gap-3">
                    <img
                      src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border border-[#283141]"
                    />
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 font-mono text-[#929BA9]">{u.email}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                      u.role === 'SUPER_ADMIN' ? 'bg-[#C6FF00] text-[#080B12]' :
                      u.role === 'COACH' ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40' :
                      u.role === 'ANALYST' ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/40' :
                      'bg-[#171F2C] text-[#F5F7FA] border border-[#283141]'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[#929BA9]">{u.createdAt}</td>
                  <td className="p-4 text-center">
                    <span className="text-[#22C55E] font-bold text-[10px] flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Matrix */}
      <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8">
        <div className="pb-4 border-b border-[#283141] mb-6">
          <h3 className="text-base font-black uppercase text-[#F5F7FA] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C6FF00]" />
            Role Capability & Permission Matrix
          </h3>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Defines the server-enforced authorization rules for each operational tier.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
              <tr>
                <th className="p-3">Module / Capability</th>
                <th className="p-3 text-center">Super Admin</th>
                <th className="p-3 text-center">Club Admin</th>
                <th className="p-3 text-center">Coach</th>
                <th className="p-3 text-center">Analyst</th>
                <th className="p-3 text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#283141]">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#171F2C]/40 transition-colors">
                  <td className="p-3 font-bold text-[#F5F7FA]">{row.module}</td>
                  <td className="p-3 text-center">
                    {row.superAdmin ? <Check className="w-4 h-4 text-[#C6FF00] mx-auto" /> : <X className="w-4 h-4 text-[#EF4444]/40 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {row.clubAdmin ? <Check className="w-4 h-4 text-[#C6FF00] mx-auto" /> : <X className="w-4 h-4 text-[#EF4444]/40 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {row.coach ? <Check className="w-4 h-4 text-[#C6FF00] mx-auto" /> : <X className="w-4 h-4 text-[#EF4444]/40 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {row.analyst ? <Check className="w-4 h-4 text-[#C6FF00] mx-auto" /> : <X className="w-4 h-4 text-[#EF4444]/40 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {row.viewer ? <Check className="w-4 h-4 text-[#C6FF00] mx-auto" /> : <X className="w-4 h-4 text-[#EF4444]/40 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA]">Provision Staff Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thomas Tuchel"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="coach@coachfc.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Assigned Operational Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="COACH">Coach (Lineups, Tactics & Participation)</option>
                  <option value="ANALYST">Analyst (Stats & Tactical Logging)</option>
                  <option value="CLUB_ADMIN">Club Admin (Content, Fixtures & Roster)</option>
                  <option value="SUPER_ADMIN">Super Admin (Full System Control)</option>
                  <option value="VIEWER">Viewer (Read-Only Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#283141]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#171F2C] text-[#F5F7FA] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] font-black uppercase tracking-wider hover:bg-[#B2E600]"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
