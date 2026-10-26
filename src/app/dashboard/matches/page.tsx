'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Match, MatchStatus, Competition } from '@/lib/types';
import { Crest } from '@/components/Crest';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Activity, 
  X,
  CheckCircle2,
  AlertCircle,
  Star,
  Trash2,
  Award,
  Sparkles,
  UserPlus
} from 'lucide-react';

export default function DashboardMatchesPage() {
  const [matches, setMatches] = useState<Match[]>(() => db.getMatches());
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingScoreMatch, setEditingScoreMatch] = useState<Match | null>(null);

  // Create Form State
  const [createForm, setCreateForm] = useState({
    homeTeam: 'Coach FC',
    homeCrest: '/crest.svg',
    awayTeam: '',
    awayCrest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80',
    isHome: true,
    competition: 'Premier League' as Competition,
    round: 'Regular Season',
    venue: 'The Apex Arena',
    matchDate: '2026-11-15',
    kickoffTime: '20:00',
    status: 'SCHEDULED' as MatchStatus,
    attendance: '62,500'
  });

  // Available players for ratings selection
  const allSquadPlayers = useMemo(() => db.getPlayers(), []);
  const [selectedPlayerIdToAdd, setSelectedPlayerIdToAdd] = useState<string>('');

  // Score Form State
  const [scoreForm, setScoreForm] = useState({
    status: 'COMPLETED' as MatchStatus,
    homeScore: 0,
    awayScore: 0,
    halftimeHomeScore: 0,
    halftimeAwayScore: 0,
    ratings: [] as import('@/lib/types').PlayerRatingItem[]
  });

  const filteredMatches = useMemo(() => {
    return matches.filter(m => filterStatus === 'ALL' || m.status === filterStatus);
  }, [matches, filterStatus]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.awayTeam.trim()) return;

    db.createMatch({
      ...createForm,
      isHome: createForm.homeTeam === 'Coach FC'
    });

    setMatches(db.getMatches());
    setIsCreateOpen(false);
  };

  const openScoreModal = (match: Match) => {
    setEditingScoreMatch(match);
    const existingRatings = match.playerRatings && match.playerRatings.length > 0 
      ? JSON.parse(JSON.stringify(match.playerRatings)) 
      : [];
    setScoreForm({
      status: match.status,
      homeScore: match.homeScore ?? 0,
      awayScore: match.awayScore ?? 0,
      halftimeHomeScore: match.halftimeHomeScore ?? 0,
      halftimeAwayScore: match.halftimeAwayScore ?? 0,
      ratings: existingRatings
    });
  };

  const handleAddPlayerRating = (playerId: string) => {
    if (!playerId) return;
    const player = allSquadPlayers.find(p => p.id === playerId);
    if (!player) return;

    if (scoreForm.ratings.some(r => r.name.toLowerCase() === player.name.toLowerCase())) {
      return; // already added
    }

    const newRatingItem: import('@/lib/types').PlayerRatingItem = {
      name: player.name,
      team: 'Coach FC',
      number: player.shirtNumber,
      position: player.position,
      photoUrl: player.photoUrl,
      photoSuitUrl: player.photoSuitUrl,
      photoFullKitUrl: player.photoUrl,
      rating: 7.5,
      isKeyPlayer: false,
      highlightBadge: '⚔️ SQUAD SHIFT',
      badgeColor: 'bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30',
      goals: 0,
      assists: 0,
      chancesCreated: 0,
      missedChances: 0,
      keyStats: '85% Pass Accuracy • Disciplined Positioning',
      verdict: `Solid tactical contribution from ${player.name} in matchday execution.`
    };

    setScoreForm(prev => ({
      ...prev,
      ratings: [...prev.ratings, newRatingItem]
    }));
    setSelectedPlayerIdToAdd('');
  };

  const handleSetKeyPlayer = (index: number) => {
    setScoreForm(prev => ({
      ...prev,
      ratings: prev.ratings.map((r, i) => {
        if (i === index) {
          const isNowKey = !r.isKeyPlayer;
          return {
            ...r,
            isKeyPlayer: isNowKey,
            highlightBadge: isNowKey ? '⭐ KEY PLAYER OF THE MATCH' : r.highlightBadge,
            badgeColor: isNowKey ? 'bg-[#C6FF00] text-[#080B12]' : r.badgeColor
          };
        } else {
          return {
            ...r,
            isKeyPlayer: false,
            highlightBadge: r.highlightBadge?.includes('KEY PLAYER') ? '🔥 STAR CONTRIBUTOR' : r.highlightBadge
          };
        }
      })
    }));
  };

  const handleRemoveRating = (index: number) => {
    setScoreForm(prev => ({
      ...prev,
      ratings: prev.ratings.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateRatingItem = (index: number, updates: Partial<import('@/lib/types').PlayerRatingItem>) => {
    setScoreForm(prev => ({
      ...prev,
      ratings: prev.ratings.map((r, i) => i === index ? { ...r, ...updates } : r)
    }));
  };

  const handleSaveScores = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScoreMatch) return;

    db.updateMatch(editingScoreMatch.id, {
      status: scoreForm.status,
      homeScore: Number(scoreForm.homeScore),
      awayScore: Number(scoreForm.awayScore),
      halftimeHomeScore: Number(scoreForm.halftimeHomeScore),
      halftimeAwayScore: Number(scoreForm.halftimeAwayScore),
      playerRatings: scoreForm.ratings
    });

    // Auto-recalculate match participation
    db.recalculateMatchParticipation(editingScoreMatch.id);

    setMatches(db.getMatches());
    setEditingScoreMatch(null);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Match Operations & Scheduling
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            FIXTURES & RESULTS MANAGER
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Create fixtures, record final and halftime scorelines, or launch live event minute logging.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Fixture</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', 'SCHEDULED', 'LIVE', 'COMPLETED', 'POSTPONED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              filterStatus === st
                ? 'bg-[#C6FF00] text-[#080B12]'
                : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((m) => (
          <div
            key={m.id}
            className="p-6 rounded-2xl bg-[#111722] border border-[#283141] hover:border-[#C6FF00]/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Competition & Meta */}
            <div className="lg:w-64">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C6FF00] block">
                {m.competition}
              </span>
              <div className="text-sm font-bold text-[#F5F7FA] mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#929BA9]" />
                {m.matchDate} @ {m.kickoffTime} GMT
              </div>
              <div className="text-xs text-[#929BA9] flex items-center gap-1.5 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5" />
                {m.venue}
              </div>
            </div>

            {/* Teams & Scores Center */}
            <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8">
              <div className="flex-1 flex items-center justify-end gap-3 text-right">
                <span className={`text-sm sm:text-base font-black uppercase ${m.homeTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                  {m.homeTeam}
                </span>
                <div className="w-9 h-9 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center p-1.5 shrink-0">
                  {m.homeTeam === 'Coach FC' ? <Crest size={24} /> : <img src={m.homeCrest} alt="" className="w-5 h-5 rounded-full object-cover" />}
                </div>
              </div>

              <div className="text-center shrink-0">
                {m.status === 'COMPLETED' ? (
                  <div className="text-2xl font-black font-mono text-[#F5F7FA] bg-[#080B12] px-4 py-1.5 rounded-xl border border-[#283141]">
                    {m.homeScore} : {m.awayScore}
                  </div>
                ) : (
                  <div className="px-3.5 py-1 rounded-xl bg-[#080B12] border border-[#283141] text-xs font-mono font-bold text-[#C6FF00]">
                    VS
                  </div>
                )}
                <span className="text-[10px] font-mono text-[#929BA9] uppercase mt-1 block">
                  {m.status}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-start gap-3 text-left">
                <div className="w-9 h-9 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center p-1.5 shrink-0">
                  {m.awayTeam === 'Coach FC' ? <Crest size={24} /> : <img src={m.awayCrest} alt="" className="w-5 h-5 rounded-full object-cover" />}
                </div>
                <span className={`text-sm sm:text-base font-black uppercase ${m.awayTeam === 'Coach FC' ? 'text-[#C6FF00]' : 'text-[#F5F7FA]'}`}>
                  {m.awayTeam}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="lg:w-72 flex items-center justify-start lg:justify-end gap-2">
              <button
                onClick={() => openScoreModal(m)}
                className="px-3 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-bold text-[#F5F7FA] hover:text-[#C6FF00] hover:border-[#C6FF00]/50 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update Score / Status</span>
              </button>

              <Link
                href={`/dashboard/matches/${m.id}`}
                className="px-3 py-2 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors flex items-center gap-1"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Live Event Logger</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Fixture Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA]">Create New Fixture</h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Home Team</label>
                  <input
                    type="text"
                    required
                    value={createForm.homeTeam}
                    onChange={(e) => setCreateForm({ ...createForm, homeTeam: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Away Team</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liverpool Athletic"
                    value={createForm.awayTeam}
                    onChange={(e) => setCreateForm({ ...createForm, awayTeam: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Competition</label>
                  <select
                    value={createForm.competition}
                    onChange={(e) => setCreateForm({ ...createForm, competition: e.target.value as Competition })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="Premier League">Premier League</option>
                    <option value="Champions Trophy">Champions Trophy</option>
                    <option value="National Cup">National Cup</option>
                    <option value="Continental Supercup">Continental Supercup</option>
                    <option value="Friendly">Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Round / Stage</label>
                  <input
                    type="text"
                    value={createForm.round}
                    onChange={(e) => setCreateForm({ ...createForm, round: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Match Date</label>
                  <input
                    type="date"
                    required
                    value={createForm.matchDate}
                    onChange={(e) => setCreateForm({ ...createForm, matchDate: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Kickoff Time</label>
                  <input
                    type="text"
                    required
                    value={createForm.kickoffTime}
                    onChange={(e) => setCreateForm({ ...createForm, kickoffTime: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={createForm.venue}
                  onChange={(e) => setCreateForm({ ...createForm, venue: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#283141]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#171F2C] text-[#F5F7FA] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] font-black uppercase tracking-wider hover:bg-[#B2E600]"
                >
                  Create Fixture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Score Modal */}
      {editingScoreMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA]">Update Match Scores</h3>
              <button onClick={() => setEditingScoreMatch(null)} className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveScores} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Match Status</label>
                <select
                  value={scoreForm.status}
                  onChange={(e) => setScoreForm({ ...scoreForm, status: e.target.value as MatchStatus })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="LIVE">LIVE</option>
                  <option value="COMPLETED">COMPLETED (Full Time)</option>
                  <option value="POSTPONED">POSTPONED</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">{editingScoreMatch.homeTeam} FT</label>
                  <input
                    type="number"
                    min="0"
                    value={scoreForm.homeScore}
                    onChange={(e) => setScoreForm({ ...scoreForm, homeScore: Number(e.target.value) })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">{editingScoreMatch.awayTeam} FT</label>
                  <input
                    type="number"
                    min="0"
                    value={scoreForm.awayScore}
                    onChange={(e) => setScoreForm({ ...scoreForm, awayScore: Number(e.target.value) })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">HT Home Score</label>
                  <input
                    type="number"
                    min="0"
                    value={scoreForm.halftimeHomeScore}
                    onChange={(e) => setScoreForm({ ...scoreForm, halftimeHomeScore: Number(e.target.value) })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">HT Away Score</label>
                  <input
                    type="number"
                    min="0"
                    value={scoreForm.halftimeAwayScore}
                    onChange={(e) => setScoreForm({ ...scoreForm, halftimeAwayScore: Number(e.target.value) })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              {/* Dynamic Player Match Ratings & Key Player Selection */}
              <div className="pt-4 border-t border-[#283141] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-[#C6FF00] font-black uppercase text-xs tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C6FF00]" />
                      Player Match Ratings & Key Player (MOTM)
                    </label>
                    <p className="text-[11px] text-[#929BA9]">
                      Select any squad player, set ratings (1.0-10.0), track chances created & designate Key Player of the Match.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171F2C] border border-[#283141] text-[#C6FF00] font-bold">
                    {scoreForm.ratings.length} Players Rated
                  </span>
                </div>

                {/* Player Selector Bar */}
                <div className="p-3 rounded-xl bg-[#080B12] border border-[#283141] flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full">
                    <select
                      value={selectedPlayerIdToAdd}
                      onChange={(e) => setSelectedPlayerIdToAdd(e.target.value)}
                      className="w-full bg-[#111722] border border-[#283141] px-3 py-2 rounded-xl text-xs font-bold text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                    >
                      <option value="">-- Choose Squad Player to Rate --</option>
                      {allSquadPlayers.map(p => (
                        <option 
                          key={p.id} 
                          value={p.id}
                          disabled={scoreForm.ratings.some(r => r.name.toLowerCase() === p.name.toLowerCase())}
                        >
                          #{p.shirtNumber} {p.name} ({p.position}) {scoreForm.ratings.some(r => r.name.toLowerCase() === p.name.toLowerCase()) ? '— (Already Added)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddPlayerRating(selectedPlayerIdToAdd)}
                    disabled={!selectedPlayerIdToAdd}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#B2E600] transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Player</span>
                  </button>
                </div>

                {/* Ratings Cards List */}
                {scoreForm.ratings.length === 0 ? (
                  <div className="p-6 text-center rounded-xl bg-[#171F2C]/40 border border-dashed border-[#283141] text-[#929BA9] text-xs space-y-2">
                    <p>No player ratings recorded for this fixture yet.</p>
                    <p className="text-[11px] text-[#929BA9]/70">Use the dropdown above to add players, or load verified active squad members.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {scoreForm.ratings.map((rating, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-xl border transition-all ${
                          rating.isKeyPlayer
                            ? 'bg-[#171F2C] border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.15)]'
                            : 'bg-[#171F2C]/60 border-[#283141]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#080B12] border border-[#283141] flex items-center justify-center text-[10px] font-mono font-bold text-[#C6FF00]">
                              {rating.number}
                            </span>
                            <span className="font-bold text-sm text-[#F5F7FA]">
                              {rating.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#929BA9]">
                              ({rating.position})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Key Player Toggle Button */}
                            <button
                              type="button"
                              onClick={() => handleSetKeyPlayer(idx)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                rating.isKeyPlayer
                                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_10px_rgba(198,255,0,0.4)]'
                                  : 'bg-[#080B12] text-[#929BA9] border border-[#283141] hover:text-[#C6FF00]'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${rating.isKeyPlayer ? 'fill-current' : ''}`} />
                              <span>{rating.isKeyPlayer ? '⭐ Key Player (MOTM)' : 'Make Key Player'}</span>
                            </button>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveRating(idx)}
                              className="p-1 rounded-lg text-[#929BA9] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Remove player rating"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Rating & Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-2.5">
                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Rating (1-10)</label>
                            <input
                              type="number"
                              step="0.1"
                              min="1.0"
                              max="10.0"
                              value={rating.rating}
                              onChange={(e) => handleUpdateRatingItem(idx, { rating: Number(e.target.value) })}
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg font-mono text-xs font-bold text-[#C6FF00] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Goals</label>
                            <input
                              type="number"
                              min="0"
                              value={rating.goals}
                              onChange={(e) => handleUpdateRatingItem(idx, { goals: Number(e.target.value) })}
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg font-mono text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Assists</label>
                            <input
                              type="number"
                              min="0"
                              value={rating.assists}
                              onChange={(e) => handleUpdateRatingItem(idx, { assists: Number(e.target.value) })}
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg font-mono text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Chances Created</label>
                            <input
                              type="number"
                              min="0"
                              value={rating.chancesCreated}
                              onChange={(e) => handleUpdateRatingItem(idx, { chancesCreated: Number(e.target.value) })}
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg font-mono text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Missed Chances</label>
                            <input
                              type="number"
                              min="0"
                              value={rating.missedChances}
                              onChange={(e) => handleUpdateRatingItem(idx, { missedChances: Number(e.target.value) })}
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg font-mono text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>
                        </div>

                        {/* Badge & Key Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Highlight Badge</label>
                            <input
                              type="text"
                              value={rating.highlightBadge || ''}
                              onChange={(e) => handleUpdateRatingItem(idx, { highlightBadge: e.target.value })}
                              placeholder="e.g. ⭐ SUPER KEY PLAYER • 9 BIG CHANCES"
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg text-xs font-bold text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Key Stats Telemetry</label>
                            <input
                              type="text"
                              value={rating.keyStats || ''}
                              onChange={(e) => handleUpdateRatingItem(idx, { keyStats: e.target.value })}
                              placeholder="e.g. 9 Big Chances Created • 2 Clear Assists"
                              className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1 rounded-lg text-xs font-mono text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                            />
                          </div>
                        </div>

                        {/* Verdict Text */}
                        <div>
                          <label className="block text-[9px] font-mono text-[#929BA9] uppercase mb-0.5">Performance Verdict</label>
                          <textarea
                            rows={2}
                            value={rating.verdict || ''}
                            onChange={(e) => handleUpdateRatingItem(idx, { verdict: e.target.value })}
                            placeholder="Enter match review and tactical verdict..."
                            className="w-full bg-[#080B12] border border-[#283141] px-2.5 py-1.5 rounded-lg text-xs text-[#929BA9] focus:outline-none focus:border-[#C6FF00]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#283141]">
                <button
                  type="button"
                  onClick={() => setEditingScoreMatch(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#171F2C] text-[#F5F7FA] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] font-black uppercase tracking-wider hover:bg-[#B2E600]"
                >
                  Save Results
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
