"use client";

import React, { useState } from "react";
import { Sparkles, Check, Shield, Flame, Layers, Eye } from "lucide-react";

interface KitConcept {
  id: string;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  badge: string;
  vibe: string;
  pattern: "origami" | "hexagon" | "stripes" | "sash";
  description: string;
}

const KIT_CONCEPTS: KitConcept[] = [
  {
    id: "egoist-blue-lock",
    name: "01. Egoist Midnight Blue",
    tagline: "The Canon Blue Lock Aesthetic",
    primaryColor: "#0A192F",
    secondaryColor: "#00E5FF",
    accentColor: "#FFFFFF",
    badge: "BL-01",
    vibe: "Aggressive, Cybernetic, Elite Striker",
    pattern: "hexagon",
    description: "Deep obsidian navy body with glowing cyan geometric hexagon circuitry on the torso and shoulder seams. Clean silver team crest."
  },
  {
    id: "azure-crimson-pulse",
    name: "02. Azure Crimson Pulse",
    tagline: "The Rivalry Matchday Kit",
    primaryColor: "#103E8F",
    secondaryColor: "#E50914",
    accentColor: "#FFFFFF",
    badge: "BL-02",
    vibe: "Dynamic, High-Tempo, Barcelona x Blue Lock",
    pattern: "stripes",
    description: "Royal French navy base intersected by dual crimson-red pulse stripes down the core, representing explosive instinct in the penalty box."
  },
  {
    id: "samurai-origami",
    name: "03. Samurai Origami Azure",
    tagline: "World Cup Heritage Edition",
    primaryColor: "#0D2C6C",
    secondaryColor: "#3B82F6",
    accentColor: "#FFFFFF",
    badge: "BL-03",
    vibe: "Technical, Sophisticated, Clean",
    pattern: "origami",
    description: "Hyper-clean cobalt blue base adorned with angular fold polygons inspired by Japanese origami, finished with crisp white sleeve bands."
  },
  {
    id: "stealth-neon-cyan",
    name: "04. Stealth Phantom Core",
    tagline: "The Undercover Predator",
    primaryColor: "#090D14",
    secondaryColor: "#00F0FF",
    accentColor: "#C6FF00",
    badge: "BL-04",
    vibe: "Futuristic, Tactical, Lethal",
    pattern: "sash",
    description: "Matte carbon-black fabric with an iridescent electric-blue speed sash across the chest and neon volt trim details."
  }
];

