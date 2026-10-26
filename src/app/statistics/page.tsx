'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { Player } from '@/lib/types';
import { 
  Trophy, 
  Flame, 
  Award, 
  Clock, 
  Target, 
  ShieldCheck, 
  ArrowUpRight, 
  SlidersHorizontal 
} from 'lucide-react';

export default function StatisticsPage() {
  const players = useMemo(() => db.getPlayers(), []);
  const [filterPos, setFilterPos] = useState<string>('ALL');

  // Top Scorers
  const topScorers = useMemo(() => {
    return [...players].sort((a, b) => b.seasonStats.goals - a.seasonStats.goals).slice(0, 5);
  }, [players]);

  // Top Assists
  const topAssists = useMemo(() => {
    return [...players].sort((a, b) => b.seasonStats.assists - a.seasonStats.assists).slice(0, 5);
  }, [players]);

  // Iron Men (Most Minutes)
  const ironMen = useMemo(() => {
    return [...players].sort((a, b) => b.seasonStats.minutesPlayed - a.seasonStats.minutesPlayed).slice(0, 5);
  }, [players]);

  // Full table sorting
  const [tableSort, setTableSort] = useState<'GOALS' | 'ASSISTS' | 'MINUTES' | 'PASS_ACC'>('GOALS');
  const sortedSquad = useMemo(() => {
    return [...players]
      .filter(p => filterPos === 'ALL' || p.position === filterPos)
      .sort((a, b) => {
        if (tableSort === 'GOALS') return b.seasonStats.goals - a.seasonStats.goals;
        if (tableSort === 'ASSISTS') return b.seasonStats.assists - a.seasonStats.assists;
        if (tableSort === 'MINUTES') return b.seasonStats.minutesPlayed - a.seasonStats.minutesPlayed;
        if (tableSort === 'PASS_ACC') return b.seasonStats.passAccuracyPct - a.seasonStats.passAccuracyPct;
        return 0;
      });
  }, [players, filterPos, tableSort]);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-8 border-b border-[#283141]">
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              Official Club Performance Data • 2026/27
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]">
              SQUAD <span className="text-[#C6FF00]">STATISTICS</span>
            </h1>
            <p className="mt-2 text-sm text-[#929BA9] max-w-2xl">
              Calculated from official match records, starting lineups, substitution events, and sports science telemetry.
            </p>
          </div>

          {/* Leaderboard Podiums Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Golden Boot Podium */}
            <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#283141] mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#C6FF00]" />
                    <span className="text-sm font-black uppercase text-[#F5F7FA]">Top Scorers</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded font-bold">
                    GOLDEN BOOT
                  </span>
                </div>

                <div className="space-y-3">
                  {topScorers.map((p, idx) => (
                    <Link
                      key={p.id}
                      href={`/players/${p.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#171F2C] hover:bg-[#1E293B] border border-transparent hover:border-[#C6FF00]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-black w-4 ${idx === 0 ? 'text-[#C6FF00]' : 'text-[#929BA9]'}`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#F5F7FA]">{p.name}</div>
                          <div className="text-[10px] text-[#929BA9] font-mono">#{p.shirtNumber} • {p.position}</div>
                        </div>
                      </div>
                      <div className="text-sm font-black font-mono text-[#C6FF00]">
                        {p.seasonStats.goals} <span className="text-[10px] font-sans font-normal text-[#929BA9]">G</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Playmaker Podium */}
            <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#283141] mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#C6FF00]" />
                    <span className="text-sm font-black uppercase text-[#F5F7FA]">Top Assists</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded font-bold">
                    PLAYMAKER
                  </span>
                </div>

                <div className="space-y-3">
                  {topAssists.map((p, idx) => (
                    <Link
                      key={p.id}
                      href={`/players/${p.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#171F2C] hover:bg-[#1E293B] border border-transparent hover:border-[#C6FF00]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-black w-4 ${idx === 0 ? 'text-[#C6FF00]' : 'text-[#929BA9]'}`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#F5F7FA]">{p.name}</div>
                          <div className="text-[10px] text-[#929BA9] font-mono">#{p.shirtNumber} • {p.position}</div>
                        </div>
                      </div>
                      <div className="text-sm font-black font-mono text-[#F5F7FA]">
                        {p.seasonStats.assists} <span className="text-[10px] font-sans font-normal text-[#929BA9]">A</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Iron Men (Minutes Played) */}
            <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#283141] mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#C6FF00]" />
                    <span className="text-sm font-black uppercase text-[#F5F7FA]">Most Minutes</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded font-bold">
                    IRON MEN
                  </span>
                </div>

                <div className="space-y-3">
                  {ironMen.map((p, idx) => (
                    <Link
                      key={p.id}
                      href={`/players/${p.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#171F2C] hover:bg-[#1E293B] border border-transparent hover:border-[#C6FF00]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-black w-4 ${idx === 0 ? 'text-[#C6FF00]' : 'text-[#929BA9]'}`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#F5F7FA]">{p.name}</div>
                          <div className="text-[10px] text-[#929BA9] font-mono">#{p.shirtNumber} • {p.position}</div>
                        </div>
                      </div>
                      <div className="text-sm font-black font-mono text-[#C6FF00]">
                        {p.seasonStats.minutesPlayed}'
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Squad Sortable Table */}
          <div className="mt-16 bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
              <div>
                <h3 className="text-xl font-black uppercase text-[#F5F7FA]">
                  Complete Squad Performance Registry
                </h3>
                <p className="text-xs text-[#929BA9] mt-0.5">
                  Filter by pitch position and click headers to re-sort.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={filterPos}
                  onChange={(e) => setFilterPos(e.target.value)}
                  className="bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-xs font-bold text-[#F5F7FA] focus:outline-none"
                >
                  <option value="ALL">All Positions</option>
                  <option value="GK">Goalkeepers</option>
                  <option value="DEF">Defenders</option>
                  <option value="MID">Midfielders</option>
                  <option value="FWD">Forwards</option>
                </select>

                <select
                  value={tableSort}
                  onChange={(e) => setTableSort(e.target.value as any)}
                  className="bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-xs font-bold text-[#C6FF00] focus:outline-none"
                >
                  <option value="GOALS">Sort: Goals</option>
                  <option value="ASSISTS">Sort: Assists</option>
                  <option value="MINUTES">Sort: Minutes</option>
                  <option value="PASS_ACC">Sort: Pass Acc %</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
                  <tr>
                    <th className="p-4">Player</th>
                    <th className="p-4">Position</th>
                    <th className="p-4 text-center">Appearances</th>
                    <th className="p-4 text-center">Starts</th>
                    <th className="p-4 text-center">Minutes</th>
                    <th className="p-4 text-center">Goals</th>
                    <th className="p-4 text-center">Assists</th>
                    <th className="p-4 text-center">Pass %</th>
                    <th className="p-4 text-center">Shots OT</th>
                    <th className="p-4 text-center">Discipline</th>
                    <th className="p-4 text-center">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#283141]">
                  {sortedSquad.map((player) => (
                    <tr key={player.id} className="hover:bg-[#171F2C]/50 transition-colors">
                      <td className="p-4 font-bold text-[#F5F7FA] flex items-center gap-2">
                        <span className="font-mono text-[#C6FF00]">#{player.shirtNumber}</span>
                        <span>{player.name}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-[#171F2C] text-[#929BA9] font-mono">
                          {player.position}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono">{player.seasonStats.appearances}</td>
                      <td className="p-4 text-center font-mono">{player.seasonStats.starts}</td>
                      <td className="p-4 text-center font-mono font-bold text-[#F5F7FA]">{player.seasonStats.minutesPlayed}'</td>
                      <td className="p-4 text-center font-mono font-bold text-[#C6FF00]">{player.seasonStats.goals}</td>
                      <td className="p-4 text-center font-mono text-[#F5F7FA]">{player.seasonStats.assists}</td>
                      <td className="p-4 text-center font-mono">{player.seasonStats.passAccuracyPct}%</td>
                      <td className="p-4 text-center font-mono">{player.seasonStats.shotsOnTarget}</td>
                      <td className="p-4 text-center font-mono">
                        🟨{player.seasonStats.yellowCards} 🟥{player.seasonStats.redCards}
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          href={`/players/${player.slug}`}
                          className="text-[#929BA9] hover:text-[#C6FF00] inline-flex items-center gap-1 font-bold"
                        >
                          <span>View</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
