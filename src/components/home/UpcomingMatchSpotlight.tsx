'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Match } from '@/lib/types';
import { Crest } from '../Crest';
import { Calendar, Clock, MapPin, ShieldAlert, ArrowRight, Flame } from 'lucide-react';

interface UpcomingMatchSpotlightProps {
  match?: Match;
}

export const UpcomingMatchSpotlight: React.FC<UpcomingMatchSpotlightProps> = ({ match }) => {
  // Target date for the Derby: 2026-10-24 17:30
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 12,
    minutes: 44,
    seconds: 18,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-24T17:30:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const defaultMatch: Match = match || {
    id: "m-3",
    homeTeam: "Coach FC",
    homeCrest: "/crest.svg",
    awayTeam: "Manchester Athletic",
    awayCrest: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
    isHome: true,
    competition: "Premier League",
    round: "Matchday 27 — The Apex Derby",
    venue: "The Apex Arena, London",
    matchDate: "2026-10-24",
    kickoffTime: "17:30",
    status: "SCHEDULED",
    attendance: "Sold Out (62,500)",
    events: []
  };

  return (
    <section className="py-24 bg-[#080B12] relative border-t border-[#283141] overflow-hidden">
      {/* Background Gradient & Stadium Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,255,0,0.06)_0%,rgba(8,11,18,0.95)_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#171F2C] via-[#111722] to-[#080B12] rounded-3xl border border-[#283141] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Top Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-xs font-black uppercase tracking-widest text-[#C6FF00]">
              <Flame className="w-4 h-4 text-[#C6FF00]" />
              <span>Marquee Matchup Spotlight</span>
            </div>
            <div className="text-xs font-mono font-bold text-[#929BA9]">
              COMPETITION: <span className="text-[#F5F7FA] font-sans font-bold">{defaultMatch.competition}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Clash Teams */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-sm font-black uppercase tracking-widest text-[#929BA9]">
                {defaultMatch.round}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight mt-2 mb-6">
                THE APEX DERBY
              </h2>

              {/* Head-to-Head Visual Card */}
              <div className="flex items-center justify-between gap-4 bg-[#080B12]/80 border border-[#283141] p-6 rounded-2xl max-w-lg">
                <div className="flex items-center gap-3">
                  <Crest size={44} />
                  <div>
                    <div className="text-base font-black uppercase text-[#C6FF00]">Coach FC</div>
                    <div className="text-[11px] text-[#929BA9]">Table Leaders (1st)</div>
                  </div>
                </div>

                <div className="text-2xl font-black font-mono text-[#929BA9] px-2 italic">
                  VS
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <div className="text-base font-black uppercase text-[#F5F7FA]">{defaultMatch.awayTeam}</div>
                    <div className="text-[11px] text-[#929BA9]">Challengers (2nd)</div>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#171F2C] border border-[#283141] flex items-center justify-center p-2">
                    <img src={defaultMatch.awayCrest} alt="Opponent" className="w-7 h-7 rounded-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Match Meta Information */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#929BA9]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C6FF00]" />
                  <span className="font-bold text-[#F5F7FA]">{defaultMatch.matchDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C6FF00]" />
                  <span className="font-bold text-[#F5F7FA]">{defaultMatch.kickoffTime} GMT</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C6FF00]" />
                  <span className="font-bold text-[#F5F7FA]">{defaultMatch.venue}</span>
                </div>
              </div>

              {/* Head to Head record note */}
              <div className="mt-6 pt-4 border-t border-[#283141] text-xs text-[#929BA9] max-w-md">
                Head-to-head recent record: Coach FC 3 wins, 1 draw, 0 losses. 9 goals scored, 2 conceded.
              </div>
            </div>

            {/* Right Column: Live Countdown Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#080B12] border border-[#283141] rounded-2xl p-6 sm:p-8 text-center shadow-2xl relative">
              <span className="text-xs font-black uppercase tracking-widest text-[#929BA9] mb-4">
                Kickoff Countdown
              </span>

              {/* Countdown Numbers */}
              <div className="grid grid-cols-4 gap-3 w-full max-w-sm mb-6">
                <div className="bg-[#111722] border border-[#283141] p-3 rounded-xl flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#C6FF00]">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#929BA9] mt-1">Days</span>
                </div>
                <div className="bg-[#111722] border border-[#283141] p-3 rounded-xl flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#F5F7FA]">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#929BA9] mt-1">Hours</span>
                </div>
                <div className="bg-[#111722] border border-[#283141] p-3 rounded-xl flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#F5F7FA]">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#929BA9] mt-1">Mins</span>
                </div>
                <div className="bg-[#111722] border border-[#283141] p-3 rounded-xl flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#C6FF00]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#929BA9] mt-1">Secs</span>
                </div>
              </div>

              <div className="w-full space-y-3">
                <Link
                  href="/matches"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-widest hover:bg-[#B2E600] transition-colors"
                >
                  <span>Pre-Match Tactical Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-[11px] text-[#929BA9]">
                  Tickets Sold Out • Live Broadcast on Global Sports 1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
