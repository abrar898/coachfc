'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Crest } from '@/components/Crest';
import { db } from '@/lib/db';
import { Match, MatchStatus, Competition } from '@/lib/types';
import { Calendar, Clock, MapPin, ArrowRight, Shield, Filter, Search } from 'lucide-react';

export default function MatchesPage() {
  const allMatches = useMemo(() => db.getMatches(), []);
  const [filterStatus, setFilterStatus] = useState<'ALL' | MatchStatus>('ALL');
  const [selectedComp, setSelectedComp] = useState<string>('ALL');

  const filteredMatches = useMemo(() => {
    return allMatches.filter((m) => {
      const statusMatch = filterStatus === 'ALL' || m.status === filterStatus;
      const compMatch = selectedComp === 'ALL' || m.competition === selectedComp;
      return statusMatch && compMatch;
    });
  }, [allMatches, filterStatus, selectedComp]);

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
                Schedule & Match Center • 2026/27 Campaign
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]">
                MATCH <span className="text-[#C6FF00]">CENTER</span>
              </h1>
              <p className="mt-2 text-sm text-[#929BA9] max-w-xl">
                Official fixtures, live match timelines, squad participation records, and tactical logs for Coach FC in all competitions.
              </p>
            </div>

            <Link
              href="/dashboard/matches"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-black uppercase tracking-widest text-[#C6FF00] hover:border-[#C6FF00] transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Admin: Record Events</span>
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setFilterStatus('ALL')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  filterStatus === 'ALL'
                    ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                    : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
                }`}
              >
                All Fixtures
              </button>
              <button
                onClick={() => setFilterStatus('COMPLETED')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  filterStatus === 'COMPLETED'
                    ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                    : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setFilterStatus('SCHEDULED')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  filterStatus === 'SCHEDULED'
                    ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                    : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
                }`}
              >
                Upcoming
              </button>
            </div>

            <div className="flex items-center gap-2 bg-[#111722] border border-[#283141] px-3 py-2 rounded-xl">
              <Filter className="w-4 h-4 text-[#C6FF00]" />
              <select
                value={selectedComp}
                onChange={(e) => setSelectedComp(e.target.value)}
                className="bg-transparent text-xs text-[#F5F7FA] font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-[#111722]">All Competitions</option>
                <option value="Premier League" className="bg-[#111722]">Premier League</option>
                <option value="Champions Trophy" className="bg-[#111722]">Champions Trophy</option>
              </select>
            </div>
          </div>

          {/* Fixtures List */}
          <div className="mt-8 space-y-4">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#111722] border border-[#283141] rounded-2xl p-6 hover:border-[#C6FF00]/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Competition & Date */}
                <div className="md:w-56 shrink-0">
                  <span className="text-xs font-black uppercase tracking-wider text-[#C6FF00] block">
                    {match.competition}
                  </span>
                  <div className="text-sm font-bold text-[#F5F7FA] mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#929BA9]" />
                    <span>{match.matchDate}</span>
                  </div>
                  <div className="text-xs text-[#929BA9] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{match.kickoffTime} GMT</span>
                  </div>
                </div>

                {/* Teams & Score */}
                <div className="flex-1 flex items-center justify-center gap-6 sm:gap-10">
                  {/* Home */}
                  <div className="flex-1 flex items-center justify-end gap-3 text-right">
                    <span className={`text-base sm:text-lg font-black uppercase ${match.homeTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                      {match.homeTeam}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center p-1.5 shrink-0">
                      {match.homeTeam === 'Coach FC' ? (
                        <Crest size={28} />
                      ) : (
                        <img src={match.homeCrest} alt="" className="w-6 h-6 rounded-full object-cover" />
                      )}
                    </div>
                  </div>

                  {/* Score or VS Badge */}
                  <div className="shrink-0 text-center">
                    {match.status === 'COMPLETED' ? (
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[#F5F7FA] bg-[#080B12] px-4 py-1.5 rounded-xl border border-[#283141] shadow-inner">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    ) : (
                      <div className="px-4 py-1.5 rounded-xl bg-[#080B12] border border-[#283141] text-xs font-mono font-bold text-[#C6FF00]">
                        VS
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-[#929BA9] uppercase mt-1 block">
                      {match.status === 'COMPLETED' ? 'FULL TIME' : 'SCHEDULED'}
                    </span>
                  </div>

                  {/* Away */}
                  <div className="flex-1 flex items-center justify-start gap-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center p-1.5 shrink-0">
                      {match.awayTeam === 'Coach FC' ? (
                        <Crest size={28} />
                      ) : (
                        <img src={match.awayCrest} alt="" className="w-6 h-6 rounded-full object-cover" />
                      )}
                    </div>
                    <span className={`text-base sm:text-lg font-black uppercase ${match.awayTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                      {match.awayTeam}
                    </span>
                  </div>
                </div>

                {/* Venue & Action Link */}
                <div className="md:w-56 shrink-0 flex flex-col md:items-end justify-center gap-2">
                  <div className="text-xs text-[#929BA9] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                    <span className="truncate max-w-[180px]">{match.venue}</span>
                  </div>

                  <Link
                    href={`/matches/${match.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-bold text-[#F5F7FA] hover:text-[#C6FF00] hover:border-[#C6FF00]/50 transition-colors"
                  >
                    <span>Match Center</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
