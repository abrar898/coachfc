"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Zap, 
  Key, 
  Award, 
  ChevronRight, 
  Lock, 
  Sparkles, 
  Layers, 
  Eye, 
  Check, 
  Flame, 
  TrendingUp,
  ArrowLeft
} from "lucide-react";

export interface UltimatePlayerCard {
  id: string;
  name: string;
  slug: string;
  team: "Coach FC" | "Blue Lock FC";
  number: number;
  position: "ST" | "LW" | "RW" | "CAM" | "CM" | "CDM" | "CB" | "LB" | "RB" | "GK";
  positionFull: string;
  photoUrl: string;
  photoFullKitUrl: string;
  photoSuitUrl?: string;
  cardTier: "ICON" | "HERO" | "ELITE" | "SPECIAL";
  overallRating: number; // 0-99
  stats: {
    pace: number;       // PAC
    shooting: number;   // SHO / ATTACK
    passing: number;    // PAS
    dribbling: number;  // DRI
    defending: number;  // DEF
    physical: number;   // PHY
  };
  signatureMove: string;
  playStyle: string;
  archetype: string;
  workRate: string;
  preferredFoot: "Right" | "Left" | "Both";
  bio: string;
}

export const ULTIMATE_PLAYERS: UltimatePlayerCard[] = [
  {
    id: "tsukioynx-8",
    name: "Tsukioynx",
    slug: "tsukioynx",
    team: "Blue Lock FC",
    number: 8,
    position: "CAM",
    positionFull: "Attacking Playmaker",
    photoUrl: "/players/tsukioynx-coachfc-studio.jpg",
    photoFullKitUrl: "/players/tsukioynx-coachfc-studio.jpg",
    photoSuitUrl: "/players/tsukioynx-real.jpg",
    cardTier: "ICON",
    overallRating: 95,
    stats: {
      pace: 92,
      shooting: 96,
      passing: 95,
      dribbling: 97,
      defending: 68,
      physical: 84
    },
    signatureMove: "Midfield Solo Power Cannon",
    playStyle: "Egoist Maestro • Direct Penetration",
    archetype: "Metavision Playmaker",
    workRate: "High / Med",
    preferredFoot: "Right",
    bio: "Unplayable midfield orchestrator who slices defensive blocks apart and strikes venomous long-range power finishes."
  },
  {
    id: "faheem-6",
    name: "Faheem",
    slug: "faheem",
    team: "Blue Lock FC",
    number: 6,
    position: "CM",
    positionFull: "Playmaking Engine",
    photoUrl: "/players/faheem-real.jpg",
    photoFullKitUrl: "/players/faheem-real.jpg",
    photoSuitUrl: "/players/faheem-real.jpg",
    cardTier: "HERO",
    overallRating: 88,
    stats: {
      pace: 86,
      shooting: 85,
      passing: 90,
      dribbling: 89,
      defending: 78,
      physical: 82
    },
    signatureMove: "Double Body Dodge Past Defender & GK",
    playStyle: "Deep-Lying Dictator & 1v1 Feint Specialist",
    archetype: "Fluid Dribbler",
    workRate: "High / High",
    preferredFoot: "Right",
    bio: "Supreme agility in tight corridors. Created a world-class goal by dodging past both center-back and goalkeeper."
  },
  {
    id: "dilshad-19",
    name: "Dilshad",
    slug: "dilshad",
    team: "Blue Lock FC",
    number: 19,
    position: "ST",
    positionFull: "Predatory Striker",
    photoUrl: "/players/dilshad-real.png",
    photoFullKitUrl: "/players/dilshad-real.png",
    photoSuitUrl: "/players/dilshad-real.png",
    cardTier: "ELITE",
    overallRating: 85,
    stats: {
      pace: 91,
      shooting: 89,
      passing: 74,
      dribbling: 84,
      defending: 42,
      physical: 80
    },
    signatureMove: "Goalkeeper Slip & Roll Finish",
    playStyle: "Off-the-Shoulder Poacher",
    archetype: "Clinical Goalscorer",
    workRate: "High / Low",
    preferredFoot: "Right",
    bio: "Sharp movement across the last line. Scored a clinical brace in the derby including a clean dodge past the keeper."
  },
  {
    id: "basit-gilgiti-15",
    name: "Basit Gilgiti",
    slug: "basit-gilgiti",
    team: "Blue Lock FC",
    number: 15,
    position: "CB",
    positionFull: "Flank Stopper & Enforcer",
    photoUrl: "/players/basit-gilgiti-real.jpg",
    photoFullKitUrl: "/players/basit-gilgiti-real.jpg",
    photoSuitUrl: "/players/basit-gilgiti-real.jpg",
    cardTier: "ELITE",
    overallRating: 84,
    stats: {
      pace: 82,
      shooting: 55,
      passing: 76,
      dribbling: 74,
      defending: 88,
      physical: 90
    },
    signatureMove: "Heavy Flank Interception & Lockdown",
    playStyle: "No-Nonsense Defender",
    archetype: "Mountain Stopper",
    workRate: "Med / High",
    preferredFoot: "Right",
    bio: "Rugged and decisive. Dominates 1v1 flank duels with a 78% duel win rate and emergency recovery challenges."
  },
  {
    id: "sheryar-27",
    name: "Sheryar",
    slug: "sheryar",
    team: "Coach FC",
    number: 27,
    position: "CB",
    positionFull: "Ball-Playing Centre Back",
    photoUrl: "/players/sheryar-fullkit.jpg",
    photoFullKitUrl: "/players/sheryar-fullkit.jpg",
    photoSuitUrl: "/players/sheryar-suit.jpg",
    cardTier: "HERO",
    overallRating: 86,
    stats: {
      pace: 80,
      shooting: 84,
      passing: 83,
      dribbling: 77,
      defending: 87,
      physical: 88
    },
    signatureMove: "Curled Top-Corner Free-Kick Golazo",
    playStyle: "Dead-Ball Specialist & Aerial Enforcer",
    archetype: "Leader of the Backline",
    workRate: "High / High",
    preferredFoot: "Right",
    bio: "Coach FC defensive pillar with set-piece lethal quality. Scored a magnificent direct free-kick in the derby."
  },
  {
    id: "danish-3",
    name: "Danish",
    slug: "danish",
    team: "Coach FC",
    number: 3,
    position: "LB",
    positionFull: "Fullback Overloader",
    photoUrl: "/players/danish-fullkit.jpg",
    photoFullKitUrl: "/players/danish-fullkit.jpg",
    photoSuitUrl: "/players/danish-real.png",
    cardTier: "ELITE",
    overallRating: 83,
    stats: {
      pace: 88,
      shooting: 68,
      passing: 82,
      dribbling: 81,
      defending: 83,
      physical: 80
    },
    signatureMove: "Flank Resistance Tackle & Overlap",
    playStyle: "Dynamic Inverted Fullback",
    archetype: "Relentless Wing Guard",
    workRate: "High / High",
    preferredFoot: "Left",
    bio: "Tenacious defensive containment along the left flank, pairing recovery pace with forward transitions."
  },
  {
    id: "abdul-rehman-23",
    name: "Abdul Rehman",
    slug: "abdul-rehman",
    team: "Coach FC",
    number: 23,
    position: "CB",
    positionFull: "Anchor Defender",
    photoUrl: "/players/abdul-rehman-fullkit.jpg",
    photoFullKitUrl: "/players/abdul-rehman-fullkit.jpg",
    photoSuitUrl: "/players/abdul-rehman-real.jpg",
    cardTier: "ELITE",
    overallRating: 83,
    stats: {
      pace: 79,
      shooting: 58,
      passing: 80,
      dribbling: 73,
      defending: 87,
      physical: 86
    },
    signatureMove: "Crucial Box Clearance & Aerial Denial",
    playStyle: "Positional Commander",
    archetype: "Wall of Coach FC",
    workRate: "Med / High",
    preferredFoot: "Right",
    bio: "Disciplined defensive positioning with 85% passing accuracy and clean clearances under sustained pressure."
  },
  {
    id: "jamshaid-2",
    name: "Jamshaid",
    slug: "jamshaid",
    team: "Coach FC",
    number: 2,
    position: "RB",
    positionFull: "Right Back Enforcer",
    photoUrl: "/players/jamshaid-fullkit.jpg",
    photoFullKitUrl: "/players/jamshaid-fullkit.jpg",
    photoSuitUrl: "/players/jamshaid-real.jpg",
    cardTier: "ELITE",
    overallRating: 82,
    stats: {
      pace: 84,
      shooting: 62,
      passing: 78,
      dribbling: 76,
      defending: 84,
      physical: 85
    },
    signatureMove: "Heavy Slide Recovery Challenge",
    playStyle: "Aggressive 1-on-1 Marker",
    archetype: "Defensive Bulldog",
    workRate: "High / High",
    preferredFoot: "Right",
    bio: "Fierce fullback who stifles opposing wingers with an 88% tackle success rate and boundless running stamina."
  },
  {
    id: "jibran-13",
    name: "Jibran",
    slug: "jibran",
    team: "Coach FC",
    number: 13,
    position: "CDM",
    positionFull: "Box-to-Box Engine",
    photoUrl: "/players/jibran-real.png",
    photoFullKitUrl: "/players/jibran-real.png",
    photoSuitUrl: "/players/jibran-real.png",
    cardTier: "SPECIAL",
    overallRating: 81,
    stats: {
      pace: 78,
      shooting: 72,
      passing: 81,
      dribbling: 79,
      defending: 81,
      physical: 86
    },
    signatureMove: "Transition Disruption & Long Recovery",
    playStyle: "High-Press Workhorse",
    archetype: "Marathon Midfielder",
    workRate: "High / High",
    preferredFoot: "Right",
    bio: "Covered 11.4 km on derby night, disrupting Blue Lock's possession flow with 4 interceptions and 7 recoveries."
  },
  {
    id: "savaiz-29",
    name: "Savaiz",
    slug: "savaiz",
    team: "Coach FC",
    number: 29,
    position: "ST",
    positionFull: "Target Striker",
    photoUrl: "/players/savaiz.jpg",
    photoFullKitUrl: "/players/savaiz.jpg",
    photoSuitUrl: "/players/savaiz-suit.png",
    cardTier: "SPECIAL",
    overallRating: 78,
    stats: {
      pace: 83,
      shooting: 82,
      passing: 68,
      dribbling: 75,
      defending: 36,
      physical: 82
    },
    signatureMove: "Late Scramble Box Tap-In",
    playStyle: "Box Predator",
    archetype: "Chaotic Finisher",
    workRate: "Med / Low",
    preferredFoot: "Right",
    bio: "Poked in a 4-3 scramble finish amidst heavy goalmouth traffic, dangerous whenever balls drop inside the 6-yard box."
  },
  {
    id: "abrar-7",
    name: "Abrar",
    slug: "abrar",
    team: "Coach FC",
    number: 7,
    position: "RW",
    positionFull: "Right Wing Inverted Slasher",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    photoFullKitUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    cardTier: "HERO",
    overallRating: 88,
    stats: {
      pace: 93,
      shooting: 89,
      passing: 87,
      dribbling: 91,
      defending: 52,
      physical: 79
    },
    signatureMove: "Searing Wing Cut-In & Assist",
    playStyle: "Direct Flank Assassin",
    archetype: "Clutch Winger",
    workRate: "High / Med",
    preferredFoot: "Right",
    bio: "Masterclass winger who dismantled MCS Captains with 1 clinical goal and 1 laser assist to Usman in the 3-3 thriller."
  }
];

