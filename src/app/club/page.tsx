import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Crest } from '@/components/Crest';
import { db } from '@/lib/db';
import { Shield, Award, MapPin, Users, Flame, Target, Zap, Clock } from 'lucide-react';

export const metadata = {
  title: 'About Coach FC | Club DNA, Heritage & The Apex Arena',
  description: 'Discover the foundation, tactical DNA, leadership, and state-of-the-art facilities of Coach FC.',
};

export default function ClubPage() {
  const settings = db.getClubSettings();

  const honors = [
    { year: '2025', title: 'Premier Division Champions', comp: 'League Title', icon: TrophyIcon },
    { year: '2024', title: 'Continental Trophy Winners', comp: 'European Glory', icon: TrophyIcon },
    { year: '2024', title: 'Continental Super Cup', comp: 'Intercontinental Shield', icon: TrophyIcon },
    { year: '2023', title: 'Premier Division Champions', comp: 'League Title', icon: TrophyIcon },
    { year: '2022', title: 'National Cup Winners', comp: 'Domestic Silverware', icon: TrophyIcon },
  ];

  function TrophyIcon() {
    return <Award className="w-6 h-6 text-[#C6FF00]" />;
  }

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-12 border-b border-[#283141] text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171F2C] border border-[#283141] text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              ESTABLISHED 2018 • THE APEX MENTALITY
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]">
              THE STORY OF <span className="text-[#C6FF00]">COACH FC</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#929BA9] leading-relaxed">
              Founded on the belief that modern football required a paradigm shift: fusing extreme athletic conditioning, algorithmic tactical spatial awareness, and a relentless winning psychology.
            </p>
          </div>

          {/* Crest & Identity Grid */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-12 rounded-3xl bg-[#111722] border border-[#283141] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                <Crest size={180} />
                <div className="mt-6 text-center">
                  <span className="text-2xl font-black uppercase text-[#F5F7FA] block">Coach FC Crest</span>
                  <span className="text-xs font-mono text-[#C6FF00] font-bold">SYMBOL OF INTENSITY</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#F5F7FA]">
                THE APEX TACTICAL DNA
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#929BA9]">
                Coach FC was built outside traditional dogmas. We believe territorial dominance is achieved not through passive possession, but through aggressive verticality and synchronized pressing structures.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#929BA9]">
                Our players are trained in the Apex Decision Protocol—a cognitive framework enabling instant recognition of spatial transitions under maximum fatigue.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-[#111722] p-4 rounded-xl border border-[#283141]">
                  <span className="text-2xl font-black font-mono text-[#C6FF00] block">4.2s</span>
                  <span className="text-xs text-[#929BA9] uppercase font-bold mt-1 block">Counter-Press Trigger</span>
                  <p className="text-[11px] text-[#929BA9] mt-0.5">Average time to recover possession after defensive turnover.</p>
                </div>
                <div className="bg-[#111722] p-4 rounded-xl border border-[#283141]">
                  <span className="text-2xl font-black font-mono text-[#F5F7FA] block">118km</span>
                  <span className="text-xs text-[#929BA9] uppercase font-bold mt-1 block">Team Distance Covered</span>
                  <p className="text-[11px] text-[#929BA9] mt-0.5">League-leading sprint volume and high-intensity actions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Stadium & Ground Section */}
          <div className="mt-24 bg-[#111722] border border-[#283141] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 h-80 lg:h-full relative min-h-[340px]">
                <img
                  src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
                  alt="The Apex Arena"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111722] via-transparent to-transparent opacity-60" />
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#C6FF00]">
                  Home Fortress
                </span>
                <h3 className="text-3xl font-black uppercase text-[#F5F7FA]">
                  {settings.stadiumName}
                </h3>
                <p className="text-sm leading-relaxed text-[#929BA9]">
                  Inaugurated with bespoke acoustic roofing engineered to amplify crowd reverberation directly downward onto the pitch surface, creating a daunting cauldron for visiting teams.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#283141]">
                  <div>
                    <span className="text-xs text-[#929BA9] uppercase font-bold block">Capacity</span>
                    <span className="text-xl font-black text-[#F5F7FA] font-mono">{settings.stadiumCapacity}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA9] uppercase font-bold block">Pitch Surface</span>
                    <span className="text-base font-bold text-[#C6FF00]">Hybrid SISGrass</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#929BA9] uppercase font-bold block">Location</span>
                    <span className="text-base font-bold text-[#F5F7FA]">London, UK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trophy Cabinet & Honors */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#C6FF00]">
                Silverware & Distinctions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#F5F7FA] mt-2">
                THE TROPHY CABINET
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {honors.map((h, i) => (
                <div
                  key={i}
                  className="bg-[#111722] border border-[#283141] rounded-2xl p-6 text-center hover:border-[#C6FF00]/50 transition-colors flex flex-col items-center justify-between"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#080B12] border border-[#283141] flex items-center justify-center mb-4">
                    <h.icon />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C6FF00]">{h.year}</span>
                    <h4 className="text-base font-black uppercase text-[#F5F7FA] mt-1 leading-snug">
                      {h.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold uppercase text-[#929BA9] mt-4 pt-3 border-t border-[#283141] w-full block">
                    {h.comp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
