import React from 'react';
import Link from 'next/link';
import { Crest } from './Crest';
import { Shield, MapPin, Mail, Phone, ChevronRight, Award, Trophy, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080B12] border-t border-[#283141] text-[#929BA9] pt-16 pb-12 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#C6FF00]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#283141]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Crest size={48} showWordmark={true} />
            <p className="text-sm leading-relaxed text-[#929BA9] max-w-sm">
              Coach FC is built on intensity, technical precision, and an uncompromising winning mentality. Competing at the pinnacle of European football.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5F7FA]">
                <MapPin className="w-4 h-4 text-[#C6FF00]" />
                <span>The Apex Arena, London</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5F7FA]">
                <Users className="w-4 h-4 text-[#C6FF00]" />
                <span>62,500 Cap</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F5F7FA] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              The Club
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/squad" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> First Team Squad
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Fixtures & Results
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Squad Statistics
                </Link>
              </li>
              <li>
                <Link href="/club" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Tactical DNA & History
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Club News & Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Club Operations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F5F7FA] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              Operations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-[#C6FF00] font-semibold hover:underline flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Staff Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/lineups" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Tactical Lineup Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/rotation" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Workload Management
                </Link>
              </li>
              <li>
                <Link href="/dashboard/matches" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Matchday Event Recorder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#283141]" /> Club Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Honors & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F5F7FA] flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#C6FF00]" />
              Apex Honors
            </h4>
            <div className="space-y-1.5 text-xs text-[#929BA9]">
              <div className="flex justify-between border-b border-[#283141] pb-1">
                <span>Premier Division</span>
                <span className="font-bold text-[#F5F7FA]">2023, 2025</span>
              </div>
              <div className="flex justify-between border-b border-[#283141] pb-1">
                <span>Continental Trophy</span>
                <span className="font-bold text-[#F5F7FA]">2024</span>
              </div>
              <div className="flex justify-between border-b border-[#283141] pb-1">
                <span>Super Cup</span>
                <span className="font-bold text-[#C6FF00]">Reigning Champions</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#929BA9] block mb-1.5">
                Join Matchday Pulse
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="bg-[#111722] border border-[#283141] px-3 py-1.5 text-xs text-[#F5F7FA] rounded-l-md focus:outline-none focus:border-[#C6FF00] w-full"
                />
                <button
                  type="button"
                  className="bg-[#C6FF00] text-[#080B12] px-3 py-1.5 text-xs font-bold rounded-r-md hover:bg-[#B2E600]"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#929BA9] gap-4">
          <p>© 2026 Coach FC. All rights reserved. Professional Football & Tactical Management System.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F5F7FA] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#F5F7FA] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#F5F7FA] cursor-pointer">Ticketing Terms</span>
            <span className="text-[#C6FF00] font-mono">v1.0.0-PROD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
