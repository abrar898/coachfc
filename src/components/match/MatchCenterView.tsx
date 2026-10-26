'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Clock, 
  Calendar, 
  MapPin, 
  Award, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  Sparkles,
  Users,
  Zap,
  Target,
  Camera
} from 'lucide-react';
import { Crest } from '../Crest';
import { db } from '@/lib/db';
import { BlueLockKitStudio } from './BlueLockKitStudio';
import { StadiumAudioPlayer } from '../media/StadiumAudioPlayer';

interface PlayerRating {
  name: string;
  team: 'Blue Lock FC' | 'Coach FC';
  number: number;
  position: string;
  photoUrl?: string;
  photoSuitUrl?: string;
  photoFullKitUrl?: string;
  rating: number;
  highlightBadge?: string;
  badgeColor?: string;
  goals: number;
  assists: number;
  chancesCreated: number;
  missedChances: number;
  keyStats: string;
  verdict: string;
}

const PLAYER_RATINGS: PlayerRating[] = [
  {
    name: 'Tsukioynx',
    team: 'Blue Lock FC',
    number: 8,
    position: 'Midfield / Playmaker',
    photoUrl: '/players/tsukioynx-coachfc-studio.jpg',
    photoSuitUrl: '/players/tsukioynx-real.jpg',
    photoFullKitUrl: '/players/tsukioynx-coachfc-studio.jpg',
    rating: 9.5,
    highlightBadge: '⭐ SUPER MAN OF THE MATCH',
    badgeColor: 'bg-[#C6FF00] text-[#080B12]',
    goals: 1,
    assists: 2,
    chancesCreated: 3,
    missedChances: 0,
    keyStats: '1 Solo Power Shot Goal • 2 Clear Assists • 3 Chances Created',
    verdict: 'Unbelievable masterclass! Sliced directly through the defense from midfield on a solo run and unleashed a proper venomous power shot to score. Set up 2 clear assists and engineered 3 big chances, controlling Blue Lock’s 64% possession.'
  },
  {
    name: 'Faheem',
    team: 'Blue Lock FC',
    number: 6,
    position: 'Midfield / Playmaker',
    photoUrl: '/players/faheem-real.jpg',
    photoSuitUrl: '/players/faheem-real.jpg',
    photoFullKitUrl: '/players/faheem-real.jpg',
    rating: 8.8,
    highlightBadge: '🎯 KEEPER & DEFENDER DODGE GOAL',
    badgeColor: 'bg-cyan-400 text-[#080B12]',
    goals: 1,
    assists: 0,
    chancesCreated: 2,
    missedChances: 0,
    keyStats: '1 Goal (Cut Defender & GK) • 2 Chances Created • 91% Pass Acc',
    verdict: 'Phenomenal midfield dominance. Scored a world-class goal with a clear, audacious body dodge through the defender and rounding keeper Hamza to score. Created 2 additional golden chances.'
  },
  {
    name: 'Dilshad',
    team: 'Blue Lock FC',
    number: 19,
    position: 'Striker',
    photoUrl: '/players/dilshad-real.png',
    photoSuitUrl: '/players/dilshad-real.png',
    photoFullKitUrl: '/players/dilshad-real.png',
    rating: 8.4,
    highlightBadge: '⚡ 2 CLEAR GOALS (GK DODGE)',
    badgeColor: 'bg-blue-400 text-[#080B12]',
    goals: 2,
    assists: 0,
    chancesCreated: 0,
    missedChances: 2,
    keyStats: '2 Clear Goals • 1 Cheeky GK Dodge • 5 Shots',
    verdict: 'Broke through for two clear goals, including a cheeky slick dodge around Coach FC keeper Hamza to slot home. Marked down slightly for squandering two chances that could have killed the tie earlier.'
  },
  {
    name: 'Sheryar',
    team: 'Coach FC',
    number: 27,
    position: 'Defender',
    photoUrl: '/players/sheryar-fullkit.jpg',
    photoSuitUrl: '/players/sheryar-suit.jpg',
    photoFullKitUrl: '/players/sheryar-fullkit.jpg',
    rating: 8.2,
    highlightBadge: '💥 FREE-KICK GOLAZO',
    badgeColor: 'bg-amber-400 text-[#080B12]',
    goals: 1,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '1 Direct Free-Kick Goal • 7 Aerial Clearances • 3 Blocks',
    verdict: 'Scored an absolute peach of a direct free-kick, curling it cleanly over the wall and into the corner. Battled courageously in the backline with 7 clearances.'
  },
  {
    name: 'Basit Gilgiti',
    team: 'Blue Lock FC',
    number: 15,
    position: 'Defender',
    photoUrl: '/players/basit-gilgiti-real.jpg',
    photoSuitUrl: '/players/basit-gilgiti-real.jpg',
    photoFullKitUrl: '/players/basit-gilgiti-real.jpg',
    rating: 7.6,
    highlightBadge: '🛡️ FLANK WALL',
    badgeColor: 'bg-blue-400 text-[#080B12]',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '5 Tackles • 78% Duels Won • 4 Interceptions',
    verdict: 'Strong, physical defensive shifts to neutralize counter-attacks on the flanks and secure the edge of the box.'
  },
  {
    name: 'Danish',
    team: 'Coach FC',
    number: 3,
    position: 'Defender / Fullback',
    photoUrl: '/players/danish-fullkit.jpg',
    photoSuitUrl: '/players/danish-real.png',
    photoFullKitUrl: '/players/danish-fullkit.jpg',
    rating: 7.5,
    highlightBadge: '🛡️ FLANK RESISTANCE',
    badgeColor: 'bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '4 Interceptions • 3 Tackles • 82% Pass Acc',
    verdict: 'Tenacious battle along the left flank, providing crucial defensive cover against Blue Lock overloads while pushing into midfield transitions.'
  },
  {
    name: 'Abdul Rehman',
    team: 'Coach FC',
    number: 23,
    position: 'Defender',
    photoUrl: '/players/abdul-rehman-fullkit.jpg',
    photoSuitUrl: '/players/abdul-rehman-real.jpg',
    photoFullKitUrl: '/players/abdul-rehman-fullkit.jpg',
    rating: 7.4,
    highlightBadge: '🛡️ SOLID DEFENSIVE SHIFT',
    badgeColor: 'bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '4 Tackles • 5 Clearances • 85% Acc',
    verdict: 'Commanding defensive interventions for Coach FC, breaking up transition plays and winning crucial aerial duels under sustained pressure.'
  },
  {
    name: 'Jamshaid',
    team: 'Coach FC',
    number: 2,
    position: 'Defender',
    photoUrl: '/players/jamshaid-fullkit.jpg',
    photoSuitUrl: '/players/jamshaid-real.jpg',
    photoFullKitUrl: '/players/jamshaid-fullkit.jpg',
    rating: 7.3,
    highlightBadge: '⚔️ HARD TACKLER',
    badgeColor: 'bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '4 Tackles • 3 Recoveries • 88% Tackles Won',
    verdict: 'Tough, physical containment against Blue Lock’s wide overloads with relentless commitment in 1-on-1 challenges.'
  },
  {
    name: 'Jibran',
    team: 'Coach FC',
    number: 13,
    position: 'Midfield',
    photoUrl: '/players/jibran-real.png',
    photoSuitUrl: '/players/jibran-real.png',
    photoFullKitUrl: '/players/jibran-real.png',
    rating: 7.2,
    highlightBadge: '⚡ ENGINE WORK',
    badgeColor: 'bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '11.4 km Covered • 4 Interceptions • 7 Recoveries',
    verdict: 'Battled bravely in midfield against Tsukioynx and Faheem to break up passing rhythms and launch quick transitions.'
  },
  {
    name: 'Savaiz',
    team: 'Coach FC',
    number: 29,
    position: 'Striker',
    rating: 6.7,
    photoUrl: '/players/savaiz.jpg',
    photoSuitUrl: '/players/savaiz-suit.png',
    photoFullKitUrl: '/players/savaiz.jpg',
    highlightBadge: '⚠️ TAP-IN GOAL • MISSED CHANCES',
    badgeColor: 'bg-rose-500 text-white',
    goals: 1,
    assists: 0,
    chancesCreated: 0,
    missedChances: 3,
    keyStats: '1 Scramble Tap-In Goal • 3 Big Chances Missed',
    verdict: 'Poked home a late tap-in amidst intense rush and traffic inside the D to make it 4-3. However, heavily marked down after missing 3 clear-cut scoring opportunities earlier in the game.'
  }
];

