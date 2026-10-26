'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crest } from '../Crest';
import { Role } from '@/lib/types';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Layers, 
  RotateCcw, 
  BarChart3, 
  Film, 
  Newspaper, 
  Settings, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ExternalLink,
  UserCheck
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState<Role>('SUPER_ADMIN');

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Squad & Players', href: '/dashboard/players', icon: Users },
    { name: 'Matches & Fixtures', href: '/dashboard/matches', icon: Calendar },
    { name: 'Lineup Builder', href: '/dashboard/lineups', icon: Layers },
    { name: 'Workload & Rotation', href: '/dashboard/rotation', icon: RotateCcw },
    { name: 'Analytics & Stats', href: '/dashboard/statistics', icon: BarChart3 },
    { name: 'Media & Video', href: '/dashboard/media', icon: Film },
    { name: 'Club News CMS', href: '/dashboard/news', icon: Newspaper },
    { name: 'Club Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Users & Roles', href: '/dashboard/users', icon: ShieldCheck },
  ];

  const roles: Role[] = ['SUPER_ADMIN', 'CLUB_ADMIN', 'COACH', 'ANALYST', 'VIEWER'];

  return (
    <aside
      className={`bg-[#080B12] border-r border-[#283141] flex flex-col justify-between transition-all duration-300 relative z-30 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#283141]">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-2.5">
              <Crest size={32} showWordmark={true} />
            </Link>
          ) : (
            <Link href="/" className="mx-auto">
              <Crest size={32} />
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-[#111722] border border-[#283141] text-[#929BA9] hover:text-[#C6FF00] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Role Switcher (Simulator for testing permissions across all 5 roles) */}
        {!collapsed && (
          <div className="p-3 m-3 rounded-xl bg-[#111722] border border-[#283141]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#929BA9] mb-1.5">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-[#C6FF00]" /> Active Role
              </span>
              <span className="text-[#C6FF00] font-mono">Simulated</span>
            </div>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as Role)}
              className="w-full bg-[#171F2C] border border-[#283141] text-[#F5F7FA] text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#C6FF00]"
            >
              {roles.map(r => (
                <option key={r} value={r}>{r.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        )}

        {/* Nav Links */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_12px_rgba(198,255,0,0.3)] font-black'
                    : 'text-[#929BA9] hover:bg-[#111722] hover:text-[#F5F7FA]'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#283141] space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-[#929BA9] hover:text-[#C6FF00] hover:bg-[#111722] transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Exit to Public Club Site</span>}
        </Link>

        {!collapsed && (
          <div className="px-3 py-2 bg-[#111722] rounded-lg border border-[#283141] text-[10px] text-[#929BA9]">
            <div className="text-[#F5F7FA] font-bold">Coach FC Operations</div>
            <div className="text-[#22C55E] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Database Online • Production
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
