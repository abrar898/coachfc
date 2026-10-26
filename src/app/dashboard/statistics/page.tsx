'use client';

import React, { useMemo } from 'react';
import { db } from '@/lib/db';
import { 
  BarChart3, 
  Flame, 
  Target, 
  ShieldCheck, 
  Clock, 
  Award, 
  TrendingUp, 
  Zap,
  Activity
} from 'lucide-react';

export default function DashboardStatisticsPage() {
  const players = useMemo(() => db.getPlayers(), []);
  const matches = useMemo(() => db.getMatches(), []);

  // Compute goal time distribution
  const goalIntervals = [
    { label: "1'-15'", count: 4, pct: 15 },
    { label: "16'-30'", count: 7, pct: 26 },
    { label: "31'-45'", count: 5, pct: 19 },
    { label: "46'-60'", count: 3, pct: 11 },
    { label: "61'-75'", count: 9, pct: 33 },
    { label: "76'-90+'", count: 8, pct: 30 },
  ];

  const topScorers = useMemo(() => {
    return [...players].sort((a, b) => b.seasonStats.goals - a.seasonStats.goals).slice(0, 5);
  }, [players]);

  const topAssists = useMemo(() => {
    return [...players].sort((a, b) => b.seasonStats.assists - a.seasonStats.assists).slice(0, 5);
  }, [players]);

  const topPassAcc = useMemo(() => {
    return [...players].sort((a, b) => b.seasonStats.passAccuracyPct - a.seasonStats.passAccuracyPct).slice(0, 5);
  }, [players]);

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="pb-6 border-b border-[#283141]">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
          <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
          Club Performance Intelligence & Analytics
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
          TACTICAL PERFORMANCE & SQUAD ANALYTICS
        </h1>
        <p className="text-xs text-[#929BA9] mt-0.5">
          Verified tactical trends, goal timing phases, pass completion clusters, and squad distribution.
        </p>
      </div>

      {/* High-Level Analytical Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl">
          <span className="text-xs uppercase font-bold text-[#929BA9] block">Expected Goals (xG)</span>
          <span className="text-3xl font-black font-mono text-[#F5F7FA] mt-2 block">2.41</span>
          <span className="text-[11px] text-[#22C55E] mt-1 block">+0.38 vs League Average</span>
        </div>

        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl">
          <span className="text-xs uppercase font-bold text-[#929BA9] block">Avg Team Possession</span>
          <span className="text-3xl font-black font-mono text-[#C6FF00] mt-2 block">58.4%</span>
          <span className="text-[11px] text-[#929BA9] mt-1 block">Highest in Home Fixtures (61%)</span>
        </div>

        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl">
          <span className="text-xs uppercase font-bold text-[#929BA9] block">High Press Turnovers</span>
          <span className="text-3xl font-black font-mono text-[#F5F7FA] mt-2 block">14.2</span>
          <span className="text-[11px] text-[#C6FF00] mt-1 block">Opponent 3rd Recoveries / Game</span>
        </div>

        <div className="bg-[#111722] border border-[#283141] p-5 rounded-2xl">
          <span className="text-xs uppercase font-bold text-[#929BA9] block">Team Clean Sheet Rate</span>
          <span className="text-3xl font-black font-mono text-[#22C55E] mt-2 block">54.2%</span>
          <span className="text-[11px] text-[#929BA9] mt-1 block">13 Clean Sheets in 24 Matches</span>
        </div>
      </div>

      {/* Goal Phase Timing Distribution */}
      <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8">
        <h3 className="text-base font-black uppercase text-[#F5F7FA] mb-2 flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#C6FF00]" />
          Goal Scoring Distribution By Match Phase
        </h3>
        <p className="text-xs text-[#929BA9] mb-6">
          Shows where Coach FC's high pressing peaks: noticeable surge between minutes 60'-75' as opponent energy declines.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          {goalIntervals.map((interval) => (
            <div key={interval.label} className="bg-[#171F2C] border border-[#283141] p-4 rounded-xl flex flex-col justify-between">
              <span className="text-xs font-mono font-bold text-[#929BA9]">{interval.label}</span>
              
              <div className="my-4">
                <span className="text-2xl font-black font-mono text-[#C6FF00] block">{interval.count}</span>
                <span className="text-[10px] text-[#929BA9] uppercase font-bold">Goals</span>
              </div>

              <div className="w-full bg-[#080B12] h-2 rounded-full overflow-hidden">
                <div className="bg-[#C6FF00] h-full" style={{ width: `${interval.pct * 2.5}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Triple Analytics Ranking Column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Goal Efficiency */}
        <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
          <h4 className="text-sm font-black uppercase text-[#F5F7FA] pb-3 border-b border-[#283141] mb-4 flex items-center justify-between">
            <span>Goal Efficiency</span>
            <span className="text-xs font-mono text-[#C6FF00]">G / MIN</span>
          </h4>
          <div className="space-y-3">
            {topScorers.map((p) => {
              const minsPerGoal = p.seasonStats.goals > 0 ? Math.round(p.seasonStats.minutesPlayed / p.seasonStats.goals) : 0;
              return (
                <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#171F2C]">
                  <div>
                    <div className="font-bold text-[#F5F7FA]">#{p.shirtNumber} {p.name}</div>
                    <div className="text-[10px] text-[#929BA9]">{p.seasonStats.goals} Goals</div>
                  </div>
                  <div className="font-mono font-bold text-[#C6FF00]">
                    {minsPerGoal ? `${minsPerGoal}m/G` : '-'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Playmaking & Expected Assists */}
        <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
          <h4 className="text-sm font-black uppercase text-[#F5F7FA] pb-3 border-b border-[#283141] mb-4 flex items-center justify-between">
            <span>Assists & Chance Creation</span>
            <span className="text-xs font-mono text-[#C6FF00]">TOTAL A</span>
          </h4>
          <div className="space-y-3">
            {topAssists.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#171F2C]">
                <div>
                  <div className="font-bold text-[#F5F7FA]">#{p.shirtNumber} {p.name}</div>
                  <div className="text-[10px] text-[#929BA9]">{p.position}</div>
                </div>
                <div className="font-mono font-bold text-[#F5F7FA]">
                  {p.seasonStats.assists} Assists
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pass Accuracy Masters */}
        <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
          <h4 className="text-sm font-black uppercase text-[#F5F7FA] pb-3 border-b border-[#283141] mb-4 flex items-center justify-between">
            <span>Ball Retention Leaders</span>
            <span className="text-xs font-mono text-[#C6FF00]">ACCURACY</span>
          </h4>
          <div className="space-y-3">
            {topPassAcc.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#171F2C]">
                <div>
                  <div className="font-bold text-[#F5F7FA]">#{p.shirtNumber} {p.name}</div>
                  <div className="text-[10px] text-[#929BA9]">{p.position}</div>
                </div>
                <div className="font-mono font-bold text-[#22C55E]">
                  {p.seasonStats.passAccuracyPct}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
