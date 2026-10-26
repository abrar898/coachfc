'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Player } from '@/lib/types';
import { ArrowUpRight, ChevronLeft, ChevronRight, Activity, Zap, Shield, Target } from 'lucide-react';

interface SquadShowcaseProps {
  players: Player[];
}

export const SquadShowcase: React.FC<SquadShowcaseProps> = ({ players }) => {
  const showcasePlayers = players.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);

  const activePlayer = showcasePlayers[activeIndex] || showcasePlayers[0];

  const nextPlayer = () => {
    setActiveIndex((prev) => (prev + 1) % showcasePlayers.length);
  };

  const prevPlayer = () => {
    setActiveIndex((prev) => (prev - 1 + showcasePlayers.length) % showcasePlayers.length);
  };

  if (!activePlayer) return null;

  return (
    <section id="squad-showcase" className="relative py-24 bg-[#080B12] overflow-hidden border-t border-[#283141]">
      {/* Background Ambience */}
      <div className="absolute inset-0 subtle-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#C6FF00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              Cinematic Spotlight
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight">
              THE <span className="text-[#C6FF00]">APEX SQUAD</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevPlayer}
              className="p-3 rounded-xl bg-[#111722] border border-[#283141] text-[#F5F7FA] hover:text-[#C6FF00] hover:border-[#C6FF00]/50 transition-colors"
              aria-label="Previous Player"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-sm font-mono text-[#929BA9]">
              <span className="text-[#C6FF00] font-bold">0{activeIndex + 1}</span> / 0{showcasePlayers.length}
            </div>
            <button
              onClick={nextPlayer}
              className="p-3 rounded-xl bg-[#111722] border border-[#283141] text-[#F5F7FA] hover:text-[#C6FF00] hover:border-[#C6FF00]/50 transition-colors"
              aria-label="Next Player"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111722]/60 rounded-3xl border border-[#283141] p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          {/* Large Watermark Squad Number */}
          <div className="absolute right-6 -bottom-10 text-[180px] sm:text-[240px] font-black font-mono text-[#171F2C]/40 select-none pointer-events-none leading-none z-0">
            #{activePlayer.shirtNumber}
          </div>

          {/* Left Column: Player Metadata & Attributes */}
          <div className="lg:col-span-5 relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider">
                {activePlayer.position}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#929BA9]">
                {activePlayer.nationality} • {activePlayer.preferredFoot} Foot
              </span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight leading-tight">
                {activePlayer.name}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#929BA9] line-clamp-3">
                {activePlayer.bio}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#171F2C] p-3 rounded-xl border border-[#283141]">
                <div className="text-[11px] uppercase font-bold text-[#929BA9]">Matches</div>
                <div className="text-xl font-black text-[#F5F7FA] mt-0.5">
                  {activePlayer.seasonStats.appearances}
                </div>
              </div>
              <div className="bg-[#171F2C] p-3 rounded-xl border border-[#283141]">
                <div className="text-[11px] uppercase font-bold text-[#929BA9]">
                  {activePlayer.position === 'GK' ? 'Clean Sheets' : 'Goals'}
                </div>
                <div className="text-xl font-black text-[#C6FF00] mt-0.5">
                  {activePlayer.position === 'GK' ? activePlayer.seasonStats.cleanSheets : activePlayer.seasonStats.goals}
                </div>
              </div>
              <div className="bg-[#171F2C] p-3 rounded-xl border border-[#283141]">
                <div className="text-[11px] uppercase font-bold text-[#929BA9]">Minutes</div>
                <div className="text-xl font-black text-[#F5F7FA] mt-0.5">
                  {activePlayer.seasonStats.minutesPlayed}
                </div>
              </div>
            </div>

            {/* Radar / Core Attributes Bar Breakdown */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-black uppercase tracking-wider text-[#F5F7FA] flex items-center justify-between">
                <span>Tactical Attributes</span>
                <span className="text-[#C6FF00] font-mono text-[11px]">VERIFIED STATS</span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[#929BA9] mb-1">
                    <span>Pace</span>
                    <span className="font-bold text-[#F5F7FA]">{activePlayer.attributes.pace}</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C6FF00] h-full transition-all duration-500"
                      style={{ width: `${activePlayer.attributes.pace}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#929BA9] mb-1">
                    <span>Passing</span>
                    <span className="font-bold text-[#F5F7FA]">{activePlayer.attributes.passing}</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C6FF00] h-full transition-all duration-500"
                      style={{ width: `${activePlayer.attributes.passing}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#929BA9] mb-1">
                    <span>Shooting</span>
                    <span className="font-bold text-[#F5F7FA]">{activePlayer.attributes.shooting}</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C6FF00] h-full transition-all duration-500"
                      style={{ width: `${activePlayer.attributes.shooting}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#929BA9] mb-1">
                    <span>Physical</span>
                    <span className="font-bold text-[#F5F7FA]">{activePlayer.attributes.physical}</span>
                  </div>
                  <div className="w-full bg-[#171F2C] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C6FF00] h-full transition-all duration-500"
                      style={{ width: `${activePlayer.attributes.physical}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile CTA */}
            <div className="pt-2">
              <Link
                href={`/players/${activePlayer.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-widest hover:bg-[#B2E600] transition-colors"
              >
                <span>View Full Player Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Photographic Composition with Depth and Frame */}
          <div className="lg:col-span-7 relative z-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            <div className="relative w-full max-w-md h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#283141] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                src={activePlayer.photoUrl}
                alt={activePlayer.name}
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-80" />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 bg-[#080B12]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#283141] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-[11px] font-bold text-[#F5F7FA] uppercase tracking-wider">
                  MATCH READY
                </span>
              </div>

              {/* Bottom Card Strip */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#111722]/90 backdrop-blur-md p-4 rounded-xl border border-[#283141] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#929BA9]">Market Valuation</div>
                  <div className="text-lg font-black text-[#C6FF00]">{activePlayer.marketValue}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#929BA9]">Contract Through</div>
                  <div className="text-sm font-bold text-[#F5F7FA]">{activePlayer.contractUntil.split('-')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Player Carousel Selector */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {showcasePlayers.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                idx === activeIndex
                  ? 'bg-[#171F2C] border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                  : 'bg-[#111722]/60 border-[#283141] hover:border-[#929BA9]/40'
              }`}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#283141]">
                <img src={p.photoUrl} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-[#F5F7FA] truncate">{p.name}</div>
                <div className="text-[10px] font-mono text-[#929BA9] flex items-center gap-1.5">
                  <span className="text-[#C6FF00] font-bold">#{p.shirtNumber}</span>
                  <span>{p.position}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
