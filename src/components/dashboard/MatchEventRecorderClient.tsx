'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Match, MatchEvent, MatchEventType, Player, MatchParticipation } from '@/lib/types';
import { 
  ArrowLeft, 
  Activity, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  ShieldCheck,
  Flame,
  X
} from 'lucide-react';

interface MatchEventRecorderClientProps {
  matchId: string;
}

export const MatchEventRecorderClient: React.FC<MatchEventRecorderClientProps> = ({ matchId }) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [participations, setParticipations] = useState<MatchParticipation[]>([]);
  const [matchDuration, setMatchDuration] = useState<number>(90);

  // New Event Form State
  const [eventType, setEventType] = useState<MatchEventType>('GOAL');
  const [minute, setMinute] = useState<number>(55);
  const [period, setPeriod] = useState<'1H' | '2H' | 'ET1' | 'ET2'>('2H');
  const [team, setTeam] = useState<'HOME' | 'AWAY'>('HOME');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  const [relatedPlayerId, setRelatedPlayerId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Load match and players
  useEffect(() => {
    const loadedMatch = db.getMatchById(matchId);
    const loadedPlayers = db.getPlayers();
    setMatch(loadedMatch || null);
    setPlayers(loadedPlayers);

    if (loadedMatch) {
      const parts = db.recalculateMatchParticipation(matchId, matchDuration);
      setParticipations(parts);
      if (loadedPlayers.length > 0) {
        setSelectedPlayerId(loadedPlayers[0].id);
        setRelatedPlayerId(loadedPlayers[1]?.id || '');
      }
    }
  }, [matchId, matchDuration]);

  if (!match) {
    return (
      <div className="p-8 text-center text-[#929BA9]">
        <p>Loading match data or fixture not found...</p>
        <Link href="/dashboard/matches" className="text-[#C6FF00] underline mt-4 inline-block">
          Return to Matches
        </Link>
      </div>
    );
  }

  // Find currently on-pitch players vs bench players
  const onPitchPlayerIds = new Set(
    participations
      .filter(p => (p.isStarting && !p.subOutMinute) || (!p.isStarting && p.subInMinute && !p.subOutMinute))
      .map(p => p.playerId)
  );

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation for substitutions: Out player must be on pitch!
    if (eventType === 'SUBSTITUTION') {
      if (!selectedPlayerId || !relatedPlayerId) {
        setFormError("Both Player Out and Player In must be selected.");
        return;
      }
      if (selectedPlayerId === relatedPlayerId) {
        setFormError("Player Out and Player In cannot be the same individual.");
        return;
      }
    }

    const p = players.find(pl => pl.id === selectedPlayerId);
    const relP = players.find(pl => pl.id === relatedPlayerId);

    db.addMatchEvent(matchId, {
      matchId,
      minute: Number(minute),
      period,
      type: eventType,
      team,
      playerId: selectedPlayerId || undefined,
      playerName: p ? p.name : undefined,
      relatedPlayerId: relatedPlayerId || undefined,
      relatedPlayerName: relP ? relP.name : undefined,
      notes: notes || undefined
    });

    // Refresh state
    const updated = db.getMatchById(matchId);
    setMatch(updated ? { ...updated } : null);
    const updatedParts = db.recalculateMatchParticipation(matchId, matchDuration);
    setParticipations([...updatedParts]);
    setNotes('');
  };

  const handleDeleteEvent = (eventId: string) => {
    db.deleteMatchEvent(matchId, eventId);
    const updated = db.getMatchById(matchId);
    setMatch(updated ? { ...updated } : null);
    const updatedParts = db.recalculateMatchParticipation(matchId, matchDuration);
    setParticipations([...updatedParts]);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Back Link & Header */}
      <div>
        <Link
          href="/dashboard/matches"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#929BA9] hover:text-[#C6FF00] mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches List</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              Live Participation & Playing Minutes Engine
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
              {match.homeTeam} vs {match.awayTeam}
            </h1>
            <p className="text-xs text-[#929BA9] mt-0.5">
              {match.competition} • {match.venue} • Current Score: <span className="text-[#C6FF00] font-bold font-mono text-sm">{match.homeScore ?? 0} - {match.awayScore ?? 0}</span>
            </p>
          </div>

          {/* Match Duration Config */}
          <div className="flex items-center gap-3 bg-[#111722] border border-[#283141] px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-[#C6FF00]" />
            <span className="text-xs font-bold text-[#929BA9] uppercase">Duration:</span>
            <select
              value={matchDuration}
              onChange={(e) => setMatchDuration(Number(e.target.value))}
              className="bg-transparent text-xs font-mono font-bold text-[#F5F7FA] focus:outline-none cursor-pointer"
            >
              <option value="90" className="bg-[#111722]">Regular (90 Mins)</option>
              <option value="120" className="bg-[#111722]">Extra Time (120 Mins)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Workspace: Event Logger Left, Live Timeline & Participation Table Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Quick Event Logger Panel */}
        <div className="lg:col-span-5 bg-[#111722] border border-[#283141] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
            <h3 className="text-base font-black uppercase text-[#F5F7FA] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#C6FF00]" />
              Record Match Event
            </h3>
            <span className="text-[10px] font-mono text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded font-bold">
              REAL-TIME SYNC
            </span>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
            {/* Event Type Grid Buttons */}
            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-2">Event Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '⚽ Goal', value: 'GOAL' },
                  { label: '🔄 Substitution', value: 'SUBSTITUTION' },
                  { label: '🟨 Yellow Card', value: 'YELLOW_CARD' },
                  { label: '🟥 Red Card', value: 'RED_CARD' },
                  { label: '🎯 Penalty Goal', value: 'PENALTY_SCORED' },
                  { label: '🩹 Injury', value: 'INJURY' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setEventType(item.value as MatchEventType)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                      eventType === item.value
                        ? 'bg-[#C6FF00] text-[#080B12] border-[#C6FF00] shadow-[0_0_12px_rgba(198,255,0,0.3)] font-black'
                        : 'bg-[#171F2C] text-[#929BA9] border-[#283141] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Team & Minute */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Team</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value as 'HOME' | 'AWAY')}
                  className="w-full bg-[#171F2C] border border-[#283141] px-2.5 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="HOME">{match.homeTeam}</option>
                  <option value="AWAY">{match.awayTeam}</option>
                </select>
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Minute</label>
                <input
                  type="number"
                  min="1"
                  max="125"
                  required
                  value={minute}
                  onChange={(e) => setMinute(Number(e.target.value))}
                  className="w-full bg-[#171F2C] border border-[#283141] px-2.5 py-2 rounded-xl font-mono text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Period</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="w-full bg-[#171F2C] border border-[#283141] px-2.5 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="1H">1st Half</option>
                  <option value="2H">2nd Half</option>
                  <option value="ET1">Extra 1</option>
                  <option value="ET2">Extra 2</option>
                </select>
              </div>
            </div>

            {/* Player Selection logic */}
            {eventType === 'SUBSTITUTION' ? (
              <div className="space-y-3 p-3 rounded-xl bg-[#171F2C] border border-[#283141]">
                <div>
                  <label className="block text-[#EF4444] font-black uppercase mb-1">
                    ⬇️ Player Coming OFF (Subbed Out)
                  </label>
                  <select
                    value={selectedPlayerId}
                    onChange={(e) => setSelectedPlayerId(e.target.value)}
                    className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="">Select player on pitch...</option>
                    {players.map(p => (
                      <option key={p.id} value={p.id}>
                        #{p.shirtNumber} {p.name} ({p.position}) {onPitchPlayerIds.has(p.id) ? '— [ON PITCH]' : '— [BENCH]'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#22C55E] font-black uppercase mb-1">
                    ⬆️ Player Coming ON (Subbed In)
                  </label>
                  <select
                    value={relatedPlayerId}
                    onChange={(e) => setRelatedPlayerId(e.target.value)}
                    className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="">Select player entering pitch...</option>
                    {players.map(p => (
                      <option key={p.id} value={p.id}>
                        #{p.shirtNumber} {p.name} ({p.position}) {!onPitchPlayerIds.has(p.id) ? '— [AVAILABLE ON BENCH]' : '— [ALREADY ON PITCH]'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">
                  Primary Player ({eventType === 'GOAL' ? 'Goalscorer' : 'Subject'})
                </label>
                <select
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  className="w-full bg-[#171F2C] border border-[#283141] px-2.5 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="">Opponent / Unassigned</option>
                  {players.map(p => (
                    <option key={p.id} value={p.id}>
                      #{p.shirtNumber} {p.name} ({p.position})
                    </option>
                  ))}
                </select>

                {eventType === 'GOAL' && (
                  <div className="mt-3">
                    <label className="block text-[#929BA9] font-bold uppercase mb-1">
                      Assisting Player (Optional)
                    </label>
                    <select
                      value={relatedPlayerId}
                      onChange={(e) => setRelatedPlayerId(e.target.value)}
                      className="w-full bg-[#171F2C] border border-[#283141] px-2.5 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                    >
                      <option value="">No Assist / Solo Effort</option>
                      {players.map(p => (
                        <option key={p.id} value={p.id}>
                          #{p.shirtNumber} {p.name} ({p.position})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-[#929BA9] font-bold uppercase mb-1">Tactical Notes</label>
              <input
                type="text"
                placeholder="e.g. Header off corner, tactical break..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors shadow-[0_0_15px_rgba(198,255,0,0.3)]"
            >
              Commit Event & Recalculate Minutes
            </button>
          </form>
        </div>

        {/* Right Column: Live Event Stream & Auto-Calculated Participation Table */}
        <div className="lg:col-span-7 space-y-6">
          {/* Chronological Stream */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
            <h3 className="text-base font-black uppercase text-[#F5F7FA] mb-4 flex items-center justify-between">
              <span>Chronological Match Events ({match.events.length})</span>
              <span className="text-xs font-mono text-[#929BA9]">Auto-Sorted by Minute</span>
            </h3>

            {match.events.length === 0 ? (
              <p className="text-xs text-[#929BA9]">No events recorded yet. Use the logger on the left to add goals and substitutions.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {match.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#C6FF00] bg-[#080B12] px-2 py-0.5 rounded border border-[#283141]">
                        {ev.minute}'
                      </span>
                      <div>
                        <div className="font-bold text-[#F5F7FA]">
                          {ev.type === 'GOAL' && '⚽ Goal: '}
                          {ev.type === 'SUBSTITUTION' && '🔄 Sub: '}
                          {ev.type === 'YELLOW_CARD' && '🟨 Yellow: '}
                          {ev.type === 'RED_CARD' && '🟥 Red: '}
                          {ev.playerName || ev.team}
                          {ev.relatedPlayerName && (
                            <span className="text-[#929BA9] font-normal">
                              {' '}({ev.type === 'SUBSTITUTION' ? `Replaced by ${ev.relatedPlayerName}` : `Assist: ${ev.relatedPlayerName}`})
                            </span>
                          )}
                        </div>
                        {ev.notes && <div className="text-[10px] text-[#929BA9] italic">{ev.notes}</div>}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-1 rounded text-[#929BA9] hover:text-[#EF4444]"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playing Minutes Table */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141] mb-4">
              <div>
                <h3 className="text-base font-black uppercase text-[#F5F7FA]">
                  Calculated Squad Playing Time Table
                </h3>
                <p className="text-[11px] text-[#929BA9]">
                  Automatically recalculated on every substitution or dismissal.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#080B12] text-[#22C55E] text-[10px] font-mono font-bold border border-[#22C55E]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED ENGINE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
                  <tr>
                    <th className="p-2.5">Player</th>
                    <th className="p-2.5 text-center">Status</th>
                    <th className="p-2.5 text-center">In / Out</th>
                    <th className="p-2.5 text-center">Mins</th>
                    <th className="p-2.5 text-center">G</th>
                    <th className="p-2.5 text-center">A</th>
                    <th className="p-2.5 text-center">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#283141]">
                  {participations.map((part) => (
                    <tr key={part.playerId} className="hover:bg-[#171F2C]/50 transition-colors">
                      <td className="p-2.5 font-bold text-[#F5F7FA]">
                        <span className="text-[#C6FF00] font-mono mr-1.5">#{part.shirtNumber}</span>
                        {part.playerName}
                      </td>
                      <td className="p-2.5 text-center font-mono">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                          part.isStarting ? 'bg-[#C6FF00]/10 text-[#C6FF00]' : 'bg-[#171F2C] text-[#929BA9]'
                        }`}>
                          {part.isStarting ? 'START' : 'SUB'}
                        </span>
                      </td>
                      <td className="p-2.5 text-center font-mono text-[#929BA9]">
                        {part.subInMinute ? `In:${part.subInMinute}' ` : ''}
                        {part.subOutMinute ? `Out:${part.subOutMinute}'` : ''}
                        {!part.subInMinute && !part.subOutMinute ? '90' : ''}
                      </td>
                      <td className="p-2.5 text-center font-mono font-black text-[#C6FF00]">
                        {part.minutesPlayed}'
                      </td>
                      <td className="p-2.5 text-center font-mono">{part.goals || '-'}</td>
                      <td className="p-2.5 text-center font-mono">{part.assists || '-'}</td>
                      <td className="p-2.5 text-center">
                        {part.validationFlags && part.validationFlags.length > 0 ? (
                          <span className="text-[#EF4444] font-bold text-[10px]" title={part.validationFlags.join('; ')}>
                            ⚠️ Flagged
                          </span>
                        ) : (
                          <span className="text-[#22C55E] text-[10px]">✓ Valid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
