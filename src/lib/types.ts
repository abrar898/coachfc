export type Role = 'SUPER_ADMIN' | 'CLUB_ADMIN' | 'COACH' | 'ANALYST' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';
export type PlayerStatus = 'FIT' | 'DOUBTFUL' | 'INJURED' | 'SUSPENDED';

export interface Player {
  id: string;
  slug: string;
  name: string;
  shirtNumber: number;
  position: PlayerPosition;
  secondaryPositions: string[];
  nationality: string;
  nationalityCode: string;
  photoUrl: string;
  photoSuitUrl?: string;
  galleryUrls?: string[];
  dateOfBirth: string;
  age: number;
  heightCm: number;
  weightKg: number;
  preferredFoot: 'Left' | 'Right' | 'Both';
  status: PlayerStatus;
  statusNotes?: string;
  bio: string;
  contractUntil: string;
  marketValue: string;
  joinedYear: number;
  // Attributes (0-99)
  attributes: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  // Verified Season Totals
  seasonStats: {
    appearances: number;
    starts: number;
    substituteIn: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    cleanSheets?: number;
    saves?: number;
    passAccuracyPct: number;
    shotsOnTarget: number;
    tacklesWon: number;
  };
}

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'POSTPONED';
export type Competition = 'Premier League' | 'Champions Trophy' | 'National Cup' | 'Continental Supercup' | 'Super Clash Thriller' | 'Friendly';

export type MatchEventType = 
  | 'GOAL' 
  | 'ASSIST' 
  | 'YELLOW_CARD' 
  | 'RED_CARD' 
  | 'SUBSTITUTION' 
  | 'PENALTY_SCORED'
  | 'PENALTY_MISSED'
  | 'OWN_GOAL' 
  | 'INJURY'
  | 'VAR_DECISION';

export interface MatchEvent {
  id: string;
  matchId: string;
  minute: number;
  stoppageMinute?: number;
  period: '1H' | '2H' | 'ET1' | 'ET2' | 'PEN';
  type: MatchEventType;
  team: 'HOME' | 'AWAY';
  playerId?: string;
  playerName?: string;
  relatedPlayerId?: string; // e.g. Assister or Substituted player
  relatedPlayerName?: string;
  notes?: string;
  isVerified: boolean;
}

export interface MatchParticipation {
  playerId: string;
  playerName: string;
  position: PlayerPosition;
  shirtNumber: number;
  isStarting: boolean;
  subInMinute?: number;
  subOutMinute?: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  validationFlags?: string[];
}

export interface MatchLineupSlot {
  slotId: string;
  positionName: string; // e.g. "GK", "CB", "LB", "CM", "RW", "ST"
  x: number; // percentage 0-100 across pitch width
  y: number; // percentage 0-100 pitch length (0 = goal, 100 = opponent goal)
  playerId?: string;
  player?: Player;
}

export interface Match {
  id: string;
  homeTeam: string;
  homeCrest: string;
  awayTeam: string;
  awayCrest: string;
  isHome: boolean;
  competition: Competition;
  round?: string;
  venue: string;
  matchDate: string; // ISO string
  kickoffTime: string; // e.g. "20:00"
  status: MatchStatus;
  currentMinute?: number;
  homeScore?: number;
  awayScore?: number;
  halftimeHomeScore?: number;
  halftimeAwayScore?: number;
  attendance?: string;
  referee?: string;
  formationHome?: string;
  formationAway?: string;
  events: MatchEvent[];
  participations?: MatchParticipation[];
  homeLineup?: MatchLineupSlot[];
  bench?: { playerId: string; player?: Player }[];
  matchStats?: {
    possessionPct: [number, number]; // [home, away]
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
    yellowCards: [number, number];
    redCards: [number, number];
    passes: [number, number];
    passAccuracyPct: [number, number];
  };
  playerRatings?: PlayerRatingItem[];
}

export interface PlayerRatingItem {
  name: string;
  team: string; // 'Coach FC' | 'Blue Lock FC' | 'MCS Captains' or custom
  number: number;
  position: string;
  photoUrl?: string;
  photoSuitUrl?: string;
  photoFullKitUrl?: string;
  rating: number;
  highlightBadge?: string;
  badgeColor?: string;
  isKeyPlayer?: boolean;
  goals: number;
  assists: number;
  chancesCreated: number;
  missedChances: number;
  keyStats: string;
  verdict: string;
}


export interface TacticalFormation {
  id: string;
  name: string; // e.g. "4-3-3 Attacking", "4-2-3-1 Modern"
  preset: string; // "4-3-3" | "4-2-3-1" | "4-4-2" | "3-5-2"
  description: string;
  slots: MatchLineupSlot[];
  benchPlayerIds: string[];
  opponentNotes?: string;
  isDefault?: boolean;
  updatedAt: string;
}

export interface WorkloadRecord {
  playerId: string;
  player: Player;
  minutesLast3Matches: number;
  minutesLast5Matches: number;
  startsInLast5Matches: number;
  daysSinceLastMatch: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  flags: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Match Report' | 'First Team' | 'Club News' | 'Tactics' | 'Academy';
  author: string;
  authorRole: string;
  publishedAt: string;
  readTimeMinutes: number;
  coverImage: string;
  isFeatured: boolean;
  tags: string[];
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'HERO_VIDEO' | 'POSTER' | 'PORTRAIT' | 'MATCH_PHOTO' | 'TRAINING';
  url: string;
  altText: string;
  isHeroActive?: boolean;
  duration?: string;
  createdAt: string;
}

export interface ClubSettings {
  clubName: string;
  clubShortName: string;
  nickname: string;
  crestUrl: string;
  motto: string;
  foundedYear: number;
  stadiumName: string;
  stadiumCapacity: string;
  manager: string;
  president: string;
  highWorkloadMinutesThreshold: number; // e.g. 270 minutes in 7 days
  minRestDaysThreshold: number; // e.g. 3 days
  activeSeason: string;
}
