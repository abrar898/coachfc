import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Activity, 
  Flame, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  Layers, 
  RotateCcw,
  Plus
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const players = db.getPlayers();
  const matches = db.getMatches();
  const settings = db.getClubSettings();
  const workload = db.getWorkloadAnalysis();

  const completedMatches = matches.filter(m => m.status === 'COMPLETED');
  const upcomingMatches = matches.filter(m => m.status === 'SCHEDULED');

  // Compute metrics
  const totalGoalsScored = players.reduce((sum, p) => sum + p.seasonStats.goals, 0);
  const totalMinutes = players.reduce((sum, p) => sum + p.seasonStats.minutesPlayed, 0);
  const fitCount = players.filter(p => p.status === 'FIT').length;
  const injuredCount = players.filter(p => p.status === 'INJURED').length;
  const doubtfulCount = players.filter(p => p.status === 'DOUBTFUL').length;
  const highWorkloadCount = workload.filter(w => w.riskLevel === 'HIGH').length;

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#283141]">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
            Operations Command Center
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            {settings.clubName} — OVERVIEW
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Active Season {settings.activeSeason} • Head Coach: {settings.manager}
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/matches"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Fixture</span>
          </Link>

          <Link
            href="/dashboard/lineups"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-[#F5F7FA] text-xs font-bold uppercase tracking-wider hover:border-[#C6FF00]/50 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>Tactics Pitch</span>
          </Link>

          <Link
            href="/dashboard/rotation"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-[#F5F7FA] text-xs font-bold uppercase tracking-wider hover:border-[#C6FF00]/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>Workload Monitor</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Players */}
        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#929BA9]">
            <span className="text-xs font-bold uppercase">First Team Squad</span>
            <Users className="w-4 h-4 text-[#C6FF00]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black font-mono text-[#F5F7FA]">{players.length}</span>
            <div className="text-[11px] text-[#929BA9] mt-1 flex items-center gap-2">
              <span className="text-[#22C55E] font-bold">{fitCount} Match Ready</span>
              <span>•</span>
              <span className="text-[#EF4444] font-bold">{injuredCount + doubtfulCount} Flagged</span>
            </div>
          </div>
        </div>

        {/* Season Form */}
        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#929BA9]">
            <span className="text-xs font-bold uppercase">Form (W-D-L)</span>
            <Trophy className="w-4 h-4 text-[#C6FF00]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black font-mono text-[#C6FF00]">3-1-0</span>
            <div className="text-[11px] text-[#929BA9] mt-1">
              Top of the Table • Undefeated Streak
            </div>
          </div>
        </div>

        {/* Goals Scored */}
        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#929BA9]">
            <span className="text-xs font-bold uppercase">Goals Scored</span>
            <Flame className="w-4 h-4 text-[#C6FF00]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black font-mono text-[#F5F7FA]">{totalGoalsScored}</span>
            <div className="text-[11px] text-[#929BA9] mt-1">
              Leading Scorer: Victor Osimari (23G)
            </div>
          </div>
        </div>

        {/* Total Pitch Minutes */}
        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#929BA9]">
            <span className="text-xs font-bold uppercase">Total Squad Minutes</span>
            <Clock className="w-4 h-4 text-[#C6FF00]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black font-mono text-[#F5F7FA]">{totalMinutes.toLocaleString()}'</span>
            <div className="text-[11px] text-[#929BA9] mt-1 flex items-center gap-1.5">
              {highWorkloadCount > 0 ? (
                <span className="text-[#F59E0B] font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {highWorkloadCount} players near workload cap
                </span>
              ) : (
                <span className="text-[#22C55E]">Workload balanced</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Fixtures & Focus */}
        <div className="lg:col-span-7 bg-[#111722] border border-[#283141] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#283141] mb-4">
              <h3 className="text-base font-black uppercase text-[#F5F7FA] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C6FF00]" />
                Upcoming Fixtures & Schedule
              </h3>
              <Link href="/dashboard/matches" className="text-xs text-[#C6FF00] hover:underline">
                Manage Fixtures
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingMatches.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-[#171F2C] border border-[#283141] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C6FF00] block mb-1">
                      {m.competition} • {m.round || 'League Match'}
                    </span>
                    <div className="text-sm font-black text-[#F5F7FA]">
                      {m.homeTeam} vs {m.awayTeam}
                    </div>
                    <div className="text-xs text-[#929BA9] mt-0.5">
                      {m.venue} • {m.matchDate} @ {m.kickoffTime} GMT
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/matches/${m.id}`}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-[#080B12] border border-[#283141] text-xs font-bold text-[#F5F7FA] hover:text-[#C6FF00] hover:border-[#C6FF00]/40 transition-colors flex items-center gap-1.5"
                  >
                    <span>Prepare Lineup</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workload Alerts & Squad Availability Flag */}
        <div className="lg:col-span-5 bg-[#111722] border border-[#283141] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#283141] mb-4">
              <h3 className="text-base font-black uppercase text-[#F5F7FA] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#C6FF00]" />
                Medical & Workload Alerts
              </h3>
              <Link href="/dashboard/rotation" className="text-xs text-[#C6FF00] hover:underline">
                Rotation Tool
              </Link>
            </div>

            <div className="space-y-3">
              {workload.filter(w => w.flags.length > 0).slice(0, 4).map((w) => (
                <div
                  key={w.playerId}
                  className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start gap-3"
                >
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    w.riskLevel === 'HIGH' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold text-[#F5F7FA] truncate">
                      {w.player.name} (#{w.player.shirtNumber} • {w.player.position})
                    </div>
                    <div className="text-[11px] text-[#929BA9] mt-0.5 leading-snug">
                      {w.flags[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#283141] mt-4">
            <Link
              href="/dashboard/rotation"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-bold text-[#C6FF00] hover:border-[#C6FF00]"
            >
              <span>Review All 15 Squad Workloads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
