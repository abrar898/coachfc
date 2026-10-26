'use client';

import React, { useState, useMemo } from 'react';
import { db } from '@/lib/db';
import { Player, PlayerPosition, PlayerStatus } from '@/lib/types';
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  AlertCircle, 
  ShieldCheck,
  Filter
} from 'lucide-react';

export default function DashboardPlayersPage() {
  const [players, setPlayers] = useState<Player[]>(() => db.getPlayers());
  const [search, setSearch] = useState('');
  const [filterPos, setFilterPos] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    shirtNumber: 1,
    position: 'MID' as PlayerPosition,
    nationality: '',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    dateOfBirth: '2001-01-01',
    age: 25,
    heightCm: 182,
    weightKg: 78,
    preferredFoot: 'Right' as 'Left' | 'Right' | 'Both',
    status: 'FIT' as PlayerStatus,
    marketValue: '€35M',
    bio: ''
  });

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchPos = filterPos === 'ALL' || p.position === filterPos;
      const matchStat = filterStatus === 'ALL' || p.status === filterStatus;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shirtNumber.toString().includes(search) ||
        p.nationality.toLowerCase().includes(search.toLowerCase());
      return matchPos && matchStat && matchSearch;
    });
  }, [players, filterPos, filterStatus, search]);

  const openCreateModal = () => {
    setEditingPlayer(null);
    setFormData({
      name: '',
      shirtNumber: players.length + 1,
      position: 'MID',
      nationality: 'England',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      dateOfBirth: '2001-01-01',
      age: 25,
      heightCm: 182,
      weightKg: 78,
      preferredFoot: 'Right',
      status: 'FIT',
      marketValue: '€25M',
      bio: 'New first-team signing registered into the Coach FC database.'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      shirtNumber: player.shirtNumber,
      position: player.position,
      nationality: player.nationality,
      photoUrl: player.photoUrl,
      dateOfBirth: player.dateOfBirth,
      age: player.age,
      heightCm: player.heightCm,
      weightKg: player.weightKg,
      preferredFoot: player.preferredFoot,
      status: player.status,
      marketValue: player.marketValue,
      bio: player.bio
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingPlayer) {
      // Update
      const updated = db.updatePlayer(editingPlayer.id, {
        name: formData.name,
        shirtNumber: Number(formData.shirtNumber),
        position: formData.position,
        nationality: formData.nationality,
        photoUrl: formData.photoUrl,
        dateOfBirth: formData.dateOfBirth,
        age: Number(formData.age),
        heightCm: Number(formData.heightCm),
        weightKg: Number(formData.weightKg),
        preferredFoot: formData.preferredFoot,
        status: formData.status,
        marketValue: formData.marketValue,
        bio: formData.bio
      });

      if (updated) {
        setPlayers(db.getPlayers());
      }
    } else {
      // Create
      const created = db.createPlayer({
        name: formData.name,
        shirtNumber: Number(formData.shirtNumber),
        position: formData.position,
        secondaryPositions: [],
        nationality: formData.nationality,
        nationalityCode: 'ENG',
        photoUrl: formData.photoUrl,
        dateOfBirth: formData.dateOfBirth,
        age: Number(formData.age),
        heightCm: Number(formData.heightCm),
        weightKg: Number(formData.weightKg),
        preferredFoot: formData.preferredFoot,
        status: formData.status,
        bio: formData.bio,
        contractUntil: '2029-06-30',
        marketValue: formData.marketValue,
        joinedYear: 2026,
        attributes: { pace: 80, shooting: 75, passing: 80, dribbling: 80, defending: 70, physical: 78 },
        seasonStats: {
          appearances: 0, starts: 0, substituteIn: 0, minutesPlayed: 0,
          goals: 0, assists: 0, yellowCards: 0, redCards: 0,
          passAccuracyPct: 82.0, shotsOnTarget: 0, tacklesWon: 0
        }
      });
      setPlayers(db.getPlayers());
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    db.deletePlayer(id);
    setPlayers(db.getPlayers());
    setDeleteConfirmId(null);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Player Administration Module
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            SQUAD REGISTRY & CONTRACTS
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Create, update biometric profiles, edit statuses, or manage player registration.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Player</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-[#929BA9] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, number, nationality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111722] border border-[#283141] pl-10 pr-4 py-2 rounded-xl text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterPos}
            onChange={(e) => setFilterPos(e.target.value)}
            className="bg-[#111722] border border-[#283141] px-3 py-2 rounded-xl text-xs font-bold text-[#F5F7FA] focus:outline-none"
          >
            <option value="ALL">All Positions</option>
            <option value="GK">Goalkeepers</option>
            <option value="DEF">Defenders</option>
            <option value="MID">Midfielders</option>
            <option value="FWD">Forwards</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#111722] border border-[#283141] px-3 py-2 rounded-xl text-xs font-bold text-[#F5F7FA] focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="FIT">Fit (Match Ready)</option>
            <option value="DOUBTFUL">Doubtful</option>
            <option value="INJURED">Injured</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Player</th>
                <th className="p-4">Position</th>
                <th className="p-4">Nationality</th>
                <th className="p-4">Age / Height</th>
                <th className="p-4">Market Value</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Season Stats</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#283141]">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-[#171F2C]/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#C6FF00]">
                    #{player.shirtNumber}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={player.photoUrl}
                        alt=""
                        className="w-9 h-9 rounded-lg object-cover bg-[#080B12] border border-[#283141]"
                      />
                      <div>
                        <div className="font-bold text-[#F5F7FA] text-sm">{player.name}</div>
                        <div className="text-[10px] text-[#929BA9]">{player.preferredFoot} footed</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-[#171F2C] border border-[#283141] text-xs font-mono font-bold text-[#F5F7FA]">
                      {player.position}
                    </span>
                  </td>
                  <td className="p-4 text-[#929BA9]">{player.nationality}</td>
                  <td className="p-4 text-[#929BA9]">
                    {player.age} yrs • {player.heightCm}cm
                  </td>
                  <td className="p-4 font-mono font-bold text-[#C6FF00]">
                    {player.marketValue}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      player.status === 'FIT' ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30' :
                      player.status === 'DOUBTFUL' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30' :
                      'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30'
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono text-[#929BA9]">
                    {player.seasonStats.appearances} apps • {player.seasonStats.goals}G • {player.seasonStats.minutesPlayed}'
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(player)}
                        className="p-1.5 rounded-lg bg-[#171F2C] border border-[#283141] text-[#929BA9] hover:text-[#C6FF00] hover:border-[#C6FF00]/50"
                        title="Edit Player"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(player.id)}
                        className="p-1.5 rounded-lg bg-[#171F2C] border border-[#283141] text-[#929BA9] hover:text-[#EF4444] hover:border-[#EF4444]/50"
                        title="Delete Player"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111722] border border-[#EF4444]/50 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-[#EF4444]">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-black uppercase text-[#F5F7FA]">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-[#929BA9]">
              Are you sure you want to remove this player from the official squad register? This will also remove them from default formation slots.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-[#171F2C] text-xs font-bold text-[#F5F7FA] hover:bg-[#1E293B]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-[#EF4444] text-xs font-black uppercase text-[#F5F7FA] hover:bg-red-600"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Player Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA]">
                {editingPlayer ? `Edit Player: ${editingPlayer.name}` : 'Register New Player'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Shirt Number</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={formData.shirtNumber}
                    onChange={(e) => setFormData({ ...formData, shirtNumber: Number(e.target.value) })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Position</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as PlayerPosition })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="GK">Goalkeeper (GK)</option>
                    <option value="DEF">Defender (DEF)</option>
                    <option value="MID">Midfielder (MID)</option>
                    <option value="FWD">Forward (FWD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Nationality</label>
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Preferred Foot</label>
                  <select
                    value={formData.preferredFoot}
                    onChange={(e) => setFormData({ ...formData, preferredFoot: e.target.value as any })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Medical Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PlayerStatus })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="FIT">FIT (Match Ready)</option>
                    <option value="DOUBTFUL">DOUBTFUL</option>
                    <option value="INJURED">INJURED</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Market Value</label>
                  <input
                    type="text"
                    value={formData.marketValue}
                    onChange={(e) => setFormData({ ...formData, marketValue: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Biography / Scouting Notes</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] p-3 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#283141]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#171F2C] text-[#F5F7FA] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] font-black uppercase tracking-wider hover:bg-[#B2E600]"
                >
                  {editingPlayer ? 'Save Changes' : 'Register Player'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
