import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Crest } from '@/components/Crest';
import { db } from '@/lib/db';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle2,
  Users
} from 'lucide-react';

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return db.getMatches().map((m) => ({ id: m.id }));
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = db.getMatchById(id);

  if (!match) {
    notFound();
  }

  // Ensure participation minutes are calculated
  const participations = match.participations && match.participations.length > 0 
    ? match.participations 
    : db.recalculateMatchParticipation(match.id);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <Link
            href="/matches"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#929BA9] hover:text-[#C6FF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Matches Center</span>
          </Link>
        </div>

        {/* Scoreline Banner Hero */}
        <section className="bg-[#111722] border-y border-[#283141] py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Match Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#283141]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider">
                  {match.competition}
                </span>
                {match.round && (
                  <span className="text-xs font-bold text-[#929BA9] uppercase">
                    {match.round}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-[#929BA9]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C6FF00]" />
                  {match.matchDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C6FF00]" />
                  {match.venue}
                </span>
                {match.attendance && (
                  <span className="hidden sm:flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#C6FF00]" />
                    {match.attendance}
                  </span>
                )}
              </div>
            </div>

            {/* Teams & Giant Score Display */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Home Team */}
              <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-4 text-right">
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${match.homeTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                    {match.homeTeam}
                  </h2>
                  <span className="text-xs text-[#929BA9]">
                    Formation: {match.formationHome || '4-3-3'}
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#080B12] border border-[#283141] flex items-center justify-center p-2 shrink-0">
                  {match.homeTeam === 'Coach FC' ? (
                    <Crest size={40} />
                  ) : (
                    <img src={match.homeCrest} alt="" className="w-10 h-10 rounded-full object-cover" />
                  )}
                </div>
              </div>

              {/* Score Center */}
              <div className="md:col-span-2 flex flex-col items-center justify-center">
                {match.status === 'COMPLETED' ? (
                  <>
                    <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest bg-[#080B12] px-6 py-2 rounded-2xl border border-[#283141] text-[#F5F7FA] shadow-2xl">
                      {match.homeScore} : {match.awayScore}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#22C55E] uppercase mt-2">
                      FULL TIME (90')
                    </span>
                    <span className="text-[10px] font-mono text-[#929BA9]">
                      Half-time: {match.halftimeHomeScore ?? 1} - {match.halftimeAwayScore ?? 0}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-black font-mono text-[#C6FF00] bg-[#080B12] px-6 py-3 rounded-2xl border border-[#283141]">
                      {match.kickoffTime} GMT
                    </div>
                    <span className="text-xs font-mono font-bold text-[#929BA9] uppercase mt-2">
                      UPCOMING FIXTURE
                    </span>
                  </>
                )}
              </div>

              {/* Away Team */}
              <div className="md:col-span-5 flex items-center justify-start gap-4 text-left">
                <div className="w-16 h-16 rounded-2xl bg-[#080B12] border border-[#283141] flex items-center justify-center p-2 shrink-0">
                  {match.awayTeam === 'Coach FC' ? (
                    <Crest size={40} />
                  ) : (
                    <img src={match.awayCrest} alt="" className="w-10 h-10 rounded-full object-cover" />
                  )}
                </div>
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${match.awayTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                    {match.awayTeam}
                  </h2>
                  <span className="text-xs text-[#929BA9]">
                    Formation: {match.formationAway || '4-2-3-1'}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Action shortcut */}
            <div className="pt-4 flex justify-end">
              <Link
                href={`/dashboard/matches/${match.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-bold text-[#C6FF00] hover:border-[#C6FF00]"
              >
                <Shield className="w-4 h-4" />
                <span>Coach Dashboard: Live Event & Minute Recorder</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Tabs / Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
          {/* Match Events Timeline */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-black uppercase text-[#F5F7FA] mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#C6FF00]" />
              Match Events Timeline
            </h3>

            {match.events.length === 0 ? (
              <p className="text-sm text-[#929BA9]">No events recorded yet. Match has not kicked off.</p>
            ) : (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#283141]">
                {match.events.map((ev) => (
                  <div key={ev.id} className="relative flex items-start gap-4">
                    {/* Timestamp Icon Pill */}
                    <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#171F2C] border-2 border-[#C6FF00] shrink-0" />
                    
                    <div className="flex-1 bg-[#171F2C] border border-[#283141] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#C6FF00] bg-[#080B12] px-2.5 py-1 rounded border border-[#283141]">
                          {ev.minute}'
                        </span>

                        <div>
                          <div className="text-sm font-black text-[#F5F7FA]">
                            {ev.type === 'GOAL' && '⚽ GOAL!'}
                            {ev.type === 'YELLOW_CARD' && '🟨 YELLOW CARD'}
                            {ev.type === 'RED_CARD' && '🟥 RED CARD'}
                            {ev.type === 'SUBSTITUTION' && '🔄 SUBSTITUTION'}
                            {ev.type === 'PENALTY_SCORED' && '🎯 PENALTY GOAL'}
                            {' '}{ev.playerName || (ev.team === 'HOME' ? match.homeTeam : match.awayTeam)}
                          </div>
                          {ev.relatedPlayerName && (
                            <div className="text-xs text-[#929BA9]">
                              {ev.type === 'GOAL' ? `Assist: ${ev.relatedPlayerName}` : `Replaced by: ${ev.relatedPlayerName}`}
                            </div>
                          )}
                          {ev.notes && (
                            <div className="text-xs text-[#929BA9] italic mt-0.5">{ev.notes}</div>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#080B12] text-[#929BA9] border border-[#283141]">
                        {ev.team === 'HOME' ? match.homeTeam : match.awayTeam}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playing Minutes & Substitution Participation Engine Table */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#283141] gap-2">
              <div>
                <h3 className="text-lg font-black uppercase text-[#F5F7FA]">
                  Coach FC — Squad Participation & Playing Minutes
                </h3>
                <p className="text-xs text-[#929BA9] mt-0.5">
                  Calculated dynamically from kickoff, substitutions, cards, and stoppage timestamps.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#080B12] border border-[#22C55E]/40 text-[#22C55E] text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED MATCH RECORD
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
                  <tr>
                    <th className="p-3">Player</th>
                    <th className="p-3">Position</th>
                    <th className="p-3 text-center">Role</th>
                    <th className="p-3 text-center">Sub In / Out</th>
                    <th className="p-3 text-center">Playing Minutes</th>
                    <th className="p-3 text-center">Goals</th>
                    <th className="p-3 text-center">Assists</th>
                    <th className="p-3 text-center">Discipline</th>
                    <th className="p-3 text-center">Validation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#283141]">
                  {participations.map((part) => (
                    <tr key={part.playerId} className="hover:bg-[#171F2C]/40 transition-colors">
                      <td className="p-3 font-bold text-[#F5F7FA] flex items-center gap-2">
                        <span className="font-mono text-[#C6FF00]">#{part.shirtNumber}</span>
                        <span>{part.playerName}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-[#171F2C] text-[#929BA9] font-mono">
                          {part.position}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          part.isStarting ? 'bg-[#C6FF00]/10 text-[#C6FF00] border border-[#C6FF00]/30' : 'bg-[#171F2C] text-[#929BA9]'
                        }`}>
                          {part.isStarting ? 'STARTER' : 'SUB'}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono text-[#929BA9]">
                        {part.subInMinute ? `In: ${part.subInMinute}'` : ''}
                        {part.subOutMinute ? `Out: ${part.subOutMinute}'` : ''}
                        {!part.subInMinute && !part.subOutMinute ? 'Full 90' : ''}
                      </td>
                      <td className="p-3 text-center font-mono font-black text-sm text-[#F5F7FA]">
                        {part.minutesPlayed}'
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-[#C6FF00]">
                        {part.goals > 0 ? part.goals : '-'}
                      </td>
                      <td className="p-3 text-center font-mono text-[#F5F7FA]">
                        {part.assists > 0 ? part.assists : '-'}
                      </td>
                      <td className="p-3 text-center">
                        {part.yellowCards > 0 && <span className="mr-1 text-xs">🟨 {part.yellowCards}</span>}
                        {part.redCards > 0 && <span className="text-xs">🟥 {part.redCards}</span>}
                        {part.yellowCards === 0 && part.redCards === 0 && <span className="text-[#929BA9]">-</span>}
                      </td>
                      <td className="p-3 text-center">
                        {part.validationFlags && part.validationFlags.length > 0 ? (
                          <span className="text-[#EF4444] flex items-center justify-center gap-1 text-[11px]" title={part.validationFlags.join(', ')}>
                            <AlertTriangle className="w-3.5 h-3.5" /> Flagged
                          </span>
                        ) : (
                          <span className="text-[#22C55E] flex items-center justify-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Match Statistics Comparison */}
          {match.matchStats && (
            <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-black uppercase text-[#F5F7FA] mb-6">
                Match Statistics Breakdown
              </h3>

              <div className="space-y-4 max-w-2xl mx-auto">
                {/* Possession */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1">
                    <span className="text-[#F5F7FA]">{match.matchStats.possessionPct[0]}%</span>
                    <span>Possession</span>
                    <span className="text-[#F5F7FA]">{match.matchStats.possessionPct[1]}%</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-2 rounded-full overflow-hidden flex">
                    <div className="bg-[#C6FF00] h-full" style={{ width: `${match.matchStats.possessionPct[0]}%` }} />
                    <div className="bg-[#38BDF8] h-full" style={{ width: `${match.matchStats.possessionPct[1]}%` }} />
                  </div>
                </div>

                {/* Total Shots */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1">
                    <span className="text-[#F5F7FA]">{match.matchStats.shots[0]}</span>
                    <span>Total Shots</span>
                    <span className="text-[#F5F7FA]">{match.matchStats.shots[1]}</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#C6FF00] h-full"
                      style={{ width: `${(match.matchStats.shots[0] / (match.matchStats.shots[0] + match.matchStats.shots[1])) * 100}%` }}
                    />
                    <div className="bg-[#38BDF8] h-full flex-1" />
                  </div>
                </div>

                {/* Shots on Target */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1">
                    <span className="text-[#F5F7FA]">{match.matchStats.shotsOnTarget[0]}</span>
                    <span>Shots on Target</span>
                    <span className="text-[#F5F7FA]">{match.matchStats.shotsOnTarget[1]}</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#C6FF00] h-full"
                      style={{ width: `${(match.matchStats.shotsOnTarget[0] / (match.matchStats.shotsOnTarget[0] + match.matchStats.shotsOnTarget[1])) * 100}%` }}
                    />
                    <div className="bg-[#38BDF8] h-full flex-1" />
                  </div>
                </div>

                {/* Passes Completed */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1">
                    <span className="text-[#F5F7FA]">{match.matchStats.passes[0]} ({match.matchStats.passAccuracyPct[0]}%)</span>
                    <span>Passes Completed</span>
                    <span className="text-[#F5F7FA]">{match.matchStats.passes[1]} ({match.matchStats.passAccuracyPct[1]}%)</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#C6FF00] h-full"
                      style={{ width: `${(match.matchStats.passes[0] / (match.matchStats.passes[0] + match.matchStats.passes[1])) * 100}%` }}
                    />
                    <div className="bg-[#38BDF8] h-full flex-1" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
