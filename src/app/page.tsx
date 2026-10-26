import React from 'react';
import { Navbar } from '@/components/Navbar';
import { MatchCenterView } from '@/components/match/MatchCenterView';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'MCS Captains 3 - 3 Coach FC & Derby Hub | Match Center & Official Player Ratings',
  description: 'Wednesday 21 October 2026. Official player ratings, 9 big chances created by Captain Tsukioynx (⭐ Key Player), goals from Abrar, Usman, Zohaib, 8 crucial saves by Hamza, and complete tactical telemetry.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA] selection:bg-[#C6FF00] selection:text-[#080B12]">
      <Navbar />

      <main>
        <MatchCenterView />
      </main>

      <Footer />
    </div>
  );
}