export function BlueLockKitStudio() {
  const [selectedKit, setSelectedKit] = useState<KitConcept>(KIT_CONCEPTS[0]);

  return (
    <div className="bg-[#0B0F17] border border-[#283141] rounded-3xl p-6 sm:p-8 text-[#F5F7FA]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            BLUE LOCK FC • OFFICIAL KIT LABORATORY
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            Choose Your Official Blue Lock FC Kit
          </h3>
          <p className="text-sm text-[#929BA9]">
            Interactive 3D vector-rendered match kit concepts. Pick your favorite design style!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#171F2C] p-1.5 rounded-xl border border-[#283141]">
          {KIT_CONCEPTS.map((k) => (
            <button
              key={k.id}
              onClick={() => setSelectedKit(k)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedKit.id === k.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-[#929BA9] hover:text-white"
              }`}
            >
              {k.badge}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Kit Interactive Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#131A26] to-[#0A0D14] rounded-2xl border border-[#283141] relative overflow-hidden group">
          {/* Background Ambient Glow */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${selectedKit.secondaryColor} 0%, transparent 70%)`
            }}
          />

          {/* SVG Football Jersey Mockup */}
          <div className="relative w-72 h-88 sm:w-80 sm:h-96 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
            <svg viewBox="0 0 300 360" className="w-full h-full">
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={selectedKit.primaryColor} />
                  <stop offset="100%" stopColor="#05080F" />
                </linearGradient>

                <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={selectedKit.secondaryColor} />
                  <stop offset="100%" stopColor={selectedKit.secondaryColor} stopOpacity="0.8" />
                </linearGradient>

                <pattern id="hexPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 10 0 L 20 6 L 20 18 L 10 24 L 0 18 L 0 6 Z"
                    fill="none"
                    stroke={selectedKit.secondaryColor}
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                  />
                </pattern>

                <pattern id="origamiPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <polygon
                    points="0,0 15,30 30,0"
                    fill="none"
                    stroke={selectedKit.secondaryColor}
                    strokeWidth="0.75"
                    strokeOpacity="0.3"
                  />
                </pattern>
              </defs>

              {/* Jersey Body Contour */}
              <path
                d="M 95 30 L 70 35 L 20 95 L 60 135 L 80 115 L 80 320 L 220 320 L 220 115 L 240 135 L 280 95 L 230 35 L 205 30 C 180 55 120 55 95 30 Z"
                fill="url(#bodyGrad)"
                stroke="#1F2937"
                strokeWidth="2"
              />

              {/* Pattern overlays based on selection */}
              {selectedKit.pattern === "hexagon" && (
                <path
                  d="M 80 70 L 220 70 L 220 320 L 80 320 Z"
                  fill="url(#hexPattern)"
                  opacity="0.85"
                />
              )}

              {selectedKit.pattern === "origami" && (
                <path
                  d="M 80 70 L 220 70 L 220 320 L 80 320 Z"
                  fill="url(#origamiPattern)"
                  opacity="0.9"
                />
              )}

              {selectedKit.pattern === "stripes" && (
                <g>
                  <rect x="110" y="55" width="24" height="265" fill={selectedKit.secondaryColor} opacity="0.9" />
                  <rect x="166" y="55" width="24" height="265" fill={selectedKit.secondaryColor} opacity="0.9" />
                </g>
              )}

              {selectedKit.pattern === "sash" && (
                <polygon
                  points="90,45 220,280 200,320 80,100"
                  fill={selectedKit.secondaryColor}
                  opacity="0.85"
                />
              )}

              {/* Collar Ribbing */}
              <path
                d="M 95 30 C 120 60 180 60 205 30 C 190 42 110 42 95 30 Z"
                fill={selectedKit.secondaryColor}
              />

              {/* Sleeve Cuffs */}
              <polygon points="20,95 35,110 65,80 50,65" fill={selectedKit.secondaryColor} opacity="0.9" />
              <polygon points="280,95 265,110 235,80 250,65" fill={selectedKit.secondaryColor} opacity="0.9" />

              {/* Team Crest / Badge */}
              <g transform="translate(190, 85)">
                <circle cx="16" cy="16" r="15" fill="#0A111E" stroke={selectedKit.secondaryColor} strokeWidth="2" />
                <path d="M 16 6 L 26 12 L 26 24 L 16 28 L 6 24 L 6 12 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="16" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace">BL</text>
              </g>

              {/* Brand Logo */}
              <g transform="translate(90, 95)">
                <path d="M 0 5 Q 12 10 22 2 Q 10 14 0 5 Z" fill={selectedKit.accentColor} />
              </g>

              {/* Center Chest Sponsor / Name */}
              <g transform="translate(150, 175)">
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="17"
                  fontWeight="900"
                  letterSpacing="3"
                  fontFamily="sans-serif"
                >
                  BLUE LOCK
                </text>
                <text
                  x="0"
                  y="16"
                  textAnchor="middle"
                  fill={selectedKit.secondaryColor}
                  fontSize="8"
                  fontWeight="bold"
                  letterSpacing="4"
                  fontFamily="monospace"
                >
                  STRIKER CORPS
                </text>
              </g>

              {/* Number 8 for Tsukioynx */}
              <text
                x="150"
                y="255"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="48"
                fontWeight="900"
                opacity="0.18"
                fontFamily="sans-serif"
              >
                8
              </text>
            </svg>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#929BA9]">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            360° Studio Spec • Tsukioynx #8 Edition
          </div>
        </div>

        {/* Kit Breakdown & Choice Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#171F2C] border border-[#283141] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                Selected Concept
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                {selectedKit.tagline}
              </span>
            </div>

            <h4 className="text-xl font-black text-white mb-2">{selectedKit.name}</h4>
            <p className="text-sm text-[#929BA9] mb-4 leading-relaxed">
              {selectedKit.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3 bg-[#0D131F] rounded-xl border border-[#283141] mb-4">
              <div>
                <p className="text-[10px] text-[#929BA9] font-mono">PRIMARY</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: selectedKit.primaryColor }} />
                  <span className="text-xs font-bold font-mono">{selectedKit.primaryColor}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#929BA9] font-mono">ENERGY ACCENT</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: selectedKit.secondaryColor }} />
                  <span className="text-xs font-bold font-mono">{selectedKit.secondaryColor}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#929BA9] font-mono">TRIM</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: selectedKit.accentColor }} />
                  <span className="text-xs font-bold font-mono">{selectedKit.accentColor}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-300 bg-blue-950/40 border border-blue-800/40 rounded-xl p-3">
              <Flame className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                <strong>Team Vibe:</strong> {selectedKit.vibe}
              </span>
            </div>
          </div>

          {/* Quick Select Cards */}
          <div className="grid grid-cols-2 gap-3">
            {KIT_CONCEPTS.map((c) => {
              const isSelected = selectedKit.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedKit(c)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? "bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10"
                      : "bg-[#171F2C] border-[#283141] hover:border-gray-500"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ background: c.secondaryColor }} />
                    <span className="text-xs font-bold text-white">{c.name.split(". ")[1]}</span>
                  </div>
                  <p className="text-[11px] text-[#929BA9] line-clamp-1">{c.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