export const MCS_CAPTAINS_RATINGS: PlayerRating[] = [
  {
    name: 'Tsukioynx',
    team: 'Coach FC',
    number: 8,
    position: 'Midfield / Captain',
    photoUrl: '/players/tsukioynx-coachfc-studio.jpg',
    photoSuitUrl: '/players/tsukioynx-real.jpg',
    photoFullKitUrl: '/players/tsukioynx-coachfc-studio.jpg',
    rating: 9.7,
    highlightBadge: '⭐ SUPER KEY PLAYER • 9 BIG CHANCES',
    badgeColor: 'bg-[#C6FF00] text-[#080B12]',
    goals: 0,
    assists: 2,
    chancesCreated: 9,
    missedChances: 0,
    keyStats: '9 Big Chances Created • 2 Clear Assists • 94% Pass Acc',
    verdict: 'Captain’s masterclass! Completely carved open the MCS Captains backline, creating 9 BIG CHANCES and delivering 2 pinpoint assists (Abrar 18\', Zohaib 76\') in an electrifying midfield display.'
  },
  {
    name: 'Abrar',
    team: 'Coach FC',
    number: 7,
    position: 'Forward / Winger',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    photoSuitUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    photoFullKitUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    rating: 9.1,
    highlightBadge: '⚽ 1 GOAL & 1 ASSIST MASTERPIECE',
    badgeColor: 'bg-amber-400 text-[#080B12]',
    goals: 1,
    assists: 1,
    chancesCreated: 3,
    missedChances: 0,
    keyStats: '1 Clinical Goal • 1 Laser Cross Assist to Usman • 5 Dribbles',
    verdict: 'Deadly winger performance. Opened the scoring on 18\' off Tsukioynx’s pass with cold composure, then whipped in a world-class cross for Usman’s 64\' volley equalizer.'
  },
  {
    name: 'Usman',
    team: 'Coach FC',
    number: 20,
    position: 'Midfield / Attacker',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    photoSuitUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    photoFullKitUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    rating: 8.6,
    highlightBadge: '💥 THUNDERBOLT VOLLEY GOAL',
    badgeColor: 'bg-emerald-400 text-[#080B12]',
    goals: 1,
    assists: 0,
    chancesCreated: 2,
    missedChances: 1,
    keyStats: '1 Goal (Thunderbolt Volley) • 3 Shots On Target • 88% Pass Acc',
    verdict: 'High-octane midfield dynamo. Smashed home Abrar’s cross on 64\' with an unstoppable first-time volley into the roof of the net.'
  },
  {
    name: 'Aliyan',
    team: 'Coach FC',
    number: 26,
    position: 'Defender / Fullback',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    photoSuitUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    photoFullKitUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    rating: 7.8,
    highlightBadge: '🛡️ SQUAD CLEAN SHEET LEADER (16 CS)',
    badgeColor: 'bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30',
    goals: 0,
    assists: 0,
    chancesCreated: 1,
    missedChances: 0,
    keyStats: '5 Tackles Won • 4 Recoveries • Club Clean Sheet Record Leader (16)',
    verdict: 'Stood out as the most dependable defender across the backline. Read the play smoothly, showing why he leads Huzaifa and Zohaib in clean sheet stability.'
  },
  {
    name: 'Jamshaid',
    team: 'Coach FC',
    number: 2,
    position: 'Defender / Right Back',
    photoUrl: '/players/jamshaid-fullkit.jpg',
    photoSuitUrl: '/players/jamshaid-real.jpg',
    photoFullKitUrl: '/players/jamshaid-fullkit.jpg',
    rating: 7.6,
    highlightBadge: '⚔️ FULL-KIT ENFORCER (#2)',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    goals: 0,
    assists: 0,
    chancesCreated: 1,
    missedChances: 0,
    keyStats: '4 Tackles • 89% Pass Acc • 2 Crucial Interceptions',
    verdict: 'Resolute shift in the official Coach FC kit with boots on the pitch. Closed down MCS wide overloads and linked effectively with Tsukioynx and Abrar.'
  },
  {
    name: 'Huzaifa',
    team: 'Coach FC',
    number: 5,
    position: 'Central Defender',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    photoSuitUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    photoFullKitUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    rating: 7.2,
    highlightBadge: '🛡️ SUPERIOR DEFENSIVE DUELS',
    badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '5 Interceptions • 4 Aerial Duels Won • Defensively Superior Prowess',
    verdict: 'Challenging test under high MCS pressure. Although defensively much better, sharper on ground challenges and positional duels than Zohaib, still endured lapses as MCS struck three times.'
  },
  {
    name: 'Zohaib',
    team: 'Coach FC',
    number: 16,
    position: 'Central Defender',
    photoUrl: '/players/zohaib.jpg',
    photoSuitUrl: '/players/zohaib.jpg',
    photoFullKitUrl: '/players/zohaib.jpg',
    rating: 7.1,
    highlightBadge: '⚽ BULLET HEADER GOAL • DEFENSIVE STRUGGLE',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    goals: 1,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '1 Aerial Bullet Header Goal • 3 Marking Lapses • 4 Clearances',
    verdict: 'Magnificent bullet header on 76\' from Tsukioynx’s corner to put Coach FC ahead 3-2! However, had severe defensive lapses and lost markers alongside Huzaifa, conceding 3 goals.'
  },
  {
    name: 'Hamza',
    team: 'Coach FC',
    number: 1,
    position: 'Goalkeeper',
    photoUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    photoSuitUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    photoFullKitUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    rating: 7.0,
    highlightBadge: '🧤 8 HEROIC CRUCIAL SAVES • ACCIDENTAL OWN GOAL',
    badgeColor: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    goals: 0,
    assists: 0,
    chancesCreated: 0,
    missedChances: 0,
    keyStats: '8 Crucial Saves • 1 Accidental Back-Heel Own Goal • 3 1v1 Denials',
    verdict: 'Dramatic performance. Accidentally turned the ball into his own net with an errant back-heel under pressure, yet redeemed himself with 8 world-class reflex saves to keep Coach FC in the match.'
  }
];

