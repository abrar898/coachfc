'use client';

import React, { useState, useMemo } from 'react';
import { db } from '@/lib/db';
import { WorkloadRecord, PlayerPosition } from '@/lib/types';
import { 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Calendar, 
  Activity,
  ShieldAlert,
  Info
} from 'lucide-react';

export default function SquadRotationPage() {
  const [workloads, setWorkloads] = useState<WorkloadRecord[]>(() => db.getWorkloadAnalysis());
  const settings = useMemo(() => db.getClubSettings(), []);

  // Filter States
  const [filterPos, setFilterPos] = useState<string>('ALL');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  // Next Fixture Rotation Simulator
  const [plannedStarterIds, setPlannedStarterIds] = useState<Set<string>>(
    () => new Set(['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7', 'p-8', 'p-9', 'p-10', 'p-11'])
  );

  const togglePlannedStarter = (playerId: string) => {
    const next = new Set(plannedStarterIds);
    if (next.has(playerId)) {
      next.delete(playerId);
    } else {
      if (next.size >= 11) return;
      next.add(playerId);
    }
    setPlannedStarterIds(next);
  };

  const filteredWorkloads = useMemo(() => {
    return workloads.filter((w) => {
      const matchPos = filterPos === 'ALL' || w.player.position === filterPos;
      const matchRisk = filterRisk === 'ALL' || w.riskLevel === filterRisk;
      return matchPos && matchRisk;
    });
  }, [workloads, filterPos, filterRisk]);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Sports Science & Workload Analytics
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            SQUAD ROTATION & WORKLOAD PLANNER
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Informational workload management based on club parameters (Threshold: {settings.highWorkloadMinutesThreshold} mins in 3 fixtures, Min Rest: {settings.minRestDaysThreshold} days).
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111722] border border-[#283141] text-xs text-[#929BA9]">
          <Info className="w-4 h-4 text-[#C6FF00]" />
          <span>Flags are informational and configured to club thresholds.</span>
        </div>
      </div>

      {/* Simulator Banner: Derby Starting XI Planner */}
      <div className="bg-gradient-to-r from-[#171F2C] to-[#111722] border border-[#283141] p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#C6FF00] tracking-wider block">
              Upcoming Match: The Apex Derby vs Manchester Ath.
            </span>
            <h2 className="text-lg font-black uppercase text-[#F5F7FA] mt-0.5">
              Interactive Rotation Simulator ({plannedStarterIds.size}/11 Starters Selected)
            </h2>
            <p className="text-xs text-[#929BA9]">
              Toggle players to plan starters vs rested squad members and review simulated load before locking team sheets.
            </p>
          </div>

          <button
            onClick={() => {
              // Quick reset to default 11
              setPlannedStarterIds(new Set(['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7', 'p-8', 'p-9', 'p-10', 'p-11']));
            }}
            className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-[#080B12] border border-[#283141] text-xs font-bold text-[#F5F7FA] hover:text-[#C6FF00]"
          >
            Reset Lineup
          </button>
        </div>

        {/* Quick Simulator Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {workloads.map((w) => {
            const isSelected = plannedStarterIds.has(w.playerId);
            const isHigh = w.riskLevel === 'HIGH';

            return (
              <button
                key={w.playerId}
                onClick={() => togglePlannedStarter(w.playerId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#C6FF00] text-[#080B12] border-[#C6FF00] font-black'
                    : 'bg-[#080B12] text-[#929BA9] border-[#283141] hover:text-[#F5F7FA]'
                }`}
              >
                <span>#{w.player.shirtNumber} {w.player.name.split(' ').pop()}</span>
                {isHigh && (
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" title="High workload flag" />
                )}
                <span className="text-[10px] uppercase font-mono opacity-80">
                  {isSelected ? 'START' : 'REST'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-[#929BA9]">Filter:</span>
          {['ALL', 'LOW', 'MODERATE', 'HIGH'].map((rk) => (
            <button
              key={rk}
              onClick={() => setFilterRisk(rk)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterRisk === rk
                  ? 'bg-[#C6FF00] text-[#080B12]'
                  : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
              }`}
            >
              {rk === 'ALL' ? 'All Loads' : `${rk} Load`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#C6FF00]" />
          <select
            value={filterPos}
            onChange={(e) => setFilterPos(e.target.value)}
            className="bg-[#111722] border border-[#283141] px-3 py-1.5 rounded-xl text-xs font-bold text-[#F5F7FA] focus:outline-none"
          >
            <option value="ALL">All Positions</option>
            <option value="GK">Goalkeepers</option>
            <option value="DEF">Defenders</option>
            <option value="MID">Midfielders</option>
            <option value="FWD">Forwards</option>
          </select>
        </div>
      </div>

      {/* Workload Monitoring Table */}
      <div className="bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
              <tr>
                <th className="p-4">Player</th>
                <th className="p-4">Position</th>
                <th className="p-4 text-center">Availability</th>
                <th className="p-4 text-center">Last 3 Games (Mins)</th>
                <th className="p-4 text-center">Last 5 Games (Mins)</th>
                <th className="p-4 text-center">Starts in 5</th>
                <th className="p-4 text-center">Days Rested</th>
                <th className="p-4 text-center">Load Indicator</th>
                <th className="p-4">Configured Club Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#283141]">
              {filteredWorkloads.map((w) => (
                <tr key={w.playerId} className="hover:bg-[#171F2C]/50 transition-colors">
                  <td className="p-4 font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span className="font-mono text-[#C6FF00]">#{w.player.shirtNumber}</span>
                    <span>{w.player.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-[#171F2C] text-[#929BA9] font-mono">
                      {w.player.position}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      w.player.status === 'FIT' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {w.player.status}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-[#F5F7FA]">
                    {w.minutesLast3Matches}'
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-[#F5F7FA]">
                    {w.minutesLast5Matches}'
                  </td>
                  <td className="p-4 text-center font-mono">
                    {w.startsInLast5Matches} / 5
                  </td>
                  <td className="p-4 text-center font-mono">
                    {w.daysSinceLastMatch} days
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      w.riskLevel === 'HIGH' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40' :
                      w.riskLevel === 'MODERATE' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40' :
                      'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                    }`}>
                      {w.riskLevel} LOAD
                    </span>
                  </td>
                  <td className="p-4">
                    {w.flags.length > 0 ? (
                      <div className="space-y-1">
                        {w.flags.map((flag, idx) => (
                          <div key={idx} className="text-[11px] text-[#F59E0B] flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span>{flag}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#22C55E] text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Within safe workload parameters
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
