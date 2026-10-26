import React from 'react';
import Link from 'next/link';
import { Shield, Zap, Target, Flame, ArrowRight } from 'lucide-react';

export const ClubPhilosophy: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: "Intensity",
      subtitle: "Uncompromising Pressing",
      desc: "We trigger suffocating counter-pressing within 4 seconds of turnover, forcing mistakes and commanding territorial dominance."
    },
    {
      icon: Target,
      title: "Precision",
      subtitle: "Surgical Ball Circulation",
      desc: "Passing lanes crafted with algorithmic geometry. Creating overloads in half-spaces to slice through low blocks."
    },
    {
      icon: Zap,
      title: "Mentality",
      subtitle: "Championship Fortitude",
      desc: "Every minute from 1 to 90+ is contested as if a title depends on it. We run further, dig deeper, and never yield."
    },
    {
      icon: Shield,
      title: "Identity",
      subtitle: "The Apex Standard",
      desc: "From the youth academy to the first team under the arena lights, one unified tactical DNA resonates through every player."
    }
  ];

  return (
    <section className="py-24 bg-[#111722] relative border-t border-[#283141] overflow-hidden">
      {/* Editorial Decorative Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[140px] md:text-[220px] font-black tracking-tighter text-[#171F2C]/30 select-none pointer-events-none whitespace-nowrap z-0 font-sans">
        MENTALITY FIRST
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              The Apex Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight leading-tight">
              FOOTBALL REFINED. <br />
              <span className="text-[#C6FF00]">MENTALITY UNLEASHED.</span>
            </h2>
            <p className="text-[#929BA9] leading-relaxed text-base">
              Coach FC was established with a singular ethos: eliminate complacency. We believe modern football is won in the transition moments—where cognitive speed, technical precision under pressure, and collective physical superiority collide.
            </p>
            <p className="text-[#929BA9] leading-relaxed text-sm">
              Headquartered at The Apex Arena, our squad combines international world-class pedigree with an unyielding hunger for trophies.
            </p>

            <div className="pt-2">
              <Link
                href="/club"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5F7FA] hover:text-[#C6FF00] transition-colors group"
              >
                <span>Read Full Club Manifesto & History</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-[#171F2C]/80 border border-[#283141] rounded-2xl p-6 hover:border-[#C6FF00]/40 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#080B12] border border-[#283141] flex items-center justify-center text-[#C6FF00] group-hover:bg-[#C6FF00] group-hover:text-[#080B12] transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#C6FF00] mb-1">
                    {pillar.subtitle}
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#F5F7FA] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#929BA9]">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