// Special Access Codes:
// Coach FC Portal: COACH2026 or CFC99
// Blue Lock FC Portal: BLUELOCK8 or EGOIST
// Master Admin Access: APEX100 or VIPALL
export function PlayerCardsView() {
  const [accessCode, setAccessCode] = useState("");
  const [unlockedTeam, setUnlockedTeam] = useState<"ALL" | "COACH_FC" | "BLUE_LOCK" | "LOCKED">("ALL");
  const [authError, setAuthError] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<UltimatePlayerCard | null>(null);
  const [teamFilter, setTeamFilter] = useState<"ALL" | "COACH_FC" | "BLUE_LOCK">("ALL");

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessCode.trim().toUpperCase();

    if (clean === "COACH2026" || clean === "CFC99" || clean === "COACHFC") {
      setUnlockedTeam("COACH_FC");
      setTeamFilter("COACH_FC");
      setAuthError("");
    } else if (clean === "BLUELOCK8" || clean === "EGOIST" || clean === "BLUELOCK") {
      setUnlockedTeam("BLUE_LOCK");
      setTeamFilter("BLUE_LOCK");
      setAuthError("");
    } else if (clean === "APEX100" || clean === "VIPALL" || clean === "ALL") {
      setUnlockedTeam("ALL");
      setTeamFilter("ALL");
      setAuthError("");
    } else {
      setAuthError("Invalid access token! Use COACH2026 for Coach FC, BLUELOCK8 for Blue Lock, or APEX100 for all.");
    }
  };

  const displayedPlayers = ULTIMATE_PLAYERS.filter(p => {
    if (unlockedTeam === "COACH_FC") return p.team === "Coach FC";
    if (unlockedTeam === "BLUE_LOCK") return p.team === "Blue Lock FC";
    if (teamFilter === "COACH_FC") return p.team === "Coach FC";
    if (teamFilter === "BLUE_LOCK") return p.team === "Blue Lock FC";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA] pb-24">
      {/* Header Banner */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-[#283141] bg-gradient-to-b from-[#111722] to-[#080B12] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/matches/m-1"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#929BA9] hover:text-[#C6FF00] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Match Center (14 Oct Derby)
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] text-xs font-mono font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL ULTIMATE CARDS • MAX 100 ATTRIBUTE SYSTEM
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Player Cards & Attribute Ratings
              </h1>
              <p className="text-sm sm:text-base text-[#929BA9] mt-2 max-w-2xl font-sans">
                Full-kit verified portraits with comprehensive Attack, Defending, Passing, Pace, and Physical telemetry for Coach FC and Blue Lock FC stars.
              </p>
            </div>

            {/* Access Code Box */}
            <div className="bg-[#171F2C] border border-[#283141] p-4 rounded-2xl w-full lg:w-96 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#F5F7FA] flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#C6FF00]" />
                  VIP Squad Portal Access
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  {unlockedTeam === "ALL" ? "All Unlocked" : unlockedTeam === "COACH_FC" ? "Coach FC VIP" : "Blue Lock VIP"}
                </span>
              </div>

              <form onSubmit={handleAccessSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Code: COACH2026 / BLUELOCK8"
                  className="flex-1 bg-[#080B12] border border-[#283141] rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-[#525B6C] focus:outline-none focus:border-[#C6FF00]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C6FF00] text-[#080B12] font-black text-xs rounded-xl hover:scale-105 transition-all shadow-[0_0_15px_rgba(198,255,0,0.3)] shrink-0"
                >
                  Enter
                </button>
              </form>

              {authError && (
                <p className="text-[11px] text-rose-400 mt-2 font-mono">{authError}</p>
              )}

              <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#283141] text-[10px] text-[#929BA9] font-mono">
                <span>Codes:</span>
                <span className="text-[#C6FF00] font-bold">COACH2026</span>
                <span className="text-blue-400 font-bold">BLUELOCK8</span>
                <span className="text-white font-bold">APEX100</span>
              </div>
            </div>
          </div>

          {/* Quick Team Filter Bar */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#283141]">
            <button
              onClick={() => { setUnlockedTeam("ALL"); setTeamFilter("ALL"); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                teamFilter === "ALL" && unlockedTeam === "ALL"
                  ? "bg-[#C6FF00] text-[#080B12] font-black shadow-lg shadow-[#C6FF00]/20"
                  : "bg-[#171F2C] text-[#929BA9] hover:text-white border border-[#283141]"
              }`}
            >
              All Players ({ULTIMATE_PLAYERS.length})
            </button>
            <button
              onClick={() => { setUnlockedTeam("ALL"); setTeamFilter("COACH_FC"); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                teamFilter === "COACH_FC"
                  ? "bg-[#C6FF00] text-[#080B12] font-black shadow-lg shadow-[#C6FF00]/20"
                  : "bg-[#171F2C] text-[#929BA9] hover:text-white border border-[#283141]"
              }`}
            >
              Coach FC ({ULTIMATE_PLAYERS.filter(p => p.team === "Coach FC").length})
            </button>
            <button
              onClick={() => { setUnlockedTeam("ALL"); setTeamFilter("BLUE_LOCK"); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                teamFilter === "BLUE_LOCK"
                  ? "bg-blue-600 text-white font-black shadow-lg shadow-blue-500/20"
                  : "bg-[#171F2C] text-[#929BA9] hover:text-white border border-[#283141]"
              }`}
            >
              Blue Lock FC ({ULTIMATE_PLAYERS.filter(p => p.team === "Blue Lock FC").length})
            </button>
          </div>
        </div>
      </section>

      {/* Grid of FIFA / FUT Style Ultimate Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedPlayers.map((player) => (
            <FUTStyleCard
              key={player.id}
              player={player}
              onSelect={() => setSelectedPlayer(player)}
            />
          ))}
        </div>
      </section>

      {/* Detailed Modal Telemetry Drawer */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

// Dedicated FIFA Ultimate Team (FUT) Shield Card Component
function FUTStyleCard({
  player,
  onSelect
}: {
  player: UltimatePlayerCard;
  onSelect: () => void;
}) {
  const isCoachFC = player.team === "Coach FC";
  const tierColor =
    player.cardTier === "ICON"
      ? "from-amber-400 via-amber-200 to-amber-600"
      : player.cardTier === "HERO"
      ? "from-[#C6FF00] via-emerald-300 to-green-600"
      : "from-blue-400 via-cyan-300 to-blue-700";

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer group relative rounded-3xl p-0.5 bg-gradient-to-b from-[#283141] via-[#171F2C] to-[#0A0D14] hover:from-[#C6FF00] hover:to-blue-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
    >
      {/* Outer Card Body */}
      <div className="bg-[#111722] rounded-[22px] overflow-hidden flex flex-col justify-between border border-[#283141] group-hover:border-transparent transition-all">
        {/* Card Header & Rating Shield */}
        <div className="p-4 pb-2 flex items-start justify-between">
          <div>
            <div className="text-3xl font-black tracking-tight leading-none text-white group-hover:text-[#C6FF00] transition-colors">
              {player.overallRating}
            </div>
            <div className="text-xs font-mono font-bold text-[#929BA9] mt-0.5">
              {player.position}
            </div>
            <div className="mt-1">
              <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-black uppercase ${
                isCoachFC
                  ? "bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/40"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
              }`}>
                {player.team === "Coach FC" ? "CFC" : "BLFC"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-[#080B12] text-[#929BA9] border border-[#283141]">
              #{player.number}
            </span>
            <div className="text-[8px] font-mono text-[#929BA9] mt-1 uppercase tracking-widest">
              {player.cardTier}
            </div>
          </div>
        </div>

        {/* Full-Kit Player Portrait */}
        <div className="relative h-64 sm:h-72 w-full bg-[#080B12] overflow-hidden">
          <img
            src={player.photoFullKitUrl || player.photoUrl}
            alt={player.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111722] to-transparent pointer-events-none" />
        </div>

        {/* Player Name Banner */}
        <div className="p-3 text-center border-t border-[#283141]/50 bg-[#111722]">
          <h3 className="text-base font-black text-white tracking-wide truncate group-hover:text-[#C6FF00] transition-colors">
            {player.name}
          </h3>
          <p className="text-[10px] text-[#929BA9] font-mono truncate">
            {player.positionFull}
          </p>

          {/* 6 Core Football Stats (FIFA Style: PAC, SHO, PAS, DRI, DEF, PHY) */}
          <div className="grid grid-cols-6 gap-1 mt-3 pt-2.5 border-t border-[#283141] text-center font-mono">
            <div>
              <span className="block text-[11px] font-black text-white">{player.stats.pace}</span>
              <span className="block text-[8px] text-[#929BA9]">PAC</span>
            </div>
            <div>
              <span className="block text-[11px] font-black text-white">{player.stats.shooting}</span>
              <span className="block text-[8px] text-[#929BA9]">SHO</span>
            </div>
            <div>
              <span className="block text-[11px] font-black text-white">{player.stats.passing}</span>
              <span className="block text-[8px] text-[#929BA9]">PAS</span>
            </div>
            <div>
              <span className="block text-[11px] font-black text-white">{player.stats.dribbling}</span>
              <span className="block text-[8px] text-[#929BA9]">DRI</span>
            </div>
            <div>
              <span className="block text-[11px] font-black text-white">{player.stats.defending}</span>
              <span className="block text-[8px] text-[#929BA9]">DEF</span>
            </div>
            <div>
              <span className="block text-[11px] font-black text-white">{player.stats.physical}</span>
              <span className="block text-[8px] text-[#929BA9]">PHY</span>
            </div>
          </div>
        </div>

        {/* View Full Card Stats CTA */}
        <div className="px-3 py-2 bg-[#0C101A] border-t border-[#283141] flex items-center justify-between text-[10px] font-mono text-[#929BA9] group-hover:text-[#C6FF00] transition-colors">
          <span>Inspect Card</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

// Modal for deep dive on player stats
function PlayerDetailModal({
  player,
  onClose
}: {
  player: UltimatePlayerCard;
  onClose: () => void;
}) {
  const isCoachFC = player.team === "Coach FC";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111722] border border-[#283141] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#171F2C] border border-[#283141] text-[#929BA9] hover:text-white flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Card Portrait */}
          <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-[#080B12] border border-[#283141] relative h-80">
            <img
              src={player.photoFullKitUrl || player.photoUrl}
              alt={player.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/75 backdrop-blur border border-white/10">
              <span className="text-2xl font-black text-white">{player.overallRating}</span>
              <span className="text-xs font-mono font-bold text-[#C6FF00] ml-1">{player.position}</span>
            </div>
          </div>

          {/* Player Breakdown */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                isCoachFC
                  ? "bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/40"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
              }`}>
                {player.team} • #{player.number}
              </span>
              <h2 className="text-3xl font-black text-white mt-1">{player.name}</h2>
              <p className="text-xs text-[#929BA9] font-mono">{player.positionFull} • {player.archetype}</p>
            </div>

            <p className="text-xs text-[#929BA9] leading-relaxed">
              {player.bio}
            </p>

            <div className="p-3 bg-[#080B12] rounded-xl border border-[#283141] space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#929BA9]">Signature Move:</span>
                <span className="text-white font-bold">{player.signatureMove}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#929BA9]">PlayStyle:</span>
                <span className="text-[#C6FF00] font-bold">{player.playStyle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#929BA9]">Foot & Workrate:</span>
                <span className="text-white">{player.preferredFoot} Foot • {player.workRate}</span>
              </div>
            </div>

            {/* Stat Bars (0-99) */}
            <div className="space-y-2 pt-2">
              <StatBar label="PAC (Pace & Speed)" value={player.stats.pace} />
              <StatBar label="SHO (Attack & Shooting)" value={player.stats.shooting} />
              <StatBar label="PAS (Passing & Vision)" value={player.stats.passing} />
              <StatBar label="DRI (Dribbling & Agility)" value={player.stats.dribbling} />
              <StatBar label="DEF (Defending & Tackles)" value={player.stats.defending} />
              <StatBar label="PHY (Physical & Stamina)" value={player.stats.physical} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  const getBarColor = (val: number) => {
    if (val >= 90) return "bg-[#C6FF00]";
    if (val >= 80) return "bg-blue-500";
    if (val >= 70) return "bg-emerald-400";
    return "bg-amber-400";
  };

  return (
    <div>
      <div className="flex justify-between text-[11px] font-mono mb-0.5">
        <span className="text-[#929BA9]">{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-[#080B12] rounded-full overflow-hidden border border-[#283141]">
        <div
          className={`h-full rounded-full transition-all duration-700 ${getBarColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
