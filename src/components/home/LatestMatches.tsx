import React from 'react';
import Link from 'next/link';
import { Match } from '@/lib/types';
import { Crest } from '../Crest';
import { Calendar, MapPin, ArrowRight, Activity } from 'lucide-react';

interface LatestMatchesProps {
  matches: Match[];
}

export const LatestMatches: React.FC<LatestMatchesProps> = ({ matches }) => {
  const completedMatches = matches.filter(m => m.status === 'COMPLETED').slice(0, 3);

  return (
    <section className="py-24 bg-[#111722] relative border-t border-[#283141]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              Results & Form
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight">
              LATEST <span className="text-[#C6FF00]">MATCHES</span>
            </h2>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5F7FA] hover:text-[#C6FF00] transition-colors group"
          >
            <span>Match Center & Fixtures</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#171F2C] border border-[#283141] rounded-2xl p-6 hover:border-[#C6FF00]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Competition & Status Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#C6FF00]">
                    {match.competition}
                  </span>
                  {match.round && (
                    <span className="text-xs text-[#929BA9]">({match.round})</span>
                  )}
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#080B12] text-[#22C55E] border border-[#22C55E]/30">
                  FINAL RESULT
                </span>
              </div>

              {/* Scoreline Centerpiece */}
              <div className="py-6 flex items-center justify-between gap-4">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center p-2 mb-2">
                    {match.homeTeam === 'Coach FC' ? (
                      <Crest size={34} />
                    ) : (
                      <img src={match.homeCrest} alt={match.homeTeam} className="w-8 h-8 rounded-full object-cover" />
                    )}
                  </div>
                  <span className={`text-sm font-black uppercase tracking-tight ${match.homeTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                    {match.homeTeam}
                  </span>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center px-4">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[#F5F7FA] tracking-widest bg-[#080B12] px-5 py-2 rounded-xl border border-[#283141]">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <span className="text-[10px] font-mono text-[#929BA9] mt-2">
                    HT: {match.halftimeHomeScore} - {match.halftimeAwayScore}
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center p-2 mb-2">
                    {match.awayTeam === 'Coach FC' ? (
                      <Crest size={34} />
                    ) : (
                      <img src={match.awayCrest} alt={match.awayTeam} className="w-8 h-8 rounded-full object-cover" />
                    )}
                  </div>
                  <span className={`text-sm font-black uppercase tracking-tight ${match.awayTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                    {match.awayTeam}
                  </span>
                </div>
              </div>

              {/* Match Details & Link */}
              <div className="pt-4 border-t border-[#283141] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#929BA9]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C6FF00]" />
                    {match.matchDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                    {match.venue}
                  </span>
                </div>

                <Link
                  href={`/matches/${match.id}`}
                  className="font-bold text-[#F5F7FA] hover:text-[#C6FF00] transition-colors flex items-center gap-1"
                >
                  <span>Match Centre & Stats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
