'use client';

import React, { useState, useMemo } from 'react';
import { db } from '@/lib/db';
import { Player, TacticalFormation, MatchLineupSlot } from '@/lib/types';
import { 
  Layers, 
  Save, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  Users, 
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const PRESET_CONFIGS: Record<string, { x: number; y: number; pos: string }[]> = {
  '4-3-3': [
    { x: 50, y: 8, pos: 'GK' },
    { x: 18, y: 26, pos: 'LB' },
    { x: 38, y: 24, pos: 'LCB' },
    { x: 62, y: 24, pos: 'RCB' },
    { x: 82, y: 26, pos: 'RB' },
    { x: 50, y: 44, pos: 'CDM' },
    { x: 32, y: 58, pos: 'LCM' },
    { x: 68, y: 58, pos: 'RCM' },
    { x: 20, y: 80, pos: 'LW' },
    { x: 50, y: 88, pos: 'ST' },
    { x: 80, y: 80, pos: 'RW' }
  ],
  '4-2-3-1': [
    { x: 50, y: 8, pos: 'GK' },
    { x: 18, y: 25, pos: 'LB' },
    { x: 38, y: 23, pos: 'LCB' },
    { x: 62, y: 23, pos: 'RCB' },
    { x: 82, y: 25, pos: 'RB' },
    { x: 36, y: 44, pos: 'LDM' },
    { x: 64, y: 44, pos: 'RDM' },
    { x: 50, y: 64, pos: 'CAM' },
    { x: 22, y: 76, pos: 'LAM' },
    { x: 78, y: 76, pos: 'RAM' },
    { x: 50, y: 88, pos: 'ST' }
  ],
  '4-4-2': [
    { x: 50, y: 8, pos: 'GK' },
    { x: 18, y: 26, pos: 'LB' },
    { x: 38, y: 24, pos: 'LCB' },
    { x: 62, y: 24, pos: 'RCB' },
    { x: 82, y: 26, pos: 'RB' },
    { x: 18, y: 54, pos: 'LM' },
    { x: 38, y: 54, pos: 'LCM' },
    { x: 62, y: 54, pos: 'RCM' },
    { x: 82, y: 54, pos: 'RM' },
    { x: 38, y: 84, pos: 'LS' },
    { x: 62, y: 84, pos: 'RS' }
  ],
  '3-5-2': [
    { x: 50, y: 8, pos: 'GK' },
    { x: 26, y: 24, pos: 'LCB' },
    { x: 50, y: 22, pos: 'CB' },
    { x: 74, y: 24, pos: 'RCB' },
    { x: 12, y: 50, pos: 'LWB' },
    { x: 36, y: 48, pos: 'LCM' },
    { x: 50, y: 42, pos: 'CDM' },
    { x: 64, y: 48, pos: 'RCM' },
    { x: 88, y: 50, pos: 'RWB' },
    { x: 38, y: 84, pos: 'LS' },
    { x: 62, y: 84, pos: 'RS' }
  ]
};

export default function LineupBuilderPage() {
  const players = useMemo(() => db.getPlayers(), []);
  const initialFormations = useMemo(() => db.getFormations(), []);

  const [selectedFormationId, setSelectedFormationId] = useState<string>(initialFormations[0]?.id || 'form-1');
  const [preset, setPreset] = useState<string>('4-3-3');
  const [formationName, setFormationName] = useState<string>('4-3-3 High Press (Default)');
  const [opponentNotes, setOpponentNotes] = useState<string>('Aggressive counter-press against Manchester Athletic.');
  
  // Slots state (11 positions on pitch)
  const [slots, setSlots] = useState<MatchLineupSlot[]>(() => {
    const f = initialFormations[0];
    if (f && f.slots.length === 11) return f.slots;
    return PRESET_CONFIGS['4-3-3'].map((item, idx) => ({
      slotId: `slot-${idx + 1}`,
      positionName: item.pos,
      x: item.x,
      y: item.y,
      playerId: players[idx]?.id
    }));
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [benchIds, setBenchIds] = useState<string[]>(['p-12', 'p-13', 'p-14', 'p-15']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Set of all currently selected player IDs on pitch
  const selectedOnPitchIds = new Set(slots.map(s => s.playerId).filter(Boolean));

  // Change formation preset
  const handlePresetChange = (newPreset: string) => {
    setPreset(newPreset);
    setFormationName(`${newPreset} Tactical Variant`);
    const config = PRESET_CONFIGS[newPreset];
    const newSlots: MatchLineupSlot[] = config.map((c, idx) => ({
      slotId: `slot-${idx + 1}`,
      positionName: c.pos,
      x: c.x,
      y: c.y,
      playerId: slots[idx]?.playerId // keep same player if possible
    }));
    setSlots(newSlots);
  };

  // Assign player to active slot
  const handleAssignPlayer = (playerId: string) => {
    if (selectedSlotIndex === null) return;
    const newSlots = [...slots];
    newSlots[selectedSlotIndex].playerId = playerId;
    setSlots(newSlots);
    setSelectedSlotIndex(null);
  };

  // Toggle bench player
  const toggleBenchPlayer = (playerId: string) => {
    if (benchIds.includes(playerId)) {
      setBenchIds(benchIds.filter(id => id !== playerId));
    } else {
      if (benchIds.length >= 7) return; // max 7 subs
      setBenchIds([...benchIds, playerId]);
    }
  };

  // Save Formation
  const handleSave = () => {
    const formation: TacticalFormation = {
      id: selectedFormationId,
      name: formationName,
      preset,
      description: opponentNotes,
      slots,
      benchPlayerIds: benchIds,
      updatedAt: new Date().toISOString()
    };

    db.saveFormation(formation);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Tactical Formation & Strategy Engine
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            TACTICAL LINEUP BUILDER
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Design pitch formations, assign starting eleven without duplicates, configure bench options, and store gameplans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="px-3 py-1.5 rounded-xl bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" /> Tactical Plan Saved!
            </span>
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors shadow-[0_0_15px_rgba(198,255,0,0.3)]"
          >
            <Save className="w-4 h-4" />
            <span>Save Tactical Plan</span>
          </button>
        </div>
      </div>

      {/* Preset & Tactical Settings */}
      <div className="bg-[#111722] border border-[#283141] p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <span className="text-xs font-black uppercase tracking-wider text-[#929BA9] mr-2">
            Preset:
          </span>
          {Object.keys(PRESET_CONFIGS).map((p) => (
            <button
              key={p}
              onClick={() => handlePresetChange(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                preset === p
                  ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_12px_rgba(198,255,0,0.3)]'
                  : 'bg-[#171F2C] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-1 md:max-w-md">
          <input
            type="text"
            value={formationName}
            onChange={(e) => setFormationName(e.target.value)}
            className="w-full bg-[#171F2C] border border-[#283141] px-3 py-1.5 rounded-xl text-xs font-bold text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
            placeholder="Formation Plan Title..."
          />
        </div>
      </div>

      {/* Main Pitch & Player Assignment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pitch Visualization Column */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-xl aspect-[3/4] pitch-pattern rounded-3xl border-4 border-[#283141] relative overflow-hidden shadow-2xl p-4 select-none">
            {/* Pitch Markings SVG overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              viewBox="0 0 300 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary */}
              <rect x="15" y="15" width="270" height="370" stroke="#F5F7FA" strokeWidth="2" />
              {/* Halfway line */}
              <line x1="15" y1="200" x2="285" y2="200" stroke="#F5F7FA" strokeWidth="2" />
              {/* Center Circle */}
              <circle cx="150" cy="200" r="45" stroke="#F5F7FA" strokeWidth="2" />
              <circle cx="150" cy="200" r="3" fill="#F5F7FA" />
              {/* Bottom Penalty Box (Our Goal) */}
              <rect x="65" y="15" width="170" height="65" stroke="#F5F7FA" strokeWidth="2" />
              <rect x="100" y="15" width="100" height="25" stroke="#F5F7FA" strokeWidth="2" />
              <circle cx="150" cy="55" r="2.5" fill="#F5F7FA" />
              {/* Top Penalty Box (Opponent Goal) */}
              <rect x="65" y="320" width="170" height="65" stroke="#F5F7FA" strokeWidth="2" />
              <rect x="100" y="360" width="100" height="25" stroke="#F5F7FA" strokeWidth="2" />
              <circle cx="150" cy="345" r="2.5" fill="#F5F7FA" />
            </svg>

            {/* Tactical Slots On Pitch */}
            {slots.map((slot, index) => {
              const assignedPlayer = players.find(p => p.id === slot.playerId);
              const isSelected = selectedSlotIndex === index;

              return (
                <div
                  key={slot.slotId}
                  onClick={() => setSelectedSlotIndex(index)}
                  style={{
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 z-10 ${
                    isSelected ? 'scale-110' : ''
                  }`}
                >
                  {/* Jersey / Circle Indicator */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center border-2 shadow-2xl transition-all ${
                      isSelected
                        ? 'bg-[#C6FF00] border-[#F5F7FA] text-[#080B12] ring-4 ring-[#C6FF00]/40'
                        : assignedPlayer
                        ? 'bg-[#080B12] border-[#C6FF00] text-[#F5F7FA]'
                        : 'bg-[#171F2C]/80 border-dashed border-[#929BA9] text-[#929BA9]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-black font-mono leading-none">
                      {assignedPlayer ? `#${assignedPlayer.shirtNumber}` : '?'}
                    </span>
                    <span className={`text-[9px] font-bold uppercase leading-none mt-0.5 ${isSelected ? 'text-[#080B12]' : 'text-[#C6FF00]'}`}>
                      {slot.positionName}
                    </span>
                  </div>

                  {/* Player Label Pill */}
                  <div className="mt-1 px-2 py-0.5 rounded bg-[#080B12]/90 border border-[#283141] text-[10px] font-bold text-[#F5F7FA] whitespace-nowrap shadow-md max-w-[90px] truncate text-center">
                    {assignedPlayer ? assignedPlayer.name.split(' ').pop() : 'Empty'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-[#929BA9] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#C6FF00]" />
            <span>Click any spot on the pitch above to assign or swap a squad player.</span>
          </div>
        </div>

        {/* Right Column: Player Assignment Panel & Bench Selector */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Slot Assignment Box */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
            <h3 className="text-sm font-black uppercase text-[#F5F7FA] mb-3 flex items-center justify-between">
              <span>
                {selectedSlotIndex !== null 
                  ? `Assigning Slot: ${slots[selectedSlotIndex].positionName}` 
                  : 'Select a Pitch Spot to Assign'}
              </span>
              {selectedSlotIndex !== null && (
                <span className="text-[#C6FF00] text-xs font-mono font-bold">SLOT #{selectedSlotIndex + 1}</span>
              )}
            </h3>

            {selectedSlotIndex !== null ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {players.map((p) => {
                  const isAlreadyOnPitch = selectedOnPitchIds.has(p.id) && slots[selectedSlotIndex]?.playerId !== p.id;
                  const isCurrent = slots[selectedSlotIndex]?.playerId === p.id;

                  return (
                    <button
                      key={p.id}
                      disabled={isAlreadyOnPitch}
                      onClick={() => handleAssignPlayer(p.id)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isCurrent
                          ? 'bg-[#C6FF00] text-[#080B12] border-[#C6FF00] font-black'
                          : isAlreadyOnPitch
                          ? 'bg-[#171F2C]/40 border-[#283141] text-[#929BA9]/40 cursor-not-allowed'
                          : 'bg-[#171F2C] border-[#283141] text-[#F5F7FA] hover:border-[#C6FF00]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold">#{p.shirtNumber}</span>
                        <div>
                          <div className="font-bold">{p.name}</div>
                          <div className="text-[10px] opacity-75">{p.position} • {p.preferredFoot} footed</div>
                        </div>
                      </div>

                      <div className="text-right">
                        {isAlreadyOnPitch ? (
                          <span className="text-[10px] uppercase font-mono text-[#EF4444]">On Pitch</span>
                        ) : isCurrent ? (
                          <span className="text-[10px] uppercase font-mono">Current</span>
                        ) : (
                          <span className="text-[10px] uppercase font-mono text-[#C6FF00]">Select</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[#929BA9]">
                Click on any player marker on the pitch (e.g. GK, ST, LW) to select or change their assigned player.
              </p>
            )}
          </div>

          {/* Bench Selection Module */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#283141] mb-3">
              <h3 className="text-sm font-black uppercase text-[#F5F7FA]">
                Matchday Substitutes Bench ({benchIds.length}/7)
              </h3>
              <span className="text-[10px] font-mono text-[#929BA9]">Max 7 Substitutes</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {players.filter(p => !selectedOnPitchIds.has(p.id)).map((p) => {
                const isSelectedBench = benchIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleBenchPlayer(p.id)}
                    className={`w-full p-2 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                      isSelectedBench
                        ? 'bg-[#171F2C] border-[#C6FF00] text-[#F5F7FA]'
                        : 'bg-[#171F2C]/40 border-[#283141] text-[#929BA9] hover:text-[#F5F7FA]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#C6FF00] font-bold">#{p.shirtNumber}</span>
                      <span className="font-bold">{p.name}</span>
                      <span className="text-[10px] text-[#929BA9]">({p.position})</span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      isSelectedBench ? 'bg-[#C6FF00] text-[#080B12]' : 'bg-[#080B12] text-[#929BA9]'
                    }`}>
                      {isSelectedBench ? 'BENCH' : '+ ADD'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opponent Tactical Notes */}
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6">
            <h3 className="text-sm font-black uppercase text-[#F5F7FA] mb-2">
              Tactical Directives & Opposition Notes
            </h3>
            <textarea
              rows={3}
              value={opponentNotes}
              onChange={(e) => setOpponentNotes(e.target.value)}
              placeholder="Enter pressing triggers, set-piece matchups, or transition instructions..."
              className="w-full bg-[#171F2C] border border-[#283141] p-3 rounded-xl text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