const RatingCardItem: React.FC<{ p: PlayerRating }> = ({ p }) => {
  const [photoMode, setPhotoMode] = useState<'KIT' | 'SUIT'>('KIT');
  const activePhoto = photoMode === 'SUIT' && p.photoSuitUrl ? p.photoSuitUrl : (p.photoFullKitUrl || p.photoUrl);

  return (
    <div className="bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/40 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group">
      <div>
        {/* Full-Kit / Player Portrait Preview */}
        {activePhoto && (
          <div className="relative mb-4 rounded-xl overflow-hidden bg-[#080B12] border border-[#283141] group-hover:border-[#C6FF00]/60 transition-all h-64 sm:h-72">
            <img
              src={activePhoto}
              alt={p.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Team & Number Floating Badge */}
            <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow backdrop-blur-md ${
              p.team === 'Blue Lock FC'
                ? 'bg-blue-600/90 text-white border border-blue-400/40'
                : 'bg-[#C6FF00] text-[#080B12] font-black'
            }`}>
              {p.team} • #{p.number}
            </span>

            {/* Rating Floating Badge */}
            <div className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg flex items-center gap-1 font-black shadow-lg ${
              p.rating >= 9.0
                ? 'bg-[#C6FF00] text-[#080B12]'
                : p.rating >= 8.0
                ? 'bg-blue-500 text-white'
                : 'bg-[#171F2C]/90 text-[#F5F7FA] border border-[#283141]'
            }`}>
              <span className="text-sm">{p.rating.toFixed(1)}</span>
              <span className="text-[9px] opacity-70">/10</span>
            </div>

            {/* Full Kit Tag */}
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur text-[9px] font-mono text-[#F5F7FA] border border-white/10">
              {p.team === 'Coach FC' ? 'Coach FC Kit • Head to Cleats' : 'Blue Lock FC Studio'}
            </span>
          </div>
        )}

        {/* Identity & Position */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-lg font-black text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors">
              {p.name}
            </h4>
            <span className="text-xs text-[#929BA9] font-mono">
              {p.position}
            </span>
          </div>
          {p.photoSuitUrl && p.photoSuitUrl !== p.photoUrl && (
            <div className="flex items-center gap-1 bg-[#080B12] p-1 rounded-lg border border-[#283141]">
              <button
                onClick={() => setPhotoMode('KIT')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                  photoMode === 'KIT' ? 'bg-[#C6FF00] text-[#080B12]' : 'text-[#929BA9]'
                }`}
              >
                Kit
              </button>
              <button
                onClick={() => setPhotoMode('SUIT')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                  photoMode === 'SUIT' ? 'bg-blue-500 text-white' : 'text-[#929BA9]'
                }`}
              >
                Suit
              </button>
            </div>
          )}
        </div>

        {/* Zohaib Verified Kit Badge */}
        {p.number === 16 && p.name === 'Zohaib' && (
          <div className="mb-3 px-2.5 py-1 rounded-lg bg-[#080B12] border border-[#283141] flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#929BA9]">Pitch Session:</span>
            <span className="text-[#C6FF00] font-bold">Jersey #16 Back View 🇵🇰</span>
          </div>
        )}

        {/* Highlight Badge if exists */}
        {p.highlightBadge && (
          <div className="mb-4">
            <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${p.badgeColor}`}>
              {p.highlightBadge}
            </span>
          </div>
        )}

        {/* Key Stats Bar */}
        <div className="bg-[#080B12] p-3 rounded-xl border border-[#283141] text-xs font-mono text-[#F5F7FA] mb-4">
          {p.keyStats}
        </div>

        {/* Performance Verdict */}
        <p className="text-xs text-[#929BA9] leading-relaxed mb-4">
          {p.verdict}
        </p>
      </div>

      {/* Stat Counter Badges */}
      <div className="pt-4 border-t border-[#283141] flex items-center justify-between text-xs font-mono text-[#929BA9]">
        <div className="flex items-center gap-3">
          <span>⚽ <strong>{p.goals}</strong> G</span>
          <span>🎯 <strong>{p.assists}</strong> A</span>
          {p.chancesCreated > 0 && <span>⚡ <strong>{p.chancesCreated}</strong> Ch</span>}
        </div>
        {p.missedChances > 0 && (
          <span className="text-rose-400 font-bold">
            ⚠️ {p.missedChances} Missed
          </span>
        )}
      </div>
    </div>
  );
};

export const MatchCenterView: React.FC = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<'m-mcs-captains' | 'm-1'>('m-mcs-captains');
  const [activeTab, setActiveTab] = useState<'derby-history' | 'ratings' | 'timeline' | 'lineups' | 'stats' | 'gallery'>('ratings');
  const [teamFilter, setTeamFilter] = useState<'ALL' | 'BLUE_LOCK' | 'COACH_FC'>('ALL');

  // Load latest dynamically configured matches from DB
  const matches = db.getMatches();
  const mcsMatch = matches.find(m => m.id === 'm-mcs-captains');
  const oct14Match = matches.find(m => m.matchDate === '2026-10-14' || m.id === 'm-1');

  // Base ratings depending on selected match
  const baseRatings = selectedMatchId === 'm-mcs-captains' ? MCS_CAPTAINS_RATINGS : PLAYER_RATINGS;
  const currentMatchDb = selectedMatchId === 'm-mcs-captains' ? mcsMatch : oct14Match;

  // Merge default ratings with any custom ratings saved via match edit form
  const mergedRatings: PlayerRating[] = [...baseRatings];
  if (currentMatchDb?.playerRatings && currentMatchDb.playerRatings.length > 0) {
    currentMatchDb.playerRatings.forEach(dbRating => {
      const idx = mergedRatings.findIndex(r => r.name.toLowerCase() === dbRating.name.toLowerCase());
      if (idx !== -1) {
        mergedRatings[idx] = { 
          ...mergedRatings[idx], 
          rating: dbRating.rating,
          highlightBadge: dbRating.highlightBadge || mergedRatings[idx].highlightBadge,
          badgeColor: dbRating.badgeColor || mergedRatings[idx].badgeColor
        };
      } else {
        mergedRatings.push(dbRating as PlayerRating);
      }
    });
  }

  const filteredRatings = mergedRatings.filter(p => {
    if (teamFilter === 'BLUE_LOCK') return p.team === 'Blue Lock FC';
    if (teamFilter === 'COACH_FC') return p.team === 'Coach FC';
    return true;
  });

  return (
    <div className="w-full">
      {/* MATCH HERO SCOREBOARD */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-[#283141] bg-gradient-to-b from-[#111722] via-[#080B12] to-[#080B12]">
        {/* Background WhatsApp Media Reel (Muted atmospheric video & photo textures) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
          <video
            src="/media/coachfc-highlight-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B12] via-transparent to-[#080B12]" />
        </div>

        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C6FF00]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[400px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Match Switcher Selector */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => { setSelectedMatchId('m-mcs-captains'); setActiveTab('ratings'); }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedMatchId === 'm-mcs-captains'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_20px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500 fill-current" />
              <span>⭐ LATEST: MCS Captains 3 - 3 Coach FC (Wed 21 Oct)</span>
            </button>
            <button
              onClick={() => { setSelectedMatchId('m-1'); setActiveTab('derby-history'); }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedMatchId === 'm-1'
                  ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Blue Lock FC 4 - 3 Coach FC (14 Oct Derby)</span>
            </button>
          </div>

          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171F2C] border border-[#283141] text-xs font-semibold uppercase tracking-wider text-[#929BA9]">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span>
                {selectedMatchId === 'm-mcs-captains'
                  ? 'FULL TIME • 3 - 3 THRILLER • 9 BIG CHANCES CREATED'
                  : 'FULL TIME • 7-GOAL THRILLER'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#929BA9]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C6FF00]" />
                {selectedMatchId === 'm-mcs-captains' ? 'Wednesday 21 October 2026' : '14 October 2026'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                {selectedMatchId === 'm-mcs-captains' ? '20:30 Kickoff (8:30 PM)' : '20:45 Kickoff (8:45 PM)'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                The Apex Arena
              </span>
            </div>
          </div>

          {/* Epic Head-to-Head Scoreboard Grid */}
          <div className="bg-[#171F2C]/80 backdrop-blur-xl border border-[#283141] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* HOME TEAM */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right">
                <div className="flex items-center gap-4 mb-3">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                    selectedMatchId === 'm-mcs-captains'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {selectedMatchId === 'm-mcs-captains' ? 'MCS CAPTAINS • 3 GOALS BY 3 PLAYERS' : 'BLUE LOCK FC • 64% POSSESSION'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F5F7FA] font-sans">
                  {selectedMatchId === 'm-mcs-captains' ? 'MCS Captains' : 'Blue Lock FC'}
                </h2>
                <p className="text-xs sm:text-sm text-[#929BA9] mt-1 font-mono">
                  {selectedMatchId === 'm-mcs-captains' 
                    ? '3 Goals by 3 Different Players • High Press' 
                    : 'Possession Dominance & Deadly Precision'}
                </p>

                {/* Scorers list with EXACT ways scored */}
                <div className="mt-5 space-y-1.5 text-xs text-[#F5F7FA]/90">
                  {selectedMatchId === 'm-mcs-captains' ? (
                    <>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">27&apos;</span>
                        <span className="font-bold">Farhan</span>
                        <span className="text-amber-300 text-[11px] font-semibold">(Low Corner Finish)</span>
                      </div>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">52&apos;</span>
                        <span className="font-bold">Hamza (OG)</span>
                        <span className="text-orange-300 text-[11px] font-semibold">(Accidental Back-Heel Clearance Under Pressure)</span>
                      </div>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">85&apos;</span>
                        <span className="font-bold">Kamran</span>
                        <span className="text-amber-300 text-[11px] font-semibold">(3rd Different Scorer • Deflected Strike)</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">28&apos;</span>
                        <span className="font-bold">Dilshad</span>
                        <span className="text-blue-300 text-[11px] font-semibold">(Keeper Dodge Goal • Assist: Tsukioynx)</span>
                      </div>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">39&apos;</span>
                        <span className="font-bold">Tsukioynx</span>
                        <span className="text-[#C6FF00] text-[11px] font-semibold">(Midfield Solo Run • Power Shot)</span>
                      </div>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">63&apos;</span>
                        <span className="font-bold">Faheem</span>
                        <span className="text-cyan-300 text-[11px] font-semibold">(Clear Dodge: Defender & Keeper)</span>
                      </div>
                      <div className="flex items-center gap-2 lg:justify-end">
                        <span className="text-[#C6FF00] font-mono">74&apos;</span>
                        <span className="font-bold">Dilshad</span>
                        <span className="text-blue-300 text-[11px] font-semibold">(Clear Finish • Assist: Tsukioynx)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SCORE BOARD CENTER */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 border-y lg:border-y-0 lg:border-x border-[#283141]">
                <div className="flex items-center justify-center gap-4 font-black">
                  <span className="text-6xl sm:text-7xl font-extrabold text-[#F5F7FA] tracking-tighter">
                    {selectedMatchId === 'm-mcs-captains' ? '3' : '4'}
                  </span>
                  <span className="text-3xl text-[#929BA9]/40">-</span>
                  <span className="text-6xl sm:text-7xl font-extrabold text-[#C6FF00] tracking-tighter">
                    {selectedMatchId === 'm-mcs-captains' ? '3' : '3'}
                  </span>
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-[#080B12] border border-[#283141] text-[11px] font-mono text-[#929BA9]">
                  HT: {selectedMatchId === 'm-mcs-captains' ? '1 - 1' : '2 - 1'}
                </div>
                <span className="mt-3 text-[10px] uppercase tracking-widest text-[#929BA9] font-bold">
                  Final Whistle
                </span>
              </div>

              {/* AWAY TEAM: Coach FC */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30">
                    COACH FC • {selectedMatchId === 'm-mcs-captains' ? '9 BIG CHANCES CREATED' : 'FIGHTING SPIRIT'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F5F7FA] font-sans">
                  Coach FC
                </h2>
                <p className="text-xs sm:text-sm text-[#929BA9] mt-1 font-mono">
                  {selectedMatchId === 'm-mcs-captains'
                    ? 'Tsukioynx 9 Chances • Abrar 1G+1A • Usman Volley • Zohaib Header'
                    : 'Sensational Volley, Free-Kick & Late Rush'}
                </p>

                {/* Scorers list with EXACT ways scored */}
                <div className="mt-5 space-y-1.5 text-xs text-[#F5F7FA]/90">
                  {selectedMatchId === 'm-mcs-captains' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6FF00] font-mono">18&apos;</span>
                        <span className="font-bold">Abrar</span>
                        <span className="text-amber-300 text-[11px] font-semibold">(Clinical Strike • Assist: Tsukioynx)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6FF00] font-mono">64&apos;</span>
                        <span className="font-bold">Usman</span>
                        <span className="text-emerald-300 text-[11px] font-semibold">(Thunderbolt Volley! • Assist: Abrar)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6FF00] font-mono">76&apos;</span>
                        <span className="font-bold">Zohaib</span>
                        <span className="text-cyan-300 text-[11px] font-semibold">(Towering Bullet Header! • Assist: Tsukioynx)</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6FF00] font-mono">14&apos;</span>
                        <span className="font-bold">Aliyan</span>
                        <span className="text-emerald-300 text-[11px] font-semibold">(Spectacular Volley!)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6FF00] font-mono">51&apos;</span>
                        <span className="font-bold">Sheryar</span>
                        <span className="text-amber-300 text-[11px] font-semibold">(Direct Free-Kick Golazo!)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6FF00] font-mono">86&apos;</span>
                        <span className="font-bold">Savaiz</span>
                        <span className="text-rose-300 text-[11px] font-semibold">(Tap-In • Rush in the D)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* LIVE POSSESSION & CHANCES TELEMETRY BAR */}
            <div className="mt-8 pt-6 border-t border-[#283141]">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className={selectedMatchId === 'm-mcs-captains' ? 'text-amber-400' : 'text-blue-400'}>
                  {selectedMatchId === 'm-mcs-captains' ? 'MCS Captains 48% POSSESSION' : 'Blue Lock FC 64% POSSESSION'}
                </span>
                <span className="text-[#929BA9]">
                  {selectedMatchId === 'm-mcs-captains' ? '9 BIG CHANCES CREATED BY TSUKIOYNX' : 'BALL POSSESSION METRIC'}
                </span>
                <span className="text-[#C6FF00]">
                  {selectedMatchId === 'm-mcs-captains' ? '52% Coach FC' : '36% Coach FC'}
                </span>
              </div>
              <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    selectedMatchId === 'm-mcs-captains'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                      : 'bg-gradient-to-r from-blue-600 to-blue-400'
                  }`}
                  style={{ width: selectedMatchId === 'm-mcs-captains' ? '48%' : '64%' }}
                />
                <div 
                  className="h-full bg-gradient-to-r from-[#C6FF00] to-lime-300 transition-all duration-1000"
                  style={{ width: selectedMatchId === 'm-mcs-captains' ? '52%' : '36%' }}
                />
              </div>

              {/* Match Key Narrative Alert */}
              <div className="mt-5 p-4 rounded-xl bg-[#080B12]/80 border border-[#283141] flex items-start gap-3 text-xs leading-relaxed text-[#F5F7FA]/80">
                <AlertCircle className="w-5 h-5 text-[#C6FF00] shrink-0 mt-0.5" />
                <p>
                  {selectedMatchId === 'm-mcs-captains' ? (
                    <>
                      <strong className="text-[#F5F7FA]">Match Breakdown (Wednesday Showcase): </strong>
                      An electric 6-goal duel! Coach FC captain <strong>Tsukioynx was the undisputed Master of the Pitch</strong>, crafting an incredible <strong>9 BIG CHANCES CREATED</strong> and 2 pinpoint assists. <strong>Abrar</strong> produced a clutch masterclass with 1 goal and 1 assist, while <strong>Usman</strong> rocketed home an unstoppable volley and <strong>Zohaib</strong> powered in a set-piece bullet header. In defense, <strong>Zohaib and Huzaifa struggled under MCS pressure</strong>, though Huzaifa proved defensively much better in positioning and ground reading. <strong>Aliyan</strong> maintained his standing as Coach FC’s clean sheet leader (16 CS), <strong>Jamshaid</strong> gave an uncompromising shift in the full kit (#2), while keeper <strong>Hamza</strong> made 8 crucial saves to preserve the draw despite an accidental back-heel own goal under heavy traffic.
                    </>
                  ) : (
                    <>
                      <strong className="text-[#F5F7FA]">Match Breakdown: </strong>
                      Blue Lock FC held supreme control with 64% possession. <strong>Tsukioynx</strong> was unplayable, scoring a solo power shot from midfield after cutting past defenders, providing <strong>2 clear assists</strong>, and creating <strong>3 big chances</strong>. <strong>Faheem</strong> scored by dodging cleanly past both defender and goalkeeper Hamza, while creating 2 chances. <strong>Dilshad</strong> struck twice including a keeper dodge goal. For Coach FC, <strong>Aliyan</strong> had a brilliant game scoring a stunning volley, <strong>Sheryar</strong> scored a direct free-kick, and <strong>Savaiz</strong> converted a tap-in amidst heavy traffic in the D despite missing earlier opportunities.
                    </>
                  )}
                </p>
              </div>

              {/* Match Visual Highlights Snapshot (WhatsApp Media Match Footage & Action) */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border border-[#283141] hover:border-[#C6FF00]/50 transition-all bg-[#171F2C] p-3 flex items-center gap-3.5"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-[#283141] group-hover:scale-105 transition-transform">
                    <img 
                      src="/media/coachfc-match-1.jpg" 
                      alt="Coach FC Match Action" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C6FF00] font-bold uppercase">
                      <span>📸 Matchday Capture</span>
                    </div>
                    <h5 className="text-xs font-bold text-[#F5F7FA] truncate mt-0.5 group-hover:text-[#C6FF00] transition-colors">
                      Coach FC Live Pitch Action
                    </h5>
                    <p className="text-[10px] text-[#929BA9] truncate">Matchday photography from the pitch</p>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border border-[#283141] hover:border-[#C6FF00]/50 transition-all bg-[#171F2C] p-3 flex items-center gap-3.5"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-[#283141] group-hover:scale-105 transition-transform relative">
                    <video 
                      src="/media/coachfc-highlight-1.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[7px] font-mono text-[#C6FF00] uppercase font-bold">
                      Muted
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C6FF00] font-bold uppercase">
                      <span>⚽ Match Reel Highlight</span>
                    </div>
                    <h5 className="text-xs font-bold text-[#F5F7FA] truncate mt-0.5 group-hover:text-[#C6FF00] transition-colors">
                      On-Pitch Match Footage
                    </h5>
                    <p className="text-[10px] text-[#929BA9] truncate">Live action tape from WhatsApp media</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* TAB CONTROLS */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            <button
              onClick={() => setActiveTab('derby-history')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'derby-history'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_25px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] hover:text-[#F5F7FA] border border-[#283141]'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Derby H2H Series (6 Matches)
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'ratings'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_25px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] hover:text-[#F5F7FA] border border-[#283141]'
              }`}
            >
              <Award className="w-4 h-4" />
              {selectedMatchId === 'm-mcs-captains' ? 'Official Player Ratings (Wed 21 Oct)' : 'Official Player Ratings (14 Oct)'}
            </button>
            <Link
              href="/cards"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ultimate FUT Cards (0-99 Ratings)</span>
            </Link>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'timeline'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_25px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] hover:text-[#F5F7FA] border border-[#283141]'
              }`}
            >
              <Clock className="w-4 h-4" />
              {selectedMatchId === 'm-mcs-captains' ? '21 Oct Goals & Timeline (3-3)' : '14 Oct Goals & Timeline (4-3)'}
            </button>
            <button
              onClick={() => setActiveTab('lineups')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'lineups'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_25px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] hover:text-[#F5F7FA] border border-[#283141]'
              }`}
            >
              <Users className="w-4 h-4" />
              {selectedMatchId === 'm-mcs-captains' ? 'Confirmed Lineups (vs MCS)' : 'Confirmed Team Lineups & Subs (14 Oct)'}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'stats'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_25px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] hover:text-[#F5F7FA] border border-[#283141]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Possession & Performance Telemetry
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_25px_rgba(198,255,0,0.4)]'
                  : 'bg-[#171F2C] text-[#929BA9] hover:text-[#F5F7FA] border border-[#283141]'
              }`}
            >
              <Camera className="w-4 h-4" />
              Match Night & Club Gallery
            </button>
          </div>

        </div>
      </section>

      {/* CONTENT TABS */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TAB 1: PLAYER RATINGS */}
        {activeTab === 'ratings' && (
          <div id="ratings" className="space-y-8 animate-fadeIn">
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111722] p-6 rounded-2xl border border-[#283141]">
              <div>
                <h3 className="text-2xl font-black text-[#F5F7FA]">
                  Decided Player Ratings
                </h3>
                <p className="text-xs text-[#929BA9] mt-1 font-mono">
                  {selectedMatchId === 'm-mcs-captains'
                    ? 'Ratings reflect Captain Tsukioynx’s 9 big chances created & 2 assists, Abrar’s 1G+1A, Usman’s volley, Zohaib’s bullet header, Hamza’s 8 crucial saves despite unfortunate back-heel OG, and Huzaifa’s defensive shifts.'
                    : 'Ratings reflect Tsukioynx’s solo power strike & 2 assists, Faheem’s dodge goal, Aliyan’s volley, Sheryar’s free kick, Dilshad’s brace & misses, and Savaiz’s tap-in & missed chances.'}
                </p>
              </div>

              {/* Team Filter Pills */}
              <div className="flex items-center gap-2 bg-[#080B12] p-1.5 rounded-xl border border-[#283141]">
                <button
                  onClick={() => setTeamFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    teamFilter === 'ALL'
                      ? 'bg-[#C6FF00] text-[#080B12]'
                      : 'text-[#929BA9] hover:text-[#F5F7FA]'
                  }`}
                >
                  All ({mergedRatings.length})
                </button>
                <button
                  onClick={() => setTeamFilter('COACH_FC')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    teamFilter === 'COACH_FC'
                      ? 'bg-[#C6FF00] text-[#080B12]'
                      : 'text-[#929BA9] hover:text-[#F5F7FA]'
                  }`}
                >
                  Coach FC ({mergedRatings.filter(p => p.team === 'Coach FC').length})
                </button>
                {selectedMatchId === 'm-1' && (
                  <button
                    onClick={() => setTeamFilter('BLUE_LOCK')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      teamFilter === 'BLUE_LOCK'
                        ? 'bg-blue-500 text-white'
                        : 'text-[#929BA9] hover:text-[#F5F7FA]'
                    }`}
                  >
                    Blue Lock FC ({mergedRatings.filter(p => p.team === 'Blue Lock FC').length})
                  </button>
                )}
              </div>
            </div>

            {/* Player Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRatings.map((p, idx) => (
                <RatingCardItem key={idx} p={p} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED GOALS & MOMENTS TIMELINE */}
        {activeTab === 'timeline' && (
          <div id="timeline" className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-[#111722] p-6 rounded-2xl border border-[#283141] mb-8 text-center">
              <h3 className="text-2xl font-black text-[#F5F7FA]">
                {selectedMatchId === 'm-mcs-captains'
                  ? 'MCS Captains 3 - 3 Coach FC • Match Chronology'
                  : 'Blue Lock FC 4 - 3 Coach FC • Match Chronology'}
              </h3>
              <p className="text-xs text-[#929BA9] mt-1 font-mono">
                {selectedMatchId === 'm-mcs-captains'
                  ? 'Wednesday 21 October 2026 • 6 Goals, 9 Big Chances Created, 1 Keeper Back-Heel OG & 8 Crucial Saves'
                  : 'Direct free-kicks, volleys, solo power strikes, goalkeeper dodges, and crowded scramble tap-ins.'}
              </p>
            </div>

            {selectedMatchId === 'm-mcs-captains' ? (
              <div className="relative border-l-2 border-[#283141] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
                {/* 18' ABRAR GOAL */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(198,255,0,0.5)]">
                    ⚽
                  </div>
                  <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#C6FF00] font-bold">18&apos; — GOAL (COACH FC)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">0 - 1</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                      <span>Abrar breaks the deadlock! (Assist: Captain Tsukioynx)</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00]">CLINICAL FINISH</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      Captain Tsukioynx splits the MCS defense with a razor-sharp through ball. Abrar collects with his first touch, cuts past his marker, and rifles a clinical strike into the bottom right corner!
                    </p>
                  </div>
                </div>

                {/* 27' FARHAN GOAL */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-amber-400 text-[#080B12] flex items-center justify-center font-black text-xs">
                    ⚽
                  </div>
                  <div className="bg-[#171F2C] border border-amber-500/30 p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-amber-400 font-bold">27&apos; — GOAL (MCS CAPTAINS)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">1 - 1</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                      <span>Farhan equalizes for MCS Captains</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">SCORER 1</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      MCS Captains capitalize on an uncharacteristic gap in Coach FC’s defense. Farhan takes a touch at the edge of the D and drills a low effort into the corner.
                    </p>
                  </div>
                </div>

                {/* 41' HAMZA HEROIC DOUBLE SAVE */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">
                    🧤
                  </div>
                  <div className="bg-[#171F2C] border border-blue-500/30 p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-blue-400 font-bold">41&apos; — CRUCIAL SAVES (COACH FC)</span>
                      <span className="text-[#929BA9]">Score: 1 - 1</span>
                    </div>
                    <h4 className="text-sm font-bold text-blue-300">
                      Hamza point-blank reflex double save
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      MCS striker breaks free 6 yards out, but Hamza throws his body on the line to block the first effort and scrambles back to claw the rebound away from danger!
                    </p>
                  </div>
                </div>

                {/* 52' HAMZA ACCIDENTAL BACK-HEEL OWN GOAL */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs">
                    ⚠️
                  </div>
                  <div className="bg-[#171F2C]/70 border border-rose-500/30 p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-rose-400 font-bold">52&apos; — UNFORTUNATE OWN GOAL (MCS CAPTAINS)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">2 - 1</span>
                    </div>
                    <h4 className="text-base font-bold text-rose-300 flex items-center gap-2">
                      <span>Keeper Hamza accidental back-heel clearance deflection</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">SCORER 2 / OG</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1 leading-relaxed">
                      Heavy back-pass pressure forces keeper Hamza into a hurried back-heel clearance flick near the goal line; mistakenly misdirected, the ball trickles across into the net under intense challenge.
                    </p>
                  </div>
                </div>

                {/* 64' USMAN VOLLEY GOAL */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(198,255,0,0.5)]">
                    ⚽
                  </div>
                  <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#C6FF00] font-bold">64&apos; — GOAL (COACH FC)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">2 - 2</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                      <span>Usman thumps a breathtaking volley! (Assist: Abrar)</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300">THUNDERBOLT VOLLEY</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      Abrar burns past his marker down the left flank and floats a laser-guided cross towards the penalty spot. Usman connects cleanly on the half-volley, smashing it past the keeper into the top netting!
                    </p>
                  </div>
                </div>

                {/* 76' ZOHAIB BULLET HEADER GOAL */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(198,255,0,0.5)]">
                    ⚽
                  </div>
                  <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#C6FF00] font-bold">76&apos; — GOAL (COACH FC)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">2 - 3</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                      <span>Zohaib bullet header from Tsukioynx’s cross!</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300">BULLET HEADER</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      Captain Tsukioynx swings in an unplayable set-piece cross right into the corridor of uncertainty. Defender Zohaib leaps high above the MCS defense to direct a powerhouse header into the net!
                    </p>
                  </div>
                </div>

                {/* 85' KAMRAN GOAL */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-amber-400 text-[#080B12] flex items-center justify-center font-black text-xs">
                    ⚽
                  </div>
                  <div className="bg-[#171F2C] border border-amber-500/30 p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-amber-400 font-bold">85&apos; — GOAL (MCS CAPTAINS)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">3 - 3</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                      <span>Kamran salvages 3-3 draw for MCS Captains</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">SCORER 3</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      MCS Captains push everyone forward. Kamran strikes from 12 yards through a crowded box; the ball takes a slight deflection and creeps inside the left post to make it 3-3!
                    </p>
                  </div>
                </div>

                {/* 89' HAMZA FINGERTIP SAVE */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-emerald-400 text-[#080B12] flex items-center justify-center font-black text-xs">
                    🧤
                  </div>
                  <div className="bg-[#171F2C] border border-emerald-500/30 p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-emerald-400 font-bold">89&apos; — HEROIC SAVE (COACH FC)</span>
                      <span className="text-[#929BA9]">Score: 3 - 3</span>
                    </div>
                    <h4 className="text-sm font-bold text-emerald-300">
                      Hamza tips dipping shot over the crossbar
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      MCS Captains nearly steal victory in the dying seconds, but Hamza tracks the dipping drive all the way and paws it over the bar to ensure Coach FC leaves with a point!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative border-l-2 border-[#283141] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
                {/* 14' ALiYAN VOLLEY */}
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(198,255,0,0.5)]">
                    ⚽
                  </div>
                  <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#C6FF00] font-bold">14&apos; — GOAL (COACH FC)</span>
                      <span className="text-xs font-black text-[#F5F7FA]">0 - 1</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                      <span>Aliyan unleashes a sensational volley!</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00]">VOLLEY</span>
                    </h4>
                    <p className="text-xs text-[#929BA9] mt-1">
                      A cleared ball drops outside the box. Aliyan watches it all the way down and catches it sweetly on the volley, rocketing it into the side netting past keeper Ali!
                    </p>
                  </div>
                </div>

              {/* 23' SAVAIZ MISSED CHANCE */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs">
                  ❌
                </div>
                <div className="bg-[#171F2C]/60 border border-rose-500/30 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400 font-bold">23&apos; — BIG CHANCE MISSED (COACH FC)</span>
                    <span className="text-[#929BA9]">Score: 0 - 1</span>
                  </div>
                  <h4 className="text-sm font-bold text-rose-300">
                    Savaiz misses 1-on-1 chance
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Savaiz races through on goal with time and space, but hesitates and his shot is blocked by keeper Ali.
                  </p>
                </div>
              </div>

              {/* 28' DILSHAD GOAL (KEEPER DODGE) */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">
                  ⚽
                </div>
                <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-blue-400 font-bold">28&apos; — GOAL (BLUE LOCK FC)</span>
                    <span className="text-xs font-black text-[#F5F7FA]">1 - 1</span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span>Dilshad clear goal with goalkeeper dodge (Assist: Tsukioynx)</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">GK DODGE</span>
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Tsukioynx dissects Coach FC&apos;s defense with a visionary through-pass (Assist 1). Dilshad bursts through, executes a clever body dodge around keeper Hamza, and slots smoothly into an empty net!
                  </p>
                </div>
              </div>

              {/* 34' DILSHAD MISSED CHANCE */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs">
                  ❌
                </div>
                <div className="bg-[#171F2C]/60 border border-rose-500/30 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400 font-bold">34&apos; — BIG CHANCE MISSED (BLUE LOCK FC)</span>
                    <span className="text-[#929BA9]">Score: 1 - 1</span>
                  </div>
                  <h4 className="text-sm font-bold text-rose-300">
                    Dilshad misses follow-up chance
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Another clear chance carved open by Tsukioynx, but Dilshad rattles the crossbar from 10 yards.
                  </p>
                </div>
              </div>

              {/* 39' TSUKIOYNX SOLO RUN & POWER SHOT */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(198,255,0,0.5)]">
                  ⚽
                </div>
                <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-blue-400 font-bold">39&apos; — GOAL (BLUE LOCK FC)</span>
                    <span className="text-xs font-black text-[#F5F7FA]">2 - 1</span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span>Tsukioynx solo run from midfield & proper power shot!</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00]">SOLO POWER SHOT</span>
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Breathtaking solo goal! Tsukioynx receives the ball in midfield, slices directly between two defenders with lightning agility, cuts inside, and unleashes a ferocious, proper power shot that crashes in off the underside of the bar!
                  </p>
                </div>
              </div>

              {/* 44' SAVAIZ MISSED CHANCE */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs">
                  ❌
                </div>
                <div className="bg-[#171F2C]/60 border border-rose-500/30 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400 font-bold">44&apos; — BIG CHANCE MISSED (COACH FC)</span>
                    <span className="text-[#929BA9]">Score: 2 - 1</span>
                  </div>
                  <h4 className="text-sm font-bold text-rose-300">
                    Savaiz drags shot wide of the post
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Right before halftime, Shafin tees up Savaiz 8 yards out, but Savaiz pulls his strike wide of the target.
                  </p>
                </div>
              </div>

              {/* 51' SHERYAR DIRECT FREE-KICK */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs">
                  ⚽
                </div>
                <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#C6FF00] font-bold">51&apos; — GOAL (COACH FC)</span>
                    <span className="text-xs font-black text-[#F5F7FA]">2 - 2</span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span>Sheryar scores a stunning direct Free Kick!</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">DIRECT FREE KICK</span>
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Coach FC is awarded a free-kick 24 yards out. Defender Sheryar steps up and curls a gorgeous, dipping effort over Blue Lock’s wall straight into the top right corner! 2-2!
                  </p>
                </div>
              </div>

              {/* 63' FAHEEM DODGE GOAL THROUGH DEFENDER & KEEPER */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">
                  ⚽
                </div>
                <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-blue-400 font-bold">63&apos; — GOAL (BLUE LOCK FC)</span>
                    <span className="text-xs font-black text-[#F5F7FA]">3 - 2</span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span>Faheem clear goal with double dodge past defender & keeper!</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300">DEFENDER & GK DODGE</span>
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Masterful individual skill from Faheem! Drives into the box, executes a sharp fake to completely dodge past Huzaifa, and then swerves past keeper Hamza with a second dodge before rolling the ball into the net!
                  </p>
                </div>
              </div>

              {/* 67' SAVAIZ MISSED HEADER */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs">
                  ❌
                </div>
                <div className="bg-[#171F2C]/60 border border-rose-500/30 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400 font-bold">67&apos; — BIG CHANCE MISSED (COACH FC)</span>
                    <span className="text-[#929BA9]">Score: 3 - 2</span>
                  </div>
                  <h4 className="text-sm font-bold text-rose-300">
                    Savaiz heads over in the six-yard box
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Hammad delivers an inch-perfect cross onto Savaiz’s head, but Savaiz mistimes his jump and sends the free header over the bar.
                  </p>
                </div>
              </div>

              {/* 74' DILSHAD CLEAR GOAL */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">
                  ⚽
                </div>
                <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-blue-400 font-bold">74&apos; — GOAL (BLUE LOCK FC)</span>
                    <span className="text-xs font-black text-[#F5F7FA]">4 - 2</span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span>Dilshad bags brace (Assist: Tsukioynx)</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">2ND ASSIST TSUKIOYNX</span>
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1">
                    Tsukioynx registers his second clear assist of the night with another laser-guided pass through the lines. Dilshad controls cleanly and finishes with authority for 4-2!
                  </p>
                </div>
              </div>

              {/* 86' SAVAIZ TAP-IN (RUSH IN THE D) */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(198,255,0,0.5)]">
                  ⚽
                </div>
                <div className="bg-[#171F2C] border border-[#283141] p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#C6FF00] font-bold">86&apos; — GOAL (COACH FC)</span>
                    <span className="text-xs font-black text-[#F5F7FA]">4 - 3</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C6FF00] shrink-0 bg-[#080B12] shadow-sm">
                      <img
                        src="/players/savaiz.jpg"
                        alt="Savaiz Goal"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2 flex-wrap">
                        <span>Savaiz tap-in amid massive rush in the D!</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00]">RUSH IN THE D TAP-IN</span>
                      </h4>
                      <span className="text-[11px] font-mono text-[#929BA9]">Savaiz • Coach FC #29</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#929BA9] mt-1 leading-relaxed">
                    Absolute chaos and congestion inside the penalty D! Multiple bodies scramble for a loose ball after Aliyan and Shafin press. Savaiz pounces on the loose rebound and taps it in from close range to make it 4-3!
                  </p>
                </div>
              </div>

            </div>
            )}
          </div>
        )}

        {/* TAB 3: CONFIRMED TEAM LINEUPS & SUBS */}
        {activeTab === 'lineups' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#111722] p-6 rounded-2xl border border-[#283141] text-center">
              <h3 className="text-2xl font-black text-[#F5F7FA]">
                Official Squad Deployments & Matchday Lineups
              </h3>
              <p className="text-xs text-[#929BA9] mt-1 font-mono">
                {selectedMatchId === 'm-mcs-captains'
                  ? 'Confirmed player selections for MCS Captains vs Coach FC (Wednesday 21 October 2026).'
                  : 'Confirmed player selections for the 14 October 2026 match.'}
              </p>
            </div>

            {selectedMatchId === 'm-mcs-captains' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* MCS Captains Lineup */}
                <div className="bg-[#171F2C] border border-amber-500/30 p-6 sm:p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#283141]">
                    <div>
                      <h4 className="text-xl font-bold text-amber-400">MCS Captains</h4>
                      <span className="text-xs text-[#929BA9] font-mono">3 Goals by 3 Different Scorers • High Press</span>
                    </div>
                    <span className="text-3xl font-black text-amber-400">3</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">MCS Keeper (Keeper)</span>
                      <span className="font-mono text-amber-400 font-bold">GK • 7.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Bilal (Defender)</span>
                      <span className="font-mono text-amber-400 font-bold">DEF • 7.1</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Tariq (Defender)</span>
                      <span className="font-mono text-amber-400 font-bold">DEF • 6.9</span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Farhan (Midfield • 27&apos; Clinical Equalizer)</span>
                      <span className="font-mono text-amber-300 font-black">MID • 8.4</span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Kamran (Forward • 85&apos; Scramble Equalizer)</span>
                      <span className="font-mono text-amber-300 font-black">FWD • 8.2</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Asad (Forward • High Pressing Runner)</span>
                      <span className="font-mono text-amber-400 font-bold">FWD • 7.5</span>
                    </div>
                  </div>
                </div>

                {/* Coach FC Lineup */}
                <div className="bg-[#171F2C] border border-[#C6FF00]/30 p-6 sm:p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#283141]">
                    <div>
                      <h4 className="text-xl font-bold text-[#C6FF00]">Coach FC</h4>
                      <span className="text-xs text-[#929BA9] font-mono">9 Big Chances Created • Dynamic Attacks</span>
                    </div>
                    <span className="text-3xl font-black text-[#C6FF00]">3</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#080B12] border border-blue-500/20 flex items-center justify-between">
                      <span className="font-semibold">Hamza (Keeper • 8 Crucial Saves & Back-Heel OG)</span>
                      <span className="font-mono text-blue-400 font-bold">GK • 6.8</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Jamshaid (Right Back • Hard Tackler)</span>
                      <span className="font-mono text-[#929BA9] font-bold">DEF • 7.4</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Huzaifa (Center Back • Defensive Shifts)</span>
                      <span className="font-mono text-[#929BA9] font-bold">DEF • 6.9</span>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Zohaib (Center Back • 76&apos; Bullet Header Goal)</span>
                      <span className="font-mono text-cyan-300 font-black">DEF • 7.8</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Aliyan (Wing Back • 16 Clean Sheets Leader)</span>
                      <span className="font-mono text-emerald-400 font-black">DEF • 8.1</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#C6FF00]/15 border border-[#C6FF00] flex items-center justify-between font-bold text-[#F5F7FA] shadow-[0_0_15px_rgba(198,255,0,0.2)]">
                      <span>Tsukioynx (Captain • 9 Big Chances Created • 2 Assists)</span>
                      <span className="font-mono text-[#C6FF00] font-black">MID • 9.7 ⭐</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Usman (Midfielder • 64&apos; Thunderbolt Volley)</span>
                      <span className="font-mono text-emerald-400 font-black">MID • 8.6</span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Abrar (Forward • 18&apos; Goal + Laser Cross Assist)</span>
                      <span className="font-mono text-amber-300 font-black">FWD • 9.1</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Blue Lock FC Lineup */}
                <div className="bg-[#171F2C] border border-[#283141] p-6 sm:p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#283141]">
                    <div>
                      <h4 className="text-xl font-bold text-blue-400">Blue Lock FC</h4>
                      <span className="text-xs text-[#929BA9] font-mono">64% Possession • Tiki-Taka System</span>
                    </div>
                    <span className="text-3xl font-black text-blue-400">4</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Ali (Keeper)</span>
                      <span className="font-mono text-blue-400 font-bold">GK • 6.9</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Basit (Defender)</span>
                      <span className="font-mono text-blue-400 font-bold">DEF • 7.3</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Shakeel (Defender)</span>
                      <span className="font-mono text-blue-400 font-bold">DEF • 7.2</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Zohaib (Defender)</span>
                      <span className="font-mono text-blue-400 font-bold">DEF • 7.4</span>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Faheem (Midfield • Dodge Goal + 2 Chances Created)</span>
                      <span className="font-mono text-cyan-300 font-black">MID • 8.8</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#C6FF00]/10 border border-[#C6FF00]/40 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Tsukioynx (Midfield • Solo Power Shot + 2 Assists + 3 Ch)</span>
                      <span className="font-mono text-[#C6FF00] font-black">MID • 9.5</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Ikram (Midfield)</span>
                      <span className="font-mono text-blue-400 font-bold">MID • 7.5</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Dilshad (Striker • 2 Goals with GK Dodge)</span>
                      <span className="font-mono text-blue-300 font-black">ST • 8.4</span>
                    </div>

                    {/* Subs Section */}
                    <div className="pt-4 border-t border-[#283141]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#929BA9] block mb-2">
                        Substitutes Used
                      </span>
                      <div className="p-3 rounded-xl bg-[#080B12]/60 border border-[#283141] flex items-center justify-between">
                        <span>Abdul Rehman & Hashi (Substitutes)</span>
                        <span className="font-mono text-[#929BA9]">SUB • 6.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coach FC Lineup */}
                <div className="bg-[#171F2C] border border-[#283141] p-6 sm:p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#283141]">
                    <div>
                      <h4 className="text-xl font-bold text-[#C6FF00]">Coach FC</h4>
                      <span className="text-xs text-[#929BA9] font-mono">Rapid Transition & Set-Piece Threat</span>
                    </div>
                    <span className="text-3xl font-black text-[#C6FF00]">3</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Hamza (Keeper • 6 Saves)</span>
                      <span className="font-mono text-[#929BA9] font-bold">GK • 6.8</span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Sheryar (Defend • Direct Free-Kick Goal)</span>
                      <span className="font-mono text-amber-300 font-black">DEF • 8.2</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Aliyan (Defend • Spectacular Volley Goal)</span>
                      <span className="font-mono text-emerald-400 font-black">DEF • 8.6</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Jamshaid (Defender)</span>
                      <span className="font-mono text-[#929BA9]">DEF • 7.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Huzaifa (Defender)</span>
                      <span className="font-mono text-[#929BA9]">DEF • 7.1</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Jibran (Midfield)</span>
                      <span className="font-mono text-[#929BA9]">MID • 7.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080B12] flex items-center justify-between">
                      <span className="font-semibold">Hammad (Flank / Attack)</span>
                      <span className="font-mono text-[#929BA9]">FWD • 7.1</span>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Shafin (Striker in Coach FC)</span>
                      <span className="font-mono text-purple-300 font-black">ST • 7.2</span>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between font-bold text-[#F5F7FA]">
                      <span>Savaiz (Striker • Tap-In in Rush of D • Missed Ch)</span>
                      <span className="font-mono text-rose-400 font-black">ST • 6.7</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-[#F5F7FA]">
                      <span className="font-semibold">Adan (Forward / Impact Sub • Pressing & Dribbles)</span>
                      <span className="font-mono text-emerald-400 font-bold">FWD • 7.2</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-[#F5F7FA]">
                      <span className="font-semibold">Danish (Defender / Fullback • Flank Interceptions)</span>
                      <span className="font-mono text-blue-300 font-bold">DEF • 7.1</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DERBY H2H HISTORY */}
        {activeTab === 'derby-history' && (
          <div id="derby-history" className="space-y-8 animate-fadeIn">
            {/* Header & Series Statistics */}
            <div className="bg-[#111722] p-6 sm:p-8 rounded-3xl border border-[#283141] text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171F2C] border border-[#283141] text-xs font-mono text-[#C6FF00] uppercase mb-3">
                <Trophy className="w-3.5 h-3.5" />
                <span>Historic Rivalry Head-to-Head Series</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#F5F7FA]">
                Coach FC vs Blue Lock FC
              </h3>
              <p className="text-xs sm:text-sm text-[#929BA9] mt-2 max-w-xl mx-auto font-mono">
                Official records of all 6 matches contested between Coach FC and Blue Lock FC in the Autumn 2026 Campaign.
              </p>

              {/* 4 Summary Stat Widgets */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-[#171F2C] border border-[#283141] p-4 rounded-2xl">
                  <span className="text-xs text-[#929BA9] font-mono block">Matches Played</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#F5F7FA] mt-1 block">6</span>
                  <span className="text-[10px] text-[#929BA9]">13 Sep – 14 Oct</span>
                </div>
                <div className="bg-[#171F2C] border border-blue-500/30 p-4 rounded-2xl">
                  <span className="text-xs text-blue-400 font-mono block">Blue Lock FC Wins</span>
                  <span className="text-2xl sm:text-3xl font-black text-blue-400 mt-1 block">5</span>
                  <span className="text-[10px] text-[#929BA9]">26 Goals Scored</span>
                </div>
                <div className="bg-[#171F2C] border border-[#C6FF00]/30 p-4 rounded-2xl">
                  <span className="text-xs text-[#C6FF00] font-mono block">Coach FC Wins</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#C6FF00] mt-1 block">1</span>
                  <span className="text-[10px] text-[#929BA9]">17 Goals Scored</span>
                </div>
                <div className="bg-[#171F2C] border border-amber-500/30 p-4 rounded-2xl">
                  <span className="text-xs text-amber-300 font-mono block">Total Derby Goals</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 block">43</span>
                  <span className="text-[10px] text-[#929BA9]">7.17 Goals / Game Avg</span>
                </div>
              </div>
            </div>

            {/* Official H2H Matches Table */}
            <div className="bg-[#171F2C] border border-[#283141] rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <div className="p-6 border-b border-[#283141] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg font-bold text-[#F5F7FA]">Head-to-Head Match Record</h4>
                  <p className="text-xs text-[#929BA9] font-mono">Complete chronological record of all meetings</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#C6FF00] bg-[#080B12] px-3 py-1.5 rounded-lg border border-[#283141]">
                  Series Status: Blue Lock FC (5-1)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#080B12]/80 border-b border-[#283141] text-[11px] font-mono uppercase tracking-wider text-[#929BA9]">
                      <th className="py-3.5 px-6">Date</th>
                      <th className="py-3.5 px-6 text-center">Coach FC</th>
                      <th className="py-3.5 px-6 text-center">Score</th>
                      <th className="py-3.5 px-6 text-center">Blue Lock FC</th>
                      <th className="py-3.5 px-6 text-right">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283141] text-xs">
                    {/* 13 Sept 2026 */}
                    <tr className="hover:bg-[#111722]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-[#F5F7FA] font-semibold">13 September 2026</td>
                      <td className="py-4 px-6 text-center font-bold text-[#C6FF00]">6</td>
                      <td className="py-4 px-6 text-center font-mono font-black text-sm">6 — 2</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400">2</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#C6FF00] text-[#080B12]">
                          Coach FC
                        </span>
                      </td>
                    </tr>

                    {/* 14 Sept 2026 */}
                    <tr className="hover:bg-[#111722]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-[#F5F7FA] font-semibold">14 September 2026</td>
                      <td className="py-4 px-6 text-center font-bold text-[#C6FF00]">2</td>
                      <td className="py-4 px-6 text-center font-mono font-black text-sm">2 — 6</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400">6</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white">
                          Blue Lock FC
                        </span>
                      </td>
                    </tr>

                    {/* 22 Sept 2026 */}
                    <tr className="hover:bg-[#111722]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-[#F5F7FA] font-semibold">22 September 2026</td>
                      <td className="py-4 px-6 text-center font-bold text-[#C6FF00]">1</td>
                      <td className="py-4 px-6 text-center font-mono font-black text-sm">1 — 5</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400">5</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white">
                          Blue Lock FC
                        </span>
                      </td>
                    </tr>

                    {/* 30 Sept 2026 */}
                    <tr className="hover:bg-[#111722]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-[#F5F7FA] font-semibold">30 September 2026</td>
                      <td className="py-4 px-6 text-center font-bold text-[#C6FF00]">0</td>
                      <td className="py-4 px-6 text-center font-mono font-black text-sm">0 — 3</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400">3</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white">
                          Blue Lock FC
                        </span>
                      </td>
                    </tr>

                    {/* 8 Oct 2026 (Wild 11-Goal Epic) */}
                    <tr className="bg-blue-500/5 hover:bg-blue-500/10 transition-colors border-l-4 border-l-amber-400">
                      <td className="py-4 px-6 font-mono text-[#F5F7FA] font-semibold">
                        <div className="flex items-center gap-2">
                          <span>8 October 2026</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase">
                            11-GOAL EPIC
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-[#C6FF00]">5</td>
                      <td className="py-4 px-6 text-center font-mono font-black text-base text-amber-300">5 — 6</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400">6</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white">
                          Blue Lock FC
                        </span>
                      </td>
                    </tr>

                    {/* 14 Oct 2026 */}
                    <tr className="bg-[#C6FF00]/5 hover:bg-[#C6FF00]/10 transition-colors border-l-4 border-l-[#C6FF00]">
                      <td className="py-4 px-6 font-mono text-[#F5F7FA] font-semibold">
                        <div className="flex items-center gap-2">
                          <span>14 October 2026</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30 uppercase">
                            LATEST SHOWDOWN
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-[#C6FF00]">3</td>
                      <td className="py-4 px-6 text-center font-mono font-black text-base text-[#C6FF00]">3 — 4</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400">4</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white">
                          Blue Lock FC
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SPECIAL SPOTLIGHT CARD: 8TH OCTOBER 11-GOAL EPIC DETAILED BREAKDOWN */}
            <div className="bg-gradient-to-br from-[#171F2C] via-[#111722] to-[#080B12] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(251,191,36,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#283141]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                      Match Spotlight & Official Event Log
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-[#F5F7FA]">
                    8 October 2026: Coach FC 5 — 6 Blue Lock FC
                  </h4>
                  <p className="text-xs text-[#929BA9] mt-1 font-mono">
                    The 11-goal slugfest • Usman brace & assist, Tsukioynx goal & 2 assists, Dilshad brace, Husnain brace
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#080B12] px-4 py-2 rounded-2xl border border-[#283141]">
                  <span className="text-xs font-mono text-[#929BA9]">Final Result:</span>
                  <span className="text-xl font-black text-[#C6FF00]">5</span>
                  <span className="text-xs text-[#929BA9]">-</span>
                  <span className="text-xl font-black text-blue-400">6</span>
                </div>
              </div>

              {/* Two Teams Goalscorer Matrices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                {/* BLUE LOCK FC (6 GOALS) */}
                <div className="bg-[#080B12]/80 border border-blue-500/30 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-500/20">
                    <h5 className="font-bold text-blue-400 flex items-center gap-2">
                      <span>Blue Lock FC Scorers</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">6 GOALS</span>
                    </h5>
                    <span className="text-xs font-mono text-[#929BA9]">Winner</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Dilshad</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 2 goals (41&apos;, 89&apos; match-winning strike off Tsukioynx assist)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold shrink-0">
                        2 Goals
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Tsukioynx</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 1 goal (24&apos;) + 2 clear assists (for Hammad 9&apos; and Dilshad 89&apos;)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00] font-mono font-bold shrink-0">
                        1 G • 2 A
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Hammad</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 1 goal (9&apos; opening strike for Blue Lock off Tsukioynx assist)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold shrink-0">
                        1 Goal
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Faheem</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 1 goal (58&apos; rocket from 20 yards out)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-mono font-bold shrink-0">
                        1 Goal
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-500/40 shrink-0 bg-[#080B12] shadow-sm">
                          <img
                            src="/players/zohaib.jpg"
                            alt="Zohaib"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-[#F5F7FA] text-sm">Zohaib (#16)</span>
                          <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 1 goal (82&apos; towering bullet header off set-piece)</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold shrink-0">
                        1 Goal
                      </span>
                    </div>
                  </div>
                </div>

                {/* COACH FC (5 GOALS) */}
                <div className="bg-[#080B12]/80 border border-[#C6FF00]/30 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C6FF00]/20">
                    <h5 className="font-bold text-[#C6FF00] flex items-center gap-2">
                      <span>Coach FC Scorers</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00]">5 GOALS</span>
                    </h5>
                    <span className="text-xs font-mono text-[#929BA9]">Fighting Spirit</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Usman</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 2 goals (16&apos;, 75&apos; curling stunner) + 1 assist for Husnain (33&apos;)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00] font-mono font-bold shrink-0">
                        2 G • 1 A
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Husnain</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 2 goals (33&apos;, 66&apos; clinical poacher brace for Coach FC)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#C6FF00]/20 text-[#C6FF00] font-mono font-bold shrink-0">
                        2 Goals
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Aliyan</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Scored 1 goal (49&apos; stinging drive from the right channel)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-mono font-bold shrink-0">
                        1 Goal
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#171F2C] border border-[#283141] flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#F5F7FA] text-sm">Huzaifa</span>
                        <p className="text-[#929BA9] text-[11px] mt-0.5">Anchored defense with crucial goal-line clearances and aerial duels</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#080B12] text-[#929BA9] font-mono font-bold shrink-0">
                        Defense / Assist
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Match Narrative Summary */}
              <div className="mt-6 p-4 rounded-2xl bg-[#080B12] border border-[#283141] text-xs leading-relaxed text-[#929BA9]">
                <strong className="text-[#F5F7FA]">8th October Tactical Review: </strong>
                An explosive 11-goal classic! Blue Lock took an early lead through <strong>Hammad</strong> (assisted by <strong>Tsukioynx</strong>), before <strong>Usman</strong> (2 goals, 1 assist for Coach FC) and <strong>Husnain</strong> (2 goals for Coach FC) answered back heroically alongside a goal from <strong>Aliyan</strong>. For Blue Lock, <strong>Dilshad</strong> struck twice (including the 89th-minute winner off Tsukioynx&apos;s 2nd assist), with <strong>Tsukioynx</strong>, <strong>Faheem</strong>, and <strong>Zohaib</strong> also on the scoresheet to seal a breathless 5-6 victory for Blue Lock FC.
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: POSSESSION & MATCH STATS */}
        {activeTab === 'stats' && (
          <div id="stats" className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="bg-[#111722] p-6 rounded-2xl border border-[#283141] text-center">
              <h3 className="text-2xl font-black text-[#F5F7FA]">
                Tactical Telemetry & Match Statistics
              </h3>
              <p className="text-xs text-[#929BA9] mt-1 font-mono">
                Blue Lock FC’s high possession strategy vs. Coach FC’s counter-attacking resistance.
              </p>
            </div>

            {/* Stats Comparison Bars */}
            <div className="bg-[#171F2C] border border-[#283141] rounded-3xl p-6 sm:p-8 space-y-6">
              
              {/* Possession */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-blue-400">Blue Lock FC 64%</span>
                  <span className="text-[#929BA9]">Ball Possession</span>
                  <span className="text-[#C6FF00]">Coach FC 36%</span>
                </div>
                <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                  <div className="h-full bg-blue-500" style={{ width: '64%' }} />
                  <div className="h-full bg-[#C6FF00]" style={{ width: '36%' }} />
                </div>
              </div>

              {/* Chances Created */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-blue-400">5 Chances Created (Tsukioynx 3, Faheem 2)</span>
                  <span className="text-[#929BA9]">Key Chances Created</span>
                  <span className="text-[#C6FF00]">2 Chances Created</span>
                </div>
                <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                  <div className="h-full bg-blue-500" style={{ width: '71%' }} />
                  <div className="h-full bg-[#C6FF00]" style={{ width: '29%' }} />
                </div>
              </div>

              {/* Shots on Target */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-blue-400">12 (22 total)</span>
                  <span className="text-[#929BA9]">Shots on Target (Total Shots)</span>
                  <span className="text-[#C6FF00]">7 (13 total)</span>
                </div>
                <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                  <div className="h-full bg-blue-500" style={{ width: '63%' }} />
                  <div className="h-full bg-[#C6FF00]" style={{ width: '37%' }} />
                </div>
              </div>

              {/* Big Chances Missed */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-blue-400">2 Missed (Dilshad x2)</span>
                  <span className="text-rose-400 font-bold">Big Chances Missed</span>
                  <span className="text-[#C6FF00]">3 Missed (Savaiz x3)</span>
                </div>
                <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                  <div className="h-full bg-rose-500/80" style={{ width: '40%' }} />
                  <div className="h-full bg-rose-500" style={{ width: '60%' }} />
                </div>
              </div>

              {/* Passes Completed */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-blue-400">642 passes (92% acc)</span>
                  <span className="text-[#929BA9]">Passes Completed</span>
                  <span className="text-[#C6FF00]">318 passes (80% acc)</span>
                </div>
                <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                  <div className="h-full bg-blue-500" style={{ width: '67%' }} />
                  <div className="h-full bg-[#C6FF00]" style={{ width: '33%' }} />
                </div>
              </div>

              {/* Tackles & Defensive Duels */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-blue-400">16 Tackles Won</span>
                  <span className="text-[#929BA9]">Tackles & Duels Won</span>
                  <span className="text-[#C6FF00]">26 Tackles Won (Aliyan 6)</span>
                </div>
                <div className="w-full h-3 bg-[#080B12] rounded-full overflow-hidden flex border border-[#283141]">
                  <div className="h-full bg-blue-500" style={{ width: '38%' }} />
                  <div className="h-full bg-[#C6FF00]" style={{ width: '62%' }} />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: MATCH NIGHT & CLUB GALLERY */}
        {activeTab === 'gallery' && (
          <div id="gallery" className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            <div className="bg-[#111722] p-6 rounded-2xl border border-[#283141] text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] text-xs font-mono font-bold uppercase mb-2">
                <Camera className="w-3.5 h-3.5" />
                Live Atmosphere & Club Spirit
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#F5F7FA]">
                Match Night & Club Brotherhood Gallery
              </h3>
              <p className="text-xs text-[#929BA9] mt-1 font-mono max-w-xl mx-auto">
                Exclusive captures from the floodlit football arena and the post-match friendship between Coach FC and Blue Lock FC stars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Photo 1: WhatsApp Match Action Photography */}
              <div className="group bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div className="relative h-80 sm:h-96 overflow-hidden bg-[#080B12]">
                  <img
                    src="/media/coachfc-match-1.jpg"
                    alt="Coach FC Match Action"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171F2C] via-transparent to-transparent opacity-70" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[11px] font-mono font-bold text-[#C6FF00]">
                    📸 Matchday Action
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="text-lg font-bold text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors">
                    Coach FC Live Pitch Action
                  </h4>
                  <p className="text-xs text-[#929BA9] leading-relaxed">
                    Authentic matchday captures straight from the pitch. Intensity, movement, and tactical battle in the 14 October clash.
                  </p>
                </div>
              </div>

              {/* Photo 2: Live Video Match Footage from WhatsApp Media */}
              <div className="group bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div className="relative h-80 sm:h-96 overflow-hidden bg-black">
                  <video
                    src="/media/coachfc-highlight-2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171F2C] via-transparent to-transparent opacity-50 pointer-events-none" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[11px] font-mono font-bold text-[#C6FF00]">
                    🎥 Coach FC Video Tape
                  </span>
                  <span className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#C6FF00] border border-[#C6FF00]/30 font-bold">
                    Sound Muted
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="text-lg font-bold text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors">
                    Official Match Day Video Reel
                  </h4>
                  <p className="text-xs text-[#929BA9] leading-relaxed">
                    Captured directly on the pitch from team media. Authentic matchday energy, passing drills, and intense 1v1 challenges under stadium floodlights.
                  </p>
                </div>
              </div>
            </div>

            {/* Tsukioynx On-Pitch Action Gallery (Front, Backside with Name, Side Action, Strike & Ball Hold) */}
            <div className="pt-8 border-t border-[#283141] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider block">
                    Samurai Blue #8 Match Focus
                  </span>
                  <h4 className="text-2xl font-black text-[#F5F7FA] mt-0.5">
                    Tsukioynx On-The-Field Match Action Gallery
                  </h4>
                  <p className="text-xs text-[#929BA9] font-mono">
                    Official on-pitch photo series: Front stance with ball, jersey back with name &amp; #8, side-sprint, mid-air volley, and match ball focus.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold self-start sm:self-auto">
                  5 Angles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Front Pose with Ball */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-blue-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/tsukioynx-japan-front.jpg"
                      alt="Tsukioynx Front Stance with Ball"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[10px] font-mono font-bold text-blue-300">
                      ⚽ Front • Ball on Turf
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-sm text-[#F5F7FA]">Front Stance with Match Ball</h5>
                    <p className="text-[11px] text-[#929BA9] mt-1">Poised on the pitch in the iconic Japan Samurai Blue kit, foot resting on the ball.</p>
                  </div>
                </div>

                {/* 2. Backside with Name & #8 */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-blue-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/tsukioynx-japan-back.jpg"
                      alt="Tsukioynx Jersey Back with Name and #8"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[10px] font-mono font-bold text-yellow-300">
                      👕 Back • TSUKIOYNX #8
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-sm text-[#F5F7FA]">Jersey Backside with Name</h5>
                    <p className="text-[11px] text-[#929BA9] mt-1">Looking back over the shoulder with &apos;TSUKIOYNX&apos; lettering and gold #8 displayed.</p>
                  </div>
                </div>

                {/* 3. Side-Angle Sprint & Dribble */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-blue-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/tsukioynx-japan-side.jpg"
                      alt="Tsukioynx Side Angle Sprint"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[10px] font-mono font-bold text-cyan-300">
                      ⚡ Side • Sprint &amp; Control
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-sm text-[#F5F7FA]">Side Profile Dribbling Run</h5>
                    <p className="text-[11px] text-[#929BA9] mt-1">Explosive sprint cutting across the midfield line before unlocking the defense.</p>
                  </div>
                </div>

                {/* 4. Mid-Air Volley / Strike */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-blue-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/tsukioynx-japan-strike.jpg"
                      alt="Tsukioynx Mid-Air Strike"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[10px] font-mono font-bold text-rose-300">
                      💥 Action • Venomous Strike
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-sm text-[#F5F7FA]">Mid-Air Power Strike</h5>
                    <p className="text-[11px] text-[#929BA9] mt-1">Recreating the solo wondergoal power shot that crashed into the top corner.</p>
                  </div>
                </div>

                {/* 5. Holding Match Ball Close */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-blue-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/tsukioynx-japan-holdball.jpg"
                      alt="Tsukioynx Holding Ball"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[10px] font-mono font-bold text-[#C6FF00]">
                      🎯 Close-Up • Ball Control
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-sm text-[#F5F7FA]">Match Ball Under Arm</h5>
                    <p className="text-[11px] text-[#929BA9] mt-1">Post-match reflection as Super Man of the Match with the official match ball.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blue Lock FC Official Kit Concept Studio */}
            <div className="pt-6 border-t border-[#283141]">
              <BlueLockKitStudio />
            </div>

            {/* Official Full-Body Head-To-Toe Matchday Series (Complete Kit, Cleats & Stadium Floodlights) */}
            <div className="pt-8 border-t border-[#283141] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-[#C6FF00] font-bold uppercase tracking-wider block">
                    Full-Length Matchday Photography
                  </span>
                  <h4 className="text-2xl font-black text-[#F5F7FA] mt-0.5">
                    Official Head-to-Toe Pitch Kit Edition
                  </h4>
                  <p className="text-xs text-[#929BA9] font-mono">
                    All stars framed in full head-to-toe matchday gear with boots, shorts, and club match shirts on the turf.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#C6FF00]/10 text-[#C6FF00] border border-[#C6FF00]/30 text-xs font-mono font-bold self-start sm:self-auto">
                  5 Full Kits
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Tsukioynx Full-Kit */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-blue-400/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/tsukioynx-fullkit.jpg"
                      alt="Tsukioynx Full Kit with Cleats"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-blue-500/80 backdrop-blur text-[10px] font-bold text-white uppercase">
                      Tsukioynx #8
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="font-bold text-xs text-[#F5F7FA]">Tsukioynx</h5>
                    <p className="text-[10px] text-blue-400 font-mono mt-0.5">Studio Media Day • Boots & Cleats</p>
                  </div>
                </div>

                {/* Sheryar Full-Kit */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/sheryar-fullkit.jpg"
                      alt="Sheryar Full Kit with Cleats"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#C6FF00] text-[10px] font-black text-[#080B12] uppercase">
                      Sheryar #10
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="font-bold text-xs text-[#F5F7FA]">Sheryar</h5>
                    <p className="text-[10px] text-[#C6FF00] font-mono mt-0.5">Coach FC Full Kit • Boots</p>
                  </div>
                </div>

                {/* Abdul Rehman Full-Kit */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/abdul-rehman-fullkit.jpg"
                      alt="Abdul Rehman Full Kit"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#C6FF00] text-[10px] font-black text-[#080B12] uppercase">
                      Abdul Rehman #23
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="font-bold text-xs text-[#F5F7FA]">Abdul Rehman</h5>
                    <p className="text-[10px] text-[#C6FF00] font-mono mt-0.5">Coach FC Full Kit • Boots</p>
                  </div>
                </div>

                {/* Danish Full-Kit */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/danish-fullkit.jpg"
                      alt="Danish Full Kit with Cleats"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#C6FF00] text-[10px] font-black text-[#080B12] uppercase">
                      Danish #9
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="font-bold text-xs text-[#F5F7FA]">Danish</h5>
                    <p className="text-[10px] text-[#C6FF00] font-mono mt-0.5">Coach FC Full Kit • Boots</p>
                  </div>
                </div>

                {/* Jamshaid Full-Kit */}
                <div className="group bg-[#171F2C] border border-[#283141] hover:border-[#C6FF00]/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="relative h-80 overflow-hidden bg-[#080B12]">
                    <img
                      src="/players/jamshaid-fullkit.jpg"
                      alt="Jamshaid Full Kit with Cleats"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#C6FF00] text-[10px] font-black text-[#080B12] uppercase">
                      Jamshaid #7
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="font-bold text-xs text-[#F5F7FA]">Jamshaid</h5>
                    <p className="text-[10px] text-[#C6FF00] font-mono mt-0.5">Coach FC Full Kit • Boots</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* FOOTER CTA */}
      <section className="py-12 border-t border-[#283141] bg-[#111722]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/squad"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C6FF00] text-[#080B12] font-black tracking-wide text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(198,255,0,0.4)]"
          >
            <span>View Full First-Team 31-Player Squad</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* STADIUM ANTHEM AUDIO PLAYER (ALLEZ ALLEZ ALLEZ) */}
      <StadiumAudioPlayer />
    </div>
  );
};
