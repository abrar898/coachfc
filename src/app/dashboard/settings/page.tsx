'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db';
import { ClubSettings } from '@/lib/types';
import { Settings, Save, Check, ShieldCheck, Sliders } from 'lucide-react';

export default function DashboardSettingsPage() {
  const [settings, setSettings] = useState<ClubSettings>(() => db.getClubSettings());
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateClubSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="pb-6 border-b border-[#283141]">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
          <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
          Club Identity & Sports Science Configuration
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
          CLUB SETTINGS & THRESHOLDS
        </h1>
        <p className="text-xs text-[#929BA9] mt-0.5">
          Configure stadium capacity, active campaign, and workload alert parameters used by the squad rotation engine.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/40 text-[#22C55E] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Club settings and workload alert parameters successfully updated!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand & Organization Block */}
        <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-black uppercase text-[#F5F7FA] pb-3 border-b border-[#283141] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
            Club Identity & Leadership
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Official Club Name</label>
              <input
                type="text"
                required
                value={settings.clubName}
                onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Short Name / Code</label>
              <input
                type="text"
                required
                value={settings.clubShortName}
                onChange={(e) => setSettings({ ...settings, clubShortName: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Club Nickname</label>
              <input
                type="text"
                value={settings.nickname}
                onChange={(e) => setSettings({ ...settings, nickname: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Founded Year</label>
              <input
                type="number"
                value={settings.foundedYear}
                onChange={(e) => setSettings({ ...settings, foundedYear: Number(e.target.value) })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Head Coach / Manager</label>
              <input
                type="text"
                value={settings.manager}
                onChange={(e) => setSettings({ ...settings, manager: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Club President</label>
              <input
                type="text"
                value={settings.president}
                onChange={(e) => setSettings({ ...settings, president: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          </div>
        </div>

        {/* Stadium & Venue Block */}
        <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-black uppercase text-[#F5F7FA] pb-3 border-b border-[#283141]">
            Home Arena & Matchday Venue
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Stadium Name</label>
              <input
                type="text"
                required
                value={settings.stadiumName}
                onChange={(e) => setSettings({ ...settings, stadiumName: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Seated Capacity</label>
              <input
                type="text"
                value={settings.stadiumCapacity}
                onChange={(e) => setSettings({ ...settings, stadiumCapacity: e.target.value })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          </div>
        </div>

        {/* Sports Science Workload Configuration */}
        <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-black uppercase text-[#F5F7FA] pb-3 border-b border-[#283141] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C6FF00]" />
            Workload & Fatigue Club Rules
          </h3>
          <p className="text-xs text-[#929BA9]">
            These thresholds power the automatic warnings on the Squad Rotation & Matchday Planner.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">
                Cumulative Fatigue Minute Cap (Last 3 Fixtures)
              </label>
              <input
                type="number"
                min="180"
                max="360"
                value={settings.highWorkloadMinutesThreshold}
                onChange={(e) => setSettings({ ...settings, highWorkloadMinutesThreshold: Number(e.target.value) })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] font-mono focus:outline-none focus:border-[#C6FF00]"
              />
              <span className="text-[10px] text-[#929BA9] mt-1 block">
                Standard: 270 minutes (3 full 90-minute matches in quick succession triggers warning).
              </span>
            </div>

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">
                Minimum Rest Period Required (Days)
              </label>
              <input
                type="number"
                min="1"
                max="7"
                value={settings.minRestDaysThreshold}
                onChange={(e) => setSettings({ ...settings, minRestDaysThreshold: Number(e.target.value) })}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] font-mono focus:outline-none focus:border-[#C6FF00]"
              />
              <span className="text-[10px] text-[#929BA9] mt-1 block">
                Standard: 3 days. Any turnaround shorter than this triggers a recovery alert.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors shadow-[0_0_20px_rgba(198,255,0,0.3)]"
          >
            <Save className="w-4 h-4" />
            <span>Save Club Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
