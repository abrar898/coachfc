import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Activity, 
  Award, 
  TrendingUp, 
  Zap, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { PlayerPhotoViewer } from '@/components/player/PlayerPhotoViewer';

interface PlayerPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return db.getPlayers().map((p) => ({ slug: p.slug }));
}

export default async function PlayerProfilePage({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = db.getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  const allMatches = db.getMatches();
  // Filter matches this player participated in
  const playerMatches = allMatches.filter(m => 
    m.participations?.some(p => p.playerId === player.id)
  );

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Top Back Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <Link
            href="/squad"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#929BA9] hover:text-[#C6FF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to First Team Squad</span>
          </Link>
        </div>

        {/* Hero Player Header */}
        <section className="relative bg-[#111722] border-y border-[#283141] overflow-hidden">
          {/* Large Watermark Number */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[180px] sm:text-[280px] font-black font-mono text-[#171F2C]/40 select-none pointer-events-none leading-none z-0">
            #{player.shirtNumber}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Portrait Frame with interactive viewer */}
              <div className="lg:col-span-5 flex justify-center">
                <PlayerPhotoViewer
                  name={player.name}
                  shirtNumber={player.shirtNumber}
                  position={player.position}
                  defaultPhotoUrl={player.photoUrl}
                  suitPhotoUrl={player.photoSuitUrl}
                  galleryUrls={player.galleryUrls}
                />
              </div>

              {/* Bio & Key Metrics */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#080B12] text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      {player.status}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#929BA9]">
                      {player.nationality} • Joined {player.joinedYear}
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]">
                    {player.name}
                  </h1>

                  <p className="mt-4 text-base leading-relaxed text-[#929BA9]">
                    {player.bio}
                  </p>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#171F2C] border border-[#283141] p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#929BA9] block">Age / DOB</span>
                    <span className="text-sm font-bold text-[#F5F7FA] mt-0.5 block">{player.age} yrs</span>
                    <span className="text-[10px] font-mono text-[#929BA9]">{player.dateOfBirth}</span>
                  </div>

                  <div className="bg-[#171F2C] border border-[#283141] p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#929BA9] block">Height / Weight</span>
                    <span className="text-sm font-bold text-[#F5F7FA] mt-0.5 block">{player.heightCm} cm</span>
                    <span className="text-[10px] font-mono text-[#929BA9]">{player.weightKg} kg</span>
                  </div>

                  <div className="bg-[#171F2C] border border-[#283141] p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#929BA9] block">Preferred Foot</span>
                    <span className="text-sm font-bold text-[#F5F7FA] mt-0.5 block">{player.preferredFoot}</span>
                    <span className="text-[10px] font-mono text-[#929BA9]">Primary</span>
                  </div>

                  <div className="bg-[#171F2C] border border-[#283141] p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#929BA9] block">Market Value</span>
                    <span className="text-sm font-bold text-[#C6FF00] mt-0.5 block">{player.marketValue}</span>
                    <span className="text-[10px] font-mono text-[#929BA9]">Exp: {player.contractUntil.split('-')[0]}</span>
                  </div>
                </div>

                {/* Secondary Positions */}
                {player.secondaryPositions.length > 0 && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs font-bold text-[#929BA9] uppercase">Tactical Roles:</span>
                    <div className="flex gap-1.5">
                      {player.secondaryPositions.map(pos => (
                        <span key={pos} className="px-2 py-0.5 rounded bg-[#171F2C] border border-[#283141] text-xs font-mono text-[#F5F7FA]">
                          {pos}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Deep Performance Analytics Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
          {/* Performance Overview Cards */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
                  Verified Season Statistics (2026/27)
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#F5F7FA]">
                  COMPETITIVE LOGS
                </h2>
              </div>
              <span className="text-xs font-mono text-[#929BA9] bg-[#111722] px-3 py-1.5 rounded-lg border border-[#283141]">
                DATA SYNCED: ALL COMPETITIONS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div className="bg-[#111722] border border-[#283141] p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-[#929BA9] block">Appearances</span>
                <span className="text-2xl font-black text-[#F5F7FA] mt-1 block">
                  {player.seasonStats.appearances}
                </span>
                <span className="text-[10px] text-[#929BA9]">Starts: {player.seasonStats.starts} | Sub: {player.seasonStats.substituteIn}</span>
              </div>

              <div className="bg-[#111722] border border-[#283141] p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-[#929BA9] block">Minutes Played</span>
                <span className="text-2xl font-black text-[#C6FF00] mt-1 block">
                  {player.seasonStats.minutesPlayed}
                </span>
                <span className="text-[10px] text-[#929BA9]">Avg ~{Math.round(player.seasonStats.minutesPlayed / Math.max(1, player.seasonStats.appearances))}m/game</span>
              </div>

              <div className="bg-[#111722] border border-[#283141] p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-[#929BA9] block">
                  {player.position === 'GK' ? 'Saves' : 'Goals Scored'}
                </span>
                <span className="text-2xl font-black text-[#F5F7FA] mt-1 block">
                  {player.position === 'GK' ? player.seasonStats.saves : player.seasonStats.goals}
                </span>
                <span className="text-[10px] text-[#929BA9]">
                  {player.position === 'GK' ? 'Total Stops' : 'Season Leading'}
                </span>
              </div>

              <div className="bg-[#111722] border border-[#283141] p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-[#929BA9] block">
                  {player.position === 'GK' ? 'Clean Sheets' : 'Assists'}
                </span>
                <span className="text-2xl font-black text-[#F5F7FA] mt-1 block">
                  {player.position === 'GK' ? player.seasonStats.cleanSheets : player.seasonStats.assists}
                </span>
                <span className="text-[10px] text-[#929BA9]">Verified Match Events</span>
              </div>

              <div className="bg-[#111722] border border-[#283141] p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-[#929BA9] block">Pass Accuracy</span>
                <span className="text-2xl font-black text-[#F5F7FA] mt-1 block">
                  {player.seasonStats.passAccuracyPct}%
                </span>
                <span className="text-[10px] text-[#929BA9]">Completed Passes</span>
              </div>

              <div className="bg-[#111722] border border-[#283141] p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-[#929BA9] block">Discipline</span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-bold text-[#F59E0B]">🟨 {player.seasonStats.yellowCards}</span>
                  <span className="text-sm font-bold text-[#EF4444]">🟥 {player.seasonStats.redCards}</span>
                </div>
                <span className="text-[10px] text-[#929BA9]">Cards Issued</span>
              </div>
            </div>
          </div>

          {/* Tactical Attributes Radar Breakdown */}
          <div className="bg-[#111722] border border-[#283141] p-6 sm:p-8 rounded-2xl">
            <h3 className="text-lg font-black uppercase text-[#F5F7FA] mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C6FF00]" />
              Physical & Technical Attribute Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1.5">
                  <span>Pace & Acceleration</span>
                  <span className="text-[#F5F7FA] font-mono">{player.attributes.pace} / 99</span>
                </div>
                <div className="w-full bg-[#171F2C] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#C6FF00] h-full" style={{ width: `${player.attributes.pace}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1.5">
                  <span>Shooting & Finishing</span>
                  <span className="text-[#F5F7FA] font-mono">{player.attributes.shooting} / 99</span>
                </div>
                <div className="w-full bg-[#171F2C] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#C6FF00] h-full" style={{ width: `${player.attributes.shooting}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1.5">
                  <span>Passing & Vision</span>
                  <span className="text-[#F5F7FA] font-mono">{player.attributes.passing} / 99</span>
                </div>
                <div className="w-full bg-[#171F2C] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#C6FF00] h-full" style={{ width: `${player.attributes.passing}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1.5">
                  <span>Dribbling & Agility</span>
                  <span className="text-[#F5F7FA] font-mono">{player.attributes.dribbling} / 99</span>
                </div>
                <div className="w-full bg-[#171F2C] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#C6FF00] h-full" style={{ width: `${player.attributes.dribbling}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1.5">
                  <span>Defensive Workrate & Duels</span>
                  <span className="text-[#F5F7FA] font-mono">{player.attributes.defending} / 99</span>
                </div>
                <div className="w-full bg-[#171F2C] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#C6FF00] h-full" style={{ width: `${player.attributes.defending}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-[#929BA9] mb-1.5">
                  <span>Physicality & Stamina</span>
                  <span className="text-[#F5F7FA] font-mono">{player.attributes.physical} / 99</span>
                </div>
                <div className="w-full bg-[#171F2C] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#C6FF00] h-full" style={{ width: `${player.attributes.physical}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Match Participation History */}
          <div>
            <h3 className="text-lg font-black uppercase text-[#F5F7FA] mb-4">
              Match Participation Log
            </h3>

            <div className="bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] uppercase font-mono">
                    <tr>
                      <th className="p-4">Fixture</th>
                      <th className="p-4">Competition</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Minutes</th>
                      <th className="p-4 text-center">Goals</th>
                      <th className="p-4 text-center">Assists</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283141]">
                    {playerMatches.map((m) => {
                      const part = m.participations?.find(p => p.playerId === player.id);
                      return (
                        <tr key={m.id} className="hover:bg-[#171F2C]/50 transition-colors">
                          <td className="p-4 font-bold text-[#F5F7FA]">
                            {m.homeTeam} {m.homeScore ?? '-'} : {m.awayScore ?? '-'} {m.awayTeam}
                          </td>
                          <td className="p-4 text-[#929BA9]">{m.competition}</td>
                          <td className="p-4 text-[#929BA9]">{m.matchDate}</td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-0.5 rounded bg-[#080B12] text-[#C6FF00] font-mono font-bold border border-[#C6FF00]/30">
                              {part?.isStarting ? 'STARTER' : 'BENCH'}
                            </span>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-[#F5F7FA]">
                            {part?.minutesPlayed ?? 90}'
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-[#C6FF00]">
                            {part?.goals ?? 0}
                          </td>
                          <td className="p-4 text-center font-mono text-[#F5F7FA]">
                            {part?.assists ?? 0}
                          </td>
                          <td className="p-4 text-center">
                            <Link
                              href={`/matches/${m.id}`}
                              className="text-[#929BA9] hover:text-[#C6FF00] transition-colors inline-flex items-center gap-1"
                            >
                              <span>Center</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
