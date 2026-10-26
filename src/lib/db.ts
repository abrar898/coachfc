import { 
  Player, 
  Match, 
  TacticalFormation, 
  NewsArticle, 
  MediaAsset, 
  ClubSettings, 
  User, 
  MatchEvent, 
  MatchParticipation,
  WorkloadRecord
} from './types';

export interface DatabaseSchema {
  clubSettings: ClubSettings;
  users: User[];
  players: Player[];
  matches: Match[];
  formations: TacticalFormation[];
  news: NewsArticle[];
  mediaAssets: MediaAsset[];
}

const DEFAULT_DB: DatabaseSchema = {
  clubSettings: {
    clubName: "Coach FC",
    clubShortName: "CFC",
    nickname: "The Apex Predators",
    crestUrl: "/crest.svg",
    motto: "Built for the Game. Driven by Mentality.",
    foundedYear: 2018,
    stadiumName: "The Apex Arena",
    stadiumCapacity: "62,500",
    manager: "Alexandre Moreau",
    president: "David Sterling",
    highWorkloadMinutesThreshold: 270,
    minRestDaysThreshold: 3,
    activeSeason: "2026/27"
  },
  users: [
    {
      id: "u-1",
      name: "Mushaf",
      email: "mushaf@coachfc.com",
      role: "SUPER_ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      createdAt: "2024-01-01"
    },
    {
      id: "u-2",
      name: "Alexandre Moreau",
      email: "manager@coachfc.com",
      role: "CLUB_ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      createdAt: "2024-03-15"
    },
    {
      id: "u-3",
      name: "Faheem",
      email: "faheem@coachfc.com",
      role: "COACH",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      createdAt: "2024-04-10"
    },
    {
      id: "u-4",
      name: "Zohaib",
      email: "zohaib@coachfc.com",
      role: "ANALYST",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      createdAt: "2024-02-20"
    }
  ],
  players: [
    // --- GOALKEEPERS ---
    {
      id: "p-gk-1",
      slug: "lucas-vance",
      name: "Lucas Vance",
      shirtNumber: 1,
      position: "GK",
      secondaryPositions: [],
      nationality: "England",
      nationalityCode: "GB-ENG",
      photoUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "1998-04-12",
      age: 28,
      heightCm: 194,
      weightKg: 88,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Commanding shot stopper with 14 clean sheets.",
      bio: "Primary goalkeeper for Coach FC, renowned for commanding his penalty area and leading the league in close-range saves.",
      contractUntil: "2029-06-30",
      marketValue: "€38M",
      joinedYear: 2021,
      attributes: { pace: 52, shooting: 20, passing: 78, dribbling: 45, defending: 91, physical: 86 },
      seasonStats: {
        appearances: 24, starts: 24, substituteIn: 0, minutesPlayed: 2160,
        goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 14,
        saves: 82, passAccuracyPct: 84.5, shotsOnTarget: 0, tacklesWon: 4
      }
    },

    // --- DEFENDERS ---
    {
      id: "p-def-jamshaid",
      slug: "jamshaid",
      name: "Jamshaid",
      shirtNumber: 2,
      position: "DEF",
      secondaryPositions: ["RB", "CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/jamshaid-fullkit.jpg",
      dateOfBirth: "2001-08-14",
      age: 25,
      heightCm: 184,
      weightKg: 78,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Uncompromising right flank anchor.",
      bio: "Dominant defender combining aggressive 1v1 tackling, interception anticipation, and rapid transition recovery.",
      contractUntil: "2029-06-30",
      marketValue: "€45M",
      joinedYear: 2022,
      attributes: { pace: 88, shooting: 60, passing: 82, dribbling: 79, defending: 91, physical: 88 },
      seasonStats: {
        appearances: 23, starts: 22, substituteIn: 1, minutesPlayed: 1980,
        goals: 2, assists: 5, yellowCards: 3, redCards: 0, cleanSheets: 12,
        saves: 0, passAccuracyPct: 87.4, shotsOnTarget: 6, tacklesWon: 64
      }
    },
    {
      id: "p-def-danish",
      slug: "danish",
      name: "Danish",
      shirtNumber: 3,
      position: "DEF",
      secondaryPositions: ["LB", "LWB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/danish-fullkit.jpg",
      dateOfBirth: "2002-04-19",
      age: 24,
      heightCm: 181,
      weightKg: 75,
      preferredFoot: "Left",
      status: "FIT",
      statusNotes: "Elite overlapping fullback with high crossing accuracy.",
      bio: "High-octane left back whose tireless work rate across the left channel neutralizes opposing wingers while providing offensive overloads.",
      contractUntil: "2029-06-30",
      marketValue: "€42M",
      joinedYear: 2023,
      attributes: { pace: 91, shooting: 65, passing: 86, dribbling: 82, defending: 88, physical: 84 },
      seasonStats: {
        appearances: 22, starts: 21, substituteIn: 1, minutesPlayed: 1890,
        goals: 3, assists: 7, yellowCards: 2, redCards: 0, cleanSheets: 11,
        saves: 0, passAccuracyPct: 86.8, shotsOnTarget: 8, tacklesWon: 52
      }
    },
    {
      id: "p-def-zohaib",
      slug: "zohaib",
      name: "Zohaib",
      shirtNumber: 16,
      position: "DEF",
      secondaryPositions: ["CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/zohaib.jpg",
      dateOfBirth: "1999-11-20",
      age: 26,
      heightCm: 189,
      weightKg: 84,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Aerial Threat & Goalscorer (#16) • Recalibrating Backline Structure.",
      bio: "Defensive rock and commanding aerial colossus. Wearing #16 under stadium floodlights, Zohaib powered home a bullet header against MCS Captains, though faced difficulties under relentless pressure alongside Huzaifa.",
      contractUntil: "2028-06-30",
      marketValue: "€55M",
      joinedYear: 2021,
      attributes: { pace: 82, shooting: 58, passing: 84, dribbling: 74, defending: 88, physical: 92 },
      seasonStats: {
        appearances: 25, starts: 25, substituteIn: 0, minutesPlayed: 2230,
        goals: 5, assists: 2, yellowCards: 5, redCards: 0, cleanSheets: 13,
        saves: 0, passAccuracyPct: 91.0, shotsOnTarget: 10, tacklesWon: 75
      }
    },
    {
      id: "p-def-huzaifa",
      slug: "huzaifa",
      name: "Huzaifa",
      shirtNumber: 5,
      position: "DEF",
      secondaryPositions: ["CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2001-03-22",
      age: 25,
      heightCm: 188,
      weightKg: 82,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Formidable Central Stopper • Defensively Superior Prowess.",
      bio: "Calm, composed central defender possessing superior defensive tackling and anticipation compared to peers. Solid anchor who consistently outperforms in positional duels.",
      contractUntil: "2029-06-30",
      marketValue: "€48M",
      joinedYear: 2022,
      attributes: { pace: 83, shooting: 50, passing: 84, dribbling: 72, defending: 94, physical: 91 },
      seasonStats: {
        appearances: 24, starts: 23, substituteIn: 1, minutesPlayed: 2060,
        goals: 2, assists: 1, yellowCards: 3, redCards: 0, cleanSheets: 13,
        saves: 0, passAccuracyPct: 89.8, shotsOnTarget: 5, tacklesWon: 63
      }
    },
    {
      id: "p-def-shakeel",
      slug: "shakeel",
      name: "Shakeel",
      shirtNumber: 12,
      position: "DEF",
      secondaryPositions: ["RB", "CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2000-09-12",
      age: 26,
      heightCm: 183,
      weightKg: 79,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Resolute defender known for relentless marking and shutting down opposing creative threats.",
      contractUntil: "2028-06-30",
      marketValue: "€32M",
      joinedYear: 2023,
      attributes: { pace: 84, shooting: 52, passing: 80, dribbling: 75, defending: 87, physical: 86 },
      seasonStats: {
        appearances: 18, starts: 14, substituteIn: 4, minutesPlayed: 1320,
        goals: 1, assists: 3, yellowCards: 2, redCards: 0, cleanSheets: 8,
        saves: 0, passAccuracyPct: 85.0, shotsOnTarget: 4, tacklesWon: 41
      }
    },
    {
      id: "p-def-basit",
      slug: "basit",
      name: "Basit",
      shirtNumber: 15,
      position: "DEF",
      secondaryPositions: ["CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/basit-gilgiti-real.jpg",
      dateOfBirth: "2003-05-10",
      age: 23,
      heightCm: 186,
      weightKg: 80,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Athletic central stopper with phenomenal vertical leap and recovery pace on counter-attacks.",
      contractUntil: "2029-06-30",
      marketValue: "€28M",
      joinedYear: 2024,
      attributes: { pace: 85, shooting: 48, passing: 79, dribbling: 73, defending: 88, physical: 87 },
      seasonStats: {
        appearances: 16, starts: 12, substituteIn: 4, minutesPlayed: 1140,
        goals: 1, assists: 1, yellowCards: 2, redCards: 0, cleanSheets: 7,
        saves: 0, passAccuracyPct: 87.1, shotsOnTarget: 3, tacklesWon: 38
      }
    },
    {
      id: "p-def-maaz",
      slug: "maaz",
      name: "Maaz",
      shirtNumber: 16,
      position: "DEF",
      secondaryPositions: ["LB", "CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2002-12-04",
      age: 24,
      heightCm: 182,
      weightKg: 76,
      preferredFoot: "Left",
      status: "FIT",
      bio: "Tactically astute left defender capable of playing as a third center-back or inverted fullback.",
      contractUntil: "2029-06-30",
      marketValue: "€30M",
      joinedYear: 2023,
      attributes: { pace: 83, shooting: 55, passing: 81, dribbling: 76, defending: 86, physical: 83 },
      seasonStats: {
        appearances: 17, starts: 13, substituteIn: 4, minutesPlayed: 1210,
        goals: 1, assists: 2, yellowCards: 1, redCards: 0, cleanSheets: 7,
        saves: 0, passAccuracyPct: 86.4, shotsOnTarget: 3, tacklesWon: 35
      }
    },
    {
      id: "p-def-abdul-rehman",
      slug: "abdul-rehman",
      name: "Abdul Rehman",
      shirtNumber: 23,
      position: "DEF",
      secondaryPositions: ["CB", "RB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/abdul-rehman-fullkit.jpg",
      dateOfBirth: "2001-07-28",
      age: 25,
      heightCm: 187,
      weightKg: 83,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Powerful defensive wall who dominates physical duels and locks down the penalty box.",
      contractUntil: "2029-06-30",
      marketValue: "€34M",
      joinedYear: 2023,
      attributes: { pace: 82, shooting: 51, passing: 80, dribbling: 72, defending: 89, physical: 90 },
      seasonStats: {
        appearances: 19, starts: 15, substituteIn: 4, minutesPlayed: 1380,
        goals: 2, assists: 1, yellowCards: 3, redCards: 0, cleanSheets: 9,
        saves: 0, passAccuracyPct: 88.0, shotsOnTarget: 4, tacklesWon: 47
      }
    },
    {
      id: "p-def-hamza-jr",
      slug: "hamza-junior",
      name: "Hamza (Junior)",
      shirtNumber: 24,
      position: "DEF",
      secondaryPositions: ["CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2004-06-15",
      age: 22,
      heightCm: 185,
      weightKg: 79,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Emerging young talent with quick acceleration and fearlessness in 50-50 challenge tackles.",
      contractUntil: "2030-06-30",
      marketValue: "€26M",
      joinedYear: 2024,
      attributes: { pace: 86, shooting: 45, passing: 78, dribbling: 74, defending: 86, physical: 84 },
      seasonStats: {
        appearances: 14, starts: 8, substituteIn: 6, minutesPlayed: 850,
        goals: 0, assists: 1, yellowCards: 2, redCards: 0, cleanSheets: 5,
        saves: 0, passAccuracyPct: 85.5, shotsOnTarget: 2, tacklesWon: 29
      }
    },
    {
      id: "p-def-shahzaib",
      slug: "shahzaib",
      name: "Shahzaib",
      shirtNumber: 25,
      position: "DEF",
      secondaryPositions: ["CB", "LB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2002-02-18",
      age: 24,
      heightCm: 184,
      weightKg: 80,
      preferredFoot: "Left",
      status: "FIT",
      bio: "Left-footed center back with high spatial awareness and supreme ground duel success rate.",
      contractUntil: "2029-06-30",
      marketValue: "€31M",
      joinedYear: 2023,
      attributes: { pace: 83, shooting: 48, passing: 82, dribbling: 75, defending: 87, physical: 85 },
      seasonStats: {
        appearances: 18, starts: 13, substituteIn: 5, minutesPlayed: 1240,
        goals: 1, assists: 2, yellowCards: 2, redCards: 0, cleanSheets: 8,
        saves: 0, passAccuracyPct: 87.6, shotsOnTarget: 3, tacklesWon: 39
      }
    },
    {
      id: "p-def-aliyan",
      slug: "aliyan",
      name: "Aliyan",
      shirtNumber: 26,
      position: "DEF",
      secondaryPositions: ["RB", "RWB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2003-09-08",
      age: 23,
      heightCm: 180,
      weightKg: 74,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Speedy wingback with dynamic stamina who covers the right touchline with unwavering discipline. Holds the squad's leading clean sheet record.",
      contractUntil: "2029-06-30",
      marketValue: "€32M",
      joinedYear: 2024,
      attributes: { pace: 90, shooting: 58, passing: 81, dribbling: 78, defending: 85, physical: 82 },
      seasonStats: {
        appearances: 16, starts: 11, substituteIn: 5, minutesPlayed: 1080,
        goals: 1, assists: 3, yellowCards: 1, redCards: 0, cleanSheets: 16,
        saves: 0, passAccuracyPct: 85.5, shotsOnTarget: 4, tacklesWon: 36
      }
    },
    {
      id: "p-def-sheri",
      slug: "sheri",
      name: "Sheri (Sheryar)",
      shirtNumber: 27,
      position: "DEF",
      secondaryPositions: ["CB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/sheryar-fullkit.jpg",
      dateOfBirth: "2001-10-14",
      age: 25,
      heightCm: 186,
      weightKg: 81,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Aggressive defensive battler known for clutch goal-line clearances and shutting down aerial crosses.",
      contractUntil: "2029-06-30",
      marketValue: "€30M",
      joinedYear: 2023,
      attributes: { pace: 84, shooting: 50, passing: 79, dribbling: 73, defending: 87, physical: 88 },
      seasonStats: {
        appearances: 17, starts: 12, substituteIn: 5, minutesPlayed: 1150,
        goals: 1, assists: 1, yellowCards: 3, redCards: 0, cleanSheets: 7,
        saves: 0, passAccuracyPct: 86.2, shotsOnTarget: 3, tacklesWon: 42
      }
    },
    {
      id: "p-def-hurr",
      slug: "hurr",
      name: "Hurr",
      shirtNumber: 28,
      position: "DEF",
      secondaryPositions: ["CB", "LB"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2003-01-25",
      age: 23,
      heightCm: 185,
      weightKg: 79,
      preferredFoot: "Left",
      status: "FIT",
      bio: "Precise tackler with outstanding anticipation who breaks up opposition play with elegance.",
      contractUntil: "2029-06-30",
      marketValue: "€27M",
      joinedYear: 2024,
      attributes: { pace: 85, shooting: 47, passing: 81, dribbling: 75, defending: 86, physical: 83 },
      seasonStats: {
        appearances: 14, starts: 9, substituteIn: 5, minutesPlayed: 880,
        goals: 0, assists: 2, yellowCards: 1, redCards: 0, cleanSheets: 6,
        saves: 0, passAccuracyPct: 86.5, shotsOnTarget: 2, tacklesWon: 28
      }
    },

    // --- MIDFIELDERS ---
    {
      id: "p-mid-faheem",
      slug: "faheem",
      name: "Faheem",
      shirtNumber: 6,
      position: "MID",
      secondaryPositions: ["CDM", "CM"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/faheem-real.jpg",
      dateOfBirth: "2000-05-14",
      age: 26,
      heightCm: 184,
      weightKg: 80,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Midfield Anchor & Ball Magnet.",
      bio: "The midfield metronome of Coach FC. Possesses extraordinary positional discipline, breaks up opposition counters, and initiates attacking phases with precision.",
      contractUntil: "2029-06-30",
      marketValue: "€65M",
      joinedYear: 2021,
      attributes: { pace: 82, shooting: 72, passing: 90, dribbling: 84, defending: 91, physical: 89 },
      seasonStats: {
        appearances: 24, starts: 24, substituteIn: 0, minutesPlayed: 2120,
        goals: 3, assists: 6, yellowCards: 4, redCards: 0,
        passAccuracyPct: 93.1, shotsOnTarget: 14, tacklesWon: 76
      }
    },
    {
      id: "p-mid-abrar",
      slug: "abrar",
      name: "Abrar",
      shirtNumber: 8,
      position: "MID",
      secondaryPositions: ["CAM", "CM", "RW", "ST"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/tsukioynx-coachfc-studio.jpg",
      dateOfBirth: "2001-11-18",
      age: 25,
      heightCm: 180,
      weightKg: 75,
      preferredFoot: "Both",
      status: "FIT",
      statusNotes: "Club Captain & Maestro Playmaker.",
      bio: "Tactical architect and inspirational team captain of Coach FC. Renowned for transcendent vision, creating 9 big chances, devastating strikes from midfield, and clutch captaincy.",
      contractUntil: "2030-06-30",
      marketValue: "€95M",
      joinedYear: 2022,
      attributes: { pace: 92, shooting: 91, passing: 96, dribbling: 94, defending: 70, physical: 82 },
      seasonStats: {
        appearances: 24, starts: 24, substituteIn: 0, minutesPlayed: 2160,
        goals: 14, assists: 22, yellowCards: 2, redCards: 0,
        passAccuracyPct: 92.4, shotsOnTarget: 44, tacklesWon: 38
      }
    },
    {
      id: "p-mid-jibran",
      slug: "jibran",
      name: "Jibran",
      shirtNumber: 13,
      position: "MID",
      secondaryPositions: ["CM", "CDM"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/jibran-real.png",
      dateOfBirth: "2002-08-30",
      age: 24,
      heightCm: 181,
      weightKg: 77,
      preferredFoot: "Right",
      status: "FIT",
      bio: "High-energy box-to-box midfielder who covers every blade of grass, driving the ball from deep into attacking zones.",
      contractUntil: "2029-06-30",
      marketValue: "€38M",
      joinedYear: 2023,
      attributes: { pace: 85, shooting: 74, passing: 86, dribbling: 82, defending: 78, physical: 84 },
      seasonStats: {
        appearances: 20, starts: 15, substituteIn: 5, minutesPlayed: 1420,
        goals: 4, assists: 5, yellowCards: 3, redCards: 0,
        passAccuracyPct: 88.5, shotsOnTarget: 14, tacklesWon: 44
      }
    },
    {
      id: "p-mid-kayani",
      slug: "kayani",
      name: "Kayani",
      shirtNumber: 14,
      position: "MID",
      secondaryPositions: ["CM", "CAM"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2000-04-12",
      age: 26,
      heightCm: 180,
      weightKg: 76,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Intelligent tempo controller with supreme composure and ability to switch play with sweeping diagonal passes.",
      contractUntil: "2028-06-30",
      marketValue: "€35M",
      joinedYear: 2022,
      attributes: { pace: 83, shooting: 76, passing: 88, dribbling: 83, defending: 74, physical: 80 },
      seasonStats: {
        appearances: 19, starts: 14, substituteIn: 5, minutesPlayed: 1310,
        goals: 3, assists: 6, yellowCards: 2, redCards: 0,
        passAccuracyPct: 89.2, shotsOnTarget: 12, tacklesWon: 36
      }
    },
    {
      id: "p-mid-shafin",
      slug: "shafin",
      name: "Shafin",
      shirtNumber: 18,
      position: "MID",
      secondaryPositions: ["CAM", "RW"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2003-07-21",
      age: 23,
      heightCm: 176,
      weightKg: 71,
      preferredFoot: "Left",
      status: "FIT",
      bio: "Crafty advanced midfielder with slippery dribbling technique in tight half-spaces.",
      contractUntil: "2029-06-30",
      marketValue: "€31M",
      joinedYear: 2024,
      attributes: { pace: 86, shooting: 78, passing: 86, dribbling: 88, defending: 55, physical: 72 },
      seasonStats: {
        appearances: 17, starts: 11, substituteIn: 6, minutesPlayed: 1080,
        goals: 4, assists: 5, yellowCards: 1, redCards: 0,
        passAccuracyPct: 87.0, shotsOnTarget: 16, tacklesWon: 20
      }
    },
    {
      id: "p-mid-usman",
      slug: "usman",
      name: "Usman",
      shirtNumber: 20,
      position: "MID",
      secondaryPositions: ["CM", "CDM"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2002-10-15",
      age: 24,
      heightCm: 182,
      weightKg: 77,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Relentless midfield ball winner with tremendous stamina and powerful long-range shooting ability.",
      contractUntil: "2029-06-30",
      marketValue: "€33M",
      joinedYear: 2023,
      attributes: { pace: 84, shooting: 75, passing: 85, dribbling: 80, defending: 81, physical: 85 },
      seasonStats: {
        appearances: 18, starts: 13, substituteIn: 5, minutesPlayed: 1220,
        goals: 3, assists: 4, yellowCards: 3, redCards: 0,
        passAccuracyPct: 88.0, shotsOnTarget: 13, tacklesWon: 42
      }
    },
    {
      id: "p-mid-m",
      slug: "m",
      name: "M",
      shirtNumber: 21,
      position: "MID",
      secondaryPositions: ["CM", "CAM"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2001-05-09",
      age: 25,
      heightCm: 179,
      weightKg: 75,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Versatile midfielder who operates seamlessly between lines and accelerates transitions.",
      contractUntil: "2029-06-30",
      marketValue: "€30M",
      joinedYear: 2023,
      attributes: { pace: 85, shooting: 76, passing: 85, dribbling: 83, defending: 70, physical: 80 },
      seasonStats: {
        appearances: 16, starts: 10, substituteIn: 6, minutesPlayed: 980,
        goals: 2, assists: 4, yellowCards: 1, redCards: 0,
        passAccuracyPct: 86.8, shotsOnTarget: 11, tacklesWon: 27
      }
    },
    {
      id: "p-mid-hamza-sr",
      slug: "hamza",
      name: "Hamza (Senior)",
      shirtNumber: 17,
      position: "MID",
      secondaryPositions: ["CM", "DEF"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "1999-03-12",
      age: 27,
      heightCm: 183,
      weightKg: 80,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Experienced tactical hybrid player who can seamlessly drop into the back four or anchor the midfield.",
      contractUntil: "2028-06-30",
      marketValue: "€32M",
      joinedYear: 2022,
      attributes: { pace: 82, shooting: 70, passing: 84, dribbling: 79, defending: 83, physical: 86 },
      seasonStats: {
        appearances: 18, starts: 12, substituteIn: 6, minutesPlayed: 1180,
        goals: 2, assists: 3, yellowCards: 2, redCards: 0,
        passAccuracyPct: 87.5, shotsOnTarget: 8, tacklesWon: 39
      }
    },
    {
      id: "p-mid-hasnain",
      slug: "hasnain",
      name: "Hasnain",
      shirtNumber: 22,
      position: "MID",
      secondaryPositions: ["CAM", "CM"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2002-06-20",
      age: 24,
      heightCm: 177,
      weightKg: 73,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Creative attacking midfielder with crisp 1-2 passing and deadly set-piece delivery.",
      contractUntil: "2029-06-30",
      marketValue: "€30M",
      joinedYear: 2023,
      attributes: { pace: 84, shooting: 77, passing: 86, dribbling: 84, defending: 62, physical: 76 },
      seasonStats: {
        appearances: 17, starts: 11, substituteIn: 6, minutesPlayed: 1040,
        goals: 3, assists: 5, yellowCards: 1, redCards: 0,
        passAccuracyPct: 87.2, shotsOnTarget: 14, tacklesWon: 24
      }
    },

    // --- FORWARDS / STRIKERS / ATTACKERS / WINGERS ---
    {
      id: "p-fwd-mushaf",
      slug: "mushaf",
      name: "Mushaf",
      shirtNumber: 7,
      position: "FWD",
      secondaryPositions: ["LW", "ST"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2001-09-17",
      age: 25,
      heightCm: 182,
      weightKg: 76,
      preferredFoot: "Both",
      status: "FIT",
      statusNotes: "Club Talisman & Lethal Left Winger / Striker.",
      bio: "Coach FC's superstar winger and striker. Unstoppable speed down the left flank, jaw-dropping cut-inside curling strikes, and clinical finishing in big match moments.",
      contractUntil: "2030-06-30",
      marketValue: "€115M",
      joinedYear: 2021,
      attributes: { pace: 96, shooting: 94, passing: 88, dribbling: 95, defending: 46, physical: 84 },
      seasonStats: {
        appearances: 24, starts: 24, substituteIn: 0, minutesPlayed: 2150,
        goals: 26, assists: 14, yellowCards: 1, redCards: 0,
        passAccuracyPct: 87.5, shotsOnTarget: 68, tacklesWon: 24
      }
    },
    {
      id: "p-fwd-sibas",
      slug: "sibas",
      name: "Sibas",
      shirtNumber: 9,
      position: "FWD",
      secondaryPositions: ["ST", "CF"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2000-11-05",
      age: 26,
      heightCm: 188,
      weightKg: 83,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Apex Number Nine & Ruthless Goal Poacher.",
      bio: "Lethal center forward whose explosive burst in the 18-yard box, physical aerial hold-up play, and rocket strikes make him the terror of opposition defenses.",
      contractUntil: "2029-06-30",
      marketValue: "€95M",
      joinedYear: 2022,
      attributes: { pace: 93, shooting: 95, passing: 78, dribbling: 87, defending: 42, physical: 90 },
      seasonStats: {
        appearances: 24, starts: 23, substituteIn: 1, minutesPlayed: 2060,
        goals: 24, assists: 8, yellowCards: 2, redCards: 0,
        passAccuracyPct: 80.2, shotsOnTarget: 62, tacklesWon: 18
      }
    },
    {
      id: "p-fwd-muhammad",
      slug: "muhammad",
      name: "Muhammad",
      shirtNumber: 10,
      position: "FWD",
      secondaryPositions: ["ST", "CF"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2001-01-20",
      age: 25,
      heightCm: 185,
      weightKg: 80,
      preferredFoot: "Right",
      status: "FIT",
      statusNotes: "Clinical Finisher & Complete Forward.",
      bio: "Versatile striker who links play brilliantly with midfielders and punishes the smallest defensive mistakes with surgical accuracy.",
      contractUntil: "2029-06-30",
      marketValue: "€80M",
      joinedYear: 2022,
      attributes: { pace: 91, shooting: 91, passing: 84, dribbling: 88, defending: 44, physical: 84 },
      seasonStats: {
        appearances: 23, starts: 20, substituteIn: 3, minutesPlayed: 1820,
        goals: 18, assists: 9, yellowCards: 2, redCards: 0,
        passAccuracyPct: 83.4, shotsOnTarget: 48, tacklesWon: 20
      }
    },
    {
      id: "p-fwd-hammad",
      slug: "hammad",
      name: "Hammad",
      shirtNumber: 11,
      position: "FWD",
      secondaryPositions: ["RW", "ST"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2002-04-14",
      age: 24,
      heightCm: 180,
      weightKg: 75,
      preferredFoot: "Left",
      status: "FIT",
      statusNotes: "Electrifying Right Winger & Speed Demon.",
      bio: "Direct, rapid right winger whose change of pace destroys backlines. Delivers pinpoint low crosses into the six-yard box.",
      contractUntil: "2029-06-30",
      marketValue: "€72M",
      joinedYear: 2023,
      attributes: { pace: 95, shooting: 86, passing: 83, dribbling: 91, defending: 40, physical: 78 },
      seasonStats: {
        appearances: 22, starts: 19, substituteIn: 3, minutesPlayed: 1710,
        goals: 12, assists: 11, yellowCards: 1, redCards: 0,
        passAccuracyPct: 82.8, shotsOnTarget: 38, tacklesWon: 22
      }
    },
    {
      id: "p-fwd-dilshad",
      slug: "dilshad",
      name: "Dilshad",
      shirtNumber: 19,
      position: "FWD",
      secondaryPositions: ["ST", "LW"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/dilshad-real.png",
      dateOfBirth: "2001-12-08",
      age: 25,
      heightCm: 183,
      weightKg: 78,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Dynamic attacker capable of leading the line or peeling off to the flanks to unbalance center-backs.",
      contractUntil: "2029-06-30",
      marketValue: "€40M",
      joinedYear: 2023,
      attributes: { pace: 89, shooting: 85, passing: 78, dribbling: 84, defending: 42, physical: 82 },
      seasonStats: {
        appearances: 20, starts: 14, substituteIn: 6, minutesPlayed: 1350,
        goals: 9, assists: 4, yellowCards: 2, redCards: 0,
        passAccuracyPct: 81.2, shotsOnTarget: 29, tacklesWon: 16
      }
    },
    {
      id: "p-fwd-savaiz",
      slug: "savaiz",
      name: "Savaiz (Shahvaiz)",
      shirtNumber: 29,
      position: "FWD",
      secondaryPositions: ["ST", "RW"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "/players/savaiz.jpg",
      photoSuitUrl: "/players/savaiz-suit.png",
      galleryUrls: ["/players/savaiz.jpg", "/players/savaiz-suit.png"],
      dateOfBirth: "2003-03-19",
      age: 23,
      heightCm: 181,
      weightKg: 76,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Agile, predatory forward known for high-octane pressing and lightning reactions in the box. Scored the chaotic 86th-minute scramble tap-in in the 14 Oct derby match. Presented in official Coach FC match kit and club formal wear.",
      contractUntil: "2029-06-30",
      marketValue: "€36M",
      joinedYear: 2024,
      attributes: { pace: 90, shooting: 84, passing: 77, dribbling: 85, defending: 38, physical: 79 },
      seasonStats: {
        appearances: 18, starts: 11, substituteIn: 7, minutesPlayed: 1120,
        goals: 8, assists: 3, yellowCards: 1, redCards: 0,
        passAccuracyPct: 80.5, shotsOnTarget: 25, tacklesWon: 14
      }
    },
    {
      id: "p-fwd-husnain-jr",
      slug: "husnain-chota",
      name: "Husnain (Chota)",
      shirtNumber: 30,
      position: "FWD",
      secondaryPositions: ["ST", "CF"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2005-02-14",
      age: 21,
      heightCm: 178,
      weightKg: 72,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Rapid, agile young striker with lethal penalty area instincts and sharp turn of pace.",
      contractUntil: "2030-06-30",
      marketValue: "€32M",
      joinedYear: 2024,
      attributes: { pace: 92, shooting: 83, passing: 75, dribbling: 86, defending: 35, physical: 76 },
      seasonStats: {
        appearances: 16, starts: 8, substituteIn: 8, minutesPlayed: 860,
        goals: 7, assists: 2, yellowCards: 1, redCards: 0,
        passAccuracyPct: 81.0, shotsOnTarget: 22, tacklesWon: 11
      }
    },
    {
      id: "p-fwd-rafeeq",
      slug: "rafeeq",
      name: "Rafeeq",
      shirtNumber: 31,
      position: "FWD",
      secondaryPositions: ["ST", "CF"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2002-08-11",
      age: 24,
      heightCm: 182,
      weightKg: 77,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Physical forward who thrives in aerial duels and holds up the ball for advancing midfielders.",
      contractUntil: "2029-06-30",
      marketValue: "€31M",
      joinedYear: 2023,
      attributes: { pace: 87, shooting: 82, passing: 76, dribbling: 81, defending: 41, physical: 85 },
      seasonStats: {
        appearances: 17, starts: 10, substituteIn: 7, minutesPlayed: 980,
        goals: 6, assists: 3, yellowCards: 2, redCards: 0,
        passAccuracyPct: 79.8, shotsOnTarget: 20, tacklesWon: 15
      }
    },
    {
      id: "p-fwd-adan",
      slug: "adan",
      name: "Adan",
      shirtNumber: 32,
      position: "FWD",
      secondaryPositions: ["CAM", "RW", "ST"],
      nationality: "Pakistan",
      nationalityCode: "PK",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      dateOfBirth: "2003-10-22",
      age: 23,
      heightCm: 179,
      weightKg: 74,
      preferredFoot: "Right",
      status: "FIT",
      bio: "Explosive attacker capable of slicing open defensive structures with flair, dribbling, and venomous long shots.",
      contractUntil: "2029-06-30",
      marketValue: "€44M",
      joinedYear: 2024,
      attributes: { pace: 91, shooting: 87, passing: 85, dribbling: 90, defending: 48, physical: 80 },
      seasonStats: {
        appearances: 21, starts: 16, substituteIn: 5, minutesPlayed: 1480,
        goals: 11, assists: 8, yellowCards: 1, redCards: 0,
        passAccuracyPct: 85.2, shotsOnTarget: 36, tacklesWon: 19
      }
    }
  ],
  matches: [
    {
      id: "m-mcs-captains",
      homeTeam: "MCS Captains",
      homeCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      awayTeam: "Coach FC",
      awayCrest: "/crest.svg",
      isHome: false,
      competition: "Super Clash Thriller",
      round: "Wednesday Showcase Clash",
      venue: "The Apex Arena",
      matchDate: "2026-10-21",
      kickoffTime: "20:30",
      status: "COMPLETED",
      homeScore: 3,
      awayScore: 3,
      halftimeHomeScore: 1,
      halftimeAwayScore: 1,
      attendance: "64,200",
      referee: "Michael Oliver",
      formationHome: "3-3-1 (8-a-side)",
      formationAway: "2-3-2 (8-a-side)",
      events: [
        {
          id: "ev-mcs-1",
          matchId: "m-mcs-captains",
          minute: 18,
          period: "1H",
          type: "GOAL",
          team: "AWAY",
          playerId: "p-mid-abrar",
          playerName: "Abrar (Captain)",
          notes: "SOLO WONDER STRIKE! Captain Abrar weaves past two defenders with sublime control and rifles a clinical solo strike into the bottom right corner! Coach FC lead 0-1.",
          isVerified: true
        },
        {
          id: "ev-mcs-2",
          matchId: "m-mcs-captains",
          minute: 27,
          period: "1H",
          type: "GOAL",
          team: "HOME",
          playerName: "Farhan (MCS Captains)",
          notes: "MCS Captains level it up! Farhan capitalizes on space between the center backs and slots low into the corner. 1-1.",
          isVerified: true
        },
        {
          id: "ev-mcs-3",
          matchId: "m-mcs-captains",
          minute: 52,
          period: "2H",
          type: "OWN_GOAL",
          team: "HOME",
          playerId: "p-mid-jibran",
          playerName: "Jibran (Coach FC - Own Goal)",
          notes: "Unfortunate Mistake! Under heavy MCS high-press, goalkeeper Jibran attempts a back-heel clearance that mistakenly rolls into his own net. (Jibran simultaneously made 8 clutch saves throughout the match!) 2-1.",
          isVerified: true
        },
        {
          id: "ev-mcs-4",
          matchId: "m-mcs-captains",
          minute: 64,
          period: "2H",
          type: "GOAL",
          team: "AWAY",
          playerId: "p-mid-usman",
          playerName: "Usman",
          notes: "SOLO THUNDERBOLT GOLAZO! Usman wins the ball, bursts forward on a scintillating solo run past two defenders, and smashes an unstoppable thunderbolt volley into the roof of the net! 2-2.",
          isVerified: true
        },
        {
          id: "ev-mcs-sub-1",
          matchId: "m-mcs-captains",
          minute: 65,
          period: "2H",
          type: "SUBSTITUTION",
          team: "AWAY",
          playerId: "p-fwd-rafeeq",
          playerName: "Rafeeq (Sub in for Savaiz)",
          notes: "Tactical change in 8-a-side duel: Savaiz subbed off, Rafeeq enters to inject pace on the counter.",
          isVerified: true
        },
        {
          id: "ev-mcs-5",
          matchId: "m-mcs-captains",
          minute: 76,
          period: "2H",
          type: "GOAL",
          team: "AWAY",
          playerId: "p-def-zohaib",
          playerName: "Zohaib",
          relatedPlayerId: "p-mid-abrar",
          relatedPlayerName: "Abrar (Captain)",
          notes: "BULLET HEADER! Captain Abrar swings in an exquisite corner delivery (one of his 9 big chances created); Zohaib rises above everybody to hammer in a thumping header! Coach FC lead 2-3.",
          isVerified: true
        },
        {
          id: "ev-mcs-6",
          matchId: "m-mcs-captains",
          minute: 85,
          period: "2H",
          type: "GOAL",
          team: "HOME",
          playerName: "Kamran (MCS Captains)",
          notes: "MCS Captains' 3rd goal scored by a 3rd different player! Kamran fires a deflected strike from the edge of the D after defensive hesitation from Zohaib and Huzaifa. 3-3.",
          isVerified: true
        }
      ],
      participations: [
        { playerId: "p-mid-jibran", playerName: "Jibran", position: "GK", shirtNumber: 13, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-huzaifa", playerName: "Huzaifa", position: "DEF", shirtNumber: 5, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-zohaib", playerName: "Zohaib", position: "DEF", shirtNumber: 16, isStarting: true, minutesPlayed: 90, goals: 1, assists: 0, yellowCards: 1, redCards: 0 },
        { playerId: "p-def-aliyan", playerName: "Aliyan", position: "DEF", shirtNumber: 26, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-mid-faheem", playerName: "Faheem", position: "MID", shirtNumber: 6, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-mid-abrar", playerName: "Abrar (Captain)", position: "MID", shirtNumber: 8, isStarting: true, minutesPlayed: 90, goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
        { playerId: "p-mid-usman", playerName: "Usman", position: "MID", shirtNumber: 20, isStarting: true, minutesPlayed: 90, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-fwd-savaiz", playerName: "Savaiz", position: "FWD", shirtNumber: 29, isStarting: true, minutesPlayed: 65, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-fwd-rafeeq", playerName: "Rafeeq", position: "FWD", shirtNumber: 18, isStarting: false, minutesPlayed: 25, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
      ],
      matchStats: {
        possessionPct: [48, 52],
        shots: [15, 21],
        shotsOnTarget: [9, 13],
        corners: [5, 8],
        fouls: [11, 10],
        yellowCards: [1, 2],
        redCards: [0, 0],
        passes: [440, 490],
        passAccuracyPct: [84, 88]
      },
      playerRatings: [
        {
          name: "Abrar",
          team: "Coach FC",
          number: 8,
          position: "Midfield / Captain & Playmaker",
          photoUrl: "/players/tsukioynx-coachfc-studio.jpg",
          photoSuitUrl: "/players/tsukioynx-real.jpg",
          photoFullKitUrl: "/players/tsukioynx-coachfc-studio.jpg",
          rating: 9.8,
          isKeyPlayer: true,
          highlightBadge: "⭐ SUPER KEY PLAYER • 9 BIG CHANCES",
          badgeColor: "bg-[#C6FF00] text-[#080B12]",
          goals: 1,
          assists: 1,
          chancesCreated: 9,
          missedChances: 0,
          keyStats: "1 Solo Goal • 1 Corner Assist to Zohaib • 9 Big Chances Created • 95% Pass Acc",
          verdict: "Pure captain's genius! Sliced open MCS with an 18' solo wonder strike, crafted an astonishing 9 BIG CHANCES CREATED, and delivered the pinpoint assist for Zohaib's bullet header."
        },
        {
          name: "Usman",
          team: "Coach FC",
          number: 20,
          position: "Midfield / Attacker",
          photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
          rating: 8.8,
          isKeyPlayer: false,
          highlightBadge: "💥 SOLO THUNDERBOLT GOLAZO",
          badgeColor: "bg-emerald-400 text-[#080B12]",
          goals: 1,
          assists: 0,
          chancesCreated: 2,
          missedChances: 1,
          keyStats: "1 Solo Golazo • 3 Shots On Target • 88% Pass Acc",
          verdict: "Sensational solo golazo! Drove past two MCS defenders with blistering pace and power, smashing an unstoppable thunderbolt into the top corner for 2-2."
        },
        {
          name: "Zohaib",
          team: "Coach FC",
          number: 16,
          position: "Central Defender",
          photoUrl: "/players/zohaib.jpg",
          rating: 7.1,
          isKeyPlayer: false,
          highlightBadge: "⚽ BULLET HEADER • DEFENSIVE STRUGGLE",
          badgeColor: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
          goals: 1,
          assists: 0,
          chancesCreated: 0,
          missedChances: 0,
          keyStats: "1 Aerial Bullet Header Goal • 3 Marking Lapses • 4 Clearances",
          verdict: "Rose majestically to head in Captain Abrar's corner for 2-3! However, struggled in defensive marking duties under heavy MCS pressure as MCS struck three times."
        },
        {
          name: "Jibran",
          team: "Coach FC",
          number: 13,
          position: "Goalkeeper",
          photoUrl: "/players/jibran-real.png",
          photoSuitUrl: "/players/jibran-real.png",
          photoFullKitUrl: "/players/jibran-real.png",
          rating: 7.2,
          isKeyPlayer: false,
          highlightBadge: "🧤 8 CLUTCH SAVES • BACKHEEL ACCIDENTAL OG",
          badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
          goals: 0,
          assists: 0,
          chancesCreated: 0,
          missedChances: 0,
          keyStats: "8 Crucial Saves • 1 Accidental Back-Heel Own Goal Under Heavy Pressure",
          verdict: "Stepped in heroically between the sticks! Conceded an unfortunate accidental back-heel own goal amidst chaotic traffic in the box, but stood tall with 8 decisive saves to preserve the 3-3 draw."
        },
        {
          name: "Huzaifa",
          team: "Coach FC",
          number: 5,
          position: "Central Defender",
          photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
          rating: 7.3,
          isKeyPlayer: false,
          highlightBadge: "🛡️ SUPERIOR DEFENSIVE DUELS",
          badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
          goals: 0,
          assists: 0,
          chancesCreated: 0,
          missedChances: 0,
          keyStats: "5 Ground Challenges Won • 4 Interceptions • Defensively Superior Prowess",
          verdict: "Defensively much better and more composed than Zohaib in positioning and tackling, maintaining a resolute shield under high MCS pressure."
        },
        {
          name: "Aliyan",
          team: "Coach FC",
          number: 26,
          position: "Defender / Fullback",
          photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
          rating: 7.8,
          isKeyPlayer: false,
          highlightBadge: "🛡️ CLEAN SHEET LEADER (16 CS)",
          badgeColor: "bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30",
          goals: 0,
          assists: 0,
          chancesCreated: 1,
          missedChances: 0,
          keyStats: "5 Tackles Won • 4 Recoveries • Club Clean Sheet Leader (16)",
          verdict: "Most reliable defender in the backline. Handled the flank with disciplined tackling and showed why he holds the highest clean sheet record in the squad."
        },
        {
          name: "Faheem",
          team: "Coach FC",
          number: 6,
          position: "Midfield / Playmaker",
          photoUrl: "/players/faheem-real.jpg",
          rating: 7.6,
          isKeyPlayer: false,
          highlightBadge: "⚡ MIDFIELD CONTROL & TEMPO",
          badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
          goals: 0,
          assists: 0,
          chancesCreated: 2,
          missedChances: 0,
          keyStats: "89% Pass Acc • 4 Interceptions • 2 Key Transition Passes",
          verdict: "Composed midfield technician. Linked smartly with Captain Abrar, breaking up MCS transitions and circulating possession under pressure."
        },
        {
          name: "Savaiz",
          team: "Coach FC",
          number: 29,
          position: "Forward / Striker",
          photoUrl: "/players/savaiz.jpg",
          photoSuitUrl: "/players/savaiz-suit.png",
          rating: 7.0,
          isKeyPlayer: false,
          highlightBadge: "⚡ ACTIVE PRESSING • SUBBED 65'",
          badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
          goals: 0,
          assists: 0,
          chancesCreated: 1,
          missedChances: 0,
          keyStats: "65 Mins Played • 3 Pressing Recoveries • Replaced by Rafeeq",
          verdict: "High-energy starting forward in the 8-a-side battle. Stretched MCS center backs with constant pressing before being replaced by Rafeeq in the 65th minute."
        },
        {
          name: "Rafeeq",
          team: "Coach FC",
          number: 18,
          position: "Forward / Winger",
          photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
          rating: 7.2,
          isKeyPlayer: false,
          highlightBadge: "🔄 IMPACT SUB (REPLACED SAVAIZ)",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
          goals: 0,
          assists: 0,
          chancesCreated: 1,
          missedChances: 0,
          keyStats: "25 Mins Played • 2 Successful Dribbles • 1 Vital Clearance",
          verdict: "Fresh legs off the bench! Subbed on for Savaiz on 65' to inject pace and dynamic pressing on the right channel, helping Coach FC preserve the hard-fought 3-3 draw."
        }
      ]
    },
    {
      id: "m-1",
      homeTeam: "Blue Lock FC",
      homeCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      awayTeam: "Coach FC",
      awayCrest: "/crest.svg",
      isHome: false,
      competition: "Super Clash Thriller",
      round: "Showdown Final",
      venue: "The Apex Arena",
      matchDate: "2026-10-14",
      kickoffTime: "20:45",
      status: "COMPLETED",
      homeScore: 4,
      awayScore: 3,
      halftimeHomeScore: 2,
      halftimeAwayScore: 1,
      attendance: "62,500",
      referee: "Pierluigi Collina",
      formationHome: "4-3-3",
      formationAway: "4-3-3",
      events: [
        {
          id: "ev-1",
          matchId: "m-1",
          minute: 14,
          period: "1H",
          type: "GOAL",
          team: "AWAY",
          playerId: "p-def-aliyan",
          playerName: "Aliyan",
          notes: "GOLAZO! Aliyan unleashes a breathtaking volley into the corner past keeper Ali to open the scoring! Coach FC lead 0-1.",
          isVerified: true
        },
        {
          id: "ev-1b",
          matchId: "m-1",
          minute: 23,
          period: "1H",
          type: "YELLOW_CARD",
          team: "AWAY",
          playerId: "p-fwd-savaiz",
          playerName: "Savaiz",
          notes: "Missed Chance: Savaiz breaks through 1-on-1 with keeper Ali, but his shot is smothered.",
          isVerified: true
        },
        {
          id: "ev-2",
          matchId: "m-1",
          minute: 28,
          period: "1H",
          type: "GOAL",
          team: "HOME",
          playerId: "p-fwd-dilshad",
          playerName: "Dilshad (Blue Lock)",
          relatedPlayerId: "p-mid-abrar",
          relatedPlayerName: "Abrar",
          notes: "Clear Goal! Dilshad is played through by Abrar (Assist 1), performs a slick body dodge around keeper Hamza, and rolls into the empty net! 1-1.",
          isVerified: true
        },
        {
          id: "ev-2b",
          matchId: "m-1",
          minute: 34,
          period: "1H",
          type: "YELLOW_CARD",
          team: "HOME",
          playerId: "p-fwd-dilshad",
          playerName: "Dilshad",
          notes: "Missed Chance: Dilshad rattles the crossbar from 10 yards out with an open goal gaping.",
          isVerified: true
        },
        {
          id: "ev-3",
          matchId: "m-1",
          minute: 39,
          period: "1H",
          type: "GOAL",
          team: "HOME",
          playerId: "p-mid-abrar",
          playerName: "Abrar (Blue Lock)",
          notes: "WONDERGOAL! Abrar embarks on a solo run from midfield, slices directly past two defenders, and unleashes a proper venomous power shot into the top corner! 2-1.",
          isVerified: true
        },
        {
          id: "ev-3b",
          matchId: "m-1",
          minute: 44,
          period: "1H",
          type: "YELLOW_CARD",
          team: "AWAY",
          playerId: "p-fwd-savaiz",
          playerName: "Savaiz",
          notes: "Missed Chance: Savaiz misses a glorious chance teed up by Shafin, dragging his shot wide from 8 yards.",
          isVerified: true
        },
        {
          id: "ev-4",
          matchId: "m-1",
          minute: 51,
          period: "2H",
          type: "GOAL",
          team: "AWAY",
          playerId: "p-def-sheri",
          playerName: "Sheryar",
          notes: "FREE-KICK MAGIC! Defender Sheryar steps up to a 24-yard free-kick and curls an exquisite strike over the wall into the top corner! 2-2.",
          isVerified: true
        },
        {
          id: "ev-5",
          matchId: "m-1",
          minute: 63,
          period: "2H",
          type: "GOAL",
          team: "HOME",
          playerId: "p-mid-faheem",
          playerName: "Faheem (Blue Lock)",
          notes: "CLEAR DODGE GOAL! Faheem cuts inside, fakes past defender Huzaifa with a clear dodge, then dodges past keeper Hamza to slot in! 3-2.",
          isVerified: true
        },
        {
          id: "ev-5b",
          matchId: "m-1",
          minute: 67,
          period: "2H",
          type: "YELLOW_CARD",
          team: "AWAY",
          playerId: "p-fwd-savaiz",
          playerName: "Savaiz",
          notes: "Missed Chance: Savaiz misjudges a free header from Hammad's cross in the 6-yard box over the bar.",
          isVerified: true
        },
        {
          id: "ev-6",
          matchId: "m-1",
          minute: 74,
          period: "2H",
          type: "GOAL",
          team: "HOME",
          playerId: "p-fwd-dilshad",
          playerName: "Dilshad (Blue Lock)",
          relatedPlayerId: "p-mid-abrar",
          relatedPlayerName: "Abrar",
          notes: "Brace for Dilshad! Abrar carves open the defense with his 2nd clear assist of the night for Dilshad to finish with power for 4-2.",
          isVerified: true
        },
        {
          id: "ev-6b",
          matchId: "m-1",
          minute: 81,
          period: "2H",
          type: "YELLOW_CARD",
          team: "HOME",
          playerId: "p-fwd-dilshad",
          playerName: "Dilshad",
          notes: "Missed Chance: Dilshad skies a 1-on-1 chance over the bar, missing his hat-trick.",
          isVerified: true
        },
        {
          id: "ev-7",
          matchId: "m-1",
          minute: 86,
          period: "2H",
          type: "GOAL",
          team: "AWAY",
          playerId: "p-fwd-savaiz",
          playerName: "Savaiz",
          notes: "Goal for Coach FC! Chaos and intense rush inside the D! Savaiz pounces on the loose ball and taps in from close range! 4-3.",
          isVerified: true
        }
      ],
      participations: [
        { playerId: "p-def-hamza-jr", playerName: "Hamza", position: "GK", shirtNumber: 1, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-sheri", playerName: "Sheryar", position: "DEF", shirtNumber: 27, isStarting: true, minutesPlayed: 90, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-aliyan", playerName: "Aliyan", position: "DEF", shirtNumber: 26, isStarting: true, minutesPlayed: 90, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-jamshaid", playerName: "Jamshaid", position: "DEF", shirtNumber: 2, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-huzaifa", playerName: "Huzaifa", position: "DEF", shirtNumber: 5, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-mid-jibran", playerName: "Jibran", position: "MID", shirtNumber: 13, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-fwd-hammad", playerName: "Hammad", position: "FWD", shirtNumber: 11, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-mid-shafin", playerName: "Shafin", position: "FWD", shirtNumber: 18, isStarting: true, minutesPlayed: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-fwd-savaiz", playerName: "Savaiz", position: "FWD", shirtNumber: 29, isStarting: true, minutesPlayed: 90, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-fwd-adan", playerName: "Adan", position: "FWD", shirtNumber: 32, isStarting: false, subInMinute: 65, minutesPlayed: 25, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { playerId: "p-def-danish", playerName: "Danish", position: "DEF", shirtNumber: 3, isStarting: false, subInMinute: 70, minutesPlayed: 20, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }
      ],
      matchStats: {
        possessionPct: [64, 36],
        shots: [22, 13],
        shotsOnTarget: [12, 7],
        corners: [9, 4],
        fouls: [10, 14],
        yellowCards: [1, 2],
        redCards: [0, 0],
        passes: [642, 318],
        passAccuracyPct: [92, 80]
      }
    },
    {
      id: "m-8oct",
      homeTeam: "Coach FC",
      homeCrest: "/crest.svg",
      awayTeam: "Blue Lock FC",
      awayCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      isHome: true,
      competition: "Super Clash Thriller",
      round: "Derby Series Game 5",
      venue: "The Apex Arena",
      matchDate: "2026-10-08",
      kickoffTime: "20:30",
      status: "COMPLETED",
      homeScore: 5,
      awayScore: 6,
      halftimeHomeScore: 2,
      halftimeAwayScore: 3,
      attendance: "61,200",
      referee: "Howard Webb",
      events: [
        { id: "e8-1", matchId: "m-8oct", minute: 9, period: "1H", type: "GOAL", team: "AWAY", playerName: "Hammad (Blue Lock)", relatedPlayerName: "Abrar", notes: "Hammad scores early for Blue Lock FC off Abrar's first assist. 0-1.", isVerified: true },
        { id: "e8-2", matchId: "m-8oct", minute: 16, period: "1H", type: "GOAL", team: "HOME", playerName: "Usman (Coach FC)", notes: "Usman equalizes for Coach FC with a clinical low drive! 1-1.", isVerified: true },
        { id: "e8-3", matchId: "m-8oct", minute: 24, period: "1H", type: "GOAL", team: "AWAY", playerName: "Abrar (Blue Lock)", notes: "Abrar scores from the edge of the box to restore Blue Lock's lead. 1-2.", isVerified: true },
        { id: "e8-4", matchId: "m-8oct", minute: 33, period: "1H", type: "GOAL", team: "HOME", playerName: "Husnain (Coach FC)", relatedPlayerName: "Usman", notes: "Husnain scores for Coach FC after an assist from Usman! 2-2.", isVerified: true },
        { id: "e8-5", matchId: "m-8oct", minute: 41, period: "1H", type: "GOAL", team: "AWAY", playerName: "Dilshad (Blue Lock)", notes: "Dilshad clinical strike right before halftime for Blue Lock. 2-3.", isVerified: true },
        { id: "e8-6", matchId: "m-8oct", minute: 49, period: "2H", type: "GOAL", team: "HOME", playerName: "Aliyan (Coach FC)", notes: "Aliyan levels for Coach FC with a stinging drive from the right wing! 3-3.", isVerified: true },
        { id: "e8-7", matchId: "m-8oct", minute: 58, period: "2H", type: "GOAL", team: "AWAY", playerName: "Faheem (Blue Lock)", notes: "Faheem rockets home from 20 yards out for Blue Lock. 3-4.", isVerified: true },
        { id: "e8-8", matchId: "m-8oct", minute: 66, period: "2H", type: "GOAL", team: "HOME", playerName: "Husnain (Coach FC)", notes: "Husnain bags his brace with a sharp poacher's finish! 4-4.", isVerified: true },
        { id: "e8-9", matchId: "m-8oct", minute: 75, period: "2H", type: "GOAL", team: "HOME", playerName: "Usman (Coach FC)", notes: "Usman bags his 2nd goal with a magnificent curling strike! Coach FC lead 5-4.", isVerified: true },
        { id: "e8-10", matchId: "m-8oct", minute: 82, period: "2H", type: "GOAL", team: "AWAY", playerName: "Zohaib (Blue Lock)", notes: "Zohaib powers home an aerial bullet header off a set-piece for Blue Lock! 5-5.", isVerified: true },
        { id: "e8-11", matchId: "m-8oct", minute: 89, period: "2H", type: "GOAL", team: "AWAY", playerName: "Dilshad (Blue Lock)", relatedPlayerName: "Abrar", notes: "Dilshad scores his 2nd goal from Abrar's 2nd assist for a breathtaking 5-6 winner for Blue Lock FC!", isVerified: true }
      ],
      matchStats: {
        possessionPct: [43, 57],
        shots: [17, 21],
        shotsOnTarget: [10, 14],
        corners: [7, 8],
        fouls: [12, 10],
        yellowCards: [2, 1],
        redCards: [0, 0],
        passes: [390, 520],
        passAccuracyPct: [83, 89]
      }
    },
    {
      id: "m-30sep",
      homeTeam: "Coach FC",
      homeCrest: "/crest.svg",
      awayTeam: "Blue Lock FC",
      awayCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      isHome: true,
      competition: "Super Clash Thriller",
      round: "Derby Series Game 4",
      venue: "The Apex Arena",
      matchDate: "2026-09-30",
      kickoffTime: "20:00",
      status: "COMPLETED",
      homeScore: 0,
      awayScore: 3,
      halftimeHomeScore: 0,
      halftimeAwayScore: 1,
      attendance: "58,400",
      events: []
    },
    {
      id: "m-22sep",
      homeTeam: "Coach FC",
      homeCrest: "/crest.svg",
      awayTeam: "Blue Lock FC",
      awayCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      isHome: true,
      competition: "Super Clash Thriller",
      round: "Derby Series Game 3",
      venue: "The Apex Arena",
      matchDate: "2026-09-22",
      kickoffTime: "20:00",
      status: "COMPLETED",
      homeScore: 1,
      awayScore: 5,
      halftimeHomeScore: 1,
      halftimeAwayScore: 3,
      attendance: "56,900",
      events: []
    },
    {
      id: "m-14sep",
      homeTeam: "Coach FC",
      homeCrest: "/crest.svg",
      awayTeam: "Blue Lock FC",
      awayCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      isHome: true,
      competition: "Super Clash Thriller",
      round: "Derby Series Game 2",
      venue: "The Apex Arena",
      matchDate: "2026-09-14",
      kickoffTime: "20:00",
      status: "COMPLETED",
      homeScore: 2,
      awayScore: 6,
      halftimeHomeScore: 1,
      halftimeAwayScore: 3,
      attendance: "59,100",
      events: []
    },
    {
      id: "m-13sep",
      homeTeam: "Coach FC",
      homeCrest: "/crest.svg",
      awayTeam: "Blue Lock FC",
      awayCrest: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
      isHome: true,
      competition: "Super Clash Thriller",
      round: "Derby Series Game 1",
      venue: "The Apex Arena",
      matchDate: "2026-09-13",
      kickoffTime: "20:00",
      status: "COMPLETED",
      homeScore: 6,
      awayScore: 2,
      halftimeHomeScore: 3,
      halftimeAwayScore: 1,
      attendance: "62,500",
      events: []
    }
  ],
  formations: [
    {
      id: "form-1",
      name: "4-3-3 High Press (Default)",
      preset: "4-3-3",
      description: "Mushaf on left wing, Sibas in center attack, Hammad on right wing. Faheem anchoring behind Abrar and Jibran.",
      updatedAt: "2026-10-18",
      isDefault: true,
      benchPlayerIds: ["p-fwd-adan", "p-fwd-muhammad", "p-def-shakeel", "p-mid-kayani", "p-fwd-dilshad"],
      slots: [
        { slotId: "s-1", positionName: "GK", x: 50, y: 10, playerId: "p-gk-1" },
        { slotId: "s-2", positionName: "LB", x: 18, y: 28, playerId: "p-def-danish" },
        { slotId: "s-3", positionName: "LCB", x: 38, y: 25, playerId: "p-def-zohaib" },
        { slotId: "s-4", positionName: "RCB", x: 62, y: 25, playerId: "p-def-huzaifa" },
        { slotId: "s-5", positionName: "RB", x: 82, y: 28, playerId: "p-def-jamshaid" },
        { slotId: "s-6", positionName: "CDM", x: 50, y: 45, playerId: "p-mid-faheem" },
        { slotId: "s-7", positionName: "LCM", x: 32, y: 60, playerId: "p-mid-abrar" },
        { slotId: "s-8", positionName: "RCM", x: 68, y: 60, playerId: "p-mid-jibran" },
        { slotId: "s-9", positionName: "LW", x: 20, y: 82, playerId: "p-fwd-mushaf" },
        { slotId: "s-10", positionName: "ST", x: 50, y: 88, playerId: "p-fwd-sibas" },
        { slotId: "s-11", positionName: "RW", x: 80, y: 82, playerId: "p-fwd-hammad" }
      ]
    },
    {
      id: "form-2",
      name: "4-2-3-1 Apex Strike",
      preset: "4-2-3-1",
      description: "Dual pivot with Faheem and Kayani; Adan, Abrar, and Mushaf supporting Muhammad.",
      updatedAt: "2026-10-18",
      benchPlayerIds: ["p-fwd-sibas", "p-def-basit", "p-def-maaz", "p-mid-usman"],
      slots: [
        { slotId: "s-1", positionName: "GK", x: 50, y: 10, playerId: "p-gk-1" },
        { slotId: "s-2", positionName: "LB", x: 18, y: 26, playerId: "p-def-danish" },
        { slotId: "s-3", positionName: "LCB", x: 38, y: 24, playerId: "p-def-zohaib" },
        { slotId: "s-4", positionName: "RCB", x: 62, y: 24, playerId: "p-def-huzaifa" },
        { slotId: "s-5", positionName: "RB", x: 82, y: 26, playerId: "p-def-jamshaid" },
        { slotId: "s-6", positionName: "LDM", x: 36, y: 44, playerId: "p-mid-faheem" },
        { slotId: "s-7", positionName: "RDM", x: 64, y: 44, playerId: "p-mid-kayani" },
        { slotId: "s-8", positionName: "CAM", x: 50, y: 65, playerId: "p-mid-abrar" },
        { slotId: "s-9", positionName: "LAM", x: 20, y: 76, playerId: "p-fwd-mushaf" },
        { slotId: "s-10", positionName: "RAM", x: 80, y: 76, playerId: "p-fwd-adan" },
        { slotId: "s-11", positionName: "ST", x: 50, y: 88, playerId: "p-fwd-muhammad" }
      ]
    }
  ],
  news: [
    {
      id: "n-1",
      slug: "apex-derby-tactical-masterclass-preview",
      title: "Inside the Camp: Mushaf, Sibas & Abrar Primed for The Apex Derby",
      excerpt: "Tactical pressing triggers, high-line defensive compacting by Zohaib and Huzaifa, and the key duels that will decide Sunday.",
      content: `The stage is set under the floodlights of The Apex Arena. With Coach FC sitting atop the league table, this weekend’s clash against Manchester Athletic represents more than 3 points — it is a defining test of club mentality.

Head Coach Alexandre Moreau addressed the media in Friday's pre-match press conference:

"We do not adapt to the opponent's rhythm; we enforce our tempo from the opening whistle. Mushaf's pace on the wing, Sibas's predatory presence in the box, and Faheem anchoring our midfield will dictate the contest."

Key Tactical Focal Points:
1. Faheem's Rest Defense: Preventing counter-transitions by suffocating central passing lanes.
2. Fullback Overloads: Danish and Jamshaid pushing into midfield channels to isolate opposing wingers.
3. Mushaf & Sibas Synergy: Exploiting the space behind high center-back pairings with lethal one-two movements.

With a fully fit squad and 62,500 supporters creating an electric cauldron, Coach FC is prepared to leave everything on the pitch.`,
      category: "Match Report",
      author: "Zohaib",
      authorRole: "Lead Tactical Analyst & Captain",
      publishedAt: "2026-10-18T10:00:00Z",
      readTimeMinutes: 5,
      coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      tags: ["Premier League", "Derby", "Tactics", "Mushaf", "Sibas"]
    },
    {
      id: "n-2",
      slug: "mushaf-reaches-record-milestone",
      title: "Mushaf Surpasses 26 Goals & 14 Assists in Record-Breaking Season",
      excerpt: "The star left winger continues his historic campaign with unmatched efficiency and match-winning moments.",
      content: `With his clinical brace against Arsenal City, Mushaf became the fastest player in club history to record 26 goals and 14 assists in a single campaign.

Averaging a direct goal contribution every 54 minutes on the pitch, Mushaf's combination of explosive acceleration, two-footed ball control, and ice-cold finishing makes him Europe's most feared attacker.`,
      category: "First Team",
      author: "Faheem",
      authorRole: "First Team Coach",
      publishedAt: "2026-10-16T14:30:00Z",
      readTimeMinutes: 4,
      coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      tags: ["Mushaf", "Records", "First Team"]
    },
    {
      id: "n-3",
      slug: "apex-arena-expansion-state-of-the-art-academy",
      title: "Club Unveils Next-Generation Sports Science & Academy Complex",
      excerpt: "Coach FC commits €45M investment into cutting-edge recovery suites, biomechanics labs, and youth development pitches.",
      content: `Coach FC is proud to announce the formal groundbreaking of the Apex Performance Center. Designed in consultation with world-leading sports scientists and athletic directors, the complex will feature cryotherapy chambers, hydrotherapy pools, and AI-assisted tracking cameras across 8 hybrid grass pitches.`,
      category: "Club News",
      author: "David Sterling",
      authorRole: "Club President",
      publishedAt: "2026-10-08T09:15:00Z",
      readTimeMinutes: 6,
      coverImage: "https://images.unsplash.com/photo-1487466365202-1afab8a58911?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      tags: ["Academy", "Facilities", "Future"]
    }
  ],
  mediaAssets: [
    {
      id: "med-1",
      title: "Coach FC Matchday Cinematic Intro",
      category: "HERO_VIDEO",
      url: "https://assets.mixkit.co/videos/preview/mixkit-football-match-on-a-grass-pitch-41718-large.mp4",
      altText: "Coach FC players training and walking out under arena lights",
      isHeroActive: true,
      duration: "0:24",
      createdAt: "2026-09-01"
    },
    {
      id: "med-2",
      title: "The Apex Arena Under Lights",
      category: "POSTER",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80",
      altText: "Full panorama of The Apex Arena illuminated during a Champions night",
      createdAt: "2026-09-15"
    },
    {
      id: "med-3",
      title: "Mushaf & Sibas Goal Celebration",
      category: "MATCH_PHOTO",
      url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
      altText: "Mushaf and Sibas celebrating with the supporters in the North Stand",
      createdAt: "2026-10-10"
    }
  ]
};

// Memory-backed storage with cross-environment resilience
let memoryStore: DatabaseSchema = JSON.parse(JSON.stringify(DEFAULT_DB));

function getStore(): DatabaseSchema {
  if (typeof window !== 'undefined') {
    try {
      const cached = window.localStorage.getItem('coachfc_db');
      if (cached) {
        const parsed = JSON.parse(cached) as DatabaseSchema;
        // Purge legacy Tsukioynx and duplicate Abrar IDs
        parsed.players = parsed.players.filter(p => p.id !== 'p-mid-tsukioynx' && p.id !== 'p-fwd-abrar');

        // Merge missing default matches (e.g. m-mcs-captains)
        DEFAULT_DB.matches.forEach(defMatch => {
          const matchIdx = parsed.matches.findIndex(m => m.id === defMatch.id);
          if (matchIdx === -1) {
            parsed.matches.unshift(defMatch);
          } else if (defMatch.id === 'm-mcs-captains') {
            parsed.matches[matchIdx] = defMatch;
          }
        });
        // Merge missing players (e.g. Abrar) and synchronize clean sheet & photo updates
        DEFAULT_DB.players.forEach(defPlayer => {
          const existing = parsed.players.find(p => p.id === defPlayer.id);
          if (!existing) {
            parsed.players.push(defPlayer);
          } else {
            existing.name = defPlayer.name;
            existing.seasonStats.cleanSheets = defPlayer.seasonStats.cleanSheets;
            existing.attributes = defPlayer.attributes;
            existing.statusNotes = defPlayer.statusNotes;
            existing.photoUrl = defPlayer.photoUrl;
          }
        });
        return parsed;
      }
    } catch {
      // fallback to memory
    }
  }
  return memoryStore;
}

function commitStore(data: DatabaseSchema): void {
  memoryStore = data;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('coachfc_db', JSON.stringify(data));
    } catch {
      // fallback
    }
  }
}

// Public Database APIs
export const db = {
  getClubSettings(): ClubSettings {
    const data = getStore();
    return data.clubSettings;
  },

  updateClubSettings(updates: Partial<ClubSettings>): ClubSettings {
    const data = getStore();
    data.clubSettings = { ...data.clubSettings, ...updates };
    commitStore(data);
    return data.clubSettings;
  },

  getUsers(): User[] {
    const data = getStore();
    return data.users;
  },

  getPlayers(): Player[] {
    const data = getStore();
    return data.players;
  },

  getPlayerBySlug(slug: string): Player | undefined {
    const data = getStore();
    return data.players.find(p => p.slug === slug || p.id === slug);
  },

  createPlayer(playerData: Omit<Player, 'id' | 'slug'>): Player {
    const data = getStore();
    const id = `p-${Date.now()}`;
    const slug = playerData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newPlayer: Player = { ...playerData, id, slug };
    data.players.push(newPlayer);
    commitStore(data);
    return newPlayer;
  },

  updatePlayer(id: string, updates: Partial<Player>): Player | undefined {
    const data = getStore();
    const idx = data.players.findIndex(p => p.id === id || p.slug === id);
    if (idx === -1) return undefined;
    data.players[idx] = { ...data.players[idx], ...updates };
    commitStore(data);
    return data.players[idx];
  },

  deletePlayer(id: string): boolean {
    const data = getStore();
    const lenBefore = data.players.length;
    data.players = data.players.filter(p => p.id !== id && p.slug !== id);
    if (data.players.length < lenBefore) {
      commitStore(data);
      return true;
    }
    return false;
  },

  getMatches(): Match[] {
    const data = getStore();
    return data.matches;
  },

  getMatchById(id: string): Match | undefined {
    const data = getStore();
    const match = data.matches.find(m => m.id === id);
    if (!match) return undefined;

    if (match.participations) {
      match.participations = match.participations.map(part => {
        const p = data.players.find(pl => pl.id === part.playerId);
        return {
          ...part,
          playerName: p ? p.name : part.playerName,
          shirtNumber: p ? p.shirtNumber : part.shirtNumber,
          position: p ? p.position : part.position
        };
      });
    }

    return match;
  },

  createMatch(matchData: Omit<Match, 'id' | 'events'>): Match {
    const data = getStore();
    const id = `m-${Date.now()}`;
    const newMatch: Match = {
      ...matchData,
      id,
      events: [],
      participations: []
    };
    data.matches.unshift(newMatch);
    commitStore(data);
    return newMatch;
  },

  updateMatch(id: string, updates: Partial<Match>): Match | undefined {
    const data = getStore();
    const idx = data.matches.findIndex(m => m.id === id);
    if (idx === -1) return undefined;
    data.matches[idx] = { ...data.matches[idx], ...updates };
    commitStore(data);
    return data.matches[idx];
  },

  recalculateMatchParticipation(matchId: string, duration = 90): MatchParticipation[] {
    const data = getStore();
    const match = data.matches.find(m => m.id === matchId);
    if (!match) return [];

    const homeLineup = match.homeLineup || [];
    const events = [...match.events].sort((a, b) => a.minute - b.minute);

    const tracking = new Map<string, {
      player: Player;
      isStarting: boolean;
      onPitch: boolean;
      enteredAt?: number;
      exitedAt?: number;
      totalMinutes: number;
      goals: number;
      assists: number;
      yellowCards: number;
      redCards: number;
      flags: string[];
    }>();

    const startingPlayerIds = new Set<string>();
    homeLineup.forEach(slot => {
      if (slot.playerId) startingPlayerIds.add(slot.playerId);
    });

    if (startingPlayerIds.size === 0 && match.participations && match.participations.length > 0) {
      match.participations.forEach(p => {
        if (p.isStarting) startingPlayerIds.add(p.playerId);
      });
    }

    data.players.forEach(p => {
      const isStart = startingPlayerIds.has(p.id);
      tracking.set(p.id, {
        player: p,
        isStarting: isStart,
        onPitch: isStart,
        enteredAt: isStart ? 0 : undefined,
        totalMinutes: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
        flags: []
      });
    });

    events.forEach(ev => {
      if (ev.team !== 'HOME') return;

      if (ev.type === 'GOAL' && ev.playerId) {
        const tr = tracking.get(ev.playerId);
        if (tr) tr.goals += 1;
        if (ev.relatedPlayerId) {
          const assistTr = tracking.get(ev.relatedPlayerId);
          if (assistTr) assistTr.assists += 1;
        }
      }

      if (ev.type === 'YELLOW_CARD' && ev.playerId) {
        const tr = tracking.get(ev.playerId);
        if (tr) tr.yellowCards += 1;
      }

      if (ev.type === 'RED_CARD' && ev.playerId) {
        const tr = tracking.get(ev.playerId);
        if (tr) {
          tr.redCards += 1;
          if (tr.onPitch) {
            tr.totalMinutes += (ev.minute - (tr.enteredAt ?? 0));
            tr.onPitch = false;
            tr.exitedAt = ev.minute;
          }
        }
      }

      if (ev.type === 'SUBSTITUTION') {
        const outPlayerId = ev.playerId;
        const inPlayerId = ev.relatedPlayerId;

        if (outPlayerId) {
          const trOut = tracking.get(outPlayerId);
          if (trOut) {
            if (!trOut.onPitch) {
              trOut.flags.push(`Substituted out at ${ev.minute}' but was not detected on pitch!`);
            } else {
              trOut.totalMinutes += (ev.minute - (trOut.enteredAt ?? 0));
              trOut.onPitch = false;
              trOut.exitedAt = ev.minute;
            }
          }
        }

        if (inPlayerId) {
          const trIn = tracking.get(inPlayerId);
          if (trIn) {
            if (trIn.onPitch) {
              trIn.flags.push(`Substituted on at ${ev.minute}' but was already on pitch!`);
            } else {
              trIn.onPitch = true;
              trIn.enteredAt = ev.minute;
            }
          }
        }
      }
    });

    const participations: MatchParticipation[] = [];
    tracking.forEach((tr, pId) => {
      if (tr.onPitch) {
        tr.totalMinutes += (duration - (tr.enteredAt ?? 0));
      }

      if (tr.isStarting || tr.totalMinutes > 0 || tr.goals > 0 || tr.assists > 0 || tr.yellowCards > 0) {
        participations.push({
          playerId: pId,
          playerName: tr.player.name,
          position: tr.player.position,
          shirtNumber: tr.player.shirtNumber,
          isStarting: tr.isStarting,
          subInMinute: !tr.isStarting && tr.enteredAt !== undefined ? tr.enteredAt : undefined,
          subOutMinute: tr.exitedAt,
          minutesPlayed: Math.max(0, tr.totalMinutes),
          goals: tr.goals,
          assists: tr.assists,
          yellowCards: tr.yellowCards,
          redCards: tr.redCards,
          validationFlags: tr.flags.length > 0 ? tr.flags : undefined
        });
      }
    });

    match.participations = participations;
    commitStore(data);
    return participations;
  },

  addMatchEvent(matchId: string, eventData: Omit<MatchEvent, 'id' | 'isVerified'>): MatchEvent {
    const data = getStore();
    const match = data.matches.find(m => m.id === matchId);
    if (!match) throw new Error("Match not found");

    const newEvent: MatchEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      matchId,
      isVerified: true
    };

    match.events.push(newEvent);

    if (newEvent.type === 'GOAL') {
      if (newEvent.team === 'HOME') {
        match.homeScore = (match.homeScore || 0) + 1;
      } else {
        match.awayScore = (match.awayScore || 0) + 1;
      }
    }

    commitStore(data);
    this.recalculateMatchParticipation(matchId);
    return newEvent;
  },

  deleteMatchEvent(matchId: string, eventId: string): boolean {
    const data = getStore();
    const match = data.matches.find(m => m.id === matchId);
    if (!match) return false;

    const removedEv = match.events.find(e => e.id === eventId);
    if (removedEv && removedEv.type === 'GOAL') {
      if (removedEv.team === 'HOME' && (match.homeScore ?? 0) > 0) {
        match.homeScore = (match.homeScore ?? 0) - 1;
      } else if (removedEv.team === 'AWAY' && (match.awayScore ?? 0) > 0) {
        match.awayScore = (match.awayScore ?? 0) - 1;
      }
    }

    match.events = match.events.filter(e => e.id !== eventId);
    commitStore(data);
    this.recalculateMatchParticipation(matchId);
    return true;
  },

  getFormations(): TacticalFormation[] {
    const data = getStore();
    return data.formations;
  },

  saveFormation(formation: TacticalFormation): TacticalFormation {
    const data = getStore();
    const idx = data.formations.findIndex(f => f.id === formation.id);
    if (idx >= 0) {
      data.formations[idx] = { ...formation, updatedAt: new Date().toISOString() };
    } else {
      data.formations.push({ ...formation, updatedAt: new Date().toISOString() });
    }
    commitStore(data);
    return formation;
  },

  getWorkloadAnalysis(): WorkloadRecord[] {
    const data = getStore();
    const thresholdMins = data.clubSettings.highWorkloadMinutesThreshold;
    const minRestDays = data.clubSettings.minRestDaysThreshold;

    return data.players.map(player => {
      let minutesLast3 = 0;
      let minutesLast5 = 0;
      let startsIn5 = 0;
      const daysSinceLast = player.status === 'INJURED' ? 21 : 4;

      data.matches.slice(0, 5).forEach((m, idx) => {
        const part = m.participations?.find(p => p.playerId === player.id);
        const mins = part ? part.minutesPlayed : (player.seasonStats.starts > 15 ? 85 : 20);
        const isStart = part ? part.isStarting : (player.seasonStats.starts > 15);

        if (idx < 3) minutesLast3 += mins;
        minutesLast5 += mins;
        if (isStart) startsIn5 += 1;
      });

      const flags: string[] = [];
      let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';

      if (player.status === 'INJURED') {
        flags.push("Medical: Player is currently sidelined");
        riskLevel = 'HIGH';
      } else if (player.status === 'DOUBTFUL') {
        flags.push("Medical: Flagged for minor muscle tightness");
        riskLevel = 'MODERATE';
      }

      if (minutesLast3 >= thresholdMins) {
        flags.push(`Workload: Exceeded threshold (${minutesLast3}m in recent fixtures)`);
        riskLevel = 'HIGH';
      } else if (startsIn5 >= 4) {
        flags.push(`Fatigue: ${startsIn5} starts in last 5 games. Rotation recommended`);
        if (riskLevel !== 'HIGH') riskLevel = 'MODERATE';
      }

      if (daysSinceLast < minRestDays) {
        flags.push(`Recovery: Less than ${minRestDays} days rest since last start`);
        if (riskLevel !== 'HIGH') riskLevel = 'MODERATE';
      }

      return {
        playerId: player.id,
        player,
        minutesLast3Matches: minutesLast3,
        minutesLast5Matches: minutesLast5,
        startsInLast5Matches: startsIn5,
        daysSinceLastMatch: daysSinceLast,
        riskLevel,
        flags
      };
    });
  },

  getNews(): NewsArticle[] {
    const data = getStore();
    return data.news;
  },

  getNewsBySlug(slug: string): NewsArticle | undefined {
    const data = getStore();
    return data.news.find(n => n.slug === slug || n.id === slug);
  },

  createNews(article: Omit<NewsArticle, 'id' | 'slug' | 'publishedAt'>): NewsArticle {
    const data = getStore();
    const id = `n-${Date.now()}`;
    const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newArt: NewsArticle = {
      ...article,
      id,
      slug,
      publishedAt: new Date().toISOString()
    };
    data.news.unshift(newArt);
    commitStore(data);
    return newArt;
  },

  getMediaAssets(): MediaAsset[] {
    const data = getStore();
    return data.mediaAssets;
  },

  addMediaAsset(asset: Omit<MediaAsset, 'id' | 'createdAt'>): MediaAsset {
    const data = getStore();
    const newAsset: MediaAsset = {
      ...asset,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    data.mediaAssets.unshift(newAsset);
    commitStore(data);
    return newAsset;
  }
};
