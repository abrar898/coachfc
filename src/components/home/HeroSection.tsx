'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  videoUrl?: string;
  posterUrl?: string;
  nextMatchDate?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-football-match-on-a-grass-pitch-41718-large.mp4",
  posterUrl = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80",
  nextMatchDate = "OCT 24, 2026"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser policy; fallback gracefully
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-[#080B12]">
      {/* Background Video / Fallback Poster */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        {!videoError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover scale-105 transition-opacity duration-1000"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterUrl})` }}
          />
        )}

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/60 to-[#080B12]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,11,18,0.2)_0%,rgba(8,11,18,0.85)_100%)]" />
        {/* Subtle pitch texture / scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171F2C]/80 border border-[#283141] text-xs font-black tracking-[0.25em] text-[#C6FF00] uppercase mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(198,255,0,0.15)] animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-ping" />
          <span>BUILT FOR THE GAME</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#F5F7FA] uppercase font-sans leading-[0.88] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          COACH <span className="text-[#C6FF00] italic">FC</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-[#929BA9] max-w-2xl text-center">
          More than a team. <span className="text-[#F5F7FA] font-bold">A mentality.</span>
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/squad"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#C6FF00] text-[#080B12] text-sm font-black tracking-widest uppercase transition-all duration-200 hover:bg-[#B2E600] hover:shadow-[0_0_30px_rgba(198,255,0,0.5)] active:scale-95 group"
          >
            <span>Explore the Squad</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/matches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#171F2C]/90 border border-[#283141] text-[#F5F7FA] text-sm font-black tracking-widest uppercase transition-all duration-200 hover:bg-[#1E293B] hover:border-[#C6FF00]/50 backdrop-blur-md active:scale-95"
          >
            <span>Upcoming Matches</span>
          </Link>
        </div>

        {/* Live Match Strip / Next Fixture Pill */}
        <div className="mt-14 inline-flex items-center gap-6 px-6 py-2.5 rounded-2xl bg-[#111722]/80 border border-[#283141] backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F5F7FA]">
            <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
            <span>Next Match:</span>
          </div>
          <span className="text-xs font-semibold text-[#929BA9]">
            The Apex Derby vs Manchester Ath.
          </span>
          <span className="text-xs font-mono font-bold text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded">
            {nextMatchDate}
          </span>
        </div>
      </div>

      {/* Floating Media Controls (Play / Pause / Mute) */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2 bg-[#111722]/80 border border-[#283141] p-1.5 rounded-xl backdrop-blur-md shadow-xl">
        <button
          onClick={togglePlay}
          className="p-2 rounded-lg text-[#929BA9] hover:text-[#C6FF00] hover:bg-[#171F2C] transition-colors"
          title={isPlaying ? "Pause Video" : "Play Video"}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-lg text-[#929BA9] hover:text-[#C6FF00] hover:bg-[#171F2C] transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#squad-showcase"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[#929BA9] hover:text-[#C6FF00] transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
