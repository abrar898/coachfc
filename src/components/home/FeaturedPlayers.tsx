import React from 'react';
import Link from 'next/link';
import { Player } from '@/lib/types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface FeaturedPlayersProps {
  players: Player[];
}

export const FeaturedPlayers: React.FC<FeaturedPlayersProps> = ({ players }) => {
  // Select 4 standout players across lines (GK, DEF, MID, FWD)
  const featured = players.filter(p => ['p-1', 'p-2', 'p-8', 'p-9'].includes(p.id));

  return (
    <section className="py-24 bg-[#080B12] relative border-t border-[#283141]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              Roster Leaders
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight">
              FEATURED <span className="text-[#C6FF00]">FIRST TEAM</span>
            </h2>
          </div>

          <Link
            href="/squad"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5F7FA] hover:text-[#C6FF00] transition-colors group"
          >
            <span>Explore Entire 24-Man Squad</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((player) => (
            <Link
              key={player.id}
              href={`/players/${player.slug}`}
              className="group bg-[#111722] rounded-2xl border border-[#283141] overflow-hidden hover:border-[#C6FF00]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Photo Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-[#171F2C]">
                <img
                  src={player.photoUrl}
                  alt={player.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-[#111722]/30 to-transparent" />

                {/* Squad Number Watermark */}
                <span className="absolute top-3 right-3 text-3xl font-black font-mono text-[#F5F7FA]/70 bg-[#080B12]/60 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-[#283141]">
                  #{player.shirtNumber}
                </span>

                {/* Position Pill */}
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider">
                  {player.position}
                </span>
              </div>

              {/* Player Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#929BA9]">
                    {player.nationality}
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#F5F7FA] mt-1 group-hover:text-[#C6FF00] transition-colors truncate">
                    {player.name}
                  </h3>
                </div>

                {/* Stats Matrix */}
                <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-[#283141] text-center">
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
                  <span>View Analytics</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
