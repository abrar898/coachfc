'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { Player, PlayerPosition } from '@/lib/types';
import { Search, SlidersHorizontal, ArrowUpRight, Shield, Activity, Plus } from 'lucide-react';

export default function SquadPage() {
  const allPlayers = useMemo(() => db.getPlayers(), []);
  const [activeTab, setActiveTab] = useState<'ALL' | PlayerPosition>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'NUMBER' | 'NAME' | 'GOALS' | 'MINUTES'>('NUMBER');

  const filteredPlayers = useMemo(() => {
    return allPlayers
      .filter((player) => {
        const matchesTab = activeTab === 'ALL' || player.position === activeTab;
        const matchesSearch =
          player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.shirtNumber.toString().includes(searchQuery) ||
          player.nationality.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'NUMBER') return a.shirtNumber - b.shirtNumber;
        if (sortBy === 'NAME') return a.name.localeCompare(b.name);
        if (sortBy === 'GOALS') return b.seasonStats.goals - a.seasonStats.goals;
        if (sortBy === 'MINUTES') return b.seasonStats.minutesPlayed - a.seasonStats.minutesPlayed;
        return 0;
      });
  }, [allPlayers, activeTab, searchQuery, sortBy]);

  const tabs: { label: string; value: 'ALL' | PlayerPosition }[] = [
    { label: 'All Squad', value: 'ALL' },
    { label: 'Goalkeepers', value: 'GK' },
    { label: 'Defenders', value: 'DEF' },
    { label: 'Midfielders', value: 'MID' },
    { label: 'Forwards', value: 'FWD' },
  ];

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#283141] gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
                First Team Roster • 2026/27 Season
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]">
                THE <span className="text-[#C6FF00]">FIRST TEAM</span>
              </h1>
              <p className="mt-2 text-sm text-[#929BA9] max-w-xl">
                Official squad register for Coach FC. All performance metrics, match minutes, and tactical profiles are verified by club analytics.
              </p>
            </div>

            <Link
              href="/dashboard/players"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-black uppercase tracking-widest text-[#C6FF00] hover:border-[#C6FF00] transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Admin: Manage Squad</span>
            </Link>
          </div>

          {/* Controls: Filter Tabs, Search & Sort */}
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Position Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.value
                      ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                      : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA] hover:border-[#929BA9]/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Group */}
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#929BA9] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, number, nation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111722] border border-[#283141] pl-10 pr-4 py-2 rounded-xl text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00] placeholder:text-[#929BA9]/60"
                />
              </div>

              {/* Sort Select */}
              <div className="flex items-center gap-2 bg-[#111722] border border-[#283141] px-3 py-2 rounded-xl">
                <SlidersHorizontal className="w-4 h-4 text-[#C6FF00]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-[#F5F7FA] font-bold focus:outline-none cursor-pointer"
                >
                  <option value="NUMBER" className="bg-[#111722]">Sort: Shirt Number</option>
                  <option value="NAME" className="bg-[#111722]">Sort: Name (A-Z)</option>
                  <option value="GOALS" className="bg-[#111722]">Sort: Most Goals</option>
                  <option value="MINUTES" className="bg-[#111722]">Sort: Most Minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Squad Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <Link
                key={player.id}
                href={`/players/${player.slug}`}
                className="group bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden hover:border-[#C6FF00]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-lg"
              >
                {/* Photo & Badge */}
                <div className="relative h-72 overflow-hidden bg-[#171F2C]">
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-transparent to-transparent opacity-80" />

                  {/* Shirt Number */}
                  <span className="absolute top-3 right-3 text-2xl font-black font-mono text-[#F5F7FA] bg-[#080B12]/80 px-2.5 py-1 rounded-lg border border-[#283141] backdrop-blur-sm">
                    #{player.shirtNumber}
                  </span>

                  {/* Position Tag */}
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider">
                    {player.position}
                  </span>

                  {/* Status Indicator */}
                  {player.status !== 'FIT' && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EF4444] text-[#F5F7FA] border border-[#EF4444]">
                      {player.status}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#929BA9]">
                      {player.nationality} • Age {player.age}
                    </div>
                    <h3 className="text-xl font-black uppercase text-[#F5F7FA] mt-1 group-hover:text-[#C6FF00] transition-colors truncate">
                      {player.name}
                    </h3>
                  </div>

                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-[#283141] text-center text-xs">
                    <div className="bg-[#171F2C] p-2 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-[#929BA9] block">Apps</span>
                      <span className="text-sm font-black text-[#F5F7FA]">
                        {player.seasonStats.appearances}
                      </span>
                    </div>
                    <div className="bg-[#171F2C] p-2 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-[#929BA9] block">
                        {player.position === 'GK' ? 'Saves' : 'Goals'}
                      </span>
                      <span className="text-sm font-black text-[#C6FF00]">
                        {player.position === 'GK' ? player.seasonStats.saves : player.seasonStats.goals}
                      </span>
                    </div>
                    <div className="bg-[#171F2C] p-2 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-[#929BA9] block">
                        {player.position === 'GK' ? 'Sheets' : 'Assists'}
                      </span>
                      <span className="text-sm font-black text-[#F5F7FA]">
                        {player.position === 'GK' ? player.seasonStats.cleanSheets : player.seasonStats.assists}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between text-xs font-bold text-[#929BA9] group-hover:text-[#C6FF00] transition-colors">
                    <span>Detailed Profile</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-20 bg-[#111722] rounded-2xl border border-[#283141] mt-8">
              <p className="text-lg font-bold text-[#F5F7FA]">No players match your search filter.</p>
              <button
                onClick={() => { setActiveTab('ALL'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-[#C6FF00] text-[#080B12] rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
