'use client';

import React, { useState } from 'react';
import { Sparkles, Shirt, Briefcase, Maximize2 } from 'lucide-react';

interface PlayerPhotoViewerProps {
  name: string;
  shirtNumber: number;
  position: string;
  defaultPhotoUrl: string;
  suitPhotoUrl?: string;
  galleryUrls?: string[];
}

export const PlayerPhotoViewer: React.FC<PlayerPhotoViewerProps> = ({
  name,
  shirtNumber,
  position,
  defaultPhotoUrl,
  suitPhotoUrl,
  galleryUrls,
}) => {
  const [activePhoto, setActivePhoto] = useState<string>(defaultPhotoUrl);
  const [selectedMode, setSelectedMode] = useState<'KIT' | 'SUIT'>('KIT');

  const handleSelectMode = (mode: 'KIT' | 'SUIT', url: string) => {
    setSelectedMode(mode);
    setActivePhoto(url);
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      {/* Main Portrait Frame */}
      <div className="relative w-full h-[430px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-[#283141] shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#171F2C] group">
        <img
          src={activePhoto}
          alt={`${name} - ${selectedMode === 'KIT' ? 'Matchday Kit' : 'Club Formal Suit'}`}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-85 pointer-events-none" />

        {/* Position Badge */}
        <span className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-lg bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider shadow-lg">
          {position}
        </span>

        {/* Shirt Number Badge */}
        <span className="absolute top-4 right-4 bg-[#080B12]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#283141] text-xs font-mono font-bold text-[#F5F7FA] shadow-lg">
          #{shirtNumber}
        </span>

        {/* Mode Indicator Overlay */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[#C6FF00] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
            {selectedMode === 'KIT' ? 'Official Match Kit' : 'Club Formal Wear'}
          </span>
        </div>
      </div>

      {/* Interactive Photo Mode Selector if Suit Photo Exists */}
      {suitPhotoUrl && (
        <div className="w-full mt-4 p-2 rounded-2xl bg-[#111722] border border-[#283141] flex items-center gap-2">
          <button
            onClick={() => handleSelectMode('KIT', defaultPhotoUrl)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              selectedMode === 'KIT'
                ? 'bg-[#C6FF00] text-[#080B12] shadow-[0_0_20px_rgba(198,255,0,0.4)]'
                : 'text-[#929BA9] hover:text-[#F5F7FA] hover:bg-[#171F2C]'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Match Kit ⚽</span>
          </button>

          <button
            onClick={() => handleSelectMode('SUIT', suitPhotoUrl)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              selectedMode === 'SUIT'
                ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                : 'text-[#929BA9] hover:text-[#F5F7FA] hover:bg-[#171F2C]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Formal Suit 👔</span>
          </button>
        </div>
      )}

      {/* Zohaib Special Badge / Verified Portrait Note */}
      {shirtNumber === 16 && name.toLowerCase().includes('zohaib') && (
        <div className="w-full mt-3 px-3 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-center">
          <span className="text-[11px] font-mono font-bold text-[#C6FF00]">
            Verified Kit: ZOHAIB #16 • Night Pitch Session
          </span>
        </div>
      )}
    </div>
  );
};
