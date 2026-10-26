"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Play, Pause, Radio } from "lucide-react";

export function StadiumAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isChantingRef = useRef(false);

  // Legendary Football Anthems Synth Sequence ("Allez Allez Allez" / "Ole Ole Ole")
  const TRACKS = [
    { title: "Allez, Allez, Allez • Stadium Chant Beat", bpm: 124 },
    { title: "Olé, Olé, Olé • Champions Arena Theme", bpm: 128 },
    { title: "Blue Lock FC x Coach FC • Matchday Drum Anthem", bpm: 130 }
  ];

  const playSynthesizedChant = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      isChantingRef.current = true;

      // "Allez Allez Allez" melody notes frequencies (F, G, A, Bb, C, D)
      // F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, C5: 523.25, D5: 587.33
      const melody = [
        { note: 349.23, dur: 0.28 }, // Al-
        { note: 392.00, dur: 0.28 }, // -lez
        { note: 440.00, dur: 0.50 }, // Al-
        { note: 392.00, dur: 0.28 }, // -lez
        { note: 349.23, dur: 0.28 }, // Al-
        { note: 329.63, dur: 0.60 }, // -lez!
        { note: 0, dur: 0.20 },      // pause
        { note: 329.63, dur: 0.28 }, // Al-
        { note: 349.23, dur: 0.28 }, // -lez
        { note: 392.00, dur: 0.50 }, // Al-
        { note: 349.23, dur: 0.28 }, // -lez
        { note: 329.63, dur: 0.28 }, // Al-
        { note: 293.66, dur: 0.60 }, // -lez!
        { note: 0, dur: 0.30 }
      ];

      let step = 0;

      const scheduleLoop = () => {
        if (!isChantingRef.current || !audioContextRef.current) return;

        const current = melody[step % melody.length];
        step++;

        if (current.note > 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          // Stadium horn / brass style
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(current.note, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1400, ctx.currentTime);

          // Stadium crowd reverb volume envelope
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + current.dur - 0.02);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + current.dur);

          // Stadium Bass Drum / Snare beat
          if (step % 2 === 0) {
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            kickOsc.type = "sine";
            kickOsc.frequency.setValueAtTime(120, ctx.currentTime);
            kickOsc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.18);
            kickGain.gain.setValueAtTime(0.2, ctx.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
            kickOsc.connect(kickGain);
            kickGain.connect(ctx.destination);
            kickOsc.start(ctx.currentTime);
            kickOsc.stop(ctx.currentTime + 0.18);
          }
        }

        setTimeout(scheduleLoop, current.dur * 1000);
      };

      scheduleLoop();
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      isChantingRef.current = false;
      if (audioContextRef.current && audioContextRef.current.state === "running") {
        audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSynthesizedChant();
    }
  };

  useEffect(() => {
    return () => {
      isChantingRef.current = false;
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="bg-[#111722]/95 backdrop-blur-xl border border-[#283141] hover:border-[#C6FF00] rounded-2xl p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center gap-3 transition-all">
        {/* Play / Mute Toggle Button */}
        <button
          onClick={toggleSound}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-[#C6FF00] text-[#080B12] shadow-[0_0_20px_rgba(198,255,0,0.5)]"
              : "bg-[#171F2C] text-[#929BA9] hover:text-white border border-[#283141]"
          }`}
          title={isPlaying ? "Mute Stadium Anthem" : "Play Allez Allez Allez Anthem"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>

        <div className="pr-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#929BA9]">
            <Radio className={`w-3 h-3 ${isPlaying ? "text-[#C6FF00] animate-pulse" : "text-[#929BA9]"}`} />
            <span>STADIUM AUDIO</span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-ping" />
            )}
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
            <span>{TRACKS[trackIndex].title.split(" • ")[0]}</span>
            <span className="text-[10px] text-[#C6FF00] font-mono">
              {isPlaying ? "LIVE CHANT" : "CLICK TO PLAY"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
